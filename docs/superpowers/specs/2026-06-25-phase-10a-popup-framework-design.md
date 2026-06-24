# Phase 10A — Popup/Modal Framework

## Context

`PHASES.md`'s Phase 10 ("Popups, Polish, Launch QA") bundles four independent concerns. Per the established Phase 7/Phase 9 pattern, it's split into sub-phases: **10A — Popup/Modal Framework** (this doc), 10B — Accessibility Pass, 10C — Performance Pass, 10D — Acceptance Criteria Walkthrough.

PRD §10 ("Popup requirements") specifies: optional, controlled, respectful popups; trigger after a meaningful delay/scroll/exit-intent; store dismissal state locally; don't show multiple popups in one visit; obvious dismissal; accessible keyboard behavior; allow inline CTAs as an alternative. Suggested defaults: show after 45–60s or 55–65% scroll depth; don't show again for 7–14 days after dismissal; disable on short notes and reader-submission pages; avoid popups in the first session except for a "gentle newsletter offer."

As of this phase, `content/products/` is empty (only `.gitkeep` — no real product exists yet, "Coming Soon" is the only state). So the only sensible default campaign is the newsletter signup, which also satisfies the PRD's "gentle newsletter offer" exception for first-session visitors.

## Decisions

- **Default campaign:** Newsletter signup, reusing the existing `NewsletterForm` component.
- **Trigger:** Delay (50s) OR scroll depth (60%), whichever fires first. No exit-intent (unreliable on mobile/touch, which is most of this site's traffic per other phases' mobile-first focus).
- **Scope control:** A hardcoded pathname denylist in config, not a frontmatter field. Simpler, and covers non-content routes (legal pages, search) that a content-frontmatter flag couldn't reach anyway.

## Architecture

- **`config/popup.ts`** — plain config object:
  ```ts
  export const popupConfig = {
    disabledPaths: ["/notes", "/share-your-story", "/newsletter", "/privacy", "/terms", "/disclosures", "/editorial-policy", "/search"],
    delayMs: 50_000,
    scrollDepthPercent: 60,
    dismissDays: 10,
  };
  ```
  A path is disabled if it equals or starts with (`/notes/...`) any entry in `disabledPaths`.

- **`lib/popup/storage.ts`** — localStorage/sessionStorage helpers, following the `kwis-*` key convention used by `lib/series-progress/storage.ts`:
  - `wasDismissedRecently(): boolean` / `recordDismissal(): void` — localStorage key `kwis-popup-dismissed-at` (ISO timestamp), compared against `dismissDays`.
  - `wasShownThisSession(): boolean` / `recordShown(): void` — sessionStorage key `kwis-popup-shown` (enforces "not more than once per visit," independent of the long-term dismissal window).
  - Both wrapped in try/catch (storage can throw in private-browsing/disabled-storage edge cases), matching the defensive pattern in `series-progress/storage.ts`'s `readMap()`.

- **`lib/popup/use-popup-trigger.ts`** — a hook returning `boolean` (whether the popup should render):
  - Returns `false` immediately if the current pathname matches `disabledPaths`, or if `wasDismissedRecently()` / `wasShownThisSession()`.
  - Otherwise arms a `setTimeout(delayMs)` and a `scroll` listener computing `scrollY / (scrollHeight - innerHeight) * 100 >= scrollDepthPercent`.
  - On whichever fires first: sets state to `true`, calls `recordShown()`, tears down both the timer and the scroll listener.
  - Cleans up both on unmount.

- **`components/popup/newsletter-popup.tsx`** — the modal UI, adapted from `components/reading-list/reading-list-modal.tsx`'s established a11y pattern: `role="dialog"`, `aria-modal="true"`, `aria-label`, Escape-to-close, backdrop-click-to-close (with `stopPropagation` on the inner panel), `document.body.style.overflow = "hidden"` while open. Contains a heading, one line of supporting copy, and the existing `<NewsletterForm location="popup" />`. The close button and a successful form submission both call `recordDismissal()` then unmount the popup. Calls `track("popup_shown", { campaign: "newsletter" })` once on mount and `track("popup_dismissed", { campaign: "newsletter" })` on explicit close.

- **`components/popup/popup-controller.tsx`** — `"use client"`, mounted once in `app/layout.tsx` next to `<Analytics />`/`<SpeedInsights />`. Calls `usePathname()` and `usePopupTrigger()`; renders `<NewsletterPopup />` only once triggered, otherwise renders nothing.

## Data flow

Layout mounts `PopupController` on every page → hook checks denylist/storage → if eligible, arms timer + scroll listener → first to fire flips visibility → modal renders, fires `popup_shown` → user dismisses (X / Escape / backdrop / submits form) → `recordDismissal()` + `popup_dismissed` (skipped on submit, since submission is the desired outcome, not a generic dismiss) → modal unmounts → won't reappear for `dismissDays`, and won't reappear this session even before that window matters.

## Error handling

- Storage access wrapped in try/catch (matches existing `series-progress/storage.ts` pattern) — degrades to "never shown" rather than throwing, since a popup silently not appearing is harmless but a thrown error breaking page render is not.
- No network requests are made by this feature itself; the contained `NewsletterForm` already handles its own submission flow from Phase 7B.

## Testing / verification

`npm run build` and `npm run lint` confirm the code compiles and type-checks. The modal's rendered markup and accessibility attributes can be verified by temporarily forcing `usePopupTrigger()` to return `true` and inspecting the HTML via `curl` against `next build && next start`, the same way other client-rendered features in this project have been spot-checked.

The actual timer/scroll-depth firing behavior, and storage persistence across real page loads, are client-side runtime behaviors with no server-rendered signal — they cannot be verified from this environment (no browser tool). This will be stated plainly rather than claimed as verified; real-world confirmation is a manual post-deploy check for the user.
