-- Mabro Shop — abandoned checkout tracking
-- Safe to run more than once. Run this after schema.sql.
--
-- Captures name/phone/address as a customer fills in the checkout form,
-- so a customer who leaves without finishing (page closed, changed mind,
-- payment issue) still shows up for the admin to follow up with by phone.
-- Upserted by phone number, so retyping/re-visiting updates the same row
-- rather than creating duplicates. Deleted automatically the moment the
-- same phone number completes a real order (see submitOrder in
-- lib/actions.ts) — this table is only ever customers who did NOT convert.

create table if not exists abandoned_checkouts (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  customer_phone text not null,
  customer_address text,
  delivery_zone text,
  cart_items jsonb not null default '[]'::jsonb,
  cart_total numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists idx_abandoned_checkouts_phone on abandoned_checkouts(customer_phone);

alter table abandoned_checkouts enable row level security;

-- Public (anonymous) checkout sessions need to write their own draft as
-- they type — same trust model as "Public can create orders" below.
drop policy if exists "Public can upsert abandoned checkouts" on abandoned_checkouts;
create policy "Public can upsert abandoned checkouts" on abandoned_checkouts
  for insert with check (true);
drop policy if exists "Public can update abandoned checkouts" on abandoned_checkouts;
create policy "Public can update abandoned checkouts" on abandoned_checkouts
  for update using (true);

-- Only the admin should ever be able to read these — this is the one
-- table in the schema that is pure PII with no order attached to it, so
-- it gets no public select policy at all.
drop policy if exists "Admins can read abandoned checkouts" on abandoned_checkouts;
create policy "Admins can read abandoned checkouts" on abandoned_checkouts
  for select using (auth.role() = 'authenticated');

-- Delete is public too — the same anonymous checkout session that created
-- a draft needs to clear it the moment it converts into a real order
-- (see submitOrder in lib/actions.ts). Same trust model as "Public can
-- create orders": nothing here is gated behind proving phone ownership,
-- consistent with how COD checkout already works throughout this schema.
-- The admin can delete any row too, to dismiss leads they've handled.
drop policy if exists "Public can delete abandoned checkouts" on abandoned_checkouts;
create policy "Public can delete abandoned checkouts" on abandoned_checkouts
  for delete using (true);
