# Canonical redirects (best practice)

**Canonical host:** `https://a1pslandscape.com` (apex, not www)

| Layer | Role |
|-------|------|
| **Always Use HTTPS = OFF** | Required. Prevents `http://www → https://www → apex` chains. |
| **Cloudflare Single Redirect** | Edge single-hop: www or HTTP → `https://a1pslandscape.com` |
| **Worker** (`worker/index.js`) | Safety net: www/HTTP → HTTPS apex in one 301 |
| **HSTS** | App / Cloudflare headers after first secure visit |

## Dashboard (manual)

1. **SSL/TLS → Edge Certificates → Always Use HTTPS → Off**
2. **Rules → Redirect Rules** (or run sync script):
   - Expression: `(http.host eq "www.a1pslandscape.com") or (http.host eq "a1pslandscape.com" and http.request.scheme eq "http")`
   - Dynamic target: `concat("https://a1pslandscape.com", http.request.uri.path)`
   - Status `301`, preserve query string

## Sync via API

```powershell
$env:CLOUDFLARE_API_TOKEN="…"
npm run cf:sync-redirects
```

## Verify (one hop only)

```powershell
curl.exe -sI http://www.a1pslandscape.com/about
# Location: https://a1pslandscape.com/about

curl.exe -sI https://www.a1pslandscape.com/about
# Location: https://a1pslandscape.com/about

curl.exe -sI http://a1pslandscape.com/about
# Location: https://a1pslandscape.com/about
```

## AI crawlers (Ahrefs)

Cloudflare **AI Crawl Control → Managed robots.txt** must be **Off**. If it stays on, Cloudflare prepends `Disallow` for GPTBot, Google-Extended, ClaudeBot, and others while `User-agent: *` still allows the rest — Ahrefs flags every indexable URL.

Also set **Security → Bots → Block AI Bots** to off (or training-only). Then:

```powershell
$env:CLOUDFLARE_API_TOKEN="…"   # Bot Management Write
npm run cf:sync-ai-crawlers
```

