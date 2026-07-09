/**
 * Generate "before" gallery images by removing water features from after photos.
 * Uses fal.ai object-removal for 1:1 scene preservation.
 *
 * Usage: node scripts/generate-water-befores-fal.mjs
 */
import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fal } from '@fal-ai/client'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const IMAGES_DIR = path.join(ROOT, 'public/images')

const JOBS = [
  {
    id: 'pond',
    after: 'water-feature-image-1.webp',
    before: 'water-pond-before.webp',
    passes: [
      'koi pond, waterfall, river rock border, garden lights, and all stones in the water feature area',
      'remaining pond water, waterfall cascades, wet stones, and pebbles around the pond edge',
    ],
    preserve: { rightHouseEdge: 0.38 },
  },
  {
    after: 'water-feature-image-2.webp',
    before: 'water-before-1.webp',
    passes: [
      'pond, waterfall, stream, and all boulders and rocks in the center water feature area',
      'remaining pond water, waterfall cascades, and wet stones in the water feature',
    ],
  },
  {
    after: 'water-feature-image-3.webp',
    before: 'water-before-2.webp',
    passes: [
      'stone waterfall, pond basin, stone steps, and stacked stone walls of the water feature',
      'remaining waterfall, pond water, and stone stairs on the hillside',
    ],
  },
  {
    after: 'water-feature-image-4.webp',
    before: 'water-before-3.webp',
    passes: [
      'pond, stream, stone bridge, waterfall, rock border, and small sapling tree between patio and pond',
      'remaining pond water, stream channel, boulder edging, and thin patio-edge tree trunk',
    ],
  },
]

function loadFalKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(DEV_VARS)) return null
  const line = readFileSync(DEV_VARS, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('FAL_KEY='))
  return line?.slice('FAL_KEY='.length).trim() || null
}

async function removeObjects(imageUrl, prompts) {
  let currentUrl = imageUrl
  for (const [i, prompt] of prompts.entries()) {
    console.log(`  Pass ${i + 1}: "${prompt}"`)
    const result = await fal.subscribe('fal-ai/object-removal', {
      input: {
        image_url: currentUrl,
        prompt,
        mask_expansion: 10,
        model: 'best_quality',
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          update.logs?.map((log) => log.message).forEach((msg) => console.log('   ', msg))
        }
      },
    })
    const url = result.data?.images?.[0]?.url
    if (!url) throw new Error(`No image URL in pass ${i + 1}: ${JSON.stringify(result)}`)
    currentUrl = url
  }
  return currentUrl
}

async function saveAsWebp(pngBuffer, destPath, sourceMeta) {
  const webpBuf = await sharp(pngBuffer)
    .rotate()
    .resize(sourceMeta.width, sourceMeta.height, {
      fit: 'fill',
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 94, effort: 6 })
    .toBuffer()
  writeFileSync(destPath, webpBuf)
  const outMeta = await sharp(webpBuf).metadata()
  console.log(`  Saved → ${path.basename(destPath)} (${outMeta.width}x${outMeta.height}, ${Math.round(webpBuf.length / 1024)}KB)`)
}

/** Object removal can hallucinate background; copy stable regions from the after photo back in. */
async function preserveAfterBackground(afterPath, beforePath, preserve = {}) {
  const width = (await sharp(readFileSync(afterPath)).metadata()).width ?? 0
  const height = (await sharp(readFileSync(afterPath)).metadata()).height ?? 0
  const channels = 4
  const afterBuf = await sharp(readFileSync(afterPath)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const beforeBuf = await sharp(readFileSync(beforePath)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = Buffer.from(beforeBuf.data)
  const a = afterBuf.data
  const b = beforeBuf.data

  const blendStart = Math.round(height * 0.24)
  const blendEnd = Math.round(height * 0.41)
  const leftTreeEdge = Math.round(width * 0.2)
  const rightHouseEdge = preserve.rightHouseEdge ? Math.round(width * (1 - preserve.rightHouseEdge)) : 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let afterWeight = 0
      if (y <= blendStart) afterWeight = 1
      else if (y < blendEnd) afterWeight = 1 - (y - blendStart) / (blendEnd - blendStart)

      if (x < leftTreeEdge) {
        const leftWeight = 1 - x / leftTreeEdge
        const leftCutoff = Math.round(height * 0.55)
        const leftFactor =
          y < leftCutoff ? leftWeight : leftWeight * (1 - (y - leftCutoff) / (height - leftCutoff))
        afterWeight = Math.max(afterWeight, Math.max(0, leftFactor))
      }

      if (rightHouseEdge && x >= rightHouseEdge) {
        const rightWeight = (x - rightHouseEdge) / (width - rightHouseEdge)
        afterWeight = Math.max(afterWeight, Math.max(0, rightWeight))
      }

      const i = (y * width + x) * channels
      for (let c = 0; c < 3; c++) {
        out[i + c] = Math.round(a[i + c] * afterWeight + b[i + c] * (1 - afterWeight))
      }
      out[i + 3] = 255
    }
  }

  const webpBuf = await sharp(out, { raw: { width, height, channels: 4 } })
    .webp({ quality: 94, effort: 6 })
    .toBuffer()
  writeFileSync(beforePath, webpBuf)
  console.log('  Preserved after background')
}

const key = loadFalKey()
if (!key) {
  console.error('FAL_KEY is required. Add it to .dev.vars or set the environment variable.')
  console.error('Get a key at https://fal.ai/dashboard/keys')
  process.exit(1)
}

fal.config({ credentials: key })

const onlyArg = process.argv.find((a) => a.startsWith('--only='))
const onlyIdArg = process.argv.find((a) => a.startsWith('--id='))
const onlyIndex = onlyArg ? Number(onlyArg.split('=')[1]) - 1 : null
const onlyId = onlyIdArg?.split('=')[1]
const jobsToRun = onlyId
  ? JOBS.filter((job) => job.id === onlyId)
  : onlyIndex !== null && onlyIndex >= 0 && onlyIndex < JOBS.length
    ? [JOBS[onlyIndex]]
    : JOBS

if (onlyId && jobsToRun.length === 0) {
  console.error(`No job found with id "${onlyId}"`)
  process.exit(1)
}

for (const job of jobsToRun) {
  const srcPath = path.join(IMAGES_DIR, job.after)
  const destPath = path.join(IMAGES_DIR, job.before)

  if (!existsSync(srcPath)) {
    console.error(`Source not found: ${srcPath}`)
    process.exit(1)
  }

  const sourceMeta = await sharp(readFileSync(srcPath)).metadata()
  console.log(`\n${job.after} → ${job.before} (${sourceMeta.width}x${sourceMeta.height})`)

  console.log('Uploading source...')
  const pngBuf = await sharp(readFileSync(srcPath)).png().toBuffer()
  const imageUrl = await fal.storage.upload(new Blob([pngBuf], { type: 'image/png' }))

  console.log('Removing water features...')
  const resultUrl = await removeObjects(imageUrl, job.passes)

  console.log('Downloading result...')
  const response = await fetch(resultUrl)
  const buffer = Buffer.from(await response.arrayBuffer())

  await saveAsWebp(buffer, destPath, sourceMeta)
  console.log('Preserving background from after photo...')
  await preserveAfterBackground(srcPath, destPath, job.preserve)
}

console.log('\nDone. Run: npm run build:images')
