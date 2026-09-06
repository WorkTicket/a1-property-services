'use client'

import { useEffect } from 'react'
import { prefetchHeroForPath, shouldSkipHeroPrefetch } from '@/lib/prefetch-hero'

const IDLE_PATHS = ['/gallery', '/about', '/services', '/contact']

export default function HeroNavPrefetch() {
  useEffect(() => {
    if (shouldSkipHeroPrefetch()) return

    const prefetchFromEvent = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a')
      const href = anchor?.getAttribute('href')
      if (href) prefetchHeroForPath(href)
    }

    document.addEventListener('pointerover', prefetchFromEvent, { passive: true })
    document.addEventListener('pointerdown', prefetchFromEvent, { passive: true })
    document.addEventListener('focusin', prefetchFromEvent)

    const prefetchPrimary = () => {
      if (shouldSkipHeroPrefetch()) return
      for (const path of IDLE_PATHS) prefetchHeroForPath(path)
    }

    const onLoad = () => prefetchPrimary()
    if (document.readyState === 'complete') {
      prefetchPrimary()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      document.removeEventListener('pointerover', prefetchFromEvent)
      document.removeEventListener('pointerdown', prefetchFromEvent)
      document.removeEventListener('focusin', prefetchFromEvent)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return null
}
