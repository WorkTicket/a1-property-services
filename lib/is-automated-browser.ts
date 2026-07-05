/** Skip analytics in Lighthouse, PageSpeed, and other automated audits. */
export function isAutomatedBrowser(): boolean {
  if (typeof window === 'undefined') return false
  if (navigator.webdriver) return true
  const ua = navigator.userAgent
  return /HeadlessChrome|Lighthouse|Chrome-Lighthouse|PTST/i.test(ua)
}
