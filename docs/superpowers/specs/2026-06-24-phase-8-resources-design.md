# Phase 8 — Resources (Shop, Product-Ready Not Launched) — Design

**Status:** Approved
**Scope:** Build `/resources` (index, launches in Coming Soon state) and `/resources/[slug]` (product detail template), the `ProductCard` component, and nav entries — per PHASES.md's "Phase 8 — Shop / Resources (Product-Ready, Not Launched)."

## Context

The PRD's file tree names the route `/shop`, but the design spec's actual hero copy and page title both say "Resources" ("Resources / Practical companions for the questions you are already carrying"). Per the user's choice, this phase uses **"Resources"** throughout (route, page title, nav label) rather than "Shop," since it matches the design spec's literal copy and the site's calm, non-salesy tone.

`lib/content/schema.ts`'s `productFrontmatterSchema` and `lib/content/products.ts`'s `getAllProducts`/`getProductBySlug` were already scaffolded in Phase 2 and need no changes. `content/products/` is currently empty (just `.gitkeep`) — no real product exists yet, so the live state of `/resources` right now is the Coming Soon state.

## Decisions

- **Naming:** "Resources," not "Shop." Route `/resources`, detail route `/resources/[slug]`.
- **Nav:** add `{ label: "Resources", href: "/resources" }` to `primaryNav`, `mobileNav` (after "About"), and `footerReadLinks` (mirroring how Essays/Series/Topics already appear in both the primary nav and the footer's Read column). The Coming Soon state is the intended v1 experience — the PRD wants it reachable to capture early waitlist interest, not hidden.
- **No real product seeded.** Unlike essays/notes, there's no real product draft to seed, and inventing one would be the kind of placeholder content the project's working agreements explicitly avoid (only real content or the prototype's literal diagonal-stripe placeholder blocks). `content/products/` stays empty; the page's Coming Soon branch is what actually renders today.
- **Feature flag requirement is already satisfied.** The PRD asks for "a feature flag or frontmatter field to show/hide products." `productFrontmatterSchema.status` (`"coming-soon" | "available"`) already does this per-product — no new flag needed.
- **Related Essays reuses the existing `productCTA` field.** Essays already have `productCTA: { enabled, productSlug }` (forward link essay → product). A new `getEssaysForProduct(productSlug)` helper does the reverse lookup, so "Related Essays" on the product detail page needs no schema changes.
- **Cover images stay placeholders.** `ProductCard` and the detail hero always render `PlaceholderImage`, regardless of the `coverImage` frontmatter field — matching `SeriesCard`'s existing convention of ignoring its own `coverImage` field until real images exist.
- **No checkout/payment integration.** `externalCheckoutUrl` stays `null` until a provider (Gumroad/Payhip/Lemon Squeezy/Stripe Payment Links, per PRD §10) is chosen — same "config placeholder, no integration" pattern as `whatsappChannelUrl` (7B) and `shareYourStoryFormUrl` (7C).
- **No popup/banner component.** That's explicitly Phase 10 scope.

## `/resources` (index)

File: `app/resources/page.tsx`

1. Header
2. `SectionIntro`: eyebrow "Resources", title "Resources", subtitle "Practical companions for the questions you are already carrying."
3. Branch on `getAllProducts().length`:
   - **Has products:** grid of `ProductCard`s.
   - **Empty (current real state):** Coming Soon panel — `PlaceholderImage` (calm visual, no sales language), a short message that resources are in progress, and the existing `NewsletterForm` component reframed with copy about early access (no new component, no backend — same placeholder pattern as `/newsletter`).

Metadata via `buildPageMetadata`: title "Resources", description matching the hero subtitle, pathname `/resources`.

## `ProductCard`

File: `components/products/product-card.tsx`

- Links to `/resources/${product.slug}`
- `PlaceholderImage` cover (16/10 or similar, matching `SeriesCard`'s pattern)
- `Pill` showing the type label (Ebook/Workbook/Guide/Plan, title-cased from the `type` enum)
- Title, description, price
- CTA: if `status === "available"`, a normal "View" affordance (the whole card is already a link); if `status === "coming-soon"`, a "Coming Soon" `Pill`/badge instead, and the card is still clickable through to the detail page (which itself will show a coming-soon state) — no dead-end cards.

## `/resources/[slug]` (product detail)

File: `app/resources/[slug]/page.tsx`

- `generateStaticParams` from `getAllProducts()` (returns `[]` today — zero pages generated until a real product exists, same as any other dynamic route over an empty collection)
- `generateMetadata` + `notFound()` if the slug doesn't resolve, matching the `/essays/[slug]` pattern
- Sections, top to bottom:
  1. **Product Hero** (two-column): `PlaceholderImage` cover, title, description (short summary), `Pill` type label, price, external checkout button (`href={product.frontmatter.externalCheckoutUrl}`, only rendered/enabled when non-null; otherwise show "Coming Soon" instead of a dead link)
  2. **MDX body** via `MdxContent` — the product's own `## What It Is`, `## Who It Is For`, `## What Is Inside`, optional `## FAQ` sections, authored as plain prose/headings exactly like `/about` and the legal pages. No new schema fields.
  3. **Related Essays**: `RelatedReadingBand` (reused as-is) fed by `getEssaysForProduct(product.slug)`
  4. **Final CTA**: same external checkout button repeated at the bottom

## New helper

`lib/content/products.ts` gets one addition:

```ts
export function getEssaysForProduct(productSlug: string, limit = 3) {
  return getAllEssays()
    .filter(
      (essay) =>
        essay.frontmatter.productCTA.enabled &&
        essay.frontmatter.productCTA.productSlug === productSlug,
    )
    .slice(0, limit);
}
```

## Out of scope

- Seeding any real product
- Checkout/payment provider integration
- Popup/banner component (Phase 10)
- Changes to the essay schema or `productCTA` field
