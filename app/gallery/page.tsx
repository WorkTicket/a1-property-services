import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata, webPageJsonLd, jsonLdGraph, siteConfig } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { getAllRelatedGroups } from '@/lib/internal-linking'
import RelatedContent from '@/components/sections/RelatedContent'
import PageHero from '@/components/motion/PageHero'

const GalleryFilter = dynamic(() => import('@/components/sections/GalleryFilter'), {
  loading: () => (
    <section className="section bg-brand-stone">
      <div className="section-inner">
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-200" />
          ))}
        </div>
      </div>
    </section>
  ),
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Project Gallery',
  description:
    'Browse before and after landscaping projects in Cedar Falls and the Cedar Valley — retaining walls, paver patios, and water features.',
  path: '/gallery',
  ogImage: siteImages.galleryHero,
  ogImageAlt: 'Landscaping project gallery in Cedar Falls',
})

export default function GalleryPage() {
  const pageSchema = webPageJsonLd({
    name: 'Project Gallery | A1 Property Services',
    description: 'Browse before and after landscaping projects in Cedar Falls and the Cedar Valley — retaining walls, paver patios, and water features.',
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
        subtitle="Real projects across Cedar Falls, Waterloo, and the Cedar Valley. Drag the slider to compare before and after."
      />
      <GalleryFilter />
      <RelatedContent groups={getAllRelatedGroups('project', 'gallery')} />
    </>
  )
}
