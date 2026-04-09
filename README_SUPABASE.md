# Supabase Integration Complete ✅

Your ALIVO site is now fully integrated with Supabase. Here's what was set up and how to use it.

## What's Changed

All product and category data now fetches from Supabase instead of static files:

| Component | Data Source |
|-----------|-----------|
| **Home page categories** | `supabase.categories` table |
| **Category pages** | `supabase.categories` + `supabase.products` |
| **Product detail pages** | `supabase.products` table |

## Files Added/Modified

### New Files
- `lib/supabase.ts` — Supabase client with lazy initialization
- `lib/data/supabase-products.ts` — All product/category queries with error handling
- `.env.local` — Environment variables (you'll fill this in)
- `SUPABASE_QUICK_START.md` — Step-by-step setup guide
- `SUPABASE_SETUP.md` — Detailed SQL and data format examples

### Modified Files
- `app/[lang]/category/[slug]/page.tsx` — Now fetches from Supabase
- `app/[lang]/category/[slug]/[product]/page.tsx` — Now fetches from Supabase
- `components/home/ProductCategories.tsx` — Now async, fetches from Supabase

## Quick Setup (5 Minutes)

### 1. Create Supabase Project
```
Go to https://supabase.com → Create new project
```

### 2. Add Environment Variables
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (copy from Supabase Settings → API)
```

### 3. Create Database Tables
In Supabase SQL Editor, run the SQL from **SUPABASE_QUICK_START.md** → "SQL Schema" section

### 4. Add Your Data
Use Supabase Table Editor or SQL queries to insert categories and products.

### 5. Test
```bash
npm run dev
# Visit http://localhost:3000/en
```

## Data Structure

### Categories Table
```json
{
  "slug": "recuperators",
  "name": {"en": "Recuperators", "ka": "რეკუპერატორები"},
  "description": {"en": "Energy-recovery...", "ka": "ენერგოდაზოგვის..."},
  "hero_tagline": {"en": "Breathe Fresh. Save Energy.", "ka": "ისუნთქე..."},
  "placeholder_color": "#263947",
  "explainer_title": {"en": "What is a Recuperator?", "ka": "რა არის..."},
  "explainer_body": {"en": "A recuperator...", "ka": "რეკუპერატორი..."},
  "how_it_works": [
    {"step": 1, "title": {...}, "description": {...}},
    ...
  ]
}
```

### Products Table
```json
{
  "slug": "reco-100",
  "name": {"en": "Reco 100", "ka": "Reco 100"},
  "category_slug": "recuperators",
  "tagline": {"en": "Compact...", "ka": "კომპაქტური..."},
  "description": {"en": "The Reco 100...", "ka": "Reco 100 უზრუნველყოფს..."},
  "is_bestseller": true,
  "placeholder_color": "#263947",
  "image_count": 3,
  "benefits": [
    {"icon": "🌬️", "title": {...}, "body": {...}},
    ...
  ],
  "features": [
    {"label": {...}, "value": {...}},
    ...
  ]
}
```

## Adding Your Products

### Option 1: Use Supabase Table Editor (Easy)
1. Go to Supabase Dashboard
2. Click **categories** table → **Insert**
3. Paste category data (JSON format)
4. Repeat for **products** table

### Option 2: Use SQL (Recommended)
See full INSERT statements in `SUPABASE_SETUP.md`

### Option 3: Bulk Upload
Convert your `lib/data/products.ts` data to SQL and run as queries

## Key Files to Know

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client initialization (lazy-loaded) |
| `lib/data/supabase-products.ts` | All database queries (with error handling) |
| `.env.local` | Supabase credentials |
| `SUPABASE_QUICK_START.md` | 5-minute setup guide |
| `SUPABASE_SETUP.md` | Detailed guide with all SQL |

## Troubleshooting

### "Products are not showing"
1. Check `.env.local` has correct Supabase URL and Anon Key
2. Verify tables exist in Supabase (SQL Editor → tables)
3. Check browser console for errors
4. Restart `npm run dev` after changing `.env.local`

### "TypeScript errors about snake_case"
This shouldn't happen — the data layer handles the conversion automatically. If you see errors, the mapping functions in `lib/data/supabase-products.ts` aren't working.

### Build succeeds but no products appear at runtime
- Verify Supabase credentials in `.env.local`
- Check that categories have matching `slug` in both tables
- Look for warnings in console: "Error connecting to Supabase"

## How It Works (Technical)

1. **Lazy Client Initialization** — Supabase client only creates if env vars exist
2. **Error Handling** — All queries fail gracefully and return empty arrays
3. **Type Mapping** — Database snake_case fields map to TypeScript camelCase
4. **Async Components** — Page and component level data fetching
5. **Build-Safe** — App builds successfully even without Supabase configured

## Next Steps After Setup

1. **Add all your products** via Supabase Table Editor
2. **Enable Row Level Security (RLS)** in Supabase for production
3. **Set up image storage** in Supabase for product images
4. **Add search/filtering** if needed
5. **Deploy** to Vercel (environment variables configured in Vercel settings)

## Production Deployment

When deploying to Vercel:
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy
4. Your site will fetch live data from Supabase

---

**Questions?** See `SUPABASE_QUICK_START.md` for more details!
