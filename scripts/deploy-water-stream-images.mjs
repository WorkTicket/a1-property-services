/**
 * Deploy generated Pond & Stream gallery pair.
 * Usage: node scripts/deploy-water-stream-images.mjs
 */
import sharp from 'sharp'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

const ASSETS = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets',
)
const OUT = path.resolve('public/images')
const TARGET = 2560

const FILES = [
  { src: 'water-before-3-new.png', dest: 'water-before-3.webp' },
  { src: 'water-feature-image-4-new.png', dest: 'water-feature-image-4.webp' },
]

for (const { src, dest } of FILES) {
  const input = path.join(ASSETS, src)
  if (!existsSync(input)) {
    console.error(`Missing asset: ${input}`)
    process.exit(1)
  }

  const webp = await sharp(readFileSync(input))
    .rotate()
    .resize(TARGET, TARGET, { fit: 'cover', position: 'centre', kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 94, effort: 6 })
    .toBuffer()

  writeFileSync(path.join(OUT, dest), webp)
  console.log(`Deployed ${dest} (${TARGET}x${TARGET}, ${Math.round(webp.length / 1024)}KB)`)
}

console.log('\nDone. Run: npm run build:images')
