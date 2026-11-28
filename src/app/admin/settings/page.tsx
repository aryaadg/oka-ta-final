"use client";

import React, { useState, useEffect } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockSiteSettings, SiteSettings } from "@/lib/mock";
import {
  fetchAdminSettingsAction,
  saveSiteSettingsAction,
  syncLocalToSupabaseAction,
} from "@/lib/data/actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  Save,
  Database,
  RefreshCw,
  ExternalLink,
  CloudUpload,
} from "lucide-react";

interface KeepAliveStatus {
  ok: boolean;
  mode: string;
  message: string;
  projectRef: string | null;
  dashboardUrl: string;
  accountHint: string;
  timestamp: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(mockSiteSettings);
  const [notification, setNotification] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [dbStatus, setDbStatus] = useState<KeepAliveStatus | null>(null);
  const [pinging, setPinging] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const checkKeepAlive = async (showToast = false) => {
    setPinging(true);
    try {
      const res = await fetch("/api/keep-alive", { cache: "no-store" });
      const data = (await res.json()) as KeepAliveStatus;
      setDbStatus(data);
      if (showToast) {
        setNotification(data.message);
        setTimeout(() => setNotification(null), 4000);
      }
    } catch {
      if (showToast) {
        setNotification("Gagal melakukan ping keep-alive.");
        setTimeout(() => setNotification(null), 3500);
      }
    } finally {
      setPinging(false);
    }
  };

