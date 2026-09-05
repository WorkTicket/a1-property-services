/** Average adult silent reading speed for English prose (Nielsen Norman Group). */
export const WORDS_PER_MINUTE = 238

export function countWords(text: string): number {
  return text
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function minutesFromWords(wordCount: number): number {
  if (wordCount <= 0) return 1
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}

export function readingTimeIsoDuration(minutes: number): string {
  return `PT${minutes}M`
}
