'use client'

import { useEffect } from 'react'
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'
import { isAutomatedBrowser } from '@/lib/is-automated-browser'

/** Optional client bootstrap — primary GA loads via ConsentAwareAnalytics after consent. */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    if (!gaId || isAutomatedBrowser()) return

    const load = () => {
      if (getCookieConsent() !== 'accepted') return
      if (typeof window.gtag === 'function') return

      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', gaId, { anonymize_ip: true })

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)
    }

    load()

    const onConsent = (event: Event) => {
      if ((event as CustomEvent<CookieConsent>).detail === 'accepted') load()
    }
    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [gaId])

  return null
}
