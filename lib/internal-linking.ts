import { allServices, getFaqPageServices, type Service, serviceFaqs, getServicePageHref } from '@/lib/services'
import { blogPosts, type BlogPost } from '@/lib/blog'
import { cities } from '@/lib/cities'
import { learnArticles, type LearnArticle } from '@/lib/learn'
import { galleryProjects, type GalleryProject } from '@/lib/images'
import { siteConfig } from '@/lib/metadata'

export const landscapingHubPath = '/landscaping-services-in-cedar-falls'
export const landscapingHubAnchor = 'landscaping in Cedar Falls'

export type ContentType = 'service' | 'blog' | 'city' | 'learn' | 'faq' | 'project'

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

/** Curated services that pair well together: shown as "Other Landscaping Services" on service pages. */
const complementaryServiceSlugs: Record<string, string[]> = {
  'landscape-maintenance': ['landscape-installation', 'lawn-care', 'preservation-restoration'],
  'landscape-installation': ['landscape-design', 'mulching', 'shrub-installation'],
  'lawn-care': ['landscape-maintenance', 'hydroseeding', 'sod-installation'],
  'preservation-restoration': ['landscape-installation', 'landscape-maintenance', 'tree-service'],
  'tree-service': ['tree-planting', 'shrub-installation', 'landscape-maintenance'],
  'ponds-water-features': ['outdoor-living', 'paver-patio', 'landscape-design'],
  'hydroseeding': ['sod-installation', 'lawn-care', 'grading'],
  'snow-removal': ['landscape-maintenance', 'commercial-landscaping', 'lawn-care'],
  'landscape-design': ['landscape-installation', 'outdoor-living', 'residential-landscaping'],
  'drainage': ['excavation', 'grading', 'retaining-walls'],
  'excavation': ['grading', 'drainage', 'sod-installation'],
  'sod-installation': ['lawn-care', 'hydroseeding', 'landscape-installation'],
  'mulching': ['landscape-maintenance', 'shrub-installation', 'landscape-installation'],
  'rock-landscaping': ['landscape-installation', 'drainage', 'retaining-walls'],
  'tree-planting': ['tree-service', 'shrub-installation', 'landscape-installation'],
  'shrub-installation': ['landscape-installation', 'mulching', 'landscape-maintenance'],
  'commercial-landscaping': ['landscape-maintenance', 'snow-removal', 'lawn-care'],
  'residential-landscaping': ['landscape-design', 'landscape-installation', 'landscape-maintenance'],
  'grading': ['excavation', 'drainage', 'sod-installation'],
  'outdoor-living': ['paver-patio', 'ponds-water-features', 'landscape-design'],
  'retaining-walls': ['drainage', 'excavation', 'paver-patio'],
  'paver-patio': ['outdoor-living', 'retaining-walls', 'landscape-design'],
}

function serviceUrl(slug: string) { return getServicePageHref(slug) }
function blogUrl(slug: string) { return `/blog/${slug}` }
function cityUrl(slug: string) { return `/${slug}` }
function cityServiceUrl(city: string, service: string) { return `/${city}/${service}` }
function learnUrl(slug: string) { return `/learn/${slug}` }
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

