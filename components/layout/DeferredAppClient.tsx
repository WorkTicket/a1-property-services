'use client'

import { useEffect, useState, type ComponentType } from 'react'

type AppClientComponent = ComponentType

/**
 * WP Rocket-style delay JS: analytics, consent, and hover prefetch stay off the
 * critical path until idle or first input. Sticky CTA is SSR'd in the layout.
 */
export default function DeferredAppClient() {
  const [AppClient, setAppClient] = useState<AppClientComponent | null>(null)

  useEffect(() => {
    let cancelled = false
    let idleId = 0
    let timeoutId = 0

    const load = () => {
      void import('./AppClient').then((mod) => {
        if (!cancelled) setAppClient(() => mod.default)
      })
    }

    const onInput = () => load()
    const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart', 'scroll']
    for (const event of events) {
      window.addEventListener(event, onInput, { once: true, passive: true })
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(load, { timeout: 4000 })
    } else {
      timeoutId = globalThis.setTimeout(load, 2500) as unknown as number
    }

    return () => {
      cancelled = true
      for (const event of events) {
        window.removeEventListener(event, onInput)
      }
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  if (!AppClient) return null
  return <AppClient />
}
