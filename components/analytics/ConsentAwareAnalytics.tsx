'use client'

import { useEffect } from 'react'
import {
  COOKIE_CONSENT_EVENT,
  applyGtagConsent,
  getCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'

/**
 * Tags bootstrap in app/layout.tsx <head> (so Google Ads scanners see AW-…).
 * This only re-applies Consent Mode if the user already chose before hydration.
 */
export default function ConsentAwareAnalytics() {
  useEffect(() => {
    const existing = getCookieConsent()
    if (existing) applyGtagConsent(existing)

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsent>).detail
      if (detail === 'accepted' || detail === 'rejected') {
        applyGtagConsent(detail)
      }
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  return null
}
