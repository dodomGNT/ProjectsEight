import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { MobileNav } from "@/components/ui/mobile-nav";

export const metadata: Metadata = {
  title: "ProjectsEight · Starter template full-stack",
  description:
    "Monorepo siap pakai: Next.js, NestJS, PostgreSQL dengan pgvector, dan design system yang konsisten.",
};

const REPO_URL = "https://github.com/dodomGNT/ProjectsEight";

const navLinks = [
  { href: "#stack", label: "Stack" },
  { href: "#fitur", label: "Fitur" },
  { href: "#mulai", label: "Cara mulai" },
  { href: "/design", label: "Design system" },
];

/* ── Ikon (stroke mengikuti warna teks) ───────────────────────── */

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

const icons = {
  layout: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 9h18M9 21V9",
  server: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  layers: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  palette: "M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4 4h-2a2 2 0 0 0-1.5 3.3A1.6 1.6 0 0 1 12 22zM7.5 11h.01M10.5 7h.01M15.5 8h.01",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z",
  zap: "M13 2 3 14h9l-1 8 10-12h-9z",
  key: "M15 7a4 4 0 1 1-3.9 5H3v3h3v3h3v-3h2.1A4 4 0 0 1 15 7zM16 11h.01",
  phone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  check: "M20 6 9 17l-5-5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  github:
    "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
};

/* ── Konten ───────────────────────────────────────────────────── */

const stack = [
  {
    icon: icons.layout,
    name: "Next.js 16",
    desc: "Frontend dengan App Router, Tailwind CSS v4, dan halaman statis yang cepat.",
  },
  {
    icon: icons.server,
    name: "NestJS 12",
    desc: "Backend API terstruktur dengan module, controller, dan dependency injection.",
  },
  {
    icon: icons.database,
    name: "PostgreSQL + Drizzle",
    desc: "Database relasional dengan ORM yang type-safe dan migrasi otomatis.",
  },
  {
    icon: icons.search,
    name: "pgvector",
    desc: "Pencarian berdasarkan makna (semantic search) untuk fitur AI, langsung di PostgreSQL.",
  },
  {
    icon: icons.layers,
    name: "Turborepo + Bun",
    desc: "Satu repo untuk web dan API, satu perintah untuk menjalankan semuanya.",
  },
  {
    icon: icons.box,
    name: "Docker Compose",
    desc: "Database menyala dengan satu perintah, sama di setiap laptop.",
  },
];

const features = [
  {
    icon: icons.palette,
    title: "Design system yang dijaga",
    desc: "Ukuran font, warna, dan spasi ditentukan di satu file. Aturan lint menolak class di luar design system.",
  },
  {
    icon: icons.moon,
    title: "Mode terang & gelap",
    desc: "Pilihan Terang, Gelap, atau Sistem. Tersimpan di browser dan tanpa kedipan warna saat halaman dibuka.",
  },
  {
    icon: icons.zap,
    title: "Setup satu perintah",
    desc: "bun run setup mengganti nama project, mencari port kosong, menyalakan database, dan menjalankan migrasi.",
  },
  {
    icon: icons.key,
    title: "Satu file .env",
    desc: "Docker, API, migrasi, dan frontend membaca konfigurasi dari tempat yang sama.",
  },
  {
    icon: icons.phone,
    title: "Responsif & mudah diakses",
    desc: "Diuji dari layar 360px sampai desktop, dengan font Atkinson Hyperlegible yang mudah dibaca.",
  },
  {
    icon: icons.check,
    title: "Komponen siap pakai",
    desc: "Tombol, input, select, checkbox, radio, dan switch dengan label dan pesan error yang tersambung.",
  },
];

const steps = [
  {
    title: "Buat repo dari template",
    command: "gh repo create NamaProject --template dodomGNT/ProjectsEight --private --clone",
  },
  { title: "Masuk ke folder project", command: "cd NamaProject" },
  { title: "Jalankan setup otomatis", command: "bun run setup" },
  { title: "Mulai membangun", command: "bun dev" },
];

/* ── Bagian halaman ───────────────────────────────────────────── */

function SectionHeading({
  id,
  overline,
  title,
  description,
}: {
  id: string;
  overline: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-overline uppercase text-primary">{overline}</p>
      <h2 id={id} className="mt-3 scroll-mt-24 text-h2">
        {title}
      </h2>
      <p className="mt-3 text-body-lg text-muted-foreground">{description}</p>
    </div>
  );
}

