/**
 * Remove all cars from hero reference via fal.ai object removal (preserves original scene).
 * Usage: node scripts/remove-hero-cars-fal.mjs [source-image] [output-png]
 */
import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import { fal } from '@fal-ai/client'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const DEFAULT_SRC = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/c__Users_Slay3r_AppData_Roaming_Cursor_User_workspaceStorage_98af54def8019a03ecdb0c968b92e0d6_images_Document-eaec705f-24f2-46c9-8673-7e626b4c2546.png',
)
const DEFAULT_OUT = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-no-cars-clean.png',
)

const src = path.resolve(process.argv[2] ?? DEFAULT_SRC)
const dest = path.resolve(process.argv[3] ?? DEFAULT_OUT)

function loadFalKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(DEV_VARS)) return null
  const line = readFileSync(DEV_VARS, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('FAL_KEY='))
  return line?.slice('FAL_KEY='.length).trim() || null
}

const key = loadFalKey()
if (!key) {
  console.error('FAL_KEY is required. Add it to .dev.vars or set the environment variable.')
  process.exit(1)
}

if (!existsSync(src)) {
  console.error('Source image not found:', src)
  process.exit(1)
}

fal.config({ credentials: key })

console.log('Uploading source image...')
const imageUrl = await fal.storage.upload(new Blob([readFileSync(src)], { type: 'image/png' }))

console.log('Removing cars (pass 1: all vehicles)...')
let currentUrl = imageUrl

for (const [i, prompt] of [
  'all cars, trucks, vans, and vehicles on roads, bridge, and parking lots',
  'remaining cars and vehicles',
  'any leftover parked cars in parking lots and on streets',
].entries()) {
  console.log(`  Pass ${i + 1}: "${prompt}"`)
  const result = await fal.subscribe('fal-ai/object-removal', {
    input: {
      image_url: currentUrl,
      prompt,
      mask_expansion: 12,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === 'IN_PROGRESS') {
        update.logs?.map((log) => log.message).forEach((msg) => console.log('   ', msg))
      }
    },
  })

  const url = result.data?.images?.[0]?.url
  if (!url) {
    console.error('No image URL in response:', result)
    process.exit(1)
  }
  currentUrl = url
}

console.log('Downloading final image...')
const response = await fetch(currentUrl)
const buffer = Buffer.from(await response.arrayBuffer())
writeFileSync(dest, buffer)
console.log(`Saved → ${dest} (${Math.round(buffer.length / 1024)}KB)`)
