import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import NavBar from "../organisms/NavBar";

/**
 * Main application layout that serves as the root layout for the entire app
 * Contains the page structure, navigation, and footer
 * Also includes the DeveloperPanel in development mode only
 */

// Import the DeveloperPanel only in development mode
// This import will be automatically removed in production builds

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <NavBar />

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-full md:w-2/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Suchbegriff eingeben ..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />

      {/* Render the DeveloperPanel in development mode only */}
        <React.Suspense fallback={null}>
          <DeveloperPanel />
        </React.Suspense>
      )}
    </div>
  );
}

// No need for propTypes since we're using Outlet instead of children
