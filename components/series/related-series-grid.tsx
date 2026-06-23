import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

type RelatedSeriesItem = {
  slug: string;
  title: string;
  statusLabel: string;
};

export function RelatedSeriesGrid({ items }: { items: RelatedSeriesItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-12 md:px-16 md:py-[72px]">
      <h2 className="mb-8 font-serif text-[28px] font-medium text-ink md:text-[30px]">
        Related series
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/series/${item.slug}`}
            className="flex flex-col no-underline hover:opacity-[.78]"
          >
            <PlaceholderImage
              label="series cover"
              aspectRatio="16 / 10"
              className="mb-[18px]"
            />
            <div className="mb-[10px]">
              <Pill>{item.statusLabel}</Pill>
            </div>
            <h3 className="font-serif text-[24px] leading-[1.12] font-medium text-ink">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
