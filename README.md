# A1 Property Services

Marketing site for [A1 Property Services](https://a1pslandscape.com), a landscaping and hardscaping company serving Cedar Falls, Waterloo, and Black Hawk County, Iowa.

**Live site:** [a1pslandscape.com](https://a1pslandscape.com)

## Stack

- Next.js 14 (App Router) with static export
- Tailwind CSS
- Cloudflare Workers + Pages (`wrangler`)

## Local development

```bash
npm ci
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Common scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build:deploy` | Production build, feed, and redirect validation |
| `npm run deploy` | Build, deploy with Wrangler, and submit IndexNow |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript (`tsc --noEmit`) |

## Deploy

Pushes to `main` deploy through GitHub Actions to Cloudflare. Manual deploy:

```bash
npm run deploy
```
