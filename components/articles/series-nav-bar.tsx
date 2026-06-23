import Link from "next/link";

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
  return (
    <div className="mx-auto mt-6 max-w-[720px] px-6">
      <div className="flex flex-col gap-3 rounded-[3px] bg-band px-[22px] py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-[3px]">
          <span className="font-mono text-[11px] tracking-[.1em] text-[#6a7060] uppercase">
            Series · {seriesTitle}
          </span>
          <span className="text-[14px] font-semibold text-[#3b3c34]">
            Essay {currentInstallment} of {totalPlanned}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-[18px] text-[13px] font-semibold">
          {firstInstallment && (
            <Link
              href={`/essays/${firstInstallment.slug}`}
              className="text-[#5f6253] no-underline hover:text-accent"
            >
              Start from Essay One
            </Link>
          )}
          {previous && (
            <Link
              href={`/essays/${previous.slug}`}
              className="rounded-[2px] border border-[#b9c2ad] px-3 py-[6px] text-accent no-underline hover:bg-white"
            >
              ← Prev
            </Link>
          )}
          {next && (
            <Link
              href={`/essays/${next.slug}`}
              className="rounded-[2px] border border-[#b9c2ad] px-3 py-[6px] text-accent no-underline hover:bg-white"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
