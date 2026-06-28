import { allServices, type Service, serviceFaqs } from '@/lib/services'
import { blogPosts, type BlogPost } from '@/lib/blog'
import { cities } from '@/lib/cities'
import { learnArticles, type LearnArticle } from '@/lib/learn'
import { galleryProjects, type GalleryProject } from '@/lib/images'
import { siteConfig } from '@/lib/metadata'

export type ContentType = 'service' | 'blog' | 'city' | 'learn' | 'faq' | 'guide' | 'project'

export type LinkedContent = {
  type: ContentType
  slug: string
  title: string
  excerpt: string
  url: string
  relevance: number
}

export type RelatedContentGroup = {
  heading: string
  items: LinkedContent[]
}

const guides = [
  { slug: 'retaining-wall-planning', title: 'Retaining Wall Planning Guide', description: 'Everything you need to know before building a retaining wall in Iowa.' },
  { slug: 'paver-patio-planning', title: 'Paver Patio Planning Guide', description: 'How to plan the perfect paver patio for Iowa properties.' },
  { slug: 'outdoor-living-design', title: 'Outdoor Living Design Guide', description: 'Design your dream outdoor living space.' },
  { slug: 'drainage-solutions', title: 'Drainage Solutions Guide', description: 'Identify and solve common drainage problems.' },
  { slug: 'landscape-design', title: 'Landscape Design Guide', description: 'A complete guide to designing your Iowa landscape.' },
  { slug: 'lawn-care', title: 'Lawn Care Guide', description: 'Year-round lawn care for Iowa.' },
]

function serviceUrl(slug: string) { return `/services/${slug}` }
function blogUrl(slug: string) { return `/blog/${slug}` }
function cityUrl(slug: string) { return `/${slug}` }
function cityServiceUrl(city: string, service: string) { return `/${city}/${service}` }
function learnUrl(slug: string) { return `/learn/${slug}` }
function guideUrl() { return `/guides` }
function faqUrl() { return `/faqs` }
function projectUrl() { return `/gallery` }

function toLinked(item: { type: ContentType; slug: string; title: string; excerpt: string; url: string; relevance: number }): LinkedContent {
  return item
}

function keywordMatch(text: string, terms: string[]): number {
  const lower = text.toLowerCase()
  let score = 0
  for (const term of terms) {
    if (lower.includes(term.toLowerCase())) score++
  }
  return score
}

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
}

function textOverlap(a: string, b: string): number {
  const tokensA = new Set(tokenize(a))
  const tokensB = tokenize(b)
  return tokensB.filter(t => tokensA.has(t)).length
}

export function getRelatedServices(serviceSlug: string, limit = 4): LinkedContent[] {
  const service = allServices.find(s => s.slug === serviceSlug)
  if (!service) return []

  const sameCategory = allServices.filter(
    s => s.slug !== serviceSlug && s.category === service.category
  )

  let related: Service[]
  if (sameCategory.length >= limit) {
    related = sameCategory.slice(0, limit)
  } else {
    const others = allServices.filter(
      s => s.slug !== serviceSlug && s.category !== service.category
    )
    related = [...sameCategory, ...others].slice(0, limit)
  }

  return related.map(s => toLinked({
    type: 'service',
    slug: s.slug,
    title: s.name,
    excerpt: s.shortDesc,
    url: serviceUrl(s.slug),
    relevance: s.category === service.category ? 10 : 5,
  }))
}

