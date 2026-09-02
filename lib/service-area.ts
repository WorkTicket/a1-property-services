/** Primary SEO service area — Cedar Falls, Waterloo, Black Hawk County only. */
export const SERVICE_AREA_LABEL = 'Cedar Falls, Waterloo, and Black Hawk County, Iowa'
export const SERVICE_AREA_SHORT = 'Cedar Falls & Waterloo'
export const SERVICE_AREA_TAGLINE = 'Cedar Falls, Waterloo & Black Hawk County'

export const primaryAreaServedSchema = [
  {
    '@type': 'City',
    name: 'Cedar Falls',
    containedInPlace: { '@type': 'State', name: 'Iowa' },
  },
  {
    '@type': 'City',
    name: 'Waterloo',
    containedInPlace: { '@type': 'State', name: 'Iowa' },
  },
  {
    '@type': 'AdministrativeArea',
    name: 'Black Hawk County',
    containedInPlace: { '@type': 'State', name: 'Iowa' },
  },
] as const
