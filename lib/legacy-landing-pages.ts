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
    title: 'Retaining Wall Installation Cedar Falls | Free Quote',
    description:
      'Block & stone retaining walls in Cedar Falls, IA — drainage built for Iowa freeze-thaw. Licensed since 2014. Call (319) 464-1889 for a free quote.',
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
    ogImageAlt: 'Retaining wall installation in Cedar Falls, Iowa',
    heroImage: '/images/retaining-wall.webp',
    heroImageAlt: 'Custom retaining wall installation in Cedar Falls, Iowa',
    contentImage: '/images/content-retaining-wall-cedar-falls.webp',
    contentImageAlt: 'Block retaining wall installation with tiered garden beds in Cedar Falls, Iowa',
    eyebrow: 'Service',
    h1: 'Custom Retaining Wall Installation in Cedar Falls, IA',
    heroHeading:
      'Block and natural stone walls with proper drainage for Cedar Falls slopes — built to stop erosion and create flat, usable yard space.',
    sections: [
      {
        heading: 'Retaining Wall Installation In Cedar Falls',
        paragraphs: [
          'Sloped Cedar Falls yards need retaining walls that handle runoff and freeze-thaw — not decorative stacks that bulge after the first hard winter. We build segmental block and natural stone walls with compacted bases, gravel backfill, and drain pipe so soil stays put and water moves away from your foundation.',
          'Whether you are stabilizing a hillside, terracing a garden, or reclaiming flat space for a patio, every wall is sized to your slope, soil, and height requirements. We pull permits when Cedar Falls code requires them and leave a finished look that matches your home.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Cedar Falls Homeowners Choose Us',
        paragraphs: [
          'Searching for a retaining wall contractor in Cedar Falls usually comes down to drainage experience. Walls without gravel backfill and outlet drains fail in Iowa clay. Our crew builds for the Cedar Valley climate first, then finishes the face so the wall looks intentional on your property.',
          'You get a free on-site quote, clear written pricing, and walls that turn steep ground into usable yard. See process steps and project photos on our full retaining walls page, or call (319) 464-1889 to schedule a walkthrough.',
        ],
      },
      {
        heading: 'Professional Design and Installation',
        paragraphs: [
          'Every project starts with a site evaluation: wall height, soil conditions, drainage paths, and how the finished grades will tie into your lawn or hardscape. We plan geogrid reinforcement when taller walls need it and set courses level so the face stays clean.',
          'Complementary planting beds, steps, and hardscape can be added so the wall reads as part of the landscape — not a standalone barrier. Residential and commercial properties across Cedar Falls, Waterloo, and the Cedar Valley are welcome.',
        ],
      },
    ],
    closingCopy:
      'Ready for a retaining wall that holds through Iowa winters? Request a free on-site quote and we will walk your slope with you.',
  },
  'paver-patio-installation': {
    path: '/paver-patio-installation',
    serviceSlug: 'paver-patio',
    title: 'Paver Patio Installation Cedar Falls | Free Quote',
    description:
      'Custom paver patio installation in Cedar Falls, IA. Compacted base built for Iowa freeze-thaw. Free on-site quote — call (319) 464-1889.',
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
    ogImageAlt: 'Paver patio installation in Cedar Falls, Iowa',
    heroImage: '/images/paver-patio-hero.webp',
    heroImageAlt: 'Custom paver patio installation in Cedar Falls, Iowa',
    contentImage: '/images/content-paver-patio-cedar-falls.webp',
    contentImageAlt: 'Custom paver patio installation with herringbone pattern in Cedar Falls, Iowa',
    eyebrow: 'Service',
    h1: 'Custom Paver Patio Installation in Cedar Falls',
    heroHeading:
      'Durable paver patios built for Iowa freeze-thaw, drainage, and everyday outdoor living — serving Cedar Falls, Waterloo, and the Cedar Valley.',
    sections: [
      {
        heading: 'Custom Design & Installation',
        paragraphs: [
          'We design and install paver patios around how you use your yard — dining, entertaining, or a quiet sit area — with stone, brick, or concrete pavers chosen for Iowa weather and the look of your home.',
          'Every layout accounts for grading, runoff away from the house, and clean edges that stay tight through freeze-thaw. You get a patio that looks finished on day one and stays level for years.',
        ],
        showCta: true,
      },
      {
        heading: 'Why Cedar Falls Homeowners Choose Us',
        paragraphs: [
          'Searching for a paver patio in Cedar Falls usually comes down to who builds for Iowa winters — not just who lays stone. Our crew excavates, compacts the base in lifts, sets edge restraint, and finishes joints so the patio stays level through freeze-thaw.',
          'Homeowners hire us for clear written estimates, local jobsite experience across College Hill and North Cedar, and patios that drain away from the house. Browse project photos and materials on our full paver patio page, then request a free on-site quote.',
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
          'That base-first approach is what keeps Cedar Falls patios from shifting after spring thaws and heavy rain.',
        ],
      },
      {
        heading: 'Built for Iowa Weather',
        paragraphs: [
          'Cedar Falls patios need more than pretty pavers. Proper excavation, compacted base, and drainage design prevent sinking, heaving, and joint failure through freeze-thaw cycles.',
          'We serve Cedar Falls, Waterloo, and nearby Cedar Valley communities with outdoor living spaces that add usable square footage and lasting curb appeal.',
        ],
      },
    ],
    closingCopy:
      'Ready for a patio built for Iowa weather? Request a free on-site quote and we will map the best layout for your yard.',
  },
  'cedar-falls-water-features': {
    path: '/cedar-falls-water-features',
    serviceSlug: 'ponds-water-features',
    title: 'Water Features Installation in Cedar Falls',
    description:
      'Water features installation in Cedar Falls, IA. Custom ponds, waterfalls, and pondless water gardens. Free estimates. Licensed and insured.',
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
    ogImageAlt: 'Water features installation in Cedar Falls, Iowa',
    heroImage: '/images/water-feature-image-1.webp',
    heroImageAlt: 'Custom water feature installation in Cedar Falls, Iowa',
    contentImage: '/images/content-water-features-cedar-falls.webp',
    contentImageAlt: 'Custom stone pondless waterfall installation in Cedar Falls, Iowa',
    eyebrow: 'Service',
    h1: 'Custom Water Feature Installation in Cedar Falls, IA',
    heroHeading:
      'Custom ponds, waterfalls, and pondless water gardens designed for Cedar Falls yards — built to look natural and run clean through the seasons.',
    sections: [
      {
        heading: 'Water Features',
        paragraphs: [
          'We design and install custom water features that add sound, movement, and a natural focal point to your outdoor space — from backyard ponds and cascading waterfalls to pondless streams and engineered fountains.',
          'Every feature is planned around your slope, sight lines, and how you use the yard. The goal is a system that looks intentional, circulates cleanly, and fits the rest of your landscape.',
        ],
        showCta: true,
        subsections: [
          {
            heading: 'Professional Design and Installation',
            paragraphs: [
              'Projects start with a site evaluation: soil, drainage, power access, and the best place for water to look and perform. We use quality liners, pumps, and filtration matched to Iowa conditions so the feature stays clear and manageable.',
              'Complementary stone, plantings, lighting, and hardscape help the pond or waterfall blend into the yard instead of sitting as a standalone add-on. Systems are planned with winterization and routine maintenance in mind for Cedar Falls homes and businesses.',
            ],
          },
        ],
      },
    ],
    closingCopy:
      'Ready for a pond or waterfall that fits your Cedar Falls yard? Request a free estimate and we will walk the site with you.',
    ctaEyebrow: 'Cedar Falls Water Features',
  },
}

export function getLegacyLandingPage(slug: keyof typeof legacyLandingPages) {
  return legacyLandingPages[slug]
}
