'use client'

import { useEffect, useState } from 'react'
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'
import { isAutomatedBrowser } from '@/lib/is-automated-browser'

function loadGoogleAnalytics(gaId: string) {
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

/** Loads GA4 only after analytics cookie consent. */
export default function ConsentAwareAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const [consent, setConsent] = useState<CookieConsent | null>(null)

  useEffect(() => {
    setConsent(getCookieConsent())

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsent>).detail
      if (detail === 'accepted' || detail === 'rejected') {
        setConsent(detail)
      }
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  useEffect(() => {
    if (consent !== 'accepted' || isAutomatedBrowser()) return
    if (gaId) loadGoogleAnalytics(gaId)
  }, [consent, gaId])

  return null
}
