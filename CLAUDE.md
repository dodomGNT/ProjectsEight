@AGENTS.md

# ProjectsEight

Monorepo Turborepo + Bun: `apps/web` (Next.js 16, Tailwind v4) dan `apps/api` (NestJS 12, Drizzle, PostgreSQL + pgvector di Docker). Repo ini juga dipakai sebagai template project baru (`bun run setup`).

## Rule harus selalu terbaru

File rule: `CLAUDE.md` (root) untuk aturan umum, `apps/web/CLAUDE.md` untuk desain & frontend, `apps/api/CLAUDE.md` untuk backend.

1. **Catat tanpa menunggu diminta.** Setiap perubahan yang menetapkan pola baru (komponen, token, layout, konvensi, struktur folder, perintah, cara kerja) langsung dicatat ke file rule yang sesuai, di commit yang sama dengan perubahannya. Kalau perintah atau struktur berubah, perbarui juga `README.md` yang terkait.
2. **Rule lama boleh diubah atau disesuaikan kalau memang diperlukan**, asal **tidak mengacaukan yang sudah ada**:
   - Utamakan menambah atau melengkapi; ubah rule lama hanya kalau sudah tidak sesuai dengan kode, atau perlu disesuaikan dengan perubahan baru.
   - Setelah rule diubah, kode yang ada harus tetap sesuai dengan rule tersebut (cek dengan `bun run lint`, dan perbaiki kode yang terdampak).
   - Jangan menghapus rule yang masih berlaku hanya karena tidak sedang dipakai.
   - Kalau perubahan rule akan mengubah tampilan atau perilaku yang sudah ada secara besar (mis. ganti warna utama, ganti struktur halaman), **tanya user dulu**.
3. **Laporkan.** Di akhir pekerjaan, sebutkan rule apa yang ditambah atau diubah, di file mana, dan (kalau diubah) alasannya.
4. Rule harus sesuai dengan kode yang benar-benar ada. Jangan mencatat sesuatu yang belum dibuat atau belum dicek.

## Aturan

- **UI / tampilan**: wajib mengikuti aturan desain di `apps/web/CLAUDE.md` (tipografi, warna, spasi, responsif, komponen).
- **Environment**: satu file `.env` di root, dibaca oleh Docker Compose, NestJS, Drizzle Kit, dan Next.js. Jangan membuat `.env` di dalam `apps/*`. Variabel baru juga ditambahkan ke `.env.example` dan ke `scripts/setup.ts`.
- **Port database** di `docker-compose.yml` hanya terbuka ke `127.0.0.1` (bukan ke jaringan), karena password development-nya lemah. Jangan diubah ke `"5432:5432"` tanpa persetujuan user.
- **Database**: ubah tabel di `apps/api/src/db/schema.ts`, lalu `bun run db:generate && bun run db:migrate` dari `apps/api`. Jangan mengedit file di `apps/api/drizzle/` secara manual, kecuali migrasi custom (`drizzle-kit generate --custom`).
- **NestJS** memakai ESM: import lokal wajib berakhiran `.js` (`'./db/db.module.js'`).
- **Package manager**: Bun (`bun add`, `bunx`), bukan npm/yarn.
- **Plugin Claude Code** untuk project ini ada di `.claude/settings.json` (dari marketplace resmi `anthropics/claude-plugins-official`): `superpowers` (alur kerja: brainstorming, rencana, TDD, debugging, review) dan `frontend-design` (ide tampilan; tetap tunduk pada aturan desain di `apps/web/CLAUDE.md`). Pengaturan pribadi di `.claude/settings.local.json` (tidak di-commit).

## Perintah

| Kebutuhan | Perintah | Dari |
|---|---|---|
| Jalankan semua | `docker compose up -d` lalu `bun dev` | root |
| Lint web | `bun run lint` | `apps/web` |
| Test api | `bun run test` | `apps/api` |
| Cek tipe tanpa build | `bunx tsc --noEmit` | `apps/web` atau `apps/api` |

Kalau perubahan `globals.css` tidak muncul di `bun dev`, lihat bagian "Sebelum selesai" di `apps/web/CLAUDE.md`.
