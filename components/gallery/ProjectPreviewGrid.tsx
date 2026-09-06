'use client'

import { useCallback, useState } from 'react'
import ProjectCard from '@/components/gallery/ProjectCard'
import ProjectModal from '@/components/gallery/ProjectModal'
import type { GalleryProject } from '@/lib/images'
import { cn } from '@/lib/utils'

type ProjectPreviewGridProps = {
  projects: GalleryProject[]
  columns?: 2 | 3
}

export default function ProjectPreviewGrid({ projects, columns = 2 }: ProjectPreviewGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 gap-6 md:gap-8',
          columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2',
        )}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={handleSelect}
          />
        ))}
      </div>
      {selectedId ? <ProjectModal projectId={selectedId} onClose={() => setSelectedId(null)} /> : null}
    </>
  )
}
