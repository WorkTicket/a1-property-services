import { breadcrumbJsonLd } from '@/lib/metadata'

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
