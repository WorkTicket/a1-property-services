import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Check } from 'lucide-react'
import {
  allServices,
  getServiceBySlug,
  serviceBenefits,
  serviceExtendedContent,
  serviceFaqs,
  serviceProcessSteps,
  serviceMaterials,
  serviceComparisonMeta,
  defaultComparisonMeta,
  serviceEquipment,
  serviceProblemSolutions,
} from '@/lib/services'
import { getPostBySlug } from '@/lib/blog'
import { generatePageMetadata, serviceSeoOverrides, siteConfig, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, howToJsonLd, webPageJsonLd } from '@/lib/metadata'
import { getGalleryProjectsForService, getServiceHeroImage, getServiceHeroImageAlt, getServiceContentImage, getServiceContentImageAlt } from '@/lib/images'
import { getComplementaryServices, getServiceRelatedContentGroups, getContentSegments } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import ServiceIntroSection from '@/components/sections/ServiceIntroSection'
import CtaBanner from '@/components/sections/CtaBanner'
import GalleryGrid from '@/components/sections/GalleryGrid'
import PageHero from '@/components/motion/PageHero'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FadeIn from '@/components/motion/FadeIn'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { cn } from '@/lib/utils'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return {}

  const seo = serviceSeoOverrides[service.slug]
  if (seo) {
    return generatePageMetadata({
      title: seo.title,
      description: seo.description,
      path: `/services/${service.slug}`,
      keywords: seo.keywords,
      ogImage: seo.ogImage,
      ogImageAlt: seo.ogImageAlt,
    })
  }

  return generatePageMetadata({
    title: service.name,
    description: `${service.name} in Cedar Falls, Iowa. ${service.shortDesc} A1 Property Services, licensed and insured, with free estimates.`,
    path: `/services/${service.slug}`,
  })
}

