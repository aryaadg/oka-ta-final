export const instant = false;

import React from "react";
import Link from "next/link";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";
import { getDashboardStats } from "@/lib/data/admin";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Image as ImageIcon,
  Briefcase,
  Users,
  MessageSquare,
  Plus,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const {
    galleryCount,
    servicesCount,
    artistsCount,
    newInquiriesCount,
    recentInquiries,
  } = await getDashboardStats();

  return (
    <AdminLayoutShell>
      <div className="flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gym-darkBorder pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-sans font-black text-3xl md:text-4xl text-foreground">
              DASHBOARD OVERVIEW
            </h1>
            <p className="text-sm text-graphite font-mono">
              Ringkasan data studio Blustereast Tattoo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin/gallery">
              <Button variant="stencil" size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Tambah Karya</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Karya */}
          <div className="p-6 bg-gym-darkCard border border-gym-darkBorder flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-graphite">
                TOTAL KARYA
              </span>
              <div className="w-10 h-10 bg-gym-gold/15 text-gym-gold flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-sans font-black text-4xl text-foreground">
                {galleryCount}
              </span>
              <Link
                href="/admin/gallery"
                className="text-xs text-gym-gold font-semibold hover:underline"
              >
                Kelola →
              </Link>
            </div>
          </div>

          {/* Layanan */}
          <div className="p-6 bg-gym-darkCard border border-gym-darkBorder flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-graphite">
                LAYANAN & HARGA
              </span>
              <div className="w-10 h-10 bg-gym-gold/15 text-gym-gold flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-sans font-black text-4xl text-foreground">
                {servicesCount}
              </span>
              <Link
                href="/admin/services"
                className="text-xs text-gym-gold font-semibold hover:underline"
              >
                Kelola →
              </Link>
            </div>
          </div>

          {/* Artists */}
          <div className="p-6 bg-gym-darkCard border border-gym-darkBorder flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-graphite">
                RESIDENT ARTISTS
              </span>
              <div className="w-10 h-10 bg-gym-gold/15 text-gym-gold flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-sans font-black text-4xl text-foreground">
                {artistsCount}
              </span>
              <Link
                href="/admin/artists"
                className="text-xs text-gym-gold font-semibold hover:underline"
              >
                Kelola →
              </Link>
            </div>
          </div>

          {/* New Inquiries */}
          <div className="p-6 bg-gym-darkCard border-2 border-gym-gold flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gym-gold">
                PESAN BARU (NEW)
              </span>
              <div className="w-10 h-10 bg-gym-gold text-gym-dark flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-sans font-black text-4xl text-gym-gold">
                {newInquiriesCount}
              </span>
              <Link
                href="/admin/inquiries"
                className="text-xs text-gym-gold font-semibold hover:underline"
              >
                Lihat Pesan →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="flex flex-col gap-4 bg-gym-darkCard p-6 border border-gym-darkBorder mt-4">
          <div className="flex items-center justify-between pb-4 border-b border-gym-darkBorder">
            <h2 className="font-sans font-extrabold text-2xl text-foreground">
              KONSULTASI MASUK TERBARU
            </h2>
            <Link href="/admin/inquiries">
              <Button
                variant="ghost"
                size="sm"
                className="text-gym-gold p-0 hover:underline"
              >
                Lihat Semua Inquiries →
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-graphite border-collapse">
              <thead>
                <tr className="border-b border-gym-darkBorder font-mono text-xs text-foreground">
                  <th className="py-3 px-4">Nama</th>
                  <th className="py-3 px-4">WhatsApp</th>
                  <th className="py-3 px-4">Gaya</th>
                  <th className="py-3 px-4">Penempatan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gym-darkBorder">
                {recentInquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 px-4 text-center text-graphite font-mono text-xs"
                    >
                      Belum ada data konsultasi masuk.
                    </td>
                  </tr>
                ) : (
                  recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-background/50">
                      <td className="py-3 px-4 font-semibold text-foreground">
                        {inq.name}
                      </td>
                      <td className="py-3 px-4 font-mono">{inq.phone}</td>
                      <td className="py-3 px-4">{inq.style}</td>
                      <td className="py-3 px-4">{inq.placement}</td>
                      <td className="py-3 px-4">
                        <Badge variant={inq.status}>
                          {inq.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-xs">
                        {new Date(inq.created_at).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayoutShell>
  );
}
