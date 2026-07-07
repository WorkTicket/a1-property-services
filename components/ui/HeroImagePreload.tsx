import { buildSrcset, getVariantUrl } from '@/lib/responsive-image'
import { IMAGE_SIZES } from '@/lib/image-sizes'

type HeroImagePreloadProps = {
  src: string
  sizes?: string
}

export default function HeroImagePreload({
  src,
  sizes = IMAGE_SIZES.hero,
}: HeroImagePreloadProps) {
  const srcset = buildSrcset(src, 'webp')

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={getVariantUrl(src, 'webp', 768)}
        imageSrcSet={srcset}
        imageSizes={sizes}
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href={getVariantUrl(src, 'webp', 2560)}
        imageSrcSet={srcset}
        imageSizes={sizes}
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 769px)"
      />
    </>
  )
}
