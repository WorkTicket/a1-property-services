import type { Metadata } from 'next'
import { getLegacyLandingPage } from '@/lib/legacy-landing-pages'
import LegacyServiceLanding, { legacyLandingMetadata } from '@/components/sections/LegacyServiceLanding'

const page = getLegacyLandingPage('paver-driveway-cedar-falls')

export const metadata: Metadata = legacyLandingMetadata(page)

export default function PaverDrivewayCedarFallsPage() {
  return <LegacyServiceLanding page={page} />
}
