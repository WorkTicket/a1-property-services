import type { ReactNode, AnchorHTMLAttributes } from 'react'
import { siteConfig } from '@/lib/metadata'

type TrackPhoneLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  location: string
  children: ReactNode
}

/** Click-to-call anchor; ClientRuntime fires phone_click from data-track-phone. */
export default function TrackPhoneLink({ location, children, ...rest }: TrackPhoneLinkProps) {
  return (
    <a href={`tel:${siteConfig.phone}`} data-track-phone={location} {...rest}>
      {children}
    </a>
  )
}
