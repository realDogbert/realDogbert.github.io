/**
 * Utility Functions for Blog Feature
 */

/**
 * Format Date object to human-readable string
 * @param date - The date to format
 * @returns Formatted date string (e.g., "January 25, 2026")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Calculate read time from paragraph array
 * Uses 200 words per minute standard, rounds up to nearest minute
 * @param content - Array of paragraph strings
 * @returns Estimated read time in minutes
 */
export function calculateReadTime(content: string[]): number {
  const text = content.join(' ');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}
