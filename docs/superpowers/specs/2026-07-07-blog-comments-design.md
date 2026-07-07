# Blog Comments

## Context

The site has no backend today. The newsletter form doesn't submit anywhere real yet, and story submissions go through an external Google Form. This feature introduces the site's first real write path: a database, server-side secrets, and a public POST endpoint.

## Scope

Comments ship on **essays, notes, and series** detail pages. Reading list picks are excluded: they have no individual page on this site (`content/reading-list/*.mdx` items only appear as cards on the `/reading-list` index, linking out via `externalUrl`), so there's no page for a thread to attach to. Adding reading-list detail pages is a separate feature.

Comments are a flat list (no threaded replies), go live immediately on submission (no pre-approval queue), and moderation is manual removal.

## Data model

One Supabase table, `comments`:

```
id            uuid, primary key, default gen_random_uuid()
content_type  text not null   -- 'essay' | 'note' | 'series'
content_slug  text not null
display_name  text not null
email         text not null   -- stored for spam signal + contact; never returned to the browser
body          text not null   -- max 2000 chars, enforced in the API route
ip_address    text            -- captured from the request, spam/rate-limit signal only; never returned
created_at    timestamptz not null default now()
```

Index on `(content_type, content_slug, created_at)` for the list query.

No Row Level Security policies are defined on this table. It is reachable only through the Supabase service-role key, which is read solely from a server-side env var (`SUPABASE_SERVICE_ROLE_KEY`) inside the API route below and is never sent to the browser or referenced from any client component.

## API

Both under `app/api/comments/route.ts` (a single Route Handler file, GET and POST).

**`GET /api/comments?type=essay&slug=the-comfort-of-almost`**
Returns `{ comments: [{ id, display_name, body, created_at }] }`, ordered oldest-first, for that `(content_type, content_slug)` pair. Never includes `email` or `ip_address`.

**`POST /api/comments`**
Body: `{ content_type, content_slug, display_name, email, body, honeypot }`.

1. If `honeypot` is non-empty, return a fake success response (`{ ok: true }`) without writing anything — don't tip off the bot that it was caught.
2. Validate: `display_name`, `email`, and `body` are non-empty; `body` is at most 2000 characters; `content_type` is one of `essay`/`note`/`series`. Return 400 with a field-level message on failure.
3. Rate limit: query `comments` for any row matching this `email` OR this request's IP within the last 2 minutes. If found, return 429 with "You're posting a bit fast, try again in a moment."
4. Insert the row via the Supabase service-role client.
5. Send a notification email via Resend to the editor's address with the comment body, display name, and a link to the page. This call is fire-and-forget: if Resend fails or times out, the API still returns success for the comment itself, and the failure is only `console.error`-logged.

## Frontend

A new client component, `components/comments/comments-section.tsx`, taking `contentType` and `slug` props. On mount, it fetches the GET endpoint and renders the list plus a submission form (display name, email, body, plus the honeypot input, styled hidden off-screen rather than `display:none` so bots that check computed style still get caught). On successful submit, it optimistically appends the new comment to the visible list and clears the form; on 429/400 it shows the returned message inline.

This is added as a direct import in three places (there is no shared template to hook into once — each content type has its own distinct page layout):

- `app/essays/[slug]/page.tsx`, after `<AuthorNote />`
- `app/notes/[slug]/page.tsx`, after `<MdxContent source={note.body} />`
- `app/series/[slug]/page.tsx`, after `<ReaderStoryCta />`

Each page's static generation (`generateStaticParams` / `dynamicParams = false`) is unaffected: `CommentsSection` is a client component that fetches at runtime, so the page shell stays statically generated and comments hydrate in afterward.

## New infrastructure

- A Supabase project (free tier) with the `comments` table above.
- Env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, plus `COMMENT_NOTIFICATION_EMAIL` (the editor's address to notify).
- A Resend account (free tier) with a sending domain/address configured.

## Moderation

No custom admin UI. Removing a comment means opening the Supabase dashboard's Table Editor and deleting the row directly. This was a deliberate scope call (confirmed with the user) to avoid building and securing a second, password-gated surface for a single-user moderation need.

## Out of scope

- Threaded replies
- Pre-publish approval queue
- Reading-list comments (blocked on reading-list detail pages existing at all)
- A custom in-site moderation/admin view
- CAPTCHA (honeypot + rate limit only, per user's choice)

## Verification

- `npm run build` succeeds with the new route handler and client component.
- Manually post a comment on one essay, one note, and one series page in dev; confirm it appears immediately, confirm the notification email arrives, confirm a second immediate post from the same email is rate-limited.
- Confirm `email` and `ip_address` never appear in the GET response payload (check the network tab).
