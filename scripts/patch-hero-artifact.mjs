/**
 * Fix the right-side smeared building artifact by cloning clean pixels from above.
 */
import sharp from 'sharp'
import path from 'path'

const src = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-hero-final.png',
)
const dest = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-hero-patched.png',
)

function featherMask(width, height, pad = 20) {
  const svg = `<svg width="${width}" height="${height}">
    <rect x="${pad}" y="${pad}" width="${width - pad * 2}" height="${height - pad * 2}"
      rx="${pad}" ry="${pad}" fill="white"/>
  </svg>`
  return Buffer.from(svg)
}

// Smeared horizontal band on right where bridge meets town
const SMEAR = { left: 1090, top: 418, width: 360, height: 72 }
// Clean building facade directly above the smear
const SOURCE = { left: 1090, top: 350, width: 360, height: 72 }

const { left, top, width, height } = SMEAR
const clone = await sharp(src)
  .extract(SOURCE)
  .resize(width, height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .blur(0.3)
  .ensureAlpha()
  .composite([
    {
      input: await sharp(featherMask(width, height, 16)).resize(width, height).png().toBuffer(),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer()

const tmp = dest.replace(/\.png$/, '-tmp.png')
await sharp(src).composite([{ input: clone, left, top }]).png().toFile(tmp)

// Second smear line slightly below
const SMEAR2 = { left: 1120, top: 468, width: 300, height: 48 }
const SOURCE2 = { left: 1120, top: 398, width: 300, height: 48 }
const clone2 = await sharp(src)
  .extract(SOURCE2)
  .resize(SMEAR2.width, SMEAR2.height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
  .blur(0.3)
  .ensureAlpha()
  .composite([
    {
      input: await sharp(featherMask(SMEAR2.width, SMEAR2.height, 14))
        .resize(SMEAR2.width, SMEAR2.height)
        .png()
        .toBuffer(),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer()

await sharp(tmp)
  .composite([{ input: clone2, left: SMEAR2.left, top: SMEAR2.top }])
  .png()
  .toFile(dest)

console.log(`Fixed smear → ${dest}`)
