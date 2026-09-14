import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, webPageJsonLd, jsonLdGraph, breadcrumbJsonLd } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { getAllRelatedGroups } from '@/lib/internal-linking'
import { projectCaseStudies } from '@/lib/project-case-studies'
import RelatedContent from '@/components/sections/RelatedContent'
import EstimateSection from '@/components/sections/EstimateSection'
import PageHero from '@/components/motion/PageHero'
import GalleryFilter from '@/components/sections/GalleryFilter'

export const metadata: Metadata = generatePageMetadata({
  title: 'Project Gallery',
  description:
    'Browse before and after landscaping projects in Cedar Falls, Waterloo, and Black Hawk County. Retaining walls, paver patios, water features, lawn care, and more.',
  path: '/gallery',
  ogImage: siteImages.galleryHero,
  ogImageAlt: 'Landscaping project gallery in Cedar Falls',
})

export default function GalleryPage() {
  const pageSchema = webPageJsonLd({
    name: 'Project Gallery | A1 Property Services',
    description: 'Browse before and after landscaping projects in Cedar Falls, Waterloo, and Black Hawk County: retaining walls, paver patios, driveways, water features, lawn care, and landscape installation.',
    path: '/gallery',
    image: siteImages.galleryHero,
    about: 'Project Gallery',
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
                { name: 'Gallery', path: '/gallery' },
              ]),
            ),
          ),
        }}
      />
      <PageHero
        imageSrc={siteImages.galleryHero}
        imageAlt="Landscaping project gallery in Cedar Falls"
        eyebrow="Our Work"
        title="Our Project|Gallery"
        subtitle="Real Cedar Falls, Waterloo, and Black Hawk County work. Click a project to preview it, then view the project overview."
      />
      <GalleryFilter />
      <section className="section border-t border-black/5 bg-white">
        <div className="section-inner max-w-5xl">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Project overviews</p>
            <h2 className="section-heading mt-4">Every gallery project</h2>
            <p className="mt-3 text-lg leading-relaxed text-brand-body">
              Open a project overview for the problem, the build, and the result.
            </p>
          </div>
          <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {projectCaseStudies.map((study) => (
              <li key={study.slug}>
                <Link
                  href={`/gallery/${study.slug}`}
                  className="group flex flex-col gap-1 py-4 transition-colors sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="min-w-0 flex-1 font-medium text-brand-dark group-hover:text-brand-green-800">
                    {study.h1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <RelatedContent groups={getAllRelatedGroups('project', 'gallery')} />
      <EstimateSection
        formLocation="Gallery"
        heading="Like What You See?"
        description="Tell us about your project and we'll get back with a free estimate for your Cedar Falls or Waterloo property."
        defaultCity="Cedar Falls"
      />
    </>
  )
}
