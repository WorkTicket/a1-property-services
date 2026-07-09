/**
 * Install generated before PNGs into public/images as correctly-sized webp.
 * Usage: node scripts/install-generated-befores.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('.')
const IMAGES = path.join(ROOT, 'public/images')
const GENERATED = path.join(ROOT, '.tmp_generated_befores')
const manifest = JSON.parse(readFileSync(path.join(ROOT, '.tmp_refs/manifest.json'), 'utf8'))
const SKIP = new Set(['patio-before-1', 'patio-before-2'])

let ok = 0
let missing = 0
let skipped = 0

for (const [name, info] of Object.entries(manifest)) {
  if (SKIP.has(name)) {
    skipped++
    continue
  }
  const src = path.join(GENERATED, `${name}.png`)
  if (!existsSync(src)) {
    console.error(`  ✗ ${name}: ${path.relative(ROOT, src)} not found`)
    missing++
    continue
  }

  const webp = await sharp(readFileSync(src))
    .rotate()
    .resize(info.width, info.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 92, effort: 6 })
    .toBuffer()

  writeFileSync(path.join(IMAGES, `${name}.webp`), webp)
  console.log(`  ✓ ${name}.webp (${info.width}x${info.height})`)
  ok++
}

console.log(`\nInstalled ${ok}/${Object.keys(manifest).length - skipped} (${missing} missing, ${skipped} skipped).`)
if (ok > 0) console.log('Next: node scripts/rebuild-before-variants.mjs')
