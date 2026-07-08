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

  // Knowledge center heroes
  resourcesHero: img('resources-hero.webp'),
  faqsHero: img('faqs-hero.webp'),
  blogHero: img('blog-hero.webp'),
  learnHero: img('learn-hero.webp'),

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

// Additional before/after showcase sections for the gallery page.
// Rendered as their own labeled sections after the water features.
export type GalleryBeforeAfterSection = {
  id: string
  title: string
  description: string
  projects: GalleryBeforeAfterProject[]
}

const gallerySections: GalleryBeforeAfterSection[] = [
  {
    id: 'paver-patios',
    title: 'Paver Patios',
    description:
      'Backyards transformed into paver patios with fire pits, pergolas, and outdoor living space.',
    projects: [
      {
        id: 'patio-ba-3',
        title: 'Paver Patio',
        category: 'hardscape',
        before: {
          src: img('patio-before-3.webp'),
          alt: 'Backyard with worn grass before paver patio installation in Cedar Falls',
        },
        after: {
          src: img('patio-after-3.webp'),
          alt: 'Completed paver patio with fire pit and seating area in Cedar Falls',
        },
      },
      {
        id: 'patio-ba-4',
        title: 'Patio & Fire Pit',
        category: 'hardscape',
        before: {
          src: img('patio-before-4.webp'),
          alt: 'Bare backyard before paver patio and fire pit installation in Cedar Falls',
        },
        after: {
          src: img('patio-after-4.webp'),
          alt: 'New paver patio with stone fire pit and Adirondack chairs in Cedar Falls',
        },
      },
      {
        id: 'patio-ba-5',
        title: 'Patio & Pergola',
        category: 'hardscape',
        before: {
          src: img('patio-before-5.webp'),
          alt: 'Backyard lawn before paver patio installation in Cedar Falls',
        },
        after: {
          src: img('patio-after-5.webp'),
          alt: 'New paver patio with pergola and outdoor lounge seating in Cedar Falls',
        },
      },
    ],
  },
  {
    id: 'paver-driveways',
    title: 'Paver Driveways',
    description:
      'Cracked concrete and worn asphalt replaced with durable, high-end paver driveways.',
    projects: [
      {
        id: 'driveway-ba-1',
        title: 'Paver Driveway',
        category: 'hardscape',
        before: {
          src: img('driveway-before-1.webp'),
          alt: 'Cracked concrete driveway before paver replacement in Cedar Falls',
        },
        after: {
          src: img('driveway-after-1.webp'),
          alt: 'New paver driveway with contrasting border in Cedar Falls',
        },
      },
      {
        id: 'driveway-ba-2',
        title: 'Brick Paver Driveway',
        category: 'hardscape',
        before: {
          src: img('driveway-before-2.webp'),
          alt: 'Old asphalt driveway before paver installation in Cedar Falls',
        },
        after: {
          src: img('driveway-after-2.webp'),
          alt: 'New brick paver driveway with herringbone pattern in Cedar Falls',
        },
      },
      {
        id: 'driveway-ba-3',
        title: 'Modern Paver Driveway',
        category: 'hardscape',
        before: {
          src: img('driveway-before-3.webp'),
          alt: 'Plain concrete driveway before paver overlay in Cedar Falls',
        },
        after: {
          src: img('driveway-after-3.webp'),
          alt: 'New gray paver driveway at a modern farmhouse in Cedar Falls',
        },
      },
      {
        id: 'driveway-ba-4',
        title: 'Paver Driveway',
        category: 'hardscape',
        before: {
          src: img('driveway-before-4.webp'),
          alt: 'Worn concrete driveway before paver upgrade in Cedar Falls',
        },
        after: {
          src: img('driveway-after-4.webp'),
          alt: 'New paver driveway with a decorative border in Cedar Falls',
        },
      },
      {
        id: 'driveway-ba-5',
        title: 'Paver Driveway',
        category: 'hardscape',
        before: {
          src: img('driveway-before-5.webp'),
          alt: 'Cracked asphalt driveway before paver replacement in Cedar Falls',
        },
        after: {
          src: img('driveway-after-5.webp'),
          alt: 'New paver driveway leading to an attached garage in Cedar Falls',
        },
      },
    ],
  },
  {
    id: 'lawn-mowing',
    title: 'Lawn Mowing',
    description:
      'Overgrown yards restored to crisp, healthy lawns with clean mowing stripes and edging.',
    projects: [
      {
        id: 'mowing-ba-1',
        title: 'Lawn Mowing',
        category: 'hardscape',
        before: {
          src: img('mowing-before-1.webp'),
          alt: 'Overgrown backyard lawn before professional mowing in Cedar Falls',
        },
        after: {
          src: img('mowing-after-1.webp'),
          alt: 'Freshly mowed backyard lawn with clean mowing stripes in Cedar Falls',
        },
      },
      {
        id: 'mowing-ba-2',
        title: 'Lawn Mowing',
        category: 'hardscape',
        before: {
          src: img('mowing-before-2.webp'),
          alt: 'Tall, weedy front lawn before professional mowing in Cedar Falls',
        },
        after: {
          src: img('mowing-after-2.webp'),
          alt: 'Freshly cut front lawn with striped finish in Cedar Falls',
        },
      },
      {
        id: 'mowing-ba-3',
        title: 'Lawn Mowing',
        category: 'hardscape',
        before: {
          src: img('mowing-before-3.webp'),
          alt: 'Overgrown acreage lawn before mowing in Cedar Falls',
        },
        after: {
          src: img('mowing-after-3.webp'),
          alt: 'Large mowed lawn with clean stripes around mature trees in Cedar Falls',
        },
      },
      {
        id: 'mowing-ba-4',
        title: 'Lawn Mowing',
        category: 'hardscape',
        before: {
          src: img('mowing-before-4.webp'),
          alt: 'Shaggy roadside lawn before mowing and trimming in Cedar Falls',
        },
        after: {
          src: img('mowing-after-4.webp'),
          alt: 'Neatly mowed corner lawn with crisp edges in Cedar Falls',
        },
      },
      {
        id: 'mowing-ba-5',
        title: 'Lawn Mowing',
        category: 'hardscape',
        before: {
          src: img('mowing-before-5.webp'),
          alt: 'Weedy front yard before professional lawn mowing in Cedar Falls',
        },
        after: {
          src: img('mowing-after-5.webp'),
          alt: 'Freshly mowed front yard with striped finish in Cedar Falls',
        },
      },
    ],
  },
  {
    id: 'landscape-installation',
    title: 'Landscape Installation',
    description:
      'Bare yards turned into planted beds with shrubs, flowers, mulch, and clean edging.',
    projects: [
      {
        id: 'landscape-ba-1',
        title: 'Foundation Beds',
        category: 'hardscape',
        before: {
          src: img('landscape-before-1.webp'),
          alt: 'Bare foundation strip before landscape bed installation in Cedar Falls',
        },
        after: {
          src: img('landscape-after-1.webp'),
          alt: 'New foundation planting bed with shrubs, flowers, and mulch in Cedar Falls',
        },
      },
      {
        id: 'landscape-ba-2',
        title: 'Island Bed',
        category: 'hardscape',
        before: {
          src: img('landscape-before-2.webp'),
          alt: 'Plain front lawn before island planting bed installation in Cedar Falls',
        },
        after: {
          src: img('landscape-after-2.webp'),
          alt: 'New island bed with a tree, perennials, and mulch in Cedar Falls',
        },
      },
      {
        id: 'landscape-ba-3',
        title: 'Corner Bed',
        category: 'hardscape',
        before: {
          src: img('landscape-before-3.webp'),
          alt: 'Plain grass at house corner before landscape bed installation in Cedar Falls',
        },
        after: {
          src: img('landscape-after-3.webp'),
          alt: 'New corner bed with arborvitae, boulders, and river rock in Cedar Falls',
        },
      },
      {
        id: 'landscape-ba-4',
        title: 'Walkway Beds',
        category: 'hardscape',
        before: {
          src: img('landscape-before-4.webp'),
          alt: 'Plain lawn along front walkway before landscape bed installation in Cedar Falls',
        },
        after: {
          src: img('landscape-after-4.webp'),
          alt: 'New planting beds lining the front walkway with hostas and flowers in Cedar Falls',
        },
      },
      {
        id: 'landscape-ba-5',
        title: 'Border Bed',
        category: 'hardscape',
        before: {
          src: img('landscape-before-5.webp'),
          alt: 'Plain grass along privacy fence before landscape bed installation in Cedar Falls',
        },
        after: {
          src: img('landscape-after-5.webp'),
          alt: 'New border bed along the fence with hydrangeas and perennials in Cedar Falls',
        },
      },
    ],
  },
]

