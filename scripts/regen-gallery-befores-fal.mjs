/**
 * Regenerate "before" gallery photos as genuinely different photographs.
 *
 * The patio / driveway / mowing / landscape "before" images were originally
 * inpainted from their "after" counterparts, so they aligned pixel-for-pixel
 * and read as overlays. A geometric warp of the same pixels looked uncanny
 * (same photo, bent). Instead, this uses FLUX Kontext to synthesize a NEW
 * before-state photo of the same scene from a slightly different, natural
 * camera position -- like the wall/water pairs, which are real separate shots.
 *
 * Source is the AFTER image (best record of the house/scene). The prompt
 * removes the improvement, restores the worn "before" state, and nudges the
 * viewpoint so the pair no longer overlays.
 *
 * Usage:
 *   node scripts/regen-gallery-befores-fal.mjs --only=driveway-before-1 --out=.tmp_preview
 *   node scripts/regen-gallery-befores-fal.mjs            # all 20, in place
 *
 * After running: node scripts/rebuild-before-variants.mjs
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fal } from '@fal-ai/client'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const IMAGES_DIR = path.join(ROOT, 'public/images')
const MODEL = 'fal-ai/flux-pro/kontext/max'

// Shared photographic instruction that keeps every generation looking like a
// candid, slightly imperfect real-estate "before" snapshot from a new angle.
const CAMERA = [
  'Reframe as a separate photograph taken from a noticeably different camera position',
  'a few steps to the side and a different height, with a slightly different focal length',
  'so the composition, perspective and framing clearly differ from the original',
  'Casual handheld phone snapshot, imperfect amateur framing, natural uneven daylight',
  'keep the same house and property clearly recognizable as the same place',
  'photorealistic, no text, no watermark',
].join(', ')

const GROUP_BEFORE = {
  patio:
    'Show this backyard BEFORE any patio was built: just plain lawn with a bare, worn dirt patch and patchy grass where the patio would go. No pavers, no patio, no outdoor furniture, no planters, no fire pit, no pergola.',
  driveway:
    'Show this driveway BEFORE the paver upgrade: old, plain, cracked gray concrete (or worn asphalt) with stains and weeds in the cracks. No pavers, no decorative border, no fresh edging.',
  mowing:
    'Show this lawn BEFORE mowing: overgrown, shaggy, uneven grass with weeds and dandelions, ragged edges along the driveway and sidewalk, no mowing stripes, dull uneven color.',
  landscape:
    'Show this yard BEFORE the landscape bed was installed: plain flat lawn or a bare strip of thin, patchy grass and soil where the bed would go. No mulch, no planting bed, no shrubs, flowers, rocks or edging.',
}

const GROUPS = Object.keys(GROUP_BEFORE)
const TARGETS = GROUPS.flatMap((g) => [1, 2, 3, 4, 5].map((n) => `${g}-before-${n}`))

function groupOf(name) {
  return GROUPS.find((g) => name.startsWith(g))
}

function afterOf(name) {
  // <group>-before-<n>  ->  <group>-after-<n>
  return name.replace('-before-', '-after-')
}

function loadFalKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(DEV_VARS)) return null
  const line = readFileSync(DEV_VARS, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('FAL_KEY='))
  return line?.slice('FAL_KEY='.length).trim() || null
}

// Deterministic per-image seed so results are reproducible and each frame is
// distinct.
function seedFor(name) {
  let h = 2166136261
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 1_000_000
}

async function generate(name, outDir) {
  const group = groupOf(name)
  const afterPath = path.join(IMAGES_DIR, `${afterOf(name)}.webp`)
  if (!existsSync(afterPath)) {
    console.error(`  ✗ ${name}: source after not found (${afterOf(name)}.webp)`)
    return
  }

  const meta = await sharp(readFileSync(afterPath)).metadata()
  const pngBuf = await sharp(readFileSync(afterPath)).png().toBuffer()
  const imageUrl = await fal.storage.upload(new Blob([pngBuf], { type: 'image/png' }))

  const prompt = `${GROUP_BEFORE[group]} ${CAMERA}.`
  console.log(`  ${name}: generating from ${afterOf(name)}.webp (${meta.width}x${meta.height})...`)

  const result = await fal.subscribe(MODEL, {
    input: {
      prompt,
      image_url: imageUrl,
      guidance_scale: 3.5,
      num_images: 1,
      seed: seedFor(name),
      safety_tolerance: '5',
      output_format: 'png',
    },
    logs: false,
  })

  const url = result.data?.images?.[0]?.url
  if (!url) throw new Error(`No image returned for ${name}: ${JSON.stringify(result.data)}`)

  const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())
  const webp = await sharp(buffer)
    .rotate()
    .resize(meta.width, meta.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 92, effort: 6 })
    .toBuffer()

  const destPath = path.join(outDir, `${name}.webp`)
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
  const outArg = process.argv.find((a) => a.startsWith('--out='))
  const only = onlyArg?.split('=')[1]
  const outDir = outArg ? path.resolve(outArg.split('=')[1]) : IMAGES_DIR

  const targets = only ? only.split(',').filter((t) => TARGETS.includes(t)) : TARGETS
  if (only && targets.length === 0) {
    console.error(`Unknown target(s) "${only}". Valid: ${TARGETS.join(', ')}`)
    process.exit(1)
  }
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  for (const name of targets) {
    try {
      await generate(name, outDir)
    } catch (e) {
      console.error(`  ✗ ${name}: ${e.message}`)
    }
  }

  console.log(`\nDone (${targets.length} image${targets.length === 1 ? '' : 's'}).`)
  if (outDir === IMAGES_DIR) console.log('Next: node scripts/rebuild-before-variants.mjs')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
