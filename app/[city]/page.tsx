import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MapPin, Check, Star, ChevronRight } from 'lucide-react'
import { cities, getCityBySlug } from '@/lib/cities'
import { generatePageMetadata, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, siteConfig, webPageJsonLd } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { siteImages } from '@/lib/images'
import { services, hardscapeFeatures, hardscapeServices, getHardscapeFeatureHref } from '@/lib/services'
import { getAllRelatedGroups } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import CtaBanner from '@/components/sections/CtaBanner'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import FaqAccordion from '@/components/ui/FaqAccordion'
import GoogleReviews from '@/components/ui/GoogleReviews'

type Props = { params: { city: string } }

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)
  if (!city) return {}

  return generatePageMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/${city.slug}`,
    keywords: city.metaKeywords,
    absoluteTitle: true,
    ogImage: '/images/local-hero-image.webp',
    ogImageAlt: `Landscaping services in ${city.name}, Iowa`,
  })
}

const hardscapeDetailServices = [
  ...hardscapeServices,
  services.find((s) => s.slug === 'ponds-water-features')!,
]

const hardscapeImages: Record<string, string> = {
  'retaining-walls': siteImages.hardscapeRetainingWalls,
  'paver-patio': siteImages.hardscapePaverPatio,
  'ponds-water-features': siteImages.hardscapePondsWaterFeatures,
}

const trustPoints = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Locally Owned & Operated',
    desc: 'Based in the Cedar Valley. We know the soil, the seasons, and what works here.',
  },
  {
    icon: <Check className="h-6 w-6" />,
    title: 'Licensed & Insured',
    desc: 'Fully licensed Iowa contractor with liability insurance on every job.',
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: '5-Star Rated',
    desc: 'Built on quality work and reliable service across the Cedar Valley.',
  },
]

export default function CityPage({ params }: Props) {
  const city = getCityBySlug(params.city)
  if (!city) notFound()

  const cityJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LandscapingBusiness',
    name: `A1 Property Services - ${city.name}`,
    description: city.description,
    url: `${siteConfig.url}/${city.slug}`,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: city.name,
      addressRegion: 'IA',
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Iowa' },
    },
    priceRange: '$$',
  }

  const faqJsonLd = faqPageJsonLd(
    city.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
  )

  const pageSchema = webPageJsonLd({
    name: city.metaTitle,
    description: city.metaDescription,
    path: `/${city.slug}`,
    about: `Landscaping in ${city.name}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              cityJsonLd,
              faqJsonLd,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: city.name },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        eyebrow={city.heroEyebrow}
        title={city.heroTitle}
        subtitle={city.heroSubtitle}
      />

      {/* Intro Section */}
      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="left">
              <h2 className="section-heading">{city.introHeading}</h2>
              {city.introBody.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-brand-body">
                  {p}
                </p>
              ))}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact">
                  {CTA_COPY.quote}
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark">
                  <Phone size={16} />
                  {siteConfig.phoneDisplay}
                </Button>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <ResponsiveImage
                  src={siteImages.cityIntro}
                  alt={`Landscaping project in ${city.name}, Iowa`}
                  fill
                  sizes={IMAGE_SIZES.halfCol}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Signature Work */}
      <section className="relative overflow-hidden bg-brand-green-800 py-12 md:py-16">
        <ResponsiveImage src={siteImages.serviceLandscapeInstallation} alt="" fill className="opacity-20" sizes={IMAGE_SIZES.fullWidth} />
        <div className="absolute inset-0 bg-brand-green-800/85" />
        <div className="section-inner relative">
          <FadeIn className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Signature Work</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Hardscaping in {city.name}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid gap-4 md:grid-cols-4">
            {hardscapeFeatures.map((f) => (
              <StaggerItem key={f.slug}>
                <Link
                  href={getHardscapeFeatureHref(city.slug, f.slug, f.href)}
                  className="group block rounded-xl border border-white/20 bg-white/10 p-5 text-white transition-all duration-200 hover:-translate-y-1 hover:bg-white/20"
                >
                  <h3 className="text-lg font-bold">{f.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{f.shortDesc}</p>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                    View Service <ChevronRight size={12} />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Specialty Hardscaping */}
      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="text-center">
            <h2 className="section-heading">Specialty Hardscaping</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-body">
              Retaining walls, paver patios, and water features built for Iowa winters.
            </p>
          </FadeIn>
          <StaggerContainer className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hardscapeDetailServices.map((service) => (
              <StaggerItem key={service.slug}>
                <div className="card overflow-hidden">
                  <div className="card-image relative h-48">
                    <ResponsiveImage
                      src={hardscapeImages[service.slug] ?? siteImages.servicesHero}
                      alt={`${service.name} in ${city.name}, Iowa`}
                      fill
                      sizes={IMAGE_SIZES.thirdCol}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-body">
                      {service.longDesc.slice(0, 180)}&hellip;
                    </p>
                    <div className="mt-6 grid gap-2 sm:flex sm:gap-3">
                      <Button
                        href={`/${city.slug}/${service.slug}`}
                        variant="outline"
                        size="xs"
                        fullWidth
                        className="sm:w-auto"
                      >
                        {CTA_COPY.learnMore}
                      </Button>
                      <Button href="/contact" size="xs" fullWidth className="sm:w-auto">
                        {CTA_COPY.quote}
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <p className="section-eyebrow">Why {city.name} Chooses A1</p>
              <h2 className="section-heading mt-3">{city.uniqueContent.heading}</h2>
              <p className="mt-6 leading-relaxed text-brand-body">
                {city.uniqueContent.body}
              </p>
              {city.introBody2.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-brand-body">
                  {p}
                </p>
              ))}
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <ResponsiveImage
                  src={siteImages.cityWhy}
                  alt={`A1 Property Services landscaping in ${city.name}`}
                  fill
                  sizes={IMAGE_SIZES.halfCol}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="section bg-brand-green-100">
        <div className="section-inner">
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            {trustPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-full bg-brand-green-800/10 p-3 text-brand-green-800">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark">{point.title}</h3>
                    <p className="mt-1 text-sm text-brand-muted">{point.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Gallery CTA */}
      <section className="section bg-white">
        <FadeIn className="section-inner text-center">
          <p className="section-eyebrow">See Our Work</p>
          <h2 className="section-heading mt-3">
            {city.isCedarValley
              ? 'Completed Projects in the Cedar Valley'
              : 'View Our Completed Projects'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-body">
            {city.isCedarValley
              ? `Browse before and after photos of real projects in ${city.name} and across the Cedar Valley.`
              : 'Browse before and after photos of our landscaping and hardscaping projects.'}
          </p>
          <Button href="/gallery" className="mt-8">
            {CTA_COPY.viewGallery}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Button>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="section bg-brand-stone">
        <div className="section-inner-narrow">
          <FadeIn className="text-center">
            <p className="section-eyebrow">Questions?</p>
            <h2 className="section-heading mt-3">
              Landscaping in {city.name}: FAQ
            </h2>
          </FadeIn>
          <FaqAccordion items={city.faqs} />
        </div>
      </section>

      <RelatedContent groups={getAllRelatedGroups('city', params.city)} />

      <CtaBanner
        eyebrow="Get Started"
        title={`Ready to Start Your ${city.name} Project?`}
        description="Call us today or request a free quote online. We will get back to you within 24 hours."
        animated
        titleClassName="section-heading text-white"
      />
    </>
  )
}
