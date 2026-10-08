import { config } from "dotenv";
import type { NextConfig } from "next";

// .env ada di root monorepo
config({ path: "../../.env", quiet: true });

const nextConfig: NextConfig = {
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
