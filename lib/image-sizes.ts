/** Shared `sizes` hints — tuned for max-w-7xl layouts and 2x desktop displays. */
export const IMAGE_SIZES = {
  /** Full-bleed heroes on large viewports (up to 1920px wide). */
  hero: '(max-width: 768px) 100vw, 1920px',
  /** Two-column grids inside section-inner (~640px max display width). */
  halfCol: '(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px',
  /** Three-column service cards (~400px max display width). */
  thirdCol: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  /** Gallery / before-after sliders in a two-column grid. */
  galleryGrid: '(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 640px',
  fullWidth: '100vw',
} as const
