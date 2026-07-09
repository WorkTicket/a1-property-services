import Image from 'next/image'
import { cn } from '@/lib/utils'
import { siteImages } from '@/lib/images'

type LogoMarkProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { box: 'h-9 w-9', img: 28 },
  md: { box: 'h-11 w-11', img: 34 },
  lg: { box: 'h-14 w-14', img: 44 },
} as const

export default function LogoMark({ size = 'md', className }: LogoMarkProps) {
  const { box, img } = sizeMap[size]

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5',
        box,
        className,
      )}
    >
      <Image
        src={siteImages.icon}
        alt="A1 Property Services logo"
        width={img}
        height={img}
        className="rounded-full object-cover"
      />
    </div>
  )
}
