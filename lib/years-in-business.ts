/** Business founded December 10, 2014: increments each year on that date. */
export const FOUNDING_YEAR = 2014
const ANNIVERSARY_MONTH = 11 // December (0-indexed)
const ANNIVERSARY_DAY = 10

export function establishedEyebrow(): string {
  return `CEDAR FALLS · IOWA · EST. ${FOUNDING_YEAR}`
}

export function servingSinceLabel(): string {
  return `Serving Since ${FOUNDING_YEAR}`
}

export function sinceYearPhrase(): string {
  return `since ${FOUNDING_YEAR}`
}

export function startedInYearPhrase(): string {
  return `started in ${FOUNDING_YEAR}`
}

export function getYearsSinceAnniversary(referenceYear: number, now: Date = new Date()): number {
  let years = now.getFullYear() - referenceYear
  const month = now.getMonth()
  const day = now.getDate()

  if (month < ANNIVERSARY_MONTH || (month === ANNIVERSARY_MONTH && day < ANNIVERSARY_DAY)) {
    years -= 1
  }

  return years
}

export function getYearsInBusiness(now: Date = new Date()): number {
  return getYearsSinceAnniversary(FOUNDING_YEAR, now)
}

export function yearsInBusinessLabel(now?: Date): string {
  return `${getYearsInBusiness(now)} Years`
}

export function yearsExperienceLabel(now?: Date): string {
  return `${getYearsInBusiness(now)} Years Experience`
}

export function yearsInBusinessPhrase(now?: Date): string {
  return `${getYearsInBusiness(now)} years`
}

export function yearsInBusinessOverPhrase(now?: Date): string {
  return `over ${getYearsInBusiness(now)} years`
}
