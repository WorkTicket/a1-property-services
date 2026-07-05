export type ServiceIconName =
  | 'trees'
  | 'home'
  | 'flower2'
  | 'tree-deciduous'
  | 'wrench'
  | 'droplets'
  | 'sprout'
  | 'snowflake'
  | 'layers'
  | 'layout-grid'
  | 'land-plot'
  | 'triangle-right'
  | 'shovel'
  | 'zap'
  | 'mountain'
  | 'building'
  | 'ruler'
  | 'tractor'
  | 'pickaxe'

export type Service = {
  slug: string
  icon: ServiceIconName
  name: string
  shortDesc: string
  longDesc: string
  anchorId: string
  featured?: boolean
  category?: 'landscaping' | 'hardscaping' | 'drainage' | 'outdoor-living' | 'commercial' | 'seasonal'
}

export const services: Service[] = [
  {
    slug: 'landscape-installation',
    icon: 'trees',
    name: 'Landscape Installation',
    shortDesc: 'New beds, walkways, and plantings planned and installed start to finish.',
    longDesc:
      'Need a fresh look for your yard? We handle the whole job: plant selection, soil prep, grading, mulching, and planting. We pick plants that work in Iowa and lay everything out so it looks good now and holds up through the seasons.',
    anchorId: 'installation',
    featured: true,
    category: 'landscaping',
  },
  {
    slug: 'lawn-care',
    icon: 'home',
    name: 'Lawn Care & Mowing',
    shortDesc: 'Mowing, aeration, fertilization, and weed control through the growing season.',
    longDesc:
      'A good lawn takes steady care. We mow at the right height, aerate when needed, fertilize on a schedule, and hit weeds before they spread. Your grass stays thick and green when it counts.',
    anchorId: 'lawncare',
    category: 'landscaping',
  },
  {
    slug: 'preservation-restoration',
    icon: 'flower2',
    name: 'Preservation & Restoration',
    shortDesc: 'Fix neglected or damaged yards with practical solutions.',
    longDesc:
      "Overgrown beds, compacted soil, erosion damage. We figure out what's wrong and fix it. Soil repair, selective removal, replanting, and plant health treatments get neglected yards back on track.",
    anchorId: 'preservation',
    category: 'landscaping',
  },
  {
    slug: 'tree-service',
    icon: 'tree-deciduous',
    name: 'Tree Service',
    shortDesc: 'Pruning, removal, stump grinding, and disease management.',
    longDesc:
      'From routine trimming to full removal and stump grinding, our tree crew handles it safely. We also spot and treat common Iowa tree diseases and pests before they spread.',
    anchorId: 'treeservice',
    category: 'landscaping',
  },
  {
    slug: 'landscape-maintenance',
    icon: 'wrench',
    name: 'Landscape Maintenance',
    shortDesc: 'Pruning, mulching, edging, and fertilization every season.',
    longDesc:
      'Regular upkeep keeps your yard looking good. Our crews handle pruning, bed edging, fresh mulch, fertilization, and spring and fall cleanups on a schedule that works for you.',
    anchorId: 'maintenance',
    category: 'landscaping',
  },
  {
    slug: 'ponds-water-features',
    icon: 'droplets',
    name: 'Water Features',
    shortDesc: 'Custom ponds, waterfalls, and water gardens for your property.',
    longDesc:
      'A pond or waterfall adds sound and a focal point to any yard. We design and install custom ponds, waterfalls, and pondless water gardens, plus seasonal opening and maintenance to keep them running through Iowa winters.',
    anchorId: 'ponds',
    featured: true,
    category: 'hardscaping',
  },
  {
    slug: 'hydroseeding',
    icon: 'sprout',
    name: 'Hydroseeding',
    shortDesc: 'Fast lawn establishment for new yards and bare spots.',
    longDesc:
      'Hydroseeding is the best way to establish a new lawn or fix large bare areas. We spray a mix of seed, mulch, and starter fertilizer that holds moisture and helps grass come in even across the whole area.',
    anchorId: 'irrigation',
    category: 'landscaping',
  },
  {
    slug: 'snow-removal',
    icon: 'snowflake',
    name: 'Snow Removal',
    shortDesc: 'Reliable clearing for driveways, walkways, and parking lots.',
    longDesc:
      "Iowa winters are unpredictable. We provide contracted snow removal for residential and commercial properties, including driveways, sidewalks, and parking areas, so you're never scrambling after a storm.",
    anchorId: 'snow',
    category: 'seasonal',
  },
  {
    slug: 'landscape-design',
    icon: 'ruler',
    name: 'Landscape Design',
    shortDesc: 'Custom landscape plans tailored to your property and Iowa growing conditions.',
    longDesc:
      'Before the first shovel hits the dirt, a solid plan makes everything easier. We create custom landscape designs for sun exposure, drainage, hardscape layout, and plant selection so your installation goes smoothly from start to finish.',
    anchorId: 'landscapedesign',
    featured: true,
    category: 'landscaping',
  },
  {
    slug: 'drainage',
    icon: 'triangle-right',
    name: 'Drainage Solutions',
    shortDesc: 'French drains, grading, and surface drainage for Iowa properties.',
    longDesc:
      'Poor drainage kills grass and can damage foundations. We diagnose the problem and install French drains, regrading, catch basins, and downspout extensions built for Iowa rain and freeze-thaw cycles.',
    anchorId: 'drainage',
    featured: true,
    category: 'drainage',
  },
  {
    slug: 'excavation',
    icon: 'shovel',
    name: 'Excavation',
    shortDesc: 'Site prep, grading, and excavation for landscaping and construction projects.',
    longDesc:
      'Excavation is the starting point for major landscape work. We handle site clearing, cut and fill grading, trenching, and final grade prep in tight residential spaces with skid steers and mini excavators.',
    anchorId: 'excavation',
    category: 'drainage',
  },
  {
    slug: 'sod-installation',
    icon: 'land-plot',
    name: 'Sod Installation',
    shortDesc: 'Instant green lawns with professional sod installation.',
    longDesc:
      'Sod gives you an instant green lawn without months of waiting. We prep the soil, grade for drainage, install with tight seams, and walk you through watering and care for the first few weeks.',
    anchorId: 'sod',
    category: 'landscaping',
  },
  {
    slug: 'mulching',
    icon: 'zap',
    name: 'Mulching',
    shortDesc: 'Fresh mulch installation for beds, trees, and landscape areas.',
    longDesc:
      'Mulch does more than tidy up your beds — it holds moisture, blocks weeds, and protects roots through Iowa heat and cold. We weed, edge, and apply the right depth without piling against trunks or stems.',
    anchorId: 'mulching',
    category: 'landscaping',
  },
  {
    slug: 'rock-landscaping',
    icon: 'mountain',
    name: 'Rock Landscaping',
    shortDesc: 'River rock, boulders, and stone features for low-maintenance landscapes.',
    longDesc:
      'Rock landscaping is a durable, low-maintenance option where grass won\'t grow or mulch needs replacing every year. We install river rock, gravel, boulders, and dry creek beds with proper base prep for a natural look.',
    anchorId: 'rock',
    category: 'landscaping',
  },
  {
    slug: 'tree-planting',
    icon: 'tree-deciduous',
    name: 'Tree Planting',
    shortDesc: 'Strategic tree planting for shade, privacy, and property value.',
    longDesc:
      'Trees are a long-term investment in shade, privacy, and property value. We select Iowa-hardy species for your site, plant at the correct depth with amended soil, and set you up for healthy growth from day one.',
    anchorId: 'treeplanting',
    category: 'landscaping',
  },
  {
    slug: 'shrub-installation',
    icon: 'flower2',
    name: 'Shrub Installation',
    shortDesc: 'Foundation plantings, hedges, and ornamental shrubs for curb appeal.',
    longDesc:
      'Shrubs form the backbone of most residential landscapes. We install foundation plantings, privacy hedges, and ornamental shrubs with proper spacing and Iowa-hardy varieties for year-round interest.',
    anchorId: 'shrub',
    category: 'landscaping',
  },
  {
    slug: 'commercial-landscaping',
    icon: 'building',
    name: 'Commercial Landscaping',
    shortDesc: 'Landscape maintenance and installation for commercial properties.',
    longDesc:
      'Commercial properties need landscaping that looks professional year-round. We provide mowing, pruning, mulching, snow removal, and hardscape for office parks, retail centers, and HOAs with consistent scheduling and one invoice.',
    anchorId: 'commercial',
    category: 'commercial',
  },
  {
    slug: 'residential-landscaping',
    icon: 'home',
    name: 'Residential Landscaping',
    shortDesc: 'Full-service landscaping for Cedar Valley homes.',
    longDesc:
      'Your home landscape should be a space you enjoy every day. From full yard transformations to weekly mowing and seasonal cleanups, we handle design, installation, and maintenance tailored to your budget and family.',
    anchorId: 'residential',
    category: 'landscaping',
  },
  {
    slug: 'grading',
    icon: 'tractor',
    name: 'Grading & Leveling',
    shortDesc: 'Yard grading to fix drainage, level surfaces, and prepare for landscaping.',
    longDesc:
      'Proper grading solves drainage problems and creates level surfaces for patios, lawns, and gardens. We cut and fill low spots and direct water away from foundations so you notice the difference every time it rains.',
    anchorId: 'grading',
    category: 'drainage',
  },
  {
    slug: 'outdoor-living',
    icon: 'layout-grid',
    name: 'Outdoor Living Spaces',
    shortDesc: 'Fire pits, outdoor kitchens, patios, and custom entertainment areas.',
    longDesc:
      'Turn your backyard into an extension of your home. We design and build paver patios, fire pits, outdoor kitchens, and seating areas with lighting and landscaping integrated for how you entertain.',
    anchorId: 'outdoorliving',
    featured: true,
    category: 'outdoor-living',
  },
]

export const hardscapeFeatures = [
  {
    slug: 'retaining-walls',
    name: 'Retaining Walls',
    shortDesc:
      'Block and stone walls for slopes, erosion, and curb appeal that lasts.',
    href: '/services/retaining-walls',
    oldHref: '/retaining-wall-in-cedar-falls',
  },
  {
    slug: 'paver-patio',
    name: 'Paver Patios',
    shortDesc: 'Custom patios built to handle Iowa weather and daily use.',
    href: '/services/paver-patio',
    oldHref: '/paver-patio-installation',
  },
  {
    slug: 'water-features',
    name: 'Water Features',
    shortDesc: 'Ponds and waterfalls that add movement and character to your yard.',
    href: '/services/ponds-water-features',
    oldHref: '/cedar-falls-water-features',
  },
  {
    slug: 'outdoor-living',
    name: 'Outdoor Living Spaces',
    shortDesc: 'Fire pits, outdoor kitchens, and patios for backyard entertaining.',
    href: '/services/outdoor-living',
    oldHref: '',
  },
  {
    slug: 'drainage',
    name: 'Drainage Solutions',
    shortDesc: 'French drains, grading, and surface drainage for dry yards.',
    href: '/services/drainage',
    oldHref: '',
  },
]

export const hardscapeServices: Service[] = [
  {
    slug: 'retaining-walls',
    icon: 'layers',
    name: 'Retaining Walls',
    shortDesc:
      'Block and stone walls for slopes, erosion, and curb appeal that lasts.',
    longDesc:
      'Sloped Cedar Valley lots need retaining walls that handle runoff, stop erosion, and give you flat, usable space. Our retaining wall installation in Cedar Falls starts with a site assessment: we check slope, soil, drainage patterns, and how the wall ties into your yard. That means proper base compaction, gravel backfill, and weep drainage built for Iowa freeze-thaw. We build retaining walls with segmental block and natural stone. Single tier along a driveway or multi-level for a backyard terrace — either way, the wall is built to last and finished to match your property.',
    anchorId: 'retainingwalls',
    featured: true,
  },
  {
    slug: 'paver-patio',
    icon: 'layout-grid',
    name: 'Paver Patios',
    shortDesc: 'Custom patios built to handle Iowa weather and daily use.',
    longDesc:
      'A well-built paver patio gives you a solid outdoor space that holds up to Iowa weather and heavy use. Our paver patio installation in Cedar Falls covers every step: excavation, compacted aggregate base, edge restraint, pattern layout, and final compaction so your patio stays level and drains right for years. Pick from a range of paver styles, colors, and patterns. Add seat walls, fire pits, or lighting if you want. From small backyard patios to large entertainment areas, we build them the same way every time.',
    anchorId: 'paverpatio',
    featured: true,
  },
]

export type ProblemSolution = {
  problem: string
  solution: string
}

