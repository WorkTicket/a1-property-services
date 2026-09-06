export type ProjectCaseStudy = {
  slug: string
  projectId: string
  title: string
  description: string
  h1: string
  keywords: string[]
  problem: string[]
  property: string[]
  workPerformed: string[]
  challenges: string[]
  result: string[]
  relatedLearn: string[]
  serviceSlug: string
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: 'hillside-retaining-wall-cedar-falls',
    projectId: 'wall-1',
    title: 'Hillside Retaining Wall Project | Cedar Falls, IA',
    description:
      'Case study: a steep Cedar Falls hillside rebuilt with a segmental retaining wall, drain tile, and a patio-ready grade. See the problem, the build, and the result.',
    h1: 'Hillside Retaining Wall Project in Cedar Falls, IA',
    keywords: [
      'hillside retaining wall cedar falls',
      'sloped yard retaining wall project',
      'cedar falls retaining wall case study',
    ],
    serviceSlug: 'retaining-walls',
    problem: [
      'The backyard sat on a cut hillside that kept washing after spring thaws. Mulch, soil, and anything planted on the slope ended up at the bottom of the lot. There was no flat ground for a patio, and mowing the bank was unsafe.',
      'Water from the hill also had no controlled path. It sheeted toward the house side of the yard instead of into a drained outlet. The homeowner needed usable space and a wall that would hold Iowa clay through freeze-thaw — not a decorative stack.',
    ],
    property: [
      'Residential lot in Cedar Falls with a steep excavated bank, limited side-yard access for equipment, and typical Black Hawk County clay. The grade change was too large for planting or a timber border to hold.',
    ],
    workPerformed: [
      'We excavated to a stable bearing, built a compacted aggregate base, and installed a segmental block retaining wall sized to the height of the cut. Gravel backfill and perforated drain pipe went in behind the wall so water would leave instead of loading the face.',
      'The grade above the wall was finished as a patio-ready landing. That gave the owner a level pad without pretending the original hillside was a lawn.',
    ],
    challenges: [
      'Access was tight, so material staging and machine work had to stay off the neighbor line. Height and clay meant the drainage package was not optional. A wall this tall without drain tile is a leaning wall in two winters.',
    ],
    result: [
      'The slope is now a finished wall with a usable landing above it. Soil stays put after rain, and the yard can take a patio or plantings on flat ground instead of a washout. This is the kind of structural wall we build across Cedar Falls when the lot itself is the problem.',
    ],
    relatedLearn: ['do-i-need-a-retaining-wall', 'why-yard-floods-when-it-rains'],
  },
  {
    slug: 'timber-wall-replacement-cedar-falls',
    projectId: 'wall-2',
    title: 'Timber Wall Replacement Project | Cedar Falls, IA',
    description:
      'Case study: a failing timber retaining wall in Cedar Falls replaced with block, drainage, and a clean finish grade.',
    h1: 'Timber Retaining Wall Replacement in Cedar Falls, IA',
    keywords: [
      'timber retaining wall replacement',
      'replace wood retaining wall cedar falls',
      'failing timber wall iowa',
    ],
    serviceSlug: 'retaining-walls',
    problem: [
      'An aged timber wall had bowed, rot was showing at the buried line, and the yard behind it was dropping. Timber is a common budget wall in Iowa. It does not last like a drained block wall once the wood stays wet against clay.',
      'The homeowner needed the grade held, not another 10-year timber rebuild.',
    ],
    property: [
      'Established Cedar Falls backyard with an existing timber terrace, lawn above the wall, and enough clay behind the old timbers that water had been sitting in the bank for years.',
    ],
    workPerformed: [
      'We tore out the failing wood, excavated a new base, and built a segmental block wall with compacted stone, gravel backfill, and drain pipe. Finish grading tied the lawn back to the new cap so the terrace looked like it belonged to the yard.',
    ],
    challenges: [
      'Demo of wet, rotting timbers is messy. We had to keep the upper lawn from sloughing into the trench while the new base went in. Drainage that the original wall never had was added so the replacement would not repeat the same failure.',
    ],
    result: [
      'The timber is gone. The new block wall is plumb, drained, and graded clean at the lawn. If you still have a leaning wood wall in Cedar Falls or Waterloo, this is the usual repair: replace it as a structure, not as another round of landscape ties.',
    ],
    relatedLearn: ['do-i-need-a-retaining-wall', 'mulch-vs-rock-landscaping'],
  },
  {
    slug: 'front-yard-retaining-wall-cedar-falls',
    projectId: 'wall-4',
    title: 'Front Yard Retaining Wall Project | Cedar Falls, IA',
    description:
      'Case study: an L-shaped retaining wall that turned a sloped Cedar Falls front yard into a level lawn and walk.',
    h1: 'Front Yard Retaining Wall Project in Cedar Falls, IA',
    keywords: [
      'front yard retaining wall cedar falls',
      'l shaped retaining wall iowa',
      'level front yard retaining wall',
    ],
    serviceSlug: 'retaining-walls',
    problem: [
      'The front yard fell toward the walk and street, so the lawn was hard to mow and the entry felt unfinished. The owner wanted a level approach without a tall fortress wall on the curb.',
    ],
    property: [
      'Cedar Falls front yard with a moderate slope, public-facing street view, and a walk that needed to stay usable during construction.',
    ],
    workPerformed: [
      'We laid out an L-shaped segmental wall, excavated, compacted the base, and built the corner so both legs stayed level. Backfill and drain tile went in, then we graded a flat lawn above the wall so the front yard became usable ground instead of a bank.',
    ],
    challenges: [
      'Front-yard walls have to look finished from the street. Courses, corners, and caps have to stay clean. We also had to keep water from the new upper lawn from spilling over the face — that is what the drain and grade are for.',
    ],
    result: [
      'The front lawn sits on a level pad. The walk and yard are easier to use, and the wall reads as part of the house approach instead of a leftover slope. Same build details we use on backyard walls: base, gravel, pipe, then the pretty face.',
    ],
    relatedLearn: ['do-i-need-a-retaining-wall'],
  },
  {
    slug: 'raised-paver-patio-cedar-falls',
    projectId: 'patio-1',
    title: 'Raised Paver Patio Project | Cedar Falls, IA',
    description:
      'Case study: a sloped Cedar Falls backyard turned into a raised paver patio with a retaining wall and stone steps.',
    h1: 'Raised Paver Patio Project in Cedar Falls, IA',
    keywords: [
      'raised paver patio cedar falls',
      'patio with retaining wall cedar falls',
      'paver patio steps iowa',
    ],
    serviceSlug: 'paver-patio',
    problem: [
      'The backyard sloped enough that furniture would not sit level and water ran across the space after storms. The owner wanted a real outdoor room, not a slab on a hill.',
    ],
    property: [
      'Residential Cedar Falls backyard with a grade change that required a retaining edge before a patio could exist. Clay soil, typical freeze-thaw exposure, and a clear line from the house to the new living space.',
    ],
    workPerformed: [
      'We built a retaining wall to create the raised pad, compacted an Iowa-depth aggregate base, and installed pavers with edge restraint and polymeric joint sand. Stone steps tied the patio back down to the remaining yard so the space was actually accessible.',
    ],
    challenges: [
      'This is two structures: a wall and a patio. The wall has to drain. The patio has to pitch away from the house. Getting both right on clay is the job. Skipping either one is how raised patios settle or hold water.',
    ],
    result: [
      'The slope is now a raised paver patio with steps and a wall that holds the grade. The family has a level space for seating, and the yard below is no longer a wash. For the installation process we use on flatter lots, see our paver patio service and Cedar Falls patio landing page.',
    ],
    relatedLearn: ['why-yard-floods-when-it-rains'],
  },
  {
    slug: 'paver-patio-replacement-cedar-falls',
    projectId: 'patio-2',
    title: 'Paver Patio Replacement Project | Cedar Falls, IA',
    description:
      'Case study: a damaged patio in Cedar Falls torn out and rebuilt with a compacted base, new pavers, and clean edging.',
    h1: 'Paver Patio Replacement in Cedar Falls, IA',
    keywords: [
      'paver patio replacement cedar falls',
      'replace damaged patio iowa',
      'new paver patio project',
    ],
    serviceSlug: 'paver-patio',
    problem: [
      'The existing patio was cracked, uneven, and collecting water. Patching a failed surface on a bad base does not survive Iowa winters. The owner wanted a patio that stayed flat.',
    ],
    property: [
      'Cedar Falls backyard with an old patio that had to come out completely. Access for demo and new aggregate, and a house connection that needed the new surface to drain away from the foundation.',
    ],
    workPerformed: [
      'We demolished the old surface, rebuilt a compacted aggregate base in lifts, set pavers, installed edge restraint, and finished joints with polymeric sand. The pitch was corrected so rain leaves the patio instead of sitting in the field.',
    ],
    challenges: [
      'Replacement jobs hide surprises under the old slab or pavers — wet clay, no real base, sometimes buried debris. We budget time to fix the ground, not just swap the top.',
    ],
    result: [
      'The new patio is level, edged, and built for freeze-thaw. Individual pavers can be replaced later if needed. That is the advantage over another poured slab on the same failed subgrade.',
    ],
    relatedLearn: ['mulch-vs-rock-landscaping'],
  },
  {
    slug: 'foundation-landscape-beds-cedar-falls',
    projectId: 'landscape-ba-1',
    title: 'Foundation Landscape Bed Project | Cedar Falls, IA',
    description:
      'Case study: a bare Cedar Falls foundation strip planted with shrubs, perennials, edging, and mulch.',
    h1: 'Foundation Landscape Beds in Cedar Falls, IA',
    keywords: [
      'foundation planting cedar falls',
      'landscape bed installation iowa',
      'front of house landscaping project',
    ],
    serviceSlug: 'landscape-installation',
    problem: [
      'The strip along the house was bare dirt and grass that never looked finished. No definition, no plants suited to the foundation exposure, and no mulch to hold moisture or suppress weeds.',
    ],
    property: [
      'Cedar Falls home with a typical foundation bed width, mixed sun along the wall, and clay that needed amending before shrubs could establish.',
    ],
    workPerformed: [
      'We laid out the bed, prepped soil, installed shrubs and perennials chosen for Iowa winters, added edging, and finished with hardwood mulch kept off the siding and stems.',
    ],
    challenges: [
      'Foundation beds fail when plants are too big at maturity, mulch is piled on the house, or clay is never loosened. We sized plants for the wall and kept mulch pulled back so the bed helps the house instead of trapping moisture against it.',
    ],
    result: [
      'The front of the house now has a defined, planted bed that looks finished the day we leave and can grow into the design. Same approach we use for island and fence-line beds around Cedar Falls and Waterloo.',
    ],
    relatedLearn: ['best-grass-seed-for-iowa', 'mulch-vs-rock-landscaping'],
  },
  {
    slug: 'failing-block-retaining-wall-cedar-falls',
    projectId: 'wall-3',
    title: 'Failing Block Retaining Wall Rebuild | Cedar Falls, IA',
    description:
      'Case study: a leaning block retaining wall in Cedar Falls rebuilt with a new base, drainage, pea gravel finish, and a clean cap line.',
    h1: 'Failing Block Retaining Wall Rebuild in Cedar Falls, IA',
    keywords: [
      'failing block retaining wall cedar falls',
      'leaning retaining wall repair iowa',
      'rebuild block retaining wall cedar falls',
    ],
    serviceSlug: 'retaining-walls',
    problem: [
      'The existing block wall had started to lean. Once a segmental wall rotates, more courses and extra gravel in front of it will not save it. Water was loading the face, the base had settled, and the cap line was no longer true.',
      'The homeowner needed the failed wall out and a drained rebuild — not a cosmetic restack on the same bad footing.',
    ],
    property: [
      'Cedar Falls backyard terrace with a failed block wall, clay behind the units, and a toe that needed a finished look once the new wall was plumb. Access for demo and new base work along the existing grade.',
    ],
    workPerformed: [
      'We removed the failed block, excavated to a stable bearing, and built a new compacted aggregate base. The wall was rebuilt with gravel backfill and drain pipe so water leaves instead of pushing the face.',
      'A pea-gravel finish at the toe and a clean cap line closed the job so the rebuild reads as a finished wall, not a repair patch.',
    ],
    challenges: [
      'Rebuilds are slower than new walls because the old units, wet clay, and collapsed base all have to come out first. We had to hold the grade above the trench while the new base went in so the lawn did not slough into the work.',
    ],
    result: [
      'The wall is plumb, drained, and finished with pea gravel at the toe. If a block wall in Cedar Falls or Waterloo is leaning, this is the repair: new base, drainage, then the face — not another course stacked on a failing wall.',
    ],
    relatedLearn: ['do-i-need-a-retaining-wall', 'planning-retaining-wall-project'],
  },
  {
    slug: 'garage-side-retaining-wall-cedar-falls',
    projectId: 'wall-5',
    title: 'Garage-Side Retaining Wall Rebuild | Cedar Falls, IA',
    description:
      'Case study: a damaged garage-side retaining wall in Cedar Falls rebuilt with drainage and a decorative gravel cap.',
    h1: 'Garage-Side Retaining Wall Rebuild in Cedar Falls, IA',
    keywords: [
      'garage retaining wall cedar falls',
      'retaining wall along garage iowa',
      'replace damaged retaining wall cedar falls',
    ],
    serviceSlug: 'retaining-walls',
    problem: [
      'The wall along the garage had failed. Soil and water were working the face, the cap was shot, and the grade next to the building needed to be held without trapping moisture against the foundation.',
      'A garage-side wall has to drain. If water sits against the building, you have a wet slab problem as well as a leaning wall.',
    ],
    property: [
      'Cedar Falls home with a damaged retaining wall tight to the garage, limited working room, and a need for a finished cap that sheds water instead of holding it.',
    ],
    workPerformed: [
      'We tore out the failed section, rebuilt the wall on a compacted base with drain pipe, and finished the top with decorative gravel so water moves off the cap and the edge looks intentional next to the building.',
    ],
    challenges: [
      'Working against a garage means protecting the slab, siding, and downspouts while still getting a proper base and drain. There is no extra room to over-excavate. The drainage package still has to outlet somewhere that is not the garage floor.',
    ],
    result: [
      'The garage side is held, drained, and capped with decorative gravel. The wall does the structural job and the finish keeps water off the building. Same details we use on any Cedar Falls wall that sits against a structure.',
    ],
    relatedLearn: ['do-i-need-a-retaining-wall', 'why-yard-floods-when-it-rains'],
  },
  {
    slug: 'backyard-waterfall-cedar-falls',
    projectId: 'water-1',
    title: 'Backyard Waterfall Project | Cedar Falls, IA',
    description:
      'Case study: a Cedar Falls hillside rebuilt as a multi-tiered stone waterfall with a retaining wall and garden steps.',
    h1: 'Backyard Waterfall Project in Cedar Falls, IA',
    keywords: [
      'backyard waterfall cedar falls',
      'stone waterfall installation iowa',
      'pondless waterfall cedar falls',
    ],
    serviceSlug: 'ponds-water-features',
    problem: [
      'The hillside yard had no centerpiece and the slope was hard to use. The owner wanted moving water built into the grade — not a kit dropped on flat lawn.',
      'A waterfall on a hill only works if the stonework, liner, and retaining edge are planned as one build. Otherwise the feature leaks, the bank washes, and the steps do not line up.',
    ],
    property: [
      'Residential Cedar Falls slope with enough fall for a multi-tier waterfall, a retaining wall to hold the bank, and garden steps so the feature can be walked, not just looked at.',
    ],
    workPerformed: [
      'We graded the slope, set liner and plumbing, stacked natural stone for the falls, and tied in a retaining wall and steps so the water feature sits in the hillside instead of fighting it. Pump, basins, and plantings finished the run.',
    ],
    challenges: [
      'Hillside water features leak at the liner folds and overflow at the wrong edge if the weirs are not level. Iowa freeze-thaw means the plumbing has to be serviceable. We built the falls so the pump can come out for winter and the stone stays put.',
    ],
    result: [
      'The hillside is now a stone waterfall with a wall and steps that belong to the yard. Sound, movement, and a finished slope instead of a bare bank. This is the custom water-feature work we do in Cedar Falls when the lot has real grade.',
    ],
    relatedLearn: ['why-yard-floods-when-it-rains', 'planning-retaining-wall-project'],
  },
  {
    slug: 'koi-pond-waterfall-cedar-falls',
    projectId: 'water-2',
    title: 'Koi Pond and Waterfall Project | Cedar Falls, IA',
    description:
      'Case study: a Cedar Falls backyard lawn turned into a koi pond with a stone waterfall beside the house.',
    h1: 'Koi Pond and Waterfall Project in Cedar Falls, IA',
    keywords: [
      'koi pond cedar falls',
      'pond and waterfall installation iowa',
      'backyard koi pond cedar falls',
    ],
    serviceSlug: 'ponds-water-features',
    problem: [
      'The lawn next to the house was unused. The owner wanted a pond they could stock and a waterfall for sound, close enough to the house to enjoy from inside.',
      'A pond against a home has to be lined, edged, and plumbed so water stays in the feature and off the foundation.',
    ],
    property: [
      'Cedar Falls backyard beside the house with room for a lined pond, stone edge, and a waterfall that returns water to the pool. Typical clay that needs a proper excavation and underlayment.',
    ],
    workPerformed: [
      'We excavated the pond, installed liner and underlayment, built a natural-stone edge and waterfall, set the pump and plumbing, and added planting pockets so the feature tucks into the yard instead of looking like a hole in the lawn.',
    ],
    challenges: [
      'Working next to the house means protecting the foundation, keeping the waterfall splash in the pond, and leaving the pump accessible for Iowa winters. Fish-ready ponds also need edge treatment that hides the liner without creating a drowning shelf for kids or pets — we design that on site.',
    ],
    result: [
      'The lawn is now a koi pond with a stone waterfall. The house has a water feature to look at and listen to, built for Black Hawk County freeze-thaw. Same pond-and-falls sequence we use across Cedar Falls and Waterloo.',
    ],
    relatedLearn: ['why-yard-floods-when-it-rains'],
  },
  {
    slug: 'pond-stream-stone-bridge-cedar-falls',
    projectId: 'water-3',
    title: 'Pond, Stream, and Stone Bridge Project | Cedar Falls, IA',
    description:
      'Case study: a Cedar Falls backyard built out with a pond, flowing stream, stone bridge, and surrounding gardens.',
    h1: 'Pond, Stream, and Stone Bridge Project in Cedar Falls, IA',
    keywords: [
      'backyard pond and stream cedar falls',
      'stone bridge pond iowa',
      'pond stream installation cedar falls',
    ],
    serviceSlug: 'ponds-water-features',
    problem: [
      'The backyard needed more than a single basin. The owner wanted a pond with a stream you could cross, gardens around the water, and a feature large enough to organize the whole yard.',
      'A stream only works if the grade, liner, and weirs are continuous. Skip that and you get dry sections, leaks, and a bridge sitting on mud.',
    ],
    property: [
      'Larger Cedar Falls backyard with enough length for a pond, stream run, and stone bridge, plus planting beds to frame the water. Clay soil and freeze-thaw exposure on every liner edge.',
    ],
    workPerformed: [
      'We excavated the pond and stream, installed liner, stacked stone for the channel and falls, set a stone bridge, and planted the surrounding beds so the water feature reads as the center of the landscape.',
    ],
    challenges: [
      'Long stream runs hide leaks. Every transition has to be sealed and the flow has to stay in the channel in a heavy Iowa rain. The bridge needs a solid bearing that does not settle into the liner. We staged stone and plantings so the yard was usable while the water feature came together.',
    ],
    result: [
      'The backyard is a pond, stream, and stone bridge with gardens around the water. It is a full landscape, not a kit pond. If you want this scale of water feature in Cedar Falls, the build is excavation, liner, stone, then planting — in that order.',
    ],
    relatedLearn: ['why-yard-floods-when-it-rains', 'mulch-vs-rock-landscaping'],
  },
  {
    slug: 'paver-patio-with-fire-pit-cedar-falls',
    projectId: 'patio-ba-3',
    title: 'Paver Patio with Fire Pit Project | Cedar Falls, IA',
    description:
      'Case study: worn Cedar Falls lawn replaced with a paver patio, fire pit, and seating area for evenings outside.',
    h1: 'Paver Patio with Fire Pit in Cedar Falls, IA',
    keywords: [
      'paver patio with fire pit cedar falls',
      'patio fire pit installation iowa',
      'backyard paver patio cedar falls',
    ],
    serviceSlug: 'paver-patio',
    problem: [
      'The backyard was worn grass that would not support furniture or a fire. The owner wanted a patio they could actually sit on at night, with a fire pit as the gathering spot.',
      'A fire pit on a patio needs a non-combustible surround, a level field, and a pitch that drains. Dropping a kit on lawn does not last in Iowa clay.',
    ],
    property: [
      'Cedar Falls backyard with tired turf, room for a patio and seating, and a house connection that needed the new hardscape to drain away from the foundation.',
    ],
    workPerformed: [
      'We excavated the patio, compacted an aggregate base, installed pavers with edge restraint, and built in a fire pit with space for chairs. Joint sand and a finished edge closed the surface.',
    ],
    challenges: [
      'Fire-pit patios have two drainage jobs: the field has to shed rain, and the pit cannot sit in a low spot that fills with water. We set the pit in the layout so seating works and the surface still pitches correctly.',
    ],
    result: [
      'Worn lawn is now a paver patio with a fire pit and room to sit. The backyard has an outdoor room that holds up through freeze-thaw. Same patio-and-pit build we use when Cedar Falls homeowners want evenings outside, not another slab of grass.',
    ],
    relatedLearn: ['choosing-patio-materials'],
  },
  {
    slug: 'paver-patio-and-stone-fire-pit-cedar-falls',
    projectId: 'patio-ba-4',
    title: 'Paver Patio and Stone Fire Pit Project | Cedar Falls, IA',
    description:
      'Case study: a bare Cedar Falls backyard built as a paver patio with a stone fire pit and space for Adirondack chairs.',
    h1: 'Paver Patio and Stone Fire Pit in Cedar Falls, IA',
    keywords: [
      'stone fire pit patio cedar falls',
      'paver patio adirondack chairs iowa',
      'backyard fire pit patio cedar falls',
    ],
    serviceSlug: 'paver-patio',
    problem: [
      'The backyard was bare. No defined living space, nowhere to put chairs, and nothing that looked like a finished yard. The owner wanted a patio with a stone fire pit as the center of the space.',
    ],
    property: [
      'Open Cedar Falls backyard with enough room for a paver field, a stone fire pit, and chair spacing. Clay that needed a real base before any paver or pit went in.',
    ],
    workPerformed: [
      'We built a full patio: excavation, compacted base, pavers, edge restraint, and a stone fire pit set as the gathering point. The layout left clear space for Adirondack chairs without crowding the pit.',
    ],
    challenges: [
      'Bare lots look simple until you start setting grade. The patio has to be high enough to stay out of water and low enough to meet the house and remaining yard. The stone pit has to sit on the same prepared base as the pavers so it does not settle independently.',
    ],
    result: [
      'The bare yard is a paver patio with a stone fire pit and room for chairs. It looks like an outdoor living space the day we leave. If your Cedar Falls backyard is still empty lawn, this is the usual first hardscape: patio, pit, then furniture.',
    ],
    relatedLearn: ['choosing-patio-materials', 'landscaping-material-comparison'],
  },
  {
    slug: 'paver-patio-pergola-cedar-falls',
    projectId: 'patio-ba-5',
    title: 'Paver Patio and Pergola Project | Cedar Falls, IA',
    description:
      'Case study: a Cedar Falls lawn turned into a paver patio with a pergola and lounge seating for shade and outdoor living.',
    h1: 'Paver Patio and Pergola Project in Cedar Falls, IA',
    keywords: [
      'paver patio with pergola cedar falls',
      'patio pergola installation iowa',
      'shaded paver patio cedar falls',
    ],
    serviceSlug: 'paver-patio',
    problem: [
      'Open lawn had no shade and no finished floor for furniture. The owner wanted a patio they could use in afternoon sun, with a pergola for cover and lounge seating on a real surface.',
      'A pergola on pavers only lasts if the posts are set to the patio structure, not lagged into dirt next to a floating slab.',
    ],
    property: [
      'Cedar Falls backyard lawn with a clear line from the house, room for a patio and pergola footprint, and typical freeze-thaw exposure on both the hardscape and the posts.',
    ],
    workPerformed: [
      'We installed the paver patio on a compacted aggregate base with edge restraint and polymeric sand, then set the pergola on the new hardscape so furniture has a finished floor and shade in the same build.',
    ],
    challenges: [
      'Patio and pergola are one project. Post locations have to be in the paver layout before the field goes down, or you are cutting finished pavers later. The patio still has to pitch away from the house while the pergola sits square.',
    ],
    result: [
      'The lawn is a paver patio with a pergola and lounge seating. Shade, a solid floor, and a finished outdoor room. This is the outdoor-living build we do in Cedar Falls when the yard needs cover as well as pavers.',
    ],
    relatedLearn: ['choosing-patio-materials'],
  },
  {
    slug: 'paver-driveway-replacement-cedar-falls',
    projectId: 'driveway-ba-1',
    title: 'Paver Driveway Replacement Project | Cedar Falls, IA',
    description:
      'Case study: cracked concrete in Cedar Falls replaced with a paver driveway and contrasting border built for Iowa winters.',
    h1: 'Paver Driveway Replacement in Cedar Falls, IA',
    keywords: [
      'paver driveway replacement cedar falls',
      'replace cracked concrete driveway iowa',
      'paver driveway with border cedar falls',
    ],
    serviceSlug: 'paver-driveway',
    problem: [
      'The concrete driveway was cracked and tired. Patching a failed slab on Iowa clay does not last. The owner wanted a driveway that could take vehicles and freeze-thaw without another round of saw-cuts and mudjacking.',
    ],
    property: [
      'Cedar Falls residence with a cracked concrete drive, garage connection, and street edge that had to stay usable. Vehicle loads meant a deeper base than a patio.',
    ],
    workPerformed: [
      'We demolished the concrete, excavated for a driveway-depth compacted aggregate base, installed driveway-grade pavers with a contrasting border course, edge restraint, and polymeric joint sand.',
    ],
    challenges: [
      'Driveways fail at the base, not the paver. We compact in lifts and set edge restraint so the field cannot creep. The border is structural as well as visual — it locks the pattern at the garage and the street.',
    ],
    result: [
      'Cracked concrete is gone. The new paver driveway has a contrasting border and a base built for Iowa winters. Individual units can be reset later if anything settles. That is the point of a paver drive versus another poured slab.',
    ],
    relatedLearn: ['landscaping-material-comparison', 'choosing-patio-materials'],
  },
  {
    slug: 'herringbone-brick-paver-driveway-cedar-falls',
    projectId: 'driveway-ba-2',
    title: 'Herringbone Brick Paver Driveway | Cedar Falls, IA',
    description:
      'Case study: old asphalt in Cedar Falls replaced with a brick paver driveway in a herringbone pattern.',
    h1: 'Herringbone Brick Paver Driveway in Cedar Falls, IA',
    keywords: [
      'brick paver driveway cedar falls',
      'herringbone paver driveway iowa',
      'replace asphalt driveway with pavers cedar falls',
    ],
    serviceSlug: 'paver-driveway',
    problem: [
      'The asphalt drive was worn out. Alligator cracks, a tired surface, and a look that no longer matched the house. The owner wanted brick pavers in herringbone — a pattern that locks under vehicle traffic.',
    ],
    property: [
      'Cedar Falls home with an old asphalt driveway, garage apron, and street connection. Asphalt removal plus a new structural base before any brick went down.',
    ],
    workPerformed: [
      'We removed the asphalt, built a compacted base rated for vehicles, laid a herringbone brick paver field, and finished the edges at the garage and street so the pattern stays locked.',
    ],
    challenges: [
      'Herringbone has to start square or the pattern walks. Asphalt demo also leaves a contaminated subgrade that has to come out. We cut a clean section, rebuild the base, then lay brick — not pavers over old asphalt.',
    ],
    result: [
      'The asphalt is gone. The drive is brick pavers in herringbone with a finished edge. It handles cars and Iowa freeze-thaw, and it reads as an upgrade from the street. This is the brick driveway work we do in Cedar Falls when asphalt is done.',
    ],
    relatedLearn: ['landscaping-material-comparison'],
  },
  {
    slug: 'modern-farmhouse-paver-driveway-cedar-falls',
    projectId: 'driveway-ba-3',
    title: 'Modern Farmhouse Paver Driveway | Cedar Falls, IA',
    description:
      'Case study: a plain concrete drive in Cedar Falls replaced with gray pavers sized to a modern farmhouse.',
    h1: 'Modern Farmhouse Paver Driveway in Cedar Falls, IA',
    keywords: [
      'modern paver driveway cedar falls',
      'gray paver driveway iowa',
      'farmhouse paver driveway cedar falls',
    ],
    serviceSlug: 'paver-driveway',
    problem: [
      'The concrete drive was plain and starting to show age. The house had a modern farmhouse look that the slab did not match. The owner wanted gray pavers with clean lines to the garage and walk.',
    ],
    property: [
      'Cedar Falls modern farmhouse with a concrete driveway, attached garage, and a walk that needed to meet the new paver field without a trip edge.',
    ],
    workPerformed: [
      'We demolished the concrete, compacted a driveway base, and installed large-format gray pavers with edge restraint and joint sand. Lines were kept clean to the garage and the walk.',
    ],
    challenges: [
      'Large-format driveway pavers show waves if the base is not true. Color and joint lines have to stay consistent across a wide field. We spent the time on grade so the modern look is actually flat, not just a different color of concrete.',
    ],
    result: [
      'The drive matches the house: gray pavers, clean lines, a finished approach. It is built as a vehicle surface, not a patio that happens to sit in front of the garage. Same modern paver driveway work we do when Cedar Falls homes need curb appeal that lasts.',
    ],
    relatedLearn: ['landscaping-material-comparison', 'choosing-patio-materials'],
  },
  {
    slug: 'decorative-border-paver-driveway-cedar-falls',
    projectId: 'driveway-ba-4',
    title: 'Decorative Border Paver Driveway | Cedar Falls, IA',
    description:
      'Case study: worn concrete in Cedar Falls upgraded to a paver driveway with a decorative soldier-course border.',
    h1: 'Decorative Border Paver Driveway in Cedar Falls, IA',
    keywords: [
      'paver driveway decorative border cedar falls',
      'soldier course paver driveway iowa',
      'upgrade concrete driveway to pavers cedar falls',
    ],
    serviceSlug: 'paver-driveway',
    problem: [
      'The concrete was worn and the edges had started to break. The owner wanted pavers with a decorative border — a defined edge that also keeps the field from creeping.',
    ],
    property: [
      'Cedar Falls driveway with failing concrete edges, a garage connection, and enough width that a soldier-course border would read from the street.',
    ],
    workPerformed: [
      'We replaced the driveway completely: demo, compacted base, paver field, and a decorative soldier-course border with edge restraint and polymeric sand.',
    ],
    challenges: [
      'Borders fail when they are glued on after the field. We set the soldier course as part of the layout so it is structural. Edge restraint behind it is what keeps Iowa freeze-thaw from walking the pattern into the lawn.',
    ],
    result: [
      'Worn concrete is a paver driveway with a decorative border that holds the field. The edge is the detail you notice from the street and the part that keeps the drive together. Typical Cedar Falls upgrade when the slab is done and the house needs a finished approach.',
    ],
    relatedLearn: ['landscaping-material-comparison'],
  },
  {
    slug: 'attached-garage-paver-driveway-cedar-falls',
    projectId: 'driveway-ba-5',
    title: 'Attached Garage Paver Driveway | Cedar Falls, IA',
    description:
      'Case study: cracked asphalt to an attached garage in Cedar Falls replaced with a new paver driveway.',
    h1: 'Attached Garage Paver Driveway in Cedar Falls, IA',
    keywords: [
      'paver driveway to garage cedar falls',
      'replace asphalt driveway cedar falls',
      'garage apron paver driveway iowa',
    ],
    serviceSlug: 'paver-driveway',
    problem: [
      'Cracked asphalt led to an attached garage. The surface was failing at the apron, water was not shedding cleanly, and the owner wanted a paver drive that met the garage the right way.',
    ],
    property: [
      'Cedar Falls home with an attached garage, cracked asphalt drive, and an apron that had to be rebuilt so the new pavers did not dump water into the garage.',
    ],
    workPerformed: [
      'We tore out the asphalt, built a new compacted base, laid a driveway-grade paver field to the garage apron, installed edge restraint, and finished the joints.',
    ],
    challenges: [
      'The garage slab is the control. The driveway has to pitch away from the door without a lip that catches a snow blade or a low spot that ices. We set the apron grade first, then ran the field to the street.',
    ],
    result: [
      'The asphalt is gone. A paver driveway now runs to the attached garage with joints finished and water pitched the right way. If your Cedar Falls garage apron is cracked asphalt, this is the replacement: base, pavers, then the door — not another overlay.',
    ],
    relatedLearn: ['why-yard-floods-when-it-rains', 'landscaping-material-comparison'],
  },
  {
    slug: 'backyard-lawn-mowing-cedar-falls',
    projectId: 'mowing-ba-1',
    title: 'Backyard Lawn Mowing Service | Cedar Falls, IA',
    description:
      'Case study: an overgrown Cedar Falls backyard cut, edged, and striped so the lawn looks tended again.',
    h1: 'Backyard Lawn Mowing in Cedar Falls, IA',
    keywords: [
      'backyard lawn mowing cedar falls',
      'professional lawn mowing cedar falls',
      'overgrown lawn mowing iowa',
    ],
    serviceSlug: 'lawn-care',
    problem: [
      'The backyard had gotten away from the owner. Tall grass, uneven height, and no edging. A one-time hack-down with a dull mower would scalp it. They needed a proper cut, trim, and cleanup.',
    ],
    property: [
      'Cedar Falls backyard lawn that had grown past a normal weekly height, with hard surfaces that needed blowing off after the cut.',
    ],
    workPerformed: [
      'We mowed at a height that would not scalp the overgrown turf, trimmed, edged, and blew off walks and the patio. Clippings were managed so the yard was ready to use the same day.',
    ],
    challenges: [
      'Overgrown lawns hide debris and wet spots. The first cut has to be high enough to avoid yellowing the crown. We treat the cleanup as part of the job so the backyard does not look like a dump of clippings.',
    ],
    result: [
      'The backyard is cut, edged, and striped. It looks maintained instead of abandoned. This is the weekly mowing standard we keep on Cedar Falls and Waterloo lawns once the yard is back on a schedule.',
    ],
    relatedLearn: ['best-grass-seed-for-iowa', 'why-wont-grass-grow-in-my-yard'],
  },
  {
    slug: 'acreage-lawn-mowing-cedar-falls',
    projectId: 'mowing-ba-3',
    title: 'Acreage Lawn Mowing Service | Cedar Falls, IA',
    description:
      'Case study: overgrown acreage around mature trees in Cedar Falls mowed with clean stripes and even height.',
    h1: 'Acreage Lawn Mowing in Cedar Falls, IA',
    keywords: [
      'acreage lawn mowing cedar falls',
      'large lawn mowing iowa',
      'property mowing around trees cedar falls',
    ],
    serviceSlug: 'lawn-care',
    problem: [
      'The acreage lawn around mature trees had grown out. A residential walk-behind was not going to keep up. The owner needed a large-area cut with even height and clean trimming at the trunks.',
    ],
    property: [
      'Cedar Falls acreage with a large turf area, mature trees, and enough ground that wide-area mowing and tree-ring trimming both matter.',
    ],
    workPerformed: [
      'We mowed the large area at a consistent height, trimmed around trees, and left clean stripes so the property looks maintained from the road and from the house.',
    ],
    challenges: [
      'Acreage work is about even height, not just speed. Trees, wet pockets, and hidden obstacles are why we walk the property and trim by hand at the trunks instead of bark-stripping with a deck.',
    ],
    result: [
      'The acreage is mowed, striped, and trimmed around the trees. Large Cedar Falls and Waterloo properties stay looking tended when the cut is consistent, not when someone bush-hogs it twice a summer.',
    ],
    relatedLearn: ['best-grass-seed-for-iowa', 'seasonal-landscape-maintenance'],
  },
  {
    slug: 'front-yard-lawn-mowing-cedar-falls',
    projectId: 'mowing-ba-5',
    title: 'Front Yard Lawn Mowing Service | Cedar Falls, IA',
    description:
      'Case study: a weedy, overgrown Cedar Falls front yard mowed and striped for a clean curb-side finish.',
    h1: 'Front Yard Lawn Mowing in Cedar Falls, IA',
    keywords: [
      'front yard lawn mowing cedar falls',
      'curb appeal lawn mowing iowa',
      'professional front lawn mowing cedar falls',
    ],
    serviceSlug: 'lawn-care',
    problem: [
      'The front yard was weedy and overgrown. Curb appeal was gone. The owner needed a sharp cut along the walks and house, not just a pass down the middle of the lawn.',
    ],
    property: [
      'Cedar Falls front yard with walks, a street edge, and turf that had been left long enough to look neglected from the curb.',
    ],
    workPerformed: [
      'We mowed the front yard, trimmed along the walks and house, edged, and blew off hard surfaces so the approach looked finished.',
    ],
    challenges: [
      'Front yards are judged from the street. Edges, walkways, and the line along the house matter as much as the field. The first cut on a weedy lawn is still a mow — thicker turf and weed control come from a real lawn-care schedule after that.',
    ],
    result: [
      'The front yard is striped and clean at the walks. Curb appeal is back. This is the front-yard mowing we do across Cedar Falls when a lawn needs to look tended before anyone talks about seed or fertilizer.',
    ],
    relatedLearn: ['why-wont-grass-grow-in-my-yard', 'best-grass-seed-for-iowa'],
  },
  {
    slug: 'island-landscape-bed-cedar-falls',
    projectId: 'landscape-ba-2',
    title: 'Island Landscape Bed Project | Cedar Falls, IA',
    description:
      'Case study: a plain Cedar Falls front lawn given an island bed with a tree, perennials, edging, and mulch.',
    h1: 'Island Landscape Bed in Cedar Falls, IA',
    keywords: [
      'island landscape bed cedar falls',
      'front yard island planting iowa',
      'landscape island bed installation cedar falls',
    ],
    serviceSlug: 'landscape-installation',
    problem: [
      'The front lawn was a blank slab of grass. Nothing pulled the eye, no tree for scale, and no planting that made the yard feel designed. The owner wanted an island bed that read as a finished feature.',
    ],
    property: [
      'Cedar Falls front yard with open lawn, room for an island bed, and clay that needed prep before a tree and perennials could establish.',
    ],
    workPerformed: [
      'We laid out the island, planted a tree sized for the space, added perennials, installed edging, and finished with mulch so the bed holds moisture and looks complete from the street.',
    ],
    challenges: [
      'Island beds fail when they are too small, the tree is planted too deep, or there is no edge and the mulch migrates into the lawn. We sized the bed for the tree at maturity and cut a clean edge so mowing stays easy.',
    ],
    result: [
      'The front lawn has an island bed with a tree, perennials, and mulch. The yard looks designed instead of empty. Same island-bed approach we use on Cedar Falls and Waterloo lots that need a focal point in the lawn.',
    ],
    relatedLearn: ['mulch-vs-rock-landscaping', 'best-grass-seed-for-iowa'],
  },
  {
    slug: 'corner-landscape-bed-cedar-falls',
    projectId: 'landscape-ba-3',
    title: 'Corner Landscape Bed Project | Cedar Falls, IA',
    description:
      'Case study: bare grass at a Cedar Falls house corner planted with arborvitae, boulders, and river rock.',
    h1: 'Corner Landscape Bed in Cedar Falls, IA',
    keywords: [
      'corner landscape bed cedar falls',
      'arborvitae corner planting iowa',
      'boulder and river rock landscaping cedar falls',
    ],
    serviceSlug: 'landscape-installation',
    problem: [
      'The house corner was bare grass. No screening, no definition, and a blank corner that made the foundation look unfinished. The owner wanted evergreens, boulder accents, and rock mulch for a lower-maintenance corner.',
    ],
    property: [
      'Cedar Falls home with an exposed corner, mixed sun, and a need for screening without a high-maintenance perennial bed against the siding.',
    ],
    workPerformed: [
      'We built a corner bed with arborvitae for screening, set boulders as anchors, and finished with river rock and fabric so the corner stays defined without constant mulch top-ups.',
    ],
    challenges: [
      'Corner beds next to the house have to respect mature width on the evergreens. Rock mulch needs a real edge or it migrates. We kept plants off the siding and used boulders that sit in the bed, not on top of the grade.',
    ],
    result: [
      'The corner is screened with arborvitae, boulders, and river rock. It looks finished and stays that way with less mulch work. This is the low-maintenance corner planting we install in Cedar Falls when grass against the house is not enough.',
    ],
    relatedLearn: ['mulch-vs-rock-landscaping'],
  },
  {
    slug: 'walkway-landscape-beds-cedar-falls',
    projectId: 'landscape-ba-4',
    title: 'Walkway Landscape Beds Project | Cedar Falls, IA',
    description:
      'Case study: plain lawn along a Cedar Falls front walk planted with hostas, flowers, edging, and mulch.',
    h1: 'Walkway Landscape Beds in Cedar Falls, IA',
    keywords: [
      'walkway landscape beds cedar falls',
      'front walk planting iowa',
      'hosta walkway landscaping cedar falls',
    ],
    serviceSlug: 'landscape-installation',
    problem: [
      'The front walk sat in plain lawn. No planting to frame the entry, nothing to soften the concrete, and a path that felt like it cut through a yard instead of leading to the door.',
    ],
    property: [
      'Cedar Falls front walk with lawn on both sides, typical foundation shade for hostas, and enough width to cut beds without crowding the path.',
    ],
    workPerformed: [
      'We cut beds along the walk, prepped soil, planted hostas and flowers, added edging, and mulched so the entry is framed from the street to the door.',
    ],
    challenges: [
      'Walkway beds get compacted by foot traffic at the edge and stay wet along concrete. We kept plantings back from the walk, used shade-tolerant plants where the house throws shadow, and edged so mowing does not chew the bed.',
    ],
    result: [
      'The front walk is lined with planted, mulched beds. The entry looks finished. Same walkway planting we do in Cedar Falls when the path is there but the landscape is not.',
    ],
    relatedLearn: ['mulch-vs-rock-landscaping', 'best-grass-seed-for-iowa'],
  },
  {
    slug: 'fence-line-landscape-bed-cedar-falls',
    projectId: 'landscape-ba-5',
    title: 'Fence-Line Landscape Bed Project | Cedar Falls, IA',
    description:
      'Case study: grass along a Cedar Falls privacy fence turned into a border bed with hydrangeas and perennials.',
    h1: 'Fence-Line Landscape Bed in Cedar Falls, IA',
    keywords: [
      'fence line landscape bed cedar falls',
      'hydrangea border bed iowa',
      'privacy fence landscaping cedar falls',
    ],
    serviceSlug: 'landscape-installation',
    problem: [
      'Grass ran to the privacy fence and never looked finished. Weeds collected at the fence line, and there was no planting to give the property edge any depth.',
      'The owner wanted a border bed with hydrangeas and perennials that would read as a garden along the fence, not leftover lawn.',
    ],
    property: [
      'Cedar Falls backyard fence line with typical shade/sun mix, clay soil, and a run long enough for a continuous border bed.',
    ],
    workPerformed: [
      'We built a fence-line bed, installed hydrangeas and perennials sized for the exposure, added edging, and mulched so the property line is a planted border.',
    ],
    challenges: [
      'Fence-line beds dry out at the base of the fence and stay weedy if the edge is weak. We left working room off the fence, used plants that can take Iowa winters, and cut a mow edge so the border stays sharp.',
    ],
    result: [
      'The fence line is a planted border with hydrangeas and perennials. The yard has a finished property edge instead of grass running into the boards. This is the fence-line installation we do across Cedar Falls and Waterloo when the backyard needs a real border.',
    ],
    relatedLearn: ['mulch-vs-rock-landscaping', 'seasonal-landscape-maintenance'],
  },
]

const caseStudyBySlug = new Map(projectCaseStudies.map((study) => [study.slug, study]))
const caseStudyByProjectId = new Map(projectCaseStudies.map((study) => [study.projectId, study]))

export function getCaseStudyBySlug(slug: string): ProjectCaseStudy | undefined {
  return caseStudyBySlug.get(slug)
}

export function getCaseStudyByProjectId(projectId: string): ProjectCaseStudy | undefined {
  return caseStudyByProjectId.get(projectId)
}

export function getCaseStudyHref(projectId: string): string | undefined {
  const study = caseStudyByProjectId.get(projectId)
  return study ? `/gallery/${study.slug}` : undefined
}

export function getRelatedCaseStudies(slug: string, limit = 3): ProjectCaseStudy[] {
  const current = caseStudyBySlug.get(slug)
  if (!current) return projectCaseStudies.filter((study) => study.slug !== slug).slice(0, limit)
  const sameService = projectCaseStudies.filter(
    (study) => study.slug !== slug && study.serviceSlug === current.serviceSlug,
  )
  const others = projectCaseStudies.filter(
    (study) => study.slug !== slug && study.serviceSlug !== current.serviceSlug,
  )
  return [...sameService, ...others].slice(0, limit)
}
