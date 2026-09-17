import {
  ESTIMATE_HASH,
  ESTIMATE_ID,
  QUOTE_INTENT_EVENT,
  QUOTE_NAME_ID,
} from '@/lib/cta'

export function revealQuoteForm() {
  window.dispatchEvent(new Event(QUOTE_INTENT_EVENT))
}

export function isLocalEstimateClick(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute('href') || ''
  if (href === ESTIMATE_HASH || href === `/${ESTIMATE_HASH}`) return true
  try {
    const url = new URL(anchor.href, window.location.href)
    return (
      url.origin === window.location.origin &&
      url.hash === ESTIMATE_HASH &&
      url.pathname === window.location.pathname
    )
  } catch {
    return false
  }
}

function quoteScrollOffset(): number {
  const header =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-offset'),
    ) || 80
  return header + 12
}

function prefersInstantScroll(): boolean {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  )
}

function lockSectionLayout() {
  document.querySelectorAll<HTMLElement>('.section').forEach((section) => {
    section.style.contentVisibility = 'visible'
    section.style.containIntrinsicSize = 'none'
  })
}

function scrollQuoteIntoView(): boolean {
  const el = document.getElementById(ESTIMATE_ID)
  if (!el) return false
  lockSectionLayout()
  const top = el.getBoundingClientRect().top + window.scrollY - quoteScrollOffset()
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersInstantScroll() ? 'auto' : 'smooth',
  })
  return true
}

function focusQuoteName(): boolean {
  if (window.matchMedia('(pointer: coarse)').matches) return true
  const name = document.getElementById(QUOTE_NAME_ID)
  if (!(name instanceof HTMLInputElement)) return false
  name.focus({ preventScroll: true })
  return true
}

export function scrollToQuoteForm(options?: { focus?: boolean; updateHash?: boolean }) {
  revealQuoteForm()

  let scrolled = false
  let hashed = false

  const tick = () => {
    if (!scrolled) scrolled = scrollQuoteIntoView()
    if (scrolled && options?.updateHash && !hashed && window.location.hash !== ESTIMATE_HASH) {
      history.pushState(null, '', ESTIMATE_HASH)
      hashed = true
    }
    const focused = options?.focus === false ? true : focusQuoteName()
    return scrolled && focused
  }

  if (tick()) return

  let attempts = 0
  const timer = window.setInterval(() => {
    attempts += 1
    if (tick() || attempts >= 24) window.clearInterval(timer)
  }, 50)
}
