import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Check, ChevronRight, Shield, MapPin, Clock, Star } from 'lucide-react'
import {
  allServices,
  getServiceBySlug,
  serviceBenefits,
  serviceExtendedContent,
  serviceFaqs,
  serviceProcessSteps,
  serviceMaterials,
  serviceProblemSolutions,
} from '@/lib/services'
import { getPostBySlug } from '@/lib/blog'
import { generatePageMetadata, serviceSeoOverrides, siteConfig, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, howToJsonLd, webPageJsonLd } from '@/lib/metadata'
import { getGalleryProjectsForService, getServiceHeroImage, getServiceHeroImageAlt } from '@/lib/images'
import { getRelatedContent, getProjectsForService, getFaqsForService, getContentSegments } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import { CTA_COPY } from '@/lib/cta'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/sections/CtaBanner'
import GalleryGrid from '@/components/sections/GalleryGrid'
import PageHero from '@/components/motion/PageHero'
import ServiceIcon from '@/components/ui/ServiceIcon'
import FadeIn from '@/components/motion/FadeIn'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
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
    })
  }

  return generatePageMetadata({
    title: service.name,
    description: `${service.name} in Cedar Falls, Iowa. ${service.shortDesc} A1 Property Services, licensed and insured, with free estimates.`,
    path: `/services/${service.slug}`,
  })
}

