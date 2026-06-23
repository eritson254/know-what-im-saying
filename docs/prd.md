# Product Requirements Document (PRD)
## Know What I’m Saying?

**Document status:** Draft v1.0  
**Product type:** Static editorial publication and story-led essay platform  
**Primary deployment:** Vercel  
**Content format:** MDX  
**Initial architecture:** Static-first, no custom backend  
**Working brand:** *Know What I’m Saying?*

---

## 1. Product Summary

*Know What I’m Saying?* is an independent digital publication for thoughtful, story-led writing about life, psychology, love, relationships, technology, money, work, ambition, culture, and identity.

The product exists for readers who want more than fast takes and shallow advice. It will use long-form essays, recurring story-led series, reader-inspired writing, and shorter notes to help people understand difficult experiences with more language, perspective, and emotional clarity.

The website will be static and content-led. Articles will be written in MDX, version-controlled in GitHub, and deployed through Vercel.

The initial product should be lightweight, polished, fast, search-friendly, and built to grow without requiring a full backend. Where interaction or commerce is needed, the site should rely on trusted external services until a custom backend becomes genuinely necessary.

---

## 2. Product Vision

Build a calm, intelligent, modern publication that makes people want to read again.

The experience should feel editorial rather than “bloggy”: more like a contemporary magazine or personal publication than an influencer site, a generic self-help page, or a content farm.

The site should make long-form reading feel rewarding. It should also make it easy for a reader to:

- Discover a strong essay
- Follow a story-led series
- Understand the publication’s point of view
- Subscribe or join the community
- Send an anonymous story
- Find related essays
- Purchase future digital products without the website becoming intrusive or sales-driven

### Brand promise

> Thoughtful writing for people trying to make sense of modern life.

### Reader promise

> You will leave with more language, perspective, or clarity than you arrived with.

---

## 3. Goals

### Primary goals

1. Publish high-quality MDX essays without needing a CMS or custom backend.
2. Establish *Know What I’m Saying?* as a recognizable editorial brand.
3. Make the reading experience comfortable, premium, and distraction-free.
4. Make story-led series a signature product feature.
5. Encourage readers to return through related writing, newsletter/community links, and series navigation.
6. Allow readers to submit stories safely through an external form.
7. Build foundations for future monetization through digital products, ebooks, guides, and psychology-related plans.
8. Make it easy to distribute content through social platforms, WhatsApp, search engines, and email.

### Secondary goals

1. Build a searchable archive of writing.
2. Grow an email audience and WhatsApp community.
3. Support article sharing with polished social cards.
4. Provide lightweight analytics for editorial decisions.
5. Create product pages that can be activated when digital products are ready.

---

## 4. Non-Goals for Version 1

The initial website will **not** require:

- User accounts
- Reader profiles
- Native comments
- A custom admin dashboard
- A custom database
- A custom payment backend
- A full members-only system
- A full community forum
- A built-in reader messaging system
- Native story-submission storage
- Complex recommendation algorithms
- Multi-author editorial workflows

These features can be added later if the publication grows enough to justify the maintenance, privacy, and operational load.

---

## 5. Target Audience

### Primary audience

Thoughtful internet users who enjoy reading and want a deeper way to understand themselves and the modern world.

They are likely interested in one or more of:

- Psychology and emotional patterns
- Love, dating, friendship, family, and heartbreak
- Culture and technology
- Ambition, work, money, and adulthood
- Personal growth without empty motivational language
- Narrative writing and reflective essays
- Storytelling that gives emotional experiences more language

### Audience mindset

The ideal reader may arrive through TikTok, Reddit, Instagram, Pinterest, WhatsApp, search, or a shared link. They may not initially know the brand, but they should quickly understand that the publication offers depth, clarity, and a distinctive voice.

They want writing that is:
- Smart but not pretentious
- Personal but not self-indulgent
- Useful without being reductive
- Emotionally honest without being melodramatic
- Modern without chasing every trend

---

## 6. Content Model

### 6.1 Primary content types

#### Essays
Standalone long-form pieces with a central argument or reflection.

Typical length: 1,200–3,500 words.

Examples:
- Why Everyone Feels Behind
- The Emotional Cost of Always Trying to Improve Your Life
- We Are Not Addicted to Our Phones. We Are Addicted to Escape

#### Series
Collections of linked essays built around one major theme.

A series may use:
- Essay One, Essay Two, Essay Three
- Episode One, Episode Two, Episode Three
- Part One, Part Two, Part Three

Recommended default:
- Use **Essay One** for reflective and analytical installments.
- Use **Episode One** when the series is strongly narrative or fictionalized.
- Use **Part One** when one argument or story continues directly.

