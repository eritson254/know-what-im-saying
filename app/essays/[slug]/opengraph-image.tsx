import { ogImageSize, ogImageContentType, renderContentOgImage } from "@/lib/seo/og-image";
import { getAllEssays, getEssayBySlug } from "@/lib/content/essays";
import { getTopicBySlug } from "@/lib/content/topics";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  const topic = essay ? getTopicBySlug(essay.frontmatter.topic) : null;

  return renderContentOgImage({
    eyebrow: topic?.label ?? "Essay",
    title: essay?.frontmatter.title ?? "Know What I'm Saying?",
  });
}
