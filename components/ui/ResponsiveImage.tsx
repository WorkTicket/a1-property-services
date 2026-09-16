import { cn } from '@/lib/utils'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { DISPLAY_FORMATS, buildSrcset, getImageDimensions, getVariantUrl } from '@/lib/responsive-image'

type ResponsiveImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  maxWidth?: number
  className?: string
  fill?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  style?: React.CSSProperties
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = IMAGE_SIZES.halfCol,
  maxWidth,
  className = '',
  fill = false,
  objectFit = 'cover',
  objectPosition,
  style,
}: ResponsiveImageProps) {
  const dimensions = getImageDimensions(src)
  const imgStyle: React.CSSProperties = {
    objectFit,
    ...(objectPosition ? { objectPosition } : {}),
    ...style,
  }

  const imgClass = cn(
    fill && 'absolute inset-0 h-full w-full',
    objectFit === 'cover' && 'object-cover',
    objectFit === 'contain' && 'object-contain',
    className,
  )

  return (
    <picture className={fill ? 'absolute inset-0 block h-full w-full' : undefined}>
      {DISPLAY_FORMATS.map((format) => {
        const srcset = buildSrcset(src, format, maxWidth)
        return <source key={format} srcSet={srcset} sizes={sizes} type={`image/${format}`} />
      })}
      <img
        src={getVariantUrl(src, 'webp', priority ? 1536 : 768)}
        alt={alt}
        width={fill ? dimensions?.width : width}
        height={fill ? dimensions?.height : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClass}
        style={imgStyle}
      />
    </picture>
  )
}
