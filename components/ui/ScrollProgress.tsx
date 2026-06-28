'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setScroll(Math.min(pct, 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-brand-gold/30" aria-hidden>
      <div className="h-full origin-left bg-brand-gold" style={{ transform: `scaleX(${scroll})`, transition: 'transform 50ms linear' }} />
    </div>
  )
}
