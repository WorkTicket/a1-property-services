'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY, quoteHrefForPath, isHashHref } from '@/lib/cta'
import { cn } from '@/lib/utils'

type StickyCtaBarProps = {
  embedded?: boolean
  onNavigate?: () => void
}

export default function StickyCtaBar({ embedded = false, onNavigate }: StickyCtaBarProps) {
  const pathname = usePathname()
  const quoteHref = quoteHrefForPath(pathname)
  const quoteClassName = 'sticky-cta-bar__quote'
  const quoteLabel = embedded ? 'Navbar Mobile Quote' : 'Sticky Quote'
  const quoteLink = (
    <>
      <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
      <span>{CTA_COPY.quote}</span>
    </>
  )

  return (
    <div className={cn('sticky-cta-bar', embedded ? 'sticky-cta-bar--embedded' : 'sticky-cta-bar--fixed')}>
      <a
        href={`tel:${siteConfig.phone}`}
        data-track-phone={embedded ? 'Navbar Mobile Menu' : 'Sticky CTA'}
        className="sticky-cta-bar__call"
        onClick={onNavigate}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden />
        <span>{CTA_COPY.callNow}</span>
      </a>
      {isHashHref(quoteHref) ? (
        <a
          href={quoteHref}
          data-track-cta={quoteLabel}
          className={quoteClassName}
          onClick={onNavigate}
        >
          {quoteLink}
        </a>
      ) : (
        <Link
          href={quoteHref}
          prefetch={false}
          data-track-cta={quoteLabel}
          className={quoteClassName}
          onClick={onNavigate}
        >
          {quoteLink}
        </Link>
      )}
    </div>
  )
}
