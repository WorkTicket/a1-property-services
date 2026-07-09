/**
 * Rebuild responsive variants for city-content-intro-* and city-content-why-* images.
 *
 * Usage: node scripts/rebuild-city-content-variants.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('public/images')
const OUTPUT_DIR = path.join(ROOT, 'generated')
const MANIFEST_PATH = path.join(ROOT, 'image-manifest.json')

const BREAKPOINTS = [480, 640, 768, 1024, 1280, 1536, 1920, 2560]
const BLUR_SIZE = 20
const FORMAT_CONFIG = {
  avif: { quality: 62, effort: 5, lossless: false },
  webp: { quality: 85, effort: 6 },
  jpeg: { quality: 85, mozjpeg: true },
}

function getBreakpoints(width) {
  return BREAKPOINTS.filter((bp) => bp <= width).concat(width).filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b)
}

async function generateBlurPlaceholder(input) {
  const tiny = await input
    .clone()
    .resize(BLUR_SIZE, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 20, effort: 0 })
    .toBuffer()
  return `data:image/webp;base64,${tiny.toString('base64')}`
}

async function processImage(filePath) {
  const parsed = path.parse(filePath)
  const name = parsed.name
  const sourceBuf = readFileSync(filePath)
  const input = sharp(sourceBuf).rotate()
  const meta = await input.metadata()
  const aspectRatio = meta.width / meta.height
  const breakpoints = getBreakpoints(meta.width)
  const variants = {}
  const blurPlaceholder = await generateBlurPlaceholder(input)

  for (const format of ['avif', 'webp', 'jpeg']) {
    variants[format] = {}
    for (const bp of breakpoints) {
      const height = Math.round(bp / aspectRatio)
      const filename = `${name}-${bp}.${format}`
      const outputPath = path.join(OUTPUT_DIR, filename)
      let pipeline = input.clone().resize(bp, height, {
        fit: 'outside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      })
      switch (format) {
        case 'avif':
          pipeline = pipeline.avif(FORMAT_CONFIG.avif)
          break
        case 'webp':
          pipeline = pipeline.webp(FORMAT_CONFIG.webp)
          break
        case 'jpeg':
          pipeline = pipeline.jpeg(FORMAT_CONFIG.jpeg)
          break
      }
      writeFileSync(outputPath, await pipeline.toBuffer())
      variants[format][bp] = `/images/generated/${filename}`
    }
  }

  return {
    originalPath: `/images/${parsed.base}`,
    altBase: name,
    width: meta.width,
    height: meta.height,
    aspectRatio,
    isHero: false,
    blurPlaceholder,
    variants,
  }
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })

  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    : {}

  const targets = readdirSync(ROOT)
    .filter((f) => /^city-content-(intro|why)-.+\.webp$/i.test(f))
    .map((f) => path.join(ROOT, f))

  console.log(`Processing ${targets.length} city content images...`)

  for (const filePath of targets) {
    try {
      const result = await processImage(filePath)
      manifest[result.originalPath] = result
      console.log(`  ✓ ${path.basename(filePath)}`)
    } catch (e) {
      console.error(`  ✗ ${path.basename(filePath)}: ${e.message}`)
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. Manifest updated.`)
}

main().catch(console.error)
