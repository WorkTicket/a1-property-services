import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, ShoppingCart, Scale, FileText } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, howToJsonLd, faqPageJsonLd } from '@/lib/metadata'
import { learnArticles, getLearnReadingTime, getRelatedLearnArticles } from '@/lib/learn'
import { getLearnArticleImage } from '@/lib/content-images'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { allServices } from '@/lib/services'
import { serviceFaqs } from '@/lib/services'
import { getBlogsForLearn, getServicesForLearn, getCitiesForLearn } from '@/lib/internal-linking'
import { cities } from '@/lib/cities'
import RelatedContent from '@/components/sections/RelatedContent'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import CtaBanner from '@/components/sections/CtaBanner'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return learnArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = learnArticles.find((a) => a.slug === slug)
  if (!article) return {}
  const photo = getLearnArticleImage(article)
  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/learn/${article.slug}`,
    keywords: article.keywords,
    ogImage: photo.src,
    ogImageAlt: photo.alt,
  })
}

const categoryIcons: Record<string, typeof BookOpen> = {
  educational: BookOpen,
  'buying-guide': ShoppingCart,
  comparison: Scale,
}

const categoryColors: Record<string, string> = {
  educational: 'bg-blue-100 text-blue-800',
  'buying-guide': 'bg-amber-100 text-amber-800',
  comparison: 'bg-purple-100 text-purple-800',
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params
  const article = learnArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  const relatedServices = allServices.filter((s) => article.relatedServices.includes(s.slug))
  const relatedFaqs = (article.faqs ?? []).map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))
  if (relatedFaqs.length === 0) {
    for (const question of article.relatedFaqs) {
      for (const [, faqs] of Object.entries(serviceFaqs)) {
        const found = faqs.find((f) => f.question === question)
        if (found) relatedFaqs.push(found)
      }
    }
  }

  const relatedLearn = getRelatedLearnArticles(article.slug, 4)
  const photo = getLearnArticleImage(article)

  const pageSchema = webPageJsonLd({
    name: article.title,
    description: article.excerpt,
    path: `/learn/${article.slug}`,
    about: article.categoryLabel,
    image: photo.src,
  })

  const howToSteps = article.sections.slice(0, 5).map((s) => ({
    title: s.heading,
    description: s.paragraphs[0].substring(0, 200),
  }))

  const Icon = categoryIcons[article.category] || FileText

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              ...(article.category === 'educational' || article.category === 'buying-guide'
                ? [
                    howToJsonLd(howToSteps, {
                      name: article.title,
                      description: article.excerpt,
                    }),
                  ]
                : []),
              ...(relatedFaqs.length > 0 ? [faqPageJsonLd(relatedFaqs)] : []),
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Learn', path: '/learn' },
                { name: article.title, path: `/learn/${article.slug}` },
              ]),
            ),
          ),
        }}
      />

      <div className="pt-24">
      <article className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <Link href="/learn" className="text-sm font-semibold text-brand-green-800 transition-colors hover:text-brand-gold">
            &larr; Back to Guides
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="rounded-lg bg-brand-green-100 p-2">
              <Icon size={18} className="text-brand-green-800" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-800">
              {article.categoryLabel}
            </span>
            <span className="text-brand-body/30">·</span>
            <span className="text-xs text-brand-body/60">{getLearnReadingTime(article)} read</span>
          </div>
          <h1 className="section-heading mt-4">{article.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-brand-body">{article.excerpt}</p>
          <div className="media-frame relative mt-8 aspect-[16/9]">
            <ResponsiveImage
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes={IMAGE_SIZES.galleryFeatured}
            />
          </div>

          <div className="mt-10 space-y-12">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-2xl font-bold text-brand-dark">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j} className="text-lg leading-relaxed text-brand-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </FadeIn>
      </article>

      {relatedFaqs.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <div className="text-center">
              <p className="section-eyebrow">Common Questions</p>
              <h2 className="section-heading mt-3">Frequently Asked Questions</h2>
            </div>
            <div className="mt-10 space-y-4">
              {relatedFaqs.map((faq, i) => (
                <div key={i} className="card p-5">
                  <h3 className="font-semibold text-brand-dark">{faq.question}</h3>
                  <p className="mt-2 text-brand-body">{faq.answer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="mb-10 text-center">
            <p className="section-eyebrow">Guides</p>
            <h2 className="section-heading mt-3">More to Read</h2>
          </FadeIn>
          <StaggerContainer className="grid gap-8 lg:grid-cols-2">
            {relatedLearn.map((a) => {
                const relatedPhoto = getLearnArticleImage(a)
                return (
                  <StaggerItem key={a.slug}>
                    <Link href={`/learn/${a.slug}`} className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                      <div className="card-image relative aspect-[16/9]">
                        <ResponsiveImage
                          src={relatedPhoto.src}
                          alt={relatedPhoto.alt}
                          fill
                          sizes={IMAGE_SIZES.halfCol}
                          className="card-image-zoom object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6 md:p-8">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[a.category]}`}>
                            {a.categoryLabel}
                          </span>
                          <span className="text-xs text-brand-body/60">{getLearnReadingTime(a)} read</span>
                        </div>
                        <h3 className="mt-3 text-xl font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
                          {a.title}
                        </h3>
                        <p className="mt-2 leading-relaxed text-brand-body">{a.excerpt}</p>
                        <span className="link-cta-md group mt-4 inline-flex items-center gap-1">
                          Read Guide <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                )
              })}
          </StaggerContainer>
          <FadeIn className="mt-8 text-center" delay={0.05}>
            <Button href="/learn">
              View All Resources <ChevronRight className="h-4 w-4" />
            </Button>
          </FadeIn>
        </div>
      </section>

      <RelatedContent
        groups={[
          ...(relatedServices.length > 0 ? [{
            heading: 'Our Services',
            items: getServicesForLearn(article.slug),
          }] : []),
          ...(relatedServices[0]
            ? [{
                heading: 'Hire this locally',
                items: article.relatedCities.slice(0, 2).flatMap((citySlug) => {
                  const city = cities.find((item) => item.slug === citySlug)
                  const service = relatedServices[0]
                  if (!city || !service) return []
                  return [{
                    type: 'city' as const,
                    slug: `${citySlug}-${service.slug}`,
                    title: `${service.name} in ${city.name}`,
                    excerpt: `${service.name} for homes and businesses in ${city.name}, Iowa`,
                    url: `/${citySlug}/${service.slug}`,
                    relevance: 9,
                  }]
                }),
              }]
            : []),
          ...(getCitiesForLearn(article.slug).length > 0 ? [{
            heading: 'Service Areas',
            items: getCitiesForLearn(article.slug),
          }] : []),
          ...(getBlogsForLearn(article.slug).length > 0 ? [{
            heading: 'Related Articles',
            items: getBlogsForLearn(article.slug),
          }] : []),
        ].filter((group) => group.items.length > 0)}
      />

      <CtaBanner
        title="Want a straight answer on your yard?"
        description="We'll walk your Cedar Falls or Waterloo property and tell you the next step. No pitch, just a plan."
        quoteHref="/contact"
      />
    </div>
    </>
  )
}
