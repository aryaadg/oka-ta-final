"use client";

import React, { useState } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockArtists, Artist } from "@/lib/mock";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminArtistsPage() {
 const [artists, setArtists] = useState<Artist[]>(mockArtists);
 const [modalOpen, setModalOpen] = useState(false);
 const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [notification, setNotification] = useState<string | null>(null);

 // Form State
 const [name, setName] = useState("");
 const [bioId, setBioId] = useState("");
 const [bioEn, setBioEn] = useState("");
 const [specialtiesText, setSpecialtiesText] = useState("");

 const openCreateModal = () => {
 setEditingArtist(null);
 setName("[ARTIST_NAME]");
 setBioId("");
 setBioEn("");
 setSpecialtiesText("Fine Line, Custom Stencil");
 setModalOpen(true);
 };

 const openEditModal = (a: Artist) => {
 setEditingArtist(a);
 setName(a.name);
 setBioId(a.bio_id);
 setBioEn(a.bio_en);
 setSpecialtiesText(a.specialties.join(", "));
 setModalOpen(true);
 };

 const handleSave = (e: React.FormEvent) => {
 e.preventDefault();
 const specialtiesArray = specialtiesText
 .split(",")
 .map((s) => s.trim())
 .filter(Boolean);

 if (editingArtist) {
 setArtists((prev) =>
 prev.map((a) =>
 a.id === editingArtist.id
 ? {
 ...a,
 name: name || "[ARTIST_NAME]",
 bio_id: bioId,
 bio_en: bioEn,
 specialties: specialtiesArray,
 }
 : a
 )
 );
 showNotice("Data seniman berhasil diperbarui!");
 } else {
 const newArtist: Artist = {
 id: `artist-${Date.now()}`,
 name: name || "[ARTIST_NAME]",
 photo_url: "",
 bio_id: bioId,
 bio_en: bioEn,
 specialties: specialtiesArray,
 sort_order: artists.length + 1,
 created_at: new Date().toISOString(),
 };
 setArtists((prev) => [...prev, newArtist]);
 showNotice("Resident artist baru berhasil ditambahkan!");
 }

 setModalOpen(false);
 };

 const handleDelete = () => {
 if (!deleteId) return;
 setArtists((prev) => prev.filter((a) => a.id !== deleteId));
 setDeleteId(null);
 showNotice("Data seniman berhasil dihapus!");
 };

 const showNotice = (msg: string) => {
 setNotification(msg);
 setTimeout(() => setNotification(null), 3000);
 };

 return (
 <AdminLayoutShell>
 <div className="flex flex-col gap-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gym-darkBorder pb-6">
 <div>
 <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground ">
 KELOLA RESIDENT ARTISTS
 </h1>
 <p className="text-sm text-graphite font-mono">
 Profil seniman studio, foto, dan spesialisasi karya.
 </p>
 </div>

 <Button variant="stencil" onClick={openCreateModal} className="gap-2">
 <Plus className="w-5 h-5" />
 <span>Tambah Artist Baru</span>
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
 <th className="py-3.5 px-4">Foto</th>
 <th className="py-3.5 px-4">Nama Artist</th>
 <th className="py-3.5 px-4">Spesialisasi</th>
 <th className="py-3.5 px-4">Bio Singkat</th>
 <th className="py-3.5 px-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-graphite/20">
 {artists.map((artist) => (
 <tr key={artist.id} className="hover:bg-background/40">
 <td className="py-3 px-4 w-20">
 <PhotoPlaceholder
 aspectRatio="1:1"
 label="[PHOTO]"
 className="w-12 h-12 text-[8px]"
 />
 </td>
 <td className="py-3 px-4 font-bold text-foreground">{artist.name}</td>
 <td className="py-3 px-4">
 <div className="flex flex-wrap gap-1">
 {artist.specialties.map((spec) => (
 <Badge key={spec} variant="stencil">
 {spec}
 </Badge>
 ))}
 </div>
 </td>
 <td className="py-3 px-4 text-xs max-w-xs truncate">{artist.bio_id}</td>
 <td className="py-3 px-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <button
 onClick={() => openEditModal(artist)}
 className="p-1.5 text-gym-gold hover:bg-stencil/10 rounded-[2px]"
 title="Edit"
 >
 <Edit2 className="w-4 h-4" />
 </button>
 <button
 onClick={() => setDeleteId(artist.id)}
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
 title={editingArtist ? "Edit Profil Artist" : "Tambah Artist Baru"}
 >
 <form onSubmit={handleSave} className="flex flex-col gap-4">
 <Input
 label="Nama Artist"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="[ARTIST_NAME]"
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

 <div className="p-4 bg-card/5 border border-gym-darkBorder flex flex-col gap-2">
 <span className="text-xs font-mono font-bold text-graphite">
 UPLOAD FOTO ARTIST (SUPABASE STORAGE)
 </span>
 <PhotoPlaceholder
 aspectRatio="1:1"
 label="[PHOTO ARTIST PLACEHOLDER]"
 showDashedBorder={true}
 className="w-32 h-32 mx-auto"
 />
 <span className="text-xs text-graphite ">
 *Pada Phase 1 foto ditampilkan dengan placeholder block.
 </span>
 </div>

 <div className="flex justify-end gap-3 pt-4 border-t border-gym-darkBorder">
 <Button variant="paper" type="button" onClick={() => setModalOpen(false)}>
 Batal
 </Button>
 <Button variant="stencil" type="submit">
 Simpan Artist
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
