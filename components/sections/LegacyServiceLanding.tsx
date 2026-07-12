import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  generatePageMetadata,
  jsonLdGraph,
  siteConfig,
  webPageJsonLd,
} from '@/lib/metadata'
import type { LegacyLandingPage } from '@/lib/legacy-landing-pages'
import { serviceFaqs } from '@/lib/services'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import HubPagePromo from '@/components/sections/HubPagePromo'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import HeroOverlay from '@/components/ui/HeroOverlay'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import FadeIn from '@/components/motion/FadeIn'

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

  const faqs = serviceFaqs[page.serviceSlug] ?? []
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
            <div className="mt-8">
              <Button href="/contact" size="lg">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
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
                    <div className="mt-8">
                      <Button href="/contact">
                        {CTA_COPY.quote}
                        <ChevronRight className="h-4 w-4" aria-hidden />
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
              <div className="mt-8">
                <Button href="/contact">
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

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow text-center">
          <p className="text-lg text-brand-body leading-relaxed">{page.closingCopy}</p>
          <p className="mt-4 text-lg font-semibold text-brand-dark">
            <Link href="/contact" className="text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline">
              Contact us today!
            </Link>
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              {CTA_COPY.quote}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </FadeIn>
      </section>

      <HubPagePromo />

      <CtaBanner
        title="Get Your Free Estimate"
        description="Tell us about your project and we will follow up with a clear quote for Cedar Falls and the Cedar Valley."
        eyebrow={page.ctaEyebrow ?? 'Cedar Falls Hardscaping'}
      />
    </>
  )
}
