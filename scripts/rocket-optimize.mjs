#!/usr/bin/env node
/**
 * WP Rocket-style post-export pass:
 * - Inline leftover render-blocking CSS (Next already inlines when inlineCss is on)
 * - Move @font-face woff2 files off the critical path
 * - Flatten Windows RSC files so `/privacy/__next.privacy.__PAGE__.txt` 200s
 * - Copy serve.json into out/ so local audits can apply cache headers
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'out')
const FONT_CSS_HREF = '/_next/static/css/rocket-fonts.css'
const FONT_CSS_ABS = path.join(OUT, FONT_CSS_HREF.replace(/^\//, ''))

if (!existsSync(OUT)) {
  console.error('Missing out/ — run the Next.js build first')
  process.exit(1)
}

const cssCache = new Map()
const fontFaces = new Set()

function walk(dir, onEntry) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    onEntry(full, entry)
    if (entry.isDirectory()) walk(full, onEntry)
  }
}

function cssFromHref(href) {
  const filePath = href.split('?')[0]
  if (!filePath.startsWith('/_next/static/css/') || !filePath.endsWith('.css')) return null
  if (cssCache.has(filePath)) return cssCache.get(filePath)
  const abs = path.join(OUT, filePath.replace(/^\//, ''))
  if (!existsSync(abs)) return null
  const css = readFileSync(abs, 'utf8').trim()
  cssCache.set(filePath, css)
  return css
}

const STYLESHEET_RE = /<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi
const FONT_FACE_RE = /@font-face\{[^{}]*\}/g

function inlineStylesheets(html) {
  return html.replace(STYLESHEET_RE, (tag) => {
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i)
    if (!hrefMatch) return tag
    const css = cssFromHref(hrefMatch[1])
    if (!css) return tag
    return `<style data-rocket-inline>${css}</style>`
  })
}

function extractWebFonts(html) {
  return html.replace(FONT_FACE_RE, (rule) => {
    if (!/url\(/i.test(rule) || !/format\(["']?woff2/i.test(rule)) return rule
    fontFaces.add(rule)
    return ''
  })
}

function flattenRscFiles() {
  let copied = 0
  walk(OUT, (full, entry) => {
    if (!entry.isDirectory() || !entry.name.startsWith('__next.')) return
    const parent = path.dirname(full)
    for (const child of readdirSync(full, { withFileTypes: true })) {
      if (!child.isFile() || !child.name.endsWith('.txt')) continue
      const dotted = path.join(parent, `${entry.name}.${child.name}`)
      if (existsSync(dotted)) continue
      copyFileSync(path.join(full, child.name), dotted)
      copied++
    }
  })
  return copied
}

let htmlChanged = 0
let htmlCount = 0
walk(OUT, (full, entry) => {
  if (!entry.isFile() || !entry.name.endsWith('.html')) return
  htmlCount++
  const original = readFileSync(full, 'utf8')
  const next = extractWebFonts(inlineStylesheets(original))
  if (next !== original) {
    writeFileSync(full, next)
    htmlChanged++
  }
})

if (fontFaces.size > 0) {
  mkdirSync(path.dirname(FONT_CSS_ABS), { recursive: true })
  writeFileSync(FONT_CSS_ABS, [...fontFaces].join(''))
}

const serveSrc = path.join(ROOT, 'serve.json')
if (existsSync(serveSrc)) {
  copyFileSync(serveSrc, path.join(OUT, 'serve.json'))
}

const rscCopied = flattenRscFiles()
console.log(
  `rocket-optimize: updated ${htmlChanged}/${htmlCount} HTML files; extracted ${fontFaces.size} @font-face rules; flattened ${rscCopied} RSC payloads`,
)
