import Link from "next/link";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { getEssayBySlug } from "@/lib/content/essays";
import { getNoteBySlug } from "@/lib/content/notes";
import { getSeriesBySlug } from "@/lib/content/series";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Start Here",
  description: "A few pieces that explain what this corner of the internet is about.",
  pathname: "/start-here",
});

type CuratedRef = { type: "essay" | "note" | "series"; slug: string };

type CuratedGroup = {
  heading: string;
  intro: string;
  items: CuratedRef[];
};

const groups: CuratedGroup[] = [
  {
    heading: "If you are new here",
    intro:
      "Two pieces that show the range of what this publication tries to do: a story-led series, and a standalone essay about modern life.",
    items: [
      { type: "series", slug: "unrequited-love" },
      { type: "essay", slug: "we-are-not-addicted-to-our-phones" },
    ],
  },
  {
    heading: "For the person trying to make sense of love",
    intro: "The latest installment of the series that started this whole project.",
    items: [{ type: "essay", slug: "the-comfort-of-almost" }],
  },
  {
    heading: "For the person who feels behind",
    intro: "On the quiet pressure to always be improving, and what it costs.",
    items: [{ type: "essay", slug: "the-new-religion-of-self-optimization" }],
  },
  {
    heading: "For the person missing someone they didn't fight with",
    intro: "A shorter note, on the friendships that change shape rather than end.",
    items: [{ type: "note", slug: "some-friendships-just-get-quiet" }],
  },
];

type CuratedCard = {
  type: CuratedRef["type"];
  title: string;
  description: string;
  href: string;
};

function resolveItem(ref: CuratedRef): CuratedCard | null {
  if (ref.type === "essay") {
    const essay = getEssayBySlug(ref.slug);
    if (!essay) return null;
    return {
      type: "essay",
      title: essay.frontmatter.title,
      description: essay.frontmatter.description,
      href: `/essays/${essay.slug}`,
    };
  }

  if (ref.type === "note") {
    const note = getNoteBySlug(ref.slug);
    if (!note) return null;
    return {
      type: "note",
      title: note.frontmatter.title,
      description: note.frontmatter.description,
      href: `/notes/${note.slug}`,
    };
  }

  const series = getSeriesBySlug(ref.slug);
  if (!series) return null;
  return {
    type: "series",
    title: series.frontmatter.title,
    description: series.frontmatter.description,
    href: `/series/${series.slug}`,
  };
}

const typeLabel: Record<CuratedRef["type"], string> = {
  essay: "Essay",
  note: "Note",
  series: "Series",
};

export default function StartHerePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Start Here"
        title="Start Here"
        subtitle="A few pieces that explain what this corner of the internet is about."
      />

      <section className="mx-auto w-full max-w-[680px] px-6 pb-14 md:px-16">
        <div className="space-y-6 text-[18px] leading-[1.65] text-ink md:text-[19px]">
          <p>
            <em className="font-serif not-italic text-ink-strong">
              Know What I&apos;m Saying?
            </em>{" "}
            is a publication about being a person in a complicated modern world:
            love, psychology, money, technology, friendship, and the feelings most
            of us carry around without quite knowing what to call them.
          </p>
          <p>
            The internet is fast now. This is meant to be slow. The writing here
            tries to give you one of a few things: language for something you have
            felt but could not explain, a new way to understand a familiar
            experience, or a story that makes you feel a little less alone. No
            advice that talks down to you, no pretending people are simpler than
            they are.
          </p>
          <p className="text-muted-2">
            If you only have a few minutes, start with one of these.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[860px] px-6 pb-10 md:px-16">
        {groups.map((group) => {
          const cards = group.items
            .map(resolveItem)
            .filter((card): card is CuratedCard => card !== null);

          if (cards.length === 0) return null;

          return (
            <div key={group.heading} className="mb-16">
              <h2 className="mb-2 font-serif text-[24px] leading-[1.2] font-medium text-ink-strong md:text-[28px]">
                {group.heading}
              </h2>
              <p className="mb-6 max-w-[52ch] text-[15px] leading-[1.6] text-muted-2">
                {group.intro}
              </p>
              <div className="flex flex-col">
                {cards.map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="border-t border-border py-[20px] no-underline hover:opacity-[.78]"
                  >
                    <div className="mb-[8px]">
                      <Pill>{typeLabel[card.type]}</Pill>
                    </div>
                    <h3 className="mb-[6px] font-serif text-[22px] leading-[1.15] font-medium text-ink-strong md:text-[24px]">
                      {card.title}
                    </h3>
                    <p className="max-w-[58ch] text-[15px] leading-[1.55] text-muted-2">
                      {card.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mx-auto w-full max-w-[860px] px-6 pb-20 md:px-16">
        <div className="flex flex-wrap gap-4 border-t border-border pt-10">
          <Button href="/newsletter">Join the reading list</Button>
          <Button href="/community" variant="outline">
            Join the WhatsApp Channel
          </Button>
          <Button href="/essays" variant="ghost">
            Browse all essays
          </Button>
        </div>
      </section>
    </main>
  );
}
