import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generatePageMetadata, servicesHubKeywords, siteConfig, webPageJsonLd } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { services, hardscapeFeatures, hardscapeServices, servicesHubFaqs } from '@/lib/services'
import { siteImages } from '@/lib/images'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import CtaBanner from '@/components/sections/CtaBanner'
import ServiceIcon from '@/components/ui/ServiceIcon'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Services in Cedar Falls',
  description:
    'Landscaping services in Cedar Falls, IA. Retaining walls, paver patios, water features, lawn care, tree service, snow removal, and more. Free estimates.',
  path: '/services',
  keywords: servicesHubKeywords,
  ogImage: '/images/landscaping.webp',
  ogImageAlt: 'Landscaping services in Cedar Falls, Iowa',
})

const hardscapeDetailServices = [
  ...hardscapeServices,
  services.find((s) => s.slug === 'ponds-water-features')!,
]

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Landscaping Services in Cedar Falls',
    description:
      'Full landscaping and hardscaping services offered by A1 Property Services in Cedar Falls, Iowa.',
    url: `${siteConfig.url}/services`,
    numberOfItems: hardscapeFeatures.length + services.length,
    itemListElement: [
      ...hardscapeFeatures.map((f, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: f.name,
          url: `${siteConfig.url}${f.href}`,
          description: f.shortDesc,
          provider: { '@type': 'LandscapingBusiness', name: siteConfig.name },
          areaServed: 'Cedar Falls, IA',
        },
      })),
      ...services.map((s, i) => ({
        '@type': 'ListItem',
        position: hardscapeFeatures.length + i + 1,
        item: {
          '@type': 'Service',
          name: s.name,
          url: `${siteConfig.url}/services/${s.slug}`,
          description: s.shortDesc,
          provider: { '@type': 'LandscapingBusiness', name: siteConfig.name },
          areaServed: 'Cedar Falls, IA',
        },
      })),
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: servicesHubFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Landscaping Services in Cedar Falls',
        item: `${siteConfig.url}/services`,
      },
    ],
  }

  const pageSchema = webPageJsonLd({
    name: 'Landscaping Services in Cedar Falls',
    description: 'Full landscaping and hardscaping services by A1 Property Services in Cedar Falls, IA.',
    path: '/services',
    image: '/images/landscaping.webp',
    about: 'Landscaping Services',
  })

  const hardscapeImages: Record<string, string> = {
    'retaining-walls': siteImages.hardscapeRetainingWalls,
    'paver-patio': siteImages.hardscapePaverPatio,
    'ponds-water-features': siteImages.hardscapePondsWaterFeatures,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        imageSrc={siteImages.servicesHero}
        imageAlt="Landscaping services in Cedar Falls, Iowa"
        eyebrow="What We Offer"
        title="Landscaping Services|in Cedar Falls"
        subtitle="Full yard installs, hardscape, mowing, snow removal, and everything in between. Built for Iowa."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">Your Cedar Falls Landscaping Contractor</h2>
          <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
            <p>
              A1 Property Services is a full-service landscaping company in Cedar Falls, Iowa. We
              handle everything from retaining wall installation and paver patio installation to
              water features, lawn care, tree service, and snow removal.
            </p>
            <p>
              Whether you need a single project or year-round landscape maintenance, our licensed and
              insured crew builds for Iowa weather — proper drainage, compacted bases, and materials
              rated for freeze-thaw cycles across the Cedar Valley.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="relative overflow-hidden bg-brand-green-800 py-12 md:py-16">
        <ResponsiveImage src={siteImages.serviceLandscapeInstallation} alt="" fill className="opacity-20" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-green-800/85" />
        <div className="section-inner relative">
          <FadeIn className="mb-6 text-center">
            <p className="section-eyebrow">Signature Work</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Hardscaping in Cedar Falls
            </h2>
          </FadeIn>
          <StaggerContainer className="grid gap-4 md:grid-cols-3">
            {hardscapeFeatures.map((f) => (
              <StaggerItem key={f.slug}>
                <Link
                  href={f.href}
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
                      alt={`${service.name} in Cedar Falls, Iowa`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-body">
                      {service.longDesc.slice(0, 180)}&hellip;
                    </p>
                    <div className="mt-6 grid gap-2 sm:flex sm:gap-3">
                      <Button
                        href={`/services/${service.slug}`}
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

      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="mb-10 text-center">
            <h2 className="section-heading">All Landscaping Services</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-body">
              Everything your Cedar Falls property needs, all year.
            </p>
          </FadeIn>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => service.slug !== 'ponds-water-features')
              .map((service) => (
              <StaggerItem key={service.slug}>
                <div className="card h-full p-6">
                  <ServiceIcon name={service.icon} />
                  <h3 className="mt-4 text-xl font-bold text-brand-dark">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-body">{service.longDesc}</p>
                  <div className="mt-6 grid gap-2 sm:flex sm:gap-3">
                    <Button
                      href={`/services/${service.slug}`}
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">Landscaping Services in Cedar Falls: FAQ</h2>
          <dl className="mt-10 space-y-8">
            {servicesHubFaqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-bold text-brand-dark">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-brand-body">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      <CtaBanner
        title="Not sure what you need?"
        description="Call us. We'll help you figure it out over the phone or come take a look."
      />
    </>
  )
}
