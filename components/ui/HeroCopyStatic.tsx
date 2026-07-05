import { splitHeroTitle } from '@/lib/hero'

/** System-font hero copy — avoids web-font reflow stealing LCP from the hero image. */
const SYSTEM_SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
const SYSTEM_SERIF = 'Georgia, "Times New Roman", serif'

const eyebrowStyle = {
  fontFamily: SYSTEM_SANS,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: '#fff',
  margin: 0,
}

const titleStyle = {
  fontFamily: SYSTEM_SERIF,
  fontWeight: 700,
  lineHeight: 1.1,
  color: '#fff',
  marginTop: '1rem',
  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
}

const subtitleStyle = {
  fontFamily: SYSTEM_SANS,
  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
  lineHeight: 1.625,
  color: '#fff',
  marginTop: '1.25rem',
  textShadow: '0 1px 4px rgba(0,0,0,0.35)',
}

type HeroCopyStaticProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleMaxWidth?: string
  subtitleMaxWidth?: string
}

export default function HeroCopyStatic({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  titleMaxWidth = '56rem',
  subtitleMaxWidth = '640px',
}: HeroCopyStaticProps) {
  const [line1, line2] = splitHeroTitle(title)
  const line2Long = (line2?.length ?? 0) > 20
  const textAlign = align === 'center' ? 'center' : 'left'

  return (
    <>
      <div style={{ ...eyebrowStyle, textAlign, display: 'block' }}>{eyebrow}</div>
      <h1 style={{ ...titleStyle, textAlign, maxWidth: titleMaxWidth, margin: 0 }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: align === 'center' ? 'center' : 'flex-start' }}>
          <span style={{ display: 'block' }}>{line1}</span>
          {line2 ? (
            <span
              style={{
                display: 'block',
                fontSize: line2Long ? 'clamp(0.875rem, 2.6vw, 3.25rem)' : undefined,
              }}
            >
              {line2}
            </span>
          ) : null}
        </span>
      </h1>
      {subtitle ? (
        <p
          style={{
            ...subtitleStyle,
            textAlign,
            maxWidth: subtitleMaxWidth,
            marginLeft: align === 'center' ? 'auto' : undefined,
            marginRight: align === 'center' ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </>
  )
}
