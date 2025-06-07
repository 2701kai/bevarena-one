import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Silently initialize developer tools only in development mode
// This code will be automatically stripped from production builds
if (import.meta.env.DEV) {
  try {
    // Dynamically import the Context7 initialization module
    import("./utils/devtools/c7-init.js")
      .then((module) => {
        console.debug("[DEV] Development tools initialized");

        // Setup global command for quick Context7 access
        window.useContext7 = (query) => {
          if (window.__C7) {
            if (query) {
              window.__C7
                .getLibraryHelp(query)
                .then((result) =>
                  console.log(`[Context7] Help for ${query}:`, result)
                )
                .catch((err) =>
                  console.error(
                    `[Context7] Error getting help for ${query}:`,
                    err
                  )
                );
            } else {
              // If no query provided, toggle panel
              window.__C7.togglePanel();
            }
          } else {
            console.warn(
              "[Context7] Not available yet. Try again in a moment."
            );
          }
        };
      })
      .catch((err) => {
        console.debug("[DEV] Development tools not available:", err);
      });
  } catch (err) {
    console.debug("[DEV] Development tools not available:", err);
  }
}

// Create an app wrapper with or without developer tools
const AppWithDevTools = () => {
  // App is always rendered, developer tools are only in development
  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithDevTools />
  </React.StrictMode>
);
