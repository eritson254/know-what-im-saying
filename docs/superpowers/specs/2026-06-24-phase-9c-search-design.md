# Phase 9C — Pagefind Search — Design

**Status:** Approved
**Scope:** Pagefind static search integration + `/search` page — the third of four sub-phases decomposing Phase 9 per [[phase9a_sitemap_robots_feed_notes]] / [[phase9b_seo_cards_structured_data_notes]].

## Context

`docs/design-prd.md` §9.17 specs the Search page: a large search field with placeholder copy "Search essays, series, notes, and topics," results showing content type/topic/title/excerpt/date/reading time/series context, and 8 suggested-search chips shown before a query is entered. `/search` is already linked from the masthead header's "Search" text link, the mobile menu, and the mobile tab bar (all already shipped, all currently dangling — same pattern as every other sub-phase in this project). The `StandardHeader` (inner pages) has a bare, non-functional `<Search>` icon with no link at all.

## Decisions

- **Pagefind**, indexing `next build`'s static HTML output (`.next/server/app`) via a `postbuild` script, output to `public/pagefind`. Works without `output: "export"` since every content route here is already fully static/SSG.
- **Custom-built results UI, not `PagefindUI`.** The default widget ships its own generic CSS that would be the first third-party UI component on a site that's otherwise 100% custom-styled. Use Pagefind's lower-level JS API (`pagefind.search()`) instead.
- **Indexing scope: essays, notes, series, topics only** — matches the design spec's literal placeholder text. Reading List, Resources, and legal pages are not indexed.
- **`data-pagefind-ignore` on `Header`, `Footer`, `MobileTabBar`** (one shared-component edit each) rather than scoping `data-pagefind-body` per template — these three are rendered identically on every page, so excluding them globally avoids polluting every single page's index entry with the same nav/footer text and avoids needing to touch every content template's structure just to scope indexing.
- **Per-template metadata via one hidden marker element each**, using Pagefind's comma-separated `data-pagefind-meta` syntax on a single attribute (`type:..., topic:..., date:..., readingTime:..., series:...`) rather than multiple separate elements.
- **Live, debounced search** (~300ms) with the query synced to a `?q=` URL param, rather than submit-only search — standard, expected search UX, not "aggressive" in the sense the project's working agreements caution against (that guidance is about popups/sales pressure, not search interactivity).
- **Suggested-search chips use the design spec's exact 8 terms** verbatim (Unrequited love, Betrayal, Friendship, Boundaries, Technology, Ambition, Loneliness, Dating), even though some may currently return zero results — an honest reflection of current content coverage, not a bug to fix by inventing matching content.
- **Dev-mode graceful degradation.** Pagefind's index only exists after at least one production build (`npm run build`) has run; `npm run dev` never triggers `postbuild`. The search page must not crash if `/pagefind/pagefind.js` 404s — handle the failed dynamic import/fetch and show an empty/unavailable state instead.
- **Two small bundled fixes:** add the `/search` entry to `app/sitemap.ts` (deferred from 9A's spec specifically for this phase), and wrap `StandardHeader`'s bare `<Search>` icon in a `<Link href="/search">` to match the masthead header's already-working text link.

## Indexing setup

- `package.json`: add `pagefind` devDependency; add `"postbuild": "pagefind --site .next/server/app --output-path public/pagefind"`.
- `components/layout/header.tsx`, `footer.tsx`, `mobile-tab-bar.tsx`: add `data-pagefind-ignore` to each component's root element.
- `app/essays/[slug]/page.tsx`: hidden marker, e.g. `<span hidden data-pagefind-meta={\`type:Essay, topic:${topicLabel}, date:${date}, readingTime:${readingTime}${series ? \`, series:${seriesTitle}\` : ""}\`} />`
- `app/notes/[slug]/page.tsx`: same pattern, `type:Note`, no series field.
- `app/series/[slug]/page.tsx`: `type:Series`, no date/readingTime (series pages don't have a single publish date).
- `app/topics/[slug]/page.tsx`: `type:Topic`.
- Pagefind auto-generates a highlighted excerpt (`<mark>` around matches) per result — no manual excerpt field needed; rendered via a controlled `dangerouslySetInnerHTML` since the HTML comes from Pagefind's own trusted index output, not user input.

## `/search` page

File: `app/search/page.tsx` (client component for the interactive search, since it needs browser-side Pagefind JS).

1. Header
2. Large search input, placeholder "Search essays, series, notes, and topics," value synced to `?q=`
3. Before any query: 8 suggested-search chips (design spec's exact list) — clicking sets the query and triggers a search
4. After a query: list of results, each showing:
   - Content-type `Pill` (Essay/Note/Series/Topic, from the `type` meta field)
   - Topic label (`topic` meta field, when present)
   - Title (Pagefind's page title, or a `title` meta override if needed for consistency)
   - Excerpt (Pagefind's highlighted excerpt)
   - Date + reading time (when present, essays/notes only)
   - "Series · [Name]" badge (when the `series` meta field is present)
5. Empty-query-with-no-results and Pagefind-unavailable (dev mode, no build yet) states both render a calm, non-error-looking message — consistent with the rest of the site's tone.

Metadata via `buildPageMetadata`: title "Search", description matching the placeholder copy, pathname `/search`.

## Small fixes

- `app/sitemap.ts`: add `{ path: "/search", priority: 0.6, changeFrequency: "monthly" }` to `STATIC_ROUTES`.
- `components/layout/header.tsx`: wrap the `StandardHeader`'s `<Search>` icon in `<Link href="/search">`.

## Out of scope

- Reading List, Resources, legal pages in the index
- Search analytics/query tracking
- Typo tolerance/ranking tuning beyond Pagefind defaults
