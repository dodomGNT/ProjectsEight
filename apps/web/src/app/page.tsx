import { ColorSwatch, TypeRow } from "@/components/style-guide";

const typeScale = [
  {
    token: "Display",
    className: "text-display",
    usage: "Judul hero di landing page. Ukurannya menyesuaikan lebar layar.",
    sample: "Bangun lebih cepat",
  },
  {
    token: "Heading 1",
    className: "text-h1",
    usage: "Judul halaman. Cukup satu per halaman.",
    sample: "Judul halaman utama",
  },
  {
    token: "Heading 2",
    className: "text-h2",
    usage: "Judul section.",
    sample: "Judul sebuah section",
  },
  {
    token: "Heading 3",
    className: "text-h3",
    usage: "Sub-section, judul card.",
    sample: "Judul card atau sub-section",
  },
  {
    token: "Heading 4",
    className: "text-h4",
    usage: "Judul kecil, label grup.",
    sample: "Judul kecil untuk grup",
  },
  {
    token: "Body Large",
    className: "text-body-lg",
    usage: "Paragraf pembuka (lead) di bawah judul.",
    sample:
      "Paragraf pembuka yang sedikit lebih besar, untuk memperkenalkan isi halaman sebelum masuk ke detail.",
  },
  {
    token: "Body",
    className: "text-body",
    usage: "Teks paragraf utama. Default untuk sebagian besar teks.",
    sample:
      "Ini adalah teks paragraf biasa. Ukuran dan jarak antar barisnya dibuat nyaman dibaca untuk teks yang panjang, baik di layar desktop maupun ponsel.",
  },
  {
    token: "Body Small",
    className: "text-body-sm",
    usage: "Teks pendukung, isi tabel, label form.",
    sample: "Teks pendukung yang lebih kecil, misalnya untuk deskripsi di bawah input form.",
  },
  {
    token: "Caption",
    className: "text-caption",
    usage: "Keterangan gambar, metadata, timestamp.",
    sample: "Diperbarui 8 Oktober 2026 · 5 menit baca",
  },
  {
    token: "Overline",
    className: "text-overline uppercase",
    usage: "Label kecil di atas judul. Selalu dengan `uppercase`.",
    sample: "Label kategori",
  },
  {
    token: "Code",
    className: "text-code font-mono",
    usage: "Potongan kode, nama file, perintah terminal.",
    sample: "bun run setup NamaProject",
  },
];

const fontWeights = [
  { className: "font-normal", weight: 400, usage: "Teks paragraf" },
  { className: "font-medium", weight: 500, usage: "Caption, penekanan ringan" },
  { className: "font-semibold", weight: 600, usage: "Heading 2–4, label, tombol" },
  { className: "font-bold", weight: 700, usage: "Display, Heading 1" },
];

const textStyles = [
  { className: "italic", label: "Italic", usage: "Istilah asing, kutipan" },
  { className: "underline underline-offset-4", label: "Underline", usage: "Link di dalam paragraf" },
  { className: "line-through", label: "Line-through", usage: "Harga coret, item selesai" },
  { className: "uppercase tracking-widest", label: "Uppercase", usage: "Overline, badge" },
  { className: "tabular-nums", label: "Tabular nums 1.234.567", usage: "Angka di tabel, harga" },
  { className: "truncate", label: "Teks yang terlalu panjang akan dipotong dengan tanda elipsis di akhir baris", usage: "Judul di card, nama file" },
];

const textColors = [
  { className: "text-foreground", usage: "Teks utama" },
  { className: "text-muted-foreground", usage: "Teks sekunder, deskripsi" },
  { className: "text-primary", usage: "Link, aksen, elemen aktif" },
  { className: "text-accent", usage: "Highlight, peringatan ringan" },
];

const colors = [
  { name: "Background", className: "bg-background", usage: "Latar halaman" },
  { name: "Foreground", className: "bg-foreground", usage: "Teks utama" },
  { name: "Muted", className: "bg-muted", usage: "Latar card, kode, area sekunder" },
  { name: "Muted Foreground", className: "bg-muted-foreground", usage: "Teks sekunder" },
  { name: "Border", className: "bg-border", usage: "Garis, pembatas, outline input" },
  { name: "Primary", className: "bg-primary", usage: "Tombol utama, link" },
  { name: "Primary Foreground", className: "bg-primary-foreground", usage: "Teks di atas warna primary" },
  { name: "Accent", className: "bg-accent", usage: "Highlight, badge" },
];

const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24];

const radii = [
  { className: "rounded-sm", value: "4px" },
  { className: "rounded-md", value: "6px" },
  { className: "rounded-lg", value: "8px" },
  { className: "rounded-xl", value: "12px" },
  { className: "rounded-2xl", value: "16px" },
  { className: "rounded-full", value: "9999px" },
];

const sections = [
  { id: "font", label: "Font" },
  { id: "skala", label: "Skala teks" },
  { id: "weight", label: "Weight" },
  { id: "gaya", label: "Gaya teks" },
  { id: "warna", label: "Warna" },
  { id: "spasi", label: "Spasi & radius" },
];

