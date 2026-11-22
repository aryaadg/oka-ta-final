-- ============================================================================
-- BLUSTEREAST TATTOO STUDIO - SUPABASE COMPLETE SCHEMA, RLS & SEED DATA
-- Jalankan script ini di Supabase Dashboard > SQL Editor > New Query
-- ============================================================================

-- 1. TABEL SITE SETTINGS
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  whatsapp text,
  address text,
  maps_embed_url text,
  opening_hours text,
  instagram text,
  tiktok text,
  about_id text,
  about_en text,
  vision_id text,
  vision_en text,
  mission_id text,
  mission_en text
);

-- 2. TABEL ARTISTS
create table if not exists artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  bio_id text,
  bio_en text,
  specialties text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. TABEL SERVICES
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name_id text not null,
  name_en text not null,
  description_id text,
  description_en text,
  size_category text,
  starting_price int,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 4. TABEL GALLERY ITEMS
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  style text not null,
  image_url text not null,
  artist_id uuid references artists(id) on delete set null,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 5. TABEL INQUIRIES
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  style text,
  placement text,
  size text,
  message text,
  status text not null default 'new' check (status in ('new','replied','done')),
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
alter table site_settings enable row level security;
alter table artists enable row level security;
alter table services enable row level security;
alter table gallery_items enable row level security;
alter table inquiries enable row level security;

-- Public Read Policies
drop policy if exists "Public can read site_settings" on site_settings;
create policy "Public can read site_settings" on site_settings for select using (true);

drop policy if exists "Public can read artists" on artists;
create policy "Public can read artists" on artists for select using (true);

drop policy if exists "Public can read active services" on services;
create policy "Public can read active services" on services for select using (true);

drop policy if exists "Public can read gallery_items" on gallery_items;
create policy "Public can read gallery_items" on gallery_items for select using (true);

-- Public Insert Inquiry Policy
drop policy if exists "Public can insert inquiries" on inquiries;
create policy "Public can insert inquiries" on inquiries for insert with check (true);

-- Admin Full Access Policies (authenticated users)
drop policy if exists "Authenticated full access site_settings" on site_settings;
create policy "Authenticated full access site_settings" on site_settings for all to authenticated using (true) with check (true);

drop policy if exists "Authenticated full access artists" on artists;
create policy "Authenticated full access artists" on artists for all to authenticated using (true) with check (true);

drop policy if exists "Authenticated full access services" on services;
create policy "Authenticated full access services" on services for all to authenticated using (true) with check (true);

drop policy if exists "Authenticated full access gallery_items" on gallery_items;
create policy "Authenticated full access gallery_items" on gallery_items for all to authenticated using (true) with check (true);

drop policy if exists "Authenticated full access inquiries" on inquiries;
create policy "Authenticated full access inquiries" on inquiries for all to authenticated using (true) with check (true);

-- ============================================================================
-- INITIAL SEED DATA
-- ============================================================================
insert into site_settings (
  id, whatsapp, address, maps_embed_url, opening_hours, instagram, tiktok,
  about_id, about_en, vision_id, vision_en, mission_id, mission_en
) values (
  1,
  '6281234567890',
  'Jl. Akasia XVI, Denpasar Timur, Bali',
  'https://maps.google.com/maps?q=Jl.+Akasia+XVI+Denpasar+Timur+Bali&t=&z=15&ie=UTF8&iwloc=&output=embed',
  '10:00 - 20:00 WITA',
  '@blustereast_tattoostudio',
  '@blustereast_tattoostudio',
  'Blustereast Tattoo Studio adalah studio tato custom profesional di Denpasar Timur (Akasia XVI), Bali. Berdiri sejak 2018, kami berfokus pada hasil karya tato presisi tinggi, kebersihan medis, dan kepuasan klien.',
  'Blustereast Tattoo Studio is a professional custom tattoo studio in East Denpasar (Akasia XVI), Bali. Established in 2018, we focus on high-precision tattoo artwork, medical cleanliness, and client satisfaction.',
  'Menjadi studio tato pilihan utama di Bali yang dikenal akan estetika linework, ruang steril, serta pelayanan yang ramah dan transparan.',
  'To be the premier custom tattoo studio in Bali recognized for linework aesthetics, sterile environment, and warm, transparent service.',
  'Menggabungkan keahlian seni tato dengan protokol sterilisasi modern untuk memberikan pengalaman tato yang aman dan berkesan.',
  'Combining tattoo artistry with modern sterilization protocols to deliver a safe and memorable tattoo experience.'
) on conflict (id) do nothing;
