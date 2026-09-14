'use client'

import { useState } from 'react'
import { getGoogleMapsEmbedUrl, siteConfig } from '@/lib/metadata'

type LazyGoogleMapProps = {
  title?: string
  className?: string
}

/** Click-to-load maps facade so Google Maps JS never competes with LCP. */
export default function LazyGoogleMap({
  title = 'A1 Property Services location',
  className = 'h-[320px] w-full md:h-[420px]',
}: LazyGoogleMapProps) {
  const [src, setSrc] = useState<string | null>(null)
  const { address } = siteConfig

  if (src) {
    return (
      <iframe
        title={title}
        src={src}
        className={`${className} border-0`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setSrc(getGoogleMapsEmbedUrl())}
      className={`${className} flex flex-col items-center justify-center gap-2 bg-brand-stone text-center text-sm text-brand-body transition-colors hover:bg-brand-green-100`}
      aria-label={`Load map of ${address.street}, ${address.city}, ${address.state}`}
    >
      <span className="font-semibold text-brand-dark">View map</span>
      <span>
        {address.street}
        <br />
        {address.city}, {address.state} {address.zip}
      </span>
    </button>
  )
}
