import type { ReactNode } from 'react'
import { Phone, Shield, MapPin, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/motion/FadeIn'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { CTA_COPY } from '@/lib/cta'
import { siteConfig } from '@/lib/metadata'
type ServiceIntroSectionProps = {
  intro: ReactNode
  extendedHeading?: string
  extendedParagraphs?: ReactNode[]
  imageSrc: string
  imageAlt: string
}

export default function ServiceIntroSection({
  intro,
  extendedHeading,
  extendedParagraphs,
  imageSrc,
  imageAlt,
}: ServiceIntroSectionProps) {
  return (
    <section className="section bg-white">
      <div className="section-inner">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-brand-body">
                <Shield size={16} className="text-brand-green-700" aria-hidden />
                <span>Licensed &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2 text-brand-body">
                <Star size={16} className="text-brand-green-700" aria-hidden />
                <span>5.0 Rated</span>
              </div>
              <div className="flex items-center gap-2 text-brand-body">
                <MapPin size={16} className="text-brand-green-700" aria-hidden />
                <span>Serving the Cedar Valley</span>
              </div>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-brand-body">{intro}</p>

            {extendedHeading && extendedParagraphs && extendedParagraphs.length > 0 ? (
              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold text-brand-dark">{extendedHeading}</h2>
                {extendedParagraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-brand-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
              <Button href="/contact" fullWidth className="sm:w-auto">
                {CTA_COPY.quote}
              </Button>
              <Button href={`tel:${siteConfig.phone}`} variant="outline" fullWidth className="sm:w-auto">
                <Phone size={16} />
                {siteConfig.phoneDisplay}
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
              <ResponsiveImage
                src={imageSrc}
                alt={imageAlt}
                fill
                className="transition-transform duration-700 hover:scale-105"
                sizes={IMAGE_SIZES.halfCol}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
