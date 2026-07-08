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
import { landscapingHubPage } from '@/lib/landscaping-hub-page'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import FaqAccordion from '@/components/ui/FaqAccordion'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import HeroOverlay from '@/components/ui/HeroOverlay'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import FadeIn from '@/components/motion/FadeIn'

export function landscapingHubMetadata() {
  const page = landscapingHubPage
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

export default function LandscapingHubLanding() {
  const page = landscapingHubPage

  const pageSchema = webPageJsonLd({
    name: page.title,
    description: page.description,
    path: page.path,
    image: page.heroImage,
    about: 'Landscaping Cedar Falls',
  })

  const localBusinessServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Landscaping Cedar Falls',
    name: 'Landscaping Cedar Falls',
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Cedar Falls', containedInPlace: { '@type': 'State', name: 'Iowa' } },
      { '@type': 'City', name: 'Waterloo' },
      { '@type': 'Place', name: 'Cedar Valley' },
    ],
    description: page.description,
    url: `${siteConfig.url}${page.path}`,
    image: `${siteConfig.url}${page.heroImage}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              localBusinessServiceJsonLd,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Landscaping Cedar Falls' },
              ]),
              faqPageJsonLd(page.faqs),
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

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <div className="hero-copy-reveal">
            <p className="hero-eyebrow">{page.eyebrow}</p>
            <h1 className="hero-title mt-4">{page.h1}</h1>
            <h2 className="hero-subtitle mx-auto mt-4 max-w-3xl md:mt-6">{page.heroHeading}</h2>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="section-heading">{page.introHeading}</h2>
              <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
                {page.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
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
        </div>
      </section>

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{page.coreServicesHeading}</h2>
          <p className="mt-6 text-brand-body leading-relaxed">{page.coreServicesIntro}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {page.featuredServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="flex items-center justify-between rounded-xl border border-black/10 bg-brand-stone px-5 py-4 text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
                >
                  <span className="font-display text-lg font-semibold">{service.label}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{page.allServicesHeading}</h2>
          <p className="mt-6 text-brand-body leading-relaxed">{page.allServicesIntro}</p>
        </FadeIn>
      </section>

      {page.serviceSections.map((section, index) => (
        <section
          key={section.heading}
          className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-brand-stone'}`}
        >
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">{section.heading}</h2>
            <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
            {section.bulletsHeading ? (
              <h3 className="mt-8 font-display text-xl font-bold text-brand-dark">{section.bulletsHeading}</h3>
            ) : null}
            {section.bullets && section.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-brand-body">
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8">
              <Button href="/contact">
                {CTA_COPY.quote}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </FadeIn>
        </section>
      ))}

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{page.faqHeading}</h2>
          <FaqAccordion
            items={page.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
          />
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow text-center">
          <h2 className="section-heading">{page.contactHeading}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-brand-body leading-relaxed">{page.contactIntro}</p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              {CTA_COPY.quote}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </FadeIn>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow text-center">
          <p className="text-lg text-brand-body leading-relaxed">{page.closingCopy}</p>
          <p className="mt-4 text-lg font-semibold text-brand-dark">
            <Link href="/contact" className="text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline">
              Contact us today!
            </Link>
          </p>
        </FadeIn>
      </section>

      <CtaBanner
        title="Get Your Free Landscaping Estimate"
        description="Tell us about your landscaping Cedar Falls project. We serve Cedar Falls, Waterloo, and the full Cedar Valley."
        eyebrow="Landscaping Cedar Falls"
      />
    </>
  )
}
