import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  blogPosts,
  formatBlogDate,
  getPostBySlug,
  getReadingTime,
  getRelatedPosts,
} from '@/lib/blog'
import { generatePageMetadata, blogPostingJsonLd, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig } from '@/lib/metadata'
import { getAllRelatedGroups, getContentSegments } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import CtaBanner from '@/components/sections/CtaBanner'
import FadeIn from '@/components/motion/FadeIn'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: 'article',
    publishedTime: post.date,
  })
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedGroups = getAllRelatedGroups('blog', params.slug)
  const relatedPosts = getRelatedPosts(params.slug, 3)
  const readingTime = getReadingTime(post)
  const [lead, ...body] = post.content

  function contentLinks(text: string, max = 3) {
    return getContentSegments(text, max).map((seg, i) =>
      seg.type === 'link'
        ? <Link key={i} href={seg.url} className="text-brand-green-800 underline underline-offset-2 transition-colors hover:text-brand-gold">{seg.content}</Link>
        : seg.content
    )
  }

  const pageSchema = webPageJsonLd({
    name: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    about: post.category,
    datePublished: post.date,
  })

  const blogSchema = blogPostingJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              blogSchema,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: post.title, path: `/blog/${post.slug}` },
              ]),
            ),
          ),
        }}
      />

      <article>
        <header className="relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-[#FAF0F0] to-white pt-28 pb-12 md:pt-32 md:pb-16">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-green-800 via-brand-gold to-brand-green-700"
            aria-hidden
          />
          <FadeIn className="section-inner-narrow">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
              <Link href="/blog" className="inline-flex items-center gap-1 font-semibold text-brand-green-800 transition-colors hover:text-brand-gold">
                <ChevronLeft size={14} aria-hidden />
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span className="text-brand-body">{post.category}</span>
            </nav>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-brand-green-800">
              {post.category}
            </p>
            <h1 className="section-heading mt-3">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-brand-body md:text-xl">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-6 text-sm text-brand-muted">
              <span className="font-semibold text-brand-dark">{siteConfig.name}</span>
              <span className="text-brand-body/30" aria-hidden>
                ·
              </span>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span className="text-brand-body/30" aria-hidden>
                ·
              </span>
              <span>{readingTime} min read</span>
            </div>
          </FadeIn>
        </header>

        <div className="section bg-white !pt-12 md:!pt-16">
          <FadeIn className="section-inner-narrow">
            <div className="space-y-6">
              {lead && (
                <p className="text-xl leading-[1.75] text-brand-dark md:text-[1.35rem]">
                  {contentLinks(lead)}
                </p>
              )}
              {body.map((paragraph, i) => (
                <p key={i} className="text-lg leading-[1.8] text-brand-body">
                  {contentLinks(paragraph)}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-black/5 bg-[#F7F5F3] py-16 md:py-20">
          <div className="section-inner max-w-5xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Keep Reading</p>
                <h2 className="section-heading mt-3">Related Articles</h2>
              </div>
              <Link href="/blog" className="link-cta-md group">
                View all posts
                <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <div className="sm:w-36 sm:shrink-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-green-800">
                        {related.category}
                      </p>
                      <time dateTime={related.date} className="mt-1 block text-sm text-brand-muted">
                        {formatBlogDate(related.date, 'short')}
                      </time>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
                        {related.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-brand-body">{related.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner
        title="Ready to start your project?"
        description="Contact A1 Property Services for a free quote on landscaping and hardscaping in the Cedar Valley."
      />

      <RelatedContent groups={relatedGroups} />
    </>
  )
}
