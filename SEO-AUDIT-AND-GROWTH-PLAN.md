# SEO, AI Search, and Viral Growth Audit

**Site:** Know What I'm Saying?  
**Audit date:** 2026-06-24  
**Repository:** Next.js 16 App Router, MDX content  
**Verdict:** Strong editorial design foundation, but **not ready for an SEO-focused launch yet**.

## Executive summary

The site has two meaningful strengths: it produces fully rendered static HTML, and its best two essays already demonstrate a thoughtful voice, useful structure, and responsible source notes. The production build and lint both pass.

The largest problem is not a meta tag. The canonical domain configured in `config/site.ts`, `https://knowwhatimsaying.com`, currently redirects to an Afternic domain-for-sale page. On 2026-06-24, both `https://knowwhatimsaying.com/robots.txt` and `/sitemap.xml` returned 404. If this app is deployed somewhere else while keeping the current canonical URLs, it will tell search engines that the parked domain—not the actual deployment—is the authoritative version of every page.

After the domain, the next constraints are substantial:

- No sitemap, robots policy, RSS feed, structured data, social images, or search-engine verification exists.
- Seven heavily linked internal routes do not exist.
- The newsletter form has no working submission behavior.
- Three of five published essays contain only about 79–343 words, and one published note contains about 33 words. The problem is not a word-count rule; these pages visibly read like unfinished article stubs.
- Four of nine topic pages have no essays, but are generated as indexable pages.
- The articles have no named, linked author; no author profile; and no visible editorial, corrections, or sourcing policy.
- All editorial image fields are empty, and the UI always renders decorative placeholders. There are no article or social-sharing images.
- The MDX article bodies contain no contextual links to other articles. Related links exist after essays, but the topical network inside the writing is weak.
- The site makes psychology-adjacent claims, but only two essays currently provide source notes.

No ethical SEO work can guarantee virality or a top ranking. Professional SEO makes the site crawlable, understandable, trustworthy, and competitive. Rankings then depend on how well each page satisfies a real search need, how distinctive the writing is, how the publication earns attention and links, and how consistently it improves from actual search data.

## Priority scorecard

| Area | Current state | Priority | Why it matters |
|---|---|---:|---|
| Production domain and canonicals | Critical failure | P0 | The configured domain is parked and for sale. Every generated canonical points there. |
| Renderability | Good | Maintain | The build statically renders 29 pages; core content is available in HTML. |
| Crawl discovery | Poor | P0 | No sitemap, robots route, or feed. |
| Internal-link integrity | Poor | P0 | Important navigation and CTA links resolve to routes that do not exist. |
| Published content readiness | Poor | P0 | Several “published” pieces are visibly incomplete; four topic hubs are empty. |
| Authorship and editorial trust | Poor | P0/P1 | “The editor” is not enough for a publication making factual psychology claims. |
| Titles and descriptions | Partial | P1 | Basic titles, descriptions, and most canonicals exist, but the system is incomplete. |
| Structured data | Missing | P1 | Google and other systems receive no explicit article, author, publisher, or breadcrumb data. |
| Image/search-preview readiness | Missing | P1 | No real images or `og:image`; Discover and social-sharing potential are severely limited. |
| Topical authority and internal links | Early | P1 | Five essays are spread over nine topics, with almost no contextual linking. |
| AI-search readiness | Early | P1 | Standard indexing foundations are missing; there is no explicit crawler policy. |
| Analytics and feedback loop | Missing | P1 | “Most read” is not based on readership, and there is no evidence system for decisions. |
| Performance | Promising but unverified | P1 | Static output is good, but no deployed mobile Core Web Vitals test was available. |

## What was audited

This review covered:

- All App Router pages, dynamic routes, shared layout/navigation, article components, metadata utilities, and content schemas.
- Every MDX file and its frontmatter.
- The production build output and emitted HTML metadata.
- Internal route references and the actual route inventory.
- The configured production origin, robots endpoint, and sitemap endpoint.
- Current first-party guidance from Google, OpenAI, Bing/IndexNow, and Google Discover.

