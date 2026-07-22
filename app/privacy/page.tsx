import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig } from '@/lib/metadata'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'

const lastUpdated = 'July 22, 2026'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for A1 Property Services. Learn what information we collect, how we use it, and your rights when you visit a1pslandscape.com.',
  path: '/privacy',
})

export default function PrivacyPolicyPage() {
  const { name, url, email, phoneDisplay, address } = siteConfig
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`

  const pageSchema = webPageJsonLd({
    name: 'Privacy Policy | A1 Property Services',
    description:
      'Privacy Policy for A1 Property Services. Learn what information we collect, how we use it, and your rights when you visit a1pslandscape.com.',
    path: '/privacy',
    about: 'Privacy Policy',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdGraph(
              pageSchema,
              breadcrumbJsonLd([
                { name: 'Home', path: '/' },
                { name: 'Privacy Policy', path: '/privacy' },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        size="compact"
        eyebrow="Legal"
        title="Privacy|Policy"
        subtitle="How A1 Property Services collects, uses, and protects your information."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-sm text-brand-body/70">Last updated: {lastUpdated}</p>

          <p className="mt-6 text-lg leading-relaxed text-brand-body">
            This Privacy Policy describes how {name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
            collects, uses, and shares information when you visit {url}, request a quote, call or
            email us, or otherwise interact with our landscaping and property services business serving
            Cedar Falls, Waterloo, and the Cedar Valley area of Iowa.
          </p>

          <h2 className="section-heading mt-12">1. Who We Are</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            {name} provides landscaping, hardscaping, lawn care, tree service, snow removal, and
            related property services in Iowa. You can reach us at:
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-brand-body">
            <li>Address: {fullAddress}</li>
            <li>Phone: {phoneDisplay}</li>
            <li>
              Email:{' '}
              <a href={`mailto:${email}`} className="font-semibold text-brand-gold hover:underline">
                {email}
              </a>
            </li>
          </ul>

          <h2 className="section-heading mt-12">2. Information We Collect</h2>
          <h3 className="mt-6 font-display text-xl font-bold text-brand-dark">Information you provide</h3>
          <p className="mt-3 leading-relaxed text-brand-body">
            When you submit a quote or contact request, we may collect:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-body">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address (if provided)</li>
            <li>City or service location</li>
            <li>Service interest and project details</li>
            <li>Any other information you choose to include in your message</li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            If you call, text, email, or message us on social media, we also collect the information
            you share in that communication.
          </p>

          <h3 className="mt-6 font-display text-xl font-bold text-brand-dark">
            Information collected automatically
          </h3>
          <p className="mt-3 leading-relaxed text-brand-body">
            When you visit our website, we and our service providers may automatically collect:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-body">
            <li>IP address and approximate location</li>
            <li>Browser type, device type, and operating system</li>
            <li>Pages visited, links clicked, and time spent on the site</li>
            <li>Referring website or campaign source</li>
            <li>Cookie and similar technology identifiers (as described below)</li>
          </ul>

          <h2 className="section-heading mt-12">3. How We Use Your Information</h2>
          <p className="mt-4 leading-relaxed text-brand-body">We use the information we collect to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-body">
            <li>Respond to quote requests and schedule estimates or services</li>
            <li>Communicate about your project, appointments, or invoices</li>
            <li>Improve our website, services, and customer experience</li>
            <li>Measure site traffic and marketing performance (with your consent for analytics cookies)</li>
            <li>Protect against spam, fraud, and abuse</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            We do not sell your personal information.
          </p>

          <h2 className="section-heading mt-12">4. Cookies and Similar Technologies</h2>
          <p className="mt-4 leading-relaxed text-brand-body">We use the following categories of cookies:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-body">
            <li>
              <strong>Essential cookies / local storage:</strong> Needed for basic site functions, such as
              remembering that you submitted a quote form during your browsing session.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Used only with your consent to understand how visitors
              use a1pslandscape.com (Google Analytics 4). You can accept or reject non-essential analytics
              cookies through our cookie banner.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            You can change your browser settings to block cookies, and you can revisit this site to
            update your choice by clearing site data for a1pslandscape.com (the banner will appear again
            if no preference is stored). See also our{' '}
            <Link href="/terms" className="font-semibold text-brand-gold hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>

          <h2 className="section-heading mt-12">5. Third-Party Services</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            We use trusted service providers to operate our website and business. Depending on how you
            use the site, your information may be processed by:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-body">
            <li>
              <strong>Cloudflare</strong> — website hosting, content delivery, security, and delivery of
              quote-form emails
            </li>
            <li>
              <strong>Google</strong> — Google Analytics (with consent), Google Maps embeds on our contact
              page, and Google Business Profile links
            </li>
            <li>
              <strong>Email providers</strong> — to receive and respond to quote and contact messages
            </li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            These providers process data according to their own privacy policies and only as needed to
            provide services to us.
          </p>

          <h2 className="section-heading mt-12">6. How We Share Information</h2>
          <p className="mt-4 leading-relaxed text-brand-body">We may share information:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-body">
            <li>With service providers who help us run the website and communicate with customers</li>
            <li>When required by law, court order, or to protect our rights and safety</li>
            <li>In connection with a business transfer (such as a sale or reorganization), if applicable</li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            We do not share your contact information with unrelated third parties for their own marketing.
          </p>

          <h2 className="section-heading mt-12">7. Data Retention</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            We keep quote and customer communications for as long as needed to respond to your request,
            provide services, maintain business records, and meet legal or accounting requirements.
            Analytics data is retained according to the settings of our analytics providers.
          </p>

          <h2 className="section-heading mt-12">8. Data Security</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            We take reasonable administrative and technical measures to protect personal information.
            No method of transmission over the internet is 100% secure, and we cannot guarantee absolute
            security.
          </p>

          <h2 className="section-heading mt-12">9. Your Rights and Choices</h2>
          <p className="mt-4 leading-relaxed text-brand-body">Depending on applicable law, you may:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-body">
            <li>Request access to the personal information we hold about you</li>
            <li>Ask us to correct inaccurate information</li>
            <li>Ask us to delete information we no longer need to keep</li>
            <li>Opt out of non-essential analytics cookies via our cookie banner</li>
            <li>Unsubscribe from marketing emails if we send them (transactional service messages may still be sent)</li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            To exercise these rights, contact us at{' '}
            <a href={`mailto:${email}`} className="font-semibold text-brand-gold hover:underline">
              {email}
            </a>{' '}
            or {phoneDisplay}.
          </p>

          <h2 className="section-heading mt-12">10. Children&apos;s Privacy</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            Our website and services are directed to adults and property owners or managers. We do not
            knowingly collect personal information from children under 13. If you believe a child has
            provided us information, please contact us so we can delete it.
          </p>

          <h2 className="section-heading mt-12">11. External Links</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            Our site may link to third-party websites (for example, Facebook or Google Business Profile).
            We are not responsible for the privacy practices of those sites. We encourage you to review
            their policies.
          </p>

          <h2 className="section-heading mt-12">12. Changes to This Policy</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at
            the top of this page will reflect the latest revision. Continued use of the site after changes
            means you acknowledge the updated policy.
          </p>

          <h2 className="section-heading mt-12">13. Contact Us</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            Questions about this Privacy Policy or your personal information? Contact {name}:
          </p>
          <ul className="mt-4 list-none space-y-1 text-brand-body">
            <li>{fullAddress}</li>
            <li>{phoneDisplay}</li>
            <li>
              <a href={`mailto:${email}`} className="font-semibold text-brand-gold hover:underline">
                {email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="font-semibold text-brand-gold hover:underline">
                Contact form
              </Link>
            </li>
          </ul>
        </FadeIn>
      </section>
    </>
  )
}
