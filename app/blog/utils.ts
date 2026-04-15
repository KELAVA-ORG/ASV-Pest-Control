/**
 * Estimate reading time from Sanity Portable Text blocks.
 * Returns minutes (minimum 1).
 */
export function estimateReadingTime(body?: unknown[]): number {
  if (!body || !Array.isArray(body)) return 1
  let wordCount = 0
  for (const block of body) {
    const b = block as { _type?: string; children?: Array<{ text?: string }> }
    if (b._type === 'block' && b.children) {
      for (const child of b.children) {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(Boolean).length
        }
      }
    }
  }
  return Math.max(1, Math.round(wordCount / 200))
}

/**
 * Format an ISO date string to German locale.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
