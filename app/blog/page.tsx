import type { Metadata } from 'next'
import { generatePageMetadata, breadcrumbJsonLd, webPageJsonLd, siteConfig, itemListJsonLd, jsonLdGraph } from '@/lib/metadata'
import { getBlogIndexPosts, getSortedPosts } from '@/lib/blog'
import { siteImages } from '@/lib/images'
import PageHero from '@/components/motion/PageHero'
import BlogList from '@/components/ui/BlogList'
import CtaBanner from '@/components/sections/CtaBanner'
import FadeIn from '@/components/motion/FadeIn'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Blog',
  description:
    'Landscaping tips, hardscaping how-tos, and seasonal yard notes for Cedar Falls and Waterloo homeowners.',
  path: '/blog',
})

export default function BlogPage() {
  const indexPosts = getBlogIndexPosts()
  const sortedPosts = getSortedPosts()

  const pageSchema = webPageJsonLd({
    name: 'Landscaping Blog | A1 Property Services',
    description: 'Landscaping tips, hardscaping how-tos, and seasonal yard notes for Cedar Falls and Waterloo homeowners.',
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
      imageAlt="Tree-lined Cedar Falls residential street in autumn color"
      eyebrow="Tips & Notes"
      title="Cedar Falls & Waterloo|Landscaping Blog"
      subtitle="Hardscaping tips, lawn care advice, and seasonal notes from your local Cedar Falls crew."
    />

    <section className="border-b border-black/5 bg-white py-10 md:py-12">
      <FadeIn className="section-inner">
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-brand-body">
          Practical guides written for Cedar Falls and Waterloo homeowners, from patio planning
          and retaining walls to spring cleanup and lawn care that holds up in Iowa weather.
        </p>
      </FadeIn>
    </section>

    <section className="section bg-white">
      <div className="section-inner max-w-5xl">
        <BlogList posts={indexPosts} />
      </div>
    </section>

    <CtaBanner
      title="Have a project in mind?"
      description="Get a free on-site estimate from the A1 Property Services crew in Cedar Falls."
    />
    </>
  )
}
