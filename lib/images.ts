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

  // Page heroes — unique per page
  homeHero: img('hero-background-image.webp'),
  servicesHero: img('services-hero.webp'),
  aboutHero: img('about-hero.webp'),
  contactHero: img('contact-hero-truck.png'),
  galleryHero: img('gallery-hero.webp'),

  // Content section images — unique per section
  aboutPrimary: img('about-primary.webp'),
  aboutSecondary: img('about-secondary.webp'),
  cityIntro: img('city-intro.webp'),
  cityWhy: img('city-why.webp'),

  // Service hero images — one per service, zero repetition
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

  // Hardscape card images for services hub
  hardscapeRetainingWalls: img('hardscape-retaining-walls.webp'),
  hardscapePaverPatio: img('hardscape-paver-patio.webp'),
  hardscapePondsWaterFeatures: img('hardscape-ponds-water-features.webp'),
}

// Hero image map — every slug gets its own unique key
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
  'outdoor-living': 'Outdoor living spaces in Cedar Falls, Iowa',
}

// Gallery projects
const galleryProjects: GalleryProject[] = [
  {
    id: 'wall-1',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-1.webp'),
      alt: 'Sloped yard before retaining wall installation in Cedar Falls',
    },
    after: {
      src: img('wall-after-1.webp'),
      alt: 'Completed retaining wall with graded landscaping',
    },
  },
  {
    id: 'wall-2',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-6-7.webp'),
      alt: 'Yard before retaining wall installation in Cedar Falls',
    },
    after: {
      src: img('wall-after-6.webp'),
      alt: 'Completed retaining wall with finished landscaping',
    },
  },
  {
    id: 'wall-3',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-3.webp'),
      alt: 'Sloped property before retaining wall build',
    },
    after: {
      src: img('wall-after-3.webp'),
      alt: 'Finished retaining wall with graded yard',
    },
  },
  {
    id: 'wall-4',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-4.webp'),
      alt: 'Backyard slope before retaining wall installation',
    },
    after: {
      src: img('wall-after-4.webp'),
      alt: 'Completed retaining wall with clean finish',
    },
  },
  {
    id: 'wall-5',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-5.webp'),
      alt: 'Property before retaining wall construction',
    },
    after: {
      src: img('wall-after-5.webp'),
      alt: 'Retaining wall after installation with landscaping',
    },
  },
  {
    id: 'patio-1',
    title: 'Paver Patio',
    category: 'hardscape',
    before: {
      src: img('patio-before-1.webp'),
      alt: 'Backyard before paver patio installation',
      quality: 80,
      priority: true,
    },
    after: {
      src: img('patio-after-1.webp'),
      alt: 'Custom paver patio after installation with clean edging',
      objectPosition: '50% 100%',
      quality: 80,
      priority: true,
    },
  },
  {
    id: 'patio-2',
    title: 'Paver Patio',
    category: 'hardscape',
    before: {
      src: img('patio-before-2.webp'),
      alt: 'Backyard before paver patio installation',
      quality: 80,
    },
    after: {
      src: img('patio-after-2.webp'),
      alt: 'Custom paver patio after installation',
      objectPosition: '50% 100%',
      quality: 80,
    },
  },
  {
    id: 'water-1',
    title: 'Pond & Waterfall',
    category: 'water',
    showcase: true,
    after: {
      src: img('water-feature-image-2.webp'),
      alt: 'Custom pond and waterfall with colorful garden plantings in Cedar Falls',
      quality: 80,
      priority: true,
    },
  },
  {
    id: 'water-2',
    title: 'Backyard Waterfall',
    category: 'water',
    showcase: true,
    after: {
      src: img('water-feature-image-3.webp'),
      alt: 'Multi-tiered stone waterfall with retaining wall and garden steps',
      quality: 80,
    },
  },
  {
    id: 'water-3',
    title: 'Pond & Stream',
    category: 'water',
    showcase: true,
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
    !p.showcase && Boolean(p.before) && ['wall-1', 'wall-3'].includes(p.id),
)

export function getServiceHeroImage(slug: string): string | undefined {
  return serviceHeroMap[slug]
}

export function getServiceHeroImageAlt(slug: string): string {
  return serviceHeroAltMap[slug] ?? 'A1 Property Services landscaping in Cedar Falls, Iowa'
}

export function getGalleryProjectsForService(slug: string, limit = 4): GalleryProject[] {
  const categoryMap: Record<string, Exclude<GalleryCategory, 'all'>> = {
    'retaining-walls': 'hardscape',
    'paver-patio': 'hardscape',
    'ponds-water-features': 'water',
    'outdoor-living': 'hardscape',
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
