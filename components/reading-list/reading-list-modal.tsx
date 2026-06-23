"use client";

import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { MediumIcon } from "@/components/reading-list/medium-icon";
import { Pill } from "@/components/ui/pill";
import type { ReadingListFrontmatter } from "@/lib/content/schema";

const mediumLabel: Record<ReadingListFrontmatter["medium"], string> = {
  book: "Book",
  podcast: "Podcast",
  film: "Film",
  article: "Article",
  essay: "Essay",
};

export function ReadingListModal({
  item,
  onClose,
}: {
  item: { slug: string; frontmatter: ReadingListFrontmatter; topicLabels: string[] };
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const { title, creator, blurb, externalUrl, medium } = item.frontmatter;
  const { topicLabels } = item;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-[6px] bg-surface p-8 md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-muted-3 hover:text-accent-text"
        >
          <X size={18} strokeWidth={1.6} />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <MediumIcon medium={medium} className="h-5 w-5 text-sage" strokeWidth={1.5} />
          <Pill>{mediumLabel[medium]}</Pill>
        </div>

        <h2 className="mb-2 font-serif text-[26px] leading-[1.15] font-medium text-ink-strong md:text-[30px]">
          {title}
        </h2>
        {creator && (
          <div className="mb-5 font-mono text-[12px] tracking-[.06em] text-muted-4 uppercase">
            {creator}
          </div>
        )}
        <p className="mb-6 text-[16px] leading-[1.6] text-muted-2">{blurb}</p>

        {topicLabels.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {topicLabels.map((label) => (
              <Pill key={label} variant="outline">
                {label}
              </Pill>
            ))}
          </div>
        )}

        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-accent px-[26px] py-[14px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
        >
          Open link
          <ExternalLink size={15} strokeWidth={1.8} />
        </a>
      </div>
    </div>
  );
}
