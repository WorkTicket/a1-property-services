'use client'

import { useEffect } from 'react'

function loadOnInteraction(callback: () => void) {
  let loaded = false
  const run = () => {
    if (loaded) return
    loaded = true
    callback()
  }

  const events = ['click', 'touchstart', 'keydown'] as const
  events.forEach((event) => window.addEventListener(event, run, { once: true, passive: true }))

  return () => {
    events.forEach((event) => window.removeEventListener(event, run))
  }
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!gaId) return

    return loadOnInteraction(() => {
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      script.async = true
      document.head.appendChild(script)

      const dataLayer: unknown[] = window.dataLayer || []
      window.dataLayer = dataLayer
      const gtag = (...args: unknown[]) => {
        dataLayer.push(args)
      }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', gaId)
    })
  }, [gaId])

  return null
}
