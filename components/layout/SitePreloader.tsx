'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'
import LogoMark from '@/components/ui/LogoMark'

const MIN_DURATION_MS = 250
const FADE_DURATION_MS = 500

export default function SitePreloader() {
  const alreadySeen = useSyncExternalStore(
    () => () => {},
    () => window.sessionStorage.getItem('a1ps-preloader-seen') === '1',
    () => false,
  )
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible')
  const displayPhase = alreadySeen ? 'hidden' : phase

  useEffect(() => {
    if (alreadySeen) return

    const start = Date.now()
    document.body.style.overflow = 'hidden'
    let fadeTimer: number | undefined
    let hideTimer: number | undefined

    const dismiss = () => {
      const remaining = Math.max(0, MIN_DURATION_MS - (Date.now() - start))
      fadeTimer = window.setTimeout(() => setPhase('fading'), remaining)
      hideTimer = window.setTimeout(() => {
        setPhase('hidden')
        document.body.style.overflow = ''
        window.sessionStorage.setItem('a1ps-preloader-seen', '1')
      }, remaining + FADE_DURATION_MS)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    return () => {
      window.removeEventListener('load', dismiss)
      if (fadeTimer) window.clearTimeout(fadeTimer)
      if (hideTimer) window.clearTimeout(hideTimer)
      document.body.style.overflow = ''
    }
  }, [alreadySeen])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-brand-green-900 transition-opacity duration-500 ease-premium',
        displayPhase === 'fading' && 'opacity-0 pointer-events-none',
        displayPhase === 'hidden' && 'hidden',
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading site"
    >
      <div className="relative flex flex-col items-center opacity-0 animate-fade-in-scale">
        <LogoMark size="lg" className="shadow-premium-lg" />
      </div>
    </div>
  )
}
