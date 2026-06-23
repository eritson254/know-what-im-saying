import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <section className="mx-auto flex w-full max-w-[640px] flex-1 flex-col items-center justify-center px-6 py-24 text-center md:px-16">
        <div className="mb-6">
          <Pill withDot>404</Pill>
        </div>
        <h1 className="mb-[18px] font-serif text-[48px] leading-none font-medium tracking-[-.015em] text-ink-strong md:text-[64px]">
          This page got quiet.
        </h1>
        <p className="mb-10 max-w-[42ch] font-serif text-[19px] leading-[1.4] text-muted-2 italic md:text-[22px]">
          Whatever you were looking for does not live at this address anymore
          — or never did.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/">Back to the homepage</Button>
          <Button href="/essays" variant="outline">
            Browse all essays
          </Button>
        </div>
      </section>
    </main>
  );
}
