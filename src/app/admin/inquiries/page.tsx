"use client";

import React, { useState, useEffect } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockInquiries, Inquiry } from "@/lib/mock";
import {
  fetchAdminInquiriesAction,
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/lib/data/actions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Select } from "@/components/ui/Select";
import { Eye, Trash2, CheckCircle2, MessageSquare, Phone } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminInquiriesAction().then((data) => {
      if (data) setInquiries(data);
    });
  }, []);

  const handleStatusChange = async (
    id: string,
    newStatus: "new" | "replied" | "done"
  ) => {
    const res = await updateInquiryStatusAction(id, newStatus);
    if (res.ok && res.inquiries) {
      setInquiries(res.inquiries);
    } else {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    }
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    showNotice(`Status inquiry diperbarui menjadi ${newStatus.toUpperCase()}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteInquiryAction(deleteId);
    if (res.ok && res.inquiries) {
      setInquiries(res.inquiries);
    } else {
      setInquiries((prev) => prev.filter((i) => i.id !== deleteId));
    }
    if (selectedInquiry?.id === deleteId) {
      setSelectedInquiry(null);
    }
    setDeleteId(null);
    showNotice("Inquiry berhasil dihapus!");
  };

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
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
            <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground">
              INQUIRIES / KONSULTASI MASUK
            </h1>
            <p className="text-sm text-graphite font-mono">
              Daftar pesan dan formulir konsultasi dari calon klien website ({inquiries.length} pesan).
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
            <tbody className="divide-y divide-gym-darkBorder">
              {inquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 px-4 text-center text-graphite font-mono text-xs"
                  >
                    Belum ada pesan / inquiry masuk.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-background/40">
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      {inq.name}
                    </td>
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
                      <p className="font-semibold text-foreground">
                        {inq.style || "-"}
                      </p>
                      <p className="text-xs text-graphite font-mono">
                        {inq.placement} ({inq.size})
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={inq.status}>
                        {inq.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      {new Date(inq.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-2 text-gym-gold hover:bg-gym-gold/10 rounded-[2px]"
                          title="Lihat Detail"
                          aria-label={`Lihat Detail ${inq.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(inq.id)}
                          className="p-2 text-needle hover:bg-needle/10 rounded-[2px]"
                          title="Hapus"
                          aria-label={`Hapus ${inq.name}`}
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

        {/* View & Edit Status Detail Modal */}
        <Dialog
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Detail Inquiry: ${selectedInquiry?.name || ""}`}
        >
          {selectedInquiry && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-background/60 border border-gym-darkBorder text-sm">
                <div>
                  <span className="text-xs font-mono text-graphite block">
                    NAMA KLIEN
                  </span>
                  <span className="font-bold text-foreground text-base">
                    {selectedInquiry.name}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-mono text-graphite block">
                    WHATSAPP / HP
                  </span>
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
                  <span className="text-xs font-mono text-graphite block">
                    GAYA & UKURAN
                  </span>
                  <span className="font-semibold text-foreground">
                    {selectedInquiry.style} • {selectedInquiry.size}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-mono text-graphite block">
                    PENEMPATAN
                  </span>
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

                <Button
                  variant="paper"
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                >
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
