import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, webPageJsonLd, siteConfig, itemListJsonLd, jsonLdGraph } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { blogPosts } from '@/lib/blog'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Blog',
  description:
    'Landscaping tips, hardscaping how-tos, and seasonal yard notes from A1 Property Services in Cedar Falls.',
  path: '/blog',
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

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
      eyebrow="Tips & Notes"
      title="Cedar Valley|Landscaping Blog"
      subtitle="Hardscaping tips, lawn care advice, and seasonal notes from your local Cedar Falls crew."
    />

    <section className="section bg-white">
      <div className="section-inner-narrow">
        <StaggerContainer className="space-y-8">
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <article className="card p-8">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand-green-800">
                  <span>{post.category}</span>
                  <span className="text-brand-body/30">·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-brand-dark">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-brand-green-800">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-brand-body">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="link-cta-md group mt-4"
                >
                  {CTA_COPY.readMore}
                  <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
    </>
  )
}
