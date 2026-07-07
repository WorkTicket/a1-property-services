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
      'pond, stream, stone bridge, waterfall, and rock border around the backyard water feature',
      'remaining pond water, stream channel, and boulder edging around the pond',
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

const key = loadFalKey()
if (!key) {
  console.error('FAL_KEY is required. Add it to .dev.vars or set the environment variable.')
  console.error('Get a key at https://fal.ai/dashboard/keys')
  process.exit(1)
}

fal.config({ credentials: key })

for (const job of JOBS) {
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
}

console.log('\nDone. Run: npm run build:images')
