'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  setCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'

function subscribeCookieConsent(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export default function CookieConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsent,
    (): CookieConsent | null => 'accepted',
  )

  if (consent !== null) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] z-[70] border-t border-black/[0.06] bg-white/95 p-4 shadow-[0_-16px_48px_-12px_rgba(13,13,13,0.18)] backdrop-blur-md md:bottom-0 md:p-5"
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
            }}
            className="btn-ghost-dark btn-sm"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => {
              setCookieConsent('accepted')
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
