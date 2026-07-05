import HeroCopyStatic from '@/components/ui/HeroCopyStatic'

type HeroCopyDeferredProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleMaxWidth?: string
  subtitleMaxWidth?: string
}

/** Opacity-0 until CSS animation runs — excluded from LCP while staying in HTML for SEO. */
export default function HeroCopyDeferred(props: HeroCopyDeferredProps) {
  return (
    <div className="hero-copy-reveal" style={{ opacity: 0 }}>
      <HeroCopyStatic {...props} />
    </div>
  )
}
