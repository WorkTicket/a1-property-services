import HeroTitle from '@/components/ui/HeroTitle'
import LcpHeroImage from '@/components/ui/LcpHeroImage'
import HeroImagePreload from '@/components/ui/HeroImagePreload'

const heroSizeClasses = {
  default: 'min-h-[50vh] md:min-h-[55vh]',
  compact: 'min-h-[32vh] md:min-h-[38vh]',
} as const

type PageHeroProps = {
  imageSrc?: string
  imageAlt?: string
  eyebrow: string
  title: string
  subtitle?: string
  size?: keyof typeof heroSizeClasses
  align?: 'center' | 'left'
}

export default function PageHero({
  imageSrc,
  imageAlt = '',
  eyebrow,
  title,
  subtitle,
  size = 'default',
  align = 'center',
}: PageHeroProps) {
  const usePhoto = Boolean(imageSrc)
  const isLeft = align === 'center' ? false : align === 'left'

  return (
    <section
      className={`relative overflow-hidden flex items-center justify-center pt-24 pb-12 ${heroSizeClasses[size]} text-white ${usePhoto ? '' : 'bg-hero-gradient'}`}
    >
      {usePhoto && imageSrc && (
        <>
          <HeroImagePreload src={imageSrc} />
          <LcpHeroImage
            src={imageSrc}
            alt={imageAlt}
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </>
      )}

      <div
        className={`relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6 ${isLeft ? 'max-w-7xl text-left lg:px-8' : 'text-center'}`}
      >
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 className="hero-title mt-4">
          <HeroTitle>{title}</HeroTitle>
        </h1>
        {subtitle && (
          <p className={`hero-subtitle mt-4 md:mt-6 ${isLeft ? 'max-w-xl' : 'mx-auto max-w-xl'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
