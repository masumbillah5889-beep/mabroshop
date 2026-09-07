-- ============================================================
-- Mabro Shop theme — FULL SETUP (run this ONE file for a new client)
-- ============================================================
-- Paste this whole file into a new Supabase project's SQL Editor and hit
-- Run, once. It combines every migration in the right order:
--   schema -> seed (demo catalog) -> storage -> otp -> landing pages
--
-- Safe to re-run on the same project if something fails partway — every
-- statement in here uses IF NOT EXISTS / ON CONFLICT / DROP-then-CREATE,
-- so running it twice won't duplicate or error out.
--
-- After this, the client's own catalog replaces the demo one via the admin
-- panel — see NEW-CLIENT-CHECKLIST.md for the rest of the steps (env vars,
-- branding, etc).
-- ============================================================

-- ============================================================
-- FROM: supabase/schema.sql
-- ============================================================
-- Mabro Shop — Supabase schema
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- before running seed.sql.

create extension if not exists "pgcrypto";

-- ---------- Categories ----------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  tagline text,
  description text,
  banner_image_url text,
  trust_points jsonb not null default '[]'::jsonb, -- [{icon,title,description}]
  testimonials jsonb not null default '[]'::jsonb, -- [{name,quote,rating}]
  faqs jsonb not null default '[]'::jsonb, -- [{question,answer}]
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- Products ----------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  sku text,
  stock_quantity int not null default 0,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  landing_page jsonb not null default '{"enabled": false}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_products_category on products(category_id);

-- ---------- Product images ----------
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  display_order int not null default 0,
  is_primary boolean not null default false
);
create index if not exists idx_product_images_product on product_images(product_id);

