# CONTEXT: Blustereast Tattoo Studio website

Read this before every task. If a request conflicts with this file, follow this file and tell me.

## Project
Company profile website + small admin for a tattoo studio in Denpasar Timur, Bali (Instagram @blustereast_tattoostudio).
Goal: visitors see price range, WhatsApp, portfolio, and location within seconds.
Visitors are mostly on mobile, many are tourists: Indonesian (default) + English.
Academic final project: keep code simple and easy to explain.

## Stack (fixed)
- Next.js (App Router, TypeScript), Tailwind, Supabase (Postgres, Auth, Storage).
- Check package.json. Never change installed versions.
- Allowed extras: `@supabase/ssr`, `next-intl`, `zod`. Ask before adding anything else.
- No UI kits, no ORM, no icon packs (inline SVG for WhatsApp/Instagram only), no payments, no visitor accounts.

## Rules
- Do not invent facts. Use placeholders: [PRICE], [WHATSAPP_NUMBER], [ARTIST_NAME], [FOUNDED_YEAR].
- No stock photos. Use plain gray boxes with the right aspect ratio until real photos exist.
- Do only the current phase. Do not touch unrelated files or add extra pages.
- Server components by default. Client components only when needed.
- Reply short: files changed, how to test, open questions.

## Design: minimal
Think of a quiet photographer's portfolio. Only content and photos.

- **Colors (only these):** white `#FFFFFF`, black `#111111`, gray `#6B6B6B` for secondary text, line `#E5E5E5`. No accent color.
- **Font:** one family, Geist Sans (already in create-next-app). Weights 400 and 600 only. Sizes: 14, 16, 20, 32, 56.
- **Layout:** left-aligned, max width 1100px, lots of whitespace, 1px line between sections. Same spacing everywhere.
- **Buttons:** black fill, white text, square corners. Secondary action is an underlined text link.
- **Photos:** square corners, no border, no shadow, no overlay text.
- **Gallery:** plain grid, 2 columns on mobile and 3 on desktop, same aspect ratio (4:5). Filter is a row of text links; the active one is underlined. Click opens a simple lightbox.
- **Never use:** gradients, shadows, rounded cards, icons in circles, badges, eyebrow labels, all-caps labels, numbered sections, dashed or decorative borders, glass effects, scroll animations, emoji, stat counters, "Welcome to..." copy.
- **Motion:** none, except link hover underline and lightbox open/close. Respect `prefers-reduced-motion`.
- **Copy:** short plain sentences, facts only. Buttons say what they do: "Chat on WhatsApp", "View gallery", "Send message".
- **Quality:** works from 360px, visible keyboard focus, alt text on every image, text contrast AA.

## Pages
All user-facing text lives in `messages/id.json` and `messages/en.json`.

| Route | Content |
|---|---|
| `/` | Hero: one photo, studio name, one line, WhatsApp button. Then services (3 lines), 6 gallery photos, contact block |
| `/about` | Short story, vision, mission, 2-3 studio photos |
| `/artists` | Each artist: photo, name, styles, 2-line bio, link to their works |
| `/services` | Service list with "From Rp [PRICE]" and a note that final price depends on size and detail. FAQ as plain text. Aftercare section |
| `/gallery` | Grid + style filter + lightbox, optional `?artist=` filter |
| `/contact` | Address, map, hours, WhatsApp, Instagram, TikTok, simple form |

Header: studio name, 5 text links, ID/EN toggle, WhatsApp button (sticky). Footer: contact, socials, one line "18+ only". No banners or popups.

Admin (`/admin`, Indonesian only, protected by Supabase Auth + middleware): login, dashboard (counts), CRUD gallery / services / artists, inquiries (view, status `new` / `replied` / `done`, delete), settings (single record). Delete asks for confirmation. Admin UI is plain: same colors and font, tables and simple forms.

Contact form fields: name, phone, style, placement, size, message. Validate with zod in a Server Action. Spam control: honeypot + minimum time check. No file upload.

## Data (Supabase)
```sql
create table site_settings (id int primary key default 1 check (id = 1),
  whatsapp text, address text, maps_embed_url text, opening_hours text,
  instagram text, tiktok text,
  about_id text, about_en text, vision_id text, vision_en text, mission_id text, mission_en text);

create table artists (id uuid primary key default gen_random_uuid(),
  name text not null, photo_url text, bio_id text, bio_en text,
  specialties text[] not null default '{}', sort_order int not null default 0,
  created_at timestamptz not null default now());

create table services (id uuid primary key default gen_random_uuid(),
  name_id text not null, name_en text not null, description_id text, description_en text,
  size_category text, starting_price int, is_active boolean not null default true,
  sort_order int not null default 0, created_at timestamptz not null default now());

create table gallery_items (id uuid primary key default gen_random_uuid(),
  title text not null, style text not null, image_url text not null,
  artist_id uuid references artists(id) on delete set null,
  is_featured boolean not null default false, sort_order int not null default 0,
  created_at timestamptz not null default now());

create table inquiries (id uuid primary key default gen_random_uuid(),
  name text not null, phone text not null, style text, placement text, size text, message text,
  status text not null default 'new' check (status in ('new','replied','done')),
  created_at timestamptz not null default now());
```
- RLS on every table.
- Public `select`: settings, artists, gallery_items, services (only `is_active = true`).
- `inquiries`: anon can only `insert`.
- All writes and reads of inquiries: `authenticated` only.
- Storage: public-read bucket `media` (`gallery/`, `artists/`), write for authenticated. jpg/png/webp, max 4 MB.
- One admin user, created manually in the Supabase dashboard. No sign-up.

## Folders
```
src/app/[locale]/...     public pages
src/app/admin/...        admin pages
src/components/          small components only
src/lib/supabase/        client.ts, server.ts
src/lib/mock/            mock data (phase 1 only)
src/messages/            id.json, en.json
middleware.ts            locale + admin protection
```

## Phases (one at a time, stop after each)
1. UI with mock data: all public pages + static admin screens. No Supabase.
2. Connect Supabase (SQL, RLS, storage) + ID/EN with next-intl.
3. Admin auth + CRUD + image upload.
4. SEO basics (metadata, sitemap), performance, manual test list.

Done = builds with no TypeScript/lint errors, works at 360px and 1280px, no hardcoded copy outside `messages/`, no invented facts.

## Ask the owner (do not guess)
Founding year, artists and styles, prices per size, opening hours, official WhatsApp number, map location, real photos, permission to publish client work.
