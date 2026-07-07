# Bionic / Focus Reading Mode

Portable writeup of the "Focus Reading Mode" feature from this project (Know What I'm Saying), so it can be dropped into another blog. It's a bionic-reading-style toggle: it bolds the leading portion of longer words in article body text to help guide the eye, and it's fully reversible.

## How it works

1. A transform function walks the real DOM text nodes inside the article container (never touches `innerHTML` as a string), skipping code blocks, links, headings, buttons, nav, forms, etc.
2. For each word 4+ characters long, it wraps the first ~40% of the word in a `<span style="font-weight:600">`.
3. Before applying, the component snapshots the container's pristine `innerHTML`. Toggling off restores that snapshot, so it's non-destructive and safe to toggle repeatedly without corrupting markup.
4. The preference is stored in `localStorage` and read back on load via `useSyncExternalStore` (SSR-safe — returns `null` on the server, real value after hydration).

Design constraints this satisfies (carried over from the original PRD):
- Off by default; opt-in only.
- Applies only to article body content — never nav, footer, buttons, forms, metadata.
- Preserves links, italics, bold, footnotes, punctuation, contractions/apostrophes, hyphenation.
- No animated transitions (respects reduced-motion by simply not animating).
- Immediately reversible with no nested/duplicate markup on repeat toggles.

## 1. The transform (`lib/focus-reading/transform.ts`)

```ts
const FIXATION_ATTR = "data-kwis-fixation";

const EXCLUDED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "CODE",
  "PRE",
  "BUTTON",
  "A",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "NAV",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
]);

const MIN_WORD_LENGTH_TO_EMPHASIZE = 4;
const FIXATION_RATIO = 0.4;

function isExcluded(node: Node, root: HTMLElement): boolean {
  let current: Node | null = node;
  while (current && current !== root) {
    if (current.nodeType === Node.ELEMENT_NODE) {
      const element = current as Element;
      if (EXCLUDED_TAGS.has(element.tagName)) return true;
      if (element.hasAttribute("data-kwis-skip")) return true;
    }
    current = current.parentNode;
  }
  return false;
}

function collectTextNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (current.textContent && !isExcluded(current, root)) {
      nodes.push(current as Text);
    }
    current = walker.nextNode();
  }
  return nodes;
}

const WORD_SPLIT_PATTERN = /([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’-]*)/;

function buildFixationFragment(text: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const pieces = text.split(WORD_SPLIT_PATTERN);

  pieces.forEach((piece, index) => {
    if (piece === "") return;
    const isWord = index % 2 === 1;

    if (isWord && piece.length >= MIN_WORD_LENGTH_TO_EMPHASIZE) {
      const fixationLength = Math.max(1, Math.ceil(piece.length * FIXATION_RATIO));
      const span = document.createElement("span");
      span.setAttribute(FIXATION_ATTR, "true");
      span.style.fontWeight = "600";
      span.textContent = piece.slice(0, fixationLength);
      fragment.appendChild(span);

      const remainder = piece.slice(fixationLength);
      if (remainder) fragment.appendChild(document.createTextNode(remainder));
    } else {
      fragment.appendChild(document.createTextNode(piece));
    }
  });

  return fragment;
}

/** Wraps the leading portion of long words in fixation spans. Operates on real text nodes, skipping code/links/headings/etc. */
export function applyFocusReading(root: HTMLElement): void {
  const textNodes = collectTextNodes(root);
  for (const textNode of textNodes) {
    if (!textNode.textContent || !textNode.textContent.trim()) continue;
    const fragment = buildFixationFragment(textNode.textContent);
    textNode.replaceWith(fragment);
  }
}
```

## 2. SSR-safe localStorage read hook (`lib/utils/use-local-storage-value.ts`)

```ts
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return null;
}

/** SSR-safe read of a single localStorage key; re-renders once after hydration with the real value. */
export function useLocalStorageValue(key: string) {
  return useSyncExternalStore(
    subscribe,
    () => (typeof window === "undefined" ? null : localStorage.getItem(key)),
    getServerSnapshot,
  );
}
```

## 3. Storage key constant

```ts
export const FOCUS_READING_STORAGE_KEY = "focus-reading"; // pick any app-specific key
```

## 4. The toggle component (`components/reading-preferences.tsx`)

Adjust `ARTICLE_BODY_SELECTOR` to whatever wraps your article's prose content.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";
import { FOCUS_READING_STORAGE_KEY } from "@/lib/constants";
import { applyFocusReading } from "@/lib/focus-reading/transform";
import { useLocalStorageValue } from "@/lib/utils/use-local-storage-value";

const ARTICLE_BODY_SELECTOR = ".article-prose"; // <-- change to match your article container class

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
```

## Porting checklist

- [ ] Copy `transform.ts` as-is (no project-specific dependencies).
- [ ] Copy `use-local-storage-value.ts` as-is.
- [ ] Add your own storage key constant.
- [ ] Update `ARTICLE_BODY_SELECTOR` to match the target blog's article wrapper class.
- [ ] Update the Tailwind classes in the button/label to match the target site's design tokens (colors like `text-muted-3`, `border-accent`, etc. are this project's theme tokens, not generic Tailwind).
- [ ] Drop `lucide-react`'s `Eye` icon or swap for whatever icon set the target project uses.
- [ ] Render `<ReadingPreferences />` above/below the article body on article/post pages only.
- [ ] If the target project doesn't use React 18+ (`useSyncExternalStore`), replace the hook with a simple `useState` + `useEffect(() => setValue(localStorage.getItem(key)), [])`.

## Notes / tuning knobs

- `MIN_WORD_LENGTH_TO_EMPHASIZE` (default `4`) — words shorter than this are left alone, so short function words ("the", "and", "of") don't get bolded.
- `FIXATION_RATIO` (default `0.4`) — fraction of each qualifying word's length that gets bolded, rounded up.
- `EXCLUDED_TAGS` — add any additional tags/components you want the transform to skip entirely (e.g. custom MDX components), or mark specific elements with `data-kwis-skip="true"` (rename the attribute if desired) to opt them out individually.