export const serviceProblemSolutions: Record<string, ProblemSolution[]> = {
  'retaining-walls': [
    { problem: 'Your sloped yard is unusable and keeps eroding every time it rains', solution: 'A retaining wall terraces the slope into flat, usable space while holding back soil. You gain a level yard for patios, gardens, or play areas without erosion washing it away.' },
    { problem: 'Water runs down the hill toward your foundation every storm', solution: 'A retaining wall with integrated drainage redirects water away from your house. The gravel backfill and drain pipe behind the wall collect and channel water to a safe outlet.' },
    { problem: 'Iowa freeze-thaw cycles cause the ground to shift and damage structures', solution: 'Segmental block walls flex slightly through freeze-thaw without cracking. Proper base compaction and gravel drainage prevent heaving that destroys rigid walls.' },
  ],
  'paver-patio': [
    { problem: 'Your concrete patio cracked and settled after a few Iowa winters', solution: 'Pavers flex through freeze-thaw cycles without cracking. The compacted aggregate base and edge restraint keep the surface level and stable year after year.' },
    { problem: 'Rainwater pools on your current patio and runs toward the house', solution: 'We install every paver patio with a precise slope away from your foundation. The base layers are graded for drainage before the first paver goes down.' },
    { problem: 'You want an outdoor space but need it to match your home and budget', solution: 'Pavers come in dozens of colors, shapes, and patterns at various price points. We design a patio that fits your style and budget without compromising quality.' },
  ],
  'ponds-water-features': [
    { problem: 'Your backyard feels flat and lacks a focal point or visual interest', solution: 'A custom water feature adds movement, sound, and a natural centerpiece. Even a small pondless waterfall transforms the whole feel of the yard.' },
    { problem: 'You want a pond but worry about Iowa winter damage', solution: 'We design every water feature with winterization in mind. Pumps are removable, liners are rated for freeze-thaw, and we offer seasonal opening and closing services.' },
    { problem: 'The sound of traffic and neighbors carries into your outdoor space', solution: 'Running water from a waterfall or stream creates natural white noise that masks unwanted sounds. The louder the water feature, the more privacy you gain.' },
  ],
  'landscape-installation': [
    { problem: 'Your yard has bare patches, overgrown areas, and no cohesive design', solution: 'We start fresh with a complete plan: grading, soil prep, plant selection, and installation. The result is a cohesive landscape that works with your property.' },
    { problem: 'You bought plants that looked good at the nursery but died in Iowa clay', solution: 'We select plants proven to thrive in Black Hawk County soil and climate. Proper soil preparation and planting technique give them the best start.' },
    { problem: 'DIY landscaping projects never look as polished as professional work', solution: 'Professional installation means proper spacing, clean edges, correct planting depth, and materials that hold up. The finished look is night and day from DIY.' },
  ],
  'lawn-care': [
    { problem: 'Your lawn is patchy, weedy, and never looks as good as the neighbors', solution: 'A scheduled program of mowing, fertilization, aeration, and weed control builds thick, healthy turf that naturally crowds out weeds.' },
    { problem: 'You spend every weekend mowing and still cannot keep up', solution: 'Weekly professional mowing frees your weekends. We handle the trimming, edging, and blowing so your lawn looks maintained without your time.' },
    { problem: 'Crabgrass and broadleaf weeds take over no matter what you spray', solution: 'Pre-emergent applied at the right time stops crabgrass before it germinates. Post-emergent spot treatment handles what gets through.' },
  ],
  'landscape-maintenance': [
    { problem: 'Your landscape beds look overgrown and weedy by midsummer', solution: 'Regular pruning, weeding, and edging keep beds looking sharp through the whole growing season. We catch problems before they take over.' },
    { problem: 'Mulch fades and thins out, leaving beds looking tired by August', solution: 'Annual mulch refresh in spring restores color and weed suppression. We apply the right depth (2-3 inches) for maximum benefit.' },
    { problem: 'You do not have time to keep up with seasonal yard work', solution: 'A maintenance plan covers spring cleanup, pruning, mulching, fertilization, and fall cleanup. Your yard stays on schedule without your effort.' },
  ],
  'tree-service': [
    { problem: 'Dead or dying trees near your house are a storm liability', solution: 'Professional removal with rigging or crane access takes them down safely without damaging your home, roof, or landscaping.' },
    { problem: 'Overgrown branches scrape your roof and drop debris constantly', solution: 'Selective pruning removes problem branches, improves tree structure, and reduces storm damage risk. The tree stays healthy and looks better.' },
    { problem: 'An old stump takes up space and sprouts new growth every year', solution: 'Stump grinding removes the stump below grade. The area can be seeded, sodded, or planted over immediately.' },
  ],
  'hydroseeding': [
    { problem: 'You have a large bare area that needs grass but sod is too expensive', solution: 'Hydroseeding covers large areas at a fraction of sod cost. The seed, mulch, and fertilizer mix germinates evenly across the entire area.' },
    { problem: 'Broadcasting seed by hand leaves thin patches and washouts', solution: 'Hydrosedding applies seed uniformly with a tackifier that holds it in place. The mulch layer retains moisture for better germination rates.' },
    { problem: 'Erosion is washing away topsoil on your new construction site', solution: 'The hydroseed slurry bonds to the soil surface, holding it in place while grass establishes. It is the most effective erosion control for bare slopes.' },
  ],
  'snow-removal': [
    { problem: 'You wake up to 6 inches of snow and cannot get out of the driveway', solution: 'Seasonal snow removal contracts mean you wake up to a clear driveway and walkways. We start plowing as soon as accumulation hits 2 inches.' },
    { problem: 'Ice buildup on walkways creates a slip-and-fall hazard', solution: 'Pre-treatment with salt and de-icer before storms prevents ice from bonding to the surface. Post-treatment adds traction after clearing.' },
    { problem: 'Commercial properties need walkways clear for early-morning tenants', solution: 'Priority commercial service ensures parking lots, entryways, and walkways are cleared and treated before business hours.' },
  ],
  'landscape-design': [
    { problem: 'You have ideas for your yard but cannot turn them into a real plan', solution: 'We create scaled site plans with specific plant selections, hardscape placement, and phased implementation. Your vision becomes a buildable blueprint.' },
    { problem: 'You want to landscape over time but need a master plan first', solution: 'A phased design lets you install in stages while keeping the big picture intact. Each phase builds toward the completed landscape.' },
    { problem: 'Contractors gave you conflicting advice and you are not sure who is right', solution: 'A professional landscape design provides clear specifications that any contractor can follow. You get competitive bids on the same scope of work.' },
  ],
  'drainage': [
    { problem: 'Standing water lingers in your yard for days after every rain', solution: 'French drains collect subsurface water and carry it to a safe outlet. The perforated pipe and gravel trench give water a path out of your yard.' },
    { problem: 'Water seeps into your basement every time it rains hard', solution: 'Regrading, downspout extensions, and surface drainage redirect water away from your foundation. Combined, these solutions keep your basement dry.' },
    { problem: 'Low spots in your lawn stay muddy and kill the grass every year', solution: 'Catch basins at low points collect surface water and pipe it away. The area drains completely, and grass can grow without drowning.' },
  ],
  'excavation': [
    { problem: 'Your yard needs major grading but you have no way to move the dirt', solution: 'Our skid steers and mini excavators handle cut and fill grading efficiently. We reshape the terrain for drainage, patios, and lawns.' },
    { problem: 'You are installing a patio or retaining wall and need the site prepped', solution: 'Precision excavation removes the right amount of soil to the right depth. Proper base preparation prevents settling and drainage problems later.' },
    { problem: 'Tree stumps and buried debris block your landscaping plans', solution: 'Excavation equipment removes stumps, roots, rocks, and debris. We clear the site so your landscape project starts with a clean slate.' },
  ],
  'sod-installation': [
    { problem: 'You need an established lawn immediately, not in 6 weeks', solution: 'Sod gives you instant green grass. We install it in one day and you have a usable lawn within 2-3 weeks.' },
    { problem: 'Hydroseeding failed on your property due to erosion or poor germination', solution: 'Sod eliminates germination risk. The grass is already mature and rooted. Proper soil prep ensures it establishes quickly.' },
    { problem: 'Your new construction yard is bare dirt and turning into a mud pit', solution: 'Sod stabilizes the soil immediately. No more mud tracked into the house, and the lawn looks established from day one.' },
  ],
  'mulching': [
    { problem: 'Your landscape beds look tired and weeds are taking over', solution: 'Fresh mulch at 2-3 inches suppresses weeds, holds moisture, and gives beds a clean, uniform appearance. The transformation is immediate.' },
    { problem: 'You mulched last year but it faded, thinned out, and looks bad', solution: 'Annual mulch refresh restores color and depth. We weed and edge first, then apply fresh mulch for a like-new look every spring.' },
    { problem: 'Mulch is piled against your tree trunks and they are showing rot', solution: 'We apply mulch at the correct depth (2-3 inches) and keep it pulled back from trunks and stems. Proper technique prevents moisture-related damage.' },
  ],
  'rock-landscaping': [
    { problem: 'You are tired of replacing mulch every year in your landscape beds', solution: 'Rock landscaping is a one-time installation that never needs replacement. The upfront cost is higher, but you save on annual mulching forever.' },
    { problem: 'A drainage swale or low spot in your yard stays muddy and ugly', solution: 'A dry creek bed made of river rock channels water while looking decorative. It solves the drainage problem and adds visual interest.' },
    { problem: 'You want a low-maintenance yard but do not want it to look barren', solution: 'Rock gardens with boulders, river rock, and drought-tolerant plants create a striking landscape that needs minimal water and no annual mulch.' },
  ],
  'tree-planting': [
    { problem: 'Your yard has no shade and the south side of your house bakes in summer', solution: 'Strategic shade tree planting on the south and west sides reduces cooling costs. Proper species selection ensures the tree thrives without outgrowing the space.' },
    { problem: 'Previous trees died because they were planted too deep or in the wrong spot', solution: 'We plant every tree at the correct depth with the root flare exposed. Species are matched to sun exposure, soil type, and mature space requirements.' },
    { problem: 'You want privacy from neighbors but do not want a fence', solution: 'Evergreen trees and large shrubs create a natural privacy screen that looks better than a fence and provides wildlife habitat.' },
  ],
  'shrub-installation': [
    { problem: 'Your foundation looks bare and the house seems to sit on the ground', solution: 'Foundation plantings of shrubs frame your home, soften the transition from house to ground, and add significant curb appeal.' },
    { problem: 'Previous shrubs outgrew their space and now block windows and walkways', solution: 'We select compact, slow-growing varieties that stay within their allotted space. No more constant pruning to keep them from taking over.' },
    { problem: 'Neighbors can see right into your patio and living room windows', solution: 'A privacy hedge of dense shrubs creates a living screen that blocks sight lines and reduces noise. Evergreen varieties provide year-round privacy.' },
  ],
  'commercial-landscaping': [
    { problem: 'Your commercial property looks neglected and tenants are complaining', solution: 'Scheduled landscape maintenance keeps your property looking professional. Mowing, pruning, mulching, and weeding on a consistent schedule.' },
    { problem: 'Snow and ice make your parking lot and walkways dangerous in winter', solution: 'Commercial snow removal contracts with pre-treatment and priority response keep your property safe and accessible through every storm.' },
    { problem: 'Coordinating multiple landscaping vendors is eating your time', solution: 'One contract, one point of contact, one monthly bill. We handle maintenance, hardscape, snow removal, and seasonal work.' },
  ],
  'residential-landscaping': [
    { problem: 'Your yard has never had professional landscaping and shows it', solution: 'From design through installation, we transform your property. Grading, plants, hardscape, and lighting all work together for a cohesive look.' },
    { problem: 'You want to enjoy your yard but maintenance is overwhelming', solution: 'We offer maintenance plans that keep your landscape looking its best. Mowing, pruning, mulching, and seasonal care on autopilot.' },
    { problem: 'Previous DIY projects never look pulled together or finished', solution: 'Professional design and installation means clean edges, proper spacing, correct materials, and a finished look that DIY cannot match.' },
  ],
  'grading': [
    { problem: 'Your yard is so bumpy and uneven that mowing is difficult', solution: 'Lawn leveling and grading smooth out bumps and fill low spots. The result is a flat, even surface that mows cleanly and looks great.' },
    { problem: 'Water runs toward your house and seeps into the basement', solution: 'Regrading creates proper slope away from the foundation. Laser-guided grading ensures the slope is consistent and effective.' },
    { problem: 'A new patio or retaining wall needs a level, properly graded base', solution: 'Final grading prepares the site for hardscape installation. Proper base grade prevents settling and drainage problems in the finished project.' },
  ],
  'preservation-restoration': [
    { problem: 'Your yard was neglected and now the soil is compacted and plants are dying', solution: 'We assess soil health, amend as needed, remove dead plants, and replant with appropriate species. A care plan keeps things on track.' },
    { problem: 'Erosion is washing away topsoil and creating gullies in your yard', solution: 'Erosion control measures like retaining walls, French drains, and erosion-control plantings stop soil loss and stabilize the ground.' },
    { problem: 'Overgrown shrubs and trees have taken over and need to be reset', solution: 'Selective removal, pruning, and replanting restore balance. The landscape gets a fresh start without a complete tear-out.' },
  ],
  'outdoor-living': [
    { problem: 'Your backyard is unused space when it could be an entertainment hub', solution: 'A paver patio with built-in fire pit, outdoor kitchen, and seating areas transforms your yard into an outdoor room you use constantly.' },
    { problem: 'You want to entertain but have no defined spaces for cooking and lounging', solution: 'Multi-level patios create distinct zones for dining, cooking around a fire, and lounging. Each zone has its own purpose and flow.' },
    { problem: 'Your current setup is a grill on a concrete slab and nowhere to sit', solution: 'A complete outdoor living design integrates cooking, dining, and seating areas. We add lighting and landscaping so the space works from day to night.' },
  ],
}

export type ServiceFAQ = {
  question: string
  answer: string
}

export type ServiceProcessStep = {
  title: string
  description: string
}

