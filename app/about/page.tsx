import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Award, Shield, Heart, Users, Phone, Check, Star } from 'lucide-react'
import { generatePageMetadata, breadcrumbJsonLd, siteConfig, webPageJsonLd, jsonLdGraph } from '@/lib/metadata'
import { CTA_COPY } from '@/lib/cta'
import { siteImages } from '@/lib/images'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import CtaBanner from '@/components/sections/CtaBanner'
import PageHero from '@/components/motion/PageHero'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'

const GoogleReviews = dynamic(() => import('@/components/ui/GoogleReviews'))

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description:
    'Meet A1 Property Services, Cedar Falls landscaping and hardscaping experts with 15+ years serving the Cedar Valley.',
  path: '/about',
})

const values = [
  {
    icon: <Award className="h-6 w-6" />,
    title: 'We Do It Right',
    desc: 'Proper technique, solid materials, and attention to the details that matter in Iowa weather.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Licensed & Insured',
    desc: 'Licensed Iowa contractor, fully insured on every residential and commercial job.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Customer First',
    desc: 'Straight answers, clear pricing, and realistic timelines. Your trust is what keeps us in business.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Local Expertise',
    desc: '15+ years serving Cedar Falls, Waterloo, and the Cedar Valley. We know Iowa soil, seasons, and what works here.',
  },
]

export default function AboutPage() {
  const pageSchema = webPageJsonLd({
    name: 'About Us | A1 Property Services',
    description: 'Meet A1 Property Services, Cedar Falls landscaping and hardscaping experts with 15+ years serving the Cedar Valley.',
    path: '/about',
    about: 'Landscaping Company',
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
                { name: 'About', path: '/about' },
              ]),
            ),
          ),
        }}
      />
      <PageHero
        imageSrc={siteImages.aboutHero}
        imageAlt="A1 Property Services team in the Cedar Valley"
        eyebrow="Our Story"
        title="Cedar Valley Landscaping|Built on Trust"
        subtitle="For over 15 years, A1 Property Services has been building and maintaining yards across Cedar Falls and the Cedar Valley."
      />

      <section className="section bg-white">
        <div className="section-inner">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                <ResponsiveImage
                  src={siteImages.aboutPrimary}
                  alt="A1 Property Services landscape installation project in Cedar Falls"
                  fill
                  className="transition-transform duration-700 hover:scale-105"
                  sizes={IMAGE_SIZES.halfCol}
                />
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <p className="section-eyebrow">Who We Are</p>
              <h2 className="section-heading mt-3">Your Local Landscaping Partner</h2>
              <p className="mt-6 leading-relaxed text-brand-body">
                A1 Property Services started in 2009 because Cedar Valley homeowners needed a crew they could count on. We&apos;re still here, still doing the work.
              </p>
              <p className="mt-4 leading-relaxed text-brand-body">
                Retaining walls, paver patios, full yard installs, seasonal maintenance. We have the equipment and the experience to get it done right the first time.
              </p>
              <p className="mt-4 leading-relaxed text-brand-body">
                We have served Cedar Falls, Waterloo, and towns across the Cedar Valley since 2009. When you hire us, you are hiring neighbors who care how your yard looks when we drive past it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact">
                  {CTA_COPY.quote}
                </Button>
                <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark">
                  <Phone size={16} />
                  {siteConfig.phoneDisplay}
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section bg-brand-stone">
        <div className="section-inner">
          <FadeIn className="text-center">
            <p className="section-eyebrow">What Drives Us</p>
            <h2 className="section-heading mt-3">Our Values</h2>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="card h-full p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-800/10 text-brand-green-800 transition-transform duration-300 hover:scale-110">
                    {v.icon}
                  </div>
                  <h3 className="mt-4 font-bold text-brand-dark">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-body">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust Features */}
      <section className="section bg-brand-green-100">
        <div className="section-inner">
          <StaggerContainer className="grid gap-8 md:grid-cols-4">
            {[
              { icon: <Star className="h-6 w-6" />, title: '5-Star Rated', desc: 'Average rating across all Google reviews' },
              { icon: <Shield className="h-6 w-6" />, title: 'Licensed & Insured', desc: 'State of Iowa contractor with full liability insurance' },
              { icon: <Check className="h-6 w-6" />, title: '500+ Projects', desc: 'Completed across the Cedar Valley since 2009' },
              { icon: <Users className="h-6 w-6" />, title: '15+ Years', desc: 'Serving Cedar Falls, Waterloo, and beyond' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-brand-green-800/10 p-3 text-brand-green-800">
                    {item.icon}
                  </div>
                  <h3 className="mt-3 font-bold text-brand-dark">{item.title}</h3>
                  <p className="mt-1 text-sm text-brand-body/70">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <GoogleReviews />

      <CtaBanner
        title="Ready to talk about your yard?"
        description="Call us today or request a free quote online. Tell us what you are working on and we will take it from there."
      />
    </>
  )
}
