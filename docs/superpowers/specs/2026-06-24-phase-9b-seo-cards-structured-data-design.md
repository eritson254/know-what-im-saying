# Phase 9B — OG/Twitter Cards, Structured Data — Design

**Status:** Approved
**Scope:** Open Graph + Twitter card images/tags, Article JSON-LD, Breadcrumb JSON-LD, and a documented approach to social share preview QA — the second of four sub-phases decomposing Phase 9 per PHASES.md and [[phase9a_sitemap_robots_feed_notes]].

## Context

`docs/prd.md` §18 requires Open Graph tags, Twitter/X card tags, Article structured data, and breadcrumb structured data "where relevant." §13 additionally calls for "high-quality Open Graph preview images" per essay, and §25 (acceptance criteria) states "every published article has metadata, canonical URL, Open Graph image, and structured article data." No real photography/logo exists yet anywhere on the site — all imagery so far is the prototype's diagonal-stripe placeholder pattern (per the project's working agreement against inventing stock imagery), so OG images must be generated from real content data (titles, site branding), not photos.

## Decisions

- **OG image scope: essays, notes, and series get per-content cards** showing the real title; everything else (homepage, archives, topics, resources, legal pages) falls back to one generic site-wide branded card.
- **No new dependency.** `ImageResponse` from `next/og` is built into Next.js — no `@vercel/og` package needed.
- **No separate Twitter image route.** `buildPageMetadata` adds `twitter: { card: "summary_large_image" }`; X/Twitter's crawler falls back to `og:image` when no explicit `twitter:image` is set. Avoids generating/maintaining two near-identical images per page.
- **No `publisher.logo` in Article JSON-LD.** No real logo file exists yet; inventing one would violate the no-placeholder-imagery working agreement. This is a known gap to close once a real logo exists (some rich-results validators expect it).
- **Author in JSON-LD is `{ "@type": "Person", "name": "The Editor" }`**, matching the existing "Written by the editor" voice already established in `AuthorNote` (Phase 4) and the Editorial Policy (7D).
- **Breadcrumbs mirror the site's actual flat URL structure**, not an invented deeper hierarchy. Essays that belong to a series still get `Home > Essays > [Title]` (not a series-based breadcrumb) — the series relationship is already surfaced visually via the series pill in `ArticleHeader`, and Google's breadcrumb guidelines advise against a hierarchy that contradicts the page's real URL path.
- **Social share preview QA is verification-by-meta-tag-inspection, not live-platform QA.** Facebook Sharing Debugger / X Card Validator / LinkedIn Post Inspector all require a publicly deployed URL and aren't usable in this environment. This phase verifies correctness by curling representative pages and inspecting the actual `<meta>`/JSON-LD output; real platform-rendered preview QA is a manual follow-up after the next deploy.

## OG image generation

**Visual design** (1200×630), reusing existing design tokens, no new colors/fonts:
- Paper background (`#F4F1E8`)
- The existing placeholder diagonal-stripe texture (`--color-placeholder-*` tokens) as a quiet corner accent
- Feather mark + "Know What I'm Saying?" wordmark, top-left
- Eyebrow pill (topic label, for content-specific cards), styled like the existing `Pill` component
- Headline in Newsreader serif — font size steps down for titles over ~50 characters to avoid overflow
- Thin Space Mono footer line with the site URL

**Font loading:** `ImageResponse` (Satori) requires actual font binary data, not `next/font`. The shared helper fetches the Newsreader and Space Mono `.ttf`/`.woff` files from Google Fonts' CDN at build/render time — the standard pattern for `next/og`. If this proves unreliable in the build environment, the fallback is a system sans-serif for OG image text only; nothing else on the site is affected.

**Files:**
- `lib/seo/og-image.tsx` — shared rendering function, takes `{ eyebrow?: string; title: string }`, returns an `ImageResponse`. Generic site-wide variant (no eyebrow/title, just wordmark + tagline) is a separate simple case in the same module.
- `app/opengraph-image.tsx` — generic site-wide default
- `app/essays/[slug]/opengraph-image.tsx` — per-essay, `generateImageMetadata`/params-based, eyebrow = topic label
- `app/notes/[slug]/opengraph-image.tsx` — per-note, eyebrow = topic label
- `app/series/[slug]/opengraph-image.tsx` — per-series, eyebrow = "Series"

## Twitter cards

Add `twitter: { card: "summary_large_image" }` to `buildPageMetadata` (`lib/seo/metadata.ts`). No image field set explicitly — relies on the `og:image` fallback behavior described above.

## Article JSON-LD

New `components/seo/article-json-ld.tsx`, rendered on `/essays/[slug]` and `/notes/[slug]`:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "datePublished": "...",
  "dateModified": "...",
  "image": "<absolute OG image URL>",
  "author": { "@type": "Person", "name": "The Editor" },
  "publisher": { "@type": "Organization", "name": "Know What I'm Saying?" },
  "mainEntityOfPage": "<canonical URL>"
}
```

Serialized via `JSON.stringify` with `<` escaped to `<` before injection into a `<script type="application/ld+json" dangerouslySetInnerHTML>`, preventing any `</script>`-breakout edge case even though all source data is trusted repo content.

## Breadcrumb JSON-LD

New `components/seo/breadcrumb-json-ld.tsx`, takes `items: { name: string; url: string }[]`, emits schema.org `BreadcrumbList`. Used on:
- `/essays/[slug]`: Home > Essays > [Title]
- `/notes/[slug]`: Home > Notes > [Title]
- `/series/[slug]`: Home > Series > [Title]
- `/topics/[slug]`: Home > Topics > [Title]
- `/resources/[slug]`: Home > Resources > [Title]

## Verification approach

After implementation: `curl` the homepage, one essay, one note, and one series page; grep for `og:`, `twitter:`, and `application/ld+json` to confirm well-formed output. No live-platform crawler QA in this phase (documented limitation above).

## Out of scope

- A real site logo (`publisher.logo` stays absent until one exists)
- Live social-platform preview QA (Facebook/X/LinkedIn debuggers) — manual follow-up after deploy
- OG images for topics, resources, and legal pages (generic site-wide card only)