export const serviceProcessSteps: Record<string, ServiceProcessStep[]> = {
  'retaining-walls': [
    {
      title: 'Site Assessment & Design',
      description:
        'We evaluate slope, soil conditions, drainage, and wall height to plan a retaining wall that meets Cedar Falls code and handles Iowa weather.',
    },
    {
      title: 'Excavation & Base Prep',
      description:
        'A compacted gravel base and proper footing depth give your retaining wall the stability it needs on Cedar Valley slopes.',
    },
    {
      title: 'Drainage & Backfill',
      description:
        'Perforated drain pipe, gravel backfill, and geogrid where needed manage water behind the wall through freeze-thaw cycles.',
    },
    {
      title: 'Block or Stone Installation',
      description:
        'Segmental block or natural stone is set level course by course with caps and finish details that match your home.',
    },
  ],
  'paver-patio': [
    {
      title: 'Layout & Excavation',
      description:
        'We mark the patio footprint, excavate to the right depth, and account for slope away from your foundation.',
    },
    {
      title: 'Base & Compaction',
      description:
        'Layers of compacted aggregate create a stable base engineered for Iowa freeze-thaw and heavy patio use.',
    },
    {
      title: 'Edge Restraint & Pavers',
      description:
        'Edge restraint is set, pavers are laid in your chosen pattern, and joints are filled with polymeric sand.',
    },
    {
      title: 'Final Compaction & Cleanup',
      description:
        'The surface is compacted, edges are finished, and the area is cleaned up so your new paver patio is ready to use.',
    },
  ],
  'ponds-water-features': [
    {
      title: 'Design Consultation',
      description:
        'We discuss your vision — koi pond, pondless waterfall, or stream — and design a water feature that fits your Cedar Falls yard and budget.',
    },
    {
      title: 'Excavation & Basin Setup',
      description:
        'The site is excavated and lined or fitted with a pondless reservoir, sized for proper water volume and circulation.',
    },
    {
      title: 'Pump, Filtration & Rockwork',
      description:
        'Pumps, filters, and plumbing are installed, then natural stone and boulders are placed for a finished look.',
    },
    {
      title: 'Landscaping & Startup',
      description:
        'Plants, lighting, and mulch complete the install. We walk you through startup and offer seasonal maintenance plans.',
    },
  ],
  'landscape-design': [
    {
      title: 'Site Consultation & Needs Assessment',
      description:
        'We walk your property, discuss how you use the space, take measurements, and note sun patterns, drainage, and existing features.',
    },
    {
      title: 'Concept Development',
      description:
        'We create initial design concepts with plant selection, hardscape placement, and layout options that fit your budget and goals.',
    },
    {
      title: 'Final Design & Plant Plan',
      description:
        'A detailed scaled plan is prepared with specific plant varieties, hardscape materials, lighting locations, and phased implementation options.',
    },
    {
      title: 'Installation or Handoff',
      description:
        'We can install the design for you or provide the final plans if you prefer to install it yourself or over multiple phases.',
    },
  ],
  'drainage': [
    {
      title: 'Diagnosis & Assessment',
      description:
        'We identify problem areas, check grading, inspect downspout routing, and determine the root cause of drainage issues on your property.',
    },
    {
      title: 'Solution Design',
      description:
        'We design a drainage solution — French drain, catch basin, regrading, or combination — sized for your property\'s water volume and soil conditions.',
    },
    {
      title: 'Installation',
      description:
        'Trenches are dug, pipe and drainage materials are installed, grading is adjusted, and everything is connected to appropriate outlets.',
    },
    {
      title: 'Restoration & Testing',
      description:
        'Disturbed areas are restored with sod or seed, and the system is tested under rain or hose water to confirm proper flow and drainage.',
    },
  ],
  'sod-installation': [
    {
      title: 'Soil Preparation',
      description:
        'We remove existing vegetation, amend soil as needed, and grade the area for proper drainage before laying sod.',
    },
    {
      title: 'Sod Laying',
      description:
        'Fresh sod is laid in staggered rows with tight seams to prevent gaps and promote even root establishment.',
    },
    {
      title: 'Rolling & Watering',
      description:
        'The sod is rolled to ensure good soil-to-root contact and thoroughly watered to kickstart the rooting process.',
    },
    {
      title: 'Establishment Care',
      description:
        'We provide detailed care instructions for watering, mowing, and fertilizing during the critical first 3-4 weeks of establishment.',
    },
  ],
  'outdoor-living': [
    {
      title: 'Design & Planning',
      description:
        'We discuss how you want to use the space — dining, cooking, lounging, fire — and design a layout that flows naturally between zones.',
    },
    {
      title: 'Hardscape Installation',
      description:
        'Patio base is prepared and installed, fire pit or kitchen foundation is set, and all hardscape surfaces are built to spec.',
    },
    {
      title: 'Features & Finishes',
      description:
        'Fire features, outdoor kitchen components, lighting, and seating walls are installed and connected to utilities as needed.',
    },
    {
      title: 'Landscaping & Final Detail',
      description:
        'Plantings, mulch, and decorative gravel complete the space. We walk through everything with you and make sure it is ready to use.',
    },
  ],
  'landscape-installation': [
    {
      title: 'Consultation & Design',
      description:
        'We meet with you on-site to discuss your goals and create a detailed landscape plan with plant selections, hardscape placement, and phased implementation.',
    },
    {
      title: 'Planning & Material Ordering',
      description:
        'We handle permits, material ordering, scheduling, and utility locating so installation goes smoothly without delays.',
    },
    {
      title: 'Site Preparation & Grading',
      description:
        'We grade for drainage, prep the soil, and set the foundation for beds, walkways, and any hardscape features.',
    },
    {
      title: 'Installation',
      description:
        'Our crew installs plants, beds, hardscape, and all features following the approved plan with proper techniques for lasting results.',
    },
    {
      title: 'Cleanup & Final Walkthrough',
      description:
        'We clean the job site thoroughly and walk through the completed project with you so everything meets your expectations.',
    },
  ],
  'residential-landscaping': [
    {
      title: 'Consultation & Design',
      description:
        'We walk your property, discuss your goals and budget, and create a landscape plan tailored to your home and how you use the space.',
    },
    {
      title: 'Planning & Preparation',
      description:
        'We coordinate materials, scheduling, and site prep so the project runs smoothly from start to finish.',
    },
    {
      title: 'Installation',
      description:
        'Our crew handles grading, planting, hardscape, and all details of your landscape transformation with professional precision.',
    },
    {
      title: 'Cleanup & Walkthrough',
      description:
        'We clean every inch of the job site and walk through the completed work with you to make sure you are happy with the result.',
    },
  ],
}

export type ServiceExtendedContent = {
  heading: string
  paragraphs: string[]
  relatedBlogSlug?: string
}

export const serviceExtendedContent: Record<string, ServiceExtendedContent> = {
  'retaining-walls': {
    heading: 'Why Cedar Falls Homeowners Choose Our Retaining Walls',
    paragraphs: [
      'Retaining walls are one of the most practical upgrades for sloped Cedar Valley properties. A properly installed retaining wall stops soil erosion, protects foundations and driveways, and turns steep ground into flat, usable yard space for patios, gardens, or play areas.',
      'Iowa freeze-thaw cycles punish walls built without drainage. Every retaining wall we install in Cedar Falls includes gravel backfill, drain pipe, and materials rated for local conditions. Whether you need a single-tier block wall along a driveway or a multi-level stone terrace in the backyard, we build it to last.',
      'Concrete retaining walls deliver maximum strength for tall walls and load-bearing applications. Block retaining walls (segmental concrete block) are the most popular choice for residential projects because they install faster, flex through freeze-thaw without cracking, and come in a variety of colors and textures. Decorative retaining walls add architectural interest with stone veneer, cap systems, and layered tiers that double as seating.',
      'Whichever material you choose, the engineering underneath is what matters most. Proper base compaction, geogrid reinforcement for walls over four feet, and drainage gravel behind every course — that is what keeps your retaining wall standing for decades.',
    ],
    relatedBlogSlug: 'retaining-wall-benefits-cedar-falls',
  },
  'paver-patio': {
    heading: 'Paver Patios Built for Cedar Falls Weather',
    paragraphs: [
      'A paver patio is one of the best investments you can make in outdoor living. Unlike poured concrete, pavers flex slightly through Iowa freeze-thaw without cracking, and individual units can be replaced if needed.',
      'Our paver patio installation process follows industry best practices: proper excavation depth, compacted aggregate base in lifts, edge restraint, and polymeric joint sand. The result is a level, well-draining patio that looks great and holds up to years of use across the Cedar Valley.',
      'Natural stone patios offer a premium alternative with unique flagstone, travertine, or bluestone surfaces that no two are alike. We also integrate fire pits and outdoor kitchens into paver patios for complete outdoor living spaces. Fire pit patios become the natural gathering point for cooler evenings, while outdoor kitchen patios extend the cooking and entertaining season well into fall.',
    ],
    relatedBlogSlug: 'paver-patio-planning-guide',
  },
  'ponds-water-features': {
    heading: 'Custom Water Features for Cedar Falls Properties',
    paragraphs: [
      'Water features add movement, sound, and a natural focal point to any landscape. From compact pondless waterfalls for smaller yards to full koi ponds with streams and bridges, we design and install water features that complement your existing landscaping.',
      'Every water features installation in Cedar Falls includes proper pump sizing, filtration, and winterization planning. We work with natural stone and boulders to create features that look like they belong on your property — not a kit dropped in the yard.',
    ],
  },
  'landscape-design': {
    heading: 'Thoughtful Landscape Design for Cedar Valley Homes',
    paragraphs: [
      'Good landscape design starts with understanding how you use your yard. We create scaled site plans that account for sun patterns, existing trees, drainage, views, and traffic flow. Whether you want a formal garden, a native plant landscape, or an entertainment-focused backyard, we design to your priorities.',
      'Our design process includes plant selection for Iowa hardiness zones, hardscape placement for practical use, and lighting plans to extend enjoyment into the evening. We provide printed plans, plant lists, and phased implementation timelines so you can build your landscape at your pace.',
    ],
  },
  'drainage': {
    heading: 'Solving Drainage Problems on Cedar Valley Properties',
    paragraphs: [
      'Standing water, soggy lawns, and basement moisture are signs your yard needs better drainage. We diagnose the root cause — whether it is poor grading, compacted soil, inadequate downspout routing, or high water table — and install targeted solutions.',
      'French drains collect and redirect subsurface water through perforated pipe in gravel trenches. Surface drainage systems use catch basins and channel drains to move water from low spots. Grading recontours the yard surface to direct runoff away from your foundation. We combine these approaches when needed for complete drainage solutions on Iowa properties.',
    ],
  },
  'outdoor-living': {
    heading: 'Outdoor Living Spaces Designed for Iowa Evenings',
    paragraphs: [
      'A well-designed outdoor living space extends your home into the yard. Paver patios provide the foundation, while fire pits create warmth and ambiance for cool evenings. Outdoor kitchens with built-in grills, counter space, and storage make alfresco dining a regular part of your routine.',
      'Every outdoor living project considers flow between cooking, dining, and lounging areas. We integrate lighting, plantings, and hardscape finishes so the space feels like a natural extension of your home. From intimate fire pit seating areas to full outdoor kitchens with pergolas, we build spaces that get used.',
    ],
  },
  'excavation': {
    heading: 'Professional Excavation for Cedar Falls Projects',
    paragraphs: [
      'Excavation is the first step in most landscape transformations. We handle site clearing, rough and finish grading, trenching for drainage and utilities, and dig-outs for patios, retaining walls, and water features. Our equipment fleet includes skid steers and mini excavators sized for residential access.',
      'Proper excavation prevents future problems. Correct base preparation prevents hardscape settling. Proper grading prevents water damage. We take the time to get the foundation right on every job.',
    ],
  },
  'sod-installation': {
    heading: 'Instant Lawns with Professional Sod Installation',
    paragraphs: [
      'Sod gives you an established lawn immediately. We prepare the soil with proper grading, amendment, and surface preparation before laying fresh sod. Tight seams, staggered rows, and immediate watering help the turf root quickly.',
      'Our sod installation process includes soil testing to determine if amendments are needed, final grading to eliminate low spots, and rolling to ensure good soil-to-root contact. We provide detailed care instructions for the critical first two weeks.',
    ],
  },
  'commercial-landscaping': {
    heading: 'Commercial Landscape Services Across the Cedar Valley',
    paragraphs: [
      'Commercial properties require consistent, professional landscaping that maintains curb appeal year-round. We provide scheduled maintenance, seasonal enhancements, and hardscape construction for office parks, retail centers, HOAs, and industrial properties.',
      'Our commercial clients value reliable scheduling, clear communication, and single-invoice simplicity. We handle everything from weekly mowing and pruning to snow removal and full hardscape installations, so property managers have one less thing to worry about.',
    ],
  },
}

export const servicesHubFaqs: ServiceFAQ[] = [
  {
    question: 'What landscaping services do you offer in Cedar Falls?',
    answer:
      'We offer full landscaping services in Cedar Falls including retaining wall installation, paver patio installation, water features, landscape installation, lawn care, tree service, landscape maintenance, hydroseeding, and snow removal.',
  },
  {
    question: 'Do you serve areas outside Cedar Falls?',
    answer:
      'Yes. We serve Cedar Falls, Waterloo, Hudson, Evansdale, and the greater Cedar Valley. Contact us to confirm service availability for your property.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes. We provide free on-site estimates for landscaping and hardscaping projects in Cedar Falls. Call us or request a quote online.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes. A1 Property Services is a licensed Iowa contractor with liability insurance on every job.',
  },
]

