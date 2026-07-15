import { sendGAEvent } from '@next/third-parties/google'

type GtagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

declare global {
  interface Window {
    clarity?: (command: string, action: string, params?: string) => void
  }
}

export function trackEvent({ action, category, label, value }: GtagEvent) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}

export function trackPhoneCall(location = 'Header') {
  trackEvent({ action: 'phone_click', category: 'engagement', label: location })
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'phone_click', location)
  }
}

export function trackFormSubmit(formName = 'Quote Form') {
  trackEvent({ action: 'form_submit', category: 'conversion', label: formName })
  if (typeof window.clarity === 'function') {
    window.clarity('set', 'form_submit', formName)
  }
}

export function trackScrollDepth(depth: number) {
  trackEvent({ action: 'scroll_depth', category: 'engagement', label: `${depth}%`, value: depth })
}

export function trackOutboundClick(url: string) {
  trackEvent({ action: 'outbound_click', category: 'engagement', label: url })
}

export function trackQuoteRequest() {
  trackEvent({ action: 'quote_request', category: 'conversion', label: 'Quote Request' })
}

export function trackNavigation(label: string) {
  trackEvent({ action: 'navigation', category: 'engagement', label })
}

export function trackCtaClick(label: string) {
  trackEvent({ action: 'cta_click', category: 'conversion', label })
}

export function trackGalleryView(label: string) {
  trackEvent({ action: 'gallery_view', category: 'engagement', label })
}

export function trackGalleryFilter(label: string) {
  trackEvent({ action: 'gallery_filter', category: 'engagement', label })
}

export function trackProjectPageView(label: string) {
  trackEvent({ action: 'project_page_view', category: 'engagement', label })
}
