import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

const ROOT = path.resolve('public/images')
const SOURCE = path.resolve(
  process.env.USERPROFILE,
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/c__Users_Slay3r_AppData_Roaming_Cursor_User_workspaceStorage_98af54def8019a03ecdb0c968b92e0d6_images_Document-1a5e3913-5922-4a81-b926-27d5ac6f335c.png',
)

const POSTER = path.join(ROOT, 'hero-background-image.webp')
const MP4 = path.join(ROOT, 'hero-drone-cedar-falls.mp4')
const WEBM = path.join(ROOT, 'hero-drone-cedar-falls.webm')
const DURATION = 14
const FPS = 24
const FRAMES = DURATION * FPS

if (!existsSync(SOURCE)) {
  console.error('Source drone image not found:', SOURCE)
  process.exit(1)
}

console.log('Creating poster webp...')
await sharp(SOURCE)
  .resize(2560, null, { withoutEnlargement: true })
  .webp({ quality: 88, effort: 6 })
  .toFile(POSTER)

// Slow forward drone push: gentle zoom + drift toward downtown along the river
const vf = [
  'scale=7680:-1:flags=lanczos',
  `zoompan=z='min(1.0+0.00035*on,1.14)':x='iw/2-(iw/zoom/2)+on*0.55':y='ih*0.38-(ih/zoom/2)+on*0.08':d=${FRAMES}:s=1920x1080:fps=${FPS}`,
  'format=yuv420p',
].join(',')

console.log('Rendering slow-motion drone MP4...')
execSync(
  `ffmpeg -y -loop 1 -i "${SOURCE}" -vf "${vf}" -t ${DURATION} -c:v libx264 -crf 22 -preset slow -movflags +faststart -an "${MP4}"`,
  { stdio: 'inherit' },
)

console.log('Rendering WebM...')
execSync(
  `ffmpeg -y -i "${MP4}" -c:v libvpx-vp9 -crf 34 -b:v 0 -an "${WEBM}"`,
  { stdio: 'inherit' },
)

console.log('Done.')
console.log('  Poster:', POSTER)
console.log('  MP4:   ', MP4)
console.log('  WebM:  ', WEBM)
