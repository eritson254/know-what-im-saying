import Link from "next/link";
import { ArticleRow } from "@/components/articles/article-row";
import { MostReadSidebar } from "@/components/marketing/most-read-sidebar";
import { TopicFilterRow } from "@/components/marketing/topic-filter-row";
import type { EssayFrontmatter } from "@/lib/content/schema";

type EssayEntry = {
  slug: string;
  frontmatter: EssayFrontmatter;
  readingTime: number;
};

export function LatestWriting({
  essays,
  mostRead,
}: {
  essays: EssayEntry[];
  mostRead: EssayEntry[];
}) {
  return (
    <section className="border-t border-border-strong px-6 py-12 md:px-14 md:py-[54px] md:pb-[72px]">
      <div className="mx-auto grid max-w-[1240px] items-start gap-10 md:grid-cols-[1fr_330px] md:gap-16">
        <div>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="font-serif text-[34px] font-medium text-ink-strong">
              Latest writing
            </h2>
            <Link
              href="/essays"
              className="font-mono text-[12px] tracking-[.1em] text-muted-3 uppercase no-underline hover:text-accent-text"
            >
              View all essays →
            </Link>
          </div>
          <TopicFilterRow />
          {essays.map((essay) => (
            <ArticleRow
              key={essay.slug}
              essay={essay}
              readingTime={essay.readingTime}
            />
          ))}
        </div>
        <MostReadSidebar essays={mostRead} />
      </div>
    </section>
  );
}
