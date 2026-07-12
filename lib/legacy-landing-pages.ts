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
    title: 'Retaining Wall Installation Cedar Falls, IA | Free Quote',
    description:
      'Retaining wall installation in Cedar Falls, IA. Block and natural stone walls with proper drainage for Iowa slopes. Free estimates. Licensed and insured.',
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
    heroHeading: 'Durable Materials for Long-Lasting Results',
    sections: [
      {
        heading: 'Retaining Wall Installation In Cedar Falls',
        paragraphs: [
          'We provide custom-built solutions designed to improve the beauty, safety, and functionality of your property. From durable stone, brick, and concrete construction to engineered landscape support systems, our team delivers long-lasting results tailored to your site. Each project is designed around your property\u2019s specific slope, soil conditions, drainage needs, and overall visual goals.',
          'These structures do more than enhance curb appeal. They help control erosion, manage elevation changes, and protect surrounding landscaping. Whether you\u2019re stabilizing a hillside, creating tiered garden areas, or defining outdoor living spaces, our solutions balance structural strength with clean, attractive design that blends naturally into your property.',
        ],
        showCta: true,
      },
      {
        heading: 'Professional Design and Installation',
        paragraphs: [
          'Every project begins with a detailed site evaluation and design plan to ensure the finished structure meets both functional and aesthetic objectives. Using high-quality materials and proven construction methods, we build systems that stand up to Iowa\u2019s changing weather conditions. Precision installation and attention to detail ensure dependable performance and a polished final result.',
          'To complete the look, we can incorporate complementary elements such as planting beds, decorative stone features, and integrated hardscaping. These additions allow your new landscape support system to enhance both usability and visual appeal.',
          'We focus on durability and long-term value. Our solutions are built to require minimal maintenance while improving property stability and appearance. Whether for residential or commercial properties in the Cedar Falls area, we deliver reliable, well-crafted results that add lasting value and confidence to your outdoor space.',
        ],
      },
    ],
    closingCopy:
      'Ready to transform your outdoor space? Our team is here to bring your landscaping dreams to life.',
  },
  'paver-patio-installation': {
    path: '/paver-patio-installation',
    serviceSlug: 'paver-patio',
    title: 'Paver Patio Installation Cedar Falls | Free Quote',
    description:
      'Custom paver patio installation in Cedar Falls, IA. Built for Iowa freeze-thaw. Call (319) 464-1889 for a free estimate.',
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
      'We design and install high-quality patios built for durability, drainage performance, and long-term outdoor living. Serving Cedar Falls, Waterloo, and the surrounding Cedar Valley areas, we create outdoor spaces that improve both function and property value.',
    sections: [
      {
        heading: 'Custom Design & Installation',
        paragraphs: [
          'We focus on creating functional and visually appealing outdoor living spaces tailored to your property.',
          'We work with premium stone, brick, and concrete pavers that are selected for durability, appearance, and long-term performance in Iowa\u2019s climate.',
          'Every project is designed around your yard layout, drainage needs, and how you plan to use your outdoor space.',
        ],
      },
      {
        heading: 'Our Process',
        paragraphs: [
          'Our process begins with a detailed site assessment and thoughtful design plan to ensure the finished structure meets both functional and visual goals. We evaluate grading, soil conditions, drainage patterns, and surrounding landscape features to create a solution that fits your property and performs reliably over time. Careful planning at this stage allows us to address potential challenges before construction begins.',
        ],
        bulletsIntro: 'Every patio is built using a proven step-by-step process:',
        bullets: [
          'Site evaluation and layout planning',
          'Excavation and proper grading for drainage',
          'Compacted aggregate base installation',
          'Precise paver placement and leveling',
          'Edge restraints for long-term stability',
          'Joint sand finishing for durability',
        ],
        paragraphsAfter: [
          'This process ensures your patio stays level, stable, and long-lasting.',
          'We use high-quality materials and proven construction techniques to build durable landscape structures that can withstand Iowa\u2019s weather, including freeze-thaw cycles and seasonal moisture changes. Each project is built with long-term stability in mind, ensuring strength, proper water management, and consistent performance throughout the year.',
        ],
      },
      {
        heading: 'Built for Iowa Weather Conditions',
        paragraphs: [
          'Our patios are engineered specifically for Cedar Falls weather conditions, including freeze-thaw cycles, heavy rain, and seasonal soil movement.',
          'Proper base preparation and drainage design are the key to preventing shifting, sinking, or long-term damage.',
        ],
      },
      {
        heading: 'Cedar Falls & Cedar Valley',
        paragraphs: [
          'We proudly serve Cedar Falls, Waterloo, and surrounding Cedar Valley communities.',
          'Our goal is to create outdoor living spaces that improve usability, increase property value, and provide a long-lasting area for entertaining, relaxing, and enjoying your home.',
        ],
      },
    ],
    closingCopy:
      'Ready to transform your outdoor space? Our team is here to bring your landscaping dreams to life.',
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
    heroHeading: 'Durable Materials for Long-Lasting Results',
    sections: [
      {
        heading: 'Water Features',
        paragraphs: [
          'We provide custom water feature solutions designed to enhance the beauty, tranquility, and functionality of your outdoor space. From elegant ponds and cascading waterfalls to fully engineered fountains and streams, our team delivers stunning, long-lasting results you can enjoy year-round. Every feature is tailored to your property\u2019s unique characteristics, including terrain, water flow, plantings, and aesthetic preferences.',
          'Water features do more than create a visual focal point. They promote relaxation, improve air quality, and support local wildlife. Whether you\u2019re adding a serene pond, a dynamic waterfall, or a flowing stream, our designs combine artistry with precision, seamlessly integrating into your landscape for both beauty and function.',
        ],
        showCta: true,
        subsections: [
          {
            heading: 'Professional Design and Installation',
            paragraphs: [
              'Every project begins with a detailed site evaluation and design plan to ensure your water feature meets both functional and aesthetic goals. We assess slope, soil, drainage, and sight lines to place ponds, waterfalls, and streams where they perform reliably and look natural on your property. Using quality liners, pumps, and filtration matched to Iowa conditions, we build systems that run cleanly through the seasons.',
              'We also incorporate complementary landscaping around your water feature, including aquatic plantings, decorative stone, lighting, and integrated hardscaping. These elements help your pond or waterfall blend into the surrounding yard while improving usability and visual appeal.',
              'At A1 Property Services, we focus on long-term durability and minimal upkeep. Our water features are designed with winterization, proper circulation, and easy maintenance in mind, whether for residential or commercial properties in the Cedar Falls area. The result is a striking outdoor focal point that adds lasting value and enjoyment to your property.',
            ],
          },
        ],
      },
    ],
    closingCopy:
      'Ready to transform your outdoor space? Our team is here to bring your landscaping dreams to life.',
    ctaEyebrow: 'Cedar Falls Water Features',
  },
}

export function getLegacyLandingPage(slug: keyof typeof legacyLandingPages) {
  return legacyLandingPages[slug]
}
