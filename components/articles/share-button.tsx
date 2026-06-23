"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function ShareButton({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled the share sheet — no error needed
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-[6px] text-accent-text"
    >
      {copied ? (
        <>
          <Check size={13} strokeWidth={1.8} />
          Copied
        </>
      ) : (
        <>
          <Share2 size={13} strokeWidth={1.8} />
          Share
        </>
      )}
    </button>
  );
}
