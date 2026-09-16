import { cities } from '@/lib/cities'
import { getProjectsCompleted } from '@/lib/projects-completed'
import { FOUNDING_YEAR, getYearsInBusiness } from '@/lib/years-in-business'

export type CompanyStat = {
  value: string
  label: string
}

export function getCompanyStats(): CompanyStat[] {
  return [
    { value: `${getProjectsCompleted()}+`, label: 'Projects Completed' },
    { value: String(getYearsInBusiness()), label: 'Years in Cedar Falls' },
    { value: String(cities.length), label: 'Cities Served' },
    { value: '24-Hr', label: 'Typical Response' },
    { value: '5-Star', label: 'Google Rated' },
    { value: 'Licensed', label: '& Insured' },
    { value: 'Free', label: 'On-Site Estimates' },
    { value: `Est. ${FOUNDING_YEAR}`, label: 'Cedar Falls, Iowa' },
  ]
}
