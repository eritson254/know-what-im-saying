"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { track } from "@vercel/analytics";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { recordDismissal } from "@/lib/popup/storage";

export function NewsletterPopup({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    track("popup_shown", { campaign: "newsletter" });
  }, []);

  function dismiss() {
    recordDismissal();
    track("popup_dismissed", { campaign: "newsletter" });
    onDismiss();
  }

  function dismissOnSubmit() {
    recordDismissal();
    onDismiss();
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-[440px] rounded-[6px] bg-surface p-8 md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-5 top-5 text-muted-3 hover:text-accent-text"
        >
          <X size={18} strokeWidth={1.6} />
        </button>

        <h2 className="mb-2 font-serif text-[24px] leading-[1.15] font-medium text-ink-strong md:text-[28px]">
          Stay close to the writing
        </h2>
        <p className="mb-6 max-w-[36ch] text-[15px] leading-[1.6] text-muted-2">
          New essays and notes, a couple of times a week. No spam, unsubscribe
          anytime.
        </p>

        <NewsletterForm location="popup" onSubmit={dismissOnSubmit} />
      </div>
    </div>
  );
}
