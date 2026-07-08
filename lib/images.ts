export type GalleryCategory = 'all' | 'hardscape' | 'water'

export type GalleryImage = {
  src: string
  alt: string
  objectPosition?: string
  quality?: number
  priority?: boolean
}

export type GalleryProject = {
  id: string
  title: string
  category: Exclude<GalleryCategory, 'all'>
  showcase?: boolean
  before?: GalleryImage
  after: GalleryImage
}

export type GalleryBeforeAfterProject = GalleryProject & {
  showcase?: false
  before: GalleryImage
}

const img = (name: string) => `/images/${name}`

const siteImages = {
  // Logo & icons
  logo: img('full-logo.webp'),
  icon: img('icon.webp'),

  // Page heroes: unique per page
  homeHero: img('hero-background-image.webp'),
  homeHeroVideoMp4: img('hero-drone-cedar-falls.mp4'),
  homeHeroVideoWebm: img('hero-drone-cedar-falls.webm'),
  servicesHero: img('services-hero.webp'),
  aboutHero: img('about-hero.webp'),
  contactHero: img('contact-hero-truck.png'),
  galleryHero: img('gallery-hero.webp'),

  // Content section images: unique per section
  aboutPrimary: img('about-primary.webp'),
  aboutSecondary: img('about-secondary.webp'),
  cityIntro: img('city-intro.webp'),
  cityWhy: img('city-why.webp'),
  contentLandscapingCedarFalls: img('content-landscaping-cedar-falls.webp'),
  contentRetainingWallCedarFalls: img('content-retaining-wall-cedar-falls.webp'),
  contentWaterFeaturesCedarFalls: img('content-water-features-cedar-falls.webp'),
  contentLandscapeInstallation: img('content-landscape-installation.webp'),
  contentPaverPatioCedarFalls: img('content-paver-patio-cedar-falls.webp'),

  // Service hero images: one per service, zero repetition
  serviceRetainingWalls: img('retaining-wall.webp'),
  servicePaverPatio: img('paver-patio-hero.webp'),
  servicePondsWaterFeatures: img('water-feature-image-1.webp'),
  serviceLandscapeInstallation: img('service-landscape-installation.webp'),
  serviceLandscapeMaintenance: img('patio-wall.webp'),
  serviceLawnCare: img('service-lawn-care.webp'),
  serviceHydroseeding: img('sprinklers.webp'),
  servicePreservationRestoration: img('service-preservation-restoration.webp'),
  serviceTreeService: img('service-tree-service.webp'),
  serviceSnowRemoval: img('service-snow-removal.webp'),
  serviceLandscapeDesign: img('service-landscape-design.webp'),
  serviceDrainage: img('service-drainage.webp'),
  serviceExcavation: img('service-excavation.webp'),
  serviceSodInstallation: img('service-sod-installation.webp'),
  serviceMulching: img('service-mulching.webp'),
  serviceRockLandscaping: img('service-rock-landscaping.webp'),
  serviceTreePlanting: img('service-tree-planting.webp'),
  serviceShrubInstallation: img('service-shrub-installation.webp'),
  serviceCommercialLandscaping: img('service-commercial-landscaping.webp'),
  serviceResidentialLandscaping: img('service-residential-landscaping.webp'),
  serviceGrading: img('service-grading.webp'),
  serviceOutdoorLiving: img('service-outdoor-living.webp'),

  // Service content section images: unique per service, not from gallery
  serviceContentLandscapeInstallation: img('service-content-landscape-installation.webp'),
  serviceContentLawnCare: img('service-content-lawn-care.webp'),
  serviceContentPreservationRestoration: img('service-content-preservation-restoration.webp'),
  serviceContentTreeService: img('service-content-tree-service.webp'),
  serviceContentLandscapeMaintenance: img('service-content-landscape-maintenance.webp'),
  serviceContentPondsWaterFeatures: img('service-content-ponds-water-features.webp'),
  serviceContentHydroseeding: img('service-content-hydroseeding.webp'),
  serviceContentSnowRemoval: img('service-content-snow-removal.webp'),
  serviceContentLandscapeDesign: img('service-content-landscape-design.webp'),
  serviceContentDrainage: img('service-content-drainage.webp'),
  serviceContentExcavation: img('service-content-excavation.webp'),
  serviceContentSodInstallation: img('service-content-sod-installation.webp'),
  serviceContentMulching: img('service-content-mulching.webp'),
  serviceContentRockLandscaping: img('service-content-rock-landscaping.webp'),
  serviceContentTreePlanting: img('service-content-tree-planting.webp'),
  serviceContentShrubInstallation: img('service-content-shrub-installation.webp'),
  serviceContentCommercialLandscaping: img('service-content-commercial-landscaping.webp'),
  serviceContentResidentialLandscaping: img('service-content-residential-landscaping.webp'),
  serviceContentGrading: img('service-content-grading.webp'),
  serviceContentOutdoorLiving: img('service-content-outdoor-living.webp'),
  serviceContentRetainingWalls: img('service-content-retaining-walls.webp'),
  serviceContentPaverPatio: img('service-content-paver-patio.webp'),

  // Hardscape card images for services hub
  hardscapeRetainingWalls: img('wall-after-4.webp'),
  hardscapePaverPatio: img('patio-after-2.webp'),
  hardscapePondsWaterFeatures: img('water-pond-after.webp'),
}

