'use client'

import Link from 'next/link'
import { MessageSquare, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { trackPhoneCall, trackCtaClick } from '@/lib/analytics'

export default function StickyCtaBar() {
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
        href="/contact"
        onClick={() => trackCtaClick('Sticky Quote')}
        className="sticky-cta-bar__quote"
      >
        <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
        <span>{CTA_COPY.quote}</span>
      </Link>
    </div>
  )
}
