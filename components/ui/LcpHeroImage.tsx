import { cn } from '@/lib/utils'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { buildSrcset, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'

type LcpHeroImageProps = {
  src: string
  alt: string
  sizes?: string
  className?: string
  objectPosition?: string
}

export default function LcpHeroImage({
  src,
  alt,
  sizes = IMAGE_SIZES.hero,
  className,
  objectPosition,
}: LcpHeroImageProps) {
  const dimensions = getImageDimensions(src)
  const webpSrcset = buildSrcset(src, 'webp')

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getVariantUrl(src, 'webp', 1920)}
      srcSet={webpSrcset}
      sizes={sizes}
      alt={alt}
      width={dimensions?.width ?? 1920}
      height={dimensions?.height ?? 1440}
      loading="eager"
      decoding="sync"
      fetchPriority="high"
      className={cn('absolute inset-0 h-full w-full object-cover', className)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...(objectPosition ? { objectPosition } : {}),
      }}
    />
  )
}
