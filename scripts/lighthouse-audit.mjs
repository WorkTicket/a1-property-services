#!/usr/bin/env node
/**
 * Run Lighthouse performance audits against a local static build or live URL.
 *
 * Usage:
 *   node scripts/lighthouse-audit.mjs                    # localhost after build
 *   node scripts/lighthouse-audit.mjs --url https://preview.a1pslandscape.com
 *   node scripts/lighthouse-audit.mjs --mobile-only
 */

import { spawn, spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'out')
const REPORTS = path.join(ROOT, 'reports', 'lighthouse')

const args = process.argv.slice(2)
const liveUrl = args.includes('--url') ? args[args.indexOf('--url') + 1] : null
const mobileOnly = args.includes('--mobile-only')
const desktopOnly = args.includes('--desktop-only')

const PAGES = [
  '/',
  '/services',
  '/services/retaining-walls',
  '/gallery',
  '/contact',
  '/about',
  '/blog',
  '/learn',
  '/faqs',
  '/retaining-wall-in-cedar-falls',
  '/paver-patio-installation',
  '/cedar-falls-water-features',
  '/landscaping-services-in-cedar-falls',
  '/cedar-falls/landscape-installation',
  '/waterloo/lawn-care-mowing',
]

function run(cmd, cmdArgs, opts = {}) {
  const result = spawnSync(cmd, cmdArgs, {
    stdio: 'inherit',
    cwd: ROOT,
    shell: process.platform === 'win32',
    ...opts,
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function lighthouseUrl(base, page) {
  const root = base.replace(/\/$/, '')
  return page === '/' ? `${root}/` : `${root}${page}`
}

function runLighthouse(url, formFactor, outfile) {
  const lhArgs = [
    url,
    '--only-categories=performance',
    `--form-factor=${formFactor}`,
    `--screenEmulation.mobile=${formFactor === 'mobile'}`,
    '--throttling.cpuSlowdownMultiplier=4',
    '--output=json',
    `--output-path=${outfile}`,
    '--quiet',
    '--chrome-flags=--headless',
  ]

  if (formFactor === 'desktop') {
    lhArgs.push('--screenEmulation.mobile=false')
  }

  run('npx', ['lighthouse', ...lhArgs])
}

function summarize(reportPath) {
  const data = JSON.parse(readFileSync(reportPath, 'utf8'))
  const perf = data.categories?.performance?.score ?? 0
  const metrics = {
    fcp: data.audits['first-contentful-paint']?.displayValue,
    lcp: data.audits['largest-contentful-paint']?.displayValue,
    tbt: data.audits['total-blocking-time']?.displayValue,
    cls: data.audits['cumulative-layout-shift']?.displayValue,
    si: data.audits['speed-index']?.displayValue,
  }
  const lcpEl = data.audits['lcp-breakdown-insight']?.details?.items?.find((i) => i.type === 'node')
  return {
    score: Math.round(perf * 100),
    metrics,
    lcpElement: lcpEl?.selector ?? null,
  }
}

if (!liveUrl) {
  if (!existsSync(OUT)) {
    console.error('Missing out/ — run npm run build first')
    process.exit(1)
  }
}

mkdirSync(REPORTS, { recursive: true })

let baseUrl = liveUrl
let serveProc = null

if (!liveUrl) {
  const port = 3456
  baseUrl = `http://localhost:${port}`
  serveProc = spawn('npx', ['serve', 'out', '-l', String(port), '--no-clipboard'], {
    cwd: ROOT,
    shell: process.platform === 'win32',
    stdio: 'ignore',
    detached: true,
  })
  serveProc.unref()
  spawnSync(process.platform === 'win32' ? 'powershell' : 'sleep', process.platform === 'win32' ? ['-Command', 'Start-Sleep -Seconds 3'] : ['3'], { stdio: 'ignore' })
}

const forms = []
if (!desktopOnly) forms.push('mobile')
if (!mobileOnly) forms.push('desktop')

const results = []

for (const form of forms) {
  console.log(`\n=== ${form.toUpperCase()} ===\n`)
  for (const page of PAGES) {
    const url = lighthouseUrl(baseUrl, page)
    const slug = page === '/' ? 'home' : page.replace(/^\//, '').replace(/\//g, '_')
    const outfile = path.join(REPORTS, `${slug}-${form}.json`)

    process.stdout.write(`${form} ${page} ... `)
    try {
      runLighthouse(url, form, outfile)
      const summary = summarize(outfile)
      results.push({ page, form, ...summary })
      const mark = summary.score === 100 ? '✓' : summary.score >= 90 ? '~' : '✗'
      console.log(`${mark} ${summary.score}  LCP ${summary.metrics.lcp}  (${summary.lcpElement ?? 'n/a'})`)
    } catch {
      console.log('FAILED')
      results.push({ page, form, score: 0, error: true })
    }
  }
}

const summaryPath = path.join(REPORTS, 'summary.json')
writeFileSync(summaryPath, JSON.stringify(results, null, 2))

const failing = results.filter((r) => r.score < 100)
console.log(`\n=== SUMMARY ===`)
console.log(`Audited: ${results.length} runs`)
console.log(`Score 100: ${results.filter((r) => r.score === 100).length}`)
console.log(`Below 100: ${failing.length}`)
if (failing.length) {
  console.log('\nPages below 100:')
  for (const row of failing.sort((a, b) => a.score - b.score)) {
    console.log(`  ${row.form} ${row.page}: ${row.score} (LCP ${row.metrics?.lcp ?? '?'})`)
  }
  process.exit(1)
}

console.log(`\nAll pages scored 100. Reports in ${REPORTS}`)
