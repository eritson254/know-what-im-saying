import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Pill } from "@/components/ui/pill";
import { getAllNotes } from "@/lib/content/notes";
import { getTopicBySlug } from "@/lib/content/topics";
import { formatDisplayDate } from "@/lib/utils/format-date";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Notes",
  description:
    "Shorter thoughts, unfinished ideas, things worth noticing, and small pieces of writing that did not need to become an essay.",
  pathname: "/notes",
});

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 text-center md:px-16 md:py-20">
        <h1 className="mb-4 font-serif text-[56px] leading-none font-medium tracking-[-.015em] text-ink-strong md:text-[76px]">
          Notes
        </h1>
        <p className="mx-auto max-w-[50ch] font-serif text-[19px] leading-[1.4] text-muted-2 italic md:text-[23px]">
          Shorter thoughts, unfinished ideas, things worth noticing, and small
          pieces of writing that did not need to become an essay.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[760px] px-6 pb-20 md:px-16">
        <div className="flex flex-col">
          {notes.map((note, index) => {
            const topic = getTopicBySlug(note.frontmatter.topic);
            return (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className={`flex flex-col gap-2 border-t border-border py-7 no-underline hover:opacity-80 ${
                  index === notes.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3 font-mono text-[11px] tracking-[.06em] text-muted-3 uppercase">
                  <span>{formatDisplayDate(note.frontmatter.date)}</span>
                  {topic && (
                    <>
                      <span className="text-border-card">·</span>
                      <span>{topic.label}</span>
                    </>
                  )}
                </div>
                <h2 className="font-serif text-[26px] leading-[1.15] font-medium text-ink-strong">
                  {note.frontmatter.title}
                </h2>
                <p className="max-w-[60ch] text-[16px] leading-[1.55] text-muted-2">
                  {note.frontmatter.description}
                </p>
              </Link>
            );
          })}
          {notes.length === 0 && (
            <p className="py-10 text-center text-muted-2">
              <Pill>Coming soon</Pill>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
