import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

import { generatePageMetadata, webPageJsonLd, siteConfig, jsonLdGraph } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. It may have moved or no longer exists. Visit our homepage to find the information you need.',
  path: '/404',
  noIndex: true,
})

export default function NotFound() {
  const pageSchema = webPageJsonLd({
    name: 'Page Not Found | A1 Property Services',
    description: 'The page you are looking for could not be found.',
    path: '/404',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdGraph(pageSchema)),
        }}
      />
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="section-eyebrow">404</p>
      <h1 className="section-heading mt-3">Page Not Found</h1>
      <p className="mt-4 text-neutral-600">
        Sorry, we couldn&apos;t find that page. It may have moved or no longer exists.
      </p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </div>
    </>
  )
}
