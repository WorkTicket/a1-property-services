export const DEFAULT_GALLERY_LOCATION = 'Cedar Falls, Iowa'

export const galleryCategoryLabels = {
  hardscape: 'Retaining Walls',
  water: 'Water Features',
  'paver-patios': 'Paver Patios',
  'paver-driveways': 'Paver Driveways',
  'lawn-mowing': 'Lawn Mowing',
  'landscape-installation': 'Landscape Installation',
} as const

export type GalleryProjectCopy = {
  title?: string
  location?: string
  description: string
  scopeOfWork: string
  materials: string[]
}

export const galleryProjectCopy: Record<string, GalleryProjectCopy> = {
  'wall-1': {
    title: 'Hillside Retaining Wall',
    description:
      'A steep excavated hillside turned into a usable grade with a segmental retaining wall and a patio-ready landing.',
    scopeOfWork:
      'Excavation, compacted base, wall construction, gravel backfill, and drainage so the slope stays put through Iowa freeze-thaw.',
    materials: ['Segmental retaining wall block', 'Compacted aggregate base', 'Gravel backfill', 'Perforated drain pipe'],
  },
  'wall-2': {
    title: 'Timber Wall Replacement',
    description:
      'An aged timber wall was pulled and replaced with a block retaining wall, then the yard behind it was graded clean.',
    scopeOfWork:
      'Demo of the failing wood wall, new block install, backfill, and finish grading so the lawn meets the wall cleanly.',
    materials: ['Segmental retaining wall block', 'Compacted base', 'Drainage gravel', 'Topsoil for finish grade'],
  },
  'wall-3': {
    title: 'Block Wall Replacement',
    description:
      'A leaning block wall was rebuilt with a new face, pea gravel finish, and a clean cap line.',
    scopeOfWork:
      'Removal of failed block, new base, rebuilt wall with proper drainage, and a pea-gravel finish at the toe.',
    materials: ['Segmental wall block', 'Pea gravel', 'Drain pipe', 'Compacted aggregate'],
  },
  'wall-4': {
    title: 'Front Yard Wall Rebuild',
    description:
      'A sloped front yard was leveled with an L-shaped retaining wall so the lawn and walk sit on usable ground.',
    scopeOfWork:
      'Layout, excavation, L-shaped wall build, backfill, and grading to create a flat front lawn.',
    materials: ['Segmental retaining wall block', 'Compacted base', 'Gravel backfill', 'Cap units'],
  },
  'wall-5': {
    title: 'Garage Wall Replacement',
    description:
      'A damaged wall along the garage was rebuilt and capped with decorative gravel for drainage and a finished look.',
    scopeOfWork:
      'Tear-out of the failed section, new wall against the garage side, drainage, and a decorative gravel cap.',
    materials: ['Retaining wall block', 'Decorative gravel', 'Drain pipe', 'Compacted base'],
  },
  'patio-1': {
    title: 'Raised Patio With Steps',
    description:
      'A backyard slope became a raised paver patio with stone steps and a retaining wall so the space is actually usable.',
    scopeOfWork:
      'Retaining wall, compacted patio base, paver install, and stone steps tying the patio back to the yard.',
    materials: ['Concrete pavers', 'Segmental wall block', 'Stone steps', 'Polymeric joint sand', 'Edge restraint'],
  },
  'patio-2': {
    title: 'Paver Patio Replacement',
    description:
      'A damaged patio was pulled and replaced with a new paver patio and clean edging.',
    scopeOfWork:
      'Demo, new compacted base, paver layout, joint sand, and edge restraint for a flat, durable surface.',
    materials: ['Concrete pavers', 'Compacted aggregate base', 'Polymeric sand', 'Edge restraint'],
  },
  'patio-ba-3': {
    title: 'Fire Pit Patio Install',
    description:
      'Worn lawn became a paver patio with a fire pit and seating area for evenings outside.',
    scopeOfWork:
      'Patio excavation, base, paver install, and a built-in fire pit with room for chairs.',
    materials: ['Concrete pavers', 'Fire pit kit / stone', 'Polymeric sand', 'Compacted base'],
  },
  'patio-ba-4': {
    title: 'Backyard Fire Pit Patio',
    description:
      'A bare backyard got a new paver patio, stone fire pit, and space for Adirondack chairs.',
    scopeOfWork:
      'Full patio build with compacted base, pavers, and a stone fire pit as the gathering spot.',
    materials: ['Concrete pavers', 'Stone fire pit', 'Polymeric sand', 'Edge restraint'],
  },
  'patio-ba-5': {
    title: 'Patio And Pergola Build',
    description:
      'Open lawn became a paver patio with a pergola and lounge seating for shade and outdoor living.',
    scopeOfWork:
      'Patio install plus pergola set on the new hardscape so furniture has a finished floor and cover.',
    materials: ['Concrete pavers', 'Pergola', 'Polymeric sand', 'Compacted aggregate base'],
  },
  'water-1': {
    title: 'Backyard Stone Waterfall',
    description:
      'A hillside yard became a multi-tiered stone waterfall with a retaining wall and garden steps.',
    scopeOfWork:
      'Grading, liner and stonework, pump and plumbing, retaining wall, and steps so the feature sits in the slope.',
    materials: ['Natural stone', 'Pond liner', 'Waterfall pump', 'Retaining wall block', 'Decorative gravel'],
  },
  'water-2': {
    title: 'Pond Waterfall Feature',
    description:
      'Backyard lawn next to the house became a koi pond with a stone waterfall.',
    scopeOfWork:
      'Pond excavation, liner, stone edge, waterfall, pump, and plantings to tuck the feature into the yard.',
    materials: ['EPDM pond liner', 'Natural stone', 'Pump and plumbing', 'Gravel', 'Aquatic planting pockets'],
  },
  'water-3': {
    title: 'Pond Stream Installation',
    description:
      'A backyard was built out with a pond, flowing stream, stone bridge, and surrounding gardens.',
    scopeOfWork:
      'Pond and stream excavation, liner, stonework, bridge, and planting beds around the water.',
    materials: ['Pond liner', 'Natural stone', 'Stone bridge', 'Pump', 'Landscape plantings'],
  },
  'driveway-ba-1': {
    title: 'Paver Driveway Install',
    description:
      'Cracked concrete was replaced with a paver driveway and a contrasting border.',
    scopeOfWork:
      'Demo, deep compacted base, driveway-grade pavers, border course, and joint sand built for Iowa winters.',
    materials: ['Driveway-grade pavers', 'Border pavers', 'Compacted aggregate base', 'Polymeric sand', 'Edge restraint'],
  },
  'driveway-ba-2': {
    title: 'Herringbone Paver Drive',
    description:
      'Old asphalt came out for a brick paver driveway in a herringbone pattern.',
    scopeOfWork:
      'Asphalt removal, new base, herringbone paver field, and a finished edge at the garage and street.',
    materials: ['Brick pavers', 'Herringbone layout', 'Compacted base', 'Edge restraint', 'Polymeric sand'],
  },
  'driveway-ba-3': {
    title: 'Modern Driveway Pavers',
    description:
      'A plain concrete drive was replaced with gray pavers sized to a modern farmhouse.',
    scopeOfWork:
      'Demo, base, large-format paver install, and clean lines to the garage and walk.',
    materials: ['Gray driveway pavers', 'Compacted base', 'Edge restraint', 'Polymeric sand'],
  },
  'driveway-ba-4': {
    title: 'Bordered Paver Driveway',
    description:
      'Worn concrete was upgraded to pavers with a decorative border along the edges.',
    scopeOfWork:
      'Full driveway replacement with a decorative soldier-course border and compacted base.',
    materials: ['Driveway pavers', 'Decorative border', 'Compacted base', 'Polymeric sand'],
  },
  'driveway-ba-5': {
    title: 'Garage Driveway Pavers',
    description:
      'Cracked asphalt leading to an attached garage was replaced with a new paver driveway.',
    scopeOfWork:
      'Asphalt tear-out, new base, paver field to the garage apron, and finish joints.',
    materials: ['Driveway-grade pavers', 'Compacted aggregate', 'Edge restraint', 'Polymeric sand'],
  },
  'mowing-ba-1': {
    title: 'Overgrown Front Lawn Cut',
    description:
      'An overgrown front lawn at the garage and driveway was cut, edged, and striped for curb appeal.',
    scopeOfWork:
      'First cut on tall turf, trim at the porch and garage, edge the driveway and walk, and blow off hard surfaces.',
    materials: ['Professional mowing', 'String trimming', 'Edging', 'Debris cleanup'],
  },
  'mowing-ba-3': {
    title: 'Acreage Lawn Mowing Job',
    description:
      'Overgrown acreage around mature trees was mowed with clean stripes and even height.',
    scopeOfWork:
      'Large-area mowing, trimming around trees, and a consistent cut so the property looks maintained.',
    materials: ['Wide-area mowing', 'Trimming', 'Edging', 'Cleanup'],
  },
  'mowing-ba-5': {
    title: 'Front Yard Lawn Mowing',
    description:
      'A weedy corner-lot front yard was mowed and striped, with clean edges along both sidewalks.',
    scopeOfWork:
      'Corner-lot mow, trim along both walks and the house, edge, and blow-off so the curb looks finished.',
    materials: ['Mowing', 'Edging', 'String trimming', 'Blow-off'],
  },
  'landscape-ba-1': {
    title: 'Foundation Bed Planting',
    description:
      'A bare strip along the foundation became a planted bed with shrubs, flowers, and mulch.',
    scopeOfWork:
      'Bed layout, soil prep, shrub and perennial install, edging, and mulch against the house.',
    materials: ['Shrubs and perennials', 'Hardwood mulch', 'Landscape edging', 'Amended soil'],
  },
  'landscape-ba-2': {
    title: 'Island Bed Installation',
    description:
      'A plain front lawn gained an island bed with a tree, perennials, and mulch.',
    scopeOfWork:
      'Island layout, tree planting, perennials, edging, and mulch so the bed reads as a finished feature.',
    materials: ['Ornamental tree', 'Perennials', 'Mulch', 'Bed edging'],
  },
  'landscape-ba-3': {
    title: 'Corner Bed Installation',
    description:
      'Bare grass at the house corner became a bed with arborvitae, boulders, and river rock.',
    scopeOfWork:
      'Corner bed build with screening evergreens, boulder accents, and rock mulch for low maintenance.',
    materials: ['Arborvitae', 'Boulders', 'River rock', 'Landscape fabric'],
  },
  'landscape-ba-4': {
    title: 'Walkway Bed Installation',
    description:
      'Plain lawn along the front walk was planted with hostas, flowers, and defined beds.',
    scopeOfWork:
      'Beds cut along the walk, plantings, edging, and mulch to frame the entry.',
    materials: ['Hostas and perennials', 'Hardwood mulch', 'Edging', 'Soil prep'],
  },
  'landscape-ba-5': {
    title: 'Border Bed Installation',
    description:
      'Grass along a privacy fence became a border bed with hydrangeas and perennials.',
    scopeOfWork:
      'Fence-line bed, shrub and perennial install, edging, and mulch for a finished property line.',
    materials: ['Hydrangeas', 'Perennials', 'Mulch', 'Landscape edging'],
  },
}
