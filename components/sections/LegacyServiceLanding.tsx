import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Check, ChevronRight, Phone } from 'lucide-react'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  generatePageMetadata,
  jsonLdGraph,
  siteConfig,
  webPageJsonLd,
} from '@/lib/metadata'
import type { LegacyLandingPage } from '@/lib/legacy-landing-pages'
import { getServiceBySlug, getServicePageHref, serviceFaqs } from '@/lib/services'
import { getComplementaryServices, getServiceRelatedContentGroups } from '@/lib/internal-linking'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import HubPagePromo from '@/components/sections/HubPagePromo'
import RelatedContent from '@/components/sections/RelatedContent'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import HeroOverlay from '@/components/ui/HeroOverlay'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import FaqAccordion from '@/components/ui/FaqAccordion'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

const QuoteForm = dynamic(() => import('@/components/ui/QuoteForm'))

type LegacyServiceLandingProps = {
  page: LegacyLandingPage
}

export function legacyLandingMetadata(page: LegacyLandingPage) {
  return generatePageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
    ogImage: page.ogImage,
    ogImageAlt: page.ogImageAlt,
    absoluteTitle: true,
  })
}

export default function LegacyServiceLanding({ page }: LegacyServiceLandingProps) {
  const service = getServiceBySlug(page.serviceSlug)
  const serviceHref = getServicePageHref(page.serviceSlug)
  const serviceName = service?.name ?? page.h1
  const complementaryServices = getComplementaryServices(page.serviceSlug, 3)
  const relatedContentGroups = getServiceRelatedContentGroups(page.serviceSlug)
  const faqs = serviceFaqs[page.serviceSlug] ?? []
  const formLocation = `Legacy ${serviceName}`

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: page.h1,
    name: page.h1,
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: {
      '@type': 'City',
      name: 'Cedar Falls',
      containedInPlace: { '@type': 'State', name: 'Iowa' },
    },
    description: page.description,
    url: `${siteConfig.url}${page.path}`,
    image: `${siteConfig.url}${page.heroImage}`,
  }

  const pageSchema = webPageJsonLd({
    name: page.title,
    description: page.description,
    path: page.path,
    image: page.heroImage,
    about: page.h1,
  })

  const faqSchema = faqs.length > 0 ? faqPageJsonLd(faqs) : null

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
                { name: page.h1, path: page.path },
              ]),
              ...(faqSchema ? [faqSchema] : []),
            ),
          ),
        }}
      />

      <section
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-24 pb-12 text-white md:min-h-[55vh]"
        style={{ position: 'relative' }}
      >
        <HeroImagePreload src={page.heroImage} />
        <LcpHeroImage src={page.heroImage} alt={page.heroImageAlt} />
        <HeroOverlay imageSrc={page.heroImage} variant="center" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <div>
            <p className="hero-eyebrow">{page.eyebrow}</p>
            <h1 className="hero-title mt-4">{page.h1}</h1>
            <h2 className="hero-subtitle mx-auto mt-4 max-w-2xl md:mt-6">{page.heroHeading}</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#estimate" size="lg">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href={serviceHref} variant="ghost" size="lg">
                View Full Service Details
              </Button>
            </div>
          </div>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <section
          key={section.heading}
          className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-brand-stone'}`}
        >
          {index === 0 ? (
            <div className="section-inner">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <FadeIn direction="left">
                  <h2 className="section-heading">{section.heading}</h2>
                  <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  {section.showCta ? (
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button href="#estimate">
                        {CTA_COPY.quote}
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Button>
                      <Button href={serviceHref} variant="outline">
                        Process, Materials &amp; Gallery
                      </Button>
                    </div>
                  ) : null}
                </FadeIn>
                <FadeIn direction="right" delay={0.1}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                    <ResponsiveImage
                      src={page.contentImage}
                      alt={page.contentImageAlt}
                      fill
                      className="transition-transform duration-700 hover:scale-105"
                      sizes={IMAGE_SIZES.halfCol}
                    />
                  </div>
                </FadeIn>
              </div>
              {section.subsections?.map((subsection) => (
                <FadeIn key={subsection.heading} className="mt-12">
                  <h3 className="font-display text-2xl font-bold text-brand-dark">{subsection.heading}</h3>
                  <div className="mt-4 space-y-4 text-brand-body leading-relaxed">
                    {subsection.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">{section.heading}</h2>
            <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.bulletsIntro ? (
              <p className="mt-6 text-brand-body leading-relaxed">{section.bulletsIntro}</p>
            ) : null}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-brand-body">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.paragraphsAfter && section.paragraphsAfter.length > 0 ? (
              <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
                {section.paragraphsAfter.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {section.showCta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#estimate">
                  {CTA_COPY.quote}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button href={serviceHref} variant="outline">
                  Process, Materials &amp; Gallery
                </Button>
              </div>
            ) : null}
            {section.subsections?.map((subsection) => (
              <div key={subsection.heading} className="mt-10">
                <h3 className="font-display text-2xl font-bold text-brand-dark">{subsection.heading}</h3>
                <div className="mt-4 space-y-4 text-brand-body leading-relaxed">
                  {subsection.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </FadeIn>
          )}
        </section>
      ))}

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow text-center">
          <p className="section-eyebrow">Next Step</p>
          <h2 className="section-heading mt-3">See How We Build {serviceName}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-body leading-relaxed">
            Want process steps, materials, and project photos before you request a quote? Open the full{' '}
            {serviceName.toLowerCase()} service page, then come back here or jump straight to a free estimate.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={serviceHref} size="lg">
              View {serviceName} Details
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="#estimate" variant="outline" size="lg">
              {CTA_COPY.quote}
            </Button>
          </div>
        </FadeIn>
      </section>

      {faqs.length > 0 ? (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">{serviceName} in Cedar Falls: FAQ</h2>
            <div className="mt-8">
              <FaqAccordion
                items={faqs.map((faq) => ({
                  q: faq.question,
                  a: faq.answer,
                }))}
              />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="#estimate" size="sm">
                {CTA_COPY.estimate}
              </Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline" size="sm">
                <Phone size={14} />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </FadeIn>
        </section>
      ) : null}

      <section id="estimate" className="section bg-neutral-50">
        <div className="section-inner relative">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="section-eyebrow">Get Started</p>
              <h2 className="section-heading mt-3">Request Your Free Estimate</h2>
              <p className="mt-4 leading-relaxed text-brand-body">
                Tell us about your {serviceName.toLowerCase()} project in Cedar Falls or the Cedar Valley.
                We follow up with a clear on-site quote — no pressure.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Free on-site estimates for local homeowners
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Licensed &amp; insured Iowa contractor
                </li>
                <li className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  Built for Iowa freeze-thaw and drainage
                </li>
              </ul>
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-gold"
              >
                <Phone size={16} className="text-brand-gold" />
                Or call {siteConfig.phoneDisplay}
              </a>
              <p className="mt-6 text-sm text-brand-body">
                Prefer more detail first?{' '}
                <Link
                  href={serviceHref}
                  className="font-semibold text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline"
                >
                  Browse the full {serviceName.toLowerCase()} page
                </Link>
                .
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="form-card">
                <QuoteForm variant="light" formLocation={formLocation} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow text-center">
          <p className="text-lg text-brand-body leading-relaxed">{page.closingCopy}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#estimate" size="lg">
              {CTA_COPY.quote}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={serviceHref} variant="outline" size="lg">
              View Full Service Details
            </Button>
          </div>
        </FadeIn>
      </section>

      <HubPagePromo />

      {complementaryServices.length > 0 ? (
        <section className="section bg-white">
          <div className="section-inner">
            <FadeIn className="mb-10 text-center">
              <h2 className="section-heading">Other Landscaping Services in Cedar Falls</h2>
              <p className="mx-auto mt-3 max-w-2xl text-brand-body">
                Planning a bigger outdoor project? These services often pair with {serviceName.toLowerCase()}.
              </p>
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
      ) : null}

      <RelatedContent groups={relatedContentGroups} />

      <CtaBanner
        title="Get Your Free Estimate"
        description="Tell us about your project and we will follow up with a clear quote for Cedar Falls and the Cedar Valley."
        eyebrow={page.ctaEyebrow ?? 'Cedar Falls Hardscaping'}
      />
    </>
  )
}
