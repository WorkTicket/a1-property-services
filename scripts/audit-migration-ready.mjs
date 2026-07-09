/**
 * Local migration readiness audit (no network / no preview).
 * Usage: node scripts/audit-migration-ready.mjs
 */

import { existsSync, readFileSync, readdirSync } from 'fs'
import path from 'path'
import {
  migrationRedirects,
  preservedLegacyPaths,
  buildRedirectMap,
  detectRedirectChains,
  normalizeRedirectPath,
} from '../lib/migration-redirects.mjs'

const OUT_DIR = path.resolve('out')
const REDIRECTS_FILE = path.resolve('public/_redirects')

/** All paths from the live WordPress sitemap crawl (Jul 2026). */
const OLD_SITEMAP_PATHS = [
  '/',
  '/category/blog',
  '/cedar-falls-landscaping-design-tips',
  '/cedar-falls-lawn-care-tips',
  '/cedar-falls-water-features',
  '/cedar-valley-landscaping-blog',
  '/cedar-valley-lawn-care-guide',
  '/contact-landscaping-property-maintenance-cedar-falls',
  '/gallery',
  '/landscaping-services-in-cedar-falls',
  '/our-landscaping-company-cedar-falls',
  '/paver-patio-installation',
  '/professional-landscaping-services-cedar-falls',
  '/retaining-wall-in-cedar-falls',
]

/** Extra WordPress paths found on homepage crawl. */
const OLD_EXTRA_PATHS = ['/amp', '/comments/feed', '/feed']

const OLD_SITEMAP_XML_PATHS = [
  '/sitemap_index.xml',
  '/page-sitemap.xml',
  '/post-sitemap.xml',
  '/category-sitemap.xml',
]

let errors = 0
let warnings = 0

function fail(msg) {
  console.error(`  ✗ ${msg}`)
  errors++
}

function warn(msg) {
  console.warn(`  ⚠ ${msg}`)
  warnings++
}

