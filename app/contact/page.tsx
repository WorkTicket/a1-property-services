import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Check, Star, Shield } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, getGoogleMapsEmbedUrl, siteConfig, webPageJsonLd, jsonLdGraph } from '@/lib/metadata'
import { siteImages } from '@/lib/images'
import QuoteForm from '@/components/ui/QuoteForm'
import TrackPageEvent from '@/components/analytics/TrackPageEvent'
import FadeIn from '@/components/motion/FadeIn'
import PageHero from '@/components/motion/PageHero'

export const metadata: Metadata = generatePageMetadata({
  title: 'Request a Free Landscaping Quote',
  description: 'Request a free landscaping quote from A1 Property Services in Cedar Falls. We usually respond within 24 hours.',
  path: '/contact',
})

export default function ContactPage() {
  const pageSchema = webPageJsonLd({
    name: 'Request a Free Landscaping Quote | A1 Property Services',
    description: 'Request a free landscaping quote from A1 Property Services in Cedar Falls. We usually respond within 24 hours.',
    path: '/contact',
    about: 'Contact Us',
  })

  return (
    <>
      <TrackPageEvent event="contact_page_view" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Contact', path: '/contact' },
              ]),
            ),
          ),
        }}
      />
      <PageHero
        size="compact"
        imageSrc={siteImages.contactHero}
        imageAlt="Contact A1 Property Services in Cedar Falls"
        eyebrow="Get in Touch"
        title="Request Your|Free Quote"
        subtitle="Tell us about your project. We'll look it over and get back to you with a straight answer on price."
      />

      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form */}
            <FadeIn direction="left">
              <h2 className="section-heading">Tell Us About Your Project</h2>
              <p className="mt-2 text-sm text-brand-body">
                Fill out the form and we&rsquo;ll get back to you within 24 hours with a free quote.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-brand-muted">
                <span className="flex items-center gap-1.5">
                  <Shield size={14} className="text-brand-green-700" /> Licensed &amp; Insured
                </span>
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="text-brand-green-700" /> 5-Star Rated
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-brand-green-700" /> Free Estimates
                </span>
              </div>

              <div className="mt-8">
                <QuoteForm variant="light" formLocation="Contact Page" />
              </div>
            </FadeIn>

            {/* Contact info + map */}
            <FadeIn direction="right" delay={0.1}>
              <div className="rounded-xl bg-brand-stone p-8">
                <h2 className="font-display text-2xl font-bold text-brand-dark">Contact Details</h2>
                <div className="mt-6 space-y-4 text-sm text-brand-body">
                  <p className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>
                      <strong>Phone</strong><br />
                      <a href={`tel:${siteConfig.phone}`} className="link-touch text-brand-green-800 transition-colors hover:underline">
                        {siteConfig.phoneDisplay}
                      </a>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>
                      <strong>Email</strong><br />
                      <a href={`mailto:${siteConfig.email}`} className="text-brand-green-800 transition-colors hover:underline">
                        {siteConfig.email}
                      </a>
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>
                      <strong>Address</strong><br />
                      503 Bergstrom Blvd<br />Cedar Falls, IA 50613
                    </span>
                  </p>
                </div>
                <p className="mt-6 text-xs text-brand-subtle">
                  <strong>Service Area:</strong> Cedar Falls &middot; Waterloo &middot; Hudson &middot; Cedar Valley, Iowa
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl shadow-premium-lg">
                <iframe
                  title="A1 Property Services map"
                  src={getGoogleMapsEmbedUrl()}
                  className="h-64 w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