-- ---------- Site content (homepage hero / any "zero section" CMS block) ----------
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null, -- e.g. 'homepage_hero'
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- Suppliers (optional — for when there's more than one) ----------
create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_info text,
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- Orders ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number serial unique,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  delivery_zone text not null check (delivery_zone in ('inside_dhaka','outside_dhaka')),
  delivery_charge numeric(10,2) not null default 0,
  subtotal numeric(10,2) not null,
  total numeric(10,2) not null,
  payment_method text not null check (payment_method in ('cod','online')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','failed')),
  order_status text not null default 'pending' check (order_status in ('pending','processing','shipped','completed','cancelled')),
  supplier_id uuid references suppliers(id),
  supplier_status text not null default 'not_sent' check (supplier_status in ('not_sent','approved','delivered','cancelled')),
  supplier_sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_orders_supplier_status on orders(supplier_status);

-- ---------- Order items ----------
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,   -- snapshot at time of order
  unit_price numeric(10,2) not null, -- snapshot at time of order (customer-facing price)
  quantity int not null default 1,
  supplier_price numeric(10,2), -- what the supplier charges per unit, for cost accounting
  line_total numeric(10,2) generated always as (unit_price * quantity) stored
);
create index if not exists idx_order_items_order on order_items(order_id);

-- ================= Row Level Security =================
-- Public storefront needs read-only access to catalog data.
-- Orders are insert-only from the public (checkout) and fully readable/writable
-- only by authenticated admins. Adjust if you add customer accounts later.

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table site_content enable row level security;
alter table suppliers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

drop policy if exists "Public can read active categories" on categories;
create policy "Public can read active categories" on categories
  for select using (is_active = true);
drop policy if exists "Admins can manage categories" on categories;
create policy "Admins can manage categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read active products" on products;
create policy "Public can read active products" on products
  for select using (is_active = true);
drop policy if exists "Admins can manage products" on products;
create policy "Admins can manage products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read product images" on product_images;
create policy "Public can read product images" on product_images
  for select using (true);
drop policy if exists "Admins can manage product images" on product_images;
create policy "Admins can manage product images" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read site content" on site_content;
create policy "Public can read site content" on site_content
  for select using (true);
drop policy if exists "Admins can manage site content" on site_content;
create policy "Admins can manage site content" on site_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Admins can manage suppliers" on suppliers;
create policy "Admins can manage suppliers" on suppliers
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can create orders" on orders;
create policy "Public can create orders" on orders
  for insert with check (true);
drop policy if exists "Admins can read orders" on orders;
create policy "Admins can read orders" on orders
  for select using (auth.role() = 'authenticated');
drop policy if exists "Admins can update orders" on orders;
create policy "Admins can update orders" on orders
  for update using (auth.role() = 'authenticated');

drop policy if exists "Public can create order items" on order_items;
create policy "Public can create order items" on order_items
  for insert with check (true);
drop policy if exists "Admins can read order items" on order_items;
create policy "Admins can read order items" on order_items
  for select using (auth.role() = 'authenticated');


-- ============================================================
-- FROM: supabase/seed.sql
-- ============================================================
-- Mabro Shop — demo seed data
-- Run after schema.sql. Safe to re-run (uses ON CONFLICT DO NOTHING on slugs).
-- Replace with real inventory via the admin panel once the client is ready.

insert into categories (name, slug, tagline, description, banner_image_url, display_order, trust_points) values
('Camera & Photography', 'camera-photography', 'Shoot like a creator, not a tourist',
 'Mirrorless bodies, vlogging rigs and lens kits picked for people who post — not just people who point and shoot.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Camera+%26+Photography', 1,
 '[{"icon":"ShieldCheck","title":"৭ দিনের রিপ্লেসমেন্ট","description":"ত্রুটিপূর্ণ প্রোডাক্ট হলে ৭ দিনের মধ্যে পরিবর্তন।"},{"icon":"Truck","title":"সারাদেশে ডেলিভারি","description":"ঢাকার ভিতরে ১-২ দিন, বাইরে ৩-৫ দিন।"},{"icon":"BadgeCheck","title":"টেস্টেড ইউনিট","description":"প্রতিটি ক্যামেরা শিপ করার আগে চালিয়ে পরীক্ষা করা হয়।"}]'::jsonb),
('Laptop & Computer Gadget', 'laptop-computer-gadget', 'Desk setups that actually get built',
 'Laptop stands, docks, and full workstation combos for people who work from three different rooms a week.',
 'https://placehold.co/800x800/17335e/ffffff?text=Laptop+%26+Computer', 2,
 '[{"icon":"ShieldCheck","title":"১ বছর ওয়ারেন্টি","description":"সকল ইলেকট্রনিক আইটেমে নির্মাতার ওয়ারেন্টি।"},{"icon":"Truck","title":"ফ্রি শিপিং ৳২০০০+","description":"নির্দিষ্ট অঙ্কের বেশি অর্ডারে ডেলিভারি চার্জ মাফ।"},{"icon":"Headset","title":"সেটআপ সাপোর্ট","description":"হোয়াটসঅ্যাপে ফ্রি সেটআপ গাইড।"}]'::jsonb),
('Smart Home Gadgets', 'smart-home-gadgets', 'A home that responds when you talk to it',
 'Smart bulbs, plugs, and sensors that install in minutes and don''t need an engineer to maintain.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Smart+Home', 3,
 '[{"icon":"Wifi","title":"অ্যাপ দিয়ে কন্ট্রোল","description":"যেকোনো জায়গা থেকে মোবাইল অ্যাপে নিয়ন্ত্রণ।"},{"icon":"ShieldCheck","title":"সেফটি সার্টিফাইড","description":"ফায়ার-সেফ ওয়্যারিং ও ওভারলোড প্রোটেকশন।"},{"icon":"Truck","title":"ক্যাশ অন ডেলিভারি","description":"হাতে পেয়ে টাকা দিন, কোনো ঝুঁকি নেই।"}]'::jsonb),
('Kitchen Gadgets', 'kitchen-gadgets', 'Less prep time, same taste',
 'Choppers, grinders and electric essentials that cut kitchen time down without cutting corners.',
 'https://placehold.co/800x800/e0550a/ffffff?text=Kitchen+Gadgets', 4,
 '[{"icon":"ShieldCheck","title":"ফুড-গ্রেড উপাদান","description":"BPA-মুক্ত, নিরাপদ প্লাস্টিক ও স্টেইনলেস স্টিল।"},{"icon":"Truck","title":"৪৮ ঘণ্টায় ডেলিভারি","description":"ঢাকার ভিতরে অর্ডারের পরদিনই হাতে পাবেন।"},{"icon":"BadgeCheck","title":"১৫,০০০+ অর্ডার","description":"প্রতি মাসে হাজারো ক্রেতা পুনরায় অর্ডার করেন।"}]'::jsonb),
('Personal Care Gadget', 'personal-care-gadget', 'Salon routines, done at home',
 'Trimmers, styling tools and grooming devices that pay for themselves in a couple of salon visits.',
 'https://placehold.co/800x800/17335e/ffffff?text=Personal+Care', 5,
 '[{"icon":"ShieldCheck","title":"স্কিন-সেফ","description":"ডার্মাটোলজিক্যালি টেস্টেড উপাদান।"},{"icon":"Truck","title":"ডিসক্রিট প্যাকেজিং","description":"প্লেইন প্যাকেজে ডেলিভারি, প্রাইভেসি বজায় থাকে।"},{"icon":"Headset","title":"সহজ রিটার্ন","description":"না পছন্দ হলে সহজ শর্তে রিটার্ন।"}]'::jsonb),
('Fitness Gadget', 'fitness-gadget', 'Track it, or it didn''t happen',
 'Smartwatches, bands and home-gym accessories for people who like their progress in numbers.',
 'https://placehold.co/800x800/0e1f3c/ffffff?text=Fitness+Gadget', 6,
 '[{"icon":"BadgeCheck","title":"নির্ভুল ট্র্যাকিং","description":"হার্টরেট, স্টেপস ও ক্যালরি নিখুঁতভাবে পরিমাপ।"},{"icon":"ShieldCheck","title":"ওয়াটার রেজিস্ট্যান্ট","description":"ঘাম ও হালকা বৃষ্টিতে নিশ্চিন্তে ব্যবহার।"},{"icon":"Truck","title":"৭ দিন এক্সচেঞ্জ","description":"সাইজ বা মডেল না মিললে বদলে নিন।"}]'::jsonb),
('Baby & Kids Gadget', 'baby-kids-gadget', 'Peace of mind, in one small device',
 'Monitors, feeders and safety gadgets chosen for parents who check twice before adding anything to the crib.',
 'https://placehold.co/800x800/e0550a/ffffff?text=Baby+%26+Kids', 7,
 '[{"icon":"ShieldCheck","title":"নন-টক্সিক","description":"শিশুদের জন্য নিরাপদ, পরীক্ষিত উপকরণ।"},{"icon":"Truck","title":"প্রায়োরিটি ডেলিভারি","description":"বেবি অর্ডার আলাদাভাবে দ্রুত পাঠানো হয়।"},{"icon":"Headset","title":"প্যারেন্ট সাপোর্ট","description":"ব্যবহারবিধি নিয়ে হোয়াটসঅ্যাপে সরাসরি সহায়তা।"}]'::jsonb),
('Gaming Gadget', 'gaming-gadget', 'Built for the 2 a.m. ranked match',
 'Controllers, headsets and RGB peripherals for setups that need to look as good as they perform.',
 'https://placehold.co/800x800/17335e/ffffff?text=Gaming+Gadget', 8,
 '[{"icon":"BadgeCheck","title":"লো-ল্যাটেন্সি","description":"প্রতিটি ডিভাইস রেসপন্স টাইম টেস্ট করে পাস করা।"},{"icon":"ShieldCheck","title":"৬ মাস ওয়ারেন্টি","description":"হার্ডওয়্যার ত্রুটিতে ফ্রি সার্ভিসিং।"},{"icon":"Truck","title":"সারাদেশে ডেলিভারি","description":"৬৪ জেলাতেই কুরিয়ারে পাঠানো হয়।"}]'::jsonb)
on conflict (slug) do nothing;

-- ---------- Products (2 per category) ----------
insert into products (category_id, name, slug, price, compare_at_price, description, is_featured, stock_quantity)
select id, 'Content Creator Mirrorless Kit', 'content-creator-mirrorless-kit', 19999, 24999,
  'আসল প্রোডাক্ট, আসল ছবি। অর্ডার করার আগে হোয়াটসঅ্যাপে চ্যাট করে যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।', true, 24
  from categories where slug = 'camera-photography'
union all
select id, 'Vlogging Camera + Mic Combo', 'vlogging-camera-mic-combo', 14000, 17500, null, false, 18
  from categories where slug = 'camera-photography'
union all
select id, 'Laptop Mobile Desk Setup', 'laptop-mobile-desk-setup', 50000, 69999, null, true, 12
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Complete Digital Workstation', 'complete-digital-workstation', 50000, 58000, null, false, 9
  from categories where slug = 'laptop-computer-gadget'
union all
select id, 'Smart Bulb + Plug Starter Pack', 'smart-bulb-plug-starter-pack', 2499, 3200, null, true, 40
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'WiFi Video Doorbell', 'wifi-video-doorbell', 4200, null, null, false, 22
  from categories where slug = 'smart-home-gadgets'
union all
select id, 'Electric Vegetable Chopper', 'electric-vegetable-chopper', 1450, 1900, null, true, 60
  from categories where slug = 'kitchen-gadgets'
union all
select id, '3-in-1 Juicer Grinder', '3-in-1-juicer-grinder', 3200, 3900, null, false, 30
  from categories where slug = 'kitchen-gadgets'
union all
select id, 'Cordless Hair Trimmer Pro', 'cordless-hair-trimmer-pro', 1650, 2100, null, true, 45
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Facial Steamer + Cleanser Set', 'facial-steamer-cleanser-set', 2100, null, null, false, 20
  from categories where slug = 'personal-care-gadget'
union all
select id, 'Smart Fitness Band X2', 'smart-fitness-band-x2', 1899, 2500, null, true, 50
  from categories where slug = 'fitness-gadget'
union all
select id, 'Adjustable Resistance Band Set', 'adjustable-resistance-band-set', 990, 1300, null, false, 35
  from categories where slug = 'fitness-gadget'
union all
select id, 'Smart Baby Monitor Camera', 'smart-baby-monitor-camera', 3600, 4500, null, true, 15
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'Portable Bottle Warmer', 'portable-bottle-warmer', 1350, null, null, false, 25
  from categories where slug = 'baby-kids-gadget'
union all
select id, 'RGB Wireless Gaming Controller', 'rgb-wireless-gaming-controller', 2450, 3100, null, true, 33
  from categories where slug = 'gaming-gadget'
union all
select id, '7.1 Surround Gaming Headset', '7-1-surround-gaming-headset', 2900, 3600, null, false, 28
  from categories where slug = 'gaming-gadget'
on conflict (slug) do nothing;

-- ---------- One placeholder image per product ----------
insert into product_images (product_id, image_url, is_primary, display_order)
select id, 'https://placehold.co/800x800/0e1f3c/ffffff?text=' || replace(name, ' ', '+'), true, 0
from products
where not exists (select 1 from product_images where product_images.product_id = products.id);

-- ---------- Homepage hero content (the "zero section") ----------
insert into site_content (section_key, content) values
('homepage_hero', '{
  "eyebrow": "১০,০০০+ সন্তুষ্ট গ্রাহক",
  "headline": "যে গ্যাজেট আজ অর্ডার করবেন, হাতে পাবেন হাতে টাকা দিয়ে",
  "subtitle": "ক্যামেরা থেকে স্মার্ট হোম, কিচেন থেকে গেমিং — যাচাই করা কোয়ালিটি, ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে।"
}'::jsonb)
on conflict (section_key) do nothing;


-- ============================================================
-- FROM: supabase/storage.sql
-- ============================================================
-- Mabro Shop — image upload storage
-- Safe to run more than once. Run this in the Supabase SQL editor, after
-- schema.sql. Sets up a public bucket for product/category photos uploaded
-- from the admin panel.

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

-- Anyone can view images (needed so product photos load on the public site)
drop policy if exists "Public can view images" on storage.objects;
create policy "Public can view images"
on storage.objects for select
using (bucket_id = 'images');

-- Only signed-in admins can upload, replace, or remove images
drop policy if exists "Admins can upload images" on storage.objects;
create policy "Admins can upload images"
on storage.objects for insert
with check (bucket_id = 'images' and auth.role() = 'authenticated');

drop policy if exists "Admins can update images" on storage.objects;
create policy "Admins can update images"
on storage.objects for update
using (bucket_id = 'images' and auth.role() = 'authenticated');

drop policy if exists "Admins can delete images" on storage.objects;
create policy "Admins can delete images"
on storage.objects for delete
using (bucket_id = 'images' and auth.role() = 'authenticated');


-- ============================================================
-- FROM: supabase/otp.sql
-- ============================================================
-- Mabro Shop — OTP verification (Fake Order Protection)
-- Run this once in the Supabase SQL editor, after schema.sql.

create table if not exists otp_verifications (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code text not null,
  verified boolean not null default false,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_otp_phone on otp_verifications(phone);

-- Deliberately NO policies for the public/anon key. This table is only ever
-- read or written through the server-only secret-key client (see
-- lib/supabase/admin.ts) — if the anon key could read it, anyone could look
-- up a valid code without ever receiving the SMS, defeating the whole point.
alter table otp_verifications enable row level security;


-- ============================================================
-- FROM: supabase/landing-pages.sql
-- ============================================================
-- Mabro Shop — richer category landing pages (testimonials + FAQ)
-- Safe to run more than once. Run this in the Supabase SQL editor, after
-- schema.sql. Adds two columns, then backfills demo testimonials/FAQs onto
-- your existing 8 categories (UPDATE, not INSERT — works whether you ran
-- seed.sql before or after this file exists).

alter table categories add column if not exists testimonials jsonb not null default '[]'::jsonb;
alter table categories add column if not exists faqs jsonb not null default '[]'::jsonb;

update categories set
  testimonials = '[
    {"name":"রাফসান আহমেদ","quote":"প্রথমে সন্দেহ ছিল, কিন্তু ক্যামেরার কোয়ালিটি একদম রিভিউর মতোই। ভিডিও শার্প এসেছে।","rating":5},
    {"name":"নুসরাত জাহান","quote":"ডেলিভারি দ্রুত পেয়েছি, প্যাকেজিং ভালো ছিল। রেকমেন্ড করব।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"সেকেন্ড হ্যান্ড না নতুন প্রোডাক্ট?","answer":"সব প্রোডাক্ট একদম নতুন, আনবক্সিং থেকে শুরু করে আপনার সামনে টেস্ট করে পাঠানো হয়।"},
    {"question":"ওয়ারেন্টি আছে কি?","answer":"হ্যাঁ, প্রতিটি ক্যামেরায় নির্মাতার ওয়ারেন্টি থাকে, বিস্তারিত প্রোডাক্ট পেজে দেওয়া আছে।"},
    {"question":"ভিডিওগ্রাফির জন্য কোনটা ভালো হবে?","answer":"হোয়াটসঅ্যাপে আপনার বাজেট ও প্রয়োজন বললে আমরা সাজেস্ট করে দেব।"}
  ]'::jsonb
where slug = 'camera-photography';

update categories set
  testimonials = '[
    {"name":"ইমরান হোসেন","quote":"ডেস্ক সেটআপটা অর্ডার করেছিলাম, একদম প্রফেশনাল লাগছে এখন আমার হোম অফিস।","rating":5},
    {"name":"তানজিলা রহমান","quote":"স্টুডেন্ট হিসেবে বাজেটের মধ্যে ভালো কম্বো পেয়েছি।","rating":4}
  ]'::jsonb,
  faqs = '[
    {"question":"সেটআপ করতে কি টেকনিশিয়ান লাগবে?","answer":"না, সব প্রোডাক্টের সাথে সহজ গাইড দেওয়া থাকে, নিজেই ৫-১০ মিনিটে সেট করতে পারবেন।"},
    {"question":"কোনো ব্র্যান্ডের ল্যাপটপের সাথে কম্প্যাটিবল?","answer":"প্রায় সব ব্র্যান্ডের ল্যাপটপের সাথে কাজ করে, নির্দিষ্ট মডেল নিয়ে সন্দেহ থাকলে হোয়াটসঅ্যাপে জিজ্ঞাসা করুন।"},
    {"question":"ইএমআই সুবিধা আছে?","answer":"বর্তমানে ক্যাশ অন ডেলিভারি ও অনলাইন পেমেন্ট সুবিধা আছে।"}
  ]'::jsonb
