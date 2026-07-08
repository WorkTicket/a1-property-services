import { rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const cacheDir = join('.next', 'cache')

if (existsSync(cacheDir)) {
  rmSync(cacheDir, { recursive: true, force: true })
  console.log('Removed .next/cache')
} else {
  console.log('No .next/cache to remove')
}
