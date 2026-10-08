# ProjectsEight

Template monorepo: **Turborepo + Next.js + NestJS + Drizzle + PostgreSQL (pgvector) + Docker**, dengan Bun sebagai package manager.

| App | Folder | Port default |
|---|---|---|
| Web (Next.js) | `apps/web` | 3000 |
| API (NestJS) | `apps/api` | 4000 |
| Database (PostgreSQL + pgvector) | `docker-compose.yml` | 5432 |

## Kebutuhan

- [Bun](https://bun.sh)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (atau OrbStack), dalam keadaan menyala
- [GitHub CLI](https://cli.github.com) (`gh`), untuk membuat project dari template

## Plugin Claude Code

Project ini menyarankan dua plugin dari marketplace resmi Anthropic (diatur di `.claude/settings.json`):

- **superpowers**: brainstorming, rencana kerja, TDD, debugging sistematis, dan code review
- **frontend-design**: membantu merancang tampilan (tetap mengikuti design system di `apps/web/CLAUDE.md`)

Saat membuka project ini pertama kali di Claude Code, kamu akan diminta mempercayai folder project; setelah itu marketplace dan plugin di atas ditawarkan untuk dipasang. Bisa juga dipasang manual:

```bash
claude plugin marketplace add anthropics/claude-plugins-official
claude plugin install superpowers@claude-plugins-official
claude plugin install frontend-design@claude-plugins-official
```

## Membuat project baru dari template

```bash
gh repo create NamaProject --template dodomGNT/ProjectsEight --private --clone
cd NamaProject
bun run setup
bun dev
```

`bun run setup` akan:

1. Menanyakan nama project (default: nama folder)
2. Mencari port yang kosong (kalau 3000/4000/5432 sudah dipakai project lain, otomatis pakai 3001/4001/5433, dst.)
3. Menulis `.env` dan `.env.example`
4. Mengganti nama project di `package.json` dan port web di `apps/web/package.json`
5. `bun install`
6. Menyalakan database (`docker compose up -d`)
7. Menjalankan migrasi database

Opsi:

```bash
bun run setup NamaProject --yes          # tanpa pertanyaan
bun run setup --web-port 3005 --api-port 4005 --db-port 5440
bun run setup --force                    # timpa .env yang sudah ada
bun run setup --skip-docker              # lewati database & migrasi
```

## Menjalankan sehari-hari

```bash
docker compose up -d   # nyalakan database
bun dev                # jalankan web + api
```

Hentikan dengan `Ctrl + C`. Matikan database dengan `docker compose down` (data tetap tersimpan).

## Perintah lain

| Kebutuhan | Perintah | Dari folder |
|---|---|---|
| Setelah mengubah `src/db/schema.ts` | `bun run db:generate && bun run db:migrate` | `apps/api` |
| Lihat isi database di browser | `bun run db:studio` | `apps/api` |
| Test API | `bun run test` | `apps/api` |
| Build semua | `bun run build` | root |
| Jalankan satu app saja | `bun dev --filter=web` / `--filter=api` | root |
| Hapus database **beserta datanya** | `docker compose down -v` | root |

## Environment

Semua konfigurasi ada di **satu file `.env` di root** (dibuat oleh `bun run setup`, tidak di-commit). Docker Compose, NestJS, Drizzle Kit, dan Next.js membacanya dari sana.

Variabel berawalan `NEXT_PUBLIC_` ikut terkirim ke browser, jadi jangan simpan rahasia di sana. Setelah mengubah `.env`, restart `bun dev`.

## Struktur

```
apps/
  web/                 Next.js (App Router, Tailwind): halaman /, /login, /design, /fonts
    CLAUDE.md          aturan desain (tipografi, warna, responsif, komponen)
  api/                 NestJS
    CLAUDE.md          aturan backend
    src/db/schema.ts   definisi tabel (Drizzle)
    src/db/db.module.ts koneksi database
    drizzle/           file migrasi SQL
packages/              kode bersama (opsional)
scripts/setup.ts       script setup project baru
docker-compose.yml     PostgreSQL + pgvector (hanya bisa diakses dari laptop sendiri)
CLAUDE.md              aturan umum project untuk Claude Code
.claude/settings.json  plugin Claude Code yang disarankan
```

Detail frontend (halaman, komponen, logo, latar login) ada di [`apps/web/README.md`](apps/web/README.md); detail backend di [`apps/api/README.md`](apps/api/README.md).

## pgvector

Extension `vector` sudah aktif, dan ada tabel contoh `documents` dengan kolom `embedding vector(1536)` + index HNSW. Sesuaikan `dimensions` di `schema.ts` dengan model embedding yang dipakai. Contoh pencarian:

```ts
import { asc, cosineDistance } from 'drizzle-orm';

const distance = cosineDistance(documents.embedding, queryEmbedding);
await db.select({ content: documents.content, distance })
  .from(documents).orderBy(asc(distance)).limit(5);
```
