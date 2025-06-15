// vite.config.js
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
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
    // Include the setup-devtools.js script in development mode
    // Add the setup-devtools.js script to the HTML in development mode
  };
});
