-- Adds an optional price column (Georgian lari, ₾) to products.
-- Run this in the Supabase SQL editor (DDL cannot be applied via the anon key).
alter table public.products
  add column if not exists price numeric;

comment on column public.products.price is 'Product price in Georgian lari (₾). Null hides the price in the UI.';
