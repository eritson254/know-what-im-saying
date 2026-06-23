import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

export function CommunityNewsletter() {
  return (
    <section className="grid gap-8 px-6 pb-16 md:grid-cols-2 md:gap-8 md:px-14 md:pb-[88px]">
      <div className="flex flex-col rounded-[3px] bg-accent p-9 text-accent-foreground md:p-[50px]">
        <div className="mb-[22px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/12">
          <MessageCircle size={22} strokeWidth={1.6} className="text-accent-foreground" />
        </div>
        <div className="mb-[18px] font-mono text-[12px] tracking-[.16em] text-[#9fb09a] uppercase">
          WhatsApp Channel
        </div>
        <h3 className="mb-[14px] font-serif text-[30px] leading-[1.1] font-medium md:text-[34px]">
          Stay close to the writing
        </h3>
        <p className="mb-7 max-w-[34ch] text-[16px] leading-[1.6] text-[#c2cabb]">
          New essays, notes, and reading recommendations — quietly, a couple
          of times a week.
        </p>
        <Link
          href="/community"
          className="mt-auto self-start rounded-[2px] bg-accent-foreground px-[22px] py-3 text-[15px] font-semibold text-accent no-underline hover:bg-white"
        >
          Join the channel
        </Link>
      </div>
      <div className="flex flex-col rounded-[3px] border border-border-strong bg-surface p-9 md:p-[50px]">
        <div className="mb-[22px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-pill">
          <Mail size={22} strokeWidth={1.6} className="text-accent-text" />
        </div>
        <div className="mb-[18px] font-mono text-[12px] tracking-[.16em] text-sage uppercase">
          The Newsletter
        </div>
        <h3 className="mb-[14px] font-serif text-[30px] leading-[1.1] font-medium text-ink-strong md:text-[34px]">
          A letter for people who still like to read.
        </h3>
        <p className="mb-[26px] max-w-[34ch] text-[16px] leading-[1.6] text-muted-2">
          New essays, notes, and ideas worth sitting with.
        </p>
        <form className="mt-auto flex gap-[10px]">
          <input
            type="email"
            placeholder="you@email.com"
            className="flex-1 rounded-[2px] border border-border-card bg-white px-[14px] py-3 font-sans text-[15px] text-ink outline-none"
          />
          <button
            type="submit"
            className="rounded-[2px] bg-accent px-[22px] py-3 font-sans text-[15px] font-semibold text-accent-foreground hover:bg-accent-hover"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
