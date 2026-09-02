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
  '/about',
  '/faqs',
  '/gallery',
  '/landscaping-services-in-cedar-falls',
  '/retaining-wall-in-cedar-falls',
  '/paver-patio-installation',
  '/cedar-falls-water-features',
  '/services',
])

/** Non-city first path segments — everything else with 1–2 segments is a city or city×service page. */
const NON_CITY_ROOTS = new Set([
  'about',
  'gallery',
  'blog',
  'contact',
  'faqs',
  'resources',
  'learn',
  'privacy',
  'terms',
  'thank-you',
  'services',
  'landscaping-services-in-cedar-falls',
  'retaining-wall-in-cedar-falls',
  'paver-patio-installation',
  'cedar-falls-water-features',
])

function hasInlineEstimate(pathname: string): boolean {
  if (INLINE_ESTIMATE_PATHS.has(pathname)) return true
  if (pathname.startsWith('/services/')) return true
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length >= 1 && parts.length <= 2 && !NON_CITY_ROOTS.has(parts[0])) return true
  return false
}

export default function StickyCtaBar() {
  const pathname = usePathname()
  const quoteHref = hasInlineEstimate(pathname) ? '#estimate' : '/contact'

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
