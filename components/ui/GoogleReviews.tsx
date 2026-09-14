'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import FadeIn from '@/components/motion/FadeIn'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/lib/metadata'
import { redactOwnerName } from '@/lib/google-reviews'
import type { GoogleReviewData } from '@/lib/types'

const FALLBACK_REVIEWS: GoogleReviewData = {
  rating: 5.0,
  totalCount: 5,
  source: 'config',
  reviews: [
    {
      author: 'Ashley K.',
      rating: 5,
      text: 'We got multiple estimates from different companies and settled on A1, and we could not have been happier with our decision!',
      relativeTime: '3 weeks ago',
    },
    {
      author: 'Peggy G.',
      rating: 5,
      text: 'A valuable resource over the years. Everything from demolition of a basement, planting trees, roofing and lawn care.',
      relativeTime: '2 years ago',
    },
    {
      author: 'John D.',
      rating: 5,
      text: 'The crew did an outstanding job on my retaining wall. I was very pleased with the fast and reliable services.',
      relativeTime: '3 years ago',
    },
  ],
}

function reviewsWithoutOwnerName(data: GoogleReviewData): GoogleReviewData {
  return {
    ...data,
    reviews: data.reviews.map((review) => ({
      ...review,
      text: redactOwnerName(review.text),
    })),
  }
}

export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewData>(FALLBACK_REVIEWS)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/reviews', { signal: controller.signal })
      .then((r) => r.json())
      .then((payload: GoogleReviewData) => {
        if (payload?.reviews?.length) setData(reviewsWithoutOwnerName(payload))
      })
      .catch(() => {
        /* keep fallback */
      })
    return () => controller.abort()
  }, [])

  const reviews = data.reviews.slice(0, 3)

  return (
    <section className="section bg-white">
      <div className="section-inner">
        <FadeIn className="text-center">
          <p className="section-eyebrow">From Cedar Falls &amp; Waterloo Homeowners</p>
          <h2 className="section-heading mt-4">What Our Customers Say</h2>
          <p className="mx-auto mt-3 flex items-center justify-center gap-2 text-sm text-brand-subtle">
            <span className="flex text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-brand-gold" />
              ))}
            </span>
            <span>
              {data.rating.toFixed(1)} from {data.totalCount} Google Review{data.totalCount !== 1 ? 's' : ''}
            </span>
          </p>
        </FadeIn>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.author + review.text}>
              <div className="card flex h-full flex-col p-7">
                <p
                  className="font-display text-5xl leading-none text-brand-gold/25"
                  aria-hidden
                >
                  &ldquo;
                </p>
                <div className="-mt-3 flex gap-0.5 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < review.rating ? 'fill-brand-gold' : 'fill-none stroke-brand-gold/30'}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-brand-body">
                  {review.text}
                </p>
                <div className="mt-6 border-t border-black/[0.06] pt-4">
                  <p className="text-sm font-semibold text-brand-dark">{review.author}</p>
                  {review.relativeTime ? (
                    <p className="mt-0.5 text-xs text-brand-subtle">{review.relativeTime}</p>
                  ) : null}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={siteConfig.social.googleBusiness}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Google Reviews
            <ExternalLink size={14} />
          </Button>
          <Button
            href={siteConfig.googleReviewUrl}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave a Review
            <ExternalLink size={14} />
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