// City / location page hero images: one authentic downtown scene per city
const cityHeroMap: Record<string, string> = {
  'cedar-falls': img('city-hero-cedar-falls.webp'),
  'waterloo': img('city-hero-waterloo.webp'),
  'hudson': img('city-hero-hudson.webp'),
  'evansdale': img('city-hero-evansdale.webp'),
  'waverly': img('city-hero-waverly.webp'),
  'denver': img('city-hero-denver.webp'),
  'jesup': img('city-hero-jesup.webp'),
  'parkersburg': img('city-hero-parkersburg.webp'),
  'la-porte-city': img('city-hero-la-porte-city.webp'),
  'dike': img('city-hero-dike.webp'),
  'elk-run-heights': img('city-hero-elk-run-heights.webp'),
  'dunkerton': img('city-hero-dunkerton.webp'),
}

export function getCityHeroImage(slug: string): string | undefined {
  return cityHeroMap[slug]
}

// Per-city on-page content images: each city gets a distinct pair of real
// project photos so no two city pages show the same landscaping images.
type CityContentImage = { src: string; desc: string }

const cityIntroImages: Record<string, CityContentImage> = {
  'cedar-falls': { src: img('content-landscaping-cedar-falls.webp'), desc: 'Full landscape installation with fresh plantings and mulched beds' },
  'waterloo': { src: img('service-content-residential-landscaping.webp'), desc: 'Complete residential backyard landscaping' },
  'hudson': { src: img('service-content-landscape-installation.webp'), desc: 'New landscape installation with walkway and plantings' },
  'evansdale': { src: img('service-content-lawn-care.webp'), desc: 'Healthy, freshly mowed lawn with crisp edging' },
  'waverly': { src: img('service-content-landscape-design.webp'), desc: 'Custom landscape design with layered garden beds' },
  'denver': { src: img('service-content-mulching.webp'), desc: 'Fresh mulch beds with clean bed edging' },
  'jesup': { src: img('service-content-shrub-installation.webp'), desc: 'Foundation shrub plantings with fresh mulch' },
  'parkersburg': { src: img('service-content-sod-installation.webp'), desc: 'New sod installation with an instant green lawn' },
  'la-porte-city': { src: img('service-content-rock-landscaping.webp'), desc: 'Decorative rock landscaping with boulders' },
  'dike': { src: img('service-content-landscape-maintenance.webp'), desc: 'Maintained landscape with pruned shrubs and fresh mulch' },
  'elk-run-heights': { src: img('service-content-preservation-restoration.webp'), desc: 'Restored landscape beds and a healthy lawn' },
  'dunkerton': { src: img('about-primary.webp'), desc: 'A1 Property Services landscaping project' },
}

