/**
 * Developer Keyboard Shortcuts
 * This script adds keyboard shortcuts for development tools
 */

(function () {
  console.log("[DEV] Initializing developer keyboard shortcuts");

  // Function to toggle developer panel
  function toggleDevPanel() {
    console.log("[DEV] Toggling developer panel");
    window.dispatchEvent(new CustomEvent("c7:toggle-panel"));
  }

  // Add keyboard event listeners
  document.addEventListener("keydown", function (e) {
    // Alt+7 shortcut (including numpad)
    if (
      e.altKey &&
      (e.key === "7" ||
        e.keyCode === 55 ||
        e.which === 55 ||
        e.key === "Numpad7" ||
        e.keyCode === 103)
    ) {
      e.preventDefault();
      console.log("[DEV] Alt+7 shortcut detected");
      toggleDevPanel();
    }
  });

  console.log("[DEV] Keyboard shortcuts initialized (Alt+7)");
})();
