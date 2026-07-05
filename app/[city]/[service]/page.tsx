import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, MapPin } from 'lucide-react'
import { cities, getCityBySlug } from '@/lib/cities'
import { allServices, getServiceBySlug, serviceBenefits, serviceFaqs } from '@/lib/services'
import { generatePageMetadata, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, siteConfig, webPageJsonLd } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { getComplementaryServices, getServiceRelatedContentGroups } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FaqAccordion from '@/components/ui/FaqAccordion'

type Props = { params: { city: string; service: string } }

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = []
  for (const city of cities) {
    for (const service of allServices) {
      params.push({ city: city.slug, service: service.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityBySlug(params.city)
  const service = getServiceBySlug(params.service)
  if (!city || !service) return {}

  const title = `${service.name} in ${city.name}, IA`
  const description = `${service.name} in ${city.name}, IA. ${service.shortDesc} Free estimates. Licensed and insured.`

  return generatePageMetadata({
    title,
    description,
    path: `/${city.slug}/${service.slug}`,
    absoluteTitle: true,
  })
}

export default function CityServicePage({ params }: Props) {
  const city = getCityBySlug(params.city)
  const service = getServiceBySlug(params.service)
  if (!city || !service) notFound()

  const benefits = serviceBenefits[service.slug] ?? []
  const faqs = serviceFaqs[service.slug] ?? []
  const cityFaqs = city.faqs ?? []
  const complementaryServices = getComplementaryServices(service.slug, 4)
  const relatedContentGroups = getServiceRelatedContentGroups(service.slug)
  const nearbyCities = cities.filter((c) => c.slug !== city.slug).slice(0, 4)

  const pageTitle = `${service.name} in ${city.name}, IA`
  const pageUrl = `${siteConfig.url}/${city.slug}/${service.slug}`

  const cityServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageTitle,
    serviceType: service.name,
    provider: {
      '@type': 'LandscapingBusiness',
      name: `${siteConfig.name} - ${city.name}`,
      telephone: siteConfig.phone,
      url: siteConfig.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: city.name,
        addressRegion: 'IA',
        postalCode: siteConfig.address.zip,
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: city.name },
        ...nearbyCities.map((c) => ({ '@type': 'City', name: c.name })),
      ],
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Iowa' },
    },
    description: `${service.name} in ${city.name}, ${city.county} County, Iowa. ${service.shortDesc}`,
    url: pageUrl,
  }

  const cityFaqJsonLd = faqPageJsonLd(
    cityFaqs.map((faq) => ({ question: faq.q, answer: faq.a })),
  )

  const serviceFaqJsonLd = faqs.length > 0 ? faqPageJsonLd(faqs) : null

  const pageSchema = webPageJsonLd({
    name: pageTitle,
    description: `${service.name} in ${city.name}, IA. ${service.shortDesc}`,
    path: `/${city.slug}/${service.slug}`,
    about: `${service.name} in ${city.name}`,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              cityServiceJsonLd,
              cityFaqJsonLd,
              ...(serviceFaqJsonLd ? [serviceFaqJsonLd] : []),
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: city.name, path: `/${city.slug}` },
                { name: `${service.name} in ${city.name}` },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        eyebrow={`${service.name} in ${city.name}, IA`}
        title={`${service.name}|in ${city.name}`}
        subtitle={`${service.shortDesc} Serving ${city.name} and all of ${city.county} County. Licensed and insured.`}
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{pageTitle}</h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-body">{service.longDesc}</p>
          <p className="mt-4 leading-relaxed text-brand-body">
            {city.name} is located in {city.county} County with a population of {city.population}. 
            A1 Property Services provides professional {service.name.toLowerCase()} services to
            {city.name} homeowners and businesses, including neighborhoods throughout the city and
            surrounding {city.county} County areas.
          </p>
          <p className="mt-4 leading-relaxed text-brand-body">
            We are a locally owned landscaping company based in Cedar Falls, just minutes from 
            {city.name}. Our crews are experienced with the soil conditions, drainage patterns,
            and plant varieties that perform best in {city.county} County. Every {service.name.toLowerCase()} 
            project includes proper materials and installation methods rated for Iowa freeze-thaw cycles.
          </p>
          <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="/contact" fullWidth className="sm:w-auto">
              Free Estimate in {city.name}
            </Button>
            <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark" fullWidth className="sm:w-auto">
              <Phone size={16} />
              {siteConfig.phoneDisplay}
            </Button>
          </div>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">Why {city.name} Homeowners Choose A1 {service.name}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-brand-body">
            <p>
              We have been serving {city.name} and the Cedar Valley since 2009. Our {service.name.toLowerCase()} 
              services are built on proper techniques and quality materials that hold up through Iowa winters.
              We provide free on-site estimates, clear timelines, and honest communication from start to finish.
            </p>
            <p>
              Whether you need a small repair or a full installation, our crew treats your {city.name} property 
              with the same care we would our own. We are licensed, insured, and committed to doing the job 
              right the first time.
            </p>
          </div>
          {benefits.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-brand-body">
                  <span className="mt-0.5 shrink-0 text-brand-gold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </FadeIn>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">Areas We Serve in {city.name}</h2>
          <div className="mt-6 flex items-start gap-4 rounded-xl border border-black/5 bg-brand-stone p-6">
            <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-brand-gold" />
            <div>
              <p className="leading-relaxed text-brand-body">
                A1 Property Services provides {service.name.toLowerCase()} throughout {city.name}, {city.county} County, 
                and the greater Cedar Valley area. We serve all residential neighborhoods and commercial 
                properties in and around {city.name}.
              </p>
              <p className="mt-3 leading-relaxed text-brand-body">
                Contact us to check availability for your specific location. We typically respond within 24 hours.
              </p>
              <div className="mt-4">
                <Button href="/contact" size="sm">
                  {CTA_COPY.quote}
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="text-center">
            <p className="section-eyebrow">Also Serving</p>
            <h2 className="section-heading mt-3">Nearby Cities</h2>
          </FadeIn>
          <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyCities.map((nearby) => (
              <StaggerItem key={nearby.slug}>
                <Link
                  href={`/${nearby.slug}/${service.slug}`}
                  className="card block h-full p-5 text-center transition-all hover:-translate-y-1"
                >
                  <p className="font-bold text-brand-dark">{service.name}</p>
                  <p className="text-sm text-brand-body">in {nearby.name}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">{service.name} in {city.name}: FAQ</h2>
          <div className="mt-8">
            <FaqAccordion items={cityFaqs} />
          </div>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="text-center">
            <h2 className="section-heading">More Services in {city.name}</h2>
          </FadeIn>
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {complementaryServices.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/${city.slug}/${s.slug}`}
                  className="card block h-full p-5"
                >
                  <ServiceIcon name={s.icon} size={22} />
                  <h3 className="mt-3 font-bold text-brand-dark">{s.name}</h3>
                  <p className="mt-1 text-sm text-brand-body">{s.shortDesc}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-8 text-center">
            <Button href={`/${city.slug}`} variant="outline">
              All Services in {city.name}
            </Button>
          </div>
        </div>
      </section>

      <RelatedContent groups={relatedContentGroups} />

      <CtaBanner
        title={`Ready for ${service.name} in ${city.name}?`}
        description="Call us or request a free quote online. We will get back to you within 24 hours."
      />
    </>
  )
}
