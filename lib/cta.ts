import { cities } from '@/lib/cities'
import { RANKING_LANDING_PATHS } from '@/lib/services'

export const CTA_COPY = {
  quote: 'Get a Free Quote',
  gallery: 'See Our Work',
  learnMore: 'Learn More',
  readMore: 'Read More',
  estimate: 'Request an Estimate',
  callNow: 'Call Now',
  viewGallery: 'View Completed Projects',
  contactTeam: 'Contact the Team',
} as const

/** Dedicated quote page. */
export const QUOTE_HREF = '/contact'
export const ESTIMATE_HASH = '#estimate'
export const ESTIMATE_ID = 'estimate'
export const QUOTE_NAME_ID = 'quote-name'
export const QUOTE_INTENT_EVENT = 'a1:quote-intent'

const INLINE_ESTIMATE_PATHS = new Set<string>([
  '/contact',
  '/about',
  '/faqs',
  '/gallery',
  '/services',
  ...RANKING_LANDING_PATHS,
])

const NON_CITY_ROOTS = new Set([
  'about',
  'gallery',
  'blog',
  'contact',
  'faqs',
  'resources',
  'learn',
  'privacy',
  'terms',
  'thank-you',
  'services',
  'site-map',
  ...RANKING_LANDING_PATHS.map((path) => path.replace(/^\//, '')),
])

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/'
}

export function hasInlineQuoteForm(pathname: string): boolean {
  const path = normalizePathname(pathname)
  if (path === '/') return true
  if (INLINE_ESTIMATE_PATHS.has(path)) return true
  if (path.startsWith('/services/')) return true
  if (path.startsWith('/gallery/')) return true
  const parts = path.split('/').filter(Boolean)
  return parts.length >= 1 && parts.length <= 2 && !NON_CITY_ROOTS.has(parts[0])
}

export function quoteContextFromPath(pathname: string): { service?: string; city?: string } {
  const parts = normalizePathname(pathname).split('/').filter(Boolean)
  if (parts[0] === 'services' && parts[1]) return { service: parts[1] }
  const city = cities.find((entry) => entry.slug === parts[0])
  if (city && parts[1]) return { city: city.name, service: parts[1] }
  if (city) return { city: city.name }
  return {}
}

export function quotePageHref(opts?: { service?: string; city?: string }): string {
  const params = new URLSearchParams()
  if (opts?.service) params.set('service', opts.service)
  if (opts?.city) params.set('city', opts.city)
  const query = params.toString()
  return query ? `${QUOTE_HREF}?${query}` : QUOTE_HREF
}

/**
 * Primary quote CTA destination for the current page.
 * Home always goes to the dedicated contact page. Pages with an inline form
 * jump to that form. Everywhere else opens /contact, with service/city when known.
 */
export function quoteHrefForPath(pathname: string): string {
  const path = normalizePathname(pathname)
  if (path === '/') return QUOTE_HREF
  if (path === QUOTE_HREF) return ESTIMATE_HASH
  if (hasInlineQuoteForm(path)) return ESTIMATE_HASH
  return quotePageHref(quoteContextFromPath(path))
}

export function isHashHref(href: string): boolean {
  return href.startsWith('#')
}
