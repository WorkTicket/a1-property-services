/**
 * Copy a unique, topic-matched source photo to article-blog-{slug}.webp
 * for every blog post that does not already have a dedicated image.
 * Then generate responsive variants and merge them into the image manifest.
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('.')
const IMAGES = path.join(ROOT, 'public/images')
const OUTPUT_DIR = path.join(IMAGES, 'generated')
const MANIFEST_PATH = path.join(IMAGES, 'image-manifest.json')
const WIDTH = 1280
const HEIGHT = 720
const BREAKPOINTS = [480, 640, 768, 1024, 1280]
const FORMAT_CONFIG = {
  avif: { quality: 62, effort: 5, lossless: false },
  webp: { quality: 85, effort: 6 },
  jpeg: { quality: 85, mozjpeg: true },
}

/** One unique source file per missing slug. Do not reuse a source. */
const SOURCE_BY_SLUG = {
  'paver-patio-maintenance-iowa': 'patio-after-2.webp',
  'commercial-snow-removal-cedar-falls': 'service-content-snow-removal.webp',
  'landscape-design-cost-cedar-falls': 'service-landscape-design.webp',
  'hedge-pruning-tips-iowa': 'service-content-landscape-maintenance.webp',
  'iowa-native-plants-landscaping': 'landscape-after-5.webp',
  'diy-vs-professional-landscaping': 'service-content-landscape-installation.webp',
  'cedar-falls-landscaping-companies': 'content-landscaping-cedar-falls.webp',
  'waterloo-landscaping-services': 'city-content-intro-waterloo.webp',
  'cedar-falls-landscaping-timeline': 'city-content-intro-cedar-falls.webp',
  'drainage-solutions-wet-yard': 'service-drainage.webp',
  'best-paver-patterns-patios': 'patio-after-3.webp',
  'warranty-landscaping-work-iowa': 'service-preservation-restoration.webp',
  'seasonal-lawn-care-tips-iowa': 'mowing-after-3.webp',
  'cedar-falls-outdoor-spaces': 'service-outdoor-living.webp',
  'lawn-mowing-tips-iowa': 'mowing-after-1.webp',
  'block-wall-vs-poured-concrete': 'wall-after-2.webp',
  'landscape-planning-budget': 'service-residential-landscaping.webp',
  'boulder-landscaping-ideas': 'landscape-after-3.webp',
  'perennial-garden-design-iowa': 'landscape-after-2.webp',
  'iowa-landscaping-mistakes': 'city-content-why-hudson.webp',
  'paver-patio-vs-concrete-iowa': 'patio-after-1.webp',
  'tree-diseases-iowa-identification': 'service-tree-service.webp',
  'mulch-types-comparison-iowa': 'service-mulching.webp',
  'how-to-hire-landscaper-iowa': 'service-content-residential-landscaping.webp',
  'backyard-privacy-landscaping': 'city-content-why-waterloo.webp',
  'fall-landscaping-checklist-iowa': 'faqs-hero.webp',
  'lawn-weed-control-iowa': 'mowing-after-5.webp',
  'driveway-paver-installation': 'driveway-after-3.webp',
  'rain-garden-installation-iowa': 'service-content-drainage.webp',
  'lawn-repair-spring-iowa': 'service-sod-installation.webp',
  'landscaping-roi-iowa': 'landscape-after-1.webp',
  'cedar-falls-weather-landscaping': 'resources-hero.webp',
  'outdoor-fireplace-ideas': 'patio-after-4.webp',
  'lawn-disease-identification-iowa': 'service-content-lawn-care.webp',
  'step-retaining-walls-garden': 'wall-after-4.webp',
  'landscape-edging-ideas': 'landscape-after-4.webp',
  'retaining-wall-drainage-importance': 'wall-after-3.webp',
  'flowering-shrubs-iowa': 'service-shrub-installation.webp',
  'sprinkler-system-winterization': 'sprinklers.webp',
  'shade-garden-plants-iowa': 'service-content-shrub-installation.webp',
  'landscape-project-phases': 'service-content-excavation.webp',
  'natural-stone-walkway-installation': 'city-content-why-waverly.webp',
  'evergreen-trees-iowa-screening': 'service-tree-planting.webp',
  'pergola-design-installation': 'patio-after-5.webp',
  'landscaping-near-me-cedar-falls': 'city-content-why-cedar-falls.webp',
  'front-yard-landscaping-ideas': 'city-content-intro-jesup.webp',
  'backyard-patio-design-guide': 'content-paver-patio-cedar-falls.webp',
  'yard-drainage-cost-cedar-falls': 'service-grading.webp',
  'iowa-hardscape-materials-comparison': 'driveway-after-4.webp',
  'drought-tolerant-landscaping-iowa': 'service-rock-landscaping.webp',
  'concrete-retaining-wall-iowa': 'wall-after-5.webp',
  'iowa-landscaping-companies-comparison': 'about-crew.webp',
  'tree-stump-removal-cost': 'service-content-tree-service.webp',
  'winterizing-landscape-beds': 'service-content-mulching.webp',
  'brick-paver-patio-maintenance': 'paver-patio-hero.webp',
  'yard-composition-fertilization': 'service-content-hydroseeding.webp',
  'garden-walkway-lighting': 'city-content-why-la-porte-city.webp',
  'iowa-soil-types-landscaping': 'service-content-grading.webp',
  'cedar-falls-landscaping-faq': 'gallery-hero.webp',
}

