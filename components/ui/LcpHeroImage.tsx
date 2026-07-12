import type { CSSProperties } from 'react'
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

/** LCP hero: AVIF-first picture; preload in HeroImagePreload must use the same format. */
export default function LcpHeroImage({
  src,
  alt,
  sizes = IMAGE_SIZES.hero,
  className,
  objectPosition,
}: LcpHeroImageProps) {
  const dimensions = getImageDimensions(src)
  const avifSrcset = buildSrcset(src, 'avif')
  const webpSrcset = buildSrcset(src, 'webp')
  const imgStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    ...(objectPosition ? { objectPosition } : {}),
  }

  return (
    <picture className={cn('absolute inset-0 block h-full w-full', className)}>
      <source srcSet={avifSrcset} sizes={sizes} type="image/avif" />
      <source srcSet={webpSrcset} sizes={sizes} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getVariantUrl(src, 'webp', 480)}
        srcSet={webpSrcset}
        sizes={sizes}
        alt={alt}
        width={dimensions?.width ?? 1920}
        height={dimensions?.height ?? 1440}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        data-hero-lcp=""
        className="absolute inset-0 h-full w-full object-cover"
        style={imgStyle}
      />
    </picture>
  )
}
