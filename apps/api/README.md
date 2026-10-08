# api

Backend ProjectsEight: **NestJS 12** + **Drizzle ORM** + **PostgreSQL** (dengan pgvector).

Cara menjalankan, setup, dan `.env` ada di [README utama](../../README.md). Database dijalankan lewat `docker compose up -d` dari root.

## Struktur

```
src/
  main.ts            start server (port dari API_PORT, CORS dari WEB_URL)
  app.module.ts      module utama: config (.env root) + database
  app.controller.ts  endpoint contoh
  app.service.ts     logika contoh (membaca tabel users)
  db/
    schema.ts        definisi tabel (users, documents + vector embedding)
    db.module.ts     koneksi database, inject dengan @Inject(DB)
drizzle/             file migrasi SQL (dibuat otomatis)
drizzle.config.ts    konfigurasi drizzle-kit
```

## Endpoint contoh

| Method | Path | Isi |
|---|---|---|
| GET | `/` | `Hello World!` |
| GET | `/users` | Daftar user dari database |

## Perintah

Dijalankan dari folder ini (`apps/api`):

| Perintah | Fungsi |
|---|---|
| `bun run dev` | Jalankan api saja (atau `bun dev` dari root untuk web + api) |
| `bun run db:generate` | Buat file migrasi setelah mengubah `src/db/schema.ts` |
| `bun run db:migrate` | Jalankan migrasi ke database |
| `bun run db:studio` | Lihat isi database di browser |
| `bun run test` | Unit test (Vitest) |
| `bun run test:e2e` | End-to-end test |
| `bun run build` | Build production ke `dist/` |

## Catatan

- Project ini memakai **ESM**: import file lokal wajib berakhiran `.js`, misalnya `import { DB } from './db/db.module.js'`.
- Jangan mengedit file di `drizzle/` secara manual. Ubah `schema.ts`, lalu jalankan `db:generate` dan `db:migrate`.
