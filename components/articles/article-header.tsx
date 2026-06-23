import { Pill } from "@/components/ui/pill";
import { getTopicBySlug } from "@/lib/content/topics";
import { formatDisplayDate } from "@/lib/utils/format-date";
import type { EssayFrontmatter } from "@/lib/content/schema";

export function ArticleHeader({
  frontmatter,
  readingTime,
}: {
  frontmatter: EssayFrontmatter;
  readingTime: number;
}) {
  const topic = getTopicBySlug(frontmatter.topic);
  const series = frontmatter.series;

  return (
    <article className="mx-auto max-w-[720px] px-6 pt-16 md:pt-[72px]">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {topic && <Pill>{topic.label}</Pill>}
        {series && (
          <Pill variant="outline">
            Series · Essay {series.installment} of {series.totalPlanned}
          </Pill>
        )}
      </div>
      <h1 className="mb-6 text-center font-serif text-[42px] leading-[1.05] font-medium tracking-[-.01em] text-ink md:text-[64px]">
        {frontmatter.title}
      </h1>
      <p className="mx-auto mb-[34px] text-center font-serif text-[19px] leading-[1.5] text-muted-1 italic md:text-[22px]">
        {frontmatter.description}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 border-b border-border pb-9 font-mono text-[12px] tracking-[.05em] text-muted-3 uppercase">
        <span>{formatDisplayDate(frontmatter.date)}</span>
        <span className="text-border-card">·</span>
        <span>{readingTime} min read</span>
        <span className="text-border-card">·</span>
        <span className="text-accent-text">Share</span>
      </div>
    </article>
  );
}
