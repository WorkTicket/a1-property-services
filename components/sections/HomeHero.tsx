import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ChevronRight, ClipboardCheck, MapPin, Phone, ShieldCheck, Star } from 'lucide-react'
import { CTA_COPY } from '@/lib/cta'
import { siteConfig } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import { establishedEyebrow } from '@/lib/years-in-business'
import Button from '@/components/ui/Button'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import HeroCopyDeferred from '@/components/ui/HeroCopyDeferred'
import HeroOverlay from '@/components/ui/HeroOverlay'

export default function HomeHero() {
  return (
    <>
      <HeroImagePreload src={siteImages.homeHero} maxWidth={1920} />

      <section className="home-hero">
        <div className="home-hero-media">
          <div className="home-hero-media-zoom">
            <LcpHeroImage
              src={siteImages.homeHero}
              alt="Aerial view of Cedar Falls, Iowa"
              maxWidth={1920}
            />
          </div>
          <HeroOverlay imageSrc={siteImages.homeHero} variant="home" />
        </div>

        <div className="home-hero-content">
          <div className="home-hero-copy">
            <HeroCopyDeferred
              eyebrow={establishedEyebrow()}
              title="Cedar Falls Landscaping|A yard you're proud to come home to"
              subtitle="Paver patios, retaining walls, and full outdoor installs for Cedar Falls, Waterloo, and Black Hawk County homeowners."
              evenTitleLines
              textWash
              titleMaxWidth="34rem"
              subtitleMaxWidth="30rem"
            >
              <div className="home-hero-ctas">
                <Button href="#estimate" size="lg" trackLabel="Home Hero Quote" className="home-hero-cta-primary">
                  {CTA_COPY.quote}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button
                  href={`tel:${siteConfig.phone}`}
                  variant="outline-on-dark"
                  size="lg"
                  trackLabel="Home Hero Phone"
                  className="home-hero-cta-phone"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {siteConfig.phoneDisplay.replace(/^\+1\s/, '')}
                </Button>
              </div>
            </HeroCopyDeferred>
          </div>
        </div>

        <div className="hero-trust-bar" aria-label="Why homeowners choose A1">
          <div className="hero-trust-bar-inner">
            <TrustBarItem icon={Star} filled>5-Star Rated</TrustBarItem>
            <span className="hero-trust-rule" aria-hidden />
            <TrustBarItem icon={ShieldCheck}>Licensed &amp; Insured</TrustBarItem>
            <span className="hero-trust-rule" aria-hidden />
            <TrustBarItem icon={ClipboardCheck}>Free On-Site Estimates</TrustBarItem>
            <span className="hero-trust-rule" aria-hidden />
            <TrustBarItem icon={MapPin}>Cedar Falls &amp; Waterloo</TrustBarItem>
          </div>
        </div>
      </section>
    </>
  )
}

function TrustBarItem({
  icon: Icon,
  children,
  filled = false,
}: {
  icon: LucideIcon
  children: ReactNode
  filled?: boolean
}) {
  return (
    <span className="hero-trust-item">
      <Icon
        size={13}
        className={filled ? 'hero-trust-icon hero-trust-icon-filled' : 'hero-trust-icon'}
        aria-hidden
      />
      <span>{children}</span>
    </span>
  )
}