export const serviceBenefits: Record<string, string[]> = {
  'landscape-installation': [
    'Full design and install from grading to final planting',
    'Plants picked for Iowa growing conditions',
    'Walkways, patios, and retaining walls where you need them',
    'Soil prep and timing that helps plants establish',
  ],
  'lawn-care': [
    'Mowing at the right height for Iowa grass',
    'Core aeration to loosen compacted soil',
    'Fertilizer timed for the Cedar Valley growing season',
    'Weed control for the weeds actually in your lawn',
  ],
  'preservation-restoration': [
    'We check soil health, drainage, and plant condition first',
    'Pruning, removal, and replanting to get things back in shape',
    'Erosion fixes and soil amendment for damaged spots',
    'Plant health care matched to local trees and shrubs',
  ],
  'tree-service': [
    'Pruning and thinning for tree health and storm safety',
    'Tree removal with stump grinding when you need a clean slate',
    'Diagnosis and treatment for common Iowa tree problems',
    'Storm damage cleanup across the Cedar Valley',
  ],
  'landscape-maintenance': [
    'Pruning, edging, and bed work through the year',
    'Fresh mulch to hold moisture and keep weeds down',
    'Spring and fall cleanups with debris haul-off',
    'Fertilization and plant checks on a regular schedule',
  ],
  'ponds-water-features': [
    'Pondless waterfalls, koi ponds, and custom water gardens',
    'Pump, filtration, and circulation sized for your feature',
    'Seasonal opening, closing, and maintenance plans',
    'Landscape lighting to showcase water features at night',
  ],
  'hydroseeding': [
    'Seed, mulch, and fertilizer applied in one pass',
    'Good erosion control on slopes and bare ground',
    'Even germination with a moisture-holding mulch layer',
    'Cost-effective for new lawns, overseeding, and big areas',
  ],
  'snow-removal': [
    'Reliable plowing and shoveling for driveways and walkways',
    'Pre-treatment with salt and de-icer before predicted storms',
    'Priority service for commercial and residential accounts',
    'Seasonal contracts so you are covered all winter long',
  ],
  'retaining-walls': [
    'Drainage and gravel backfill for Iowa freeze-thaw',
    'Segmental block and natural stone to match your home',
    'Compacted base for long-term stability on slopes',
    'Tiered walls that give you flat, usable yard space',
  ],
  'paver-patio': [
    'Excavation and compacted base done to spec',
    'Wide range of paver colors, textures, and patterns',
    'Edge restraint and joint sand so pavers stay level',
    'Fire pits, seat walls, and lighting if you want them',
  ],
  'landscape-design': [
    'Custom scaled plans for your property and budget',
    'Plant selection for Iowa hardiness zones and conditions',
    'Phased implementation so you can build over time',
    'Hardscape, lighting, and irrigation integration',
  ],
  'drainage': [
    'On-site diagnosis of drainage problems',
    'French drains, catch basins, and surface drainage',
    'Grading solutions for flat and sloped properties',
    'Downspout and gutter water routing away from foundations',
  ],
  'excavation': [
    'Site clearing and preparation for construction',
    'Cut and fill grading for proper drainage',
    'Trenching for utilities, drainage, and footings',
    'Skid steer and mini excavator for tight access',
  ],
  'sod-installation': [
    'Soil preparation and amendment before laying sod',
    'Professional installation with tight staggered seams',
    'Rolling and initial watering for root establishment',
    'Care instructions for successful lawn establishment',
  ],
  'mulching': [
    'Weeding and edging beds before mulch application',
    'Proper 2-3 inch depth without trunk contact',
    'Shredded hardwood, dyed, or cedar options available',
    'Annual service to keep beds fresh and weed-free',
  ],
  'rock-landscaping': [
    'River rock, pea gravel, flagstone, and boulder options',
    'Weed barrier fabric installation under all stone',
    'Dry creek beds, rock gardens, and pathways',
    'Zero-maintenance alternative to mulched beds',
  ],
  'tree-planting': [
    'Species selection for Iowa climate and conditions',
    'Proper hole preparation and soil amendment',
    'Correct planting depth and staking when needed',
    'Deep watering and care instructions after planting',
  ],
  'shrub-installation': [
    'Foundation plantings and privacy hedges',
    'Proper spacing for mature plant size',
    'Soil preparation and planting at correct depth',
    'Iowa-hardy varieties with year-round interest',
  ],
  'commercial-landscaping': [
    'Scheduled maintenance for professional appearance',
    'Snow removal and ice management for properties',
    'Hardscape installation for entries and common areas',
    'Single-contact billing and scheduling for property managers',
  ],
  'residential-landscaping': [
    'Complete design-build services for homes',
    'Custom outdoor living spaces and gardens',
    'Weekly or biweekly maintenance plans',
    'Free estimates and transparent project pricing',
  ],
  'grading': [
    'Drainage correction to protect foundations',
    'Lawn leveling for bumpy or uneven yards',
    'Slope correction to prevent soil erosion',
    'Final grading for sod, seed, or hardscape prep',
  ],
  'outdoor-living': [
    'Paver patios and natural stone entertainment areas',
    'Custom fire pits and fire tables',
    'Outdoor kitchen design and installation',
    'Integrated lighting, plantings, and hardscape',
  ],
}