const defaultProcessSteps = [
  {
    title: 'Consultation',
    description: 'We meet with you on-site to discuss your goals, assess your property, and understand your budget.',
  },
  {
    title: 'Planning',
    description: 'We coordinate scheduling, permits, and site prep so the work goes smoothly without delays.',
  },
  {
    title: 'Execution',
    description: 'Our crew does the work the right way: safe setup, solid workmanship, and a finished job that holds up.',
  },
  {
    title: 'Cleanup',
    description: 'Every job site is thoroughly cleaned. We remove debris and restore disturbed areas before we leave.',
  },
  {
    title: 'Final Walkthrough',
    description: 'We review the completed work with you, answer questions, and make sure everything meets your expectations.',
  },
]

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const seo = serviceSeoOverrides[service.slug]
  const complementaryServices = getComplementaryServices(service.slug, 3)
  const relatedContentGroups = getServiceRelatedContentGroups(service.slug)

  const benefits = serviceBenefits[service.slug] ?? []
  const problems = serviceProblemSolutions[service.slug] ?? []
  const faqs = serviceFaqs[service.slug] ?? []
  const processSteps = serviceProcessSteps[service.slug] ?? defaultProcessSteps
  const materialsArray = [...(serviceMaterials[service.slug] ?? [])].sort(
    (a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)),
  )
  const comparisonMeta = serviceComparisonMeta[service.slug] ?? defaultComparisonMeta
  const equipmentArray = serviceEquipment[service.slug] ?? []
  const extended = serviceExtendedContent[service.slug]
  const galleryProjects = getGalleryProjectsForService(service.slug)
  const heroImage = getServiceHeroImage(service.slug)
  const heroImageAlt = getServiceHeroImageAlt(service.slug)
  const contentImage = getServiceContentImage(service.slug)
  const contentImageAlt = getServiceContentImageAlt(service.slug)
  const relatedBlog = extended?.relatedBlogSlug ? getPostBySlug(extended.relatedBlogSlug) : undefined

  const serviceName = seo ? seo.h1 : `${service.name} in Cedar Falls`
  const pageUrl = `${siteConfig.url}/services/${service.slug}`

  function contentLinks(text: string, max = 3) {
    return getContentSegments(text, max, [params.slug]).map((seg, i) =>
      seg.type === 'link'
        ? <Link key={i} href={seg.url} className="text-brand-green-800 underline underline-offset-2 hover:text-brand-gold transition-colors">{seg.content}</Link>
        : seg.content
    )
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: seo?.title ?? service.name,
    name: serviceName,
    provider: {
      '@type': 'LandscapingBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: 'US',
      },
      areaServed: ['Cedar Falls', 'Waterloo', 'Cedar Valley'],
    },
    areaServed: {
      '@type': 'City',
      name: 'Cedar Falls',
      containedInPlace: { '@type': 'State', name: 'Iowa' },
    },
    description: seo?.description ?? `${service.shortDesc} Serving Cedar Falls and surrounding Cedar Valley communities.`,
    url: pageUrl,
    ...(heroImage ? { image: `${siteConfig.url}${heroImage}` } : {}),
  }

  const faqJsonLd = faqs.length > 0 ? faqPageJsonLd(faqs) : null

  const pageSchema = webPageJsonLd({
    name: serviceName,
    description: seo?.description ?? service.shortDesc,
    path: `/services/${service.slug}`,
    image: heroImage ?? undefined,
    about: service.name,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              serviceJsonLd,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: serviceName },
              ]),
              ...(faqJsonLd ? [faqJsonLd] : []),
              howToJsonLd(processSteps),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
        eyebrow="Cedar Falls, Iowa"
        title={serviceName}
        subtitle={service.shortDesc}
      />

      <ServiceIntroSection
        intro={contentLinks(service.longDesc)}
        extendedHeading={extended?.heading}
        extendedParagraphs={extended?.paragraphs.map((p) => contentLinks(p))}
        imageSrc={contentImage ?? heroImage ?? ''}
        imageAlt={contentImageAlt ?? heroImageAlt}
      />

      {problems.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Common Problems We Solve</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              Every property is different, but these are the most common challenges we help Cedar Valley homeowners overcome.
            </p>
            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((item) => (
                <StaggerItem key={item.problem}>
                  <div className="card h-full p-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-brand-green-100 p-2">
                        <Check size={16} className="text-brand-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-dark/60">The Problem</p>
                        <p className="mt-1 font-bold text-brand-dark">{item.problem}</p>
                        <p className="mt-3 text-sm leading-relaxed text-brand-body">
                          <span className="font-semibold text-brand-green-700">Solution: </span>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      )}

      {processSteps.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">Our {service.name} Process</h2>
            <p className="mt-4 text-brand-body">We follow a proven process to deliver consistent results on every project.</p>
            <ol className="mt-10 space-y-8">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-brand-body">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">What You Get with {service.name}</h2>
            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit}>
                  <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-xs font-bold text-white" aria-hidden="true">
                      <Check size={14} />
                    </span>
                    <span className="text-brand-body">{benefit}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      )}

      {equipmentArray.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Equipment We Use</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              We use quality equipment to get every job done right.
            </p>
            <div className="mt-10 space-y-10">
              {equipmentArray.map((equipment) => (
                <div key={equipment.name} className="rounded-xl border border-black/5 bg-brand-stone p-6 md:p-8">
                  <h3 className="text-xl font-bold text-brand-dark">{equipment.name}</h3>
                  <ul className="mt-4 space-y-3">
                    {equipment.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-brand-body">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand-green-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {materialsArray.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">{comparisonMeta.heading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              {comparisonMeta.intro}
            </p>
            <div className="mt-10 space-y-10">
              {materialsArray.map((material) => (
                <div
                  key={material.name}
                  className={cn(
                    'rounded-xl border p-6 md:p-8',
                    material.recommended
                      ? 'border-brand-gold/50 bg-white ring-2 ring-brand-gold/25 shadow-[0_4px_24px_rgba(158,27,36,0.08)]'
                      : 'border-black/5 bg-brand-stone',
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-brand-dark">{material.name}</h3>
                    {material.recommended ? (
                      <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green-700">Pros</p>
                      <ul className="space-y-2">
                        {material.pros.map((pro) => (
                          <li key={pro} className="flex gap-2 text-sm text-brand-body">
                            <Check size={14} className="mt-0.5 shrink-0 text-brand-green-700" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-body/60">Cons</p>
                      <ul className="space-y-2">
                        {material.cons.map((con) => (
                          <li key={con} className="flex gap-2 text-sm text-brand-body">
                            <span className="mt-0.5 shrink-0 text-brand-gold">&#x2715;</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">Maintenance</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-body">{material.maintenance}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">Durability</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-body">{material.durability}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {galleryProjects.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">
              {service.name} Projects in the Cedar Valley
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              See real {service.name.toLowerCase()} work completed across Cedar Falls and surrounding communities.
            </p>
            <div className="mt-10">
              <GalleryGrid projects={galleryProjects} />
            </div>
            <div className="mt-8 text-center">
              <Button href="/gallery" variant="outline">
                View Full Gallery
              </Button>
            </div>
          </FadeIn>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">
              {service.name} in Cedar Falls: FAQ
            </h2>
            <div className="mt-8">
              <FaqAccordion
                items={faqs.map((faq) => ({
                  q: faq.question,
                  a: faq.answer,
                }))}
              />
            </div>
            <FadeIn className="mt-8 text-center" delay={0.05}>
              <p className="text-sm text-brand-body mb-4">Have more questions? We are happy to help.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href="/contact" size="sm">
                  {CTA_COPY.estimate}
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="outline" size="sm">
                  <Phone size={14} />
                  {siteConfig.phoneDisplay}
                </Button>
              </div>
              <div className="mt-4">
                <Link
                  href="/faqs"
                  className="text-sm font-semibold text-brand-green-700 underline-offset-2 hover:underline"
                >
                  View all FAQs &rarr;
                </Link>
              </div>
            </FadeIn>
          </FadeIn>
        </section>
      )}

      <CtaBanner
        title="Ready to get started?"
        description="Call us today or request a free quote online."
      />

      {complementaryServices.length > 0 && (
        <section className="section bg-white">
          <div className="section-inner">
            <FadeIn className="mb-10 text-center">
              <h2 className="section-heading">Other Landscaping Services in Cedar Falls</h2>
            </FadeIn>
            <StaggerContainer className="grid gap-6 sm:grid-cols-3">
              {complementaryServices.map((s) => (
                <StaggerItem key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="card block h-full p-6">
                    <ServiceIcon name={s.icon} size={22} />
                    <h3 className="mt-3 font-bold text-brand-dark">{s.name}</h3>
                    <p className="mt-1 text-sm text-brand-body">{s.shortDesc}</p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <RelatedContent groups={relatedContentGroups} />
    </>
  )
}