const defaultProcessSteps = [
  {
    title: 'Consultation',
    description: 'We meet with you on-site to discuss your goals, assess your property, and understand your budget. This is where we figure out what will work best for your specific situation.',
  },
  {
    title: 'Planning',
    description: 'We handle permits, material ordering, scheduling, and utility locating. Every detail is coordinated so installation goes smoothly without delays.',
  },
  {
    title: 'Construction',
    description: 'Our crew executes the plan with precision. We follow industry best practices for base prep, drainage, and installation to ensure lasting results.',
  },
  {
    title: 'Cleanup',
    description: 'Every job site is thoroughly cleaned. We remove debris, sweep hardscape surfaces, and restore any disturbed areas so your property looks better than when we started.',
  },
  {
    title: 'Final Walkthrough',
    description: 'We walk the completed project with you, answer any questions, review care instructions, and make sure everything meets your expectations before we consider the job done.',
  },
]

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const seo = serviceSeoOverrides[service.slug]
  const related = getRelatedContent(service.slug)
  const hasContent = service.slug in serviceBenefits || service.slug in serviceFaqs

  const benefits = serviceBenefits[service.slug] ?? []
  const problems = serviceProblemSolutions[service.slug] ?? []
  const faqs = serviceFaqs[service.slug] ?? []
  const processSteps = serviceProcessSteps[service.slug] ?? defaultProcessSteps
  const materialsArray = serviceMaterials[service.slug] ?? []
  const extended = serviceExtendedContent[service.slug]
  const galleryProjects = getGalleryProjectsForService(service.slug)
  const heroImage = getServiceHeroImage(service.slug)
  const heroImageAlt = getServiceHeroImageAlt(service.slug)
  const relatedBlog = extended?.relatedBlogSlug ? getPostBySlug(extended.relatedBlogSlug) : undefined

  const serviceName = seo ? seo.h1 : `${service.name} in Cedar Falls`
  const pageUrl = `${siteConfig.url}/services/${service.slug}`

  function contentLinks(text: string, max = 3) {
    return getContentSegments(text, max).map((seg, i) =>
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
    provider: {
      '@type': 'LandscapingBusiness',
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: 'US',
      },
      areaServed: ['Cedar Falls', 'Waterloo', 'Cedar Valley'],
    },
    areaServed: {
      '@type': 'City',
      name: 'Cedar Falls',
      containedInPlace: { '@type': 'State', name: 'Iowa' },
    },
    description: seo?.description ?? `${service.shortDesc} Serving Cedar Falls and surrounding Cedar Valley communities.`,
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
                { name: serviceName },
              ]),
              ...(faqJsonLd ? [faqJsonLd] : []),
              howToJsonLd(processSteps),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
        eyebrow={hasContent ? `${service.name} in Cedar Falls` : 'What We Offer'}
        title={serviceName}
        subtitle={service.shortDesc}
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-brand-body">
              <Shield size={16} className="text-brand-green-700" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-brand-body">
              <Star size={16} className="text-brand-green-700" />
              <span>5.0 Rated</span>
            </div>
            <div className="flex items-center gap-2 text-brand-body">
              <MapPin size={16} className="text-brand-green-700" />
              <span>Serving the Cedar Valley</span>
            </div>
            <div className="flex items-center gap-2 text-brand-body">
              <Clock size={16} className="text-brand-green-700" />
              <span>Serving Since 2009</span>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-brand-body">{contentLinks(service.longDesc)}</p>
          {extended && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-bold text-brand-dark">{extended.heading}</h2>
              {extended.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="leading-relaxed text-brand-body">
                  {contentLinks(p)}
                </p>
              ))}
            </div>
          )}

          <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
            <Button href="/contact" fullWidth className="sm:w-auto">
              {CTA_COPY.quote}
            </Button>
            <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark" fullWidth className="sm:w-auto">
              <Phone size={16} />
              {siteConfig.phoneDisplay}
            </Button>
            <Button href="/gallery" variant="ghost-dark" fullWidth className="sm:w-auto">
              {CTA_COPY.gallery}
            </Button>
          </div>
        </FadeIn>
      </section>

      {problems.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Common Problems We Solve</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              Every property is different, but these are the most common challenges we help Cedar Valley homeowners overcome.
            </p>
            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((item) => (
                <StaggerItem key={item.problem}>
                  <div className="card h-full p-6">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-brand-green-100 p-2">
                        <Check size={16} className="text-brand-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-dark/60">The Problem</p>
                        <p className="mt-1 font-bold text-brand-dark">{item.problem}</p>
                        <p className="mt-3 text-sm leading-relaxed text-brand-body">
                          <span className="font-semibold text-brand-green-700">Solution: </span>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      )}

      {processSteps.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">Our {service.name} Process</h2>
            <p className="mt-4 text-brand-body">We follow a proven process to deliver consistent results on every project.</p>
            <ol className="mt-10 space-y-8">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-brand-body">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">What You Get with {service.name}</h2>
            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit}>
                  <div className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-xs font-bold text-white" aria-hidden="true">
                      <Check size={14} />
                    </span>
                    <span className="text-brand-body">{benefit}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </section>
      )}

      {materialsArray.length > 0 && (
        <section className="section bg-white">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">Materials We Use</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              We use quality materials rated for Iowa weather. Here is how they compare.
            </p>
            <div className="mt-10 space-y-10">
              {materialsArray.map((material) => (
                <div key={material.name} className="rounded-xl border border-black/5 bg-brand-stone p-6 md:p-8">
                  <h3 className="text-xl font-bold text-brand-dark">{material.name}</h3>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green-700">Pros</p>
                      <ul className="space-y-2">
                        {material.pros.map((pro) => (
                          <li key={pro} className="flex gap-2 text-sm text-brand-body">
                            <Check size={14} className="mt-0.5 shrink-0 text-brand-green-700" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-body/60">Cons</p>
                      <ul className="space-y-2">
                        {material.cons.map((con) => (
                          <li key={con} className="flex gap-2 text-sm text-brand-body">
                            <span className="mt-0.5 shrink-0 text-brand-gold">&#x2715;</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">Maintenance</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-body">{material.maintenance}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand-green-700">Durability</p>
                      <p className="mt-1 text-sm leading-relaxed text-brand-body">{material.durability}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {galleryProjects.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner">
            <h2 className="section-heading text-center">
              {service.name} Projects in the Cedar Valley
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-brand-body">
              See real {service.name.toLowerCase()} work completed across Cedar Falls and surrounding communities.
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
              {service.name} in Cedar Falls: FAQ
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
                <Button href="/contact" size="sm">
                  {CTA_COPY.estimate}
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="outline" size="sm">
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

      {related.blogPosts.length > 0 && (
        <section className="section bg-brand-stone">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">Related Articles</h2>
            <div className="mt-8 space-y-4">
              {related.blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card flex items-center justify-between p-4 transition-all hover:-translate-y-0.5"
                >
                  <div>
                    <p className="font-semibold text-brand-dark">{post.title}</p>
                    <p className="mt-1 text-sm text-brand-body">{post.excerpt}</p>
                  </div>
                  <ChevronRight size={16} className="shrink-0 text-brand-green-700" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      <CtaBanner
        title="Ready to get started?"
        description="Call us today or request a free quote online."
      />

      {related.services.length > 0 && (
        <section className="section bg-white">
          <div className="section-inner">
            <FadeIn className="mb-10 text-center">
              <h2 className="section-heading">Other Landscaping Services in Cedar Falls</h2>
            </FadeIn>
            <StaggerContainer className="grid gap-6 sm:grid-cols-3">
              {related.services.map((s) => (
                <StaggerItem key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="card block h-full p-6">
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

      <RelatedContent groups={[
        ...(getProjectsForService(params.slug).length > 0 ? [{
          heading: 'Related Projects',
          items: getProjectsForService(params.slug),
        }] : []),
        ...(getFaqsForService(params.slug).length > 0 ? [{
          heading: 'Frequently Asked Questions',
          items: getFaqsForService(params.slug),
        }] : []),
      ]} />
    </>
  )
}
