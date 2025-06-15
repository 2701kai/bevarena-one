/**
 * Context7 integration helper
 * This file provides utility functions for working with Context7
 * in development mode.
 *
 * This file is automatically removed from production builds
 * by the clean-for-client.sh script.
 */

// Access the Context7 API safely
const getContext7 = () => {
  // Check if Context7 is available in global scope
  if (typeof window !== "undefined" && window.__context7) {
    return window.__context7;
  }

  // Return a mock implementation if Context7 is not available
  return {
    isAvailable: () => false,
    getLibraryHelp: async () => ({ error: "Context7 not available" }),
    togglePanel: () => console.warn("Context7 not available"),
  };
};

// Export a hook to check if Context7 is available
export const useContext7Available = () => {
  const c7 = getContext7();
  return c7.isAvailable ? c7.isAvailable() : false;
};

// Get library documentation
export const getLibraryHelp = async (libraryName) => {
  const c7 = getContext7();

  if (!c7.getLibraryHelp) {
    console.warn("Context7 getLibraryHelp not available");
    return { error: "Context7 getLibraryHelp not available" };
  }

  try {
    return await c7.getLibraryHelp(libraryName);
  } catch (error) {
    console.error("Error getting library help:", error);
    return { error: `Failed to get help for ${libraryName}` };
  }
};

// Toggle the Context7 panel
export const togglePanel = () => {
  const c7 = getContext7();

  if (c7.togglePanel) {
    c7.togglePanel();
  } else {
    // Fallback to dispatching a custom event
    const event = new CustomEvent("c7:toggle-panel");
    window.dispatchEvent(event);
  }
};

// Export the Context7 API
export const kaiTools = {
  isAvailable: () => {
    const c7 = getContext7();
    return c7.isAvailable ? c7.isAvailable() : false;
  },
  getLibraryHelp,
  togglePanel,
};
