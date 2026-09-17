import { Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import QuoteButton from '@/components/cta/QuoteButton'
import FadeIn from '@/components/motion/FadeIn'
import { siteConfig } from '@/lib/metadata'
import { cn } from '@/lib/utils'

type CtaBannerProps = {
  title: string
  description: string
  eyebrow?: string
  animated?: boolean
  titleClassName?: string
  quoteHref?: string
}

function CtaBannerContent({
  title,
  description,
  eyebrow,
  titleClassName,
  quoteHref,
}: Omit<CtaBannerProps, 'animated'>) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
      <div className="max-w-xl">
        {eyebrow ? (
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/55">
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            'font-display text-[1.75rem] font-bold tracking-[-0.02em] text-white md:text-[2.15rem] md:leading-tight',
            eyebrow && 'mt-3',
            titleClassName,
          )}
        >
          {title}
        </h2>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-white">{description}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
        <QuoteButton href={quoteHref} variant="white" size="lg" trackLabel="Banner Quote" />
        <Button href={`tel:${siteConfig.phone}`} variant="ghost" size="lg" trackLabel="Banner Phone">
          <Phone size={16} aria-hidden />
          {siteConfig.phoneDisplay}
        </Button>
      </div>
    </div>
  )
}

export default function CtaBanner({
  title,
  description,
  eyebrow,
  animated = false,
  titleClassName,
  quoteHref,
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-brand-green-800">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'linear-gradient(135deg, rgba(13,13,13,0.18) 0%, transparent 46%), linear-gradient(to right, rgba(13,13,13,0.12) 0%, transparent 40%)',
        }}
      />
      <div className="section-inner relative py-14 md:py-16">
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