export function getComplementaryServices(serviceSlug: string, limit = 3): Service[] {
  const curated = complementaryServiceSlugs[serviceSlug]
  if (curated) {
    return curated
      .filter(slug => slug !== serviceSlug)
      .slice(0, limit)
      .map(slug => allServices.find(s => s.slug === slug))
      .filter((s): s is Service => !!s)
  }

  const service = allServices.find(s => s.slug === serviceSlug)
  if (!service) return []

  const sameCategory = allServices.filter(
    s => s.slug !== serviceSlug && s.category === service.category
  )

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }

  const others = allServices.filter(
    s => s.slug !== serviceSlug && s.category !== service.category
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export function getRelatedServices(serviceSlug: string, limit = 4): LinkedContent[] {
  return getComplementaryServices(serviceSlug, limit).map(s => toLinked({
    type: 'service',
    slug: s.slug,
    title: s.name,
    excerpt: s.shortDesc,
    url: serviceUrl(s.slug),
    relevance: 10,
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

export function getLearnForService(serviceSlug: string, limit = 3): LinkedContent[] {
  return learnArticles
    .filter(a => a.relatedServices.includes(serviceSlug))
    .slice(0, limit)
    .map(a => toLinked({
      type: 'learn',
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      url: learnUrl(a.slug),
      relevance: 10,
    }))
}

export function getServiceRelatedContentGroups(serviceSlug: string): RelatedContentGroup[] {
  const groups: RelatedContentGroup[] = []

  const blogs = getBlogsForService(serviceSlug)
  if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })

  const learn = getLearnForService(serviceSlug)
  if (learn.length > 0) groups.push({ heading: 'Knowledge Center', items: learn })

  return groups
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

export function getServiceLinksForFaq(limit = 6): LinkedContent[] {
  return getFaqPageServices()
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

  const relatedServices = getComplementaryServices(serviceSlug, 3)

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
      groups.push(...getServiceRelatedContentGroups(slug))
      break
    }

    case 'blog': {
      const services = getServicesForBlog(slug)
      if (services.length > 0) groups.push({ heading: 'Related Services', items: services })

      const blogs = getBlogsForBlog(slug)
      if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })

      const faqs = getFaqsForBlog(slug)
      if (faqs.length > 0) groups.push({ heading: 'Related FAQs', items: faqs })
      break
    }

    case 'city': {
      const services = getServicesForCity(slug).slice(0, 6)
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

    case 'project': {
      const galleryServices = ['retaining-walls', 'paver-patio', 'ponds-water-features']
      const services = allServices
        .filter(s => galleryServices.includes(s.slug))
        .map(s => toLinked({
          type: 'service', slug: s.slug, title: s.name, excerpt: s.shortDesc,
          url: serviceUrl(s.slug), relevance: 5,
        }))
      if (services.length > 0) groups.push({ heading: 'Services', items: services })

      const blogs = blogPosts.slice(0, 3).map(p => toLinked({
        type: 'blog', slug: p.slug, title: p.title, excerpt: p.excerpt,
        url: blogUrl(p.slug), relevance: 4,
      }))
      if (blogs.length > 0) groups.push({ heading: 'Related Articles', items: blogs })
      break
    }
  }

  return groups
}

export type ContentSegment =
  | { type: 'text'; content: string }
  | { type: 'link'; content: string; url: string; title: string }

export function getContentSegments(
  content: string,
  maxLinks = 3,
  excludeSlugs: string[] = [],
): ContentSegment[] {
  const candidates = getContextualLinks(content, maxLinks, excludeSlugs)
  if (candidates.length === 0) return [{ type: 'text', content }]

  const matches: { index: number; text: string; candidate: LinkedContent }[] = []

  for (const candidate of candidates) {
    const idx = content.indexOf(candidate.title)
    if (idx !== -1) {
      matches.push({ index: idx, text: candidate.title, candidate })
    }
  }

  matches.sort((a, b) => a.index - b.index)

  const result: ContentSegment[] = []
  let lastIndex = 0

  for (const match of matches) {
    if (match.index > lastIndex) {
      result.push({ type: 'text', content: content.slice(lastIndex, match.index) })
    }
    result.push({ type: 'link', content: match.text, url: match.candidate.url, title: match.candidate.title })
    lastIndex = match.index + match.text.length
  }

  if (lastIndex < content.length) {
    result.push({ type: 'text', content: content.slice(lastIndex) })
  }

  return result
}

export function getContextualLinks(
  content: string,
  maxLinks = 3,
  excludeSlugs: string[] = [],
): LinkedContent[] {
  const contentLower = content.toLowerCase()
  const candidates: LinkedContent[] = []
  const excluded = new Set(excludeSlugs)

  for (const service of allServices) {
    if (excluded.has(service.slug)) continue
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
