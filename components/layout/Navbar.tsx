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
  Home,
  Building,
  Snowflake,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import LogoMark from '@/components/ui/LogoMark'
import Button from '@/components/ui/Button'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { allServices, type Service, getServicePageHref, getLegacyLandingPageHref } from '@/lib/services'
import { trackPhoneCall, trackNavigation } from '@/lib/analytics'

const serviceCategories = [
  { key: 'landscaping' as const, label: 'Landscaping', desc: 'Lawns, beds & tree care', icon: Trees },
  { key: 'hardscaping' as const, label: 'Hardscaping', desc: 'Patios, walls & pavers', icon: Layers },
  { key: 'drainage' as const, label: 'Drainage', desc: 'Water management solutions', icon: Droplets },
  { key: 'outdoor-living' as const, label: 'Outdoor Living', desc: 'Fire pits & outdoor kitchens', icon: Home },
  { key: 'commercial' as const, label: 'Commercial', desc: 'Business & HOA properties', icon: Building },
  { key: 'seasonal' as const, label: 'Seasonal', desc: 'Snow removal & lighting', icon: Snowflake },
]

const serviceResourceLinks = [
  { label: 'Knowledge Center', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
]

const hardscapeSlugs = new Set(['retaining-walls', 'paver-patio'])

type ServiceCategoryKey = (typeof serviceCategories)[number]['key']

function getCategoryServices(key: ServiceCategoryKey): Service[] {
  if (key === 'hardscaping') {
    return allServices.filter((s) => s.category === 'hardscaping' || hardscapeSlugs.has(s.slug))
  }
  return allServices.filter((s) => s.category === key)
}

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
  const [scrolled, setScrolled] = useState(false)
  const [activeServiceCategory, setActiveServiceCategory] = useState<ServiceCategoryKey>('landscaping')
  const headerRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLLIElement>(null)
  const learnRef = useRef<HTMLLIElement>(null)
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const learnCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mounted, setMounted] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(72)

  const isCompact = scrolled
  const isServicesActive = pathname.startsWith('/services')
  const isLearnActive = learnLinks.some((link) => pathname === link.href)
  const activeCategoryMeta = serviceCategories.find((c) => c.key === activeServiceCategory)
  const activeCategoryServices = getCategoryServices(activeServiceCategory)

  const openServicesMenu = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    setServicesOpen(true)
  }

  const closeServicesMenu = () => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  const openLearnMenu = () => {
    if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    setLearnOpen(true)
  }

  const closeLearnMenu = () => {
    learnCloseTimer.current = setTimeout(() => setLearnOpen(false), 150)
  }

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
    setMobileLearnOpen(false)
  }, [pathname])

  useEffect(() => {
    const match = allServices.find(
      (s) =>
        pathname === `/services/${s.slug}` ||
        pathname === getLegacyLandingPageHref(s.slug),
    )
    if (match?.category) {
      setActiveServiceCategory(match.category)
    } else if (match && hardscapeSlugs.has(match.slug)) {
      setActiveServiceCategory('hardscaping')
    }
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
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
  }, [isCompact])

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
        setServicesOpen(false)
      }
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
        setLearnOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const linkClass = (active: boolean) =>
    cn(
      'relative whitespace-nowrap font-medium transition-colors duration-300',
      isCompact ? 'text-sm' : 'text-sm lg:text-[0.9375rem]',
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
                className="block py-2 text-base font-semibold text-brand-gold"
                onClick={() => { setMobileOpen(false); trackNavigation('Mobile All Services') }}
              >
                All Services
              </Link>
              {allServices.map((service) => (
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

  return (
    <>
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/85 shadow-md backdrop-blur-md transition-all duration-300 ease-premium"
    >
      <nav
        className={cn(
          'mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 transition-all duration-300 ease-premium sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-8',
          isCompact ? 'py-2.5' : 'py-4 lg:py-5',
        )}
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:col-start-1 lg:row-start-1" aria-label="A1 Property Services home">
          <LogoMark size={isCompact ? 'sm' : 'md'} />
          <span
            className={cn(
              'truncate font-bold leading-tight tracking-tight text-brand-dark transition-all duration-300',
              isCompact ? 'text-sm sm:text-base lg:text-lg' : 'text-base sm:text-lg lg:text-xl',
            )}
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
                onClick={() => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
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

              {/* Padding bridge: unlike margin, padding keeps pointer events while moving into the panel */}
              <div
                className={cn(
                  'absolute left-1/2 top-full z-50 w-[min(760px,calc(100vw-2rem))] -translate-x-1/2 pt-4',
                  servicesOpen ? 'pointer-events-auto' : 'pointer-events-none',
                )}
                onMouseEnter={openServicesMenu}
              >
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04] transition-all duration-300 ease-premium',
                  servicesOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                )}
              >
                <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-green-700 to-brand-gold" />

                <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] px-5 py-4">
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-body/45">
                      Browse by category
                    </p>
                    <h3 className="mt-0.5 font-display text-lg font-bold text-brand-dark">
                      Our Services
                    </h3>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href="/services"
                      className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-green-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <Button href="/contact" size="sm" onClick={() => setServicesOpen(false)}>
                      {CTA_COPY.quote}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-[200px_1fr]">
                  <div className="border-r border-black/[0.06] bg-neutral-50/70 p-3">
                    <ul className="space-y-1">
                      {serviceCategories.map((category) => {
                        const count = getCategoryServices(category.key).length
                        if (count === 0) return null
                        const CategoryIcon = category.icon
                        const isActive = activeServiceCategory === category.key
                        return (
                          <li key={category.key}>
                            <button
                              type="button"
                              className={cn(
                                'flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all duration-200',
                                isActive
                                  ? 'border-black/[0.08] bg-white text-brand-dark shadow-sm'
                                  : 'border-transparent text-brand-body hover:border-black/[0.06] hover:bg-white hover:text-brand-dark',
                              )}
                              onMouseEnter={() => setActiveServiceCategory(category.key)}
                              onFocus={() => setActiveServiceCategory(category.key)}
                              onClick={() => setActiveServiceCategory(category.key)}
                            >
                              <span
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
                                  isActive
                                    ? 'border-brand-gold/20 bg-brand-green-100 text-brand-gold'
                                    : 'border-black/[0.06] bg-white text-brand-body/55',
                                )}
                              >
                                <CategoryIcon size={15} strokeWidth={2} aria-hidden />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold leading-tight">{category.label}</span>
                                <span className="mt-0.5 block text-[0.6875rem] leading-snug text-brand-subtle">
                                  {count} service{count === 1 ? '' : 's'}
                                </span>
                              </span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="flex min-h-[260px] flex-col p-5">
                    {activeCategoryMeta && (
                      <div className="mb-4 border-b border-black/[0.06] pb-3">
                        <p className="font-display text-base font-bold text-brand-dark">
                          {activeCategoryMeta.label}
                        </p>
                        <p className="mt-0.5 text-xs text-brand-body/55">
                          {activeCategoryMeta.desc}
                        </p>
                      </div>
                    )}

                    <ul
                      className={cn(
                        'grid flex-1 gap-1.5 sm:grid-cols-2',
                        activeCategoryServices.length > 8 && 'max-h-[280px] overflow-y-auto overscroll-contain pr-0.5',
                      )}
                    >
                      {activeCategoryServices.map((service: Service) => {
                        const isServiceActive =
                          pathname === `/services/${service.slug}` ||
                          pathname === getLegacyLandingPageHref(service.slug)

                        return (
                        <li key={service.slug}>
                          <Link
                            href={getServicePageHref(service.slug)}
                            className={cn(
                              'group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-200',
                              isServiceActive
                                ? 'border-brand-gold/30 bg-brand-green-50 shadow-sm'
                                : 'border-transparent hover:border-black/[0.06] hover:bg-white hover:shadow-sm',
                            )}
                            onClick={() => setServicesOpen(false)}
                          >
                            <ServiceIcon
                              name={service.icon}
                              variant="compact"
                              className={cn(
                                'border transition-colors',
                                isServiceActive
                                  ? 'border-brand-gold/30 bg-white text-brand-gold'
                                  : 'border-brand-green-200/80 group-hover:border-brand-gold/25 group-hover:bg-white',
                              )}
                            />
                            <span
                              className={cn(
                                'text-sm leading-snug transition-colors',
                                isServiceActive
                                  ? 'font-semibold text-brand-gold'
                                  : 'text-brand-body group-hover:text-brand-dark',
                              )}
                            >
                              {service.name}
                            </span>
                          </Link>
                        </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] bg-neutral-50/90 px-5 py-3">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-brand-body/45">
                    Helpful Resources
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {serviceResourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-xs font-medium text-brand-body transition-all duration-200 hover:border-brand-gold/35 hover:bg-brand-green-50 hover:text-brand-gold"
                        onClick={() => setServicesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
            className={cn(
              'flex items-center gap-1.5 whitespace-nowrap font-medium text-brand-gold transition-colors hover:text-brand-gold-hover',
              isCompact ? 'text-sm' : 'text-sm xl:text-base',
            )}
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
            className="touch-target flex shrink-0 items-center justify-center rounded-md p-2 text-brand-dark transition-colors"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
    {mounted && mobileOpen
      ? createPortal(mobileMenu, document.body)
      : null}
    </>
  )
}
