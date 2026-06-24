"use client";

import { useSeriesProgressSnapshot } from "@/lib/series-progress/use-series-progress";

export function SeriesReadProgressSummary({
  seriesSlug,
  totalPublished,
}: {
  seriesSlug: string;
  totalPublished: number;
}) {
  const progress = useSeriesProgressSnapshot(seriesSlug);

  if (progress === null || totalPublished === 0) return null;

  const readCount = progress.readEssays.length;
  const percent = Math.round((readCount / totalPublished) * 100);

  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 md:px-16">
      <div className="flex flex-col gap-2 border-t border-border pt-6">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[.06em] text-muted-3 uppercase">
          <span>
            {readCount} of {totalPublished} essays read
          </span>
          <span>{percent}%</span>
        </div>
        <div className="h-[5px] overflow-hidden rounded-full bg-progress-track">
          <div
            className="h-[5px] rounded-full bg-accent"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-[12px] text-muted-3">
          Reading progress is saved on this device only.
        </p>
      </div>
    </div>
  );
}
