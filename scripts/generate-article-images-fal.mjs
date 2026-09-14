/**
 * Generate a unique dedicated photo for every Knowledge Center and blog article.
 * These are not recycled from gallery or service pages.
 *
 * Usage:
 *   node scripts/generate-article-images-fal.mjs
 *   node scripts/generate-article-images-fal.mjs --only=learn:planning-retaining-wall-project
 *   node scripts/generate-article-images-fal.mjs --dry-run
 *
 * After running: node scripts/rebuild-article-image-variants.mjs
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fal } from '@fal-ai/client'
import { articleFilename, buildArticlePrompt } from './article-image-prompts.mjs'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const IMAGES_DIR = path.join(ROOT, 'public/images')
const MODEL = 'fal-ai/flux-pro/v1.1'
const WIDTH = 1280
const HEIGHT = 720

function loadFalKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(DEV_VARS)) return null
  const line = readFileSync(DEV_VARS, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('FAL_KEY='))
  return line?.slice('FAL_KEY='.length).trim() || null
}

function seedFor(name) {
  let h = 2166136261
  for (let i = 0; i < name.length; i += 1) {
    h ^= name.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 1_000_000
}

function parseArticles(filePath, kind) {
  const text = readFileSync(filePath, 'utf8')
  const re = /slug:\s*'([^']+)'\s*,?\s*\r?\n\s*title:\s*'([^']+)'/g
  const items = []
  let match
  while ((match = re.exec(text))) {
    items.push({ kind, slug: match[1], title: match[2] })
  }
  return items
}

function allArticles() {
  const seen = new Set()
  const items = [
    ...parseArticles(path.join(ROOT, 'lib/learn-commercial.ts'), 'learn'),
    ...parseArticles(path.join(ROOT, 'lib/learn.ts'), 'learn'),
    ...parseArticles(path.join(ROOT, 'lib/blog-posts-new.ts'), 'blog'),
    ...parseArticles(path.join(ROOT, 'lib/blog.ts'), 'blog'),
  ]
  return items.filter((item) => {
    const key = `${item.kind}:${item.slug}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

async function generateImage(filename, prompt) {
  const destPath = path.join(IMAGES_DIR, filename)
  console.log(`  ${filename}: generating...`)

  const result = await fal.subscribe(MODEL, {
    input: {
      prompt: `${prompt}.`,
      image_size: { width: WIDTH, height: HEIGHT },
      num_images: 1,
      seed: seedFor(filename),
      safety_tolerance: '5',
      output_format: 'png',
    },
    logs: false,
  })

  const url = result.data?.images?.[0]?.url
  if (!url) throw new Error(`No image returned for ${filename}`)

  const buffer = Buffer.from(await (await fetch(url)).arrayBuffer())
  const webp = await sharp(buffer)
    .rotate()
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center', kernel: sharp.kernel.lanczos3 })
    .webp({ quality: 90, effort: 6 })
    .toBuffer()

  writeFileSync(destPath, webp)
  console.log(`    → ${path.relative(ROOT, destPath)}`)
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const force = process.argv.includes('--force')
  const onlyArg = process.argv.find((a) => a.startsWith('--only='))
  const only = onlyArg?.split('=')[1]

  const articles = allArticles().filter((item) => {
    if (!only) return true
    if (only.includes(':')) return `${item.kind}:${item.slug}` === only
    return item.slug === only
  })

  if (articles.length === 0) {
    console.error('No matching articles.')
    process.exit(1)
  }

  const jobs = articles.map((item) => ({
    filename: articleFilename(item.kind, item.slug),
    prompt: buildArticlePrompt(item),
    item,
  }))

  if (dryRun) {
    if (process.argv.includes('--json')) {
      console.log(JSON.stringify(jobs.map((job) => ({
        kind: job.item.kind,
        slug: job.item.slug,
        title: job.item.title,
        filename: job.filename,
        prompt: job.prompt,
      })), null, 2))
      return
    }
    for (const job of jobs) {
      console.log(`\n${job.item.kind}/${job.item.slug}`)
      console.log(job.prompt)
    }
    console.log(`\n${jobs.length} unique prompts.`)
    return
  }

  const key = loadFalKey()
  if (!key) {
    console.error('FAL_KEY is required. Add it to .dev.vars or set the environment variable.')
    process.exit(1)
  }
  fal.config({ credentials: key })

  if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true })

  let generated = 0
  let skipped = 0
  let failed = 0

  for (const job of jobs) {
    const destPath = path.join(IMAGES_DIR, job.filename)
    if (!force && existsSync(destPath)) {
      skipped += 1
      console.log(`  ${job.filename}: skip (exists)`)
      continue
    }
    try {
      await generateImage(job.filename, job.prompt)
      generated += 1
    } catch (error) {
      failed += 1
      console.error(`  ✗ ${job.filename}: ${error.message}`)
    }
  }

  console.log(`\nDone. generated=${generated} skipped=${skipped} failed=${failed} total=${jobs.length}`)
  console.log('Next: node scripts/rebuild-article-image-variants.mjs')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
