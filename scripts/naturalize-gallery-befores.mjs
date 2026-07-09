/**
 * Naturalize "before" gallery photos so before/after pairs no longer read as
 * pixel-perfect overlays.
 *
 * The patio / driveway / mowing / landscape "before" images were AI-inpainted
 * from their "after" counterparts, so every static element (house, sky, trees,
 * shadows) lines up bit-for-bit when the slider is dragged. That perfect
 * alignment is the dead giveaway of an overlay.
 *
 * This script rebuilds each "before" with a subtle, per-image camera shift
 * (small perspective + rotation + reframe) plus an independent exposure /
 * white-balance change, so it reads as a separate photo taken on a different
 * day. Originals are backed up first, and the transform always reads from the
 * backup, so the script is idempotent (re-running won't compound the warp).
 *
 * Usage:
 *   node scripts/naturalize-gallery-befores.mjs            # process all targets in place
 *   node scripts/naturalize-gallery-befores.mjs --only=driveway-before-1
 *   node scripts/naturalize-gallery-befores.mjs --out=.tmp_preview   # write elsewhere (preview)
 *
 * After running: npm run build:images  (regenerates responsive variants + manifest)
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

const IMAGES_DIR = path.resolve('public/images')
// Kept OUTSIDE public/images so the image optimizer never picks these pristine
// originals up (its variants are keyed by basename and would collide).
const BACKUP_DIR = path.resolve('.image-backups/gallery-befores')

const GROUPS = ['patio', 'driveway', 'mowing', 'landscape']
const TARGETS = GROUPS.flatMap((g) => [1, 2, 3, 4, 5].map((n) => `${g}-before-${n}`))

// Deterministic per-image RNG so each photo gets a distinct but stable shift.
function makeRng(seedStr) {
  let h = 2166136261
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  let state = h >>> 0
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / 0xffffffff
  }
}

// Symmetric jitter helper: value in [-mag, -min] U [min, mag] so shifts are
// never negligibly small (which would leave the overlay look intact).
function signedRange(rng, min, mag) {
  const sign = rng() < 0.5 ? -1 : 1
  return sign * (min + rng() * (mag - min))
}

function planTransform(name) {
  const rng = makeRng(name)
  return {
    scale: 1.11 + rng() * 0.03, // 1.110 - 1.140 zoom to give crop margin
    rotate: signedRange(rng, 0.45, 0.95), // degrees
    shearX: signedRange(rng, 0.006, 0.016), // perspective/keystone feel
    shearY: signedRange(rng, 0.004, 0.011),
    offX: signedRange(rng, 0.01, 0.024), // reframe as fraction of width
    offY: signedRange(rng, 0.008, 0.02), // reframe as fraction of height
    brightness: 1 + signedRange(rng, 0.015, 0.05), // exposure difference
    saturation: 0.9 + rng() * 0.14, // 0.90 - 1.04
    hue: Math.round(signedRange(rng, 1.5, 5)), // slight color-temp drift
    contrast: 1 + signedRange(rng, 0.02, 0.06), // tonal difference
    warmR: 1 + signedRange(rng, 0.006, 0.028), // white-balance drift
    warmB: 1 + signedRange(rng, 0.006, 0.028),
  }
}

const BG = { background: { r: 128, g: 128, b: 128 } }

async function bufferDims(buf) {
  const m = await sharp(buf).metadata()
  return { w: m.width ?? 0, h: m.height ?? 0 }
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v))
}

async function transform(srcBuf, p) {
  const { w: W, h: H } = await bufferDims(srcBuf)

  // 1. Zoom in to create margin for the warp/reframe.
  const upW = Math.round(W * p.scale)
  const upH = Math.round(H * p.scale)
  let buf = await sharp(srcBuf)
    .resize(upW, upH, { kernel: sharp.kernel.lanczos3 })
    .toBuffer()

  // 2. Subtle shear (reads as a small perspective / camera-position change).
  buf = await sharp(buf)
    .affine(
      [
        [1, p.shearX],
        [p.shearY, 1],
      ],
      { ...BG, interpolator: sharp.interpolators.bilinear },
    )
    .toBuffer()

  // 3. Small rotation (handheld reposition).
  buf = await sharp(buf).rotate(p.rotate, BG).toBuffer()

  // 4. Reframe: crop the original W x H window off-center.
  const { w: cw, h: ch } = await bufferDims(buf)
  const left = clamp(Math.round((cw - W) / 2 + p.offX * W), 0, cw - W)
  const top = clamp(Math.round((ch - H) / 2 + p.offY * H), 0, ch - H)
  buf = await sharp(buf).extract({ left, top, width: W, height: H }).toBuffer()

  // 5. Independent exposure / color grade so tones don't match the "after".
  const cB = 128 * (1 - p.contrast)
  buf = await sharp(buf)
    .modulate({ brightness: p.brightness, saturation: p.saturation, hue: p.hue })
    .linear(p.contrast, cB) // contrast around mid-grey
    .linear([p.warmR, 1, p.warmB], [0, 0, 0]) // white-balance drift
    .webp({ quality: 92, effort: 6 })
    .toBuffer()

  return buf
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith('--only='))
  const outArg = process.argv.find((a) => a.startsWith('--out='))
  const only = onlyArg?.split('=')[1]
  const outDir = outArg ? path.resolve(outArg.split('=')[1]) : IMAGES_DIR

  const targets = only ? TARGETS.filter((t) => t === only) : TARGETS
  if (only && targets.length === 0) {
    console.error(`Unknown target "${only}". Valid: ${TARGETS.join(', ')}`)
    process.exit(1)
  }

  if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR, { recursive: true })
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

  for (const name of targets) {
    const livePath = path.join(IMAGES_DIR, `${name}.webp`)
    const backupPath = path.join(BACKUP_DIR, `${name}.webp`)

    if (!existsSync(livePath) && !existsSync(backupPath)) {
      console.error(`  ✗ ${name}: source not found, skipping`)
      continue
    }

    // First run: snapshot the pristine original as the transform source.
    if (!existsSync(backupPath)) copyFileSync(livePath, backupPath)

    const srcBuf = readFileSync(backupPath)
    const p = planTransform(name)
    const out = await transform(srcBuf, p)

    const destPath = path.join(outDir, `${name}.webp`)
    writeFileSync(destPath, out)
    console.log(
      `  ${name}: rot ${p.rotate.toFixed(2)}°, shear(${p.shearX.toFixed(3)}, ${p.shearY.toFixed(
        3,
      )}), reframe(${(p.offX * 100).toFixed(1)}%, ${(p.offY * 100).toFixed(1)}%), ` +
        `exp ${p.brightness.toFixed(2)} → ${path.relative(process.cwd(), destPath)}`,
    )
  }

  console.log(`\nDone (${targets.length} image${targets.length === 1 ? '' : 's'}).`)
  if (outDir === IMAGES_DIR) console.log('Next: npm run build:images')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
