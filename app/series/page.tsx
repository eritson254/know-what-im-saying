import Link from "next/link";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { SeriesCard } from "@/components/series/series-card";
import { Pill } from "@/components/ui/pill";
import { getAllSeries, getSeriesInstallments } from "@/lib/content/series";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Series",
  description:
    "Stories and essays that stay with a question long enough to understand it.",
  pathname: "/series",
});

export default function SeriesArchivePage() {
  const allSeries = getAllSeries();
  const featured = allSeries[0] ?? null;
  const others = allSeries.filter((series) => series.slug !== featured?.slug);

  const featuredCount = featured
    ? getSeriesInstallments(featured.frontmatter.slug).length
    : 0;

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="The Collections"
        title="Series"
        subtitle="Stories and essays that stay with a question long enough to understand it."
      />

      {featured && (
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-16 md:px-16">
          <div className="max-w-[720px]">
            <div className="mb-[18px] flex items-center gap-2">
              <Pill>Featured series</Pill>
              <Pill withDot>
                {featured.frontmatter.status === "ongoing"
                  ? "Ongoing"
                  : "Complete"}
              </Pill>
            </div>
            <h2 className="mb-4 font-serif text-[40px] leading-[1.05] font-medium text-ink-strong md:text-[48px]">
              {featured.frontmatter.title.split(":")[0]}
            </h2>
            <p className="mb-7 max-w-[48ch] text-[18px] leading-[1.6] text-muted-2">
              {featured.frontmatter.description}
            </p>
            <Link
              href={`/series/${featured.slug}`}
              className="inline-block rounded-[2px] bg-accent px-[26px] py-[14px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
            >
              Begin the series · {featuredCount} of{" "}
              {featured.frontmatter.totalPlanned} published
            </Link>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-16">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {others.map((series) => (
              <SeriesCard
                key={series.slug}
                series={series}
                publishedCount={
                  getSeriesInstallments(series.frontmatter.slug).length
                }
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
