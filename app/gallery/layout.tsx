import type { Metadata } from 'next'
import { generatePageMetadata, breadcrumbJsonLd } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Landscaping Project Gallery',
  description:
    'Before-and-after landscaping and hardscaping projects in Cedar Falls, Waterloo, and the Cedar Valley. Retaining walls, paver patios, water features, and more.',
  path: '/gallery',
  keywords: [
    'landscaping gallery cedar falls',
    'hardscaping projects cedar falls',
    'before and after landscaping cedar falls',
    'paver patio photos cedar falls',
    'retaining wall projects cedar falls',
  ],
  ogImage: '/images/gallery-hero.webp',
  ogImageAlt: 'Landscaping project gallery in Cedar Falls, Iowa',
})

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Gallery', path: '/gallery' },
            ]),
          ),
        }}
      />
      {children}
    </>
  )
}
