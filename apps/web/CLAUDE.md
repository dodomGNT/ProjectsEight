@AGENTS.md

# Aturan desain: apps/web

Semua UI wajib mengikuti design system. Sumber kebenarannya:

- **Token**: `src/app/globals.css`, satu-satunya tempat nilai ukuran teks, warna, dan nama font (`--font-sans`, `--font-mono`) ditentukan. File font-nya dimuat di `src/app/layout.tsx` lewat `next/font`.
- **Dokumentasi visual**: halaman `/design` (`src/app/design/page.tsx`)
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
- `font-mono` = **Atkinson Hyperlegible Mono**, hanya untuk kode dan angka teknis
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

- Spasi (padding, margin, gap) pakai skala Tailwind (kelipatan 4px: `p-4` = 16px). Nilai arbitrary seperti `p-[13px]` dilarang. Nilai yang dipakai:
  - Jarak kecil & elemen: `0.5 1 1.5 2 3 4 5 6 8`
  - Jarak antar kartu/grup: `8 10 12`
  - Jarak section: `py-16 md:py-24` (hero boleh `py-20 md:py-32`)
- Lebar konten halaman: `mx-auto max-w-6xl px-4 md:px-8`.
- Sudut: `rounded-md` chip/kode kecil · `rounded-lg` tombol & input · `rounded-xl` / `rounded-2xl` card & panel · `rounded-full` badge/avatar.
- Arbitrary value untuk layout (mis. `md:grid-cols-[260px_1fr]`) boleh, asal aman di ponsel (lihat Responsif). Untuk tipografi dan warna tidak boleh.

## Responsif (ponsel dan desktop)

Setiap halaman dan komponen **wajib** tampil benar dari lebar **360px** (ponsel kecil) sampai desktop.

