import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, AlertCircle, DollarSign, Info, ClipboardCheck, ChevronRight, Lightbulb } from 'lucide-react'
import { getGuideBySlug, guideSlugs, type GuideStep } from '@/lib/guides'
import { allServices } from '@/lib/services'
import { blogPosts } from '@/lib/blog'
import { generatePageMetadata, siteConfig, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import PageHero from '@/components/motion/PageHero'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FadeIn from '@/components/motion/FadeIn'
import RelatedContent from '@/components/sections/RelatedContent'
import type { LinkedContent } from '@/lib/internal-linking'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return {}
  return generatePageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    openGraphType: 'article',
    publishedTime: guide.updatedAt ?? '2025-01-01',
    modifiedTime: guide.updatedAt ?? '2025-01-01',
  })
}

const tipIcons = {
  alert: AlertCircle,
  dollar: DollarSign,
  info: Info,
  checklist: ClipboardCheck,
} as const

function StepCard({ step }: { step: GuideStep }) {
  return (
    <div className="card overflow-hidden p-0">
      <div className="flex flex-col md:flex-row">
        <div className="flex shrink-0 items-center justify-center bg-brand-green-700 p-6 md:w-28 md:p-0">
          <div className="text-center">
            <div className="text-3xl font-black text-white md:text-4xl">{step.number}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand-green-200">
              Step
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 md:p-8">
          <h3 className="text-xl font-bold text-brand-dark">{step.title}</h3>
          <p className="mt-3 leading-relaxed text-brand-body">{step.content}</p>
          {step.keyPoints && step.keyPoints.length > 0 && (
            <div className="mt-5 rounded-lg bg-brand-green-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">
                Key Points
              </p>
              <ul className="mt-2 space-y-1.5">
                {step.keyPoints.map((point) => (
                  <li key={point.slice(0, 40)} className="flex gap-2 text-sm text-brand-body">
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-brand-green-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const relatedService = allServices.find((s) => s.slug === guide.serviceSlug)

  const relatedBlogs: LinkedContent[] = blogPosts
    .filter((p) => {
      const text = (p.title + ' ' + p.excerpt + ' ' + p.content.join(' ')).toLowerCase()
      const terms = [
        guide.serviceSlug.replace(/-/g, ' '),
        guide.title.toLowerCase().replace(' guide', ''),
      ]
      return terms.some((t) => text.includes(t))
    })
    .slice(0, 3)
    .map((p) => ({
      type: 'blog' as const,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      url: `/blog/${p.slug}`,
      relevance: 5,
    }))

  const relatedContentGroups = []
  if (relatedBlogs.length > 0) {
    relatedContentGroups.push({ heading: 'Related Articles', items: relatedBlogs })
  }

  const TipIconComponent = (icon: keyof typeof tipIcons) => {
    const Icon = tipIcons[icon]
    return <Icon size={18} />
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              webPageJsonLd({
                name: guide.title,
                description: guide.description,
                path: `/guides/${guide.slug}`,
                about: guide.title,
                datePublished: guide.updatedAt,
                dateModified: guide.updatedAt,
              }),
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Guides', path: '/guides' },
                { name: guide.title },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={siteImages.servicesHero}
        imageAlt={guide.title}
        eyebrow="Planning Guide"
        title={guide.title}
        subtitle={guide.description}
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <div className="flex items-center gap-2">
            <Link
              href="/guides"
              className="text-sm font-medium text-brand-green-700 hover:text-brand-gold transition-colors"
            >
              Guides
            </Link>
            <ChevronRight size={14} className="text-brand-body/40" />
            <span className="text-sm text-brand-body">{guide.title}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/services/${guide.serviceSlug}`}>
              {relatedService ? `View ${relatedService.name} Service` : 'View Service'}
            </Button>
            <Button href="/contact" variant="outline">
              {CTA_COPY.estimate}
            </Button>
            <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark">
              <Phone size={16} />
              {siteConfig.phoneDisplay}
            </Button>
          </div>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner">
          <h2 className="section-heading text-center">
            Plan Your Project: Step by Step
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
            {guide.heroIntro}
          </p>
          <div className="mt-10 space-y-6">
            {guide.steps.map((step) => (
              <FadeIn key={step.number}>
                <StepCard step={step} />
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {guide.costOverview && (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">What to Budget</h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-body">
              {guide.costOverview}
            </p>
          </FadeIn>
        </section>
      )}

      {guide.tips && guide.tips.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Pro Tips</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              Things we have learned from years of doing this work in the Cedar Valley.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {guide.tips.map((tip) => (
                <div key={tip.text} className="card h-full p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-full bg-brand-green-100 p-2 text-brand-green-700">
                      {TipIconComponent(tip.icon)}
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wider text-brand-green-700">
                      {tip.label}
                    </span>
                  </div>
                  <p className="leading-relaxed text-brand-body">{tip.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {relatedService && (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow text-center">
            <h2 className="section-heading">Ready to Get Started?</h2>
            <p className="mt-4 text-brand-body">
              We offer professional {relatedService.name.toLowerCase()} right here in Cedar Falls. Our team brings the experience and equipment to get your project done the right way.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={`/services/${guide.serviceSlug}`}>
                Learn About Our {relatedService.name} Service
              </Button>
              <Button href="/contact" variant="outline">
                {CTA_COPY.estimate}
              </Button>
            </div>
          </FadeIn>
        </section>
      )}

      {relatedContentGroups.length > 0 && (
        <RelatedContent groups={relatedContentGroups} />
      )}

      <CtaBanner
        title="Need help with your project?"
        description="Contact us for a free consultation. We will walk your property and provide an honest assessment."
      />
    </>
  )
}
