import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, breadcrumbJsonLd, faqPageJsonLd, jsonLdGraph, webPageJsonLd } from '@/lib/metadata'
import { getFaqPageServices, serviceFaqs, servicesHubFaqs } from '@/lib/services'
import { getServiceLinksForFaq } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import FaqSectionCta from '@/components/sections/FaqSectionCta'
import { siteImages } from '@/lib/images'
import PageHero from '@/components/motion/PageHero'
import FaqAccordion from '@/components/ui/FaqAccordion'
import FadeIn from '@/components/motion/FadeIn'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping FAQs',
  description:
    'Frequently asked questions about landscaping, hardscaping, lawn care, and property services in Cedar Falls and the Cedar Valley.',
  path: '/faqs',
})

export default function FaqsPage() {
  const faqPageServices = getFaqPageServices()
  const allFaqs = faqPageServices.flatMap((service) => serviceFaqs[service.slug] ?? [])

  const pageSchema = webPageJsonLd({
    name: 'Landscaping FAQs | A1 Property Services',
    description: 'Frequently asked questions about landscaping, hardscaping, lawn care, and property services in Cedar Falls and the Cedar Valley.',
    path: '/faqs',
    about: 'Landscaping FAQs',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'FAQs', path: '/faqs' },
              ]),
              faqPageJsonLd([...servicesHubFaqs, ...allFaqs]),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={siteImages.servicesHero}
        imageAlt="Landscaping FAQs in Cedar Falls"
        eyebrow="Questions & Answers"
        title="Landscaping|FAQs"
        subtitle="Common questions about our services, processes, and what to expect when you work with A1 Property Services."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-lg leading-relaxed text-brand-body">
            Browse frequently asked questions about our landscaping and hardscaping services in Cedar Falls and the Cedar Valley. Click a service below to jump to specific answers, or scroll through our general FAQs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {faqPageServices.map((s) => (
              <Link
                key={s.slug}
                href={`/faqs#${s.slug}`}
                className="rounded-full border border-brand-green-700/30 bg-brand-green-100 px-4 py-2 text-sm font-medium text-brand-green-800 transition-colors hover:bg-brand-green-700 hover:text-white"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full border border-brand-green-700 bg-brand-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-800"
            >
              Ask a Question
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <FadeIn className="section-inner-narrow">
          <h2 className="section-heading">General Landscaping FAQs</h2>
          <div className="mt-10">
            <FaqAccordion items={servicesHubFaqs.map((faq) => ({ q: faq.question, a: faq.answer }))} />
          </div>
          <FaqSectionCta
            learnMoreHref="/services"
            learnMoreLabel="Learn More About Our Services"
          />
        </FadeIn>
      </section>

      {faqPageServices.map((service) => (
        <section key={service.slug} id={service.slug} className="section bg-white even:bg-brand-stone">
          <FadeIn className="section-inner-narrow">
            <h2 className="section-heading">{service.name} FAQs</h2>
            <p className="mt-3 text-brand-body">
              Common questions about {service.name.toLowerCase()} in Cedar Falls and the Cedar Valley.
            </p>
            <div className="mt-8">
              <FaqAccordion
                items={serviceFaqs[service.slug].map((faq) => ({
                  q: faq.question,
                  a: faq.answer,
                }))}
              />
            </div>
            <FaqSectionCta
              learnMoreHref={`/services/${service.slug}`}
              learnMoreLabel={`Learn More About ${service.name}`}
            />
          </FadeIn>
        </section>
      ))}

      <RelatedContent groups={[{
        heading: 'Our Services',
        items: getServiceLinksForFaq(6),
      }]} />
    </>
  )
}
