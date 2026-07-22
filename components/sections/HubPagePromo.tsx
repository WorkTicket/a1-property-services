import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { landscapingHubAnchor, landscapingHubPath } from '@/lib/internal-linking'
import FadeIn from '@/components/motion/FadeIn'

type HubPagePromoProps = {
  className?: string
}

export default function HubPagePromo({ className = 'section bg-brand-stone py-10' }: HubPagePromoProps) {
  return (
    <section className={className}>
      <FadeIn className="section-inner-narrow text-center">
        <p className="text-brand-body leading-relaxed">
          Need more than one service? Explore our{' '}
          <Link
            href={landscapingHubPath}
            className="font-semibold text-brand-green-800 underline-offset-2 hover:text-brand-gold hover:underline"
          >
            full-service {landscapingHubAnchor}
          </Link>
          {' '}— retaining walls, patios, lawn care, and complete landscape installs.
        </p>
        <Link
          href={landscapingHubPath}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-700 hover:text-brand-gold"
        >
          View landscaping services <ChevronRight size={14} />
        </Link>
      </FadeIn>
    </section>
  )
}
