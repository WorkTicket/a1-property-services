import { createHash } from 'crypto'
import {
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
  existsSync,
} from 'fs'
import path from 'path'

const ROOT = path.resolve('.')
const IMAGES_ROOT = path.join(ROOT, 'public', 'images')
const MANIFEST_PATH = path.join(IMAGES_ROOT, 'image-manifest.json')
const DELETE = process.argv.includes('--delete')

const IMAGE_EXT = /\.(webp|png|jpg|jpeg|avif|gif|svg|ico|mp4|webm)$/i
const SCAN_DIRS = ['app', 'components', 'lib', 'public']
const SCAN_EXT = /\.(ts|tsx|js|jsx|xml|css|html|json)$/i
const EXCLUDED_JSON = new Set([
  'public/images/image-manifest.json',
  'scripts/image-audit-report.json',
])

const CITY_SLUGS = [
  'cedar-falls',
  'waterloo',
  'hudson',
  'evansdale',
  'waverly',
  'denver',
  'jesup',
  'parkersburg',
  'la-porte-city',
  'dike',
  'elk-run-heights',
  'dunkerton',
]

function walkFiles(dir, filter) {
  const results = []
  if (!existsSync(dir)) return results
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const rel = path.relative(ROOT, full).replace(/\\/g, '/')
    if (entry.isDirectory()) {
      if (entry.name === 'generated' || entry.name === 'gallery-hq') continue
      results.push(...walkFiles(full, filter))
    } else if (!filter || filter(full)) {
      results.push(full)
    }
  }
  return results
}

function walkAllPublicImages() {
  const results = []
  const publicDir = path.join(ROOT, 'public')
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (IMAGE_EXT.test(entry.name)) {
        results.push(full)
      }
    }
  }
  walk(publicDir)
  return results
}

