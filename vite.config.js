// vite.config.js
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

// Create a Context7 plugin for development tools
const context7Plugin = {
  name: "context7-dev-tools",
  enforce: "pre",
  apply: "serve", // Only apply in development mode

  // Transform HTML to inject developer environment flags
  transformIndexHtml() {
    return [
      {
        tag: "script",
        injectTo: "head",
        children: `
          // Set developer environment flag
          window.__DEV_ENV = true;
          
          // Register global error handler for development tools
          window.addEventListener('error', function(e) {
            if (e.filename && (e.filename.includes('devtools') || e.filename.includes('context7'))) {
              console.warn('[DEV] Development tool error suppressed:', e.message);
              return true; // Prevent error from showing in console
            }
          });
          
          // Register Alt+7 shortcut for Context7
          window.addEventListener('keydown', function(e) {
            if (e.altKey && e.key === '7') {
              e.preventDefault();
              console.log("[DEV] Context7 shortcut activated");
              if (window.__C7 && typeof window.__C7.togglePanel === 'function') {
                window.__C7.togglePanel();
                console.log("[DEV] Context7 panel toggled");
              } else {
                console.warn("[DEV] Context7 not available yet");
                // Dispatch an event that will be caught when Context7 is initialized
                window.dispatchEvent(new CustomEvent('c7:toggle-panel'));
              }
            }
          });
        `,
      },
    ];
  },

  // Resolve imports for Context7 files
  resolveId(id, importer) {
    // Handle dynamic imports of Context7 modules
    if (id.includes("utils/devtools") || id.includes("context7")) {
      const possiblePaths = [
        path.resolve(process.cwd(), "src", id),
        path.resolve(process.cwd(), "src", id + ".js"),
        path.resolve(process.cwd(), "src", id + ".jsx"),
      ];

      for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
          return filePath;
        }
      }
    }

    return null; // Let Vite handle other imports
  },

  // Make sure dev-only code is removed in production
  config(config) {
    if (config.mode === "production") {
      return {
        build: {
          rollupOptions: {
            external: [/utils\/devtools/, /context7/],
          },
        },
      };
    }
    return {};
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), context7Plugin],
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
