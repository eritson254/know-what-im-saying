# Phase 7B — Community + Newsletter Pages — Design

**Status:** Approved
**Scope:** Build the `/community` and `/newsletter` destination pages that existing CTAs (homepage band, footer "Connect" links, header "Join" button, mid-article `InlineCta`) already link to but which don't exist yet.

## Context

Phase 7 ("Engagement & Trust Pages") was split into sub-phases 7A–7D. 7A (Start Here, About, Reading List, Contact, 404) shipped in `e52ef19`. This is 7B.

Earlier phases already built the visual CTA components that point at `/community` and `/newsletter`:
- `components/marketing/community-newsletter.tsx` — homepage band with a WhatsApp Channel card and a newsletter signup card
- `config/navigation.ts` `footerConnectLinks` — footer links to `/newsletter` and `/community` (labeled "WhatsApp Channel")
- `components/layout/header.tsx` — header "Join" button links to `/newsletter`
- `components/articles/inline-cta.tsx` — mid-article CTA, default href `/community`

None of those destination routes exist yet. 7B builds them.

## Decisions

- **WhatsApp Channel link:** placeholder. Add `whatsappChannelUrl: "#"` to `config/site.ts`, swappable later without touching page structure.
- **Newsletter backend:** placeholder only. No provider (Beehiiv/Buttondown/ConvertKit/MailerLite) wired in this phase — forms render correctly but don't submit anywhere.
- **WhatsApp Group:** out of scope. PRD recommends launching the Channel first; no Group section/content until one actually exists.
- **Primary nav:** add "Community" between "Start Here" and "About" in both `primaryNav` and `mobileNav`, matching the PRD's documented nav order (`Essays | Series | Topics | Notes | Start Here | Community | About`).
- **Newsletter form:** extract a shared `NewsletterForm` component used by both the homepage band and the new `/newsletter` page, so both stay in sync until a real provider lands.
- **Footer:** no changes. It already links correctly to both new pages. Not adding an inline footer signup form even though PRD §16 mentions one, because the canonical prototype (`design/prototypes/know-what-im-saying.dc.html`) — the project's design source of truth — doesn't include one in the footer.

## `/community` page

File: `app/community/page.tsx`

Sections, top to bottom:

1. **Header** (standard variant, now includes "Community" in nav)
2. **Hero** via `SectionIntro`:
   - eyebrow: "Community"
   - title: "Stay Close to the Writing"
   - subtitle: "New essays, notes, reading recommendations, and occasional conversations beyond the website."
3. **WhatsApp Channel section**:
   - icon badge (MessageCircle, Lucide, matching the homepage band's icon treatment)
   - heading: "WhatsApp Channel"
   - body copy: "New essays, notes, and reading recommendations — quietly, a couple of times a week." (reused verbatim from the homepage band for consistency)
   - **Join the channel** button/link — the one real external link on this page, `href={siteConfig.whatsappChannelUrl}`, `target="_blank" rel="noopener noreferrer"`
4. **Community Rules**: bordered card (style matches `ReaderStoryCta`'s panel — `rounded-[3px] border border-border-strong bg-surface`), simple dotted list, items per PRD §9 Community page content:
   - Be respectful
   - Do not diagnose strangers
   - Do not share other people's private information
   - No harassment
   - No crisis support expectations
   - No spam or promotions
   - The group is not therapy

No WhatsApp Group section.

Metadata via `buildPageMetadata`: title "Community", description summarizing the WhatsApp Channel, pathname `/community`.

## `/newsletter` page

File: `app/newsletter/page.tsx`

Sections, top to bottom:

1. **Header** (standard variant)
2. **Hero** via `SectionIntro`:
   - eyebrow: "Newsletter"
   - title: "A Letter for People Who Still Like to Read"
   - subtitle: "New essays, notes, and ideas worth sitting with."
3. **What you'll receive**: short list —
   - New essay alerts
   - Series updates
   - Reading recommendations
   - Occasional personal notes
   - Early access to future ebooks or guides
4. **Signup form**: `NewsletterForm` component + a small privacy-reassurance line beneath it (e.g. "No spam. Unsubscribe anytime.")

Metadata via `buildPageMetadata`: title "Newsletter", description summarizing what subscribers get, pathname `/newsletter`.

## Shared component: `NewsletterForm`

File: `components/marketing/newsletter-form.tsx`

- Extracted from the inline `<form>` currently in `community-newsletter.tsx` (email input + Subscribe button, same classes/styling).
- No `onSubmit`/`action` — placeholder only, matching the rest of the site's no-backend-yet pattern.
- `community-newsletter.tsx` updated to render `<NewsletterForm />` in place of its inline form. No visual change to the homepage.

## Config changes

- `config/site.ts`: add `whatsappChannelUrl: "#"`.
- `config/navigation.ts`: insert `{ label: "Community", href: "/community" }` into `primaryNav` and `mobileNav` after "Start Here".

## Out of scope

- WhatsApp Group page/section
- Real newsletter provider integration
- Footer inline signup form
- Any changes to `InlineCta` or the homepage `CommunityNewsletter` band beyond the form extraction
