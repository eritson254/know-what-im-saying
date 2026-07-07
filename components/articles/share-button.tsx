"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export function ShareButton({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl = window.location.href;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // user cancelled the share sheet, no error needed
      }
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
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
