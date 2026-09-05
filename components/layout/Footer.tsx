'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Star, Shield, ChevronRight, Facebook } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { trackPhoneCall, trackCtaClick, trackOutboundClick } from '@/lib/analytics'
import FooterSignature from '@/components/FooterSignature'
import LogoMark from '@/components/ui/LogoMark'
import Button from '@/components/ui/Button'
import { yearsExperienceLabel } from '@/lib/years-in-business'
import { projectsCompletedLabel } from '@/lib/projects-completed'

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
  { label: 'Compare Estimates', href: '/learn/comparing-landscaping-estimates' },
  { label: 'Hiring a Landscaper', href: '/learn/questions-before-hiring-landscaper' },
  { label: 'Patio Materials', href: '/learn/choosing-patio-materials' },
  { label: 'Retaining Wall Planning', href: '/learn/planning-retaining-wall-project' },
]

const serviceCities = [
  { name: 'Cedar Falls', href: '/cedar-falls' },
  { name: 'Waterloo', href: '/waterloo' },
  { name: 'Hudson', href: '/hudson' },
  { name: 'Evansdale', href: '/evansdale' },
  { name: 'Waverly', href: '/waverly' },
  { name: 'Denver', href: '/denver' },
  { name: 'Jesup', href: '/jesup' },
  { name: 'Parkersburg', href: '/parkersburg' },
  { name: 'La Porte City', href: '/la-porte-city' },
  { name: 'Dike', href: '/dike' },
  { name: 'Elk Run Heights', href: '/elk-run-heights' },
  { name: 'Dunkerton', href: '/dunkerton' },
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
      <ul className="mt-2.5 space-y-1.5">
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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6">
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
            <p className="mt-3 text-sm leading-snug text-neutral-400">
              Landscaping &amp; hardscaping for Cedar Falls, Waterloo &amp; Black Hawk County.
            </p>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <Star size={12} className="text-brand-gold-light" /> 5-Star Rated
              </span>
              <span className="inline-flex items-center gap-1">
                <Shield size={12} className="text-brand-gold-light" /> Licensed &amp; Insured
              </span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Button href="/contact" size="sm" onClick={() => trackCtaClick('Footer Quote')}>
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
            <ul className="mt-2.5 space-y-2">
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

        <div className="mt-6 border-t border-white/10 pt-4">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white">
              Service Area
            </p>
            <ul className="flex flex-wrap items-center text-sm text-neutral-400">
              {serviceCities.map((city, index) => (
                <li key={city.name} className="inline-flex items-center">
                  {index > 0 && (
                    <span className="px-1.5 text-white/20" aria-hidden>
                      ·
                    </span>
                  )}
                  <Link href={city.href} className="transition-colors hover:text-white">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 flex flex-col gap-2 text-xs text-neutral-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} A1 Property Services. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{projectsCompletedLabel()}</span>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <span>{yearsExperienceLabel()}</span>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <span>5.0 Average Rating</span>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <span>Free Estimates</span>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <span>Iowa Contractor</span>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <FooterSignature />
          </div>
        </div>
      </div>
      </div>
    </footer>
  )
}
