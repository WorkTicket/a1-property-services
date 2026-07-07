/**
 * Detect and remove car-like AI artifacts from hero aerial (pavement zones only).
 * Usage: node scripts/remove-hero-car-artifacts.mjs [source-png] [output-png]
 */
import sharp from 'sharp'
import { existsSync } from 'fs'
import path from 'path'

const defaultSrc = path.resolve(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-no-cars-clean.png',
)
const src = path.resolve(process.argv[2] ?? defaultSrc)
const dest = path.resolve(
  process.argv[3] ??
    path.join(
      process.env.USERPROFILE ?? '',
      '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/aerial-city-hero-final.png',
    ),
)

if (!existsSync(src)) {
  console.error('Source not found:', src)
  process.exit(1)
}

const meta = await sharp(src).metadata()
const W = meta.width
const H = meta.height

const { data } = await sharp(src).greyscale().raw().toBuffer({ resolveWithObject: true })

const ZONES = [
  ['main-right-lot', 0.44, 0.30, 0.30, 0.22],
  ['behind-lot', 0.38, 0.24, 0.24, 0.14],
  ['far-right', 0.78, 0.32, 0.21, 0.18],
  ['mid-road-a', 0.50, 0.38, 0.24, 0.14],
  ['mid-road-b', 0.26, 0.40, 0.20, 0.12],
  ['bridge-approach', 0.10, 0.42, 0.88, 0.12],
]

function zoneRect([, l, t, w, h]) {
  return {
    left: Math.round(l * W),
    top: Math.round(t * H),
    width: Math.round(w * W),
    height: Math.round(h * H),
  }
}

function ringStats(x, y, w, h, pad = 10) {
  const values = []
  const x0 = Math.max(0, x - pad)
  const y0 = Math.max(0, y - pad)
  const x1 = Math.min(W, x + w + pad)
  const y1 = Math.min(H, y + h + pad)
  for (let py = y0; py < y1; py++) {
    for (let px = x0; px < x1; px++) {
      const inside = px >= x && px < x + w && py >= y && py < y + h
      if (inside) continue
      values.push(data[py * W + px])
    }
  }
  if (!values.length) return { median: 128, spread: 20 }
  values.sort((a, b) => a - b)
  const median = values[Math.floor(values.length / 2)]
  const p10 = values[Math.floor(values.length * 0.1)]
  const p90 = values[Math.floor(values.length * 0.9)]
  return { median, spread: p90 - p10 }
}

function blobStats(x, y, w, h) {
  let sum = 0
  let count = 0
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      sum += data[py * W + px]
      count++
    }
  }
  return sum / count
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
  const mad = pixels[Math.floor(pixels.length / 2)] // rough
  const p20 = pixels[Math.floor(pixels.length * 0.2)]
  const p80 = pixels[Math.floor(pixels.length * 0.8)]
  const threshold = Math.max(14, (p80 - p20) * 0.55)

  const mask = new Uint8Array(W * H)
  for (let y = z.top; y < z.top + z.height; y++) {
    for (let x = z.left; x < z.left + z.width; x++) {
      const v = data[y * W + x]
      if (Math.abs(v - median) > threshold) mask[y * W + x] = 255
    }
  }

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
      const aspect = bw / bh
      if (area < 60 || area > 4000) continue
      if (aspect < 0.35 || aspect > 5) continue
      if (bw < 8 || bh < 6) continue

      const ring = ringStats(minX, minY, bw, bh, 12)
      if (ring.median < 75 || ring.median > 195) continue
      if (ring.spread > 90) continue

      const blobMean = blobStats(minX, minY, bw, bh)
      if (Math.abs(blobMean - ring.median) < 10) continue

      blobs.push({
        zone: name,
        left: minX,
        top: minY,
        width: bw,
        height: bh,
        area,
        ringMedian: ring.median,
      })
    }
  }
}

// Merge overlapping boxes
blobs.sort((a, b) => b.area - a.area)
const merged = []
for (const b of blobs) {
  const overlap = merged.find(
    (m) =>
      !(b.left + b.width < m.left - 4 || m.left + m.width < b.left - 4 || b.top + b.height < m.top - 4 || m.top + m.height < b.top - 4),
  )
  if (!overlap) merged.push(b)
}

