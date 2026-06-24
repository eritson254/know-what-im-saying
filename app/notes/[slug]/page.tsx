import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Pill } from "@/components/ui/pill";
import { MdxContent } from "@/components/articles/mdx-content";
import { ArticleJsonLd } from "@/components/seo/article-json-ld";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { getAllNotes, getNoteBySlug } from "@/lib/content/notes";
import { getTopicBySlug } from "@/lib/content/topics";
import { formatDisplayDate } from "@/lib/utils/format-date";
import { buildPageMetadata, buildCanonicalUrl } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};

  return buildPageMetadata({
    title: note.frontmatter.title,
    description: note.frontmatter.description,
    pathname: `/notes/${note.slug}`,
    canonicalUrl: note.frontmatter.canonicalUrl,
  });
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const topic = getTopicBySlug(note.frontmatter.topic);

  return (
    <main className="flex flex-1 flex-col">
      <ArticleJsonLd
        title={note.frontmatter.title}
        description={note.frontmatter.description}
        datePublished={note.frontmatter.date}
        dateModified={note.frontmatter.updated}
        imagePath={`/notes/${note.slug}/opengraph-image`}
        canonicalUrl={buildCanonicalUrl(
          `/notes/${note.slug}`,
          note.frontmatter.canonicalUrl,
        )}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Notes", path: "/notes" },
          { name: note.frontmatter.title, path: `/notes/${note.slug}` },
        ]}
      />
      <Header />
      <article className="mx-auto max-w-[720px] px-6 pt-16 md:pt-[72px]">
        <div className="mb-6 flex justify-center">
          {topic && <Pill>{topic.label}</Pill>}
        </div>
        <h1 className="mb-4 text-center font-serif text-[38px] leading-[1.1] font-medium text-ink md:text-[48px]">
          {note.frontmatter.title}
        </h1>
        <div className="border-b border-border pb-8 text-center font-mono text-[12px] tracking-[.05em] text-muted-3 uppercase">
          {formatDisplayDate(note.frontmatter.date)} · {note.readingTime} min read
        </div>
      </article>
      <MdxContent source={note.body} />
    </main>
  );
}
