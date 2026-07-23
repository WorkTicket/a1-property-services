import type { Metadata } from 'next'
import { generatePageMetadata, webPageJsonLd, jsonLdGraph, siteConfig } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { getAllRelatedGroups } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import PageHero from '@/components/motion/PageHero'
import GalleryFilter from '@/components/sections/GalleryFilter'

export const metadata: Metadata = generatePageMetadata({
  title: 'Project Gallery',
  description:
    'Browse before and after landscaping projects in Cedar Falls and the Cedar Valley. Retaining walls, paver patios, water features, lawn care, and more.',
  path: '/gallery',
  ogImage: siteImages.galleryHero,
  ogImageAlt: 'Landscaping project gallery in Cedar Falls',
})

export default function GalleryPage() {
  const pageSchema = webPageJsonLd({
    name: 'Project Gallery | A1 Property Services',
    description: 'Browse before and after landscaping projects in Cedar Falls and the Cedar Valley: retaining walls, paver patios, driveways, water features, lawn care, and landscape installation.',
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
            jsonLdGraph(pageSchema),
          ),
        }}
      />
      <PageHero
        imageSrc={siteImages.galleryHero}
        imageAlt="Landscaping project gallery in Cedar Falls"
        eyebrow="Our Work"
        title="Our Project|Gallery"
        subtitle="Real projects across the Cedar Valley. Drag the slider to compare before and after."
      />
      <GalleryFilter />
      <RelatedContent groups={getAllRelatedGroups('project', 'gallery')} />
    </>
  )
}
