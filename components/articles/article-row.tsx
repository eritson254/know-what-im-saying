import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { getTopicBySlug } from "@/lib/content/topics";
import { formatShortDate } from "@/lib/utils/format-date";
import type { EssayFrontmatter } from "@/lib/content/schema";

export function ArticleRow({
  essay,
  readingTime,
}: {
  essay: { slug: string; frontmatter: EssayFrontmatter };
  readingTime: number;
}) {
  const topic = getTopicBySlug(essay.frontmatter.topic);

  return (
    <Link
      href={`/essays/${essay.slug}`}
      className="grid grid-cols-1 items-center gap-6 border-t border-border py-[30px] no-underline hover:opacity-[.78] sm:grid-cols-[200px_1fr] sm:gap-8"
    >
      <PlaceholderImage label="essay image" aspectRatio="7 / 5" />
      <div>
        {topic && (
          <div className="mb-3">
            <Pill>{topic.label}</Pill>
          </div>
        )}
        <h3 className="mb-[10px] font-serif text-[28px] leading-[1.08] font-medium text-ink-strong md:text-[32px]">
          {essay.frontmatter.title}
        </h3>
        <p className="mb-[14px] max-w-[52ch] text-[16px] leading-[1.55] text-muted-2">
          {essay.frontmatter.description}
        </p>
        <div className="font-mono text-[11px] tracking-[.06em] text-muted-4 uppercase">
          {formatShortDate(essay.frontmatter.date)} · {readingTime} min read
        </div>
      </div>
    </Link>
  );
}
