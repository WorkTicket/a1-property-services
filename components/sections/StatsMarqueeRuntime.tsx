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
    let scrollTimer = 0
    let scrollBound = false

    const play = () => {
      if (document.hidden || !shown) return
      root.classList.add('is-running')
    }
    const pause = () => root.classList.remove('is-running')
    const onVisibility = () => {
      if (document.hidden) pause()
      else play()
    }
    const onScroll = () => {
      root.classList.add('is-scrolling')
      if (scrollTimer) globalThis.clearTimeout(scrollTimer)
      scrollTimer = globalThis.setTimeout(() => {
        root.classList.remove('is-scrolling')
      }, 140) as unknown as number
    }
    const bindScroll = () => {
      if (scrollBound) return
      scrollBound = true
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    const unbindScroll = () => {
      if (scrollBound) {
        window.removeEventListener('scroll', onScroll)
        scrollBound = false
      }
      if (scrollTimer) globalThis.clearTimeout(scrollTimer)
      root.classList.remove('is-scrolling')
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
      bindScroll()
      schedulePlay()
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          shown = entry.isIntersecting
          if (shown) {
            bindScroll()
            schedulePlay()
          } else {
            unbindScroll()
            pause()
          }
        },
        { rootMargin: '0px', threshold: 0.2 },
      )
      io.observe(root)
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      io?.disconnect()
      unbindScroll()
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) globalThis.clearTimeout(timeoutId)
      pause()
    }
  }, [])

  return null
}
