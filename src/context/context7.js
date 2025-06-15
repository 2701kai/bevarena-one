/**
 * Context7 Integration
 * Provides keyboard shortcuts and integration with Context7 developer tools
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

  // Setup keyboard shortcuts
  const setupKeyboardShortcuts = () => {
    document.addEventListener("keydown", (e) => {
      // Alt+D shortcut to toggle Context7 panel
      if (e.altKey && (e.key === "d" || e.key === "D" || e.keyCode === 68)) {
        e.preventDefault();
        window.__context7.togglePanel();
      }

      // Alt+Numpad7 shortcut to toggle Context7 panel
      if (
        e.altKey &&
        (e.key === "7" ||
          e.keyCode === 55 ||
          e.which === 55 ||
          e.key === "Numpad7" ||
          e.keyCode === 103)
      ) {
        e.preventDefault();
        window.__context7.togglePanel();
      }
    });

    console.debug(
      "[DEV] Context7 keyboard shortcuts initialized (Alt+D, Alt+7)"
    );
  };

  // Initialize keyboard shortcuts
  setupKeyboardShortcuts();
}

// Export functions for use in components
export const useContext7Available = () => {
  if (typeof window === "undefined") return false;
  return window.__context7?.isAvailable() || false;
};

export const getLibraryHelp = async (libraryName) => {
  if (typeof window === "undefined")
    return { error: "Not in browser environment" };
  return (
    window.__context7?.getLibraryHelp(libraryName) || {
      error: "Context7 not initialized",
    }
  );
};

export const togglePanel = () => {
  if (typeof window === "undefined") return;
  window.__context7?.togglePanel();
};

export default {
  useContext7Available,
  getLibraryHelp,
  togglePanel,
};
