'use client'

import { useEffect } from 'react'
import {
  consumeLeadFlag,
  trackContactPageView,
  trackGenerateLead,
} from '@/lib/analytics'

type TrackPageEventProps =
  | { event: 'contact_page_view' }
  | { event: 'thank_you_lead' }

/**
 * Fires a one-shot GA4 event on mount for server-rendered pages.
 * thank_you_lead only fires when QuoteForm set the session lead flag.
 */
export default function TrackPageEvent({ event }: TrackPageEventProps) {
  useEffect(() => {
    if (event === 'contact_page_view') {
      trackContactPageView()
      return
    }

    if (event === 'thank_you_lead') {
      const formLocation = consumeLeadFlag()
      if (!formLocation) return
      trackGenerateLead({
        form_name: 'Quote Request',
        form_location: formLocation,
        method: 'thank_you_page',
      })
    }
  }, [event])

  return null
}
