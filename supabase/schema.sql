-- ============================================================================
-- BLUSTEREAST TATTOO STUDIO - SUPABASE COMPLETE SCHEMA, RLS & FULL SEED DATA
-- Cara Pakai:
-- 1. Buka Supabase Dashboard > SQL Editor > New Query
-- 2. Copy-paste SELURUH isi file ini lalu klik tombol "RUN"
-- 3. Seluruh tabel, policy, dan data awal (Settings, 3 Artist, 5 Layanan,
--    8 Galeri Karya, dan 2 Inquiry) akan otomatis masuk ke database!
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
  aspect_ratio text not null default '4:5',
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
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
alter table site_settings enable row level security;
alter table artists enable row level security;
alter table services enable row level security;
alter table gallery_items enable row level security;
alter table inquiries enable row level security;

-- Mengizinkan aplikasi membaca dan mengelola data (baik via Supabase Auth maupun Server Actions)
drop policy if exists "Allow full access site_settings" on site_settings;
create policy "Allow full access site_settings" on site_settings for all using (true) with check (true);

drop policy if exists "Allow full access artists" on artists;
create policy "Allow full access artists" on artists for all using (true) with check (true);

drop policy if exists "Allow full access services" on services;
create policy "Allow full access services" on services for all using (true) with check (true);

drop policy if exists "Allow full access gallery_items" on gallery_items;
create policy "Allow full access gallery_items" on gallery_items for all using (true) with check (true);

drop policy if exists "Allow full access inquiries" on inquiries;
create policy "Allow full access inquiries" on inquiries for all using (true) with check (true);

-- ============================================================================
-- SEED DATA LENGKAP (SETTINGS, ARTISTS, SERVICES, GALLERY, INQUIRIES)
-- ============================================================================

-- Bersihkan data placeholder lama jika ada
delete from gallery_items where title = 'Placeholder Work';
delete from artists where name = '[ARTIST_NAME]';
delete from services where name_id = 'Tato Custom' and starting_price = 500000;

-- A. Seed Site Settings
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
  'Blustereast Tattoo Studio adalah studio tato custom profesional di Denpasar Timur (Akasia XVI), Bali. Berdiri sejak 2018, kami berfokus pada hasil karya tato presisi tinggi, kebersihan medis, dan kepuasan klien. Lingkungan studio kami dirancang khusus agar Anda merasa santai, privat, dan percaya penuh pada karya seni yang diukir di kulit Anda.',
  'Blustereast Tattoo Studio is a professional custom tattoo studio in East Denpasar (Akasia XVI), Bali. Established in 2018, we focus on high-precision tattoo artwork, medical cleanliness, and client satisfaction. Our studio environment is tailored to make you feel relaxed, private, and confident in the art permanently etched on your skin.',
  'Menjadi studio tato pilihan utama di Bali yang dikenal akan estetika linework, ruang steril, serta pelayanan yang ramah dan transparan.',
  'To be the premier custom tattoo studio in Bali recognized for linework aesthetics, sterile environment, and warm, transparent service.',
  'Menggabungkan keahlian seni tato dengan protokol sterilisasi modern untuk memberikan pengalaman tato yang aman dan berkesan.',
  'Combining tattoo artistry with modern sterilization protocols to deliver a safe and memorable tattoo experience.'
) on conflict (id) do update set
  whatsapp = excluded.whatsapp,
  address = excluded.address,
  opening_hours = excluded.opening_hours,
  instagram = excluded.instagram,
  tiktok = excluded.tiktok;

