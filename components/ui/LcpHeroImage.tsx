import { cn } from '@/lib/utils'
import { buildSrcset, getImageDimensions, getLcpPreloadHref } from '@/lib/responsive-image'

type LcpHeroImageProps = {
  src: string
  alt: string
  sizes?: string
  className?: string
}

export default function LcpHeroImage({
  src,
  alt,
  sizes = '100vw',
  className,
}: LcpHeroImageProps) {
  const dimensions = getImageDimensions(src)
  const avifSrcset = buildSrcset(src, 'avif')
  const webpSrcset = buildSrcset(src, 'webp')

  return (
    <picture className="absolute inset-0 block h-full w-full">
      <source srcSet={webpSrcset} sizes={sizes} type="image/webp" />
      <img
        src={getLcpPreloadHref(src)}
        srcSet={avifSrcset}
        sizes={sizes}
        alt={alt}
        width={dimensions?.width}
        height={dimensions?.height}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
      />
    </picture>
  )
}
