'use client'

import { useEffect } from 'react'
import { isAutomatedBrowser } from '@/lib/is-automated-browser'

/** Optional client bootstrap — primary gtag loads from app/layout.tsx. */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!gaId || isAutomatedBrowser()) return
    if (typeof window.gtag === 'function') return

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)
  }, [gaId])

  return null
}
