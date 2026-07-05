import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, ShoppingCart, Scale, FileText } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig, howToJsonLd } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { learnArticles } from '@/lib/learn'
import { allServices } from '@/lib/services'
import { siteImages } from '@/lib/images'
import { serviceFaqs } from '@/lib/services'
import { getBlogsForLearn, getServicesForLearn } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
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

const categoryColors: Record<string, string> = {
  educational: 'bg-blue-100 text-blue-800',
  'buying-guide': 'bg-amber-100 text-amber-800',
  comparison: 'bg-purple-100 text-purple-800',
}

export default function LearnArticlePage({ params }: Props) {
  const article = learnArticles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const relatedServices = allServices.filter((s) => article.relatedServices.includes(s.slug))
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
                  <h3 className="font-semibold text-brand-dark">{faq?.question}</h3>
                  <p className="mt-2 text-brand-body">{faq?.answer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="mb-10 text-center">
            <p className="section-eyebrow">Knowledge Center</p>
            <h2 className="section-heading mt-3">Explore More Resources</h2>
          </FadeIn>
          <StaggerContainer className="grid gap-8 lg:grid-cols-2">
            {learnArticles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 6)
              .map((a) => {
                const RelatedIcon = categoryIcons[a.category] || FileText
                return (
                  <StaggerItem key={a.slug}>
                    <Link href={`/learn/${a.slug}`} className="card group block p-8 transition-shadow hover:shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-brand-green-100 p-3">
                          <RelatedIcon size={24} className="text-brand-green-800" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[a.category]}`}>
                              {a.categoryLabel}
                            </span>
                            <span className="text-xs text-brand-body/60">{a.readingTime} read</span>
                          </div>
                          <h3 className="mt-3 text-xl font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
                            {a.title}
                          </h3>
                          <p className="mt-2 leading-relaxed text-brand-body">{a.excerpt}</p>
                          <span className="link-cta-md group mt-4 inline-flex items-center gap-1">
                            Read Guide <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
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
        eyebrow="Explore More"
        heading="Related Content"
        groups={[
          ...(relatedServices.length > 0 ? [{
            heading: 'Our Services',
            items: getServicesForLearn(params.slug),
          }] : []),
          ...(getBlogsForLearn(params.slug).length > 0 ? [{
            heading: 'Related Articles',
            items: getBlogsForLearn(params.slug),
          }] : []),
        ]}
      />

      <CtaBanner
        title="Ready to start your project?"
        description="Contact us for a free consultation. We will help you bring your landscape vision to live."
      />
    </div>
    </>
  )
}
