import { ColorSwatch, TypeRow } from "@/components/style-guide";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Radio, Select, Switch, Textarea } from "@/components/ui/form";

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
  { className: "uppercase", label: "Uppercase", usage: "Overline, badge" },
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
  { name: "Destructive", className: "bg-destructive", usage: "Tombol hapus, pesan error" },
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
  { id: "tombol", label: "Tombol" },
  { id: "form", label: "Form" },
];

const buttonVariants = [
  { variant: "primary", usage: "Aksi utama. Cukup satu per area." },
  { variant: "secondary", usage: "Aksi pendamping." },
  { variant: "outline", usage: "Aksi alternatif, mis. Batal." },
  { variant: "ghost", usage: "Aksi ringan di toolbar atau menu." },
  { variant: "destructive", usage: "Aksi berbahaya, mis. Hapus." },
  { variant: "link", usage: "Aksi yang tampil seperti tautan." },
] as const;

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
);

function Demo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border">
      <p className="border-b border-border px-6 py-3 text-overline uppercase text-muted-foreground">{title}</p>
      <div className="flex flex-wrap items-center gap-4 p-6">{children}</div>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-muted p-6 font-mono text-code">
      <code>{children.trim()}</code>
    </pre>
  );
}

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
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 md:px-8">
          <a href="#" className="shrink-0 text-body-sm font-semibold">
            ProjectsEight
          </a>
          <nav className="flex min-w-0 flex-1 gap-5 overflow-x-auto [scrollbar-width:none]">
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
          <ThemeToggle />
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
          description="Dua keluarga font: Atkinson Hyperlegible Next untuk semua teks (dipilih karena setiap huruf mudah dibedakan), mono untuk kode. Font dimuat lewat next/font di src/app/layout.tsx."
        >
          <Link
            href="/fonts"
            className="mb-6 inline-flex items-center gap-2 text-body-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Bandingkan pilihan font yang mudah dibaca →
          </Link>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "Atkinson Hyperlegible Next", className: "font-sans", usage: "Semua teks: judul, paragraf, tombol" },
              { name: "Geist Mono", className: "font-mono", usage: "Kode, angka teknis, nama file" },
            ].map((font) => (
              <div key={font.name} className="rounded-2xl border border-border p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-h4">{font.name}</p>
                  <code className="font-mono text-caption text-primary">{font.className}</code>
                </div>
                {/* eslint-disable-next-line design/tokens -- spesimen font besar khusus halaman dokumentasi */}
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
          description="Setiap warna punya nilai untuk tema terang dan gelap. Ganti tema lewat tombol di kanan atas; kode hex di bawah ikut berubah sesuai tema yang aktif."
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

        <Section
          id="tombol"
          overline="07 · Button"
          title="Tombol"
          description="Komponen Button di src/components/ui/button.tsx. Pilih variant sesuai pentingnya aksi, dan size sesuai tempatnya."
        >
          <div className="grid gap-6">
            <div className="divide-y divide-border rounded-2xl border border-border">
              {buttonVariants.map((b) => (
                <div key={b.variant} className="grid items-center gap-3 p-6 sm:grid-cols-[200px_1fr_auto]">
                  <div>
                    <code className="font-mono text-caption text-primary">variant=&quot;{b.variant}&quot;</code>
                    <p className="text-caption text-muted-foreground">{b.usage}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant={b.variant}>Simpan</Button>
                    <Button variant={b.variant} disabled>
                      Nonaktif
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Demo title="Ukuran: sm · md · lg · icon">
                <Button size="sm">Kecil</Button>
                <Button size="md">Sedang</Button>
                <Button size="lg">Besar</Button>
                <Button size="icon" variant="outline" aria-label="Tambah">
                  <PlusIcon />
                </Button>
              </Demo>
              <Demo title="Dengan ikon & loading">
                <Button>
                  <PlusIcon /> Tambah data
                </Button>
                <Button variant="outline">
                  Lanjut <ArrowIcon />
                </Button>
                <Button variant="destructive">
                  <TrashIcon /> Hapus
                </Button>
                <Button loading>Menyimpan…</Button>
              </Demo>
            </div>

            <Code>{`
import { Button } from "@/components/ui/button";

<Button>Simpan</Button>
<Button variant="outline" size="sm">Batal</Button>
<Button variant="destructive" loading={isDeleting}>Hapus</Button>
<Button type="submit">Kirim</Button>
`}</Code>
          </div>
        </Section>

        <Section
          id="form"
          overline="08 · Form"
          title="Form inputan"
          description="Komponen di src/components/ui/form.tsx. Bungkus input dengan Field supaya label, teks bantuan, dan pesan error otomatis tersambung."
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <form className="grid gap-6 rounded-2xl border border-border p-6 md:p-8">
              <div>
                <h3 className="text-h3">Contoh form</h3>
                <p className="mt-1 text-body-sm text-muted-foreground">
                  Semua jenis inputan dalam satu form.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="nama" label="Nama lengkap" required>
                  <Input placeholder="Budi Santoso" autoComplete="name" />
                </Field>
                <Field id="email" label="Email" required error="Format email tidak valid.">
                  <Input type="email" defaultValue="budi@" autoComplete="email" />
                </Field>
              </div>

              <Field id="password" label="Password" hint="Minimal 8 karakter, kombinasi huruf dan angka.">
                <Input type="password" autoComplete="new-password" />
              </Field>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="kota" label="Kota">
                  <Select defaultValue="">
                    <option value="" disabled>
                      Pilih kota
                    </option>
                    <option>Jakarta</option>
                    <option>Bandung</option>
                    <option>Surabaya</option>
                    <option>Yogyakarta</option>
                  </Select>
                </Field>
                <Field id="kode" label="Kode referal" hint="Tidak bisa diubah.">
                  <Input defaultValue="EIGHT-2026" disabled />
                </Field>
              </div>

              <Field id="pesan" label="Pesan" hint="Opsional.">
                <Textarea placeholder="Tulis pesan…" />
              </Field>

              <fieldset className="grid gap-3">
                <legend className="mb-3 text-body-sm font-medium">Paket</legend>
                <Radio name="paket" value="basic" label="Basic" description="Gratis, untuk mencoba." defaultChecked />
                <Radio name="paket" value="pro" label="Pro" description="Rp99.000 / bulan." />
                <Radio name="paket" value="tim" label="Tim" description="Segera hadir." disabled />
              </fieldset>

              <fieldset className="grid gap-3">
                <legend className="mb-3 text-body-sm font-medium">Notifikasi</legend>
                <Checkbox name="notif" value="email" label="Email" defaultChecked />
                <Checkbox name="notif" value="wa" label="WhatsApp" description="Hanya untuk info penting." />
              </fieldset>

              <Switch name="newsletter" label="Berlangganan newsletter" defaultChecked />

              <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
                <Button variant="outline">Batal</Button>
                <Button>Simpan</Button>
              </div>
            </form>

            <div className="grid content-start gap-6">
              <Demo title="Status input">
                <div className="grid w-full gap-5">
                  <Field id="s-default" label="Default">
                    <Input placeholder="Placeholder" />
                  </Field>
                  <Field id="s-filled" label="Terisi">
                    <Input defaultValue="Teks yang sudah diisi" />
                  </Field>
                  <Field id="s-error" label="Error" error="Wajib diisi.">
                    <Input />
                  </Field>
                  <Field id="s-disabled" label="Nonaktif">
                    <Input defaultValue="Tidak bisa diubah" disabled />
                  </Field>
                </div>
              </Demo>
              <p className="text-caption text-muted-foreground">
                Klik atau tekan Tab ke sebuah input untuk melihat status fokus.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Code>{`
import { Field, Input, Select, Checkbox, Switch } from "@/components/ui/form";

<Field id="email" label="Email" hint="Kami tidak akan membagikannya." required>
  <Input type="email" name="email" />
</Field>

<Field id="email" label="Email" error="Format email tidak valid.">
  <Input type="email" name="email" />
</Field>

<Checkbox name="setuju" label="Saya setuju dengan syarat & ketentuan" />
<Switch name="newsletter" label="Berlangganan newsletter" />
`}</Code>
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
