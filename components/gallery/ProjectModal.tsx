'use client'

import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MapPin, Phone, X } from 'lucide-react'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import Button from '@/components/ui/Button'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { trackGalleryView } from '@/lib/analytics'
import { galleryCategoryLabels } from '@/lib/gallery-copy'
import { getGalleryProjectById } from '@/lib/images'
import { IMAGE_SIZES } from '@/lib/image-sizes'
import { siteConfig } from '@/lib/metadata'

type ProjectModalProps = {
  projectId: string
  onClose: () => void
}

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const project = getGalleryProjectById(projectId)
  const hasSlider = Boolean(project?.before)

  useEffect(() => {
    if (project) trackGalleryView(project.title)
  }, [project])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.dataset.mobileOverlay = 'true'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      delete document.body.dataset.mobileOverlay
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose()
    },
    [onClose],
  )

  if (typeof document === 'undefined' || !project) return null

  const categoryLabel = galleryCategoryLabels[project.category]

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-stretch justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden bg-white shadow-premium-lg sm:h-auto sm:max-h-[min(42rem,calc(100dvh-3rem))] sm:rounded-2xl lg:min-h-[32rem]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-2">
          <div className="relative shrink-0 overflow-hidden bg-neutral-950 lg:h-full lg:min-h-0">
            {hasSlider && project.before ? (
              <BeforeAfterSlider
                className="h-full"
                featured
                hint="Slide to compare"
                before={{ ...project.before, priority: true }}
                after={{ ...project.after, priority: true }}
                aspectClassName="aspect-[4/3] h-[min(46dvh,100svw)] max-h-[58dvh] w-full rounded-none max-sm:aspect-auto sm:h-auto lg:h-full lg:max-h-none lg:aspect-auto"
                sizes={IMAGE_SIZES.galleryGrid}
              />
            ) : (
              <div className="relative aspect-[4/3] h-[min(46dvh,100svw)] max-h-[58dvh] w-full max-sm:aspect-auto sm:h-auto lg:absolute lg:inset-0 lg:max-h-none lg:aspect-auto">
                <ResponsiveImage
                  src={project.after.src}
                  alt={project.after.alt}
                  fill
                  sizes={IMAGE_SIZES.galleryGrid}
                  priority
                  style={
                    project.after.objectPosition
                      ? { objectPosition: project.after.objectPosition }
                      : undefined
                  }
                />
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black/55 to-transparent" />

            <button
              type="button"
              onClick={onClose}
              className="absolute z-30 flex h-12 w-12 min-h-12 min-w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              style={{
                top: 'max(0.75rem, env(safe-area-inset-top, 0px))',
                right: 'max(0.75rem, env(safe-area-inset-right, 0px))',
              }}
              aria-label="Close project"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="rounded-full bg-brand-green-800/10 px-2.5 py-1 text-[11px] font-semibold text-brand-green-800">
                  {categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-muted">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </span>
              </div>
              <h2
                id="project-modal-title"
                className="mt-2 font-display text-2xl font-bold leading-tight text-brand-dark sm:text-[1.75rem]"
              >
                {project.title}
              </h2>

              <p className="mt-3 text-[15px] leading-relaxed text-brand-body">{project.description}</p>

              {project.scopeOfWork ? (
                <div className="mt-4">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                    Scope of Work
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-body">{project.scopeOfWork}</p>
                </div>
              ) : null}

              {project.materials.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                    Materials Used
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.materials.map((material) => (
                      <li
                        key={material}
                        className="rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs font-medium text-brand-body"
                      >
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div
              className="grid shrink-0 grid-cols-2 gap-2.5 border-t border-black/5 bg-white px-4 py-3 sm:px-6"
              style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
            >
              <Button
                href="/contact"
                className="min-h-12 px-4 py-3 text-sm shadow-none hover:translate-y-0 hover:shadow-none"
                trackLabel="Project Modal Quote"
                onClick={onClose}
              >
                Get a Quote
              </Button>
              <Button
                href={`tel:${siteConfig.phone}`}
                variant="outline"
                className="min-h-12 px-4 py-3 text-sm"
                trackLabel="Project Modal"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
