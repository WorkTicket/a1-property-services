/**
 * Replace AI-fake tree zones with real foliage from the reference photo.
 * Uses tight tree-only crops to avoid pulling in cars from parking lots.
 */
import sharp from 'sharp'
import path from 'path'

const ref = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/c__Users_Slay3r_AppData_Roaming_Cursor_User_workspaceStorage_98af54def8019a03ecdb0c968b92e0d6_images_Document-eaec705f-24f2-46c9-8673-7e626b4c2546.png',
)
const hero = path.resolve(
  process.argv[2] ??
    path.join(
      process.env.USERPROFILE ?? '',
      '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/hero-background-no-cars-v3.png',
    ),
)
const dest = path.resolve(
  process.argv[3] ??
    path.join(
      process.env.USERPROFILE ?? '',
      '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/hero-background-trees-fixed.png',
    ),
)

/** [name, left, top, width, height, featherPad]: pixel coords on 1536×1024 hero */
const TREE_PATCHES = [
  // Distant forest canopy only (no buildings/parking)
  ['forest-horizon', 0, 0, 1536, 195, 50],
  ['forest-right', 820, 0, 716, 175, 40],
  // Yellow autumn tree crowns (foliage only, not parking lots)
  ['tree-crown-a', 700, 255, 130, 115, 22],
  ['tree-crown-b', 820, 248, 115, 110, 20],
  ['tree-crown-c', 930, 258, 120, 105, 20],
  // Riverbank dense shrubbery (right bank)
  ['riverbank', 310, 655, 195, 155, 26],
  // Left bank bushes between river and walking path
  ['left-bank-bushes', 380, 710, 170, 130, 28],
]

function featherMask(width, height, pad) {
  const p = Math.min(pad, Math.floor(Math.min(width, height) * 0.4))
  const svg = `<svg width="${width}" height="${height}">
    <rect x="${p}" y="${p}" width="${width - p * 2}" height="${height - p * 2}"
      rx="${p}" ry="${p}" fill="white"/>
  </svg>`
  return Buffer.from(svg)
}

const heroMeta = await sharp(hero).metadata()
const W = heroMeta.width
const H = heroMeta.height

const refAligned = await sharp(ref).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer()

let pipeline = sharp(hero)

for (const [name, left, top, width, height, pad] of TREE_PATCHES) {
  const patch = await sharp(refAligned)
    .extract({ left, top, width, height })
    .modulate({ saturation: 1.04, brightness: 1.02 })
    .sharpen({ sigma: 0.45, m1: 0.55, m2: 0.22 })
    .ensureAlpha()
    .composite([
      {
        input: await sharp(featherMask(width, height, pad)).resize(width, height).png().toBuffer(),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  pipeline = pipeline.composite([{ input: patch, left, top, blend: 'over' }])
  console.log(`  patched ${name}: ${width}x${height} @ (${left},${top})`)
}

await pipeline.png().toFile(dest)
console.log(`Saved → ${dest}`)
