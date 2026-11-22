"use client";

import React, { useState, useEffect } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockSiteSettings, SiteSettings } from "@/lib/mock";
import {
  fetchAdminSettingsAction,
  saveSiteSettingsAction,
} from "@/lib/data/actions";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(mockSiteSettings);
  const [notification, setNotification] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminSettingsAction().then((data) => {
      if (data) setSettings(data);
    });
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
              Kelola nomor WhatsApp, alamat, jam operasional, dan profil studio.
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
