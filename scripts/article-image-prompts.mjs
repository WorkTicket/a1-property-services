/**
 * Unique photoreal scene for every learn/blog article.
 * Same subject family can appear more than once, but framing, house, season,
 * and a slug-specific beat are always different so no two files share a prompt.
 */

const STYLE =
  'Professional real estate landscaping photography, Iowa Midwest suburban residential property, natural daylight, sharp focus, realistic colors, no people, no text, no watermark, no logos, no vehicles, photorealistic'

const HOUSES = [
  'brick ranch house',
  'two-story vinyl suburban home',
  'craftsman house with a front porch',
  'white farmhouse-style home',
  'mid-century ranch with a wide chimney',
  'new construction home with dark siding',
  'classic two-story with black shutters',
  'split-level suburban house',
  'stone-and-siding Cedar Falls ranch',
  'modest one-story with a covered stoop',
]

const TIMES = [
  'golden hour side light',
  'bright late-spring afternoon',
  'soft overcast Midwest morning',
  'clear June midday with crisp shadows',
  'warm September evening light',
  'cool blue early morning light',
]

const ANGLES = [
  'low angle looking along the main feature',
  'elevated three-quarter view of the yard',
  'eye-level from the driveway approach',
  'corner view showing house and yard together',
  'tight three-quarter crop on the feature with the house behind',
  'wide establishing shot of the whole front yard',
]

const SEASONS = [
  'fresh spring growth',
  'lush early summer',
  'late summer with mature plantings',
  'early fall color in the trees',
]

