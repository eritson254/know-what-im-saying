# Text-Oriented Design: Remove Placeholder Images

## Context

The site has never had real images. Every image slot across the design is filled by `PlaceholderImage`, a diagonal-stripe box with a label ("cover image", "essay image", "series cover", etc.), inherited directly from the canonical prototype (`design/prototypes/know-what-im-saying.dc.html`), which designed these as intentional future-image slots.

The user wants to stop carrying placeholder art and commit to a text-oriented design instead, while focusing on writing rather than sourcing images.

Confirmed: no component reads `heroImage`/`coverImage` values to render a real `<img>` anywhere — these frontmatter fields have been dead since they were added. Removing the placeholder boxes is a pure layout simplification with no rendering-path risk.

## Scope

Applies sitewide: editorial content (essays, series, homepage) and commercial content (resources/products), plus the author avatar. Nothing is left half-migrated.

## Changes

### Delete
- `components/ui/placeholder-image.tsx`

### Collapse two-column layouts to single column

These sections currently split ~50/50 with an image on one side. The image is removed and the text block expands into a `max-w-[720px]` left-aligned column (matching the article-body width used elsewhere), rather than stretching to the full former grid width — preserves readable line length instead of oversized headlines.

- `components/marketing/cover-story.tsx` (homepage hero) — also drops the italic caption "A quiet, cinematic image sets the tone."
- `components/marketing/featured-series-band.tsx` (homepage)
- `components/series/series-hero.tsx` (series detail page)
- `app/series/page.tsx` featured-series block
- `app/resources/[slug]/page.tsx` product detail

### Strip image, no replacement accent

Bare text stack: pill/label → title → description → meta. No border, rule, or topic-color accent added — relies on existing grid/row gap spacing for separation between items.

- `components/articles/article-row.tsx` (essay list rows)
- `components/series/series-card.tsx`
- `components/series/related-series-grid.tsx`
- `components/products/product-card.tsx`
- `app/resources/page.tsx` empty state ("resources coming soon" block)

### Author byline

- `components/articles/author-note.tsx` — remove the circular diagonal-stripe avatar div and its flex wrapper; render the byline paragraph directly.

### CSS cleanup

- `app/globals.css` — remove `--color-placeholder-a`, `--color-placeholder-b`, `--color-placeholder-band-a`, `--color-placeholder-band-b` from the light block, the `@theme` mapping block, and the dark-mode override block (3 locations).

### Schema cleanup

- `lib/content/schema.ts`:
  - `essayFrontmatterSchema`: remove `heroImage`, `heroAlt`
  - `seriesFrontmatterSchema`: remove `coverImage`, `coverAlt`
  - `productFrontmatterSchema`: remove `coverImage`

### Content frontmatter cleanup

Strip the now-invalid keys from existing content files:
- `content/essays/*.mdx` (all 4 essays) — remove `heroImage`/`heroAlt` lines
- `content/series/unrequited-love.mdx` — remove `coverImage`/`coverAlt` lines
- No product `.mdx` files exist yet, so nothing to change there

### Explicitly out of scope

- `design/prototypes/know-what-im-saying.dc.html` stays untouched — remains a historical reference showing the original image-slot design, not updated to match.

## Verification

- `npm run build` succeeds (confirms schema still validates all content and no component references the deleted `PlaceholderImage` import)
- Manual look at homepage, an essay page, series index/detail, and resources index/detail in dev to confirm layouts read cleanly as single-column/bare-text
