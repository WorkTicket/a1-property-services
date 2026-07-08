import type { Metadata } from 'next'
import LandscapingHubLanding, { landscapingHubMetadata } from '@/components/sections/LandscapingHubLanding'

export const metadata: Metadata = landscapingHubMetadata()

export default function LandscapingServicesCedarFallsPage() {
  return <LandscapingHubLanding />
}
