import { getYearsSinceAnniversary } from '@/lib/years-in-business'

/** 850 projects as of December 10, 2025: increases by 150 each anniversary. */
const PROJECTS_BASE_COUNT = 850
const PROJECTS_INCREMENT = 150
const PROJECTS_REFERENCE_YEAR = 2025

export function getProjectsCompleted(now: Date = new Date()): number {
  const years = getYearsSinceAnniversary(PROJECTS_REFERENCE_YEAR, now)
  return PROJECTS_BASE_COUNT + years * PROJECTS_INCREMENT
}

export function projectsCompletedValue(now?: Date): string {
  return `${getProjectsCompleted(now)}+`
}

export function projectsCompletedLabel(now?: Date): string {
  return `${getProjectsCompleted(now)}+ Projects Completed`
}

export function projectsCompletedTitle(now?: Date): string {
  return `${getProjectsCompleted(now)}+ Projects`
}
