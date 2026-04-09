# Supabase Integration — Quick Start

Your ALIVO site is now ready to fetch products and categories from Supabase instead of static files.

## ✅ What's Been Done
- Installed `@supabase/supabase-js`
- Created Supabase client (`lib/supabase.ts`)
- Created data fetching layer (`lib/data/supabase-products.ts`)
- Updated pages to use Supabase:
  - `app/[lang]/category/[slug]/page.tsx` — Category pages
  - `app/[lang]/category/[slug]/[product]/page.tsx` — Product detail pages
  - `components/home/ProductCategories.tsx` — Home page categories

## ⚙️ Setup Steps (5 minutes)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New project"
4. Enter:
   - Project name: `alivo` (or any name)
   - Database password: (save this!)
   - Region: Choose closest to you
5. Wait for project to be created

### 2. Get Your Keys
1. Go to **Settings → API**
2. Copy under "Project API keys":
   - `NEXT_PUBLIC_SUPABASE_URL` (Project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Anon key)

### 3. Update `.env.local`
Edit `.env.local` and add:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Create Database Tables
In Supabase Dashboard:
1. Go to **SQL Editor**
2. Click **New Query**
3. Copy & paste the SQL from the **SQL Schema** section below
4. Click **Run**

### 5. Add Your Data
Use the **Table Editor** in Supabase or SQL to add:
- Categories (recuperators, ventilators)
- Products (Reco 100, Reco 200, etc.)

See **Data Format** section below.

### 6. Test
```bash
npm run dev
# Visit http://localhost:3000/en/category/recuperators
```

---

## 📊 SQL Schema

Copy the entire block below and run in Supabase SQL Editor:

```sql
-- Categories table
CREATE TABLE IF NOT EXISTS categories (
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
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL,
  category_slug TEXT NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
  tagline JSONB NOT NULL,
  description JSONB NOT NULL,
  is_bestseller BOOLEAN DEFAULT FALSE,
  placeholder_color TEXT NOT NULL,
  image_count INTEGER DEFAULT 0,
  benefits JSONB NOT NULL DEFAULT '[]',
  features JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
```

---

## 📝 Data Format

### Category Example
```json
{
  "slug": "recuperators",
  "name": {"en": "Recuperators", "ka": "რეკუპერატორები"},
  "description": {"en": "Energy-recovery ventilation...", "ka": "ენერგოდაზოგვის..."},
  "hero_tagline": {"en": "Breathe Fresh. Save Energy.", "ka": "ისუნთქე სუფთად..."},
  "placeholder_color": "#263947",
  "explainer_title": {"en": "What is a Recuperator?", "ka": "რა არის რეკუპერატორი?"},
  "explainer_body": {"en": "A recuperator is...", "ka": "რეკუპერატორი არის..."},
  "how_it_works": [
    {
      "step": 1,
      "title": {"en": "Fresh Air In", "ka": "სუფთა ჰაერი შედის"},
      "description": {"en": "Outside air is...", "ka": "გარე ჰაერი..."}
    }
  ]
}
```

### Product Example
```json
{
  "slug": "reco-100",
  "name": {"en": "Reco 100", "ka": "Reco 100"},
  "category_slug": "recuperators",
  "tagline": {"en": "Compact whole-home recovery ventilation", "ka": "კომპაქტური..."},
  "description": {"en": "The Reco 100 delivers...", "ka": "Reco 100 უზრუნველყოფს..."},
  "is_bestseller": true,
  "placeholder_color": "#263947",
  "image_count": 3,
  "benefits": [
    {
      "icon": "🌬️",
      "title": {"en": "Up to 92% Heat Recovery", "ka": "სითბოს 92%-მდე დაბრუნება"},
      "body": {"en": "Cross-flow...", "ka": "ჯვარედინი..."}
    }
  ],
  "features": [
    {
      "label": {"en": "Air Flow", "ka": "ჰაერის ნაკადი"},
      "value": {"en": "20–100 m³/h", "ka": "20–100 მ³/სთ"}
    }
  ]
}
```

---

## 🚀 Bulk Upload Your Products

Your existing products are in `lib/data/products.ts`. To upload them all:

### Option A: Use Supabase Table Editor (Easy)
1. Go to Supabase → **Table Editor** → `categories`
2. Click **Insert** and paste the category JSON
3. Repeat for `products` table

### Option B: Use SQL (Recommended)
See full SQL INSERT statements in `SUPABASE_SETUP.md`

### Option C: CSV Import
1. Export products as CSV
2. In Supabase Table Editor, click **Import data**

---

## 🔧 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists and has both keys
- Restart `npm run dev` after adding env vars
- Keys must start with `NEXT_PUBLIC_` to be accessible in browser

### No products showing
- Check categories exist in Supabase
- Verify `category_slug` in products matches category `slug` exactly
- Check browser console for errors

### TypeScript errors about snake_case fields
- The Supabase layer automatically maps `category_slug` → `categorySlug`
- This is handled in `lib/data/supabase-products.ts`
- Should not need to change component code

---

## 📚 Next Steps

After setup:
1. **Add more products** via Supabase Table Editor
2. **Enable Row Level Security (RLS)** for production
3. **Set up image storage** in Supabase for product photos
4. **Add search & filtering** if needed

---

## 💡 Key Files

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client initialization |
| `lib/data/supabase-products.ts` | All product/category queries |
| `.env.local` | Supabase credentials |
| `SUPABASE_SETUP.md` | Detailed setup guide with all SQL |

