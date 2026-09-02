import { defineConfig } from "vite";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  base: "/",
  appType: "spa",
  publicDir: "public",
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [
    {
      name: "spa-fallback-copy",
      closeBundle() {
        const index = resolve("dist/index.html");
        copyFileSync(index, resolve("dist/404.html"));
      },
    },
  ],
});
