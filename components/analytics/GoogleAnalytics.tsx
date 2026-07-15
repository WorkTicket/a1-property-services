'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import { isAutomatedBrowser } from '@/lib/is-automated-browser'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId || isAutomatedBrowser()) return null
  return <NextGoogleAnalytics gaId={gaId} />
}
