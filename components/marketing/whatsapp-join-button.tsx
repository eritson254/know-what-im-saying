"use client";

import { track } from "@vercel/analytics";

export function WhatsAppJoinButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_join_clicked")}
      className="self-start rounded-[2px] bg-accent-foreground px-[22px] py-3 text-[15px] font-semibold text-accent no-underline hover:bg-white"
    >
      Join the channel
    </a>
  );
}
