import type { Metadata } from 'next'
import Link from 'next/link'
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

    {/* Server-rendered full index so every post has a dofollow HTML inbound link
        independent of the client "Load More" UI. */}
    <section className="section bg-brand-stone">
      <div className="section-inner-narrow">
        <h2 className="section-heading text-center">All Articles</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-brand-body">
          Browse every landscaping guide we have published for Cedar Falls and the Cedar Valley.
        </p>
        <ul className="mt-8 columns-1 gap-x-10 sm:columns-2">
          {blogPosts.map((post) => (
            <li key={post.slug} className="mb-2 break-inside-avoid">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-brand-dark underline-offset-2 transition-colors hover:text-brand-green-800 hover:underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  )
}
