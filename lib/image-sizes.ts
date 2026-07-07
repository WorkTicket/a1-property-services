/** Shared `sizes` hints — tuned for max-w-7xl layouts and 2x desktop displays. */
export const IMAGE_SIZES = {
  /** Full-bleed heroes — scales with viewport for accurate desktop resolution selection. */
  hero: '(max-width: 768px) 55vw, 100vw',
  /** Two-column grids inside section-inner (~640px max display width). */
  halfCol: '(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px',
  /** Three-column service cards (~400px max display width). */
  thirdCol: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  /** Gallery / before-after sliders — up to 2560px for 3x retina desktop. */
  galleryGrid: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 1920px',
  fullWidth: '100vw',
} as const
