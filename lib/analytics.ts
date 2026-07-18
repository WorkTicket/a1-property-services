type GtagEventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (command: string, action: string, params?: string) => void
  }
}

const LEAD_FLAG_KEY = 'a1_quote_lead'

function getGaId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_ID
}

/** Push through the global gtag installed in app/layout.tsx (queued until gtag.js loads). */
function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag(...args)
    return
  }
  window.dataLayer = window.dataLayer || []
  // Mirror the standard gtag bootstrap: dataLayer.push(arguments)
  window.dataLayer.push(args)
}

export function trackEvent(
  action: string,
  params: GtagEventParams = {},
  options?: { event_callback?: () => void; event_timeout?: number },
) {
  const gaId = getGaId()
  const payload: GtagEventParams = { ...params }
  if (gaId) payload.send_to = gaId

  if (options?.event_callback) {
    let called = false
    const done = () => {
      if (called) return
      called = true
      options.event_callback?.()
    }
    gtag('event', action, {
      ...payload,
      event_callback: done,
      event_timeout: options.event_timeout ?? 2000,
    })
    window.setTimeout(done, options.event_timeout ?? 2000)
    return
  }

  gtag('event', action, payload)
}

export function trackPhoneCall(location = 'Header') {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: location,
    link_text: location,
    outbound: false,
  })
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'phone_click', location)
  }
}

/** Mark that a lead was just submitted so /thank-you can fire generate_lead once. */
export function markLeadSubmitted(formLocation: string) {
  try {
    sessionStorage.setItem(LEAD_FLAG_KEY, formLocation)
  } catch {
    /* ignore private-mode / blocked storage */
  }
}

export function consumeLeadFlag(): string | null {
  try {
    const value = sessionStorage.getItem(LEAD_FLAG_KEY)
    if (value) sessionStorage.removeItem(LEAD_FLAG_KEY)
    return value
  } catch {
    return null
  }
}

/**
 * Primary conversion event (mark as a Key Event in GA4 Admin → Events).
 * Prefer firing from /thank-you after a successful submit to avoid lost beacons on redirect.
 */
export function trackGenerateLead(params: {
  form_name?: string
  form_location?: string
  method?: string
}) {
  trackEvent('generate_lead', {
    form_name: params.form_name ?? 'Quote Request',
    form_location: params.form_location ?? 'unknown',
    method: params.method ?? 'form',
    currency: 'USD',
    value: 1,
  })
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'generate_lead', params.form_location ?? 'unknown')
  }
}

export function trackFormSubmit(
  formName = 'Quote Form',
  formLocation = 'unknown',
  options?: { event_callback?: () => void },
) {
  trackEvent(
    'form_submit',
    {
      form_name: formName,
      form_location: formLocation,
      event_category: 'conversion',
      event_label: formName,
    },
    options,
  )
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'form_submit', `${formName}:${formLocation}`)
  }
}

/** Funnel step: user opened /contact (mark as Key Event in GA4 if desired). */
export function trackContactPageView() {
  trackEvent('contact_page_view', {
    page_location: typeof window !== 'undefined' ? window.location.href : '/contact',
    page_path: '/contact',
    event_category: 'conversion',
    event_label: 'Contact Page',
  })
}

/** Funnel step: quote form entered the viewport / mounted (home, contact, hubs). */
export function trackQuoteFormView(formLocation: string) {
  trackEvent('quote_form_view', {
    form_name: 'Quote Request',
    form_location: formLocation,
    event_category: 'engagement',
    event_label: formLocation,
  })
}

export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    value: depth,
    percent_scrolled: depth,
  })
}

export function trackOutboundClick(url: string) {
  trackEvent('outbound_click', {
    event_category: 'engagement',
    event_label: url,
    link_url: url,
    outbound: true,
  })
}

export function trackQuoteRequest() {
  trackGenerateLead({ form_name: 'Quote Request', method: 'quote_request' })
}

export function trackNavigation(label: string) {
  trackEvent('navigation', {
    event_category: 'engagement',
    event_label: label,
  })
}

export function trackCtaClick(label: string) {
  trackEvent('cta_click', {
    event_category: 'conversion',
    event_label: label,
    link_text: label,
  })
}

export function trackGalleryView(label: string) {
  trackEvent('gallery_view', {
    event_category: 'engagement',
    event_label: label,
  })
}

export function trackGalleryFilter(label: string) {
  trackEvent('gallery_filter', {
    event_category: 'engagement',
    event_label: label,
  })
}

export function trackProjectPageView(label: string) {
  trackEvent('project_page_view', {
    event_category: 'engagement',
    event_label: label,
  })
}
