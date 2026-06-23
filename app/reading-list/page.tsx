import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ReadingListGroups } from "@/components/reading-list/reading-list-groups";
import { getAllReadingListItems } from "@/lib/content/reading-list";
import { getTopicBySlug } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Reading List",
  description:
    "Books, essays, articles, films, and podcasts worth spending more time with.",
  pathname: "/reading-list",
});

export default function ReadingListPage() {
  const items = getAllReadingListItems().map((item) => ({
    ...item,
    topicLabels: item.frontmatter.topics
      .map((slug) => getTopicBySlug(slug)?.label)
      .filter((label): label is string => Boolean(label)),
  }));

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Reading List"
        title="Reading List"
        subtitle="Books, essays, articles, films, and podcasts worth spending more time with."
      />
      <section className="mx-auto w-full max-w-[840px] px-6 pb-20 md:px-16">
        <ReadingListGroups items={items} />
      </section>
    </main>
  );
}
