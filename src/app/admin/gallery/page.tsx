"use client";

import React, { useState, useEffect } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockGalleryItems, mockArtists, GalleryItem, Artist } from "@/lib/mock";
import {
  fetchAdminGalleryDataAction,
  saveGalleryItemAction,
  deleteGalleryItemAction,
} from "@/lib/data/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Plus, Edit2, Trash2, CheckCircle2, Upload } from "lucide-react";

const PRESET_GALLERY_PHOTOS = [
  { label: "Botanical Fine Line (/temp/gallery-1.jpg)", value: "/temp/gallery-1.jpg" },
  { label: "Snake Blackwork (/temp/gallery-2.jpg)", value: "/temp/gallery-2.jpg" },
  { label: "Sculpture Realism (/temp/gallery-3.jpg)", value: "/temp/gallery-3.jpg" },
  { label: "Geometric Mandala (/temp/gallery-4.jpg)", value: "/temp/gallery-4.jpg" },
  { label: "Ornamental Spine (/temp/gallery-5.jpg)", value: "/temp/gallery-5.jpg" },
  { label: "Tiger Realism (/temp/gallery-6.jpg)", value: "/temp/gallery-6.jpg" },
  { label: "Script Lettering (/temp/gallery-7.jpg)", value: "/temp/gallery-7.jpg" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(mockGalleryItems);
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [style, setStyle] = useState("Fine Line");
  const [artistId, setArtistId] = useState(mockArtists[0]?.id || "");
  const [aspectRatio, setAspectRatio] = useState<"4:5" | "1:1" | "3:4">("4:5");
  const [imageUrl, setImageUrl] = useState("/temp/gallery-1.jpg");
  const [isFeatured, setIsFeatured] = useState(true);

  useEffect(() => {
    fetchAdminGalleryDataAction().then((data) => {
      if (data.items) setItems(data.items);
      if (data.artists && data.artists.length > 0) {
        setArtists(data.artists);
      }
    });
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setStyle("Fine Line");
    setArtistId(artists[0]?.id || "");
    setAspectRatio("4:5");
    setImageUrl("/temp/gallery-1.jpg");
    setIsFeatured(true);
    setModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setStyle(item.style);
    setArtistId(item.artist_id || artists[0]?.id || "");
    setAspectRatio(item.aspect_ratio || "4:5");
    setImageUrl(item.image_url || "/temp/gallery-1.jpg");
    setIsFeatured(item.is_featured);
    setModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await saveGalleryItemAction({
        id: editingItem?.id,
        title: title.trim() || "Karya Tato Baru",
        style,
        image_url: imageUrl,
        artist_id: artistId,
        aspect_ratio: aspectRatio,
        is_featured: isFeatured,
      });

      if (res.ok && res.items) {
        setItems(res.items);
        showNotice(
          editingItem
            ? "Karya berhasil diperbarui!"
            : "Karya baru berhasil ditambahkan!"
        );
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteGalleryItemAction(deleteId);
    if (res.ok && res.items) {
      setItems(res.items);
    } else {
      setItems((prev) => prev.filter((i) => i.id !== deleteId));
    }
    setDeleteId(null);
    showNotice("Karya berhasil dihapus!");
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const styleOptions = [
    { label: "Fine Line", value: "Fine Line" },
    { label: "Blackwork", value: "Blackwork" },
    { label: "Realism", value: "Realism" },
    { label: "Ornamental", value: "Ornamental" },
    { label: "Geometric", value: "Geometric" },
  ];

  const artistOptions = artists.map((a) => ({
    label: a.name,
    value: a.id,
  }));

  const aspectOptions = [
    { label: "4:5 (Tinggi)", value: "4:5" },
    { label: "1:1 (Persegi)", value: "1:1" },
    { label: "3:4 (Standar)", value: "3:4" },
  ];

  return (
    <AdminLayoutShell>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gym-darkBorder pb-6">
          <div>
            <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground">
              KELOLA GALERI FLASH
            </h1>
            <p className="text-sm text-graphite font-mono">
              Daftar karya dan stencil flash studio Blustereast ({items.length} karya).
            </p>
          </div>

          <Button variant="stencil" onClick={openCreateModal} className="gap-2">
            <Plus className="w-5 h-5" />
            <span>Tambah Karya Baru</span>
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
                <th className="py-3.5 px-4">Preview</th>
                <th className="py-3.5 px-4">Judul Karya</th>
                <th className="py-3.5 px-4">Gaya</th>
                <th className="py-3.5 px-4">Artist</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gym-darkBorder">
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 px-4 text-center text-graphite font-mono text-xs"
                  >
                    Belum ada karya di galeri. Klik &quot;Tambah Karya Baru&quot; untuk menambahkan.
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const matchedArtist = artists.find((a) => a.id === item.artist_id);
                  return (
                    <tr key={item.id} className="hover:bg-background/40">
                      <td className="py-3 px-4 w-20">
                        <PhotoPlaceholder
                          aspectRatio="1:1"
                          label={item.title}
                          src={item.image_url}
                          className="w-12 h-12 text-[8px]"
                        />
                      </td>
                      <td className="py-3 px-4 font-bold text-foreground">
                        {item.title}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="stencil">{item.style}</Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground/90">
                        {matchedArtist?.name || item.artist_name || "Studio Artist"}
                      </td>
                      <td className="py-3 px-4">
                        {item.is_featured ? (
                          <span className="text-xs font-mono text-gym-gold font-bold">
                            ✓ Ya
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-graphite">
                            Tidak
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-2 text-gym-gold hover:bg-gym-gold/10 rounded-[2px]"
                            title="Edit Karya"
                            aria-label={`Edit ${item.title}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(item.id)}
                            className="p-2 text-needle hover:bg-needle/10 rounded-[2px]"
                            title="Hapus Karya"
                            aria-label={`Hapus ${item.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Form */}
        <Dialog
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingItem ? "Edit Karya Galeri" : "Tambah Karya Galeri Baru"}
        >
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <Input
              label="Judul Karya"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fine Line Lotus Stencil"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Gaya Tato"
                options={styleOptions}
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              />

              <Select
                label="Resident Artist"
                options={artistOptions}
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
              />
            </div>

            <Select
              label="Rasio Gambar (Aspect Ratio)"
              options={aspectOptions}
              value={aspectRatio}
              onChange={(e) =>
                setAspectRatio(e.target.value as "4:5" | "1:1" | "3:4")
              }
            />

            <div className="p-4 bg-background/60 border border-gym-darkBorder flex flex-col gap-3">
              <span className="text-xs font-mono font-bold text-gym-gold">
                FOTO KARYA (UPLOAD FILE / PILIH PRESET STUDIO)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4">
                  <PhotoPlaceholder
                    aspectRatio="4:5"
                    label={title || "[PREVIEW KARYA]"}
                    src={imageUrl}
                    className="w-full max-w-[140px] mx-auto"
                  />
                </div>
                <div className="sm:col-span-8 flex flex-col gap-3">
                  <Select
                    label="Pilih Foto Preset Studio"
                    options={PRESET_GALLERY_PHOTOS}
                    value={
                      PRESET_GALLERY_PHOTOS.some((p) => p.value === imageUrl)
                        ? imageUrl
                        : PRESET_GALLERY_PHOTOS[0].value
                    }
                    onChange={(e) => setImageUrl(e.target.value)}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-graphite">
                      Atau Unggah File Foto (JPG/PNG/WebP):
                    </label>
                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-gym-darkCard border border-gym-darkBorder hover:border-gym-gold rounded-[2px] text-xs font-semibold text-foreground cursor-pointer w-fit">
                      <Upload className="w-4 h-4 text-gym-gold" />
                      <span>Pilih File dari Komputer</span>
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

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-gym-gold border-graphite rounded"
              />
              <label
                htmlFor="isFeatured"
                className="text-sm font-semibold text-foreground cursor-pointer"
              >
                Tampilkan di Beranda (Featured Work)
              </label>
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
                {saving ? "Menyimpan..." : "Simpan Karya"}
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={!!deleteId}
          message="Apakah Anda yakin ingin menghapus karya ini dari galeri?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      </div>
    </AdminLayoutShell>
  );
}
