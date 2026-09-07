# New Client Checklist

Follow this for each new client. Nothing here needs Claude in the loop —
it's all clicks in GitHub / Supabase / Vercel dashboards, in order.

**Time estimate once you've done it twice:** ~15–20 minutes per client.

---

## 0. One-time setup (do this once, ever — not per client)

Turn this repo into a GitHub **template repository** so every new client
starts from a clean copy with no shared git history:

1. Go to **github.com/masumbillah5889-beep/mabroshop → Settings**
2. Scroll to the **Template repository** checkbox near the top → check it
   → Save

That's it. From now on, step 1 below becomes a one-click action.

---

## For each new client

### 1. Create their GitHub repo

- Go to the mabroshop repo page → green **"Use this template"** button →
  **"Create a new repository"**
- Name it for the client (e.g. `luvorab-shop`, `client-name-store`)
- Keep it **Private** (recommended)

No push, no token needed — GitHub copies the whole codebase instantly.

### 2. Create their Supabase project

- [supabase.com](https://supabase.com) → **New Project**
- Name it for the client, set a database password (save it somewhere),
  pick the closest region
- Wait ~1–2 minutes for it to finish provisioning

### 3. Run the database setup — ONE file, not six

- In the new project: **SQL Editor → New query**
- Open `supabase/00-full-setup.sql` from the new repo, copy the whole
  thing, paste, **Run**
- This creates every table, policy, and the demo catalog in one shot —
  safe to re-run if anything errors partway

### 4. Get the API keys

- **Project Settings → API**
- Copy the **Project URL** and the **anon / publishable** key
- (Only if this client wants **Fake Order Protection** / OTP: also copy
  the **secret** key — `sb_secret_...` — from the same page)

### 5. Create their admin login

- **Authentication → Users → Add user**
- Enter an email + password, check **Auto Confirm User**
- This is what the client (or you, on their behalf) logs into `/admin`
  with

### 6. Deploy to Vercel

- [vercel.com](https://vercel.com) → **Add New → Project** → import the
  new GitHub repo
- Before deploying, add **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL from step 4
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon key from step 4
  - `SUPABASE_SECRET_KEY` = the secret key from step 4 (only if doing OTP)
- **Deploy**

### 7. Set their branding — no code, no redeploy needed

- Visit `<their-site>.vercel.app/admin/login`, sign in with step 5's
  account
- Go to **থিম / ব্র্যান্ডিং** (`/admin/branding`): site name, logo, phone,
  WhatsApp, email, address, and the two brand colors
- Save — it's live immediately, the whole site re-themes on the next page
  load

### 8. Replace the demo catalog with their real one

- **ক্যাটাগরি**: edit each of the 8 (rename, new banner image, new trust
  points/testimonials/FAQ) — or delete what they don't need by making it
  inactive
- **প্রোডাক্ট**: edit or add their real products, prices, and photos
- Optional: build out a **Landing Page Builder** promo page for their
  best-selling products (`/admin/products/[id]/landing-page`)

### 9. Test before handing off

- Place a real test order through checkout, confirm it shows up in
  **অর্ডারসমূহ**
- Check the homepage and a couple of category pages on mobile
- If using addons (SMS, Facebook Pixel, etc.), send yourself a test order
  to confirm the SMS/tracking actually fires

---

## What's shared vs. what's per-client

- **Shared**: the codebase/template itself (this repo). Improvements you
  make for one client (a new feature, a bug fix) don't automatically
  reach the others — each is a frozen copy from whenever it was created.
  To push a fix to an already-live client, you'd `git pull` the change
  into their specific repo, or ask Claude to redo it there.
- **Per-client, fully independent**: GitHub repo, Supabase project
  (database + auth + storage), Vercel deployment, domain, branding, and
  catalog. One client's data, traffic, or a mistake in their admin panel
  can never affect another's.
