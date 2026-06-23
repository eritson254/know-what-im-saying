import { Header } from "@/components/layout/header";
import { CoverStory } from "@/components/marketing/cover-story";
import { LatestWriting } from "@/components/marketing/latest-writing";
import { FeaturedSeriesBand } from "@/components/marketing/featured-series-band";
import { StartHere } from "@/components/marketing/start-here";
import { ReaderStoryCta } from "@/components/marketing/reader-story-cta";
import { CommunityNewsletter } from "@/components/marketing/community-newsletter";
import { getAllEssays, getFeaturedEssay } from "@/lib/content/essays";
import { getAllSeries, getSeriesInstallments } from "@/lib/content/series";

export default function Home() {
  const featured = getFeaturedEssay();
  const latestWriting = getAllEssays().filter(
    (essay) => essay.slug !== featured?.slug,
  );
  const series = getAllSeries()[0] ?? null;
  const installments = series
    ? getSeriesInstallments(series.frontmatter.slug)
    : [];

  const startHereItems = [
    { label: "What this publication is actually about", href: "/about" },
    ...latestWriting
      .slice(0, 3)
      .map((essay) => ({
        label: essay.frontmatter.title,
        href: `/essays/${essay.slug}`,
      })),
  ];

  return (
    <main className="flex flex-1 flex-col">
      <Header variant="masthead" />

      {featured && (
        <CoverStory essay={featured} readingTime={featured.readingTime} />
      )}

      <LatestWriting essays={latestWriting} mostRead={getAllEssays()} />

      {series && (
        <FeaturedSeriesBand series={series} publishedCount={installments.length} />
      )}

      <StartHere items={startHereItems} />
      <ReaderStoryCta />
      <CommunityNewsletter />
    </main>
  );
}
