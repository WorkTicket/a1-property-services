'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

type GoogleReviewData = {
  rating: number
  totalCount: number
  source: 'google-places' | 'config'
}

export default function GoogleReviewBadge() {
  const [data, setData] = useState<GoogleReviewData | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/reviews', { signal: controller.signal })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
    return () => controller.abort()
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-white/80">
        <span className="flex text-brand-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </span>
        <span>Loading reviews&hellip;</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-white/80">
      <span className="flex text-brand-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </span>
      <span>
        {data.totalCount} Google Review{data.totalCount !== 1 ? 's' : ''} &middot; {data.rating} Stars
      </span>
    </div>
  )
}