where slug = 'laptop-computer-gadget';

update categories set
  testimonials = '[
    {"name":"ফারহান কবির","quote":"মোবাইল দিয়ে লাইট কন্ট্রোল করতে পারছি, বাসায় সবাই অবাক হয়ে গেছে।","rating":5},
    {"name":"সাদিয়া ইসলাম","quote":"ইনস্টল করা খুব সহজ ছিল, কোনো ওয়্যারিং লাগেনি।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"ইন্টারনেট ছাড়া কাজ করবে?","answer":"কন্ট্রোলের জন্য ওয়াইফাই লাগবে, তবে সাধারণ সুইচ হিসেবেও ব্যবহার করা যায়।"},
    {"question":"পুরনো বাসার ওয়্যারিং এ কাজ করবে?","answer":"হ্যাঁ, বেশিরভাগ প্রোডাক্ট স্ট্যান্ডার্ড সুইচবোর্ডে বসানো যায়, নির্দিষ্ট প্রশ্ন থাকলে ছবি পাঠান।"}
  ]'::jsonb
where slug = 'smart-home-gadgets';

update categories set
  testimonials = '[
    {"name":"রুমানা আক্তার","quote":"সবজি কাটা এখন অনেক সহজ, প্রতিদিন ব্যবহার করছি।","rating":5},
    {"name":"কামরুল হাসান","quote":"দাম অনুযায়ী পারফরম্যান্স খুব ভালো।","rating":4}
  ]'::jsonb,
  faqs = '[
    {"question":"মেশিন পরিষ্কার করা কি কঠিন?","answer":"না, বেশিরভাগ পার্টস খুলে পানি দিয়ে ধোয়া যায়।"},
    {"question":"ওয়ারেন্টি কতদিনের?","answer":"প্রোডাক্ট অনুযায়ী ভিন্ন, বিস্তারিত প্রোডাক্ট পেজে দেওয়া আছে।"}
  ]'::jsonb
