/**
 * Upscale low-res before/after gallery sources (500px) to 1280px for crisp sliders.
 * Run before build:images when gallery sources change.
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('public/images')
const TARGET_WIDTH = 1280
const WEBP_QUALITY = 94

const GALLERY_PATTERN = /^(wall-(before|after)|patio-(before|after))/

async function upscaleFile(filePath) {
  const name = path.parse(filePath).name
  if (!GALLERY_PATTERN.test(name)) return null

  const buf = readFileSync(filePath)
  const meta = await sharp(buf).metadata()
  const width = meta.width ?? 0

  if (width >= TARGET_WIDTH) {
    console.log(`  skip ${name} (${width}px already >= ${TARGET_WIDTH})`)
    return null
  }

  const webpPath = filePath.endsWith('.webp') ? filePath : filePath.replace(/\.[^.]+$/, '.webp')
  const avifPath = webpPath.replace(/\.webp$/, '.avif')

  const pipeline = sharp(buf)
    .rotate()
    .resize(TARGET_WIDTH, TARGET_WIDTH, {
      fit: 'inside',
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.6, m1: 0.5, m2: 0.3 })

  const webpBuf = await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer()
  const avifBuf = await pipeline.clone().avif({ quality: 72, effort: 6 }).toBuffer()

  writeFileSync(webpPath, webpBuf)
  writeFileSync(avifPath, avifBuf)

  const outMeta = await sharp(webpBuf).metadata()
  console.log(
    `  ${name}: ${width}px → ${outMeta.width}px | webp ${Math.round(webpBuf.length / 1024)}KB | avif ${Math.round(avifBuf.length / 1024)}KB`,
  )

  return name
}

async function main() {
  const files = readdirSync(ROOT)
    .filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f))
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
