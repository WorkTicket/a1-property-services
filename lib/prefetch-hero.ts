'use client'

const HERO_WIDTHS = [640, 768, 1024, 1280, 1536, 1920, 2560] as const

const PAGE_HEROES: Record<string, string> = {
  '/': '/images/hero-background-image.webp',
  '/gallery': '/images/gallery-hero.webp',
  '/about': '/images/about-hero.webp',
  '/contact': '/images/contact-hero-truck.png',
  '/services': '/images/services-hero.webp',
  '/blog': '/images/blog-hero.webp',
  '/learn': '/images/learn-hero.webp',
  '/faqs': '/images/faqs-hero.webp',
  '/resources': '/images/resources-hero.webp',
  '/landscaping-services-in-cedar-falls': '/images/content-landscaping-cedar-falls.webp',
  '/retaining-wall-in-cedar-falls': '/images/retaining-wall.webp',
  '/paver-patio-installation': '/images/paver-patio-hero.webp',
  '/cedar-falls-water-features': '/images/water-feature-image-1.webp',
}

const SERVICE_HEROES: Record<string, string> = {
  'retaining-walls': '/images/retaining-wall.webp',
  'paver-patio': '/images/paver-patio-hero.webp',
  'paver-driveway': '/images/driveway-after-2.webp',
  'ponds-water-features': '/images/water-feature-image-1.webp',
  'landscape-installation': '/images/service-landscape-installation.webp',
  'landscape-maintenance': '/images/patio-wall.webp',
  'lawn-care': '/images/service-lawn-care.webp',
  hydroseeding: '/images/sprinklers.webp',
  'preservation-restoration': '/images/service-preservation-restoration.webp',
  'tree-service': '/images/service-tree-service.webp',
  'snow-removal': '/images/service-snow-removal.webp',
  'landscape-design': '/images/service-landscape-design.webp',
  drainage: '/images/service-drainage.webp',
  excavation: '/images/service-excavation.webp',
  'sod-installation': '/images/service-sod-installation.webp',
  mulching: '/images/service-mulching.webp',
  'rock-landscaping': '/images/service-rock-landscaping.webp',
  'tree-planting': '/images/service-tree-planting.webp',
  'shrub-installation': '/images/service-shrub-installation.webp',
  'commercial-landscaping': '/images/service-commercial-landscaping.webp',
  'residential-landscaping': '/images/service-residential-landscaping.webp',
  grading: '/images/service-grading.webp',
  'outdoor-living': '/images/service-outdoor-living.webp',
}

const CITY_HEROES: Record<string, string> = {
  'cedar-falls': '/images/city-hero-cedar-falls.webp',
  waterloo: '/images/city-hero-waterloo.webp',
  hudson: '/images/city-hero-hudson.webp',
  evansdale: '/images/city-hero-evansdale.webp',
  waverly: '/images/city-hero-waverly.webp',
  denver: '/images/city-hero-denver.webp',
  jesup: '/images/city-hero-jesup.webp',
  parkersburg: '/images/city-hero-parkersburg.webp',
  'la-porte-city': '/images/city-hero-la-porte-city.webp',
  dike: '/images/city-hero-dike.webp',
  'elk-run-heights': '/images/city-hero-elk-run-heights.webp',
  dunkerton: '/images/city-hero-dunkerton.webp',
}

const prefetched = new Set<string>()

function normalizePath(href: string): string | null {
  if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return null
  }
  if (/^(https?:)?\/\//i.test(href) || href.startsWith('http')) {
    try {
      const url = new URL(href, window.location.origin)
      if (url.origin !== window.location.origin) return null
      href = url.pathname
    } catch {
      return null
    }
  }

  const path = href.split('#')[0]?.split('?')[0] ?? href
  if (!path.startsWith('/')) return null
  if (path === '/') return '/'
  return path.replace(/\/$/, '')
}

export function heroSrcForPath(pathname: string): string | undefined {
  const path = pathname.replace(/\/$/, '') || '/'
  if (PAGE_HEROES[path]) return PAGE_HEROES[path]
  if (path.startsWith('/learn/')) return PAGE_HEROES['/learn']

  if (path.startsWith('/services/')) {
    const slug = path.slice('/services/'.length)
    return SERVICE_HEROES[slug]
  }

  const [citySlug] = path.slice(1).split('/')
  if (citySlug && CITY_HEROES[citySlug] && path === `/${citySlug}`) {
    return CITY_HEROES[citySlug]
  }

  return undefined
}

function pickHeroWidth() {
  const needed = Math.round(window.innerWidth * Math.min(window.devicePixelRatio || 1, 2))
  const capped = Math.min(needed, 1920)
  return HERO_WIDTHS.find((width) => width >= capped) ?? 1920
}

function generatedHeroUrl(src: string, width: number) {
  const base = src.replace(/^\/images\//, '').replace(/\.(webp|png|jpg|jpeg|avif)$/i, '')
  return `/images/generated/${base}-${width}.avif`
}

export function prefetchHeroSrc(src: string) {
  if (!src || prefetched.has(src) || typeof document === 'undefined') return
  prefetched.add(src)

  const url = generatedHeroUrl(src, pickHeroWidth())
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  link.type = 'image/avif'
  document.head.appendChild(link)
}

export function prefetchHeroForPath(href: string) {
  const path = normalizePath(href)
  const current = window.location.pathname.replace(/\/$/, '') || '/'
  if (!path || path === current) return
  const src = heroSrcForPath(path)
  if (src) prefetchHeroSrc(src)
}

export function shouldSkipHeroPrefetch() {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string }
  }).connection
  return Boolean(
    connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g',
  )
}
