/**
 * 301 redirect map for WordPress → Next.js migration (a1pslandscape.com).
 *
 * Sources were verified against the live WordPress sitemap (Jul 2026).
 * Ranking URLs that exist on the new site are intentionally omitted.
 *
 * Keep CITY_SLUGS / RANKING_SERVICE_REDIRECTS in sync with lib/cities.ts
 * and lib/services.ts `legacyLandingPageHrefs`.
 *
 * @typedef {{ from: string, to: string, reason: string }} MigrationRedirect
 */

/** @type {string[]} */
const CITY_SLUGS = [
  'cedar-falls',
  'waterloo',
  'hudson',
  'evansdale',
  'waverly',
  'denver',
  'jesup',
  'parkersburg',
  'la-porte-city',
  'dike',
  'elk-run-heights',
  'dunkerton',
]

/** City×service and /services/ URLs that duplicate a ranking landing page. */
const RANKING_SERVICE_REDIRECTS = {
  'retaining-walls': '/retaining-wall-in-cedar-falls',
  'paver-patio': '/paver-patio-installation',
  'paver-driveway': '/paver-driveway-cedar-falls',
  'ponds-water-features': '/cedar-falls-water-features',
}

/** @type {MigrationRedirect[]} */
const rankingDuplicateRedirects = Object.entries(RANKING_SERVICE_REDIRECTS).flatMap(
  ([serviceSlug, to]) => [
    {
      from: `/services/${serviceSlug}`,
      to,
      reason: 'Service index URL duplicates ranking landing page',
    },
    ...CITY_SLUGS.map((city) => ({
      from: `/${city}/${serviceSlug}`,
      to,
      reason: 'City×service URL duplicates ranking landing page',
    })),
  ],
)

/** @type {MigrationRedirect[]} */
export const migrationRedirects = [
  {
    from: '/our-landscaping-company-cedar-falls',
    to: '/about',
    reason: 'WordPress About page slug',
  },
  {
    from: '/contact-landscaping-property-maintenance-cedar-falls',
    to: '/contact',
    reason: 'WordPress Contact page slug',
  },
  {
    from: '/professional-landscaping-services-cedar-falls',
    to: '/services',
    reason: 'Legacy services overview page',
  },
  {
    from: '/cedar-valley-landscaping-blog',
    to: '/blog',
    reason: 'WordPress blog index slug',
  },
  {
    from: '/cedar-falls-lawn-care-tips',
    to: '/blog/lawn-mowing-tips-iowa',
    reason: 'Closest match: lawn care tips article',
  },
  {
    from: '/cedar-falls-landscaping-design-tips',
    to: '/blog/landscape-design-principles-iowa',
    reason: 'Closest match: landscape design article',
  },
  {
    from: '/cedar-valley-lawn-care-guide',
    to: '/blog/seasonal-lawn-care-tips-iowa',
    reason: 'Closest match: year-round lawn care guide',
  },
  {
    from: '/category/blog',
    to: '/blog',
    reason: 'WordPress blog category archive',
  },
  {
    from: '/feed',
    to: '/feed.xml',
    reason: 'WordPress RSS feed',
  },
  {
    from: '/comments/feed',
    to: '/feed.xml',
    reason: 'WordPress comments RSS feed',
  },
  {
    from: '/amp',
    to: '/',
    reason: 'WordPress AMP homepage variant',
  },
  {
    from: '/sitemap_index.xml',
    to: '/sitemap.xml',
    reason: 'WordPress Rank Math sitemap index',
  },
  {
    from: '/page-sitemap.xml',
    to: '/sitemap.xml',
    reason: 'WordPress page sitemap',
  },
  {
    from: '/post-sitemap.xml',
    to: '/sitemap.xml',
    reason: 'WordPress post sitemap',
  },
  {
    from: '/category-sitemap.xml',
    to: '/sitemap.xml',
    reason: 'WordPress category sitemap',
  },
  // Legacy WordPress flat service URLs (no /services/ prefix)
  {
    from: '/landscape-installation',
    to: '/services/landscape-installation',
    reason: 'WordPress service page slug',
  },
  {
    from: '/lawn-care',
    to: '/services/lawn-care',
    reason: 'WordPress service page slug',
  },
  {
    from: '/tree-service',
    to: '/services/tree-service',
    reason: 'WordPress service page slug',
  },
  {
    from: '/landscape-maintenance',
    to: '/services/landscape-maintenance',
    reason: 'WordPress service page slug',
  },
  {
    from: '/landscape-preservation',
    to: '/services/preservation-restoration',
    reason: 'WordPress preservation service slug',
  },
  {
    from: '/sod-installation',
    to: '/services/sod-installation',
    reason: 'WordPress service page slug',
  },
  {
    from: '/snow-removal',
    to: '/services/snow-removal',
    reason: 'WordPress service page slug',
  },
  {
    from: '/ponds-and-water-gardens',
    to: '/cedar-falls-water-features',
    reason: 'WordPress ponds & water gardens slug',
  },
  {
    from: '/ponds',
    to: '/cedar-falls-water-features',
    reason: 'WordPress short ponds slug',
  },
  {
    from: '/landscaping-property-maintenance-cedar-falls',
    to: '/landscaping-services-in-cedar-falls',
    reason: 'Legacy landscaping hub slug variant',
  },
  {
    from: '/gallery/backyard-lawn-mowing-cedar-falls',
    to: '/gallery/overgrown-front-yard-mowing-cedar-falls',
    reason: 'Mislabeled backyard mowing case study is a front yard',
  },
  {
    from: '/blog/excavation-prep-landscaping',
    to: '/services/excavation',
    reason: 'Blog post duplicates excavation service page',
  },
  ...rankingDuplicateRedirects,
]

