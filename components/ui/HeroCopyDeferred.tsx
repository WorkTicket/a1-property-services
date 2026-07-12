import HeroCopyStatic from '@/components/ui/HeroCopyStatic'

type HeroCopyDeferredProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleMaxWidth?: string
  subtitleMaxWidth?: string
}

/** System-font hero copy; visible on first paint (see HeroCopyStatic). */
export default function HeroCopyDeferred(props: HeroCopyDeferredProps) {
  return <HeroCopyStatic {...props} />
}
