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
  const srcset = getLcpPreloadSrcset(src)

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={getLcpPreloadHref(src, 640)}
        imageSrcSet={srcset}
        imageSizes={sizes}
        type="image/avif"
        fetchPriority="high"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href={getLcpPreloadHref(src, 1920)}
        imageSrcSet={srcset}
        imageSizes={sizes}
        type="image/avif"
        fetchPriority="high"
        media="(min-width: 769px)"
      />
    </>
  )
}
