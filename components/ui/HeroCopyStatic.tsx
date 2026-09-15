import { splitHeroTitle } from '@/lib/hero'
import type { ReactNode } from 'react'

/** System-font hero copy: avoids web-font reflow stealing LCP from the hero image. */
const SYSTEM_SANS = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
const SYSTEM_SERIF = 'Georgia, "Times New Roman", serif'
const BRAND_ACCENT = '#9E1B24'
const TITLE_SHADOW = '0 1px 2px rgba(0,0,0,0.55), 0 10px 28px rgba(0,0,0,0.35)'
const EDITORIAL_TITLE_SHADOW = '0 1px 2px rgba(0,0,0,0.7), 0 12px 36px rgba(0,0,0,0.45)'
const SUBTITLE_SHADOW = '0 1px 2px rgba(0,0,0,0.55), 0 8px 22px rgba(0,0,0,0.32)'

const eyebrowStyle = {
  fontFamily: SYSTEM_SANS,
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#fff',
  margin: 0,
}

const titleStyle = {
  fontFamily: SYSTEM_SERIF,
  fontWeight: 700,
  lineHeight: 1.05,
  color: '#fff',
  marginTop: '1rem',
  fontSize: 'clamp(2.15rem, 5.4vw, 4.6rem)',
  letterSpacing: '-0.03em',
}

const subtitleStyle = {
  fontFamily: SYSTEM_SANS,
  fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.94)',
  marginTop: '1.35rem',
  textShadow: SUBTITLE_SHADOW,
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
  const editorial = evenTitleLines
  const shrinkLine2 = editorial || (line2?.length ?? 0) > 20
  const textAlign = align === 'center' ? 'center' : 'left'
  const eyebrowAlign = align === 'center' ? 'center' : 'flex-start'

  return (
    <div>
      <p
        style={{
          ...eyebrowStyle,
          textAlign,
          display: 'flex',
          alignItems: 'center',
          justifyContent: eyebrowAlign,
          gap: '0.75rem',
          color: '#fff',
          textShadow: editorial ? '0 1px 10px rgba(0,0,0,0.55)' : undefined,
        }}
      >
        {editorial ? (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '2.5rem',
              height: '2px',
              background: BRAND_ACCENT,
              flexShrink: 0,
            }}
          />
        ) : null}
        {eyebrow}
      </p>
      <h1
        style={{
          ...titleStyle,
          fontSize: editorial ? 'clamp(2.35rem, 5.6vw, 4.35rem)' : titleStyle.fontSize,
          textAlign,
          maxWidth: titleMaxWidth,
          margin: editorial ? '1.1rem 0 0' : '1.25rem 0 0',
          textShadow: editorial || textWash ? EDITORIAL_TITLE_SHADOW : TITLE_SHADOW,
        }}
      >
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: editorial ? '0.55rem' : '0.25rem',
            alignItems: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <span
            style={{
              display: 'block',
              textWrap: 'balance',
              maxWidth: editorial ? '8.6em' : undefined,
            }}
          >
            {line1}
          </span>
          {line2 ? (
            <span
              style={{
                display: 'block',
                textWrap: 'balance',
                fontFamily: editorial ? SYSTEM_SERIF : undefined,
                fontSize: editorial
                  ? 'clamp(1.15rem, 2.3vw, 1.7rem)'
                  : shrinkLine2
                    ? 'clamp(0.95rem, 2.4vw, 1.85rem)'
                    : 'inherit',
                fontWeight: editorial ? 400 : shrinkLine2 ? 600 : undefined,
                fontStyle: editorial ? 'italic' : undefined,
                lineHeight: editorial ? 1.3 : 1.25,
                letterSpacing: editorial ? '-0.015em' : shrinkLine2 ? '0.01em' : undefined,
                color: editorial ? '#fff' : undefined,
                textShadow: editorial ? EDITORIAL_TITLE_SHADOW : undefined,
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
            marginTop: editorial ? '1.35rem' : subtitleStyle.marginTop,
            marginLeft: align === 'center' ? 'auto' : undefined,
            marginRight: align === 'center' ? 'auto' : undefined,
            color: editorial ? 'rgba(255,255,255,0.96)' : subtitleStyle.color,
            textShadow: editorial || textWash ? SUBTITLE_SHADOW : TITLE_SHADOW,
          }}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  )
}
