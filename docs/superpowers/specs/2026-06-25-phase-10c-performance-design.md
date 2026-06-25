# Phase 10C — Performance Pass

## Context

Third sub-phase of Phase 10, after [[10A — Popup Framework]] and [[10B — Accessibility Pass]] (both shipped). PRD §25's performance acceptance criteria: "Site is optimized for static delivery and performs well on mobile," "Images are optimized and do not cause major layout shifts," "Search works without a custom backend," "Core page navigation remains fast on standard mobile networks." PRD §18 also names Core Web Vitals, optimized image delivery, and clean URLs as launch-readiness checklist items.

No Lighthouse, browser, or other live-metrics tool is available in this environment, so this audit relies on what's verifiable from the build output, compiled chunk inspection, and structural/code-level reasoning rather than synthetic or real-user performance scores.

## Audit findings

**Bundle size — already lean, no action needed.** `npm run build`'s output confirms every route renders as static (`○`) or SSG (`●`) — no dynamic SSR on any user-facing page. Inspecting `.next/static/chunks/*.js` directly: total JS across all chunks is ~800KB uncompressed; the single largest chunk (227KB) is `react-dom` itself (an unavoidable framework baseline). Searching all chunks for `lucide`/`createLucideIcon` found code in only one ~28KB shared chunk (which also contains `@vercel/analytics`, `@vercel/speed-insights`, and the pagefind dynamic-import path string) — confirming tree-shaking already eliminates the other ~1,485 unused icons from the `lucide-react` package without any extra `optimizePackageImports` config.

**Image optimization — still moot, same as Phase 10B's finding.** No real `<img>` element exists anywhere in the codebase; `components/ui/placeholder-image.tsx` is a styled `<div>` that already reserves layout space via an `aspect-ratio` inline style, so it cannot cause layout shift. Revisit once real images are seeded (likely alongside a real product, per [[phase10a_popup_framework_notes]]).

**Fonts — already optimal, no action needed.** `next/font/google` (used for Newsreader, Inter, Space Mono) self-hosts font files at build time and sets `font-display: swap` by default, eliminating render-blocking external font requests and most font-driven layout shift.

**Core Web Vitals monitoring — already wired, no new code needed.** `@vercel/speed-insights` has been collecting real-user CWV data since Phase 9D. Without that real-user data (or a synthetic Lighthouse run), there's no specific metric to chase with further code changes right now — the actionable next step is checking the Vercel dashboard after this ships, which is the user's manual step, same pattern as other account-gated items.

**`reading-progress-bar.tsx`'s `--mobile-header-h` jump — assessed, not fixed.** This `position: fixed` progress bar reads `top: var(--mobile-header-h, 0px)`, and the real value is only set once `Header`'s `ResizeObserver` fires post-mount. Decided not to fix: because the element is `position: fixed`, this can't shift any in-flow content; the bar itself moves down slightly, once, very early in the page lifecycle. Judged likely below CLS's perceptible/scored threshold, and not worth the added complexity (e.g., an inline blocking script guessing header height) for a fix of uncertain real-world benefit.

**Pagefind's unused UI bundle — assessed, not fixed.** The `pagefind` CLI always emits `pagefind-ui.js` and `pagefind-component-ui.js` (~292KB combined) into `public/pagefind/`, even though `search-client.tsx` only dynamically imports the lower-level `/pagefind/pagefind.js` API (a deliberate choice from Phase 9C, to keep this site's custom design rather than the default widget). No CLI flag exists to suppress generating these files. Since no page ever requests them, they cost nothing at runtime for any real user — they're dead disk/deploy weight, not a performance metric. Not worth a custom postbuild deletion step coupled to pagefind's internal output structure for a non-runtime concern.

## Fix

`next.config.ts` currently has an empty config object, leaving Next's default `poweredByHeader: true`, which sends an `X-Powered-By: Next.js` response header on every request — unnecessary bytes on every single page load, with no benefit. Disable it:

```ts
const nextConfig: NextConfig = {
  poweredByHeader: false,
};
```

## Testing / verification

`npm run build` confirms the config change doesn't break the build. The header removal itself can be confirmed via `curl -I` against `next build && next start`, checking the response headers no longer include `X-Powered-By`. The audit findings above (bundle composition, route static-ness) were verified directly from build output and `.next/static/chunks` inspection, not estimated — but real-world Core Web Vitals scores remain unverifiable from this environment, same limitation as every prior phase's client-only behavior.
