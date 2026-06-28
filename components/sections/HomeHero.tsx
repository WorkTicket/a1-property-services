'use client'

import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { siteImages } from '@/lib/images'
import Button from '@/components/ui/Button'
import HeroTitle from '@/components/ui/HeroTitle'

export default function HomeHero() {
  return (
    <section className="relative flex min-h-[86vh] items-center justify-center overflow-hidden md:min-h-screen">
      <HeroImagePreload src={siteImages.homeHero} />
      <LcpHeroImage
        src={siteImages.homeHero}
        alt="Professional landscaping project in Cedar Falls, Iowa"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-8 pt-24 text-center text-white sm:px-6">
        <p className="hero-eyebrow mb-4">Cedar Falls, Iowa</p>
        <h1 className="hero-title">
          <HeroTitle>Cedar Falls Landscaping|Built to Last</HeroTitle>
        </h1>
        <p className="hero-subtitle mx-auto mt-6 max-w-xl">
          Retaining walls, paver patios, lawn care, and full outdoor installations for homes and businesses across the Cedar Valley.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <Button href="/contact" size="lg" fullWidth className="sm:w-auto">
            {CTA_COPY.quote}
          </Button>
          <Button href="/gallery" variant="ghost" size="lg" fullWidth className="sm:w-auto">
            {CTA_COPY.gallery}
          </Button>
        </div>
        <div className="mt-8">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <Phone size={14} />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
