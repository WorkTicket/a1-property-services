'use client'

import ClientRuntime from '@/components/analytics/ClientRuntime'
import StickyCtaBar from '@/components/layout/StickyCtaBar'
import CookieConsentBanner from '@/components/layout/CookieConsentBanner'

/** One client island for below-the-fold chrome so layout JS hydrates once. */
export default function AppClient() {
  return (
    <>
      <ClientRuntime />
      <StickyCtaBar />
      <CookieConsentBanner />
    </>
  )
}
