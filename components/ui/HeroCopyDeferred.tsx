import HeroCopyStatic from '@/components/ui/HeroCopyStatic'
import type { ReactNode } from 'react'

type HeroCopyDeferredProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleMaxWidth?: string
  subtitleMaxWidth?: string
  evenTitleLines?: boolean
  textWash?: boolean
  children?: ReactNode
}

/** System-font hero copy; visible on first paint (see HeroCopyStatic). */
export default function HeroCopyDeferred(props: HeroCopyDeferredProps) {
  return <HeroCopyStatic {...props} />
}
