'use client'

import { ChevronRight, Phone, Image as ImageIcon } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { trackPhoneCall, trackCtaClick } from '@/lib/analytics'
import Button from '@/components/ui/Button'

export default function StickyCtaBar() {
  return (
    <div className="sticky-cta-bar">
      <a
        href={`tel:${siteConfig.phone}`}
        onClick={() => trackPhoneCall('Sticky CTA')}
        className="touch-target flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80"
      >
        <Phone size={18} className="text-white/70" />
        <span className="hidden xs:inline">{siteConfig.phoneDisplay}</span>
        <span className="inline xs:hidden">Call Now</span>
      </a>
      <div className="flex items-center gap-2">
        <Button
          href="/gallery"
          size="sm"
          variant="ghost"
          onClick={() => trackCtaClick('Sticky Gallery')}
          className="touch-target hidden sm:inline-flex"
        >
          <ImageIcon size={16} />
          <span className="hidden xs:inline">{CTA_COPY.viewGallery}</span>
        </Button>
        <Button
          href="/contact"
          size="sm"
          onClick={() => trackCtaClick('Sticky Quote')}
          className="touch-target"
        >
          {CTA_COPY.quote}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
