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
    optimizeDeps: {
      include: isDev ? ["./scripts/setup-devtools.js"] : [],
    },
    // Add the setup-devtools.js script to the HTML in development mode
    transformIndexHtml: (html) => {
      if (!isDev) return html;

      // Add the setup-devtools.js script before the closing body tag
      return html.replace(
        "</body>",
        `<script type="module" src="/scripts/setup-devtools.js"></script></body>`
      );
    },
  };
});