// Hero image map: every slug gets its own unique key
const serviceHeroMap: Record<string, string> = {
  'retaining-walls': siteImages.serviceRetainingWalls,
  'paver-patio': siteImages.servicePaverPatio,
  'ponds-water-features': siteImages.servicePondsWaterFeatures,
  'landscape-installation': siteImages.serviceLandscapeInstallation,
  'landscape-maintenance': siteImages.serviceLandscapeMaintenance,
  'lawn-care': siteImages.serviceLawnCare,
  'hydroseeding': siteImages.serviceHydroseeding,
  'preservation-restoration': siteImages.servicePreservationRestoration,
  'tree-service': siteImages.serviceTreeService,
  'snow-removal': siteImages.serviceSnowRemoval,
  'landscape-design': siteImages.serviceLandscapeDesign,
  'drainage': siteImages.serviceDrainage,
  'excavation': siteImages.serviceExcavation,
  'sod-installation': siteImages.serviceSodInstallation,
  'mulching': siteImages.serviceMulching,
  'rock-landscaping': siteImages.serviceRockLandscaping,
  'tree-planting': siteImages.serviceTreePlanting,
  'shrub-installation': siteImages.serviceShrubInstallation,
  'commercial-landscaping': siteImages.serviceCommercialLandscaping,
  'residential-landscaping': siteImages.serviceResidentialLandscaping,
  'grading': siteImages.serviceGrading,
  'outdoor-living': siteImages.serviceOutdoorLiving,
}

const serviceHeroAltMap: Record<string, string> = {
  'retaining-walls': 'Retaining wall installation in Cedar Falls, Iowa',
  'paver-patio': 'Paver patio installation in Cedar Falls, Iowa',
  'ponds-water-features': 'Water features installation in Cedar Falls, Iowa',
  'landscape-installation': 'Landscape installation in Cedar Falls, Iowa',
  'landscape-maintenance': 'Landscape maintenance in Cedar Falls, Iowa',
  'lawn-care': 'Lawn care services in Cedar Falls, Iowa',
  'hydroseeding': 'Hydroseeding services in Cedar Falls, Iowa',
  'preservation-restoration': 'Landscape restoration in Cedar Falls, Iowa',
  'tree-service': 'Tree service in Cedar Falls, Iowa',
  'snow-removal': 'Snow removal in Cedar Falls, Iowa',
  'landscape-design': 'Landscape design in Cedar Falls, Iowa',
  'drainage': 'Drainage solutions in Cedar Falls, Iowa',
  'excavation': 'Excavation services in Cedar Falls, Iowa',
  'sod-installation': 'Sod installation in Cedar Falls, Iowa',
  'mulching': 'Mulching services in Cedar Falls, Iowa',
  'rock-landscaping': 'Rock landscaping in Cedar Falls, Iowa',
  'tree-planting': 'Tree planting in Cedar Falls, Iowa',
  'shrub-installation': 'Shrub installation in Cedar Falls, Iowa',
  'commercial-landscaping': 'Commercial landscaping in Cedar Falls, Iowa',
  'residential-landscaping': 'Residential landscaping in Cedar Falls, Iowa',
  'grading': 'Grading and leveling in Cedar Falls, Iowa',
  'outdoor-living': 'Outdoor kitchen and fireplace patio in Cedar Falls, Iowa',
}

