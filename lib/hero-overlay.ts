export type HeroOverlayVariant = 'center' | 'left'

export function isLeftHeroOverlay(variant: HeroOverlayVariant = 'center'): boolean {
  return variant === 'left'
}
