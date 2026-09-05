'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  ArrowRight,
  Trees,
  Layers,
  Droplets,
  TreeDeciduous,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import LogoMark from '@/components/ui/LogoMark'
import Button from '@/components/ui/Button'
import { allServices, type Service, getServicePageHref, getLegacyLandingPageHref } from '@/lib/services'
import { trackPhoneCall, trackNavigation } from '@/lib/analytics'

const serviceResourceLinks = [
  { label: 'Knowledge Center', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
]

const megaMenuColumnDefs = [
  {
    key: 'landscaping',
    label: 'Landscaping',
    desc: 'Design, install & upkeep',
    icon: Trees,
    slugs: [
      'landscape-design',
      'landscape-installation',
      'residential-landscaping',
      'landscape-maintenance',
      'preservation-restoration',
      'mulching',
    ],
  },
  {
    key: 'lawn-trees',
    label: 'Lawn & Trees',
    desc: 'Turf, trees & plantings',
    icon: TreeDeciduous,
    slugs: [
      'lawn-care',
      'sod-installation',
      'hydroseeding',
      'tree-service',
      'tree-planting',
      'shrub-installation',
    ],
  },
  {
    key: 'hardscaping',
    label: 'Hardscaping',
    desc: 'Patios, walls & features',
    icon: Layers,
    slugs: [
      'paver-patio',
      'paver-driveway',
      'retaining-walls',
      'outdoor-living',
      'ponds-water-features',
      'rock-landscaping',
    ],
  },
  {
    key: 'site-work',
    label: 'Site Work',
    desc: 'Drainage, commercial & snow',
    icon: Droplets,
    slugs: [
      'drainage',
      'grading',
      'excavation',
      'commercial-landscaping',
      'snow-removal',
    ],
  },
] as const

function servicesForSlugs(slugs: readonly string[]): Service[] {
  return slugs.flatMap((slug) => {
    const match = allServices.find((service) => service.slug === slug)
    return match ? [match] : []
  })
}

const megaMenuColumns = megaMenuColumnDefs.map((column) => ({
  ...column,
  services: servicesForSlugs(column.slugs),
}))

const learnLinks = [
  { label: 'Knowledge Center', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLLIElement>(null)
  const servicesMenuRef = useRef<HTMLDivElement>(null)
  const learnRef = useRef<HTMLLIElement>(null)
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const learnCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mounted, setMounted] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(84)

  const isServicesActive =
    pathname.startsWith('/services') || pathname === '/landscaping-services-in-cedar-falls'
  const isLearnActive = learnLinks.some((link) => pathname === link.href)

  const openServicesMenu = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    setLearnOpen(false)
    setServicesOpen(true)
  }

  const closeServicesMenu = () => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 180)
  }

  const openLearnMenu = () => {
    if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    setServicesOpen(false)
    setLearnOpen(true)
  }

  const closeLearnMenu = () => {
    learnCloseTimer.current = setTimeout(() => setLearnOpen(false), 150)
  }

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
    setMobileLearnOpen(false)
    setServicesOpen(false)
    setLearnOpen(false)
  }, [pathname])

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
      if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeight = () => {
      setHeaderHeight(header.getBoundingClientRect().height)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)
    window.addEventListener('resize', updateHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (mobileOpen) setMobileOpen(false)
      setServicesOpen(false)
      setLearnOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    const header = headerRef.current
    if (!mobileOpen) {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
      header?.style.removeProperty('padding-right')
      return
    }

    const gap = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
    const gapPx = gap ? `${gap}px` : ''
    document.body.style.paddingRight = gapPx
    document.body.style.overflow = 'hidden'
    if (header) header.style.paddingRight = gapPx

    return () => {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
      header?.style.removeProperty('padding-right')
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const inServicesTrigger = servicesRef.current?.contains(target)
      const inServicesMenu = servicesMenuRef.current?.contains(target)
      if (!inServicesTrigger && !inServicesMenu) {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
        setServicesOpen(false)
      }
      if (learnRef.current && !learnRef.current.contains(target)) {
        if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
        setLearnOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const linkClass = (active: boolean) =>
    cn(
      'relative whitespace-nowrap text-sm font-medium transition-colors duration-300 lg:text-[0.9375rem]',
      active ? 'text-brand-gold' : 'text-brand-dark hover:text-brand-gold',
    )

  const mobileMenu = (
    <div
      id="mobile-nav-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
      style={{ top: headerHeight }}
    >
      <ul className="flex flex-col px-4 pt-8">
        <li>
          <Link
            href="/"
            className={cn(
              'block py-3 font-display text-2xl font-bold',
              pathname === '/' ? 'text-brand-gold' : 'text-brand-dark',
            )}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile Home') }}
          >
            Home
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between py-3 font-display text-2xl font-bold text-brand-dark"
            onClick={() => setMobileServicesOpen((open) => !open)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown
              size={20}
              className={cn('text-brand-gold transition-transform', mobileServicesOpen && 'rotate-180')}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-300 ease-premium',
              mobileServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden border-l-2 border-brand-gold/30 pl-4">
              <Link
                href="/services"
                className={cn(
                  'block py-2 text-base font-semibold',
                  pathname === '/services' ? 'text-brand-gold' : 'text-brand-dark',
                )}
                onClick={() => { setMobileOpen(false); trackNavigation('Mobile All Services') }}
              >
                All Services
              </Link>
              {megaMenuColumns.map((column) => (
                <div key={column.key} className="pt-3">
                  <p className="pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-body/45">
                    {column.label}
                  </p>
                  {column.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={getServicePageHref(service.slug)}
                      className={cn(
                        'block py-2 text-base',
                        pathname === `/services/${service.slug}` ||
                        pathname === getLegacyLandingPageHref(service.slug)
                          ? 'font-semibold text-brand-gold'
                          : 'text-brand-body',
                      )}
                      onClick={() => { setMobileOpen(false); trackNavigation(`Mobile ${service.name}`) }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </li>

        <li>
          <Link
            href="/gallery"
            className={cn(
              'block py-3 font-display text-2xl font-bold',
              pathname === '/gallery' ? 'text-brand-gold' : 'text-brand-dark',
            )}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile Gallery') }}
          >
            Gallery
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between py-3 font-display text-2xl font-bold text-brand-dark"
            onClick={() => setMobileLearnOpen((open) => !open)}
            aria-expanded={mobileLearnOpen}
          >
            Learn
            <ChevronDown
              size={20}
              className={cn('text-brand-gold transition-transform', mobileLearnOpen && 'rotate-180')}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-300 ease-premium',
              mobileLearnOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden border-l-2 border-brand-gold/30 pl-4">
              {learnLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block py-2 text-base',
                    pathname === link.href ? 'font-semibold text-brand-gold' : 'text-brand-body',
                  )}
                  onClick={() => { setMobileOpen(false); trackNavigation(`Mobile ${link.label}`) }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </li>

        <li>
          <Link
            href="/about"
            className={cn(
              'block py-3 font-display text-2xl font-bold',
              pathname === '/about' ? 'text-brand-gold' : 'text-brand-dark',
            )}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile About') }}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            className={cn(
              'block py-3 font-display text-2xl font-bold',
              pathname === '/contact' ? 'text-brand-gold' : 'text-brand-dark',
            )}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile Contact') }}
          >
            Contact
          </Link>
        </li>
      </ul>
      <div className="mt-8 flex flex-col items-center gap-4 px-4 pb-8">
        <a
          href={`tel:${siteConfig.phone}`}
          onClick={() => trackPhoneCall('Navbar Mobile Menu')}
          className="flex items-center gap-2 text-lg text-brand-gold"
        >
          <Phone size={18} />
          {siteConfig.phoneDisplay}
        </a>
        <Button
          href="/contact"
          size="sm"
          fullWidth
          className="max-w-xs justify-center"
          onClick={() => setMobileOpen(false)}
        >
          {CTA_COPY.quote}
        </Button>
      </div>
    </div>
  )

  const desktopServicesMenu = (
    <div
      ref={servicesMenuRef}
      id="desktop-services-menu"
      className={cn(
        'fixed inset-x-0 z-40 hidden lg:block',
        servicesOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      style={{ top: headerHeight }}
      onMouseEnter={openServicesMenu}
      onMouseLeave={closeServicesMenu}
      aria-hidden={!servicesOpen}
    >
      <div
        className={cn(
          'border-b border-black/[0.06] bg-white shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)] transition-all duration-300 ease-premium',
          servicesOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0',
        )}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />

        <div className="mx-auto grid max-w-7xl grid-cols-4 px-4 py-6 sm:px-6 lg:px-8">
          {megaMenuColumns.map((column, index) => {
            const ColumnIcon = column.icon
            return (
              <div
                key={column.key}
                className={cn(
                  'min-w-0 px-3 lg:px-5',
                  index > 0 && 'border-l border-black/[0.06]',
                )}
              >
                <div className="mb-3 flex items-center gap-2.5 border-b border-black/[0.06] pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green-100 text-brand-gold">
                    <ColumnIcon size={15} strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold leading-tight text-brand-dark">
                      {column.label}
                    </p>
                    <p className="mt-0.5 text-[0.6875rem] leading-snug text-brand-body/50">
                      {column.desc}
                    </p>
                  </div>
                </div>
                <ul>
                  {column.services.map((service) => {
                    const isServiceActive =
                      pathname === `/services/${service.slug}` ||
                      pathname === getLegacyLandingPageHref(service.slug)

                    return (
                      <li key={service.slug}>
                        <Link
                          href={getServicePageHref(service.slug)}
                          tabIndex={servicesOpen ? undefined : -1}
                          className={cn(
                            'group flex items-center justify-between gap-2 rounded-md px-1.5 py-1.5 text-[0.8125rem] leading-snug transition-colors',
                            isServiceActive
                              ? 'bg-brand-green-100 font-semibold text-brand-gold'
                              : 'text-brand-body hover:bg-brand-green-100/70 hover:text-brand-gold',
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          <span>{service.name}</span>
                          <ArrowRight
                            size={12}
                            className={cn(
                              'shrink-0 opacity-0 transition-all',
                              isServiceActive
                                ? 'opacity-100'
                                : 'group-hover:translate-x-0.5 group-hover:opacity-60',
                            )}
                            aria-hidden
                          />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="border-t border-black/[0.06] bg-neutral-50/90">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <Link
                href="/services"
                tabIndex={servicesOpen ? undefined : -1}
                className={cn(
                  'font-semibold transition-colors hover:text-brand-gold',
                  pathname === '/services'
                    ? 'text-brand-gold'
                    : 'text-brand-dark',
                )}
                onClick={() => { setServicesOpen(false); trackNavigation('Nav All Services') }}
              >
                View all services
              </Link>
              {serviceResourceLinks.map((link) => (
                <span key={link.href} className="flex items-center gap-3">
                  <span className="text-brand-body/25" aria-hidden>
                    ·
                  </span>
                  <Link
                    href={link.href}
                    tabIndex={servicesOpen ? undefined : -1}
                    className="font-medium text-brand-body transition-colors hover:text-brand-gold"
                    onClick={() => setServicesOpen(false)}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              tabIndex={servicesOpen ? undefined : -1}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold"
              onClick={() => setServicesOpen(false)}
            >
              {CTA_COPY.quote}
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/85 shadow-md backdrop-blur-md"
    >
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-8 lg:py-5"
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:col-start-1 lg:row-start-1" aria-label="A1 Property Services home">
          <LogoMark size="md" />
          <span
            className="truncate text-base font-bold leading-tight tracking-tight text-brand-dark sm:text-lg lg:text-xl"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            A1 Property Services
          </span>
        </Link>

        <ul className="hidden items-center justify-center gap-x-5 xl:gap-x-7 lg:flex">
          <li>
            <Link
              href="/"
              className={linkClass(pathname === '/')}
              onClick={() => trackNavigation('Home')}
            >
              Home
              {pathname === '/' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold" />
              )}
            </Link>
          </li>

          <li ref={servicesRef}>
            <div
              className="relative"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
            >
              <button
                type="button"
                className={cn(linkClass(isServicesActive), 'inline-flex items-center gap-1')}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="desktop-services-menu"
                onClick={() => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  setLearnOpen(false)
                  setServicesOpen((open) => !open)
                }}
              >
                Services
                <ChevronDown
                  size={14}
                  className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                />
                {isServicesActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold" />
                )}
              </button>

              <div
                className={cn(
                  'absolute left-1/2 top-full z-50 h-10 w-screen -translate-x-1/2',
                  servicesOpen ? 'pointer-events-auto' : 'pointer-events-none',
                )}
                aria-hidden
              />
            </div>
          </li>

          <li>
            <Link
              href="/gallery"
              className={linkClass(pathname === '/gallery')}
              onClick={() => trackNavigation('Gallery')}
            >
              Gallery
              {pathname === '/gallery' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold" />
              )}
            </Link>
          </li>

          <li
            ref={learnRef}
            className="relative"
            onMouseEnter={openLearnMenu}
            onMouseLeave={closeLearnMenu}
          >
            <button
              type="button"
              className={cn(linkClass(isLearnActive), 'inline-flex items-center gap-1')}
              aria-expanded={learnOpen}
              aria-haspopup="true"
              onClick={() => setLearnOpen((open) => !open)}
            >
              Learn
              <ChevronDown
                size={14}
                className={cn('transition-transform duration-200', learnOpen && 'rotate-180')}
              />
              {isLearnActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold" />
              )}
            </button>

            <div
              className={cn(
                'absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-3',
                learnOpen ? 'pointer-events-auto' : 'pointer-events-none',
              )}
            >
              <div
                className={cn(
                  'rounded-xl border border-black/5 bg-white py-2 shadow-premium-lg transition-all duration-200 ease-premium',
                  learnOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                )}
              >
                {learnLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-4 py-2 text-sm transition-colors hover:bg-brand-green-100',
                      pathname === link.href
                        ? 'font-semibold text-brand-gold'
                        : 'text-brand-body hover:text-brand-dark',
                    )}
                    onClick={() => { setLearnOpen(false); trackNavigation(link.label) }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </li>

          <li>
            <Link
              href="/about"
              className={linkClass(pathname === '/about')}
              onClick={() => trackNavigation('About')}
            >
              About
              {pathname === '/about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold" />
              )}
            </Link>
          </li>
        </ul>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex xl:gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => trackPhoneCall('Navbar Desktop')}
            className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-brand-gold transition-colors hover:text-brand-gold-hover xl:text-base"
          >
            <Phone size={14} className="shrink-0" />
            <span className="hidden xl:inline">{siteConfig.phoneDisplay}</span>
          </a>
          <Button href="/contact" size="sm" className="whitespace-nowrap">
            {CTA_COPY.quote}
          </Button>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:hidden">
          <a
            href={`tel:${siteConfig.phone}`}
            onClick={() => trackPhoneCall('Navbar Mobile')}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green-100 text-brand-gold"
            aria-label="Call us"
          >
            <Phone size={18} />
          </a>
          <button
            type="button"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-brand-dark"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="relative block h-6 w-6" aria-hidden>
              <Menu
                size={24}
                className={cn(
                  'absolute inset-0 transition-opacity duration-150',
                  mobileOpen ? 'opacity-0' : 'opacity-100',
                )}
              />
              <X
                size={24}
                className={cn(
                  'absolute inset-0 transition-opacity duration-150',
                  mobileOpen ? 'opacity-100' : 'opacity-0',
                )}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>
    {mounted
      ? createPortal(desktopServicesMenu, document.body)
      : null}
    {mounted && mobileOpen
      ? createPortal(mobileMenu, document.body)
      : null}
    </>
  )
}
