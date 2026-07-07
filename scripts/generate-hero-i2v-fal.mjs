import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'
import { fal } from '@fal-ai/client'

const ROOT = path.resolve('.')
const DEV_VARS = path.join(ROOT, '.dev.vars')
const SOURCE = path.join(
  process.env.USERPROFILE ?? '',
  '.cursor/projects/c-Users-Slay3r-Downloads-a1pslandscape-com/assets/c__Users_Slay3r_AppData_Roaming_Cursor_User_workspaceStorage_98af54def8019a03ecdb0c968b92e0d6_images_Document-1a5e3913-5922-4a81-b926-27d5ac6f335c.png',
)
const OUT_MP4 = path.join(ROOT, 'public/images/hero-drone-cedar-falls.mp4')
const OUT_WEBM = path.join(ROOT, 'public/images/hero-drone-cedar-falls.webm')

function loadFalKey() {
  if (process.env.FAL_KEY) return process.env.FAL_KEY
  if (!existsSync(DEV_VARS)) return null
  const line = readFileSync(DEV_VARS, 'utf8')
    .split('\n')
    .find((l) => l.startsWith('FAL_KEY='))
  return line?.slice('FAL_KEY='.length).trim() || null
}

const key = loadFalKey()
if (!key) {
  console.error('FAL_KEY is required. Add it to .dev.vars or set the environment variable.')
  console.error('Get a key at https://fal.ai/dashboard/keys')
  process.exit(1)
}

if (!existsSync(SOURCE)) {
  console.error('Source image not found:', SOURCE)
  process.exit(1)
}

fal.config({ credentials: key })

console.log('Uploading source image...')
const imageUrl = await fal.storage.upload(new Blob([readFileSync(SOURCE)], { type: 'image/png' }))

console.log('Generating real AI video (Wan 2.2 image-to-video)...')
const result = await fal.subscribe('fal-ai/wan/v2.2-a14b/image-to-video', {
  input: {
    image_url: imageUrl,
    prompt:
      'Slow cinematic aerial drone shot gliding forward over Cedar Falls Iowa. Cedar River flowing below, autumn trees gently swaying, soft clouds drifting, golden afternoon sunlight, photorealistic smooth camera motion, no people, no text.',
    resolution: '720p',
    aspect_ratio: '16:9',
    num_frames: 81,
    frames_per_second: 16,
    enable_safety_checker: false,
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === 'IN_PROGRESS') {
      update.logs?.map((log) => log.message).forEach((msg) => console.log(' ', msg))
    }
  },
})

const videoUrl = result.data?.video?.url
if (!videoUrl) {
  console.error('No video URL in response:', result)
  process.exit(1)
}

console.log('Downloading video...')
const response = await fetch(videoUrl)
const buffer = Buffer.from(await response.arrayBuffer())
writeFileSync(OUT_MP4, buffer)

console.log('Creating WebM...')
import { execSync } from 'child_process'
execSync(
  `ffmpeg -y -i "${OUT_MP4}" -c:v libvpx-vp9 -crf 32 -b:v 0 -an "${OUT_WEBM}"`,
  { stdio: 'inherit' },
)

console.log('Done.')
console.log(' MP4:', OUT_MP4)
console.log(' WebM:', OUT_WEBM)
