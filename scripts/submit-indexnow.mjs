/**
 * Submit sitemap URLs to IndexNow in one request from this machine.
 *
 * Do not send this through the Cloudflare Worker. IndexNow rate-limits
 * shared edge IPs, so the old /api/reindex path returned 429 on every deploy.
 *
 *   npm run indexnow:submit
 */
import { readFileSync, existsSync, readdirSync } from 'fs'
import path from 'path'

const HOST = 'a1pslandscape.com'
const SITE = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

function loadKey() {
  const fromEnv = process.env.INDEXNOW_KEY?.trim()
  if (fromEnv) return fromEnv

  const dir = path.resolve('public')
  for (const name of readdirSync(dir)) {
    if (!/^[a-f0-9]{16,64}\.txt$/i.test(name)) continue
    const key = name.replace(/\.txt$/i, '')
    const body = readFileSync(path.join(dir, name), 'utf8').trim()
    if (body === key) return key
  }

  throw new Error('INDEXNOW_KEY is not set and no matching public key file was found.')
}

function readSitemapUrls() {
  const sitemapPath = path.resolve('out/sitemap.xml')
  if (!existsSync(sitemapPath)) return null
  const xml = readFileSync(sitemapPath, 'utf8')
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()))].filter(
    (url) => {
      try {
        return new URL(url).hostname === HOST
      } catch {
        return false
      }
    },
  )
}

async function main() {
  const key = loadKey()
  const urls = readSitemapUrls()
  if (!urls?.length) {
    console.error('No out/sitemap.xml found. Run a build first.')
    process.exit(1)
  }

  const keyLocation = `${SITE}/${key}.txt`
  const keyRes = await fetch(keyLocation)
  const keyBody = (await keyRes.text()).trim()
  if (!keyRes.ok || keyBody !== key) {
    console.error(`Key file check failed (${keyRes.status}) at ${keyLocation}`)
    process.exit(1)
  }

  const payload = JSON.stringify({
    host: HOST,
    key,
    keyLocation,
    urlList: urls,
  })

  async function postOnce() {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: payload,
    })
    const text = await res.text()
    return { res, text }
  }

  console.log(`IndexNow ${HOST}: one request, ${urls.length} URLs`)
  let { res, text } = await postOnce()

  // First call after a key publish is "wait for verification", not a quota failure.
  // One delayed retry. Do not loop; repeat posts are what triggers 429.
  if (res.status === 403 && text.includes('SiteVerificationNotCompleted')) {
    console.log('IndexNow is still verifying the key file. Waiting 90s for one retry.')
    await new Promise((resolve) => setTimeout(resolve, 90_000))
    ;({ res, text } = await postOnce())
  }

  if (res.ok || res.status === 202) {
    console.log(`IndexNow accepted ${urls.length} URLs (HTTP ${res.status})`)
    return
  }

  console.error(`IndexNow HTTP ${res.status}: ${text.slice(0, 400)}`)
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
