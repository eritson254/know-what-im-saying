import Link from "next/link";
import { Feather } from "lucide-react";
import { Pill } from "@/components/ui/pill";

export function ReaderStoryCta() {
  return (
    <section className="px-6 pb-16 md:px-14 md:pb-[84px]">
      <div className="mx-auto max-w-[1240px] rounded-[3px] border border-border-strong bg-surface px-7 py-14 text-center md:px-14 md:py-[66px]">
        <div className="mx-auto mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-pill">
          <Feather size={22} strokeWidth={1.6} className="text-accent" />
        </div>
        <div className="mb-[22px] inline-block">
          <Pill>Share your story</Pill>
        </div>
        <h2 className="mx-auto mb-[18px] max-w-[22ch] font-serif text-[34px] leading-[1.08] font-medium text-ink-strong md:text-[44px]">
          Have a story you cannot stop thinking about?
        </h2>
        <p className="mx-auto mb-8 max-w-[50ch] text-[18px] leading-[1.6] text-muted-2">
          A relationship, friendship, betrayal, loss, or moment that changed
          the way you see yourself. Share it anonymously — it may inspire a
          future essay.
        </p>
        <Link
          href="/share-your-story"
          className="inline-block rounded-[2px] border-[1.5px] border-accent px-7 py-[13px] text-[16px] font-semibold text-accent no-underline hover:bg-accent hover:text-accent-foreground"
        >
          Share your story
        </Link>
      </div>
    </section>
  );
}
