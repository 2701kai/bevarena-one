import React, { useEffect, useState } from "react";

/**
 * DeveloperPanel component
 * This component is only used in development mode and provides
 * access to development tools and Context7 functionality.
 */
const DeveloperPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [c7Available, setC7Available] = useState(false);

  useEffect(() => {
    // Check if Context7 is available
    const checkC7 = () => {
      if (window.__C7 && typeof window.__C7.isAvailable === "function") {
        setC7Available(window.__C7.isAvailable());
      }
    };

    // Check immediately
    checkC7();

    // Listen for Context7 availability
    const handleC7Available = () => {
      setC7Available(true);
    };

    // Listen for panel toggle events
    const handleTogglePanel = () => {
      setIsVisible((prev) => !prev);
    };

    window.addEventListener("c7:available", handleC7Available);
    window.addEventListener("c7:toggle-panel", handleTogglePanel);

    // Keyboard shortcut: Ctrl+Shift+D to toggle panel
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyD") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("c7:available", handleC7Available);
      window.removeEventListener("c7:toggle-panel", handleTogglePanel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
          title="Open Developer Panel (Ctrl+Shift+D)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-96 h-80 bg-gray-800 text-white shadow-lg rounded-tl-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-2 bg-gray-700 rounded-tl-lg">
        <h3 className="font-medium">Developer Panel</h3>
        <div className="flex space-x-2">
          <span
            className={`inline-block w-3 h-3 rounded-full ${c7Available ? "bg-green-500" : "bg-red-500"}`}
            title={
              c7Available ? "Context7 Available" : "Context7 Not Available"
            }
          ></span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 text-sm">
        <div className="mb-4">
          <h4 className="font-medium mb-2">Context7 Tools</h4>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() =>
                window.__C7
                  ?.getLibraryHelp("react")
                  .then((docs) => console.log("React Docs:", docs))
              }
              disabled={!c7Available}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get React Docs
            </button>
            <button
              onClick={() =>
                window.__C7
                  ?.getLibraryHelp("tailwindcss")
                  .then((docs) => console.log("Tailwind Docs:", docs))
              }
              disabled={!c7Available}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Tailwind Docs
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Development Info</h4>
          <div className="bg-gray-700 p-2 rounded">
            <p>Mode: {import.meta.env.MODE}</p>
            <p>Dev: {import.meta.env.DEV ? "Yes" : "No"}</p>
            <p>Context7: {c7Available ? "Available" : "Not Available"}</p>
          </div>
        </div>
      </div>

      <div className="p-2 bg-gray-700 text-xs text-gray-400">
        Press Ctrl+Shift+D to toggle this panel
      </div>
    </div>
  );
};

export default DeveloperPanel;
