import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ReadingListRow } from "@/components/reading-list/reading-list-row";
import { getAllReadingListItems } from "@/lib/content/reading-list";
import { buildPageMetadata } from "@/lib/seo/metadata";
import type { ReadingListFrontmatter } from "@/lib/content/schema";

export const metadata = buildPageMetadata({
  title: "Reading List",
  description:
    "Books, essays, articles, films, and podcasts worth spending more time with.",
  pathname: "/reading-list",
});

const mediumOrder: { medium: ReadingListFrontmatter["medium"]; label: string }[] = [
  { medium: "book", label: "Books" },
  { medium: "podcast", label: "Podcasts" },
  { medium: "film", label: "Films" },
  { medium: "article", label: "Articles" },
  { medium: "essay", label: "Essays" },
];

export default function ReadingListPage() {
  const items = getAllReadingListItems();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Reading List"
        title="Reading List"
        subtitle="Books, essays, articles, films, and podcasts worth spending more time with."
      />
      <section className="mx-auto w-full max-w-[840px] px-6 pb-20 md:px-16">
        {mediumOrder.map(({ medium, label }) => {
          const group = items.filter((item) => item.frontmatter.medium === medium);
          if (group.length === 0) return null;

          return (
            <div key={medium} className="mb-14">
              <h2 className="mb-2 font-mono text-[12px] tracking-[.14em] text-muted-4 uppercase">
                {label}
              </h2>
              <div className="flex flex-col">
                {group.map((item) => (
                  <ReadingListRow key={item.slug} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