Verification performed:

- `npm run lint`: passed.
- `npm run build`: passed; 29 pages were statically generated.
- Generated HTML inspected for title, description, canonical, Open Graph, Twitter, JSON-LD, image, and semantic output.
- Live configured domain checked on 2026-06-24.

This audit did **not** have access to Google Search Console, Bing Webmaster Tools, production analytics, CDN/server logs, backlink data, or a real deployed version of this app. Therefore, it cannot responsibly claim current rankings, index coverage, search volume, real Core Web Vitals, or backlink authority. Keyword ideas later in this report are search-intent hypotheses to validate, not volume forecasts.

## P0: fix before launch or indexing

### 1. Resolve the domain and canonical-origin failure

Evidence:

- `config/site.ts` hard-codes `https://knowwhatimsaying.com`.
- The domain currently redirects to Afternic as a domain for sale.
- `buildCanonicalUrl()` uses this origin for all generated canonical URLs.

Required action:

1. If this domain is owned or will be acquired, connect it to the production deployment before allowing indexing.
2. If it is not the final domain, replace it before launch. Do not deploy with temporary-host pages pointing canonical tags to this domain.
3. Make the production origin an environment-validated value, with a safe local fallback, rather than an easy-to-forget hard-coded string.
4. Choose one hostname, such as the apex domain, and permanently redirect every alternative hostname and HTTP URL to it.
5. After deployment, verify that page URL, canonical URL, Open Graph URL, sitemap URL, and redirects all agree.

This one issue can negate most of the other work in this report.

### 2. Repair or remove every broken internal destination

The code links to these routes, but none exists in `app/`:

- `/newsletter`
- `/community`
- `/search`
- `/share-your-story`
- `/privacy`
- `/terms`
- `/editorial-policy`

These links appear in high-visibility areas such as the header, footer, homepage CTAs, Start Here page, About page, and Contact page. The standard desktop header also displays a search icon that is not a link or button.

Required action:

- Implement the routes that are part of the launch, or remove their links everywhere until they work.
- Run an internal-link crawl in CI so a future missing route fails the build.
- Do not send users to a generic 404 from a primary conversion CTA.
- Make the newsletter form functional. It currently has no action, handler, field name, success state, consent language, or error state.
- Make the WhatsApp CTA point to a real, disclosed external destination or a real intermediary page.

### 3. Add crawl controls and URL discovery

The repository has no `app/robots.ts`, `public/robots.txt`, `app/sitemap.ts`, XML feed, or equivalent route. A missing robots file does not automatically block crawling—most bots treat it as no restrictions—but the site has no explicit crawler policy and no sitemap discovery signal.

Implement:

- `app/robots.ts` with the correct production host and sitemap URL.
- `app/sitemap.ts` containing only canonical, public, indexable URLs.
- Accurate `lastModified` values from content frontmatter.
- An RSS or Atom feed for essays and notes.
- Google Search Console and Bing Webmaster Tools verification after the final domain is live.
- Sitemap submission in both webmaster platforms.

Do not include 404s, drafts, empty topic pages, search-result pages, alternate hosts, or redirected URLs in the sitemap.

### 4. Stop publishing unfinished pages as finished essays

Approximate body counts after stripping Markdown syntax:

| Published item | Type | Approx. body words | Assessment |
|---|---|---:|---|
| `we-are-not-addicted-to-our-phones` | Essay | 2,232 | Substantial; sourced; strongest launch asset. |
| `the-new-religion-of-self-optimization` | Essay | 2,224 | Substantial; sourced; strong launch asset. |
| `the-comfort-of-almost` | Essay | 343 | Reads like a partial draft, not a complete treatment. |
| `the-person-who-loved-harder` | Essay | 114 | Article stub. |
| `why-rejection-can-feel-like-a-verdict` | Essay | 79 | Article stub with an unsupported neuroscience claim. |
| `some-friendships-just-get-quiet` | Note | 535 | Appropriate depth for a note. |
| `we-trained-ourselves-to-skim` | Note | 33 | Teaser or fragment, not yet a useful page. |

