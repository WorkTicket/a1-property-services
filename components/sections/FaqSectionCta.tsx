import Link from 'next/link'
import { ChevronRight, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { CTA_COPY } from '@/lib/cta'
import { siteConfig } from '@/lib/metadata'

type FaqSectionCtaProps = {
  learnMoreHref: string
  learnMoreLabel: string
}

export default function FaqSectionCta({ learnMoreHref, learnMoreLabel }: FaqSectionCtaProps) {
  return (
    <div className="mt-10 text-center">
      <p className="text-lg font-medium text-brand-green-900">
        Still have questions? We are here to help.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/contact">{CTA_COPY.contactTeam}</Button>
        <Button href={`tel:${siteConfig.phone}`} variant="ghost-dark">
          <Phone size={14} />
          {siteConfig.phoneDisplay}
        </Button>
      </div>
      <p className="mt-4">
        <Link
          href={learnMoreHref}
          className="font-medium text-brand-green-700 underline underline-offset-2 transition-colors hover:text-brand-green-900"
        >
          {learnMoreLabel} <ChevronRight size={14} className="inline" />
        </Link>
      </p>
    </div>
  )
}
