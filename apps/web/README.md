# web

Frontend ProjectsEight: **Next.js 16** (App Router) + **Tailwind CSS v4**.

Cara menjalankan, setup, dan `.env` ada di [README utama](../../README.md). Aturan desain ada di [CLAUDE.md](./CLAUDE.md).

## Halaman

| Alamat | File | Isi |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page |
| `/design` | `src/app/design/page.tsx` | Dokumentasi design system (tipografi, warna, spasi, tombol, form) |
| `/fonts` | `src/app/fonts/page.tsx` | Perbandingan pilihan font |
| `/login` | `src/app/login/page.tsx` | Halaman masuk (form belum terhubung ke backend) |

## Struktur

```
src/
  app/
    globals.css        token design system (font, ukuran teks, warna)
    layout.tsx         font, script tema, metadata
  components/
    ui/button.tsx      Button, ButtonLink
    ui/form.tsx        Field, Input, Textarea, Select, Checkbox, Radio, Switch
    ui/mobile-nav.tsx  menu hamburger untuk ponsel
    theme-toggle.tsx   pilihan Terang / Gelap / Sistem
    logo-group.tsx     deretan logo di header (daftar logo diatur di sini)
  lib/theme.ts         logika tema
eslint/
  design-tokens.mjs    aturan lint: class wajib memakai token design system
```

## Mengganti latar halaman login

Latar `/login` ada di `public/login/background.svg` (masih placeholder). Ganti dengan gambar sendiri; kalau formatnya bukan SVG (mis. `background.jpg`), ubah juga `src` di `src/app/login/page.tsx`. Gambar dipotong otomatis supaya memenuhi layar (`object-cover`), jadi pakai gambar yang bagian pentingnya ada di tengah.

## Mengganti logo

Logo header ada di `public/logos/` (`logo-1.svg`, `logo-2.svg`, `logo-3.svg`, saat ini masih placeholder). Ganti file-nya dengan logo asli (SVG atau PNG). Kalau nama file, jumlah, atau ukuran aslinya berbeda, sesuaikan daftar `logos` di `src/components/logo-group.tsx` (`src`, `alt`, `width`, `height`).

## Perintah

Dijalankan dari folder ini (`apps/web`):

| Perintah | Fungsi |
|---|---|
| `bun run dev` | Jalankan web saja (atau `bun dev` dari root untuk web + api) |
| `bun run lint` | Cek kode, termasuk aturan design system |
| `bunx tsc --noEmit` | Cek tipe TypeScript |
| `bun run build` | Build production |
