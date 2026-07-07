/**
 * Detect high-contrast blobs (car artifacts) in parking-lot regions of hero image.
 */
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import path from 'path'

const src = path.resolve(
  process.argv[2] ??
    path.join(
      process.env.USERPROFILE ?? '',
      '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-no-cars-clean.png',
    ),
)

const meta = await sharp(src).metadata()
const W = meta.width
const H = meta.height

const { data } = await sharp(src).resize(W, H).greyscale().raw().toBuffer({ resolveWithObject: true })

// Parking/street regions as [left%, top%, width%, height%]
const ZONES = [
  ['main-right-lot', 0.44, 0.28, 0.28, 0.22],
  ['behind-building', 0.40, 0.24, 0.22, 0.14],
  ['far-right', 0.78, 0.34, 0.20, 0.18],
  ['mid-streets', 0.30, 0.36, 0.50, 0.16],
  ['bridge-road', 0.10, 0.42, 0.88, 0.12],
]

function zoneRect([, l, t, w, h]) {
  return {
    left: Math.round(l * W),
    top: Math.round(t * H),
    width: Math.round(w * W),
    height: Math.round(h * H),
  }
}

const blobs = []

for (const [name, ...pct] of ZONES) {
  const z = zoneRect([name, ...pct])
  const pixels = []
  for (let y = z.top; y < z.top + z.height; y++) {
    for (let x = z.left; x < z.left + z.width; x++) {
      pixels.push(data[y * W + x])
    }
  }
  pixels.sort((a, b) => a - b)
  const median = pixels[Math.floor(pixels.length / 2)]
  const p25 = pixels[Math.floor(pixels.length * 0.25)]
  const p75 = pixels[Math.floor(pixels.length * 0.75)]
  const iqr = Math.max(8, p75 - p25)
  const low = p25 - iqr * 0.6
  const high = p75 + iqr * 0.6

  const mask = new Uint8Array(W * H)
  for (let y = z.top; y < z.top + z.height; y++) {
    for (let x = z.left; x < z.left + z.width; x++) {
      const v = data[y * W + x]
      if (v < low || v > high) mask[y * W + x] = 255
    }
  }

  // Connected components (4-neighbor flood fill)
  const seen = new Uint8Array(W * H)
  for (let y = z.top; y < z.top + z.height; y++) {
    for (let x = z.left; x < z.left + z.width; x++) {
      const i = y * W + x
      if (!mask[i] || seen[i]) continue
      const stack = [[x, y]]
      let minX = x,
        maxX = x,
        minY = y,
        maxY = y,
        count = 0
      seen[i] = 1
      while (stack.length) {
        const [cx, cy] = stack.pop()
        count++
        minX = Math.min(minX, cx)
        maxX = Math.max(maxX, cx)
        minY = Math.min(minY, cy)
        maxY = Math.max(maxY, cy)
        for (const [nx, ny] of [
          [cx + 1, cy],
          [cx - 1, cy],
          [cx, cy + 1],
          [cx, cy - 1],
        ]) {
          if (nx < z.left || nx >= z.left + z.width || ny < z.top || ny >= z.top + z.height) continue
          const ni = ny * W + nx
          if (!mask[ni] || seen[ni]) continue
          seen[ni] = 1
          stack.push([nx, ny])
        }
      }
      const bw = maxX - minX + 1
      const bh = maxY - minY + 1
      const area = count
      if (area < 12 || area > z.width * z.height * 0.08) continue
      if (bw < 4 || bh < 4) continue
      blobs.push({
        zone: name,
        left: minX,
        top: minY,
        width: bw,
        height: bh,
        area,
        cx: (minX + maxX) / 2 / W,
        cy: (minY + maxY) / 2 / H,
      })
    }
  }
}

blobs.sort((a, b) => b.area - a.area)
console.log(JSON.stringify(blobs.slice(0, 30), null, 2))

// Debug mask overlay
const overlay = await sharp(src)
  .composite(
    blobs.map((b) => ({
      input: {
        create: {
          width: b.width + 8,
          height: b.height + 8,
          channels: 4,
          background: { r: 255, g: 0, b: 0, alpha: 0.45 },
        },
      },
      left: Math.max(0, b.left - 4),
      top: Math.max(0, b.top - 4),
    })),
  )
  .png()
  .toBuffer()

writeFileSync(path.resolve('public/images/.car-blob-debug.png'), overlay)
console.log('Wrote public/images/.car-blob-debug.png')
