import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedReadingItem = {
  label: string;
  title: string;
  description: string;
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
    <section className="bg-band px-6 py-14 md:px-16 md:py-[72px]">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-9 font-serif text-[28px] font-medium text-ink md:text-[30px]">
          {heading}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-4 rounded-[6px] border border-border-soft bg-surface p-6 no-underline transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-accent-text hover:shadow-[0_14px_30px_rgba(40,38,28,.08)]"
            >
              <span className="font-mono text-[11px] tracking-[.12em] text-accent-text uppercase">
                {item.label}
              </span>
              <h3 className="font-serif text-[21px] leading-[1.2] font-medium text-ink md:text-[23px]">
                {item.title}
              </h3>
              <p className="flex-1 text-[14px] leading-[1.55] text-muted-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between border-t border-border-soft pt-4">
                <span className="font-mono text-[11px] text-muted-3">
                  {item.readingTime} min read
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                  className="text-muted-4 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:text-accent-text"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
