import Link from 'next/link'
import { ChevronRight, MapPin, BookOpen, CircleHelp, Image as ImageIcon, Layers, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RelatedContentGroup } from '@/lib/internal-linking'
import { getServiceBySlug } from '@/lib/services'
import FadeIn from '@/components/motion/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger'
import ServiceIcon from '@/components/ui/ServiceIcon'

const typeIcons: Record<string, React.ReactNode> = {
  service: <ServiceIcon name="trees" size={18} />,
  blog: <BookOpen size={18} />,
  city: <MapPin size={18} />,
  learn: <FileText size={18} />,
  faq: <CircleHelp size={18} />,
  guide: <Layers size={18} />,
  project: <ImageIcon size={18} />,
}

type Props = {
  groups: RelatedContentGroup[]
  className?: string
  eyebrow?: string
  heading?: string
}

export default function RelatedContent({
  groups,
  className = '',
  eyebrow = 'Explore More',
  heading = 'Related Content',
}: Props) {
  if (groups.length === 0) return null

  return (
    <section className={cn('section bg-brand-stone', className)}>
      <div className="section-inner">
        <FadeIn className="mb-10 text-center">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="section-heading mt-4">{heading}</h2>
        </FadeIn>

        <div className="space-y-10">
          {groups.map((group) => (
            <FadeIn key={group.heading}>
              <h3 className="font-display text-xl font-bold text-brand-dark mb-4">{group.heading}</h3>
              <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => {
                  const icon =
                    item.type === 'service' ? (
                      <ServiceIcon name={getServiceBySlug(item.slug)?.icon ?? 'trees'} size={18} variant="compact" />
                    ) : (
                      typeIcons[item.type] ?? <FileText size={18} />
                    )

                  return (
                    <StaggerItem key={`${item.type}-${item.slug}-${item.title.slice(0, 20)}`}>
                      <Link
                        href={item.url}
                        className="card flex h-full items-start gap-4 p-5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-100 text-brand-green-800">
                          {icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-brand-dark">{item.title}</p>
                          <p className="mt-1 line-clamp-2 text-sm text-brand-body">{item.excerpt}</p>
                        </div>
                        <ChevronRight size={16} className="mt-1 shrink-0 text-brand-green-700" />
                      </Link>
                    </StaggerItem>
                  )
                })}
              </StaggerContainer>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
