import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import path from 'path'

const ASSETS = path.resolve(
  process.env.HOME || process.env.USERPROFILE,
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets',
)
const OUT = path.resolve('public/images')

const CONTENT_FILES = new Set([
  'content-landscaping-cedar-falls',
  'content-retaining-wall-cedar-falls',
  'content-water-features-cedar-falls',
  'content-landscape-installation',
  'content-paver-patio-cedar-falls',
])

const files = existsSync(ASSETS)
  ? readdirSync(ASSETS).filter((f) => f.endsWith('.png') && CONTENT_FILES.has(f.replace(/\.png$/i, '')))
  : []

if (!files.length) {
  console.log('No page content PNG files found in assets folder.')
  process.exit(0)
}

for (const file of files) {
  const src = path.join(ASSETS, file)
  const base = file.replace(/\.png$/i, '')
  const dest = path.join(OUT, `${base}.webp`)
  await sharp(src)
    .resize(1536, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 88, effort: 6 })
    .toFile(dest)
  console.log(`  ${file} → ${base}.webp`)
}

console.log(`Deployed ${files.length} page content images. Run npm run build:images to refresh variants.`)
