import { ogImageSize, ogImageContentType, renderContentOgImage } from "@/lib/seo/og-image";
import { getAllNotes, getNoteBySlug } from "@/lib/content/notes";
import { getTopicBySlug } from "@/lib/content/topics";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export const dynamicParams = false;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  const topic = note ? getTopicBySlug(note.frontmatter.topic) : null;

  return renderContentOgImage({
    eyebrow: topic?.label ?? "Note",
    title: note?.frontmatter.title ?? "Know What I'm Saying?",
  });
}
