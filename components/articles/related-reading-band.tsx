import Link from "next/link";

export type RelatedReadingItem = {
  label: string;
  title: string;
  href: string;
  readingTime: number;
};

export function RelatedReadingBand({
  heading,
  items,
}: {
  heading: string;
  items: RelatedReadingItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-band px-6 py-14 md:px-16">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-8 font-serif text-[28px] font-medium text-ink md:text-[30px]">
          {heading}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col gap-3 no-underline hover:opacity-70"
            >
              <span className="font-mono text-[11px] tracking-[.12em] text-accent uppercase">
                {item.label}
              </span>
              <h3 className="font-serif text-[22px] leading-[1.15] font-medium text-ink md:text-[24px]">
                {item.title}
              </h3>
              <span className="font-mono text-[11px] text-[#7a7e6e]">
                {item.readingTime} min read
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
