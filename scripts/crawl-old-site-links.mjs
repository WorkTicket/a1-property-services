/**
 * Crawl the live WordPress sitemap and homepage links for migration mapping.
 * Usage: node scripts/crawl-old-site-links.mjs
 */

async function fetchText(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return res.text()
}

function extractLocUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

function normalizePath(url) {
  const path = new URL(url).pathname.replace(/\/$/, '') || '/'
  return path
}

const indexXml = await fetchText('https://a1pslandscape.com/sitemap_index.xml')
const sitemapUrls = extractLocUrls(indexXml)

const pageUrls = new Set()
for (const sitemapUrl of sitemapUrls) {
  const xml = await fetchText(sitemapUrl)
  for (const url of extractLocUrls(xml)) {
    pageUrls.add(normalizePath(url))
  }
}

const homeHtml = await fetchText('https://a1pslandscape.com/')
const homePaths = new Set()
for (const match of homeHtml.matchAll(/href=["']([^"'#]+)["']/gi)) {
  const href = match[1]
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue
  try {
    const url = href.startsWith('http') ? new URL(href) : new URL(href, 'https://a1pslandscape.com')
    if (url.hostname.replace(/^www\./, '') !== 'a1pslandscape.com') continue
    if (url.pathname.includes('/wp-content/') || url.pathname.includes('/wp-json')) continue
    homePaths.add(normalizePath(url.href))
  } catch {
    // ignore malformed hrefs
  }
}

console.log('=== Sitemap paths ===')
for (const path of [...pageUrls].sort()) console.log(path)

console.log('\n=== Homepage-only paths (not in sitemap) ===')
for (const path of [...homePaths].filter((p) => !pageUrls.has(p)).sort()) console.log(path)
