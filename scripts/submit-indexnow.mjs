/**
 * Post-deploy: submit sitemap URLs to IndexNow via the Cloudflare Worker.
 * Requires REINDEX_WEBHOOK_SECRET (and INDEXNOW_KEY on the worker) in .env.local.
 *
 * Default: priority pages only (home, hubs, legacy landings, /services/*, city hubs).
 * Full site: npm run indexnow:submit -- --all
 *
 * Usage:
 *   npm run indexnow:submit
 *   npm run indexnow:submit -- --all
 *   node --env-file=.env.local scripts/submit-indexnow.mjs
 */
import { readFileSync, existsSync } from 'fs'
import path from 'path'

const SITE = process.env.SITE_URL || 'https://a1pslandscape.com'
const API_URL = process.env.REINDEX_API_URL || `${SITE}/api/reindex`
const SECRET = process.env.REINDEX_WEBHOOK_SECRET
const SUBMIT_ALL = process.argv.includes('--all')

const HUB_PATHS = new Set([
  '/',
  '/about',
  '/services',
  '/gallery',
  '/contact',
  '/blog',
  '/faqs',
  '/resources',
  '/learn',
  '/retaining-wall-in-cedar-falls',
  '/paver-patio-installation',
  '/cedar-falls-water-features',
  '/landscaping-services-in-cedar-falls',
])

function readSitemapUrls() {
  const sitemapPath = path.resolve('out/sitemap.xml')
  if (!existsSync(sitemapPath)) return null
  const xml = readFileSync(sitemapPath, 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

function pathFromUrl(url) {
  try {
    const u = new URL(url)
    return u.pathname.replace(/\/$/, '') || '/'
  } catch {
    return url.replace(SITE, '').replace(/\/$/, '') || '/'
  }
}

/**
 * Priority = hubs + legacy landings + service detail pages + city hubs.
 * Skips programmatic city×service pages and individual blog/learn articles
 * so IndexNow stays under rate limits after deploy.
 */
function isPriorityUrl(url) {
  const p = pathFromUrl(url)
  if (HUB_PATHS.has(p)) return true
  if (p.startsWith('/services/') && p !== '/services') return true
  // City hub: single segment, not a known static hub
  const parts = p.split('/').filter(Boolean)
  if (parts.length === 1 && !HUB_PATHS.has(`/${parts[0]}`)) return true
  return false
}

async function main() {
  if (!SECRET) {
    console.error('REINDEX_WEBHOOK_SECRET is not set. Add it to .env.local (see .env.local.example).')
    process.exit(1)
  }

  const allUrls = readSitemapUrls()
  if (!allUrls?.length) {
    console.error('No out/sitemap.xml found. Run a build first (npm run build or build:deploy:fast).')
    process.exit(1)
  }

  const urls = SUBMIT_ALL ? allUrls : allUrls.filter(isPriorityUrl)
  const mode = SUBMIT_ALL ? 'all' : 'priority'

  console.log(`Sitemap: ${allUrls.length} URLs → submitting ${urls.length} (${mode})`)
  console.log(`Calling ${API_URL} …`)

  const maxAttempts = 4
  let lastData

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SECRET}`,
      },
      body: JSON.stringify({ urls }),
    })

    try {
      lastData = await res.json()
    } catch {
      lastData = { message: await res.text() }
    }

    if (res.ok) {
      console.log(
        `IndexNow: ${lastData.urlCount ?? urls.length} URLs in ${lastData.batchCount ?? 1} batch(es) (HTTP ${lastData.status ?? 200})`,
      )
      if (lastData.message) console.log(lastData.message)
      return
    }

    if (lastData.rateLimited && attempt < maxAttempts) {
      const waitSec = 30 * attempt
      console.warn(`IndexNow rate limited (attempt ${attempt}/${maxAttempts}). Retrying in ${waitSec}s…`)
      await new Promise((r) => setTimeout(r, waitSec * 1000))
      continue
    }

    if (lastData.rateLimited) {
      console.warn(
        'IndexNow rate limited after retries. Try again later with: npm run indexnow:submit',
      )
      process.exit(0)
    }

    console.error(`IndexNow submit failed (${res.status}):`, lastData)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
