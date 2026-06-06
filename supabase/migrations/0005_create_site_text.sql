-- Per-key overrides for site UI wordings, editable from the admin Wordings tab.
-- Keys are dot-paths into the dictionary JSON (e.g. "product.faq", "nav.home").
-- Missing rows fall back to the static en.json / ka.json defaults.
-- Run this in the Supabase SQL editor (DDL cannot be applied via the anon key).

create table if not exists public.site_text (
  key text primary key,
  en text,
  ka text,
  updated_at timestamptz default now()
);

comment on table public.site_text is
  'Overrides for UI wordings keyed by dot-path into the dictionary JSON. Empty/missing values fall back to static defaults.';

-- Row Level Security: public can read; writes go through the admin (anon key),
-- mirroring the categories/products/blogs tables.
alter table public.site_text enable row level security;

drop policy if exists "site_text public read" on public.site_text;
create policy "site_text public read" on public.site_text
  for select using (true);

drop policy if exists "site_text anon write" on public.site_text;
create policy "site_text anon write" on public.site_text
  for all using (true) with check (true);
