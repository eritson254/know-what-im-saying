# Know What I'm Saying? — Build Phases

**Source of truth for requirements:** `docs/prd.md`, `docs/foundation.md`, `docs/design-prd.md`
**Source of truth for visual design:** `design/prototypes/know-what-im-saying.dc.html` (canonical — matches `design/screenshots/*.png` exactly). `know-what-im-saying-v1-reference.dc.html` is a superseded earlier draft, kept only for reference; do not build from it.

## Working agreements

- One phase at a time. Do not start phase N+1 until phase N is committed and pushed.
- Each phase ends with: working build (`npm run build` passes), commit, push to `main`, then a memory update capturing decisions/mistakes from that phase.
- Git workflow: commit directly to `main` (no feature branches/PRs for this solo project).
- Package manager: npm.
- Any time a bug or wrong assumption is found and fixed, record the lesson in memory before moving on, so it isn't repeated.
- Placeholder imagery: use the prototype's diagonal-stripe placeholder blocks until real images exist — do not invent stock imagery.

## Design tokens extracted from the canonical prototype (verify/refine in Phase 1)

- Fonts: `Newsreader` (serif, display/headlines), `Hanken Grotesk` (sans, body/UI), `Space Mono` (mono, metadata/labels/eyebrows)
- Background (paper): `#F4F1E8`
- Body text: `#222420` / headline text `#1f211c`
- Muted text scale: `#54564b`, `#6B6D62`, `#86887a`, `#9a9c8e`
- Accent (forest green): `#2C4636` (hover `#1f3527`)
- Sage (secondary): `#8FA189`
- Borders/rules: `#E2DECF`, `#c7c2b0`, `#d6d1c0`
- Pill/chip backgrounds: `#DCE2D0`, `#E3E7D8`
- Card surface: `#FBF9F2`
- Section band background: `#E8EADD`
- Topic icon accent pairs (icon stroke / bg): rose `#B07A72`/`#EFE4E2`, gold `#A8894F`/`#EEE8DA`, slate `#7E8CA3`/`#E5E8EE`, teal `#6F9A95`/`#E0EAE6`, sage `#8FA189`/`#E5EADD`, mauve `#9A8299`/`#ECE5EB`, terracotta `#BC8466`/`#F0E6DE`, deep green `#4A6A52`/`#E2E8DC`
- Icon style: Lucide-style outline icons, `stroke-width 1.4–1.6`, round caps/joins, no fill
- Dark mode: not present in the prototype — will need to be designed in Phase 6 consistent with this palette

---

## Phase 0 — Project Scaffold

- Initialize Next.js (App Router) + TypeScript + Tailwind CSS in project root (alongside existing `docs/`, `design/`, `PHASES.md`)
- Configure ESLint + Prettier
- Set up base directory structure per `docs/prd.md` §20 (`app/`, `components/`, `config/`, `lib/`, `content/`, `public/`)
- Verify local dev server runs and connects to Vercel for deploys
- Confirm `.gitignore` covers Next.js/node artifacts

## Phase 1 — Design System & Layout Shell

- Translate prototype tokens into Tailwind theme config (colors, fonts, spacing, radii)
- Global typography styles (serif headlines, sans body, mono metadata)
- Icon set setup (lucide-react) matching prototype icon style
- Build Header (desktop sticky + mobile menu drawer), masthead variant for homepage (utility bar, Issue №, feather mark, ruled nav)
- Build Footer (brand statement, nav links, newsletter signup slot, WhatsApp link, legal links, copyright)
- Build shared primitives: button, pill/chip, link-underline, section divider
- No real pages/content yet — verify shell in a throwaway test route, then remove it

## Phase 2 — Content Engine

- Define MDX frontmatter schema/types (essay, note, series, product) per `docs/prd.md` §14
- Build `content/` directory structure (essays, notes, series, products, pages)
- Build `lib/content` loaders (parse frontmatter, list/filter/sort, slug resolution)
- Reading-time calculation utility
- Topic and series taxonomy resolution (series → installments ordering, topic → article lookup)
- `lib/seo` helpers (metadata, canonical URLs) scaffolded but not wired to pages yet

## Phase 3 — Homepage

- Build full homepage matching the canonical prototype: masthead hero, featured/cover story, latest writing + most-read sidebar, featured series band, Start Here list, reader-story CTA, community/newsletter CTA, footer
- Wire to real content loaders from Phase 2 (with whatever placeholder content exists)

## Phase 4 — Article Page Template + Notes

- Article header (topic label, title, deck, date, reading time, share actions)
- Series navigation bar (only when part of a series)
- Article body styles (pull quotes, headings, footnotes, callouts)
- Reading progress indicator, table of contents for long essays
- Mid-article CTA slot, closing reflection treatment, author note
- Related reading module
- Notes archive + note page (lighter template)

## Phase 5 — Series & Topics & Essays Archives

- Essays archive page (filter chips, featured + grid/list)
- Series archive page (featured series, all series grid with status states)
- Individual series page (hero, numbered reading order, theme explainer, related series)
- Topics archive (topic cards w/ icon system) + topic detail pages

## Phase 6 — Reader Preferences & Local Progress

- Theme system: Light/Dark/System, `kwis-theme` localStorage key, no flash-of-wrong-theme
- Design dark mode palette consistent with the editorial tone (not in prototype — needs explicit design pass)
- Focus Reading Mode: text-node processing, exclusions, persistence (`kwis-focus-reading`)
- Series reading progress: scroll/time-based "read" marking, `kwis-series-progress`/`kwis-last-read`, series page state rendering (unread/reading now/read/upcoming)

## Phase 7 — Engagement & Trust Pages

- Start Here, About, Community, Reading List
- Share Your Story (privacy/consent copy, external form embed placeholder — provider TBD)
- Newsletter page (provider TBD) + footer/inline signup components
- Contact page
- Legal pages: Privacy, Terms, Editorial Policy, Disclosures (content drafting, not just templates)
- Custom 404

## Phase 8 — Shop / Resources (Product-Ready, Not Launched)

- Shop/Resources page in "Coming Soon" state
- Product card component + product detail page template
- Feature flag/frontmatter control for show/hide
- No real checkout integration yet — external link placeholders only

## Phase 9 — Search, SEO, Feeds, Analytics

- Pagefind static search integration + search page
- XML sitemap, robots.txt, RSS feed
- Open Graph + Twitter card generation, Article structured data, breadcrumb structured data
- Vercel Analytics (+ optional Plausible/Umami) wiring
- Social share preview QA

## Phase 10 — Popups, Polish, Launch QA

- Configurable popup/modal framework (delay/scroll/exit-intent triggers, dismissal persistence, one-per-visit rule)
- Full accessibility pass (keyboard nav, focus states, contrast, reduced motion)
- Performance pass (Core Web Vitals, image optimization, layout shift)
- Acceptance criteria walkthrough against `docs/prd.md` §25 before considering launch-ready

---

## Handoff notes

At the end of each phase, before moving on:
1. `npm run build` passes cleanly.
2. Commit + push to `main`.
3. Update memory with: what shipped, any deviations from this plan and why, and any mistake + fix worth remembering.
4. Re-read this file's "Working agreements" before starting the next phase.
