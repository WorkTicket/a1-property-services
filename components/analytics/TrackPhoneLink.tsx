'use client'

import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { siteConfig } from '@/lib/metadata'
import { trackPhoneCall } from '@/lib/analytics'

type TrackPhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  location: string
  children: ReactNode
}

/** Click-to-call anchor that always fires phone_click for GA4. */
export default function TrackPhoneLink({ location, children, onClick, ...rest }: TrackPhoneLinkProps) {
  return (
    <a
      href={`tel:${siteConfig.phone}`}
      onClick={(e) => {
        trackPhoneCall(location)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
