import { getLcpPreloadHref, getLcpPreloadSrcset } from '@/lib/responsive-image'
import { IMAGE_SIZES } from '@/lib/image-sizes'

type HeroImagePreloadProps = {
  src: string
  sizes?: string
  maxWidth?: number
}

export default function HeroImagePreload({
  src,
  sizes = IMAGE_SIZES.hero,
  maxWidth,
}: HeroImagePreloadProps) {
  const hrefWidth = Math.min(768, maxWidth ?? 768)

  return (
    <link
      rel="preload"
      as="image"
      href={getLcpPreloadHref(src, hrefWidth)}
      imageSrcSet={getLcpPreloadSrcset(src, maxWidth)}
      imageSizes={sizes}
      type="image/avif"
      fetchPriority="high"
    />
  )
}
