import { splitHeroTitle } from '@/lib/hero'
import type { ReactNode } from 'react'

/** System-font hero copy: avoids web-font reflow stealing LCP from the hero image. */
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
  lineHeight: 1.08,
  color: '#fff',
  marginTop: '1rem',
  fontSize: 'clamp(2.15rem, 5.4vw, 4.6rem)',
  letterSpacing: '-0.025em',
}

const subtitleStyle = {
  fontFamily: SYSTEM_SANS,
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.92)',
  marginTop: '1.35rem',
  textShadow: '0 1px 10px rgba(0,0,0,0.4)',
}

type HeroCopyStaticProps = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleMaxWidth?: string
  subtitleMaxWidth?: string
  evenTitleLines?: boolean
  /** Extra local wash behind copy. Photo heroes use the shared overlay instead. */
  textWash?: boolean
  children?: ReactNode
}

export default function HeroCopyStatic({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  titleMaxWidth = '56rem',
  subtitleMaxWidth = '640px',
  evenTitleLines = false,
  textWash = false,
  children,
}: HeroCopyStaticProps) {
  const [line1, line2] = splitHeroTitle(title)
  const shrinkLine2 = evenTitleLines || (line2?.length ?? 0) > 20
  const textAlign = align === 'center' ? 'center' : 'left'

  return (
    <div>
      <p style={{ ...eyebrowStyle, textAlign }}>{eyebrow}</p>
      <h1
        style={{
          ...titleStyle,
          textAlign,
          maxWidth: titleMaxWidth,
          margin: '1.25rem 0 0',
          textShadow: textWash ? '0 2px 28px rgba(0,0,0,0.32)' : '0 1px 14px rgba(0,0,0,0.22)',
        }}
      >
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: evenTitleLines ? '0.55em' : '0.25rem',
            alignItems: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <span style={{ display: 'block', textWrap: 'balance' }}>{line1}</span>
          {line2 ? (
            <span
              style={{
                display: 'block',
                textWrap: 'balance',
                fontSize: shrinkLine2 ? 'clamp(0.95rem, 2.4vw, 1.85rem)' : 'inherit',
                fontWeight: shrinkLine2 ? 600 : undefined,
                lineHeight: 1.25,
                letterSpacing: shrinkLine2 ? '0.01em' : undefined,
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
            textShadow: textWash ? subtitleStyle.textShadow : '0 1px 8px rgba(0,0,0,0.28)',
          }}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  )
}
