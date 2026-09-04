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
