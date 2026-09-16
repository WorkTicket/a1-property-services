export type LegacyLandingSubsection = {
  heading: string
  paragraphs: string[]
}

export type LegacyLandingSection = {
  heading: string
  paragraphs: string[]
  paragraphsAfter?: string[]
  bullets?: string[]
  bulletsIntro?: string
  subsections?: LegacyLandingSubsection[]
  showCta?: boolean
}

export type LegacyLandingPage = {
  path: string
  serviceSlug: string
  title: string
  description: string
  keywords: string[]
  ogImage: string
  ogImageAlt: string
  heroImage: string
  heroImageAlt: string
  contentImage: string
  contentImageAlt: string
  eyebrow: string
  h1: string
  heroHeading: string
  sections: LegacyLandingSection[]
  closingCopy: string
  ctaEyebrow?: string
}

export const legacyLandingPages: Record<string, LegacyLandingPage> = {
  'retaining-wall-in-cedar-falls': {
    path: '/retaining-wall-in-cedar-falls',
    serviceSlug: 'retaining-walls',
    title: 'Retaining Walls Cedar Falls, IA | Design & Install',
    description:
      'Retaining wall contractors in Cedar Falls, IA: design and install block & stone with drainage for Iowa freeze-thaw. Free quote: (319) 464-1889.',
    keywords: [
      'retaining wall cedar falls',
      'retaining wall installation cedar falls',
      'retaining walls cedar falls',
      'retaining walls cedar falls ia',
      'retaining wall waterloo ia',
      'retaining wall contractors waterloo ia',
      'stone retaining wall cedar falls',
      'block retaining wall cedar falls',
      'retaining wall contractor cedar falls',
      'erosion control cedar falls',
    ],
    ogImage: '/images/retaining-wall.webp',
    ogImageAlt: 'Retaining wall installation',
    heroImage: '/images/retaining-wall.webp',
    heroImageAlt: 'Custom retaining wall installation',
    contentImage: '/images/content-retaining-wall-cedar-falls.webp',
    contentImageAlt: 'Block retaining wall installation with tiered garden beds',
    eyebrow: 'Cedar Falls, Iowa',
    h1: 'Retaining Walls in Cedar Falls, IA',
    heroHeading:
      'Retaining wall design and installation for Cedar Falls slopes: block and stone with drainage, so you stop erosion and reclaim flat yard.',
    sections: [
      {
        heading: 'Retaining Wall Installation Built for Iowa',
        paragraphs: [
          'Sloped yards need retaining walls that handle runoff and freeze-thaw, not decorative stacks that bulge after the first hard winter. Local contractors who design the wall for your grade, then build segmental block or natural stone with compacted bases, gravel backfill, and drain pipe, are the ones whose walls still stand.',
          'Whether you are stabilizing a hillside, terracing a garden, or reclaiming flat space for a patio, every wall is sized to your slope, soil, and height requirements. We flag permit and engineering needs during the on-site estimate: city rules can change, so confirm the height trigger with Cedar Falls or Waterloo before construction.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Local Homeowners Choose Us',
        paragraphs: [
          'Searching for a retaining wall contractor usually comes down to drainage experience. Walls without gravel backfill and outlet drains fail in Iowa clay. Our crew builds for Black Hawk County freeze-thaw first, then finishes the face so the wall looks intentional on your property.',
          'You get a free on-site quote, clear written pricing, and walls that turn steep ground into usable yard. We serve Cedar Falls, Waterloo, and Black Hawk County. Call (319) 464-1889 to schedule a walkthrough.',
        ],
      },
      {
        heading: 'Types of Retaining Walls We Build',
        paragraphs: [
          'We install segmental concrete block retaining walls that actually hold soil in Iowa clay, not decorative stacks. Every wall gets a compacted base, gravel backfill, and drain pipe so freeze-thaw does not bulge the face. Natural stone is available as a premium option when you want a more organic face.',
        ],
        bulletsIntro: 'What we install in Cedar Falls and Waterloo:',
        bullets: [
          'Segmental block walls: interlocking concrete units engineered for soil retention, including systems such as Keystone and Versa-Lok when the site calls for them',
          'Natural stone as a premium option for a more organic face',
          'Geogrid reinforcement when height and load require it',
        ],
        paragraphsAfter: [
          'Taller walls and walls near property lines may need engineered plans. We do not install timber, boulder, or poured-concrete retaining walls. If a timber wall on your property is failing, we can replace it with segmental block, or natural stone as a premium face.',
        ],
      },
      {
        heading: 'What to Expect on a Retaining Wall Project',
        paragraphs: [
          'Every project starts with a site evaluation: wall height, soil conditions, drainage paths, and how the finished grades will tie into your lawn, patio, or driveway. We plan geogrid when taller walls need it and set courses level so the face stays clean.',
        ],
        bulletsIntro: 'A typical wall sequence:',
        bullets: [
          'On-site walkthrough and written estimate',
          'Permits and engineered plans when local code requires them for taller walls',
          'Excavation and compacted aggregate base',
          'Segmental block courses (or natural stone as a premium face) with gravel backfill and drain pipe',
          'Caps, backfill, and finish grading',
          'Walkthrough before we leave the site',
        ],
        paragraphsAfter: [
          'Complementary planting beds, steps, and hardscape (including paver patios and paver driveways) can be added so the wall reads as part of the landscape, not a standalone barrier.',
        ],
      },
    ],
    closingCopy:
      'Ready for a retaining wall that holds through Iowa winters? Request a free on-site quote and we will walk your slope with you.',
  },
  'paver-patio-installation': {
    path: '/paver-patio-installation',
    serviceSlug: 'paver-patio',
    title: 'Custom Patio Cedar Falls, IA | Paver Installation',
    description:
      'Custom patio installation in Cedar Falls, IA: pavers on a compacted base built for Iowa freeze-thaw. Free on-site quote: (319) 464-1889.',
    keywords: [
      'custom patio cedar falls ia',
      'custom patio cedar falls',
      'paver patio cedar falls',
      'paver patio installation cedar falls',
      'paver patios cedar falls',
      'paver patio cedar falls ia',
      'paver patio waterloo ia',
      'patio installation cedar falls',
      'backyard patio cedar falls',
      'hardscape patio cedar falls',
      'paver patio contractor cedar falls',
    ],
    ogImage: '/images/paver-patio-hero.webp',
    ogImageAlt: 'Paver patio installation',
    heroImage: '/images/paver-patio-hero.webp',
    heroImageAlt: 'Custom paver patio installation',
    contentImage: '/images/content-paver-patio-cedar-falls.webp',
    contentImageAlt: 'Custom paver patio installation with herringbone pattern',
    eyebrow: 'Cedar Falls, Iowa',
    h1: 'Custom Paver Patio Installation in Cedar Falls, IA',
    heroHeading:
      'Custom patios in Cedar Falls, IA: pavers on a compacted base built for freeze-thaw, drainage, and everyday outdoor living.',
    sections: [
      {
        heading: 'Custom Paver Patio Design & Installation',
        paragraphs: [
          'A custom patio in Cedar Falls should fit how you actually use the yard (dining, entertaining, or a quiet sit area) with stone, brick, or concrete pavers chosen for Iowa weather and the look of your home.',
          'Every layout accounts for grading, runoff away from the house, and clean edges that stay tight through freeze-thaw. You get a patio that looks finished on day one and stays level for years.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Local Homeowners Choose Us',
        paragraphs: [
          'Searching for a paver patio usually comes down to who builds for Iowa winters, not just who lays stone. Our crew excavates, compacts the base in lifts, sets edge restraint, and finishes joints so the patio stays level through freeze-thaw.',
          'Homeowners hire us for clear written estimates, local jobsite experience across College Hill and North Cedar, and patios that drain away from the house. Request a free on-site quote to get started.',
        ],
      },
      {
        heading: 'Types of Paver Patios We Build',
        paragraphs: [
          'A Cedar Falls patio should match how you use the yard and the look of the house, not a one-pattern slab. We install concrete pavers as the workhorse, with clay brick and natural stone when the site and budget call for them.',
        ],
        bulletsIntro: 'Common patio builds in Cedar Falls and Waterloo:',
        bullets: [
          'Concrete pavers in running bond, herringbone, or basket weave',
          'Clay brick pavers for a classic look next to brick homes',
          'Natural stone (flagstone or bluestone) for an irregular, high-end surface',
          'Patios with steps, seat walls, fire pits, or outdoor kitchen pads planned into the base',
        ],
        paragraphsAfter: [
          'Herringbone locks better under load. Running bond is clean on smaller rectangles. Curves need more cuts. We help you pick the pattern before the first paver goes down so the patio is sized for furniture, not a number that sounded good on the phone.',
        ],
      },
      {
        heading: 'Our Process',
        paragraphs: [
          'We start with a site assessment and simple design plan: grade, soil, drainage, and how the patio ties into your lawn or hardscape. Planning first keeps surprises off the jobsite.',
        ],
        bulletsIntro: 'Every patio is built with a proven sequence:',
        bullets: [
          'Site evaluation and layout planning',
          'Excavation and grading for drainage',
          'Compacted aggregate base',
          'Precise paver placement and leveling',
          'Edge restraints for long-term stability',
          'Joint sand finishing',
        ],
        paragraphsAfter: [
          'That base-first approach is what keeps local patios from shifting after spring thaws and heavy rain.',
        ],
      },
      {
        heading: 'Built for Iowa Weather',
        paragraphs: [
          'Local patios need more than pretty pavers. Proper excavation, compacted base, and drainage design prevent sinking, heaving, and joint failure through freeze-thaw cycles.',
          'We serve Cedar Falls, Waterloo, and Black Hawk County homeowners with outdoor living spaces that add usable square footage and lasting curb appeal. Pair a patio with a retaining wall, a matching paver driveway, or full landscaping when you are ready to do more than one surface.',
        ],
      },
    ],
    closingCopy:
      'Ready for a patio built for Iowa weather? Request a free on-site quote and we will map the best layout for your yard.',
  },
  'cedar-falls-water-features': {
    path: '/cedar-falls-water-features',
    serviceSlug: 'ponds-water-features',
    title: 'Ponds & Water Features Cedar Falls, IA | Free Quote',
    description:
      'Ponds, waterfalls & pondless water features in Cedar Falls, IA: built for Iowa winters. Free estimate. Call (319) 464-1889.',
    keywords: [
      'water features cedar falls',
      'water feature cedar falls',
      'water features installation cedar falls',
      'ponds cedar falls',
      'waterfall installation cedar falls',
      'koi pond cedar falls',
      'pondless waterfall cedar falls',
      'backyard water features cedar falls',
    ],
    ogImage: '/images/water-feature-image-1.webp',
    ogImageAlt: 'Water features installation',
    heroImage: '/images/water-feature-image-1.webp',
    heroImageAlt: 'Custom water feature installation',
    contentImage: '/images/content-water-features-cedar-falls.webp',
    contentImageAlt: 'Custom stone pondless waterfall installation',
    eyebrow: 'Cedar Falls, Iowa',
    h1: 'Ponds & Water Features in Cedar Falls, IA',
    heroHeading:
      'Custom ponds, waterfalls, and pondless water gardens for local yards: built to look natural and run clean through Iowa seasons.',
    sections: [
      {
        heading: 'Water Features for Cedar Falls & Waterloo Yards',
        paragraphs: [
          'We design and install custom water features that add sound, movement, and a natural focal point, from backyard ponds and cascading waterfalls to pondless streams and bubbling boulders in Cedar Falls, Waterloo, and Black Hawk County.',
          'Every feature is planned around your slope, sight lines, and how you use the yard. The goal is a system that looks intentional, circulates cleanly, and fits the rest of your landscape.',
        ],
        showCta: true,
      },
      {
        heading: 'Types of Water Features We Build',
        paragraphs: [
          'Not every yard needs a full pond. We design the feature around your slope, sight lines, kids and pets, and how much seasonal care you actually want, then size pumps, filtration, and stonework to match.',
        ],
        bulletsIntro: 'What we install in Cedar Falls and Waterloo:',
        bullets: [
          'Pondless waterfalls and streams: moving water with a hidden reservoir, less open water to maintain',
          'Koi ponds and water gardens: depth, filtration, and a winter plan for fish and plants',
          'Bubbling boulders and fountain features for smaller lots',
          'Multi-tiered natural stone waterfalls',
        ],
        paragraphsAfter: [
          'We work around existing plants and hardscape, and we can tie a feature into a paver patio or planting bed so it reads as part of the yard. If you inherited a leaking pond with the house, we can quote a rebuild or seasonal cleanup instead of a brand-new install.',
        ],
      },
      {
        heading: 'How We Build Water Features',
        paragraphs: [
          'Projects start with an on-site walkthrough in your community: soil, drainage, power access, and the best place for water to look and perform. We mark the layout, confirm liner and pump sizing, then excavate and set stone so the feature sheds water cleanly.',
        ],
        bulletsIntro: 'A typical install sequence:',
        bullets: [
          'Site evaluation and design plan',
          'Excavation and reservoir or pond shell',
          'Liner, plumbing, and pump setup',
          'Natural stone placement and edging',
          'Plantings, lighting, and startup',
          'Walkthrough and seasonal care tips',
        ],
        paragraphsAfter: [
          'That planning-first approach keeps Iowa clay and freeze-thaw from turning a new feature into a muddy repair the following spring.',
        ],
      },
      {
        heading: 'Built for Iowa Winters',
        paragraphs: [
          'Iowa freeze-thaw is hard on liners, pumps, and edges that were never planned for winter. We use quality liners and equipment rated for cold climates, design with winterization in mind, and offer seasonal opening and closing so your feature starts clean each spring.',
          'Ask about ongoing maintenance when you request your free estimate. We can include seasonal service so you are not left guessing about algae, pumps, or freeze prep. Typical backyard features rarely need a building permit; electrical work should be done to code, and we call locates before we dig. Confirm setbacks on small lots during the walkthrough.',
        ],
      },
      {
        heading: 'Water Feature Maintenance',
        paragraphs: [
          'A beautiful water feature only stays that way with simple seasonal care. We offer opening and closing, cleaning, debris removal, and filter checks so ponds and waterfalls keep running clear through Iowa summers and shut down safely for winter.',
          'Whether we installed your feature or you inherited one with the house, request a free quote and tell us what you need: one-time cleanup or a seasonal plan.',
        ],
        showCta: true,
      },
    ],
    closingCopy:
      'Ready for a pond or waterfall that fits your yard? Request a free estimate and we will walk the site with you.',
    ctaEyebrow: 'Cedar Falls Water Features',
  },
  'paver-driveway-cedar-falls': {
    path: '/paver-driveway-cedar-falls',
    serviceSlug: 'paver-driveway',
    title: 'Paver Driveway Cedar Falls, IA | Installation & Free Quote',
    description:
      'Paver driveway Cedar Falls, IA: interlocking pavers on a vehicle-depth base built for Iowa freeze-thaw. Replace cracked concrete or asphalt. Free quote: (319) 464-1889.',
    keywords: [
      'paver driveway cedar falls',
      'paver driveway cedar falls ia',
      'paver driveways cedar falls',
      'paver driveway installation cedar falls',
      'brick paver driveway cedar falls',
      'replace concrete driveway cedar falls',
      'paver driveway waterloo ia',
    ],
    ogImage: '/images/driveway-after-2.webp',
    ogImageAlt: 'Paver driveway installation',
    heroImage: '/images/driveway-after-2.webp',
    heroImageAlt: 'Custom paver driveway installation in Cedar Falls, Iowa',
    contentImage: '/images/driveway-after-1.webp',
    contentImageAlt: 'Custom paver driveway with interlocking pattern',
    eyebrow: 'Cedar Falls, Iowa',
    h1: 'Paver Driveway in Cedar Falls, IA',
    heroHeading:
      'Paver driveway Cedar Falls homeowners hire us for: a deeper compacted base, interlocking pavers built for vehicles, and a surface that flexes through Iowa freeze-thaw instead of cracking like another poured slab.',
    sections: [
      {
        heading: 'Replace Cracked Concrete or Worn Asphalt',
        paragraphs: [
          'A Cedar Falls driveway that is heaved, stained, or dumping water toward the garage is not a cosmetic problem. Concrete slabs crack in freeze-thaw. Asphalt softens in summer heat and needs sealing. Patching buys time, then the same joints open again. A paver driveway is the replacement: excavate deeper for vehicle loads, compact crushed aggregate in lifts, set rigid edge restraint, and lay interlocking units so the surface stays level under daily cars and trucks.',
          'We build paver driveways for Cedar Falls, Waterloo, and Black Hawk County homeowners, including College Hill, North Cedar, and South Cedar Falls lots where access is tight and the existing apron is failing. You get a free on-site quote, a written scope that includes base depth, and a driveway that can be repaired one paver at a time if utilities ever need to come up.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Pavers vs. Asphalt or Concrete',
        paragraphs: [
          'Asphalt is cheaper up front and softer in summer. Concrete looks clean until freeze-thaw opens control joints into real cracks, and patches never match. Pavers cost more to install because the base is deeper than a patio, typically 12 to 18 inches of compacted aggregate, not a few inches of gravel under a pretty top.',
          'The payoff is a system of small units. Individual pieces can be replaced. Utilities can be accessed without a saw-cut scar. Herringbone spreads tire load. Edge restraint keeps the field from unraveling when you turn into the garage. Over many Iowa winters, that is a different product than another overlay on a failed base.',
        ],
      },
      {
        heading: 'Types of Paver Driveways We Build',
        paragraphs: [
          'Driveway pavers are a different product than patio pavers even when they look similar. We specify vehicular-rated units, a pattern that locks under load, and borders that hold the field.',
        ],
        bulletsIntro: 'Common driveway builds in Cedar Falls and Waterloo:',
        bullets: [
          'Concrete interlocking pavers in herringbone: our usual recommendation under cars and trucks',
          'Clay brick pavers when you want a classic brick approach that holds color in Iowa sun',
          'Decorative borders and soldier courses that finish the edge and keep the field tight',
          'Full replacement of cracked concrete or worn asphalt, including garage aprons',
        ],
        paragraphsAfter: [
          'Running bond can work for light-use areas. Herringbone is stronger for daily vehicle traffic. We can match driveway pavers to a patio or walk so the hardscape reads as one system. If you want to phase driveway this year and patio next year, we lock the paver and pattern now so the color still matches.',
        ],
      },
      {
        heading: 'What to Expect on a Paver Driveway Project',
        paragraphs: [
          'Every driveway starts with a site visit: slope to the garage, soil, tree roots, and how you will park during construction. We do not quote a square-foot number from a photo. Tight older Cedar Falls lots mean more hand work. Wider Waterloo lots with truck access go faster. Either way, the base is built for vehicles, not copied from a patio spec.',
        ],
        bulletsIntro: 'A typical install sequence:',
        bullets: [
          'On-site evaluation, layout, and written estimate',
          'Flag work that may need a city permit: widening, changing the street approach, or working in the right-of-way',
          'Removal of existing concrete or asphalt and haul-off',
          'Excavation 12 to 18 inches and compacted aggregate in lifts',
          'Heavy-duty edge restraint, sand bed, and paver placement',
          'Polymeric joint sand, compaction, and optional sealer',
        ],
        paragraphsAfter: [
          'Most residential paver driveway projects take one to three weeks depending on size, pattern, and demolition. We give you a clear timeline during the free estimate. Planning a retaining wall, matching patio, or full landscaping at the same time? We will sequence the work so grades and drainage tie together.',
        ],
      },
    ],
    closingCopy:
      'Ready for a paver driveway built for Iowa winters and daily vehicles? Request a free on-site quote and we will measure the drive, check the pitch at the garage, and put the base spec in writing.',
    ctaEyebrow: 'Cedar Falls Paver Driveways',
  },
}

export function getLegacyLandingPage(slug: keyof typeof legacyLandingPages) {
  return legacyLandingPages[slug]
}
