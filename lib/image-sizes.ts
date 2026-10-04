/** Shared `sizes` hints: tuned for max-w-7xl layouts and 2x desktop displays. */
export const IMAGE_SIZES = {
  /** Full-viewport heroes that are width-constrained. */
  hero: '100vw',
  /**
   * Home hero is a 3:2 photo with object-fit: cover. On any screen narrower than
   * that (phones, and most tablets), the bitmap is scaled to the viewport height,
   * so the displayed width is about 1.5× the viewport height. `sizes` has to
   * describe that width or the browser downloads a small file and upscales it.
   */
  homeHero: '(max-aspect-ratio: 3/2) max(100vw, 150vh), 100vw',
  /** Inner-page heroes are ~50vh; 1280 CSS px keeps 2x displays on the 1920 variant. */
  pageHero: '(max-width: 768px) 100vw, 1280px',
  /** Two-column grids inside section-inner (~640px max display width). */
  halfCol: '(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px',
  /** Three-column service cards (~400px max display width). */
  thirdCol: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  /** 1–3 column gallery cards (~420px CSS on desktop, 2x → 840). */
  galleryGrid: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 768px',
  /** Project modal image pane (~half of max-w-5xl, 2x → 1440). */
  galleryModal: '(max-width: 1024px) 100vw, 720px',
  /** Case-study slider matches the article column (max-w-3xl, 2x → 1536). */
  galleryFeatured: '(max-width: 768px) 100vw, 768px',
  /** Blog/learn list thumbnails (~11rem on desktop). */
  articleThumb: '(max-width: 768px) 100vw, 280px',
  fullWidth: '100vw',
} as const
