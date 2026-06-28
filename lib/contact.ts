import { siteConfig } from '@/lib/metadata'

export const contactFormEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`

export const thankYouPath = '/thank-you/'
