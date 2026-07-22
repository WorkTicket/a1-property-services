import type { Metadata } from 'next'
import Link from 'next/link'
import { generatePageMetadata, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd, siteConfig } from '@/lib/metadata'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'

const lastUpdated = 'July 22, 2026'

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms & Conditions',
  description:
    'Terms and Conditions for using the A1 Property Services website and requesting landscaping services in Cedar Falls and the Cedar Valley.',
  path: '/terms',
})

export default function TermsPage() {
  const { name, url, email, phoneDisplay, address } = siteConfig
  const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`

  const pageSchema = webPageJsonLd({
    name: 'Terms & Conditions | A1 Property Services',
    description:
      'Terms and Conditions for using the A1 Property Services website and requesting landscaping services in Cedar Falls and the Cedar Valley.',
    path: '/terms',
    about: 'Terms and Conditions',
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
                { name: 'Terms & Conditions', path: '/terms' },
              ]),
            ),
          ),
        }}
      />

      <PageHero
        size="compact"
        eyebrow="Legal"
        title="Terms &|Conditions"
        subtitle="The rules for using our website and requesting services from A1 Property Services."
      />

      <section className="section bg-white">
        <FadeIn className="section-inner-narrow">
          <p className="text-sm text-brand-body/70">Last updated: {lastUpdated}</p>

          <p className="mt-6 text-lg leading-relaxed text-brand-body">
            Welcome to {url}. These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to
            and use of the website operated by {name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;), a landscaping and property services business based in {address.city},{' '}
            {address.state}. By using this website, you agree to these Terms. If you do not agree, please
            do not use the site.
          </p>

          <h2 className="section-heading mt-12">1. About Our Services</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            {name} provides landscaping, hardscaping, lawn care, tree service, snow removal, outdoor
            living spaces, and related property services in Cedar Falls, Waterloo, and surrounding Cedar
            Valley communities in Iowa. Information on this website describes our services generally and
            does not, by itself, create a binding service contract.
          </p>

          <h2 className="section-heading mt-12">2. Website Use</h2>
          <p className="mt-4 leading-relaxed text-brand-body">You agree to use this website only for lawful purposes. You may not:</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-brand-body">
            <li>Attempt to disrupt, hack, scrape, or overload the site</li>
            <li>Submit false, misleading, or fraudulent information through forms</li>
            <li>Use the site to send spam or malicious content</li>
            <li>Copy or republish site content for commercial use without our written permission</li>
            <li>Impersonate another person or misrepresent your affiliation with a person or entity</li>
          </ul>
          <p className="mt-4 leading-relaxed text-brand-body">
            We may suspend or restrict access to the site if we believe these Terms have been violated.
          </p>

          <h2 className="section-heading mt-12">3. Quotes, Estimates, and Service Agreements</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            Submitting a quote request through our website is an inquiry, not an acceptance of work.
            Quotes and estimates are based on the information you provide and any on-site assessment we
            perform. Final pricing, scope, timeline, and payment terms are governed by a separate written
            estimate, proposal, or service agreement between you and {name}.
          </p>
          <p className="mt-4 leading-relaxed text-brand-body">
            Project results can vary based on site conditions, weather, material availability, utility
            locations, permitting, and other factors outside our exclusive control. Unless a written
            agreement states otherwise, timelines are estimates only.
          </p>

          <h2 className="section-heading mt-12">4. No Guarantees on Website Content</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            We work to keep website content accurate and up to date, including service descriptions,
            galleries, blog articles, and educational resources. However, content is provided for general
            information only. It is not a substitute for a property-specific evaluation, professional
            advice tailored to your site, or a signed contract.
          </p>
          <p className="mt-4 leading-relaxed text-brand-body">
            Photos and project examples may show past work and are illustrative. Actual materials,
            plants, and finished results on your property may differ.
          </p>

          <h2 className="section-heading mt-12">5. Intellectual Property</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            All content on this website—including text, logos, photos, graphics, layout, and branding—is
            owned by {name} or used with permission. You may view and print pages for personal,
            non-commercial use related to evaluating or hiring our services. You may not reproduce,
            distribute, modify, or create derivative works from our content without prior written consent,
            except as allowed by law.
          </p>

          <h2 className="section-heading mt-12">6. Third-Party Links and Tools</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            The site may include links to third-party websites or embedded tools (such as maps or social
            media). We do not control those services and are not responsible for their content, availability,
            or practices. Your use of third-party sites is at your own risk and subject to their terms.
          </p>

          <h2 className="section-heading mt-12">7. Privacy</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            How we collect and use personal information is described in our{' '}
            <Link href="/privacy" className="font-semibold text-brand-gold hover:underline">
              Privacy Policy
            </Link>
            . By using the site, you also acknowledge that policy.
          </p>

          <h2 className="section-heading mt-12">8. Disclaimer of Warranties</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            THE WEBSITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE.&rdquo; TO THE FULLEST
            EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO
            NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
          </p>
          <p className="mt-4 leading-relaxed text-brand-body">
            Any warranties related to landscaping or construction work we perform are only those expressly
            stated in a signed service agreement or as required by Iowa law.
          </p>

          <h2 className="section-heading mt-12">9. Limitation of Liability</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            TO THE FULLEST EXTENT PERMITTED BY IOWA LAW, {name.toUpperCase()} AND ITS OWNERS, EMPLOYEES,
            AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE WEBSITE OR RELIANCE ON WEBSITE CONTENT,
            INCLUDING LOST PROFITS OR DATA, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p className="mt-4 leading-relaxed text-brand-body">
            Our total liability related to website use shall not exceed one hundred dollars (US $100),
            except where liability cannot be limited under applicable law. This section does not limit
            liability for work performed under a separate written contract, which is governed by that
            agreement.
          </p>

          <h2 className="section-heading mt-12">10. Indemnification</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            You agree to indemnify and hold harmless {name} from claims, damages, losses, and expenses
            (including reasonable attorneys&apos; fees) arising from your misuse of the website, your
            violation of these Terms, or your infringement of any third-party rights.
          </p>

          <h2 className="section-heading mt-12">11. Governing Law</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            These Terms are governed by the laws of the State of Iowa, without regard to conflict-of-law
            principles. Any dispute arising from these Terms or your use of the website shall be resolved
            in the state or federal courts located in Iowa, and you consent to personal jurisdiction in
            those courts.
          </p>

          <h2 className="section-heading mt-12">12. Changes to These Terms</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date at the top
            of this page shows when changes were last made. Continued use of the website after updates
            constitutes acceptance of the revised Terms.
          </p>

          <h2 className="section-heading mt-12">13. Contact</h2>
          <p className="mt-4 leading-relaxed text-brand-body">
            Questions about these Terms? Contact {name}:
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
