/**
 * Post-deploy: submit all sitemap URLs to IndexNow via the Cloudflare Worker.
 * Requires REINDEX_WEBHOOK_SECRET (and INDEXNOW_KEY on the worker) in .env.local.
 *
 * Usage:
 *   npm run indexnow:submit
 *   node --env-file=.env.local scripts/submit-indexnow.mjs
 */
import { readFileSync, existsSync } from 'fs'
import path from 'path'

const SITE = process.env.SITE_URL || 'https://a1pslandscape.com'
const API_URL = process.env.REINDEX_API_URL || `${SITE}/api/reindex`
const SECRET = process.env.REINDEX_WEBHOOK_SECRET

function countSitemapUrls() {
  const sitemapPath = path.resolve('out/sitemap.xml')
  if (!existsSync(sitemapPath)) return null
  const xml = readFileSync(sitemapPath, 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].length
}

async function main() {
  if (!SECRET) {
    console.error('REINDEX_WEBHOOK_SECRET is not set. Add it to .env.local (see .env.local.example).')
    process.exit(1)
  }

  const localCount = countSitemapUrls()
  if (localCount != null) {
    console.log(`Local sitemap: ${localCount} URLs`)
  }

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
      body: JSON.stringify({}),
    })

    try {
      lastData = await res.json()
    } catch {
      lastData = { message: await res.text() }
    }

    if (res.ok) {
      console.log(
        `IndexNow: ${lastData.urlCount ?? localCount ?? '?'} URLs in ${lastData.batchCount ?? 1} batch(es) (HTTP ${lastData.status ?? 200})`,
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
      console.warn('IndexNow rate limited after retries. Configuration is correct — retry later with: npm run indexnow:submit')
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
