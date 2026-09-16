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
  Library,
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

const MEGA_MENU_ROWS = 6
const MEGA_CLOSE_DELAY_MS = 90

const megaMenuIcons = {
  landscaping: Trees,
  'lawn-trees': TreeDeciduous,
  hardscaping: Layers,
  'site-work': Droplets,
} as const

const serviceMegaCopy = {
  landscaping: { label: 'Yards & Gardens', desc: 'New yards, planting, and upkeep' },
  'lawn-trees': { label: 'Lawn & Trees', desc: 'Grass, sod, trees, and hedges' },
  hardscaping: { label: 'Patios & Walls', desc: 'Patios, driveways, outdoor living' },
  'site-work': { label: 'Water & Snow', desc: 'Flooding, grading, and winter snow' },
} as const

const serviceNavLabels: Record<string, string> = {
  'landscape-design': 'Yard Design',
  'landscape-installation': 'Planting & Install',
  'lawn-care': 'Lawn Mowing & Care',
  'residential-landscaping': 'Home Landscaping',
  'landscape-maintenance': 'Yard Upkeep',
  'preservation-restoration': 'Overgrown Yard',
  'shrub-installation': 'Bushes & Hedges',
  'rock-landscaping': 'Rock Beds',
  drainage: 'Stop Yard Flooding',
  grading: 'Level the Yard',
  excavation: 'Digging & Site Prep',
  'commercial-landscaping': 'Business Properties',
  hydroseeding: 'New Grass From Seed',
  'sod-installation': 'New Sod Lawn',
  'tree-service': 'Tree Trimming',
  'tree-planting': 'Plant New Trees',
  'paver-patio': 'Paver Patio',
  'paver-driveway': 'Paver Driveway',
  'retaining-walls': 'Retaining Wall',
  'outdoor-living': 'Fire Pit & Kitchen',
  'ponds-water-features': 'Pond or Waterfall',
  'snow-removal': 'Snow Removal',
  mulching: 'Mulch for Flower Beds',
}

const serviceNavHints: Record<string, string> = {
  'landscape-design': 'A plan before we start',
  'landscape-installation': 'We plant and build it',
  'residential-landscaping': 'Whole yard, start to finish',
  'landscape-maintenance': 'Keep the yard looking nice',
  'preservation-restoration': 'Clean up a neglected yard',
  mulching: 'Tidier beds, fewer weeds',
  'lawn-care': 'Mowing, feeding, and weeds',
  'sod-installation': 'A green lawn right away',
  hydroseeding: 'Grow grass on bare spots',
  'tree-service': 'Trim, remove, or grind stumps',
  'tree-planting': 'Shade and privacy',
  'shrub-installation': 'Hedges and foundation plants',
  'paver-patio': 'A patio for everyday use',
  'paver-driveway': 'A driveway that holds up',
  'retaining-walls': 'Hold a slope in place',
  'outdoor-living': 'A backyard you can sit in',
  'ponds-water-features': 'Water in the yard',
  'rock-landscaping': 'Low-upkeep stone beds',
  drainage: 'Get rid of standing water',
  grading: 'Slope water away from home',
  excavation: 'Clear and prep the ground',
  'commercial-landscaping': 'Offices, shops, and HOAs',
  'snow-removal': 'Drives, walks, and lots',
}

function serviceNavName(service: Service) {
  return serviceNavLabels[service.slug] ?? service.name
}

function servicesForSlugs(slugs: readonly string[]): Service[] {
  return slugs.flatMap((slug) => {
    const match = allServices.find((service) => service.slug === slug)
    return match ? [match] : []
  })
}

const megaMenuColumns = serviceNavGroups.map((column) => ({
  ...column,
  label: serviceMegaCopy[column.key].label,
  desc: serviceMegaCopy[column.key].desc,
  icon: megaMenuIcons[column.key],
  services: servicesForSlugs(column.slugs),
}))

