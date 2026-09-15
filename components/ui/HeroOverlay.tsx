import { cn } from '@/lib/utils'
import {
  isHomeHeroOverlay,
  isLeftHeroOverlay,
  type HeroOverlayVariant,
} from '@/lib/hero-overlay'

type HeroOverlayProps = {
  imageSrc?: string
  variant?: HeroOverlayVariant
  className?: string
}

export default function HeroOverlay({
  variant = 'center',
  className,
}: HeroOverlayProps) {
  return (
    <div
      className={cn(
        'hero-image-overlay pointer-events-none',
        isLeftHeroOverlay(variant) && 'hero-image-overlay-left',
        isHomeHeroOverlay(variant) && 'hero-image-overlay-home',
        className,
      )}
      aria-hidden="true"
    />
  )
}
