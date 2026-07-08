/**
 * Process a single gallery source through the HQ enhancement pipeline.
 * Usage: node scripts/enhance-gallery-photos.mjs wall-before-1 /path/to/source.png
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import path from 'path'

const ASSETS = path.resolve(
  'C:/Users/Slay3r/.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets',
)
const OUT_DIR = path.resolve('public/images')
const GENERATED = path.join(OUT_DIR, 'generated')
const MANIFEST_PATH = path.join(OUT_DIR, 'image-manifest.json')
const TARGET_WIDTH = 2560
const WEBP_QUALITY = 94
const AVIF_QUALITY = 75
const BREAKPOINTS = [480, 640, 768, 1024, 1280, 1536, 1920, 2560]
const GALLERY_FORMAT = {
  avif: { quality: 78, effort: 7, lossless: false },
  webp: { quality: 92, effort: 6 },
  jpeg: { quality: 90, mozjpeg: true },
}

async function multiStepUpscale(input, targetWidth) {
  let current = await input.clone().toBuffer()
  let meta = await sharp(current).metadata()
  let width = meta.width ?? 0

  while (width < targetWidth) {
    const nextWidth = Math.min(Math.round(width * 1.35), targetWidth)
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

  return sharp(current)
}

async function enhancePipeline(input, { cropBottomFocus = false, natural = false } = {}) {
  let pipeline = natural
    ? input.rotate().modulate({ saturation: 0.96, brightness: 0.98 })
    : input.rotate().modulate({ saturation: 1.04, brightness: 1.02 }).normalize()

  if (cropBottomFocus) {
    const meta = await pipeline.metadata()
    const w = meta.width ?? 0
    const h = meta.height ?? 0
    const extractH = Math.min(h - Math.round(h * 0.27), Math.round(w * (3 / 4)))
    const top = h - extractH
    pipeline = sharp(await pipeline.extract({ left: 0, top, width: w, height: extractH }).toBuffer())
  }

  pipeline = await multiStepUpscale(pipeline, TARGET_WIDTH)
  return natural
    ? pipeline.sharpen({ sigma: 0.35, m1: 0.5, m2: 0.25 })
    : pipeline.sharpen({ sigma: 0.75, m1: 1.0, m2: 0.45 })
}

async function writeSources(name, pipeline) {
  const webpPath = path.join(OUT_DIR, `${name}.webp`)
  const avifPath = path.join(OUT_DIR, `${name}.avif`)
  const webpBuf = await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer()
  const avifBuf = await pipeline.clone().avif({ quality: AVIF_QUALITY, effort: 6 }).toBuffer()
  writeFileSync(webpPath, webpBuf)
  writeFileSync(avifPath, avifBuf)
  const meta = await sharp(webpBuf).metadata()
  console.log(`  ${name}: ${meta.width}x${meta.height} | webp ${Math.round(webpBuf.length / 1024)}KB`)
  return { webpPath, meta }
}

async function generateVariants(name, sourcePath) {
  const input = sharp(readFileSync(sourcePath)).rotate()
  const meta = await input.metadata()
  const aspectRatio = (meta.width ?? 1) / (meta.height ?? 1)
  const breakpoints = [...new Set([...BREAKPOINTS.filter((bp) => bp <= (meta.width ?? 0)), meta.width])].sort(
    (a, b) => a - b,
  )

  const variants = { avif: {}, webp: {}, jpeg: {} }
  for (const format of ['avif', 'webp', 'jpeg']) {
    for (const bp of breakpoints) {
      const height = Math.round(bp / aspectRatio)
      const filename = `${name}-${bp}.${format}`
      let pipeline = input
        .clone()
        .resize(bp, height, { fit: 'outside', withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 0.35, m1: 0.5, m2: 0.25 })

      pipeline =
        format === 'avif'
          ? pipeline.avif(GALLERY_FORMAT.avif)
          : format === 'webp'
            ? pipeline.webp(GALLERY_FORMAT.webp)
            : pipeline.jpeg(GALLERY_FORMAT.jpeg)

      writeFileSync(path.join(GENERATED, filename), await pipeline.toBuffer())
      variants[format][bp] = `/images/generated/${filename}`
    }
  }

  return {
    originalPath: `/images/${name}.webp`,
    altBase: name,
    width: Math.max(meta.width ?? 0, ...breakpoints),
    height: Math.round(Math.max(meta.width ?? 0, ...breakpoints) / aspectRatio),
    aspectRatio,
    isHero: false,
    blurPlaceholder: '',
    variants,
  }
}

function findAsset(prefix) {
  const files = readdirSync(ASSETS)
  const match = files.find((f) => f.includes(prefix))
  if (!match) throw new Error(`Missing asset for ${prefix}`)
  return path.join(ASSETS, match)
}

const defaultJobs = [
  { name: 'wall-before-1', src: findAsset('wall_before1'), cropBottomFocus: false },
  { name: 'patio-after-1', src: path.join(ASSETS, 'patio-after-1.png'), cropBottomFocus: true },
]

const [nameArg, srcArg, ...flags] = process.argv.slice(2)
const natural = flags.includes('--natural')
const jobs = nameArg && srcArg
  ? [{ name: nameArg, src: path.resolve(srcArg), cropBottomFocus: false, natural }]
  : defaultJobs

if (!existsSync(GENERATED)) mkdirSync(GENERATED, { recursive: true })

console.log('Enhancing gallery photos...\n')
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))

for (const job of jobs) {
  const input = sharp(readFileSync(job.src))
  const srcMeta = await input.metadata()
  console.log(`${job.name}: source ${srcMeta.width}x${srcMeta.height} (${path.basename(job.src)})`)

  const pipeline = await enhancePipeline(input, {
    cropBottomFocus: job.cropBottomFocus,
    natural: job.natural,
  })
  const { webpPath } = await writeSources(job.name, pipeline)
  manifest[`/images/${job.name}.webp`] = await generateVariants(job.name, webpPath)
}

writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
console.log('\nDone.')
