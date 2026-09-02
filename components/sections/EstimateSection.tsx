import dynamic from 'next/dynamic'
import { Check, Phone } from 'lucide-react'
import FadeIn from '@/components/motion/FadeIn'
import { siteConfig } from '@/lib/metadata'
import TrackPhoneLink from '@/components/analytics/TrackPhoneLink'

const QuoteForm = dynamic(() => import('@/components/ui/QuoteForm'))

type EstimateSectionProps = {
  /** GA4 form_location label */
  formLocation: string
  heading?: string
  description?: string
  /** Prefill Service Needed (service slug). */
  defaultService?: string
  /** Prefill City. */
  defaultCity?: string
  bulletPoints?: string[]
  compact?: boolean
}

const DEFAULT_BULLETS = [
  'Free on-site estimates in Cedar Falls, Waterloo & Black Hawk County',
  'Licensed & insured Iowa contractor',
  'Response within one business day',
]

export default function EstimateSection({
  formLocation,
  heading = 'Want a Quote on Your Project?',
  description = "Tell us about your project and we'll get back to you within 24 hours with honest, upfront pricing.",
  defaultService = '',
  defaultCity = '',
  bulletPoints = DEFAULT_BULLETS,
  compact = true,
}: EstimateSectionProps) {
  return (
    <section id="estimate" className="section bg-neutral-50">
      <div className="section-inner relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="section-eyebrow">Get Started</p>
            <h2 className="section-heading mt-3">{heading}</h2>
            <p className="mt-4 leading-relaxed text-brand-body">{description}</p>
            <ul className="mt-8 space-y-4">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-brand-body">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  {point}
                </li>
              ))}
            </ul>
            <TrackPhoneLink
              location={`Estimate ${formLocation}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-gold"
            >
              <Phone size={16} className="text-brand-gold" />
              Or call {siteConfig.phoneDisplay}
            </TrackPhoneLink>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="form-card">
              <h3 className="font-display text-xl font-bold text-brand-dark">Request a Free Quote</h3>
              <p className="mt-1 text-sm text-brand-muted">
                Name and phone are enough — we&rsquo;ll take it from there.
              </p>
              <div className="mt-6">
                <QuoteForm
                  variant="light"
                  formLocation={formLocation}
                  defaultService={defaultService}
                  defaultCity={defaultCity}
                  compact={compact}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
