import Link from "next/link";

type ReadingOrderEntry = {
  installment: number;
  title: string;
  href: string | null;
};

export function ReadingOrder({ entries }: { entries: ReadingOrderEntry[] }) {
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
            const row = (
              <span
                className={`flex items-center gap-6 border-t border-border py-5 ${
                  index === entries.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span
                  className={`min-w-[46px] font-serif text-[26px] ${
                    isPublished ? "text-sage" : "text-[#c7c3b3]"
                  }`}
                >
                  {String(entry.installment).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 text-[20px] ${
                    isPublished ? "text-ink" : "text-muted-4"
                  }`}
                >
                  {entry.title}
                </span>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full px-[11px] py-[5px] font-mono text-[10px] tracking-[.06em] uppercase ${
                    isPublished
                      ? "bg-[#E6E3D6] text-[#5f6253]"
                      : "border border-border-card text-[#a9a795]"
                  }`}
                >
                  {isPublished ? "Published" : "Upcoming"}
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
