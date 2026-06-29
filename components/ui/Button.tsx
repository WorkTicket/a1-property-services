'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'ghost-dark' | 'outline' | 'white'
type ButtonSize = 'default' | 'sm' | 'lg' | 'xs'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  children: React.ReactNode
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
  const { variant = 'primary', size = 'default', fullWidth, className, children, ...rest } = props
  const classes = cn(variants[variant], sizes[size], fullWidth && 'w-full', className)

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest
    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...linkRest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...linkRest}>
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
