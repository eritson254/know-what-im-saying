import Link from "next/link";
import { Pill } from "@/components/ui/pill";
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
      className="block border-t border-border py-[30px] no-underline hover:opacity-[.78]"
    >
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
      <div className="font-mono text-[11px] tracking-[.06em] text-muted-3 uppercase">
        {formatShortDate(essay.frontmatter.date)} · {readingTime} min read
      </div>
    </Link>
  );
}