-- B. Seed Resident Artists (dengan UUID tetap agar relasi galeri langsung terhubung)
insert into artists (id, name, photo_url, bio_id, bio_en, specialties, sort_order)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Budi ''Needles''',
    '/temp/artist-1.jpg',
    'Berpengalaman 8 tahun dalam seni Fine Line, micro-realism, dan desain flora bertema botanik. Mengedepankan ketelitian garis super tipis dan ketahanan warna yang awet di iklim tropis.',
    '8 years of experience specialized in Fine Line, micro-realism, and botanical floral designs. Emphasizing super thin line precision and ink longevity in tropical climates.',
    ARRAY['Fine Line', 'Floral Linework', 'Micro Realism'],
    1
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Wayan Tinta',
    '/temp/artist-2.jpg',
    'Spesialis Blackwork kontras tinggi, shading geometri, dan ornamen tradisional Bali. Berpengalaman menangani tato ukuran medium hingga proyek full sleeve yang kompleks.',
    'Specialist in high-contrast Blackwork, geometric shading, and traditional Balinese ornamental pieces. Experienced in medium to full sleeve projects.',
    ARRAY['Blackwork', 'Geometric', 'Full Sleeve'],
    2
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Sari Linework',
    '/temp/artist-3.jpg',
    'Lulusan seni rupa yang kini ahli dalam Realism portrait, kontur hitam putih, dan ahli me-retouch atau cover-up tato lama dengan pendekatan visual modern.',
    'Fine arts graduate turned expert in portrait Realism, black & grey shading, and cover-up projects using modern visual approaches.',
    ARRAY['Realism', 'Black & Grey', 'Cover-up'],
    3
  )
on conflict (id) do nothing;

-- C. Seed Services
insert into services (id, name_id, name_en, description_id, description_en, size_category, starting_price, is_active, sort_order)
values
  (
    'aaaa1111-1111-4111-8111-111111111111',
    'Custom Fine Line Tattoo',
    'Custom Fine Line Tattoo',
    'Tato garis halus presisi tinggi dengan jarum single needle. Sangat populer untuk tulisan, simbol minimalis, dan siluet botanik.',
    'High precision single-needle fine line tattoo. Ideal for lettering, minimalist symbols, and botanical silhouettes.',
    'Small (5 x 5 cm)',
    800000,
    true,
    1
  ),
  (
    'aaaa2222-2222-4222-8222-222222222222',
    'Blackwork & Heavy Contrast',
    'Blackwork & Heavy Contrast',
    'Karya dengan saturasi tinta hitam pekat, pola ornamen tegas, dan bidang solid yang tahan lama tanpa memudar cepat.',
    'Artwork with solid black ink saturation, bold ornamental patterns, and lasting solid areas that resist fading.',
    'Medium (10 x 10 cm)',
    1500000,
    true,
    2
  ),
  (
    'aaaa3333-3333-4333-8333-333333333333',
    'Realism & Black & Grey Shading',
    'Realism & Black & Grey Shading',
    'Detail gambar realistis seperti potret manusia, wajah hewan, atau patung dengan gradasi bayangan yang sangat lembut.',
    'Realistic detail artwork such as human portraits, animal faces, or sculptures with incredibly smooth shading.',
    'Medium / Large (15 x 15 cm)',
    2500000,
    true,
    3
  ),
  (
    'aaaa4444-4444-4444-8444-444444444444',
    'Full Sleeve & Large Scale Project',
    'Full Sleeve & Large Scale Project',
    'Proyek tato skala besar mencakup seluruh lengan (sleeve), leg sleeve, atau punggung penuh. Membutuhkan beberapa sesi panjang.',
    'Large-scale multi-session tattoo projects covering full arm (sleeve), leg sleeve, or full back pieces.',
    'Large / Full Sleeve',
    7000000,
    true,
    4
  ),
  (
    'aaaa5555-5555-4555-8555-555555555555',
    'Cover-Up & Rework',
    'Cover-Up & Rework',
    'Memperbaiki, mempertajam, atau sepenuhnya menutupi tato lama Anda yang pudar dengan desain baru yang lebih segar.',
    'Fixing, sharpening, or completely covering your old faded tattoos with fresh, vibrant new designs.',
    'Custom Size',
    2000000,
    true,
    5
  )
on conflict (id) do nothing;

-- D. Seed Gallery Items (8 Karya)
insert into gallery_items (id, title, style, image_url, artist_id, aspect_ratio, is_featured, sort_order)
values
  ('bbbb1111-1111-4111-8111-111111111111', 'Botanical Fine Line Stencil', 'Fine Line', '/temp/gallery-1.jpg', '11111111-1111-4111-8111-111111111111', '4:5', true, 1),
  ('bbbb2222-2222-4222-8222-222222222222', 'Geometric Snake Blackwork', 'Blackwork', '/temp/gallery-2.jpg', '22222222-2222-4222-8222-222222222222', '1:1', true, 2),
  ('bbbb3333-3333-4333-8333-333333333333', 'Sculpture Shading Study', 'Realism', '/temp/gallery-3.jpg', '33333333-3333-4333-8333-333333333333', '3:4', true, 3),
  ('bbbb4444-4444-4444-8444-444444444444', 'Ornamental Spine Linework', 'Ornamental', '/temp/gallery-5.jpg', '11111111-1111-4111-8111-111111111111', '4:5', true, 4),
  ('bbbb5555-5555-4555-8555-555555555555', 'Mythological Dragon Flash', 'Blackwork', '/temp/gallery-2.jpg', '22222222-2222-4222-8222-222222222222', '1:1', true, 5),
  ('bbbb6666-6666-4666-8666-666666666666', 'Minimalist Script Linework', 'Fine Line', '/temp/gallery-7.jpg', '11111111-1111-4111-8111-111111111111', '3:4', true, 6),
  ('bbbb7777-7777-4777-8777-777777777777', 'Traditional Bali Stencil Motif', 'Ornamental', '/temp/gallery-4.jpg', '22222222-2222-4222-8222-222222222222', '4:5', false, 7),
  ('bbbb8888-8888-4888-8888-888888888888', 'Tiger Portrait Shading', 'Realism', '/temp/gallery-6.jpg', '33333333-3333-4333-8333-333333333333', '1:1', false, 8)
on conflict (id) do nothing;

-- E. Seed Inquiries
insert into inquiries (id, name, phone, style, placement, size, message, status)
values
  ('cccc1111-1111-4111-8111-111111111111', 'Budi Santoso', '+6281234567890', 'Fine Line', 'Forearm', '8 x 5 cm', 'Mau buat tato bunga lotus garis halus di lengan bagian dalam.', 'new'),
  ('cccc2222-2222-4222-8222-222222222222', 'Sarah Miller', '+6289876543210', 'Blackwork', 'Upper Back', '15 x 10 cm', 'Looking for a custom snake blackwork flash piece for next week.', 'replied')
on conflict (id) do nothing;