Google has no preferred minimum word count, so “make everything 2,000 words” would be bad advice. The correct test is whether the page completes its promise better than the available alternatives. The 79-word rejection essay does not yet explain the claim in its title, establish nuance, cite the neuroimaging evidence, or help the reader apply the idea.

Before launch:

- Finish the three essay stubs or mark them as drafts.
- Expand the 33-word note or keep it out of the index.
- Add a content-quality gate that requires editorial approval before `status: published`.
- Prevent direct access to future draft files. `getEssayBySlug()` and `getNoteBySlug()` do not enforce published status. Add a published-state check and consider `export const dynamicParams = false` on static content routes.
- Do not change dates just to make old content appear new. Use `updated` only after a meaningful revision and explain major corrections when appropriate.

### 5. Do not index empty or nearly empty taxonomy pages

There are nine topic routes for five essays. Four currently have no essays:

- `healing-boundaries`
- `friendship`
- `modern-dating`
- `family`

The Friendship topic has a published note, but topic pages only retrieve essays, so the page still says “No essays published on this topic yet.”

Required action:

- Generate a topic page only when it has enough useful material to function as a hub.
- Until then, do not create the route, or add `noindex, follow` and omit it from the sitemap.
- Decide whether topic hubs should include notes and series as well as essays.
- Add unique editorial introductions to mature hubs; do not let them become duplicate lists with one sentence changed.

## P1: build the professional SEO foundation

### 6. Upgrade the metadata system

Current strengths:

- Most routes have a unique title and description.
- Most non-home routes emit an absolute canonical URL.
- Open Graph title, description, URL, and site name exist on routes using `buildPageMetadata()`.
- The document language is correctly set to English.

Current gaps:

- The homepage has no canonical or Open Graph metadata.
- There is no global `metadataBase` or title template such as `%s | Know What I'm Saying?`.
- Essay metadata has no `article` type, publication date, modification date, author, section, or tag data.
- No page has an Open Graph or Twitter image. Generated Twitter output falls back to a text-only `summary` card.
- There is no `max-image-preview:large` policy.
- The `updated` field is never rendered or used in metadata.
- The `heroImage`, `heroAlt`, `coverImage`, and `coverAlt` schema fields are not used by the rendering components.

Recommended design:

- Put `metadataBase`, title default/template, default description, site name, locale, canonical homepage, default social image, and crawler preview policy in `app/layout.tsx`.
- Create a dedicated article metadata builder rather than treating essays like generic pages.
- Generate a unique social image for every essay and series, with a consistent brand frame and readable title.
- Keep titles human and intent-aligned. Do not add a `keywords` meta tag; modern search engines do not need it.
- Treat meta descriptions as persuasive summaries, not ranking-keyword containers. Google may rewrite them.

### 7. Add honest structured data

The generated HTML contains no JSON-LD.

Add structured data that exactly matches the visible page:

- Homepage: `WebSite` and the real publisher entity (`Organization` or `Person`, whichever is truthful).
- Essays and substantive notes: `Article` or `BlogPosting` with headline, description, canonical URL, image, `datePublished`, `dateModified`, author, publisher, and `mainEntityOfPage`.
- Article, topic, and series pages: `BreadcrumbList` paired with visible breadcrumbs.
- Series and topic hubs: `CollectionPage` may clarify page type, although it is not a ranking shortcut or guaranteed rich result.

Do not add fake review ratings, FAQ markup for questions that are not visibly answered, medical credentials that do not exist, or schema that differs from the page. Structured data improves machine understanding and eligibility for some presentations; it does not create authority on its own.

### 8. Establish real authorship and editorial trust

`AuthorNote` currently says the work is written by “the editor,” with an unlinked placeholder avatar. The content schema has no author field.

For a site discussing rejection, attachment, addictive behavior, burnout, and mental health-adjacent topics, readers and search systems need to understand who is speaking and why the information is trustworthy.

Implement:

