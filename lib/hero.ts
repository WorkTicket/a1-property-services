/**
 * Splits a hero headline into two lines for consistent layout.
 * Supports explicit "|" delimiter, then " in {location}", commas,
 * trailing descriptors (Professionals, Services), and midpoint word split.
 */
export function splitHeroTitle(title: string): [string, string] {
  const trimmed = title.trim()
  if (!trimmed) return ['', '']

  if (trimmed.includes('|')) {
    const [line1, line2] = trimmed.split('|').map((part) => part.trim())
    return [line1 ?? '', line2 ?? '']
  }

  const inLocation = trimmed.match(/^(.+?)\s+(in\s+.+)$/i)
  if (inLocation) {
    return [inLocation[1].trim(), inLocation[2].trim()]
  }

  const descriptor = trimmed.match(/^(.+?)\s+(Professionals|Services|Experts|Gallery|Blog)$/i)
  if (descriptor) {
    return [descriptor[1].trim(), descriptor[2].trim()]
  }

  const commaIndex = trimmed.indexOf(',')
  if (commaIndex > 0) {
    return [trimmed.slice(0, commaIndex).trim(), trimmed.slice(commaIndex + 1).trim()]
  }

  const words = trimmed.split(/\s+/)
  if (words.length <= 2) {
    return [words[0] ?? trimmed, words.slice(1).join(' ') || '']
  }

  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}
