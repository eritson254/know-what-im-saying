import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { SeriesFrontmatter } from "@/lib/content/schema";

export function SeriesCard({
  series,
  publishedCount,
}: {
  series: { slug: string; frontmatter: SeriesFrontmatter };
  publishedCount: number;
}) {
  const total = series.frontmatter.totalPlanned;
  const statusLabel =
    series.frontmatter.status === "ongoing" ? "Ongoing" : "Complete";

  return (
    <Link
      href={`/series/${series.slug}`}
      className="flex flex-col no-underline hover:opacity-[.78]"
    >
      <PlaceholderImage
        label="series cover"
        aspectRatio="16 / 10"
        className="mb-[18px]"
      />
      <div className="mb-[10px]">
        <Pill>
          {statusLabel} · {publishedCount} of {total} essays
        </Pill>
      </div>
      <h3 className="mb-[10px] font-serif text-[24px] leading-[1.12] font-medium text-ink-strong">
        {series.frontmatter.title.split(":")[0]}
      </h3>
      <p className="max-w-[40ch] text-[15px] leading-[1.55] text-muted-2">
        {series.frontmatter.description}
      </p>
    </Link>
  );
}
