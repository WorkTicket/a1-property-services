'use client'

import { useEffect } from 'react'

export default function StatsMarqueeRuntime() {
  useEffect(() => {
    const root = document.getElementById('stats-marquee')
    if (!root) return

    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    } catch {
      /* ignore */
    }
    try {
      const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      if (connection?.saveData) return
    } catch {
      /* ignore */
    }

    let shown = false
    let idleId = 0
    let timeoutId = 0

    const play = () => {
      if (document.hidden || !shown) return
      root.classList.add('is-running')
    }
    const pause = () => root.classList.remove('is-running')
    const onVisibility = () => {
      if (document.hidden) pause()
      else play()
    }
    const schedulePlay = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(play, { timeout: 800 })
      } else {
        timeoutId = globalThis.setTimeout(play, 1) as unknown as number
      }
    }

    document.addEventListener('visibilitychange', onVisibility)

    let io: IntersectionObserver | undefined
    if (!('IntersectionObserver' in window)) {
      shown = true
      schedulePlay()
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          shown = entry.isIntersecting
          if (shown) schedulePlay()
          else pause()
        },
        { rootMargin: '0px', threshold: 0.2 },
      )
      io.observe(root)
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      io?.disconnect()
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) globalThis.clearTimeout(timeoutId)
      pause()
    }
  }, [])

  return null
}
