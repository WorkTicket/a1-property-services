/**
 * Export after images as JPEG refs for before regeneration, and back up current befores.
 * Usage: node scripts/prepare-before-regen.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import path from 'path'

const ROOT = path.resolve('.')
const IMAGES = path.join(ROOT, 'public/images')
const REFS = path.join(ROOT, '.tmp_refs')
const BACKUP = path.join(ROOT, '.image-backups/gallery-befores-pre-fal-regen')

const GROUPS = ['patio', 'driveway', 'mowing', 'landscape']

mkdirSync(REFS, { recursive: true })
mkdirSync(BACKUP, { recursive: true })

const manifest = {}

for (const g of GROUPS) {
  for (let n = 1; n <= 5; n++) {
    const afterName = `${g}-after-${n}`
    const beforeName = `${g}-before-${n}`
    const afterPath = path.join(IMAGES, `${afterName}.webp`)
    const beforePath = path.join(IMAGES, `${beforeName}.webp`)
    const refPath = path.join(REFS, `${afterName}.jpg`)

    const meta = await sharp(readFileSync(afterPath)).metadata()
    const maxDim = Math.max(meta.width, meta.height)
    const resizeTo = maxDim > 1600 ? 1280 : 1024

    await sharp(readFileSync(afterPath))
      .resize(resizeTo, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 88 })
      .toFile(refPath)

    if (existsSync(beforePath)) {
      copyFileSync(beforePath, path.join(BACKUP, `${beforeName}.webp`))
    }

    manifest[beforeName] = {
      after: afterPath,
      ref: refPath,
      width: meta.width,
      height: meta.height,
      aspect: meta.width / meta.height,
    }
    console.log(`${beforeName}: ${meta.width}x${meta.height} (ref → ${path.relative(ROOT, refPath)})`)
  }
}

writeFileSync(path.join(REFS, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`\nBacked up befores → ${path.relative(ROOT, BACKUP)}`)
console.log(`Wrote manifest → ${path.relative(ROOT, path.join(REFS, 'manifest.json'))}`)
