import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, ShoppingCart, Scale, FileText } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig, howToJsonLd } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { learnArticles } from '@/lib/learn'
import { allServices } from '@/lib/services'
import { cities } from '@/lib/cities'
import { siteImages } from '@/lib/images'
import { serviceFaqs } from '@/lib/services'
import { getBlogsForLearn, getGuidesForBlog } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return learnArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = learnArticles.find((a) => a.slug === params.slug)
  if (!article) return {}
  return generatePageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/learn/${article.slug}`,
  })
}

const categoryIcons: Record<string, typeof BookOpen> = {
  educational: BookOpen,
  'buying-guide': ShoppingCart,
  comparison: Scale,
}

export default function LearnArticlePage({ params }: Props) {
  const article = learnArticles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const relatedServices = allServices.filter((s) => article.relatedServices.includes(s.slug))
  const relatedCities = cities.filter((c) => article.relatedCities.includes(c.slug))
  const relatedFaqs = article.relatedFaqs.map((question) => {
    for (const [, faqs] of Object.entries(serviceFaqs)) {
      const found = faqs.find((f) => f.question === question)
      if (found) return found
    }
    return null
  }).filter(Boolean)

  const pageSchema = webPageJsonLd({
    name: article.title,
    description: article.excerpt,
    path: `/learn/${article.slug}`,
    about: article.categoryLabel,
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
              article.category === 'educational' || article.category === 'buying-guide' ? howToJsonLd(howToSteps) : {},
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Learn', path: '/learn' },
                { name: article.title },
              ]),
            ),
          ),
        }}
      />

      <div className="pt-24">
      <article className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <Link href="/learn" className="text-sm font-semibold text-brand-green-800 transition-colors hover:text-brand-gold">
            &larr; Back to Knowledge Center
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="rounded-lg bg-brand-green-100 p-2">
              <Icon size={18} className="text-brand-green-800" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-green-800">
              {article.categoryLabel}
            </span>
            <span className="text-brand-body/30">·</span>
            <span className="text-xs text-brand-body/60">{article.readingTime} read</span>
          </div>
          <h1 className="section-heading mt-4">{article.title}</h1>

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

      {(relatedServices.length > 0 || relatedCities.length > 0) && (
        <section className="section bg-brand-stone">
          <div className="section-inner-narrow">
            {relatedServices.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-brand-dark">Related Services</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedServices.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="card flex items-center justify-between p-5 transition-shadow hover:shadow-md"
                    >
                      <span className="font-semibold text-brand-dark">{service.name}</span>
                      <ChevronRight size={16} className="text-brand-green-800" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedCities.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-brand-dark">Service Areas</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  {relatedCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-dark shadow-sm transition-colors hover:bg-brand-green-100 hover:text-brand-green-800"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedFaqs.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-brand-dark">Frequently Asked Questions</h2>
                <div className="mt-6 space-y-4">
                  {relatedFaqs.map((faq, i) => (
                    <div key={i} className="card p-5">
                      <h3 className="font-semibold text-brand-dark">{faq?.question}</h3>
                      <p className="mt-2 text-brand-body">{faq?.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="font-display text-2xl font-bold text-brand-dark">Explore More Resources</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learnArticles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 6)
              .map((a) => {
                const RelatedIcon = categoryIcons[a.category] || FileText
                return (
                  <Link
                    key={a.slug}
                    href={`/learn/${a.slug}`}
                    className="card p-5 transition-shadow hover:shadow-md"
                  >
                    <RelatedIcon size={18} className="text-brand-green-800" />
                    <h3 className="mt-3 font-semibold text-brand-dark">{a.title}</h3>
                    <p className="mt-1 text-sm text-brand-body">{a.readingTime} read</p>
                  </Link>
                )
              })}
          </div>
          <div className="mt-8 text-center">
            <Button href="/learn">
              View All Resources <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      </section>

      <RelatedContent groups={[
        ...(getBlogsForLearn(params.slug).length > 0 ? [{
          heading: 'Related Articles',
          items: getBlogsForLearn(params.slug),
        }] : []),
        ...(getGuidesForBlog(3).length > 0 ? [{
          heading: 'Planning Guides',
          items: getGuidesForBlog(3),
        }] : []),
      ]} />

      <CtaBanner
        title="Ready to start your project?"
        description="Contact us for a free consultation. We will help you bring your landscape vision to live."
      />
    </div>
    </>
  )
}
