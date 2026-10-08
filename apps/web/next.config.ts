import { config } from "dotenv";
import type { NextConfig } from "next";

// .env ada di root monorepo
config({ path: "../../.env", quiet: true });

const nextConfig: NextConfig = {
  // Saat `bun dev`, izinkan halaman dibuka dari alamat jaringan lokal (mis. http://192.168.x.x:3000),
  // misalnya untuk tes di HP. Tanpa ini, JavaScript tidak dimuat dan tombol tidak bisa diklik.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
