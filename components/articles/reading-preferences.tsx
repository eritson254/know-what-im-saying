"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { FOCUS_READING_STORAGE_KEY } from "@/lib/theme/constants";
import { applyFocusReading } from "@/lib/focus-reading/transform";
import { useLocalStorageValue } from "@/lib/utils/use-local-storage-value";

const ARTICLE_BODY_SELECTOR = ".article-prose";

export function ReadingPreferences() {
  const storedFocusReading = useLocalStorageValue(FOCUS_READING_STORAGE_KEY);
  const [override, setOverride] = useState<boolean | null>(null);
  const pristineHtmlRef = useRef<string | null>(null);

  const focusReading = override ?? storedFocusReading === "true";

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(ARTICLE_BODY_SELECTOR);
    if (container) pristineHtmlRef.current = container.innerHTML;
  }, []);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(ARTICLE_BODY_SELECTOR);
    if (!container || pristineHtmlRef.current === null) return;

    container.innerHTML = pristineHtmlRef.current;
    if (focusReading) applyFocusReading(container);
  }, [focusReading]);

  function toggleFocusReading() {
    const next = !focusReading;
    setOverride(next);
    localStorage.setItem(FOCUS_READING_STORAGE_KEY, String(next));
  }

  return (
    <div className="mx-auto flex max-w-[720px] items-center justify-center gap-3 px-6 pt-9 pb-10">
      <span className="font-mono text-[11px] tracking-[.08em] text-muted-3 uppercase">
        Reading preferences
      </span>
      <button
        type="button"
        onClick={toggleFocusReading}
        aria-pressed={focusReading}
        title="Focus Reading Mode"
        className={`flex items-center gap-[6px] rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
          focusReading
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border-card text-muted-1 hover:border-accent-text hover:text-accent-text"
        }`}
      >
        <Eye size={13} strokeWidth={1.8} />
        Focus Reading
      </button>
    </div>
  );
}
