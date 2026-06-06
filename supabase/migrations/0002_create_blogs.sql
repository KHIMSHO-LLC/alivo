-- Blog posts authored from the admin panel.
-- Run this in the Supabase SQL editor (DDL cannot be applied via the anon key).

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  date date not null default current_date,
  title jsonb not null,            -- { "en": "...", "ka": "..." }
  summary jsonb not null,          -- { "en": "...", "ka": "..." }
  category jsonb not null,         -- { "en": "...", "ka": "..." }
  placeholder_color text not null default '#0C1A23',
  cover_image text,                -- public storage URL, optional
  body jsonb not null default '[]',-- ordered array of content blocks
  created_at timestamptz default now()
);

comment on column public.blogs.body is
  'Ordered content blocks. Each: {type:"heading"|"paragraph", text:{en,ka}} | {type:"image", url, caption?} | {type:"youtube", url}.';

create index if not exists idx_blogs_slug on public.blogs(slug);
create index if not exists idx_blogs_date on public.blogs(date desc);

-- Row Level Security: public can read; writes go through the admin (anon key) like the
-- existing categories/products tables. Mirror whatever policy those tables use.
alter table public.blogs enable row level security;

drop policy if exists "blogs public read" on public.blogs;
create policy "blogs public read" on public.blogs
  for select using (true);

drop policy if exists "blogs anon write" on public.blogs;
create policy "blogs anon write" on public.blogs
  for all using (true) with check (true);

-- Storage bucket for blog images (cover + inline). Public read.
insert into storage.buckets (id, name, public)
values ('blog images', 'blog images', true)
on conflict (id) do nothing;

drop policy if exists "blog images public read" on storage.objects;
create policy "blog images public read" on storage.objects
  for select using (bucket_id = 'blog images');

drop policy if exists "blog images anon write" on storage.objects;
create policy "blog images anon write" on storage.objects
  for insert with check (bucket_id = 'blog images');
