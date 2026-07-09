/**
 * Generate unique intro + why images for each city location page.
 * These are dedicated assets — not recycled from gallery or service pages.
 *
 * Usage:
 *   node scripts/generate-city-content-images-fal.mjs
 *   node scripts/generate-city-content-images-fal.mjs --only=la-porte-city
 *   node scripts/generate-city-content-images-fal.mjs --slot=intro
 *
 * After running: node scripts/rebuild-city-content-variants.mjs
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fal } from '@fal-ai/client'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const IMAGES_DIR = path.join(ROOT, 'public/images')
const MODEL = 'fal-ai/flux-pro/v1.1'
const WIDTH = 1280
const HEIGHT = 960

const STYLE = [
  'Professional real estate landscaping photography',
  'Iowa Midwest small-town and suburban residential property',
  'natural daylight, sharp focus, realistic colors',
  'no people, no text, no watermark, no logos, no vehicles',
  'photorealistic',
].join(', ')

/** @type {Record<string, { intro: string; why: string }>} */
const CITY_PROMPTS = {
  'cedar-falls': {
    intro:
      'Completed full landscape installation at a Cedar Falls Iowa home near College Hill: fresh dark mulch beds, hostas and ornamental grasses, curved bed edging along a brick ranch house, green lawn, mature maple trees',
    why:
      'Professional crew installing a tan segmental block retaining wall on a sloped Cedar Falls Iowa front yard, gravel base visible, suburban neighborhood, late afternoon sun',
  },
  waterloo: {
    intro:
      'Older Waterloo Iowa neighborhood home with large mature oak trees, new foundation planting beds with shrubs and perennials, fresh mulch, tidy lawn, classic two-story house with front porch',
    why:
      'Wide suburban Waterloo Iowa backyard with layered landscape beds, stone border edging, mixed shrubs and flowering perennials, well-maintained green lawn, fence in background',
  },
  hudson: {
    intro:
      'Brand-new Hudson Iowa subdivision home with fresh topsoil grading, young sod strips, newly planted ornamental trees and mulch rings, construction-complete yard, modern vinyl-sided house',
    why:
      'New construction landscaping at a Hudson Iowa home: hydroseeded front lawn, young arborvitae along the foundation, straw mulch on graded soil, clean new sidewalk',
  },
  evansdale: {
    intro:
      'Modest Evansdale Iowa ranch home with freshly mowed lawn showing crisp mowing stripes, trimmed edges along sidewalk, practical suburban lot, shade trees, neat and maintained',
    why:
      'Tree pruning and lawn care at an Evansdale Iowa property: arborist ladder against a mature tree, trimmed shrubs along driveway, tidy residential street',
  },
  waverly: {
    intro:
      'Waverly Iowa home with custom landscape design: curved planting beds with layered heights, river birch tree, purple and yellow perennials, dark mulch, Bremer County suburban setting',
    why:
      'New paver walkway and landscape installation at a Waverly Iowa craftsman-style home, brick pavers leading to front door, fresh plantings on both sides, clean bed edges',
  },
  denver: {
    intro:
      'Small-town Denver Iowa property with fresh cedar mulch in garden beds, clean machine-cut bed edging, hostas and daylilies, modest single-story home, rural-suburban feel',
    why:
      'Decorative river rock and boulder accent landscaping at a Denver Iowa country home, mixed mulch and stone beds, split-rail fence corner, open Iowa sky',
  },
  jesup: {
    intro:
      'Jesup Iowa ranch home on a country lot with new foundation shrub plantings, dark mulch beds, young evergreens, wide green lawn, farm-country horizon in distance',
    why:
      'Foundation shrub installation at a Jesup Iowa farmhouse-style home, crew tools set aside, fresh mulch around new boxwood and hydrangea shrubs, gravel driveway',
  },
  parkersburg: {
    intro:
      'Parkersburg Iowa hillside property with new segmental retaining wall terracing a sloped front yard, leveled planting area above wall, Grundy County rural home',
    why:
      'Completed retaining wall and graded yard at a Parkersburg Iowa home on a slope, pea gravel patio area, young plantings on terraced levels, afternoon light',
  },
  'la-porte-city': {
    intro:
      'La Porte City Iowa family ranch home with neat foundation landscaping, rounded mulch beds, flowering shrubs, trimmed lawn, small-town residential street',
    why:
      'Fresh landscape bed installation along a La Porte City Iowa home walkway, curved bed line, mixed perennials and mulch, welcoming front entry garden',
  },
  dike: {
    intro:
      'Dike Iowa small-town home with professionally maintained landscape: pruned shrubs, fresh spring mulch, crisp lawn, simple ranch house, quiet Grundy County neighborhood',
    why:
      'Seasonal landscape maintenance at a Dike Iowa property: freshly edged beds, trimmed yew shrubs, dark mulch refresh, clean sidewalk and driveway',
  },
  'elk-run-heights': {
    intro:
      'Elk Run Heights Iowa suburban home with restored landscape beds, healthy green lawn, replanted perennials and shrubs, neat mulch, Black Hawk County residential area',
    why:
      'Yard restoration project at an Elk Run Heights Iowa home: removed overgrown weeds, new mulch and plantings, leveled lawn area, improved curb appeal',
  },
  dunkerton: {
    intro:
      'Dunkerton Iowa community home with completed landscaping project: new sidewalk border plantings, mulch beds, tidy lawn, small Iowa town character',
    why:
      'Outdoor living backyard at a Dunkerton Iowa home: paver patio with fire pit area, surrounding plantings and mulch beds, cozy backyard entertaining space',
  },
}

