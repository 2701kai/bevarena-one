import React, { useEffect, useState } from "react";
import { togglePanel, useContext7Available } from "../../context/context7";

/**
 * DeveloperPanel component
 * Provides a panel for developer tools and Context7 integration
 * This component is only included in development builds
 */
const DeveloperPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const context7Available = useContext7Available();

  useEffect(() => {
    // Toggle panel visibility
    const handleTogglePanel = () => {
      setIsVisible((prev) => !prev);

      // If Context7 is available, toggle its panel too
      if (context7Available) {
        togglePanel();
      }
    };

    // Listen for custom toggle event
    window.addEventListener("c7:toggle-panel", handleTogglePanel);

    // Keyboard shortcut: Alt+D or Alt+7 to toggle panel
    const handleKeyDown = (e) => {
      // Alt+D shortcut
      if (e.altKey && (e.key === "d" || e.key === "D" || e.keyCode === 68)) {
        e.preventDefault();
        handleTogglePanel();
      }

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
        handleTogglePanel();
      }
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);

    // Log that the panel is ready
    console.debug(
      "[DEV] Developer panel initialized. Press Alt+D or Alt+7 to toggle."
    );

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("c7:toggle-panel", handleTogglePanel);
    };
  }, [context7Available]);

  // Don't render anything if not visible
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 h-96 bg-gray-900 text-white z-50 shadow-lg overflow-auto">
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <h3 className="text-sm font-semibold">Developer Tools</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => togglePanel()}
            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded"
            title="Toggle Context7 Panel"
          >
            Context7
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded"
            title="Close Panel"
          >
            Close
          </button>
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-bold mb-2">Developer Panel</h4>

        <div className="mb-4">
          <h5 className="text-sm font-semibold mb-1">Keyboard Shortcuts:</h5>
          <ul className="text-xs space-y-1">
            <li>
              <span className="bg-gray-700 px-1 rounded">Alt+D</span> - Toggle
              this panel
            </li>
            <li>
              <span className="bg-gray-700 px-1 rounded">Alt+7</span> - Toggle
              this panel
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h5 className="text-sm font-semibold mb-1">Context7 Status:</h5>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${context7Available ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-xs">
              {context7Available ? "Available" : "Not Available"}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            This panel is only available in development mode and will be removed
            in production builds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPanel;
