export interface SiteSettings {
 id: number;
 whatsapp: string;
 address: string;
 maps_embed_url: string;
 opening_hours: string;
 instagram: string;
 tiktok: string;
 about_id: string;
 about_en: string;
 vision_id: string;
 vision_en: string;
 mission_id: string;
 mission_en: string;
}

export interface Artist {
 id: string;
 name: string;
 photo_url: string;
 bio_id: string;
 bio_en: string;
 specialties: string[];
 sort_order: number;
 created_at: string;
}

export interface Service {
 id: string;
 name_id: string;
 name_en: string;
 description_id: string;
 description_en: string;
 size_category: string;
 starting_price: string;
 is_active: boolean;
 sort_order: number;
 created_at: string;
}

export interface GalleryItem {
 id: string;
 title: string;
 style: string;
 image_url: string;
 artist_id: string;
 artist_name?: string;
 is_featured: boolean;
 aspect_ratio: "4:5" | "1:1" | "3:4";
 sort_order: number;
 created_at: string;
}

export interface Inquiry {
 id: string;
 name: string;
 phone: string;
 style: string;
 placement: string;
 size: string;
 message: string;
 status: "new" | "replied" | "done";
 created_at: string;
}

export interface FAQ {
 id: string;
 question_id: string;
 question_en: string;
 answer_id: string;
 answer_en: string;
}

