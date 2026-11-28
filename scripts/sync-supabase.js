const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://phpjjlweieinfeskgihi.supabase.co";
const SUPABASE_KEY = "sb_publishable_v5X13aqx2Q3kvGm5IzNAPA_jvlHDuOK";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const siteSettings = {
  id: 1,
  whatsapp: "6281234567890",
  address: "Jl. Akasia XVI, Denpasar Timur, Bali",
  maps_embed_url:
    "https://maps.google.com/maps?q=Jl.+Akasia+XVI+Denpasar+Timur+Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
  opening_hours: "10:00 - 20:00 WITA",
  instagram: "@blustereast_tattoostudio",
  tiktok: "@blustereast_tattoostudio",
  about_id:
    "Blustereast Tattoo Studio adalah studio tato custom profesional di Denpasar Timur (Akasia XVI), Bali. Berdiri sejak 2018, kami berfokus pada hasil karya tato presisi tinggi, kebersihan medis, dan kepuasan klien. Lingkungan studio kami dirancang khusus agar Anda merasa santai, privat, dan percaya penuh pada karya seni yang diukir di kulit Anda.",
  about_en:
    "Blustereast Tattoo Studio is a professional custom tattoo studio in East Denpasar (Akasia XVI), Bali. Established in 2018, we focus on high-precision tattoo artwork, medical cleanliness, and client satisfaction. Our studio environment is tailored to make you feel relaxed, private, and confident in the art permanently etched on your skin.",
  vision_id:
    "Menjadi studio tato pilihan utama di Bali yang dikenal akan estetika linework, ruang steril, serta pelayanan yang ramah dan transparan.",
  vision_en:
    "To be the premier custom tattoo studio in Bali recognized for linework aesthetics, sterile environment, and warm, transparent service.",
  mission_id:
    "Menggabungkan keahlian seni tato dengan protokol sterilisasi modern untuk memberikan pengalaman tato yang aman dan berkesan.",
  mission_en:
    "Combining tattoo artistry with modern sterilization protocols to deliver a safe and memorable tattoo experience.",
};

const artists = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Budi 'Needles'",
    photo_url: "/temp/artist-1.jpg",
    bio_id:
      "Berpengalaman 8 tahun dalam seni Fine Line, micro-realism, dan desain flora bertema botanik. Mengedepankan ketelitian garis super tipis dan ketahanan warna yang awet di iklim tropis.",
    bio_en:
      "8 years of experience specialized in Fine Line, micro-realism, and botanical floral designs. Emphasizing super thin line precision and ink longevity in tropical climates.",
    specialties: ["Fine Line", "Floral Linework", "Micro Realism"],
    sort_order: 1,
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Wayan Tinta",
    photo_url: "/temp/artist-2.jpg",
    bio_id:
      "Spesialis Blackwork kontras tinggi, shading geometri, dan ornamen tradisional Bali. Berpengalaman menangani tato ukuran medium hingga proyek full sleeve yang kompleks.",
    bio_en:
      "Specialist in high-contrast Blackwork, geometric shading, and traditional Balinese ornamental pieces. Experienced in medium to full sleeve projects.",
    specialties: ["Blackwork", "Geometric", "Full Sleeve"],
    sort_order: 2,
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Sari Linework",
    photo_url: "/temp/artist-3.jpg",
    bio_id:
      "Lulusan seni rupa yang kini ahli dalam Realism portrait, kontur hitam putih, dan ahli me-retouch atau cover-up tato lama dengan pendekatan visual modern.",
    bio_en:
      "Fine arts graduate turned expert in portrait Realism, black & grey shading, and cover-up projects using modern visual approaches.",
    specialties: ["Realism", "Black & Grey", "Cover-up"],
    sort_order: 3,
  },
];

const services = [
  {
    id: "aaaa1111-1111-4111-8111-111111111111",
    name_id: "Custom Fine Line Tattoo",
    name_en: "Custom Fine Line Tattoo",
    description_id:
      "Tato garis halus presisi tinggi dengan jarum single needle. Sangat populer untuk tulisan, simbol minimalis, dan siluet botanik.",
    description_en:
      "High precision single-needle fine line tattoo. Ideal for lettering, minimalist symbols, and botanical silhouettes.",
    size_category: "Small (5 x 5 cm)",
    starting_price: 800000,
    is_active: true,
    sort_order: 1,
  },
  {
    id: "aaaa2222-2222-4222-8222-222222222222",
    name_id: "Blackwork & Heavy Contrast",
    name_en: "Blackwork & Heavy Contrast",
    description_id:
      "Karya dengan saturasi tinta hitam pekat, pola ornamen tegas, dan bidang solid yang tahan lama tanpa memudar cepat.",
    description_en:
      "Artwork with solid black ink saturation, bold ornamental patterns, and lasting solid areas that resist fading.",
    size_category: "Medium (10 x 10 cm)",
    starting_price: 1500000,
    is_active: true,
    sort_order: 2,
  },
  {
    id: "aaaa3333-3333-4333-8333-333333333333",
    name_id: "Realism & Black & Grey Shading",
    name_en: "Realism & Black & Grey Shading",
    description_id:
      "Detail gambar realistis seperti potret manusia, wajah hewan, atau patung dengan gradasi bayangan yang sangat lembut.",
    description_en:
      "Realistic detail artwork such as human portraits, animal faces, or sculptures with incredibly smooth shading.",
    size_category: "Medium / Large (15 x 15 cm)",
    starting_price: 2500000,
    is_active: true,
    sort_order: 3,
  },
  {
    id: "aaaa4444-4444-4444-8444-444444444444",
    name_id: "Full Sleeve & Large Scale Project",
    name_en: "Full Sleeve & Large Scale Project",
    description_id:
      "Proyek tato skala besar mencakup seluruh lengan (sleeve), leg sleeve, atau punggung penuh. Membutuhkan beberapa sesi panjang.",
    description_en:
      "Large-scale multi-session tattoo projects covering full arm (sleeve), leg sleeve, or full back pieces.",
    size_category: "Large / Full Sleeve",
    starting_price: 7000000,
    is_active: true,
    sort_order: 4,
  },
  {
    id: "aaaa5555-5555-4555-8555-555555555555",
    name_id: "Cover-Up & Rework",
    name_en: "Cover-Up & Rework",
    description_id:
      "Memperbaiki, mempertajam, atau sepenuhnya menutupi tato lama Anda yang pudar dengan desain baru yang lebih segar.",
    description_en:
      "Fixing, sharpening, or completely covering your old faded tattoos with fresh, vibrant new designs.",
    size_category: "Custom Size",
    starting_price: 2000000,
    is_active: true,
    sort_order: 5,
  },
];