const serviceContentImageMap: Record<string, string> = {
  'landscape-installation': siteImages.serviceContentLandscapeInstallation,
  'lawn-care': siteImages.serviceContentLawnCare,
  'preservation-restoration': siteImages.serviceContentPreservationRestoration,
  'tree-service': siteImages.serviceContentTreeService,
  'landscape-maintenance': siteImages.serviceContentLandscapeMaintenance,
  'ponds-water-features': siteImages.serviceContentPondsWaterFeatures,
  'hydroseeding': siteImages.serviceContentHydroseeding,
  'snow-removal': siteImages.serviceContentSnowRemoval,
  'landscape-design': siteImages.serviceContentLandscapeDesign,
  'drainage': siteImages.serviceContentDrainage,
  'excavation': siteImages.serviceContentExcavation,
  'sod-installation': siteImages.serviceContentSodInstallation,
  'mulching': siteImages.serviceContentMulching,
  'rock-landscaping': siteImages.serviceContentRockLandscaping,
  'tree-planting': siteImages.serviceContentTreePlanting,
  'shrub-installation': siteImages.serviceContentShrubInstallation,
  'commercial-landscaping': siteImages.serviceContentCommercialLandscaping,
  'residential-landscaping': siteImages.serviceContentResidentialLandscaping,
  'grading': siteImages.serviceContentGrading,
  'outdoor-living': siteImages.serviceContentOutdoorLiving,
  'retaining-walls': siteImages.serviceContentRetainingWalls,
  'paver-patio': siteImages.serviceContentPaverPatio,
}

const serviceContentImageAltMap: Record<string, string> = {
  'landscape-installation':
    'New landscape installation with mulch beds, plantings, and walkway in Cedar Falls, Iowa',
  'lawn-care':
    'Professionally maintained green lawn with crisp edging in Cedar Falls, Iowa',
  'preservation-restoration':
    'Restored residential landscape with replanted beds and healthy lawn in Cedar Falls, Iowa',
  'tree-service':
    'Professional tree pruning and care on mature trees in Cedar Falls, Iowa',
  'landscape-maintenance':
    'Landscape maintenance with pruned shrubs, fresh mulch, and bed edging in Cedar Falls, Iowa',
  'ponds-water-features':
    'Custom backyard pond and stone waterfall installation in Cedar Falls, Iowa',
  'hydroseeding':
    'Hydroseeding application for new lawn establishment in Cedar Falls, Iowa',
  'snow-removal':
    'Cleared residential driveway and sidewalk after snow removal in Cedar Falls, Iowa',
  'landscape-design':
    'Custom landscape design plan with completed garden installation in Cedar Falls, Iowa',
  'drainage':
    'Yard drainage solution with French drain and regraded lawn in Cedar Falls, Iowa',
  'excavation':
    'Residential excavation and site grading for landscaping in Cedar Falls, Iowa',
  'sod-installation':
    'Fresh sod installation with instant green lawn in Cedar Falls, Iowa',
  'mulching':
    'Fresh mulch installation in garden beds with clean edging in Cedar Falls, Iowa',
  'rock-landscaping':
    'Decorative river rock and boulder landscaping in Cedar Falls, Iowa',
  'tree-planting':
    'Newly planted shade trees with mulch rings in Cedar Falls, Iowa',
  'shrub-installation':
    'Foundation shrub plantings with fresh mulch beds in Cedar Falls, Iowa',
  'commercial-landscaping':
    'Professional commercial property landscaping and maintenance in Cedar Falls, Iowa',
  'residential-landscaping':
    'Complete residential backyard landscaping in Cedar Falls, Iowa',
  'grading':
    'Yard grading and leveling for proper drainage in Cedar Falls, Iowa',
  'outdoor-living':
    'Outdoor living space with paver patio and fire pit in Cedar Falls, Iowa',
  'retaining-walls':
    'Segmental block retaining wall with terraced garden beds in Cedar Falls, Iowa',
  'paver-patio':
    'Custom paver patio installation in Cedar Falls, Iowa',
}