export const mockSiteSettings: SiteSettings = {
 id: 1,
 whatsapp: "6281234567890",
 address: "Jl. Akasia XVI, Denpasar Timur, Bali",
 maps_embed_url:
 "https://maps.google.com/maps?q=Jl.+Akasia+XVI+Denpasar+Timur+Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
 opening_hours: "10:00 - 20:00 WITA",
 instagram: "https://instagram.com/blustereast",
 tiktok: "https://tiktok.com/@blustereast",
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

export const mockArtists: Artist[] = [
 {
 id: "artist-1",
 name: "Budi 'Needles'",
 photo_url: "",
 bio_id:
 "Berpengalaman 8 tahun dalam seni Fine Line, micro-realism, dan desain flora bertema botanik. Mengedepankan ketelitian garis super tipis dan ketahanan warna yang awet di iklim tropis.",
 bio_en:
 "8 years of experience specialized in Fine Line, micro-realism, and botanical floral designs. Emphasizing super thin line precision and ink longevity in tropical climates.",
 specialties: ["Fine Line", "Floral Linework", "Micro Realism"],
 sort_order: 1,
 created_at: "2026-01-10T08:00:00Z",
 },
 {
 id: "artist-2",
 name: "Wayan Tinta",
 photo_url: "",
 bio_id:
 "Spesialis Blackwork kontras tinggi, shading geometri, dan ornamen tradisional Bali. Berpengalaman menangani tato ukuran medium hingga proyek full sleeve yang kompleks.",
 bio_en:
 "Specialist in high-contrast Blackwork, geometric shading, and traditional Balinese ornamental pieces. Experienced in medium to full sleeve projects.",
 specialties: ["Blackwork", "Geometric", "Full Sleeve"],
 sort_order: 2,
 created_at: "2026-01-11T09:30:00Z",
 },
 {
 id: "artist-3",
 name: "Sari Linework",
 photo_url: "",
 bio_id:
 "Lulusan seni rupa yang kini ahli dalam Realism portrait, kontur hitam putih, dan ahli me-retouch atau cover-up tato lama dengan pendekatan visual modern.",
 bio_en:
 "Fine arts graduate turned expert in portrait Realism, black & grey shading, and cover-up projects using modern visual approaches.",
 specialties: ["Realism", "Black & Grey", "Cover-up"],
 sort_order: 3,
 created_at: "2026-01-12T10:15:00Z",
 },
];

export const mockServices: Service[] = [
 {
 id: "service-1",
 name_id: "Custom Fine Line Tattoo",
 name_en: "Custom Fine Line Tattoo",
 description_id:
 "Tato garis halus presisi tinggi dengan jarum single needle. Sangat populer untuk tulisan, simbol minimalis, dan siluet botanik.",
 description_en:
 "High precision single-needle fine line tattoo. Ideal for lettering, minimalist symbols, and botanical silhouettes.",
 size_category: "Small (5 x 5 cm)",
 starting_price: "800.000",
 is_active: true,
 sort_order: 1,
 created_at: "2026-01-01T00:00:00Z",
 },
 {
 id: "service-2",
 name_id: "Blackwork & Heavy Contrast",
 name_en: "Blackwork & Heavy Contrast",
 description_id:
 "Karya dengan saturasi tinta hitam pekat, pola ornamen tegas, dan bidang solid yang tahan lama tanpa memudar cepat.",
 description_en:
 "Artwork with solid black ink saturation, bold ornamental patterns, and lasting solid areas that resist fading.",
 size_category: "Medium (10 x 10 cm)",
 starting_price: "1.500.000",
 is_active: true,
 sort_order: 2,
 created_at: "2026-01-02T00:00:00Z",
 },
 {
 id: "service-3",
 name_id: "Realism & Black & Grey Shading",
 name_en: "Realism & Black & Grey Shading",
 description_id:
 "Detail gambar realistis seperti potret manusia, wajah hewan, atau patung dengan gradasi bayangan yang sangat lembut.",
 description_en:
 "Realistic detail artwork such as human portraits, animal faces, or sculptures with incredibly smooth shading.",
 size_category: "Medium / Large (15 x 15 cm)",
 starting_price: "2.500.000",
 is_active: true,
 sort_order: 3,
 created_at: "2026-01-03T00:00:00Z",
 },
 {
 id: "service-4",
 name_id: "Full Sleeve & Large Scale Project",
 name_en: "Full Sleeve & Large Scale Project",
 description_id:
 "Proyek tato skala besar mencakup seluruh lengan (sleeve), leg sleeve, atau punggung penuh. Membutuhkan beberapa sesi panjang.",
 description_en:
 "Large-scale multi-session tattoo projects covering full arm (sleeve), leg sleeve, or full back pieces.",
 size_category: "Large / Full Sleeve",
 starting_price: "7.000.000",
 is_active: true,
 sort_order: 4,
 created_at: "2026-01-04T00:00:00Z",
 },
 {
 id: "service-5",
 name_id: "Cover-Up & Rework",
 name_en: "Cover-Up & Rework",
 description_id:
 "Memperbaiki, mempertajam, atau sepenuhnya menutupi tato lama Anda yang pudar dengan desain baru yang lebih segar.",
 description_en:
 "Fixing, sharpening, or completely covering your old faded tattoos with fresh, vibrant new designs.",
 size_category: "Custom Size",
 starting_price: "2.000.000",
 is_active: true,
 sort_order: 5,
 created_at: "2026-01-05T00:00:00Z",
 },
];

export const mockGalleryItems: GalleryItem[] = [
 {
 id: "work-1",
 title: "Botanical Fine Line Stencil",
 style: "Fine Line",
 image_url: "",
 artist_id: "artist-1",
 artist_name: "Budi 'Needles'",
 is_featured: true,
 aspect_ratio: "4:5",
 sort_order: 1,
 created_at: "2026-02-01T10:00:00Z",
 },
 {
 id: "work-2",
 title: "Geometric Snake Blackwork",
 style: "Blackwork",
 image_url: "",
 artist_id: "artist-2",
 artist_name: "Wayan Tinta",
 is_featured: true,
 aspect_ratio: "1:1",
 sort_order: 2,
 created_at: "2026-02-02T11:00:00Z",
 },
 {
 id: "work-3",
 title: "Sculpture Shading Study",
 style: "Realism",
 image_url: "",
 artist_id: "artist-3",
 artist_name: "Sari Linework",
 is_featured: true,
 aspect_ratio: "3:4",
 sort_order: 3,
 created_at: "2026-02-03T12:00:00Z",
 },
 {
 id: "work-4",
 title: "Ornamental Spine Linework",
 style: "Ornamental",
 image_url: "",
 artist_id: "artist-1",
 artist_name: "Budi 'Needles'",
 is_featured: true,
 aspect_ratio: "4:5",
 sort_order: 4,
 created_at: "2026-02-04T13:00:00Z",
 },
 {
 id: "work-5",
 title: "Mythological Dragon Flash",
 style: "Blackwork",
 image_url: "",
 artist_id: "artist-2",
 artist_name: "Wayan Tinta",
 is_featured: true,
 aspect_ratio: "1:1",
 sort_order: 5,
 created_at: "2026-02-05T14:00:00Z",
 },
 {
 id: "work-6",
 title: "Minimalist Script Linework",
 style: "Fine Line",
 image_url: "",
 artist_id: "artist-1",
 artist_name: "Budi 'Needles'",
 is_featured: true,
 aspect_ratio: "3:4",
 sort_order: 6,
 created_at: "2026-02-06T15:00:00Z",
 },
 {
 id: "work-7",
 title: "Traditional Bali Stencil Motif",
 style: "Ornamental",
 image_url: "",
 artist_id: "artist-2",
 artist_name: "Wayan Tinta",
 is_featured: false,
 aspect_ratio: "4:5",
 sort_order: 7,
 created_at: "2026-02-07T16:00:00Z",
 },
 {
 id: "work-8",
 title: "Tiger Portrait Shading",
 style: "Realism",
 image_url: "",
 artist_id: "artist-3",
 artist_name: "Sari Linework",
 is_featured: false,
 aspect_ratio: "1:1",
 sort_order: 8,
 created_at: "2026-02-08T17:00:00Z",
 },
];

export const mockInquiries: Inquiry[] = [
 {
 id: "inq-1",
 name: "Budi Santoso",
 phone: "+6281234567890",
 style: "Fine Line",
 placement: "Forearm",
 size: "8 x 5 cm",
 message: "Mau buat tato bunga lotus garis halus di lengan bagian dalam.",
 status: "new",
 created_at: "2026-03-01T09:12:00Z",
 },
 {
 id: "inq-2",
 name: "Sarah Miller",
 phone: "+6289876543210",
 style: "Blackwork",
 placement: "Upper Back",
 size: "15 x 10 cm",
 message: "Looking for a custom snake blackwork flash piece for next week.",
 status: "replied",
 created_at: "2026-03-02T14:30:00Z",
 },
];

export const mockFAQs: FAQ[] = [
 {
 id: "faq-1",
 question_id: "Apakah pembuatan tato di Blustereast menggunakan jarum steril?",
 question_en: "Does Blustereast use sterile single-use needles?",
 answer_id:
 "Ya, 100% mutlak. Kami hanya menggunakan jarum sekali pakai yang dibuka di hadapan klien, plastik pelindung perlengkapan, dan tinta bersertifikat medis internasional.",
 answer_en:
 "Yes, 100%. We exclusively use single-use sterile needle cartridges opened in front of you, equipment barrier films, and internationally certified inks.",
 },
 {
 id: "faq-2",
 question_id: "Bagaimana cara melakukan konsultasi dan pemesanan jadwal?",
 question_en: "How do I consult and book an appointment?",
 answer_id:
 "Anda dapat menekan tombol konsultasi WhatsApp atau mengisi formulir kontak di website. Sebutkan ide desain, lokasi penempatan, dan estimasi ukuran.",
 answer_en:
 "Click our WhatsApp button or fill out the contact form. Include your design concept, preferred body placement, and estimated size.",
 },
 {
 id: "faq-3",
 question_id: "Berapa batas usia minimum untuk ditato di studio ini?",
 question_en: "What is the minimum age requirement?",
 answer_id:
 "Batas usia minimum adalah 18 tahun. Kami berhak meminta kartu identitas resmi (KTP / Paspor) sebelum memulai sesi.",
 answer_en:
 "The minimum age requirement is strictly 18 years old. Valid photo ID (KTP / Passport) is required prior to your session.",
 },
 {
 id: "faq-4",
 question_id: "Berapa lama proses penyembuhan tato baru?",
 question_en: "How long does a new tattoo take to heal?",
 answer_id:
 "Proses penyembuhan permukaan memakan waktu 2 hingga 3 minggu. Penyembuhan lapisan dalam berlangsung sekitar 1-2 bulan jika mengikuti panduan aftercare.",
 answer_en:
 "Surface skin healing takes about 2 to 3 weeks. Deep tissue setting takes 1-2 months when proper aftercare is followed.",
 },
];
