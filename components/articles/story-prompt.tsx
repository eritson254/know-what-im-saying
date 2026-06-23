import Link from "next/link";

export function StoryPrompt() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-14 text-center md:px-16 md:py-[72px]">
      <h2 className="mx-auto mb-4 max-w-[24ch] font-serif text-[32px] leading-[1.12] font-medium text-ink md:text-[38px]">
        Has something like this happened to you?
      </h2>
      <p className="mx-auto mb-7 max-w-[48ch] text-[17px] leading-[1.6] text-muted-2">
        Share your story anonymously. It may inspire a future essay.
      </p>
      <Link
        href="/share-your-story"
        className="inline-block rounded-[2px] border-[1.5px] border-accent px-7 py-[13px] text-[16px] font-semibold text-accent no-underline hover:bg-accent hover:text-accent-foreground"
      >
        Share your story
      </Link>
    </section>
  );
}
