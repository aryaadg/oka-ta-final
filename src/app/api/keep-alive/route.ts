import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, readLocalStore } from "@/lib/data/store";

function extractProjectRef(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/https?:\/\/([a-z0-9-]+)\.supabase\.co/i);
  return match ? match[1] : null;
}

export async function GET(request: Request) {
  const timestamp = new Date().toISOString();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const accountHint =
    process.env.NEXT_PUBLIC_SUPABASE_ACCOUNT_HINT ||
    "Lihat catatan di file .env.local / .env.example";
  const projectRef = extractProjectRef(supabaseUrl);
  const dashboardUrl = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}`
    : "https://supabase.com/dashboard/projects";

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("id")
        .limit(1);

      if (error) {
        return NextResponse.json(
          {
            ok: false,
            mode: "supabase-error-fallback",
            message: `Ping Supabase gagal (${error.message}), sistem menggunakan fallback lokal.`,
            projectRef,
            dashboardUrl,
            accountHint,
            timestamp,
            url: request.url,
          },
          { status: 200 }
        );
      }

      return NextResponse.json({
        ok: true,
        mode: "supabase",
        message:
          "Ping Keep-Alive ke Supabase berhasil! Timer auto-pause 7 hari telah di-reset.",
        rowsChecked: data?.length ?? 0,
        projectRef,
        dashboardUrl,
        accountHint,
        timestamp,
      });
    } catch (err) {
      return NextResponse.json(
        {
          ok: false,
          mode: "supabase-unreachable",
          message:
            err instanceof Error
              ? err.message
              : "Tidak dapat menghubungi Supabase, fallback lokal aktif.",
          projectRef,
          dashboardUrl,
          accountHint,
          timestamp,
        },
        { status: 200 }
      );
    }
  }

  const local = readLocalStore();
  return NextResponse.json({
    ok: true,
    mode: "local-fallback",
    message:
      "Mode penyimpanan lokal aktif (NEXT_PUBLIC_SUPABASE_URL belum diisi). Saat Supabase dihubungkan, endpoint ini otomatis menjaga database agar tidak pause.",
    galleryCount: local.galleryItems.length,
    projectRef: null,
    dashboardUrl,
    accountHint,
    timestamp,
  });
}
