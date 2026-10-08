import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoGroup } from "@/components/logo-group";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk · ProjectsEight",
  description: "Masuk ke akun ProjectsEight.",
};

export default function LoginPage() {
  return (
    <div className="relative isolate flex min-h-dvh flex-1 flex-col">
      {/* Latar: ganti file di public/login/ untuk memakai foto/gambar sendiri */}
      <Image
        src="/login/background.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/* Ponsel: logo di tengah atas, form di bawah. Desktop (md): logo kiri atas, form kanan bawah */}
      <div className="flex flex-1 flex-col justify-between gap-12 p-4 md:p-8">
        <div className="self-center rounded-2xl bg-background/90 px-4 shadow-sm backdrop-blur md:self-start">
          <LogoGroup />
        </div>

        <main className="w-full rounded-2xl border border-border bg-background p-6 shadow-sm md:max-w-md md:self-end md:p-8">
          <h1 className="text-h2">Masuk</h1>
          <p className="mt-2 text-body text-muted-foreground">
            Masukkan email dan password akun Anda.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <Link
              href="/"
              className="py-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Kembali ke beranda
            </Link>
            <ThemeToggle />
          </div>
        </main>
      </div>
    </div>
  );
}
