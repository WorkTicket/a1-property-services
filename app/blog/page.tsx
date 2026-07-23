import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, breadcrumbJsonLd, webPageJsonLd, siteConfig, itemListJsonLd, jsonLdGraph } from '@/lib/metadata'
import { blogPosts, formatBlogDate, getSortedPosts } from '@/lib/blog'
import { siteImages } from '@/lib/images'
import PageHero from '@/components/motion/PageHero'
import BlogList from '@/components/ui/BlogList'
import CtaBanner from '@/components/sections/CtaBanner'
import FadeIn from '@/components/motion/FadeIn'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Blog',
  description:
    'Landscaping tips, hardscaping how-tos, and seasonal yard notes from A1 Property Services in Cedar Falls.',
  path: '/blog',
})

export default function BlogPage() {
  const sortedPosts = getSortedPosts(blogPosts)

  const pageSchema = webPageJsonLd({
    name: 'Landscaping Blog | A1 Property Services',
    description: 'Landscaping tips, hardscaping how-tos, and seasonal yard notes from A1 Property Services in Cedar Falls.',
    path: '/blog',
    about: 'Landscaping Blog',
  })

  const blogListSchema = itemListJsonLd(
    sortedPosts.map((p) => ({
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

    <section className="border-b border-black/5 bg-white py-10 md:py-12">
      <FadeIn className="section-inner">
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-brand-body">
          Practical guides written for Cedar Falls and Cedar Valley homeowners — from patio planning
          and retaining walls to spring cleanup and lawn care that holds up in Iowa weather.
        </p>
      </FadeIn>
    </section>

    <section className="section bg-white">
      <div className="section-inner max-w-5xl">
        <BlogList posts={sortedPosts} />
      </div>
    </section>

    {/* Server-rendered full index so every post has a dofollow HTML inbound link
        independent of the client "Load More" UI. */}
    <section className="section border-t border-black/5 bg-[#F7F5F3]">
      <div className="section-inner max-w-5xl">
        <div className="max-w-2xl">
          <p className="section-eyebrow">Archive</p>
          <h2 className="section-heading mt-3">All Articles</h2>
          <p className="mt-3 text-brand-body">
            Browse every landscaping guide we have published for Cedar Falls and the Cedar Valley.
          </p>
        </div>
        <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {sortedPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:gap-6"
              >
                <time
                  dateTime={post.date}
                  className="shrink-0 text-sm font-medium text-brand-muted sm:w-28"
                >
                  {formatBlogDate(post.date, 'short')}
                </time>
                <span className="min-w-0 flex-1 font-medium text-brand-dark group-hover:text-brand-green-800">
                  {post.title}
                </span>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-brand-green-800/80">
                  {post.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <CtaBanner
      title="Have a project in mind?"
      description="Get a free on-site estimate from the A1 Property Services crew in Cedar Falls."
    />
    </>
  )
}