where slug = 'kitchen-gadgets';

update categories set
  testimonials = '[
    {"name":"নাদিয়া সুলতানা","quote":"পার্লারে না গিয়ে বাসায় নিজেই করতে পারছি, টাকাও বাঁচছে।","rating":5},
    {"name":"শাকিল আহমেদ","quote":"ট্রিমারটা ভালো কোয়ালিটির, বেশ কিছুদিন ধরে ব্যবহার করছি।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"প্যাকেজিং কি বোঝা যায় ভেতরে কী আছে?","answer":"না, সম্পূর্ণ প্লেইন প্যাকেজিং এ পাঠানো হয়, প্রাইভেসি বজায় থাকে।"},
    {"question":"সেনসিটিভ স্কিনে ব্যবহার করা যাবে?","answer":"প্রোডাক্ট বিবরণে উপাদান উল্লেখ করা থাকে, নির্দিষ্ট সমস্যা থাকলে আগে জিজ্ঞাসা করে নিন।"}
  ]'::jsonb
where slug = 'personal-care-gadget';

update categories set
  testimonials = '[
    {"name":"তাহমিদ রহমান","quote":"প্রতিদিনের স্টেপ ও হার্টরেট ট্র্যাক করতে পারছি, একদম নির্ভুল মনে হয়েছে।","rating":5},
    {"name":"মিথিলা চৌধুরী","quote":"দাম কম হলেও ফিচার অনেক, ভালো লেগেছে।","rating":4}
  ]'::jsonb,
  faqs = '[
    {"question":"সাঁতার কাটার সময় পরা যাবে?","answer":"ওয়াটার রেজিস্ট্যান্ট মডেলগুলোতে যাবে, প্রোডাক্ট পেজে উল্লেখ করা থাকে।"},
    {"question":"মোবাইলে অ্যাপ লাগবে?","answer":"হ্যাঁ, একটা ফ্রি অ্যাপ দিয়ে কানেক্ট করতে হয়, সেটআপ গাইড বক্সে দেওয়া থাকে।"}
  ]'::jsonb
