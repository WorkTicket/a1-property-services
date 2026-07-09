'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Star } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import FadeIn from '@/components/motion/FadeIn'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/lib/metadata'
import type { GoogleReviewData } from '@/lib/types'

export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewData | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/reviews', { signal: controller.signal })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
    return () => controller.abort()
  }, [])

  const reviews = data?.reviews?.slice(0, 3) ?? []

  if (reviews.length === 0) return null

  return (
    <section className="section bg-white">
      <div className="section-inner">
        <FadeIn className="text-center">
          <p className="section-eyebrow">From Cedar Valley Homeowners</p>
          <h2 className="section-heading mt-3">What Our Customers Say</h2>
          <p className="mx-auto mt-2 text-sm text-brand-subtle">
            Based on {data?.totalCount} Google Review{data?.totalCount !== 1 ? 's' : ''}
          </p>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <StaggerItem key={review.author + review.text}>
              <div className="card flex h-full flex-col p-6">
                <div className="flex gap-1 text-brand-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? 'fill-brand-gold' : 'fill-none stroke-brand-gold/30'}
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-body">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-brand-dark">
                  {review.author}
                  {review.relativeTime ? (
                    <span className="text-brand-subtle font-normal"> · {review.relativeTime}</span>
                  ) : null}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="mt-8 text-center">
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
