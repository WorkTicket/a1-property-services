/**
 * Disable Cloudflare managed robots.txt / AI crawler blocking so origin
 * robots.txt (app/robots.ts) is the single policy.
 *
 * Ahrefs flags:
 *   - Inconsistent AI training bot policy
 *   - Indexable page blocked from some AI search bots
 * when Cloudflare prepends Disallow rules for GPTBot, Google-Extended, etc.
 * while User-agent: * still allows other training crawlers.
 *
 * Env:
 *   CLOUDFLARE_API_TOKEN  (Zone Bot Management Write)
 *   CLOUDFLARE_ZONE_ID    (optional; looked up from ZONE_NAME if missing)
 *   CLOUDFLARE_ZONE_NAME  (default: a1pslandscape.com)
 *
 * Usage:
 *   node scripts/sync-cloudflare-ai-crawlers.mjs
 *   npm run cf:sync-ai-crawlers
 */

const API = 'https://api.cloudflare.com/client/v4'
const ZONE_NAME = process.env.CLOUDFLARE_ZONE_NAME || 'a1pslandscape.com'

const token = process.env.CLOUDFLARE_API_TOKEN
if (!token) {
  console.error('Missing CLOUDFLARE_API_TOKEN')
  process.exit(1)
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

async function cf(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!json.success) {
    const err = JSON.stringify(json.errors || json, null, 2)
    throw new Error(`${method} ${path} failed:\n${err}`)
  }
  return json.result
}

async function resolveZoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID) return process.env.CLOUDFLARE_ZONE_ID
  const zones = await cf(`/zones?name=${encodeURIComponent(ZONE_NAME)}`)
  const zone = Array.isArray(zones) ? zones[0] : zones?.[0]
  if (!zone?.id) throw new Error(`Zone not found for ${ZONE_NAME}`)
  return zone.id
}

async function main() {
  const zoneId = await resolveZoneId()
  console.log(`Zone ${ZONE_NAME} (${zoneId})`)

  let current = null
  try {
    current = await cf(`/zones/${zoneId}/bot_management`)
    console.log('Current bot_management:')
    console.log(JSON.stringify(current, null, 2))
  } catch (err) {
    console.warn(`Could not read bot_management: ${err.message}`)
  }

  const body = {
    ai_bots_protection: 'disabled',
    is_robots_txt_managed: false,
    crawler_protection: 'disabled',
    bot_preference_sync_enabled: false,
    cf_robots_variant: 'off',
  }

  try {
    const result = await cf(`/zones/${zoneId}/bot_management`, {
      method: 'PUT',
      body,
    })
    console.log('Updated bot_management:')
    console.log(JSON.stringify(result, null, 2))
  } catch (err) {
    console.error(err.message)
    console.error(`
Could not update Bot Management via API (token may lack Bot Management Write).

Disable these in the Cloudflare dashboard instead:
  1. Security → Bots / AI Crawl Control → Managed robots.txt → Off
  2. Security → Bots → Block AI Bots / AI Scrapers → Off (or "Do not block")
  3. Confirm https://a1pslandscape.com/robots.txt no longer starts with
     "BEGIN Cloudflare Managed content"
`)
    process.exit(1)
  }

  console.log(`
Verify:
  curl.exe -s https://a1pslandscape.com/robots.txt
  → should NOT contain "Cloudflare Managed content"
  → should Allow GPTBot / Google-Extended / OAI-SearchBot
`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
