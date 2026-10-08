#!/usr/bin/env bun
/**
 * Setup project baru dari template ini.
 *
 *   bun run setup                      # interaktif (nama default = nama folder)
 *   bun run setup NamaProject          # pakai nama ini
 *   bun run setup NamaProject --yes    # tanpa pertanyaan, pakai default
 *
 * Opsi:
 *   --web-port <n>   port Next.js   (default 3000, atau port kosong berikutnya)
 *   --api-port <n>   port NestJS    (default 4000, atau port kosong berikutnya)
 *   --db-port <n>    port Postgres  (default 5432, atau port kosong berikutnya)
 *   --force          timpa .env yang sudah ada tanpa bertanya
 *   --skip-docker    jangan nyalakan database & jangan jalankan migrasi
 *   --yes, -y        jangan bertanya apa pun
 */
import { $ } from 'bun';
import { existsSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dir, '..');
$.cwd(ROOT);

// ── argumen ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const option = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const positional = args.find(
  (a, i) => !a.startsWith('-') && !args[i - 1]?.match(/^--(web|api|db)-port$/),
);

const nonInteractive = flag('--yes') || flag('-y') || !process.stdin.isTTY;
const ask = (question: string, fallback: string) =>
  nonInteractive ? fallback : (prompt(`${question} [${fallback}]:`) ?? fallback).trim() || fallback;
const confirm = (question: string, fallback: boolean) => {
  if (nonInteractive) return fallback;
  const answer = prompt(`${question} ${fallback ? '[Y/n]' : '[y/N]'}:`)?.trim().toLowerCase();
  return answer ? answer.startsWith('y') : fallback;
};

const step = (msg: string) => console.log(`\n\x1b[36m▸ ${msg}\x1b[0m`);
const ok = (msg: string) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
const warn = (msg: string) => console.log(`  \x1b[33m!\x1b[0m ${msg}`);
const fail = (msg: string): never => {
  console.error(`\n\x1b[31m✗ ${msg}\x1b[0m`);
  process.exit(1);
};

// ── helper port ────────────────────────────────────────────────────────────
function canBind(port: number) {
  return new Promise<boolean>((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.listen(port, '0.0.0.0', () => server.close(() => resolve(true)));
  });
}

function hasListener(port: number) {
  return new Promise<boolean>((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' });
    socket.setTimeout(300);
    socket.once('connect', () => (socket.destroy(), resolve(true)));
    socket.once('timeout', () => (socket.destroy(), resolve(false)));
    socket.once('error', () => resolve(false));
  });
}

const isPortFree = async (port: number) =>
  (await canBind(port)) && !(await hasListener(port));

async function pickPort(label: string, preferred: number, taken: Set<number>, ownedByUs = false) {
  if (ownedByUs) return preferred;
  let port = preferred;
  while (taken.has(port) || !(await isPortFree(port))) port++;
  if (port !== preferred) warn(`port ${label} ${preferred} sedang dipakai → pakai ${port}`);
  taken.add(port);
  return port;
}

// ── baca nilai yang sudah ada (kalau setup dijalankan ulang) ──────────────
const envPath = path.join(ROOT, '.env');
const existingEnv: Record<string, string> = {};
if (existsSync(envPath)) {
  for (const line of (await Bun.file(envPath).text()).split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) existingEnv[m[1]] = m[2];
  }
}

// ── 1. nama project ────────────────────────────────────────────────────────
console.log('\n\x1b[1mSetup project dari template\x1b[0m');

const name = positional ?? ask('Nama project', path.basename(ROOT));
const pkgName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const dbName = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
if (!pkgName || !/^[a-z]/.test(dbName)) fail(`Nama project "${name}" tidak valid. Gunakan huruf & angka, diawali huruf.`);

// ── 2. .env lama: timpa atau pakai? ─────────────────────────────────────
let writeEnv = true;
if (existsSync(envPath) && !flag('--force')) {
  writeEnv = confirm('.env sudah ada. Timpa?', false);
}

// ── 3. port ────────────────────────────────────────────────────────────────
const num = (v: string | undefined, fallback: number) => (v ? Number(v) : fallback);
let webPort: number, apiPort: number, dbPort: number;

