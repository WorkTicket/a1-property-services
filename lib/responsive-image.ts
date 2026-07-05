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

export function getLcpPreloadHref(src: string, preferredWidth = 768): string {
  return getVariantUrl(src, 'avif', preferredWidth)
}

export function getLcpPreloadSrcset(src: string): string {
  const avifSrcset = buildSrcset(src, 'avif')
  const entry = manifest[src]
  if (entry) {
    return `${avifSrcset}, ${src} ${entry.width}w`
  }
  return avifSrcset
}

export function getHeroBackgroundStyle(src: string, preferredWidth = 640) {
  const url = getVariantUrl(src, 'avif', preferredWidth)
  return {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.55)), url(${url})`,
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center' as const,
    backgroundRepeat: 'no-repeat' as const,
  }
}

export { FORMATS }
