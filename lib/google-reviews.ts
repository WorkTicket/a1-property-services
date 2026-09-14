/** Keep the owner's name off public pages, including quoted Google reviews. */
export function redactOwnerName(text: string): string {
  return text
    .replace(/\bMac and his team\b/gi, 'The crew')
    .replace(/\bMac\b/g, 'the crew')
    .replace(/^the crew/i, 'The crew')
}