**Mobile-first.** Class tanpa prefix berlaku untuk ponsel; tampilan lebih lebar ditambah dengan breakpoint Tailwind: `sm:` 640px · `md:` 768px · `lg:` 1024px · `xl:` 1280px.

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">   {/* 1 → 2 → 3 kolom */}
<div className="flex flex-col gap-3 sm:flex-row">            {/* bertumpuk → berjajar */}
<section className="py-16 md:py-24">                          {/* jarak section */}
```

Aturan:
- **Tidak boleh ada scroll horizontal** pada halaman. Konten lebar (tabel, kode, daftar tab) dibungkus `overflow-x-auto`.
- Lebar elemen: `w-full` + `max-w-*`, bukan lebar tetap. `w-[500px]` hanya boleh dengan breakpoint (`md:w-[500px]`).
- Kolom grid ber-px (`grid-cols-[260px_1fr]`) hanya dengan breakpoint; di ponsel satu kolom.
- Anak flex/grid yang berisi teks panjang diberi `min-w-0`; teks panjang tanpa spasi (URL, email) diberi `break-words` atau `truncate`.
- Baris tombol diberi `flex-wrap` supaya turun ke baris berikut di layar sempit.
- **Target sentuh minimal 24px** tingginya (link, ikon, checkbox termasuk label-nya). Tombol & input sudah 40px. Link teks di navigasi diberi `py-2`.
- Ukuran teks: `text-display` sudah menyesuaikan layar. Judul lain boleh berganti token per breakpoint (`text-h2 md:text-h1`), tetap tanpa ukuran arbitrary.
- Interaksi yang hanya muncul saat `hover:` harus punya cara lain di layar sentuh (tetap terlihat, atau lewat tap/focus).
- Gambar: pakai `next/image`. Gambar yang lebarnya mengikuti layar wajib diberi `sizes`; gambar berukuran tetap (logo, ikon) cukup `width`/`height` + class tinggi (mis. `h-7 w-auto`).

### Navigasi

**Navigasi tidak boleh hilang di ponsel.** Kalau menu header disembunyikan di layar kecil, wajib ada penggantinya:

- **Menu situs** (header halaman, link ke halaman/section lain): di `md:` ke atas tampil berjajar, di bawah `md` pakai **hamburger `MobileNav`**.
  - Daftar link ditulis **sekali** sebagai array dan dipakai oleh menu desktop **dan** `MobileNav`, supaya isinya selalu sama.
  - `MobileNav` ditaruh di dalam `<header>` yang `sticky`, dibungkus `<div className="md:hidden">`.
  - Tombol/aksi penting dari header yang disembunyikan di ponsel (mis. GitHub, Login) dimasukkan ke prop `footer` milik `MobileNav`.
  - Jangan membuat menu hamburger sendiri; kalau butuh perilaku baru, kembangkan `MobileNav`.
- **Navigasi dalam satu halaman yang panjang** (mis. daftar section di `/design`): boleh tetap berjajar dan bisa digeser horizontal (`overflow-x-auto`), asalkan tetap terlihat di ponsel.

### Header dengan logo

- Logo di header memakai `LogoGroup` (`src/components/logo-group.tsx`). File logo ada di `public/logos/`; daftar logo (file, alt, ukuran asli) diatur di komponen itu. Tinggi logo 24px di ponsel, 28px mulai `sm:`; jangan lebih kecil dari 24px.
- **Logo dan navigasi tidak boleh bertumpuk atau berdesakan**:
  - Desktop (`lg:` ke atas): satu baris, logo di kiri, lalu menu, lalu aksi (tema, GitHub) di kanan.
  - Di bawah `lg`: dua baris. Baris 1 logo; baris 2 navigasi dengan garis pemisah (`border-t`). Tablet (`md:`) link berjajar; ponsel `MobileNav` dengan `showLabel` (tombol "☰ Menu").
  - Posisi logo: **di tengah** di ponsel (di bawah `md`), **rata kiri** mulai `md:`. Yang di-tengahkan grup logonya (`self-center`), bukan dibuat selebar layar, supaya area klik hanya di logo.
- Kalau logo atau link bertambah sehingga satu baris tidak muat di 1024px, naikkan breakpoint satu-baris (mis. `lg:` → `xl:`), jangan mengecilkan logo.
- Aksi di kanan header: tombol utama **"Masuk"** (`ButtonLink href="/login" size="sm"`, variant primary) **selalu tampil di semua ukuran layar**. Aksi sekunder (GitHub) disembunyikan di bawah `sm:` dan dimasukkan ke `footer` milik `MobileNav`.
- Contoh lengkap: header di `src/app/page.tsx`.

Lebar tetap dan kolom grid ber-px tanpa breakpoint **dicek otomatis oleh lint**.

### Halaman login (`/login`)

Satu layar penuh dengan gambar latar (contoh: `src/app/login/page.tsx`):

- **Latar**: `next/image` dengan `fill`, `sizes="100vw"`, `priority`, `alt=""` (dekoratif), `className="-z-10 object-cover"`; wadah halaman `relative isolate min-h-dvh`. File latar di `public/login/background.svg`, boleh diganti foto (jpg/png/webp) dengan menyesuaikan `src`.
- **Logo**: `LogoGroup` di dalam kotak `bg-background/90 backdrop-blur rounded-2xl` supaya tetap terbaca di atas latar apa pun.
- **Posisi**: ponsel → logo di tengah atas, form selebar layar di bawah. Mulai `md:` → logo kiri atas (`md:self-start`), form kanan bawah (`md:self-end md:max-w-md`). Wadah `flex flex-col justify-between`, jadi logo dan form tidak pernah bertumpuk.
- **Form**: kartu `bg-background` (bukan transparan) dengan `Field` + `Input` + `Checkbox` + `Button type="submit" size="lg" className="w-full"`. Validasi sendiri (`noValidate`), pesan error lewat prop `error`, fokus pindah ke input pertama yang salah.
- Link "← Kembali ke beranda" dan `ThemeToggle` ada di bagian bawah kartu form.
- **Status**: login belum terhubung ke backend (belum ada endpoint autentikasi di `apps/api`). Setelah validasi lolos, form hanya menampilkan pesan bahwa login belum tersedia. Jangan menampilkan seolah-olah login berhasil sebelum backend-nya dibuat.

## Komponen

Selalu pakai komponen yang ada. Jangan membuat tombol/input dari elemen mentah dengan styling sendiri.

- Tombol: `Button` dari `@/components/ui/button`
  - `variant`: `primary` (aksi utama, maksimal satu per area) · `secondary` · `outline` (Batal) · `ghost` (toolbar) · `destructive` (Hapus) · `link`
  - `size`: `sm` · `md` (default) · `lg` · `icon` (wajib `aria-label`)
  - Aksi yang sedang berjalan: `loading`, bukan membuat spinner sendiri
- Link yang tampil seperti tombol (navigasi): `ButtonLink` dari `@/components/ui/button` (prop sama dengan `Button`). Elemen lain yang perlu gaya tombol: `buttonStyles({ variant, size })`.
  - Untuk menyembunyikan tombol per breakpoint, **bungkus** dengan elemen lain (`<div className="hidden sm:block">`). `hidden` di class tombol itu sendiri kalah oleh `inline-flex`.
- Form: dari `@/components/ui/form`
  - Setiap input dibungkus `Field` (label, `hint`, `error`, `required`)
  - Komponen: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
  - Grup radio/checkbox pakai `<fieldset>` + `<legend>`
- Tema: `ThemeToggle` dari `@/components/theme-toggle`
- Navigasi ponsel: `MobileNav` dari `@/components/ui/mobile-nav` (lihat bagian Navigasi di bawah)

Letak komponen:
- `src/components/ui/`: komponen dasar yang generik (tombol, form, navigasi). Ikuti pola yang ada (props `variant`/`size`, `className` bisa ditambah).
- `src/components/`: komponen khusus situs ini (`ThemeToggle`, `LogoGroup`) dan pembantu halaman dokumentasi (`style-guide.tsx`).
- Komponen yang hanya dipakai **satu halaman** ditaruh di folder halaman itu, mis. `src/app/login/login-form.tsx`.
- `ThemeToggle` adalah satu-satunya komponen yang memakai `<button>` mentah, karena bentuknya kontrol bersegmen (bukan tombol biasa). Di luar komponen, selalu pakai `Button`.

Setiap komponen yang dipakai di lebih dari satu tempat wajib didokumentasikan di halaman `/design`.

## Mengubah atau menambah token

1. Ubah/tambah di `src/app/globals.css` (warna: isi nilai terang **dan** gelap)
2. Tambahkan contohnya di halaman `/design` (`src/app/design/page.tsx`)
3. Perbarui tabel di file ini

## Sebelum selesai

- Cek tampilan di tema **terang dan gelap**, dan di lebar **360px**, **768px**, dan **1280px**: tidak ada scroll horizontal, tidak ada teks terpotong, target sentuh ≥ 24px
- Jalankan `bun run lint` di `apps/web` dan pastikan tidak ada error `design/tokens`
- Cek tipe dengan `bunx tsc --noEmit` (tidak perlu `next build` saat `bun dev` jalan).
- **Ubah `globals.css` terpisah dari file `.tsx`.** Kalau `globals.css` dan `.tsx` berubah hampir bersamaan, loader Tailwind di dev server bisa tetap memakai CSS lama (perubahan tidak muncul walau sudah refresh). Kalau itu terjadi: ubah lagi sedikit isi `globals.css` (bukan cuma `touch`), atau restart `bun dev`.
