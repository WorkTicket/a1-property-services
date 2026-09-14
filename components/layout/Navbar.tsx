'use client'

import { useState, useEffect, useRef, useSyncExternalStore, type ComponentProps, type KeyboardEvent as ReactKeyboardEvent, type FocusEvent as ReactFocusEvent } from 'react'
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
  BookOpen,
  ClipboardList,
  Newspaper,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import LogoMark from '@/components/ui/LogoMark'
import Button from '@/components/ui/Button'
import StickyCtaBar from '@/components/layout/StickyCtaBar'
import { allServices, type Service, getServicePageHref, getLegacyLandingPageHref, serviceNavGroups, RANKING_LANDING_PATHS } from '@/lib/services'
import { trackNavigation } from '@/lib/analytics'

function NavLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />
}

const serviceResourceLinks = [
  { label: 'Knowledge Center', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
]

const megaMenuIcons = {
  landscaping: Trees,
  'lawn-trees': TreeDeciduous,
  hardscaping: Layers,
  'site-work': Droplets,
} as const

function servicesForSlugs(slugs: readonly string[]): Service[] {
  return slugs.flatMap((slug) => {
    const match = allServices.find((service) => service.slug === slug)
    return match ? [match] : []
  })
}

const megaMenuColumns = serviceNavGroups.map((column) => ({
  ...column,
  icon: megaMenuIcons[column.key],
  services: servicesForSlugs(column.slugs),
}))

const learnMegaColumns = [
  {
    key: 'problems',
    label: 'Yard Problems',
    desc: 'Flooding, walls & turf',
    icon: Droplets,
    links: [
      { label: 'Why Yards Flood', href: '/learn/why-yard-floods-when-it-rains' },
      { label: 'Do I Need a Retaining Wall?', href: '/learn/do-i-need-a-retaining-wall' },
      { label: "Why Grass Won't Grow", href: '/learn/why-wont-grass-grow-in-my-yard' },
      { label: 'Best Grass Seed for Iowa', href: '/learn/best-grass-seed-for-iowa' },
      { label: 'Mulch vs Rock', href: '/learn/mulch-vs-rock-landscaping' },
    ],
  },
  {
    key: 'hiring',
    label: 'Hiring Advice',
    desc: 'Estimates, questions & budget',
    icon: ClipboardList,
    links: [
      { label: 'Compare Estimates', href: '/learn/comparing-landscaping-estimates' },
      { label: 'Questions Before Hiring', href: '/learn/questions-before-hiring-landscaper' },
      { label: 'Prepare for a Consultation', href: '/learn/preparing-landscaping-consultation' },
      { label: 'Budget Planning', href: '/learn/landscaping-budget-planning' },
      { label: 'Common Mistakes', href: '/learn/common-landscaping-mistakes' },
    ],
  },
  {
    key: 'projects',
    label: 'Project Guides',
    desc: 'Materials, timelines & upkeep',
    icon: BookOpen,
    links: [
      { label: 'Planning a Retaining Wall', href: '/learn/planning-retaining-wall-project' },
      { label: 'Choosing Patio Materials', href: '/learn/choosing-patio-materials' },
      { label: 'Material Comparison', href: '/learn/landscaping-material-comparison' },
      { label: 'Project Timelines', href: '/learn/landscaping-project-timelines' },
      { label: 'Seasonal Maintenance', href: '/learn/seasonal-landscape-maintenance' },
    ],
  },
  {
    key: 'library',
    label: 'Browse',
    desc: 'Guides, FAQs & articles',
    icon: Newspaper,
    links: [
      { label: 'Resources', href: '/resources' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Hydroseeding Cost', href: '/learn/hydroseeding-cost' },
      { label: 'Maintenance Expectations', href: '/learn/landscape-maintenance-expectations' },
    ],
  },
] as const

const learnFooterLinks = [
  { label: 'View all guides', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Blog', href: '/blog' },
] as const

const MEGA_CLOSE_DELAY_MS = 160

function getMegaColumns(menu: HTMLElement | null) {
  if (!menu) return []
  return Array.from(menu.querySelectorAll<HTMLElement>('[data-mega-column]')).map((column) =>
    Array.from(column.querySelectorAll<HTMLAnchorElement>('a[href]')),
  )
}

function moveMegaMenuFocus(menu: HTMLElement | null, key: string, current: Element | null) {
  const columns = getMegaColumns(menu)
  if (columns.length === 0) return false

  const col = columns.findIndex((links) => links.some((link) => link === current))
  const row = col >= 0 ? columns[col].indexOf(current as HTMLAnchorElement) : -1

  if (col < 0 || row < 0) {
    columns[0]?.[0]?.focus()
    return true
  }

  const focusAt = (nextCol: number, nextRow: number) => {
    const links = columns[nextCol]
    if (!links?.length) return false
    links[Math.max(0, Math.min(nextRow, links.length - 1))]?.focus()
    return true
  }

  switch (key) {
    case 'ArrowDown':
      return focusAt(col, row + 1 < columns[col].length ? row + 1 : 0)
    case 'ArrowUp':
      return focusAt(col, row - 1 >= 0 ? row - 1 : columns[col].length - 1)
    case 'ArrowRight':
      return focusAt((col + 1) % columns.length, row)
    case 'ArrowLeft':
      return focusAt((col - 1 + columns.length) % columns.length, row)
    case 'Home':
      return focusAt(col, 0)
    case 'End':
      return focusAt(col, columns[col].length - 1)
    default:
      return false
  }
}

function isFocusLeaving(event: ReactFocusEvent<HTMLElement>) {
  const next = event.relatedTarget
  return !(next instanceof Node && event.currentTarget.contains(next))
}

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
  const servicesTriggerRef = useRef<HTMLButtonElement>(null)
  const learnRef = useRef<HTMLLIElement>(null)
  const learnMenuRef = useRef<HTMLDivElement>(null)
  const learnTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileToggleRef = useRef<HTMLButtonElement>(null)
  const mobileServicesPanelRef = useRef<HTMLDivElement>(null)
  const mobileLearnPanelRef = useRef<HTMLDivElement>(null)
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const learnCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const focusServicesFirst = useRef(false)
  const focusLearnFirst = useRef(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const [headerHeight, setHeaderHeight] = useState(84)

  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setMobileOpen(false)
    setMobileServicesOpen(false)
    setMobileLearnOpen(false)
    setServicesOpen(false)
    setLearnOpen(false)
  }

  const isServicesActive =
    pathname.startsWith('/services') ||
    (RANKING_LANDING_PATHS as readonly string[]).includes(pathname)
  const isLearnActive =
    pathname.startsWith('/learn') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/resources') ||
    pathname === '/faqs'

  const openServicesMenu = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    setLearnOpen(false)
    setServicesOpen(true)
  }

  const closeServicesMenu = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), MEGA_CLOSE_DELAY_MS)
  }

  const openLearnMenu = () => {
    if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    setServicesOpen(false)
    setLearnOpen(true)
  }

  const closeLearnMenu = () => {
    if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    learnCloseTimer.current = setTimeout(() => setLearnOpen(false), MEGA_CLOSE_DELAY_MS)
  }

  const openServicesFromKeyboard = () => {
    focusServicesFirst.current = true
    openServicesMenu()
  }

  const openLearnFromKeyboard = () => {
    focusLearnFirst.current = true
    openLearnMenu()
  }

  const handleServicesTriggerKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab' && !event.shiftKey && servicesOpen) {
      const first = servicesMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')
      if (first) {
        event.preventDefault()
        first.focus()
      }
      return
    }
    if (event.key !== 'ArrowDown') return
    event.preventDefault()
    if (servicesOpen) {
      servicesMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus()
      return
    }
    openServicesFromKeyboard()
  }

  const handleLearnTriggerKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Tab' && !event.shiftKey && learnOpen) {
      const first = learnMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')
      if (first) {
        event.preventDefault()
        first.focus()
      }
      return
    }
    if (event.key !== 'ArrowDown') return
    event.preventDefault()
    if (learnOpen) {
      learnMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus()
      return
    }
    openLearnFromKeyboard()
  }

  const handleServicesBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!isFocusLeaving(event)) return
    window.requestAnimationFrame(() => {
      if (!servicesRef.current?.contains(document.activeElement)) {
        setServicesOpen(false)
      }
    })
  }

  const handleLearnBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!isFocusLeaving(event)) return
    window.requestAnimationFrame(() => {
      if (!learnRef.current?.contains(document.activeElement)) {
        setLearnOpen(false)
      }
    })
  }

  const handleServicesMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      setServicesOpen(false)
      servicesTriggerRef.current?.focus()
      return
    }
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      moveMegaMenuFocus(servicesMenuRef.current, event.key, event.target as Element)
    }
  }

  const handleLearnMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      setLearnOpen(false)
      learnTriggerRef.current?.focus()
      return
    }
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      moveMegaMenuFocus(learnMenuRef.current, event.key, event.target as Element)
    }
  }

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
      if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
    }
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
      if (mobileOpen) {
        setMobileOpen(false)
        return
      }
      if (servicesOpen) {
        setServicesOpen(false)
        servicesTriggerRef.current?.focus()
        return
      }
      if (learnOpen) {
        setLearnOpen(false)
        learnTriggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen, servicesOpen, learnOpen])

  useEffect(() => {
    if (!servicesOpen) return
    if (!focusServicesFirst.current) return
    focusServicesFirst.current = false
    const frame = window.requestAnimationFrame(() => {
      servicesMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [servicesOpen])

  useEffect(() => {
    if (!learnOpen) return
    if (!focusLearnFirst.current) return
    focusLearnFirst.current = false
    const frame = window.requestAnimationFrame(() => {
      learnMenuRef.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [learnOpen])

  useEffect(() => {
    servicesMenuRef.current?.toggleAttribute('inert', !servicesOpen)
  }, [servicesOpen])

  useEffect(() => {
    learnMenuRef.current?.toggleAttribute('inert', !learnOpen)
  }, [learnOpen])

  useEffect(() => {
    mobileServicesPanelRef.current?.toggleAttribute('inert', !mobileServicesOpen)
  }, [mobileServicesOpen])

  useEffect(() => {
    mobileLearnPanelRef.current?.toggleAttribute('inert', !mobileLearnOpen)
  }, [mobileLearnOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const dialog = document.getElementById('mobile-nav-menu')
    const toggle = mobileToggleRef.current
    const previous = document.activeElement as HTMLElement | null

    const getFocusable = () => {
      const dialogItems = dialog
        ? Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
            (element) => !element.closest('[inert]'),
          )
        : []
      const sticky = document.querySelector<HTMLElement>('.sticky-cta-bar--fixed')
      const stickyVisible = Boolean(sticky && getComputedStyle(sticky).display !== 'none')
      const stickyItems = stickyVisible
        ? Array.from(sticky!.querySelectorAll<HTMLElement>('a[href]'))
        : []
      return [toggle, ...dialogItems, ...stickyItems].filter((element): element is HTMLElement => Boolean(element))
    }

    const frame = window.requestAnimationFrame(() => {
      getFocusable()[1]?.focus()
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      if (previous && document.contains(previous)) previous.focus()
      else toggle?.focus()
    }
  }, [mobileOpen])

  useEffect(() => {
    const header = headerRef.current
    const sticky = document.querySelector<HTMLElement>('.sticky-cta-bar--fixed')
    if (!mobileOpen) {
      document.documentElement.style.removeProperty('overflow')
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
      document.body.removeAttribute('data-mobile-overlay')
      header?.style.removeProperty('padding-right')
      sticky?.style.removeProperty('padding-right')
      return
    }

    const gap = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
    const gapPx = gap ? `${gap}px` : ''
    document.documentElement.style.overflow = 'hidden'
    document.body.style.paddingRight = gapPx
    document.body.style.overflow = 'hidden'
    document.body.setAttribute('data-mobile-overlay', 'true')
    if (header) header.style.paddingRight = gapPx
    if (sticky) sticky.style.paddingRight = gapPx

    return () => {
      document.documentElement.style.removeProperty('overflow')
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
      document.body.removeAttribute('data-mobile-overlay')
      header?.style.removeProperty('padding-right')
      sticky?.style.removeProperty('padding-right')
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (target?.closest('.sticky-cta-bar--fixed')) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
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
      if (learnRef.current && !learnRef.current.contains(target) && !learnMenuRef.current?.contains(target)) {
        if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
        setLearnOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const linkClass = (active: boolean) =>
    cn(
      'relative whitespace-nowrap text-sm font-semibold tracking-[-0.01em] transition-colors duration-200',
      active ? 'text-white' : 'text-white/85 hover:text-white',
    )

  const linkUnderline = (active: boolean) =>
    active ? 'after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-brand-gold' : ''

  const megaLinkClass = (active: boolean) =>
    cn(
      'group flex items-center justify-between gap-2 rounded-md px-2 py-2 text-[0.8125rem] font-medium leading-snug transition-colors focus-visible:bg-white/10',
      active
        ? 'bg-white/10 font-semibold text-brand-gold'
        : 'text-white/75 hover:bg-white/[0.08] hover:text-white',
    )

  const mobileLinkClass = (active: boolean) =>
    cn(
      'block py-3 text-lg font-semibold transition-colors',
      active ? 'text-white' : 'text-white/80 hover:text-white',
    )

  const mobileSubLinkClass = (active: boolean) =>
    cn(
      'block py-2 text-[0.9375rem] transition-colors',
      active ? 'font-semibold text-brand-gold' : 'text-white/70 hover:text-white',
    )

  const mobileMenu = (
    <div
      id="mobile-nav-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden bg-brand-dark lg:hidden"
      style={{ top: headerHeight }}
    >
      <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] pt-6 md:pb-4">
        <li>
          <NavLink
            href="/"
            className={mobileLinkClass(pathname === '/')}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile Home') }}
          >
            Home
          </NavLink>
        </li>

        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-lg font-semibold text-white"
            onClick={() => setMobileServicesOpen((open) => !open)}
            aria-expanded={mobileServicesOpen}
            aria-controls="mobile-services-submenu"
          >
            Services
            <ChevronDown
              size={18}
              className={cn('text-white/45 transition-transform', mobileServicesOpen && 'rotate-180')}
              aria-hidden
            />
          </button>
          <div
            ref={mobileServicesPanelRef}
            id="mobile-services-submenu"
            className={cn(
              'grid transition-all duration-300 ease-premium',
              mobileServicesOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden border-l border-white/10 pl-4">
              <NavLink
                href="/services"
                className={mobileSubLinkClass(pathname === '/services')}
                onClick={() => { setMobileOpen(false); trackNavigation('Mobile All Services') }}
              >
                View all services
              </NavLink>
              {megaMenuColumns.map((column) => (
                <div key={column.key} className="pt-3">
                  <p className="pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {column.label}
                  </p>
                  {column.services.map((service) => (
                    <NavLink
                      key={service.slug}
                      href={getLegacyLandingPageHref(service.slug) ?? getServicePageHref(service.slug)}
                      className={mobileSubLinkClass(
                        pathname === `/services/${service.slug}` ||
                        pathname === getLegacyLandingPageHref(service.slug),
                      )}
                      onClick={() => { setMobileOpen(false); trackNavigation(`Mobile ${service.name}`) }}
                    >
                      {service.name}
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </li>

        <li>
          <NavLink
            href="/gallery"
            className={mobileLinkClass(pathname === '/gallery')}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile Gallery') }}
          >
            Gallery
          </NavLink>
        </li>

        <li>
          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-lg font-semibold text-white"
            onClick={() => setMobileLearnOpen((open) => !open)}
            aria-expanded={mobileLearnOpen}
            aria-controls="mobile-learn-submenu"
          >
            Learn
            <ChevronDown
              size={18}
              className={cn('text-white/45 transition-transform', mobileLearnOpen && 'rotate-180')}
              aria-hidden
            />
          </button>
          <div
            ref={mobileLearnPanelRef}
            id="mobile-learn-submenu"
            className={cn(
              'grid transition-all duration-300 ease-premium',
              mobileLearnOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden border-l border-white/10 pl-4">
              <NavLink
                href="/learn"
                className={mobileSubLinkClass(pathname === '/learn')}
                onClick={() => { setMobileOpen(false); trackNavigation('Mobile All Guides') }}
              >
                All Guides
              </NavLink>
              {learnMegaColumns.map((column) => (
                <div key={column.key} className="pt-3">
                  <p className="pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/40">
                    {column.label}
                  </p>
                  {column.links.map((link) => (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      className={mobileSubLinkClass(pathname === link.href)}
                      onClick={() => { setMobileOpen(false); trackNavigation(`Mobile ${link.label}`) }}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </li>

        <li>
          <NavLink
            href="/about"
            className={mobileLinkClass(pathname === '/about')}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile About') }}
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            href="/contact"
            className={mobileLinkClass(pathname === '/contact')}
            onClick={() => { setMobileOpen(false); trackNavigation('Mobile Contact') }}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="hidden shrink-0 md:block lg:hidden">
        <StickyCtaBar embedded onNavigate={() => setMobileOpen(false)} />
      </div>
    </div>
  )

  const desktopServicesMenu = (
    <div
      ref={servicesMenuRef}
      id="desktop-services-menu"
      role="region"
      aria-label="Services"
      className={cn(
        'absolute inset-x-0 top-[calc(100%-1px)] z-40 hidden lg:block',
        servicesOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      onMouseEnter={openServicesMenu}
      onMouseLeave={closeServicesMenu}
      onKeyDown={handleServicesMenuKeyDown}
      aria-hidden={servicesOpen ? undefined : true}
    >
      <div
        className={cn(
          'border-b border-white/10 bg-brand-dark shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]',
          servicesOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-4 px-4 py-6 sm:px-6 lg:px-8">
          {megaMenuColumns.map((column, index) => {
            const ColumnIcon = column.icon
            return (
              <div
                key={column.key}
                data-mega-column
                className={cn(
                  'min-w-0 px-3 lg:px-5',
                  index > 0 && 'border-l border-white/10',
                )}
              >
                <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                    <ColumnIcon size={15} strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h2
                      id={`services-menu-${column.key}`}
                      className="font-display text-sm font-bold leading-tight text-white"
                    >
                      {column.label}
                    </h2>
                    <p className="mt-0.5 text-[0.6875rem] leading-snug text-white/45">
                      {column.desc}
                    </p>
                  </div>
                </div>
                <ul aria-labelledby={`services-menu-${column.key}`}>
                  {column.services.map((service) => {
                    const isServiceActive =
                      pathname === `/services/${service.slug}` ||
                      pathname === getLegacyLandingPageHref(service.slug)

                    return (
                      <li key={service.slug}>
                        <NavLink
                          href={getLegacyLandingPageHref(service.slug) ?? getServicePageHref(service.slug)}
                          className={megaLinkClass(isServiceActive)}
                          aria-current={isServiceActive ? 'page' : undefined}
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
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="border-t border-white/10 bg-black/40">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-8">
            <div data-mega-column className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              <NavLink
                href="/services"
                className={cn(
                  'font-semibold transition-colors hover:text-brand-gold',
                  pathname === '/services'
                    ? 'text-brand-gold'
                    : 'text-white',
                )}
                aria-current={pathname === '/services' ? 'page' : undefined}
                onClick={() => { setServicesOpen(false); trackNavigation('Nav All Services') }}
              >
                View all services
              </NavLink>
              {serviceResourceLinks.map((link) => (
                <span key={link.href} className="flex items-center gap-3">
                  <span className="text-white/25" aria-hidden>
                    ·
                  </span>
                  <NavLink
                    href={link.href}
                    className="font-medium text-white/65 transition-colors hover:text-brand-gold"
                    onClick={() => setServicesOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </span>
              ))}
            </div>
            <NavLink
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold"
              onClick={() => setServicesOpen(false)}
            >
              {CTA_COPY.quote}
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )

  const desktopLearnMenu = (
    <div
      ref={learnMenuRef}
      id="desktop-learn-menu"
      role="region"
      aria-label="Guides"
      className={cn(
        'absolute inset-x-0 top-[calc(100%-1px)] z-40 hidden lg:block',
        learnOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      onMouseEnter={openLearnMenu}
      onMouseLeave={closeLearnMenu}
      onKeyDown={handleLearnMenuKeyDown}
      aria-hidden={learnOpen ? undefined : true}
    >
      <div
        className={cn(
          'border-b border-white/10 bg-brand-dark shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]',
          learnOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-4 px-4 py-6 sm:px-6 lg:px-8">
          {learnMegaColumns.map((column, index) => {
            const ColumnIcon = column.icon
            return (
              <div
                key={column.key}
                data-mega-column
                className={cn(
                  'min-w-0 px-3 lg:px-5',
                  index > 0 && 'border-l border-white/10',
                )}
              >
                <div className="mb-3 flex items-center gap-2.5 border-b border-white/10 pb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                    <ColumnIcon size={15} strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h2
                      id={`learn-menu-${column.key}`}
                      className="font-display text-sm font-bold leading-tight text-white"
                    >
                      {column.label}
                    </h2>
                    <p className="mt-0.5 text-[0.6875rem] leading-snug text-white/45">
                      {column.desc}
                    </p>
                  </div>
                </div>
                <ul aria-labelledby={`learn-menu-${column.key}`}>
                  {column.links.map((link) => {
                    const isLinkActive = pathname === link.href

                    return (
                      <li key={link.href}>
                        <NavLink
                          href={link.href}
                          className={megaLinkClass(isLinkActive)}
                          aria-current={isLinkActive ? 'page' : undefined}
                          onClick={() => { setLearnOpen(false); trackNavigation(link.label) }}
                        >
                          <span>{link.label}</span>
                          <ArrowRight
                            size={12}
                            className={cn(
                              'shrink-0 opacity-0 transition-all',
                              isLinkActive
                                ? 'opacity-100'
                                : 'group-hover:translate-x-0.5 group-hover:opacity-60',
                            )}
                            aria-hidden
                          />
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="border-t border-white/10 bg-black/40">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-8">
            <div data-mega-column className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
              {learnFooterLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span className="text-white/25" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <NavLink
                    href={link.href}
                    className={cn(
                      'font-semibold transition-colors hover:text-brand-gold',
                      index === 0
                        ? pathname === link.href
                          ? 'text-brand-gold'
                          : 'text-white'
                        : 'font-medium text-white/65',
                    )}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    onClick={() => { setLearnOpen(false); trackNavigation(`Nav ${link.label}`) }}
                  >
                    {link.label}
                  </NavLink>
                </span>
              ))}
            </div>
            <NavLink
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-gold"
              onClick={() => setLearnOpen(false)}
            >
              {CTA_COPY.quote}
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 overflow-visible border-b border-white/10 bg-brand-dark shadow-[0_8px_30px_-18px_rgba(13,13,13,0.45)]"
    >
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-stretch lg:gap-8 lg:px-8 lg:py-3.5"
      >
        <NavLink prefetch={false} href="/" className="flex min-w-0 items-center gap-2.5 lg:col-start-1 lg:row-start-1" aria-label="A1 Property Services home">
          <LogoMark size="md" />
          <span
            className="truncate text-[0.9375rem] font-bold leading-tight tracking-[-0.02em] text-white sm:text-base lg:text-lg"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            A1 Property Services
          </span>
        </NavLink>

        <ul className="hidden self-stretch items-center justify-center gap-x-6 xl:gap-x-8 lg:flex">
          <li
            ref={servicesRef}
            className="flex self-stretch items-center"
            onMouseEnter={openServicesMenu}
            onMouseLeave={closeServicesMenu}
            onBlur={handleServicesBlur}
          >
            <div className="relative inline-flex items-center">
              <NavLink
                href="/services"
                className={cn(linkClass(isServicesActive || servicesOpen), 'inline-flex items-center', linkUnderline(isServicesActive))}
                onKeyDown={handleServicesTriggerKeyDown}
                onClick={() => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  setLearnOpen(false)
                  setServicesOpen(false)
                  trackNavigation('Services')
                }}
              >
                Services
              </NavLink>
              <button
                ref={servicesTriggerRef}
                type="button"
                className={cn(
                  linkClass(isServicesActive || servicesOpen),
                  'ml-0.5 inline-flex min-h-9 min-w-9 items-center justify-center rounded-md',
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="desktop-services-menu"
                aria-label="Services menu"
                onKeyDown={handleServicesTriggerKeyDown}
                onClick={(event) => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  setLearnOpen(false)
                  if (event.detail === 0) {
                    setServicesOpen((open) => !open)
                    return
                  }
                  setServicesOpen(true)
                }}
              >
                <ChevronDown
                  size={14}
                  className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
            </div>
            {desktopServicesMenu}
          </li>

          <li>
            <NavLink
              href="/gallery"
              className={cn(linkClass(pathname === '/gallery'), linkUnderline(pathname === '/gallery'))}
              onClick={() => trackNavigation('Gallery')}
            >
              Gallery
            </NavLink>
          </li>

          <li
            ref={learnRef}
            className="flex self-stretch items-center"
            onMouseEnter={openLearnMenu}
            onMouseLeave={closeLearnMenu}
            onBlur={handleLearnBlur}
          >
            <div className="relative inline-flex items-center">
              <NavLink
                href="/learn"
                className={cn(linkClass(isLearnActive || learnOpen), 'inline-flex items-center', linkUnderline(isLearnActive))}
                onKeyDown={handleLearnTriggerKeyDown}
                onClick={() => {
                  if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
                  setServicesOpen(false)
                  setLearnOpen(false)
                  trackNavigation('Learn')
                }}
              >
                Learn
              </NavLink>
              <button
                ref={learnTriggerRef}
                type="button"
                className={cn(
                  linkClass(isLearnActive || learnOpen),
                  'ml-0.5 inline-flex min-h-9 min-w-9 items-center justify-center rounded-md',
                )}
                aria-expanded={learnOpen}
                aria-haspopup="true"
                aria-controls="desktop-learn-menu"
                aria-label="Learn menu"
                onKeyDown={handleLearnTriggerKeyDown}
                onClick={(event) => {
                  if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
                  setServicesOpen(false)
                  if (event.detail === 0) {
                    setLearnOpen((open) => !open)
                    return
                  }
                  setLearnOpen(true)
                }}
              >
                <ChevronDown
                  size={14}
                  className={cn('transition-transform duration-200', learnOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
            </div>
            {desktopLearnMenu}
          </li>

          <li>
            <NavLink
              href="/about"
              className={cn(linkClass(pathname === '/about'), linkUnderline(pathname === '/about'))}
              onClick={() => trackNavigation('About')}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              href="/contact"
              className={cn(linkClass(pathname === '/contact'), linkUnderline(pathname === '/contact'))}
              onClick={() => trackNavigation('Contact')}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="hidden shrink-0 items-center gap-4 lg:flex lg:self-stretch xl:gap-5">
          <span className="hidden h-4 w-px bg-white/20 lg:block" aria-hidden />
          <a
            href={`tel:${siteConfig.phone}`}
            data-track-phone="Navbar Desktop"
            className="flex items-center gap-2 whitespace-nowrap text-[0.8125rem] font-semibold text-brand-gold transition-colors hover:text-brand-gold-light"
          >
            <Phone size={15} className="shrink-0 text-brand-gold" aria-hidden />
            <span className="hidden xl:inline">{siteConfig.phoneDisplay}</span>
          </a>
          <Button href="/contact" size="sm" className="whitespace-nowrap">
            {CTA_COPY.quote}
          </Button>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 lg:hidden">
          <a
            href={`tel:${siteConfig.phone}`}
            data-track-phone="Navbar Mobile"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-brand-gold transition-colors hover:bg-white/10"
            aria-label="Call us"
          >
            <Phone size={18} aria-hidden />
          </a>
          <button
            ref={mobileToggleRef}
            type="button"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-brand-gold transition-colors hover:bg-white/10"
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
    {mounted && mobileOpen
      ? createPortal(mobileMenu, document.body)
      : null}
    </>
  )
}
