import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generatePageMetadata, servicesHubKeywords, siteConfig, webPageJsonLd, organizationRef } from '@/lib/metadata'
import { allServices, serviceNavGroups, getServicesForNavGroup, servicesHubFaqs, getServicePageHref } from '@/lib/services'
import { primaryAreaServedSchema } from '@/lib/service-area'
import { cities } from '@/lib/cities'
import { siteImages } from '@/lib/images'
import ServiceCard from '@/components/ui/ServiceCard'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import CtaBanner from '@/components/sections/CtaBanner'
import EstimateSection from '@/components/sections/EstimateSection'
import FaqSectionCta from '@/components/sections/FaqSectionCta'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping & Hardscaping Services',
  description:
    'Browse every landscaping and hardscaping service we offer in Cedar Falls, Waterloo, and Black Hawk County — walls, patios, lawn care, and more.',
  path: '/services',
  keywords: servicesHubKeywords,
  ogImage: '/images/services-hero.webp',
  ogImageAlt: 'Landscaping and hardscaping services by A1 Property Services',
})

export default function ServicesPage() {
  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Landscaping & Hardscaping Services',
    description:
      'Full landscaping and hardscaping services offered by A1 Property Services in Cedar Falls, Waterloo, and Black Hawk County, Iowa.',
    url: `${siteConfig.url}/services`,
    numberOfItems: allServices.length,
    itemListElement: allServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        url: `${siteConfig.url}${getServicePageHref(service.slug)}`,
        description: service.shortDesc,
        provider: organizationRef(),
        areaServed: [...primaryAreaServedSchema],
      },
    })),
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
    description: 'Browse every landscaping and hardscaping service A1 Property Services offers in Cedar Falls, Waterloo, and Black Hawk County, Iowa.',
    path: '/services',
    image: '/images/services-hero.webp',
    about: 'Landscaping and Hardscaping Services',
  })

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
        title="All Services|Cedar Falls & Waterloo"
        subtitle="Pick a service to see details and request a quote. Lawn care, hardscaping, drainage, and full installs — same list as the homepage, just complete."
      />

      <PageBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'All Services' },
        ]}
      />

      <section className="bg-white py-12 md:py-16">
        <div className="section-inner">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <h2 className="section-heading">Choose a Service</h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-body">
              Every card below opens that service page. Not sure which one you need? Jump to a category or request a free estimate and we&rsquo;ll help you decide.
            </p>
            <nav aria-label="Popular Cedar Falls pages" className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/landscaping-services-in-cedar-falls"
                className="rounded-full border border-brand-gold/30 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
              >
                Landscaping Cedar Falls
              </Link>
              <Link
                href="/retaining-wall-in-cedar-falls"
                className="rounded-full border border-brand-gold/30 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
              >
                Retaining Walls
              </Link>
              <Link
                href="/paver-patio-installation"
                className="rounded-full border border-brand-gold/30 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
              >
                Paver Patios
              </Link>
              <Link
                href="/paver-driveway-cedar-falls"
                className="rounded-full border border-brand-gold/30 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
              >
                Paver Driveways
              </Link>
              <Link
                href="/cedar-falls-water-features"
                className="rounded-full border border-brand-gold/30 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
              >
                Water Features
              </Link>
            </nav>
            <nav aria-label="Service categories" className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {serviceNavGroups.map((group) => (
                <a
                  key={group.key}
                  href={`#${group.key}`}
                  className="rounded-full border border-black/[0.08] bg-brand-stone px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-gold/40 hover:bg-white hover:text-brand-gold"
                >
                  {group.label}
                </a>
              ))}
              <a
                href="#estimate"
                className="rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-gold-hover"
              >
                Get a Free Quote
              </a>
            </nav>
          </FadeIn>
        </div>
      </section>

      {serviceNavGroups.map((group, index) => {
        const groupServices = getServicesForNavGroup(group)
        return (
          <section
            key={group.key}
            id={group.key}
            className={index % 2 === 0 ? 'section bg-brand-stone' : 'section bg-white'}
          >
            <div className="section-inner">
              <FadeIn>
                <p className="section-eyebrow">{group.desc}</p>
                <h2 className="section-heading mt-4">{group.label}</h2>
              </FadeIn>
              <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupServices.map((service) => (
                  <StaggerItem key={service.slug}>
                    <ServiceCard service={service} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )
      })}

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="mb-8 text-center">
            <h2 className="section-heading">Service Areas</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-body">
              Based in Cedar Falls. Select a city to see local landscaping pages.
            </p>
          </FadeIn>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${city.slug}`}
                  className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-white px-4 py-3.5 text-sm font-medium text-brand-dark transition-all hover:border-brand-gold/30 hover:shadow-sm"
                >
                  <span>{city.name}, IA</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand-muted" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">Landscaping Services: FAQ</h2>
          <FaqAccordion
            items={servicesHubFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
          />
          <FaqSectionCta
            learnMoreHref="/faqs"
            learnMoreLabel="View All FAQs"
          />
        </FadeIn>
      </section>

      <EstimateSection
        formLocation="Services Hub"
        heading="Not Sure What You Need?"
        description="Tell us about your property and we'll recommend the right services — free estimate, no pressure."
        defaultCity="Cedar Falls"
      />

      <CtaBanner
        title="Prefer to talk it through?"
        description="Call us. We'll help you figure it out over the phone or come take a look."
        quoteHref="#estimate"
      />
    </>
  )
}
