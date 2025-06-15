import React, { useEffect, useRef, useState } from "react";
import {
  getLibraryHelp,
  useContext7Available,
} from "../../utils/devtools/kai-helper";

/**
 * DeveloperPanel - For development use only, this component is automatically
 * removed from production builds by clean-for-client.sh
 *
 * This component demonstrates how to use Context7 in a component
 * without importing it directly.
 */
const DeveloperPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [library, setLibrary] = useState("react");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const panelRef = useRef(null);

  // Check if Context7 is available
  const c7Available = useContext7Available();

  // Update isAvailable when Context7 status changes
  useEffect(() => {
    setIsAvailable(c7Available);
  }, [c7Available]);

  // Add keyboard shortcut (Ctrl+Shift+D) to toggle panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Use Ctrl+Shift+D as a more common shortcut
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
      // Also support Alt+7 for quick access
      if (e.altKey && e.key === "7") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    // Add custom event listener for toggling the panel
    const handleTogglePanel = () => setIsVisible((prev) => !prev);
    window.addEventListener("c7:toggle-panel", handleTogglePanel);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("c7:toggle-panel", handleTogglePanel);
    };
  }, []);

  // Handle click outside to close panel
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  // Handle library search
  const handleGetHelp = async () => {
    if (!library.trim()) return;

    setIsLoading(true);
    try {
      const result = await getLibraryHelp(library);
      setResults(result);
    } catch (error) {
      console.error("Error getting library help:", error);
      setResults({ error: "Failed to get library help" });
    } finally {
      setIsLoading(false);
    }
  };

  // Hide completely if not toggled on
  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 w-96 max-h-96 overflow-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Developer Tools</h3>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded ${isAvailable ? "bg-green-600" : "bg-amber-600"}`}
          >
            {isAvailable ? "Connected" : "Mock Mode"}
          </span>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsVisible(false)}
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={library}
          onChange={(e) => setLibrary(e.target.value)}
          placeholder="Library name"
          className="flex-1 px-3 py-2 text-black rounded"
        />
        <button
          onClick={handleGetHelp}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "..." : "Get Help"}
        </button>
      </div>

      {results && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Results:</h4>
          <pre className="bg-gray-900 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        <div>Shortcuts:</div>
        <div>
          • Press <span className="font-mono">Ctrl+Shift+D</span> to toggle this
          panel
        </div>
        <div>
          • Press <span className="font-mono">Alt+7</span> for quick access
        </div>
      </div>
    </div>
  );
};

export default DeveloperPanel;
