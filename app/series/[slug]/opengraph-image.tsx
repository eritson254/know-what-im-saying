import { ogImageSize, ogImageContentType, renderContentOgImage } from "@/lib/seo/og-image";
import { getAllSeries, getSeriesBySlug } from "@/lib/content/series";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ slug: series.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  return renderContentOgImage({
    eyebrow: "Series",
    title: series?.frontmatter.title.split(":")[0] ?? "Know What I'm Saying?",
  });
}