function Terminal() {
  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-muted">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-3 rounded-full bg-border" />
        <span className="size-3 rounded-full bg-border" />
        <span className="size-3 rounded-full bg-border" />
        <span className="ml-2 font-mono text-caption text-muted-foreground">terminal</span>
      </div>
      <pre className="p-4 font-mono text-code break-words whitespace-pre-wrap md:p-6">
        <code>
          {steps.map((s, i) => (
            <span key={s.command} className="block">
              <span className="text-muted-foreground"># {i + 1}. {s.title}</span>
              {"\n"}
              <span className="text-primary">$</span> {s.command}
              {i < steps.length - 1 && "\n\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex-1">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-2 md:px-8">
          <Link href="/" className="shrink-0 py-2 text-body font-bold">
            ProjectsEight
          </Link>
          <nav aria-label="Navigasi utama" className="hidden flex-1 gap-6 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <ThemeToggle />
            {/* Dibungkus supaya `hidden` tidak kalah oleh `inline-flex` milik tombol */}
            <div className="hidden sm:block">
              <ButtonLink href={REPO_URL} size="sm" variant="outline">
                <Icon path={icons.github} /> GitHub
              </ButtonLink>
            </div>
            {/* Di bawah md, navigasi pindah ke menu hamburger */}
            <div className="md:hidden">
              <MobileNav
                links={navLinks}
                footer={
                  <ButtonLink href={REPO_URL} variant="outline" className="w-full">
                    <Icon path={icons.github} /> Buka di GitHub
                  </ButtonLink>
                }
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-overline uppercase text-primary">Starter template full-stack</p>
            <h1 className="mt-4 text-display">Mulai project baru dalam hitungan menit</h1>
            <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">
              Monorepo siap pakai: Next.js, NestJS, PostgreSQL dengan pgvector, dan design system
              yang konsisten. Cukup empat perintah, lalu langsung membangun fitur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#mulai" size="lg">
                Mulai sekarang <Icon path={icons.arrow} />
              </ButtonLink>
              <ButtonLink href="/design" size="lg" variant="outline">
                Lihat design system
              </ButtonLink>
            </div>
          </div>
          <Terminal />
        </section>

        {/* Stack */}
        <section aria-labelledby="stack" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
            <SectionHeading
              id="stack"
              overline="Stack"
              title="Teknologi yang sudah terpasang"
              description="Semua bagian sudah terhubung: frontend memanggil API, API membaca database, dan semuanya berjalan dengan satu perintah."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((s) => (
                <li key={s.name} className="rounded-2xl border border-border p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-muted text-primary">
                    <Icon path={s.icon} />
                  </span>
                  <h3 className="mt-4 text-h4">{s.name}</h3>
                  <p className="mt-2 text-body-sm text-muted-foreground">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Fitur */}
        <section aria-labelledby="fitur" className="border-t border-border bg-muted">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
            <SectionHeading
              id="fitur"
              overline="Fitur"
              title="Bukan sekadar kerangka kosong"
              description="Hal-hal yang biasanya dikerjakan berulang di setiap project baru sudah disiapkan dan diuji."
            />
            <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon path={f.icon} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-h4">{f.title}</h3>
                    <p className="mt-2 text-body-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cara mulai */}
        <section aria-labelledby="mulai" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
            <SectionHeading
              id="mulai"
              overline="Cara mulai"
              title="Empat perintah, project siap"
              description="Butuh Bun, Docker Desktop, dan GitHub CLI di laptop. Setelah itu, project baru jalan dalam beberapa menit."
            />
            <ol className="mt-12 grid gap-4 md:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.command} className="flex min-w-0 gap-4 rounded-2xl border border-border p-6">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-body font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-h4">{s.title}</h3>
                    <pre className="mt-3 rounded-lg bg-muted px-3 py-2 font-mono text-code break-words whitespace-pre-wrap">
                      <code>{s.command}</code>
                    </pre>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ajakan akhir */}
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
          <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12 md:py-16">
            <h2 className="mx-auto max-w-2xl text-h2">Siap membangun project berikutnya?</h2>
            <p className="mx-auto mt-3 max-w-xl text-body-lg">
              Buat repo dari template, jalankan setup, dan fokus pada fitur yang penting.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={REPO_URL} size="lg" variant="secondary">
                <Icon path={icons.github} /> Buka di GitHub
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="text-body-sm text-muted-foreground">
            <span className="font-semibold text-foreground">ProjectsEight</span> · Starter template
            Next.js + NestJS
          </p>
          <nav aria-label="Tautan footer" className="flex flex-wrap gap-x-6">
            {[
              { href: "/design", label: "Design system" },
              { href: "/fonts", label: "Font" },
              { href: REPO_URL, label: "GitHub" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
