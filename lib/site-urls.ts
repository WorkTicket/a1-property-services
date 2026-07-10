import { blogPosts } from '@/lib/blog'
import { learnArticles } from '@/lib/learn'
import { siteConfig } from '@/lib/metadata'
import { allServices } from '@/lib/services'
import { cities } from '@/lib/cities'

/** URLs that should appear in sitemap.xml (excludes non-canonical duplicates). */
export function getSitemapUrls(): string[] {
  return getAllSiteUrls()
}

export function getAllSiteUrls(): string[] {
  const base = siteConfig.url

  const staticPaths = [
    '',
    '/about',
    '/services',
    '/gallery',
    '/contact',
    '/blog',
    '/faqs',
    '/resources',
    '/learn',
    '/retaining-wall-in-cedar-falls',
    '/paver-patio-installation',
    '/cedar-falls-water-features',
    '/landscaping-services-in-cedar-falls',
  ]
  const staticUrls = staticPaths.map((path) => `${base}${path}`)
  const serviceUrls = allServices.map((s) => `${base}/services/${s.slug}`)
  const blogUrls = blogPosts.map((p) => `${base}/blog/${p.slug}`)
  const learnUrls = learnArticles.map((a) => `${base}/learn/${a.slug}`)
  const cityUrls = cities.map((c) => `${base}/${c.slug}`)
  const programmaticUrls: string[] = []
  for (const city of cities) {
    for (const service of allServices) {
      programmaticUrls.push(`${base}/${city.slug}/${service.slug}`)
    }
  }

  return [...staticUrls, ...serviceUrls, ...blogUrls, ...learnUrls, ...cityUrls, ...programmaticUrls]
}
