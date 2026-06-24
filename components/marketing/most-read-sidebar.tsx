import Link from "next/link";
import type { EssayFrontmatter } from "@/lib/content/schema";

type RankedEssay = {
  slug: string;
  frontmatter: EssayFrontmatter;
  readingTime: number;
};

export function MostReadSidebar({ essays }: { essays: RankedEssay[] }) {
  return (
    <aside className="rounded-[3px] border border-border-soft bg-surface p-7">
      <div className="mb-2 font-mono text-[11px] tracking-[.16em] text-accent-text uppercase">
        Most read this week
      </div>
      {essays.map((essay, index) => (
        <Link
          key={essay.slug}
          href={`/essays/${essay.slug}`}
          className={`flex gap-[18px] py-[18px] no-underline hover:opacity-65 ${
            index > 0 ? "border-t border-border-soft" : ""
          }`}
        >
          <span className="min-w-[26px] font-serif text-[22px] text-sage">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1">
            <span className="mb-[5px] block font-serif text-[19px] leading-[1.2] text-ink-strong">
              {essay.frontmatter.title}
            </span>
            <span className="font-mono text-[10px] tracking-[.08em] text-muted-3 uppercase">
              {essay.readingTime} min read
            </span>
          </span>
        </Link>
      ))}
    </aside>
  );
}
