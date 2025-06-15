// vite.config.js
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  define: {
    "process.env": {},
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: true,
  },
});