Examples:
- *Unrequited Love: The Things We Do When We Hope Someone Will Choose Us*
- *The Anatomy of Betrayal*
- *Dating in the Age of Almost*
- *The Friend Who Became a Stranger*

#### Stories
Narrative-led writing that can be personal, fictional, composite, anonymous, or reader-inspired.

Stories should always be clearly labeled where appropriate:
- Personal essay
- Fiction
- Composite story
- Based on a reader submission
- Fictionalized from multiple experiences

#### Reader Letters
Adapted anonymous reader stories, questions, or situations submitted through the site.

Reader Letters should never expose private identities or be treated as entertainment. They are source material for thoughtful essays, not public confession content.

#### Notes
Shorter writing for observations, fragments, short cultural analysis, unfinished ideas, reading reflections, or brief personal essays.

Typical length: 250–900 words.

#### Reading List
Curated books, essays, articles, podcasts, films, or other work that supports the publication’s ideas.

---

## 7. Signature Feature: Story-Led Essay Series

Story-led series are a defining differentiator.

Each installment should combine narrative, interpretation, psychology, practical reflection, and emotional care. The site must make series easy to discover and follow.

### Story-led structure

Each series essay may include these sections:

1. The Story
2. What This Is Really About
3. The Psychology
4. What It Feels Like From the Inside
5. If You Are In It Right Now
6. What Healing May Look Like
7. What to Notice Earlier Next Time
8. Closing Reflection

Not every essay needs every heading. The structure is an editorial guide, not a rigid template.

### Series page requirements

Every series must have its own landing page with:

- Series title
- Series description
- Cover image or visual treatment
- Theme tags
- Number of essays
- Reading order
- Progress state, such as “3 of 6 essays published”
- All released installments
- Optional upcoming installment placeholder
- Related series
- Newsletter/community CTA
- Optional reader-story CTA for relevant themes

### Individual series essay requirements

Each series installment should show:

- Series name
- Installment number
- Essay title
- Series navigation: previous / next
- “Start from Essay One” link
- Progress indicator, such as “Essay 3 of 6”
- Related essays and reader-story CTA at the bottom

---

## 8. Reader Story Submission

### Product purpose

Readers should be able to submit stories, questions, experiences, or situations that may inspire future essays.

The submission feature should feel safe, clear, and carefully moderated.

### Version 1 approach

Use an external form service embedded on the site or opened in a dedicated page.

Recommended options:
- Tally
- Fillout
- Typeform
- Google Forms, only as a temporary low-cost option

Preferred option: **Tally**, because it can be branded, embedded, supports conditional fields, and works well with static sites.

### Submission page requirements

The `/share-your-story` page should include:

- A short invitation
- A clear privacy and editorial-use statement
- An option to remain anonymous
- An option to provide a first name or pseudonym
- An optional email field for follow-up
- A story field
- Topic/category selection
- Consent checkbox
- Guidance not to include unnecessary identifying information
- Clear statement that submission does not guarantee publication or a response
- Clear statement that the site is not a crisis, legal, medical, or therapy service

### Suggested fields

- Name or pseudonym — optional
- Email — optional
- May we contact you? — yes/no
- Topic — required
- Your story or question — required
- Is this story about you? — optional
- Can this be adapted anonymously for an essay? — required yes/no
- Consent confirmation — required

### Submission categories

- Love and dating
- Unrequited love
- Betrayal
- Friendship
- Family
- Work and ambition
- Money
- Mental and emotional patterns
- Technology and modern life
- Other

### Privacy requirements

- Do not publish direct submissions automatically.
- Remove or alter identifying details before adaptation.
- Do not promise confidentiality beyond what the selected form provider and workflow can reasonably deliver.
- Do not publish stories involving immediate danger, abuse, self-harm, criminal allegations, or highly sensitive claims without careful editorial review.
- Include a safety note directing readers in immediate danger to local emergency or crisis services.

---

## 9. Community: WhatsApp Channel and Group

The publication will have a WhatsApp presence for closer distribution and community building.

### Recommended structure

Use both only if they have distinct purposes:

#### WhatsApp Channel
Best for announcements and editorial distribution.

Use it for:
- New essay announcements
- Short excerpts and memorable lines
- New series installment alerts
- Newsletter reminders
- Product launches
- Polls, where useful
- Reading recommendations
- Occasional behind-the-scenes notes

Benefits:
- Low moderation burden
- One-way broadcasting
- Better for a larger audience
- Clear relationship to publication updates

#### WhatsApp Group
Best for a smaller, moderated discussion community.

Use it only when there is a deliberate moderation plan. It can support:
- Monthly discussion prompts
- Reader conversations around a published essay
- Book or essay club sessions
- Feedback on themes readers want explored
- Community events or live discussions

