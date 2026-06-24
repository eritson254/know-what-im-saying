"use client";

import { useState } from "react";
import { ReadingListRow } from "@/components/reading-list/reading-list-row";
import { ReadingListModal } from "@/components/reading-list/reading-list-modal";
import type { ReadingListFrontmatter } from "@/lib/content/schema";

type ReadingListEntry = {
  slug: string;
  frontmatter: ReadingListFrontmatter;
  topicLabels: string[];
};

const mediumOrder: { medium: ReadingListFrontmatter["medium"]; label: string }[] = [
  { medium: "book", label: "Books" },
  { medium: "podcast", label: "Podcasts" },
  { medium: "film", label: "Films" },
  { medium: "article", label: "Articles" },
  { medium: "essay", label: "Essays" },
];

export function ReadingListGroups({ items }: { items: ReadingListEntry[] }) {
  const [selected, setSelected] = useState<ReadingListEntry | null>(null);

  return (
    <>
      {mediumOrder.map(({ medium, label }) => {
        const group = items.filter((item) => item.frontmatter.medium === medium);
        if (group.length === 0) return null;

        return (
          <div key={medium} className="mb-14">
            <h2 className="mb-2 font-mono text-[12px] tracking-[.14em] text-muted-3 uppercase">
              {label}
            </h2>
            <div className="flex flex-col">
              {group.map((item) => (
                <ReadingListRow
                  key={item.slug}
                  item={item}
                  onSelect={() => setSelected(item)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {selected && (
        <ReadingListModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
