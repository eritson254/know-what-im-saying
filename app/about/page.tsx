import { notFound } from "next/navigation";
import Link from "next/link";
import { Info } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { MdxContent } from "@/components/articles/mdx-content";
import { TopicIcon } from "@/components/topics/topic-icon";
import { getPageBySlug } from "@/lib/content/pages";
import { topics } from "@/lib/content/topics";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "A place for thoughtful writing about life, psychology, love, work, technology, culture, and the things we are all quietly trying to figure out.",
  pathname: "/about",
});

export default function AboutPage() {
  const page = getPageBySlug("about");
  if (!page) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="About"
        title="About Know What I'm Saying?"
        subtitle={page.frontmatter.description}
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 pb-6 md:px-16">
        <h2 className="mb-2 text-center font-mono text-[12px] tracking-[.14em] text-muted-3 uppercase">
          What this publication writes about
        </h2>
        <p className="mx-auto mb-10 max-w-[56ch] text-center text-[15px] leading-[1.6] text-muted-2">
          On the surface, the pieces here cover a handful of subjects.
          Underneath, they are usually about the same things: attachment,
          fear, hope, comparison, and the stories we tell ourselves.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="flex flex-col items-center gap-3 rounded-[4px] border border-border-soft bg-surface px-4 py-6 text-center no-underline transition-[border-color,transform] duration-200 hover:-translate-y-[2px] hover:border-accent-text"
            >
              <div
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
                style={{ backgroundColor: topic.iconBg }}
              >
                <TopicIcon
                  name={topic.icon}
                  size={18}
                  strokeWidth={1.6}
                  style={{ color: topic.iconColor }}
                />
              </div>
              <span className="font-serif text-[15px] leading-[1.2] text-ink-strong">
                {topic.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <MdxContent source={page.body} />

      <section className="mx-auto w-full max-w-[720px] px-6 pb-20 md:px-16">
        <div className="flex gap-4 rounded-[4px] border border-border-soft bg-surface px-7 py-6">
          <Info size={20} strokeWidth={1.6} className="mt-[2px] flex-none text-sage" />
          <div>
            <h2 className="mb-2 font-serif text-[19px] font-medium text-ink-strong">
              What this is not
            </h2>
            <p className="text-[15px] leading-[1.6] text-muted-2">
              This publication writes about psychology, attachment, and
              healing, but it is not therapy, diagnosis, or crisis support. It
              is educational and reflective, not a substitute for
              professional medical, mental health, legal, or financial
              advice. If you are in immediate danger, please contact your
              local emergency or crisis services rather than relying on
              anything written here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