Risks:
- Spam
- Privacy concerns
- Emotional intensity
- Unmoderated advice or conflict
- Pressure to be constantly available

### Version 1 site requirements

The site should support:

- A configurable WhatsApp Channel link
- A configurable WhatsApp Group link
- A reusable CTA component
- A dedicated `/community` page
- A small footer link
- Optional article-bottom CTA
- Analytics tracking for clicks, where possible

### Community page content

- What the Channel is for
- What the Group is for, if active
- Group guidelines
- Join buttons
- Clear moderation expectations
- Clear statement that the community is not therapy or crisis support

### Recommendation

Launch the **WhatsApp Channel first**. Build a Group later after there is consistent readership and a clear reason for live community discussion.

---

## 10. Monetization and Digital Products

The site should be designed to support ethical, non-intrusive monetization as readership grows.

Possible future offers:

- Ebooks
- Themed essay collections
- Guided reflection workbooks
- Psychology-informed self-reflection plans
- Boundary-setting plans
- Relationship recovery guides
- Reading guides
- Journaling prompts
- Digital templates
- Mini-courses
- Audio essay collections
- Paid community events
- Premium digital bundles

### Product positioning

Products should feel like extensions of the writing, not pressure tactics.

A reader should never feel that emotional vulnerability is being used to force a sale.

For example:
- A betrayal series may eventually link to a paid “Rebuilding Trust in Yourself” reflection workbook.
- An unrequited love series may eventually link to a paid “Moving On Without Closure” guide.
- A money-and-ambition series may eventually link to a planning workbook or values-based career reflection tool.

### Version 1 monetization requirements

The site should support product readiness without requiring products at launch:

- A `/shop` or `/resources` route
- Product card component
- Product detail page template
- “Coming soon” product state
- Newsletter waitlist CTA
- Feature flag or frontmatter field to show/hide products
- Reusable popup/banner component
- External checkout links
- Digital delivery handled by a third party

### Recommended initial commerce model

Use external checkout and delivery services instead of a custom backend.

Possible options:
- Gumroad
- Payhip
- Lemon Squeezy
- Shopify Starter
- Stripe Payment Links, paired with an external delivery workflow

For early digital products, **Gumroad**, **Payhip**, or **Lemon Squeezy** are likely simplest. The selected platform should be checked for supported payment methods, payout availability, taxes, and digital file delivery for the creator’s country before launch.

### Popup requirements

Popups should be optional, controlled, and respectful.

They may promote:
- An ebook
- A reflection plan
- A reader-story invitation
- A newsletter
- WhatsApp Channel
- A new series
- A limited-time product offer

Rules:
- Do not show on every page load.
- Do not interrupt a reader immediately.
- Trigger after a meaningful delay, scroll depth, or exit intent.
- Store dismissal state locally for a reasonable period.
- Do not show multiple popups in one visit.
- Make dismissal obvious.
- Ensure accessible keyboard behavior.
- Allow products to be promoted via inline article CTAs instead of relying only on popups.

Suggested trigger defaults:
- Show after 45–60 seconds or 55–65% scroll depth.
- Do not show again for 7–14 days after dismissal.
- Disable popups on short notes and reader submission pages.
- Do not use popups during the first reading session unless intentionally testing a gentle newsletter offer.

---

## 11. Sitemap

```text
/
├── /essays
├── /series
│   └── /series/[slug]
├── /stories
├── /notes
├── /topics
│   └── /topics/[slug]
├── /reading-list
├── /start-here
├── /about
├── /community
├── /share-your-story
├── /newsletter
├── /shop
│   └── /shop/[slug]
├── /search
├── /privacy
├── /terms
├── /editorial-policy
├── /disclosures
└── /contact
```

### Required launch pages

- Home
- Essays
- Series
- Topic pages
- Article page
- About
- Start Here
- Share Your Story
- Community
- Newsletter
- Search
- Privacy Policy
- Editorial Policy
- Contact
- 404 page

### Product-ready pages

- Shop / Resources
- Product detail template
- Product waitlist / coming soon state

---

## 12. Homepage Requirements

### Hero

Required elements:
- Brand name
- Short publication statement
- Primary CTA: “Read the latest essay”
- Secondary CTA: “Start here” or “Join the reading list”

Suggested copy:
> Thoughtful writing for people trying to make sense of modern life.

### Featured essay

Required:
- Featured image or visual treatment
- Topic label
- Title
- Excerpt
- Reading time
- Publish date
- Link to article

### Latest writing

Required:
- Recent articles from multiple categories
- Clear hierarchy
- Cards or editorial list layout
- Reading time
- Topic label

