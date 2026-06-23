import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { TopicCard } from "@/components/topics/topic-card";
import { topics, getTopicEssayCount } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Topics",
  description: "Start with the question you are carrying.",
  pathname: "/topics",
});

export default function TopicsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="The Index"
        title="Topics"
        subtitle="Start with the question you are carrying."
      />
      <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-16">
        <div className="grid gap-[22px] sm:grid-cols-2 md:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              essayCount={getTopicEssayCount(topic.slug)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
