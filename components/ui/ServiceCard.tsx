import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CTA_COPY } from '@/lib/cta'
import { getServicePageHref, type Service } from '@/lib/services'
import ServiceIcon from '@/components/ui/ServiceIcon'

type ServiceCardProps = {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={getServicePageHref(service.slug)}
      className="card group relative flex h-full flex-col gap-4 overflow-hidden p-7"
    >
      <span className="absolute inset-x-0 top-0 h-[2px] bg-brand-gold" aria-hidden />
      <ServiceIcon name={service.icon} />
      <div>
        <h3 className="text-lg font-bold text-brand-dark transition-colors group-hover:text-brand-green-800">
          {service.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted">{service.shortDesc}</p>
      </div>
      <span className="link-cta-sm mt-auto">
        {CTA_COPY.learnMore}{' '}
        <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
