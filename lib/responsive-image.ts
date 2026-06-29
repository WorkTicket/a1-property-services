import imageManifest from '@/public/images/image-manifest.json'

const FORMATS = ['avif', 'webp', 'jpeg'] as const

export type ImageFormat = (typeof FORMATS)[number]

type ManifestEntry = {
  width: number
  height: number
  variants: Record<ImageFormat, Record<string, string>>
}

const manifest = imageManifest as Record<string, ManifestEntry>

export function imagePathBase(src: string): string {
  const withoutExt = src.replace(/\.(webp|png|jpg|jpeg|avif)$/i, '')
  const idx = withoutExt.lastIndexOf('/')
  return idx >= 0 ? withoutExt.slice(idx + 1) : withoutExt
}

export function buildSrcset(src: string, format: ImageFormat): string {
  const entry = manifest[src]
  const variants = entry?.variants?.[format]
  if (variants) {
    return Object.entries(variants)
      .map(([width, url]) => `${url} ${width}w`)
      .join(', ')
  }

  const base = imagePathBase(src)
  return `${src} ${entry?.width ?? 1920}w`
}

export function getImageDimensions(src: string): { width: number; height: number } | undefined {
  const entry = manifest[src]
  if (!entry) return undefined
  return { width: entry.width, height: entry.height }
}

export function getVariantUrl(src: string, format: ImageFormat, preferredWidth = 720): string {
  const entry = manifest[src]
  const variants = entry?.variants?.[format]
  if (variants) {
    const widths = Object.keys(variants).map(Number).sort((a, b) => a - b)
    const pick = widths.find((w) => w >= preferredWidth) ?? widths[widths.length - 1]
    return variants[String(pick)]
  }
  return src
}

export function getLcpPreloadHref(src: string): string {
  const entry = manifest[src]
  const avif = entry?.variants?.avif
  if (avif) {
    const widths = Object.keys(avif).map(Number).sort((a, b) => a - b)
    const mobile = widths.find((w) => w === 480) ?? widths[0]
    return avif[String(mobile)]
  }
  return src
}

export function getLcpPreloadSrcset(src: string): string {
  const avifSrcset = buildSrcset(src, 'avif')
  const entry = manifest[src]
  if (entry) {
    return `${avifSrcset}, ${src} ${entry.width}w`
  }
  return avifSrcset
}

export { FORMATS }
