import { MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { SectionIntro } from "@/components/marketing/section-intro";
import { WhatsAppJoinButton } from "@/components/marketing/whatsapp-join-button";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Community",
  description: "Join the WhatsApp Channel for new essays, notes, and reading recommendations.",
  pathname: "/community",
});

const communityRules = [
  "Be respectful",
  "Do not diagnose strangers",
  "Do not share other people’s private information",
  "No harassment",
  "No crisis support expectations",
  "No spam or promotions",
  "The group is not therapy",
];

export default function CommunityPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Header />
      <SectionIntro
        eyebrow="Community"
        title="Stay Close to the Writing"
        subtitle="New essays, notes, reading recommendations, and occasional conversations beyond the website."
      />

      <section className="mx-auto w-full max-w-[640px] px-6 pb-16 md:px-16">
        <div className="flex flex-col rounded-[3px] bg-accent p-9 text-accent-foreground md:p-[50px]">
          <div className="mb-[22px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/12">
            <MessageCircle size={22} strokeWidth={1.6} className="text-accent-foreground" />
          </div>
          <div className="mb-[18px] font-mono text-[12px] tracking-[.16em] text-[#9fb09a] uppercase">
            WhatsApp Channel
          </div>
          <h2 className="mb-[14px] font-serif text-[28px] leading-[1.1] font-medium md:text-[34px]">
            New essays, notes, and reading recommendations
          </h2>
          <p className="mb-7 max-w-[40ch] text-[16px] leading-[1.6] text-[#c2cabb]">
            Quietly, a couple of times a week &mdash; no group chat, no
            pressure to reply, just the writing as it comes out.
          </p>
          <WhatsAppJoinButton href={siteConfig.whatsappChannelUrl} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[640px] px-6 pb-20 md:px-16">
        <div className="rounded-[3px] border border-border-strong bg-surface p-9 md:p-[50px]">
          <h2 className="mb-5 font-serif text-[22px] leading-[1.2] font-medium text-ink-strong">
            Community Rules
          </h2>
          <ul className="flex flex-col gap-3">
            {communityRules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-3 text-[15px] leading-[1.6] text-muted-2"
              >
                <span className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-sage" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
