/**
 * Context7 Developer Tools Setup
 * This file is automatically removed from production builds by clean-for-client.sh
 */

// Initialize Context7 if available
if (typeof window !== "undefined") {
  // Create a global access point for Context7
  window.__context7 = window.__context7 || {
    isAvailable: () => typeof window.__C7 !== "undefined",

    // Get library documentation
    getLibraryHelp: async (libraryName) => {
      if (!window.__C7) {
        console.warn("Context7 not available");
        return { error: "Context7 not available" };
      }

      try {
        // Call Context7 API to get library documentation
        return await window.__C7.getLibraryDocs(libraryName);
      } catch (error) {
        console.error("Error getting library help:", error);
        return { error: `Failed to get help for ${libraryName}` };
      }
    },

    // Toggle the Context7 panel
    togglePanel: () => {
      if (window.__C7 && typeof window.__C7.togglePanel === "function") {
        window.__C7.togglePanel();
      } else {
        // Fallback to dispatching a custom event
        window.dispatchEvent(new CustomEvent("c7:toggle-panel"));
      }
    },
  };

  // Log that developer tools are initialized
  console.debug("[DEV] Context7 integration initialized");

  // Add keyboard shortcuts for global access
  document.addEventListener("keydown", (e) => {
    // Alt+7 shortcut to toggle Context7 panel (using both key and keyCode for compatibility)
    if (e.altKey && (e.key === "7" || e.keyCode === 55 || e.which === 55)) {
      e.preventDefault();
      // Dispatch the custom event instead of directly calling togglePanel
      // This ensures the DeveloperPanel component handles the toggle
      window.dispatchEvent(new CustomEvent("c7:toggle-panel"));
    }
  });
}
