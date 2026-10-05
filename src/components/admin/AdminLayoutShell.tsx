"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 LayoutDashboard,
 Image as ImageIcon,
 Briefcase,
 Users,
 MessageSquare,
 Settings,
 LogOut,
 Menu,
 X,
 ExternalLink,
} from "lucide-react";

interface AdminLayoutShellProps {
 children: React.ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
 const pathname = usePathname();
 const [sidebarOpen, setSidebarOpen] = useState(false);

 const navItems = [
 { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
 { label: "Galeri Flash", href: "/admin/gallery", icon: ImageIcon },
 { label: "Layanan & Harga", href: "/admin/services", icon: Briefcase },
 { label: "Resident Artists", href: "/admin/artists", icon: Users },
 { label: "Inquiries / Pesan", href: "/admin/inquiries", icon: MessageSquare },
 { label: "Pengaturan Studio", href: "/admin/settings", icon: Settings },
 ];

 const isActive = (href: string) => {
 if (href === "/admin") return pathname === "/admin";
 return pathname.startsWith(href);
 };

 return (
 <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground font-sans">
 {/* Mobile Top Header */}
 <div className="md:hidden bg-card text-muted-foreground p-4 flex items-center justify-between border-b border-gym-darkBorder">
 <div className="flex items-center gap-2">
 <div className="w-7 h-7 bg-stencil text-white flex items-center justify-center font-sans font-black text-sm">
 B
 </div>
 <span className="font-sans font-bold text-lg ">
 ADMIN STUDIO
 </span>
 </div>
 <button
 onClick={() => setSidebarOpen(!sidebarOpen)}
 className="p-2 text-muted-foreground hover:text-gym-gold"
 >
 {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
 </button>
 </div>

 {/* Sidebar Navigation */}
 <aside
 className={`fixed md:sticky top-0 left-0 z-40 w-64 bg-card text-muted-foreground h-screen flex flex-col justify-between border-r border-gym-darkBorder transition-transform duration-200 ${
 sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
 }`}
 >
 <div className="flex flex-col">
 {/* Studio Brand */}
 <div className="p-6 border-b border-gym-darkBorder hidden md:flex flex-col gap-1">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 bg-stencil text-white flex items-center justify-center font-sans font-black text-lg">
 B
 </div>
 <span className="font-sans font-black text-xl text-muted-foreground">
 BLUSTEREAST
 </span>
 </div>
 <span className="text-[10px] font-mono text-gym-gold pl-10">
 PANEL ADMIN STUDIO
 </span>
 </div>

 {/* Navigation Links */}
 <nav className="p-4 flex flex-col gap-1.5 mt-2">
 {navItems.map((item) => {
 const Icon = item.icon;
 const active = isActive(item.href);
 return (
 <Link
 key={item.href}
 href={item.href}
 onClick={() => setSidebarOpen(false)}
 className={`flex items-center gap-3 px-3 py-2.5 rounded-[2px] text-sm font-semibold transition-colors min-h-[44px] ${
 active
 ? "bg-stencil text-white"
 : "text-muted-foreground/80 hover:bg-graphite/30 hover:text-white"
 }`}
 >
 <Icon className="w-4 h-4 shrink-0" />
 <span>{item.label}</span>
 </Link>
 );
 })}
 </nav>
 </div>

 {/* Footer Actions */}
 <div className="p-4 border-t border-gym-darkBorder flex flex-col gap-2">
 <Link
 href="/id"
 target="_blank"
 className="flex items-center gap-2 text-xs text-graphite hover:text-gym-gold transition-colors p-2 font-mono"
 >
 <ExternalLink className="w-4 h-4" />
 <span>Lihat Website Publik</span>
 </Link>

 <Link
 href="/admin/login"
 className="flex items-center gap-2 text-xs text-needle hover:text-needle/80 font-semibold transition-colors p-2 font-mono"
 >
 <LogOut className="w-4 h-4" />
 <span>Keluar (Logout)</span>
 </Link>
 </div>
 </aside>

 {/* Main Content Area */}
 <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
 {children}
 </main>
 </div>
 );
}
