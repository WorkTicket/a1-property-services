import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin } from 'lucide-react'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  generatePageMetadata,
  imageObjectJsonLd,
  jsonLdGraph,
  siteConfig,
  webPageJsonLd,
} from '@/lib/metadata'
import { getGalleryProjectById } from '@/lib/images'
import { galleryCategoryLabels } from '@/lib/gallery-copy'
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  projectCaseStudies,
} from '@/lib/project-case-studies'
import { getLegacyLandingPageHref, getServiceBySlug, getServicePageHref } from '@/lib/services'
import { learnArticles } from '@/lib/learn'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import EstimateSection from '@/components/sections/EstimateSection'
import FadeIn from '@/components/motion/FadeIn'
import RelatedContent from '@/components/sections/RelatedContent'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return projectCaseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudyBySlug(params.slug)
  const project = study ? getGalleryProjectById(study.projectId) : undefined
  if (!study || !project) return {}

  return generatePageMetadata({
    title: study.title,
    description: study.description,
    path: `/gallery/${study.slug}`,
    keywords: study.keywords,
    ogImage: project.after.src,
    ogImageAlt: project.after.alt,
    openGraphType: 'article',
    absoluteTitle: true,
  })
}

export default function ProjectCaseStudyPage({ params }: Props) {
  const study = getCaseStudyBySlug(params.slug)
  const project = study ? getGalleryProjectById(study.projectId) : undefined
  if (!study || !project) notFound()

  const service = getServiceBySlug(study.serviceSlug)
  const serviceHref = getLegacyLandingPageHref(study.serviceSlug) ?? getServicePageHref(study.serviceSlug)
  const relatedStudies = getRelatedCaseStudies(study.slug, 3)
  const relatedGuides = learnArticles.filter((article) => study.relatedLearn.includes(article.slug))
  const categoryLabel = galleryCategoryLabels[project.category]
  const hasSlider = Boolean(project.before)

  const pageSchema = webPageJsonLd({
    name: study.h1,
    description: study.description,
    path: `/gallery/${study.slug}`,
    image: project.after.src,
    about: study.h1,
  })

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.h1,
    description: study.description,
    image: [project.after.src, project.before?.src].filter(Boolean).map((src) => `${siteConfig.url}${src}`),
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/gallery/${study.slug}`,
    about: service
      ? { '@type': 'Service', name: service.name, url: `${siteConfig.url}${serviceHref}` }
      : undefined,
    contentLocation: {
      '@type': 'City',
      name: 'Cedar Falls',
      containedInPlace: { '@type': 'State', name: 'Iowa' },
    },
  }

  const faqs = [
    {
      question: `Where was this ${categoryLabel.toLowerCase()} project completed?`,
      answer: `${project.title} was completed for a home in ${project.location}. A1 Property Services handles this work across Cedar Falls, Waterloo, and Black Hawk County.`,
    },
    {
      question: 'Can you do a similar project on my property?',
      answer: `Yes. Every lot is different, but the same sequence applies: diagnose the site, build the structure or planting correctly for Iowa clay and freeze-thaw, then finish the grade. Request a free on-site quote and we will walk your property.`,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              articleSchema,
              faqPageJsonLd(faqs),
              imageObjectJsonLd({
                url: `${siteConfig.url}${project.after.src}`,
                caption: project.after.alt,
                description: study.description,
              }),
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Gallery', path: '/gallery' },
                { name: study.h1, path: `/gallery/${study.slug}` },
              ]),
            ),
          ),
        }}
      />

      <article className="pt-24">
        <section className="section bg-white pb-8">
          <FadeIn className="section-inner-narrow">
            <Link href="/gallery" className="text-sm font-semibold text-brand-green-800 transition-colors hover:text-brand-gold">
              &larr; Back to gallery
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">{categoryLabel}</p>
            <h1 className="section-heading mt-3">{study.h1}</h1>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-muted">
              <MapPin size={14} />
              {project.location}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-body">{project.description}</p>
          </FadeIn>
        </section>

        <section className="section bg-brand-stone pt-0">
          <FadeIn className="section-inner">
            <div className="overflow-hidden rounded-xl bg-neutral-950">
              {hasSlider && project.before ? (
                <BeforeAfterSlider
                  featured
                  hint="Slide to compare"
                  before={{ ...project.before, priority: true }}
                  after={{ ...project.after, priority: true }}
                  aspectClassName="aspect-[4/3] w-full rounded-none"
                  sizes={IMAGE_SIZES.galleryGrid}
                />
              ) : (
                <div className="relative aspect-[4/3]">
                  <ResponsiveImage
                    src={project.after.src}
                    alt={project.after.alt}
                    fill
                    priority
                    sizes={IMAGE_SIZES.galleryGrid}
                  />
                </div>
              )}
            </div>
          </FadeIn>
        </section>

        <section className="section bg-white">
          <div className="section-inner-narrow space-y-12">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-brand-dark">The problem</h2>
              <div className="mt-4 space-y-4">
                {study.problem.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-brand-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-brand-dark">The property</h2>
              <div className="mt-4 space-y-4">
                {study.property.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-brand-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-brand-dark">Work performed</h2>
              <div className="mt-4 space-y-4">
                {study.workPerformed.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-brand-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
            {project.materials.length > 0 ? (
              <FadeIn>
                <h2 className="font-display text-2xl font-bold text-brand-dark">Materials</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-lg leading-relaxed text-brand-body">
                  {project.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
                {project.scopeOfWork ? (
                  <p className="mt-4 text-lg leading-relaxed text-brand-body">{project.scopeOfWork}</p>
                ) : null}
              </FadeIn>
            ) : null}
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-brand-dark">Challenges</h2>
              <div className="mt-4 space-y-4">
                {study.challenges.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-brand-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
            <FadeIn>
              <h2 className="font-display text-2xl font-bold text-brand-dark">Finished result</h2>
              <div className="mt-4 space-y-4">
                {study.result.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-brand-body">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={serviceHref}>
                  {service?.name ?? 'Related service'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button href="/cedar-falls" variant="outline">
                  Cedar Falls services
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="section bg-white pt-0">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">Project questions</h2>
            <div className="mt-8 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="card p-5">
                  <h3 className="font-semibold text-brand-dark">{faq.question}</h3>
                  <p className="mt-2 text-brand-body">{faq.answer}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </article>

      <RelatedContent
        groups={[
          {
            heading: 'Related service',
            items: service
              ? [
                  {
                    type: 'service' as const,
                    slug: service.slug,
                    title: service.name,
                    excerpt: service.shortDesc,
                    url: serviceHref,
                    relevance: 10,
                  },
                ]
              : [],
          },
          {
            heading: 'Related guides',
            items: relatedGuides.map((article) => ({
              type: 'learn' as const,
              slug: article.slug,
              title: article.title,
              excerpt: article.excerpt,
              url: `/learn/${article.slug}`,
              relevance: 8,
            })),
          },
          {
            heading: 'More projects',
            items: relatedStudies.map((related) => {
              const relatedProject = getGalleryProjectById(related.projectId)
              return {
                type: 'project' as const,
                slug: related.slug,
                title: related.h1,
                excerpt: relatedProject?.description ?? related.description,
                url: `/gallery/${related.slug}`,
                relevance: 7,
              }
            }),
          },
        ].filter((group) => group.items.length > 0)}
      />

      <CtaBanner
        title="Want this result on your property?"
        description="Request a free on-site quote. We will walk the yard in Cedar Falls, Waterloo, or Black Hawk County and tell you what the job actually takes."
        quoteHref="#estimate"
      />
      <EstimateSection
        formLocation={`Project ${study.slug}`}
        defaultService={study.serviceSlug}
        defaultCity="Cedar Falls"
        heading="Request a quote for a similar project"
        description="Tell us what is failing on your lot — slope, patio, drainage, or bare beds — and we will follow up with a free estimate."
      />
    </>
  )
}
