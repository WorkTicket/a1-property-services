import { getLcpPreloadHref, getLcpPreloadSrcset } from '@/lib/responsive-image'

type HeroImagePreloadProps = {
  src: string
  sizes?: string
}

export default function HeroImagePreload({
  src,
  sizes = '100vw',
}: HeroImagePreloadProps) {
  return (
    <link
      rel="preload"
      as="image"
      href={getLcpPreloadHref(src)}
      imageSrcSet={getLcpPreloadSrcset(src)}
      imageSizes={sizes}
      type="image/avif"
      fetchPriority="high"
    />
  )
}