const cityWhyImages: Record<string, CityContentImage> = {
  'cedar-falls': { src: img('wall-after-4.webp'), desc: 'Segmental block retaining wall with a leveled yard' },
  'waterloo': { src: img('patio-after-2.webp'), desc: 'New paver patio with clean edging' },
  'hudson': { src: img('wall-after-1.webp'), desc: 'Retaining wall and patio foundation' },
  'evansdale': { src: img('water-feature-image-1.webp'), desc: 'Backyard koi pond and stone waterfall' },
  'waverly': { src: img('wall-after-2.webp'), desc: 'Block retaining wall with graded landscaping' },
  'denver': { src: img('patio-after-1.webp'), desc: 'Raised paver patio with stone steps' },
  'jesup': { src: img('wall-after-3.webp'), desc: 'Retaining wall with a decorative gravel finish' },
  'parkersburg': { src: img('service-content-paver-patio.webp'), desc: 'Custom paver patio installation' },
  'la-porte-city': { src: img('water-pond-after.webp'), desc: 'Koi pond and stone waterfall beside the home' },
  'dike': { src: img('wall-after-5.webp'), desc: 'Retaining wall with a decorative gravel cap' },
  'elk-run-heights': { src: img('water-feature-image-3.webp'), desc: 'Multi-tiered stone waterfall with garden steps' },
  'dunkerton': { src: img('service-content-outdoor-living.webp'), desc: 'Outdoor living space with paver patio and fire pit' },
}

export function getCityIntroImage(slug: string): CityContentImage {
  return cityIntroImages[slug] ?? { src: siteImages.cityIntro, desc: 'Landscaping project' }
}

export function getCityWhyImage(slug: string): CityContentImage {
  return cityWhyImages[slug] ?? { src: siteImages.cityWhy, desc: 'A1 Property Services landscaping' }
}

// Exports
export { siteImages, galleryProjects, gallerySections }

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
