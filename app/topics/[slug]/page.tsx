import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { TopicIcon } from "@/components/topics/topic-icon";
import { ArticleRow } from "@/components/articles/article-row";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { getEssaysByTopic } from "@/lib/content/essays";
import { topics, getTopicBySlug } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};

  return buildPageMetadata({
    title: topic.label,
    description: topic.description,
    pathname: `/topics/${topic.slug}`,
  });
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const essays = getEssaysByTopic(topic.slug);

  return (
    <main className="flex flex-1 flex-col">
      <BreadcrumbJsonLd
        items={[
          { name: "Topics", path: "/topics" },
          { name: topic.label, path: `/topics/${topic.slug}` },
        ]}
      />
      <Header />
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 text-center md:px-16 md:py-20">
        <div
          className="mx-auto mb-6 flex h-[56px] w-[56px] items-center justify-center rounded-full"
          style={{ backgroundColor: topic.iconBg }}
        >
          <TopicIcon
            name={topic.icon}
            size={26}
            strokeWidth={1.6}
            style={{ color: topic.iconColor }}
          />
        </div>
        <h1 className="mb-[18px] font-serif text-[48px] leading-none font-medium tracking-[-.015em] text-ink-strong md:text-[64px]">
          {topic.label}
        </h1>
        <p className="mx-auto max-w-[60ch] text-[18px] leading-[1.6] text-muted-2">
          {topic.description}
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-16">
        {essays.length > 0 ? (
          <div className="flex flex-col">
            {essays.map((essay) => (
              <ArticleRow
                key={essay.slug}
                essay={essay}
                readingTime={essay.readingTime}
              />
            ))}
          </div>
        ) : (
          <p className="border-t border-border py-12 text-center text-muted-2">
            No essays published on this topic yet.
          </p>
        )}
      </section>
    </main>
  );
}
