import type { ReactNode } from "react";
import { Pill } from "@/components/ui/pill";

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-16 text-center md:px-16 md:py-20">
      <div className="mb-6 flex justify-center">
        <Pill withDot>{eyebrow}</Pill>
      </div>
      <h1 className="mb-[18px] font-serif text-[56px] leading-none font-medium tracking-[-.015em] text-ink-strong md:text-[76px]">
        {title}
      </h1>
      <p className="mx-auto max-w-[40ch] font-serif text-[19px] leading-[1.4] text-muted-2 italic md:text-[23px]">
        {subtitle}
      </p>
    </section>
  );
}
