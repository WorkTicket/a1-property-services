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

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Learn', href: '/learn' },
  { label: 'Resources', href: '/resources' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

const rankingServiceLinks = [
  { label: 'Landscaping Cedar Falls', href: '/landscaping-services-in-cedar-falls' },
  { label: 'Paver Patios', href: '/paver-patio-installation' },
  { label: 'Retaining Walls', href: '/retaining-wall-in-cedar-falls' },
  { label: 'Water Features', href: '/cedar-falls-water-features' },
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

export default function Footer() {
  const { address, phone, phoneDisplay, email } = siteConfig

  return (
    <footer className="bg-brand-dark text-neutral-300">
      <div className="h-1 bg-brand-gold" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <LogoMark size="lg" />
              <div>
                <p className="font-display text-xl font-bold text-white">A1 Property Services</p>
                <p className="text-xs font-medium uppercase tracking-widest text-brand-gold-light">
                  Cedar Falls, Iowa
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
              Professional landscaping and hardscaping for Cedar Falls, Waterloo, and the Cedar Valley.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Star size={12} className="text-brand-gold-light" /> 5-Star Rated
              </span>
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-brand-gold-light" /> Licensed &amp; Insured
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" size="sm" onClick={() => trackCtaClick('Footer Quote')}>
                {CTA_COPY.estimate}
                <ChevronRight className="h-3 w-3" aria-hidden />
              </Button>
              <Button href="/gallery" size="sm" variant="ghost" onClick={() => trackCtaClick('Footer Gallery')}>
                {CTA_COPY.viewGallery}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
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
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white">Cedar Falls Services</p>
            <ul className="mt-4 space-y-2.5">
              {rankingServiceLinks.map((link) => (
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
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Service Area</p>
            <p className="mt-2 text-xs text-neutral-400">Serving the entire Cedar Valley</p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {serviceCities.map((city) => (
                <li key={city.name}>
                  {city.href ? (
                    <Link
                      href={city.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      {city.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-neutral-400">{city.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">Contact</p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                <span className="text-neutral-400">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  onClick={() => trackPhoneCall('Footer')}
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Phone size={16} className="shrink-0 text-brand-gold" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Mail size={16} className="shrink-0 text-brand-gold" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Facebook')}
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Facebook size={16} className="shrink-0 text-brand-gold" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Google Business')}
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Star size={16} className="shrink-0 text-brand-gold" />
                  Google Business Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-neutral-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} A1 Property Services. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Licensed &amp; Insured &middot; State of Iowa Contractor
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-neutral-400">
          <span>{projectsCompletedLabel()}</span>
          <span>{yearsExperienceLabel()}</span>
          <span>5.0 Average Rating</span>
          <span>Free Estimates</span>
        </div>
        <FooterSignature />
      </div>
    </footer>
  )
}
