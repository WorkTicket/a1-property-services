'use client'

import { useEffect } from 'react'

function loadOnInteraction(callback: () => void) {
  let loaded = false
  const run = () => {
    if (loaded) return
    loaded = true
    callback()
  }

  const events = ['click', 'touchstart', 'keydown'] as const
  events.forEach((event) => window.addEventListener(event, run, { once: true, passive: true }))

  return () => {
    events.forEach((event) => window.removeEventListener(event, run))
  }
}

export default function MicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  useEffect(() => {
    if (!clarityId) return

    return loadOnInteraction(() => {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.clarity.ms/tag/${clarityId}`
      document.head.appendChild(script)
    })
  }, [clarityId])

  return null
}