/**
 * Legacy URLs preserved on the new site (no redirect required).
 * @type {string[]}
 */
export const preservedLegacyPaths = [
  '/',
  '/gallery',
  '/retaining-wall-in-cedar-falls',
  '/paver-patio-installation',
  '/paver-driveway-cedar-falls',
  '/cedar-falls-water-features',
  '/landscaping-services-in-cedar-falls',
]

/** @param {string} path */
export function normalizeRedirectPath(path) {
  const trimmed = path.trim()
  if (!trimmed.startsWith('/')) {
    throw new Error(`Redirect path must start with /: ${path}`)
  }
  return trimmed.replace(/\/+$/, '') || '/'
}

/** @param {MigrationRedirect[]} redirects */
export function buildRedirectMap(redirects) {
  /** @type {Record<string, string>} */
  const map = {}
  for (const { from, to } of redirects) {
    const source = normalizeRedirectPath(from)
    const destination = normalizeRedirectPath(to)
    if (source === destination) {
      throw new Error(`Redirect source and destination are identical: ${source}`)
    }
    if (map[source]) {
      throw new Error(`Duplicate redirect source: ${source}`)
    }
    map[source] = destination
  }
  return map
}

/** @param {MigrationRedirect[]} redirects */
export function detectRedirectChains(redirects) {
  const map = buildRedirectMap(redirects)
  /** @type {string[][]} */
  const chains = []

  for (const source of Object.keys(map)) {
    /** @type {string[]} */
    const chain = [source]
    let target = map[source]
    let hops = 0
    while (map[target] && hops < 10) {
      chain.push(target)
      target = map[target]
      hops++
    }
    if (chain.length > 1) {
      chain.push(target)
      chains.push(chain)
    }
  }

  return chains
}

/**
 * Strip a WordPress AMP path suffix (`/amp` or `/…/amp`) in one step.
 * @param {string} path
 */
export function stripAmpPath(path) {
  const normalized = normalizeRedirectPath(path)
  if (normalized === '/amp') return '/'
  if (normalized.endsWith('/amp')) {
    return normalized.slice(0, -'/amp'.length) || '/'
  }
  return normalized
}

/**
 * Final 301 destination for a request path (AMP suffix + migration map, no chains).
 * Trailing slashes are ignored. Returns the canonical path even when no redirect is needed.
 * @param {string} path
 */
export function resolveRedirectDestination(path) {
  let current = stripAmpPath(path)
  let hops = 0
  while (hops < 5) {
    const stripped = stripAmpPath(current)
    if (stripped !== current) {
      current = stripped
      hops++
      continue
    }
    break
  }

  const map = buildRedirectMap(migrationRedirects)
  hops = 0
  while (map[current] && hops < 10) {
    current = stripAmpPath(map[current])
    hops++
  }
  return current
}
