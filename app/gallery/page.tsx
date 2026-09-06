import type { Metadata } from 'next'
import { generatePageMetadata, webPageJsonLd, jsonLdGraph, breadcrumbJsonLd } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { getAllRelatedGroups } from '@/lib/internal-linking'
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
        subtitle="Real Cedar Falls, Waterloo, and Black Hawk County work. Featured projects open as full case studies; others show before and after in the gallery."
      />
      <GalleryFilter />
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
