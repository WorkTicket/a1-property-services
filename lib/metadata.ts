import { Metadata } from 'next'

export const siteConfig = {
  name: 'A1 Property Services',
  url: 'https://a1pslandscape.com',
  description:
    'Landscaping in Cedar Falls, IA. Retaining walls, paver patios, lawn care and more. Licensed, insured, free estimates since 2010.',
  phone: '+13194641889',
  phoneDisplay: '+1 (319) 464-1889',
  email: 'a1propertyservices0219@gmail.com',
  address: {
    street: '503 Bergstrom Blvd',
    city: 'Cedar Falls',
    state: 'IA',
    zip: '50613',
  },
  social: {
    facebook: 'https://www.facebook.com/A1PropertyServicesCedarValley/',
  },
  googlePlaceId: 'ChIJx1yIuk9V5YcRMqQd-z4_YIE',
  googleReviewUrl:
    'https://www.google.com/search?hl=en-CO&gl=co&q=A1+Property+Services,+503+Bergstrom+Blvd,+Cedar+Falls,+IA+50613,+United+States&ludocid=9322520768390472754&lsig=AB86z5WppuXPH3aGGXjSTH_nw8_j#lrd=0x87e5554fba885cc7:0x81603f3efb1da432,3',
}

export function getGoogleMapsEmbedUrl(): string {
  const { street, city, state, zip } = siteConfig.address
  const place = `${street} ${city}, ${state} ${zip}`.replace(/ /g, '+')
  return `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${place}`
}

export const localSeoKeywords = [
  'landscaping cedar falls',
  'cedar falls landscaping',
  'landscaper cedar falls ia',
  'retaining wall cedar falls',
  'retaining walls cedar falls',
  'retaining wall installation cedar falls',
  'paver patio cedar falls',
  'paver patio installation cedar falls',
  'paver patios cedar falls',
  'hardscaping cedar falls',
  'landscape contractor cedar falls',
  'outdoor living cedar falls',
  'lawn care cedar falls',
  'snow removal cedar falls ia',
]

export type ServiceSeo = {
  title: string
  description: string
  h1: string
  keywords: string[]
  ogImage?: string
  ogImageAlt?: string
}

export const servicesHubKeywords = [
  'landscaping services cedar falls',
  'landscaping cedar falls ia',
  'landscaper cedar falls',
  'landscape contractor cedar falls',
  'hardscaping cedar falls',
  'retaining wall cedar falls',
  'paver patio cedar falls',
  'water features cedar falls',
  'lawn care cedar falls',
  'snow removal cedar falls',
]

