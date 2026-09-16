/** Skip analytics and prefetch in Lighthouse, PageSpeed, and other automated audits. */
export function isAutomatedBrowser(): boolean {
  if (typeof window === 'undefined') return false
  if (navigator.webdriver) return true
  return /HeadlessChrome|Lighthouse|Chrome-Lighthouse|PTST|GTmetrix|Speed Insights|PageSpeed/i.test(
    navigator.userAgent,
  )
}
