'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'

export default function LazyGoogleReviews() {
  const ref = useRef<HTMLDivElement>(null)
  const [Reviews, setReviews] = useState<ComponentType | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        void import('@/components/ui/GoogleReviews').then((mod) => {
          if (!cancelled) setReviews(() => mod.default)
        })
        observer.disconnect()
      },
      { rootMargin: '400px' },
    )

    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref}>
      {Reviews ? (
        <Reviews />
      ) : (
        <section className="section bg-white" aria-hidden>
          <div className="section-inner min-h-[22rem]" />
        </section>
      )}
    </div>
  )
}
