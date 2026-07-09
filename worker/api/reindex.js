const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

async function getSitemapUrls(env) {
  const res = await env.ASSETS.fetch(new Request('https://a1pslandscape.com/sitemap.xml'))
  if (!res.ok) {
    throw new Error(`Failed to read sitemap.xml from assets: HTTP ${res.status}`)
  }
  const xml = await res.text()
  const urls = []
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    urls.push(m[1])
  }
  if (urls.length === 0) {
    throw new Error('sitemap.xml contained no <loc> URLs')
  }
  return urls
}

async function submitToIndexNow(host, key, urlList) {
  const BATCH_SIZE = 100
  const BATCH_DELAY_MS = 1500
  const keyLocation = `https://${host}/${key}.txt`
  const batches = []
  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    batches.push(urlList.slice(i, i + BATCH_SIZE))
  }

  const results = []
  for (let i = 0; i < batches.length; i++) {
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS))
    }
    const batch = batches[i]
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
    })
    const text = await res.text()
    results.push({ batch: i + 1, status: res.status, ok: res.ok, count: batch.length, message: text })
    if (!res.ok && res.status === 429) {
      return { ok: false, status: res.status, results, rateLimited: true }
    }
    if (!res.ok) {
      return { ok: false, status: res.status, results }
    }
  }

  return { ok: true, status: 200, results, batchCount: batches.length }
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
  const urlList = urls ?? await getSitemapUrls(env)

  const submission = await submitToIndexNow(host, key, urlList)
  const lastResult = submission.results?.at(-1)

  return Response.json(
    {
      ok: submission.ok,
      status: submission.status,
      engine: 'indexnow',
      urlCount: urlList.length,
      batchCount: submission.batchCount ?? submission.results?.length ?? 1,
      rateLimited: submission.rateLimited ?? false,
      message: lastResult?.message || (submission.ok ? 'URLs submitted to IndexNow' : 'IndexNow rejected the request'),
    },
    { status: submission.ok ? 200 : 502, headers: CORS_HEADERS },
  )
}
