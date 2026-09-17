'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import type { QuoteFormProps } from '@/components/ui/QuoteForm'
import { ESTIMATE_HASH, QUOTE_INTENT_EVENT } from '@/lib/cta'

type LazyQuoteFormProps = QuoteFormProps & {
  /** Load immediately. Use on the dedicated contact page. */
  eager?: boolean
}

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

export default function LazyQuoteForm({ eager = false, ...props }: LazyQuoteFormProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [Form, setForm] = useState<ComponentType<QuoteFormProps> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    let loaded = false
    const load = () => {
      if (loaded) return
      loaded = true
      void import('@/components/ui/QuoteForm').then((mod) => {
        if (!cancelled) setForm(() => mod.default)
      })
    }

    if (eager || window.location.hash === ESTIMATE_HASH) load()

    const onIntent = () => load()
    window.addEventListener(QUOTE_INTENT_EVENT, onIntent)

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
      window.removeEventListener(QUOTE_INTENT_EVENT, onIntent)
      observer.disconnect()
    }
  }, [eager])

  return (
    <div ref={ref}>
      {Form ? <Form {...props} /> : <QuoteFormSkeleton compact={props.compact} />}
    </div>
  )
}
