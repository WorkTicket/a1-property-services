import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { buildSrcset, getBlurPlaceholder, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'

type LcpHeroImageProps = {
  src: string
  alt: string
  sizes?: string
  maxWidth?: number
  className?: string
  objectPosition?: string
}

/** LCP hero: AVIF-first picture; preload in HeroImagePreload must use the same format. */
export default function LcpHeroImage({
  src,
  alt,
  sizes = IMAGE_SIZES.hero,
  maxWidth,
  className,
  objectPosition,
}: LcpHeroImageProps) {
  const dimensions = getImageDimensions(src)
  const avifSrcset = buildSrcset(src, 'avif', maxWidth)
  const webpSrcset = buildSrcset(src, 'webp', maxWidth)
  const blurPlaceholder = getBlurPlaceholder(src)
  const position = objectPosition || 'var(--hero-object-position, center)'
  const imgStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'var(--hero-object-fit, cover)' as CSSProperties['objectFit'],
    objectPosition: position,
  }
  const pictureStyle: CSSProperties | undefined = blurPlaceholder
    ? {
        backgroundImage: `url("${blurPlaceholder}")`,
        backgroundSize: 'cover',
        backgroundPosition: position,
      }
    : undefined

  return (
    <picture
      className={cn('absolute inset-0 block h-full w-full bg-neutral-900', className)}
      style={pictureStyle}
    >
      <source srcSet={avifSrcset} sizes={sizes} type="image/avif" />
      <source srcSet={webpSrcset} sizes={sizes} type="image/webp" />
      <img
        src={getVariantUrl(src, 'avif', 768)}
        srcSet={webpSrcset}
        sizes={sizes}
        alt={alt}
        width={dimensions?.width ?? 1920}
        height={dimensions?.height ?? 1440}
        loading="eager"
        fetchPriority="high"
        data-hero-lcp=""
        className="absolute inset-0 h-full w-full object-cover"
        style={imgStyle}
      />
    </picture>
  )
}
