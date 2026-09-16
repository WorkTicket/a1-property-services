import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone } from 'lucide-react'
import {
  allServices,
  getServiceBySlug,
  getServicePageHref,
  getLegacyLandingPageHref,
  getServiceDetailContent,
  serviceExtendedContent,
  serviceFaqs,
} from '@/lib/services'
import { generatePageMetadata, serviceSeoOverrides, siteConfig, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, howToJsonLd, webPageJsonLd, organizationRef } from '@/lib/metadata'
import { getGalleryProjectsForService, getServiceHeroImage, getServiceHeroImageAlt, getServiceContentImage, getServiceContentImageAlt } from '@/lib/images'
import { getComplementaryServices, getServiceRelatedContentGroups, getContentSegments } from '@/lib/internal-linking'
import { primaryAreaServedSchema } from '@/lib/service-area'
import RelatedContent from '@/components/sections/RelatedContent'
import HubPagePromo from '@/components/sections/HubPagePromo'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import ServiceIntroSection from '@/components/sections/ServiceIntroSection'
import ServiceDetailSections from '@/components/sections/ServiceDetailSections'
import CtaBanner from '@/components/sections/CtaBanner'
import EstimateSection from '@/components/sections/EstimateSection'
import GalleryGrid from '@/components/sections/GalleryGrid'
import PageHero from '@/components/motion/PageHero'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FadeIn from '@/components/motion/FadeIn'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return allServices.filter((s) => !getLegacyLandingPageHref(s.slug)).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
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
      absoluteTitle: true,
    })
  }

  return generatePageMetadata({
    title: service.name,
    description: `${service.name} in Cedar Falls, Iowa. ${service.shortDesc} A1 Property Services, licensed and insured, with free estimates.`,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const seo = serviceSeoOverrides[service.slug]
  const complementaryServices = getComplementaryServices(service.slug, 3)
  const relatedContentGroups = getServiceRelatedContentGroups(service.slug)

  const faqs = serviceFaqs[service.slug] ?? []
  const { problems, processSteps, benefits, equipment, materials, comparisonMeta } = getServiceDetailContent(service.slug)
  const extended = serviceExtendedContent[service.slug]
  const galleryProjects = getGalleryProjectsForService(service.slug)
  const heroImage = getServiceHeroImage(service.slug)
  const heroImageAlt = getServiceHeroImageAlt(service.slug)
  const contentImage = getServiceContentImage(service.slug)
  const contentImageAlt = getServiceContentImageAlt(service.slug)

  const serviceName = seo ? seo.h1 : `${service.name} in Cedar Falls`
  const pageUrl = `${siteConfig.url}/services/${service.slug}`

  function contentLinks(text: string, max = 3) {
    return getContentSegments(text, max, [slug]).map((seg, i) =>
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
    provider: organizationRef(),
    areaServed: [...primaryAreaServedSchema],
    description: seo?.description ?? `${service.shortDesc} Serving Cedar Falls, Waterloo, and Black Hawk County, Iowa.`,
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
                { name: serviceName, path: `/services/${slug}` },
              ]),
              ...(faqJsonLd ? [faqJsonLd] : []),
              ...(processSteps.length > 0
                ? [
                    howToJsonLd(processSteps, {
                      name: `How We Deliver ${service.name}`,
                      description: `Our step-by-step process for ${service.name.toLowerCase()} projects in Cedar Falls, Waterloo, and Black Hawk County.`,
                    }),
                  ]
                : []),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
        eyebrow="Cedar Falls & Waterloo, Iowa"
        title={serviceName}
        subtitle={service.shortDesc}
      />

      <PageBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'All Services', href: '/services' },
          { label: serviceName },
        ]}
      />

      <ServiceIntroSection
        intro={contentLinks(service.longDesc)}
        extendedHeading={extended?.heading}
        extendedParagraphs={extended?.paragraphs.map((p) => contentLinks(p))}
        imageSrc={contentImage ?? heroImage ?? ''}
        imageAlt={contentImageAlt ?? heroImageAlt}
      />

      <ServiceDetailSections
        serviceName={service.name}
        problems={problems}
        processSteps={processSteps}
        benefits={benefits}
        equipment={equipment}
        materials={materials}
        comparisonMeta={comparisonMeta}
      />

      {galleryProjects.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">
              {service.name} Projects in Cedar Falls &amp; Waterloo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              See real {service.name.toLowerCase()} work completed for Cedar Falls, Waterloo, and Black Hawk County homeowners.
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
              {service.name}: FAQ
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
                <Button href="#estimate" size="sm" trackLabel={`${service.name} FAQ Quote`}>
                  {CTA_COPY.estimate}
                </Button>
                <Button
                  href={`tel:${siteConfig.phone}`}
                  variant="outline"
                  size="sm"
                  trackLabel={`${service.name} FAQ Phone`}
                >
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

      <HubPagePromo />

      <EstimateSection
        formLocation={`Service ${service.name}`}
        heading={`Get a Free ${service.name} Quote`}
        description={`Tell us about your ${service.name.toLowerCase()} project. We'll follow up with a clear on-site estimate. No pressure.`}
        defaultService={service.slug}
        defaultCity="Cedar Falls"
      />

      <CtaBanner
        title="Want a number on this job?"
        description="Call or request a quote. We'll come look at the property."
        quoteHref="#estimate"
      />

      {complementaryServices.length > 0 && (
        <section className="section bg-white">
          <div className="section-inner">
            <FadeIn className="mb-10 text-center">
              <h2 className="section-heading">Related Landscaping Services</h2>
            </FadeIn>
            <StaggerContainer className="grid gap-6 sm:grid-cols-3">
              {complementaryServices.map((s) => (
                <StaggerItem key={s.slug}>
                  <Link href={getServicePageHref(s.slug)} className="card block h-full p-6">
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
