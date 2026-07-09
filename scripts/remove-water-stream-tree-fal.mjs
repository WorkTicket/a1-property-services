/**
 * Remove the patio-edge sapling from Pond & Stream after photo via fal.ai.
 * Usage: node scripts/remove-water-stream-tree-fal.mjs
 */
import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fal } from '@fal-ai/client'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const SRC = path.join(ROOT, 'public/images/water-feature-image-4.webp')
const BEFORE = path.join(ROOT, 'public/images/water-before-3.webp')

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
  console.error('FAL_KEY is required.')
  process.exit(1)
}

fal.config({ credentials: key })

async function removeObjects(imageUrl, prompts) {
  let currentUrl = imageUrl
  for (const [i, prompt] of prompts.entries()) {
    console.log(`  Pass ${i + 1}: "${prompt}"`)
    const result = await fal.subscribe('fal-ai/object-removal', {
      input: { image_url: currentUrl, prompt, mask_expansion: 12, model: 'best_quality' },
      logs: true,
    })
    const url = result.data?.images?.[0]?.url
    if (!url) throw new Error(`No image in pass ${i + 1}`)
    currentUrl = url
  }
  return currentUrl
}

const meta = await sharp(readFileSync(SRC)).metadata()
console.log(`Removing tree from ${path.basename(SRC)} (${meta.width}x${meta.height})...`)

const pngBuf = await sharp(readFileSync(SRC)).png().toBuffer()
const imageUrl = await fal.storage.upload(new Blob([pngBuf], { type: 'image/png' }))
const resultUrl = await removeObjects(imageUrl, [
  'small thin sapling tree with dark leaves between the brick patio and pond rocks on the left side',
  'remaining small tree trunk and branches near the patio edge',
])

const buffer = Buffer.from(await (await fetch(resultUrl)).arrayBuffer())
const webp = await sharp(buffer)
  .rotate()
  .resize(meta.width, meta.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .webp({ quality: 94, effort: 6 })
  .toBuffer()
writeFileSync(SRC, webp)
console.log(`Saved → ${SRC}`)

console.log('Removing ghost tree from before image...')
const beforeMeta = await sharp(readFileSync(BEFORE)).metadata()
const beforePng = await sharp(readFileSync(BEFORE)).png().toBuffer()
const beforeUrl = await fal.storage.upload(new Blob([beforePng], { type: 'image/png' }))
const beforeResult = await removeObjects(beforeUrl, [
  'faint ghost tree and trunk overlay on the brick patio on the left side',
])
const beforeBuf = Buffer.from(await (await fetch(beforeResult)).arrayBuffer())
const beforeWebp = await sharp(beforeBuf)
  .rotate()
  .resize(beforeMeta.width, beforeMeta.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .webp({ quality: 94, effort: 6 })
  .toBuffer()
writeFileSync(BEFORE, beforeWebp)
console.log(`Saved → ${BEFORE}`)
console.log('\nDone. Run: npm run build:images')