  const handleSyncToSupabase = async () => {
    setSyncing(true);
    try {
      const res = await syncLocalToSupabaseAction();
      setNotification(res.message);
      setTimeout(() => setNotification(null), 5000);
      await checkKeepAlive(false);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchAdminSettingsAction().then((data) => {
      if (data) setSettings(data);
    });
    checkKeepAlive(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await saveSiteSettingsAction(settings);
      if (res.ok && res.settings) {
        setSettings(res.settings);
      }
      setNotification("Pengaturan studio berhasil disimpan & diperbarui!");
      setTimeout(() => setNotification(null), 3500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayoutShell>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gym-darkBorder pb-6">
          <div>
            <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground">
              PENGATURAN STUDIO & KONTAK
            </h1>
            <p className="text-sm text-graphite font-mono">
              Kelola nomor WhatsApp, alamat, jam operasional, profil studio, dan status database.
            </p>
          </div>
        </div>

        {/* Feedback Alert */}
        {notification && (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-[2px] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{notification}</span>
          </div>
        )}

        {/* Supabase Keep-Alive & Account Info Panel */}
        <div className="bg-gym-darkCard p-6 border-2 border-gym-gold flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gym-darkBorder pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gym-gold text-gym-dark flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-sans font-extrabold text-xl text-foreground">
                  STATUS DATABASE & AUTO KEEP-ALIVE SUPABASE
                </h2>
                <p className="text-xs font-mono text-graphite">
                  Mencegah Supabase Free Tier auto-pause & pelacak akun project.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => checkKeepAlive(true)}
                disabled={pinging}
                className="gap-1.5"
              >
                <RefreshCw
                  className={`w-4 h-4 ${pinging ? "animate-spin" : ""}`}
                />
                <span>{pinging ? "Melakukan Ping..." : "Ping Keep-Alive"}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSyncToSupabase}
                disabled={syncing}
                className="gap-1.5"
              >
                <CloudUpload className="w-4 h-4" />
                <span>
                  {syncing ? "Menyinkronkan..." : "Sinkronkan Data ke Supabase"}
                </span>
              </Button>

              {dbStatus?.dashboardUrl && (
                <a
                  href={dbStatus.dashboardUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    type="button"
                    variant="stencil"
                    size="sm"
                    className="gap-1.5"
                  >
                    <span>Buka Dashboard Supabase</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-background/60 border border-gym-darkBorder">
              <span className="text-xs font-mono text-graphite block mb-1">
                MODE PENYIMPANAN AKTIF
              </span>
              <Badge
                variant={dbStatus?.mode === "supabase" ? "done" : "stencil"}
              >
                {dbStatus?.mode === "supabase"
                  ? "SUPABASE CLOUD AKTIF"
                  : "PENYIMPANAN LOKAL (AUTO-FALLBACK)"}
              </Badge>
            </div>

            <div className="p-3 bg-background/60 border border-gym-darkBorder">
              <span className="text-xs font-mono text-graphite block mb-1">
                PROJECT REF ID SUPABASE
              </span>
              <span className="font-mono font-bold text-foreground">
                {dbStatus?.projectRef || "Belum diisi di .env.local"}
              </span>
            </div>

            <div className="p-3 bg-background/60 border border-gym-darkBorder">
              <span className="text-xs font-mono text-graphite block mb-1">
                PENGINGAT AKUN SUPABASE
              </span>
              <span className="font-mono text-xs text-gym-gold">
                {dbStatus?.accountHint || "Lihat .env.local / .env.example"}
              </span>
            </div>
          </div>

          <p className="text-xs text-graphite font-mono">
            Endpoint Keep-Alive: <code className="text-gym-gold">/api/keep-alive</code> (Terjadwal otomatis via Vercel Cron & GitHub Actions agar project tidak pernah pause).
          </p>
        </div>

        {/* Settings Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 bg-gym-darkCard p-6 sm:p-8 border border-gym-darkBorder"
        >
          {/* Section 1: Contact & Socials */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-extrabold text-2xl text-foreground border-b border-gym-darkBorder pb-2">
              1. KONTAK & MEDIA SOSIAL
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nomor WhatsApp Resmi"
                value={settings.whatsapp}
                onChange={(e) =>
                  setSettings({ ...settings, whatsapp: e.target.value })
                }
                placeholder="e.g. 6281234567890"
                required
              />
              <Input
                label="Jam Operasional"
                value={settings.opening_hours}
                onChange={(e) =>
                  setSettings({ ...settings, opening_hours: e.target.value })
                }
                placeholder="10:00 - 20:00 WITA"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Username Instagram"
                value={settings.instagram}
                onChange={(e) =>
                  setSettings({ ...settings, instagram: e.target.value })
                }
                placeholder="@blustereast_tattoostudio"
                required
              />
              <Input
                label="Username TikTok"
                value={settings.tiktok}
                onChange={(e) =>
                  setSettings({ ...settings, tiktok: e.target.value })
                }
                placeholder="@blustereast_tattoostudio"
                required
              />
            </div>

            <Input
              label="Alamat Lengkap Studio"
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
              placeholder="Jl. Akasia XVI, Denpasar Timur, Bali"
              required
            />

            <Input
              label="URL Embed Google Maps"
              value={settings.maps_embed_url}
              onChange={(e) =>
                setSettings({ ...settings, maps_embed_url: e.target.value })
              }
              placeholder="https://maps.google.com/..."
              required
            />
          </div>

          {/* Section 2: Studio Profile */}
          <div className="flex flex-col gap-4 border-t border-gym-darkBorder pt-6">
            <h3 className="font-sans font-extrabold text-2xl text-foreground border-b border-gym-darkBorder pb-2">
              2. TEKS PROFIL STUDIO (TENTANG KAMI)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Cerita Studio (Bahasa Indonesia)"
                value={settings.about_id}
                onChange={(e) =>
                  setSettings({ ...settings, about_id: e.target.value })
                }
              />
              <Textarea
                label="Cerita Studio (English)"
                value={settings.about_en}
                onChange={(e) =>
                  setSettings({ ...settings, about_en: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Visi Studio (Bahasa Indonesia)"
                value={settings.vision_id}
                onChange={(e) =>
                  setSettings({ ...settings, vision_id: e.target.value })
                }
              />
              <Textarea
                label="Visi Studio (English)"
                value={settings.vision_en}
                onChange={(e) =>
                  setSettings({ ...settings, vision_en: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Textarea
                label="Misi Studio (Bahasa Indonesia)"
                value={settings.mission_id}
                onChange={(e) =>
                  setSettings({ ...settings, mission_id: e.target.value })
                }
              />
              <Textarea
                label="Misi Studio (English)"
                value={settings.mission_en}
                onChange={(e) =>
                  setSettings({ ...settings, mission_en: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gym-darkBorder">
            <Button
              variant="stencil"
              type="submit"
              className="gap-2 py-3"
              disabled={saving}
            >
              <Save className="w-5 h-5" />
              <span>
                {saving ? "Menyimpan..." : "Simpan Perubahan Pengaturan"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </AdminLayoutShell>
  );
}
