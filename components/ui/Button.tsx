'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { trackPhoneCall, trackCtaClick } from '@/lib/analytics'

type ButtonVariant = 'primary' | 'ghost' | 'ghost-dark' | 'outline' | 'outline-on-dark' | 'white'
type ButtonSize = 'default' | 'sm' | 'lg' | 'xs'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
  /** Optional analytics label for phone/CTA tracking */
  trackLabel?: string
}

type ButtonAsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type ButtonAsLink = BaseProps & {
  href: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>

const variants: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  'ghost-dark': 'btn-ghost-dark',
  outline: 'btn-outline',
  'outline-on-dark': 'btn-outline-on-dark',
  white: 'btn-white',
}

const sizes: Record<ButtonSize, string> = {
  default: '',
  sm: 'btn-sm',
  lg: 'btn-lg',
  xs: 'btn-xs',
}

function isExternalHref(href: string) {
  return /^(https?:\/\/|tel:|mailto:)/.test(href)
}

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'primary',
    size = 'default',
    fullWidth,
    className,
    children,
    trackLabel,
    ...rest
  } = props
  const classes = cn(variants[variant], sizes[size], fullWidth && 'w-full', className)

  if ('href' in rest && rest.href) {
    const { href, onClick, ...linkRest } = rest
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('tel:')) {
        trackPhoneCall(trackLabel ?? 'Button Phone')
      } else if (trackLabel) {
        trackCtaClick(trackLabel)
      }
      onClick?.(e)
    }

    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} onClick={handleClick} {...linkRest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={handleClick} {...linkRest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
