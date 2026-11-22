"use client";

import React, { useState, useEffect } from "react";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { mockServices, Service } from "@/lib/mock";
import {
  fetchAdminServicesAction,
  saveServiceAction,
  deleteServiceAction,
} from "@/lib/data/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Dialog } from "@/components/ui/Dialog";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [nameId, setNameId] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descId, setDescId] = useState("");
  const [descEn, setDescEn] = useState("");
  const [sizeCat, setSizeCat] = useState("Small (5 x 5 cm)");
  const [price, setPrice] = useState("800.000");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchAdminServicesAction().then((data) => {
      if (data) setServices(data);
    });
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setNameId("");
    setNameEn("");
    setDescId("");
    setDescEn("");
    setSizeCat("Small (5 x 5 cm)");
    setPrice("800.000");
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setNameId(s.name_id);
    setNameEn(s.name_en);
    setDescId(s.description_id);
    setDescEn(s.description_en);
    setSizeCat(s.size_category);
    setPrice(s.starting_price);
    setIsActive(s.is_active);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await saveServiceAction({
        id: editingService?.id,
        name_id: nameId.trim() || "Layanan Baru",
        name_en: nameEn.trim() || "New Service",
        description_id: descId,
        description_en: descEn,
        size_category: sizeCat,
        starting_price: price.trim() || "800.000",
        is_active: isActive,
      });

      if (res.ok && res.services) {
        setServices(res.services);
        showNotice(
          editingService
            ? "Layanan berhasil diperbarui!"
            : "Layanan baru berhasil ditambahkan!"
        );
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteServiceAction(deleteId);
    if (res.ok && res.services) {
      setServices(res.services);
    } else {
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
    }
    setDeleteId(null);
    showNotice("Layanan berhasil dihapus!");
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
              KELOLA LAYANAN & HARGA
            </h1>
            <p className="text-sm text-graphite font-mono">
              Daftar tipe tato, kategori ukuran, dan estimasi harga awal ({services.length} layanan).
            </p>
          </div>

          <Button variant="stencil" onClick={openCreateModal} className="gap-2">
            <Plus className="w-5 h-5" />
            <span>Tambah Layanan Baru</span>
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
                <th className="py-3.5 px-4">Nama Layanan (ID/EN)</th>
                <th className="py-3.5 px-4">Kategori Ukuran</th>
                <th className="py-3.5 px-4">Harga Awal</th>
                <th className="py-3.5 px-4">Status Active</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gym-darkBorder">
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 px-4 text-center text-graphite font-mono text-xs"
                  >
                    Belum ada layanan terdaftar. Klik &quot;Tambah Layanan Baru&quot; untuk menambahkan.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-background/40">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-foreground">{service.name_id}</p>
                      <p className="text-xs text-graphite font-mono">
                        {service.name_en}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="stencil">{service.size_category}</Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gym-gold">
                      Rp {service.starting_price}
                    </td>
                    <td className="py-3.5 px-4">
                      {service.is_active ? (
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          ✓ Aktif
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-graphite">
                          Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(service)}
                          className="p-2 text-gym-gold hover:bg-gym-gold/10 rounded-[2px]"
                          title="Edit Layanan"
                          aria-label={`Edit ${service.name_id}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(service.id)}
                          className="p-2 text-needle hover:bg-needle/10 rounded-[2px]"
                          title="Hapus Layanan"
                          aria-label={`Hapus ${service.name_id}`}
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
          title={editingService ? "Edit Layanan Studio" : "Tambah Layanan Baru"}
        >
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Layanan (Bahasa Indonesia)"
                value={nameId}
                onChange={(e) => setNameId(e.target.value)}
                placeholder="e.g. Fine Line Custom"
                required
              />
              <Input
                label="Nama Layanan (English)"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Custom Fine Line Tattoo"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Kategori Ukuran (Size Category)"
                value={sizeCat}
                onChange={(e) => setSizeCat(e.target.value)}
                placeholder="e.g. Small (5 x 5 cm)"
                required
              />
              <Input
                label="Harga Mulai (Starting Price)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 800.000"
                required
              />
            </div>

            <Textarea
              label="Deskripsi Layanan (ID)"
              value={descId}
              onChange={(e) => setDescId(e.target.value)}
              placeholder="Jelaskan detail teknik dan penempatan..."
            />

            <Textarea
              label="Deskripsi Layanan (EN)"
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Service technique and placement description in English..."
            />

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 accent-gym-gold border-graphite rounded"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-semibold text-foreground cursor-pointer"
              >
                Status Layanan Aktif (Tampil di Website Publik)
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
                {saving ? "Menyimpan..." : "Simpan Layanan"}
              </Button>
            </div>
          </form>
        </Dialog>

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={!!deleteId}
          message="Apakah Anda yakin ingin menghapus layanan ini?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      </div>
    </AdminLayoutShell>
  );
}
