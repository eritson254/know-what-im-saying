import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { ReadingProgressBar } from "@/components/articles/reading-progress-bar";
import { ArticleHeader } from "@/components/articles/article-header";
import { ReadingPreferences } from "@/components/articles/reading-preferences";
import { SeriesNavBar } from "@/components/articles/series-nav-bar";
import { SeriesProgressTracker } from "@/components/articles/series-progress-tracker";
import { MdxContent } from "@/components/articles/mdx-content";
import { AuthorNote } from "@/components/articles/author-note";
import {
  RelatedReadingBand,
  type RelatedReadingItem,
} from "@/components/articles/related-reading-band";
import { StoryPrompt } from "@/components/articles/story-prompt";
import { getAllEssays, getEssayBySlug, getRelatedEssays } from "@/lib/content/essays";
import { getSeriesInstallments } from "@/lib/content/series";
import { getTopicBySlug } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return {};

  return buildPageMetadata({
    title: essay.frontmatter.title,
    description: essay.frontmatter.description,
    pathname: `/essays/${essay.slug}`,
    canonicalUrl: essay.frontmatter.canonicalUrl,
  });
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) notFound();

  const series = essay.frontmatter.series;
  const installments = series ? getSeriesInstallments(series.slug) : [];
  const currentIndex = installments.findIndex((item) => item.slug === essay.slug);

  const previous =
    series && currentIndex > 0
      ? {
          slug: installments[currentIndex - 1].slug,
          installment: installments[currentIndex - 1].frontmatter.series!.installment,
        }
      : null;
  const next =
    series && currentIndex >= 0 && currentIndex < installments.length - 1
      ? {
          slug: installments[currentIndex + 1].slug,
          installment: installments[currentIndex + 1].frontmatter.series!.installment,
        }
      : null;
  const firstInstallment =
    series && installments[0] && installments[0].slug !== essay.slug
      ? {
          slug: installments[0].slug,
          installment: installments[0].frontmatter.series!.installment,
        }
      : null;

  const relatedItems: RelatedReadingItem[] = series
    ? installments
        .filter((item) => item.slug !== essay.slug)
        .map((item) => ({
          label: `Essay ${String(item.frontmatter.series!.installment).padStart(2, "0")}`,
          title: item.frontmatter.title,
          href: `/essays/${item.slug}`,
          readingTime: item.readingTime,
        }))
    : getRelatedEssays(essay).map((item) => ({
        label: getTopicBySlug(item.frontmatter.topic)?.label ?? item.frontmatter.topic,
        title: item.frontmatter.title,
        href: `/essays/${item.slug}`,
        readingTime: item.readingTime,
      }));

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <ReadingProgressBar />

      <ArticleHeader frontmatter={essay.frontmatter} readingTime={essay.readingTime} />
      <ReadingPreferences />

      {series && <SeriesProgressTracker seriesSlug={series.slug} essaySlug={essay.slug} />}

      {series && (
        <SeriesNavBar
          seriesTitle={series.title.split(":")[0]}
          currentInstallment={series.installment}
          totalPlanned={series.totalPlanned}
          previous={previous}
          next={next}
          firstInstallment={firstInstallment}
        />
      )}

      <MdxContent source={essay.body} />
      <AuthorNote />

      <RelatedReadingBand
        heading={series ? "Continue the series" : "Related reading"}
        items={relatedItems}
      />

      {essay.frontmatter.showStorySubmissionCTA && <StoryPrompt />}
    </main>
  );
}
