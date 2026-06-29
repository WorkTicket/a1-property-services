import { readFileSync, existsSync, readdirSync } from 'fs'
import path from 'path'

const OUT_DIR = path.resolve('out')
const SITE_URL = 'https://a1pslandscape.com'

let errors = 0
let warnings = 0

function error(msg) { console.error(`  ✗ ${msg}`); errors++ }
function warn(msg) { console.warn(`  ⚠ ${msg}`); warnings++ }
function ok(msg) { console.log(`  ✓ ${msg}`) }

function extractTitle(content) {
  const match = content.match(/<title>([^<]+)<\/title>/i)
  return match?.[1] || null
}

function extractH1s(content) {
  const h1s = content.match(/<h1[^>]*>([^<]+)<\/h1>/gi)
  return h1s?.map((h) => h.replace(/<[^>]+>/g, '').trim()).filter(Boolean) || []
}

function extractMetaDescription(content) {
  const match = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i)
  return match?.[1] || null
}

function extractCanonical(content) {
  const match = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
  return match?.[1] || null
}

function extractLinks(content) {
  const links = new Set()
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
  let match
  while ((match = regex.exec(content)) !== null) {
    const href = match[1]
    if (href && !href.startsWith('#') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('http') && !href.startsWith('data:')) {
      links.add(href)
    }
  }
  return [...links]
}

function extractStructuredData(content) {
  const matches = content.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi)
  const schemas = []
  for (const m of matches) {
    try { schemas.push(JSON.parse(m[1])) } catch {}
  }
  return schemas
}

function pathToUrl(filePath) {
  let relative = path.relative(OUT_DIR, filePath).replace(/\\/g, '/')
  if (relative === 'index.html') return '/'
  if (relative.endsWith('/index.html')) return '/' + relative.slice(0, -10)
  if (relative.endsWith('.html')) return '/' + relative.slice(0, -5)
  return '/' + relative
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error('Build output directory not found. Run `npm run build` first.')
    process.exit(1)
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
  const htmlFiles = findHtml(OUT_DIR).map((f) => ({ url: pathToUrl(f), filePath: f }))

  console.log(`\nValidating ${htmlFiles.length} pages...\n`)

  const titles = {}
  const descriptions = {}
  const allInternalLinks = {}
  const allPages = new Set(htmlFiles.map((f) => f.url))

  for (const { url: urlPath, filePath } of htmlFiles) {
    const content = readFileSync(filePath, 'utf-8')
    const title = extractTitle(content)
    const h1s = extractH1s(content)
    const canonical = extractCanonical(content)
    const links = extractLinks(content)
    const schemas = extractStructuredData(content)
    const desc = extractMetaDescription(content)

    // Title checks
    if (!title) {
      error(`${urlPath}: Missing <title>`)
    } else {
      titles[urlPath] = title
      if (title.length > 85) {
        warn(`${urlPath}: Title too long (${title.length} chars): "${title}"`)
      }
      if (title.length < 10) {
        warn(`${urlPath}: Title too short (${title.length} chars)`)
      }
    }

    // Description checks
    if (!desc) {
      error(`${urlPath}: Missing meta description`)
    } else {
      descriptions[urlPath] = desc
      if (desc.length > 160) {
        warn(`${urlPath}: Description too long (${desc.length} chars)`)
      }
      if (desc.length < 50) {
        warn(`${urlPath}: Description too short (${desc.length} chars)`)
      }
    }

    // H1 checks
    if (h1s.length === 0) {
      error(`${urlPath}: Missing <h1>`)
    } else if (h1s.length > 1) {
      warn(`${urlPath}: Multiple <h1> tags (${h1s.length}): ${h1s.join(', ')}`)
    }

    // Canonical check
    if (!canonical) {
      warn(`${urlPath}: Missing canonical URL`)
    }

    // Structured data check
    if (schemas.length === 0) {
      warn(`${urlPath}: No JSON-LD structured data`)
    }

    // Collect internal links
    allInternalLinks[urlPath] = links
  }

  // Duplicate titles
  const titleEntries = Object.entries(titles)
  const titleCounts = {}
  for (const [, t] of titleEntries) {
    titleCounts[t] = (titleCounts[t] || 0) + 1
  }
  for (const [t, count] of Object.entries(titleCounts)) {
    if (count > 1) {
      const pages = titleEntries.filter(([, v]) => v === t).map(([k]) => k)
      warn(`Duplicate title "${t}" on: ${pages.join(', ')}`)
    }
  }

  // Duplicate descriptions
  const descEntries = Object.entries(descriptions)
  const descCounts = {}
  for (const [, d] of descEntries) {
    descCounts[d] = (descCounts[d] || 0) + 1
  }
  for (const [d, count] of Object.entries(descCounts)) {
    if (count > 1) {
      const pages = descEntries.filter(([, v]) => v === d).map(([k]) => k)
      warn(`Duplicate description on: ${pages.join(', ')}`)
    }
  }

  // Build set of all page paths (without trailing slash)
  const allPagePaths = new Set(Array.from(allPages).map((p) => p.replace(/\/$/, '') || '/'))

  // Broken internal links
  let brokenLinks = 0
  for (const [source, links] of Object.entries(allInternalLinks)) {
    for (const link of links) {
      let normalized = link.split('#')[0].replace(/\/$/, '')
      if (normalized === '') normalized = '/'
      if (normalized.startsWith('/') && !allPagePaths.has(normalized) && !normalized.startsWith('/images/') && !normalized.startsWith('/_next/')) {
        error(`Broken link on ${source}: ${link}`)
        brokenLinks++
      }
    }
  }

  // Orphan pages
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
  for (const page of allPages) {
    const normalized = page.replace(/\/$/, '') || '/'
    if (!linkedPages.has(normalized) && normalized !== '/') {
      const dir = path.dirname(normalized)
      if (dir !== '/' && !linkedPages.has(dir)) {
        warn(`Orphan page: ${page}`)
      }
    }
  }

  console.log(`\n--- Validation Complete ---`)
  console.log(`  Pages checked: ${htmlFiles.length}`)
  console.log(`  Errors: ${errors}`)
  console.log(`  Warnings: ${warnings}`)

  process.exit(errors > 0 ? 1 : 0)
}

main().catch(console.error)
