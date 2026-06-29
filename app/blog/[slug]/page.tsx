import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getPostBySlug } from '@/lib/blog'
import { generatePageMetadata, blogPostingJsonLd, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { getAllRelatedGroups, getContentSegments } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import Button from '@/components/ui/Button'
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedGroups = getAllRelatedGroups('blog', params.slug)

  function contentLinks(text: string, max = 3) {
    return getContentSegments(text, max).map((seg, i) =>
      seg.type === 'link'
        ? <Link key={i} href={seg.url} className="text-brand-green-800 underline underline-offset-2 hover:text-brand-gold transition-colors">{seg.content}</Link>
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
                { name: post.title },
              ]),
            ),
          ),
        }}
      />
      <div className="pt-24">
      <article className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <Link href="/blog" className="text-sm font-semibold text-brand-green-800 transition-colors hover:text-brand-gold">
            &larr; Back to Blog
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand-green-800">
            <span>{post.category}</span>
            <span className="text-brand-body/30">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h1 className="section-heading mt-4">{post.title}</h1>
          <div className="mt-10 space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-brand-body">
                {contentLinks(paragraph)}
              </p>
            ))}
          </div>
          <div className="mt-12 rounded-xl bg-brand-green-100 p-8 text-center">
            <p className="font-display text-xl font-bold text-brand-dark">
              Ready to start your project?
            </p>
            <p className="mt-2 text-brand-body">Contact A1 Property Services for a free quote.</p>
            <Button href="/contact" className="mt-6">
              {CTA_COPY.quote}
            </Button>
          </div>
        </FadeIn>
      </article>

      <RelatedContent groups={relatedGroups} />
    </div>
    </>
  )
}
