"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError("");

 const supabase = createClient();
 const { error } = await supabase.auth.signInWithPassword({
 email,
 password,
 });

 if (error) {
 setError(error.message);
 setLoading(false);
 } else {
 router.push("/admin");
 }
 };

 return (
 <div className="min-h-screen w-full bg-card text-muted-foreground flex items-center justify-center p-4">
 <div className="w-full max-w-md bg-card border-2 border-gym-gold p-8 flex flex-col gap-6">
 {/* Brand Header */}
 <div className="flex flex-col items-center gap-2">
 <div className="w-12 h-12 bg-stencil text-white flex items-center justify-center font-sans font-black text-2xl mb-2">
 B
 </div>
 <h1 className="font-sans font-black text-3xl text-muted-foreground">
 LOGIN ADMIN STUDIO
 </h1>
 <p className="text-xs font-mono text-muted-foreground/70">
 Blustereast Tattoo Studio • Denpasar Timur
 </p>
 </div>

 {/* Login Form */}
 <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
 {error && <div className="p-3 bg-needle/10 text-needle border border-needle/30 text-sm">{error}</div>}
 <Input
 label="Email Admin"
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="bg-card text-muted-foreground border-graphite"
 />

 <Input
 label="Kata Sandi (Password)"
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 className="bg-card text-muted-foreground border-graphite"
 />

 <Button variant="stencil" type="submit" className="w-full gap-2 py-3 mt-2" disabled={loading}>
 <span>{loading ? "Memproses..." : "Masuk ke Dashboard"}</span>
 <ArrowRight className="w-4 h-4" />
 </Button>
 </form>

 <div className="pt-4 border-t border-gym-darkBorder text-xs text-graphite font-mono">
 Akses khusus pemilik studio & internal staff.
 </div>
 </div>
 </div>
 );
}
