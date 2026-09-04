-- Mabro Shop — per-product promotional landing pages
-- Safe to run more than once. Run this in the Supabase SQL editor, after
-- schema.sql. Adds one flexible jsonb column holding everything the rich
-- single-product promo template needs (hero, pain points, features, specs,
-- comparison, testimonials, order benefits, FAQ, countdown). When enabled
-- is false (or the column is empty), /product/[slug] falls back to the
-- plain product page — nothing changes for products that don't use this.

alter table products add column if not exists landing_page jsonb not null default '{"enabled": false}'::jsonb;
