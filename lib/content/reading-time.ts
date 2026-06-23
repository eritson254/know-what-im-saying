const WORDS_PER_MINUTE = 225;

/** Estimates reading time in whole minutes (minimum 1) from raw MDX body text. */
export function calculateReadingTime(body: string): number {
  const plainText = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_~-]/g, " ");

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
