'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Star, ChevronRight, Facebook } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { trackPhoneCall, trackCtaClick, trackOutboundClick } from '@/lib/analytics'
import FooterSignature from '@/components/FooterSignature'
import LogoMark from '@/components/ui/LogoMark'
import Button from '@/components/ui/Button'
import { cities } from '@/lib/cities'
import { servingSinceLabel } from '@/lib/years-in-business'

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Site Map', href: '/site-map' },
]

const resourceLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Learn', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
]

const rankingServiceLinks = [
  { label: 'Full Landscaping Services', href: '/landscaping-services-in-cedar-falls' },
  { label: 'Paver Patios', href: '/paver-patio-installation' },
  { label: 'Retaining Walls', href: '/retaining-wall-in-cedar-falls' },
  { label: 'Water Features', href: '/cedar-falls-water-features' },
]

const guideLinks = [
  { label: 'Why Yards Flood', href: '/learn/why-yard-floods-when-it-rains' },
  { label: 'Do I Need a Retaining Wall?', href: '/learn/do-i-need-a-retaining-wall' },
  { label: 'Hiring a Landscaper', href: '/learn/questions-before-hiring-landscaper' },
  { label: 'Compare Estimates', href: '/learn/comparing-landscaping-estimates' },
]

function FooterNav({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <nav aria-label={title}>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const { address, phone, phoneDisplay, email } = siteConfig

  return (
    <footer className="bg-brand-dark pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] text-neutral-300 md:pb-0">
      <div className="h-1 bg-brand-gold" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.35fr_repeat(4,0.85fr)_1.25fr] lg:gap-x-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <LogoMark size="md" />
              <div>
                <p className="font-display text-base font-bold leading-tight text-white">
                  A1 Property Services
                </p>
                <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-brand-gold-light">
                  Cedar Falls, Iowa
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              Landscaping &amp; hardscaping for Cedar Falls, Waterloo &amp; Black Hawk County.
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              {servingSinceLabel()}
              <span className="px-2 text-white/20" aria-hidden>
                ·
              </span>
              Residential &amp; commercial
            </p>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <Button
                href="/contact"
                size="xs"
                onClick={() => trackCtaClick('Footer Quote')}
                className="h-8 gap-1 whitespace-nowrap rounded-md px-3 py-0 text-[0.6875rem] font-semibold leading-none tracking-wide shadow-none hover:translate-y-0 hover:shadow-none"
              >
                {CTA_COPY.estimate}
                <ChevronRight className="h-3 w-3" aria-hidden />
              </Button>
              <Link
                href="/gallery"
                onClick={() => trackCtaClick('Footer Gallery')}
                className="text-sm font-medium text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {CTA_COPY.viewGallery}
              </Link>
            </div>
          </div>

          <FooterNav title="Company" links={companyLinks} />
          <FooterNav title="Popular Services" links={rankingServiceLinks} />
          <FooterNav title="Guides" links={guideLinks} />
          <FooterNav title="Resources" links={resourceLinks} />

          <div className="col-span-2 sm:col-span-1">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white">
              Contact
            </p>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-neutral-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold" />
                <span>
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackPhoneCall('Footer')}
                  className="flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Phone size={15} className="shrink-0 text-brand-gold" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Mail size={15} className="shrink-0 text-brand-gold" />
                  {email}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Facebook')}
                  className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Facebook size={15} className="shrink-0 text-brand-gold" />
                  Facebook
                </a>
                <a
                  href={siteConfig.social.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Google Business')}
                  className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Star size={15} className="shrink-0 text-brand-gold" />
                  Google
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white">
            Service Area
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-neutral-400">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link href={`/${city.slug}`} className="transition-colors hover:text-white">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:justify-between">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} A1 Property Services. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <FooterSignature />
          </div>
        </div>
      </div>
    </footer>
  )
}