### Featured series

Required:
- Series cover
- Series title
- Summary
- Number of published installments
- CTA: “Begin the series”

### Start Here

Required:
- Curated list of 4–6 foundational pieces
- Short intro explaining the publication

### Community and newsletter

Required:
- WhatsApp Channel CTA
- Newsletter CTA
- Reader submission CTA, optionally in a quieter section

### Optional future product area

- Featured ebook or guide
- “Coming soon” only if it creates anticipation without distracting from the writing

---

## 13. Article Page Requirements

Every article page must support:

### Header
- Topic/category
- Article title
- Subtitle/deck
- Author name
- Publish date
- Updated date, when relevant
- Reading time
- Share buttons
- Optional hero image

### Body
- Comfortable readable width
- Strong typography
- Pull quotes or highlighted lines
- Inline links
- Headings
- Optional footnotes/endnotes
- Source list where factual claims require support

### Supporting modules
- Series navigation, if part of a series
- Related writing
- Author note
- Newsletter CTA
- WhatsApp Channel CTA
- Reader story CTA, only where relevant
- Product CTA, only when relevant and ethical
- Optional discussion prompt

### UX requirements
- Reading progress indicator
- Responsive typography
- Accessible table of contents for long essays
- Copy-link sharing
- Web Share API support on compatible devices
- High-quality Open Graph preview images
- No distracting sticky elements on mobile

---

## 14. Content Metadata and MDX Schema

Each MDX article should support frontmatter similar to:

```yaml
---
title: "The Comfort of Almost"
slug: "the-comfort-of-almost"
description: "Why ambiguous connections can keep people emotionally attached for far longer than they expect."
date: "2026-06-23"
updated: null
type: "essay"
topic: "love-relationships"
topics:
  - unrequited-love
  - attachment
  - boundaries
series:
  slug: "unrequited-love"
  title: "Unrequited Love: The Things We Do When We Hope Someone Will Choose Us"
  installment: 3
  totalPlanned: 6
featured: true
readingTimeOverride: null
heroImage: "/images/essays/the-comfort-of-almost.jpg"
heroAlt: "Editorial image representing emotional ambiguity"
status: "published"
canonicalUrl: null
showNewsletterCTA: true
showWhatsAppCTA: true
showStorySubmissionCTA: true
productCTA:
  enabled: false
  productSlug: null
---
```

### Required metadata

- title
- slug
- description
- date
- type
- topic
- status

### Optional metadata

- updated
- tags/topics
- featured
- series reference
- hero image
- canonical URL
- CTA controls
- related article overrides
- product CTA settings
- no-index setting for drafts/test pages

---

## 15. Search, Discovery, and Navigation

### Main navigation

Recommended desktop navigation:

```text
Essays | Series | Topics | Notes | Start Here | Community | About
```

Right-side actions:
- Search
- Newsletter / Join
- Optional menu icon for mobile

### Search

Version 1 should include client-side search over published content.

Search should support:
- Article title
- Description
- Tags
- Topic
- Series title
- Full text where feasible

Recommended static-first options:
- Fuse.js with a generated content index
- Pagefind for static full-text search

Preferred option: **Pagefind**, because it is designed for static sites and provides fast full-text search without a custom backend.

### Related content

At the bottom of each article, show:
- Same series, where applicable
- Same topic
- Closely related tags
- Editorially selected related articles, if manually defined

---

## 16. Newsletter Requirements

The publication should capture email addresses even before a full newsletter cadence is finalized.

Potential providers:
- Beehiiv
- Buttondown
- ConvertKit
- MailerLite
- Substack, if using it purely for newsletter distribution

Recommended principle:
The website remains the primary home; the newsletter is the direct relationship layer.

### Version 1 requirements

- Newsletter signup form
- Embedded external provider form or API-based provider integration
- Success and error state
- Spam protection through provider tools
- Consent/privacy copy
- Footer signup
- Inline article signup
- Dedicated newsletter page
- Optional lead magnet support later

---

## 16A. Reader Preferences, Theme, Focus Reading, and Local Progress

The site should include lightweight reader controls on individual essay pages. These controls improve comfort and continuity without requiring user accounts or a custom backend.

### Reader Controls

Each article page should include a compact, accessible **Reading Preferences** control area near the article metadata or at the beginning of the article body.

Version 1 controls:

- Theme: Light
- Theme: Dark
- Theme: System
- Focus Reading Mode: On/Off

Suggested UI:

```text
Reading preferences
[ Light ] [ Dark ] [ Focus Reading ]
```

Future controls may include:

- Text size decrease/increase
- Line-height preference
- Focus Reading intensity: Subtle / Standard / Strong

