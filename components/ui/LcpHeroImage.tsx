import { cn } from '@/lib/utils'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { buildSrcset, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'

type LcpHeroImageProps = {
  src: string
  alt: string
  sizes?: string
  className?: string
}

export default function LcpHeroImage({
  src,
  alt,
  sizes = IMAGE_SIZES.hero,
  className,
}: LcpHeroImageProps) {
  const dimensions = getImageDimensions(src)
  const avifSrcset = buildSrcset(src, 'avif')

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getVariantUrl(src, 'avif', 640)}
      srcSet={avifSrcset}
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
      }}
    />
  )
}
