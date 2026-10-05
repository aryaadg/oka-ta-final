"use client";

import React, { useState } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockGalleryItems, mockArtists, GalleryItem } from "@/lib/mock";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminGalleryPage() {
 const [items, setItems] = useState<GalleryItem[]>(mockGalleryItems);
 const [modalOpen, setModalOpen] = useState(false);
 const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [notification, setNotification] = useState<string | null>(null);

 // Form State
 const [title, setTitle] = useState("");
 const [style, setStyle] = useState("Fine Line");
 const [artistId, setArtistId] = useState(mockArtists[0]?.id || "");
 const [aspectRatio, setAspectRatio] = useState<"4:5" | "1:1" | "3:4">("4:5");
 const [isFeatured, setIsFeatured] = useState(true);

 const openCreateModal = () => {
 setEditingItem(null);
 setTitle("");
 setStyle("Fine Line");
 setArtistId(mockArtists[0]?.id || "");
 setAspectRatio("4:5");
 setIsFeatured(true);
 setModalOpen(true);
 };

 const openEditModal = (item: GalleryItem) => {
 setEditingItem(item);
 setTitle(item.title);
 setStyle(item.style);
 setArtistId(item.artist_id);
 setAspectRatio(item.aspect_ratio);
 setIsFeatured(item.is_featured);
 setModalOpen(true);
 };

 const handleSave = (e: React.FormEvent) => {
 e.preventDefault();
 const selectedArtist = mockArtists.find((a) => a.id === artistId);

 if (editingItem) {
 // Update
 setItems((prev) =>
 prev.map((i) =>
 i.id === editingItem.id
 ? {
 ...i,
 title,
 style,
 artist_id: artistId,
 artist_name: selectedArtist?.name || "[ARTIST_NAME]",
 aspect_ratio: aspectRatio,
 is_featured: isFeatured,
 }
 : i
 )
 );
 showNotice("Karya berhasil diperbarui!");
 } else {
 // Create
 const newItem: GalleryItem = {
 id: `work-${Date.now()}`,
 title: title || "Karya Tato Baru",
 style,
 image_url: "",
 artist_id: artistId,
 artist_name: selectedArtist?.name || "[ARTIST_NAME]",
 is_featured: isFeatured,
 aspect_ratio: aspectRatio,
 sort_order: items.length + 1,
 created_at: new Date().toISOString(),
 };
 setItems((prev) => [newItem, ...prev]);
 showNotice("Karya baru berhasil ditambahkan!");
 }

 setModalOpen(false);
 };

 const handleDelete = () => {
 if (!deleteId) return;
 setItems((prev) => prev.filter((i) => i.id !== deleteId));
 setDeleteId(null);
 showNotice("Karya berhasil dihapus!");
 };

 const showNotice = (msg: string) => {
 setNotification(msg);
 setTimeout(() => setNotification(null), 3000);
 };

 const styleOptions = [
 { label: "Fine Line", value: "Fine Line" },
 { label: "Blackwork", value: "Blackwork" },
 { label: "Realism", value: "Realism" },
 { label: "Ornamental", value: "Ornamental" },
 { label: "Geometric", value: "Geometric" },
 ];

 const artistOptions = mockArtists.map((a) => ({
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
 <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground ">
 KELOLA GALERI FLASH
 </h1>
 <p className="text-sm text-graphite font-mono">
 Daftar karya dan stencil flash studio Blustereast.
 </p>
 </div>

 <Button variant="stencil" onClick={openCreateModal} className="gap-2">
 <Plus className="w-5 h-5" />
 <span>Tambah Karya Baru</span>
 </Button>
 </div>

 {/* Feedback Alert */}
 {notification && (
 <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 rounded-[2px] flex items-center gap-3">
 <CheckCircle2 className="w-5 h-5 text-emerald-600" />
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
 <tbody className="divide-y divide-graphite/20">
 {items.map((item) => (
 <tr key={item.id} className="hover:bg-background/40">
 <td className="py-3 px-4 w-20">
 <PhotoPlaceholder
 aspectRatio="1:1"
 label="[PHOTO]"
 className="w-12 h-12 text-[8px]"
 />
 </td>
 <td className="py-3 px-4 font-bold text-foreground">{item.title}</td>
 <td className="py-3 px-4">
 <Badge variant="stencil">{item.style}</Badge>
 </td>
 <td className="py-3 px-4">{item.artist_name || "[ARTIST_NAME]"}</td>
 <td className="py-3 px-4">
 {item.is_featured ? (
 <span className="text-xs font-mono text-gym-gold font-bold">✓ Ya</span>
 ) : (
 <span className="text-xs font-mono text-graphite">Tidak</span>
 )}
 </td>
 <td className="py-3 px-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <button
 onClick={() => openEditModal(item)}
 className="p-1.5 text-gym-gold hover:bg-stencil/10 rounded-[2px]"
 title="Edit"
 >
 <Edit2 className="w-4 h-4" />
 </button>
 <button
 onClick={() => setDeleteId(item.id)}
 className="p-1.5 text-needle hover:bg-needle/10 rounded-[2px]"
 title="Hapus"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 ))}
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
 onChange={(e) => setAspectRatio(e.target.value as "4:5" | "1:1" | "3:4")}
 />

 <div className="p-4 bg-card/5 border border-gym-darkBorder flex flex-col gap-2">
 <span className="text-xs font-mono font-bold text-graphite">
 UPLOAD FOTO (SUPABASE STORAGE)
 </span>
 <PhotoPlaceholder
 aspectRatio="16:9"
 label="[PHOTO UPLOAD PLACEHOLDER]"
 showDashedBorder={true}
 />
 <span className="text-xs text-graphite">
 *Pada Phase 1 foto ditampilkan dengan placeholder block. Upload file aktif pada Phase 3.
 </span>
 </div>

 <div className="flex items-center gap-2 pt-2">
 <input
 type="checkbox"
 id="isFeatured"
 checked={isFeatured}
 onChange={(e) => setIsFeatured(e.target.checked)}
 className="w-4 h-4 text-gym-gold border-graphite rounded focus:ring-gym-gold"
 />
 <label htmlFor="isFeatured" className="text-sm font-semibold text-foreground">
 Tampilkan di Beranda (Featured Work)
 </label>
 </div>

 <div className="flex justify-end gap-3 pt-4 border-t border-gym-darkBorder">
 <Button variant="paper" type="button" onClick={() => setModalOpen(false)}>
 Batal
 </Button>
 <Button variant="stencil" type="submit">
 Simpan Karya
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