const learnMegaColumns = [
  {
    key: 'problems',
    label: 'Yard Problems',
    desc: 'Flooding, thin grass, and slopes',
    icon: Droplets,
    links: [
      { label: 'Why yards flood', hint: 'Standing water after rain', href: '/learn/why-yard-floods-when-it-rains' },
      { label: 'Do I need a wall?', hint: 'When a slope needs support', href: '/learn/do-i-need-a-retaining-wall' },
      { label: "Why grass won't grow", hint: 'Bare spots and thin lawns', href: '/learn/why-wont-grass-grow-in-my-yard' },
      { label: 'Best grass for Iowa', hint: 'Iowa-tough grass seed', href: '/learn/best-grass-seed-for-iowa' },
      { label: 'Mulch or rock?', hint: 'Which is easier to keep up', href: '/learn/mulch-vs-rock-landscaping' },
      { label: 'New lawn cost', hint: 'What hydroseeding may cost', href: '/learn/hydroseeding-cost' },
    ],
  },
  {
    key: 'hiring',
    label: 'Before You Hire',
    desc: 'Estimates, questions, and budget',
    icon: ClipboardList,
    links: [
      { label: 'Compare estimates', hint: 'How to compare two bids', href: '/learn/comparing-landscaping-estimates' },
      { label: 'Questions to ask', hint: 'What to ask before you hire', href: '/learn/questions-before-hiring-landscaper' },
      { label: 'Prepare for a visit', hint: 'Get ready for an estimate', href: '/learn/preparing-landscaping-consultation' },
      { label: 'Plan your budget', hint: 'What the work usually costs', href: '/learn/landscaping-budget-planning' },
      { label: 'Common mistakes', hint: 'What to avoid on a project', href: '/learn/common-landscaping-mistakes' },
      { label: 'After the work is done', hint: 'What upkeep usually means', href: '/learn/landscape-maintenance-expectations' },
    ],
  },
  {
    key: 'projects',
    label: 'Project Guides',
    desc: 'Materials, time, and upkeep',
    icon: BookOpen,
    links: [
      { label: 'Plan a retaining wall', hint: 'Steps before you build', href: '/learn/planning-retaining-wall-project' },
      { label: 'Choose patio materials', hint: 'Pavers, stone, and more', href: '/learn/choosing-patio-materials' },
      { label: 'Compare materials', hint: 'What lasts in Iowa weather', href: '/learn/landscaping-material-comparison' },
      { label: 'How long jobs take', hint: 'Typical project timelines', href: '/learn/landscaping-project-timelines' },
      { label: 'Seasonal upkeep', hint: 'Spring through winter care', href: '/learn/seasonal-landscape-maintenance' },
    ],
  },
  {
    key: 'library',
    label: 'More Help',
    desc: 'Guides, answers, and photos',
    icon: Library,
    links: [
      { label: 'All guides', hint: 'Every article in one place', href: '/learn' },
      { label: 'Common questions', hint: 'Short answers, no jargon', href: '/faqs' },
      { label: 'Blog', hint: 'News and yard tips', href: '/blog' },
      { label: 'Resource library', hint: 'Checklists and extras', href: '/resources' },
      { label: 'See our work', hint: 'Photos of finished work', href: '/gallery' },
      { label: 'Ask a question', hint: "We'll help you decide", href: '/contact' },
    ],
  },
] as const

type MegaMenuLinkItem = {
  label: string
  hint?: string
  href: string
  active?: boolean
  onSelect: () => void
}

type MegaMenuColumnItem = {
  key: string
  label: string
  desc: string
  icon: typeof Trees
  headingId: string
  links: MegaMenuLinkItem[]
}

function megaLinkClass(active: boolean) {
  return cn(
    'group flex min-h-12 items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors focus-visible:bg-white/15',
    active ? 'bg-white/15' : 'hover:bg-white/10',
  )
}

function MegaMenuLink({ link }: { link: MegaMenuLinkItem }) {
  return (
    <NavLink
      href={link.href}
      className={megaLinkClass(Boolean(link.active))}
      aria-current={link.active ? 'page' : undefined}
      onClick={link.onSelect}
    >
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block truncate text-[0.9375rem] font-semibold leading-snug',
            link.active ? 'text-brand-gold-light' : 'text-white',
          )}
        >
          {link.label}
        </span>
        {link.hint ? (
          <span className="mt-0.5 block truncate text-[0.8125rem] leading-snug text-white/75">
            {link.hint}
          </span>
        ) : null}
      </span>
      <ArrowRight
        size={16}
        className={cn(
          'shrink-0',
          link.active ? 'text-brand-gold-light' : 'text-white/55 group-hover:text-white',
        )}
        aria-hidden
      />
    </NavLink>
  )
}

