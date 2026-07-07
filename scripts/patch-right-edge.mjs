import sharp from 'sharp'
import path from 'path'

const src = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-hero-final2.png',
)
const out = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-hero-final3.png',
)

/** [left, top, width, height, cloneLeft, cloneTop] */
const PATCHES = [
  // Right-edge road smudge (middle)
  [1450, 390, 86, 70, 1320, 390],
  [1420, 430, 116, 55, 1280, 430],
  // Thin line on bridge surface (right edge)
  [1475, 835, 61, 45, 1360, 835],
  [1490, 810, 46, 30, 1380, 810],
]

function featheredMask(width, height) {
  const pad = Math.max(4, Math.round(Math.min(width, height) * 0.2))
  const svg = `<svg width="${width}" height="${height}">
    <rect x="${pad}" y="${pad}" width="${width - pad * 2}" height="${height - pad * 2}"
      rx="${pad}" ry="${pad}" fill="white"/>
  </svg>`
  return Buffer.from(svg)
}

let pipeline = sharp(src)

for (const [left, top, width, height, cloneLeft, cloneTop] of PATCHES) {
  const patch = await sharp(src)
    .extract({ left: cloneLeft, top: cloneTop, width, height })
    .blur(0.35)
    .toBuffer()

  const masked = await sharp(patch)
    .ensureAlpha()
    .composite([
      {
        input: await sharp(featheredMask(width, height)).resize(width, height).png().toBuffer(),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  pipeline = pipeline.composite([{ input: masked, left, top, blend: 'over' }])
}

await pipeline.png().toFile(out)
console.log(`Applied ${PATCHES.length} targeted edge patches → ${out}`)
