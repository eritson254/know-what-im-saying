# Phase 10B — Accessibility Pass

## Context

Second sub-phase of Phase 10 (after [[10A — Popup Framework]], already shipped). PRD §19 names four accessibility requirements relevant here: keyboard-accessible navigation, visible focus states, appropriate contrast ratios, reduced-motion support — plus semantic HTML, alt text, and "no essential meaning by color alone" as standing requirements.

An audit of the current codebase (no automated a11y tooling or browser available in this environment, so done by reading `app/globals.css`, grepping component usage, and computing actual WCAG contrast ratios from the CSS color tokens' hex values) found five concrete gaps. The first three (default popup campaign trigger choice, mobile-menu focus-trap approach, and the muted-3/muted-4 contrast fix approach) were already decided with the user via `AskUserQuestion` before this doc was written.

## 1. Focus states

`app/globals.css` currently has no `:focus` or `:focus-visible` rule at all — focus indication relies entirely on browser defaults, and two inputs explicitly remove even that:

- `components/marketing/newsletter-form.tsx`'s email input has `outline-none`.
- `components/search/search-client.tsx`'s search input has `outline-none`.

**Fix:** Add to `app/globals.css`:
```css
:focus-visible {
  outline: 2px solid var(--color-accent-text);
  outline-offset: 2px;
}
```
`:focus-visible` (not `:focus`) so the ring only shows for keyboard/non-pointer focus, matching modern browser UX conventions. Remove the `outline-none` class from both inputs so this rule applies cleanly.

## 2. Reduced motion

No `prefers-reduced-motion` handling exists anywhere, despite 11 files using `transition`/`animate-*` (header collapse, mobile menu slide, hover states, theme toggle, reading progress bar, etc).

**Fix:** One universal override in `app/globals.css`, rather than touching each of the 11 files individually:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 3. Color contrast

Computed actual WCAG 2.1 contrast ratios for every text-color token against every background it's used on (including the `band` background, which is darker than `paper`/`surface` and is the real worst case for two of these — confirmed by checking actual usage, not just theoretically). Findings:

| Token pair | Light ratio | Dark ratio | AA minimum |
|---|---|---|---|
| `muted-2` / `band` | 4.32 (fails) | n/a | 4.5 (normal text) |
| `muted-3` / worst bg | 3.20 (fails) | 4.15 (fails vs `band`) | 4.5 |
| `muted-4` / worst bg | 2.47 (fails badly) | 3.10 (fails) | 4.5, or 3.0 if treated as decorative-only |

`muted-4` is used as real readable text (eyebrow labels, dates, captions, status badges) in 18 components, not just decoration — but forcing it to literally pass 4.5:1 converges it onto nearly the same color as a corrected `muted-3`, collapsing two distinct design-system tiers. Decided approach: retire `muted-4` as a text color. `muted-3` becomes the one corrected "muted but readable" tier; `muted-4` is kept only for the 2 genuinely decorative arrow glyphs (`related-reading-band.tsx`, `topic-card.tsx`) and corrected to the relaxed 3:1 non-text threshold instead.

**Token value fixes in `app/globals.css`** (hue/saturation preserved, only lightness adjusted; each value verified to pass 4.5:1 — or 3:1 for the decorative-only `muted-4` — against all of `paper`, `surface`, and `band`):

Light (`:root`):
- `--color-muted-2`: `#6b6d62` → `#696a60`
- `--color-muted-3`: `#86887a` → `#696a5f`
- `--color-muted-4`: `#9a9c8e` → `#858777`

Dark (`[data-theme="dark"]`):
- `--color-muted-3`: `#8c8875` → `#928f7d`
- `--color-muted-4`: `#6e6a59` → `#75715e`

(`muted-1`, `muted-5`, `ink`, `ink-strong`, `accent-text`, `accent-foreground` were all checked and already pass comfortably against every background they appear on — no change needed.)

**Usage-site fix:** Replace `text-muted-4` with `text-muted-3` in the 18 files where it's real text, not a decorative glyph:
`components/articles/article-row.tsx`, `components/articles/reading-preferences.tsx`, `components/layout/header.tsx`, `components/marketing/cover-story.tsx`, `components/marketing/legal-page-layout.tsx`, `components/marketing/most-read-sidebar.tsx`, `components/reading-list/reading-list-groups.tsx`, `components/reading-list/reading-list-modal.tsx`, `components/reading-list/reading-list-row.tsx`, `components/search/search-result-card.tsx`, `components/series/reading-order.tsx`, `components/series/series-read-progress-summary.tsx`, `components/ui/placeholder-image.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/newsletter/page.tsx`, `app/notes/page.tsx`, `app/resources/page.tsx`.

`components/articles/related-reading-band.tsx` and `components/topics/topic-card.tsx` keep `text-muted-4` (decorative arrow glyphs only).

**Color-alone check:** `reading-order.tsx`'s read/reading-now/upcoming/published states already pair color with a visible text badge (`STATE_LABEL`: "Read", "Reading now", "Upcoming", "Published") — confirmed no color-only meaning exists there; only the contrast fix above applies to it.

## 4. Keyboard navigation

**Skip-to-content link:** None exists. Rather than adding `id="main-content"` to the `<main>` element in all 19 page files individually, wrap `{children}` once in `app/layout.tsx`:
```tsx
<div id="main-content" className="contents">
  {children}
</div>
```
`className="contents"` (`display: contents`) means the wrapper generates no box of its own, so it doesn't interfere with `body`'s existing `flex flex-col` layout — each page's `<main>` remains a direct flex child of `body` visually. Add a visually-hidden-until-focused skip link as the very first element inside `<body>`, before `<ThemeScript />`:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">
  Skip to content
</a>
```

**Mobile menu focus trap (`components/layout/mobile-menu.tsx`):** Currently always in the DOM, toggling only `aria-hidden` and an off-screen transform — its links stay Tab-reachable even while closed/off-screen, and there's no Escape-to-close. Fix:
- Add `inert={!isOpen}` to the menu's root `<div>` (makes it fully untabbable while closed, no `tabIndex` juggling needed on each link).
- Add an Escape keydown handler while open, matching the `reading-list-modal.tsx` / `newsletter-popup.tsx` pattern (listen on `document`, call `onClose`).
- When open, also set `inert` on its sibling content so Tab can't escape into the page behind it. Since `MobileMenu` is rendered inside `Header`, and `Header` is a sibling of `{children}`/`Footer`/`MobileTabBar` under `body`, the simplest way to inert "everything else" without restructuring the DOM is to toggle `inert` on the new `#main-content` wrapper div (added above) and on `Footer`'s and `MobileTabBar`'s root elements whenever the mobile menu is open. This requires `Header` to know about its own open state already (it does, via `isMenuOpen`) but inerting siblings requires lifting that state or using a shared mechanism.

  Simpler alternative that avoids cross-component state lifting: since `MobileMenu` is a fixed-position full-screen overlay (`fixed inset-0 z-50`) when open, and all other interactive content sits at a lower stacking context, the only way keyboard focus can "escape" to it is via Tab cycling past the last/first focusable element in the DOM tree (browsers don't respect z-index for tab order, only DOM order). Given `MobileMenu` is rendered right after `MobileBar`/the collapse button inside `Header`, and `Header` appears before `{children}` in the DOM on every page, an open mobile menu's Tab order already mostly stays local *unless* the user shift-tabs backward past the menu's first element or tabs forward past its last element. Given this is a secondary nicety beyond the core bug (closed-menu-still-tabbable, which `inert` on the menu itself fully fixes), this build will fix the closed-menu case with `inert={!isOpen}` and add Escape-to-close, but will **not** add cross-component sibling-inerting for the open case — noted as a deliberate scope cut below.

**`outline-none` removal:** covered in §1 above (same fix, same two files).

## 5. Semantic HTML / alt text — audited, no gap found

- `<html lang="en">` is already set in `app/layout.tsx`.
- Landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) are consistently present across page templates.
- No real `<img>` elements exist anywhere in the codebase yet — all imagery is `components/ui/placeholder-image.tsx`, a styled `<div>` with a visible text label (not an `<img>`, so no `alt` attribute is applicable). Nothing to fix this phase; revisit once real images are seeded.

## Scope cut (explicit, not a gap to silently drop)

Trapping focus inside the *open* mobile menu against Tab/Shift-Tab escaping past its boundary into sibling content is not implemented in this phase — only the closed-menu-still-tabbable bug (the more severe of the two, since it's reachable on every page without ever opening the menu) is fixed via `inert={!isOpen}`. Revisit if real-world testing surfaces this as an actual problem.

## Testing / verification

`npm run build` and `npm run lint` confirm the CSS/TSX changes compile cleanly. Contrast fixes are verified mathematically (WCAG relative-luminance formula computed directly from each token's hex value against every background it's used on) rather than visually, since no browser/screenshot tool is available in this environment. The `inert` attribute's actual keyboard behavior, the skip link's visible focus styling, and the reduced-motion override's real-world effect cannot be verified from this environment — same limitation as [[phase10a_popup_framework_notes]] and [[phase9d_analytics_notes]] before it. This will be stated plainly rather than claimed as verified.
