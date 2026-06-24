"use client";

import Link from "next/link";
import { useSeriesProgressSnapshot } from "@/lib/series-progress/use-series-progress";

export type ReadingOrderEntry = {
  installment: number;
  title: string;
  href: string | null;
  slug: string | null;
};

type ReadState = "unread" | "reading-now" | "read" | "upcoming";

const STATE_LABEL: Record<ReadState, string> = {
  unread: "Published",
  "reading-now": "Reading now",
  read: "Read",
  upcoming: "Upcoming",
};

const STATE_BADGE_CLASSES: Record<ReadState, string> = {
  unread: "bg-chip-neutral text-muted-1",
  "reading-now": "bg-accent text-accent-foreground",
  read: "bg-sage text-accent-foreground",
  upcoming: "border border-border-card text-muted-3",
};

export function ReadingOrder({
  seriesSlug,
  entries,
}: {
  seriesSlug: string;
  entries: ReadingOrderEntry[];
}) {
  const progress = useSeriesProgressSnapshot(seriesSlug);

  function getState(entry: ReadingOrderEntry): ReadState {
    if (!entry.slug) return "upcoming";
    if (progress?.readEssays.includes(entry.slug)) return "read";
    if (progress && progress.lastRead === entry.slug) return "reading-now";
    return "unread";
  }

  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-12 md:px-16 md:py-[72px]">
      <div className="grid gap-10 md:grid-cols-[.55fr_1.45fr] md:gap-14">
        <div>
          <h2 className="mb-3 font-serif text-[28px] font-medium text-ink md:text-[32px]">
            Reading order
          </h2>
          <p className="max-w-[26ch] text-[15px] leading-[1.6] text-muted-2">
            Best read in sequence, but each can stand alone.
          </p>
        </div>
        <div className="flex flex-col">
          {entries.map((entry, index) => {
            const isPublished = entry.href !== null;
            const state = getState(entry);
            const row = (
              <span
                className={`flex items-center gap-6 border-t border-border py-5 ${
                  index === entries.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span
                  className={`min-w-[46px] font-serif text-[26px] ${
                    isPublished ? "text-sage" : "text-muted-3"
                  }`}
                >
                  {String(entry.installment).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-[20px] ${
                    isPublished ? "text-ink" : "text-muted-3"
                  }`}
                >
                  {entry.title}
                </span>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full px-[11px] py-[5px] font-mono text-[10px] tracking-[.06em] uppercase ${STATE_BADGE_CLASSES[state]}`}
                >
                  {STATE_LABEL[state]}
                </span>
              </span>
            );

            return isPublished ? (
              <Link
                key={entry.installment}
                href={entry.href!}
                className="no-underline hover:opacity-65"
              >
                {row}
              </Link>
            ) : (
              <div key={entry.installment}>{row}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
