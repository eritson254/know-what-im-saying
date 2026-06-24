import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { SeriesHero } from "@/components/series/series-hero";
import { ReadingOrder } from "@/components/series/reading-order";
import { SeriesReadProgressSummary } from "@/components/series/series-read-progress-summary";
import { SeriesThemeBand } from "@/components/series/series-theme-band";
import { RelatedSeriesGrid } from "@/components/series/related-series-grid";
import { ReaderStoryCta } from "@/components/marketing/reader-story-cta";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { PagefindMeta } from "@/components/seo/pagefind-meta";
import {
  getAllSeries,
  getSeriesBySlug,
  getSeriesInstallments,
} from "@/lib/content/series";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};

  return buildPageMetadata({
    title: series.frontmatter.title,
    description: series.frontmatter.description,
    pathname: `/series/${series.slug}`,
  });
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const installments = getSeriesInstallments(series.slug);
  const publishedInstallments = installments.map((item) => ({
    slug: item.slug,
    installment: item.frontmatter.series!.installment,
  }));

  const readingOrderEntries = Array.from(
    { length: series.frontmatter.totalPlanned },
    (_, i) => i + 1,
  ).map((installmentNumber) => {
    const published = installments.find(
      (item) => item.frontmatter.series?.installment === installmentNumber,
    );
    if (published) {
      return {
        installment: installmentNumber,
        title: published.frontmatter.title,
        href: `/essays/${published.slug}`,
        slug: published.slug,
      };
    }
    const planned = series.frontmatter.plannedInstallments.find(
      (item) => item.installment === installmentNumber,
    );
    return {
      installment: installmentNumber,
      title: planned?.title ?? `Essay ${installmentNumber}`,
      href: null,
      slug: null,
    };
  });

  const relatedSeries = series.frontmatter.relatedSeries
    .map((relatedSlug) => getSeriesBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .map((item) => ({
      slug: item.slug,
      title: item.frontmatter.title.split(":")[0],
      statusLabel: `${item.frontmatter.status === "ongoing" ? "Ongoing" : "Complete"} · ${getSeriesInstallments(item.slug).length} essays`,
    }));

  return (
    <main className="flex flex-1 flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Series", path: "/series" },
          {
            name: series.frontmatter.title.split(":")[0],
            path: `/series/${series.slug}`,
          },
        ]}
      />
      <Header />
      <PagefindMeta type="Series" />
      <SeriesHero
        series={series}
        publishedCount={installments.length}
        publishedInstallments={publishedInstallments}
      />
      <SeriesReadProgressSummary
        seriesSlug={series.slug}
        totalPublished={installments.length}
      />
      <ReadingOrder seriesSlug={series.slug} entries={readingOrderEntries} />
      <SeriesThemeBand theme={series.frontmatter.theme} />
      <RelatedSeriesGrid items={relatedSeries} />
      <ReaderStoryCta />
    </main>
  );
}
