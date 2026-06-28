import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog'
import { learnArticles } from '@/lib/learn'
import { siteConfig } from '@/lib/metadata'
import { getAllSiteUrls } from '@/lib/site-urls'

export default function sitemap(): MetadataRoute.Sitemap {
  const allUrls = getAllSiteUrls()

  return allUrls.map((url) => {
    const path = url.replace(siteConfig.url, '') || '/'
    const isBlog = path.startsWith('/blog/') && path !== '/blog'
    const isLearn = path.startsWith('/learn/') && path !== '/learn'
    const isService = path.startsWith('/services/') && path !== '/services'
    const isCity = !path.startsWith('/') ? false : path.split('/').filter(Boolean).length === 1 && !['about', 'services', 'gallery', 'contact', 'blog', 'faqs', 'resources', 'guides', 'learn'].includes(path.split('/').filter(Boolean)[0])
    const isProgrammatic = path.split('/').filter(Boolean).length >= 2 && !path.startsWith('/services/') && !path.startsWith('/blog/') && !path.startsWith('/learn/') && !path.startsWith('/api/')

    let lastModified: Date = new Date()
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly'
    let priority = 0.8

    if (path === '/') {
      priority = 1.0
      changeFrequency = 'weekly'
    } else if (isBlog) {
      const blogPost = blogPosts.find((p) => `/blog/${p.slug}` === path)
      if (blogPost) lastModified = new Date(blogPost.date)
      changeFrequency = 'yearly'
      priority = 0.5
    } else if (isLearn) {
      changeFrequency = 'monthly'
      priority = 0.6
    } else if (isService) {
      changeFrequency = 'monthly'
      priority = 0.7
    } else if (isCity) {
      changeFrequency = 'monthly'
      priority = 0.7
    } else if (isProgrammatic) {
      changeFrequency = 'monthly'
      priority = 0.6
    }

    return {
      url,
      lastModified,
      changeFrequency,
      priority,
    }
  })
}
