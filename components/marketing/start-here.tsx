import Link from "next/link";
import { Pill } from "@/components/ui/pill";

type StartHereItem = {
  label: string;
  href: string;
};

export function StartHere({ items }: { items: StartHereItem[] }) {
  return (
    <section className="px-6 py-16 md:px-14 md:py-[84px]">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-16">
        <div>
          <div className="mb-[14px]">
            <Pill>Start here</Pill>
          </div>
          <h2 className="mb-[14px] font-serif text-[32px] font-medium text-ink-strong md:text-[38px]">
            New here? Begin with these.
          </h2>
          <p className="max-w-[30ch] text-[16px] leading-[1.6] text-muted-2">
            A few pieces that explain what this corner of the internet is
            about.
          </p>
        </div>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-baseline gap-7 border-t border-border py-[22px] no-underline hover:opacity-[.62] ${
                index === items.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="min-w-[42px] font-serif text-[24px] text-sage">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-[22px] leading-[1.2] text-ink-strong md:text-[25px]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
