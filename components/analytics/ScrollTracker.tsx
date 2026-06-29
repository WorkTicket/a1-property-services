'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

export default function ScrollTracker() {
  useEffect(() => {
    const thresholds = [25, 50, 75, 90, 100]
    const sent = new Set<number>()

    const onScroll = () => {
      const scrollPct = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100,
      )

      for (const t of thresholds) {
        if (scrollPct >= t && !sent.has(t)) {
          sent.add(t)
          trackScrollDepth(t)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