const CITY_SLUGS = Object.keys(CITY_PROMPTS)

function loadFalKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(DEV_VARS)) return null
  const line = readFileSync(DEV_VARS, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('FAL_KEY='))
  return line?.slice('FAL_KEY='.length).trim() || null
}

function seedFor(name) {
  let h = 2166136261
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 1_000_000
}

async function generateImage(filename, prompt) {
  const destPath = path.join(IMAGES_DIR, filename)
  console.log(`  ${filename}: generating...`)

  const result = await fal.subscribe(MODEL, {
    input: {
      prompt: `${prompt}. ${STYLE}.`,
      image_size: { width: WIDTH, height: HEIGHT },
      num_images: 1,
      seed: seedFor(filename),
      safety_tolerance: '5',
      output_format: 'png',
    },
    logs: false,
  })

  const url = result.data?.images?.[0]?.url
  if (!url) throw new Error(`No image returned for ${filename}`)

  const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())
  const webp = await sharp(buffer)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 90, effort: 6 })
    .toBuffer()

  writeFileSync(destPath, webp)
  console.log(`    → ${path.relative(ROOT, destPath)}`)
}

async function main() {
  const key = loadFalKey()
  if (!key) {
    console.error('FAL_KEY is required. Add it to .dev.vars or set the environment variable.')
    process.exit(1)
  }
  fal.config({ credentials: key })

  const onlyArg = process.argv.find((a) => a.startsWith('--only='))
  const slotArg = process.argv.find((a) => a.startsWith('--slot='))
  const only = onlyArg?.split('=')[1]
  const slot = slotArg?.split('=')[1]

  const slugs = only ? only.split(',').filter((s) => CITY_SLUGS.includes(s)) : CITY_SLUGS
  if (only && slugs.length === 0) {
    console.error(`Unknown slug(s) "${only}". Valid: ${CITY_SLUGS.join(', ')}`)
    process.exit(1)
  }

  if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true })

  const jobs = []
  for (const slug of slugs) {
    const prompts = CITY_PROMPTS[slug]
    if (!slot || slot === 'intro') {
      jobs.push({
        filename: `city-content-intro-${slug}.webp`,
        prompt: prompts.intro,
      })
    }
    if (!slot || slot === 'why') {
      jobs.push({
        filename: `city-content-why-${slug}.webp`,
        prompt: prompts.why,
      })
    }
  }

  for (const job of jobs) {
    try {
      await generateImage(job.filename, job.prompt)
    } catch (e) {
      console.error(`  ✗ ${job.filename}: ${e.message}`)
    }
  }

  console.log(`\nDone (${jobs.length} image${jobs.length === 1 ? '' : 's'}).`)
  console.log('Next: node scripts/rebuild-city-content-variants.mjs')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
