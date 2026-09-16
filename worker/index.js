import { handleContact } from './api/contact.js'
import { handleReindex } from './api/reindex.js'
import { handleReviews } from './api/reviews.js'
import { resolveRedirectDestination } from '../lib/migration-redirects.mjs'

const CACHE_IMMUTABLE = 'public, max-age=31536000, immutable'
const CACHE_HTML = 'public, max-age=600, stale-while-revalidate=86400, stale-if-error=86400'

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

const APEX_HOST = 'a1pslandscape.com'
const WWW_HOST = 'www.a1pslandscape.com'
const CANONICAL_ORIGIN = `https://${APEX_HOST}`

const FEED_PATHS = new Set(['/feed', '/comments/feed'])
const SITEMAP_ALIAS_PATHS = new Set([
  '/sitemap_index.xml',
  '/page-sitemap.xml',
  '/post-sitemap.xml',
  '/category-sitemap.xml',
])

const ROBOTS_TXT = `# Keep AI search and training crawlers on the same allow policy.
# Cloudflare managed robots.txt (if still prepended) is also disabled via
# npm run cf:sync-ai-crawlers when a token with Bot Management Write is available.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you
Disallow: /?s=

User-agent: GPTBot
User-agent: ChatGPT-User
User-agent: OAI-SearchBot
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: anthropic-ai
User-agent: Google-Extended
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: Amazonbot
User-agent: CCBot
User-agent: Bytespider
User-agent: meta-externalagent
User-agent: FacebookBot
User-agent: Cohere-ai
User-agent: Diffbot
User-agent: AI2Bot
User-agent: Bingbot
User-agent: Google-CloudVertexBot
User-agent: DuckAssistBot
Allow: /
Disallow: /api/
Disallow: /thank-you
Disallow: /?s=

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`

function mimeTypeForPath(pathname) {
  if (pathname.endsWith('.avif')) return 'image/avif'
  if (pathname.endsWith('.webp')) return 'image/webp'
  if (pathname.endsWith('.woff2')) return 'font/woff2'
  return null
}

function applyEdgeHeaders(headers, pathname) {
  headers.set('Cache-Control', cacheControlForPath(pathname))
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value)
  }
  const mime = mimeTypeForPath(pathname)
  if (mime) headers.set('Content-Type', mime)
}

function cacheControlForPath(pathname) {
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/images/') ||
    /\.(?:avif|webp|jpe?g|png|gif|svg|ico|woff2?|ttf|eot|mp4|webm|txt)$/i.test(pathname)
  ) {
    return CACHE_IMMUTABLE
  }

  return CACHE_HTML
}

/** Windows export stores `__next.privacy.__PAGE__.txt` as `__next.privacy/__PAGE__.txt`. */
function rscAliasPath(pathname) {
  const slash = pathname.lastIndexOf('/')
  if (slash < 0) return null
  const file = pathname.slice(slash + 1)
  const match = file.match(/^(__next\.[^/]+)\.(__.+)\.txt$/)
  if (!match) return null
  return `${pathname.slice(0, slash)}/${match[1]}/${match[2]}.txt`
}

function serveAsset(request, env, pathname) {
  const assetUrl = new URL(request.url)
  assetUrl.hostname = APEX_HOST
  assetUrl.protocol = 'https:'
  assetUrl.pathname = pathname
  return env.ASSETS.fetch(new Request(assetUrl.toString(), request)).then((response) => {
    if (!response.ok) return response
    const headers = new Headers(response.headers)
    applyEdgeHeaders(headers, pathname)
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  })
}

function htmlAliasDestination(pathname) {
  if (pathname === '/404.html' || pathname === '/500.html') return null
  if (pathname === '/index.html' || pathname === '/index.htm') return '/'
  if (pathname.endsWith('/index.html')) {
    const trimmed = pathname.slice(0, -'/index.html'.length)
    return trimmed || '/'
  }
  if (pathname.endsWith('.html')) {
    return pathname.slice(0, -'.html'.length) || '/'
  }
  if (pathname.endsWith('.htm')) {
    return pathname.slice(0, -'.htm'.length) || '/'
  }
  return null
}

