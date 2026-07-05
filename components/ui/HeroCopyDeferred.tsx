import HeroCopyStatic from '@/components/ui/HeroCopyStatic'

type HeroCopyDeferredProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleMaxWidth?: string
  subtitleMaxWidth?: string
}

/** Brief CSS reveal keeps hero image as LCP candidate without hiding copy from users. */
export default function HeroCopyDeferred(props: HeroCopyDeferredProps) {
  return (
    <div className="hero-copy-reveal">
      <HeroCopyStatic {...props} />
    </div>
  )
}
