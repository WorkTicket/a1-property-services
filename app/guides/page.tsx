import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { getBlogsForGuide } from '@/lib/internal-linking'
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

const guides = [
  {
    title: 'Retaining Wall Planning Guide',
    description: 'Everything you need to know before building a retaining wall in Iowa. Permits, materials, drainage, and costs.',
    icon: 'layers' as const,
    href: '/services/retaining-walls',
    steps: ['Site Assessment', 'Permit Check', 'Material Selection', 'Base Preparation', 'Installation', 'Final Inspection'],
  },
  {
    title: 'Paver Patio Planning Guide',
    description: 'How to plan the perfect paver patio. Size, pattern, base preparation, drainage, and budgeting for Iowa properties.',
    icon: 'layout-grid' as const,
    href: '/services/paver-patio',
    steps: ['Design & Layout', 'Base Excavation', 'Base Compaction', 'Paver Installation', 'Edge Restraint', 'Joint Sand & Sealing'],
  },
  {
    title: 'Outdoor Living Design Guide',
    description: 'Design your dream outdoor living space. Fire pits, outdoor kitchens, patios, and everything in between.',
    icon: 'home' as const,
    href: '/services/outdoor-living',
    steps: ['Vision & Budget', 'Zone Planning', 'Material Selection', 'Utility Rough-In', 'Hardscape Installation', 'Finishing Touches'],
  },
  {
    title: 'Drainage Solutions Guide',
    description: 'Identify and solve common drainage problems. French drains, grading, catch basins, and downspout solutions.',
    icon: 'triangle-right' as const,
    href: '/services/drainage',
    steps: ['Problem Diagnosis', 'Solution Design', 'Material Selection', 'Installation', 'Testing', 'Restoration'],
  },
  {
    title: 'Landscape Design Guide',
    description: 'A complete guide to designing your Iowa landscape. Plant selection, hardscape integration, and phased planning.',
    icon: 'ruler' as const,
    href: '/services/landscape-design',
    steps: ['Site Analysis', 'Needs Assessment', 'Concept Design', 'Plant Selection', 'Final Plans', 'Implementation'],
  },
  {
    title: 'Lawn Care Guide',
    description: 'Year-round lawn care for Iowa. Mowing, fertilization, aeration, weed control, and seasonal tips.',
    icon: 'flower2' as const,
    href: '/services/lawn-care',
    steps: ['Spring Prep', 'Fertilization Program', 'Weed Control', 'Aeration', 'Watering', 'Fall & Winter Care'],
  },
]

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
            Our comprehensive guides walk you through every step of your landscaping journey. From initial planning to final installation, we cover what you need to know to make informed decisions for your Cedar Valley property.
          </p>
        </FadeIn>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <StaggerContainer className="grid gap-8 lg:grid-cols-2">
            {guides.map((guide) => (
              <StaggerItem key={guide.title}>
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
                            key={step}
                            className="rounded-full bg-brand-green-100 px-3 py-1 text-xs font-medium text-brand-green-800"
                          >
                            {i + 1}. {step}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={guide.href}
                        className="link-cta-md group mt-6 inline-flex items-center gap-1"
                      >
                        View Service <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
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