export const serviceSeoOverrides: Record<string, ServiceSeo> = {
  'retaining-walls': {
    title: 'Retaining Wall Installation in Cedar Falls',
    description:
      'Retaining wall installation in Cedar Falls, IA. Block and natural stone walls with proper drainage for Iowa slopes. Free estimates — licensed and insured.',
    h1: 'Retaining Wall Installation in Cedar Falls',
    keywords: [
      'retaining wall installation cedar falls',
      'retaining wall cedar falls',
      'retaining walls cedar falls',
      'retaining walls cedar falls ia',
      'stone retaining wall cedar falls',
      'block retaining wall cedar falls',
      'retaining wall contractor cedar falls',
      'erosion control cedar falls',
    ],
    ogImage: '/images/retaining-wall.webp',
    ogImageAlt: 'Retaining wall installation in Cedar Falls, Iowa',
  },
  'paver-patio': {
    title: 'Paver Patio Installation in Cedar Falls',
    description:
      'Paver patio installation in Cedar Falls, IA. Custom patios built for Iowa freeze-thaw cycles and daily use. Free estimates — licensed and insured.',
    h1: 'Paver Patio Installation in Cedar Falls',
    keywords: [
      'paver patio installation cedar falls',
      'paver patio cedar falls',
      'paver patios cedar falls',
      'paver patio cedar falls ia',
      'patio installation cedar falls',
      'backyard patio cedar falls',
      'hardscape patio cedar falls',
      'paver patio contractor cedar falls',
    ],
    ogImage: '/images/paver-patio-hero.webp',
    ogImageAlt: 'Paver patio installation in Cedar Falls, Iowa',
  },
  'landscape-installation': {
    title: 'Landscape Installation in Cedar Falls',
    description:
      'Professional landscape installation in Cedar Falls, IA. Custom design, grading, planting, and hardscape integration. Licensed and insured, with free estimates.',
    h1: 'Landscape Installation in Cedar Falls',
    keywords: [
      'landscape installation cedar falls',
      'landscaping cedar falls ia',
      'landscape contractor cedar falls',
      'landscape design cedar falls',
      'outdoor living cedar falls',
    ],
  },
  'lawn-care': {
    title: 'Lawn Care & Mowing in Cedar Falls',
    description:
      'Professional lawn care and mowing in Cedar Falls, IA. Aeration, fertilization, weed control, and precision mowing. Licensed and insured, with free estimates.',
    h1: 'Lawn Care & Mowing in Cedar Falls',
    keywords: [
      'lawn care cedar falls',
      'lawn mowing cedar falls',
      'lawn service cedar falls ia',
      'lawn aeration cedar falls',
      'fertilization cedar falls',
    ],
  },
  'preservation-restoration': {
    title: 'Landscape Preservation & Restoration in Cedar Falls',
    description:
      'Landscape restoration services in Cedar Falls, IA. Soil repair, replanting, erosion control, and plant health care. Licensed and insured, with free estimates.',
    h1: 'Landscape Preservation & Restoration in Cedar Falls',
    keywords: [
      'landscape restoration cedar falls',
      'landscape preservation cedar falls',
      'soil repair cedar falls',
      'erosion control cedar falls ia',
      'plant health care cedar falls',
    ],
  },
  'tree-service': {
    title: 'Tree Service in Cedar Falls',
    description:
      'Professional tree service in Cedar Falls, IA. Pruning, removal, stump grinding, and disease management. Licensed and insured, with free estimates.',
    h1: 'Tree Service in Cedar Falls',
    keywords: [
      'tree service cedar falls',
      'tree removal cedar falls',
      'tree pruning cedar falls',
      'stump grinding cedar falls',
      'tree care cedar falls ia',
    ],
  },
  'landscape-maintenance': {
    title: 'Landscape Maintenance in Cedar Falls',
    description:
      'Landscape maintenance services in Cedar Falls, IA. Pruning, mulching, edging, and seasonal care. Licensed and insured, with free estimates.',
    h1: 'Landscape Maintenance in Cedar Falls',
    keywords: [
      'landscape maintenance cedar falls',
      'lawn maintenance cedar falls',
      'yard maintenance cedar falls',
      'seasonal cleanup cedar falls',
      'mulching cedar falls',
    ],
  },
  'ponds-water-features': {
    title: 'Water Features Installation in Cedar Falls',
    description:
      'Water features installation in Cedar Falls, IA. Custom ponds, waterfalls, koi ponds, and pondless water gardens. Free estimates — licensed and insured.',
    h1: 'Water Features Installation in Cedar Falls',
    keywords: [
      'water features installation cedar falls',
      'water features cedar falls',
      'water feature installation cedar falls',
      'ponds cedar falls',
      'waterfall installation cedar falls',
      'koi pond cedar falls',
      'pondless waterfall cedar falls',
      'backyard water features cedar falls',
    ],
    ogImage: '/images/water-feature-image-1.webp',
    ogImageAlt: 'Water features installation in Cedar Falls, Iowa',
  },
  'hydroseeding': {
    title: 'Hydroseeding in Cedar Falls',
    description:
      'Hydroseeding in Cedar Falls, IA. Fast lawn establishment for new yards and bare spots. Licensed and insured.',
    h1: 'Hydroseeding in Cedar Falls',
    keywords: [
      'hydroseeding cedar falls',
      'hydroseed cedar falls',
      'lawn establishment cedar falls',
      'erosion control hydroseeding cedar falls',
      'new lawn cedar falls',
    ],
  },
  'snow-removal': {
    title: 'Snow Removal in Cedar Falls',
    description:
      'Reliable snow removal in Cedar Falls, IA. Driveway plowing, sidewalk shoveling, de-icing, and commercial accounts. Licensed and insured.',
    h1: 'Snow Removal in Cedar Falls',
    keywords: [
      'snow removal cedar falls',
      'snow plowing cedar falls',
      'driveway plowing cedar falls',
      'snow removal cedar falls ia',
      'winter services cedar falls',
    ],
  },
  'landscape-design': {
    title: 'Landscape Design in Cedar Falls',
    description:
      'Professional landscape design in Cedar Falls, IA. Custom plans tailored to your property and Iowa growing conditions. Free estimates.',
    h1: 'Landscape Design in Cedar Falls',
    keywords: [
      'landscape design cedar falls',
      'landscape designer cedar falls ia',
      'landscape design cedar valley',
      'yard design cedar falls',
      'garden design cedar falls',
    ],
  },
  'drainage': {
    title: 'Drainage Solutions in Cedar Falls',
    description:
      'Drainage solutions in Cedar Falls, IA. French drains, yard grading, and surface drainage for Iowa properties. Free estimates.',
    h1: 'Drainage Solutions in Cedar Falls',
    keywords: [
      'drainage solutions cedar falls',
      'french drain cedar falls',
      'yard drainage cedar falls',
      'grading cedar falls',
      'drainage contractor cedar falls',
    ],
  },
  'excavation': {
    title: 'Excavation in Cedar Falls',
    description:
      'Professional excavation in Cedar Falls, IA. Site prep, grading, and excavation for landscaping and construction. Free estimates.',
    h1: 'Excavation in Cedar Falls',
    keywords: [
      'excavation cedar falls',
      'land clearing cedar falls',
      'grading contractor cedar falls',
      'site preparation cedar falls',
      'excavation contractor cedar valley',
    ],
  },
  'sod-installation': {
    title: 'Sod Installation in Cedar Falls',
    description:
      'Professional sod installation in Cedar Falls, IA. Instant green lawns with proper soil preparation. Free estimates.',
    h1: 'Sod Installation in Cedar Falls',
    keywords: [
      'sod installation cedar falls',
      'sod cedar falls',
      'new lawn cedar falls',
      'sod delivery cedar falls ia',
      'turf installation cedar falls',
    ],
  },
  'mulching': {
    title: 'Mulching in Cedar Falls',
    description:
      'Professional mulching in Cedar Falls, IA. Mulch installation for beds, trees, and landscape areas. Free estimates.',
    h1: 'Mulching in Cedar Falls',
    keywords: [
      'mulching cedar falls',
      'mulch delivery cedar falls',
      'mulch installation cedar falls',
      'landscape mulch cedar falls',
      'mulching service cedar falls ia',
    ],
  },
  'rock-landscaping': {
    title: 'Rock Landscaping in Cedar Falls',
    description:
      'Rock landscaping in Cedar Falls, IA. River rock, boulders, and stone features for low-maintenance landscapes. Free estimates.',
    h1: 'Rock Landscaping in Cedar Falls',
    keywords: [
      'rock landscaping cedar falls',
      'river rock cedar falls',
      'landscape boulders cedar falls',
      'rock garden cedar falls',
      'decorative stone cedar falls',
    ],
  },
  'tree-planting': {
    title: 'Tree Planting in Cedar Falls',
    description:
      'Professional tree planting in Cedar Falls, IA. Strategic tree planting for shade, privacy, and property value. Free estimates.',
    h1: 'Tree Planting in Cedar Falls',
    keywords: [
      'tree planting cedar falls',
      'tree planting service cedar falls',
      'shade trees cedar falls',
      'ornamental trees cedar falls',
      'tree planting contractor cedar falls',
    ],
  },
  'shrub-installation': {
    title: 'Shrub Installation in Cedar Falls',
    description:
      'Professional shrub installation in Cedar Falls, IA. Foundation plantings, hedges, and ornamental shrubs. Free estimates.',
    h1: 'Shrub Installation in Cedar Falls',
    keywords: [
      'shrub installation cedar falls',
      'shrub planting cedar falls',
      'foundation planting cedar falls',
      'hedge installation cedar falls',
      'shrubs cedar falls ia',
    ],
  },
  'commercial-landscaping': {
    title: 'Commercial Landscaping in Cedar Falls',
    description:
      'Commercial landscaping in Cedar Falls, IA. Landscape maintenance, snow removal, and hardscape for businesses. Free estimates.',
    h1: 'Commercial Landscaping in Cedar Falls',
    keywords: [
      'commercial landscaping cedar falls',
      'commercial lawn care cedar falls',
      'commercial snow removal cedar falls',
      'business landscaping cedar falls',
      'property management landscaping cedar falls',
    ],
  },
  'residential-landscaping': {
    title: 'Residential Landscaping in Cedar Falls',
    description:
      'Residential landscaping in Cedar Falls, IA. Full-service landscaping for Cedar Valley homes. Free estimates.',
    h1: 'Residential Landscaping in Cedar Falls',
    keywords: [
      'residential landscaping cedar falls',
      'home landscaping cedar falls',
      'residential lawn care cedar falls',
      'yard landscaping cedar falls',
      'home landscaping services cedar falls',
    ],
  },
  'grading': {
    title: 'Grading & Leveling in Cedar Falls',
    description:
      'Yard grading and leveling in Cedar Falls, IA. Fix drainage, level surfaces, and prepare for landscaping. Free estimates.',
    h1: 'Grading & Leveling in Cedar Falls',
    keywords: [
      'yard grading cedar falls',
      'lawn leveling cedar falls',
      'grading contractor cedar falls',
      'land grading cedar falls',
      'site grading cedar falls ia',
    ],
  },
  'outdoor-living': {
    title: 'Outdoor Living Spaces in Cedar Falls',
    description:
      'Outdoor living spaces in Cedar Falls, IA. Fire pits, outdoor kitchens, patios, and custom entertainment areas. Free estimates.',
    h1: 'Outdoor Living Spaces in Cedar Falls',
    keywords: [
      'outdoor living cedar falls',
      'outdoor kitchen cedar falls',
      'fire pit cedar falls',
      'outdoor entertaining cedar falls',
      'backyard living cedar falls',
    ],
  },
}