function Section({
  id,
  overline,
  title,
  description,
  children,
}: {
  id: string;
  overline: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-16 md:py-24">
      <p className="text-overline uppercase text-primary">{overline}</p>
      <h2 className="mt-3 text-h2">{title}</h2>
      <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{description}</p>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex-1">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-4 md:px-8">
          <a href="#" className="shrink-0 text-body-sm font-semibold">
            ProjectsEight
          </a>
          <nav className="flex gap-5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 text-body-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 md:px-8">
        {/* Hero */}
        <div className="py-20 md:py-32">
          <p className="text-overline uppercase text-primary">Design System</p>
          <h1 className="mt-4 max-w-4xl text-display">Panduan tipografi & gaya visual</h1>
          <p className="mt-6 max-w-2xl text-body-lg text-muted-foreground">
            Satu tempat untuk melihat dan menentukan ukuran font, ketebalan, warna, dan spasi yang
            dipakai di seluruh aplikasi. Nilai di halaman ini dibaca langsung dari CSS, jadi selalu
            sesuai dengan yang sedang aktif.
          </p>
          <div className="mt-8 inline-flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted px-4 py-3 text-body-sm">
            <span className="text-muted-foreground">Ubah semua token di</span>
            <code className="font-mono text-code text-primary">apps/web/src/app/globals.css</code>
          </div>
        </div>

        <Section
          id="font"
          overline="01 · Font family"
          title="Font"
          description="Dua keluarga font: sans untuk semua teks, mono untuk kode. Font dimuat lewat next/font di src/app/layout.tsx."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "Geist Sans", className: "font-sans", usage: "Semua teks: judul, paragraf, tombol" },
              { name: "Geist Mono", className: "font-mono", usage: "Kode, angka teknis, nama file" },
            ].map((font) => (
              <div key={font.name} className="rounded-2xl border border-border p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-h4">{font.name}</p>
                  <code className="font-mono text-caption text-primary">{font.className}</code>
                </div>
                <p className={`${font.className} mt-6 text-[5rem] leading-none font-semibold`}>Aa</p>
                <p className={`${font.className} mt-6 text-body break-all text-muted-foreground`}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  0123456789 !@#$%&*()
                </p>
                <p className="mt-4 text-caption text-muted-foreground">{font.usage}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="skala"
          overline="02 · Type scale"
          title="Skala teks"
          description="Setiap class sudah mengatur ukuran, line-height, letter-spacing, dan weight sekaligus. Cukup pakai satu class, misalnya text-h2."
        >
          <div className="border-t border-border">
            {typeScale.map((t) => (
              <TypeRow key={t.className} {...t} />
            ))}
          </div>
        </Section>

        <Section
          id="weight"
          overline="03 · Font weight"
          title="Ketebalan"
          description="Empat ketebalan yang dipakai. Hindari weight lain supaya tampilan tetap konsisten."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fontWeights.map((w) => (
              <div key={w.className} className="rounded-2xl border border-border p-6">
                <p className={`${w.className} text-h1`}>Aa</p>
                <p className="mt-4 text-body-sm font-semibold">{w.weight}</p>
                <code className="font-mono text-caption text-primary">{w.className}</code>
                <p className="mt-2 text-caption text-muted-foreground">{w.usage}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="gaya"
          overline="04 · Text style"
          title="Gaya teks & warna teks"
          description="Gaya tambahan yang bisa digabung dengan class ukuran mana pun."
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="divide-y divide-border border-y border-border">
              {textStyles.map((s) => (
                <div key={s.className} className="grid gap-1 py-4">
                  <p className={`${s.className} text-body-lg`}>{s.label}</p>
                  <p className="text-caption text-muted-foreground">
                    <code className="font-mono text-primary">{s.className}</code> · {s.usage}
                  </p>
                </div>
              ))}
            </div>
            <div className="divide-y divide-border border-y border-border">
              {textColors.map((c) => (
                <div key={c.className} className="grid gap-1 py-4">
                  <p className={`${c.className} text-body-lg font-medium`}>
                    Teks dengan warna ini
                  </p>
                  <p className="text-caption text-muted-foreground">
                    <code className="font-mono text-primary">{c.className}</code> · {c.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="warna"
          overline="05 · Color"
          title="Palet warna"
          description="Warna otomatis berganti saat mode gelap aktif. Kode hex di bawah dibaca dari tema yang sedang dipakai."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <ColorSwatch key={c.className} {...c} />
            ))}
          </div>
        </Section>

        <Section
          id="spasi"
          overline="06 · Spacing & radius"
          title="Spasi & sudut"
          description="Spasi memakai kelipatan 4px (p-1 = 4px, p-4 = 16px). Usahakan memakai nilai dari daftar ini saja."
        >
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-3">
              {spacing.map((n) => (
                <div key={n} className="flex items-center gap-4">
                  <code className="w-14 shrink-0 font-mono text-caption text-primary">{n}</code>
                  <div className="h-3 rounded-sm bg-primary" style={{ width: `${n * 4}px` }} />
                  <span className="font-mono text-caption text-muted-foreground tabular-nums">
                    {n * 4}px
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {radii.map((r) => (
                <div key={r.className} className="space-y-2">
                  <div className={`${r.className} aspect-square border-2 border-primary bg-muted`} />
                  <code className="block font-mono text-caption text-primary">{r.className}</code>
                  <p className="font-mono text-caption text-muted-foreground">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 text-body-sm text-muted-foreground md:px-8">
          Token didefinisikan di <code className="font-mono text-primary">globals.css</code>.
          Ubah nilainya di sana, lalu halaman ini dan seluruh aplikasi ikut berubah.
        </div>
      </footer>
    </div>
  );
}
