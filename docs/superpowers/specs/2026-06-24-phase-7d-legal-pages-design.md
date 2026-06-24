# Phase 7D — Legal Pages — Design

**Status:** Approved
**Scope:** Build the four legal pages PHASES.md scopes for 7D — Privacy, Terms, Editorial Policy, Disclosures — that the footer's Legal column already links to (for the first three) but which don't exist yet.

## Context

Phase 7 ("Engagement & Trust Pages") is split into sub-phases 7A–7D (see [[phase7a_engagement_pages_notes]], [[phase7b_community_newsletter_notes]], [[phase7c_share_your_story_notes]]). 7A, 7B, 7C are shipped. This is the last sub-phase.

Per [[phase7a_engagement_pages_notes]]: "Future simple prose pages (e.g. legal pages in 7D) should follow this same pattern: `content/pages/<slug>.mdx` + a thin `app/<slug>/page.tsx` wrapper, rather than hardcoding prose directly in JSX." This phase follows that plan.

## Decisions

- **Scope: 4 pages only.** Privacy, Terms, Editorial Policy, Disclosures — matching PHASES.md exactly. No standalone Reader Story Submission Policy (already covered by the Important Information section on `/share-your-story`, built in 7C) and no Cookie Policy (no cookies/analytics exist on the site yet — add one in Phase 9 once analytics is actually wired up).
- **Jurisdiction:** the Terms of Use governing-law clause stays generic ("the laws applicable to the publication's operation") rather than naming a specific country/state, since there's no registered business entity yet.
- **Nav:** add `{ label: "Disclosures", href: "/disclosures" }` to `footerLegalLinks` in `config/navigation.ts`. Privacy, Terms, and Editorial Policy already have footer links from earlier phases (dangling, same pattern as 7B/7C) — Disclosures has none yet, so this is a genuinely new link, not just a fix for an existing dangling one.
- **Content honesty:** policies describe the site's actual current state (no live analytics, newsletter/forms are placeholders per [[phase7b_community_newsletter_notes]] and [[phase7c_share_your_story_notes]]) plus forward-looking language for when those features go live, rather than describing hypothetical infrastructure as if already active.
- **Authorship voice:** stays consistent with the About page's existing pseudonymous framing ("the editor" operates the site as an individual, not a named company).

## Shared layout

New `components/marketing/legal-page-layout.tsx`:
- `Header` (standard variant)
- `SectionIntro` with eyebrow "Legal", `title` and `subtitle` (subtitle = the page's frontmatter `description`)
- A "Last updated" line, rendered from the page's frontmatter `updated` field via the existing `lib/utils/format-date.ts` formatter
- `MdxContent` rendering the page body (already constrained to the 720px article-width column, matching the PRD's "standard article-width content column" spec for legal pages)

Props: `{ slug: string; eyebrow?: string }` — fetches nothing itself; each route's `page.tsx` calls `getPageBySlug(slug)`, handles the `notFound()` case (matching the existing `/about` pattern), and passes the resolved page into the layout.

## Routes

Four thin wrappers, each following the `/about` pattern (`getPageBySlug` + `notFound()` if missing + `buildPageMetadata`):
- `app/privacy/page.tsx` → `content/pages/privacy.mdx`
- `app/terms/page.tsx` → `content/pages/terms.mdx`
- `app/editorial-policy/page.tsx` → `content/pages/editorial-policy.mdx`
- `app/disclosures/page.tsx` → `content/pages/disclosures.mdx`

## Content outlines

All four MDX files get `updated: "2026-06-24"` in frontmatter.

**`content/pages/privacy.mdx`** — what's collected today (essentially nothing automated — no live analytics, no accounts); what happens once newsletter/forms go live (email used only to send updates, nothing sold); Google's own privacy policy governs Share Your Story submissions; WhatsApp/Meta's own privacy policy governs the Channel; standard hosting-provider server logs; this policy will be updated as features ship (e.g. Phase 9 analytics); contact email for privacy questions.

**`content/pages/terms.mdx`** — who operates the site (an individual, "the editor"); permitted use; content ownership / no reproduction without permission; not-medical/legal/financial/therapy-advice disclaimer with the crisis-services line (reusing the wording already established on Contact/Share Your Story/About); license granted over submitted stories (right to edit, anonymize, and publish); no warranty / as-is; external links disclaimer (WhatsApp, Google Forms, social platforms not controlled by the publication); generic governing-law line; how terms changes are communicated.

**`content/pages/editorial-policy.mdx`** — independence statement; how reader submissions get adapted (edited/anonymized, no guarantee of publication, per the Share Your Story page's existing Important Information); what pseudonymous authorship means here; essays are personal reflection, not journalism, clinical advice, or diagnosis; corrections process via the contact email.

**`content/pages/disclosures.mdx`** — no current affiliate or sponsorship relationships; future Shop/products (Phase 8) will be clearly labeled when introduced, and any affiliate links disclosed at point of use; no guarantees of healing, transformation, or outcomes (per PRD §22 product-ethics requirements); this page will be updated as monetization evolves.

## Out of scope

- Reader Story Submission Policy and Cookie Policy (deferred, see Decisions)
- Real legal review — this is plain-language boilerplate appropriate for a solo personal publication with no live payments/accounts/analytics yet, not a substitute for an actual lawyer if the project later takes on more liability exposure (paid products, EU/CCPA-grade data handling)
- Any changes to Contact, About, or Share Your Story content
