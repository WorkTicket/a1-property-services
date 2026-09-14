'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { QuoteFormProps } from '@/components/ui/QuoteForm'

function QuoteFormSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-3" aria-hidden>
      <div className="h-12 rounded-lg bg-black/[0.04]" />
      <div className="h-12 rounded-lg bg-black/[0.04]" />
      {!compact ? (
        <>
          <div className="h-12 rounded-lg bg-black/[0.04]" />
          <div className="h-12 rounded-lg bg-black/[0.04]" />
        </>
      ) : null}
      <div className="h-12 rounded-lg bg-brand-gold/20" />
    </div>
  )
}

export default function LazyQuoteForm(props: QuoteFormProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [Form, setForm] = useState<ComponentType<QuoteFormProps> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    const load = () => {
      void import('@/components/ui/QuoteForm').then((mod) => {
        if (!cancelled) setForm(() => mod.default)
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load()
          observer.disconnect()
        }
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
      {Form ? <Form {...props} /> : <QuoteFormSkeleton compact={props.compact} />}
    </div>
  )
}
