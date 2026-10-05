"use client";

import React, { useState } from "react";
import { getTranslation, Locale } from "@/lib/i18n";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Send, CheckCircle2, MessageSquare } from "lucide-react";

interface ContactFormProps {
 locale: Locale;
 whatsapp: string;
}

export function ContactForm({ locale, whatsapp }: ContactFormProps) {
 const [formData, setFormData] = useState({
 name: "",
 phone: "",
 style: "Fine Line",
 placement: "",
 size: "",
 message: "",
 honeypot: "",
 });

 const [errors, setErrors] = useState<Record<string, string>>({});
 const [submitted, setSubmitted] = useState(false);

 const styleOptions = [
 { label: "Fine Line", value: "Fine Line" },
 { label: "Blackwork", value: "Blackwork" },
 { label: "Realism", value: "Realism" },
 { label: "Ornamental", value: "Ornamental" },
 { label: "Geometric", value: "Geometric" },
 { label: "Other / Custom Concept", value: "Custom" },
 ];

 const directWaUrl = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
 `Halo Blustereast Tattoo, saya ${formData.name || "Klien"}. Ingin konsultasi tato ${formData.style} (Penempatan: ${formData.placement || "-"}, Ukuran: ${formData.size || "-"}). Pesan: ${formData.message || "-"}`
 )}`;

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 const newErrors: Record<string, string> = {};

 if (!formData.name.trim()) {
 newErrors.name = locale === "en" ? "Name is required" : "Nama wajib diisi";
 }
 if (!formData.phone.trim()) {
 newErrors.phone = locale === "en" ? "WhatsApp / Phone is required" : "Nomor WhatsApp wajib diisi";
 }

 if (Object.keys(newErrors).length > 0) {
 setErrors(newErrors);
 return;
 }

 if (formData.honeypot) return;

 setErrors({});
 setSubmitted(true);
 };

 return (
 <div className="lg:col-span-7 bg-gym-darkCard p-6 sm:p-8 border-2 border-gym-gold">
 <h3 className="font-sans font-black text-3xl text-foreground mb-2">
 {getTranslation("contact.formTitle", locale)}
 </h3>
 <p className="text-sm text-gray-400 mb-6">
 Isi data di bawah ini untuk memulai konsultasi desain dan estimasi biaya.
 </p>

 {submitted ? (
 <div className="flex flex-col items-start gap-6 py-8 px-4 bg-emerald-500/10 border border-emerald-500/40 rounded-[2px]">
 <div className="flex items-center gap-3 text-emerald-300">
 <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
 <span className="font-sans font-bold text-2xl">Pesan Terkirim!</span>
 </div>
 <p className="text-base text-gray-300">
 {getTranslation("contact.formSuccess", locale)}
 </p>
 <div className="w-full pt-4 border-t border-emerald-500/30 flex flex-col gap-3">
 <span className="text-xs text-gray-400 font-mono">
 {getTranslation("contact.formWhatsAppAlt", locale)}
 </span>
 <a href={directWaUrl} target="_blank" rel="noreferrer">
 <Button variant="stencil" className="w-full gap-2 py-3">
 <MessageSquare className="w-5 h-5" />
 <span>Chat Langsung di WhatsApp</span>
 </Button>
 </a>
 </div>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
 <input
 type="text"
 name="honeypot"
 value={formData.honeypot}
 onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
 className="hidden"
 tabIndex={-1}
 autoComplete="off"
 />

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <Input
 label={getTranslation("contact.formName", locale)}
 name="name"
 placeholder="e.g. Alex"
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 error={errors.name}
 required
 />
 <Input
 label={getTranslation("contact.formPhone", locale)}
 name="phone"
 placeholder="e.g. +628123456789"
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 error={errors.phone}
 required
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <Select
 label={getTranslation("contact.formStyle", locale)}
 name="style"
 options={styleOptions}
 value={formData.style}
 onChange={(e) => setFormData({ ...formData, style: e.target.value })}
 />
 <Input
 label={getTranslation("contact.formPlacement", locale)}
 name="placement"
 placeholder="e.g. Lengan Atas"
 value={formData.placement}
 onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
 />
 <Input
 label={getTranslation("contact.formSize", locale)}
 name="size"
 placeholder="e.g. 10 x 5 cm"
 value={formData.size}
 onChange={(e) => setFormData({ ...formData, size: e.target.value })}
 />
 </div>

 <Textarea
 label={getTranslation("contact.formMessage", locale)}
 name="message"
 placeholder="Jelaskan konsep ide tato, gambar referensi, atau pertanyaan..."
 value={formData.message}
 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
 />

 <Button variant="stencil" type="submit" className="gap-2 mt-2 py-3">
 <Send className="w-5 h-5" />
 <span>{getTranslation("contact.formSubmit", locale)}</span>
 </Button>
 </form>
 )}
 </div>
 );
}
