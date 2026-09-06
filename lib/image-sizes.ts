/** Shared `sizes` hints: tuned for max-w-7xl layouts and 2x desktop displays. */
export const IMAGE_SIZES = {
  /** Full-viewport home hero. */
  hero: '100vw',
  /** Inner-page heroes are ~50vh; 1280 CSS px keeps 2x displays on the 1920 variant. */
  pageHero: '(max-width: 768px) 100vw, 1280px',
  /** Two-column grids inside section-inner (~640px max display width). */
  halfCol: '(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px',
  /** Three-column service cards (~400px max display width). */
  thirdCol: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  /** Gallery cards and project modal: keep identical so the modal reuses cached variants. */
  galleryGrid: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  galleryModal: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  fullWidth: '100vw',
} as const
