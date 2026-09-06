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