- A real author name or a clearly defined editorial-team identity.
- An author page with relevant lived experience, professional background, subject focus, and links to all authored work.
- A visible byline linked to that author page.
- An editorial policy explaining sourcing, composite/fictional stories, fact-checking, corrections, conflicts, sponsorship, affiliate links, and any use of generative AI.
- A corrections policy and contact method.
- Privacy and terms pages before collecting emails or reader stories.
- Inline citations or clearly linked source notes for material factual claims.
- Expert review only where it is genuinely performed; never imply clinical review that did not happen.

The About page says stories may be personal, fictional, composite, or reader-inspired. That policy is thoughtful but too broad at the publication level. Each story-led essay should disclose its own status so readers are not left guessing whether a scene is reported, invented, or composited.

### 9. Replace placeholders with an image system

All essay `heroImage` values and the series `coverImage` are null. The components ignore those fields and render striped `<div>` placeholders instead of images. The generated pages contain zero `<img>` elements.

This hurts:

- Social sharing and click-through rate.
- Google Discover eligibility and appeal.
- Image search.
- Brand recognition.
- The emotional promise of a story-led publication.

Implement:

- Original, commissioned, or properly licensed editorial art for each major piece.
- Responsive `next/image` rendering with explicit dimensions, useful alt text, and modern formats.
- High-quality social variants. Google recommends large representative images and supports `max-image-preview:large`; its Article guidance recommends multiple high-resolution aspect ratios such as 16:9, 4:3, and 1:1.
- A dynamic `opengraph-image.tsx` fallback so every share has an image even before custom art is available.
- Image fields wired through article cards, article headers, series covers, Open Graph metadata, and JSON-LD.

Avoid generic stock imagery and text-heavy thumbnails. For emotional essays, a distinctive visual language is a distribution asset, not decoration.

### 10. Build topical authority instead of nine shallow categories

The positioning currently spans love, psychology, technology, money, work, ambition, meaning, healing, boundaries, friendship, dating, and family. That is attractive editorially but too diffuse for a new domain with five essays.

Start with the three themes already supported by the strongest material:

1. Rejection, ambiguity, and unrequited attachment.
2. Attention, phone use, boredom, and emotional escape.
3. Self-optimization, productivity pressure, rest, and self-worth.

Each mature cluster should contain:

- A clear hub that explains the territory and guides the reader.
- One comprehensive answer to the central search problem.
- Several narrower pieces answering distinct follow-up questions.
- A story-led essay that creates emotional identification.
- A practical or reflective piece that helps the reader act.
- Contextual links among the pages using descriptive anchor text.
- Citations to authoritative primary research where factual claims are made.

The article bodies currently contain zero internal Markdown links; the About page contains the only internal link in MDX. The related-reading band is useful, but contextual links inside relevant paragraphs are stronger signals for readers and crawlers because they explain the relationship between ideas.

Do not create dozens of templated “What is X?” pages. Publish fewer pages that contain an original observation, a clear answer, credible evidence, and a reason to remember the publication.

## Search-intent and content plan

These are intent hypotheses to validate in Google Search Console, Google Trends, Keyword Planner, and Bing Webmaster Tools after the site is live.

| Cluster | Search need | Existing asset | Recommended next asset |
|---|---|---|---|
| Rejection and worth | “Why does rejection feel like proof I am not enough?” | `why-rejection-can-feel-like-a-verdict` is only a stub. | Finish it as an evidence-led cornerstone with nuance, sources, and practical reframing. |
| Ambiguous relationships | “Why are mixed signals so hard to leave?” | `the-comfort-of-almost` is a promising partial essay. | Build a complete essay explaining intermittent reinforcement, hope, ambiguity, boundaries, and what to do next. |
| Unequal relationships | “How do I know I am carrying the relationship?” | `the-person-who-loved-harder` is a short story fragment. | Expand the story, distinguish temporary imbalance from a pattern, and link to boundaries/rejection pieces. |
| Phone use and emotion | “Why do I reach for my phone when anxious, lonely, or bored?” | The phone essay is the strongest current asset. | Add narrower supporting pieces on boredom, emotional avoidance, bedtime use, and rebuilding attention without a punitive detox. |
| Phone addiction terminology | “Is smartphone addiction a real diagnosis?” | The phone essay contains a careful source note. | Create a concise, clinically careful explainer that distinguishes everyday language, problematic use, and recognized diagnoses. |
| Self-optimization | “Why does rest make me feel guilty?” | The self-optimization essay is strong and sourced. | Add focused pieces on rest guilt, self-tracking, productivity identity, and self-improvement versus self-rejection. |
| Quiet friendship loss | “Why do friendships fade without a fight?” | The friendship note has enough depth to resonate. | Add a substantive guide on grief, reaching out, accepting changed closeness, and when repair is possible. |

