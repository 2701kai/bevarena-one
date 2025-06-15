// vite.config.js
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Custom plugin to inject Context7 initialization
const devToolsPlugin = {
  name: "context7-dev-tools",
  transformIndexHtml(html) {
    if (process.env.NODE_ENV === "production") return html;

    // Add script to initialize Context7
    return html.replace(
      "</head>",
      `<script>
        // Initialize Context7 if available
        window.__context7_config = {
          enabled: true,
          keyboardShortcuts: {
            togglePanel: ["Alt+D", "Alt+7"]
          }
        };
      </script>
      </head>`
    );
  },
};

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react(), tailwindcss(), isDev && devToolsPlugin].filter(Boolean),
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
    optimizeDeps: {
      include: isDev ? ["./src/context/context7.js"] : [],
    },
  };
});
