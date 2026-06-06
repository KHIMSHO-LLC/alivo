// Generates supabase/migrations/0003_seed_blogs.sql from the existing in-repo
// blog data, so the 3 built-in posts can be inserted into the DB verbatim
// (no manual retyping of bilingual content). Run: node scripts/generate-blog-seed.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Extract a balanced {...} or [...] literal starting at `open` index. */
function extractLiteral(src, fromIndex, openChar) {
  const closeChar = openChar === '{' ? '}' : ']'
  const start = src.indexOf(openChar, fromIndex)
  let depth = 0
  let inStr = null
  for (let i = start; i < src.length; i++) {
    const c = src[i]
    if (inStr) {
      if (c === '\\') { i++; continue }
      if (c === inStr) inStr = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue }
    if (c === openChar) depth++
    else if (c === closeChar) { depth--; if (depth === 0) return src.slice(start, i + 1) }
  }
  throw new Error('Unbalanced literal')
}

// --- Read source data (pure object/array literals → safe to eval) ---
const blogsSrc = readFileSync(join(root, 'lib/data/blogs.ts'), 'utf8')
const blogsEq = blogsSrc.indexOf('=', blogsSrc.indexOf('BLOG_POSTS'))
const BLOG_POSTS = eval('(' + extractLiteral(blogsSrc, blogsEq, '[') + ')')

const pageSrc = readFileSync(join(root, 'app/[lang]/blog/[slug]/page.tsx'), 'utf8')
const contentsEq = pageSrc.indexOf('=', pageSrc.indexOf('BLOG_CONTENTS'))
const BLOG_CONTENTS = eval('(' + extractLiteral(pageSrc, contentsEq, '{') + ')')

// --- Build body blocks (heading + paragraphs) merging en/ka per section ---
function buildBody(slug) {
  const en = BLOG_CONTENTS[slug]?.en ?? []
  const ka = BLOG_CONTENTS[slug]?.ka ?? []
  const blocks = []
  en.forEach((section, i) => {
    const kaSection = ka[i] ?? { title: '', paragraphs: [] }
    blocks.push({ type: 'heading', text: { en: section.title, ka: kaSection.title } })
    section.paragraphs.forEach((p, j) => {
      blocks.push({ type: 'paragraph', text: { en: p, ka: kaSection.paragraphs?.[j] ?? '' } })
    })
  })
  return blocks
}

const sqlEscape = (obj) => "'" + JSON.stringify(obj).replace(/'/g, "''") + "'"
const sqlStr = (s) => "'" + String(s).replace(/'/g, "''") + "'"

const rows = BLOG_POSTS.map((post) => {
  const body = buildBody(post.slug)
  return `(
  ${sqlStr(post.slug)},
  ${sqlStr(post.date)},
  ${sqlEscape(post.title)}::jsonb,
  ${sqlEscape(post.summary)}::jsonb,
  ${sqlEscape(post.category)}::jsonb,
  ${sqlStr(post.placeholderColor)},
  ${sqlEscape(body)}::jsonb
)`
}).join(',\n')

const sql = `-- Seed the 3 built-in blog posts into the blogs table.
-- Auto-generated from lib/data/blogs.ts + app/[lang]/blog/[slug]/page.tsx
-- Idempotent: re-running refreshes content for these slugs.
insert into public.blogs (slug, date, title, summary, category, placeholder_color, body) values
${rows}
on conflict (slug) do update set
  date = excluded.date,
  title = excluded.title,
  summary = excluded.summary,
  category = excluded.category,
  placeholder_color = excluded.placeholder_color,
  body = excluded.body;
`

const outPath = join(root, 'supabase/migrations/0003_seed_blogs.sql')
writeFileSync(outPath, sql)
console.log(`Wrote ${outPath}\n${BLOG_POSTS.length} posts, blocks per post: ${BLOG_POSTS.map((p) => buildBody(p.slug).length).join(', ')}`)