### Theme Preference

Theme choice must:

- Support Light, Dark, and System modes.
- Default to System on a first visit.
- Respect the device’s operating-system preference when System is selected.
- Persist the user’s selected preference in local storage.
- Apply without an obvious flash of the wrong theme on page load.
- Meet accessibility contrast requirements in every theme.

Recommended local storage key:

```text
kwis-theme
```

### Focus Reading Mode

The site should provide an optional **Focus Reading Mode**, a bionic-style reading preference that subtly emphasizes the leading portions of selected meaningful words within the article body.

It must be positioned as an optional reading preference, not as a promise of speed-reading or improved comprehension for every reader.

#### Focus Reading Mode requirements

- Off by default.
- Available on individual essays and long-form story pages.
- Applies only to the article body content.
- Does not affect global navigation, metadata, buttons, forms, footer content, product cards, or non-article UI.
- Must preserve all MDX formatting, links, italics, pre-existing bold text, footnotes, citations, punctuation, and semantic HTML.
- Must not break links, components, code blocks, captions, callout blocks, or embedded media.
- Must be reversible immediately when toggled off.
- Must not create nested or duplicate markup if toggled repeatedly.
- Must respect reduced-motion preferences; no animated text transformations are required.
- Must persist the reader’s preference locally.

Implementation principle:

- Process actual text nodes within the article container, not raw `innerHTML`.
- Exclude code, preformatted text, buttons, links where necessary, form controls, navigation, headings if the visual design calls for exclusion, and any elements explicitly marked to opt out.
- Preserve punctuation and special characters.
- Handle contractions, apostrophes, hyphenated words, and quoted words without visual corruption.
- Avoid emphasizing common short function words and avoid making every word look bold.
- Use proportional, configurable fixation rules rather than one rigid rule for all words.

Recommended local storage key:

```text
kwis-focus-reading
```

### Series Reading Progress

The site should allow readers to see which installments they have already read in a series, using browser local storage.

This feature should feel like a quiet reading journal rather than a gamified progress system.

#### How progress works

- When a reader meaningfully opens an essay in a series, the site records the essay slug under that series.
- The site should avoid marking an essay “read” instantly on page load where possible.
- Recommended trigger: mark as read after the reader has reached a defined threshold, such as 50% scroll depth, or after a reasonable time spent reading.
- The currently open article may be shown as **Reading now** until it qualifies as read.
- Readers should be able to manually mark an essay as unread in a future iteration; this is optional for Version 1.
- Progress is stored only in the reader’s current browser/device.
- Progress does not sync between devices because Version 1 does not include accounts or a backend.
- The user should not be shown misleading claims that progress is permanently saved across devices.

#### Series page states

Each installment in a series should visually support:

- **Unread**
- **Reading now**
- **Read**
- **Upcoming**

Recommended presentation:

```text
Unrequited Love
3 of 6 essays read

✓ Essay One — The Person Who Loved Harder
✓ Essay Two — Why Rejection Can Feel Like a Verdict
● Essay Three — The Comfort of Almost
○ Essay Four — Loving Someone Who Only Loves What You Give Them
○ Essay Five — How to Leave Without Waiting for Closure
○ Essay Six — What Healthy Love Feels Like After You Stop Begging to Be Chosen
```

The series page should also include:

- Overall read count, such as `3 of 6 essays read`
- A subtle progress bar or progress line
- “Continue here” on the first unread published installment
- “Reading now” on the current installment
- “Read” indicator on completed installments
- Clear distinction between unpublished/upcoming and unread published installments

Recommended local storage keys:

```text
kwis-series-progress
kwis-last-read
```

Example local storage shape:

```json
{
  "unrequited-love": {
    "readEssays": [
      "the-person-who-loved-harder",
      "why-rejection-can-feel-like-a-verdict"
    ],
    "lastRead": "why-rejection-can-feel-like-a-verdict",
    "updatedAt": "2026-06-23T20:15:00.000Z"
  }
}
```

### Privacy Notes

Reader preference and reading-progress data should remain local to the browser in Version 1.

- Do not transmit article-reading history to a server solely for this feature.
- Do not use the reading-progress feature for advertising profiles.
- Do not present browser-local progress as a user account or cloud-synced feature.
- Provide a simple “Reset reading preferences” or “Clear reading progress” action in the future reader controls/settings area.


## 17. Analytics and Growth Tracking

Use privacy-conscious analytics that fit a static site.

Possible tools:
- Vercel Analytics
- Vercel Speed Insights
- Plausible
- Umami
- Google Analytics, only if needed

### Key metrics

