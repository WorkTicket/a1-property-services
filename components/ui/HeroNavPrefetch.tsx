'use client'

import { useEffect } from 'react'
import { prefetchHeroForPath, shouldSkipHeroPrefetch } from '@/lib/prefetch-hero'

export default function HeroNavPrefetch() {
  useEffect(() => {
    if (shouldSkipHeroPrefetch()) return

    const prefetchFromEvent = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const href = target.closest('a')?.getAttribute('href')
      if (href) prefetchHeroForPath(href)
    }

    document.addEventListener('pointerover', prefetchFromEvent, { passive: true })
    document.addEventListener('pointerdown', prefetchFromEvent, { passive: true })
    document.addEventListener('focusin', prefetchFromEvent)

    return () => {
      document.removeEventListener('pointerover', prefetchFromEvent)
      document.removeEventListener('pointerdown', prefetchFromEvent)
      document.removeEventListener('focusin', prefetchFromEvent)
    }
  }, [])

  return null
}
