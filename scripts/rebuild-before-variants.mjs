/**
 * Targeted rebuild of responsive variants for the naturalized "before" gallery
 * images only. Mirrors the gallery settings in scripts/optimize-images.mjs so
 * output is identical to a full `build:images`, but runs in seconds instead of
 * reprocessing all 137 site images.
 *
 * Run after scripts/naturalize-gallery-befores.mjs. The transform preserves
 * each image's dimensions, so manifest breakpoints/URLs are unchanged; this
 * just refreshes the generated pixel files and blur placeholders.
 *
 * Usage: node scripts/rebuild-before-variants.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('public/images')
const OUTPUT_DIR = path.join(ROOT, 'generated')
const MANIFEST_PATH = path.join(ROOT, 'image-manifest.json')

const BREAKPOINTS = [480, 640, 768, 1024, 1280, 1536, 1920, 2560]
const BLUR_SIZE = 20
const GALLERY_MAX_WIDTH = 2560
const GALLERY_FORMAT_CONFIG = {
  avif: { quality: 78, effort: 7, lossless: false },
  webp: { quality: 92, effort: 6 },
  jpeg: { quality: 90, mozjpeg: true },
}

const GROUPS = ['patio', 'driveway', 'mowing', 'landscape']
const NAMES = GROUPS.flatMap((g) => [1, 2, 3, 4, 5].map((n) => `${g}-before-${n}`))

function getBreakpoints(width) {
  const capped = BREAKPOINTS.filter((bp) => bp <= width)
  const withOriginal = [...capped, width].filter((v, i, a) => a.indexOf(v) === i)
  const galleryBreakpoints = BREAKPOINTS.filter((bp) => bp <= GALLERY_MAX_WIDTH)
  return [...new Set([...withOriginal, ...galleryBreakpoints])].sort((a, b) => a - b)
}

async function generateBlurPlaceholder(input) {
  const tiny = await input
    .clone()
    .resize(BLUR_SIZE, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 20, effort: 0 })
    .toBuffer()
  return `data:image/webp;base64,${tiny.toString('base64')}`
}

async function processImage(name) {
  const filePath = path.join(ROOT, `${name}.webp`)
  const input = sharp(readFileSync(filePath)).rotate()
  const meta = await input.metadata()
  const originalWidth = meta.width
  const aspectRatio = originalWidth / meta.height
  const breakpoints = getBreakpoints(originalWidth)

  const variants = {}
  const blurPlaceholder = await generateBlurPlaceholder(input)

  for (const format of ['avif', 'webp', 'jpeg']) {
    variants[format] = {}
    for (const bp of breakpoints) {
      const height = Math.round(bp / aspectRatio)
      const filename = `${name}-${bp}.${format}`
      const upscale = bp > originalWidth
      let pipeline = input.clone().resize(bp, height, {
        fit: 'outside',
        withoutEnlargement: !upscale,
        kernel: sharp.kernel.lanczos3,
      })
      pipeline = upscale
        ? pipeline.sharpen({ sigma: 0.6, m1: 0.8, m2: 0.4 })
        : pipeline.sharpen({ sigma: 0.35, m1: 0.5, m2: 0.25 })
      pipeline = pipeline[format](GALLERY_FORMAT_CONFIG[format])
      writeFileSync(path.join(OUTPUT_DIR, filename), await pipeline.toBuffer())
      variants[format][bp] = `/images/generated/${filename}`
    }
  }

  return {
    originalPath: `/images/${name}.webp`,
    altBase: name,
    width: Math.max(originalWidth, ...breakpoints),
    height: Math.round(Math.max(originalWidth, ...breakpoints) / aspectRatio),
    aspectRatio,
    isHero: false,
    blurPlaceholder,
    variants,
  }
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith('--only='))
  const only = onlyArg?.split('=')[1]
  const targets = only ? only.split(',').filter((n) => NAMES.includes(n)) : NAMES
  if (only && targets.length === 0) {
    console.error(`Unknown target(s) "${only}". Valid: ${NAMES.join(', ')}`)
    process.exit(1)
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })
  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    : {}

  let done = 0
  for (const name of targets) {
    const result = await processImage(name)
    manifest[result.originalPath] = result
    done++
    console.log(`  [${done}/${targets.length}] ${name} → ${Object.keys(result.variants.avif).length} sizes`)
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. Refreshed ${done} image${done === 1 ? '' : 's'} and updated manifest.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
