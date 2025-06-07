/**
 * Developer Context7 Helper
 *
 * This utility file provides helper functions for developers to use Context7
 * without directly importing it in components.
 *
 * WARNING: This file should only be imported in developer-specific code.
 * Any imports of this file will be automatically stripped from client builds
 * by the clean-for-client.sh script.
 */

import { useEffect, useState } from "react";

/**
 * Generate a unique ID for event tracking
 */
const generateRequestId = () =>
  `kai-request-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Get help for a specific library
 * @param {string} libraryName - The name of the library to get help for
 * @param {object} options - Optional parameters
 * @returns {Promise<object>} - The library documentation
 */
export async function getLibraryHelp(libraryName, options = {}) {
  // Check if Context7 is globally available
  if (window.__C7 && typeof window.__C7.getLibraryHelp === "function") {
    return window.__C7.getLibraryHelp(libraryName, options);
  }

  // Fall back to event-based communication
  return new Promise((resolve, reject) => {
    const requestId = generateRequestId();
    const { C7_REQUEST, C7_RESPONSE } = window.__C7?.events || {
      C7_REQUEST: "c7:request",
      C7_RESPONSE: "c7:response",
    };

    // Set up one-time listener for the response
    const handleResponse = (event) => {
      if (event.detail.id === requestId) {
        window.removeEventListener(C7_RESPONSE, handleResponse);
        if (event.detail.error) {
          reject(new Error(event.detail.error));
        } else {
          resolve(event.detail.result);
        }
      }
    };

    window.addEventListener(C7_RESPONSE, handleResponse);

    // Dispatch request event
    window.dispatchEvent(
      new CustomEvent(C7_REQUEST, {
        detail: {
          id: requestId,
          method: "getLibraryHelp",
          params: [libraryName, options],
        },
      })
    );

    // Set a timeout in case the response never comes
    setTimeout(() => {
      window.removeEventListener(C7_RESPONSE, handleResponse);
      reject(new Error("Context7 request timed out"));
    }, 5000);
  });
}

/**
 * Search documentation
 * @param {string} query - The search query
 * @param {object} options - Optional parameters
 * @returns {Promise<object>} - The search results
 */
export async function searchDocs(query, options = {}) {
  if (window.__C7 && typeof window.__C7.searchDocs === "function") {
    return window.__C7.searchDocs(query, options);
  }

  // Similar event-based fallback as getLibraryHelp
  // Implementation omitted for brevity, follows same pattern
  console.warn("Context7 searchDocs not available");
  return { results: [], isMock: true };
}

/**
 * React hook to check if Context7 is available
 * @returns {boolean} - Whether Context7 is available
 */
export function useContext7Available() {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const checkAvailability = () => {
      const available =
        window.__C7 && typeof window.__C7.isAvailable === "function"
          ? window.__C7.isAvailable()
          : false;
      setIsAvailable(available);
    };

    // Check immediately
    checkAvailability();

    // Set up listener for when Context7 becomes available
    const handleAvailable = () => checkAvailability();
    window.addEventListener("c7:available", handleAvailable);

    return () => {
      window.removeEventListener("c7:available", handleAvailable);
    };
  }, []);

  return isAvailable;
}

/**
 * Convenience exports for developers
 */
export const kaiTools = {
  getLibraryHelp,
  searchDocs,
  useContext7Available,
  togglePanel: () => window.dispatchEvent(new CustomEvent("c7:toggle-panel")),
  isAvailable: () => window.__C7?.isAvailable?.() || false,
  isMock: () => window.__C7?.isMock || true,
};
