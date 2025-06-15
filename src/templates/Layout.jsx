import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import NavBar from "../organisms/NavBar";

/**
 * Main application layout that serves as the root layout for the entire app
 * Contains the page structure, navigation, and footer
 * Also includes the DeveloperPanel in development mode only
 */

// In development mode, we'll dynamically import the DeveloperPanel
// This approach avoids issues with React.lazy
const DeveloperPanel = import.meta.env.DEV
  ? lazy(() => import("../components/dev/DeveloperPanel"))
  : () => null;

// No need for propTypes since we're using Outlet instead of children

/**
 * Layout component that wraps the entire application
 * Provides consistent structure with navigation and footer
 */
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Render the DeveloperPanel only in development mode */}
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <DeveloperPanel />
        </Suspense>
      )}
    </div>
  );
}