function ok(msg) {
  console.log(`  ✓ ${msg}`)
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

function pathToUrl(filePath) {
  let relative = path.relative(OUT_DIR, filePath).replace(/\\/g, '/')
  if (relative === 'index.html') return '/'
  if (relative.endsWith('/index.html')) return '/' + relative.slice(0, -'/index.html'.length)
  if (relative.endsWith('.html')) return '/' + relative.slice(0, -'.html'.length)
  return '/' + relative
}

function pageExists(pages, targetPath) {
  return pages.has(normalizeRedirectPath(targetPath))
}

function staticAssetExists(targetPath) {
  const filePath = path.join(OUT_DIR, targetPath.replace(/^\//, ''))
  return existsSync(filePath)
}

console.log('\n📋 Local migration readiness audit\n')

if (!existsSync(OUT_DIR)) {
  fail('out/ directory missing — run npm run build:deploy first')
  process.exit(1)
}

const htmlPages = new Set(findHtml(OUT_DIR).map(pathToUrl))
for (const asset of ['/feed.xml', '/sitemap.xml', '/_redirects', '/robots.txt']) {
  if (staticAssetExists(asset)) {
    htmlPages.add(asset)
  }
}

ok(`Build output: ${htmlPages.size} routable paths`)

// 1. Redirect file present in out/
console.log('\n── Redirect artifacts ──')
if (!existsSync(path.join(OUT_DIR, '_redirects'))) {
  fail('out/_redirects missing — public/_redirects was not copied into build output')
} else {
  ok('out/_redirects exists (will be used by Cloudflare on deploy)')
}

if (!existsSync(REDIRECTS_FILE)) {
  fail('public/_redirects missing — run npm run generate:redirects')
} else {
  const content = readFileSync(REDIRECTS_FILE, 'utf-8')
  for (const { from, to } of migrationRedirects) {
    const rule = `${normalizeRedirectPath(from)} ${normalizeRedirectPath(to)} 301`
    if (!content.includes(rule)) {
      fail(`public/_redirects missing rule: ${rule}`)
    }
  }
  if (errors === 0) ok('public/_redirects matches migration map')
}

const chains = detectRedirectChains(migrationRedirects)
if (chains.length > 0) {
  for (const chain of chains) {
    fail(`Redirect chain: ${chain.join(' → ')}`)
  }
} else {
  ok('No redirect chains in migration map')
}

const redirectMap = buildRedirectMap(migrationRedirects)
for (const legacyPath of preservedLegacyPaths) {
  if (redirectMap[legacyPath]) {
    fail(`Preserved URL must not redirect: ${legacyPath}`)
  }
}

// 2. Every old sitemap URL is covered
console.log('\n── Old WordPress URL coverage ──')
const allOldPaths = [...OLD_SITEMAP_PATHS, ...OLD_EXTRA_PATHS, ...OLD_SITEMAP_XML_PATHS]

for (const oldPath of allOldPaths) {
  const normalized = normalizeRedirectPath(oldPath)
  const preserved = preservedLegacyPaths.includes(normalized)
  const redirectTarget = redirectMap[normalized]

  if (preserved) {
    if (!pageExists(htmlPages, normalized)) {
      fail(`Preserved legacy URL has no local page: ${normalized}`)
    } else {
      ok(`PRESERVED ${normalized}`)
    }
    continue
  }

  if (!redirectTarget) {
    fail(`Uncovered old URL (no page, no redirect): ${normalized}`)
    continue
  }

  const destIsXml = redirectTarget.endsWith('.xml')
  const destExists = destIsXml ? staticAssetExists(redirectTarget) : pageExists(htmlPages, redirectTarget)
  if (!destExists) {
    fail(`Redirect destination missing locally: ${normalized} → ${redirectTarget}`)
  } else {
    ok(`REDIRECT ${normalized} → ${redirectTarget}`)
  }
}

// 3. Preserved ranking pages have expected content markers
console.log('\n── Preserved ranking pages ──')
const rankingPaths = [
  '/retaining-wall-in-cedar-falls',
  '/paver-patio-installation',
  '/cedar-falls-water-features',
  '/landscaping-services-in-cedar-falls',
]

for (const rankingPath of rankingPaths) {
  const filePath = path.join(OUT_DIR, rankingPath.replace(/^\//, '') + '.html')
  if (!existsSync(filePath)) {
    fail(`Ranking page HTML missing: ${rankingPath}`)
    continue
  }
  const html = readFileSync(filePath, 'utf-8')
  const hasCanonical = html.includes(`href="https://a1pslandscape.com${rankingPath}"`)
  const isWordPress = html.includes('loader image')
  if (isWordPress) {
    fail(`${rankingPath} looks like WordPress output`)
  }
  if (!hasCanonical) {
    warn(`${rankingPath} canonical may not point to legacy URL`)
  } else {
    ok(`${rankingPath} built with legacy canonical`)
  }
}

// 4. New nav paths exist (old footer/nav equivalents)
console.log('\n── New site core pages ──')
const corePaths = ['/about', '/services', '/gallery', '/contact', '/blog', '/faqs', '/resources']
for (const corePath of corePaths) {
  if (!pageExists(htmlPages, corePath)) {
    fail(`Core page missing: ${corePath}`)
  } else {
    ok(corePath)
  }
}

// 5. Redirect rules must not target preserved URLs incorrectly
console.log('\n── Redirect safety ──')
for (const { from, to } of migrationRedirects) {
  if (preservedLegacyPaths.includes(normalizeRedirectPath(to))) {
    warn(`Redirect ${from} → ${to} lands on another legacy URL (acceptable if intentional)`)
  }
}

console.log('\n── Summary ──')
console.log(`  Errors:   ${errors}`)
console.log(`  Warnings: ${warnings}`)
console.log(`  Redirect rules: ${migrationRedirects.length}`)
console.log(`  Preserved legacy URLs: ${preservedLegacyPaths.length}`)

if (errors > 0) {
  console.error('\nLocal migration audit FAILED.\n')
  process.exit(1)
}

console.log('\nLocal migration audit PASSED — ready to deploy when you are.\n')