export function getBlogsForService(serviceSlug: string, limit = 3): LinkedContent[] {
  const service = allServices.find(s => s.slug === serviceSlug)
  const keywords = [
    serviceSlug.replace(/-/g, ' '),
    service?.name?.toLowerCase() ?? '',
  ]

  const scored = blogPosts.map(post => {
    const postText = (post.title + ' ' + post.excerpt + ' ' + post.content.join(' ')).toLowerCase()
    let score = keywords.some(kw => kw && postText.includes(kw)) ? 1 : 0
    if (service) {
      score += keywordMatch(postText, [service.name, serviceSlug.replace(/-/g, ' ')])
    }
    return { post, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => toLinked({
      type: 'blog',
      slug: s.post.slug,
      title: s.post.title,
      excerpt: s.post.excerpt,
      url: blogUrl(s.post.slug),
      relevance: s.score,
    }))
}

export function getCitiesForService(serviceSlug: string): LinkedContent[] {
  return cities.map(c => toLinked({
    type: 'city',
    slug: c.slug,
    title: c.name,
    excerpt: `${serviceSlug.replace(/-/g, ' ')} in ${c.name}`,
    url: cityServiceUrl(c.slug, serviceSlug),
    relevance: 5,
  }))
}

export function getProjectsForService(serviceSlug: string, limit = 4): LinkedContent[] {
  const categoryMap: Record<string, string> = {
    'retaining-walls': 'Retaining Wall',
    'paver-patio': 'Paver Patio',
    'ponds-water-features': 'Water Feature',
    'outdoor-living': 'Outdoor Living',
  }

  const category = categoryMap[serviceSlug]
  if (!category) return []

  const matching = galleryProjects
    .filter(p => p.title === category || (category === 'Water Feature' && p.category === 'water'))
    .slice(0, limit)

  return matching.map(p => toLinked({
    type: 'project',
    slug: p.id,
    title: p.title,
    excerpt: `${p.title} project in the Cedar Valley`,
    url: projectUrl(),
    relevance: 8,
  }))
}

export function getFaqsForService(serviceSlug: string, limit = 3): LinkedContent[] {
  const faqs = serviceFaqs[serviceSlug] ?? []
  return faqs.slice(0, limit).map(f => toLinked({
    type: 'faq',
    slug: serviceSlug,
    title: f.question,
    excerpt: f.answer.slice(0, 120),
    url: `${faqUrl()}#${serviceSlug}`,
    relevance: 7,
  }))
}

export function getServicesForBlog(blogSlug: string, limit = 3): LinkedContent[] {
  const post = blogPosts.find(p => p.slug === blogSlug)
  if (!post) return []

  const postText = (post.title + ' ' + post.excerpt + ' ' + post.content.join(' ')).toLowerCase()

  const scored = allServices.map(service => {
    const serviceTerms = (service.name + ' ' + service.shortDesc + ' ' + service.longDesc).toLowerCase()
    const overlap = textOverlap(postText, serviceTerms)
    const directMatch = postText.includes(service.name.toLowerCase()) ? 3 : 0
    return { service, score: overlap + directMatch }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => toLinked({
      type: 'service',
      slug: s.service.slug,
      title: s.service.name,
      excerpt: s.service.shortDesc,
      url: serviceUrl(s.service.slug),
      relevance: s.score,
    }))
}

export function getBlogsForBlog(blogSlug: string, limit = 3): LinkedContent[] {
  const post = blogPosts.find(p => p.slug === blogSlug)
  if (!post) return []

  const sameCategory = blogPosts.filter(
    p => p.slug !== blogSlug && p.category === post.category
  )

  const scored = sameCategory.map(p => {
    const overlap = textOverlap(post.content.join(' '), p.content.join(' '))
    return { post: p, score: overlap }
  })

  const sorted = scored.sort((a, b) => b.score - a.score).slice(0, limit)

  if (sorted.length < limit) {
    const extras = blogPosts.filter(
      p => p.slug !== blogSlug && p.category !== post.category
    )
    for (const extra of extras) {
      if (sorted.length >= limit) break
      sorted.push({ post: extra, score: 1 })
    }
  }

  return sorted.slice(0, limit).map(s => toLinked({
    type: 'blog',
    slug: s.post.slug,
    title: s.post.title,
    excerpt: s.post.excerpt,
    url: blogUrl(s.post.slug),
    relevance: s.score,
  }))
}

export function getFaqsForBlog(blogSlug: string, limit = 2): LinkedContent[] {
  const post = blogPosts.find(p => p.slug === blogSlug)
  if (!post) return []

  const postText = (post.title + ' ' + post.excerpt).toLowerCase()

  const scored: { faq: { question: string; answer: string }; slug: string; score: number }[] = []

  for (const [slug, faqs] of Object.entries(serviceFaqs)) {
    for (const faq of faqs) {
      const faqText = (faq.question + ' ' + faq.answer).toLowerCase()
      const score = keywordMatch(faqText, tokenize(postText).slice(0, 10))
      if (score > 0) {
        scored.push({ faq, slug, score })
      }
    }
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => toLinked({
      type: 'faq',
      slug: s.slug,
      title: s.faq.question,
      excerpt: s.faq.answer.slice(0, 120),
      url: `${faqUrl()}#${s.slug}`,
      relevance: s.score,
    }))
}

export function getBlogsForLearn(learnSlug: string, limit = 3): LinkedContent[] {
  const article = learnArticles.find(a => a.slug === learnSlug)
  if (!article) return []

  const articleText = article.sections.map(s => s.heading + ' ' + s.paragraphs.join(' ')).join(' ').toLowerCase()

  const scored = blogPosts.map(post => {
    const postText = (post.title + ' ' + post.excerpt).toLowerCase()
    const overlap = textOverlap(articleText, postText)
    const related = article.relatedServices.some(rs => postText.includes(rs.replace(/-/g, ' '))) ? 2 : 0
    return { post, score: overlap + related }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => toLinked({
      type: 'blog',
      slug: s.post.slug,
      title: s.post.title,
      excerpt: s.post.excerpt,
      url: blogUrl(s.post.slug),
      relevance: s.score,
    }))
}

export function getServicesForLearn(learnSlug: string, limit = 4): LinkedContent[] {
  const article = learnArticles.find(a => a.slug === learnSlug)
  if (!article) return []

  const related = allServices.filter(s => article.relatedServices.includes(s.slug))
  if (related.length >= limit) return related.slice(0, limit).map(s => toLinked({
    type: 'service', slug: s.slug, title: s.name, excerpt: s.shortDesc, url: serviceUrl(s.slug), relevance: 10,
  }))

  return related.map(s => toLinked({
    type: 'service', slug: s.slug, title: s.name, excerpt: s.shortDesc, url: serviceUrl(s.slug), relevance: 10,
  }))
}

export function getCitiesForLearn(learnSlug: string): LinkedContent[] {
  const article = learnArticles.find(a => a.slug === learnSlug)
  if (!article) return []

  return article.relatedCities.map(c => {
    const city = cities.find(ct => ct.slug === c)
    return toLinked({
      type: 'city', slug: c, title: city?.name ?? c, excerpt: `Landscaping services in ${city?.name ?? c}`,
      url: cityUrl(c), relevance: 8,
    })
  })
}

export function getServicesForCity(citySlug: string): LinkedContent[] {
  return allServices.map(s => toLinked({
    type: 'service', slug: s.slug, title: s.name, excerpt: `${s.name} in ${citySlug.replace(/-/g, ' ')}`,
    url: cityServiceUrl(citySlug, s.slug), relevance: 6,
  }))
}

export function getBlogsForCity(citySlug: string, limit = 3): LinkedContent[] {
  const city = cities.find(c => c.slug === citySlug)
  if (!city) return []

  const cityName = city.name.toLowerCase()
  const scored = blogPosts.map(post => {
    const postText = (post.title + ' ' + post.excerpt + ' ' + post.content.join(' ')).toLowerCase()
    const score = keywordMatch(postText, [cityName, city.county.toLowerCase()])
    return { post, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => toLinked({
      type: 'blog', slug: s.post.slug, title: s.post.title, excerpt: s.post.excerpt,
      url: blogUrl(s.post.slug), relevance: s.score,
    }))
}

export function getGuidesForBlog(limit = 3): LinkedContent[] {
  return guides.slice(0, limit).map(g => toLinked({
    type: 'guide', slug: g.slug, title: g.title, excerpt: g.description,
    url: guideUrl(), relevance: 5,
  }))
}

export function getBlogsForGuide(limit = 3): LinkedContent[] {
  return blogPosts.slice(0, limit).map(p => toLinked({
    type: 'blog', slug: p.slug, title: p.title, excerpt: p.excerpt,
    url: blogUrl(p.slug), relevance: 5,
  }))
}

export function getServiceLinksForFaq(limit = 6): LinkedContent[] {
  return allServices
    .filter(s => serviceFaqs[s.slug] && serviceFaqs[s.slug].length > 0)
    .slice(0, limit)
    .map(s => toLinked({
      type: 'service', slug: s.slug, title: s.name, excerpt: s.shortDesc,
      url: serviceUrl(s.slug), relevance: 7,
    }))
}

export function getRelatedContent(serviceSlug: string): {
  services: Service[]
  blogPosts: BlogPost[]
  cities: { slug: string; name: string }[]
  galleryCount: number
  faqCount: number
} {
  const service = allServices.find(s => s.slug === serviceSlug)

  const otherServices = allServices.filter(s => s.slug !== serviceSlug)
  const categoryRelated = service?.category
    ? allServices.filter(s => s.slug !== serviceSlug && s.category === service.category)
    : []

  const relatedServices = categoryRelated.length >= 3
    ? categoryRelated.slice(0, 3)
    : [...categoryRelated, ...otherServices.filter(s => !categoryRelated.includes(s)).slice(0, 3 - categoryRelated.length)]

  const relatedBlogPosts = blogPosts.filter(post => {
    const slug = serviceSlug
    const keywords = [slug.replace(/-/g, ' '), service?.name.toLowerCase() ?? '']
    const postText = (post.title + ' ' + post.excerpt + ' ' + post.content.join(' ')).toLowerCase()
    return keywords.some(kw => kw && postText.includes(kw))
  }).slice(0, 3)

  const relatedCities = cities.map(c => ({ slug: c.slug, name: c.name }))

  const galleryCount = galleryProjects.filter(p => {
    const categoryMap: Record<string, string> = {
      'retaining-walls': 'Retaining Wall',
      'paver-patio': 'Paver Patio',
      'ponds-water-features': 'Water Feature',
      'outdoor-living': 'Outdoor Living',
    }
    const title = categoryMap[serviceSlug]
    return title ? p.title === title || (title === 'Water Feature' && p.category === 'water') : false
  }).length

  const faqCount = serviceFaqs[serviceSlug]?.length ?? 0

  return { services: relatedServices, blogPosts: relatedBlogPosts, cities: relatedCities, galleryCount, faqCount }
}

export function getRelatedContentForBlog(blogSlug: string): {
  services: Service[]
  blogPosts: BlogPost[]
} {
  const post = blogPosts.find(p => p.slug === blogSlug)
  if (!post) return { services: [], blogPosts: [] }

  const categoryRelatedPosts = blogPosts.filter(
    p => p.slug !== blogSlug && p.category === post.category
  ).slice(0, 3)

  const postText = (post.title + ' ' + post.excerpt).toLowerCase()

  const relatedServices = allServices.filter(service => {
    const serviceTerms = (service.name + ' ' + service.shortDesc).toLowerCase()
    return postText.includes(serviceTerms.slice(0, 20))
  })

  return {
    services: relatedServices.slice(0, 3),
    blogPosts: categoryRelatedPosts,
  }
}

export function getAllRelatedGroups(contentType: ContentType, slug: string): RelatedContentGroup[] {
  const groups: RelatedContentGroup[] = []

  switch (contentType) {
    case 'service': {
      const services = getRelatedServices(slug)
      if (services.length > 0) groups.push({ heading: 'Related Services', items: services })

      const blogs = getBlogsForService(slug)
      if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })

      const projects = getProjectsForService(slug)
      if (projects.length > 0) groups.push({ heading: 'Related Projects', items: projects })

      const faqs = getFaqsForService(slug)
      if (faqs.length > 0) groups.push({ heading: 'Frequently Asked Questions', items: faqs })
      break
    }

    case 'blog': {
      const services = getServicesForBlog(slug)
      if (services.length > 0) groups.push({ heading: 'Related Services', items: services })

      const blogs = getBlogsForBlog(slug)
      if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })

      const faqs = getFaqsForBlog(slug)
      if (faqs.length > 0) groups.push({ heading: 'Related FAQs', items: faqs })

      const guides = getGuidesForBlog()
      if (guides.length > 0) groups.push({ heading: 'Planning Guides', items: guides })
      break
    }

    case 'city': {
      const services = getServicesForCity(slug)
      if (services.length > 0) groups.push({ heading: 'Our Services', items: services })

      const blogs = getBlogsForCity(slug)
      if (blogs.length > 0) groups.push({ heading: 'Articles for Your Area', items: blogs })
      break
    }

    case 'learn': {
      const services = getServicesForLearn(slug)
      if (services.length > 0) groups.push({ heading: 'Related Services', items: services })

      const blogs = getBlogsForLearn(slug)
      if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })

      const cities = getCitiesForLearn(slug)
      if (cities.length > 0) groups.push({ heading: 'Service Areas', items: cities })
      break
    }

    case 'faq': {
      const services = getServiceLinksForFaq()
      if (services.length > 0) groups.push({ heading: 'Our Services', items: services })
      break
    }

    case 'guide': {
      const blogs = getBlogsForGuide()
      if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })
      break
    }

    case 'project': {
      const services = allServices.slice(0, 4).map(s => toLinked({
        type: 'service', slug: s.slug, title: s.name, excerpt: s.shortDesc,
        url: serviceUrl(s.slug), relevance: 5,
      }))
      if (services.length > 0) groups.push({ heading: 'Services', items: services })
      break
    }
  }

  return groups
}

export function getContextualLinks(content: string, maxLinks = 3): LinkedContent[] {
  const contentLower = content.toLowerCase()
  const candidates: LinkedContent[] = []

  for (const service of allServices) {
    const nameLower = service.name.toLowerCase()
    if (contentLower.includes(nameLower) && !candidates.some(c => c.slug === service.slug)) {
      candidates.push(toLinked({
        type: 'service', slug: service.slug, title: service.name, excerpt: service.shortDesc,
        url: serviceUrl(service.slug), relevance: 6,
      }))
    }
  }

  for (const post of blogPosts) {
    const titleLower = post.title.toLowerCase()
    if (contentLower.includes(titleLower.slice(0, 30)) && !candidates.some(c => c.slug === post.slug)) {
      candidates.push(toLinked({
        type: 'blog', slug: post.slug, title: post.title, excerpt: post.excerpt,
        url: blogUrl(post.slug), relevance: 4,
      }))
    }
  }

  return candidates.slice(0, maxLinks)
}