export const serviceFaqs: Record<string, ServiceFAQ[]> = {
  'landscape-installation': [
    {
      question: 'How much does a full landscape installation cost in Cedar Falls?',
      answer: 'Cost depends on property size, design complexity, plant selection, and any hardscape features. We provide free on-site estimates with a detailed written quote before any work begins.',
    },
    {
      question: 'How long does a landscape installation take?',
      answer: 'Typical residential landscape installations take 1 to 3 weeks depending on scope. We provide a clear timeline during the estimate process and keep you updated throughout.',
    },
    {
      question: 'Do you handle both design and installation?',
      answer: 'Yes. We handle design, plant selection, grading, planting, and hardscape. Bring your own plans if you have them.',
    },
    {
      question: 'What kind of plants work best in Cedar Falls?',
      answer: 'We select plants proven to thrive in Black Hawk County\'s clay soil and climate. Native perennials, Iowa-hardy shrubs, and cool-season grasses perform best and require less water and maintenance.',
    },
    {
      question: 'Do you remove existing landscaping before installing new?',
      answer: 'Yes. Demolition and removal of existing plants, hardscape, and debris is included in our landscape installation process. We start with a clean slate.',
    },
    {
      question: 'Can you work around existing trees and features?',
      answer: 'Yes. We design around mature trees, existing hardscape, and utility lines. Preservation of healthy trees is a priority in every landscape installation we do.',
    },
    {
      question: 'Do you offer maintenance after installation?',
      answer: 'Yes. We offer ongoing landscape maintenance plans to keep your new installation looking its best. Weekly or biweekly visits include pruning, weeding, and bed care.',
    },
    {
      question: 'What is included in the soil preparation?',
      answer: 'Soil preparation includes grading, amendment with compost or topsoil as needed, tillage to break up compaction, and final raking. Good soil prep is the foundation of every successful landscape installation.',
    },
    {
      question: 'Can you install irrigation with the landscape?',
      answer: 'Yes. We can integrate drip irrigation for beds and spray irrigation for lawns into your landscape installation. Irrigation is planned during the design phase for optimal coverage.',
    },
    {
      question: 'How do I prepare my property for landscape installation?',
      answer: 'We handle everything. You do not need to do anything except discuss your vision with us. We manage all site prep, material delivery, and cleanup.',
    },
    {
      question: 'What payment options are available?',
      answer: 'We accept major credit cards, checks, and cash. Payment is due upon completion of the work. We provide detailed invoices for all landscape installation projects.',
    },
  ],
  'lawn-care': [
    {
      question: 'How often do you mow lawns in Cedar Falls?',
      answer: 'We typically mow weekly during the growing season, adjusting frequency based on growth rate, rainfall, and seasonal conditions across the Cedar Valley.',
    },
    {
      question: 'Do you offer lawn fertilization programs?',
      answer: 'Yes. We offer customized fertilization programs with applications timed for Iowa growing conditions. Programs include pre-emergent weed control, balanced fertilization, and aeration.',
    },
    {
      question: 'Can you handle large properties?',
      answer: 'Yes. We handle residential and commercial properties of all sizes. Contact us for a quote based on your specific property.',
    },
    {
      question: 'What type of grass works best for Cedar Valley lawns?',
      answer: 'Kentucky bluegrass and tall fescue are the top choices for Cedar Valley lawns. Bluegrass provides a dense, dark green turf while fescue offers better drought tolerance.',
    },
    {
      question: 'How do you handle weed control in lawns?',
      answer: 'We use a combination of pre-emergent herbicides in spring to prevent crabgrass and broadleaf weeds, plus targeted post-emergent spot treatment for any that break through.',
    },
    {
      question: 'When should I aerate my lawn in Iowa?',
      answer: 'Early fall (September to October) is the best time for core aeration in Iowa. Spring aeration is also effective. We coordinate aeration with overseeding and fertilization.',
    },
    {
      question: 'Do you offer organic lawn care options?',
      answer: 'We offer organic-based fertilizer options for homeowners who prefer natural lawn care. Programs include compost tea applications and organic weed control methods.',
    },
    {
      question: 'What is the best mowing height for Iowa lawns?',
      answer: 'We recommend mowing at 3 to 4 inches throughout the growing season. Taller grass shades the soil, retains moisture, and develops deeper roots.',
    },
    {
      question: 'How do I know if my lawn needs lime?',
      answer: 'Iowa soil is often acidic. A soil test will tell you the pH. We can arrange soil testing and apply lime in fall or spring if needed to balance pH for optimal grass growth.',
    },
    {
      question: 'Can you repair dog spots in my lawn?',
      answer: 'Yes. We can overseed and top-dress urine spots in lawns. A regular fertilization and watering program helps the lawn recover faster.',
    },
    {
      question: 'Do you edge driveways and walkways?',
      answer: 'Yes. Every lawn care visit includes trimming and edging along driveways, walkways, patios, and landscape beds for a clean, finished appearance.',
    },
  ],
  'preservation-restoration': [
    {
      question: 'What does landscape restoration include?',
      answer: 'Restoration means fixing damaged or neglected yards. We check the soil, pull dead plants, replant, and set up care so things recover.',
    },
    {
      question: 'Can you fix erosion problems in my yard?',
      answer: 'Yes. We assess drainage patterns and install solutions like retaining walls, French drains, regrading, and erosion-control plantings to stop soil loss and protect your property.',
    },
    {
      question: 'How long does it take to restore a neglected landscape?',
      answer: 'Initial restoration work is typically done in 1 to 2 weeks. Full recovery as plants establish can take one growing season. We provide a care plan for each stage.',
    },
  ],
  'tree-service': [
    {
      question: 'Do you remove trees close to houses?',
      answer: 'Yes. Our crew is experienced with tight-access removals near structures. We use rigging techniques to safely lower branches and sections without damaging your property.',
    },
    {
      question: 'How much does tree removal cost in Cedar Falls?',
      answer: 'Cost depends on tree size, location, condition, and accessibility. We provide free estimates and can assess the job accurately once we see the tree on your property.',
    },
    {
      question: 'Do you offer stump grinding?',
      answer: 'Yes. We include stump grinding as part of our tree removal service or as a standalone job if you have existing stumps that need to be removed.',
    },
  ],
  'landscape-maintenance': [
    {
      question: 'What is included in landscape maintenance?',
      answer: 'Maintenance includes pruning, bed edging, weeding, mulch refreshing, fertilization, and seasonal cleanup. Plans are customized to your property and can include lawn mowing as well.',
    },
    {
      question: 'How often do you service properties?',
      answer: 'Most clients are on weekly or biweekly schedules during the growing season (April through October), with reduced frequency in winter for snow removal.',
    },
    {
      question: 'Do you offer commercial landscape maintenance?',
      answer: 'Yes. We provide maintenance services for commercial properties including HOA common areas, office parks, and retail centers across the Cedar Valley.',
    },
  ],
  'ponds-water-features': [
    {
      question: 'How much does water features installation cost in Cedar Falls?',
      answer:
        'Cost varies based on size, type (pondless waterfall, koi pond, or stream), pump system, and landscaping. We design to your budget and provide a detailed quote before installation begins.',
    },
    {
      question: 'Do you maintain water features?',
      answer:
        'Yes. We offer seasonal opening and closing, cleaning, and ongoing maintenance to keep your pond or waterfall running cleanly through the Iowa seasons.',
    },
    {
      question: 'Can you add a water feature to an existing landscape?',
      answer:
        'Yes. We can add ponds or waterfalls to yards that are already established. We work around existing plants and hardscape.',
    },
    {
      question: 'What types of water features do you install?',
      answer:
        'We install koi ponds, pondless waterfalls, bubbling boulders, streams, and multi-tiered stone waterfalls. Each water features installation is custom designed for your Cedar Falls property.',
    },
  ],
  'hydroseeding': [
    {
      question: 'How long does it take for hydroseed to germinate?',
      answer: 'Under proper conditions, you will see germination within 7 to 14 days. Full establishment takes 4 to 6 weeks with regular watering.',
    },
    {
      question: 'Is hydroseeding better than sod?',
      answer: 'Hydroseeding is more affordable than sod and works well for large areas. It also establishes deeper root systems because the seed germinates naturally in the soil.',
    },
    {
      question: 'When is the best time to hydroseed in Iowa?',
      answer: 'Spring (April to June) and late summer (August to September) are the best times for hydroseeding in Iowa. Moderate temps and steady rain help the seed take.',
    },
  ],
  'snow-removal': [
    {
      question: 'How do I sign up for snow removal services?',
      answer: 'Contact us to set up a seasonal contract. We offer residential and commercial accounts and prioritize established customers when storms are forecasted.',
    },
    {
      question: 'Do you use salt or de-icer?',
      answer: 'Yes. We apply salt and de-icing treatments to walkways, steps, and driveways to prevent ice buildup. Pre-treatment is available before predicted storms.',
    },
    {
      question: 'What happens if it snows overnight?',
      answer: 'We begin plowing and clearing as soon as accumulation reaches 2 inches. Driveways and walkways are cleared by early morning for residential accounts.',
    },
  ],
  'retaining-walls': [
    {
      question: 'How much does retaining wall installation cost in Cedar Falls?',
      answer:
        'Cost depends on wall height, length, materials, and site access. We provide free on-site estimates so you get an accurate price for your Cedar Falls property before work begins.',
    },
    {
      question: 'Do I need a permit for a retaining wall in Cedar Falls?',
      answer:
        'Taller walls and walls near property lines may require permits. We help you understand local requirements and build to code so your retaining wall installation is done right the first time.',
    },
    {
      question: 'What materials do you use for retaining walls?',
      answer:
        'We install segmental concrete block and natural stone retaining walls, selected for durability, drainage performance, and appearance on Cedar Valley properties.',
    },
    {
      question: 'How long does retaining wall installation take?',
      answer:
        'Most residential retaining wall projects in Cedar Falls take several days to two weeks depending on wall length, height, and site conditions. We provide a clear timeline during your free estimate.',
    },
    {
      question: 'How do retaining walls handle Iowa freeze-thaw?',
      answer:
        'Segmental block walls flex through freeze-thaw without cracking because each block moves independently. Gravel backfill and drain pipe relieve hydrostatic pressure that causes failure.',
    },
    {
      question: 'What is the maximum height for a retaining wall?',
      answer:
        'Residential retaining walls typically range from 2 to 6 feet. Walls over 4 feet require engineered plans and permits. We design walls to the appropriate height and reinforcement for your needs.',
    },
    {
      question: 'Do retaining walls add property value?',
      answer:
        'Yes. A well-built retaining wall adds usable yard space, prevents erosion, and improves curb appeal. Real estate agents in the Cedar Valley consider retaining walls a valuable feature.',
    },
    {
      question: 'Can a retaining wall fix my drainage problem?',
      answer:
        'Yes. Retaining walls with integrated drainage systems redirect water away from foundations and low spots. The gravel backfill and perforated pipe work together to manage water flow.',
    },
    {
      question: 'What is geogrid and do I need it?',
      answer:
        'Geogrid is a reinforcement layer that stabilizes the soil behind walls over 4 feet tall. It distributes the weight of the retained soil and prevents wall movement over time.',
    },
    {
      question: 'Can you match my retaining wall to my house?',
      answer:
        'Yes. Segmental block comes in multiple colors and textures including limestone, sandstone, and granite finishes. We can recommend options that complement your home exterior.',
    },
    {
      question: 'How close to the property line can I build a wall?',
      answer:
        'Setback requirements vary by city. In Cedar Falls, walls typically need to be set back from property lines. We handle all permitting and code compliance for your retaining wall project.',
    },
    {
      question: 'Do you offer warranties on retaining walls?',
      answer:
        'Yes. We stand behind our workmanship. Proper base preparation, drainage, and materials selection ensure your retaining wall performs for decades with minimal maintenance.',
    },
  ],
  'paver-patio': [
    {
      question: 'How long does paver patio installation take in Cedar Falls?',
      answer: 'Most residential paver patio projects take several days to two weeks depending on size, pattern complexity, and add-ons like seat walls or fire pits. We give you a clear timeline during your free estimate.',
    },
    {
      question: 'Will a paver patio hold up to Iowa winters?',
      answer: 'Yes, when built with a properly compacted base, edge restraint, and quality pavers. Our paver patio installation process is designed specifically for Iowa freeze-thaw cycles.',
    },
    {
      question: 'Can you match pavers to my existing hardscape?',
      answer: 'We work with major paver brands and can suggest colors and textures that go with your home, driveway, or existing hardscape.',
    },
    {
      question: 'What is the best paver pattern for my patio?',
      answer: 'Running bond is simple and clean for small spaces. Herringbone is stronger and ideal for high-traffic areas. Basket weave offers a classic look. We help you choose based on your space and style.',
    },
    {
      question: 'How deep does the base need to be for a paver patio?',
      answer: 'We excavate 8 to 10 inches for standard paver patios. The base consists of compacted crushed aggregate in lifts, then a sand screed layer for final leveling.',
    },
    {
      question: 'Can I add a fire pit or outdoor kitchen later?',
      answer: 'It is best to plan those additions during the initial design so the base and layout accommodate them. Retrofitting is possible but more expensive.',
    },
    {
      question: 'Do paver patios need to be sealed?',
      answer: 'Sealing is optional. It enhances color and provides some stain protection, but a well-installed paver patio performs fine without sealer. We can seal during installation or later.',
    },
    {
      question: 'How do you prevent weeds between pavers?',
      answer: 'Polymeric joint sand is swept into the joints and activated with water. It hardens to create a weed-resistant barrier while still allowing drainage and movement.',
    },
    {
      question: 'What is the difference between pavers and poured concrete?',
      answer: 'Pavers are individual units that flex through freeze-thaw without cracking. Concrete is monolithic and will crack over time in Iowa climate. Pavers are also easier to repair.',
    },
    {
      question: 'Can you install heated paver patios?',
      answer: 'Yes. Electric radiant heating systems can be installed beneath pavers to melt snow and ice. This is a premium add-on that extends patio usability through winter.',
    },
    {
      question: 'Do you offer curved or circular paver patios?',
      answer: 'Yes. Curved patios require more cutting and labor but create beautiful, organic shapes. We can design circular, oval, or freeform patios in any paver style.',
    },
  ],
  'landscape-design': [
    {
      question: 'What does the landscape design process include?',
      answer: 'We start with a site consultation to understand your needs, sun exposure, drainage, and existing features. Then we create a scaled plan with plant selection, hardscape placement, and phased implementation options.',
    },
    {
      question: 'How much does landscape design cost in Cedar Falls?',
      answer: 'Design fees vary by project scope and property size. We provide a design fee quote during our initial consultation and typically credit a portion of the design fee toward installation if you choose us to build it.',
    },
    {
      question: 'Can I get just a design and install it myself?',
      answer: 'Yes. We provide design-only services if you prefer to install the work yourself. You receive a detailed plan with plant list, hardscape specifications, and installation guidelines.',
    },
    {
      question: 'How long does the design process take?',
      answer: 'Most residential landscape designs take 1 to 2 weeks from initial consultation to final plan, depending on complexity and property size.',
    },
  ],
  'drainage': [
    {
      question: 'How do I know if I need drainage work?',
      answer: 'Common signs include standing water after rain, soggy areas that never dry out, water in the basement, soil erosion, and grass dying in low spots. We offer free on-site assessments to diagnose drainage problems.',
    },
    {
      question: 'How much does a French drain cost in Cedar Falls?',
      answer: 'French drain costs depend on length, depth, soil conditions, and whether downspout connections are included. We provide free estimates after evaluating your property.',
    },
    {
      question: 'Will drainage work fix my wet basement?',
      answer: 'Surface drainage solutions like grading, French drains, and downspout extensions can significantly reduce basement moisture by redirecting water away from your foundation. For severe issues, we recommend consulting a foundation specialist as well.',
    },
    {
      question: 'How long does drainage installation take?',
      answer: 'Most residential drainage projects are completed in 1 to 3 days. French drain installation typically takes one day, while full yard regrading may take 2 to 3 days.',
    },
    {
      question: 'What is the difference between a French drain and a catch basin?',
      answer: 'A French drain collects subsurface water through a perforated pipe in a gravel trench. A catch basin collects surface water at a low point through a grate. They are often used together.',
    },
    {
      question: 'Will a French drain work in Iowa clay soil?',
      answer: 'Yes. French drains are very effective in clay soil because the gravel trench creates a preferential path for water that clay cannot provide. Filter fabric prevents clay from clogging the pipe.',
    },
    {
      question: 'How deep should a French drain be?',
      answer: 'Most residential French drains are 18 to 36 inches deep. The depth depends on the water source, frost line, and drainage outlet location. We size every drain for your specific conditions.',
    },
    {
      question: 'Do downspout extensions really help?',
      answer: 'Yes. Extending downspouts 5 to 10 feet from the foundation is one of the most cost-effective drainage fixes. It prevents roof water from saturating the soil next to your basement walls.',
    },
    {
      question: 'Can regrading fix my drainage without underground pipes?',
      answer: 'Often, yes. Reshaping the yard surface to create proper slope away from the house solves many drainage problems without trenching or French drains.',
    },
    {
      question: 'How do I maintain my French drain system?',
      answer: 'Keep the outlet clear of debris and vegetation. Check for blockages annually. Flush the pipe every 3-5 years to remove sediment. Ensure the inlet grates are clean.',
    },
    {
      question: 'Will drainage work damage my existing landscaping?',
      answer: 'We minimize disturbance by planning trench routes carefully. After installation, we restore all disturbed areas with sod, seed, or mulch so your yard looks better than before.',
    },
  ],
  'excavation': [
    {
      question: 'What size equipment do you use for residential excavation?',
      answer: 'We use skid steers and mini excavators that fit through standard residential gates and work in tight spaces. For larger commercial projects, we can bring in full-size equipment.',
    },
    {
      question: 'Do you handle utility locating before excavation?',
      answer: 'Yes. We coordinate with Iowa One Call (811) to locate buried utilities before any excavation work begins, ensuring safety and compliance.',
    },
    {
      question: 'How much does excavation cost in Cedar Falls?',
      answer: 'Excavation costs vary by scope, access, and material type. We provide free on-site estimates after evaluating your project requirements.',
    },
  ],
  'sod-installation': [
    {
      question: 'How much does sod installation cost in Cedar Falls?',
      answer: 'Sod costs vary by turf type, square footage, and soil preparation needed. We provide free estimates with a detailed breakdown of materials and labor.',
    },
    {
      question: 'How long does it take for sod to root?',
      answer: 'Sod typically roots within 2 to 3 weeks with proper watering. We provide a detailed care schedule for the critical establishment period.',
    },
    {
      question: 'When is the best time to lay sod in Iowa?',
      answer: 'Spring (April to June) and early fall (September to October) are the best times for sod installation in Iowa. Cool-season grasses establish best during these moderate-temperature periods.',
    },
    {
      question: 'Can I lay sod on an existing lawn?',
      answer: 'No, existing grass and vegetation should be removed and the soil prepared before laying new sod for proper root establishment and drainage.',
    },
  ],
  'mulching': [
    {
      question: 'How much mulch do I need for my beds?',
      answer: 'A 2-3 inch layer is ideal for most landscape beds. We calculate cubic yardage based on your bed square footage and can provide exact quantities during our estimate.',
    },
    {
      question: 'How often should mulch be replaced?',
      answer: 'Annual mulching is recommended to maintain appearance and weed suppression. Shredded hardwood mulch typically lasts one season before it starts breaking down and fading.',
    },
    {
      question: 'What type of mulch is best for Iowa landscapes?',
      answer: 'Shredded hardwood mulch is the most popular choice for Iowa landscapes because it stays in place better than bark nuggets, decomposes slowly, and enriches the soil as it breaks down.',
    },
  ],
  'rock-landscaping': [
    {
      question: 'Is rock landscaping more expensive than mulch?',
      answer: 'Rock landscaping has a higher upfront cost than mulching, but it is a one-time installation that requires no annual replacement, making it more cost-effective over time.',
    },
    {
      question: 'Do you install weed barrier under rock?',
      answer: 'Yes. We always install landscape fabric under rock landscaping to prevent weeds from growing through while allowing water to drain into the soil.',
    },
    {
      question: 'What types of rock do you offer?',
      answer: 'We offer river rock, pea gravel, crushed granite, flagstone, and decorative boulders. Rock selection depends on your landscape style and the specific application.',
    },
  ],
  'tree-planting': [
    {
      question: 'What trees grow best in Cedar Falls?',
      answer: 'Native Iowa trees like oaks, maples, hackberry, and serviceberry perform well in Black Hawk County soil. We also recommend disease-resistant elm and linden varieties for longevity.',
    },
    {
      question: 'How far from my house should I plant a tree?',
      answer: 'Small ornamental trees (15-25 ft mature height) can be planted 10-15 ft from structures. Large shade trees need 20-30 ft of clearance from foundations, driveways, and utility lines.',
    },
    {
      question: 'Do you guarantee your tree planting?',
      answer: 'We stand behind our planting work and provide care instructions to help your new trees establish. Specific guarantees depend on species and planting season.',
    },
  ],
  'shrub-installation': [
    {
      question: 'What shrubs are best for foundation plantings?',
      answer: 'Dwarf varieties of boxwood, yew, hydrangea, and ninebark are excellent choices for Iowa foundation plantings. We select shrubs that stay compact and provide year-round interest.',
    },
    {
      question: 'How far apart should shrubs be planted?',
      answer: 'Spacing depends on the mature width of the shrub variety. We space plants to allow for mature growth without overcrowding, typically at half the mature width for hedge plantings.',
    },
    {
      question: 'When is the best time to plant shrubs in Iowa?',
      answer: 'Spring (April to May) and early fall (September to October) provide the best conditions for shrub establishment in Iowa, with moderate temperatures and adequate rainfall.',
    },
  ],
  'commercial-landscaping': [
    {
      question: 'Do you offer commercial snow removal contracts?',
      answer: 'Yes. We provide seasonal commercial snow removal contracts with priority service, pre-treatment, and early morning clearing for parking lots, walkways, and entry areas.',
    },
    {
      question: 'How do you handle commercial billing?',
      answer: 'We provide monthly invoices for recurring maintenance and individual project invoices for one-time work. We can also set up seasonal contracts for snow removal and spring cleanup.',
    },
    {
      question: 'What size commercial properties do you serve?',
      answer: 'We serve properties of all sizes, from small retail centers and office parks to large HOA communities and industrial facilities across the Cedar Valley.',
    },
  ],
  'residential-landscaping': [
    {
      question: 'What is included in a full residential landscape installation?',
      answer: 'Full residential landscape installation includes design, grading, planting, hardscape, and mulching. We customize each project to your property and budget.',
    },
    {
      question: 'Do you offer maintenance plans for residential properties?',
      answer: 'Yes. We offer weekly and biweekly maintenance plans that include mowing, edging, pruning, weeding, and seasonal cleanup. Plans are customized to your property size and needs.',
    },
    {
      question: 'How do I get started with residential landscaping?',
      answer: 'Contact us for a free on-site estimate. We will walk your property, discuss your goals, and provide a written quote with timeline and pricing.',
    },
  ],
  'grading': [
    {
      question: 'How do I know if my yard needs grading?',
      answer: 'Signs your yard needs grading include water pooling after rain, water seeping into the basement, erosion gullies in the yard, and uneven or bumpy lawn surfaces.',
    },
    {
      question: 'How much does yard grading cost in Cedar Falls?',
      answer: 'Grading costs depend on property size, amount of fill or cut needed, and access for equipment. We provide free on-site estimates.',
    },
    {
      question: 'Can grading fix a bumpy lawn?',
      answer: 'Yes. Lawn leveling and grading smooth out bumpy surfaces by filling low spots and cutting down high areas, creating a level surface for mowing and use.',
    },
  ],
  'outdoor-living': [
    {
      question: 'How much does an outdoor kitchen cost in Cedar Falls?',
      answer: 'Outdoor kitchen costs vary widely based on size, appliances, countertop materials, and whether a roof or pergola is included. We design to your budget and provide detailed quotes.',
    },
    {
      question: 'Do you build fire pits?',
      answer: 'Yes. We build custom fire pits in natural stone, paver block, or steel ring styles. Gas fire pits with remote control operation are also available.',
    },
    {
      question: 'Can you add a patio to an existing yard?',
      answer: 'Yes. We can install patios in established yards, working around existing trees, plantings, and hardscape. Access for equipment will determine the approach.',
    },
    {
      question: 'How long does it take to build an outdoor living space?',
      answer: 'Timeline depends on scope. A simple fire pit patio might take 1-2 weeks. A full outdoor kitchen with patio, pergola, and lighting can take 3-6 weeks depending on complexity.',
    },
    {
      question: 'What is the best material for an outdoor kitchen countertop?',
      answer: 'Granite and quartzite are the most durable choices for Iowa outdoor kitchens. They handle freeze-thaw without cracking and resist staining from grease and wine.',
    },
    {
      question: 'Do outdoor kitchens need to be covered?',
      answer: 'A pergola or roof structure extends the usability of your outdoor kitchen by providing shade and weather protection. It also protects appliances from direct sun and debris.',
    },
    {
      question: 'Can I use my outdoor kitchen in the spring and fall?',
      answer: 'Yes. Fire pits, patio heaters, and overhead infrared heaters extend your outdoor living season from early spring through late fall in the Cedar Valley.',
    },
    {
      question: 'What appliances work best in outdoor kitchens?',
      answer: 'Stainless steel appliances designed for outdoor use hold up best. Built-in grills, side burners, refrigerator drawers, and pizza ovens are the most popular choices.',
    },
    {
      question: 'How do you install a gas line for a fire pit or grill?',
      answer: 'A licensed professional runs a natural gas or propane line from your existing supply to the appliance location. All connections are tested for leaks before backfilling.',
    },
    {
      question: 'Can I add lighting to my outdoor living space?',
      answer: 'Yes. Low-voltage LED lighting is a standard addition to every outdoor living project. Path lights, uplighting, string lights, and step lights create ambiance and improve safety.',
    },
    {
      question: 'Do you build pergolas and covered structures?',
      answer: 'Yes. We build custom pergolas, pavilions, and covered patios that match your home architecture. Treated wood, cedar, and aluminum are available options.',
    },
  ],
}

