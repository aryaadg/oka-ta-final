"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ArrowLeft, KeyRound } from "lucide-react";
import { loginAdminAction } from "@/lib/data/actions";

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

    try {
      const result = await loginAdminAction(email, password);
      if (!result.ok) {
        setError(result.error || "Gagal masuk. Periksa kembali kredensial Anda.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan saat memproses login.");
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@blustereast.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gym-darkCard border-2 border-gym-gold p-8 flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 bg-gym-gold text-gym-dark flex items-center justify-center font-sans font-black text-2xl mb-2">
            B
          </div>
          <h1 className="font-sans font-black text-3xl text-foreground">
            LOGIN ADMIN STUDIO
          </h1>
          <p className="text-xs font-mono text-graphite">
            Blustereast Tattoo Studio • Denpasar Timur
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
          {error && (
            <div className="p-3 bg-needle/15 text-needle border border-needle/40 text-sm font-medium">
              {error}
            </div>
          )}
          <Input
            label="Email Admin"
            type="email"
            placeholder="admin@blustereast.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Kata Sandi (Password)"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            variant="stencil"
            type="submit"
            className="w-full gap-2 py-3 mt-2"
            disabled={loading}
          >
            <span>{loading ? "Memproses..." : "Masuk ke Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-4 border-t border-gym-darkBorder flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-graphite font-mono">
              Akses internal staff studio.
            </span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-gym-gold hover:underline"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Isi Akun Demo</span>
            </button>
          </div>

          <Link
            href="/id"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-graphite hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Publik</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