// Gallery projects
const galleryProjects: GalleryProject[] = [
  {
    id: 'wall-1',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-1.webp'),
      alt: 'Excavated hillside before retaining wall construction in Cedar Falls',
    },
    after: {
      src: img('wall-after-1.webp'),
      alt: 'Retaining wall and patio foundation after installation',
    },
  },
  {
    id: 'wall-2',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-2.webp'),
      alt: 'Aged wooden retaining wall before replacement in Cedar Falls',
    },
    after: {
      src: img('wall-after-2.webp'),
      alt: 'New block retaining wall with graded backyard landscaping',
    },
  },
  {
    id: 'wall-3',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-3.webp'),
      alt: 'Failing block retaining wall before replacement',
    },
    after: {
      src: img('wall-after-3.webp'),
      alt: 'New retaining wall with pea gravel and clean finish',
    },
  },
  {
    id: 'wall-4',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-4.webp'),
      alt: 'Sloped front yard before retaining wall installation',
      priority: true,
    },
    after: {
      src: img('wall-after-4.webp'),
      alt: 'New L-shaped retaining wall with leveled front yard',
      priority: true,
    },
  },
  {
    id: 'wall-5',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-5.webp'),
      alt: 'Damaged retaining wall before garage-side rebuild',
    },
    after: {
      src: img('wall-after-5.webp'),
      alt: 'New retaining wall with decorative gravel cap',
    },
  },
  {
    id: 'patio-1',
    title: 'Raised Patio',
    category: 'hardscape',
    before: {
      src: img('patio-before-1.webp'),
      alt: 'Backyard before raised paver patio installation',
      objectPosition: '50% 100%',
    },
    after: {
      src: img('patio-after-1.webp'),
      alt: 'Completed raised paver patio with stone steps and retaining wall',
      objectPosition: '50% 100%',
    },
  },
  {
    id: 'patio-2',
    title: 'Paver Patio',
    category: 'hardscape',
    before: {
      src: img('patio-before-2.webp'),
      alt: 'Damaged patio before paver patio replacement',
      priority: true,
    },
    after: {
      src: img('patio-after-2.webp'),
      alt: 'New paver patio after installation with clean edging',
      priority: true,
    },
  },
  {
    id: 'water-1',
    title: 'Backyard Waterfall',
    category: 'water',
    before: {
      src: img('water-before-2.webp'),
      alt: 'Hillside yard before stone waterfall and pond installation',
      objectPosition: '30% 25%',
      quality: 80,
      priority: true,
    },
    after: {
      src: img('water-feature-image-3.webp'),
      alt: 'Multi-tiered stone waterfall with retaining wall and garden steps',
      objectPosition: '32% 24%',
      quality: 80,
      priority: true,
    },
  },
  {
    id: 'water-2',
    title: 'Pond & Waterfall',
    category: 'water',
    before: {
      src: img('water-pond-before.webp'),
      alt: 'Backyard lawn before koi pond and waterfall installation',
      objectPosition: '40% 50%',
      quality: 80,
    },
    after: {
      src: img('water-pond-after.webp'),
      alt: 'Completed koi pond and stone waterfall beside the home',
      objectPosition: '56% 50%',
      quality: 80,
    },
  },
  {
    id: 'water-3',
    title: 'Pond & Stream',
    category: 'water',
    before: {
      src: img('water-before-3.webp'),
      alt: 'Backyard before pond, stream, and stone bridge installation',
      quality: 80,
    },
    after: {
      src: img('water-feature-image-4.webp'),
      alt: 'Large backyard pond with stream, stone bridge, and surrounding gardens',
      quality: 80,
    },
  },
]

// Exports
export { siteImages, galleryProjects }

export const homepageGalleryPreview: GalleryBeforeAfterProject[] = galleryProjects.filter(
  (p): p is GalleryBeforeAfterProject =>
    !p.showcase && Boolean(p.before) && ['patio-2', 'wall-4'].includes(p.id),
)

export function getServiceHeroImage(slug: string): string | undefined {
  return serviceHeroMap[slug]
}

export function getServiceHeroImageAlt(slug: string): string {
  return serviceHeroAltMap[slug] ?? 'A1 Property Services landscaping in Cedar Falls, Iowa'
}

export function getServiceContentImage(slug: string): string | undefined {
  return serviceContentImageMap[slug]
}

export function getServiceContentImageAlt(slug: string): string | undefined {
  return serviceContentImageAltMap[slug]
}

export function getGalleryProjectsForService(slug: string, limit = 4): GalleryProject[] {
  const categoryMap: Record<string, Exclude<GalleryCategory, 'all'>> = {
    'retaining-walls': 'hardscape',
    'paver-patio': 'hardscape',
    'ponds-water-features': 'water',
  }
  const category = categoryMap[slug]
  if (!category) return []

  const titleFilter: Record<string, string> = {
    'retaining-walls': 'Retaining Wall',
    'paver-patio': 'Paver Patio',
  }

  let projects = galleryProjects.filter((p) => p.category === category)
  const titleMatch = titleFilter[slug]
  if (titleMatch) {
    projects = projects.filter((p) => p.title === titleMatch)
  }

  return projects.slice(0, limit)
}
