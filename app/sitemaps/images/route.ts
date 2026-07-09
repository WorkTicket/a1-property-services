import { siteConfig } from '@/lib/metadata'

const imageUrls = [
  '/og-image.jpg',
  '/images/icon.webp',
  '/images/full-logo.webp',

  // Page heroes
  '/images/hero-background-image.webp',
  '/images/services-hero.webp',
  '/images/about-hero.webp',
  '/images/contact-page-hero.webp',
  '/images/gallery-hero.webp',

  // Content images
  '/images/about-primary.webp',
  '/images/about-secondary.webp',
  '/images/city-intro.webp',
  '/images/city-why.webp',
  '/images/content-landscaping-cedar-falls.webp',
  '/images/content-retaining-wall-cedar-falls.webp',
  '/images/content-water-features-cedar-falls.webp',
  '/images/content-landscape-installation.webp',
  '/images/content-paver-patio-cedar-falls.webp',

  // Service hero images (one per service)
  '/images/retaining-wall.webp',
  '/images/paver-patio-hero.webp',
  '/images/water-feature-image-1.webp',
  '/images/service-landscape-installation.webp',
  '/images/patio-wall.webp',
  '/images/service-lawn-care.webp',
  '/images/sprinklers.webp',
  '/images/service-preservation-restoration.webp',
  '/images/service-tree-service.webp',
  '/images/service-snow-removal.webp',
  '/images/service-landscape-design.webp',
  '/images/service-drainage.webp',
  '/images/service-excavation.webp',
  '/images/service-sod-installation.webp',
  '/images/service-mulching.webp',
  '/images/service-rock-landscaping.webp',
  '/images/service-tree-planting.webp',
  '/images/service-shrub-installation.webp',
  '/images/service-commercial-landscaping.webp',
  '/images/service-residential-landscaping.webp',
  '/images/service-grading.webp',
  '/images/service-outdoor-living.webp',

  // Hardscape card images
  '/images/hardscape-retaining-walls.webp',
  '/images/hardscape-paver-patio.webp',
  '/images/hardscape-ponds-water-features.webp',

  // Gallery before/after
  '/images/wall-before-1.webp',
  '/images/wall-after-1.webp',
  '/images/wall-before-2.webp',
  '/images/wall-after-2.webp',
  '/images/wall-before-3.webp',
  '/images/wall-after-3.webp',
  '/images/wall-before-4.webp',
  '/images/wall-after-4.webp',
  '/images/wall-before-5.webp',
  '/images/wall-after-5.webp',
  '/images/patio-before-1.webp',
  '/images/patio-after-1.webp',
  '/images/patio-before-2.webp',
  '/images/patio-after-2.webp',

  // Gallery water features
  '/images/water-feature-image-1.webp',
  '/images/water-pond-after.webp',
  '/images/water-feature-image-3.webp',
  '/images/water-feature-image-4.webp',
  '/images/water-pond-before.webp',
  '/images/water-before-2.webp',
  '/images/water-before-3.webp',
]

export async function GET() {
  const urlset = imageUrls
    .map(
      (img) => `  <url>
    <loc>${siteConfig.url}${img}</loc>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlset}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
