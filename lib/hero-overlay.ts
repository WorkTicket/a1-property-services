import type { CSSProperties } from 'react'
import { getHeroLuminance } from '@/lib/hero-luminance'

export type HeroOverlayVariant = 'center' | 'left'

/** Scale overlay strength from image luminance: bright photos need more, dark photos need less. */
function overlayMultiplier(luminance: number): number {
  return 0.58 + luminance * 0.65
}

export function getHeroOverlayStyle(
  imageSrc?: string,
  variant: HeroOverlayVariant = 'center',
): CSSProperties {
  const luminance = getHeroLuminance(imageSrc)
  const m = overlayMultiplier(luminance)

  return {
    '--hero-o-top': String(0.44 * m),
    '--hero-o-mid': String(0.64 * m),
    '--hero-o-bot': String(0.8 * m),
    '--hero-o-side': String((variant === 'left' ? 0.88 : 0.58) * m),
    '--hero-o-tint': String(0.3 * m),
  } as CSSProperties
}