- Unique visitors
- Returning visitors
- Top articles
- Search traffic
- Average time on article
- Scroll depth, if enabled
- Series completion paths
- Newsletter signups
- WhatsApp click-throughs
- Reader story submissions
- Product CTA clicks
- Product conversion rate, via external checkout data
- Referrer source: TikTok, Reddit, Instagram, WhatsApp, search, direct, etc.

### Important principle

Do not optimize solely for pageviews. Track reader return, series progression, subscriptions, and meaningful actions as indicators of a real audience.

---

## 18. SEO Requirements

The site must be built with strong technical SEO from launch.

Required:
- Unique page titles and descriptions
- Canonical URLs
- XML sitemap
- robots.txt
- RSS feed
- Open Graph tags
- Twitter/X card tags
- Article structured data
- Breadcrumb structured data where relevant
- Fast Core Web Vitals
- Optimized image delivery
- Clean human-readable URLs
- Internal linking between essays, series, and topics
- No duplicate archive pages
- Accessible heading hierarchy

Recommended URL patterns:

```text
/essays/the-loneliness-economy
/series/unrequited-love
/series/unrequited-love/the-comfort-of-almost
/topics/love-relationships
/notes/why-silence-feels-like-rejection
/shop/moving-on-without-closure
```

---

## 19. Design Requirements

### Design intent

The design should be “chill but professional”: calm, warm, intelligent, editorial, and easy to read.

It should feel like a contemporary literary publication rather than a startup landing page.

### Visual direction

- Warm off-white / soft paper background
- Deep charcoal body text
- One restrained accent color
- Strong serif or editorial display type for headings
- Modern sans-serif body type
- Generous whitespace
- Minimal use of borders and shadows
- Images used with purpose, not decoration
- Subtle motion only where it improves polish
- Accessible color contrast
- Responsive reading experience

### Typography recommendation

- Display: Instrument Serif, DM Serif Display, Playfair Display, or Cormorant Garamond
- Body: Geist, Inter, Manrope, Source Sans 3, or IBM Plex Sans
- Metadata: Geist Mono or a restrained sans-serif style

### Accessibility requirements

- Semantic HTML
- Keyboard-accessible navigation
- Visible focus states
- Appropriate contrast ratios
- Alt text for all informative images
- Reduced-motion support
- Readable font sizing
- Mobile-first layout
- No essential meaning communicated by color alone

---

## 20. Technical Architecture

### Recommended stack

```text
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Content: MDX
Deployment: Vercel
Repository: GitHub
Search: Pagefind or Fuse.js
Analytics: Vercel Analytics + optional Plausible/Umami
Newsletter: External provider embed/integration
Reader stories: Tally or Fillout form
Payments/digital delivery: External checkout platform
Images: Next/Image + Vercel Blob, Cloudinary, or a static image folder initially
```

### Static-first requirements

- Use static generation for articles, archives, topic pages, series pages, and landing pages.
- Keep all publishable article content in MDX files.
- Use external services for forms, email, checkout, and community links.
- Avoid server-side databases in version 1.
- Keep configuration central so links/providers can be changed easily.

### Suggested directory structure

```text
app/
  (site)/
    page.tsx
    about/page.tsx
    essays/page.tsx
    series/page.tsx
    series/[seriesSlug]/page.tsx
    stories/page.tsx
    notes/page.tsx
    topics/[topicSlug]/page.tsx
    start-here/page.tsx
    community/page.tsx
    share-your-story/page.tsx
    newsletter/page.tsx
    shop/page.tsx
    shop/[productSlug]/page.tsx
    search/page.tsx
    privacy/page.tsx
    editorial-policy/page.tsx
    disclosures/page.tsx
    contact/page.tsx
  essays/[slug]/page.tsx
  notes/[slug]/page.tsx

content/
  essays/
  notes/
  series/
  products/
  pages/

components/
  articles/
  series/
  marketing/
  layout/
  forms/
  shop/
  ui/

config/
  site.ts
  navigation.ts
  community.ts
  products.ts

lib/
  content/
  seo/
  search/
  analytics/
  utils/

public/
  images/
  og/
```

---

## 21. External Service Strategy

### Version 1 integrations

| Need | Suggested approach | Why |
|---|---|---|
| Hosting | Vercel | Fast deployment for a static Next.js site |
| Source control | GitHub | MDX workflow and version history |
| Newsletter | Beehiiv, Buttondown, ConvertKit, or MailerLite | Avoid custom email infrastructure |
| Reader stories | Tally or Fillout | No custom database required |
| WhatsApp | Direct Channel/Group links | Simple and reliable |
| Digital product checkout | Gumroad, Payhip, Lemon Squeezy, or Stripe Payment Links | No custom commerce backend |
| Digital delivery | Selected product platform | Secure file delivery and receipts |
| Analytics | Vercel Analytics / Plausible / Umami | Lightweight insights |
| Search | Pagefind | Static-site-friendly full-text search |

