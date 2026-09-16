import { preload } from 'react-dom'
import { getLcpPreloadHref, getLcpPreloadSrcset } from '@/lib/responsive-image'
import { IMAGE_SIZES } from '@/lib/image-sizes'

type HeroImagePreloadProps = {
  src: string
  sizes?: string
  maxWidth?: number
}

/** One AVIF preload hint. A second raw <link> duplicates the request. */
export default function HeroImagePreload({
  src,
  sizes = IMAGE_SIZES.hero,
  maxWidth,
}: HeroImagePreloadProps) {
  const hrefWidth = Math.min(768, maxWidth ?? 768)
  preload(getLcpPreloadHref(src, hrefWidth), {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: getLcpPreloadSrcset(src, maxWidth),
    imageSizes: sizes,
    fetchPriority: 'high',
  })
  return null
}
