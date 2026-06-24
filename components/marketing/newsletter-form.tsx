"use client";

import { track } from "@vercel/analytics";

export function NewsletterForm({
  className = "",
  location,
}: {
  className?: string;
  location: string;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        track("newsletter_submit_clicked", { location });
      }}
      className={`flex flex-col gap-[10px] sm:flex-row ${className}`}
    >
      <input
        type="email"
        placeholder="you@email.com"
        className="min-w-0 flex-1 rounded-[2px] border border-border-card bg-white px-[14px] py-3 font-sans text-[15px] text-ink outline-none"
      />
      <button
        type="submit"
        className="rounded-[2px] bg-accent px-[22px] py-3 font-sans text-[15px] font-semibold text-accent-foreground hover:bg-accent-hover"
      >
        Subscribe
      </button>
    </form>
  );
}
