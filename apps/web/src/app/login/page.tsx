import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LogoGroup } from "@/components/logo-group";
import background from "./background.png";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Masuk · ProjectsEight",
  description: "Masuk ke akun ProjectsEight.",
};

export default function LoginPage() {
  return (
    <div className="relative isolate flex min-h-dvh flex-1 flex-col">
      {/* Latar: ./background.png (gedung di sisi kanan gambar).
          Di-import (bukan dari public/) supaya alamatnya berisi hash isi file: setiap gambar diganti,
          browser pasti mengambil versi baru dan tidak memakai cache lama. Next.js otomatis
          mengecilkan & mengonversi PNG ini (WebP/AVIF) sesuai ukuran layar.
          object-position 75% menjaga gedung tetap terlihat di layar sempit. */}
      <Image
        src={background}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover object-[75%_50%]"
      />
      {/* Penggelap latar supaya teks form terbaca (kontras ≥ 4.5:1), tanpa kartu di belakang form.
          Ponsel: gelap di bawah (area form), lebih terang di atas. Desktop: gelap di kanan (area form), memudar ke kiri. */}
      <div
        aria-hidden
        data-theme="dark"
        className="absolute inset-0 -z-10 bg-linear-to-t from-background/90 via-background/85 to-background/55 md:bg-linear-to-l md:from-background/95 md:via-background/80 md:to-transparent"
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

        <main className="w-full md:max-w-md md:self-end">
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