export type Material = {
  name: string
  pros: string[]
  cons: string[]
  maintenance: string
  durability: string
}

export const serviceMaterials: Record<string, Material[]> = {
  'retaining-walls': [
    {
      name: 'Segmental Concrete Block',
      pros: [
        'Engineered for soil retention with interlocking design',
        'Flexible through freeze-thaw without cracking',
        'Range of colors, textures, and sizes available',
        'Faster installation than poured concrete or natural stone',
      ],
      cons: [
        'Visible seams between blocks on finished face',
        'Limited height without geogrid reinforcement',
        'Can shift if base preparation is inadequate',
      ],
      maintenance: 'Annual inspection for shifted blocks or bulging. Re-level individual blocks as needed. Keep drainage outlets clear of debris.',
      durability: '50+ years with proper base and drainage. Individual blocks can be replaced if damaged.',
    },
    {
      name: 'Natural Stone',
      pros: [
        'Unique, timeless appearance no two walls look alike',
        'Blends naturally with Iowa landscape',
        'Extremely durable and weather-resistant',
        'Adds significant property value',
      ],
      cons: [
        'Higher material and labor cost',
        'Installation takes longer due to custom fitting',
        'Heavier, requires more foundation support',
        'Limited color and size consistency',
      ],
      maintenance: 'Minimal. Inspect annually for loose stones. Re-point mortar joints if used. Keep vegetation from growing between stones.',
      durability: '100+ years. Natural stone is the most durable retaining wall material available.',
    },
    {
      name: 'Poured Concrete',
      pros: [
        'Monolithic strength for tall walls over 8 feet',
        'Reinforced with steel rebar for maximum stability',
        'Can be stamped or stained for decorative finish',
        'Ideal for commercial and heavy-load applications',
      ],
      cons: [
        'Prone to cracking during Iowa freeze-thaw cycles',
        'Forms, pouring, and curing extend installation timeline',
        'Cracks are difficult to repair invisibly',
        'Plain finish looks utilitarian without added treatments',
      ],
      maintenance: 'Monitor for cracks each spring. Seal control joints. Repair cracks promptly to prevent water infiltration and freeze damage.',
      durability: '30-50 years depending on reinforcement, drainage, and climate exposure. Cracking is the primary long-term concern.',
    },
  ],
  'paver-patio': [
    {
      name: 'Concrete Pavers',
      pros: [
        'Wide range of colors, shapes, and patterns available',
        'Individual pavers can be replaced if damaged',
        'Flexible installation handles freeze-thaw well',
        'Lower cost than natural stone',
      ],
      cons: [
        'Joint sand needs occasional reapplication',
        'Weed growth possible between joints over time',
        'Color can fade in direct sun over many years',
        'Requires proper base to prevent settling',
      ],
      maintenance: 'Reapply polymeric joint sand every 2-3 years. Power wash and seal every 3-5 years if desired. Reset any settled pavers promptly.',
      durability: '25-50 years with proper base installation. Individual paver replacement extends overall life indefinitely.',
    },
    {
      name: 'Natural Stone (Flagstone/Bluestone)',
      pros: [
        'Unique, high-end appearance',
        'No two patios look the same',
        'Very durable and long-lasting',
        'Premium option for luxury landscapes',
      ],
      cons: [
        'Higher cost than concrete pavers',
        'More labor-intensive installation',
        'Thickness variation makes level surface harder to achieve',
        'Limited pattern options due to irregular shapes',
      ],
      maintenance: 'Sweep joints and refill with sand or stone dust as needed. Seal every 3-5 years. Reset individual stones if they settle unevenly.',
      durability: '50+ years. Natural stone is extremely durable and develops an attractive patina with age.',
    },
  ],
  'ponds-water-features': [
    {
      name: 'EPDM Rubber Liner',
      pros: [
        'Flexible and durable in freeze-thaw conditions',
        'Creates natural-looking pond shapes',
        'Repairable if punctured',
        'Long lifespan with proper underlayment',
      ],
      cons: [
        'Visible edges need rockwork to conceal',
        'Heavy when wet, requires care during installation',
        'Can be punctured by sharp rocks without proper underlayment',
        'UV exposure can degrade over time without coverage',
      ],
      maintenance: 'Inspect liner annually for punctures at spring startup. Clean debris from waterfall and skimmer. Check pump and filter monthly during operating season.',
      durability: '20-30 years with proper installation and UV protection from rockwork.',
    },
    {
      name: 'Pre-formed Fiberglass Basin',
      pros: [
        'Rigid, pre-shaped for consistent installation',
        'Drop-in installation is simpler than liner systems',
        'Smooth surface resists algae buildup',
        'Good for smaller, self-contained water features',
      ],
      cons: [
        'Limited to pre-formed shapes and sizes',
        'Can crack in severe freeze-thaw without proper winterization',
        'Less natural appearance than lined ponds',
        'More expensive than liner for custom shapes',
      ],
      maintenance: 'Clean basin surface annually. Check pump and filtration. Drain and winterize before first hard freeze to prevent cracking.',
      durability: '15-25 years. Fiberglass can become brittle with UV exposure and freeze-thaw cycling.',
    },
  ],
  'landscape-installation': [
    {
      name: 'Hardwood Mulch',
      pros: [
        'Rich color and natural appearance',
        'Adds organic matter to soil as it decomposes',
        'Holds moisture and suppresses weeds effectively',
        'Affordable and widely available in the Cedar Valley',
      ],
      cons: [
        'Needs annual refresh as it breaks down',
        'Color fades over the growing season',
        'Can float or wash away in heavy rain',
        'May attract termites if piled against foundation',
      ],
      maintenance: 'Refresh annually in spring. Maintain 2-3 inch depth. Keep pulled back from plant stems and tree trunks. Fluff with rake to restore appearance.',
      durability: 'One growing season. Annual replacement is standard for best appearance and weed suppression.',
    },
    {
      name: 'River Rock / Decorative Stone',
      pros: [
        'Low-maintenance permanent ground cover',
        'No annual replacement needed',
        'Drains well and prevents soil erosion',
        'Handles Iowa weather without degrading',
      ],
      cons: [
        'Higher upfront material cost',
        'Difficult to remove once installed',
        'Can migrate into lawn areas over time',
        'Does not add organic matter to soil',
      ],
      maintenance: 'Rake or blow debris off surface annually. Top up thin areas every 3-5 years. Remove any weeds that establish in joints.',
      durability: 'Permanent. Rock does not decompose and retains its appearance indefinitely.',
    },
  ],
  'drainage': [
    {
      name: 'Perforated PVC Pipe (French Drain)',
      pros: [
        'Proven effective for subsurface water collection',
        'Durable and resists crushing in trenches',
        'Smooth interior allows good water flow',
        'Works well with gravel backfill system',
      ],
      cons: [
        'Requires proper slope for gravity flow',
        'Can clog over time without filter fabric wrapping',
        'Installation requires trenching and restoration',
        'Not effective for surface water alone',
      ],
      maintenance: 'Inspect outlet regularly for blockages. Every 3-5 years, flush the pipe to remove sediment buildup. Ensure outlet is clear of debris and vegetation.',
      durability: '50+ years when installed with proper filter fabric and gravel. PVC does not corrode or degrade underground.',
    },
    {
      name: 'Catch Basins & Channel Drains',
      pros: [
        'Collect surface water at low points effectively',
        'Removable grate allows easy cleaning',
        'Can connect to underground pipe network',
        'Prevents standing water in high-traffic areas',
      ],
      cons: [
        'Grates can collect leaves and debris',
        'Requires regular cleaning to stay effective',
        'Basin can settle if base preparation is inadequate',
        'More visible than French drain installations',
      ],
      maintenance: 'Clean grates and remove debris monthly during growing season. Flush basin and outlet pipe annually. Replace damaged grates promptly.',
      durability: '20-30 years. Cast iron or polymer grates may need replacement if damaged by vehicles or heavy equipment.',
    },
  ],
  'outdoor-living': [
    {
      name: 'Concrete Pavers',
      pros: [
        'Durable surface for high-traffic entertaining areas',
        'Wide range of styles to match any design',
        'Individual pavers replaceable if damaged',
        'Good slip resistance for pool and fire pit areas',
      ],
      cons: [
        'Joint sand can wash out over time',
        'Weed growth possible in joints without proper sealing',
        'Requires solid base to prevent settling under heavy use',
        'Can get hot in direct summer sun',
      ],
      maintenance: 'Re-seal patio surface every 3-5 years. Reapply joint sand as needed. Clean grill grease and food stains promptly. Inspect base annually for settling.',
      durability: '25-50 years with proper base. Outdoor kitchens and fire features may need component replacement sooner.',
    },
    {
      name: 'Natural Stone',
      pros: [
        'Premium look that complements outdoor kitchens and fire pits',
        'Naturally slip-resistant surface',
        'Stays cool underfoot compared to pavers in summer',
        'Extremely durable and long-lasting',
      ],
      cons: [
        'Higher material and installation cost',
        'Limited color consistency between batches',
        'Heavy, requires reinforced base for some applications',
        'Sealing recommended for stain resistance near cooking areas',
      ],
      maintenance: 'Seal annually for stain protection near cooking and dining areas. Clean with stone-safe cleaner. Re-level individual stones if settling occurs.',
      durability: '50+ years. Natural stone patios and outdoor kitchens offer the longest service life of any outdoor living material.',
    },
  ],
  'landscape-design': [
    {
      name: 'Concept Plan',
      pros: [
        'Quick turnaround to visualize the big picture',
        'Affordable starting point for design',
        'Easy to revise before committing to detailed plans',
        'Helps with budget planning and material estimates',
      ],
      cons: [
        'Not detailed enough for construction',
        'Plant selections are general, not specific varieties',
        'May not account for precise grading and drainage',
        'Requires a detailed plan for actual installation',
      ],
      maintenance: 'Use as a reference during installation. Update the concept as decisions evolve during the project. Keep for future renovation planning.',
      durability: 'The concept plan is a design tool, not a built structure. Keep the digital file for future reference and modifications.',
    },
    {
      name: 'Detailed Construction Plan',
      pros: [
        'Scaled, measured layout for accurate installation',
        'Specific plant varieties, sizes, and spacing',
        'Hardscape dimensions, materials, and installation details',
        'Grading and drainage plan included',
      ],
      cons: [
        'Takes more time to prepare than a concept plan',
        'Higher design fee for detailed work',
        'Less flexible to change during installation',
        'Requires contractor to follow specifications closely',
      ],
      maintenance: 'Keep the plan on file for future phases. Use it for permit applications. Reference it when adding plantings or structures later.',
      durability: 'The detailed plan serves as the permanent record of your landscape. Keep both digital and printed copies.',
    },
  ],
  'lawn-care': [
    {
      name: 'Cool-Season Grass Mix (Kentucky Bluegrass, Fescue)',
      pros: [
        'Thrives in Iowa spring and fall temperatures',
        'Dense, dark green turf ideal for lawns',
        'Good traffic tolerance when established',
        'Self-repairs through underground rhizomes',
      ],
      cons: [
        'Goes dormant and browns in summer drought without irrigation',
        'Requires regular mowing during growing season',
        'Susceptible to grubs and lawn diseases',
        'Needs fertilization program for best appearance',
      ],
      maintenance: 'Mow at 3-4 inches throughout growing season. Water deeply once per week in dry periods. Aerate annually in fall. Fertilize spring and fall. Apply pre-emergent weed control in spring.',
      durability: 'With proper care, cool-season lawns remain healthy indefinitely. Periodic overseeding every 2-3 years maintains density.',
    },
    {
      name: 'Fertilizer Program (Granular)',
      pros: [
        'Slow-release formula feeds grass steadily over weeks',
        'Balanced N-P-K ratios for Iowa soil conditions',
        'Easy to apply with broadcast spreader',
        'Cost-effective compared to liquid fertilization',
      ],
      cons: [
        'Requires watering or rainfall to activate',
        'Can burn grass if applied too heavily',
        'Granules can scatter onto hardscape if not careful',
        'Less immediate greening than liquid applications',
      ],
      maintenance: 'Apply on schedule: early spring, late spring, summer, and fall. Water in within 24 hours. Store unused product in a dry, temperature-controlled location.',
      durability: 'Seasonal. A typical lawn fertilization program runs April through October with 4-6 applications per year.',
    },
  ],
  'tree-service': [
    {
      name: 'Crane-Assisted Tree Removal',
      pros: [
        'Safest method for large or hazardous trees near structures',
        'Minimizes damage to surrounding landscape',
        'Can remove trees piece by piece in tight spaces',
        'Faster than manual rigging for large trees',
      ],
      cons: [
        'Higher cost due to crane equipment',
        'Requires adequate access for crane setup',
        'Not available for all property layouts',
        'May require permits for street-side work',
      ],
      maintenance: 'Post-removal, grind stump and backfill hole. Monitor surrounding trees for changes in wind exposure. Landscape the area to prevent erosion.',
      durability: 'Removal is permanent. Stump grinding eliminates regrowth. The site is ready for replanting or landscaping.',
    },
    {
      name: 'Sectional Dismantling (Manual Rigging)',
      pros: [
        'No crane needed, works in tight-access areas',
        'Less expensive than crane removal for smaller trees',
        'Careful control over each piece as it is lowered',
        'Experienced climbers can handle complex situations',
      ],
      cons: [
        'Slower than crane-assisted removal',
        'Higher physical demand on the crew',
        'Limited by tree condition and climber skill',
        'More pieces mean more cleanup time',
      ],
      maintenance: 'Same as crane removal. Stump grinding, backfill, and site restoration complete the job. Replant if desired.',
      durability: 'Permanent removal. The tree is gone and the stump is ground below grade.',
    },
  ],
  'landscape-maintenance': [
    {
      name: 'Shredded Hardwood Mulch',
      pros: [
        'Natural dark color complements all landscape styles',
        'Breaks down slowly, adding organic matter to soil',
        'Stays in place better than bark nuggets',
        'Good weed suppression and moisture retention',
      ],
      cons: [
        'Color fades to gray over the growing season',
        'Needs annual refresh for best appearance',
        'Can harbor slugs and snails in wet conditions',
        'Acidic as it decomposes, may affect pH over time',
      ],
      maintenance: 'Refresh to 2-3 inch depth annually. Fluff with rake in spring to restore appearance. Keep 2-3 inches from plant stems. Remove decomposed layers every 2-3 years.',
      durability: 'One growing season. Annual mulching is standard for best appearance and performance.',
    },
    {
      name: 'Pre-Emergent Herbicide (Granular)',
      pros: [
        'Prevents crabgrass and annual weed seeds from germinating',
        'Applied once in spring covers the whole season',
        'Safe for established lawns when applied correctly',
        'Reduces need for spot-spraying weeds later',
      ],
      cons: [
        'Must be applied before soil temperatures reach 55°F',
        'Will also prevent grass seed from germinating',
        'Requires even application for consistent coverage',
        'Effectiveness varies with rainfall and soil type',
      ],
      maintenance: 'Apply in early spring before weed seeds germinate. Water in within 7 days. Do not overseed treated areas for 8-12 weeks. Reapply in late spring for extended control.',
      durability: 'Single application provides 8-12 weeks of weed prevention. A second application extends coverage through the growing season.',
    },
  ],
  'excavation': [
    {
      name: 'Skid Steer Loader',
      pros: [
        'Compact size fits through standard gates',
        'Versatile with multiple attachment options',
        'Good maneuverability in tight residential spaces',
        'Efficient for medium-scale grading and digging',
      ],
      cons: [
        'Limited reach compared to full-size equipment',
        'Lower lifting capacity than larger machines',
        'Operator skill significantly affects results',
        'Not ideal for very large commercial projects',
      ],
      maintenance: 'Standard equipment maintenance by our crew. The skid steer is serviced regularly for hydraulic fluid, tracks/tires, and engine. No homeowner maintenance needed.',
      durability: 'Well-maintained skid steers last 5,000-8,000 hours. We rotate equipment to ensure reliable operation on every job.',
    },
    {
      name: 'Mini Excavator',
      pros: [
        'Excellent for trenching in tight spaces',
        'Zero-tail-swing models work close to structures',
        'Interchangeable buckets for different trench widths',
        'Good reach and digging depth for its size',
      ],
      cons: [
        'Slower than full-size excavator for large jobs',
        'Stability decreases on uneven terrain',
        'Limited to smaller bucket sizes',
        'Track width may damage established lawns',
      ],
      maintenance: 'Same as skid steer. Our equipment is maintained to manufacturer specifications. Tracks replaced as needed. Hydraulic systems inspected before each project.',
      durability: '5,000-7,000 hours typical service life. Regular maintenance and proper operation extend equipment life significantly.',
    },
  ],
  'sod-installation': [
    {
      name: 'Kentucky Bluegrass Sod',
      pros: [
        'Dense, dark green turf with excellent appearance',
        'Self-repairs through rhizome root system',
        'Good traffic tolerance once established',
        'Preferred variety for residential lawns in Iowa',
      ],
      cons: [
        'Goes dormant in extended summer drought without water',
        'Higher water needs than tall fescue varieties',
        'Susceptible to lawn diseases in hot, humid weather',
        'More expensive than tall fescue sod',
      ],
      maintenance: 'Water deeply 2-3 times per week for first 3 weeks. Mow at 3-4 inches after roots establish. Fertilize 6 weeks after installation. Follow standard lawn care program thereafter.',
      durability: 'With proper care, bluegrass sod provides a thick, durable lawn for 20+ years. Periodic overseeding maintains density.',
    },
    {
      name: 'Tall Fescue Sod',
      pros: [
        'More drought-tolerant than Kentucky bluegrass',
        'Deep root system handles Iowa summers better',
        'Stays green longer during dry periods',
        'Good choice for sunny, high-traffic areas',
      ],
      cons: [
        'Coarser texture than bluegrass',
        'Does not self-repair as well as rhizome grasses',
        'Can form clumps if not mowed regularly',
        'Less uniform appearance than bluegrass',
      ],
      maintenance: 'Same watering schedule as bluegrass during establishment. Mow at 3-4 inches. Overseed bare spots annually in fall. Fertilize on standard schedule.',
      durability: '10-15 years with proper care. Tall fescue is tough but requires regular overseeding to maintain density.',
    },
  ],
  'mulching': [
    {
      name: 'Shredded Hardwood Mulch',
      pros: [
        'Best overall choice for Iowa landscape beds',
        'Natural dark brown color complements all plants',
        'Stays in place better than bark nuggets',
        'Adds organic matter as it decomposes',
      ],
      cons: [
        'Color fades to gray over the season',
        'Annual replacement recommended',
        'Can float in heavy rain on slopes',
        'May stain concrete and siding if wet',
      ],
      maintenance: 'Rake and fluff in spring to refresh appearance. Top up to maintain 2-3 inch depth. Keep pulled back from plant stems and tree trunks. Replace entirely every 2-3 years.',
      durability: '12-18 months. Annual refresh is standard for best appearance and weed suppression.',
    },
    {
      name: 'Dyed Mulch (Black/Brown/Red)',
      pros: [
        'Rich, consistent color that lasts longer than undyed',
        'Holds color 12-18 months before significant fading',
        'Carbon-based dye is safe for plants and soil',
        'Popular for high-visibility front beds',
      ],
      cons: [
        'Color fades faster in full sun exposure',
        'More expensive than undyed hardwood mulch',
        'Some homeowners prefer natural, undyed look',
        'Dye does not improve performance, only appearance',
      ],
      maintenance: 'Same as shredded hardwood. Rake in spring to expose fresh color underneath. Top up annually. Replace every 2-3 years.',
      durability: '12-18 months. Color retention is the main advantage, but performance is similar to natural hardwood mulch.',
    },
    {
      name: 'Cedar Mulch',
      pros: [
        'Lasts 2-3 years, longer than hardwood',
        'Natural oils resist insects and decay',
        'Pleasant natural scent',
        'Light color that does not fade as quickly',
      ],
      cons: [
        'More expensive than hardwood mulch',
        'Does not add as much organic matter to soil',
        'Light color can look washed out in some landscapes',
        'Scent fades after a few weeks',
      ],
      maintenance: 'Refresher applications every 2-3 years instead of annual. Rake and fluff between applications. Add thin layer to restore appearance as needed.',
      durability: '2-3 years. Cedar decomposes slowly, making it a good choice for low-maintenance beds.',
    },
  ],
  'rock-landscaping': [
    {
      name: 'River Rock (Pea Gravel to 3-inch)',
      pros: [
        'Smooth, rounded appearance works in dry creek beds and pathways',
        'Drains well and does not wash away',
        'Available in various sizes for different applications',
        'Permanent, no annual replacement needed',
      ],
      cons: [
        'Difficult to walk on in loose form without stepping stones',
        'Can migrate into lawn areas over time',
        'Hard to remove once installed',
        'Higher upfront cost than mulch',
      ],
      maintenance: 'Rake to redistribute and remove debris annually. Blow leaves off with leaf blower. Top up thin areas every 3-5 years. Pull weeds that establish in joints.',
      durability: 'Permanent. River rock does not decompose or fade. It may need occasional cleaning to remove dirt buildup.',
    },
    {
      name: 'Landscape Boulders (Limestone/Granite)',
      pros: [
        'Natural focal point that anchors landscape beds',
        'Iowa limestone is locally sourced and matches the terrain',
        'Permanent feature that requires zero maintenance',
        'Creates visual weight and structure in the landscape',
      ],
      cons: [
        'Very heavy, requires equipment to place',
        'Difficult to move once positioned',
        'Limited to specific applications',
        'Higher material and transportation cost',
      ],
      maintenance: 'No maintenance required. Boulders may develop moss or lichen over time, which some homeowners prefer for a natural look. Power wash if desired.',
      durability: 'Permanent. Natural boulders last indefinitely and develop an attractive patina over time.',
    },
    {
      name: 'Flagstone Steppers',
      pros: [
        'Natural walking surface with unique character',
        'Each stepper is a one-of-a-kind shape',
        'Can be set in rock, mulch, or grass',
        'Handles Iowa freeze-thaw well when properly set',
      ],
      cons: [
        'Irregular shapes require careful fitting',
        'Can become uneven over time without proper base',
        'Heavy and labor-intensive to install',
        'Higher cost than manufactured stepping stones',
      ],
      maintenance: 'Re-level any stones that settle unevenly each spring. Clean with water and mild detergent as needed. Re-set in gravel base if movement continues.',
      durability: '50+ years. Flagstone is extremely durable and develops an attractive weathered appearance over time.',
    },
  ],
  'tree-planting': [
    {
      name: 'Balled-and-Burlapped (B&B) Trees',
      pros: [
        'Larger specimen trees available immediately',
        'Root ball protected by burlap during transport',
        'Established canopy provides instant impact',
        'Best option for significant shade trees',
      ],
      cons: [
        'Heavier and harder to handle than container trees',
        'Larger root ball requires bigger planting hole',
        'More expensive than container-grown trees',
        'Root loss during digging can slow establishment',
      ],
      maintenance: 'Water deeply once weekly for first 2 years. Keep mulch ring 3 feet wide. Stake for first year if needed. Remove burlap from top of root ball before planting.',
      durability: 'B&B trees, once established, have the same lifespan as any tree of that species. Proper planting is critical.',
    },
    {
      name: 'Container-Grown Trees',
      pros: [
        'Root system intact from nursery to planting hole',
        'Lighter and easier to handle than B&B',
        'Less transplant shock, faster establishment',
        'Wider planting window through the growing season',
      ],
      cons: [
        'Limited to smaller sizes than B&B',
        'Can develop circling roots if pot-bound',
        'Less immediate visual impact than larger specimens',
        'May need more watering in first season',
      ],
      maintenance: 'Same watering schedule as B&B. Check for circling roots before planting and correct them. Stake only if necessary for wind protection.',
      durability: 'Container trees often establish faster and catch up to B&B trees within 2-3 years due to less transplant shock.',
    },
  ],
  'shrub-installation': [
    {
      name: 'Deciduous Shrubs (Hydrangea, Ninebark, Spirea)',
      pros: [
        'Seasonal interest through flowers, foliage, and fall color',
        'Wide variety of sizes, shapes, and colors',
        'Fast-growing for quick landscape impact',
        'Many varieties are Iowa-native or adapted',
      ],
      cons: [
        'Bare stems in winter without evergreen structure',
        'Some varieties need annual pruning for best form',
        'Flowering depends on proper pruning timing',
        'More maintenance than evergreen options',
      ],
      maintenance: 'Prune at the correct time for each variety. Water deeply weekly during first growing season. Fertilize in spring. Mulch annually to maintain 2-3 inch depth.',
      durability: '15-30 years depending on variety. Regular pruning and care extend the productive life of ornamental shrubs.',
    },
    {
      name: 'Evergreen Shrubs (Boxwood, Yew, Juniper)',
      pros: [
        'Year-round structure and color in the landscape',
        'Provides privacy screening and wind protection',
        'Low-maintenance once established',
        'Forms the backbone of foundation plantings',
      ],
      cons: [
        'Slow-growing compared to deciduous shrubs',
        'Winter burn possible on exposed varieties',
        'Some varieties outgrow their space if not selected carefully',
        'Limited flower and fall color interest',
      ],
      maintenance: 'Water deeply during dry periods. Prune in early spring before new growth. Protect from winter burn with anti-desiccant if needed. Monitor for pests.',
      durability: '20-50+ years depending on variety. Evergreen shrubs are long-lived and form the permanent structure of the landscape.',
    },
  ],
  'commercial-landscaping': [
    {
      name: 'Commercial Turf Management',
      pros: [
        'Professional-grade equipment for large properties',
        'Consistent mowing height and frequency',
        'Integrated fertilization and weed control program',
        'Snow removal coordination available',
      ],
      cons: [
        'Higher monthly cost than residential service',
        'Scheduling must accommodate business hours',
        'Large properties require more equipment and crew time',
        'Irrigation system maintenance may be separate',
      ],
      maintenance: 'Weekly mowing during growing season. Monthly fertilization April-October. Pre-emergent in spring. Aeration in fall. Leaf removal in autumn. Snow removal on-call.',
      durability: 'Ongoing service. Commercial turf requires consistent care to maintain professional appearance year-round.',
    },
    {
      name: 'Commercial Hardscape (Pavers, Walls, Walkways)',
      pros: [
        'Durable materials rated for high traffic',
        'Commercial-grade base for heavy loads',
        'ADA-compliant accessibility options',
        'Long warranty on materials and installation',
      ],
      cons: [
        'Higher material cost than residential-grade',
        'Longer installation timeline for commercial sites',
        'May require special permitting and inspections',
        'Disruption to business operations during installation',
      ],
      maintenance: 'Inspect annually for settling or damage. Power wash and re-seal every 3-5 years. Repair damaged sections promptly. Keep drainage clear.',
      durability: '30-50 years with commercial-grade materials and proper base construction.',
    },
  ],
  'residential-landscaping': [
    {
      name: 'Custom Landscape Installation Package',
      pros: [
        'Complete service from design through final walkthrough',
        'All materials and labor included in one contract',
        'Project managed by a single point of contact',
        'Warranty on plants and hardscape work',
      ],
      cons: [
        'Single contract cost can be higher than phased approach',
        'Scheduling depends on crew availability and weather',
        'Design changes during installation may affect timeline',
        'Some homeowners prefer DIY for portions of the work',
      ],
      maintenance: 'Follow care instructions provided at final walkthrough. Water new plantings deeply. Keep mulch fresh. Contact us for ongoing maintenance plans.',
      durability: 'Landscape installations, with proper care, provide 20+ years of enjoyment. Hardscape lasts longer, plantings mature over time.',
    },
    {
      name: 'Phased Landscape Plan',
      pros: [
        'Spread project cost over multiple seasons',
        'Adjust each phase based on budget and priorities',
        'Learn from earlier phases before committing to later ones',
        'Less disruption to the property at any one time',
      ],
      cons: [
        'Longer timeline to complete the full vision',
        'Plant availability may change between phases',
        'Later phases may cost more due to material price changes',
        'Requires discipline to stick with the original master plan',
      ],
      maintenance: 'Maintain completed phases while planning next ones. Keep mulch fresh. Prune as needed. Store the master plan for reference.',
      durability: 'The phased approach allows for adjustments over time. Each phase is built to the same quality standard regardless of timing.',
    },
  ],
  'grading': [
    {
      name: 'Cut and Fill Grading',
      pros: [
        'Balances soil on-site without importing or exporting',
        'Cost-effective for properties with varying terrain',
        'Creates level building pads and usable yard space',
        'Solves drainage problems by reshaping the surface',
      ],
      cons: [
        'Limited by available soil on the property',
        'Heavy equipment access required',
        'Soil compaction from equipment needs remediation',
        'Not suitable for all property sizes',
      ],
      maintenance: 'Monitor for settling after heavy rains. Add fill to low spots as needed. Maintain grass or ground cover to prevent erosion. Re-grade if drainage issues reappear.',
      durability: 'Permanent. Properly compacted fill and cut slopes remain stable for the life of the property.',
    },
    {
      name: 'Laser Grading',
      pros: [
        'Precision to within 1/4 inch over the entire area',
        'Ensures consistent slope for proper drainage',
        'Ideal for final grade before sod or seed',
        'Fast and efficient for large open areas',
      ],
      cons: [
        'Requires specialized laser equipment and operator training',
        'Not practical for small, tight, or heavily landscaped areas',
        'Higher hourly rate than conventional grading',
        'Best results on relatively clear, open sites',
      ],
      maintenance: 'Minimal once established. Keep grass cover healthy to prevent erosion. Monitor for settling. Touch up any low spots that develop after heavy rain.',
      durability: 'Permanent. Laser grading achieves an accurate surface that remains stable when properly maintained.',
    },
  ],
  'preservation-restoration': [
    {
      name: 'Soil Amendment (Compost/Topsoil Mix)',
      pros: [
        'Improves soil structure in heavy Iowa clay',
        'Adds organic matter and nutrients',
        'Enhances drainage and root penetration',
        'Supports beneficial soil microorganisms',
      ],
      cons: [
        'Requires incorporation into existing soil for best results',
        'Quality varies by source and composition',
        'Can introduce weed seeds if not composted properly',
        'Multiple applications may be needed for severely depleted soil',
      ],
      maintenance: 'Top-dress with compost annually. Aerate compacted areas. Test soil pH every 2-3 years and amend as needed. Maintain mulch layer to feed soil biology.',
      durability: 'Soil improvement is semi-permanent. Annual maintenance keeps organic matter levels high. Neglect allows soil to revert to compacted state over time.',
    },
    {
      name: 'Erosion Control Blanket',
      pros: [
        'Holds soil in place on slopes during establishment',
        'Biodegradable material breaks down naturally',
        'Protects seed from washing away in rain',
        'Reduces sediment runoff from restoration sites',
      ],
      cons: [
        'Visible on the surface until vegetation establishes',
        'Not effective on very steep slopes without additional measures',
        'Must be staked securely to stay in place',
        'Can be difficult to mow through if not fully decomposed',
      ],
      maintenance: 'Leave in place to biodegrade naturally. Monitor for erosion underneath. Repair any tears or loose edges. Seed any bare spots that appear.',
      durability: 'Temporary. Erosion blankets last 6-18 months depending on material. By then, vegetation should be established.',
    },
  ],
  'hydroseeding': [
    {
      name: 'Standard Hydroseed Mix',
      pros: [
        'Seed, fertilizer, and mulch applied in one pass',
        'Fast establishment for large areas',
        'Good erosion control on moderate slopes',
        'Cost-effective for new lawns and bare spots',
      ],
      cons: [
        'Requires consistent watering for first 2-3 weeks',
        'Results vary with weather and soil conditions',
        'Seed germination depends on soil contact and moisture',
        'Thinner coverage than sod initially',
      ],
      maintenance: 'Keep consistently moist for first 2-3 weeks. Reduce watering frequency after germination. Mow when grass reaches 4 inches. Fertilize after 6 weeks.',
      durability: 'Once established, hydroseeded lawns have the same durability as sod. Deeper root systems from natural germination can improve drought tolerance.',
    },
    {
      name: 'Hydroseed with Tackifier',
      pros: [
        'Bonds seed and mulch to steeper slopes',
        'Better erosion control on inclines',
        'Reduces seed washout during heavy rain',
        'Improved germination rates on challenging sites',
      ],
      cons: [
        'Higher cost than standard hydroseed mix',
        'Tackifier can create a crust that may slow emergence',
        'Not necessary for flat or gently sloped areas',
        'Application requires more precise equipment',
      ],
      maintenance: 'Same watering and care as standard hydroseed. The tackifier will break down naturally over 4-8 weeks as the grass establishes.',
      durability: 'Same as standard hydroseed. The tackifier provides early protection but does not affect long-term lawn durability.',
    },
  ],
  'snow-removal': [
    {
      name: 'Push Plowing (Driveways & Parking Lots)',
      pros: [
        'Fast clearing of large paved areas',
        'Less physical labor than shoveling',
        'Can handle heavy accumulations of 6+ inches',
        'Seasonal contracts available for priority service',
      ],
      cons: [
        'Not suitable for delicate paver surfaces',
        'Can leave thin layer of snow on surface',
        'Requires minimum accumulation (usually 2 inches)',
        'Scheduling depends on storm timing and forecast',
      ],
      maintenance: 'Pre-treat surfaces with salt or de-icer before predicted storms. Clear snow before it compacts into ice. Post-treat high-traffic areas for traction.',
      durability: 'Snow removal is a seasonal service. Equipment and methods are designed for repeated use throughout Iowa winters.',
    },
    {
      name: 'Hand Shoveling (Walkways & Steps)',
      pros: [
        'Precision clearing of stairs, landings, and narrow paths',
        'Safe for delicate surfaces like paver patios',
        'Complete removal down to the surface',
        'Can access areas equipment cannot reach',
      ],
      cons: [
        'Labor-intensive for large areas',
        'Slower than mechanical methods',
        'Physical strain on the crew',
        'Higher cost per square foot than plowing',
      ],
      maintenance: 'Use plastic shovels on paver surfaces to avoid damage. Apply ice melt after clearing for traction. Re-clear if freezing rain follows snowfall.',
      durability: 'Same service structure. Hand shoveling complements plowing for complete snow removal coverage.',
    },
  ],
}

export const allServices: Service[] = [...services, ...hardscapeServices]

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug)
}

export function getHardscapeServiceDetail(slug: string): Service | undefined {
  if (slug === 'ponds-water-features') {
    return services.find((s) => s.slug === 'ponds-water-features')
  }
  return hardscapeServices.find((s) => s.slug === slug)
}