### Recommended article pattern

Use a flexible editorial pattern, not a rigid SEO template:

1. A descriptive title and one H1 that promise a specific payoff.
2. A short opening that names the reader's actual question.
3. A concise answer or thesis early enough to extract and quote.
4. Story, evidence, interpretation, and practical reflection in a natural order.
5. Descriptive H2s that make the argument understandable when skimmed.
6. Direct links to primary sources close to material claims.
7. Two to five contextual internal links where they genuinely help.
8. A visible byline, published date, meaningful updated date, and reading time.
9. A unique representative image and useful alt text.
10. A next step: related piece, newsletter, reader story, or series continuation.

Answer-first passages help humans and make a page easier for search and answer systems to cite. They should not make every essay sound like a dictionary entry. The publication's voice is an advantage; preserve it.

## AI-search and answer-engine readiness

### The important truth

There is no separate, guaranteed “Gemini SEO,” “ChatGPT SEO,” or universal AI-ranking schema. Google's current guidance says pages shown as supporting links in AI Overviews and AI Mode must be indexed and eligible for a normal Google Search snippet; there are no additional technical requirements and no special AI text file or schema required.

AI visibility rests on the same base as search visibility:

- Crawl access.
- Indexability and correct canonicals.
- Helpful, original content.
- Clear authorship and sourcing.
- Textual answers that can be understood without executing a complicated UI.
- Stable URLs and a coherent internal-link graph.
- Earned mentions and authority beyond the site's own claims.

### Platform-specific actions

| Platform | What matters | Action for this site |
|---|---|---|
| Google Search, AI Overviews, AI Mode, and Search-grounded Gemini experiences | Googlebot access and normal Search eligibility. | Fix the domain, allow Googlebot, submit the sitemap, build quality pages, and monitor Search Console. |
| Gemini model training and some grounding controls | `Google-Extended` is a separate robots product token. Google states it does not affect inclusion or ranking in Search. | Make an explicit publisher choice. Allow it if broader Gemini reuse aligns with the publication's goals; disallow it if it does not. Do not confuse this choice with Google Search ranking. |
| ChatGPT Search | OpenAI uses `OAI-SearchBot` for automatic search crawling. | Explicitly allow `OAI-SearchBot` and ensure the CDN/firewall does not block its published IP ranges. |
| OpenAI model training | `GPTBot` is independent from `OAI-SearchBot`. | Choose allow or disallow based on the publication's training-use policy. Blocking GPTBot does not require blocking ChatGPT Search. |
| User-requested ChatGPT visits | `ChatGPT-User` may visit a page after a user action and is not the automatic search crawler. | Keep pages accessible without login or bot-hostile interstitials; use `OAI-SearchBot` for the Search policy. |
| Bing and Copilot-related discovery | Bingbot, sitemap discovery, quality signals, and optionally IndexNow. | Verify Bing Webmaster Tools, submit the sitemap, and add IndexNow after the publishing workflow is stable. |

A sensible robots policy, if it matches the publisher's choices, would conceptually look like this:

```text
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://FINAL-DOMAIN.example/sitemap.xml
```

This is an example, not a decision made for the publisher. Search visibility and model-training permission are separate choices.

### Do not make `llms.txt` a launch priority