### When a backend becomes justified

Consider adding a backend only when one or more of these become true:

- Reader submissions become too high-volume to manage through forms and email.
- You need user accounts, saved reading lists, or memberships.
- You are selling multiple products with complex customer journeys.
- You need automated product entitlement/access control.
- You have a meaningful moderated community that needs member management.
- You need structured editorial workflow for multiple writers.
- You want personalized recommendations or reader dashboards.
- You need a reliable internal database of submissions, products, members, or publishing data.

Until then, external tools are preferable because they reduce maintenance, security, privacy, and operational burden.

---

## 22. Legal, Ethical, and Editorial Requirements

The site must include:

- Privacy Policy
- Terms of Use
- Editorial Policy
- Reader Story Submission Policy
- Disclosure / Affiliate Policy, if relevant
- Cookie notice, depending on analytics and jurisdiction
- Copyright notice
- Contact information or contact form

### Psychology and wellbeing language

The publication may discuss psychology, attachment, behavior, boundaries, and healing. It must not present itself as medical care, diagnosis, therapy, crisis support, or professional clinical advice.

Required disclaimer approach:
- Content is educational and reflective.
- It is not a substitute for professional medical, mental health, legal, financial, or crisis support.
- Readers in immediate danger should contact local emergency or crisis services.

### Product ethics

Future products must:
- Be presented accurately
- Avoid guarantees of healing, transformation, or outcomes
- Avoid exploiting emotional distress
- Include clear refund/delivery terms where required
- Be clear whether a product is educational, reflective, or professional guidance

---

## 23. User Flows

### Flow A: First-time reader

1. Lands on an article from TikTok, Reddit, Google, or WhatsApp.
2. Reads article with a calm, distraction-free experience.
3. Sees related essays and the relevant series.
4. Sees an optional WhatsApp Channel or newsletter CTA.
5. Visits Start Here or follows the series.
6. Returns through a saved link, newsletter, social post, or WhatsApp update.

### Flow B: Series reader

1. Lands on a series landing page or installment.
2. Understands the premise and reading order.
3. Starts at Essay One.
4. Reads installments with progress navigation.
5. Saves or shares the series.
6. Joins the newsletter or WhatsApp Channel for the next installment.
7. Optionally submits a related story.

### Flow C: Reader story contributor

1. Visits Share Your Story from an article CTA or navigation.
2. Reads the submission and privacy information.
3. Completes the external form.
4. Receives a clear submission confirmation.
5. May later see a related published essay, though publication is not guaranteed.

### Flow D: Future product purchaser

1. Reads a relevant essay or series.
2. Sees a calm inline product CTA or optional popup.
3. Clicks to product detail page.
4. Learns what the product is and who it is for.
5. Clicks external checkout.
6. Receives product from the commerce/delivery provider.
7. Is invited to join the newsletter or WhatsApp Channel for related writing.

---

## 24. Launch Scope

### Must-have for launch

- Responsive branded website
- Home page
- Article pages
- Essays archive
- Topic pages
- Series archive and series detail pages
- Start Here page
- About page
- Search
- Newsletter signup
- WhatsApp Channel CTA
- Reader story submission page with external form
- Related article modules
- SEO setup
- RSS feed
- Analytics
- Legal/policy pages
- 404 page
- Content system for MDX
- Social sharing previews

### Should-have for launch

- Reading progress bar
- Table of contents for long essays
- Reading time
- Light / Dark / System theme preference
- Focus Reading Mode toggle
- Local series-reading progress states
- Share/copy link functions
- Featured series module
- Product-ready Shop / Resources page
- Popup framework, initially disabled or used only for newsletter/community testing
- Dark-mode consideration, if it fits the visual direction

### Later

- WhatsApp Group
- Digital product checkout activation
- Lead magnets
- Audio versions
- Guest essays
- Native comments or carefully moderated discussion
- Memberships
- Full product library
- Backend/database
- Reader account system
- Personalized reading lists

---

## 25. Acceptance Criteria

### Content and publishing

- A new MDX essay can be added without editing application code.
- New essays automatically appear in relevant archives, topics, search, RSS, and related-content areas.
- A series installment can be connected to its series using frontmatter.
- Series pages show ordered installments correctly.
- Draft content is not publicly indexable or visible.

### Performance

- Site is optimized for static delivery and performs well on mobile.
- Images are optimized and do not cause major layout shifts.
- Search works without a custom backend.
- Core page navigation remains fast on standard mobile networks.

### UX

