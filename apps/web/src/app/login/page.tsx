import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoGroup } from "@/components/logo-group";
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

      {/* Latar selalu gelap, jadi area ini memakai warna tema gelap di mode apa pun.
          Ponsel: logo di tengah atas, form di bawah. Desktop (md): logo kiri atas, form kanan bawah */}
      <div
        data-theme="dark"
        className="flex flex-1 flex-col justify-between gap-12 p-4 text-foreground md:p-8"
      >
        <div className="self-center md:self-start">
          <LogoGroup />
        </div>

        <main className="w-full rounded-2xl border border-foreground/15 bg-background/40 p-6 shadow-sm backdrop-blur-md md:max-w-md md:self-end md:p-8">
          <h1 className="text-h2">Masuk</h1>
          <p className="mt-2 text-body text-muted-foreground">
            Masukkan email dan password akun Anda.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <div className="mt-8 border-t border-foreground/15 pt-4">
            <Link
              href="/"
              className="inline-block py-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Kembali ke beranda
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