function collectReferencedPaths() {
  const refs = new Set()
  const pattern = /(?:\/images\/[^\s"'`)\\]+|\/og-image\.(?:jpg|png|webp))/g

  for (const scanDir of SCAN_DIRS) {
    const absDir = path.join(ROOT, scanDir)
    for (const file of walkFiles(absDir, (f) => SCAN_EXT.test(f))) {
      const rel = path.relative(ROOT, file).replace(/\\/g, '/')
      if (EXCLUDED_JSON.has(rel)) continue
      if (rel.startsWith('public/') && !['public/feed.xml', 'public/manifest.json', 'public/_redirects'].includes(rel)) {
        if (rel.endsWith('.json')) continue
      }

      const content = readFileSync(file, 'utf8')
      for (const match of content.matchAll(pattern)) {
        let ref = match[0].replace(/\\+$/, '')
        if (ref.includes('${')) continue
        ref = ref.split('?')[0]
        if (ref === '/images/generated' || ref === '/images/gallery-hq') continue
        refs.add(ref)
      }

      for (const match of content.matchAll(/img\(['"]([^'"]+)['"]\)/g)) {
        refs.add(`/images/${match[1]}`)
      }
    }
  }

  for (const slug of CITY_SLUGS) {
    refs.add(`/images/${slug}-hero.webp`)
  }

  refs.add('/og-image.jpg')
  return refs
}

function loadManifest() {
  if (!existsSync(MANIFEST_PATH)) return {}
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
}

function expandWithManifest(refs, manifest) {
  const expanded = new Set(refs)

  for (const ref of refs) {
    expanded.add(ref)
    const entry = manifest[ref]
    if (!entry?.variants) continue
    for (const formatVariants of Object.values(entry.variants)) {
      for (const variantPath of Object.values(formatVariants)) {
        expanded.add(variantPath)
      }
    }
  }

  return expanded
}

function diskPathFromRef(ref) {
  return path.join(ROOT, 'public', ref.replace(/^\//, ''))
}

function refFromDiskPath(filePath) {
  const rel = path.relative(path.join(ROOT, 'public'), filePath).replace(/\\/g, '/')
  return `/${rel}`
}

function isDebugOrArtifact(name) {
  const base = path.basename(name)
  return (
    base.startsWith('.') ||
    base.startsWith('_') ||
    /(^|[-_])(debug|crop|deploy|final|sync|latest|done|inspect|check|patched|artifact|blob|tree-zone)([-_.]|$)/i.test(
      base,
    )
  )
}

function isLegacyRootAvif(ref) {
  return /^\/images\/[^/]+\.avif$/i.test(ref) && !ref.includes('/generated/')
}

function hashFile(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex')
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function main() {
  const refs = collectReferencedPaths()
  const manifest = loadManifest()
  const usedRefs = expandWithManifest(refs, manifest)

  const diskImages = walkAllPublicImages()
  const unused = []
  const debugArtifacts = []
  const legacyAvifs = []
  let reclaimableBytes = 0

  for (const file of diskImages) {
    const ref = refFromDiskPath(file)
    const name = path.basename(file)
    const size = statSync(file).size

    if (isDebugOrArtifact(name)) {
      debugArtifacts.push({ file, ref, size })
      reclaimableBytes += size
      continue
    }

    if (isLegacyRootAvif(ref)) {
      legacyAvifs.push({ file, ref, size })
      reclaimableBytes += size
      continue
    }

    if (!usedRefs.has(ref)) {
      unused.push({ file, ref, size })
      reclaimableBytes += size
    }
  }

  const usedSourceFiles = diskImages
    .filter((f) => {
      const ref = refFromDiskPath(f)
      return refs.has(ref) && !ref.includes('/generated/')
    })
    .filter((f) => !isDebugOrArtifact(path.basename(f)))

  const hashGroups = new Map()
  for (const file of usedSourceFiles) {
    try {
      const hash = hashFile(file)
      if (!hashGroups.has(hash)) hashGroups.set(hash, [])
      hashGroups.get(hash).push(file)
    } catch {
      // skip
    }
  }
  const duplicateGroups = [...hashGroups.values()].filter((g) => g.length > 1)

  console.log('=== Image audit ===')
  console.log(`Referenced source paths: ${refs.size}`)
  console.log(`Used paths (with generated variants): ${usedRefs.size}`)
  console.log(`Files on disk: ${diskImages.length}`)
  console.log(`Unused/orphan files: ${unused.length}`)
  console.log(`Legacy root .avif duplicates: ${legacyAvifs.length}`)
  console.log(`Debug/artifact files: ${debugArtifacts.length}`)
  console.log(`Total reclaimable: ${formatBytes(reclaimableBytes)}`)
  console.log(`Duplicate source groups: ${duplicateGroups.length}`)

  const sortBySize = (a, b) => b.size - a.size

  if (unused.length) {
    console.log('\n--- Unused / orphan files ---')
    for (const item of unused.sort(sortBySize).slice(0, 60)) {
      console.log(`  ${item.ref} (${formatBytes(item.size)})`)
    }
    if (unused.length > 60) console.log(`  ... and ${unused.length - 60} more`)
  }

  if (legacyAvifs.length) {
    console.log('\n--- Legacy root .avif (unused, generated variants used instead) ---')
    console.log(`  ${legacyAvifs.length} files, ${formatBytes(legacyAvifs.reduce((s, f) => s + f.size, 0))}`)
  }

  if (debugArtifacts.length) {
    console.log('\n--- Debug/artifact files ---')
    for (const item of debugArtifacts.slice(0, 30)) {
      console.log(`  ${item.ref}`)
    }
    if (debugArtifacts.length > 30) {
      console.log(`  ... and ${debugArtifacts.length - 30} more`)
    }
  }

  if (duplicateGroups.length) {
    console.log('\n--- Duplicate source images (identical content) ---')
    for (const group of duplicateGroups) {
      const paths = group.map(refFromDiskPath)
      const used = paths.filter((p) => refs.has(p))
      const unusedDupes = paths.filter((p) => !refs.has(p))
      console.log(`  used: ${used.join(', ') || '(none)'}`)
      if (unusedDupes.length) console.log(`  remove: ${unusedDupes.join(', ')}`)
    }
  }

  const toDelete = [
    ...unused.map((u) => u.file),
    ...legacyAvifs.map((u) => u.file),
    ...debugArtifacts.map((u) => u.file),
  ]

  for (const group of duplicateGroups) {
    const paths = group.map(refFromDiskPath)
    const used = paths.filter((p) => refs.has(p))
    const unusedDupes = paths.filter((p) => !refs.has(p))
    for (const ref of unusedDupes) {
      const file = diskPathFromRef(ref)
      if (existsSync(file) && !toDelete.includes(file)) {
        toDelete.push(file)
      }
    }
    if (used.length === 0 && paths.length > 1) {
      const keep = paths[0]
      for (const ref of paths.slice(1)) {
        const file = diskPathFromRef(ref)
        if (existsSync(file) && !toDelete.includes(file)) toDelete.push(file)
      }
      console.log(`\nNote: duplicate group with no code refs, keeping ${keep}`)
    }
  }

  if (DELETE) {
    let deleted = 0
    let deletedBytes = 0
    for (const file of toDelete) {
      try {
        deletedBytes += statSync(file).size
        unlinkSync(file)
        deleted++
      } catch (e) {
        console.error(`Failed to delete ${file}: ${e.message}`)
      }
    }
    console.log(`\nDeleted ${deleted} files (${formatBytes(deletedBytes)}).`)

    const cleanedManifest = {}
    for (const [key, value] of Object.entries(manifest)) {
      if (refs.has(key) && existsSync(diskPathFromRef(key))) {
        cleanedManifest[key] = value
      }
    }
    writeFileSync(MANIFEST_PATH, JSON.stringify(cleanedManifest, null, 2))
    console.log(`Manifest trimmed to ${Object.keys(cleanedManifest).length} entries.`)
  } else {
    console.log(`\nRun with --delete to remove ${toDelete.length} files.`)
  }

  writeFileSync(
    path.join(ROOT, 'scripts', 'image-audit-report.json'),
    JSON.stringify(
      {
        referenced: [...refs].sort(),
        unused: unused.map((u) => ({ ref: u.ref, size: u.size })),
        legacyAvifs: legacyAvifs.map((u) => ({ ref: u.ref, size: u.size })),
        debugArtifacts: debugArtifacts.map((u) => u.ref),
        duplicateGroups: duplicateGroups.map((g) => g.map(refFromDiskPath)),
        summary: {
          referencedCount: refs.size,
          usedCount: usedRefs.size,
          diskCount: diskImages.length,
          unusedCount: unused.length,
          legacyAvifCount: legacyAvifs.length,
          debugCount: debugArtifacts.length,
          reclaimableBytes,
          deleteCount: toDelete.length,
        },
      },
      null,
      2,
    ),
  )
}

main()
