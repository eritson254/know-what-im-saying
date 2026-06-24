import { Mail } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Newsletter",
  description: "New essays, notes, and ideas worth sitting with, sent straight to your inbox.",
  pathname: "/newsletter",
});

const receivesList = [
  "New essay alerts",
  "Series updates",
  "Reading recommendations",
  "Occasional personal notes",
  "Early access to future ebooks or guides",
];

export default function NewsletterPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Newsletter"
        title="A Letter for People Who Still Like to Read"
        subtitle="New essays, notes, and ideas worth sitting with."
      />

      <section className="mx-auto w-full max-w-[640px] px-6 pb-20 md:px-16">
        <div className="rounded-[3px] border border-border-strong bg-surface p-9 md:p-[50px]">
          <div className="mb-[22px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-pill">
            <Mail size={22} strokeWidth={1.6} className="text-accent-text" />
          </div>

          <h2 className="mb-4 font-serif text-[22px] leading-[1.2] font-medium text-ink-strong">
            What you&rsquo;ll receive
          </h2>
          <ul className="mb-8 flex flex-col gap-3">
            {receivesList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-[1.6] text-muted-2"
              >
                <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-sage" />
                {item}
              </li>
            ))}
          </ul>

          <NewsletterForm location="newsletter_page" />
          <p className="mt-4 text-[13px] leading-[1.5] text-muted-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
