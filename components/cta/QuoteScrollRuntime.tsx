'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ESTIMATE_HASH } from '@/lib/cta'
import { isLocalEstimateClick, scrollToQuoteForm } from '@/lib/scroll-to-quote'

export default function QuoteScrollRuntime() {
  const pathname = usePathname()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href]')
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (!isLocalEstimateClick(anchor)) return
      event.preventDefault()
      scrollToQuoteForm({ focus: true, updateHash: true })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  useEffect(() => {
    if (window.location.hash !== ESTIMATE_HASH) return
    const frame = window.requestAnimationFrame(() => {
      scrollToQuoteForm({ focus: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
