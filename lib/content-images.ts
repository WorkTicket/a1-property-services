import { existsSync } from 'node:fs'
import path from 'node:path'
import { getBlogPostImageAlt } from '@/lib/blog-images'
import { siteImages } from '@/lib/images'

export type ContentPhoto = {
  src: string
  alt: string
}

const FALLBACK_LEARN: ContentPhoto = {
  src: siteImages.learnHero,
  alt: 'Professionally designed Cedar Falls garden with stone path and perennials',
}

const FALLBACK_BLOG: ContentPhoto = {
  src: siteImages.blogHero,
  alt: 'Tree-lined Cedar Falls residential street in autumn color',
}

function dedicatedPhoto(
  kind: 'learn' | 'blog',
  slug: string,
  title: string,
  fallback: ContentPhoto,
): ContentPhoto {
  const filename = `article-${kind}-${slug}.webp`
  const src = `/images/${filename}`
  const onDisk = path.join(process.cwd(), 'public', 'images', filename)
  if (!existsSync(onDisk)) return fallback
  return {
    src,
    alt: kind === 'blog' ? getBlogPostImageAlt(slug, title) : `${title} in Cedar Falls, Iowa`,
  }
}

export function getLearnArticleImage(
  article: { slug: string; title: string; excerpt?: string; relatedServices?: string[] },
): ContentPhoto {
  return dedicatedPhoto('learn', article.slug, article.title, FALLBACK_LEARN)
}

export function getBlogPostImage(
  post: { slug: string; title: string; excerpt?: string; category?: string },
): ContentPhoto {
  return dedicatedPhoto('blog', post.slug, post.title, FALLBACK_BLOG)
}

export function getGuideCardImage(href: string, title: string, excerpt: string): ContentPhoto {
  if (href.startsWith('/learn/')) {
    return getLearnArticleImage({
      slug: href.slice('/learn/'.length),
      title,
      excerpt,
    })
  }

  if (href.startsWith('/blog/')) {
    return getBlogPostImage({
      slug: href.slice('/blog/'.length),
      title,
      excerpt,
    })
  }

  return getBlogPostImage({ slug: href, title, excerpt })
}