const galleryItems = [
  {
    id: "bbbb1111-1111-4111-8111-111111111111",
    title: "Botanical Fine Line Stencil",
    style: "Fine Line",
    image_url: "/temp/gallery-1.jpg",
    artist_id: "11111111-1111-4111-8111-111111111111",
    is_featured: true,
    sort_order: 1,
  },
  {
    id: "bbbb2222-2222-4222-8222-222222222222",
    title: "Geometric Snake Blackwork",
    style: "Blackwork",
    image_url: "/temp/gallery-2.jpg",
    artist_id: "22222222-2222-4222-8222-222222222222",
    is_featured: true,
    sort_order: 2,
  },
  {
    id: "bbbb3333-3333-4333-8333-333333333333",
    title: "Sculpture Shading Study",
    style: "Realism",
    image_url: "/temp/gallery-3.jpg",
    artist_id: "33333333-3333-4333-8333-333333333333",
    is_featured: true,
    sort_order: 3,
  },
  {
    id: "bbbb4444-4444-4444-8444-444444444444",
    title: "Ornamental Spine Linework",
    style: "Ornamental",
    image_url: "/temp/gallery-5.jpg",
    artist_id: "11111111-1111-4111-8111-111111111111",
    is_featured: true,
    sort_order: 4,
  },
  {
    id: "bbbb5555-5555-4555-8555-555555555555",
    title: "Mythological Dragon Flash",
    style: "Blackwork",
    image_url: "/temp/gallery-2.jpg",
    artist_id: "22222222-2222-4222-8222-222222222222",
    is_featured: true,
    sort_order: 5,
  },
  {
    id: "bbbb6666-6666-4666-8666-666666666666",
    title: "Minimalist Script Linework",
    style: "Fine Line",
    image_url: "/temp/gallery-7.jpg",
    artist_id: "11111111-1111-4111-8111-111111111111",
    is_featured: true,
    sort_order: 6,
  },
  {
    id: "bbbb7777-7777-4777-8777-777777777777",
    title: "Traditional Bali Stencil Motif",
    style: "Ornamental",
    image_url: "/temp/gallery-4.jpg",
    artist_id: "22222222-2222-4222-8222-222222222222",
    is_featured: false,
    sort_order: 7,
  },
  {
    id: "bbbb8888-8888-4888-8888-888888888888",
    title: "Tiger Portrait Shading",
    style: "Realism",
    image_url: "/temp/gallery-6.jpg",
    artist_id: "33333333-3333-4333-8333-333333333333",
    is_featured: false,
    sort_order: 8,
  },
];

const inquiries = [
  {
    id: "cccc1111-1111-4111-8111-111111111111",
    name: "Budi Santoso",
    phone: "+6281234567890",
    style: "Fine Line",
    placement: "Forearm",
    size: "8 x 5 cm",
    message: "Mau buat tato bunga lotus garis halus di lengan bagian dalam.",
    status: "new",
  },
  {
    id: "cccc2222-2222-4222-8222-222222222222",
    name: "Sarah Miller",
    phone: "+6289876543210",
    style: "Blackwork",
    placement: "Upper Back",
    size: "15 x 10 cm",
    message: "Looking for a custom snake blackwork flash piece for next week.",
    status: "replied",
  },
];

async function main() {
  console.log("=== Mengecek Tabel di Supabase (phpjjlweieinfeskgihi) ===");
  for (const table of [
    "site_settings",
    "artists",
    "services",
    "gallery_items",
    "inquiries",
  ]) {
    const { data, error } = await supabase.from(table).select("*");
    console.log(
      `[CEK] ${table} -> rows: ${data ? data.length : "null"}, error: ${
        error ? error.message : "OK"
      }`
    );
  }

  console.log("\n=== Mencoba Sinkronisasi Data ke Supabase ===");
  const r1 = await supabase.from("site_settings").upsert(siteSettings);
  console.log("Upsert site_settings:", r1.error ? r1.error.message : "SUCCESS");

  const r2 = await supabase.from("artists").upsert(artists);
  console.log("Upsert artists:", r2.error ? r2.error.message : "SUCCESS");

  const r3 = await supabase.from("services").upsert(services);
  console.log("Upsert services:", r3.error ? r3.error.message : "SUCCESS");

  const r4 = await supabase.from("gallery_items").upsert(galleryItems);
  console.log("Upsert gallery_items:", r4.error ? r4.error.message : "SUCCESS");

  const r5 = await supabase.from("inquiries").upsert(inquiries);
  console.log("Upsert inquiries:", r5.error ? r5.error.message : "SUCCESS");
}

main();
