export type LandscapingServiceSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  bulletsHeading?: string
  serviceHref?: string
  serviceLinkLabel?: string
}

export type HubRecentProject = {
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
}

export const landscapingHubPage = {
  path: '/landscaping-services-in-cedar-falls',
  title: 'Landscaping in Cedar Falls, IA | Local Crew · Free Estimate',
  description:
    'Landscaping in Cedar Falls, IA — retaining walls, paver patios, lawn care & installs from a local crew. Free on-site estimate. Call (319) 464-1889.',
  keywords: [
    'landscaping cedar falls',
    'cedar falls landscaping',
    'landscaper cedar falls',
    'landscaping cedar falls ia',
    'landscaping company cedar falls',
    'landscape contractor cedar falls',
    'landscaping services cedar falls',
    'lawn care cedar falls',
    'hardscaping cedar falls',
    'retaining wall cedar falls',
    'paver patio cedar falls',
    'water features cedar falls',
  ],
  ogImage: '/images/content-landscaping-cedar-falls.webp',
  ogImageAlt: 'Professional landscape installation by A1 Property Services',
  heroImage: '/images/content-landscaping-cedar-falls.webp',
  heroImageAlt: 'Completed landscaping and hardscape work for a local home',
  contentImage: '/images/content-landscaping-cedar-falls.webp',
  contentImageAlt:
    'Professional landscaping installation by A1 Property Services',
  eyebrow: 'Cedar Falls, Iowa',
  h1: 'Landscaping in Cedar Falls, IA',
  heroHeading:
    'Local lawn care, hardscaping, and full landscape installs across the Cedar Valley.',
  introHeading: 'A Local Crew That Knows Cedar Valley Yards',
  introParagraphs: [
    'A1 Property Services is a locally owned landscaping company based in Cedar Falls, Iowa. We help homeowners and businesses across the Cedar Valley with lawn care, retaining walls, paver patios, ponds, and complete landscape installation.',
    'We plan every project around Iowa clay, freeze-thaw, and how water moves across Cedar Valley lots — from College Hill and North Cedar to newer builds on the north end. Licensed, insured, and rated 5 stars by local customers.',
  ],
  coreServicesHeading: 'Hardscape & Landscape Services',
  coreServicesIntro:
    'From retaining walls built for freeze-thaw to paver patios and water features, our crew focuses on work that lasts — drainage that works, quality materials, and clear written estimates.',
  featuredServices: [
    { label: 'Retaining Wall', href: '/retaining-wall-in-cedar-falls' },
    { label: 'Water Features', href: '/cedar-falls-water-features' },
    { label: 'Paver Patio', href: '/paver-patio-installation' },
  ],
  recentProjects: [
    {
      title: 'Retaining Wall — Hillside',
      description:
        'Block retaining wall with gravel backfill and drain tile on a sloped lot that was washing out after spring thaws.',
      href: '/retaining-wall-in-cedar-falls',
      image: '/images/wall-after-1.webp',
      imageAlt: 'Retaining wall installation on a hillside',
    },
    {
      title: 'Paver Patio — Backyard',
      description:
        'Custom paver patio with steps and outdoor living space — compacted base and edge restraint built for Iowa freeze-thaw.',
      href: '/paver-patio-installation',
      image: '/images/patio-after-2.webp',
      imageAlt: 'Paver patio installation in a backyard',
    },
    {
      title: 'Water Feature — Garden',
      description: 'Backyard pond with aquatic plants and natural stone edging.',
      href: '/cedar-falls-water-features',
      image: '/images/water-feature-image-3.webp',
      imageAlt: 'Water feature installation with natural stone',
    },
    {
      title: 'Full Landscape Install — Cedar Valley',
      description:
        'Complete yard transformation with regrading for clay drainage, planting, and hardscape that ties the whole property together.',
      href: '/gallery',
      image: '/images/landscape-after-1.webp',
      imageAlt: 'Landscape installation project in the Cedar Valley',
    },
  ] satisfies HubRecentProject[],
  allServicesHeading: 'Full-Service Landscape Work for the Cedar Valley',
  allServicesIntro:
    'Installation, maintenance, restoration, and seasonal work for homes and businesses across the Cedar Valley — built for Iowa climate and lasting curb appeal.',
  serviceSections: [
    {
      heading: 'Landscape Installation',
      serviceHref: '/services/landscape-installation',
      serviceLinkLabel: 'landscape installation',
      paragraphs: [
        'Full landscape installs for local homes and businesses — grading for drainage, healthy plantings, and hardscape that ties the yard together. We plan around how you use the space and Iowa freeze-thaw so the work holds up.',
      ],
    },
    {
      heading: 'Lawn Care & Mowing',
      serviceHref: '/services/lawn-care',
      serviceLinkLabel: 'lawn care',
      paragraphs: [
        'Reliable mowing, edging, and turf care for residential and commercial properties. We cut at the right height for Iowa grass types and can add aeration, fertilization support, and seasonal cleanups.',
      ],
    },
    {
      heading: 'Landscape Preservation & Restoration',
      serviceHref: '/services/preservation-restoration',
      serviceLinkLabel: 'landscape restoration',
      paragraphs: [
        'Restore tired or neglected yards with pruning, soil improvements, plant replacement, and grading fixes. We start with a site assessment so repairs target what is actually failing.',
      ],
    },
    {
      heading: 'Tree Service',
      serviceHref: '/services/tree-service',
      serviceLinkLabel: 'tree service',
      paragraphs: [
        'Trimming, removal, stump grinding, and storm response for the Cedar Valley. Safe work around structures, with planting and transplanting when you need new trees.',
      ],
    },
    {
      heading: 'Landscape Maintenance',
      serviceHref: '/services/landscape-maintenance',
      serviceLinkLabel: 'landscape maintenance',
      paragraphs: [
        'Ongoing bed care, mulching, pruning, and seasonal cleanup so established landscapes stay healthy and neat year-round.',
      ],
    },
    {
      heading: 'Ponds & Water Features',
      serviceHref: '/cedar-falls-water-features',
      serviceLinkLabel: 'ponds and water features',
      paragraphs: [
        'Custom ponds, pondless waterfalls, and water gardens sized for your yard — with pumps, filtration, and winterization planned for Iowa seasons.',
      ],
    },
    {
      heading: 'Hydroseeding',
      serviceHref: '/services/hydroseeding',
      serviceLinkLabel: 'hydroseeding',
      paragraphs: [
        'Fast, even grass establishment for new lawns, repairs, and slopes. We match seed blends to your site and give clear watering guidance for strong germination.',
      ],
    },
    {
      heading: 'Snow Removal',
      serviceHref: '/services/snow-removal',
      serviceLinkLabel: 'snow removal',
      paragraphs: [
        'Commercial plowing, sidewalk clearing, and ice management with priority response plans for Cedar Valley businesses.',
      ],
    },
    {
      heading: 'Other Services',
      serviceHref: '/services',
      serviceLinkLabel: 'all landscaping services',
      paragraphs: [
        'Planting, mulching, grading, drainage, and outdoor living add-ons that finish or protect your landscape.',
      ],
      bulletsHeading: 'Additional Landscaping & Hardscaping Services',
      bullets: [
        'Planting & mulching for healthier beds and curb appeal',
        'Grading & drainage to move water away from foundations',
        'Fire pits, edging, and outdoor living accents',
        'Maintenance and restoration for aging landscapes',
      ],
    },
  ] satisfies LandscapingServiceSection[],
  faqs: [
    {
      question: 'What landscaping services do you offer in Cedar Falls?',
      answer:
        'A1 Property Services offers full-service landscaping: lawn care and mowing, landscape installation, retaining walls, paver patios, ponds and water features, tree service, drainage, snow removal, and seasonal maintenance for homes and businesses across the Cedar Valley.',
    },
    {
      question: 'How much does landscaping cost in Cedar Falls?',
      answer:
        'Cost depends on project size, materials, and scope — small plantings start lower, while walls, patios, and full installs are quoted after a site visit. We give free on-site estimates with clear written pricing and no surprises.',
    },
    {
      question: 'Who is the best landscaper near me in Cedar Falls?',
      answer:
        'Look for a licensed local crew with Iowa freeze-thaw experience, clear written estimates, and strong Google reviews. A1 Property Services is based in Cedar Falls, licensed and insured since 2014, and serves the Cedar Valley.',
    },
    {
      question: 'Do you serve Cedar Falls and the surrounding Cedar Valley?',
      answer:
        'Yes. We are based in Cedar Falls and serve communities across the Cedar Valley. Most local projects are scheduled within a few days of your estimate.',
    },
    {
      question: 'What types of properties do you service?',
      answer:
        'We work on both residential and commercial properties, including homes, office buildings, retail spaces, and large estates throughout the Cedar Valley.',
    },
    {
      question: 'Do you offer ongoing maintenance or only one-time services?',
      answer:
        'We offer both. Schedule routine maintenance like lawn care and seasonal cleanups, or request one-time projects such as landscape installation, hardscaping, or pond creation.',
    },
    {
      question: 'How do I get a quote for my project or maintenance plan?',
      answer:
        'Call (319) 464-1889 or request a quote online. We assess your property and provide a detailed, transparent estimate — usually within 24 hours.',
    },
  ],
  faqHeading: 'Frequently Asked Questions',
  contactHeading: 'Contact Your Local Landscaper',
  contactIntro:
    'Ready to start your project? Fill out the form or call our office. We respond quickly and provide free estimates.',
  closingCopy:
    'Ready to transform your outdoor space? Our Cedar Valley team is here for lawn care, hardscape installs, and full landscape projects.',
}
