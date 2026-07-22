import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Check, ChevronRight, Phone, Star } from 'lucide-react'
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
import { getLandingProofProjects } from '@/lib/images'
import { CTA_COPY } from '@/lib/cta'
import { yearsInBusinessLabel } from '@/lib/years-in-business'
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

const BeforeAfterSlider = dynamic(() => import('@/components/ui/BeforeAfterSlider'), {
  loading: () => <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-200" />,
  ssr: false,
})

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
  const proofProjects = getLandingProofProjects(page.serviceSlug)
  const formLocation = `Legacy ${serviceName}`

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: page.h1,
    name: page.h1,
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Cedar Falls', containedInPlace: { '@type': 'State', name: 'Iowa' } },
      { '@type': 'City', name: 'Waterloo', containedInPlace: { '@type': 'State', name: 'Iowa' } },
      { '@type': 'Place', name: 'Cedar Valley, Iowa' },
    ],
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
        className="relative flex min-h-[50vh] flex-col overflow-hidden pt-24 pb-0 text-white md:min-h-[55vh]"
        style={{ position: 'relative' }}
      >
        <HeroImagePreload src={page.heroImage} />
        <LcpHeroImage src={page.heroImage} alt={page.heroImageAlt} />
        <HeroOverlay imageSrc={page.heroImage} variant="center" />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-8 text-center sm:px-6">
          <div>
            <p className="hero-eyebrow">{page.eyebrow}</p>
            <h1 className="hero-title mt-4">{page.h1}</h1>
            <p className="hero-subtitle mx-auto mt-4 max-w-2xl md:mt-6">{page.heroHeading}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#estimate" size="lg">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href={`tel:${siteConfig.phone}`} variant="ghost" size="lg">
                <Phone className="h-4 w-4" aria-hidden />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>

        <div className="relative z-10 shrink-0 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-sm text-white/90 sm:gap-10">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="fill-brand-gold text-brand-gold" aria-hidden />
              5-Star Rated
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <span>Licensed &amp; Insured</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <span>{yearsInBusinessLabel()}</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <span>Free On-Site Quotes</span>
          </div>
        </div>
      </section>

      {proofProjects.length > 0 ? (
        <section className="section bg-white">
          <div className="section-inner">
            <FadeIn className="flex items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Recent Work</p>
                <h2 className="section-heading mt-3">Before &amp; After</h2>
                <p className="mt-2 max-w-xl text-brand-body">
                  Real {serviceName.toLowerCase()} projects from the Cedar Valley — drag to compare.
                </p>
              </div>
              <Button href="/gallery" variant="outline" size="sm" className="hidden sm:inline-flex">
                View Gallery
              </Button>
            </FadeIn>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {proofProjects.map((project) => (
                <BeforeAfterSlider
                  key={project.id}
                  title={project.title}
                  before={{ ...project.before, priority: false }}
                  after={{ ...project.after, priority: false }}
                />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button href="#estimate">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {page.sections.map((section, index) => (
        <section
          key={section.heading}
          className={`section ${index % 2 === 0 ? 'bg-brand-stone' : 'bg-white'}`}
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
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button href="#estimate">
                        {CTA_COPY.quote}
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Button>
                      <Link
                        href={serviceHref}
                        className="text-sm font-semibold text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline"
                      >
                        Process, materials &amp; gallery
                      </Link>
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
                <div className="mt-8">
                  <Button href="#estimate">
                    {CTA_COPY.quote}
                    <ChevronRight className="h-4 w-4" aria-hidden />
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

      {faqs.length > 0 ? (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">{serviceName}: FAQ</h2>
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
                Tell us about your {serviceName.toLowerCase()} project. We follow up with a clear on-site
                quote for homes across the Cedar Valley — no pressure.
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
                <QuoteForm
                  variant="light"
                  formLocation={formLocation}
                  defaultService={page.serviceSlug}
                  defaultCity="Cedar Falls"
                  compact
                />
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
            <Button href={`tel:${siteConfig.phone}`} variant="outline" size="lg">
              <Phone className="h-4 w-4" aria-hidden />
              {siteConfig.phoneDisplay}
            </Button>
          </div>
        </FadeIn>
      </section>

      <HubPagePromo />

      {complementaryServices.length > 0 ? (
        <section className="section bg-white">
          <div className="section-inner">
            <FadeIn className="mb-10 text-center">
              <h2 className="section-heading">Related Landscaping Services</h2>
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
        description="Tell us about your project and we will follow up with a clear quote for the Cedar Valley."
        eyebrow={page.ctaEyebrow ?? 'Cedar Valley Hardscaping'}
      />
    </>
  )
}
