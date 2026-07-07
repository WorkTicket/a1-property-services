import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import path from 'path'

const ASSETS = path.resolve(
  process.env.HOME || process.env.USERPROFILE,
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets',
)
const OUT = path.resolve('public/images')

const HERO_FILES = new Set([
  'hero-background-image',
  'services-hero',
  'about-hero',
  'gallery-hero',
  'local-hero-image',
  'retaining-wall',
  'paver-patio-hero',
  'water-feature-image-1',
  'service-landscape-installation',
  'patio-wall',
  'service-lawn-care',
  'sprinklers',
  'service-preservation-restoration',
  'service-tree-service',
  'service-snow-removal',
  'service-landscape-design',
  'service-drainage',
  'service-excavation',
  'service-mulching',
  'service-rock-landscaping',
  'service-shrub-installation',
  'service-commercial-landscaping',
  'service-residential-landscaping',
  'service-grading',
  'service-outdoor-living',
])

const files = existsSync(ASSETS)
  ? readdirSync(ASSETS).filter((f) => f.endsWith('.png') && HERO_FILES.has(f.replace(/\.png$/i, '')))
  : []

if (!files.length) {
  console.log('No PNG files found in assets folder.')
  process.exit(0)
}

for (const file of files) {
  const src = path.join(ASSETS, file)
  const base = file.replace(/\.png$/i, '')
  const dest = path.join(OUT, `${base}.webp`)
  await sharp(src).webp({ quality: 88, effort: 6 }).toFile(dest)
  console.log(`  ${file} → ${base}.webp`)
}

console.log(`Deployed ${files.length} hero images.`)
