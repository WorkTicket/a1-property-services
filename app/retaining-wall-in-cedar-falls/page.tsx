import type { Metadata } from 'next'
import { getLegacyLandingPage } from '@/lib/legacy-landing-pages'
import LegacyServiceLanding, { legacyLandingMetadata } from '@/components/sections/LegacyServiceLanding'

const page = getLegacyLandingPage('retaining-wall-in-cedar-falls')

export const metadata: Metadata = legacyLandingMetadata(page)

export default function RetainingWallCedarFallsPage() {
  return <LegacyServiceLanding page={page} />
}
