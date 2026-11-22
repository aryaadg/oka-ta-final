"use client";

import React, { useState, useEffect } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockArtists, Artist } from "@/lib/mock";
import {
  fetchAdminArtistsAction,
  saveArtistAction,
  deleteArtistAction,
} from "@/lib/data/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Plus, Edit2, Trash2, CheckCircle2, Upload } from "lucide-react";

const PRESET_ARTIST_PHOTOS = [
  { label: "Portrait Artist 1 (/temp/artist-1.jpg)", value: "/temp/artist-1.jpg" },
  { label: "Portrait Artist 2 (/temp/artist-2.jpg)", value: "/temp/artist-2.jpg" },
  { label: "Portrait Artist 3 (/temp/artist-3.jpg)", value: "/temp/artist-3.jpg" },
];

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("/temp/artist-1.jpg");
  const [bioId, setBioId] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [specialtiesText, setSpecialtiesText] = useState("");

  useEffect(() => {
    fetchAdminArtistsAction().then((data) => {
      if (data) setArtists(data);
    });
  }, []);

  const openCreateModal = () => {
    setEditingArtist(null);
    setName("");
    setPhotoUrl("/temp/artist-1.jpg");
    setBioId("");
    setBioEn("");
    setSpecialtiesText("Fine Line, Custom Stencil");
    setModalOpen(true);
  };

  const openEditModal = (a: Artist) => {
    setEditingArtist(a);
    setName(a.name);
    setPhotoUrl(a.photo_url || "/temp/artist-1.jpg");
    setBioId(a.bio_id);
    setBioEn(a.bio_en);
    setSpecialtiesText(a.specialties.join(", "));
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const specialtiesArray = specialtiesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await saveArtistAction({
        id: editingArtist?.id,
        name: name.trim() || "Studio Artist",
        photo_url: photoUrl,
        bio_id: bioId,
        bio_en: bioEn,
        specialties:
          specialtiesArray.length > 0 ? specialtiesArray : ["Custom Tattoo"],
      });

      if (res.ok && res.artists) {
        setArtists(res.artists);
        showNotice(
          editingArtist
            ? "Data seniman berhasil diperbarui!"
            : "Resident artist baru berhasil ditambahkan!"
        );
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteArtistAction(deleteId);
    if (res.ok && res.artists) {
      setArtists(res.artists);
    } else {
      setArtists((prev) => prev.filter((a) => a.id !== deleteId));
    }
    setDeleteId(null);
    showNotice("Data seniman berhasil dihapus!");
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <AdminLayoutShell>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gym-darkBorder pb-6">
          <div>
            <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground">
              KELOLA RESIDENT ARTISTS
            </h1>
            <p className="text-sm text-graphite font-mono">
              Profil seniman studio, foto, dan spesialisasi karya ({artists.length} artist).
            </p>
          </div>

          <Button variant="stencil" onClick={openCreateModal} className="gap-2">
            <Plus className="w-5 h-5" />
            <span>Tambah Artist Baru</span>
          </Button>
        </div>

        {/* Feedback Alert */}
        {notification && (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 rounded-[2px] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">{notification}</span>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-gym-darkCard border border-gym-darkBorder overflow-x-auto">
          <table className="w-full text-left text-sm text-graphite border-collapse">
            <thead>
              <tr className="border-b border-gym-darkBorder font-mono text-xs text-foreground bg-background/50">
                <th className="py-3.5 px-4">Foto</th>
                <th className="py-3.5 px-4">Nama Artist</th>
                <th className="py-3.5 px-4">Spesialisasi</th>
                <th className="py-3.5 px-4">Bio Singkat</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gym-darkBorder">
              {artists.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 px-4 text-center text-graphite font-mono text-xs"
                  >
                    Belum ada data artist. Klik &quot;Tambah Artist Baru&quot; untuk menambahkan.
                  </td>
                </tr>
              ) : (
                artists.map((artist) => (
                  <tr key={artist.id} className="hover:bg-background/40">
                    <td className="py-3 px-4 w-20">
                      <PhotoPlaceholder
                        aspectRatio="1:1"
                        label={artist.name}
                        src={artist.photo_url}
                        className="w-12 h-12 text-[8px]"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-foreground">
                      {artist.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {artist.specialties.map((spec) => (
                          <Badge key={spec} variant="stencil">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs max-w-xs truncate">
                      {artist.bio_id}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(artist)}
                          className="p-2 text-gym-gold hover:bg-gym-gold/10 rounded-[2px]"
                          title="Edit Artist"
                          aria-label={`Edit ${artist.name}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(artist.id)}
                          className="p-2 text-needle hover:bg-needle/10 rounded-[2px]"
                          title="Hapus Artist"
                          aria-label={`Hapus ${artist.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        <Dialog
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingArtist ? "Edit Profil Artist" : "Tambah Artist Baru"}
        >
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <Input
              label="Nama Artist"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Budi 'Needles'"
              required
            />

            <Input
              label="Spesialisasi (Pisahkan dengan koma)"
              value={specialtiesText}
              onChange={(e) => setSpecialtiesText(e.target.value)}
              placeholder="Fine Line, Blackwork, Realism"
              required
            />

            <Textarea
              label="Bio / Profil (Bahasa Indonesia)"
              value={bioId}
              onChange={(e) => setBioId(e.target.value)}
              placeholder="Jelaskan keahlian dan latar belakang artist..."
            />

            <Textarea
              label="Bio / Profil (English)"
              value={bioEn}
              onChange={(e) => setBioEn(e.target.value)}
              placeholder="Artist bio in English..."
            />

            <div className="p-4 bg-background/60 border border-gym-darkBorder flex flex-col gap-3">
              <span className="text-xs font-mono font-bold text-gym-gold">
                FOTO PROFIL ARTIST
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4">
                  <PhotoPlaceholder
                    aspectRatio="1:1"
                    label={name || "[PHOTO ARTIST]"}
                    src={photoUrl}
                    className="w-28 h-28 mx-auto"
                  />
                </div>
                <div className="sm:col-span-8 flex flex-col gap-3">
                  <Select
                    label="Pilih Foto Preset Artist"
                    options={PRESET_ARTIST_PHOTOS}
                    value={
                      PRESET_ARTIST_PHOTOS.some((p) => p.value === photoUrl)
                        ? photoUrl
                        : PRESET_ARTIST_PHOTOS[0].value
                    }
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-graphite">
                      Atau Unggah Foto dari Komputer:
                    </label>
                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-gym-darkCard border border-gym-darkBorder hover:border-gym-gold rounded-[2px] text-xs font-semibold text-foreground cursor-pointer w-fit">
                      <Upload className="w-4 h-4 text-gym-gold" />
                      <span>Pilih File Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gym-darkBorder">
              <Button
                variant="paper"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Batal
              </Button>
              <Button variant="stencil" type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan Artist"}
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={!!deleteId}
          message="Apakah Anda yakin ingin menghapus data artist ini?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      </div>
    </AdminLayoutShell>
  );
}
