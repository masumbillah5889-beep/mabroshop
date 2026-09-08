# Mabro Shop — China Gadget Dropshipping Store

Next.js 15 (App Router) + TypeScript + Tailwind + Supabase. Built to match the
category structure and checkout flow from the reference screenshots (Biz Care
IT demo), styled in the navy + orange / 3D-tilt look already established for
your other projects.

The site works right now with realistic demo data, with **no setup required** —
run `npm install && npm run dev` and every page (storefront + admin) is fully
browsable. Connecting Supabase (steps below) switches it from demo data to
your real, editable catalog.

---

## 1. Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. The whole storefront works immediately on demo
data (8 categories, 16 sample products, 7 sample orders) — nothing to
configure yet.

## 2. Connect Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, go to **SQL Editor → New query**, paste the
   contents of `supabase/schema.sql`, and run it.
3. Run `supabase/seed.sql` the same way — it loads the same 8 categories and
   16 products you're already seeing in demo mode, so nothing visually
   changes, but it's now real, editable data in your database.
4. Run `supabase/storage.sql` the same way — this sets up the `images`
   storage bucket the admin panel's photo upload uses. Skip this and the
   upload button will fail with a storage error (you can still paste an
   image URL directly instead).
5. Run `supabase/otp.sql` the same way — only needed if you'll use the
   **Fake Order Protection** addon (OTP verification at checkout). Skip it
   if you won't use that one.
6. Run `supabase/landing-pages.sql` the same way — adds testimonials and
   FAQ to each category's landing page, with demo content pre-filled (it's
   an UPDATE, so it works whether you ran seed.sql before or after this
   file existed).
7. Go to **Project Settings → API** and copy the **Project URL** and
   **anon public** key.
8. Copy `.env.example` to `.env.local` and paste those two values in.
9. Restart `npm run dev`. The site now reads/writes real data — the orange
   "demo mode" banner in `/admin` disappears once you're logged in.

### Extra setup for Fake Order Protection / order SMS (optional)

