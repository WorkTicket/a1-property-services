import { gallerySections } from '@/lib/images'
import FadeIn from '@/components/motion/FadeIn'
import GalleryGrid from '@/components/sections/GalleryGrid'

export default function GallerySections() {
  return (
    <>
      {gallerySections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={`section ${index % 2 === 0 ? 'bg-white' : 'bg-brand-stone'}`}
        >
          <div className="section-inner">
            <FadeIn className="text-center">
              <h2 className="section-heading">{section.title}</h2>
              <p className="mt-2 text-brand-muted max-w-xl mx-auto">{section.description}</p>
            </FadeIn>

            <div className="mt-10">
              <GalleryGrid projects={section.projects} />
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
