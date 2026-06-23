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
    intro: "Two pieces that show the range of what this publication tries to do.",
    items: [
      { type: "series", slug: "unrequited-love" },
      { type: "essay", slug: "we-are-not-addicted-to-our-phones" },
    ],
  },
  {
    heading: "For the person trying to make sense of love",
    intro: "The first two installments of the series that started this whole project.",
    items: [
      { type: "essay", slug: "the-person-who-loved-harder" },
      { type: "essay", slug: "the-comfort-of-almost" },
    ],
  },
  {
    heading: "For the person who feels behind",
    intro: "On the quiet pressure to always be improving.",
    items: [{ type: "essay", slug: "the-new-religion-of-self-optimization" }],
  },
  {
    heading: "For the person rebuilding themselves",
    intro: "On the relationships that change shape rather than end.",
    items: [{ type: "note", slug: "some-friendships-just-get-quiet" }],
  },
  {
    heading: "For the person thinking about modern life",
    intro: "On attention, and what it costs to never let a moment be unfilled.",
    items: [{ type: "note", slug: "we-trained-ourselves-to-skim" }],
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
