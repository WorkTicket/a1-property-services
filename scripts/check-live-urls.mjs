import { migrationRedirects, preservedLegacyPaths } from '../lib/migration-redirects.mjs'

const BASE = 'https://a1pslandscape.com'

const urls = [
  ...preservedLegacyPaths.map((path) => ['PRESERVED', `${BASE}${path === '/' ? '' : path}`]),
  ...migrationRedirects.map(({ from, to }) => ['REDIRECT', `${BASE}${from}`, to]),
  ['SITEMAP', `${BASE}/sitemap_index.xml`],
  ['ROBOTS', `${BASE}/robots.txt`],
]

async function check(label, url, expectedTo, follow = false) {
  try {
    const res = await fetch(url, { redirect: follow ? 'follow' : 'manual' })
    const location = res.headers.get('location') ?? ''
    return { label, url, status: res.status, location, final: follow ? res.url : null, expectedTo }
  } catch (e) {
    return { label, url, status: 'ERROR', location: String(e.message), final: null, expectedTo }
  }
}

function normalizeLocation(location) {
  if (!location) return ''
  try {
    const parsed = new URL(location, BASE)
    return parsed.pathname.replace(/\/$/, '') || '/'
  } catch {
    return location.replace(/\/$/, '') || '/'
  }
}

console.log('=== LIVE URL CHECK (no redirect follow) ===\n')
const results = await Promise.all(
  urls.map(([label, url, expectedTo]) => check(label, url, expectedTo))
)

for (const r of results) {
  const extra = r.location ? ` -> ${r.location}` : ''
  let ok = false
  if (r.label === 'PRESERVED') {
    ok = r.status === 200 || r.status === 301
  } else if (r.label === 'REDIRECT') {
    ok = [301, 308].includes(r.status)
    if (ok && r.expectedTo) {
      const dest = normalizeLocation(r.location)
      ok = dest === r.expectedTo
    }
  } else if (r.label === 'SITEMAP') {
    ok = r.status === 200 || r.status === 301
  } else if (r.label === 'ROBOTS') {
    ok = r.status === 200
  }
  console.log(`${ok ? 'PASS' : 'WARN'} [${r.label}] ${r.status} ${r.url}${extra}`)
  if (r.label === 'REDIRECT' && r.expectedTo && !ok) {
    console.log(`       expected destination: ${r.expectedTo}`)
  }
}

console.log('\n=== PRESERVED RANKING URLs (follow redirects) ===\n')
const preservedRanking = [
  `${BASE}/retaining-wall-in-cedar-falls`,
  `${BASE}/paver-patio-installation`,
  `${BASE}/cedar-falls-water-features`,
  `${BASE}/landscaping-services-in-cedar-falls`,
]

for (const url of preservedRanking) {
  const withSlash = url.endsWith('/') ? url : `${url}/`
  const r = await check('PRESERVED', withSlash, null, true)
  const html = r.status === 200 ? await (await fetch(withSlash)).text() : ''
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? 'n/a'
  const isNewSite = html.includes('A1 Property Services') && !html.includes('loader image')
  console.log(`${r.status === 200 ? 'PASS' : 'WARN'} ${r.status} ${withSlash}`)
  console.log(`  title: ${title.slice(0, 80)}`)
  console.log(`  new site deployed: ${isNewSite ? 'YES' : 'NO (still WordPress/old)'}`)
}
