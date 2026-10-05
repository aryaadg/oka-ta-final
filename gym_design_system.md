# GYM Design System (Dark & Gold Theme)

Dokumen ini berisi panduan sistem desain yang diekstrak dari project `WEB-GYM-YUDIS`. Anda dapat menyalin konfigurasi ini untuk menerapkan tema "Premium Dark Gym" dengan aksen emas ke project web Next.js/Tailwind Anda yang lain.

## 1. Tipografi (Fonts)

Sistem ini bergantung pada perpaduan font sans-serif yang modern dan rapi.
*   **Primary Font:** `Geist Sans` atau `Inter`
*   **Monospace Font:** `Geist Mono`

**Rekomendasi Setup di Next.js (`app/layout.tsx`):**
Gunakan `next/font/google` atau `next/font/local` untuk mengimpor font `Inter` dan mendefinisikannya sebagai variabel CSS `--font-geist-sans` atau `--font-inter`.

---

## 2. Global CSS & CSS Variables (Shadcn UI)

Desain ini dibangun menggunakan kerangka variabel warna bergaya **Shadcn UI**. Salin kode berikut ke dalam file `globals.css` atau `app/globals.css` Anda untuk menerapkan tema gelap secara menyeluruh dan warna aksen emas (`#f5c518`).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    /* Vibrant Gold/Yellow */
    --primary: 47.9 95.8% 53.1%; 
    --primary-foreground: 26 83.3% 1.1%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 47.9 95.8% 53.1%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 47.9 95.8% 53.1%;
    --primary-foreground: 26 83.3% 1.1%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 47.9 95.8% 53.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
    /* Force pitch dark background and white text */
    background-color: #0a0a0a;
    color: #ffffff;
    font-family: 'Inter', 'Geist', ui-sans-serif, system-ui, sans-serif;
  }
}
```

---

## 3. Custom CSS Estetika (Tambahan di `globals.css`)

Website Gym ini menggunakan kustomisasi *scrollbar* khusus dan utilitas efek teks bergaris luar (outline). Tambahkan ini di bagian bawah `globals.css`:

```css
/* Efek Outline Teks Transparan */
.text-stroke {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
  color: transparent;
}

/* Custom Scrollbar Emas/Gelap */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: hsl(47.9 95.8% 53.1% / 0.5); /* Emas transparan */
  border-radius: 2px;
}

/* Hide scrollbar untuk elemen tertentu (contoh: menu admin/tabel) */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## 4. Konfigurasi Tailwind (`tailwind.config.ts`)

Agar warna dan animasi khusus dapat dipanggil menggunakan *utility class* Tailwind (seperti `text-gym-gold`, `bg-gym-darkCard`, atau `animate-fade-in`), gabungkan objek `extend` di bawah ini ke dalam `tailwind.config.ts` Anda:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // TEMA WARNA KHUSUS BRAND GYM
        gym: {
          gold: "#f5c518",
          dark: "#0a0a0a",
          darkCard: "#111111",
          darkBorder: "rgba(255,255,255,0.1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [], // Tambahkan plugins "tailwindcss-animate" jika diperlukan oleh Shadcn
};

export default config;
```

---

### Cara Menggunakan Tema Ini di Project Baru:
1. Pastikan Anda menginstall TailwindCSS.
2. Jika Anda menggunakan **Shadcn UI**, cukup jalankan init standar dan ganti `globals.css` serta `tailwind.config.ts` dengan kode di atas.
3. Anda bisa menggunakan warna gym kustom dengan *class* seperti: `bg-gym-dark`, `text-gym-gold`, atau `border-gym-darkBorder`.
4. Untuk memberikan efek tulisan kosong bergaris emas/putih seperti *hero title* gym kekinian, tambahkan *class* `text-stroke` pada elemen HTML Anda.
