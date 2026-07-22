'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { trackPhoneCall, trackCtaClick } from '@/lib/analytics'

const INLINE_ESTIMATE_PATHS = new Set([
  '/',
  '/contact',
  '/landscaping-services-in-cedar-falls',
  '/retaining-wall-in-cedar-falls',
  '/paver-patio-installation',
  '/cedar-falls-water-features',
])

export default function StickyCtaBar() {
  const pathname = usePathname()
  const quoteHref = INLINE_ESTIMATE_PATHS.has(pathname) ? '#estimate' : '/contact'

  return (
    <div className="sticky-cta-bar">
      <a
        href={`tel:${siteConfig.phone}`}
        onClick={() => trackPhoneCall('Sticky CTA')}
        className="sticky-cta-bar__call"
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden />
        <span>{CTA_COPY.callNow}</span>
      </a>
      <Link
        href={quoteHref}
        onClick={() => trackCtaClick('Sticky Quote')}
        className="sticky-cta-bar__quote"
      >
        <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
        <span>{CTA_COPY.quote}</span>
      </Link>
    </div>
  )
}
