'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  setCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getCookieConsent() === null) {
      setVisible(true)
    }

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsent>).detail
      if (detail === 'accepted' || detail === 'rejected') {
        setVisible(false)
      }
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent)
  }, [])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] z-[70] border-t border-black/10 bg-white p-4 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] md:bottom-0 md:p-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <p id="cookie-consent-title" className="font-display text-lg font-bold text-brand-dark">
            We use cookies
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm leading-relaxed text-brand-body">
            We use essential cookies to run this site and, with your consent, analytics cookies to
            understand how visitors use a1pslandscape.com.{' '}
            <Link href="/privacy" className="font-semibold text-brand-gold underline-offset-2 hover:underline">
              See our Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => {
              setCookieConsent('rejected')
              setVisible(false)
            }}
            className="btn-ghost-dark btn-sm"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => {
              setCookieConsent('accepted')
              setVisible(false)
            }}
            className="btn-primary btn-sm"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  )
}
