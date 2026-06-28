'use client'

import ResponsiveImage from '@/components/ui/ResponsiveImage'
import type { GalleryProject } from '@/lib/images'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'

type GalleryGridProps = {
  projects: GalleryProject[]
}

function ShowcasePhoto({ project }: { project: GalleryProject }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-xl font-semibold text-brand-dark">{project.title}</h3>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <ResponsiveImage
          src={project.after.src}
          alt={project.after.alt}
          fill
          style={project.after.objectPosition ? { objectPosition: project.after.objectPosition } : undefined}
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 720px"
          priority={project.after.priority}
        />
      </div>
    </div>
  )
}

function GalleryItem({ project }: { project: GalleryProject }) {
  if (project.showcase || !project.before) {
    return <ShowcasePhoto project={project} />
  }

  return (
    <BeforeAfterSlider
      title={project.title}
      before={project.before}
      after={project.after}
    />
  )
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  return (
    <>
      <div className="scroll-snap-x md:hidden">
        {projects.map((project) => (
          <div key={project.id} className="scroll-snap-item">
            <GalleryItem project={project} />
          </div>
        ))}
      </div>

      <div className="hidden gap-8 md:grid md:grid-cols-2">
        {projects.map((project) => (
          <GalleryItem key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
