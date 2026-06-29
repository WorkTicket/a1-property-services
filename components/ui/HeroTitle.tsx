import { splitHeroTitle } from '@/lib/hero'
import { cn } from '@/lib/utils'

type HeroTitleProps = {
  children: string
  className?: string
}

export default function HeroTitle({ children, className }: HeroTitleProps) {
  const [line1, line2] = splitHeroTitle(children)
  const line2Long = (line2?.length ?? 0) > 20

  return (
    <span className={cn('flex min-w-0 max-w-full flex-col gap-1 sm:gap-1.5', className)}>
      <span className="block text-balance">{line1}</span>
      {line2 ? (
        <span
          className={cn(
            'block text-balance text-white/90',
            line2Long && 'text-[clamp(0.875rem,2.6vw,3.25rem)]',
          )}
        >
          {line2}
        </span>
      ) : null}
    </span>
  )
}
