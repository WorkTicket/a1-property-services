const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

async function getAllSiteUrls() {
  const base = 'https://a1pslandscape.com'
  const slugs = [
    '', 'about', 'gallery', 'contact', 'services',
    'blog', 'thank-you',
    'services/retaining-walls', 'services/paver-patio',
    'services/ponds-water-features', 'services/landscape-installation',
    'services/lawn-care', 'services/hydroseeding',
    'services/preservation-restoration', 'services/tree-service',
    'services/landscape-maintenance', 'services/snow-removal',
    'services/landscape-design', 'services/drainage',
    'services/excavation', 'services/sod-installation',
    'services/mulching', 'services/rock-landscaping',
    'services/tree-planting', 'services/shrub-installation',
    'services/commercial-landscaping', 'services/residential-landscaping',
    'services/grading', 'services/outdoor-living',
  ]
  return slugs.map(s => `${base}/${s}`)
}

export async function handleReindex(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  const secret = env.REINDEX_WEBHOOK_SECRET
  if (!secret) {
    return Response.json({ error: 'Reindex webhook is not configured' }, { status: 503, headers: CORS_HEADERS })
  }

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401, headers: CORS_HEADERS })
  }

  const key = env.INDEXNOW_KEY
  if (!key) {
    return Response.json({ error: 'INDEXNOW_KEY is not configured' }, { status: 503, headers: CORS_HEADERS })
  }

  let urls
  try {
    const body = await request.json().catch(() => null)
    if (body?.urls && Array.isArray(body.urls)) {
      urls = body.urls.filter((u) => typeof u === 'string')
    }
  } catch {}

  const host = 'a1pslandscape.com'
  const urlList = urls ?? await getAllSiteUrls()

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
  })

  const text = await res.text()

  return Response.json(
    {
      ok: res.ok,
      status: res.status,
      engine: 'indexnow',
      urlCount: urls?.length ?? 'all',
      message: text || (res.ok ? 'URLs submitted to IndexNow' : 'IndexNow rejected the request'),
    },
    { status: res.ok ? 200 : 502, headers: CORS_HEADERS },
  )
}
