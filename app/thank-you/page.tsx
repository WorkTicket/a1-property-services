import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Star, Phone } from 'lucide-react'
import { generatePageMetadata, siteConfig, webPageJsonLd, jsonLdGraph } from '@/lib/metadata'
import Button from '@/components/ui/Button'
import TrackPageEvent from '@/components/analytics/TrackPageEvent'

export const metadata: Metadata = generatePageMetadata({
  title: 'We Got It!',
  description: 'Your free quote request has been submitted. We will contact you within 24 hours.',
  path: '/thank-you',
  noIndex: true,
})

export default function ThankYouPage() {
  const pageSchema = webPageJsonLd({
    name: 'We Got It! | A1 Property Services',
    description: 'Your free quote request has been submitted. We will contact you within 24 hours.',
    path: '/thank-you',
    about: 'Thank You',
  })

  return (
    <>
      <TrackPageEvent event="thank_you_lead" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdGraph(pageSchema)),
        }}
      />
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-green-100">
          <CheckCircle className="h-10 w-10 text-brand-green-800" />
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold text-brand-dark md:text-4xl">
          We Got It!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-brand-body">
          Thank you for reaching out to A1 Property Services. Someone from our team will call you within <strong>24 hours</strong> to discuss your project and schedule a free on-site estimate.
        </p>

        <div className="mt-8 rounded-xl bg-brand-green-100 p-6">
          <p className="text-sm font-medium text-brand-dark">
            In the meantime, feel free to call us directly:
          </p>
          <a
            href={`tel:${siteConfig.phone}`}
            className="mt-2 inline-flex items-center gap-2 text-xl font-bold text-brand-green-800 transition-colors hover:text-brand-gold"
          >
            <Phone size={22} />
            {siteConfig.phoneDisplay}
          </a>
        </div>

        <div className="mt-10 space-y-4">
          <p className="text-sm text-brand-subtle">What happens next?</p>
          <ol className="mx-auto max-w-xs space-y-3 text-left text-sm text-brand-body">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-800/10 text-xs font-bold text-brand-green-800">1</span>
              <span>We review your project details</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-800/10 text-xs font-bold text-brand-green-800">2</span>
              <span>We call you to schedule a time</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-800/10 text-xs font-bold text-brand-green-800">3</span>
              <span>We come to your property and provide a free estimate</span>
            </li>
          </ol>
        </div>

        <div className="mt-10 border-t border-brand-stone pt-10">
          <p className="text-sm text-brand-subtle">
            Happy with our service? Leave us a review!
          </p>
          <Button
            href={siteConfig.googleReviewUrl}
            variant="ghost-dark"
            className="mt-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Star size={16} className="fill-current" />
            Write a Google Review
          </Button>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm text-brand-body underline transition-colors hover:text-brand-green-800">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