if (writeEnv) {
  step('Memeriksa port');
  const dbRunning =
    !flag('--skip-docker') &&
    (await $`docker compose ps --status running -q db`.quiet().nothrow()).stdout.toString().trim() !== '';

  const taken = new Set<number>();
  webPort = await pickPort('web', num(option('--web-port') ?? existingEnv.WEB_PORT, 3000), taken);
  apiPort = await pickPort('api', num(option('--api-port') ?? existingEnv.API_PORT, 4000), taken);
  dbPort = await pickPort(
    'database',
    num(option('--db-port') ?? existingEnv.POSTGRES_PORT, 5432),
    taken,
    // database project ini sendiri sudah jalan → port itu memang milik kita
    dbRunning && !option('--db-port'),
  );
  ok(`web ${webPort} · api ${apiPort} · database ${dbPort}`);
} else {
  webPort = num(existingEnv.WEB_PORT, 3000);
  apiPort = num(existingEnv.API_PORT, 4000);
  dbPort = num(existingEnv.POSTGRES_PORT, 5432);
}

// ── 4. .env ────────────────────────────────────────────────────────────────
const user = existingEnv.POSTGRES_USER ?? 'app';
const password = existingEnv.POSTGRES_PASSWORD ?? 'app';
const finalDbName = writeEnv ? dbName : (existingEnv.POSTGRES_DB ?? dbName);

if (writeEnv) {
  step('Menulis .env');
  const env = `# ── Docker Compose ──
COMPOSE_PROJECT_NAME=${pkgName}

# ── Database (dipakai docker compose) ──
POSTGRES_USER=${user}
POSTGRES_PASSWORD=${password}
POSTGRES_DB=${dbName}
POSTGRES_PORT=${dbPort}

# ── API (NestJS + Drizzle) ──
API_PORT=${apiPort}
DATABASE_URL=postgresql://${user}:${password}@localhost:${dbPort}/${dbName}
WEB_URL=http://localhost:${webPort}

# ── Web (Next.js) ──
WEB_PORT=${webPort}
NEXT_PUBLIC_API_URL=http://localhost:${apiPort}
`;
  await Bun.write(envPath, env);
  await Bun.write(path.join(ROOT, '.env.example'), env);
  ok('.env & .env.example ditulis');
} else {
  warn('.env dibiarkan seperti semula');
}

// ── 5. nama & port di package.json ─────────────────────────────────────────
step('Memperbarui package.json');
const rootPkgPath = path.join(ROOT, 'package.json');
const rootPkg = await Bun.file(rootPkgPath).json();
rootPkg.name = pkgName;
await Bun.write(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');
ok(`nama project: ${pkgName}`);

// Next.js menentukan port sebelum next.config.ts (dan .env root) dibaca,
// jadi port web ditulis langsung di script-nya.
const webPkgPath = path.join(ROOT, 'apps/web/package.json');
const webPkg = await Bun.file(webPkgPath).json();
webPkg.scripts.dev = `next dev -p ${webPort}`;
webPkg.scripts.start = `next start -p ${webPort}`;
await Bun.write(webPkgPath, JSON.stringify(webPkg, null, 2) + '\n');
ok(`port web: ${webPort}`);

// ── 6. dependency ──────────────────────────────────────────────────────────
step('Install dependency (bun install)');
await $`bun install`.nothrow().then((r) => r.exitCode === 0 || fail('bun install gagal'));
ok('dependency terpasang');

// ── 7. database ────────────────────────────────────────────────────────────
if (flag('--skip-docker')) {
  warn('--skip-docker: database & migrasi dilewati');
} else {
  step('Menyalakan database (docker compose up -d)');
  const docker = await $`docker info`.quiet().nothrow();
  if (docker.exitCode !== 0) fail('Docker tidak jalan. Buka Docker Desktop, lalu jalankan `bun run setup` lagi.');

  const up = await $`docker compose up -d`.nothrow();
  if (up.exitCode !== 0) fail('docker compose up gagal');

  let ready = false;
  for (let i = 0; i < 60 && !ready; i++) {
    const r = await $`docker compose exec -T db pg_isready -U ${user} -d ${finalDbName}`.quiet().nothrow();
    ready = r.exitCode === 0;
    if (!ready) await Bun.sleep(1000);
  }
  if (!ready) fail('Database tidak siap setelah 60 detik. Cek: docker compose logs db');
  ok('database siap');

  step('Menjalankan migrasi (drizzle-kit migrate)');
  const migrate = await $`bun run db:migrate`.cwd(path.join(ROOT, 'apps/api')).nothrow();
  if (migrate.exitCode !== 0) fail('migrasi gagal');
  ok('tabel dibuat');
}

// ── selesai ────────────────────────────────────────────────────────────────
console.log(`
\x1b[32m\x1b[1m✓ Setup selesai: ${name}\x1b[0m

  Jalankan:   bun dev

  Web         http://localhost:${webPort}
  API         http://localhost:${apiPort}
  Database    localhost:${dbPort}  (db: ${finalDbName})
`);
