/**
 * Upscale a source photo to hero size: no AI, just Lanczos resize + light sharpen.
 * Usage: node scripts/process-hero.mjs [path-to-source-image]
 */
import sharp from 'sharp'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import path from 'path'

const defaultSrc = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/c__Users_Slay3r_AppData_Roaming_Cursor_User_workspaceStorage_98af54def8019a03ecdb0c968b92e0d6_images_Document-22daad4d-1fd7-4b8c-866a-5fc1354f7f37.png',
)
const src = path.resolve(process.argv[2] ?? defaultSrc)
const dest = path.resolve('public/images/hero-background-image.webp')
const HERO_WIDTH = 2560

if (!existsSync(src)) {
  console.error('Source image not found:', src)
  process.exit(1)
}

const input = sharp(src).rotate()
const sourceMeta = await input.metadata()
console.log(`Source: ${path.basename(src)} (${sourceMeta.width}x${sourceMeta.height})`)

const processed = await input
  .resize(HERO_WIDTH, null, {
    fit: 'inside',
    withoutEnlargement: false,
    kernel: sharp.kernel.lanczos3,
  })
  .sharpen({ sigma: 0.85, m1: 1.0, m2: 0.45 })
  .webp({ quality: 95, effort: 6, smartSubsample: false })
  .toBuffer()

writeFileSync(dest, processed)
const meta = await sharp(processed).metadata()
console.log(`Deployed ${meta.width}x${meta.height} (${Math.round(processed.length / 1024)}KB)`)

const OUTPUT_DIR = path.resolve('public/images/generated')
const MANIFEST_PATH = path.resolve('public/images/image-manifest.json')
const BREAKPOINTS = [480, 640, 768, 1024, 1280, 1536, 1920, 2560]
const HERO_FORMAT_CONFIG = {
  avif: { quality: 72, effort: 6, lossless: false },
  webp: { quality: 94, effort: 6 },
  jpeg: { quality: 92, mozjpeg: true },
}

const heroInput = sharp(processed).rotate()
const originalWidth = meta.width
const originalHeight = meta.height
const aspectRatio = originalWidth / originalHeight
const breakpoints = [...new Set([...BREAKPOINTS.filter((bp) => bp <= originalWidth), originalWidth])].sort(
  (a, b) => a - b,
)

const tiny = await heroInput
  .clone()
  .resize(20, null, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 20, effort: 0 })
  .toBuffer()
const blurPlaceholder = `data:image/webp;base64,${tiny.toString('base64')}`

const variants = { avif: {}, webp: {}, jpeg: {} }
for (const format of ['avif', 'webp', 'jpeg']) {
  for (const bp of breakpoints) {
    const height = Math.round(bp / aspectRatio)
    const filename = `hero-background-image-${bp}.${format}`
    const outputPath = path.join(OUTPUT_DIR, filename)
    const formatConfig = HERO_FORMAT_CONFIG[format]
    let pipeline = heroInput.clone().resize(bp, height, {
      fit: 'outside',
      withoutEnlargement: bp <= originalWidth,
      kernel: sharp.kernel.lanczos3,
    })
    if (bp > originalWidth) {
      pipeline = pipeline.sharpen({ sigma: 0.5, m1: 0.9, m2: 0.4 })
    } else if (bp >= 1280) {
      pipeline = pipeline.sharpen({ sigma: 0.35, m1: 0.6, m2: 0.25 })
    }
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
    writeFileSync(outputPath, await pipeline.toBuffer())
    variants[format][bp] = `/images/generated/${filename}`
  }
}

const manifest = existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) : {}
manifest['/images/hero-background-image.webp'] = {
  originalPath: '/images/hero-background-image.webp',
  altBase: 'hero-background-image',
  width: Math.max(originalWidth, ...breakpoints),
  height: Math.round(Math.max(originalWidth, ...breakpoints) / aspectRatio),
  aspectRatio,
  isHero: true,
  blurPlaceholder,
  variants,
}
writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
console.log(`Generated ${breakpoints.length} breakpoints × 3 formats`)
