export function AuthorNote() {
  return (
    <div className="mx-auto max-w-[720px] border-t border-border px-6 py-9">
      <div className="flex items-center gap-[18px]">
        <div
          className="h-[52px] w-[52px] flex-none rounded-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-placeholder-band-a) 0 7px, var(--color-placeholder-band-b) 7px 14px)",
          }}
        />
        <p className="text-[15px] leading-[1.55] text-muted-2">
          Written by <span className="font-semibold text-ink">the editor</span>.{" "}
          <span className="text-ink">Know What I&rsquo;m Saying?</span> is a
          publication about life, psychology, love, technology, and the
          stories people carry.
        </p>
      </div>
    </div>
  );
}