const defaultOgImage = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'A1 Property Services — landscaping and hardscaping in Cedar Falls, Iowa',
} as const

export const defaultOpenGraph: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  siteName: siteConfig.name,
  locale: 'en_US',
  images: [defaultOgImage],
}

export const defaultTwitter: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  images: [defaultOgImage.url],
}

type PageMetadataOptions = {
  title: string
  description?: string
  path?: string
  keywords?: string[]
  ogImage?: string
  ogImageAlt?: string
  absoluteTitle?: boolean
  noIndex?: boolean
  openGraphType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  keywords,
  ogImage,
  ogImageAlt,
  absoluteTitle = false,
  noIndex = false,
  openGraphType = 'website',
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle
    ? title
    : `${title} | A1 Property Services`
  const url = `${siteConfig.url}${path}`
  const desc = description ?? siteConfig.description
  const imageUrl = ogImage ?? defaultOgImage.url
  const imageAlt = ogImageAlt ?? defaultOgImage.alt

  return {
    title: { absolute: fullTitle },
    description: desc,
    keywords: keywords ?? localSeoKeywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      ...defaultOpenGraph,
      title: fullTitle,
      description: desc,
      url,
      type: openGraphType,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
      ...(openGraphType === 'article' && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.name],
          }
        : {}),
    },
    twitter: {
      ...defaultTwitter,
      title: fullTitle,
      description: desc,
      images: [imageUrl],
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${siteConfig.url}${item.path}` } : {}),
    })),
  }
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function articleJsonLd(post: {
  title: string
  excerpt: string
  date: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/icon.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

export function jsonLdGraph(...schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map((schema) => {
      const { '@context': _, ...rest } = schema as Record<string, unknown> & {
        '@context'?: string
      }
      return rest
    }),
  }
}

export function howToJsonLd(steps: { title: string; description: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Plan Your Landscaping Project',
    description: 'Steps to plan and execute your landscaping or hardscaping project.',
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  }
}

export function reviewJsonLd(reviews: { author: string; reviewBody: string; ratingValue: string; datePublished: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: { '@type': 'LandscapingBusiness', name: siteConfig.name },
    ratingValue: '5.0',
    bestRating: '5',
    reviewCount: reviews.length.toString(),
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: { '@type': 'Rating', ratingValue: r.ratingValue },
      datePublished: r.datePublished,
    })),
  }
}

export function videoObjectJsonLd(video: { name: string; description: string; thumbnailUrl: string; contentUrl: string; uploadDate: string; duration?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    contentUrl: video.contentUrl,
    uploadDate: video.uploadDate,
    ...(video.duration ? { duration: video.duration } : {}),
  }
}

export function imageObjectJsonLd(image: { url: string; caption: string; description?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: image.url,
    caption: image.caption,
    ...(image.description ? { description: image.description } : {}),
  }
}

export function speakableJsonLd(cssSelector: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector,
    },
  }
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  image: `${siteConfig.url}/og-image.jpg`,
  logo: `${siteConfig.url}/images/icon.webp`,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  foundingDate: '2009',
  sameAs: [siteConfig.social.facebook],
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.5364,
    longitude: -92.4455,
  },
  areaServed: [
    { '@type': 'City', name: 'Cedar Falls' },
    { '@type': 'City', name: 'Waterloo' },
    { '@type': 'City', name: 'Hudson' },
    { '@type': 'City', name: 'Evansdale' },
    { '@type': 'City', name: 'Waverly' },
    { '@type': 'City', name: 'Denver' },
    { '@type': 'City', name: 'Jesup' },
    { '@type': 'City', name: 'Parkersburg' },
    { '@type': 'City', name: 'La Porte City' },
    { '@type': 'City', name: 'Dike' },
    { '@type': 'Place', name: 'Cedar Valley' },
    { '@type': 'Place', name: 'Black Hawk County' },
    { '@type': 'Place', name: 'Bremer County' },
    { '@type': 'Place', name: 'Grundy County' },
    { '@type': 'Place', name: 'Butler County' },
    { '@type': 'Place', name: 'Buchanan County' },
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    contactType: 'customer service',
    email: siteConfig.email,
    areaServed: ['US'],
    availableLanguage: ['English'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Landscaping and Hardscaping Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscaping in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retaining Wall Installation in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paver Patio Installation in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Water Features Installation in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lawn Care in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Snow Removal in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drainage Solutions in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landscape Design in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outdoor Living Spaces in Cedar Falls' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Landscaping in Cedar Falls' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '5',
    bestRating: '5',
  },
}

export function webPageJsonLd(options: {
  name: string
  description: string
  path: string
  image?: string
  about?: string
  datePublished?: string
  dateModified?: string
}) {
  const url = `${siteConfig.url}${options.path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    ...(options.image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: options.image.startsWith('http')
              ? options.image
              : `${siteConfig.url}${options.image}`,
          },
        }
      : {}),
    ...(options.about ? { about: { '@type': 'Thing', name: options.about } } : {}),
    ...(options.datePublished
      ? {
          datePublished: options.datePublished,
          dateModified: options.dateModified ?? options.datePublished,
        }
      : {}),
    isPartOf: { '@id': `${siteConfig.url}/#website` },
  }
}

export function blogPostingJsonLd(post: {
  title: string
  excerpt: string
  date: string
  slug: string
  image?: string
}) {
  const url = `${siteConfig.url}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/images/icon.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: post.image
      ? `${siteConfig.url}${post.image}`
      : `${siteConfig.url}/og-image.jpg`,
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/icon.webp`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      email: siteConfig.email,
      areaServed: ['US'],
      availableLanguage: ['English'],
    },
    sameAs: [siteConfig.social.facebook],
  }
}

export function validateJsonLd(schema: object): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const obj = schema as Record<string, unknown>
  if (!obj['@type']) errors.push('Missing @type')
  return { valid: errors.length === 0, errors }
}
