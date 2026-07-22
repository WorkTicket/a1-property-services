export type GalleryCategory =
  | 'all'
  | 'hardscape'
  | 'water'
  | 'paver-patios'
  | 'paver-driveways'
  | 'lawn-mowing'
  | 'landscape-installation'

export const galleryFilterCategories: { key: GalleryCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'hardscape', label: 'Hardscape' },
  { key: 'water', label: 'Water Features' },
  { key: 'paver-patios', label: 'Paver Patios' },
  { key: 'paver-driveways', label: 'Paver Driveways' },
  { key: 'lawn-mowing', label: 'Lawn Mowing' },
  { key: 'landscape-installation', label: 'Landscape Installation' },
]

export const galleryCategoryMeta: Record<
  Exclude<GalleryCategory, 'all'>,
  { heading: string; description: string }
> = {
  hardscape: {
    heading: 'Retaining Walls',
    description: 'Sloped yards and failing walls rebuilt with segmental block retaining walls.',
  },
  water: {
    heading: 'Water Features',
    description: 'Custom ponds, waterfalls, and water gardens built across the Cedar Valley.',
  },
  'paver-patios': {
    heading: 'Paver Patios',
    description:
      'Backyards transformed into paver patios with fire pits, pergolas, and outdoor living space.',
  },
  'paver-driveways': {
    heading: 'Paver Driveways',
    description:
      'Cracked concrete and worn asphalt replaced with durable, high-end paver driveways.',
  },
  'lawn-mowing': {
    heading: 'Lawn Mowing',
    description:
      'Overgrown yards restored to crisp, healthy lawns with clean mowing stripes and edging.',
  },
  'landscape-installation': {
    heading: 'Landscape Installation',
    description:
      'Bare yards turned into planted beds with shrubs, flowers, mulch, and clean edging.',
  },
}

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
  'retaining-walls': 'Retaining wall installation',
  'paver-patio': 'Paver patio installation',
  'ponds-water-features': 'Water features installation',
  'landscape-installation': 'Landscape installation',
  'landscape-maintenance': 'Landscape maintenance',
  'lawn-care': 'Lawn care services',
  'hydroseeding': 'Hydroseeding services',
  'preservation-restoration': 'Landscape restoration',
  'tree-service': 'Tree service',
  'snow-removal': 'Snow removal',
  'landscape-design': 'Landscape design',
  'drainage': 'Drainage solutions',
  'excavation': 'Excavation services',
  'sod-installation': 'Sod installation',
  'mulching': 'Mulching services',
  'rock-landscaping': 'Rock landscaping',
  'tree-planting': 'Tree planting',
  'shrub-installation': 'Shrub installation',
  'commercial-landscaping': 'Commercial landscaping',
  'residential-landscaping': 'Residential landscaping',
  'grading': 'Grading and leveling',
  'outdoor-living': 'Outdoor kitchen and fireplace patio',
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
    'New landscape installation with mulch beds, plantings, and walkway',
  'lawn-care':
    'Professionally maintained green lawn with crisp edging',
  'preservation-restoration':
    'Restored residential landscape with replanted beds and healthy lawn',
  'tree-service':
    'Professional tree pruning and care on mature trees',
  'landscape-maintenance':
    'Landscape maintenance with pruned shrubs, fresh mulch, and bed edging',
  'ponds-water-features':
    'Custom backyard pond and stone waterfall installation',
  'hydroseeding':
    'Hydroseeding application for new lawn establishment',
  'snow-removal':
    'Cleared residential driveway and sidewalk after snow removal',
  'landscape-design':
    'Custom landscape design plan with completed garden installation',
  'drainage':
    'Yard drainage solution with French drain and regraded lawn',
  'excavation':
    'Residential excavation and site grading for landscaping',
  'sod-installation':
    'Fresh sod installation with instant green lawn',
  'mulching':
    'Fresh mulch installation in garden beds with clean edging',
  'rock-landscaping':
    'Decorative river rock and boulder landscaping',
  'tree-planting':
    'Newly planted shade trees with mulch rings',
  'shrub-installation':
    'Foundation shrub plantings with fresh mulch beds',
  'commercial-landscaping':
    'Professional commercial property landscaping and maintenance',
  'residential-landscaping':
    'Complete residential backyard landscaping',
  'grading':
    'Yard grading and leveling for proper drainage',
  'outdoor-living':
    'Outdoor living space with paver patio and fire pit',
  'retaining-walls':
    'Segmental block retaining wall with terraced garden beds',
  'paver-patio':
    'Custom paver patio installation',
}

