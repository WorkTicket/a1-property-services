import type { Metadata } from 'next'
import { generatePageMetadata, breadcrumbJsonLd, webPageJsonLd, siteConfig, itemListJsonLd, jsonLdGraph } from '@/lib/metadata'
import { blogPosts } from '@/lib/blog'
import { siteImages } from '@/lib/images'
import PageHero from '@/components/motion/PageHero'
import BlogList from '@/components/ui/BlogList'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Blog',
  description:
    'Landscaping tips, hardscaping how-tos, and seasonal yard notes from A1 Property Services in Cedar Falls.',
  path: '/blog',
})

export default function BlogPage() {
  const pageSchema = webPageJsonLd({
    name: 'Landscaping Blog | A1 Property Services',
    description: 'Landscaping tips, hardscaping how-tos, and seasonal yard notes from A1 Property Services in Cedar Falls.',
    path: '/blog',
    about: 'Landscaping Blog',
  })

  const blogListSchema = itemListJsonLd(
    blogPosts.map((p) => ({
      name: p.title,
      url: `${siteConfig.url}/blog/${p.slug}`,
    })),
  )

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          jsonLdGraph(
            pageSchema,
            blogListSchema,
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
            ]),
          ),
        ),
      }}
    />
    <PageHero
      imageSrc={siteImages.blogHero}
      imageAlt="Tree-lined Cedar Valley residential street in autumn color"
      eyebrow="Tips & Notes"
      title="Cedar Valley|Landscaping Blog"
      subtitle="Hardscaping tips, lawn care advice, and seasonal notes from your local Cedar Falls crew."
    />

    <section className="section bg-white">
      <div className="section-inner-narrow">
        <BlogList posts={blogPosts} />
      </div>
    </section>
    </>
  )
}