function isHttpRequest(request, url) {
  if (url.protocol === 'http:') return true
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
  if (forwardedProto === 'http') return true
  try {
    const cf = request.headers.get('cf-visitor')
    if (cf) return JSON.parse(cf).scheme === 'http'
  } catch {
    /* ignore */
  }
  return false
}

/**
 * Single-hop Location for AMP suffixes, WP `?s=` search,
 * the literal `/*` 404 Google crawled, and the migration redirect map.
 * Trailing slashes of canonical paths are served as 200 aliases, not 301s.
 * Returns null when the request is already on its canonical URL.
 */
function canonicalRedirectLocation(url, path, normalizedPath) {
  const hadSearchQuery = url.searchParams.has('s')
  const params = new URLSearchParams(url.searchParams)
  params.delete('s')
  params.delete('amp')

  let destPath = normalizedPath === '/*' ? '/' : resolveRedirectDestination(normalizedPath)
  if (hadSearchQuery && (normalizedPath === '/' || normalizedPath === '/*')) destPath = '/'

  const destSearch = params.toString() ? `?${params.toString()}` : ''
  const destHash = url.hash
  const destination = `${destPath}${destSearch}${destHash}`
  const current = `${path}${url.search}${url.hash}`

  if (destination === current) return null
  return `${CANONICAL_ORIGIN}${destination}`
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    if (url.hostname === 'preview.a1pslandscape.com') {
      return new Response('Preview environment disabled. Visit https://a1pslandscape.com/', {
        status: 410,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    // Safety net: one 301 to https://apex when www/HTTP reaches the Worker.
    // Primary path is Cloudflare Single Redirect + Always Use HTTPS OFF
    // (see redirects/README.md).
    const needsApex = url.hostname === WWW_HOST
    const needsHttps = isHttpRequest(request, url)
    if (needsApex || needsHttps) {
      return Response.redirect(`${CANONICAL_ORIGIN}${path}${url.search}${url.hash}`, 301)
    }

    const normalizedPath = path.length > 1 ? path.replace(/\/+$/, '') : path

    // Serve WordPress/Cloudflare aliases as 200 copies of the canonical file.
    // Ahrefs flags leftover 3XX URLs it keeps recrawling (/feed, /index.html, sitemap_index.xml).
    if (FEED_PATHS.has(normalizedPath)) {
      return serveAsset(request, env, '/feed.xml')
    }
    if (SITEMAP_ALIAS_PATHS.has(normalizedPath)) {
      return serveAsset(request, env, '/sitemap.xml')
    }
    const htmlAlias = htmlAliasDestination(normalizedPath)
    if (htmlAlias) {
      return serveAsset(request, env, htmlAlias)
    }

    const destPath = normalizedPath === '/*' ? '/' : resolveRedirectDestination(normalizedPath)
    const isTrailingSlashAlias =
      path !== normalizedPath &&
      destPath === normalizedPath &&
      !url.searchParams.has('s') &&
      !url.searchParams.has('amp')
    if (isTrailingSlashAlias) {
      return serveAsset(request, env, destPath)
    }

    // One-hop 301: AMP suffixes, WP search, legacy slugs, ranking dupes.
    const canonicalRedirect = canonicalRedirectLocation(url, path, normalizedPath)
    if (canonicalRedirect) {
      return Response.redirect(canonicalRedirect, 301)
    }

    if (path === '/robots.txt') {
      const headers = new Headers({
        'Content-Type': 'text/plain; charset=utf-8',
      })
      applyEdgeHeaders(headers, path)
      return new Response(ROBOTS_TXT, { status: 200, headers })
    }

    if (path === '/api/reindex') {
      return handleReindex(request, env)
    }

    if (path === '/api/reviews') {
      return handleReviews(request, env)
    }

    if (path === '/api/contact') {
      return handleContact(request, env)
    }

    const response = await env.ASSETS.fetch(request)
    if (response.ok) {
      const headers = new Headers(response.headers)
      applyEdgeHeaders(headers, path)
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    }

    const rscPath = rscAliasPath(path)
    if (rscPath) {
      return serveAsset(request, env, rscPath)
    }

    return response
  },
}
