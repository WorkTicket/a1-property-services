/**
 * Rebuild every article-blog-*.webp from real job photos and real stock
 * photography. Overwrites the Flux-generated catalog shots.
 *
 * Usage: node scripts/rebuild-blog-images-real.mjs
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

/** slug -> { file, position }. file|position must be unique. */
const SOURCE_BY_SLUG = {
  'retaining-wall-cost-cedar-falls': { file: 'wall-after-4.webp', position: 'attention' },
  'tree-removal-cedar-falls': { file: 'service-tree-service.webp', position: 'attention' },
  'paver-patio-installation-cedar-falls': { file: 'patio-after-2.webp', position: 'attention' },
  'lawn-care-cedar-falls-iowa': { file: 'mowing-after-1.webp', position: 'attention' },
  'pond-waterfall-installation-cedar-falls': { file: 'water-pond-after.webp', position: 'attention' },
  'paver-driveway-cost-cedar-falls': { file: 'driveway-after-2.webp', position: 'attention' },
  'retaining-wall-benefits-cedar-falls': { file: 'wall-after-2.webp', position: 'attention' },
  'paver-patio-planning-guide': { file: 'paver-patio-hero.webp', position: 'attention' },
  'spring-landscape-maintenance-checklist': { file: 'landscape-after-4.webp', position: 'attention' },
  'best-retaining-wall-materials-iowa': { file: 'wall-after-3.webp', position: 'attention' },
  'landscaping-costs-cedar-falls': { file: 'content-landscaping-cedar-falls.webp', position: 'attention' },
  'patio-cost-guide-cedar-falls': { file: 'content-paver-patio-cedar-falls.webp', position: 'attention' },
  'spring-landscaping-checklist-iowa': { file: 'mowing-after-2.webp', position: 'attention' },
  'how-long-does-mulch-last': { file: 'landscape-after-1.webp', position: 'attention' },
  'best-plants-for-iowa-landscapes': { file: 'landscape-after-2.webp', position: 'attention' },
  'common-drainage-problems-iowa': { file: 'service-drainage.webp', position: 'attention' },
  'french-drain-cost-iowa': { file: 'service-drainage.webp', position: 'south' },
  'yard-grading-guide-iowa': { file: 'service-grading.webp', position: 'attention' },
  'retaining-wall-permit-guide-cedar-falls': { file: 'wall-after-1.webp', position: 'attention' },
  'outdoor-living-trends-2025': { file: 'gallery-hero.webp', position: 'attention' },
  'winter-landscaping-tips-iowa': { file: 'service-snow-removal.webp', position: 'attention' },
  'concrete-vs-block-retaining-walls': { file: 'retaining-wall.webp', position: 'attention' },
  'natural-stone-vs-paver-patio': { file: 'patio-after-1.webp', position: 'attention' },
  'lawn-aeration-importance-iowa': { file: 'mowing-after-3.webp', position: 'attention' },
  'fire-pit-ideas-cedar-falls': { file: 'patio-after-4.webp', position: 'attention' },
  'commercial-landscaping-benefits': { file: 'service-commercial-landscaping.webp', position: 'attention' },
  'mulching-benefits-landscape-beds': { file: 'service-mulching.webp', position: 'attention' },
  'hydroseeding-vs-sod-cedar-falls': { file: 'sprinklers.webp', position: 'attention' },
  'tree-planting-guide-cedar-falls': { file: 'service-tree-planting.webp', position: 'attention' },
  'shrub-installation-foundation-plantings': { file: 'service-shrub-installation.webp', position: 'attention' },
  'rock-landscaping-ideas-iowa': { file: 'landscape-after-3.webp', position: 'attention' },
  'sod-installation-tips-iowa': { file: 'service-sod-installation.webp', position: 'attention' },
  'landscape-design-principles-iowa': { file: 'service-landscape-design.webp', position: 'attention' },
  'grading-drainage-importance': { file: 'service-excavation.webp', position: 'attention' },
  'outdoor-kitchen-ideas-cedar-falls': { file: 'service-outdoor-living.webp', position: 'attention' },
  'snow-removal-contracts-cedar-falls': { file: 'service-snow-removal.webp', position: 'south' },
  'perennial-flowers-iowa-gardens': { file: 'landscape-after-5.webp', position: 'attention' },
  'landscape-lighting-ideas': { file: 'about-primary.webp', position: 'attention' },
  'lawn-fertilization-schedule-iowa': { file: 'mowing-after-5.webp', position: 'attention' },
  'water-feature-maintenance-iowa': { file: 'water-feature-image-3.webp', position: 'attention' },
  'paver-patio-maintenance-iowa': { file: 'patio-after-2.webp', position: 'south' },
  'commercial-snow-removal-cedar-falls': { file: 'contact-hero-truck.png', position: 'attention' },
  'landscape-design-cost-cedar-falls': { file: 'about-hero.webp', position: 'attention' },
  'hedge-pruning-tips-iowa': { file: 'landscape-after-1.webp', position: 'south' },
  'iowa-native-plants-landscaping': { file: 'landscape-after-5.webp', position: 'south' },
  'diy-vs-professional-landscaping': { file: 'content-landscape-installation.webp', position: 'attention' },
  'cedar-falls-landscaping-companies': { file: 'hero-background-image.webp', position: 'attention' },
  'waterloo-landscaping-services': { file: 'city-intro.webp', position: 'attention' },
  'cedar-falls-landscaping-timeline': { file: 'local-hero-image.webp', position: 'attention' },
  'drainage-solutions-wet-yard': { file: 'water-before-2.webp', position: 'attention' },
  'best-paver-patterns-patios': { file: 'patio-after-3.webp', position: 'attention' },
  'warranty-landscaping-work-iowa': { file: 'service-preservation-restoration.webp', position: 'attention' },
  'seasonal-lawn-care-tips-iowa': { file: 'mowing-after-4.webp', position: 'attention' },
  'cedar-falls-outdoor-spaces': { file: 'patio-after-5.webp', position: 'attention' },
  'lawn-mowing-tips-iowa': { file: 'mowing-after-2.webp', position: 'south' },
  'block-wall-vs-poured-concrete': { file: 'wall-after-5.webp', position: 'attention' },
  'landscape-planning-budget': { file: 'service-residential-landscaping.webp', position: 'attention' },
  'boulder-landscaping-ideas': { file: 'landscape-after-3.webp', position: 'south' },
  'perennial-garden-design-iowa': { file: 'landscape-after-2.webp', position: 'south' },
  'iowa-landscaping-mistakes': { file: 'wall-before-2.webp', position: 'attention' },
  'paver-patio-vs-concrete-iowa': { file: 'patio-after-1.webp', position: 'south' },
  'tree-diseases-iowa-identification': { file: 'service-tree-service.webp', position: 'south' },
  'mulch-types-comparison-iowa': { file: 'landscape-after-1.webp', position: 'centre' },
  'how-to-hire-landscaper-iowa': { file: 'about-crew.webp', position: 'attention' },
  'backyard-privacy-landscaping': { file: 'landscape-after-5.webp', position: 'north' },
  'fall-landscaping-checklist-iowa': { file: 'landscape-after-2.webp', position: 'north' },
  'lawn-weed-control-iowa': { file: 'mowing-after-5.webp', position: 'south' },
  'driveway-paver-installation': { file: 'driveway-after-3.webp', position: 'attention' },
  'rain-garden-installation-iowa': { file: 'water-pond-before.webp', position: 'attention' },
  'lawn-repair-spring-iowa': { file: 'service-lawn-care.webp', position: 'attention' },
  'landscaping-roi-iowa': { file: 'services-hero.webp', position: 'attention' },
  'cedar-falls-weather-landscaping': { file: 'hero-background-image.webp', position: 'south' },
  'outdoor-fireplace-ideas': { file: 'patio-after-3.webp', position: 'south' },
  'lawn-disease-identification-iowa': { file: 'mowing-after-3.webp', position: 'south' },
  'step-retaining-walls-garden': { file: 'wall-after-4.webp', position: 'south' },
  'landscape-edging-ideas': { file: 'landscape-after-4.webp', position: 'south' },
  'retaining-wall-drainage-importance': { file: 'wall-after-3.webp', position: 'south' },
  'flowering-shrubs-iowa': { file: 'service-landscape-installation.webp', position: 'attention' },
  'sprinkler-system-winterization': { file: 'mowing-after-4.webp', position: 'south' },
  'shade-garden-plants-iowa': { file: 'landscape-after-4.webp', position: 'north' },
  'landscape-project-phases': { file: 'wall-before-1.webp', position: 'attention' },
  'natural-stone-walkway-installation': { file: 'patio-after-1.webp', position: 'north' },
  'evergreen-trees-iowa-screening': { file: 'landscape-after-3.webp', position: 'north' },
  'pergola-design-installation': { file: 'patio-after-5.webp', position: 'south' },
  'landscaping-near-me-cedar-falls': { file: 'wall-after-2.webp', position: 'south' },
  'front-yard-landscaping-ideas': { file: 'content-landscaping-cedar-falls.webp', position: 'south' },
  'backyard-patio-design-guide': { file: 'patio-wall.webp', position: 'attention' },
  'yard-drainage-cost-cedar-falls': { file: 'service-grading.webp', position: 'south' },
  'iowa-hardscape-materials-comparison': { file: 'driveway-after-1.webp', position: 'attention' },
  'drought-tolerant-landscaping-iowa': { file: 'service-rock-landscaping.webp', position: 'attention' },
  'concrete-retaining-wall-iowa': { file: 'content-retaining-wall-cedar-falls.webp', position: 'attention' },
  'iowa-landscaping-companies-comparison': { file: 'about-crew.webp', position: 'south' },
  'tree-stump-removal-cost': { file: 'service-tree-service.webp', position: 'centre' },
  'winterizing-landscape-beds': { file: 'wall-before-5.webp', position: 'attention' },
  'brick-paver-patio-maintenance': { file: 'driveway-after-4.webp', position: 'attention' },
  'yard-composition-fertilization': { file: 'mowing-after-1.webp', position: 'south' },
  'garden-walkway-lighting': { file: 'about-secondary.webp', position: 'attention' },
  'iowa-soil-types-landscaping': { file: 'service-excavation.webp', position: 'south' },
  'cedar-falls-landscaping-faq': { file: 'water-feature-image-4.webp', position: 'attention' },
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
      let pipeline = input.clone().resize(bp, height, {
        fit: 'outside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      })
      if (format === 'avif') pipeline = pipeline.avif(FORMAT_CONFIG.avif)
      else if (format === 'webp') pipeline = pipeline.webp(FORMAT_CONFIG.webp)
      else pipeline = pipeline.jpeg(FORMAT_CONFIG.jpeg)
      writeFileSync(path.join(OUTPUT_DIR, filename), await pipeline.toBuffer())
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
  const keys = Object.entries(SOURCE_BY_SLUG).map(
    ([slug, spec]) => `${spec.file}|${spec.position}|${slug}`,
  )
  const pairKeys = Object.values(SOURCE_BY_SLUG).map((spec) => `${spec.file}|${spec.position}`)
  if (new Set(pairKeys).size !== pairKeys.length) {
    const seen = new Set()
    for (const key of pairKeys) {
      if (seen.has(key)) console.error('duplicate crop', key)
      seen.add(key)
    }
    throw new Error('SOURCE_BY_SLUG reuses a file+position crop')
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })
  const manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    : {}

  let copied = 0
  for (const [slug, spec] of Object.entries(SOURCE_BY_SLUG)) {
    const destName = `article-blog-${slug}.webp`
    const destPath = path.join(IMAGES, destName)
    const sourcePath = path.join(IMAGES, spec.file)
    if (!existsSync(sourcePath)) throw new Error(`Missing source ${spec.file} for ${slug}`)

    await sharp(sourcePath)
      .rotate()
      .resize(WIDTH, HEIGHT, {
        fit: 'cover',
        position: spec.position,
        kernel: sharp.kernel.lanczos3,
      })
      .webp({ quality: 90, effort: 6 })
      .toFile(destPath)

    const result = await processImage(destPath)
    manifest[result.originalPath] = result
    copied += 1
    console.log(`  ${spec.file} (${spec.position}) → ${destName}`)
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  console.log(`\nDone. rebuilt=${copied} of ${keys.length}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
