import { readFileSync, existsSync, readdirSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'

const OUT_DIR = path.resolve('out')
const REPORT_DIR = path.resolve('reports')

/** Utility pages that are intentionally excluded from sitemap.xml */
const SITEMAP_EXCLUDED_PAGES = new Set([
  '/404',
  '/thank-you',
  '/services/retaining-walls',
  '/services/paver-patio',
  '/services/ponds-water-features',
])

let errors = 0
let warnings = 0

function error(msg) { console.error(`  ✗ ${msg}`); errors++ }
function warn(msg) { console.warn(`  ⚠ ${msg}`); warnings++ }
function ok(msg) { console.log(`  ✓ ${msg}`) }

function extractLinks(content) {
  const links = new Set()
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
  let match
  while ((match = regex.exec(content)) !== null) {
    const href = match[1]
    if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('http') && !href.startsWith('data:') && !href.startsWith('/_next/') && !href.startsWith('/images/')) {
      links.add(href)
    }
  }
  return [...links]
}

function extractCanonical(content) {
  const match = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
  return match?.[1] || null
}

function pathToUrl(filePath) {
  let relative = path.relative(OUT_DIR, filePath).replace(/\\/g, '/')
  if (relative === 'index.html') return '/'
  if (relative.endsWith('/index.html')) return '/' + relative.slice(0, -'/index.html'.length)
  if (relative.endsWith('.html')) return '/' + relative.slice(0, -'.html'.length)
  return '/' + relative
}

function normalizePagePath(urlPath) {
  return urlPath.replace(/\/$/, '') || '/'
}

