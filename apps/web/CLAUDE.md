@AGENTS.md

# Aturan desain: apps/web

Semua UI wajib mengikuti design system. Sumber kebenarannya:

- **Token**: `src/app/globals.css`, satu-satunya tempat nilai font, ukuran, warna ditentukan
- **Dokumentasi visual**: halaman `/` (`src/app/page.tsx`)
- **Komponen**: `src/components/ui/`

Kalau sebuah kebutuhan tidak bisa dipenuhi dengan token/komponen yang ada, **tanya user dulu**. Jangan menambah nilai baru diam-diam.

Aturan tipografi, warna, dan spasi arbitrary di bawah **dicek otomatis oleh `bun run lint`** (rule `design/tokens`, file `eslint/design-tokens.mjs`). Pengecualian hanya untuk halaman dokumentasi, dengan komentar beralasan:
`{/* eslint-disable-next-line design/tokens -- alasan */}`. Jangan mematikan rule ini untuk kode aplikasi.

## Tipografi

Hanya pakai class skala teks ini. Satu class sudah mengatur ukuran, line-height, letter-spacing, dan weight.

| Class | Ukuran | Untuk |
|---|---|---|
| `text-display` | 40–64px (responsif) | Judul hero landing page |
| `text-h1` | 40px | Judul halaman, satu per halaman |
| `text-h2` | 32px | Judul section |
| `text-h3` | 24px | Sub-section, judul card |
| `text-h4` | 20px | Judul kecil, label grup |
| `text-body-lg` | 16px | Paragraf pembuka di bawah judul |
| `text-body` | 15px | Teks paragraf utama |
| `text-body-sm` | 14px | Teks pendukung, tabel, label form, tombol |
| `text-caption` | 12px | Metadata, timestamp, pesan bantuan/error |
| `text-overline uppercase` | 12px | Label kecil di atas judul |
| `text-code font-mono` | 14px | Kode, nama file, perintah |

Dilarang:
- Ukuran bawaan Tailwind: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, dst.
- Ukuran arbitrary: `text-[13px]`, `text-[1.1rem]`, dst.
- Menimpa `leading-*` atau `tracking-*` pada class skala teks di atas.
- Melompati level judul (h2 langsung ke h4) atau memakai judul hanya untuk efek visual.

Ketebalan: hanya `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700). Judul sudah punya weight sendiri, jadi jangan ditambah lagi.

Gaya tambahan yang boleh: `italic`, `underline underline-offset-4` (link di paragraf), `line-through`, `uppercase`, `tabular-nums` (angka di tabel/harga), `truncate`.

## Font

- `font-sans` = **Atkinson Hyperlegible Next** (default, tidak perlu ditulis)
- `font-mono` = **Geist Mono**, hanya untuk kode dan angka teknis
- Jangan memuat font lain lewat `next/font`, kecuali di halaman pembanding `/fonts`.

## Warna

Hanya pakai warna token. Warna otomatis berganti di tema gelap, jadi **jangan pakai `dark:`** untuk warna.

| Token | Untuk |
|---|---|
| `bg-background` / `text-foreground` | Latar halaman / teks utama |
| `bg-muted` / `text-muted-foreground` | Latar card & area sekunder / teks sekunder |
| `border-border` | Semua garis, pembatas, outline |
| `bg-primary` / `text-primary-foreground` / `text-primary` | Aksi utama, link, elemen aktif |
| `text-accent` / `bg-accent` | Highlight, badge |
| `bg-destructive` / `text-destructive` | Hapus, error |

Dilarang: hex/rgb langsung (`#fff`, `bg-[#123456]`), palet bawaan Tailwind (`zinc-*`, `gray-*`, `blue-*`, `white`, `black`, dst.). Opacity boleh, misalnya `bg-primary/90` untuk hover.

## Spasi, ukuran, sudut

- Spasi (padding, margin, gap) pakai skala Tailwind (kelipatan 4px: `p-4` = 16px). Utamakan `1 2 3 4 6 8 12 16 24`; `0.5` dan `1.5` untuk jarak sangat kecil. Nilai arbitrary seperti `p-[13px]` dilarang.
- Lebar konten halaman: `mx-auto max-w-6xl px-4 md:px-8`.
- Sudut: `rounded-md` chip/kode kecil · `rounded-lg` tombol & input · `rounded-xl` / `rounded-2xl` card & panel · `rounded-full` badge/avatar.
- Arbitrary value untuk layout (mis. `grid-cols-[260px_1fr]`) boleh. Untuk tipografi dan warna tidak boleh.

## Komponen

Selalu pakai komponen yang ada. Jangan membuat tombol/input dari elemen mentah dengan styling sendiri.

- Tombol: `Button` dari `@/components/ui/button`
  - `variant`: `primary` (aksi utama, maksimal satu per area) · `secondary` · `outline` (Batal) · `ghost` (toolbar) · `destructive` (Hapus) · `link`
  - `size`: `sm` · `md` (default) · `lg` · `icon` (wajib `aria-label`)
  - Aksi yang sedang berjalan: `loading`, bukan membuat spinner sendiri
- Form: dari `@/components/ui/form`
  - Setiap input dibungkus `Field` (label, `hint`, `error`, `required`)
  - Komponen: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
  - Grup radio/checkbox pakai `<fieldset>` + `<legend>`
- Tema: `ThemeToggle` dari `@/components/theme-toggle`

Komponen baru yang dipakai di lebih dari satu tempat: taruh di `src/components/ui/`, ikuti pola yang ada (props `variant`/`size`, `className` bisa ditambah), lalu dokumentasikan di halaman `/`.

## Mengubah atau menambah token

1. Ubah/tambah di `src/app/globals.css` (warna: isi nilai terang **dan** gelap)
2. Tambahkan contohnya di halaman `/` (`src/app/page.tsx`)
3. Perbarui tabel di file ini

## Sebelum selesai

- Cek tampilan di tema **terang dan gelap**, dan di lebar **390px** (ponsel)
- Jalankan `bun run lint` di `apps/web` dan pastikan tidak ada error `design/tokens`
- Kalau `bun dev` sedang jalan, **jangan jalankan `next build` di folder ini**: cache dev server bisa rusak dan perubahan tidak muncul. Cek tipe dengan `bunx tsc --noEmit`, atau build di salinan terpisah.
