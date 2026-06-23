import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Installment = {
  slug: string;
  installment: number;
};

export function SeriesNavBar({
  seriesTitle,
  currentInstallment,
  totalPlanned,
  previous,
  next,
  firstInstallment,
}: {
  seriesTitle: string;
  currentInstallment: number;
  totalPlanned: number;
  previous: Installment | null;
  next: Installment | null;
  firstInstallment: Installment | null;
}) {
  const dots = Array.from({ length: totalPlanned }, (_, i) => i + 1);

  return (
    <div className="mx-auto mt-8 max-w-[720px] px-6">
      <div className="flex flex-col gap-5 border-y border-border py-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="font-mono text-[11px] tracking-[.1em] text-muted-2 uppercase">
            Series · {seriesTitle}
          </span>
          <span className="font-mono text-[11px] tracking-[.1em] text-muted-3 uppercase">
            Essay {currentInstallment} of {totalPlanned}
          </span>
        </div>

        <div className="flex items-center">
          {dots.map((n) => (
            <span key={n} className={`flex items-center ${n !== totalPlanned ? "flex-1" : ""}`}>
              <span
                className={`block h-[7px] w-[7px] shrink-0 rounded-full ${
                  n <= currentInstallment ? "bg-accent-text" : "bg-border-strong"
                }`}
              />
              {n !== totalPlanned && <span className="mx-[6px] h-px flex-1 bg-border-strong" />}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] font-semibold">
          {firstInstallment ? (
            <Link
              href={`/essays/${firstInstallment.slug}`}
              className="text-muted-1 no-underline hover:text-accent-text"
            >
              ← Start from Essay One
            </Link>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            {previous && (
              <Link
                href={`/essays/${previous.slug}`}
                aria-label="Previous essay"
                className="flex items-center gap-1 rounded-full border border-border-strong px-3 py-[6px] text-accent-text no-underline transition-colors hover:bg-surface"
              >
                <ChevronLeft size={14} strokeWidth={2} />
                Prev
              </Link>
            )}
            {next && (
              <Link
                href={`/essays/${next.slug}`}
                aria-label="Next essay"
                className="flex items-center gap-1 rounded-full border border-border-strong px-3 py-[6px] text-accent-text no-underline transition-colors hover:bg-surface"
              >
                Next
                <ChevronRight size={14} strokeWidth={2} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
