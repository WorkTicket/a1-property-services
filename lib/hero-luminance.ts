/** Precomputed average luminance (0–1) for hero images — darker images get a lighter overlay. */
export const heroLuminance: Record<string, number> = {
  '/images/hero-background-image.webp': 0.5,
  '/images/services-hero.webp': 0.557,
  '/images/about-hero.webp': 0.503,
  '/images/contact-hero-truck.png': 0.431,
  '/images/gallery-hero.webp': 0.557,
  '/images/retaining-wall.webp': 0.624,
  '/images/paver-patio-hero.webp': 0.574,
  '/images/water-feature-image-1.webp': 0.303,
  '/images/service-landscape-installation.webp': 0.459,
  '/images/patio-wall.webp': 0.394,
  '/images/service-lawn-care.webp': 0.663,
  '/images/sprinklers.webp': 0.663,
  '/images/service-preservation-restoration.webp': 0.193,
  '/images/service-tree-service.webp': 0.468,
  '/images/service-snow-removal.webp': 0.368,
  '/images/service-landscape-design.webp': 0.397,
  '/images/service-drainage.webp': 0.484,
  '/images/service-excavation.webp': 0.514,
  '/images/service-sod-installation.webp': 0.422,
  '/images/service-mulching.webp': 0.524,
  '/images/service-rock-landscaping.webp': 0.561,
  '/images/service-tree-planting.webp': 0.426,
  '/images/service-shrub-installation.webp': 0.542,
  '/images/service-commercial-landscaping.webp': 0.321,
  '/images/service-residential-landscaping.webp': 0.468,
  '/images/service-grading.webp': 0.368,
  '/images/service-outdoor-living.webp': 0.53,
}

const DEFAULT_LUMINANCE = 0.5

export function getHeroLuminance(imageSrc?: string): number {
  if (!imageSrc) return DEFAULT_LUMINANCE
  return heroLuminance[imageSrc] ?? DEFAULT_LUMINANCE
}
