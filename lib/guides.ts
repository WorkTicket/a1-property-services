import type { ServiceIconName } from '@/lib/services'

export type Guide = {
  slug: string
  title: string
  description: string
  icon: ServiceIconName
  serviceSlug: string
  heroIntro: string
  steps: GuideStep[]
  tips?: GuideTip[]
  costOverview?: string
  updatedAt?: string
}

export type GuideStep = {
  number: number
  title: string
  content: string
  keyPoints?: string[]
}

export type GuideTip = {
  icon: 'alert' | 'dollar' | 'info' | 'checklist'
  label: string
  text: string
}

export const allGuides: Guide[] = [
  {
    slug: 'retaining-wall-planning',
    title: 'Retaining Wall Planning Guide',
    description: 'Everything you need to know before building a retaining wall in Iowa. Permits, materials, drainage, and costs.',
    icon: 'layers',
    serviceSlug: 'retaining-walls',
    heroIntro: 'A retaining wall is one of the most transformative hardscape features you can add to an Iowa property. Beyond just looking great, a well-built wall holds back soil on sloped yards, creates usable terraces, and prevents erosion. This guide walks you through every step of planning your wall so you know exactly what to expect.',
    updatedAt: '2025-01-15',
    costOverview: 'In the Cedar Valley, retaining walls typically cost $25 to $55 per square foot of wall face, depending on material (concrete block vs. natural stone), wall height, and access. Taller walls over 4 feet almost always require engineering and permitting, which adds to the total.',
    steps: [
      {
        number: 1,
        title: 'Site Assessment',
        content: 'Start by understanding your slope. Walk the area and note the grade change from top to bottom. Look at what is above and below the wall location: trees, foundations, driveways, and utilities all matter. In Iowa, freeze-thaw cycles put real pressure on walls, so the soil type behind the wall matters more than most people realize. Sandy soils drain better than heavy clay; if you have clay, you will need extra drainage. Also note where water already flows during rain. A wall that interrupts natural drainage without a plan will fail within a few years.',
        keyPoints: [
          'Measure the total height difference from top to bottom of the slope',
          'Identify soil type: sandy loam, clay, or mixed',
          'Check proximity to structures and property lines',
          'Watch where rainwater flows during a storm',
        ],
      },
      {
        number: 2,
        title: 'Permit Check',
        content: 'In Cedar Falls and most Cedar Valley cities, walls under 4 feet typically do not require a permit. Walls 4 feet and taller usually do. If your wall is near a property line, setback rules apply. For walls over 4 feet, an engineer may need to stamp the design. Call your city building department early so you are not surprised. Some HOAs also have their own review process for hardscape projects.',
        keyPoints: [
          'Walls under 4 feet: usually no permit needed',
          'Walls 4 feet and over: permit and possibly engineered plans required',
          'Check setback requirements if near property lines',
          'Verify HOA rules if applicable',
        ],
      },
      {
        number: 3,
        title: 'Material Selection',
        content: 'You have three main options. Segmental concrete block is the most common choice in Iowa: it is cost-effective, installs faster than stone, and handles freeze-thaw well when installed correctly. Natural stone like limestone or fieldstone looks unmatched but costs more and takes longer to install. Timber walls are the budget option, but wood rots over time in Iowa moisture even when treated, so expect a 10-15 year lifespan at best. For most homeowners, concrete block hits the sweet spot of durability, appearance, and cost.',
        keyPoints: [
          'Concrete block: best value, 50+ year lifespan, many color and texture options',
          'Natural stone: premium look, highest cost, 75+ year lifespan',
          'Timber: lowest upfront cost, 10-15 year lifespan, not recommended for tall walls',
          'Match the wall style to your home architecture and existing landscape',
        ],
      },
      {
        number: 4,
        title: 'Base Preparation',
        content: 'The base is the most important part of any retaining wall. In Iowa, you need to dig below the frost line for the base trench, typically 6 to 8 inches deep for the compacted gravel base plus whatever portion of the first course sits below grade. Use clean 3/4-inch angular gravel (CA-7 in Iowa terms) for the base and compact it in 2-inch lifts with a plate compactor. The base should extend at least 6 inches beyond the front and back of the wall footprint. A level, properly compacted base prevents the wall from settling unevenly over time.',
        keyPoints: [
          'Dig trench 6 to 8 inches below final grade for base material',
          'Use clean angular gravel, compacted in 2-inch lifts',
          'Base extends at least 6 inches beyond the wall footprint',
          'First course must be perfectly level: everything depends on it',
        ],
      },
      {
        number: 5,
        title: 'Installation & Drainage',
        content: 'Installation proceeds from the bottom up. The first course of block is buried partially below grade. Each course is set back slightly (this is called batter) to lean the wall into the hillside. The critical step is backfill drainage: behind the wall you need at least 12 inches of clean gravel or drain rock, a perforated drain pipe at the base to carry water away, and filter fabric separating the gravel from the native soil. Without drainage, water builds up behind the wall, freezes, and pushes the wall forward. This is the number one reason retaining walls fail in Iowa.',
        keyPoints: [
          'First course partially buried for stability',
          'Each course set back slightly into the hill',
          '12 inches of drainage gravel behind the wall',
          'Perforated drain pipe at base, daylighted to a safe outlet',
          'Filter fabric separates gravel from native soil',
        ],
      },
      {
        number: 6,
        title: 'Final Inspection',
        content: 'After the wall is built and backfilled, walk the full length. Check that the top is level, the face is uniform, and no blocks are loose. Run water from a hose at the top of the backfill and verify it exits at the drain pipe outlet. If the wall is over 4 feet and required a permit, schedule the city inspection. Finally, plan your planting around the wall: the area above should be graded to direct surface water around both ends, and plants should be chosen to stabilize the soil without aggressive roots that could push through the wall face.',
        keyPoints: [
          'Check top course for level and alignment',
          'Test drainage with a hose: water must exit at the pipe outlet',
          'Schedule city inspection if wall requires a permit',
          'Grade the area above to direct surface water around wall ends',
          'Plant to stabilize soil without aggressive roots',
        ],
      },
    ],
    tips: [
      {
        icon: 'dollar',
        label: 'Budget Realistically',
        text: 'A 3-foot-tall by 40-foot-long wall in Iowa typically costs $4,000 to $8,000 depending on material and access. Add 20% for steep slopes, poor access, or drainage corrections.',
      },
      {
        icon: 'alert',
        label: 'Do Not Skimp on Drainage',
        text: 'The most expensive retaining wall repair is fixing one that was built without drainage. Water trapped behind the wall will freeze, expand, and shift blocks within a few Iowa winters.',
      },
      {
        icon: 'checklist',
        label: 'Call Before You Dig',
        text: 'Call Iowa One Call at 811 before any excavation. Utility marking is free and required by law. If you hit a gas line or fiber optic cable, repairs can cost thousands.',
      },
    ],
  },
  {
    slug: 'paver-patio-planning',
    title: 'Paver Patio Planning Guide',
    description: 'How to plan the perfect paver patio. Size, pattern, base preparation, drainage, and budgeting for Iowa properties.',
    icon: 'layout-grid',
    serviceSlug: 'paver-patio',
    heroIntro: 'A paver patio extends your living space outdoors and adds real value to your Iowa home. Pavers handle freeze-thaw cycles better than poured concrete because the individual units can move slightly without cracking. This guide covers everything from picking the right size to choosing a pattern that fits your home.',
    updatedAt: '2025-01-15',
    costOverview: 'Paver patios in the Cedar Valley average $18 to $30 per square foot installed, including base excavation, gravel base, sand bedding, pavers, edge restraint, and polymeric sand. A typical 300-square-foot patio lands between $5,400 and $9,000. Premium pavers, complex patterns, or difficult access increase the per-square-foot cost.',
    steps: [
      {
        number: 1,
        title: 'Design & Layout',
        content: 'Decide what you will use the patio for. Dining? Fire pit seating? A quiet corner? The purpose drives the size. As a rule of thumb, allow 25 square feet per person for dining, and 15 to 20 square feet per person for lounge seating. Mark the footprint on the ground with spray paint or stakes and string. Live with the layout for a few days. Walk through how you would use the space. It is far easier to adjust a paint line than to move pavers. Also decide on a pattern: running bond, herringbone, or basket weave are the most common, with herringbone being the strongest for freeze-thaw conditions.',
        keyPoints: [
          'Define the primary use: dining, seating, fire pit, or multi-use',
          'Allow 25 sq ft per person for dining areas',
          'Mark the footprint and test it for a few days before committing',
          'Running bond and herringbone patterns handle Iowa conditions well',
        ],
      },
      {
        number: 2,
        title: 'Base Excavation',
        content: 'Excavation depth depends on your soil and the paver use. In Iowa clay soil, dig 9 to 11 inches below the finished patio height: 6 inches for the compacted gravel base, 1 inch for sand bedding, and the paver thickness (typically 2-3/8 to 3-1/8 inches). If the subsoil is wet or organic, dig deeper and use more gravel. Excavate at least 6 to 8 inches beyond the patio perimeter for edge restraint. The excavation floor must be sloped away from the house at 1/4 inch per foot minimum to ensure drainage.',
        keyPoints: [
          'Total depth: 9 to 11 inches below finished grade in Iowa clay',
          'Breakdown: 6" gravel base, 1" sand, paver thickness',
          'Excavate 6-8 inches beyond patio perimeter for edge restraint',
          'Sub-base must slope 1/4" per foot away from structures',
        ],
      },
      {
        number: 3,
        title: 'Base Compaction',
        content: 'The gravel base is what keeps your patio flat through Iowa winters. Place 3/4-inch clean angular gravel in 2-inch lifts, compacting each lift with a plate compactor before adding the next. Make three to four passes per lift. The base surface should be smooth and at the desired slope before adding sand. If you are building a driveway or parking area with pavers, increase the gravel base to 10 to 12 inches and use a geotextile fabric between the subsoil and gravel to prevent mixing.',
        keyPoints: [
          'Use 3/4-inch angular gravel, placed in 2-inch lifts',
          'Compact each lift with 3-4 passes of a plate compactor',
          'Verify slope remains consistent after compaction',
          'For driveways: 10-12 inch base with geotextile fabric',
        ],
      },
      {
        number: 4,
        title: 'Paver Installation',
        content: 'Spread a 1-inch layer of coarse bedding sand over the compacted base. Screed the sand level using 1-inch pipe rails. Start laying pavers from a straight edge, typically against the house or a fixed reference line. Place pavers snugly against each other without sliding them across the sand, which disturbs the screeded surface. Cut edge pieces with a wet saw or guillotine splitter. After all pavers are placed, run a plate compactor over the surface with a rubber mat or carpet scrap to set the pavers into the sand without chipping them.',
        keyPoints: [
          'Screed 1" of coarse sand over the compacted base',
          'Start from a straight, fixed edge',
          'Cut pavers with a wet saw for clean edges',
          'Compact pavers with a rubber mat under the plate compactor',
        ],
      },
      {
        number: 5,
        title: 'Edge Restraint',
        content: 'Edge restraint holds the pavers in place and prevents spreading. Use plastic or aluminum paver edging secured with 10-inch spiral spikes driven through the edging into the compacted base every 12 inches. The edge restraint sits tight against the outer paver edges. Backfill against the edging with topsoil and sod or mulch. Without edge restraint, pavers will drift apart within the first freeze-thaw cycle as water expands and contracts at the perimeter.',
        keyPoints: [
          'Install edging tight against paver perimeter',
          'Secure with 10-inch spikes every 12 inches',
          'Backfill with soil and sod or mulch to hide edging',
          'Edge restraint is not optional in freeze-thaw climates',
        ],
      },
      {
        number: 6,
        title: 'Joint Sand & Sealing',
        content: 'Sweep polymeric sand into the joints between pavers. Polymeric sand contains a polymer binder that activates with water and hardens the joint, preventing weeds, ants, and washout. Sweep sand diagonally across the joints until they are full, then compact one more time to settle the sand. Sweep all excess sand off the paver surface before misting with water, as sand left on the surface will stain. Sealing is optional but recommended in Iowa: a penetrating silane-siloxane sealer applied every 3-5 years protects against salt, de-icers, and freeze-thaw damage while enhancing color.',
        keyPoints: [
          'Use polymeric sand, swept diagonally into joints',
          'Compact after sand application to settle it into joints',
          'Remove all excess sand from surface before watering',
          'Consider sealing every 3-5 years for Iowa winter protection',
        ],
      },
    ],
    tips: [
      {
        icon: 'dollar',
        label: 'Plan for the Midwest',
        text: 'Iowa freeze-thaw cycles demand a thicker base than warmer climates. The 6-inch gravel base is non-negotiable. Cutting corners on base depth is the most common cause of paver patio failure in our area.',
      },
      {
        icon: 'info',
        label: 'Drainage First',
        text: 'If the area collects standing water after rain, fix the drainage first. A patio installed in a low spot will always have problems no matter how well it is built.',
      },
      {
        icon: 'checklist',
        label: 'Extra Pavers',
        text: 'Order 5-10% extra pavers beyond your calculated square footage. You will need them for cuts and breakage, and having matching spares for future repairs is invaluable.',
      },
    ],
  },
  {
    slug: 'outdoor-living-design',
    title: 'Outdoor Living Design Guide',
    description: 'Plan an outdoor living space that fits your yard. Fire pits, outdoor kitchens, patios, and everything in between.',
    icon: 'home',
    serviceSlug: 'outdoor-living',
    heroIntro: 'An outdoor living space transforms your yard into a place you actually use every day. The key is intentional design: instead of adding features one at a time, think about how spaces connect. This guide helps you design an outdoor living area that fits your Iowan lifestyle, whether you want a quiet fire pit corner or a full outdoor kitchen.',
    updatedAt: '2025-01-15',
    costOverview: 'Outdoor living projects vary widely. A simple fire pit with paver seating area starts around $3,500. A complete outdoor kitchen with grill, countertop, and pergola can run $35,000 or more. Most Cedar Valley homeowners invest $10,000 to $25,000 for a thoughtfully designed outdoor living space with multiple zones.',
    steps: [
      {
        number: 1,
        title: 'Vision & Budget',
        content: 'Start by listing how you would actually use the space. Morning coffee? Weekend grilling? Kids playing? Evening fires with friends? Rank your activities by priority. This drives every decision that follows. Set a budget range early. It is tempting to keep costs open-ended, but having a number focuses your decisions. A good framework: put 60% of the budget toward hardscape (patio, walls, walkways), 25% toward features (fire pit, kitchen, pergola), and 15% toward plants and finishing touches.',
        keyPoints: [
          'List activities by priority: dining, cooking, lounging, play, entertaining',
          'Think about Iowa seasons: shade for summer, wind protection for spring and fall',
          'Budget breakdown: 60% hardscape, 25% features, 15% plantings',
          'Allocate 10-15% of total home value for the outdoor living space',
        ],
      },
      {
        number: 2,
        title: 'Zone Planning',
        content: 'Good outdoor living spaces have zones, just like indoor rooms. The kitchen or grill zone should be near the house for easy food transport. The dining zone should be close to the kitchen zone. The lounge zone with the fire pit can be further out for a more secluded feel. Define transitions between zones with a change in paver pattern, a low wall, or planters. In Iowa, the fire pit zone is key: position it so it is protected from prevailing northwest winds, and plan seating that faces away from the wind',
        keyPoints: [
          'Kitchen zone nearest the house for convenience',
          'Dining zone adjacent to kitchen zone',
          'Lounge and fire pit zone set further back for privacy',
          'Position fire pit with wind protection from the northwest',
          'Use pavers, low walls, or planters to define zone transitions',
        ],
      },
      {
        number: 3,
        title: 'Material Selection',
        content: 'Materials need to handle Iowa weather, from 90-degree July afternoons to -20-degree January nights. For hardscape surfaces, concrete pavers outperform poured concrete in freeze-thaw cycles. For vertical structures like outdoor kitchen counters, choose materials rated for exterior use. Granite countertops handle Iowa temperature swings, while some manufactured stones can crack. For pergolas and overhead structures, cedar and pressure-treated pine both work; cedar costs more but weathers to a handsome silver-gray without maintenance. Metal pergolas in a powder-coated finish hold up well and require zero upkeep.',
        keyPoints: [
          'Hardscape: concrete pavers over poured concrete for freeze-thaw resistance',
          'Countertops: granite or exterior-rated stone for kitchens',
          'Wood pergolas: cedar is splinter-resistant, pine is budget-friendly',
          'Metal pergolas: powder-coated aluminum or steel for zero maintenance',
          'Fabric shade sails: affordable but may need to come down in winter',
        ],
      },
      {
        number: 4,
        title: 'Utility Rough-In',
        content: 'Plan utilities before you lay a single paver. Gas lines for a grill or fire feature, electrical conduit for lighting and outlets, and water lines for a sink or outdoor shower all need to go underground before hardscape goes on top. In Iowa, gas lines must be buried at 18 inches minimum, and electrical conduit at 18 inches for PVC or 6 inches for rigid metal conduit with GFCI protection. If you are not sure you will add a feature later, run capped conduit or a sleeved line now while the ground is open. It costs a fraction of what retrofitting would cost.',
        keyPoints: [
          'Run gas, electrical, and water lines before any hardscape installation',
          'Iowa gas line burial minimum: 18 inches',
          'Run spare conduit for future additions: it costs pennies now, thousands later',
          'Plan outlet placement for outdoor TVs, speakers, and lighting',
          'Consider drainage for kitchen and bar areas before pouring countertops',
        ],
      },
      {
        number: 5,
        title: 'Hardscape Installation',
        content: 'With utilities in place, install the hardscape foundation: paver patios, retaining or seat walls, and walkways. This is the phase where the yard looks like a construction zone, but getting the base work right means the finished space will stay level for decades. In Iowa, all hardscape installation must account for frost heave. A proper gravel base and compacted sub-base are essential. If your design includes a fire pit, build it on a separate, deeper footing (12 to 18 inches of gravel) to handle the concentrated weight and heat.',
        keyPoints: [
          'Install all hardscape after utilities are underground',
          'Seat walls double as retaining support and informal seating',
          'Fire pits need 12-18 inch gravel footing, separate from the patio base',
          'Walkways connect zones and keep foot traffic off lawns',
        ],
      },
      {
        number: 6,
        title: 'Finishing Touches',
        content: 'This is where the space comes alive. Outdoor-rated furniture that can stay out in Iowa storms without rusting or mildewing. Landscape lighting: path lights for safety, uplights for trees and architectural features, and string lights overhead for ambiance. All outdoor lighting should be low-voltage LED on a transformer with a timer or photocell. Plantings soften the hardscape edges: use a mix of evergreens for year-round structure and perennials for seasonal color. Finally, add a few personal elements: a weatherproof outdoor speaker, a hammock post, or a small water feature for sound.',
        keyPoints: [
          'Furniture: powder-coated aluminum or all-weather wicker with Sunbrella fabric',
          'Lighting: low-voltage LED with timer or photocell, 12V transformer',
          'Plants: mix evergreens for winter structure with perennials for seasonal color',
          'Personal elements: speakers, hammocks, water features create atmosphere',
        ],
      },
    ],
    tips: [
      {
        icon: 'dollar',
        label: 'Phase if Needed',
        text: 'You do not need to build everything at once. Phase one: install the patio base and fire pit. Phase two: add the outdoor kitchen and pergola. Phase three: finishing touches and plantings.',
      },
      {
        icon: 'info',
        label: 'Think About Wind',
        text: 'Iowa has a nearly constant breeze. Design wind breaks into your plan with walls, dense shrubs, or pergola panels on the windward side.',
      },
      {
        icon: 'checklist',
        label: 'Permits Matter',
        text: 'Fire pits, gas lines, and electrical work all typically require permits in Cedar Valley cities. Outdoor kitchens with plumbing may trigger additional code requirements.',
      },
    ],
  },
  {
    slug: 'drainage-solutions',
    title: 'Drainage Solutions Guide',
    description: 'Identify and solve common drainage problems. French drains, grading, catch basins, and downspout solutions.',
    icon: 'triangle-right',
    serviceSlug: 'drainage',
    heroIntro: 'Water is the most destructive force on your property after fire. In Iowa, where we get around 35 inches of precipitation annually plus significant snowmelt, drainage problems can cause foundation damage, basement flooding, lawn die-off, and mosquito breeding grounds. This guide teaches you how to identify, diagnose, and solve drainage issues the right way.',
    updatedAt: '2025-01-15',
    costOverview: 'Basic drainage fixes like regrading a small area or extending a downspout may cost $500 to $1,500. A French drain system around a foundation typically runs $4,000 to $10,000. Comprehensive yard drainage with multiple catch basins and drain lines can reach $8,000 to $15,000. The cost of not fixing drainage is almost always higher: foundation repairs start around $10,000.',
    steps: [
      {
        number: 1,
        title: 'Problem Diagnosis',
        content: 'Walk your property during and right after a heavy rain. This is the single most useful thing you can do. Watch where water flows, where it pools, and where it exits your property. Note: does water slope toward your foundation? Do downspouts discharge right at the foundation wall? Is there a low spot in the middle of the yard that holds water for days after rain? Also check inside: efflorescence on basement walls, musty smells, and damp spots on the floor all signal water intrusion. Draw a simple map of your property and mark the flow paths, low spots, and problem areas.',
        keyPoints: [
          'Walk the property during and after heavy rain to observe water flow',
          'Check all downspouts: they should discharge at least 6 feet from the foundation',
          'Inspect the basement for efflorescence, damp spots, or musty odors',
          'Draw a property map marking flow paths, low spots, and problem areas',
        ],
      },
      {
        number: 2,
        title: 'Solution Design',
        content: 'Match the solution to the problem. Surface water that pools in lawn low spots can often be fixed with grading: adding soil to create a gentle slope away from the house (minimum 5% grade for the first 10 feet from the foundation). Water collecting against the foundation requires a French drain: a perforated pipe in a gravel trench that captures groundwater and routes it away. Multiple wet areas may need a system of catch basins connected by solid pipe. For downspout water, extend the discharge pipe underground and daylight it at least 10 feet from the house. In Iowa, all drain pipes must be buried below the frost line or sloped to drain completely before winter.',
        keyPoints: [
          'Surface pooling: regrade with a 5% minimum slope from the foundation',
          'Foundation water: French drain with perforated pipe at footing level',
          'Multiple wet areas: catch basins linked by solid PVC pipe',
          'Downspouts: extend underground and daylight 10+ feet from house',
          'All pipes in Iowa must drain completely or be buried below the frost line',
        ],
      },
      {
        number: 3,
        title: 'Material Selection',
        content: 'The right materials make the difference between a drainage system that lasts 5 years and one that lasts 30. For French drains, use 4-inch perforated PVC pipe (SDR-35 or Schedule 20) with two rows of holes facing down. Do not use corrugated black pipe: it collapses under soil weight and the ridges trap sediment. Wrap the pipe and gravel in heavy non-woven geotextile fabric to keep soil from clogging the system. For catch basin connections, use solid 4-inch PVC with glued joints. The gravel surrounding the pipe should be washed 3/4-inch to 1-1/2-inch stone, not crusher run or recycled concrete which contain fines that will clog the system.',
        keyPoints: [
          'French drain pipe: 4-inch perforated PVC, holes facing down',
          'Avoid corrugated pipe: it collapses and traps sediment',
          'Wrap pipe and gravel in non-woven geotextile fabric',
          'Gravel: washed 3/4-inch to 1-1/2-inch clean stone',
          'Solid PVC with glued joints for catch basin connections',
        ],
      },
      {
        number: 4,
        title: 'Installation',
        content: 'For a French drain, dig a trench 18 to 24 inches deep and 12 inches wide. The trench must slope at a minimum 1% grade (1/8 inch per foot) toward the discharge point. Line the trench with geotextile fabric, leaving enough fabric on each side to wrap over the top later. Place 2 to 3 inches of gravel in the bottom, lay the perforated pipe (holes down), and cover with 8 to 12 inches of gravel. Wrap the fabric over the gravel, overlapping the edges. Top with 4 to 6 inches of soil or sod. The discharge point should daylight to a ditch, dry well, or pop-up emitter at a location where water can safely disperse.',
        keyPoints: [
          'Trench: 18-24 inches deep, 12 inches wide, minimum 1% slope',
          'Line with geotextile fabric before adding gravel',
          'Pipe goes holes-down on 2-3 inches of gravel bed',
          'Cover with 8-12 inches of gravel, then wrap fabric over',
          'Discharge to a safe outlet: ditch, dry well, or pop-up emitter',
        ],
      },
      {
        number: 5,
        title: 'Testing',
        content: 'Before backfilling the discharge end, test the system by running water from a garden hose into the upstream end. Watch the flow all the way to the discharge point. Water should flow freely without pooling in the pipe. Check that the discharge area can handle the volume of water without creating a new problem downstream. If water backs up, check for blockages, low spots in the pipe, or insufficient slope. Fix any issues now before the trench is backfilled. Once the system passes the test, backfill the remaining trench with topsoil and seed or sod.',
        keyPoints: [
          'Run a hose test from the upstream end before final backfill',
          'Verify water flows freely to the discharge point',
          'Check that the discharge area handles water volume without eroding',
          'Fix any blockages or low spots found during testing',
          'Backfill with topsoil and seed or sod after passing the test',
        ],
      },
      {
        number: 6,
        title: 'Restoration & Maintenance',
        content: 'After backfilling, restore any disturbed lawn, beds, or hardscape areas. Seed or sod bare soil immediately to prevent erosion. Maintain your drainage system with a quick annual check: after heavy rain, walk the discharge point and verify water is still flowing. Clean catch basin grates of leaves and debris each fall. For French drains, the system should be self-cleaning if built correctly, but you can flush it with a hose through a cleanout port once a year if you notice any slowing. A well-built drainage system with proper materials should perform reliably for 30+ years with minimal maintenance.',
        keyPoints: [
          'Seed or sod bare soil immediately after backfilling',
          'Annual check: verify water flows at the discharge point after heavy rain',
          'Clean catch basin grates of leaves each fall',
          'Optional: flush French drains annually through a cleanout port',
          'Properly built systems last 30+ years with minimal maintenance',
        ],
      },
    ],
    tips: [
      {
        icon: 'alert',
        label: 'Do Not Route Water to Your Neighbor',
        text: 'Iowa follows the reasonable use doctrine. You are generally allowed to direct water following the natural contours of the land, but you cannot concentrate flow onto a neighboring property in a way that causes damage.',
      },
      {
        icon: 'dollar',
        label: 'Foundation Repair is More Expensive',
        text: 'A $5,000 French drain is one of the smartest investments you can make if water is getting to your foundation. Foundation crack repairs start at $10,000, and a full waterproofing excavation can exceed $25,000.',
      },
      {
        icon: 'info',
        label: 'Sump Pump Backup',
        text: 'If your basement has a sump pump, install a battery backup system. Iowa thunderstorms often knock out power exactly when you need the pump most. A water-powered backup pump is another option that does not rely on batteries.',
      },
    ],
  },
  {
    slug: 'landscape-design-guide',
    title: 'Landscape Design Guide',
    description: 'A complete guide to designing your Iowa landscape. Plant selection, hardscape integration, and phased planning.',
    icon: 'ruler',
    serviceSlug: 'landscape-design',
    heroIntro: 'Designing a landscape is about more than picking plants. It is about creating an outdoor space that works for how you live, fits the natural conditions of your property, and thrives in Iowa climate. This guide walks you through a complete design process, from the first site walk to the final planting plan.',
    updatedAt: '2025-01-15',
    costOverview: 'A professional landscape design plan in the Cedar Valley typically costs $500 to $2,500 depending on property size and complexity. Full landscape installation ranges from $5,000 to $50,000+. Many homeowners phase their installation over 2-3 years, starting with hardscape and trees, then shrubs and perennials, then finishing touches.',
    steps: [
      {
        number: 1,
        title: 'Site Analysis',
        content: 'Start with an honest assessment of your property. Map out sun exposure throughout the day and across seasons: a spot that is full sun in June may be full shade in September. Note where water flows and where it pools after rain. Test your soil or at minimum note whether it is heavy clay, sandy, or good loam. Measure the dimensions of every bed area, the distance from the house to property lines, and the location of all utilities, septic fields, and buried lines. Take photos from every angle, including from inside the house looking out. A landscape should look as good from your kitchen window as it does from the street.',
        keyPoints: [
          'Map sun exposure: full sun (6+ hours), part sun (4-6), part shade (2-4), full shade',
          'Note water flow, pooling areas, and drainage patterns',
          'Test or assess soil type: clay, loam, or sandy',
          'Measure all bed areas and distances to property lines and utilities',
          'Take photos from inside looking out: that is how you will see it most',
        ],
      },
      {
        number: 2,
        title: 'Needs Assessment',
        content: 'List what your household needs from the landscape. Privacy from a neighbor? A play area for kids? A vegetable garden? Less lawn to mow? Curb appeal for resale? Rank these needs by priority. Also list what you want to keep: mature trees, existing patios, or a shed. This assessment prevents the common mistake of designing a beautiful landscape that does not work for how you actually live. For Iowa specifically, think about snow storage: you will need a place to pile snow that does not crush your best shrubs. Also consider where you will store outdoor furniture, grills, and hoses for winter.',
        keyPoints: [
          'List household needs ranked by priority',
          'Identify existing elements to keep: trees, patios, structures',
          'Plan snow storage areas away from prized plantings',
          'Consider winter storage for furniture, grills, and hoses',
          'Factor in views you want to preserve or screen',
        ],
      },
      {
        number: 3,
        title: 'Concept Design',
        content: 'Now sketch the big-picture layout, either on paper or using a landscape design tool. Start with the fixed elements: house, driveway, property lines, large trees. Then add the hardscape: patios, walkways, retaining walls. These form the bones of the design. Overlay the planting areas: foundation beds, island beds, perimeter plantings. Finally, add the functional zones: outdoor living, play area, vegetable garden, storage. Think in layers: canopy trees tallest and furthest back, then understory trees and tall shrubs, then mid-height shrubs and perennials, then groundcovers and lawn at the front. Good design leads the eye through the space.',
        keyPoints: [
          'Start with fixed elements, then hardscape, then planting areas',
          'Hardscape is the bones of the design: install this first',
          'Layer plantings tallest to shortest from back to front',
          'Create sight lines that draw the eye through the landscape',
          'Balance open lawn areas with planted beds for proportion',
        ],
      },
      {
        number: 4,
        title: 'Plant Selection for Iowa',
        content: 'Choose plants rated for USDA Zone 5a or 5b, which covers most of the Cedar Valley. Native plants are increasingly popular because they handle Iowa weather without coddling and support local wildlife. Key Iowa native trees: bur oak, red maple, river birch, and hackberry. Native shrubs: ninebark, serviceberry, red twig dogwood, and arrowwood viburnum. For perennials: purple coneflower, black-eyed Susan, little bluestem grass, and butterfly weed. Avoid plants known to struggle in Iowa: rhododendrons need acidic soil we do not have, and some hydrangea varieties bloom on old wood that dies back in hard winters. Select plants for multi-season interest: spring flowers, summer foliage, fall color, and winter structure.',
        keyPoints: [
          'Select plants rated for USDA Zone 5a/5b',
          'Native trees: bur oak, red maple, river birch, hackberry',
          'Native shrubs: ninebark, serviceberry, red twig dogwood',
          'Native perennials: coneflower, black-eyed Susan, little bluestem',
          'Avoid rhododendrons and bigleaf hydrangeas that struggle in Iowa',
          'Choose plants with multi-season interest',
        ],
      },
      {
        number: 5,
        title: 'Final Plans & Phasing',
        content: 'Turn your concept into a detailed plan with plant names, quantities, sizes, and spacing. If you are hiring a professional, they will provide this. If you are DIYing, create a planting map with each plant labeled by name and size at maturity. Calculate quantities and get material costs before you start. For most Iowa homeowners, phasing over 2-3 years makes the project manageable both in cost and labor. Phase 1: hardscape, major grading, and trees (the framework). Phase 2: shrubs, hedges, and large perennials (the structure). Phase 3: perennials, groundcovers, mulch, and finishing details. Phase 1 is the most important to get right because everything else builds on it.',
        keyPoints: [
          'Final plan includes plant names, quantities, sizes, and spacing',
          'Calculate material costs before starting to avoid budget surprises',
          'Phase 1 (year 1): hardscape, grading, trees: the framework',
          'Phase 2 (year 2): shrubs, hedges, large perennials: the structure',
          'Phase 3 (year 3): perennials, groundcover, mulch, details',
        ],
      },
      {
        number: 6,
        title: 'Implementation',
        content: 'Whether you hire a pro or DIY, the implementation order matters. Start with rough grading and drainage work. Then hardscape: patios, walkways, walls. Then irrigation rough-in if you are installing it. Then soil preparation: till in compost or amendments as needed. Then plant trees and large shrubs first, then smaller shrubs, then perennials. Install edging between beds and lawn before mulching to keep the lines clean. Apply 2 to 3 inches of hardwood mulch to all beds, keeping it pulled back from stems and trunks to prevent rot. Water everything deeply after planting and establish a watering schedule for the first full growing season. New plantings in Iowa need about 1 inch of water per week from rain or irrigation.',
        keyPoints: [
          'Order: grading and drainage first, then hardscape, then planting',
          'Install edging before mulch for clean bed lines',
          'Apply 2-3 inches of mulch, keeping it away from stems and trunks',
          'Water new plantings 1 inch per week for the first full season',
          'The implementation phase takes 1-3 weeks for a full landscape install',
        ],
      },
    ],
    tips: [
      {
        icon: 'dollar',
        label: 'Start with Hardscape',
        text: 'Trying to add a patio after planting is expensive and destructive. Install all hardscape first. The plants can wait; the concrete cannot easily go around them later.',
      },
      {
        icon: 'info',
        label: 'Right Plant, Right Place',
        text: 'The number one reason plants fail in Iowa landscapes is being planted in the wrong spot. A sun-loving plant in shade will never thrive, no matter how much you water and fertilize it.',
      },
      {
        icon: 'checklist',
        label: 'Utility Marking',
        text: 'Call 811 before you dig for any planting hole deeper than 12 inches, and always before any hardscape excavation. Hitting a utility line is dangerous and expensive.',
      },
    ],
  },
  {
    slug: 'lawn-care-guide',
    title: 'Lawn Care Guide',
    description: 'Year-round lawn care for Iowa. Mowing, fertilization, aeration, weed control, and seasonal tips.',
    icon: 'flower2',
    serviceSlug: 'lawn-care',
    heroIntro: 'A thick, healthy lawn in Iowa is achievable with the right practices. Our climate presents unique challenges: hot humid summers, cold winters, and clay-heavy soils that can compact into concrete. This guide gives you a complete year-round lawn care plan tailored for Cedar Valley lawns, whether you do it yourself or hire a pro.',
    updatedAt: '2025-01-15',
    costOverview: 'DIY lawn care for an average Cedar Valley yard costs about $200 to $400 per year in materials (fertilizer, seed, weed control). Professional lawn care service, including fertilization, weed control, and aeration, typically runs $400 to $900 per year depending on lawn size and number of applications.',
    steps: [
      {
        number: 1,
        title: 'Spring Prep (March - April)',
        content: 'As soon as the ground thaws and is no longer soggy, do a spring cleanup. Rake up leaves, sticks, and winter debris. Do not walk on or rake a soggy lawn: the soil is soft and you will cause compaction and damage grass crowns. Once the lawn has dried enough, lightly rake matted areas to lift flattened grass. Apply a crabgrass pre-emergent when soil temperatures hit 55 degrees Fahrenheit at a 1-inch depth, which in Iowa is typically mid to late April. Do not seed at the same time as pre-emergent: the pre-emergent will block grass seed germination too. If you need to overseed thin areas, wait until fall when you will get better results anyway.',
        keyPoints: [
          'Stay off soggy lawns to avoid compaction and crown damage',
          'Lightly rake matted areas once the lawn is dry',
          'Apply crabgrass pre-emergent when soil hits 55°F at 1" depth',
          'Do not apply pre-emergent and grass seed at the same time',
          'Target mid to late April for pre-emergent in the Cedar Valley',
        ],
      },
      {
        number: 2,
        title: 'Fertilization Program (May - September)',
        content: 'Iowa lawns need a steady supply of nutrients during the growing season. A four-application program works well: early spring (late April to early May), late spring (late May to early June), summer (late June to early July), and early fall (late August to early September). Use a fertilizer with a 4-1-2 or similar ratio: the first number (nitrogen) is the most important for lawn greening and growth. Most Iowa lawns need about 3 to 4 pounds of actual nitrogen per 1,000 square feet per year, split across the applications. Use slow-release nitrogen sources for summer applications to avoid burning the lawn in heat. After fertilizing, water lightly to wash granules off the grass blades and into the soil.',
        keyPoints: [
          'Four applications: early spring, late spring, summer, early fall',
          'Target 3-4 pounds of nitrogen per 1,000 sq ft per year',
          'Use slow-release nitrogen in summer to prevent burning',
          'Water lightly after each application to move fertilizer to the soil',
          'Avoid fertilizing dormant lawns in midsummer drought',
        ],
      },
      {
        number: 3,
        title: 'Weed Control',
        content: 'The best weed control is a thick, healthy lawn. Weeds fill bare spots: if your lawn is dense, weeds have nowhere to grow. For existing broadleaf weeds like dandelions and clover, spot-treat with a selective herbicide rather than blanket-spraying the whole lawn. Apply in fall when weeds are actively storing nutrients in their roots: fall herbicide treatments are significantly more effective than spring applications. Spot-treat in spring only for weeds you missed in fall. For crabgrass, the pre-emergent in step one is your best defense. For nutsedge, which is common in wet Iowa summers, use a dedicated nutsedge herbicide as it is resistant to most broadleaf weed killers.',
        keyPoints: [
          'Dense turf is the best long-term weed control strategy',
          'Fall is the most effective time to treat perennial broadleaf weeds',
          'Spot-treat rather than blanket-spray whenever possible',
          'Crabgrass: pre-emergent in spring is the only reliable control',
          'Nutsedge requires a dedicated herbicide: standard weed killers do not work',
        ],
      },
      {
        number: 4,
        title: 'Aeration',
        content: 'Core aeration pulls small plugs of soil from the lawn, relieving compaction and letting air, water, and nutrients reach the roots. In Iowa clay soils, aeration is one of the most impactful things you can do for your lawn. Aerate at least once a year, in early fall (late August to mid-September). Fall aeration combines perfectly with overseeding: the open holes create ideal seed-to-soil contact. If your lawn sees heavy traffic or has thick thatch, aerating twice a year (spring and fall) is beneficial. After aerating, leave the soil plugs on the surface; they will break down naturally within a couple of mowings and return organic matter to the soil. If you are overseeding, spread seed immediately after aerating while the holes are still open.',
        keyPoints: [
          'Core aeration relieves soil compaction: critical in Iowa clay soils',
          'Aerate once per year in early fall; twice for heavy traffic or thick thatch',
          'Leave soil plugs on the lawn: they break down and add organic matter',
          'For overseeding, spread seed immediately after aeration',
          'Avoid aerating when the lawn is dormant or drought-stressed',
        ],
      },
      {
        number: 5,
        title: 'Watering & Mowing',
        content: 'Most Iowa lawns need about 1 to 1.5 inches of water per week during the growing season, from rain or irrigation. Water deeply and infrequently: one or two deep watering sessions per week encourage roots to grow deeper, while daily light sprinkling encourages shallow roots that cannot handle Iowa summer heat. Water early in the morning (4:00 AM to 9:00 AM) to minimize evaporation and reduce disease risk. For mowing, keep cool-season grass (Kentucky bluegrass, fescue, ryegrass) at 3 to 3.5 inches during the growing season. Never cut more than one-third of the grass blade height at once. Keep mower blades sharp: dull blades tear the grass instead of cutting it, causing brown tips and stress.',
        keyPoints: [
          '1 to 1.5 inches of water per week during growing season',
          'Water deeply 1-2 times per week, not lightly every day',
          'Water in early morning: 4 AM to 9 AM',
          'Mowing height: 3 to 3.5 inches for cool-season Iowa grasses',
          'Never remove more than one-third of the blade at once',
          'Sharpen mower blades at least once per season',
        ],
      },
      {
        number: 6,
        title: 'Fall & Winter Care (October - March)',
        content: 'Fall is the most important season for lawn care in Iowa. Apply a winterizer fertilizer in late October to early November, before the ground freezes. Winterizer is higher in potassium, which strengthens cell walls and improves cold tolerance. Mow the lawn one final time at about 2 inches in late fall to reduce snow mold risk over winter. Clear all leaves from the lawn before snow covers them: leaves left under snow form a mat that suffocates grass and encourages snow mold. During winter, avoid walking on frosted or snow-covered grass: frozen grass blades are brittle and break when stepped on, leaving dead patches in spring. Also minimize salt or de-icer use near lawn areas; it will kill grass and contaminate the soil.',
        keyPoints: [
          'Apply winterizer fertilizer in late October to early November',
          'Final mow at 2 inches to reduce snow mold risk',
          'Remove all leaves before snow cover',
          'Do not walk on frozen or snow-covered grass',
          'Minimize salt and de-icer use near lawn edges',
          'Schedule your first spring aeration and pre-emergent application now',
        ],
      },
    ],
    tips: [
      {
        icon: 'info',
        label: 'Know Your Grass Type',
        text: 'Most Cedar Valley lawns are Kentucky bluegrass, tall fescue, or a mix. Kentucky bluegrass spreads to fill bare spots but needs more water. Tall fescue has deeper roots and handles drought better but does not spread. Know which you have before making decisions.',
      },
      {
        icon: 'dollar',
        label: 'Soil Test First',
        text: 'Before spending money on fertilizer, get a soil test from Iowa State University Extension. It costs about $15 and tells you exactly what nutrients and pH adjustments your lawn needs, saving you from buying products you do not need.',
      },
      {
        icon: 'checklist',
        label: 'Fall is for Seeding',
        text: 'The best time to seed or overseed an Iowa lawn is late August through mid-September. Soil is warm, weeds are slowing down, and the new grass has two full cool seasons (fall and spring) to establish before summer heat arrives.',
      },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug)
}

export const guideSlugs = allGuides.map((g) => g.slug)
