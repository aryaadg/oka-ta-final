import fs from "fs";
import path from "path";
import {
  SiteSettings,
  Artist,
  Service,
  GalleryItem,
  Inquiry,
  mockSiteSettings,
  mockArtists,
  mockServices,
  mockGalleryItems,
  mockInquiries,
} from "../mock";

export interface LocalStoreData {
  siteSettings: SiteSettings;
  artists: Artist[];
  services: Service[];
  galleryItems: GalleryItem[];
  inquiries: Inquiry[];
  preferLocalFallback?: boolean;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

let memoryStore: LocalStoreData | null = null;

function createInitialStore(): LocalStoreData {
  return {
    siteSettings: { ...mockSiteSettings },
    artists: mockArtists.map((a) => ({ ...a, specialties: [...a.specialties] })),
    services: mockServices.map((s) => ({ ...s })),
    galleryItems: mockGalleryItems.map((g) => ({ ...g })),
    inquiries: mockInquiries.map((i) => ({ ...i })),
    preferLocalFallback: false,
  };
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(
    url &&
      key &&
      url !== "https://placeholder.supabase.co" &&
      !url.includes("placeholder") &&
      key !== "placeholder-key" &&
      !key.includes("placeholder")
  );
}

export function readLocalStore(): LocalStoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf8");
      const parsed = JSON.parse(raw) as Partial<LocalStoreData>;
      const initial = createInitialStore();
      memoryStore = {
        siteSettings: parsed.siteSettings || initial.siteSettings,
        artists: Array.isArray(parsed.artists) ? parsed.artists : initial.artists,
        services: Array.isArray(parsed.services) ? parsed.services : initial.services,
        galleryItems: Array.isArray(parsed.galleryItems)
          ? parsed.galleryItems
          : initial.galleryItems,
        inquiries: Array.isArray(parsed.inquiries)
          ? parsed.inquiries
          : initial.inquiries,
        preferLocalFallback: Boolean(parsed.preferLocalFallback),
      };
      return memoryStore;
    }
  } catch {
    // Fallback to memory store if filesystem read fails
  }

  if (!memoryStore) {
    memoryStore = createInitialStore();
    writeLocalStore(memoryStore);
  }
  return memoryStore;
}

export function writeLocalStore(data: LocalStoreData): void {
  memoryStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {
    // In read-only serverless environments, memoryStore keeps state for the instance lifetime
  }
}
