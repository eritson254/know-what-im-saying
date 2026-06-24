import Link from "next/link";
import { Pill } from "@/components/ui/pill";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { getTopicBySlug } from "@/lib/content/topics";
import type { EssayFrontmatter } from "@/lib/content/schema";

export function CoverStory({
  essay,
  readingTime,
}: {
  essay: { slug: string; frontmatter: EssayFrontmatter };
  readingTime: number;
}) {
  const topic = getTopicBySlug(essay.frontmatter.topic);

  return (
    <section className="px-6 py-12 md:px-14 md:py-[60px]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 md:grid-cols-[1.12fr_.88fr] md:gap-[60px]">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Pill>Cover Story</Pill>
            {topic && <Pill variant="outline">{topic.label}</Pill>}
          </div>
          <h2 className="mb-[22px] font-serif text-[44px] leading-none font-medium tracking-[-.02em] text-ink-strong md:text-[78px]">
            {essay.frontmatter.title}
          </h2>
          <p className="mb-[22px] max-w-[32ch] font-serif text-[20px] leading-[1.35] text-muted-5 italic md:text-[25px]">
            {essay.frontmatter.description}
          </p>
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
            <Link
              href={`/essays/${essay.slug}`}
              className="rounded-[2px] bg-accent px-[26px] py-[14px] text-[16px] font-semibold text-accent-foreground no-underline hover:bg-accent-hover"
            >
              Read the essay
            </Link>
            <span className="font-mono text-[11px] tracking-[.08em] text-muted-3 uppercase">
              By the Editor · {readingTime} min read
            </span>
          </div>
        </div>
        <div>
          <PlaceholderImage label="cover image" aspectRatio="4 / 5" />
          <div className="mt-3 text-right font-serif text-[14px] text-muted-3 italic">
            A quiet, cinematic image sets the tone.
          </div>
        </div>
      </div>
    </section>
  );
}
