import { MediumIcon } from "@/components/reading-list/medium-icon";
import type { ReadingListFrontmatter } from "@/lib/content/schema";

export function ReadingListRow({
  item,
  onSelect,
}: {
  item: { slug: string; frontmatter: ReadingListFrontmatter };
  onSelect: () => void;
}) {
  const { title, creator, blurb } = item.frontmatter;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="grid w-full grid-cols-[40px_1fr] items-start gap-5 border-t border-border py-[26px] text-left hover:opacity-[.78]"
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
          <div className="mb-[8px] font-mono text-[11px] tracking-[.06em] text-muted-3 uppercase">
            {creator}
          </div>
        )}
        <p className="max-w-[58ch] text-[15px] leading-[1.55] text-muted-2">{blurb}</p>
      </div>
    </button>
  );
}