- Readers can comfortably read long essays on mobile and desktop.
- Reader theme and Focus Reading Mode preferences persist locally.
- Series pages visibly distinguish unread, reading-now, read, and upcoming installments.
- Series progress is clearly explained as browser/device-local in Version 1.
- Series reading order is clear.
- Newsletter, WhatsApp, and story-submission CTAs are visible without being aggressive.
- Product popups can be enabled/disabled per page or campaign.
- Popup dismissal behavior prevents repeated annoyance.
- All core pages work with keyboard navigation.

### SEO and sharing

- Every published article has metadata, canonical URL, Open Graph image, and structured article data.
- Sitemap and RSS are generated.
- Topic and series pages are indexable.
- Share previews are polished when links are posted on WhatsApp, X, LinkedIn, Facebook, and other compatible platforms.

### Privacy and safety

- Reader story page explains how stories may be adapted.
- Forms collect only necessary information.
- Policies are accessible from the footer.
- Psychology content includes appropriate disclaimers.
- Community links are clearly labeled and moderated expectations are stated.

---

## 26. Success Metrics

### First 3 months

- Publish 8–12 quality pieces
- Launch at least one signature series
- Build a consistent visual/editorial identity
- Establish baseline traffic and referrer sources
- Gain early newsletter subscribers
- Gain WhatsApp Channel followers
- Collect early reader story submissions
- Identify the essays readers spend the most time with and share most often

### 6–12 months

- Build a recognizable archive of signature writing
- Launch at least one useful digital product
- Establish returning-reader behavior
- Develop a repeatable content-to-social distribution workflow
- Grow email and WhatsApp audiences
- Test whether a smaller WhatsApp Group or reader discussion format is sustainable
- Make an evidence-based decision on whether a backend is needed

### Meaningful indicators of success

- Readers return, not only visit once
- Readers finish series and follow installment links
- Readers save, share, and reply to essays
- Reader stories arrive with trust and depth
- Newsletter/community conversion increases
- Digital products are purchased because they are genuinely useful, not because the site uses pressure

---

## 27. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Content becomes too broad | Use pillars, series, and editorial calendar to maintain focus |
| Pressure to publish often lowers quality | Prioritize thoughtful cadence over volume |
| Reader stories create privacy/safety concerns | Use external forms, consent language, anonymization, editorial review |
| WhatsApp Group becomes hard to manage | Launch Channel first; create Group only with rules and moderation plan |
| Popups damage reading experience | Use delayed, limited, dismissible, relevance-based prompts |
| Monetization feels exploitative | Make products optional, relevant, transparent, and practical |
| Static workflow becomes difficult at scale | Use GitHub/MDX until a real operational need justifies a CMS/backend |
| Psychology content is mistaken for therapy | Use clear educational disclaimers and responsible language |
| Traffic depends entirely on one social platform | Build newsletter, WhatsApp, search, and direct readership from the start |

---

## 28. Product Principles

1. **Reading comes first.**  
   Everything else—forms, products, community, social distribution—must support the writing rather than distract from it.

2. **Depth over volume.**  
   Publish less often if needed. The work must be worth a reader’s time.

3. **Story before abstraction.**  
   When appropriate, begin with a human story before explaining the idea behind it.

4. **Nuance over certainty.**  
   Avoid simplistic labels and false certainty about people’s lives.

5. **Care over spectacle.**  
   Reader stories are not entertainment material. Handle them responsibly.

6. **Trust over tactics.**  
   Do not sacrifice reader trust for clicks, subscriptions, or quick sales.

7. **Static-first, scalable later.**  
   Use the simplest reliable architecture until growth creates a real reason to add complexity.

8. **Community is a relationship, not a follower count.**  
   Use WhatsApp and email to build a direct, respectful connection with readers.

---

## 29. Recommended Next Steps

1. Confirm the final brand name and secure the domain/social handles.
2. Create a GitHub repository and initial Next.js static site.
3. Build the visual identity and primary component system.
4. Create MDX schemas for essays, series, notes, and products.
5. Write and publish the first 3–5 core essays before major promotion.
6. Launch the WhatsApp Channel.
7. Select newsletter and reader-submission providers.
8. Add reader controls for theme, Focus Reading Mode, and local series progress.
9. Add core legal/editorial pages before opening story submissions.
10. Set up analytics, search, sitemap, RSS, and social sharing images.
11. Keep the Shop page in “Coming Soon” mode until the first product is strong enough to sell.

---

## 30. One-Sentence Product Definition

*Know What I’m Saying?* is a static-first, story-led digital publication that helps readers make sense of modern life through thoughtful essays on psychology, love, work, money, technology, culture, and the stories people carry.
