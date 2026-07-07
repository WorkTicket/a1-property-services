/**
 * Upscale before/after gallery sources to 2560px for crisp desktop sliders.
 * Run before build:images when gallery sources change.
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('public/images')
const TARGET_WIDTH = 2560
const WEBP_QUALITY = 94
const AVIF_QUALITY = 75

const GALLERY_PATTERN = /^(wall-(before|after)|patio-(before|after)|water-feature-image-)/

/** Multi-step upscale (~1.5× per pass) preserves detail better than a single jump. */
async function upscaleBuffer(buf, targetWidth) {
  let current = await sharp(buf).rotate().toBuffer()
  let meta = await sharp(current).metadata()
  let width = meta.width ?? 0

  while (width < targetWidth) {
    const nextWidth = Math.min(Math.round(width * 1.5), targetWidth)
    current = await sharp(current)
      .resize(nextWidth, nextWidth, {
        fit: 'inside',
        withoutEnlargement: false,
        kernel: sharp.kernel.lanczos3,
      })
      .toBuffer()
    meta = await sharp(current).metadata()
    width = meta.width ?? nextWidth
  }

  return sharp(current).sharpen({ sigma: 0.9, m1: 1.1, m2: 0.55 })
}

async function upscaleFile(filePath) {
  const name = path.parse(filePath).name
  if (!GALLERY_PATTERN.test(name)) return null
  if (!filePath.endsWith('.webp')) return null

  const buf = readFileSync(filePath)
  const meta = await sharp(buf).metadata()
  const width = meta.width ?? 0

  const webpPath = filePath
  const avifPath = webpPath.replace(/\.webp$/, '.avif')

  const pipeline = await upscaleBuffer(buf, TARGET_WIDTH)

  const webpBuf = await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer()
  const avifBuf = await pipeline.clone().avif({ quality: AVIF_QUALITY, effort: 6 }).toBuffer()

  writeFileSync(webpPath, webpBuf)
  writeFileSync(avifPath, avifBuf)

  const outMeta = await sharp(webpBuf).metadata()
  console.log(
    `  ${name}: ${width}px → ${outMeta.width}x${outMeta.height}px | webp ${Math.round(webpBuf.length / 1024)}KB | avif ${Math.round(avifBuf.length / 1024)}KB`,
  )

  return name
}

async function main() {
  const files = readdirSync(ROOT)
    .filter((f) => f.endsWith('.webp'))
    .map((f) => path.join(ROOT, f))

  console.log(`Upscaling gallery before/after sources to ${TARGET_WIDTH}px...\n`)

  let count = 0
  for (const f of files) {
    try {
      const result = await upscaleFile(f)
      if (result) count++
    } catch (e) {
      console.error(`  ✗ ${path.basename(f)}: ${e.message}`)
    }
  }

  console.log(`\nDone. ${count} gallery sources upscaled. Run npm run build:images next.`)
}

main().catch(console.error)
