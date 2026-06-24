# Phase 9A — Sitemap, robots.txt, RSS Feed — Design

**Status:** Approved
**Scope:** Build `app/sitemap.ts`, `app/robots.ts`, and `app/feed.xml/route.ts` — the first of four sub-phases decomposing Phase 9 ("Search, SEO, Feeds, Analytics") per PHASES.md.

## Context

Phase 9 bundles four independent subsystems (search, sitemap/robots/RSS, SEO metadata/structured data, analytics). Per the user's confirmed split:
- **9A** (this phase): Sitemap, robots.txt, RSS feed
- **9B**: Open Graph + Twitter card generation, Article structured data, breadcrumb structured data, social share preview QA
- **9C**: Pagefind search integration + search page
- **9D**: Vercel Analytics (+ optional Plausible/Umami) wiring

`docs/prd.md` §18 ("SEO Requirements") lists "XML sitemap, robots.txt, RSS feed" as a flat checklist with no format/scope detail — the design decisions below fill that gap. Note: §11 "Sitemap" in `prd.md` is actually a site IA diagram (page tree), not the XML sitemap spec — naming is confusing but unrelated to this phase's actual sitemap.xml work.

## Decisions

- **RSS feed content: summary only**, not full body — title, description, link, pubDate, guid per item. Matches the PRD's stated principle that "the website remains the primary home" (used for the newsletter decision in 7B) — encourages click-through rather than full in-reader consumption.
- **RSS feed scope: combined essays + notes**, sorted by date descending, in one feed at `/feed.xml`. Matches how the site already bundles "new essays, notes, and reading recommendations" as one offering on the Newsletter/WhatsApp CTAs. No separate per-collection feeds.
- **No new dependency** for the RSS feed — hand-rolled RSS 2.0 XML in a Route Handler, since the feed is simple enough not to need the `feed` npm package.
- **Sitemap excludes `/search`** for now — that route doesn't exist until 9C. One line gets added when 9C ships.
- **robots.txt allows everything** — nothing on the site is private/admin-gated, so there are no disallow rules. Points `sitemap` at `${siteConfig.url}/sitemap.xml`.
- **Feed discoverability via `<link rel="alternate">` only** — added to the root layout's metadata, not a visible nav/footer link. RSS isn't something this audience finds through site navigation; feed readers auto-detect the `<link>` tag.

## `app/sitemap.ts`

Native `MetadataRoute.Sitemap` export (no new dependency, built into Next.js 16). Entries:
- Static: `/`, `/essays`, `/series`, `/notes`, `/topics`, `/reading-list`, `/start-here`, `/about`, `/community`, `/share-your-story`, `/newsletter`, `/resources`, `/contact`, `/privacy`, `/terms`, `/editorial-policy`, `/disclosures`
- Dynamic, from existing loaders: `/essays/[slug]` (`getAllEssays()`), `/series/[slug]` (`getAllSeries()`), `/notes/[slug]` (`getAllNotes()`), `/topics/[slug]` (`topics` array), `/resources/[slug]` (`getAllProducts()` — currently empty, contributes nothing)
- `lastModified`: frontmatter `updated ?? date` where the collection has one; omitted for routes without a meaningful content date (topics, static pages)
- Default `priority`/`changeFrequency`: homepage highest (1.0, weekly), archive/listing pages next (0.8, weekly), individual content pages moderate (0.6, monthly), legal/static pages lowest (0.3, yearly)

## `app/robots.ts`

Native `MetadataRoute.Robots` export: `{ rules: { userAgent: "*", allow: "/" }, sitemap: \`${siteConfig.url}/sitemap.xml\` }`.

## `app/feed.xml/route.ts`

Route Handler returning `Response` with `Content-Type: application/rss+xml`. Builds RSS 2.0 XML by hand:
- Channel: title (`siteConfig.name`), description (`siteConfig.tagline`), link (`siteConfig.url`), language `en-us`
- Items: `getAllEssays()` + `getAllNotes()` merged, sorted by `frontmatter.date` descending, each rendered as `<item>` with title, description, link (`${siteConfig.url}/essays/${slug}` or `/notes/${slug}`), `pubDate` (RFC 822 from `frontmatter.date`), `guid` (the link, `isPermaLink="true"`)
- XML-escape all text fields (title/description) to avoid malformed feeds from special characters in essay titles/descriptions

## Root layout change

Add `alternates: { types: { "application/rss+xml": "/feed.xml" } }` to the metadata exported from `app/layout.tsx` (or wherever site-wide metadata defaults live) so feed readers can auto-discover it via the standard `<link rel="alternate">` tag.

## Out of scope

- `/search` sitemap entry (9C)
- OG/Twitter cards, structured data (9B)
- Any per-collection or per-series feed
- A visible RSS link in nav/footer
