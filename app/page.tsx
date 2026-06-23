import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Header variant="masthead" />
      <Container size="narrow" className="px-6 py-24 text-center md:px-16">
        <Pill withDot>A reading publication</Pill>
        <h2 className="mx-auto mt-7 max-w-[18ch] font-serif text-[40px] leading-tight text-ink md:text-[56px]">
          The design system shell is wired up.
        </h2>
        <p className="mx-auto mt-6 max-w-[54ch] text-[18px] leading-relaxed text-muted-1">
          Header (masthead + mobile menu) and footer are live. Real homepage
          content arrives in Phase 3.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
          <Button href="/essays">Read the latest essay</Button>
          <Button href="/start-here" variant="ghost">
            Start here →
          </Button>
        </div>
      </Container>
    </main>
  );
}
