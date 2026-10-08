# Aturan backend: apps/api

NestJS 12 (ESM) + Drizzle + PostgreSQL. Aturan umum (env, database, ESM, perintah) ada di `CLAUDE.md` root.

## Keamanan endpoint

- **Belum ada autentikasi.** Semua endpoint saat ini bisa dipanggil siapa saja yang bisa mengakses API.
- `GET /users` adalah **endpoint contoh**: mengembalikan semua user beserta email-nya. Sebelum tabel `users` berisi data sungguhan, endpoint ini wajib dilindungi autentikasi atau dihapus.
- Endpoint baru yang membaca atau mengubah data pengguna wajib memakai autentikasi (setelah fitur login dibuat). Jangan mengembalikan kolom sensitif (password/hash, token) dalam response.
- CORS hanya mengizinkan `WEB_URL` dari `.env`. Jangan diganti ke `origin: '*'`.
