# Supabase Setup Guide

## Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Copy your **Project URL** and **Anon Key** from Project Settings → API

## Step 2: Add Environment Variables
Update `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Step 3: Create Database Tables
Go to Supabase Dashboard → SQL Editor → New Query and run this:

```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL,
  description JSONB NOT NULL,
  hero_tagline JSONB NOT NULL,
  placeholder_color TEXT NOT NULL,
  explainer_title JSONB NOT NULL,
  explainer_body JSONB NOT NULL,
  how_it_works JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL,
  category_slug TEXT NOT NULL REFERENCES categories(slug),
  tagline JSONB NOT NULL,
  description JSONB NOT NULL,
  is_bestseller BOOLEAN DEFAULT FALSE,
  placeholder_color TEXT NOT NULL,
  image_count INTEGER DEFAULT 0,
  benefits JSONB NOT NULL DEFAULT '[]',
  features JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_products_category_slug ON products(category_slug);
CREATE INDEX idx_products_slug ON products(slug);
```

## Step 4: Insert Sample Data

```sql
-- Insert categories
INSERT INTO categories (slug, name, description, hero_tagline, placeholder_color, explainer_title, explainer_body, how_it_works) VALUES
(
  'recuperators',
  '{"en": "Recuperators", "ka": "რეკუპერატორები"}',
  '{"en": "Energy-recovery ventilation systems...", "ka": "ენერგოდაზოგვის ვენტილაციის სისტემები..."}',
  '{"en": "Breathe Fresh. Save Energy.", "ka": "ისუნთქე სუფთად. დაზოგე ენერგია."}',
  '#263947',
  '{"en": "What is a Recuperator?", "ka": "რა არის რეკუპერატორი?"}',
  '{"en": "A recuperator is...", "ka": "რეკუპერატორი არის..."}',
  '[{"step": 1, "title": {"en": "Fresh Air In", "ka": "სუფთა ჰაერი შედის"}, "description": {"en": "...", "ka": "..."}}]'
),
(
  'ventilators',
  '{"en": "Ventilators", "ka": "ვენტილატორები"}',
  '{"en": "High-performance ventilation...", "ka": "მაღალი ეფექტურობის ვენტილაციის..."}',
  '{"en": "Silent Power. Pure Air.", "ka": "ჩუმი სიმძლავრე. სუფთა ჰაერი."}',
  '#0C1A23',
  '{"en": "What is a Ventilator?", "ka": "რა არის ვენტილატორი?"}',
  '{"en": "A mechanical ventilator...", "ka": "მექანიკური ვენტილატორი..."}',
  '[{"step": 1, "title": {"en": "Detect & Measure", "ka": "გამოვლენა და გაზომვა"}, "description": {"en": "...", "ka": "..."}}]'
);

-- Insert a sample product
INSERT INTO products (slug, name, category_slug, tagline, description, is_bestseller, placeholder_color, image_count, benefits, features) VALUES
(
  'reco-100',
  '{"en": "Reco 100", "ka": "Reco 100"}',
  'recuperators',
  '{"en": "Compact whole-home recovery ventilation", "ka": "კომპაქტური სახლის ვენტილაცია ენერგიის რეკუპერაციით"}',
  '{"en": "The Reco 100 delivers...", "ka": "Reco 100 უზრუნველყოფს..."}',
  true,
  '#263947',
  3,
  '[{"icon": "🌬️", "title": {"en": "Up to 92% Heat Recovery", "ka": "სითბოს 92%-მდე დაბრუნება"}, "body": {"en": "Cross-flow...", "ka": "ჯვარედინი..."}}]',
  '[{"label": {"en": "Air Flow", "ka": "ჰაერის ნაკადი"}, "value": {"en": "20–100 m³/h", "ka": "20–100 მ³/სთ"}}]'
);
```

## Step 5: Update Page Components

Replace imports in your pages from:
```typescript
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data/products'
```

To:
```typescript
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data/supabase-products'
```

## Step 6: Test
- Run `npm run dev`
- Visit your category pages to see data from Supabase

## Bulk Data Upload

To upload all your existing product data to Supabase:

1. Export your products as JSON from `lib/data/products.ts`
2. Use Supabase's CSV import feature in the dashboard, or
3. Use the Supabase CLI: `supabase db push` with migration files

For now, manually add products via the Supabase dashboard SQL editor.