where slug = 'fitness-gadget';

update categories set
  testimonials = '[
    {"name":"শারমিন আক্তার","quote":"বাচ্চার ঘুমের সময় মনিটর দিয়ে দেখতে পারি, মনে অনেক শান্তি লাগে।","rating":5},
    {"name":"রাকিব হাসান","quote":"কোয়ালিটি ভালো, বাচ্চার জন্য নিরাপদ মনে হয়েছে।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"প্রোডাক্ট কি BPA-মুক্ত?","answer":"হ্যাঁ, শিশুদের প্রোডাক্টে নিরাপদ, পরীক্ষিত উপকরণ ব্যবহার করা হয়।"},
    {"question":"দ্রুত ডেলিভারি সম্ভব?","answer":"বেবি অর্ডার প্রায়োরিটি হিসেবে পাঠানো হয়, সাধারণত দ্রুততম সময়ে পৌঁছে যায়।"}
  ]'::jsonb
where slug = 'baby-kids-gadget';

update categories set
  testimonials = '[
    {"name":"আরিফুল ইসলাম","quote":"কন্ট্রোলারের রেসপন্স টাইম খুব ভালো, গেমিং এক্সপেরিয়েন্স বদলে গেছে।","rating":5},
    {"name":"নাফিজ রহমান","quote":"হেডসেটের সাউন্ড কোয়ালিটি এই দামে আশা করিনি।","rating":5}
  ]'::jsonb,
  faqs = '[
    {"question":"PC ও কনসোল দুটোতেই চলবে?","answer":"বেশিরভাগ প্রোডাক্ট PC ও কনসোল দুটোতেই কম্প্যাটিবল, নির্দিষ্ট প্রোডাক্ট পেজে উল্লেখ করা থাকে।"},
    {"question":"ওয়ারেন্টি ক্লেইম কীভাবে করব?","answer":"হোয়াটসঅ্যাপে অর্ডার নাম্বার সহ যোগাযোগ করলেই ওয়ারেন্টি প্রসেস শুরু হয়ে যাবে।"}
  ]'::jsonb
where slug = 'gaming-gadget';


-- ============================================================
-- FROM: supabase/product-landing-pages.sql
-- ============================================================
-- Mabro Shop — per-product promotional landing pages
-- Safe to run more than once. Run this in the Supabase SQL editor, after
-- schema.sql. Adds one flexible jsonb column holding everything the rich
-- single-product promo template needs (hero, pain points, features, specs,
-- comparison, testimonials, order benefits, FAQ, countdown). When enabled
-- is false (or the column is empty), /product/[slug] falls back to the
-- plain product page — nothing changes for products that don't use this.

alter table products add column if not exists landing_page jsonb not null default '{"enabled": false}'::jsonb;


