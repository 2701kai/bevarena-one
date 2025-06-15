// vite.config.js
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Custom plugin to inject Context7 initialization
const devToolsPlugin = {
  name: "context7-dev-tools",
  transformIndexHtml(html) {
    if (process.env.NODE_ENV === "production") return html;

    // Add script to initialize Context7 and keyboard shortcuts
    return html.replace(
      "</head>",
      `<script>
        // Initialize Context7 keyboard shortcuts directly
        document.addEventListener("keydown", function(e) {
          // Alt+7 shortcut
          if (e.altKey && (e.key === "7" || e.keyCode === 55 || e.which === 55 || 
                         (e.key === "Numpad7" || e.keyCode === 103))) {
            e.preventDefault();
            console.log("Alt+7 pressed!");
            window.dispatchEvent(new CustomEvent("c7:toggle-panel"));
          }
        });
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
      sourcemap: isDev,
      minify: !isDev,
    },
  };
});
