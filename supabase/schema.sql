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
