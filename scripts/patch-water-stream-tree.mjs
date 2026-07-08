/**
 * Remove the patio-edge sapling from Pond & Stream before/after pair.
 *
 * Usage: node scripts/patch-water-stream-tree.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const IMAGES_DIR = path.resolve('public/images')
const AFTER = path.join(IMAGES_DIR, 'water-feature-image-4.webp')
const BEFORE = path.join(IMAGES_DIR, 'water-before-3.webp')

function rectFeatherMask(width, height, pad) {
  const p = Math.min(pad, Math.floor(Math.min(width, height) * 0.16))
  const svg = `<svg width="${width}" height="${height}">
    <rect x="${p}" y="${p}" width="${width - p * 2}" height="${height - p * 2}" fill="white"/>
  </svg>`
  return Buffer.from(svg)
}

async function clonePatch(imagePath, { zone, source, modulate }) {
  const input = readFileSync(imagePath)
  const patch = await sharp(input)
    .extract(source)
    .resize(zone.width, zone.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .modulate(modulate ?? {})
    .blur(0.8)
    .ensureAlpha()
    .composite([
      {
        input: await sharp(rectFeatherMask(zone.width, zone.height, zone.feather ?? 28))
          .resize(zone.width, zone.height)
          .png()
          .toBuffer(),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  const out = await sharp(input)
    .composite([{ input: patch, left: zone.left, top: zone.top, blend: 'over' }])
    .webp({ quality: 94, effort: 6 })
    .toBuffer()
  writeFileSync(imagePath, out)
  console.log(`  patched ${path.basename(imagePath)}`)
}

console.log('Patching after image...')
await clonePatch(AFTER, {
  zone: { left: 210, top: 1480, width: 150, height: 580, feather: 38 },
  source: { left: 580, top: 1850, width: 150, height: 580 },
  modulate: { saturation: 0.94, brightness: 0.96 },
})

console.log('Patching before image...')
await clonePatch(BEFORE, {
  zone: { left: 52, top: 1485, width: 110, height: 660, feather: 36 },
  source: { left: 360, top: 1840, width: 110, height: 660 },
})

console.log('\nDone. Run: npm run build:images')
