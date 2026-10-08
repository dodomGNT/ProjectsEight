# web

Frontend ProjectsEight: **Next.js 16** (App Router) + **Tailwind CSS v4**.

Cara menjalankan, setup, dan `.env` ada di [README utama](../../README.md). Aturan desain ada di [CLAUDE.md](./CLAUDE.md).

## Halaman

| Alamat | File | Isi |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page |
| `/design` | `src/app/design/page.tsx` | Dokumentasi design system (tipografi, warna, spasi, tombol, form) |
| `/fonts` | `src/app/fonts/page.tsx` | Perbandingan pilihan font |

## Struktur

```
src/
  app/
    globals.css        token design system (font, ukuran teks, warna)
    layout.tsx         font, script tema, metadata
  components/
    ui/button.tsx      Button, ButtonLink
    ui/form.tsx        Field, Input, Textarea, Select, Checkbox, Radio, Switch
    theme-toggle.tsx   pilihan Terang / Gelap / Sistem
  lib/theme.ts         logika tema
eslint/
  design-tokens.mjs    aturan lint: class wajib memakai token design system
```

## Perintah

Dijalankan dari folder ini (`apps/web`):

| Perintah | Fungsi |
|---|---|
| `bun run dev` | Jalankan web saja (atau `bun dev` dari root untuk web + api) |
| `bun run lint` | Cek kode, termasuk aturan design system |
| `bunx tsc --noEmit` | Cek tipe TypeScript |
| `bun run build` | Build production |
