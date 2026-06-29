import Link from 'next/link'
import { ChevronRight, MapPin, BookOpen, HelpCircle, Image as ImageIcon, Layers, FileText } from 'lucide-react'
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
  faq: <HelpCircle size={18} />,
  guide: <Layers size={18} />,
  project: <ImageIcon size={18} />,
}

type Props = {
  groups: RelatedContentGroup[]
  className?: string
}

export default function RelatedContent({ groups, className = '' }: Props) {
  if (groups.length === 0) return null

  return (
    <section className={`section bg-brand-stone ${className}`}>
      <div className="section-inner">
        <FadeIn className="mb-10 text-center">
          <p className="section-eyebrow">Explore More</p>
          <h2 className="section-heading mt-3">Related Content</h2>
        </FadeIn>

        <div className="space-y-10">
          {groups.map((group) => (
            <FadeIn key={group.heading}>
              <h3 className="font-display text-xl font-bold text-brand-dark mb-4">{group.heading}</h3>
              <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => {
                  if (item.type === 'service') {
                    return (
                      <StaggerItem key={`${item.type}-${item.slug}`}>
                        <Link
                          href={item.url}
                          className="card flex items-start gap-4 p-5 h-full transition-all hover:-translate-y-0.5"
                        >
                          <div className="rounded-lg bg-brand-green-100 p-2.5 shrink-0">
                            <ServiceIcon name={getServiceBySlug(item.slug)?.icon ?? 'trees'} size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-brand-dark">{item.title}</p>
                            <p className="mt-1 text-sm text-brand-body line-clamp-2">{item.excerpt}</p>
                          </div>
                          <ChevronRight size={16} className="shrink-0 mt-1 text-brand-green-700" />
                        </Link>
                      </StaggerItem>
                    )
                  }

                  if (item.type === 'blog') {
                    return (
                      <StaggerItem key={`${item.type}-${item.slug}`}>
                        <Link
                          href={item.url}
                          className="card flex items-start gap-4 p-5 h-full transition-all hover:-translate-y-0.5"
                        >
                          <div className="rounded-lg bg-brand-green-100 p-2.5 shrink-0 text-brand-green-800">
                            <BookOpen size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-brand-dark">{item.title}</p>
                            <p className="mt-1 text-sm text-brand-body line-clamp-2">{item.excerpt}</p>
                          </div>
                          <ChevronRight size={16} className="shrink-0 mt-1 text-brand-green-700" />
                        </Link>
                      </StaggerItem>
                    )
                  }

                  if (item.type === 'city') {
                    return (
                      <StaggerItem key={`${item.type}-${item.slug}`}>
                        <Link
                          href={item.url}
                          className="card flex items-start gap-4 p-5 h-full transition-all hover:-translate-y-0.5"
                        >
                          <div className="rounded-lg bg-brand-green-100 p-2.5 shrink-0 text-brand-green-800">
                            <MapPin size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-brand-dark">{item.title}</p>
                            <p className="mt-1 text-sm text-brand-body line-clamp-2">{item.excerpt}</p>
                          </div>
                          <ChevronRight size={16} className="shrink-0 mt-1 text-brand-green-700" />
                        </Link>
                      </StaggerItem>
                    )
                  }

                  if (item.type === 'faq') {
                    return (
                      <StaggerItem key={`${item.type}-${item.slug}-${item.title.slice(0, 20)}`}>
                        <Link
                          href={item.url}
                          className="card flex items-start gap-4 p-5 h-full transition-all hover:-translate-y-0.5"
                        >
                          <div className="rounded-lg bg-brand-green-100 p-2.5 shrink-0 text-brand-green-800">
                            <HelpCircle size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-brand-dark">{item.title}</p>
                            <p className="mt-1 text-sm text-brand-body line-clamp-2">{item.excerpt}</p>
                          </div>
                          <ChevronRight size={16} className="shrink-0 mt-1 text-brand-green-700" />
                        </Link>
                      </StaggerItem>
                    )
                  }

                  return (
                    <StaggerItem key={`${item.type}-${item.slug}`}>
                      <Link
                        href={item.url}
                        className="card flex items-start gap-4 p-5 h-full transition-all hover:-translate-y-0.5"
                      >
                        <div className="rounded-lg bg-brand-green-100 p-2.5 shrink-0 text-brand-green-800">
                          {typeIcons[item.type] ?? <FileText size={18} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-brand-dark">{item.title}</p>
                          <p className="mt-1 text-sm text-brand-body line-clamp-2">{item.excerpt}</p>
                        </div>
                        <ChevronRight size={16} className="shrink-0 mt-1 text-brand-green-700" />
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
