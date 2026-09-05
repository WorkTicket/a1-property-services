import { handleContact } from './api/contact.js'
import { handleReindex } from './api/reindex.js'
import { handleReviews } from './api/reviews.js'

const CACHE_IMMUTABLE = 'public, max-age=31536000, immutable'
const CACHE_HTML = 'public, max-age=3600, must-revalidate'

const APEX_HOST = 'a1pslandscape.com'
const WWW_HOST = 'www.a1pslandscape.com'
const CANONICAL_ORIGIN = `https://${APEX_HOST}`

const ROBOTS_TXT = `# Keep AI search and training crawlers on the same allow policy.
# Cloudflare managed robots.txt (if still prepended) is also disabled via
# npm run cf:sync-ai-crawlers when a token with Bot Management Write is available.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you

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

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`

function cacheControlForPath(pathname) {
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/images/') ||
    /\.(?:avif|webp|jpe?g|png|gif|svg|ico|woff2?|ttf|eot|mp4|webm)$/i.test(pathname)
  ) {
    return CACHE_IMMUTABLE
  }

  if (pathname.endsWith('.html') || pathname.endsWith('.xml') || pathname.endsWith('.txt')) {
    return CACHE_HTML
  }

  return null
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

    // Drop trailing slashes (except homepage) so internal links never land on a redirect
    if (path.length > 1 && path.endsWith('/')) {
      const destination = `${CANONICAL_ORIGIN}${path.replace(/\/+$/, '')}${url.search}${url.hash}`
      return Response.redirect(destination, 301)
    }

    // Cloudflare Pages serves /about.html and /about/index.html as 307 aliases.
    // Permanent 301 is the correct SEO signal (Ahrefs 3XX warning).
    const htmlAlias = htmlAliasDestination(path)
    if (htmlAlias) {
      return Response.redirect(`${CANONICAL_ORIGIN}${htmlAlias}${url.search}${url.hash}`, 301)
    }

    if (path === '/feed') {
      return Response.redirect(`${CANONICAL_ORIGIN}/feed.xml${url.search}${url.hash}`, 301)
    }

    // Drop legacy WordPress AMP query variants (?amp, ?amp=1)
    if (url.searchParams.has('amp')) {
      url.searchParams.delete('amp')
      const destination = `${url.pathname}${url.search}${url.hash}`
      return Response.redirect(`${url.origin}${destination || '/'}`, 301)
    }

    if (path === '/robots.txt') {
      return new Response(ROBOTS_TXT, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': CACHE_HTML,
        },
      })
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
    const cacheControl = cacheControlForPath(path)

    if (!cacheControl || !response.ok) {
      return response
    }

    const headers = new Headers(response.headers)
    headers.set('Cache-Control', cacheControl)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
}
