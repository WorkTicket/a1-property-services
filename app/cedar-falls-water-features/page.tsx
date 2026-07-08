import type { Metadata } from 'next'
import { getLegacyLandingPage } from '@/lib/legacy-landing-pages'
import LegacyServiceLanding, { legacyLandingMetadata } from '@/components/sections/LegacyServiceLanding'

const page = getLegacyLandingPage('cedar-falls-water-features')

export const metadata: Metadata = legacyLandingMetadata(page)

export default function CedarFallsWaterFeaturesPage() {
  return <LegacyServiceLanding page={page} />
}
