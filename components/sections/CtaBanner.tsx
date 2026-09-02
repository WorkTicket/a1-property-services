'use client'

import { Phone, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import FadeIn from '@/components/motion/FadeIn'
import { CTA_COPY } from '@/lib/cta'
import { siteConfig } from '@/lib/metadata'
import { cn } from '@/lib/utils'

type CtaBannerProps = {
  title: string
  description: string
  eyebrow?: string
  animated?: boolean
  titleClassName?: string
  /** Prefer #estimate when the page has an inline QuoteForm. */
  quoteHref?: string
}

function CtaBannerContent({
  title,
  description,
  eyebrow,
  titleClassName,
  quoteHref = '/contact',
}: Omit<CtaBannerProps, 'animated'>) {
  return (
    <>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">{eyebrow}</p> : null}
      <h2
        className={cn(
          'font-display text-3xl font-bold text-white md:text-4xl',
          eyebrow && 'mt-3',
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p className="mt-4 text-white/60">{description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href={quoteHref} size="lg" trackLabel="Banner Quote">
          {CTA_COPY.quote}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button href={`tel:${siteConfig.phone}`} variant="ghost" size="lg" trackLabel="Banner Phone">
          <Phone size={18} />
          {siteConfig.phoneDisplay}
        </Button>
      </div>
    </>
  )
}

export default function CtaBanner({
  title,
  description,
  eyebrow,
  animated = false,
  titleClassName,
  quoteHref = '/contact',
}: CtaBannerProps) {
  return (
    <section className="section bg-brand-green-800">
      <div className="section-inner-narrow text-center">
        {animated ? (
          <FadeIn>
            <CtaBannerContent
              title={title}
              description={description}
              eyebrow={eyebrow}
              titleClassName={titleClassName}
              quoteHref={quoteHref}
            />
          </FadeIn>
        ) : (
          <CtaBannerContent
            title={title}
            description={description}
            eyebrow={eyebrow}
            titleClassName={titleClassName}
            quoteHref={quoteHref}
          />
        )}
      </div>
    </section>
  )
}
