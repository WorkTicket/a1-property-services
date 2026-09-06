'use client'

import { ArrowUpRight } from 'lucide-react'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { galleryCategoryLabels } from '@/lib/gallery-copy'
import type { GalleryProject } from '@/lib/images'
import { IMAGE_SIZES } from '@/lib/image-sizes'

type ProjectCardProps = {
  project: GalleryProject
  onSelect?: (id: string) => void
  eager?: boolean
}

export default function ProjectCard({ project, onSelect, eager = false }: ProjectCardProps) {
  const categoryLabel = galleryCategoryLabels[project.category]
  const hasSlider = Boolean(project.before)
  const openProject = () => onSelect?.(project.id)

  return (
    <article className="card overflow-hidden rounded-xl">
      {hasSlider && project.before ? (
        <BeforeAfterSlider
          before={{ ...project.before, priority: eager }}
          after={{ ...project.after, priority: eager }}
          aspectClassName="aspect-[4/3] rounded-none"
          onActivate={openProject}
        />
      ) : (
        <button
          type="button"
          onClick={openProject}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-200"
          aria-label={`View ${project.title}`}
        >
          <ResponsiveImage
            src={project.after.src}
            alt={project.after.alt}
            fill
            sizes={IMAGE_SIZES.galleryGrid}
            priority={eager}
            style={project.after.objectPosition ? { objectPosition: project.after.objectPosition } : undefined}
          />
        </button>
      )}

      <button
        type="button"
        onClick={openProject}
        className="group w-full p-3.5 text-left sm:p-4"
      >
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-gold">
          {categoryLabel}
        </span>
        <p className="mt-1 font-display text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-green-800">
          {project.title}
        </p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-brand-muted">
          {project.location}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-body">
          {project.description}
        </p>
        <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-800">
          View project
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>
    </article>
  )
}
