import sharp from 'sharp'
import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('public/images')
const TARGETS = {
  hero: { maxW: 1600, q: 70, aq: 50 },
  regular: { maxW: 1200, q: 60, aq: 45 },
  icon: { maxW: 256, q: 65, aq: 50 },
}
const HERO = new Set(['hero-background-image', 'contact-page-hero', 'local-hero-image', 'paver-patio-hero'])
const ICON = new Set(['icon', 'full-logo'])

async function processFile(filePath) {
  const name = path.parse(path.basename(filePath)).name
  const isHero = HERO.has(name)
  const isIcon = ICON.has(name)
  const t = isIcon ? TARGETS.icon : isHero ? TARGETS.hero : TARGETS.regular
  const before = statSync(filePath).size

  const buf = readFileSync(filePath)
  const input = sharp(buf).rotate()
  const meta = await input.metadata()

  let pipeline = input
  if ((meta.width ?? 0) > t.maxW) {
    pipeline = pipeline.resize(t.maxW, null, { fit: 'inside', withoutEnlargement: true })
  }

  const webpBuf = await pipeline.clone().webp({ quality: t.q, effort: 6 }).toBuffer()
  const avifBuf = await pipeline.clone().avif({ quality: t.aq, effort: 4 }).toBuffer()

  if (webpBuf.length < before) {
    writeFileSync(filePath, webpBuf)
  }
  const avifPath = filePath.replace(/\.webp$/, '.avif')
  writeFileSync(avifPath, avifBuf)

  const wpct = Math.round((1 - webpBuf.length / before) * 100)
  const apct = Math.round((1 - avifBuf.length / before) * 100)
  return { file: path.basename(filePath), before, webp: webpBuf.length, avif: avifBuf.length, wpct, apct }
}

const files = readdirSync(ROOT, { recursive: true })
  .filter(f => typeof f === 'string' && f.endsWith('.webp'))
  .map(f => path.join(ROOT, f))

let totalBefore = 0, totalWebp = 0, totalAvif = 0

for (const f of files) {
  try {
    const r = await processFile(f)
    totalBefore += r.before; totalWebp += r.webp; totalAvif += r.avif
    console.log(`  ${r.file}: ${Math.round(r.before/1024)}KB → webp ${Math.round(r.webp/1024)}KB (${r.wpct}%) | avif ${Math.round(r.avif/1024)}KB (${r.apct}%)`)
  } catch (e) { console.error(`  ✗ ${path.basename(f)}: ${e.message}`) }
}

if (totalBefore > 0) {
  console.log(`\nTotal: ${Math.round(totalBefore/1024)}KB → WebP ${Math.round(totalWebp/1024)}KB (${Math.round((1-totalWebp/totalBefore)*100)}%) | AVIF ${Math.round(totalAvif/1024)}KB (${Math.round((1-totalAvif/totalBefore)*100)}%)`)
} else { console.log('\nNo files processed') }
