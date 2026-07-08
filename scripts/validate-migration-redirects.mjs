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

function findHtml(dir) {
  /** @type {string[]} */
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

function hasBuiltPage(pages, targetPath) {
  const normalized = normalizeRedirectPath(targetPath)
  if (pages.has(normalized)) return true
  if (normalized.endsWith('.xml') && pages.has(normalized)) return true
  return false
}

let errors = 0

function fail(message) {
  console.error(`  ✗ ${message}`)
  errors++
}

function ok(message) {
  console.log(`  ✓ ${message}`)
}

console.log('\n🔀 Validating migration redirects...\n')

const chains = detectRedirectChains(migrationRedirects)
if (chains.length > 0) {
  for (const chain of chains) {
    fail(`Redirect chain: ${chain.join(' → ')}`)
  }
} else {
  ok('No redirect chains')
}

const redirectMap = buildRedirectMap(migrationRedirects)
for (const legacyPath of preservedLegacyPaths) {
  if (redirectMap[legacyPath]) {
    fail(`Preserved legacy path must not redirect: ${legacyPath}`)
  }
}

for (const { from, to } of migrationRedirects) {
  if (preservedLegacyPaths.includes(normalizeRedirectPath(from))) {
    fail(`Redirect configured for preserved legacy path: ${from}`)
  }
}

const redirectsFile = path.resolve('public/_redirects')
if (!existsSync(redirectsFile)) {
  fail('public/_redirects is missing: run npm run generate:redirects')
} else {
  const content = readFileSync(redirectsFile, 'utf-8')
  for (const { from, to } of migrationRedirects) {
    const source = normalizeRedirectPath(from)
    const destination = normalizeRedirectPath(to)
    const rule = `${source} ${destination} 301`
    if (!content.includes(rule)) {
      fail(`Generated _redirects is stale: missing rule: ${rule}`)
    }
  }
  if (errors === 0) {
    ok('public/_redirects matches migration map')
  }
}

if (existsSync(OUT_DIR)) {
  const htmlPages = new Set(findHtml(OUT_DIR).map(pathToUrl))
  const staticAssets = new Set(['/feed.xml', '/sitemap.xml'])
  for (const file of staticAssets) {
    const filePath = path.join(OUT_DIR, file.replace(/^\//, ''))
    if (existsSync(filePath)) {
      htmlPages.add(file)
    }
  }

  for (const { from, to } of migrationRedirects) {
    if (!hasBuiltPage(htmlPages, to)) {
      fail(`Redirect destination not found in build output: ${to} (from ${from})`)
    }
  }

  if (errors === 0) {
    ok('All redirect destinations exist in build output')
  }
} else {
  console.log('  ℹ Skipping build output check (run npm run build first for full validation)')
}

console.log(`\n  Redirect rules: ${migrationRedirects.length}`)
console.log(`  Preserved legacy URLs: ${preservedLegacyPaths.length}`)

if (errors > 0) {
  process.exit(1)
}

console.log('\nMigration redirect validation passed.\n')
