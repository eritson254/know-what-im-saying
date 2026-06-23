import { ExternalLink } from "lucide-react";
import { MediumIcon } from "@/components/reading-list/medium-icon";
import type { ReadingListFrontmatter } from "@/lib/content/schema";

export function ReadingListRow({
  item,
}: {
  item: { slug: string; frontmatter: ReadingListFrontmatter };
}) {
  const { title, creator, blurb, externalUrl } = item.frontmatter;

  return (
    <a
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="grid grid-cols-[40px_1fr_auto] items-start gap-5 border-t border-border py-[26px] no-underline hover:opacity-[.78]"
    >
      <MediumIcon
        medium={item.frontmatter.medium}
        className="mt-[2px] h-5 w-5 text-sage"
        strokeWidth={1.5}
      />
      <div>
        <h3 className="mb-[6px] font-serif text-[22px] leading-[1.15] font-medium text-ink-strong md:text-[24px]">
          {title}
        </h3>
        {creator && (
          <div className="mb-[8px] font-mono text-[11px] tracking-[.06em] text-muted-4 uppercase">
            {creator}
          </div>
        )}
        <p className="max-w-[58ch] text-[15px] leading-[1.55] text-muted-2">{blurb}</p>
      </div>
      <ExternalLink className="mt-[4px] h-4 w-4 text-muted-4" strokeWidth={1.5} />
    </a>
  );
}
