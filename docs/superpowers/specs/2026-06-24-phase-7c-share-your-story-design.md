# Phase 7C — Share Your Story Page — Design

**Status:** Approved
**Scope:** Build the `/share-your-story` page that existing CTAs (`ReaderStoryCta` on the homepage, `StoryPrompt` on article pages, footer "Connect" links, the Contact page) already link to but which doesn't exist yet.

## Context

Phase 7 ("Engagement & Trust Pages") is split into sub-phases 7A–7D (see [[phase7a_engagement_pages_notes]] / [[phase7b_community_newsletter_notes]]). 7A and 7B are shipped. This is 7C.

As with 7B, the CTA side of this feature already exists from earlier phases:
- `components/marketing/reader-story-cta.tsx` — homepage CTA band, links to `/share-your-story`
- `components/articles/story-prompt.tsx` — article-page CTA, links to `/share-your-story`
- `config/navigation.ts` `footerConnectLinks` — footer link to `/share-your-story`
- `app/contact/page.tsx` — references `/share-your-story` inline

None of those destination routes resolve yet. 7C builds the page they point at.

## Decisions

- **Form provider:** Google Forms (free). The page embeds an external Google Form via `<iframe>` rather than building native HTML fields — unlike the newsletter form (7B), which is a native placeholder since no provider was chosen there.
- **Form readiness:** placeholder only for now. Add `shareYourStoryFormUrl: "#"` to `config/site.ts`, parallel to `whatsappChannelUrl` from 7B. The user will create the actual Google Form later and swap in the real embed URL — no code changes needed at that point.
- **Placeholder rendering:** while `shareYourStoryFormUrl === "#"`, render a styled "Form coming soon" panel instead of an iframe pointed at a dead link. Once the real URL is set, the iframe renders the live Google Form.
- **Submission confirmation:** no custom client-side confirmation state is needed. Google Forms shows its own native "your response has been recorded" confirmation inside the iframe once the real form is embedded, which satisfies the PRD's "receives a clear submission confirmation" requirement without any app code.
- **Topic categories:** use the PRD's own submission-category list (not the site's 9-topic content taxonomy from `lib/content/topics.ts`), since this is "what is your story about" for a stranger's personal account, not a content-browsing taxonomy. This list lives in the Google Form itself (see field list below), not in app code.
- **Footer CTA:** reuse the existing `CommunityNewsletter` component unchanged — it already renders the WhatsApp Channel + Newsletter band required by the PRD's "Footer CTA: Newsletter / WhatsApp Channel" spec.

## Page structure

File: `app/share-your-story/page.tsx`

1. **Header** (standard variant)
2. **Hero** via `SectionIntro`:
   - eyebrow: "Share Your Story"
   - title: "Share Your Story"
   - subtitle: "Have a story you cannot stop thinking about? A relationship, betrayal, friendship, family dynamic, loss, or moment that changed how you see yourself may inspire a future essay." (PRD §9.13 copy, verbatim)
3. **How It Works**: 3-column row, each item a mono step number ("01"/"02"/"03") + short label:
   - Share what happened
   - Your details are protected
   - Your story may inspire a future essay
4. **Important Information**: bordered card (style matches `ReaderStoryCta`/`/community` Community Rules panel — `rounded-[3px] border border-border-strong bg-surface`), dotted list:
   - Stories may be edited and anonymized
   - Submission does not guarantee publication
   - Do not include unnecessary identifying details
   - This is not a crisis, legal, medical, or therapy service. If you are in immediate danger, please contact your local emergency or crisis services. (reusing the Contact page's exact safety-note wording for consistency)
   - Contact information is optional
5. **Embedded Submission Form**: card containing either:
   - an `<iframe src={siteConfig.shareYourStoryFormUrl} ...>` when the URL is set to a real value, or
   - a placeholder panel ("The submission form is being set up — check back soon.") when it's still `"#"`
6. **Footer CTA**: `<CommunityNewsletter />` rendered as-is.

Metadata via `buildPageMetadata`: title "Share Your Story", description summarizing the page purpose, pathname `/share-your-story`.

## Google Form field list (for the user to build in Google Forms — not app code)

Per PRD §8 "Suggested fields":
- Name or pseudonym — optional, short text
- Email — optional, short text
- May we contact you? — required, yes/no
- Topic — required, dropdown: Love and dating, Unrequited love, Betrayal, Friendship, Family, Work and ambition, Money, Mental and emotional patterns, Technology and modern life, Other
- Your story or question — required, long text
- Is this story about you? — optional, yes/no
- Can this be adapted anonymously for an essay? — required, yes/no
- Consent confirmation — required, checkbox

## Out of scope

- Actually creating the Google Form (requires the user's Google account)
- Any backend/storage for submissions
- Changes to `ReaderStoryCta`, `StoryPrompt`, footer links, or the Contact page — already correctly pointing at `/share-your-story`
