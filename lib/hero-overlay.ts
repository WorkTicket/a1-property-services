export type HeroOverlayVariant = 'center' | 'left' | 'home'

export function isLeftHeroOverlay(variant: HeroOverlayVariant = 'center'): boolean {
  return variant === 'left' || variant === 'home'
}