console.log(`Detected ${merged.length} car-like blobs:`)
for (const b of merged) {
  console.log(`  ${b.zone}: ${b.width}x${b.height} @ (${b.left},${b.top}) area=${b.area}`)
}

function featheredMask(width, height) {
  const pad = Math.max(3, Math.round(Math.min(width, height) * 0.18))
  const svg = `<svg width="${width}" height="${height}">
    <rect x="${pad}" y="${pad}" width="${width - pad * 2}" height="${height - pad * 2}"
      rx="${pad}" ry="${pad}" fill="white" opacity="1"/>
  </svg>`
  return Buffer.from(svg)
}

function pickCloneOrigin(b) {
  const pad = 16
  const candidates = [
    { left: b.left - b.width - pad, top: b.top },
    { left: b.left + b.width + pad, top: b.top },
    { left: b.left, top: b.top - b.height - pad },
    { left: b.left, top: b.top + b.height + pad },
    { left: b.left - b.width - pad, top: b.top - pad },
  ]
  for (const c of candidates) {
    if (c.left < 0 || c.top < 0 || c.left + b.width > W || c.top + b.height > H) continue
    const mean = blobStats(c.left, c.top, b.width, b.height)
    if (Math.abs(mean - b.ringMedian) < 18) return c
  }
  return { left: Math.max(0, b.left - b.width - 20), top: b.top }
}

let pipeline = sharp(src)

for (const b of merged) {
  const pad = 6
  const left = Math.max(0, b.left - pad)
  const top = Math.max(0, b.top - pad)
  const width = Math.min(W - left, b.width + pad * 2)
  const height = Math.min(H - top, b.height + pad * 2)
  const clone = pickCloneOrigin({ ...b, width: width - pad * 2, height: height - pad * 2 })

  const patch = await sharp(src)
    .extract({
      left: clone.left,
      top: clone.top,
      width: Math.min(width, W - clone.left),
      height: Math.min(height, H - clone.top),
    })
    .resize(width, height, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .blur(0.4)
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

await pipeline.png().toFile(dest)
console.log(`Saved → ${dest}`)

// Second pass on output for remaining large blobs
const pass2 = await sharp(dest).toBuffer()
const pass2Meta = await sharp(pass2).metadata()
const W2 = pass2Meta.width
const H2 = pass2Meta.height
const { data: data2 } = await sharp(pass2).greyscale().raw().toBuffer({ resolveWithObject: true })

const MANUAL = [
  [940, 360, 120, 115],
  [1400, 340, 100, 60],
  [860, 450, 80, 70],
  [1310, 340, 95, 55],
  [600, 330, 110, 55],
  [1260, 425, 230, 60],
]

let pipeline2 = sharp(pass2)
for (const [left, top, width, height] of MANUAL) {
  const b = { left, top, width, height, ringMedian: 130 }
  const pad = 8
  const l = Math.max(0, left - pad)
  const t = Math.max(0, top - pad)
  const w = Math.min(W2 - l, width + pad * 2)
  const h = Math.min(H2 - t, height + pad * 2)
  const clone = pickCloneOrigin({ ...b, width: w - pad * 2, height: h - pad * 2 })

  const patch = await sharp(pass2)
    .extract({
      left: Math.max(0, clone.left),
      top: Math.max(0, clone.top),
      width: Math.min(w, W2 - Math.max(0, clone.left)),
      height: Math.min(h, H2 - Math.max(0, clone.top)),
    })
    .resize(w, h, { fit: 'fill', kernel: sharp.kernel.lanczos3 })
    .blur(0.5)
    .toBuffer()

  const masked = await sharp(patch)
    .ensureAlpha()
    .composite([
      {
        input: await sharp(featheredMask(w, h)).resize(w, h).png().toBuffer(),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer()

  pipeline2 = pipeline2.composite([{ input: masked, left: l, top: t, blend: 'over' }])
}

await pipeline2.png().toFile(dest)
console.log(`Pass 2 complete → ${dest}`)