async function generateBlurPlaceholder(input) {
  const tiny = await input
    .clone()
    .resize(20, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 20, effort: 0 })
    .toBuffer()
  return `data:image/webp;base64,${tiny.toString('base64')}`
}

async function processImage(filePath) {
  const parsed = path.parse(filePath)
  const sourceBuf = readFileSync(filePath)
  const input = sharp(sourceBuf).rotate()
  const meta = await input.metadata()
  const aspectRatio = meta.width / meta.height
  const breakpoints = BREAKPOINTS.filter((bp) => bp <= meta.width)
    .concat(meta.width)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => a - b)
  const variants = {}
  const blurPlaceholder = await generateBlurPlaceholder(input)

  for (const format of ['avif', 'webp', 'jpeg']) {
    variants[format] = {}
    for (const bp of breakpoints) {
      const height = Math.round(bp / aspectRatio)
      const filename = `${parsed.name}-${bp}.${format}`
      const outputPath = path.join(OUTPUT_DIR, filename)
      let pipeline = input.clone().resize(bp, height, {
        fit: 'outside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      })
      if (format === 'avif') pipeline = pipeline.avif(FORMAT_CONFIG.avif)
      else if (format === 'webp') pipeline = pipeline.webp(FORMAT_CONFIG.webp)
      else pipeline = pipeline.jpeg(FORMAT_CONFIG.jpeg)
      writeFileSync(outputPath, await pipeline.toBuffer())
      variants[format][bp] = `/images/generated/${filename}`
    }
  }

  return {
    originalPath: `/images/${parsed.base}`,
    altBase: parsed.name,
    width: meta.width,
    height: meta.height,
    aspectRatio,
    isHero: false,
    blurPlaceholder,
    variants,
  }
}

async function main() {
  const sources = Object.values(SOURCE_BY_SLUG)
  const unique = new Set(sources)
  if (unique.size !== sources.length) {
    throw new Error('SOURCE_BY_SLUG reuses a source file')
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })

  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    : {}

  let copied = 0
  let skipped = 0

  for (const [slug, source] of Object.entries(SOURCE_BY_SLUG)) {
    const destName = `article-blog-${slug}.webp`
    const destPath = path.join(IMAGES, destName)
    const sourcePath = path.join(IMAGES, source)

    if (!existsSync(sourcePath)) {
      throw new Error(`Missing source ${source} for ${slug}`)
    }

    if (existsSync(destPath)) {
      skipped += 1
      console.log(`  skip ${destName} (exists)`)
      continue
    }

    await sharp(sourcePath)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention', kernel: sharp.kernel.lanczos3 })
      .webp({ quality: 90, effort: 6 })
      .toFile(destPath)

    const result = await processImage(destPath)
    manifest[result.originalPath] = result
    copied += 1
    console.log(`  ${source} → ${destName}`)
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. copied=${copied} skipped=${skipped}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
