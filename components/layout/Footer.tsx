import Link from 'next/link'
import { Phone, Mail, MapPin, Star, ChevronRight, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
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
  { label: 'Paver Driveways', href: '/paver-driveway-cedar-falls' },
  { label: 'Retaining Walls', href: '/retaining-wall-in-cedar-falls' },
  { label: 'Water Features', href: '/cedar-falls-water-features' },
]

const guideLinks = [
  { label: 'Why Yards Flood', href: '/learn/why-yard-floods-when-it-rains' },
  { label: 'Do I Need a Retaining Wall?', href: '/learn/do-i-need-a-retaining-wall' },
  { label: 'Hiring a Landscaper', href: '/learn/questions-before-hiring-landscaper' },
  { label: 'Compare Estimates', href: '/learn/comparing-landscaping-estimates' },
]

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={15} height={15} className={className} aria-hidden fill="currentColor">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.9h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
    </svg>
  )
}

function FooterNav({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <nav aria-label={title}>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/90">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch={false}
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
    <footer className="bg-brand-dark text-neutral-300">
      <div className="h-px bg-brand-gold/80" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
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
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-brand-gold/35 bg-brand-gold/10 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-brand-gold-light">
                {servingSinceLabel()}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-neutral-300">
                Residential &amp; commercial
              </span>
            </div>
            <div className="mt-5 flex flex-col items-start gap-2.5">
              <Button
                href="/contact"
                size="xs"
                trackLabel="Footer Quote"
                className="whitespace-nowrap"
              >
                {CTA_COPY.estimate}
                <ChevronRight className="h-3 w-3" aria-hidden />
              </Button>
              <Link
                href="/gallery"
                prefetch={false}
                data-track-cta="Footer Gallery"
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
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/90">
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
                  data-track-phone="Footer"
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
              <li className="flex items-start gap-2.5 text-sm text-neutral-400">
                <Clock size={15} className="mt-0.5 shrink-0 text-brand-gold" />
                <span>
                  {siteConfig.hours.map((block) => (
                    <span key={block.days} className="block">
                      {block.days}: {block.label}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-outbound="Footer Facebook"
                  className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <FacebookIcon className="shrink-0 text-brand-gold" />
                  Facebook
                </a>
                <a
                  href={siteConfig.social.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-outbound="Footer Google Business"
                  className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  <Star size={15} className="shrink-0 text-brand-gold" />
                  Google
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/90">
            Service Area
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-neutral-400">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link href={`/${city.slug}`} prefetch={false} className="transition-colors hover:text-white">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.08] pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-[11px] leading-4 text-neutral-500 sm:justify-between sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} A1 Property Services. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link href="/privacy" prefetch={false} className="transition-colors hover:text-neutral-300">
              Privacy Policy
            </Link>
            <span className="text-white/15" aria-hidden>
              ·
            </span>
            <Link href="/terms" prefetch={false} className="transition-colors hover:text-neutral-300">
              Terms
            </Link>
            <span className="text-white/15" aria-hidden>
              ·
            </span>
            <FooterSignature />
          </div>
        </div>
      </div>
    </footer>
  )
}
