'use client'

import ClientRuntime from '@/components/analytics/ClientRuntime'
import CookieConsentBanner from '@/components/layout/CookieConsentBanner'

/** Below-the-fold chrome loaded after idle/input so it never competes with LCP. */
export default function AppClient() {
  return (
    <>
      <ClientRuntime />
      <CookieConsentBanner />
    </>
  )
}
