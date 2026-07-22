import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ChevronRight } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig } from '@/lib/metadata'
import { blogPosts } from '@/lib/blog'
import { siteImages } from '@/lib/images'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import CtaBanner from '@/components/sections/CtaBanner'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Resources',
  description:
    'Helpful landscaping resources for Cedar Valley homeowners. Guides, checklists, and expert tips for maintaining your property.',
  path: '/resources',
})

const resources = [
  {
    title: 'Spring Landscape Maintenance Checklist',
    description: 'A practical month-by-month checklist for getting your Iowa yard ready for spring and summer.',
    href: '/blog/spring-landscaping-checklist-iowa',
    category: 'Seasonal',
  },
  {
    title: 'Best Plants for Iowa Landscapes',
    description: 'Top-performing perennials, shrubs, and trees for Cedar Valley gardens and landscapes.',
    href: '/blog/best-plants-for-iowa-landscapes',
    category: 'Planting',
  },
  {
    title: 'Common Drainage Problems & Solutions',
    description: 'Identify and fix the most common yard drainage issues on Iowa properties.',
    href: '/blog/common-drainage-problems-iowa',
    category: 'Drainage',
  },
  {
    title: 'Winter Landscaping Tips for Iowa',
    description: 'Protect your landscape investment through Iowa winters with these practical tips.',
    href: '/blog/winter-landscaping-tips-iowa',
    category: 'Seasonal',
  },
  {
    title: 'Retaining Wall Material Comparison',
    description: 'Compare concrete block, natural stone, and timber retaining walls for Iowa conditions.',
    href: '/blog/best-retaining-wall-materials-iowa',
    category: 'Hardscaping',
  },
  {
    title: 'Lawn Aeration Guide for Iowa Lawns',
    description: 'How core aeration helps your lawn grow thicker and handle Cedar Valley summers.',
    href: '/blog/lawn-aeration-importance-iowa',
    category: 'Lawn Care',
  },
  {
    title: 'Tree Planting Guide for Cedar Falls',
    description: 'How to plant trees that thrive in Cedar Valley soil and climate.',
    href: '/blog/tree-planting-guide-cedar-falls',
    category: 'Planting',
  },
  {
    title: 'Yard Grading Guide for Iowa Homeowners',
    description: 'How proper grading protects your foundation and keeps your yard dry.',
    href: '/blog/yard-grading-guide-iowa',
    category: 'Drainage',
  },
  {
    title: 'Landscape Design Principles for Iowa',
    description: 'How to plan a landscape that looks great and works for your Cedar Valley property.',
    href: '/blog/landscape-design-principles-iowa',
    category: 'Design',
  },
]

export default function ResourcesPage() {
  const categories = [...new Set(resources.map((r) => r.category))]

  const pageSchema = webPageJsonLd({
    name: 'Landscaping Resources | A1 Property Services',
    description: 'Helpful landscaping resources for Cedar Valley homeowners. Guides, checklists, and expert tips for maintaining your property.',
    path: '/resources',
    about: 'Landscaping Resources',
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
                { name: 'Resources', path: '/resources' },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        imageSrc={siteImages.resourcesHero}
        imageAlt="Landscaped Cedar Valley front yard with paver walkway and garden beds"
        eyebrow="Helpful Guides"
        title="Landscaping|Resources"
        subtitle="Expert guides, checklists, and articles for Cedar Valley homeowners working on landscape projects."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-lg leading-relaxed text-brand-body">
            Planning a patio, fixing drainage, or keeping the lawn healthy? These articles cover the basics for Cedar Falls homeowners.
          </p>
        </FadeIn>
      </section>

      {categories.map((category) => (
        <section key={category} className="section bg-white even:bg-brand-stone">
          <div className="section-inner">
            <FadeIn>
              <h2 className="section-heading">{category} Resources</h2>
            </FadeIn>
            <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resources
                .filter((r) => r.category === category)
                .map((resource) => (
                  <StaggerItem key={resource.href}>
                    <Link href={resource.href} className="card block h-full p-6 transition-all hover:-translate-y-1">
                      <FileText size={20} className="text-brand-green-700" />
                      <h3 className="mt-3 font-bold text-brand-dark">{resource.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-body">{resource.description}</p>
                      <span className="link-cta-md group mt-4 inline-flex items-center gap-1">
                        Read More <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </div>
        </section>
      ))}

      <CtaBanner
        title="Need personalized advice?"
        description="Contact us for a free on-site consultation. We will help you figure out the best approach for your property."
      />
    </>
  )
}
