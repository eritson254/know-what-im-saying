import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ArticleRow } from "@/components/articles/article-row";
import { getAllEssays } from "@/lib/content/essays";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Essays",
  description:
    "Writing about life, psychology, love, work, technology, money, and the strange ways they all shape us.",
  pathname: "/essays",
});

export default function EssaysPage() {
  const essays = getAllEssays();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="The Archive"
        title="Essays"
        subtitle="Writing about life, psychology, love, work, technology, money, and the strange ways they all shape us."
      />
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-16">
        <div className="flex flex-col">
          {essays.map((essay) => (
            <ArticleRow
              key={essay.slug}
              essay={essay}
              readingTime={essay.readingTime}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
