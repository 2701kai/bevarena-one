/**
 * Context7 Initialization Module
 *
 * This module handles the silent initialization of Context7 for developer use.
 * It is dynamically imported only in development mode and does not appear
 * in the production bundle, ensuring clients never see Context7 references.
 *
 * DO NOT import this file directly in components - it is loaded automatically.
 */

// Import the mock Context7 client without exposing it
import context7Client from "../../context/context7";

// Initialize Context7
function initialize() {
  if (!import.meta.env.DEV) return null;

  try {
    // Set up custom event handlers
    const events = setupEventSystem();

    // Set up keyboard shortcut for toggling developer panel
    setupKeyboardShortcuts();

    // Attach to window for developer access via console
    window.__C7 = {
      ...context7Client,
      events,
      isAvailable: () => true,
      isMock: true,
      togglePanel: () =>
        window.dispatchEvent(new CustomEvent("c7:toggle-panel")),
    };

    // Dispatch event to notify that Context7 is available
    window.dispatchEvent(new CustomEvent("c7:available"));

    console.debug("[DEV] Context7 initialized successfully");

    return window.__C7;
  } catch (error) {
    console.error("[DEV] Failed to initialize Context7:", error);
    return null;
  }
}

// Set up custom event handlers for component communication
function setupEventSystem() {
  const C7_REQUEST = "c7:request";
  const C7_RESPONSE = "c7:response";

  // Set up event handler for the c7:get-help event
  document.addEventListener("c7:get-help", async (event) => {
    const { libraryName, callback } = event.detail;
    if (libraryName) {
      const help = await context7Client.getLibraryHelp(libraryName);
      if (typeof callback === "function") {
        callback(help);
      }
    }
  });

  // Handle "Use context7" alias (triggered by Alt+7)
  document.addEventListener("c7:use-context7", async (event) => {
    console.debug("[DEV] 'Use context7' command received");
    // Default behavior is to toggle the developer panel
    window.dispatchEvent(new CustomEvent("c7:toggle-panel"));
  });

  // Return events for reference
  return { C7_REQUEST, C7_RESPONSE };
}

// Set up keyboard shortcuts
function setupKeyboardShortcuts() {
  // Ctrl+Shift+Numpad8 to toggle the developer panel
  document.addEventListener("keydown", (event) => {
    // Toggle panel with Ctrl+Shift+Numpad8
    if (event.ctrlKey && event.shiftKey && event.code === "Numpad8") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("c7:toggle-panel"));
    }

    // Alt+7 to use Context7 (alias for "Use context7")
    if (event.altKey && event.key === "7") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("c7:use-context7"));
    }
  });
}

// Initialize when imported
const instance = initialize();

// Export the instance for direct imports in development code
export default instance;
