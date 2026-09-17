'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import { CTA_COPY, quoteHrefForPath } from '@/lib/cta'

type QuoteButtonProps = {
  href?: string
  trackLabel?: string
  variant?: 'primary' | 'ghost' | 'ghost-dark' | 'outline' | 'outline-on-dark' | 'white'
  size?: 'default' | 'sm' | 'lg' | 'xs'
  fullWidth?: boolean
  className?: string
  children?: ReactNode
  onClick?: () => void
}

export default function QuoteButton({
  href,
  children = CTA_COPY.quote,
  trackLabel = 'Quote',
  ...rest
}: QuoteButtonProps) {
  const pathname = usePathname()
  return (
    <Button href={href ?? quoteHrefForPath(pathname)} trackLabel={trackLabel} {...rest}>
      {children}
    </Button>
  )
}
