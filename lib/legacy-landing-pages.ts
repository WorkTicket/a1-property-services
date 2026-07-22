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
    title: 'Retaining Walls in Cedar Falls, IA | Free On-Site Quote',
    description:
      'Retaining wall contractors in Cedar Falls, IA — block & stone with drainage for Iowa freeze-thaw. Free on-site quote. Call (319) 464-1889.',
    keywords: [
      'retaining wall cedar falls',
      'retaining wall installation cedar falls',
      'retaining walls cedar falls',
      'retaining walls cedar falls ia',
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
      'Block and natural stone walls with proper drainage for local slopes — stop erosion and reclaim flat, usable yard space.',
    sections: [
      {
        heading: 'Retaining Wall Installation Built for Iowa',
        paragraphs: [
          'Sloped yards need retaining walls that handle runoff and freeze-thaw — not decorative stacks that bulge after the first hard winter. We build segmental block and natural stone walls with compacted bases, gravel backfill, and drain pipe so soil stays put and water moves away from your foundation.',
          'Whether you are stabilizing a hillside, terracing a garden, or reclaiming flat space for a patio, every wall is sized to your slope, soil, and height requirements. We pull permits when local code requires them and leave a finished look that matches your home.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Local Homeowners Choose Us',
        paragraphs: [
          'Searching for a retaining wall contractor usually comes down to drainage experience. Walls without gravel backfill and outlet drains fail in Iowa clay. Our crew builds for the Cedar Valley climate first, then finishes the face so the wall looks intentional on your property.',
          'You get a free on-site quote, clear written pricing, and walls that turn steep ground into usable yard. Call (319) 464-1889 to schedule a walkthrough.',
        ],
      },
      {
        heading: 'Professional Design and Installation',
        paragraphs: [
          'Every project starts with a site evaluation: wall height, soil conditions, drainage paths, and how the finished grades will tie into your lawn or hardscape. We plan geogrid reinforcement when taller walls need it and set courses level so the face stays clean.',
          'Complementary planting beds, steps, and hardscape can be added so the wall reads as part of the landscape — not a standalone barrier. Residential and commercial properties across the Cedar Valley are welcome.',
        ],
      },
    ],
    closingCopy:
      'Ready for a retaining wall that holds through Iowa winters? Request a free on-site quote and we will walk your slope with you.',
  },
  'paver-patio-installation': {
    path: '/paver-patio-installation',
    serviceSlug: 'paver-patio',
    title: 'Paver Patio Cedar Falls, IA | Free On-Site Quote',
    description:
      'Paver patio installation in Cedar Falls, IA — compacted base built for Iowa freeze-thaw. Free on-site quote. Call (319) 464-1889.',
    keywords: [
      'paver patio cedar falls',
      'paver patio installation cedar falls',
      'paver patios cedar falls',
      'paver patio cedar falls ia',
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
    h1: 'Paver Patio Installation in Cedar Falls, IA',
    heroHeading:
      'Durable paver patios built for Iowa freeze-thaw, drainage, and everyday outdoor living across the Cedar Valley.',
    sections: [
      {
        heading: 'Custom Paver Patio Design & Installation',
        paragraphs: [
          'We design and install paver patios around how you use your yard — dining, entertaining, or a quiet sit area — with stone, brick, or concrete pavers chosen for Iowa weather and the look of your home.',
          'Every layout accounts for grading, runoff away from the house, and clean edges that stay tight through freeze-thaw. You get a patio that looks finished on day one and stays level for years.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Local Homeowners Choose Us',
        paragraphs: [
          'Searching for a paver patio usually comes down to who builds for Iowa winters — not just who lays stone. Our crew excavates, compacts the base in lifts, sets edge restraint, and finishes joints so the patio stays level through freeze-thaw.',
          'Homeowners hire us for clear written estimates, local jobsite experience across College Hill and North Cedar, and patios that drain away from the house. Request a free on-site quote to get started.',
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
          'We serve homes across the Cedar Valley with outdoor living spaces that add usable square footage and lasting curb appeal.',
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
      'Ponds, waterfalls & pondless water features in Cedar Falls, IA — built for Iowa winters. Free estimate. Call (319) 464-1889.',
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
      'Custom ponds, waterfalls, and pondless water gardens for local yards — built to look natural and run clean through Iowa seasons.',
    sections: [
      {
        heading: 'Water Features for Cedar Valley Yards',
        paragraphs: [
          'We design and install custom water features that add sound, movement, and a natural focal point — from backyard ponds and cascading waterfalls to pondless streams and bubbling boulders across the Cedar Valley.',
          'Every feature is planned around your slope, sight lines, and how you use the yard. The goal is a system that looks intentional, circulates cleanly, and fits the rest of your landscape.',
        ],
        showCta: true,
      },
      {
        heading: 'Ponds, Waterfalls & Pondless Options',
        paragraphs: [
          'Not every yard needs a full pond. Pondless waterfalls give you the sight and sound of moving water with less maintenance — ideal for smaller lots. Koi ponds and water gardens suit homeowners who want plants, fish, and a living ecosystem.',
          'We size pumps, filtration, and stonework to your space and budget, then integrate plantings and lighting so the feature feels like part of the yard — not a bolted-on add-on.',
        ],
        bulletsIntro: 'Popular installs across the Cedar Valley:',
        bullets: [
          'Pondless waterfalls and streams',
          'Koi ponds and water gardens',
          'Bubbling boulders and fountain features',
          'Multi-tiered natural stone waterfalls',
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
          'Ask about ongoing maintenance when you request your free estimate — we can include seasonal service so you are not left guessing about algae, pumps, or freeze prep.',
        ],
      },
      {
        heading: 'Water Feature Maintenance',
        paragraphs: [
          'A beautiful water feature only stays that way with simple seasonal care. We offer opening and closing, cleaning, debris removal, and filter checks so ponds and waterfalls keep running clear through Cedar Valley summers and shut down safely for winter.',
          'Whether we installed your feature or you inherited one with the house, request a free quote and tell us what you need — one-time cleanup or a seasonal plan.',
        ],
        showCta: true,
      },
    ],
    closingCopy:
      'Ready for a pond or waterfall that fits your yard? Request a free estimate and we will walk the site with you.',
    ctaEyebrow: 'Cedar Valley Water Features',
  },
}

export function getLegacyLandingPage(slug: keyof typeof legacyLandingPages) {
  return legacyLandingPages[slug]
}
