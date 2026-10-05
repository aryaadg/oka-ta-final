/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Select } from "@/components/ui/Select";
import { Eye, Trash2, CheckCircle2, MessageSquare, Phone } from "lucide-react";

export default function AdminInquiriesPage() {
 const [inquiries, setInquiries] = useState<any[]>([]);
 const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [notification, setNotification] = useState<string | null>(null);
 const supabase = createClient();

 React.useEffect(() => {
 const fetchInquiries = async () => {
 const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
 if (data) setInquiries(data);
 };
 fetchInquiries();
 }, [supabase]);

 const handleStatusChange = async (id: string, newStatus: "new" | "replied" | "done") => {
 const { error } = await supabase.from("inquiries").update({ status: newStatus }).eq("id", id);
 if (!error) {
 setInquiries((prev) =>
 prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
 );
 if (selectedInquiry && selectedInquiry.id === id) {
 setSelectedInquiry({ ...selectedInquiry, status: newStatus });
 }
 showNotice(`Status inquiry diperbarui menjadi ${newStatus.toUpperCase()}`);
 } else {
 showNotice("Gagal memperbarui status.");
 }
 };

 const handleDelete = async () => {
 if (!deleteId) return;
 const { error } = await supabase.from("inquiries").delete().eq("id", deleteId);
 if (!error) {
 setInquiries((prev) => prev.filter((i) => i.id !== deleteId));
 setDeleteId(null);
 if (selectedInquiry?.id === deleteId) {
 setSelectedInquiry(null);
 }
 showNotice("Inquiry berhasil dihapus!");
 } else {
 showNotice("Gagal menghapus data.");
 }
 };

 const showNotice = (msg: string) => {
 setNotification(msg);
 setTimeout(() => setNotification(null), 3000);
 };

 const statusOptions = [
 { label: "Baru (New)", value: "new" },
 { label: "Sudah Dibalas (Replied)", value: "replied" },
 { label: "Selesai (Done)", value: "done" },
 ];

 return (
 <AdminLayoutShell>
 <div className="flex flex-col gap-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gym-darkBorder pb-6">
 <div>
 <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground ">
 INQUIRIES / KONSULTASI MASUK
 </h1>
 <p className="text-sm text-graphite font-mono">
 Daftar pesan dan formulir konsultasi dari calon klien website.
 </p>
 </div>
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
 <th className="py-3.5 px-4">Nama Klien</th>
 <th className="py-3.5 px-4">No. WhatsApp</th>
 <th className="py-3.5 px-4">Gaya & Ukuran</th>
 <th className="py-3.5 px-4">Status</th>
 <th className="py-3.5 px-4">Tanggal Masuk</th>
 <th className="py-3.5 px-4 text-right">Aksi</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-graphite/20">
 {inquiries.map((inq) => (
 <tr key={inq.id} className="hover:bg-background/40">
 <td className="py-3.5 px-4 font-bold text-foreground">{inq.name}</td>
 <td className="py-3.5 px-4 font-mono">
 <a
 href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
 target="_blank"
 rel="noreferrer"
 className="text-gym-gold hover:underline flex items-center gap-1"
 >
 <Phone className="w-3.5 h-3.5" />
 <span>{inq.phone}</span>
 </a>
 </td>
 <td className="py-3.5 px-4">
 <p className="font-semibold text-foreground">{inq.style || "-"}</p>
 <p className="text-xs text-graphite font-mono">
 {inq.placement} ({inq.size})
 </p>
 </td>
 <td className="py-3.5 px-4">
 <Badge variant={inq.status}>{inq.status.toUpperCase()}</Badge>
 </td>
 <td className="py-3.5 px-4 font-mono text-xs">
 {new Date(inq.created_at).toLocaleDateString("id-ID")}
 </td>
 <td className="py-3.5 px-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <button
 onClick={() => setSelectedInquiry(inq)}
 className="p-1.5 text-gym-gold hover:bg-stencil/10 rounded-[2px]"
 title="Lihat Detail"
 >
 <Eye className="w-4 h-4" />
 </button>
 <button
 onClick={() => setDeleteId(inq.id)}
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

 {/* View & Edit Status Detail Modal */}
 <Dialog
 isOpen={!!selectedInquiry}
 onClose={() => setSelectedInquiry(null)}
 title={`Detail Inquiry: ${selectedInquiry?.name || ""}`}
 >
 {selectedInquiry && (
 <div className="flex flex-col gap-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-card/5 border border-gym-darkBorder text-sm">
 <div>
 <span className="text-xs font-mono text-graphite block">NAMA KLIEN</span>
 <span className="font-bold text-foreground text-base">{selectedInquiry.name}</span>
 </div>
 <div>
 <span className="text-xs font-mono text-graphite block">WHATSAPP / HP</span>
 <a
 href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
 target="_blank"
 rel="noreferrer"
 className="font-mono font-bold text-gym-gold hover:underline text-base flex items-center gap-1.5"
 >
 <MessageSquare className="w-4 h-4" />
 <span>{selectedInquiry.phone}</span>
 </a>
 </div>
 <div>
 <span className="text-xs font-mono text-graphite block">GAYA & UKURAN</span>
 <span className="font-semibold text-foreground">
 {selectedInquiry.style} • {selectedInquiry.size}
 </span>
 </div>
 <div>
 <span className="text-xs font-mono text-graphite block">PENEMPATAN</span>
 <span className="font-semibold text-foreground">
 {selectedInquiry.placement || "-"}
 </span>
 </div>
 </div>

 <div className="flex flex-col gap-2">
 <span className="text-xs font-mono text-graphite font-bold">
 PESAN KLIEN / DESAIN IDE:
 </span>
 <p className="p-4 bg-gym-darkCard border border-gym-darkBorder text-sm text-foreground leading-relaxed">
 {selectedInquiry.message || "Tidak ada pesan tambahan."}
 </p>
 </div>

 {/* Status Change Selector */}
 <div className="flex flex-col gap-2 pt-2 border-t border-gym-darkBorder">
 <Select
 label="Ubah Status Inquiry"
 options={statusOptions}
 value={selectedInquiry.status}
 onChange={(e) =>
 handleStatusChange(
 selectedInquiry.id,
 e.target.value as "new" | "replied" | "done"
 )
 }
 />
 </div>

 <div className="flex justify-between items-center pt-4 border-t border-gym-darkBorder">
 <a
 href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo ${selectedInquiry.name}, terima kasih telah menghubungi Blustereast Tattoo Studio.`)}`}
 target="_blank"
 rel="noreferrer"
 >
 <Button variant="stencil" size="sm" className="gap-2">
 <MessageSquare className="w-4 h-4" />
 <span>Balas via WhatsApp</span>
 </Button>
 </a>

 <Button variant="paper" onClick={() => setSelectedInquiry(null)}>
 Tutup
 </Button>
 </div>
 </div>
 )}
 </Dialog>

 {/* Delete Confirmation */}
 <ConfirmDialog
 isOpen={!!deleteId}
 message="Apakah Anda yakin ingin menghapus data inquiry ini?"
 onConfirm={handleDelete}
 onCancel={() => setDeleteId(null)}
 />
 </div>
 </AdminLayoutShell>
 );
}
