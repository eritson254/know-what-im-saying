export function SeriesThemeBand({ theme }: { theme: string }) {
  return (
    <section className="bg-band px-6 py-14 md:px-16 md:py-[72px]">
      <div className="mx-auto max-w-[760px] text-center">
        <div className="mb-5 font-mono text-[12px] tracking-[.16em] text-accent-text uppercase">
          What this explores
        </div>
        <p className="font-serif text-[26px] leading-[1.35] text-emphasis-text md:text-[32px]">
          {theme}
        </p>
      </div>
    </section>
  );
}
