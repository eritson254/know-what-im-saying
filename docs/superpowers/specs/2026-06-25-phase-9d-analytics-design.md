# Phase 9D — Vercel Analytics & Speed Insights — Design

**Status:** Approved
**Scope:** Wire Vercel Analytics + Speed Insights, plus a small, deliberately bounded set of custom events matching the PRD's "key metrics" list. Last sub-phase of Phase 9 (see [[phase9a_sitemap_robots_feed_notes]], [[phase9b_seo_cards_structured_data_notes]], [[phase9c_search_notes]]).

## Context

`docs/prd.md` §17 ("Analytics and Growth Tracking") recommends Vercel Analytics as the primary tool, with Plausible/Umami as optional, and lists specific key metrics to track: unique/returning visitors, top articles, newsletter signups, WhatsApp click-throughs, reader story submissions, product CTA clicks, referrer source. Unique/returning visitors, top articles, and referrer source are covered automatically by Vercel Analytics' pageview tracking — no custom code needed for those.

## Decisions

- **Vercel Analytics + Speed Insights only.** Plausible/Umami need their own hosted account, which doesn't exist — fully deferred, not even a config placeholder (nothing to point at yet).
- **No cookie-consent banner.** Vercel Analytics is cookieless. This also means the conditional cookie-notice requirement noted on the Privacy page (7D) doesn't trigger yet.
- **Manual step outside this session:** Web Analytics / Speed Insights must be enabled in the Vercel project dashboard (account-gated, same situation as the Google Form setup in 7C) before any data actually flows. The code wiring works regardless; data collection starts once that toggle is flipped after the next deploy.
- **Exactly 3 custom events**, deliberately bounded to the PRD's literal list rather than instrumenting every CTA on the site:
  1. `whatsapp_join_clicked` — only on the real external WhatsApp link (`/community`'s "Join the channel" button). Internal navigation links that merely point at `/community` (homepage band, footer, mid-article CTA) are not WhatsApp clicks and stay untracked.
  2. `newsletter_submit_clicked` — on `NewsletterForm`'s submit, with a `location` property distinguishing its four render contexts. Named as an interaction event, not "subscribed" — there's no backend yet to confirm success.
  3. `product_cta_clicked` — on the Resources product detail page's checkout button, with `{ product: slug }`, only when a real `externalCheckoutUrl` exists.
- **Reader story submissions are not tracked.** Submission happens inside an external Google Form iframe with no postMessage/webhook integration — there's no code-reachable moment to detect a real submission. Automatic pageview tracking on `/share-your-story` is the closest available signal and requires no custom code.
- **Bundled fix:** while adding `NewsletterForm`'s `onSubmit` handler anyway, also call `event.preventDefault()` — currently submitting causes a full page reload (a GET to the current URL with form data appended) since the form has no real `action`. Fixing this is a one-line addition to a handler being added regardless.

## Package wiring

- `npm install @vercel/analytics @vercel/speed-insights`
- `app/layout.tsx`: render `<Analytics />` (from `@vercel/analytics/next`) and `<SpeedInsights />` (from `@vercel/speed-insights/next`) alongside the existing `<Footer />`/`<MobileTabBar />`.

## Custom event implementation

- `components/marketing/newsletter-form.tsx`: add `location: string` prop; `onSubmit` handler calls `track("newsletter_submit_clicked", { location })` then `event.preventDefault()`. Becomes (or confirms it already is) a client component.
- `components/marketing/community-newsletter.tsx`: gains a `location?: string` prop (default `"homepage"`), passed through to its `NewsletterForm`. The Share Your Story page's render of `CommunityNewsletter` passes `location="share_your_story"`.
- `app/newsletter/page.tsx`: passes `location="newsletter_page"` to `NewsletterForm`.
- `app/resources/page.tsx` (coming-soon branch): passes `location="resources"` to `NewsletterForm`.
- `app/community/page.tsx`: the "Join the channel" `<a>` gets an `onClick` calling `track("whatsapp_join_clicked")`. This page becomes (or its relevant button extracts into) a client component for the handler.
- `app/resources/[slug]/page.tsx`: `CheckoutButton` extracted into its own small client component; when `externalCheckoutUrl` is non-null, its `onClick` calls `track("product_cta_clicked", { product: slug })`.

## Out of scope

- Plausible/Umami
- Cookie consent UI
- Tracking actual conversion/success for any of the three events (interaction tracking only)
- Instrumenting any CTA beyond the three listed above
