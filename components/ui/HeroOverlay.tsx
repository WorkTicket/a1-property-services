import { cn } from '@/lib/utils'
import { getHeroOverlayStyle, type HeroOverlayVariant } from '@/lib/hero-overlay'

type HeroOverlayProps = {
  imageSrc?: string
  variant?: HeroOverlayVariant
  className?: string
}

export default function HeroOverlay({
  imageSrc,
  variant = 'center',
  className,
}: HeroOverlayProps) {
  return (
    <div
      className={cn('hero-image-overlay pointer-events-none', className)}
      style={getHeroOverlayStyle(imageSrc, variant)}
      aria-hidden="true"
    />
  )
}
