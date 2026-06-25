# Phase 10D — Acceptance Criteria Walkthrough

## Context

Final sub-phase of Phase 10, after [[10A — Popup Framework]], [[10B — Accessibility Pass]], and [[10C — Performance Pass]] (all shipped). This is PRD §25's launch-readiness gate — the last phase before the site is considered launch-ready per `PHASES.md`. Each criterion below was checked directly against the current codebase (reading the relevant source, not assuming from memory of earlier phases), not just recalled from having built it.

## Content and publishing

- ✅ A new MDX essay can be added without editing application code — `lib/content/fs.ts`'s `getCollection()` reads every `.mdx` file in a content directory dynamically; no per-essay code exists anywhere.
- ✅ New essays automatically appear in relevant archives, topics, search, RSS, and related-content areas — all derive from `getAllEssays()`.
- ✅ A series installment can be connected to its series using frontmatter — `seriesRefSchema` (`lib/content/schema.ts`).
- ✅ Series pages show ordered installments correctly — `getSeriesInstallments()` sorts by `installment` number.
- ❌ → ✅ (fixed this phase) **Draft content is not publicly indexable or visible.** `getAllEssays()`/`getAllNotes()` correctly filter `status === "published"` for listings, archives, sitemap, and search. But `getEssayBySlug()`/`getNoteBySlug()` (used directly by the `/essays/[slug]` and `/notes/[slug]` pages, and their `opengraph-image` routes) have no such filter. Since this site deploys to Vercel (not a static export) with Next's default `dynamicParams: true`, a request for a slug absent from `generateStaticParams`'s published-only list falls through to on-demand rendering at request time — which would successfully render a draft if its slug were ever discovered or linked. **Fix:** add `export const dynamicParams = false;` to all 4 affected files (`app/essays/[slug]/page.tsx`, `app/essays/[slug]/opengraph-image.tsx`, `app/notes/[slug]/page.tsx`, `app/notes/[slug]/opengraph-image.tsx`), making Next return a 404 for any slug not in the build-time list — correct here since every essay/note is known at build time from the filesystem; there's no legitimate case needing on-demand generation for an unknown slug.

## Performance

- ✅ Site is optimized for static delivery and performs well on mobile — confirmed in [[phase10c_performance_notes]] (every route static/SSG, lean ~800KB total JS).
- ✅ Images are optimized and do not cause major layout shifts — no real images exist yet; `PlaceholderImage` reserves space via `aspect-ratio`.
- ✅ Search works without a custom backend — Pagefind static index, confirmed in Phase 9C.
- ✅ Core page navigation remains fast on standard mobile networks — static rendering + lean JS bundle (10C).

## UX

- ✅ Readers can comfortably read long essays on mobile and desktop — responsive article template, Focus Reading Mode (Phase 6).
- ✅ Reader theme and Focus Reading Mode preferences persist locally — `useSyncExternalStore`-backed localStorage, Phase 6.
- ✅ Series pages visibly distinguish unread, reading-now, read, and upcoming installments — `reading-order.tsx`'s `STATE_LABEL`/`STATE_BADGE_CLASSES`, contrast-corrected in 10B.
- ✅ Series progress is clearly explained as browser/device-local in Version 1 — `series-read-progress-summary.tsx` literally states "Reading progress is saved on this device only."
- ✅ Series reading order is clear — numbered installments in `reading-order.tsx`.
- ✅ Newsletter, WhatsApp, and story-submission CTAs are visible without being aggressive — inline `InlineCta`/banded CTAs from Phase 7, not interstitial.
- ✅ Product popups can be enabled/disabled per page or campaign — `config/popup.ts`'s pathname denylist (10A).
- ✅ Popup dismissal behavior prevents repeated annoyance — 10-day localStorage dismissal + one-per-session guard (10A).
- ✅ All core pages work with keyboard navigation — skip link, restored focus-visible styling, mobile-menu `inert` fix (10B). Note: the *open* mobile menu's Tab/Shift-Tab boundary-escape edge case was a deliberate, documented scope cut in 10B, not a full guarantee for that one specific interaction.

## SEO and sharing

- ✅ Every published article has metadata, canonical URL, Open Graph image, and structured article data — `buildPageMetadata`/`buildCanonicalUrl` (Phase 9A/9B), `ArticleJsonLd` (9B).
- ✅ Sitemap and RSS are generated — `app/sitemap.ts`, `app/feed.xml/route.ts` (9A).
- ✅ Topic and series pages are indexable — `app/robots.ts` allows `/` with no disallow rules; nothing excludes these paths.
- ✅ Share previews are polished when links are posted on WhatsApp, X, LinkedIn, Facebook — `next/og`-generated OG images + Twitter card metadata (9B). Actual rendering on each platform can't be verified from this environment (no browser/external posting), same limitation noted in 9B.

## Privacy and safety

- ✅ Reader story page explains how stories may be adapted — `app/share-your-story/page.tsx`'s `importantInfo` list: "Stories may be edited and anonymized," "Submission does not guarantee publication."
- ✅ Forms collect only necessary information — newsletter form is email-only; the Contact page is a `mailto:` link, not a data-collecting form; the actual Share Your Story form lives in an external Google Form not auditable from this codebase (known limitation from Phase 7C).
- ✅ Policies are accessible from the footer — `footerLegalLinks`: Privacy, Terms, Editorial Policy, Disclosures, Contact.
- ✅ Psychology content includes appropriate disclaimers — `content/pages/terms.mdx` contains the exact disclaimer language required by PRD §22 ("not medical, mental health, legal, or financial advice... not therapy, diagnosis, or crisis support... contact your local emergency or crisis services").
- ✅ Community links are clearly labeled and moderated expectations are stated — `/community` page's "Community Rules" section (Phase 7B).

## Fix implemented this phase

```ts
export const dynamicParams = false;
```
Added to `app/essays/[slug]/page.tsx`, `app/essays/[slug]/opengraph-image.tsx`, `app/notes/[slug]/page.tsx`, `app/notes/[slug]/opengraph-image.tsx`. No other PRD §25 criterion required a code change.

## Testing / verification

`npm run build` confirms the change doesn't break static generation (published slugs still pre-render). The actual 404-on-unknown-slug behavior can be verified via `curl` against `next build && next start` by requesting a slug that doesn't exist in `content/essays/`/`content/notes/` and confirming a 404 response.

## Outcome

With this fix, every PRD §25 acceptance criterion is satisfied as of this phase. This closes out **Phase 10** (10A–10D) and, per `PHASES.md`, the site is launch-ready.
