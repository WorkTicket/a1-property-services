/**
 * Post-deploy: submit sitemap URLs to IndexNow via the Cloudflare Worker.
 * Requires REINDEX_WEBHOOK_SECRET (and INDEXNOW_KEY on the worker) in .env.local.
 *
 * Default: all sitemap URLs (Ahrefs flags changed pages that were not pinged).
 * Priority-only: npm run indexnow:submit -- --priority
 *
 * Usage:
 *   npm run indexnow:submit
 *   npm run indexnow:submit -- --priority
 *   npm run indexnow:submit -- --all
 *   node --env-file=.env.local scripts/submit-indexnow.mjs
 */
import { readFileSync, existsSync } from 'fs'
import path from 'path'

const SITE = process.env.SITE_URL || 'https://a1pslandscape.com'
const API_URL = process.env.REINDEX_API_URL || `${SITE}/api/reindex`
const SECRET = process.env.REINDEX_WEBHOOK_SECRET
const SUBMIT_PRIORITY_ONLY = process.argv.includes('--priority')
const SUBMIT_ALL = process.argv.includes('--all') || !SUBMIT_PRIORITY_ONLY

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
  '/paver-driveway-cedar-falls',
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

async function postBatch(urls) {
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

    if (res.ok) return lastData

    if (lastData.rateLimited && attempt < maxAttempts) {
      const waitSec = 30 * attempt
      console.warn(`IndexNow rate limited (attempt ${attempt}/${maxAttempts}). Retrying in ${waitSec}s…`)
      await new Promise((r) => setTimeout(r, waitSec * 1000))
      continue
    }

    return { ...lastData, failed: true, status: res.status }
  }
  return { ...lastData, failed: true }
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
  const CLIENT_BATCH = 80
  const CLIENT_DELAY_MS = 5000

  console.log(`Sitemap: ${allUrls.length} URLs → submitting ${urls.length} (${mode})`)
  console.log(`Calling ${API_URL} in batches of ${CLIENT_BATCH}…`)

  let submitted = 0
  for (let i = 0; i < urls.length; i += CLIENT_BATCH) {
    if (i > 0) {
      await new Promise((r) => setTimeout(r, CLIENT_DELAY_MS))
    }
    const batch = urls.slice(i, i + CLIENT_BATCH)
    const batchNo = Math.floor(i / CLIENT_BATCH) + 1
    const batchCount = Math.ceil(urls.length / CLIENT_BATCH)
    const lastData = await postBatch(batch)

    if (lastData.failed) {
      if (lastData.rateLimited) {
        console.warn(
          `IndexNow rate limited after retries at batch ${batchNo}/${batchCount} (${submitted} submitted). Try again later with: npm run indexnow:submit`,
        )
        process.exit(0)
      }
      console.error(`IndexNow submit failed at batch ${batchNo}/${batchCount} (${lastData.status}):`, lastData)
      process.exit(1)
    }

    submitted += batch.length
    console.log(
      `IndexNow batch ${batchNo}/${batchCount}: ${batch.length} URLs (HTTP ${lastData.status ?? 200})`,
    )
  }

  console.log(`IndexNow: ${submitted} URLs submitted`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