An `llms.txt` file may be useful as experimental documentation in some ecosystems, but it is not a substitute for crawlable pages, canonicals, robots rules, sitemaps, or authority. Google explicitly says no new machine-readable “AI text file” is required for its AI search features. OpenAI documents its crawler controls through `robots.txt`.

Add `llms.txt` later only if there is a clearly defined consumer and maintenance owner. Do not sell it internally as an AI-ranking lever.

### Make claims easy to cite

For better citation potential across answer systems:

- Put a precise answer near the relevant heading.
- Define uncommon terms in plain language.
- Separate evidence from interpretation.
- Link directly to original research, official documentation, or first-party data.
- State the limits of evidence, especially for psychological and behavioral claims.
- Use descriptive headings and short, self-contained passages.
- Show who wrote and reviewed the piece.
- Keep dates and corrections truthful.
- Publish original examples, frameworks, interviews, or data that other sites have a reason to reference.

Do not write repetitive, robotic summaries merely to be quoted by an AI. Distinctive usefulness is the durable advantage.

## Virality and distribution

SEO and virality are related but different systems. Search usually compounds over time; virality is a rapid distribution event. The site needs loops for both.

### Current distribution blockers

- The newsletter form does not work.
- Newsletter, WhatsApp, share-story, and search routes are missing.
- No article has a social image.
- The “Most read this week” component simply receives all essays in the same date-sorted order; it is not based on readership.
- “Issue №14 · June 2026” is hard-coded and will become a stale trust signal.
- Content flags such as `showNewsletterCTA` and `showWhatsAppCTA` exist in frontmatter but are not used on article pages.

### Build a real sharing loop

For each flagship article:

1. Create a high-quality Open Graph image and two or three platform-native visual excerpts.
2. Prepare one sharp thesis, one emotionally resonant line, and one useful takeaway for distribution.
3. Link social posts to the canonical article with consistent campaign parameters.
4. Make the on-page share action work on mobile and provide explicit copy-link feedback.
5. Put the newsletter CTA after the reader receives value, not only on the homepage.
6. Send the article to a real email list and WhatsApp channel; do not present dead CTAs.
7. Repackage the idea for relevant communities without dropping context-free promotional links.
8. Pitch genuinely relevant writers, newsletters, podcasts, or publications when the piece adds evidence or a distinctive framework.
9. Measure shares, referred sessions, engaged reading, return visits, and signups.

Label the sidebar “Editor's picks” until actual analytics supports “Most read.” False social proof is a small sentence with a large trust cost.

The most linkable future assets will likely be original surveys, carefully sourced explainers, named frameworks, visual models, and expert interviews—not generic opinion pieces on broad topics.

## Information architecture and semantic HTML

What works:

- Human-readable slugs.
- Clear top-level archives for essays, notes, topics, series, reading list, and Start Here.
- One visible H1 is present on the inspected rendered pages.
- Static HTML contains the article text and internal navigation.
- Related-reading and series navigation are useful.

What should change:

- Wrap article header, body, author, and dates in one coherent `<article>` rather than emitting separate `<article>` elements for the header and body.
- Render dates with `<time dateTime="...">`.
- Add visible breadcrumbs to article, topic, and series pages.
- Link the primary topic pill to its topic hub.
- Link the author byline to an author page.
- Include notes in topic hubs if the taxonomy says they belong there.
- Use descriptive anchors rather than repeated generic calls such as only “Read the essay.”
- Add previous/next or related navigation to notes.
- Keep search-result pages out of the index if on-site search is added.

## Performance and page experience

Positive evidence:

- The production build succeeds.
- All content routes are statically generated.
- The core reading content is server-rendered.
- There are no third-party analytics or ad scripts yet.

Risks to test:

- The build emits three font families, 19 font files, and multiple weights. Not every file necessarily loads on every page, but the typography system deserves a real mobile waterfall review.
- `Header` is a client component on every page because menu/collapse behavior is mixed with the static header markup. Split the smallest interactive islands out so the entire header does not need hydration.
- Reading progress, preferences, series progress, swipe navigation, theme, and mobile navigation add client JavaScript. Keep them, but measure their cost.
- Current placeholders make image performance impossible to evaluate. Real hero images must use explicit dimensions, responsive sizes, and appropriate preload priority.
- Generated HTML is relatively large because it contains content plus React/Next payloads. Measure transferred and compressed size in the deployed environment before optimizing blindly.

After deploying to the real domain:

- Run Lighthouse on mobile for the homepage, a long essay, a topic hub, and the reading list.
- Monitor field Core Web Vitals in Search Console, not only lab scores.
- Measure LCP, INP, CLS, total blocking time, font behavior, and per-route JavaScript.
- Test with a cold cache and an ordinary mid-tier mobile connection.
- Set caching and compression at the hosting/CDN layer.

Do not trade readability for a perfect synthetic score. The goal is a stable, fast reading experience.

## Analytics and measurement plan

Install a privacy-conscious analytics setup only after the privacy policy and consent requirements are understood for the chosen markets.

Minimum stack:

- Google Search Console.
- Bing Webmaster Tools.
- A privacy-conscious product/web analytics tool.
- Newsletter-provider analytics.
- Optional server/CDN logs for crawler and 404 analysis.

Track:

- Valid indexed canonical pages versus submitted pages.
- Non-brand impressions, clicks, CTR, and average position by landing page and query.
- Queries where a page ranks on page two or low page one; these often identify the best update opportunities.
- Organic engaged time, scroll depth used cautiously, return readership, and newsletter conversion.
- Broken links and 404 entrances.
- Referral traffic from ChatGPT, Perplexity, Gemini, Copilot, newsletters, and social platforms when referrer data is available.
- Earned links and unlinked brand mentions.
- Content decay and meaningful update history.

Do not use rankings alone as the success metric. A viral spike that creates no subscribers or returning readers is not durable growth.

## Implementation map for this repository

| File or area | Recommended change |
|---|---|
| `config/site.ts` | Replace the parked origin; add validated production URL, publisher, author, locale, social profiles, and default image. |
| `app/layout.tsx` | Add `metadataBase`, title template, canonical homepage, Open Graph/Twitter defaults, preview policy, and verification tokens. |
| `lib/seo/metadata.ts` | Split generic page and article metadata; support images, types, dates, authors, sections, and tags. |
| `app/robots.ts` | Publish explicit crawler policy and sitemap location. |
| `app/sitemap.ts` | Generate only canonical, published, useful URLs with accurate modification dates. |
| `app/feed.xml/route.ts` | Publish an RSS/Atom feed for essays and notes. |
| `app/opengraph-image.tsx` and content routes | Add branded default and per-article social image generation. |
| Essay/note detail routes | Add JSON-LD, visible breadcrumbs, one semantic article wrapper, linked byline, and `<time>`. |
| Content schema | Add author ID, optional review data, meaningful update date, disclosure type, and image metadata; validate relations. |
| Content loaders | Enforce published status on direct lookup; validate filename/slug equality, topic references, series references, and duplicate canonicals. |
| Topic routes | Include relevant content types; suppress or noindex empty/immature hubs. |
| Image components | Render real `next/image` assets from frontmatter rather than permanent placeholders. |
| Navigation and footer | Remove or implement missing routes; repair the desktop search control. |
| Newsletter/community components | Connect real services and add accessible fields, consent, success, and error states. |
| `MostReadSidebar` | Use real analytics or rename to “Editor's picks.” |
| `next.config.ts`/hosting config | Add canonical-host redirects, security headers, and appropriate caching where the host does not provide them. |
| CI | Run lint, build, internal-link crawl, schema validation, and sitemap/canonical consistency checks. |

## Recommended rollout

### First 48 hours: remove launch blockers

1. Secure and configure the real domain, or change the origin everywhere.
2. Implement/remove broken routes and make the newsletter CTA truthful.
3. Add robots, sitemap, canonical homepage, title template, and noindex rules for unfinished pages.
4. Move unfinished essays/notes back to draft or finish them.
5. Hide empty topic pages from indexing and navigation.
6. Add a real author identity and minimally viable editorial/privacy policies.

