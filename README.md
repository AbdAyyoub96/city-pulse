# City Pulse Solutions — نبض المدينة للأعمال الرقمية

Bilingual Next.js 15 landing page for a digital growth company in Amman, Jordan. Arabic is the default at `/ar`; English is at `/en`. `/` redirects to `/ar`. The existing `/admin` dashboard and `/api/leads` endpoint remain available.

## Run locally

Requires Node.js 20.19+ and npm. Browser tests use an installed Google Chrome.

```powershell
npm.cmd ci
# For a new checkout only: copy .env.example to .env.local, then fill it in.
npm.cmd run dev
```

Open http://localhost:3000/ar or http://localhost:3000/en.

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`: your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: the publishable key (`sb_publishable_…`) or legacy anon key. The existing environment-variable name is retained for compatibility.
- `SUPABASE_SERVICE_ROLE_KEY`: the server secret (`sb_secret_…`) or legacy service-role key. Never prefix this variable with `NEXT_PUBLIC_` or commit its value.
- `NEXT_PUBLIC_SITE_URL`: the public site origin, such as `https://your-domain.example`. Set this before a production build so canonical URLs, hreflang links and Open Graph URLs use your domain. Local fallback is `http://localhost:3000`.

`.env.local` is intentionally excluded from Git and the delivery artifacts. The provided `.env.example` contains placeholders only.

## Supabase setup

For a NEW database, run `supabase/migrations/0001_leads.sql` in the Supabase SQL Editor once. It creates the `leads` and `admins` tables, indexes, status enum, timestamp trigger and row-level security policies.

Review `supabase/manual/0002_app_privileges.sql` before applying it. It gives the server permission to insert and read leads, and authenticated users permission to select/update leads and select admin membership. RLS restricts authenticated access to the approved admins; anonymous visitors receive no table grants. No delete permission is granted.

For the connected project in this workspace, **0001 has been applied; 0002 has not been applied**. Permission changes are awaiting the owner's explicit approval. Until then, real consultation submissions cannot be saved successfully. Do not rerun 0001 on this database.

To prepare dashboard login, create a user in **Authentication → Users** yourself, then explicitly authorize admin membership for the intended account. The membership SQL is:

```sql
insert into public.admins (user_id) values ('YOUR-AUTH-USER-UUID');
```

The admin signs in at `/admin/login` using email and password. Creating a Supabase account alone does not grant dashboard access.

## Content and branding

All landing-page copy lives in `lib/i18n/ar.ts` and `lib/i18n/en.ts`. Their structures match and TypeScript checks the Arabic dictionary against the shared structure. Tests also compare nested keys, service counts and PULSE steps.

- Replace `public/logo-placeholder.svg` with your final SVG. The reserved logo slot is in `components/Logo.tsx`.
- Replace contact placeholders in both dictionaries. No fictional phone, email or street address is published.
- Replace zero-only statistics and case-study data with verified results. Case-study illustrations are CSS placeholders, not claimed client work. To add real project screenshots, replace `components/landing/WorkPreview.tsx` and keep an accessible localized image description.
- Shared tokens, resets, branding, buttons and form controls live in `app/globals.css`. Public-page layout, typography, breakpoints and pulse animation live in `app/[locale]/landing.css`. Dashboard-only styles live in `app/admin/admin.css` and are scoped under `.admin-page`.
- The Google Fonts stylesheet requests Sora and IBM Plex Sans Arabic with `display=swap`, with system fallbacks.
- Regenerate the share-card PNG after changing English hero copy with `npm.cmd run generate:og`. The generator reads the dictionary. The same branded image is used for both locales; the page title, description and Open Graph locale are localized.

## Form and API

The form validates on the client using the same rules as the server, then sends JSON to `/api/leads`:

```json
{
  "fullName": "Example name",
  "company": "Example company",
  "phone": "+962790000000",
  "email": "example@example.com",
  "service": "websites",
  "message": "Project goals",
  "website": ""
}
```

Service keys: `websites`, `marketing`, `ai-marketing`, `mobile-apps`, `automation`. Full name, phone and service are required. Company, email and message are optional. The `website` input is the hidden honeypot.

The UI uses its current dictionary for validation, success, server failure, rate-limit and network messages; raw server messages are never shown. Errors are linked to fields, the first invalid field receives focus, and submission states are announced accessibly.

The existing server validates before inserting with a server-only client and limits each visitor to five requests per minute per server instance. A multi-instance deployment should use a shared limiter if stricter distributed enforcement is required.

## Verify and deploy

```powershell
npm.cmd run build
npm.cmd run typecheck
npm.cmd test
npm.cmd start
```

`npm.cmd test` runs Playwright against the production server, reusing an existing local server if present. It verifies both locales at 320, 390, 768 and 1440 pixels, checks document direction, localized SEO, reduced motion, mobile navigation, section-preserving language switching and the form JSON/error contract. Form submissions in browser tests are intercepted; no test lead is inserted. Screenshots are saved under the ignored `artifacts/` directory.

For production, deploy to a Next.js-compatible Node platform, add the four environment variables, and build. Set `NEXT_PUBLIC_SITE_URL` to the final domain before building. All public routes are pre-rendered; API and admin routes run on the server. The language switch uses a normal link between the two locale documents and retains the currently visible section.

## Source structure

- `app/[locale]/`: locale document, metadata and landing-page stylesheet.
- `app/admin/`: dashboard routes, actions and scoped dashboard stylesheet.
- `components/landing/LandingPage.tsx`: composes the seven page sections, header and footer.
- `components/landing/*Section.tsx`: one server component per page section. Visual helpers are kept alongside them.
- `components/landing/Header.tsx` and `LeadForm.tsx`: the interactive client components. They receive only their required dictionary slices as props.
- `components/Logo.tsx`, `Icon.tsx` and `Document.tsx`: shared rendering primitives. The logo never loads dictionaries.
- `lib/i18n/index.ts`: server-only dictionary loader. `types.ts` holds shared types without runtime dictionary imports; `ar.ts` and `en.ts` contain the copy.
- `lib/supabase/`: server-side Supabase clients; `tests/`: browser verification.

Next.js is pinned to the compatible 15.5.28 patch. A scoped PostCSS 8.5.32 override avoids known vulnerable transitive versions while retaining Next.js 15. No UI library is used.
