'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

type DeferredImageProps = ComponentProps<typeof ResponsiveImage>

/** Wait until load+idle so below-hero images never compete with LCP. */
export default function DeferredImage(props: DeferredImageProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const enable = () => setReady(true)
    const start = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(enable, { timeout: 2500 })
      } else {
        setTimeout(enable, 400)
      }
    }

    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
  }, [])

  if (!ready) {
    if (props.fill) {
      return <div className="absolute inset-0 bg-neutral-200" aria-hidden />
    }
    const width = props.width ?? 16
    const height = props.height ?? 9
    return <div className="bg-neutral-200" style={{ width, height }} aria-hidden />
  }

  return <ResponsiveImage {...props} />
}