### First 30 days: create a credible publication

1. Finish the rejection/ambiguity series to publication quality.
2. Add article JSON-LD, breadcrumbs, updated dates, bylines, and author pages.
3. Build the image and Open Graph system.
4. Launch working email and WhatsApp distribution.
5. Set up Search Console, Bing Webmaster Tools, analytics, and error monitoring.
6. Add contextual internal links and strengthen the three initial topic clusters.
7. Publish RSS/Atom.

### Days 31–90: earn authority and compound

1. Publish consistently within the three initial clusters rather than expanding categories.
2. Update pages based on real query data and reader questions.
3. Create at least one genuinely linkable original asset: a small survey, interview series, visual framework, or evidence review.
4. Build relationships with relevant newsletters, podcasts, writers, and communities.
5. Refresh titles and descriptions only from evidence, not constant guesswork.
6. Review index coverage, Core Web Vitals, backlinks, conversions, and AI/referral traffic monthly.

## Launch acceptance checklist

- [ ] Final domain serves this application and does not redirect to a parked page.
- [ ] Every canonical uses the final HTTPS origin and resolves with status 200.
- [ ] Alternate hosts permanently redirect to the canonical host.
- [ ] `/robots.txt` and `/sitemap.xml` return 200 and contain the correct origin.
- [ ] Googlebot, Bingbot, and OAI-SearchBot are not accidentally blocked by robots, CDN, or firewall rules.
- [ ] GPTBot and Google-Extended policies reflect an explicit publisher decision.
- [ ] All primary navigation, footer, and CTA URLs resolve correctly.
- [ ] No unfinished content or empty taxonomy page is indexable or in the sitemap.
- [ ] Homepage and every indexable page have a unique title, useful description, and self-canonical.
- [ ] Every flagship article has a named author, published date, sources where needed, and a representative image.
- [ ] Article and breadcrumb structured data validates and matches visible content.
- [ ] Open Graph and Twitter previews have been tested.
- [ ] Newsletter and story-submission forms work and have privacy disclosures.
- [ ] Search Console and Bing Webmaster Tools are verified; sitemap is submitted.
- [ ] A deployed mobile performance baseline exists for the homepage and an article.
- [ ] Analytics uses real data before the site claims content is “most read.”

## Official references used

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) — normal Search eligibility, no extra AI technical requirements, and no special AI text file or schema.
- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — clear authorship, bylines, author background, sourcing, and trust.
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article) — article properties, authors, dates, and high-resolution image guidance.
- [Google: Common crawlers](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) — Googlebot scope and the separate Google-Extended policy for Gemini-related uses.
- [Google: Discover guidance](https://developers.google.com/search/docs/appearance/google-discover) — eligibility, representative large images, and `max-image-preview:large`.
- [Google: Sitemaps overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) — sitemap discovery and submission guidance.
- [Google: robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro) — crawler-access controls.
- [OpenAI: Overview of OpenAI crawlers](https://platform.openai.com/docs/bots) — `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`, and their independent purposes.
- [IndexNow protocol documentation](https://www.indexnow.org/documentation) — optional change notification for participating search engines.

## Final assessment

The visual product looks much further along than the search product. That is fixable. The static architecture, clean writing experience, series concept, and two substantial essays are a credible base.

The correct sequence is:

1. Fix ownership and indexing signals.
2. Remove broken promises and unfinished pages.
3. Establish authorship, sourcing, images, and structured metadata.
4. Concentrate on three defensible topic clusters.
5. Build working distribution and measurement loops.
6. Earn authority with original work people choose to cite and share.

If those steps are followed, the site can become search-ready and meaningfully more likely to surface in Google, Google AI features, Gemini-grounded experiences, ChatGPT Search, Bing, and other answer systems. “Rank very high” and “go viral” remain outcomes to earn, not settings to enable.