function findHtml(dir) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...findHtml(fullPath))
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error('Build output directory not found. Run `npm run build` first.')
    process.exit(1)
  }

  if (!existsSync(REPORT_DIR)) {
    mkdirSync(REPORT_DIR, { recursive: true })
  }

  const htmlFiles = findHtml(OUT_DIR).map((f) => ({ url: pathToUrl(f), filePath: f }))
  console.log(`\n🔍 Running link health check on ${htmlFiles.length} pages...\n`)

  const pages = {}
  const allInternalLinks = {}
  const allPages = new Set(htmlFiles.map((f) => f.url))
  const canonicalUrls = {}
  const linkCounts = {}

  for (const { url: urlPath, filePath } of htmlFiles) {
    const content = readFileSync(filePath, 'utf-8')
    const links = extractLinks(content)
    const canonical = extractCanonical(content)

    pages[urlPath] = { filePath, links, canonical, content }
    allInternalLinks[urlPath] = links
    linkCounts[urlPath] = links.length

    if (canonical) {
      canonicalUrls[urlPath] = canonical
    }
  }

  // ---------------------------------------------------------------
  // 1. BROKEN INTERNAL LINKS
  // ---------------------------------------------------------------
  console.log('\n── Broken Internal Links ──')

  const allPagePaths = new Set(Array.from(allPages).map((p) => p.replace(/\/$/, '') || '/'))
  let brokenCount = 0

  for (const [source, links] of Object.entries(allInternalLinks)) {
    for (const link of links) {
      let normalized = link.split('#')[0].replace(/\/$/, '')
      if (normalized === '') normalized = '/'
      if (normalized.startsWith('/') && !allPagePaths.has(normalized)) {
        error(`Broken link on ${source}: ${link}`)
        brokenCount++
      }
    }
  }

  // Also check for redirect chains in migration map / _redirects
  let redirectChains = []
  try {
    const { migrationRedirects, detectRedirectChains } = await import('../lib/migration-redirects.mjs')
    redirectChains = detectRedirectChains(migrationRedirects)
  } catch {
    const redirectsFile = path.resolve('public/_redirects')
    if (existsSync(redirectsFile)) {
      const redirectContent = readFileSync(redirectsFile, 'utf-8')
      const redirects = redirectContent.split('\n').filter(l => l.trim() && !l.startsWith('#')).map(l => {
        const parts = l.trim().split(/\s+/)
        return { from: parts[0], to: parts[1], status: parseInt(parts[2]) || 301 }
      })

      const redirectMap = {}
      for (const r of redirects) {
        redirectMap[r.from.replace(/\/$/, '') || '/'] = r.to.replace(/\/$/, '') || '/'
      }
      for (const r of redirects) {
        let target = r.to.replace(/\/$/, '') || '/'
        const chain = [r.from]
        let hops = 0
        while (redirectMap[target] && hops < 5) {
          chain.push(target)
          target = redirectMap[target]
          hops++
        }
        if (chain.length > 1) {
          chain.push(target)
          redirectChains.push(chain)
        }
      }
    }
  }

  if (redirectChains.length > 0) {
    console.log('\n── Redirect Chains ──')
    for (const chain of redirectChains) {
      warn(`Redirect chain: ${chain.join(' → ')}`)
    }
  } else {
    ok('No redirect chains detected')
  }

  // ---------------------------------------------------------------
  // 2. ORPHAN PAGES
  // ---------------------------------------------------------------
  console.log('\n── Orphan Pages ──')

  const linkedPages = new Set(['/'])
  for (const links of Object.values(allInternalLinks)) {
    for (const link of links) {
      let normalized = link.replace(/\/$/, '')
      if (normalized === '') normalized = '/'
      if (normalized.startsWith('/')) {
        linkedPages.add(normalized)
      }
    }
  }

  const orphans = []
  for (const page of allPages) {
    const normalized = page.replace(/\/$/, '') || '/'
    if (!linkedPages.has(normalized) && normalized !== '/') {
      // Check if parent directory is linked (which is acceptable for programmatic pages)
      const dir = path.dirname(normalized)
      if (dir !== '/' && !linkedPages.has(dir)) {
        orphans.push(page)
        warn(`Orphan page: ${page}`)
      }
    }
  }

  if (orphans.length === 0) {
    ok('No orphan pages detected')
  }

  // ---------------------------------------------------------------
  // 3. PAGE DEPTH ANALYSIS
  // ---------------------------------------------------------------
  console.log('\n── Page Depth Analysis ──')

  const depthCounts = {}
  for (const url of allPages) {
    const depth = url.split('/').filter(Boolean).length
    depthCounts[depth] = (depthCounts[depth] || 0) + 1
    if (depth > 3) {
      warn(`Deep page (${depth} levels): ${url}`)
    }
  }

  for (const [depth, count] of Object.entries(depthCounts).sort((a, b) => a[0] - b[0])) {
    console.log(`  ${depth} level${depth > 1 ? 's' : ''}: ${count} page${count > 1 ? 's' : ''}`)
  }

  // ---------------------------------------------------------------
  // 4. BACKLINK ANALYSIS
  // ---------------------------------------------------------------
  console.log('\n── Backlink Analysis ──')

  // Build backlink map
  const backlinks = {}
  for (const [source, links] of Object.entries(allInternalLinks)) {
    for (const link of links) {
      let normalized = link.replace(/\/$/, '')
      if (normalized === '') normalized = '/'
      if (normalized.startsWith('/')) {
        if (!backlinks[normalized]) backlinks[normalized] = []
        backlinks[normalized].push(source)
      }
    }
  }

  let pagesWithFewBacklinks = 0
  for (const page of allPages) {
    const normalized = page.replace(/\/$/, '') || '/'
    const bl = backlinks[normalized] || []
    if (bl.length === 0 && normalized !== '/') {
      // Check that at least the parent page links to it
      const parentDir = path.dirname(normalized)
      if (parentDir !== '/') {
        // Only flag if parent doesn't exist either
        if (!allPages.has(parentDir)) {
          warn(`No backlinks to: ${page}`)
          pagesWithFewBacklinks++
        }
      }
    }
  }

  if (pagesWithFewBacklinks === 0) {
    ok('All pages have backlinks')
  }

  // ---------------------------------------------------------------
  // 5. CANONICAL URL CHECK
  // ---------------------------------------------------------------
  console.log('\n── Canonical URL Check ──')

  let canonicalsOk = 0
  let canonicalsMissing = 0
  for (const [url, canonical] of Object.entries(canonicalUrls)) {
    let canonicalPath = null
    try {
      canonicalPath = normalizePagePath(new URL(canonical).pathname)
    } catch {
      warn(`Invalid canonical URL on ${url}: ${canonical}`)
      canonicalsMissing++
      continue
    }

    if (canonicalPath === normalizePagePath(url)) {
      canonicalsOk++
    } else {
      warn(`Canonical mismatch on ${url}: points to ${canonical}`)
      canonicalsMissing++
    }
  }
  ok(`${canonicalsOk} pages have correct canonical URLs`)
  if (canonicalsMissing > 0) {
    warn(`${canonicalsMissing} pages have canonical mismatches`)
  }

  // ---------------------------------------------------------------
  // 6. LINK DENSITY REPORT
  // ---------------------------------------------------------------
  console.log('\n── Internal Link Density ──')

  const linkDist = Object.entries(linkCounts)
    .map(([url, count]) => ({ url, count }))
    .sort((a, b) => a.count - b.count)

  const lowLinkPages = linkDist.filter(l => l.count <= 3)
  const highLinkPages = linkDist.filter(l => l.count > 20)

  if (lowLinkPages.length > 0) {
    for (const p of lowLinkPages.slice(0, 5)) {
      warn(`Low link count on ${p.url}: ${p.count} internal links`)
    }
    if (lowLinkPages.length > 5) {
      warn(`... and ${lowLinkPages.length - 5} more pages with <= 3 internal links`)
    }
  }

  const avgLinks = linkDist.reduce((s, l) => s + l.count, 0) / linkDist.length
  ok(`Average internal links per page: ${avgLinks.toFixed(1)}`)

  // ---------------------------------------------------------------
  // 7. MISSING BACKLINKS FROM RELATED CONTENT
  // ---------------------------------------------------------------
  console.log('\n── Related Content Backlink Check ──')

  // Check that service pages link to their related services and vice versa
  const servicePages = Array.from(allPages).filter(p => p.startsWith('/services/') && p !== '/services')
  for (const sp of servicePages) {
    const links = allInternalLinks[sp] || []
    const otherServicePages = servicePages.filter(p => p !== sp)
    const linkedToOthers = otherServicePages.filter(osp => links.some(l => {
      const normalized = l.replace(/\/$/, '')
      return normalized === osp
    }))
    if (linkedToOthers.length < 2) {
      warn(`Service page ${sp} links to only ${linkedToOthers.length} other service pages (should link to 2+)`)
    }
  }

  // ---------------------------------------------------------------
  // 8. SITEMAP VALIDATION
  // ---------------------------------------------------------------
  console.log('\n── Sitemap Validation ──')

  const sitemapPath = path.resolve(OUT_DIR, 'sitemap.xml')
  if (existsSync(sitemapPath)) {
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')
    const urlMatches = sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)
    const sitemapUrls = new Set()
    for (const match of urlMatches) {
      const url = match[1].replace(/\/$/, '') || '/'
      const pathOnly = new URL(url).pathname
      sitemapUrls.add(pathOnly)
    }

    ok(`Sitemap contains ${sitemapUrls.size} URLs`)

    // Check for pages in sitemap that are missing from build output
    let missingFromSitemap = 0
    for (const page of allPages) {
      if (!sitemapUrls.has(page) && page !== '/' && !SITEMAP_EXCLUDED_PAGES.has(page)) {
        warn(`Page missing from sitemap: ${page}`)
        missingFromSitemap++
      }
    }

    // Check for sitemap URLs that don't exist in build output
    let orphanSitemapUrls = 0
    for (const url of sitemapUrls) {
      if (!allPages.has(url) && url !== '/') {
        warn(`Sitemap URL not found in build output: ${url}`)
        orphanSitemapUrls++
      }
    }

    if (missingFromSitemap === 0) ok('All pages present in sitemap')
    if (orphanSitemapUrls === 0) ok('No orphan sitemap URLs')
  } else {
    warn('sitemap.xml not found in build output')
  }

  // ---------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------
  console.log('\n══════════════════════════════════════')
  console.log('      LINK HEALTH CHECK SUMMARY')
  console.log('══════════════════════════════════════')
  console.log(`  Pages checked:    ${htmlFiles.length}`)
  console.log(`  Broken links:     ${brokenCount}`)
  console.log(`  Orphan pages:     ${orphans.length}`)
  console.log(`  Redirect chains:  ${redirectChains.length}`)
  console.log(`  Errors:           ${errors}`)
  console.log(`  Warnings:         ${warnings}`)
  console.log('══════════════════════════════════════\n')

  // Write report
  const report = {
    timestamp: new Date().toISOString(),
    totalPages: htmlFiles.length,
    brokenLinks: brokenCount,
    orphanPages: orphans,
    redirectChains: redirectChains.map(c => c.join(' → ')),
    errors,
    warnings,
    averageLinksPerPage: avgLinks.toFixed(1),
  }

  const reportPath = path.resolve(REPORT_DIR, 'link-health-report.json')
  writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`Report written to ${reportPath}`)

  process.exit(errors > 0 ? 1 : 0)
}

main().catch(console.error)
