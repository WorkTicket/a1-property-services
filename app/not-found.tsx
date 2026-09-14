import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import PageHero from '@/components/motion/PageHero'

import { generatePageMetadata, webPageJsonLd, jsonLdGraph } from '@/lib/metadata'

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
      <PageHero
        size="compact"
        eyebrow="404"
        title="Page|Not Found"
        subtitle="Sorry, we couldn't find that page. It may have moved or no longer exists."
      />
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <Button href="/">Back to Home</Button>
      </div>
    </>
  )
}
