@AGENTS.md

# ProjectsEight

Monorepo Turborepo + Bun: `apps/web` (Next.js 16, Tailwind v4) dan `apps/api` (NestJS 12, Drizzle, PostgreSQL + pgvector di Docker). Repo ini juga dipakai sebagai template project baru (`bun run setup`).

## Aturan

- **UI / tampilan**: wajib mengikuti aturan desain di `apps/web/CLAUDE.md` (tipografi, warna, spasi, komponen).
- **Environment**: satu file `.env` di root, dibaca oleh Docker Compose, NestJS, Drizzle Kit, dan Next.js. Jangan membuat `.env` di dalam `apps/*`. Variabel baru juga ditambahkan ke `.env.example` dan ke `scripts/setup.ts`.
- **Database**: ubah tabel di `apps/api/src/db/schema.ts`, lalu `bun run db:generate && bun run db:migrate` dari `apps/api`. Jangan mengedit file di `apps/api/drizzle/` secara manual, kecuali migrasi custom (`drizzle-kit generate --custom`).
- **NestJS** memakai ESM: import lokal wajib berakhiran `.js` (`'./db/db.module.js'`).
- **Package manager**: Bun (`bun add`, `bunx`), bukan npm/yarn.

## Perintah

| Kebutuhan | Perintah | Dari |
|---|---|---|
| Jalankan semua | `docker compose up -d` lalu `bun dev` | root |
| Lint web | `bun run lint` | `apps/web` |
| Test api | `bun run test` | `apps/api` |
| Cek tipe tanpa build | `bunx tsc --noEmit` | `apps/web` atau `apps/api` |

Jangan menjalankan `next build` di `apps/web` saat `bun dev` sedang jalan, karena cache dev server bisa rusak.
