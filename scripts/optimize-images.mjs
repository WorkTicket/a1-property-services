import sharp from 'sharp'
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('public/images')
const OUTPUT_DIR = path.join(ROOT, 'generated')
const MANIFEST_PATH = path.join(ROOT, 'image-manifest.json')

const BREAKPOINTS = [480, 640, 768, 1024, 1280, 1536, 1920]
const BLUR_SIZE = 20

const FORMAT_CONFIG = {
  avif: { quality: 50, effort: 4, lossless: false },
  webp: { quality: 80, effort: 6 },
  jpeg: { quality: 82, mozjpeg: true },
}

const HERO_FORMAT_CONFIG = {
  avif: { quality: 38, effort: 4, lossless: false },
  webp: { quality: 70, effort: 6 },
  jpeg: { quality: 75, mozjpeg: true },
}

const GALLERY_FORMAT_CONFIG = {
  avif: { quality: 68, effort: 6, lossless: false },
  webp: { quality: 92, effort: 6 },
  jpeg: { quality: 90, mozjpeg: true },
}

const HERO_NAMES = new Set([
  'hero-background-image', 'contact-page-hero', 'paver-patio-hero',
  'about-hero', 'services-hero', 'gallery-hero', 'contact-hero-truck',
])

function isGalleryImage(name) {
  return /^(wall-|patio-)/.test(name) || name.includes('before') || name.includes('after')
}

function getFormatConfig(isHero, isGallery, format) {
  if (isHero) return HERO_FORMAT_CONFIG[format]
  if (isGallery) return GALLERY_FORMAT_CONFIG[format]
  return FORMAT_CONFIG[format]
}

function getBreakpoints(width) {
  return BREAKPOINTS.filter((bp) => bp <= width).concat(width).filter((v, i, a) => a.indexOf(v) === i)
}

async function generateBlurPlaceholder(input, meta) {
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
  const isHero = HERO_NAMES.has(name)
  const isGallery = isGalleryImage(name)
  const sourceBuf = readFileSync(filePath)
  const input = sharp(sourceBuf).rotate()
  const meta = await input.metadata()
  const originalWidth = meta.width
  const originalHeight = meta.height
  const aspectRatio = originalWidth / originalHeight
  const breakpoints = getBreakpoints(originalWidth)

  const variants = {}
  const blurPlaceholder = await generateBlurPlaceholder(input, meta)

  for (const format of ['avif', 'webp', 'jpeg']) {
    variants[format] = {}
    const formatConfig = getFormatConfig(isHero, isGallery, format)
    for (const bp of breakpoints) {
      const height = Math.round(bp / aspectRatio)
      const filename = `${name}-${bp}.${format}`
      const outputPath = path.join(OUTPUT_DIR, filename)

      let pipeline = input.clone().resize(bp, height, { fit: 'outside', withoutEnlargement: true })
      switch (format) {
        case 'avif':
          pipeline = pipeline.avif(formatConfig)
          break
        case 'webp':
          pipeline = pipeline.webp(formatConfig)
          break
        case 'jpeg':
          pipeline = pipeline.jpeg(formatConfig)
          break
      }
      const buf = await pipeline.toBuffer()
      writeFileSync(outputPath, buf)

      const relPath = `/images/generated/${filename}`
      variants[format][bp] = relPath
    }
  }

  return {
    originalPath: `/images/${parsed.base}`,
    altBase: name,
    width: originalWidth,
    height: originalHeight,
    aspectRatio,
    isHero,
    blurPlaceholder,
    variants,
  }
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const imageFiles = readdirSync(ROOT, { recursive: true })
    .filter((f) => typeof f === 'string' && /\.(webp|png|jpg|jpeg)$/i.test(f))
    .filter((f) => !f.startsWith('generated') && !f.startsWith('gallery-hq'))
    .map((f) => path.join(ROOT, f))

  console.log(`Processing ${imageFiles.length} images...`)

  const manifest = {}
  let processed = 0

  for (const f of imageFiles) {
    try {
      const result = await processImage(f)
      manifest[result.originalPath] = result
      processed++
      console.log(`  [${processed}/${imageFiles.length}] ${path.basename(f)} → ${Object.keys(result.variants.avif || {}).length} sizes`)
    } catch (e) {
      console.error(`  ✗ ${path.basename(f)}: ${e.message}`)
    }
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone! ${processed} images processed. Manifest written to ${MANIFEST_PATH}`)
}

main().catch(console.error)
