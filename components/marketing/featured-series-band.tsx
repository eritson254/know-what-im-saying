import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import type { SeriesFrontmatter } from "@/lib/content/schema";

export function FeaturedSeriesBand({
  series,
  publishedCount,
}: {
  series: { slug: string; frontmatter: SeriesFrontmatter };
  publishedCount: number;
}) {
  const total = series.frontmatter.totalPlanned;
  const progress = Math.round((publishedCount / total) * 100);

  return (
    <section className="bg-band px-6 py-16 md:px-14 md:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <PlaceholderImage label="series cover" aspectRatio="3 / 4" variant="band" />
        <div>
          <div className="mb-[22px] flex items-center gap-2">
            <Pill>Featured series</Pill>
            <Pill withDot>
              {series.frontmatter.status === "ongoing" ? "Ongoing" : "Complete"}
            </Pill>
          </div>
          <h2 className="mb-5 font-serif text-[40px] leading-[1.02] font-medium text-ink-strong md:text-[58px]">
            {series.frontmatter.title.split(":")[0]}
          </h2>
          <p className="mb-[30px] max-w-[46ch] text-[18px] leading-[1.6] text-muted-5 md:text-[20px]">
            {series.frontmatter.description}
          </p>
          <div className="mb-8 flex max-w-[300px] flex-col gap-[10px]">
            <div className="flex justify-between font-mono text-[11px] tracking-[.06em] text-muted-5 uppercase">
              <span>
                {publishedCount} of {total} essays
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full bg-progress-track">
              <div
                className="h-[5px] rounded-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <Link
            href={`/series/${series.slug}`}
            className="rounded-[2px] bg-accent px-[26px] py-[14px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
          >
            Begin the series
          </Link>
        </div>
      </div>
    </section>
  );
}
