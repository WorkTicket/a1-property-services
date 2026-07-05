import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { getBlogsForGuide } from '@/lib/internal-linking'
import { allGuides } from '@/lib/guides'
import RelatedContent from '@/components/sections/RelatedContent'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import ServiceIcon from '@/components/ui/ServiceIcon'
import CtaBanner from '@/components/sections/CtaBanner'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Guides',
  description:
    'In-depth guides to landscaping, hardscaping, and outdoor living for Cedar Valley homeowners. Everything you need to plan your next project.',
  path: '/guides',
})

export default function GuidesPage() {
  const pageSchema = webPageJsonLd({
    name: 'Landscaping Guides | A1 Property Services',
    description: 'In-depth guides to landscaping, hardscaping, and outdoor living for Cedar Valley homeowners.',
    path: '/guides',
    about: 'Landscaping Guides',
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
                { name: 'Guides', path: '/guides' },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={siteImages.servicesHero}
        imageAlt="Landscaping guides in Cedar Falls"
        eyebrow="Step-by-Step"
        title="Landscaping|Guides"
        subtitle="In-depth guides to help you plan, design, and execute your landscaping and hardscaping projects in the Cedar Valley."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-lg leading-relaxed text-brand-body">
            These guides cover the real steps, from early planning through installation, so you know what to expect before you start a Cedar Valley project.
          </p>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <StaggerContainer className="grid gap-8 lg:grid-cols-2">
            {allGuides.map((guide) => (
              <StaggerItem key={guide.slug}>
                <div className="card p-8">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-brand-green-100 p-3">
                      <ServiceIcon name={guide.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-brand-dark">{guide.title}</h2>
                      <p className="mt-2 leading-relaxed text-brand-body">{guide.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {guide.steps.map((step, i) => (
                          <span
                            key={step.title}
                            className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-medium text-brand-green-800"
                          >
                            {i + 1}. {step.title}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="link-cta-md group mt-6 inline-flex items-center gap-1"
                      >
                        Read Guide <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <RelatedContent groups={[{
        heading: 'Related Articles',
        items: getBlogsForGuide(3),
      }]} />

      <CtaBanner
        title="Ready to start your project?"
        description="Contact us for a free consultation. We will help you bring your landscape vision to life."
      />
    </>
  )
}
