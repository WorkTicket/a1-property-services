import { blogPosts } from '@/lib/blog'
import { learnArticles } from '@/lib/learn'
import { siteConfig } from '@/lib/metadata'
import { allServices } from '@/lib/services'
import { cities } from '@/lib/cities'
import { projectCaseStudies } from '@/lib/project-case-studies'

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
    '/privacy',
    '/terms',
    '/site-map',
    '/retaining-wall-in-cedar-falls',
    '/paver-patio-installation',
    '/cedar-falls-water-features',
    '/landscaping-services-in-cedar-falls',
  ]
  const staticUrls = staticPaths.map((path) => `${base}${path}`)
  const serviceUrls = allServices.map((s) => `${base}/services/${s.slug}`)
  const blogUrls = blogPosts.map((p) => `${base}/blog/${p.slug}`)
  const learnUrls = learnArticles.map((a) => `${base}/learn/${a.slug}`)
  const projectUrls = projectCaseStudies.map((study) => `${base}/gallery/${study.slug}`)
  const cityUrls = cities.map((c) => `${base}/${c.slug}`)
  const programmaticUrls: string[] = []
  for (const city of cities) {
    for (const service of allServices) {
      programmaticUrls.push(`${base}/${city.slug}/${service.slug}`)
    }
  }

  return [...staticUrls, ...serviceUrls, ...blogUrls, ...learnUrls, ...projectUrls, ...cityUrls, ...programmaticUrls]
}

export type SiteMapGroup = {
  heading: string
  links: { name: string; href: string }[]
}

/** Grouped internal links for the HTML site map (second inbound link for thin pages). */
export function getHtmlSitemapGroups(): SiteMapGroup[] {
  const core: SiteMapGroup = {
    heading: 'Main Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Knowledge Center', href: '/learn' },
      { name: 'Resources', href: '/resources' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
    ],
  }

  const featured: SiteMapGroup = {
    heading: 'Popular Services',
    links: [
      { name: 'Landscaping in Cedar Falls', href: '/landscaping-services-in-cedar-falls' },
      { name: 'Retaining Walls', href: '/retaining-wall-in-cedar-falls' },
      { name: 'Paver Patio Installation', href: '/paver-patio-installation' },
      { name: 'Water Features', href: '/cedar-falls-water-features' },
    ],
  }

  const services: SiteMapGroup = {
    heading: 'All Services',
    links: allServices.map((service) => ({
      name: service.name,
      href: `/services/${service.slug}`,
    })),
  }

  const cityHubs: SiteMapGroup = {
    heading: 'Service Areas',
    links: cities.map((city) => ({
      name: `${city.name}, IA`,
      href: `/${city.slug}`,
    })),
  }

  const learn: SiteMapGroup = {
    heading: 'Guides',
    links: learnArticles.map((article) => ({
      name: article.title,
      href: `/learn/${article.slug}`,
    })),
  }

  const projects: SiteMapGroup = {
    heading: 'Project Case Studies',
    links: projectCaseStudies.map((study) => ({
      name: study.h1,
      href: `/gallery/${study.slug}`,
    })),
  }

  const blog: SiteMapGroup = {
    heading: 'Blog',
    links: blogPosts.map((post) => ({
      name: post.title,
      href: `/blog/${post.slug}`,
    })),
  }

  const cityServices: SiteMapGroup[] = cities.map((city) => ({
    heading: `Services in ${city.name}`,
    links: allServices.map((service) => ({
      name: `${service.name} in ${city.name}`,
      href: `/${city.slug}/${service.slug}`,
    })),
  }))

  return [core, featured, services, cityHubs, learn, projects, blog, ...cityServices]
}
