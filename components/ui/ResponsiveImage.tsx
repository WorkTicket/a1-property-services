import { cn } from '@/lib/utils'
import { FORMATS, buildSrcset, getImageDimensions } from '@/lib/responsive-image'

type ResponsiveImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
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
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
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
      {FORMATS.map((format) => {
        const srcset = buildSrcset(src, format)
        const type = format === 'jpeg' ? 'image/jpeg' : `image/${format}`
        return <source key={format} srcSet={srcset} sizes={sizes} type={type} />
      })}
      <img
        src={src}
        alt={alt}
        width={fill ? dimensions?.width : width}
        height={fill ? dimensions?.height : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClass}
        style={imgStyle}
      />
    </picture>
  )
}
