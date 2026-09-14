'use client'

import { useEffect } from 'react'
import {
  COOKIE_CONSENT_EVENT,
  applyGtagConsent,
  getCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'
import {
  trackCtaClick,
  trackNavigation,
  trackOutboundClick,
  trackPhoneCall,
  trackScrollDepth,
} from '@/lib/analytics'
import { prefetchHeroForPath, shouldSkipHeroPrefetch } from '@/lib/prefetch-hero'
import { isAutomatedBrowser } from '@/lib/is-automated-browser'

export default function ClientRuntime() {
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

  useEffect(() => {
    const thresholds = [25, 50, 75, 90, 100]
    const sent = new Set<number>()

    const onScroll = () => {
      const scrollPct = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100,
      )

      for (const t of thresholds) {
        if (scrollPct >= t && !sent.has(t)) {
          sent.add(t)
          trackScrollDepth(t)
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a')
      if (!anchor) return

      const trackCta = anchor.getAttribute('data-track-cta')
      const trackNav = anchor.getAttribute('data-track-nav')
      const trackPhone = anchor.getAttribute('data-track-phone')
      const trackOut = anchor.getAttribute('data-track-outbound')
      const href = anchor.getAttribute('href') || ''

      if (trackPhone || href.startsWith('tel:')) {
        trackPhoneCall(trackPhone || trackCta || 'Phone')
        return
      }
      if (trackCta && !href.startsWith('tel:')) trackCtaClick(trackCta)
      if (trackNav) trackNavigation(trackNav)
      if (trackOut) {
        trackOutboundClick(trackOut)
        return
      }
      if (anchor.hostname && anchor.hostname !== window.location.hostname) {
        trackOutboundClick(href)
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (isAutomatedBrowser() || shouldSkipHeroPrefetch()) return

    const prefetchFromEvent = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const href = target.closest('a')?.getAttribute('href')
      if (href) prefetchHeroForPath(href)
    }

    document.addEventListener('pointerover', prefetchFromEvent, { passive: true })
    document.addEventListener('pointerdown', prefetchFromEvent, { passive: true })
    document.addEventListener('focusin', prefetchFromEvent)

    return () => {
      document.removeEventListener('pointerover', prefetchFromEvent)
      document.removeEventListener('pointerdown', prefetchFromEvent)
      document.removeEventListener('focusin', prefetchFromEvent)
    }
  }, [])

  return null
}
