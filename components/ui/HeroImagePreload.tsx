import { getLcpPreloadHref, getLcpPreloadSrcset } from '@/lib/responsive-image'
import { IMAGE_SIZES } from '@/lib/image-sizes'

type HeroImagePreloadProps = {
  src: string
  sizes?: string
}

export default function HeroImagePreload({
  src,
  sizes = IMAGE_SIZES.hero,
}: HeroImagePreloadProps) {
  return (
    <link
      rel="preload"
      as="image"
      href={getLcpPreloadHref(src, 768)}
      imageSrcSet={getLcpPreloadSrcset(src)}
      imageSizes={sizes}
      type="image/avif"
      fetchPriority="high"
    />
  )
}