// Gallery projects
const galleryProjects: GalleryProject[] = [
  {
    id: 'wall-1',
    title: 'Retaining Wall',
    category: 'hardscape',
    before: {
      src: img('wall-before-1.webp'),
      alt: 'Excavated hillside before retaining wall construction',
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
      alt: 'Aged wooden retaining wall before replacement',
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
    },
    after: {
      src: img('wall-after-4.webp'),
      alt: 'New L-shaped retaining wall with leveled front yard',
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
    category: 'paver-patios',
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
    category: 'paver-patios',
    before: {
      src: img('patio-before-2.webp'),
      alt: 'Damaged patio before paver patio replacement',
    },
    after: {
      src: img('patio-after-2.webp'),
      alt: 'New paver patio after installation with clean edging',
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
    },
    after: {
      src: img('water-feature-image-3.webp'),
      alt: 'Multi-tiered stone waterfall with retaining wall and garden steps',
      objectPosition: '32% 24%',
      quality: 80,
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
  {
    id: 'patio-ba-3',
    title: 'Paver Patio',
    category: 'paver-patios',
    before: {
      src: img('patio-before-3.webp'),
      alt: 'Backyard with worn grass before paver patio installation',
    },
    after: {
      src: img('patio-after-3.webp'),
      alt: 'Completed paver patio with fire pit and seating area',
    },
  },
  {
    id: 'patio-ba-4',
    title: 'Patio & Fire Pit',
    category: 'paver-patios',
    before: {
      src: img('patio-before-4.webp'),
      alt: 'Bare backyard before paver patio and fire pit installation',
    },
    after: {
      src: img('patio-after-4.webp'),
      alt: 'New paver patio with stone fire pit and Adirondack chairs',
    },
  },
  {
    id: 'patio-ba-5',
    title: 'Patio & Pergola',
    category: 'paver-patios',
    before: {
      src: img('patio-before-5.webp'),
      alt: 'Backyard lawn before paver patio installation',
    },
    after: {
      src: img('patio-after-5.webp'),
      alt: 'New paver patio with pergola and outdoor lounge seating',
    },
  },
  {
    id: 'driveway-ba-1',
    title: 'Paver Driveway',
    category: 'paver-driveways',
    before: {
      src: img('driveway-before-1.webp'),
      alt: 'Cracked concrete driveway before paver replacement',
    },
    after: {
      src: img('driveway-after-1.webp'),
      alt: 'New paver driveway with contrasting border',
    },
  },
  {
    id: 'driveway-ba-2',
    title: 'Brick Paver Driveway',
    category: 'paver-driveways',
    before: {
      src: img('driveway-before-2.webp'),
      alt: 'Old asphalt driveway before paver installation',
    },
    after: {
      src: img('driveway-after-2.webp'),
      alt: 'New brick paver driveway with herringbone pattern',
    },
  },
  {
    id: 'driveway-ba-3',
    title: 'Modern Paver Driveway',
    category: 'paver-driveways',
    before: {
      src: img('driveway-before-3.webp'),
      alt: 'Plain concrete driveway before paver overlay',
    },
    after: {
      src: img('driveway-after-3.webp'),
      alt: 'New gray paver driveway at a modern farmhouse',
    },
  },
  {
    id: 'driveway-ba-4',
    title: 'Paver Driveway',
    category: 'paver-driveways',
    before: {
      src: img('driveway-before-4.webp'),
      alt: 'Worn concrete driveway before paver upgrade',
    },
    after: {
      src: img('driveway-after-4.webp'),
      alt: 'New paver driveway with a decorative border',
    },
  },
  {
    id: 'driveway-ba-5',
    title: 'Paver Driveway',
    category: 'paver-driveways',
    before: {
      src: img('driveway-before-5.webp'),
      alt: 'Cracked asphalt driveway before paver replacement',
    },
    after: {
      src: img('driveway-after-5.webp'),
      alt: 'New paver driveway leading to an attached garage',
    },
  },
  {
    id: 'mowing-ba-1',
    title: 'Lawn Mowing',
    category: 'lawn-mowing',
    before: {
      src: img('mowing-before-1.webp'),
      alt: 'Overgrown backyard lawn before professional mowing',
    },
    after: {
      src: img('mowing-after-1.webp'),
      alt: 'Freshly mowed backyard lawn with clean mowing stripes',
    },
  },
  {
    id: 'mowing-ba-3',
    title: 'Lawn Mowing',
    category: 'lawn-mowing',
    before: {
      src: img('mowing-before-3.webp'),
      alt: 'Overgrown acreage lawn before mowing',
    },
    after: {
      src: img('mowing-after-3.webp'),
      alt: 'Large mowed lawn with clean stripes around mature trees',
    },
  },
  {
    id: 'mowing-ba-5',
    title: 'Lawn Mowing',
    category: 'lawn-mowing',
    before: {
      src: img('mowing-before-5.webp'),
      alt: 'Weedy front yard before professional lawn mowing',
    },
    after: {
      src: img('mowing-after-5.webp'),
      alt: 'Freshly mowed front yard with striped finish',
    },
  },
  {
    id: 'landscape-ba-1',
    title: 'Foundation Beds',
    category: 'landscape-installation',
    before: {
      src: img('landscape-before-1.webp'),
      alt: 'Bare foundation strip before landscape bed installation',
    },
    after: {
      src: img('landscape-after-1.webp'),
      alt: 'New foundation planting bed with shrubs, flowers, and mulch',
    },
  },
  {
    id: 'landscape-ba-2',
    title: 'Island Bed',
    category: 'landscape-installation',
    before: {
      src: img('landscape-before-2.webp'),
      alt: 'Plain front lawn before island planting bed installation',
    },
    after: {
      src: img('landscape-after-2.webp'),
      alt: 'New island bed with a tree, perennials, and mulch',
    },
  },
  {
    id: 'landscape-ba-3',
    title: 'Corner Bed',
    category: 'landscape-installation',
    before: {
      src: img('landscape-before-3.webp'),
      alt: 'Plain grass at house corner before landscape bed installation',
    },
    after: {
      src: img('landscape-after-3.webp'),
      alt: 'New corner bed with arborvitae, boulders, and river rock',
    },
  },
  {
    id: 'landscape-ba-4',
    title: 'Walkway Beds',
    category: 'landscape-installation',
    before: {
      src: img('landscape-before-4.webp'),
      alt: 'Plain lawn along front walkway before landscape bed installation',
    },
    after: {
      src: img('landscape-after-4.webp'),
      alt: 'New planting beds lining the front walkway with hostas and flowers',
    },
  },
  {
    id: 'landscape-ba-5',
    title: 'Border Bed',
    category: 'landscape-installation',
    before: {
      src: img('landscape-before-5.webp'),
      alt: 'Plain grass along privacy fence before landscape bed installation',
    },
    after: {
      src: img('landscape-after-5.webp'),
      alt: 'New border bed along the fence with hydrangeas and perennials',
    },
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
  'cedar-falls': { src: img('city-content-intro-cedar-falls.webp'), desc: 'Full landscape installation with fresh plantings and mulched beds' },
  'waterloo': { src: img('city-content-intro-waterloo.webp'), desc: 'Mature trees and new foundation planting beds' },
  'hudson': { src: img('city-content-intro-hudson.webp'), desc: 'New construction landscaping with young sod and plantings' },
  'evansdale': { src: img('city-content-intro-evansdale.webp'), desc: 'Freshly mowed lawn with crisp edging' },
  'waverly': { src: img('city-content-intro-waverly.webp'), desc: 'Custom landscape design with layered garden beds' },
  'denver': { src: img('city-content-intro-denver.webp'), desc: 'Fresh mulch beds with clean bed edging' },
  'jesup': { src: img('city-content-intro-jesup.webp'), desc: 'Foundation shrub plantings with fresh mulch' },
  'parkersburg': { src: img('city-content-intro-parkersburg.webp'), desc: 'Retaining wall terracing on a sloped lot' },
  'la-porte-city': { src: img('city-content-intro-la-porte-city.webp'), desc: 'Neat foundation landscaping and trimmed lawn' },
  'dike': { src: img('city-content-intro-dike.webp'), desc: 'Professionally maintained shrubs and fresh mulch' },
  'elk-run-heights': { src: img('city-content-intro-elk-run-heights.webp'), desc: 'Restored landscape beds and a healthy lawn' },
  'dunkerton': { src: img('city-content-intro-dunkerton.webp'), desc: 'Completed landscaping with sidewalk border plantings' },
}

const cityWhyImages: Record<string, CityContentImage> = {
  'cedar-falls': { src: img('city-content-why-cedar-falls.webp'), desc: 'Retaining wall installation on a sloped yard' },
  'waterloo': { src: img('city-content-why-waterloo.webp'), desc: 'Layered landscape beds and stone border edging' },
  'hudson': { src: img('city-content-why-hudson.webp'), desc: 'New construction yard with hydroseed and young plantings' },
  'evansdale': { src: img('city-content-why-evansdale.webp'), desc: 'Tree pruning and lawn maintenance' },
  'waverly': { src: img('city-content-why-waverly.webp'), desc: 'Paver walkway and fresh landscape installation' },
  'denver': { src: img('city-content-why-denver.webp'), desc: 'Decorative rock and boulder landscaping' },
  'jesup': { src: img('city-content-why-jesup.webp'), desc: 'Foundation shrub installation with fresh mulch' },
  'parkersburg': { src: img('city-content-why-parkersburg.webp'), desc: 'Terraced retaining wall with graded yard' },
  'la-porte-city': { src: img('city-content-why-la-porte-city.webp'), desc: 'Landscape beds along a front walkway' },
  'dike': { src: img('city-content-why-dike.webp'), desc: 'Seasonal bed edging and mulch refresh' },
  'elk-run-heights': { src: img('city-content-why-elk-run-heights.webp'), desc: 'Yard restoration with new plantings' },
  'dunkerton': { src: img('city-content-why-dunkerton.webp'), desc: 'Backyard paver patio and plantings' },
}

export function getCityIntroImage(slug: string): CityContentImage {
  return cityIntroImages[slug] ?? { src: siteImages.cityIntro, desc: 'Landscaping project' }
}

export function getCityWhyImage(slug: string): CityContentImage {
  return cityWhyImages[slug] ?? { src: siteImages.cityWhy, desc: 'A1 Property Services landscaping' }
}

// Exports
export { siteImages, galleryProjects }

export const homepageGalleryPreview: GalleryBeforeAfterProject[] = galleryProjects.filter(
  (p): p is GalleryBeforeAfterProject =>
    !p.showcase && Boolean(p.before) && ['patio-2', 'wall-4'].includes(p.id),
)

export const hubGalleryPreview: GalleryBeforeAfterProject[] = galleryProjects.filter(
  (p): p is GalleryBeforeAfterProject =>
    !p.showcase && Boolean(p.before) && ['wall-1', 'patio-2', 'water-1'].includes(p.id),
)

const landingProofIds: Record<string, string[]> = {
  'retaining-walls': ['wall-1', 'wall-4', 'wall-2'],
  'paver-patio': ['patio-2', 'patio-1', 'patio-3'],
  'ponds-water-features': ['water-1', 'water-2', 'water-3'],
}

/** Before/after projects for legacy service landing proof sections. */
export function getLandingProofProjects(serviceSlug: string): GalleryBeforeAfterProject[] {
  const ids = landingProofIds[serviceSlug]
  if (!ids) return []
  return galleryProjects.filter(
    (p): p is GalleryBeforeAfterProject =>
      !p.showcase && Boolean(p.before) && ids.includes(p.id),
  )
}

export function getServiceHeroImage(slug: string): string | undefined {
  return serviceHeroMap[slug]
}

export function getServiceHeroImageAlt(slug: string): string {
  return serviceHeroAltMap[slug] ?? 'A1 Property Services landscaping'
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
    'paver-patio': 'paver-patios',
    'ponds-water-features': 'water',
    'lawn-care': 'lawn-mowing',
    'landscape-installation': 'landscape-installation',
  }
  const category = categoryMap[slug]
  if (!category) return []

  const titleFilter: Record<string, string> = {
    'retaining-walls': 'Retaining Wall',
  }

  let projects = galleryProjects.filter((p) => p.category === category)
  const titleMatch = titleFilter[slug]
  if (titleMatch) {
    projects = projects.filter((p) => p.title === titleMatch)
  }

  return projects.slice(0, limit)
}
