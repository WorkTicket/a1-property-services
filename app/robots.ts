import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

const DISALLOW = ['/api/', '/thank-you']

/**
 * Explicit allow-list for AI search + training crawlers.
 * Cloudflare managed robots.txt was blocking a subset of these (GPTBot,
 * Google-Extended, ClaudeBot, etc.) while User-agent * still allowed others —
 * Ahrefs flags that as an inconsistent training policy and as indexable pages
 * blocked from AI search bots. Keep every named AI bot on the same Allow rules.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
  'FacebookBot',
  'Cohere-ai',
  'Diffbot',
  'AI2Bot',
  'Bingbot',
  'Google-CloudVertexBot',
  'DuckAssistBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
