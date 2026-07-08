import { readFileSync, existsSync } from 'fs'
import path from 'path'

const OUT = path.resolve('out')
const pages = [
  'retaining-wall-in-cedar-falls',
  'paver-patio-installation',
  'cedar-falls-water-features',
  'landscaping-services-in-cedar-falls',
]

function extract(html, re) {
  const m = html.match(re)
  return m?.[1] ?? null
}

console.log('=== RANKING PAGE SEO AUDIT (built HTML) ===\n')
let pass = 0
let fail = 0

for (const p of pages) {
  const file = path.join(OUT, `${p}.html`)
  const expectedCanonical = `https://a1pslandscape.com/${p}`
  if (!existsSync(file)) {
    console.log(`FAIL ${p}: HTML file missing`)
    fail++
    continue
  }
  const html = readFileSync(file, 'utf8')
  const title = extract(html, /<title>([^<]+)<\/title>/i)
  const canonical = extract(html, /rel="canonical" href="([^"]+)"/i)
  const desc = extract(html, /name="description" content="([^"]+)"/i)
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim(),
  )
  const jsonld = (html.match(/application\/ld\+json/gi) ?? []).length

  const checks = [
    ['title', !!title, title],
    ['canonical', canonical === expectedCanonical, canonical],
    ['description', !!desc && desc.length >= 50, desc?.slice(0, 90)],
    ['h1', h1s.length === 1, h1s[0]?.slice(0, 90)],
    ['json-ld', jsonld >= 1, `${jsonld} block(s)`],
  ]

  console.log(`--- /${p} ---`)
  for (const [name, ok, val] of checks) {
    console.log(`  ${ok ? 'PASS' : 'FAIL'} ${name}: ${val}`)
    ok ? pass++ : fail++
  }
  console.log()
}

const sm = readFileSync(path.join(OUT, 'sitemap.xml'), 'utf8')
console.log('=== SITEMAP ===')
for (const p of pages) {
  const ok = sm.includes(`https://a1pslandscape.com/${p}`)
  console.log(`  ${ok ? 'PASS' : 'FAIL'} ${p}`)
  ok ? pass++ : fail++
}

const robots = readFileSync(path.join(OUT, 'robots.txt'), 'utf8')
console.log('\n=== ROBOTS.TXT ===')
console.log(robots.trim())
console.log(`\n  ${robots.includes('Sitemap: https://a1pslandscape.com/sitemap.xml') ? 'PASS' : 'FAIL'} sitemap reference`)

const serviceCanonicals = [
  ['services/retaining-walls', 'https://a1pslandscape.com/retaining-wall-in-cedar-falls'],
  ['services/paver-patio', 'https://a1pslandscape.com/paver-patio-installation'],
  ['services/ponds-water-features', 'https://a1pslandscape.com/cedar-falls-water-features'],
]
console.log('\n=== SERVICE PAGE CANONICALS (legacy ranking URLs) ===')
for (const [slug, expected] of serviceCanonicals) {
  const file = path.join(OUT, `${slug}.html`)
  const html = readFileSync(file, 'utf8')
  const canonical = extract(html, /rel="canonical" href="([^"]+)"/i)
  const ok = canonical === expected
  console.log(`  ${ok ? 'PASS' : 'FAIL'} /${slug} -> ${canonical}`)
  ok ? pass++ : fail++
}

console.log(`\n=== SUMMARY: ${pass} passed, ${fail} failed ===`)
process.exit(fail > 0 ? 1 : 0)
