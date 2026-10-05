// Photo Map for UI Slots
export const PHOTOS = {
 hero: { src: "/temp/hero-1.jpg", alt: "Blustereast Tattoo Studio Bali", width: 1200, height: 800 },
 about: [
 { src: "/temp/about-1.jpg", alt: "Studio Interior", width: 1200, height: 800 },
 { src: "/temp/about-2.jpg", alt: "Tattoo Process", width: 1200, height: 800 },
 { src: "/temp/about-3.jpg", alt: "Studio Exterior", width: 1200, height: 800 },
 ],
 artists: [
 { src: "/temp/artist-1.jpg", alt: "Artist 1 Portrait", width: 800, height: 800 },
 { src: "/temp/artist-2.jpg", alt: "Artist 2 Portrait", width: 800, height: 800 },
 { src: "/temp/artist-3.jpg", alt: "Artist 3 Portrait", width: 800, height: 800 },
 ],
 gallery: Array.from({ length: 12 }).map((_, i) => ({
 src: `/temp/gallery-${i + 1}.jpg`,
 alt: `Gallery Item ${i + 1}`,
 width: 800,
 height: 1000,
 })),
};
