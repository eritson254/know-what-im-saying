import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { SeriesCta } from "@/components/series/series-cta";
import { getTopicBySlug } from "@/lib/content/topics";
import type { SeriesFrontmatter } from "@/lib/content/schema";

export function SeriesHero({
  series,
  publishedCount,
  publishedInstallments,
}: {
  series: { slug: string; frontmatter: SeriesFrontmatter };
  publishedCount: number;
  publishedInstallments: { slug: string; installment: number }[];
}) {
  const topic = getTopicBySlug(series.frontmatter.topics[0] ?? "");
  const total = series.frontmatter.totalPlanned;
  const [shortTitle, subtitle] = series.frontmatter.title.split(/:\s*/);

  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-16 md:px-16 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-16">
        <div>
          <div className="mb-[22px] flex gap-2">
            <Pill>Series</Pill>
            {topic && <Pill variant="outline">{topic.label}</Pill>}
          </div>
          <h1 className="mb-6 font-serif text-[48px] leading-[1.02] font-medium tracking-[-.01em] text-ink md:text-[74px]">
            {shortTitle}
          </h1>
          {subtitle && (
            <p className="mb-[22px] max-w-[44ch] font-serif text-[20px] leading-[1.55] text-muted-1 italic md:text-[21px]">
              {subtitle}
            </p>
          )}
          <p className="mb-8 max-w-[48ch] text-[17px] leading-[1.65] text-muted-1 md:text-[18px]">
            {series.frontmatter.description}
          </p>
          <div className="mb-[34px] flex flex-wrap items-center gap-2">
            <Pill variant="outline">
              {total} {total === 1 ? "essay" : "essays"}
            </Pill>
            <Pill withDot>
              {series.frontmatter.status === "ongoing" ? "Ongoing" : "Complete"}
            </Pill>
            <Pill variant="outline">{publishedCount} published</Pill>
          </div>
          <SeriesCta
            seriesSlug={series.slug}
            publishedInstallments={publishedInstallments}
          />
        </div>
        <PlaceholderImage label="series cover" aspectRatio="3 / 4" />
      </div>
    </section>
  );
}
