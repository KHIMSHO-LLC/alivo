-- Adds a per-product FAQ list, editable from the admin Products tab.
-- Run this in the Supabase SQL editor (DDL cannot be applied via the anon key).
alter table public.products
  add column if not exists faqs jsonb not null default '[]';

comment on column public.products.faqs is
  'Per-product FAQ entries: [{ "question": {"en","ka"}, "answer": {"en","ka"} }]. Empty hides the section.';