These two addons need one more, separate key — the **secret** key
(`sb_secret_...`, under Project Settings → API — different from the
publishable/anon key and must never be exposed to the browser). Add it as
`SUPABASE_SECRET_KEY` in `.env.local` (and later in Vercel's env vars).
Without it, both addons show a clear "not set up yet" message instead of
failing silently — the rest of the site is unaffected either way.

### Creating your admin login

Supabase Auth needs at least one user before you can sign in to `/admin`:

- Dashboard → **Authentication → Users → Add user** → enter an email +
  password. That's the login for `/admin/login`.
- Every page under `/admin` is already gated by `middleware.ts` — signed-out
  visitors are redirected to `/admin/login` automatically.

### Before Supabase is connected

`/admin` pages render with demo data (7 sample orders across all three
supplier statuses, so you can see the **Send to Supplier** tabs and totals
working) — but the login form itself and any "save" action are disabled with
an inline note, since there's no account system yet to check a password
against.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Mabro Shop storefront + admin"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

`.env.local` is already in `.gitignore` (from `create-next-app`'s default) —
your Supabase keys won't get pushed.

## 4. Deploy (Vercel is the natural fit for Next.js)

1. [vercel.com](https://vercel.com) → New Project → import the GitHub repo.
2. Add the two env vars from `.env.local` under **Settings → Environment
   Variables**.
3. Deploy. Every push to `main` redeploys automatically.

**Admin changes show up immediately, no redeploy needed** — every save in
`/admin` (products, categories, branding, addons, hero) tells Next.js to
refresh the cached public pages right away. If you ever edit the database
directly (bypassing the admin forms), that change won't show until the next
deploy or a manual redeploy.

---

## What's built

- **Storefront**: homepage (hero, trust strip, featured products, a
  "Popular Category" row of circular category icons, then a dedicated
  section per category — full-width banner on top, generic trust badges,
  then its own 6 best products below — matching the Biz Care IT reference
  site's layout exactly), one flexible category landing page template at
  `/category/[slug]` driving all 8 categories from the database — banner,
  tagline, trust points, product grid, **testimonials, FAQ, and a closing
  CTA banner** — instead of 8 hand-coded pages, product detail page, cart,
  checkout (Dhaka inside/outside delivery zones, COD / online payment
  choice), order confirmation.
- **Admin** (`/admin`, Supabase-Auth gated): dashboard with stats,
  **Send to Supplier** page — the Approved / Delivered / Cancelled tabs you
  asked for, each order broken into its line items with per-product price and
  a running total per tab — orders list with a "send to supplier" action
  and a **repeat-customer badge** (same phone number on more than one
  order, shown right next to the order),
  full product management (list, add, **edit, delete**, real **photo
  upload** to Supabase Storage — or paste a URL directly, e.g. from a
  supplier's listing), full category management (list, **edit** — including
  a trust-points editor, **testimonials editor, and FAQ editor**, plus
  banner photo upload), a homepage hero editor with **two switchable modes**
  — the original headline + product-spotlight design, or an admin-uploaded
  banner image (same pattern as category banners) — and
  an **Addons** page — toggle Facebook Pixel, Google Tag Manager, Google Ads
  conversion tracking, installable PWA support, an OTP-verified **Fake Order
  Protection** step at checkout + **order confirmation SMS** (both via
  BulkSMSBD — real, working integration, confirmed against their actual
  API), a real-stock-based **low-stock urgency badge** on product
  cards/pages, and an **AI Calling** settings panel (UI only for now — see
  next steps).
- **Product Landing Page Builder**: any product can have a full promotional
  page instead of the plain product page — hero with image gallery, pain
  points, features, specs table, comparison table, testimonials, order
  benefits, a call/WhatsApp contact card, FAQ, and a live countdown timer
  with a mobile sticky order bar. 5 products already have this turned on
  with real content (Laptop Mobile Desk Setup, 3-in-1 Juicer Grinder, Smart
  Bulb + Plug Starter Pack, Smart Baby Monitor Camera, Smart Fitness Band
  X2) — visit any of their product pages to see it live. **Full admin
  editor** at `/admin/products/[id]/landing-page` (linked from each
  product's edit page) — every section above is add/remove/edit, including
  a datetime picker for the countdown and multi-image gallery upload.
- **Design system**: navy (`--color-ink`) + orange (`--color-signal`) tokens
  in `app/globals.css`, Space Grotesk / Plus Jakarta Sans / Hind Siliguri
  fonts, and a genuine 3D mouse-tilt effect (`components/ui/TiltCard.tsx`) on
  product cards and the hero — the same interaction style already built for
  ihda-mart's landing pages, not a literal 3D/WebGL product viewer (that's a
  much bigger, separate undertaking — say the word if you actually want that
  instead).
- **Theme / Branding system** (`/admin/branding`) — the codebase is now
  reusable as a base for other client sites without touching code. One
  admin page controls: site name, logo, phone, WhatsApp, email, address,
  and two colors (primary + accent — every lighter/darker shade used
  throughout the site is computed from just those two). Colors apply
  instantly on page load, no rebuild needed. See "Reusing this for another
  client" below.

## Reusing this for another client

Since each client gets their own separate deployment (their own GitHub
repo, Vercel project, and Supabase project — not a shared multi-tenant
platform), see **[NEW-CLIENT-CHECKLIST.md](./NEW-CLIENT-CHECKLIST.md)**
for the full step-by-step (one combined SQL file instead of six, GitHub's
"Use this template" button instead of a manual push, then branding +
catalog). ~15–20 minutes per client once you've done it twice.

One thing it doesn't cover yet: `public/manifest.json` and the PWA icons
(`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) are static files,
so a client using the PWA addon needs those swapped by hand (or ask me to
generate a set per client).

## What's not built yet — next steps

- **AI Calling** — the admin toggle and settings fields exist
  (`/admin/addons`), but the actual call-triggering logic isn't wired yet.
  This is provider-specific (EasyPBX, Twilio, etc. all have different APIs)
  — say which provider and it's a focused follow-up, same pattern as the
  EasyPBX integration already built for ihda-mart.
- Category **creation** (categories can be edited but not added/removed from
  the admin UI yet — the 8 from your screenshots are fixed for now)
- SSLCommerz online payment integration (checkout UI has the option; wiring
  the actual payment session is the same pattern used on ihda-mart)
- Real order tracking lookup (`/track-order` has the search UI; it needs to
  query the `orders` table by phone/order number)
- Courier API integration (Steadfast/Pathao, as done on ihda-mart)
- Real product photography — product images are still placehold.co
  placeholders. **7 of the 8 category banners are now real** (designed
  graphics in `public/banners/`, not placeholders) — **Fitness Gadget's
  banner still needs a real design**; the file uploaded for it turned out
  to be a duplicate of the Photography banner, so it's on the placeholder
  for now until a real one is provided.

## Project structure

```
app/                    routes (App Router)
  category/[slug]/      the one template serving all 8 categories
  product/[slug]/       product detail
  cart/ checkout/ order-confirmation/[orderNumber]/
  admin/
    login/              standalone, no sidebar
    (dashboard)/        sidebar-wrapped, auth-gated — dashboard, orders,
                         send-to-supplier, products, categories, homepage
components/             organized by area (layout, home, category, product,
                         admin, ui)
lib/
  supabase/             client.ts (browser) + server.ts (server components)
  data.ts               every query — falls back to mock data automatically
                         when Supabase env vars aren't set
  mock-data.ts / mock-orders.ts   the demo dataset
  actions.ts             server actions (submitOrder, updateSupplierStatus, …)
  cart-context.tsx       client-side cart (localStorage-backed)
supabase/
  schema.sql             tables + row-level security policies
  seed.sql                demo catalog, matching mock-data.ts
```