/** First matching rule wins. Each rule has several distinct scenes. */
const SUBJECT_RULES = [
  {
    re: /hydroseed/,
    scenes: [
      'fresh green hydroseed slurry sprayed across a newly graded Iowa front lawn, even spray texture still visible',
      'established hydroseeded lawn with no sod seams beside a suburban house, uniform turf color',
      'hydroseeded slope in front of a ranch home, straw-colored mulch fading as grass fills in',
    ],
  },
  {
    re: /\bsod\b/,
    scenes: [
      'fresh sod rolls newly laid on an Iowa lawn, visible seams, deep green turf',
      'recently installed sod lawn with staggered seams, watered and tight against a sidewalk',
      'crew-finished sod installation wrapping a curved bed, instant green lawn',
    ],
  },
  {
    re: /retaining.?wall|block wall|poured concrete|sloped yard|erosion|step.retaining/,
    scenes: [
      'tan segmental block retaining wall terracing a sloped Iowa front yard, level lawn above the wall',
      'taller charcoal block retaining wall along a driveway cut, gravel backfill just visible at the cap',
      'low garden retaining wall creating a planting bed, capstones aligned, perennials on the terrace',
      'two-tier retaining wall with stairs between levels, graded backyard, Iowa suburban lot',
      'natural-looking block wall holding a hillside next to a patio pad, clean joints and drainage outlets',
    ],
  },
  {
    re: /driveway/,
    scenes: [
      'interlocking paver driveway in a herringbone pattern leading to a garage, crisp edge restraint',
      'wide paver driveway replacing a former concrete slab, mixed charcoal and tan pavers',
      'curved paver driveway with soldier-course border, suburban Iowa house in background',
    ],
  },
  {
    re: /walkway|path/,
    scenes: [
      'natural stone walkway from sidewalk to front door, irregular flagstone, moss-free joints',
      'paver walkway with a soldier-course border through planting beds',
      'bluestone path through a front garden, tight joints, Iowa ranch behind',
    ],
  },
  {
    re: /patio|paver/,
    scenes: [
      'rectangular paver patio with a fire pit in the center, furniture-ready empty surface',
      'herringbone paver patio off a back sliding door, polymeric joints, edge restraint',
      'natural flagstone patio with a low seat wall, mixed stone colors',
      'small breakfast paver patio with a gravel border and planted pots left empty',
      'large entertaining patio with a built-in seat wall, Iowa backyard, no furniture clutter',
    ],
  },
  {
    re: /pond|waterfall|water feature/,
    scenes: [
      'backyard pond with a stacked-stone waterfall, clear water, surrounding boulders and hostas',
      'pondless waterfall spilling over dark rock into a gravel basin, mulched beds around it',
      'kidney-shaped garden pond with a small stream, lily pads, stone coping',
    ],
  },
  {
    re: /fire pit|fireplace|outdoor kitchen|pergola|outdoor living|outdoor space/,
    scenes: [
      'paver patio with a round stone fire pit and empty built-in benches',
      'outdoor kitchen island in tan block with a grill niche, paver floor, pergola posts behind',
      'cedar pergola over a paver patio, climbing vines just starting, Iowa backyard',
      'masonry outdoor fireplace at the end of a patio, stone hearth, evening-ready empty space',
    ],
  },
  {
    re: /stump|tree removal|tree disease/,
    scenes: [
      'freshly cut tree stump in an Iowa backyard with wood chips around it, neighboring mature trees',
      'open lawn gap where a large tree was removed, grindings mixed into soil, house in background',
      'diseased ash tree with thinning canopy in a front yard, lawn otherwise maintained',
    ],
  },
  {
    re: /tree plant|planting trees|evergreen/,
    scenes: [
      'newly planted shade tree with a wide mulch ring and staking, young canopy',
      'row of young evergreens screening a property line, dark mulch, Iowa sky',
      'specimen ornamental tree just planted in a front yard bed, water ring in the mulch',
    ],
  },
  {
    re: /prun|hedge|tree service/,
    scenes: [
      'freshly pruned foundation hedge with crisp geometric lines along a ranch house',
      'mature shade tree with cleanly lifted canopy over a lawn, professional pruning cuts healed',
      'shaped yew shrubs along a front walk after a hedge trim, clippings cleared',
    ],
  },
  {
    re: /shrub|foundation plant/,
    scenes: [
      'new foundation shrub planting with boxwood and hydrangeas, fresh dark mulch, clean bed edge',
      'layered foundation bed with evergreen shrubs and flowering spirea, Iowa brick ranch',
      'just-installed shrubs in a curved bed, still small, evenly spaced, mulch rings',
    ],
  },
  {
    re: /mulch/,
    scenes: [
      'fresh shredded hardwood mulch in a curved landscape bed, two-inch depth, clean spade-cut edge',
      'cedar mulch around hostas and ornamental grasses, even coverage, no bare soil',
      'dark dyed mulch refresh in existing beds, lawn edge razor-sharp',
    ],
  },
  {
    re: /rock|boulder/,
    scenes: [
      'decorative river rock bed with a few glacial boulders, drought-tolerant plantings',
      'boulder accent grouping in a front yard, ornamental grasses, Iowa sky',
      'dry creek bed of river rock winding through a side yard, no standing water',
    ],
  },
  {
    re: /excav/,
    scenes: [
      'freshly excavated landscape bed with stacked topsoil nearby, marked grade stakes, no equipment',
      'open excavation for a patio base, compacted subgrade visible, house foundation in frame',
    ],
  },
  {
    re: /french drain|yard flood|standing water|wet yard|drainage|rain garden/,
    scenes: [
      'French drain trench backfilled with washed gravel, pop-up emitter in the lawn beyond',
      'regraded Iowa yard sloping away from the foundation, dry lawn after a design for drainage',
      'rain garden depression planted with natives, river rock inlet, no standing water',
      'catch basin in a low corner of a lawn, grate flush, surrounding turf healthy',
    ],
  },
  {
    re: /\bgrad(e|ing)\b/,
    scenes: [
      'freshly graded and raked Iowa front yard with smooth soil, ready for seed, house behind',
      'regraded side yard with a consistent slope away from the foundation, straw on soil',
    ],
  },
  {
    re: /winteriz|winter landscap/,
    scenes: [
      'dormant Iowa landscape beds after fall cleanup, fresh mulch blanket, evergreens along a ranch house',
      'late-fall front yard with perennials cut back, burlap on a young tree, no snow yet',
    ],
  },
  {
    re: /snow/,
    scenes: [
      'cleared Iowa residential driveway after snowfall, neat snow banks, no cars',
      'commercial parking lot with clean plow lines and stacked snow at the edges, no vehicles',
      'shoveled front walk and steps of a ranch home, snow piled off the landscape beds',
    ],
  },
  {
    re: /commercial/,
    scenes: [
      'small commercial storefront with crisp lawn, mulched beds, and a paver walk, no signage text',
      'office-park planting island with ornamental grasses and river rock, empty parking stalls cropped out',
    ],
  },
  {
    re: /lighting/,
    scenes: [
      'path lights along a paver walk at dusk, warm glow on stone, house porch in background',
      'uplighting on a mature oak in a front yard at twilight, beds mulched, no visible fixtures clutter',
    ],
  },
  {
    re: /native plant|perennial|flower|shade garden|drought/,
    scenes: [
      'Iowa native perennial garden with coneflower, black-eyed susan, and ornamental grass',
      'shade garden under a maple with hostas, ferns, and dark mulch',
      'drought-tolerant front bed with sedum, little bluestem, and gravel mulch',
      'flowering shrub border in peak bloom along a fence line, Iowa sky',
    ],
  },
  {
    re: /lawn|grass|mow|aera|fertil|weed|disease/,
    scenes: [
      'thick Iowa cool-season lawn with crisp mowing stripes, clean sidewalk edge',
      'core aeration plugs scattered across a green lawn, early fall light',
      'lawn with a repaired bare patch of new grass beside mature turf',
      'deep green fertilized lawn next to a mulched bed, razor edging',
    ],
  },
  {
    re: /design|consult|estimate|hire|budget|timeline|phase|warranty|roi|faq|compan/,
    scenes: [
      'finished full-yard landscape with beds, lawn, and a small patio, design looking intentional',
      'front-yard makeover with curved beds, specimen tree, and fresh mulch, curb appeal shot',
      'clipboard and rolled site plan on a patio table overlooking a completed Iowa backyard, no readable text',
      'before-the-work-is-old feeling avoided: a polished completed landscape ready for a client walkthrough',
    ],
  },
  {
    re: /install|landscape/,
    scenes: [
      'complete residential landscape installation with new beds, shrubs, mulch, and lawn',
      'front entry garden with layered plantings and a paver walk to the door',
      'backyard landscape with mixed beds wrapping a lawn panel, Iowa suburban fence',
    ],
  },
]

function hashString(value) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function pick(list, hash, salt = 0) {
  return list[(hash + salt) % list.length]
}

function subjectScene(haystack, hash) {
  for (const rule of SUBJECT_RULES) {
    if (rule.re.test(haystack)) return pick(rule.scenes, hash, 11)
  }
  return pick(SUBJECT_RULES[SUBJECT_RULES.length - 1].scenes, hash, 11)
}

export function articleFilename(kind, slug) {
  return `article-${kind}-${slug}.webp`
}

export function buildArticlePrompt({ kind, slug, title }) {
  const hash = hashString(`${kind}:${slug}`)
  const haystack = `${slug} ${title}`.toLowerCase().replace(/-/g, ' ')
  const scene = subjectScene(haystack, hash)
  const house = pick(HOUSES, hash, 3)
  const time = pick(TIMES, hash, 7)
  const angle = pick(ANGLES, hash, 13)
  const season = pick(SEASONS, hash, 19)

  return [
    scene,
    `at a ${house} in Cedar Falls, Iowa`,
    angle,
    time,
    season,
    `unique composition for the article "${title}"`,
    STYLE,
  ].join(', ')
}

export function articleAlt(title) {
  return `${title} — landscaping in Cedar Falls, Iowa`
}
