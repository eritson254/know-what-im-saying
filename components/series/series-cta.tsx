"use client";

import Link from "next/link";
import { useSeriesProgressSnapshot } from "@/lib/series-progress/use-series-progress";

type PublishedInstallment = {
  slug: string;
  installment: number;
};

export function SeriesCta({
  seriesSlug,
  publishedInstallments,
}: {
  seriesSlug: string;
  publishedInstallments: PublishedInstallment[];
}) {
  const progress = useSeriesProgressSnapshot(seriesSlug);
  const first = publishedInstallments[0];
  if (!first) return null;

  if (!progress || progress.readEssays.length === 0) {
    return (
      <Link
        href={`/essays/${first.slug}`}
        className="inline-block rounded-[2px] bg-accent px-[26px] py-[14px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
      >
        Start with Essay One
      </Link>
    );
  }

  const firstUnread = publishedInstallments.find(
    (item) => !progress.readEssays.includes(item.slug),
  );
  const target = firstUnread ?? publishedInstallments[publishedInstallments.length - 1];
  const label = firstUnread ? "Continue here" : "Read again";

  return (
    <Link
      href={`/essays/${target.slug}`}
      className="inline-block rounded-[2px] bg-accent px-[26px] py-[14px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
    >
      {label}
    </Link>
  );
}
