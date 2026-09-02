export const COOKIE_CONSENT_KEY = 'a1_cookie_consent'
export const COOKIE_CONSENT_EVENT = 'a1-cookie-consent'

export type CookieConsent = 'accepted' | 'rejected'

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (value === 'accepted' || value === 'rejected') return value
  } catch {
    /* private mode / blocked storage */
  }
  return null
}

export function setCookieConsent(value: CookieConsent) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
  } catch {
    /* ignore */
  }
  applyGtagConsent(value)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }))
  }
}

/** Sync Google Consent Mode after the banner choice (tags already load in <head>). */
export function applyGtagConsent(value: CookieConsent) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return
  const state = value === 'accepted' ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent() === 'accepted'
}
