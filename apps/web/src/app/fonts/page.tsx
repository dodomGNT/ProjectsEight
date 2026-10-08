import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible_Mono,
  Atkinson_Hyperlegible_Next,
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Lexend,
  Plus_Jakarta_Sans,
} from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Pilih Font · ProjectsEight",
  description: "Perbandingan font yang jelas dan mudah dibaca.",
};

// Font hanya dimuat di halaman ini, untuk perbandingan.
// next/font mewajibkan nilai ditulis langsung (tidak boleh lewat variabel).
const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const lexend = Lexend({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });
const atkinsonMono = Atkinson_Hyperlegible_Mono({ subsets: ["latin"], weight: ["400"] });

const sansFonts = [
  {
    name: "Atkinson Hyperlegible Next",
    font: atkinson,
    tag: "Dipakai sekarang · paling mudah dibaca",
    why: "Dirancang Braille Institute khusus untuk pembaca dengan penglihatan rendah. Setiap huruf yang mirip (I l 1, O 0, b d) sengaja dibuat berbeda.",
    best: "Aplikasi untuk semua kalangan, termasuk orang tua; teks panjang; form.",
  },
  {
    name: "Inter",
    font: inter,
    tag: "Paling serbaguna",
    why: "Dibuat khusus untuk layar. Huruf kecilnya tinggi (x-height besar), jadi tetap jelas di ukuran kecil. Dipakai oleh banyak aplikasi besar.",
    best: "Dashboard, aplikasi web, tabel dan angka.",
  },
  {
    name: "Plus Jakarta Sans",
    font: jakarta,
    tag: "Karya desainer Indonesia",
    why: "Dirancang untuk identitas kota Jakarta. Bentuknya modern dan ramah, dengan huruf yang lebar dan terbuka.",
    best: "Landing page, produk dengan nuansa lokal, judul.",
  },
  {
    name: "Lexend",
    font: lexend,
    tag: "Dirancang untuk kecepatan baca",
    why: "Dibuat berdasarkan riset kemudahan membaca. Jarak antar huruf lebih lega, sehingga nyaman untuk pembaca yang kesulitan membaca.",
    best: "Edukasi, konten bacaan, aplikasi anak.",
  },
  {
    name: "IBM Plex Sans",
    font: plex,
    tag: "Profesional",
    why: "Bentuk huruf tegas dan jelas berbeda satu sama lain. Terasa formal dan teknis.",
    best: "Aplikasi bisnis, dokumentasi, produk korporat.",
  },
  {
    name: "Geist",
    font: geist,
    tag: "Sebelumnya dipakai",
    why: "Bawaan Next.js. Rapi dan modern, tapi agak sempit, sehingga sedikit kurang nyaman di ukuran kecil dibanding pilihan lain.",
    best: "Sebagai pembanding.",
  },
];

const monoFonts = [
  { name: "JetBrains Mono", font: jetbrains, why: "Dibuat untuk membaca kode berjam-jam. Huruf kecil tinggi, 0 bergaris." },
  { name: "Atkinson Hyperlegible Mono", font: atkinsonMono, why: "Pasangan mono dari Atkinson Hyperlegible Next." },
  { name: "Geist Mono", font: geistMono, why: "Yang dipakai sekarang untuk kode." },
];

const legibility = "Il1| O0o rn m 5S 8B 6b g9 a@";

export default function FontsPage() {
  return (
    <div className="flex-1">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 md:px-8">
          <Link href="/" className="text-body-sm font-semibold">
            ← Design System
          </Link>
          <span className="flex-1" />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
        <div className="py-16 md:py-24">
          <p className="text-overline uppercase text-primary">Pilih font</p>
          <h1 className="mt-4 max-w-3xl text-h1">Font yang jelas dan mudah dibaca</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Semua font di bawah memakai teks yang sama, jadi mudah dibandingkan. Perhatikan baris
            uji keterbacaan: huruf yang mirip seperti <strong>I l 1</strong> dan{" "}
            <strong>O 0</strong> seharusnya mudah dibedakan.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sansFonts.map((f) => (
            <article
              key={f.name}
              className={`${f.font.className} flex flex-col rounded-2xl border border-border p-6 md:p-8`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-h3">{f.name}</h2>
                <span className="rounded-full bg-muted px-3 py-1 text-caption text-muted-foreground">
                  {f.tag}
                </span>
              </div>

              <p className="mt-6 text-h2">Bangun produk lebih cepat</p>
              <p className="mt-3 text-body">
                Pesanan Anda sedang diproses dan akan dikirim dalam 2–3 hari kerja. Kami akan
                mengirim nomor resi melalui email setelah paket diserahkan ke kurir.
              </p>
              <p className="mt-3 text-body-sm text-muted-foreground">
                Teks kecil 14px: Minimal 8 karakter, kombinasi huruf besar, huruf kecil, dan angka.
              </p>
              <p className="mt-1 text-caption text-muted-foreground">
                Teks 12px: Diperbarui 8 Oktober 2026 · 5 menit baca
              </p>

              <dl className="mt-6 grid gap-3 rounded-xl bg-muted p-4">
                <div>
                  <dt className="text-overline uppercase text-muted-foreground">Uji keterbacaan</dt>
                  <dd className="mt-1 text-h4">{legibility}</dd>
                </div>
                <div>
                  <dt className="text-overline uppercase text-muted-foreground">Angka</dt>
                  <dd className="mt-1 text-h4 tabular-nums">Rp1.234.567,89 · 08:30 · 2026</dd>
                </div>
              </dl>

              <div className="mt-6 grid gap-2 border-t border-border pt-4 text-body-sm">
                <p>
                  <span className="font-semibold">Kenapa jelas: </span>
                  <span className="text-muted-foreground">{f.why}</span>
                </p>
                <p>
                  <span className="font-semibold">Cocok untuk: </span>
                  <span className="text-muted-foreground">{f.best}</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-h2">Font mono (untuk kode)</h2>
          <p className="mt-2 text-body text-muted-foreground">
            Dipakai untuk potongan kode, nama file, dan angka teknis.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {monoFonts.map((f) => (
              <article key={f.name} className="rounded-2xl border border-border p-6">
                <h3 className="text-h4">{f.name}</h3>
                <p className="mt-1 text-caption text-muted-foreground">{f.why}</p>
                <pre className={`${f.font.className} mt-4 overflow-x-auto rounded-xl bg-muted p-4 text-code`}>
                  {`const total = 1000;\nif (id !== 0) {\n  return "Il1 O0";\n}`}
                </pre>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
