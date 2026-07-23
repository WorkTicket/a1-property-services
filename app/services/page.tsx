import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generatePageMetadata, servicesHubKeywords, siteConfig, webPageJsonLd } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { services, hardscapeFeatures, hardscapeServices, servicesHubFaqs } from '@/lib/services'
import { landscapingHubAnchor, landscapingHubPath } from '@/lib/internal-linking'
import { cities } from '@/lib/cities'
import { siteImages } from '@/lib/images'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import CtaBanner from '@/components/sections/CtaBanner'
import HubPagePromo from '@/components/sections/HubPagePromo'
import FaqSectionCta from '@/components/sections/FaqSectionCta'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping & Hardscaping Services',
  description:
    'Browse every landscaping and hardscaping service A1 Property Services offers — retaining walls, patios, lawn care, tree service, snow removal, and more across the Cedar Valley.',
  path: '/services',
  keywords: servicesHubKeywords,
  ogImage: '/images/services-hero.webp',
  ogImageAlt: 'Landscaping and hardscaping services by A1 Property Services',
})

const hardscapeDetailServices = [
  ...hardscapeServices,
  services.find((s) => s.slug === 'ponds-water-features')!,
]

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Landscaping & Hardscaping Services',
    description:
      'Full landscaping and hardscaping services offered by A1 Property Services across the Cedar Valley.',
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
          provider: { '@id': `${siteConfig.url}/#organization` },
          areaServed: ['Cedar Falls, IA', 'Waterloo, IA', 'Cedar Valley, IA'],
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
          provider: { '@id': `${siteConfig.url}/#organization` },
          areaServed: ['Cedar Falls, IA', 'Waterloo, IA', 'Cedar Valley, IA'],
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
        name: 'Services',
        item: `${siteConfig.url}/services`,
      },
    ],
  }

  const pageSchema = webPageJsonLd({
    name: 'Landscaping & Hardscaping Services | A1 Property Services',
    description: 'Browse every landscaping and hardscaping service A1 Property Services offers across the Cedar Valley.',
    path: '/services',
    image: '/images/services-hero.webp',
    about: 'Landscaping and Hardscaping Services',
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
        imageAlt="Landscaping and hardscaping services by A1 Property Services"
        eyebrow="What We Offer"
        title="All Services|Cedar Valley"
        subtitle="Browse every service we offer — hardscape, lawn care, tree service, snow removal, and full installs."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">Your Local Landscaping Contractor</h2>
          <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
            <p>
              A1 Property Services is a full-service landscaping company based in Cedar Falls, Iowa. We
              handle everything from retaining wall installation and paver patio installation to
              water features, lawn care, tree service, and snow removal.
            </p>
            <p>
              Whether you need a single project or year-round landscape maintenance, our licensed and
              insured crew builds for Iowa weather with proper drainage, compacted bases, and materials
              rated for freeze-thaw cycles across the Cedar Valley. For our complete{' '}
              <Link
                href={landscapingHubPath}
                className="font-semibold text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline"
              >
                {landscapingHubAnchor}
              </Link>
              {' '}guide, visit the landscaping hub.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="relative overflow-hidden bg-brand-green-800 py-12 md:py-16">
        <div className="absolute inset-0" aria-hidden="true">
          <ResponsiveImage src={siteImages.serviceLandscapeInstallation} alt="Landscape installation work by A1 Property Services" fill className="opacity-20" sizes={IMAGE_SIZES.fullWidth} />
        </div>
        <div className="absolute inset-0 bg-brand-green-800/85" />
        <div className="section-inner relative">
          <FadeIn className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Signature Work</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Hardscaping Services
            </h2>
          </FadeIn>
          <StaggerContainer className="grid gap-4 md:grid-cols-4">
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
                      alt={service.name}
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
              Everything your property needs, all year.
            </p>
          </FadeIn>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter(
                (service) =>
                  service.slug !== 'ponds-water-features' && service.slug !== 'paver-driveway',
              )
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
          <h2 className="section-heading">Landscaping Services: FAQ</h2>
          <div className="mt-10">
            <FaqAccordion
              items={servicesHubFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
            />
          </div>
          <FaqSectionCta
            learnMoreHref="/faqs"
            learnMoreLabel="View All FAQs"
          />
        </FadeIn>
      </section>

      <section className="section bg-white">
        <div className="section-inner">
          <FadeIn className="mb-8 text-center">
            <h2 className="section-heading">Service Areas</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-body">
              We serve homeowners across the Cedar Valley. Select your city to see local landscaping services.
            </p>
          </FadeIn>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${city.slug}`}
                  className="flex items-center justify-between rounded-lg border border-brand-stone bg-brand-stone/30 px-4 py-3 text-sm font-medium text-brand-dark transition-colors hover:border-brand-green-800/30 hover:bg-brand-green-100/50"
                >
                  <span>{city.name}, IA</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HubPagePromo className="section bg-white py-10" />

      <CtaBanner
        title="Not sure what you need?"
        description="Call us. We'll help you figure it out over the phone or come take a look."
      />
    </>
  )
}
