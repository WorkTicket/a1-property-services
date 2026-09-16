#!/usr/bin/env node
/**
 * Local static server with production-like cache headers for Lighthouse.
 */
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGzip } from 'node:zlib'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'out')
const PORT = Number(process.env.PORT || 3456)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
}

const GZIP_EXTS = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.map'])
const IMMUTABLE = 'public, max-age=31536000, immutable'
const HTML_CACHE = 'public, max-age=600, stale-while-revalidate=86400'

function cacheControl(filePath) {
  if (
    filePath.includes(`${path.sep}_next${path.sep}static${path.sep}`) ||
    filePath.includes(`${path.sep}images${path.sep}`) ||
    /\.(?:avif|webp|jpe?g|png|gif|svg|ico|woff2?|ttf|eot|mp4|webm|txt|css|js)$/i.test(filePath)
  ) {
    return IMMUTABLE
  }
  return HTML_CACHE
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const clean = decoded.replace(/\\/g, '/').replace(/\/+$/, '') || '/'
  const candidates = []
  if (clean === '/') candidates.push(path.join(OUT, 'index.html'))
  else {
    const rel = clean.replace(/^\//, '')
    candidates.push(
      path.join(OUT, rel),
      path.join(OUT, `${rel}.html`),
      path.join(OUT, rel, 'index.html'),
    )
  }
  for (const file of candidates) {
    if (existsSync(file) && statSync(file).isFile()) return file
  }
  return null
}

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const file = resolveFile(url.pathname)
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
    return
  }
  const ext = path.extname(file).toLowerCase()
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': cacheControl(file),
    'X-Content-Type-Options': 'nosniff',
  }
  const accept = String(req.headers['accept-encoding'] || '')
  const useGzip = GZIP_EXTS.has(ext) && accept.includes('gzip')
  if (useGzip) {
    headers['Content-Encoding'] = 'gzip'
    headers.Vary = 'Accept-Encoding'
  }
  res.writeHead(200, headers)
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  const stream = createReadStream(file)
  if (useGzip) stream.pipe(createGzip({ level: 6 })).pipe(res)
  else stream.pipe(res)
})

server.listen(PORT, () => {
  console.log(`serve-out: http://localhost:${PORT}`)
})
