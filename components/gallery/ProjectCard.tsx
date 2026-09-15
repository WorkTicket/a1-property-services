'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { galleryCategoryLabels } from '@/lib/gallery-copy'
import type { GalleryProject } from '@/lib/images'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { getCaseStudyHref } from '@/lib/project-case-studies'

type ProjectCardProps = {
  project: GalleryProject
  onSelect?: (id: string) => void
  eager?: boolean
}

export default function ProjectCard({ project, onSelect, eager = false }: ProjectCardProps) {
  const categoryLabel = galleryCategoryLabels[project.category]
  const hasSlider = Boolean(project.before)
  const openProject = () => onSelect?.(project.id)
  const caseStudyHref = getCaseStudyHref(project.id)

  const copy = (
    <>
      <span className="block h-4 truncate text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-gold">
        {categoryLabel}
      </span>
      <p className="mt-1 truncate font-display text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-green-800">
        {project.title}
      </p>
      <p className="mt-0.5 truncate text-xs font-medium uppercase tracking-wider text-brand-muted">
        {project.location}
      </p>
      <p className="mt-2 line-clamp-2 min-h-[2.625rem] text-sm leading-relaxed text-brand-body">
        {project.description}
      </p>
      <span className="mt-2.5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-green-800">
        Project overview
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  )

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      {hasSlider && project.before ? (
        <BeforeAfterSlider
          before={{ ...project.before, priority: eager }}
          after={{ ...project.after, priority: eager }}
          aspectClassName="aspect-[4/3] rounded-none"
          hint="Slide to compare"
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

      {caseStudyHref ? (
        <Link href={caseStudyHref} className="group flex flex-1 flex-col p-5 text-left">
          {copy}
        </Link>
      ) : (
        <button
          type="button"
          onClick={openProject}
          className="group flex flex-1 flex-col p-5 text-left"
        >
          {copy}
        </button>
      )}
    </article>
  )
}