function MegaMenuPanel({
  menuRef,
  id,
  ariaLabel,
  open,
  intro,
  columns,
  footerLinks,
  onQuoteClick,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
}: {
  menuRef: { current: HTMLDivElement | null }
  id: string
  ariaLabel: string
  open: boolean
  intro: string
  columns: MegaMenuColumnItem[]
  footerLinks: MegaMenuLinkItem[]
  onQuoteClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void
}) {
  return (
    <div
      ref={menuRef}
      id={id}
      role="region"
      aria-label={ariaLabel}
      className={cn(
        'absolute inset-x-0 top-full z-40 hidden lg:block',
        'before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-[\'\']',
        open ? 'pointer-events-auto z-50' : 'pointer-events-none z-40',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      aria-hidden={open ? undefined : true}
    >
      <div
        className={cn(
          'border-b border-white/10 bg-brand-dark shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium leading-snug text-white/85">
            {intro}
          </p>
          <div className="mt-3 grid min-h-[24.5rem] grid-cols-4 items-stretch">
            {columns.map((column, index) => {
              const ColumnIcon = column.icon
              const slots = Array.from({ length: MEGA_MENU_ROWS }, (_, slot) => column.links[slot] ?? null)

              return (
                <div
                  key={column.key}
                  data-mega-column
                  className={cn('flex min-w-0 flex-col px-3 lg:px-5', index > 0 && 'border-l border-white/15')}
                >
                  <div className="mb-2 flex shrink-0 items-start gap-3 border-b border-white/15 pb-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-gold-light">
                      <ColumnIcon size={20} strokeWidth={2} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h2
                        id={column.headingId}
                        className="font-display text-lg font-bold leading-tight text-white"
                      >
                        {column.label}
                      </h2>
                      <p className="mt-1 truncate text-sm leading-snug text-white/75">
                        {column.desc}
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-1 flex-col" aria-labelledby={column.headingId}>
                    {slots.map((link, slot) => (
                      <li key={link?.href ?? `${column.key}-empty-${slot}`}>
                        {link ? <MegaMenuLink link={link} /> : <div className="min-h-12" />}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-white/15 bg-black/40">
          <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-8">
            <div data-mega-column className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-[0.9375rem]">
              {footerLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  {index > 0 ? (
                    <span className="text-white/35" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <NavLink
                    href={link.href}
                    className={cn(
                      'rounded-md py-1 font-semibold transition-colors hover:text-brand-gold-light',
                      index === 0
                        ? link.active
                          ? 'text-brand-gold-light'
                          : 'text-white'
                        : 'font-medium text-white/80',
                    )}
                    aria-current={link.active ? 'page' : undefined}
                    onClick={link.onSelect}
                  >
                    {link.label}
                  </NavLink>
                </span>
              ))}
            </div>
            <NavLink
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md bg-brand-gold px-4 text-[0.9375rem] font-semibold text-white hover:bg-brand-gold-hover"
              onClick={onQuoteClick}
            >
              {CTA_COPY.quote}
              <ArrowRight size={16} aria-hidden />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const [desktopMenusReady, setDesktopMenusReady] = useState(false)

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
    setDesktopMenusReady(true)
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
    setDesktopMenusReady(true)
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
      if (!servicesRef.current?.contains(document.activeElement) && !servicesMenuRef.current?.contains(document.activeElement)) {
        setServicesOpen(false)
      }
    })
  }

  const handleLearnBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!isFocusLeaving(event)) return
    window.requestAnimationFrame(() => {
      if (!learnRef.current?.contains(document.activeElement) && !learnMenuRef.current?.contains(document.activeElement)) {
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
    let idleId = 0
    let timeoutId = 0
    let mq: MediaQueryList | undefined
    const enable = () => {
      if (mq && !mq.matches) return
      setDesktopMenusReady(true)
    }
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(enable, { timeout: 2200 })
      } else {
        timeoutId = globalThis.setTimeout(enable, 400) as unknown as number
      }
    }
    try {
      mq = window.matchMedia('(min-width: 1024px)')
      if (mq.matches) schedule()
      mq.addEventListener('change', schedule)
    } catch {
      schedule()
    }
    return () => {
      mq?.removeEventListener('change', schedule)
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
      if (timeoutId) globalThis.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height)
      setHeaderHeight(height)
      document.documentElement.style.setProperty('--header-offset', `${height}px`)
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
      'relative inline-flex items-center whitespace-nowrap text-sm font-semibold tracking-[-0.01em] transition-colors duration-150',
      active ? 'text-white' : 'text-white/90 hover:text-white',
    )

  const linkUnderline = (active: boolean) =>
    active ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-brand-gold' : ''

  const mobileLinkClass = (active: boolean) =>
    cn(
      'block py-3 text-lg font-semibold transition-colors',
      active ? 'text-white' : 'text-white/80 hover:text-white',
    )

  const mobileSubLinkClass = (active: boolean) =>
    cn(
      'block py-2.5 text-base leading-snug transition-colors',
      active ? 'font-semibold text-brand-gold-light' : 'text-white/90 hover:text-white',
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
              size={22}
              className={cn('text-white/70 transition-transform', mobileServicesOpen && 'rotate-180')}
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
                <div key={column.key} className="pt-4">
                  <p className="text-base font-semibold text-white">
                    {column.label}
                  </p>
                  <p className="pb-2 text-sm text-white/75">{column.desc}</p>
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
                      <span className="block truncate">{serviceNavName(service)}</span>
                      {serviceNavHints[service.slug] ? (
                        <span className="mt-0.5 block truncate text-sm font-normal text-white/70">
                          {serviceNavHints[service.slug]}
                        </span>
                      ) : null}
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
              size={22}
              className={cn('text-white/70 transition-transform', mobileLearnOpen && 'rotate-180')}
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
              {learnMegaColumns.map((column) => {
                const mobileLinks = column.links.filter((link) => {
                  if (column.key !== 'library') return true
                  return link.href !== '/learn' && link.href !== '/gallery' && link.href !== '/contact'
                })

                return (
                  <div key={column.key} className="pt-4">
                    <p className="text-base font-semibold text-white">
                      {column.label}
                    </p>
                    <p className="pb-2 text-sm text-white/75">{column.desc}</p>
                    {mobileLinks.map((link) => (
                      <NavLink
                        key={link.href}
                        href={link.href}
                        className={mobileSubLinkClass(pathname === link.href)}
                        onClick={() => { setMobileOpen(false); trackNavigation(`Mobile ${link.label}`) }}
                      >
                        <span className="block truncate">{link.label}</span>
                        {link.hint ? (
                          <span className="mt-0.5 block truncate text-sm font-normal text-white/70">
                            {link.hint}
                          </span>
                        ) : null}
                      </NavLink>
                    ))}
                  </div>
                )
              })}
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

  const serviceMegaColumns: MegaMenuColumnItem[] = megaMenuColumns.map((column) => ({
    key: column.key,
    label: column.label,
    desc: column.desc,
    icon: column.icon,
    headingId: `services-menu-${column.key}`,
    links: column.services.map((service) => {
      const href = getLegacyLandingPageHref(service.slug) ?? getServicePageHref(service.slug)
      const active =
        pathname === `/services/${service.slug}` ||
        pathname === getLegacyLandingPageHref(service.slug)

      return {
        label: serviceNavName(service),
        hint: serviceNavHints[service.slug],
        href,
        active,
        onSelect: () => setServicesOpen(false),
      }
    }),
  }))

  const learnMenuColumns: MegaMenuColumnItem[] = learnMegaColumns.map((column) => ({
    key: column.key,
    label: column.label,
    desc: column.desc,
    icon: column.icon,
    headingId: `learn-menu-${column.key}`,
    links: column.links.map((link) => ({
      label: link.label,
      hint: link.hint,
      href: link.href,
      active: pathname === link.href,
      onSelect: () => {
        setLearnOpen(false)
        trackNavigation(link.label)
      },
    })),
  }))

  const desktopServicesMenu = (
    <MegaMenuPanel
      menuRef={servicesMenuRef}
      id="desktop-services-menu"
      ariaLabel="Services"
      open={servicesOpen}
      intro="Need help choosing? Pick a group, then a service. Or get a free quote."
      columns={serviceMegaColumns}
      footerLinks={[
        {
          label: 'View all services',
          href: '/services',
          active: pathname === '/services',
          onSelect: () => {
            setServicesOpen(false)
            trackNavigation('Nav All Services')
          },
        },
        {
          label: 'See our work',
          href: '/gallery',
          active: pathname === '/gallery',
          onSelect: () => setServicesOpen(false),
        },
      ]}
      onQuoteClick={() => setServicesOpen(false)}
      onMouseEnter={openServicesMenu}
      onMouseLeave={closeServicesMenu}
      onKeyDown={handleServicesMenuKeyDown}
    />
  )

  const desktopLearnMenu = (
    <MegaMenuPanel
      menuRef={learnMenuRef}
      id="desktop-learn-menu"
      ariaLabel="Guides"
      open={learnOpen}
      intro="Start with the question you have. Each guide is written in plain English."
      columns={learnMenuColumns}
      footerLinks={[
        {
          label: 'View all guides',
          href: '/learn',
          active: pathname === '/learn',
          onSelect: () => {
            setLearnOpen(false)
            trackNavigation('Nav View all guides')
          },
        },
        {
          label: 'Common questions',
          href: '/faqs',
          active: pathname === '/faqs',
          onSelect: () => {
            setLearnOpen(false)
            trackNavigation('Nav FAQs')
          },
        },
      ]}
      onQuoteClick={() => setLearnOpen(false)}
      onMouseEnter={openLearnMenu}
      onMouseLeave={closeLearnMenu}
      onKeyDown={handleLearnMenuKeyDown}
    />
  )

  return (
    <>
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 overflow-visible border-b border-white/10 bg-brand-dark shadow-[0_8px_30px_-18px_rgba(13,13,13,0.45)] [transform:translateZ(0)]"
    >
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-stretch lg:gap-6 lg:px-8 lg:py-0"
      >
        <NavLink prefetch={false} href="/" className="flex min-w-0 items-center gap-2.5 lg:col-start-1 lg:row-start-1 lg:py-3" aria-label="A1 Property Services home">
          <LogoMark size="md" />
          <span
            className="truncate text-[0.9375rem] font-bold leading-tight tracking-[-0.02em] text-white sm:text-base lg:text-lg"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            A1 Property Services
          </span>
        </NavLink>

        <ul className="hidden self-stretch items-stretch justify-end lg:flex">
          <li className="flex items-center px-3">
            <NavLink
              href="/"
              className={cn(linkClass(pathname === '/'), linkUnderline(pathname === '/'))}
              onClick={() => trackNavigation('Home')}
            >
              Home
            </NavLink>
          </li>

          <li
            ref={servicesRef}
            className="flex items-center px-3"
            onMouseEnter={openServicesMenu}
            onMouseLeave={closeServicesMenu}
            onBlur={handleServicesBlur}
          >
            <div className="inline-flex items-center">
              <NavLink
                href="/services"
                className={cn(linkClass(isServicesActive || servicesOpen), linkUnderline(isServicesActive))}
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
                  '-mr-1 inline-flex h-8 w-7 items-center justify-center rounded-md',
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="desktop-services-menu"
                aria-label="Services menu"
                onKeyDown={handleServicesTriggerKeyDown}
                onClick={(event) => {
                  if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
                  setDesktopMenusReady(true)
                  setLearnOpen(false)
                  if (event.detail === 0) {
                    setServicesOpen((open) => !open)
                    return
                  }
                  setServicesOpen(true)
                }}
              >
                <ChevronDown
                  size={15}
                  className={cn('transition-transform duration-150', servicesOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
            </div>
          </li>

          <li className="flex items-center px-3">
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
            className="flex items-center px-3"
            onMouseEnter={openLearnMenu}
            onMouseLeave={closeLearnMenu}
            onBlur={handleLearnBlur}
          >
            <div className="inline-flex items-center">
              <NavLink
                href="/learn"
                className={cn(linkClass(isLearnActive || learnOpen), linkUnderline(isLearnActive))}
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
                  '-mr-1 inline-flex h-8 w-7 items-center justify-center rounded-md',
                )}
                aria-expanded={learnOpen}
                aria-haspopup="true"
                aria-controls="desktop-learn-menu"
                aria-label="Learn menu"
                onKeyDown={handleLearnTriggerKeyDown}
                onClick={(event) => {
                  if (learnCloseTimer.current) clearTimeout(learnCloseTimer.current)
                  setDesktopMenusReady(true)
                  setServicesOpen(false)
                  if (event.detail === 0) {
                    setLearnOpen((open) => !open)
                    return
                  }
                  setLearnOpen(true)
                }}
              >
                <ChevronDown
                  size={15}
                  className={cn('transition-transform duration-150', learnOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
            </div>
          </li>

          <li className="flex items-center px-3">
            <NavLink
              href="/about"
              className={cn(linkClass(pathname === '/about'), linkUnderline(pathname === '/about'))}
              onClick={() => trackNavigation('About')}
            >
              About
            </NavLink>
          </li>

          <li className="flex items-center px-3">
            <NavLink
              href="/contact"
              className={cn(linkClass(pathname === '/contact'), linkUnderline(pathname === '/contact'))}
              onClick={() => trackNavigation('Contact')}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="hidden shrink-0 items-center gap-4 lg:flex lg:self-stretch lg:py-3 xl:gap-5">
          <span className="hidden h-4 w-px bg-white/20 lg:block" aria-hidden />
          <a
            href={`tel:${siteConfig.phone}`}
            data-track-phone="Navbar Desktop"
            className="flex min-h-11 items-center gap-2 whitespace-nowrap text-[0.9375rem] font-semibold text-brand-gold-light transition-colors hover:text-white"
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
      {desktopMenusReady ? desktopServicesMenu : null}
      {desktopMenusReady ? desktopLearnMenu : null}
    </header>
    {mounted && mobileOpen
      ? createPortal(mobileMenu, document.body)
      : null}
    </>
  )
}
