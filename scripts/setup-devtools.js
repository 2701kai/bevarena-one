#!/usr/bin/env node

/**
 * Developer Tools Setup Script
 *
 * This script runs automatically after npm install to set up development
 * tools and Context7 integration. It is not included in production builds.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

// Only run in development mode
const isDev = process.env.NODE_ENV !== "production";

async function setupDevTools() {
  if (!isDev) {
    console.log("Skipping dev tools setup in production environment");
    return;
  }

  try {
    console.log("🛠️  Setting up developer tools...");

    // Create developer utility directories if they don't exist
    const devUtilsDir = path.join(rootDir, "src", "utils", "devtools");
    if (!fs.existsSync(devUtilsDir)) {
      fs.mkdirSync(devUtilsDir, { recursive: true });
      console.log("📁 Created developer utilities directory");
    }

    // Create or update helper file
    const helperPath = path.join(devUtilsDir, "c7-helper.js");
    if (!fs.existsSync(helperPath)) {
      const helperContent = `/**
 * Developer Context7 Helper
 *
 * This utility file provides helper functions for developers to use Context7
 * without directly importing it in components.
 *
 * WARNING: This file should only be imported in developer-specific code.
 * Any imports of this file will be automatically stripped from client builds.
 */

/**
 * Get help for a specific library
 * This function will use the globally initialized Context7 (window.__C7)
 */
export async function getLibraryHelp(libraryName) {
  // Check if Context7 is globally available
  if (window.__C7 && typeof window.__C7.getLibraryHelp === "function") {
    return window.__C7.getLibraryHelp(libraryName);
  }

  // Fall back to event-based approach
  return new Promise((resolve) => {
    const event = new CustomEvent("c7:get-help", {
      detail: {
        libraryName,
        callback: (result) => resolve(result),
      },
    });
    document.dispatchEvent(event);
  });
}

/**
 * Request documentation for a component
 * Use this in your component development to get relevant code examples
 */
export function useComponentHelp(componentName) {
  // This function can be used as a hook in components
  return {
    getExamples: async () => getLibraryHelp(componentName),
    getRelated: async (category) =>
      getLibraryHelp(\`\${componentName}/\${category}\`),
  };
}

// Developer tools - these won't appear in production
export const devTools = {
  // Check if Context7 is available
  isAvailable: () => Boolean(window.__C7),

  // Log Context7 status to console
  checkStatus: () => {
    if (window.__C7) {
      console.log("✅ Context7 is available for development");
    } else {
      console.warn("❌ Context7 is not available");
    }
  },
};
`;
      fs.writeFileSync(helperPath, helperContent);
      console.log("📝 Created Context7 helper utility");
    }

    // Create dev-notes directory for documentation
    const devNotesDir = path.join(rootDir, "dev-notes");
    if (!fs.existsSync(devNotesDir)) {
      fs.mkdirSync(devNotesDir, { recursive: true });

      // Create documentation file
      const docsPath = path.join(devNotesDir, "context7-usage.md");
      const docsContent = `# Context7 Usage Guide for Developers

## Overview

Context7 is automatically integrated into all BevArena projects as a development tool. It provides AI-powered assistance for coding, documentation lookups, and more. This integration is completely hidden from clients, as all Context7-related code is automatically removed during the client-view build process.

## How to Use Context7

### Method 1: Browser Console (Quickest)

Context7 is automatically initialized and available in the browser console as \`window.__C7\`. You can use it directly:

\`\`\`js
// Get help for a specific library
window.__C7.getLibraryHelp("react").then((docs) => console.log(docs));
\`\`\`

### Method 2: Component Helpers (Recommended)

For more structured integration in your development workflow, import the helper utilities:

\`\`\`jsx
import { useComponentHelp, devTools } from "../utils/devtools/c7-helper";

function MyComponent() {
  // Check if Context7 is available in development
  React.useEffect(() => {
    devTools.checkStatus();
  }, []);

  // Get component examples when needed
  const handleGetHelp = async () => {
    const helper = useComponentHelp("Button");
    const examples = await helper.getExamples();
    console.log(examples);
  };

  return (
    <div>
      {/* Your component code */}
      <button onClick={handleGetHelp}>Get Help</button>
    </div>
  );
}
\`\`\`

### Method 3: Custom Events (Advanced)

You can trigger Context7 lookups via custom events:

\`\`\`js
document.dispatchEvent(
  new CustomEvent("c7:get-help", {
    detail: {
      libraryName: "react-router",
      callback: (result) => console.log(result),
    },
  })
);
\`\`\`

## Invisible to Clients

All Context7 integration is completely hidden from clients:

1. \`clean-for-client.sh\` automatically removes all Context7 references
2. The code is only loaded in development mode
3. No visible UI components reveal the integration
4. All imports are dynamically loaded to prevent inclusion in production builds

## Important Guidelines

1. **NEVER** add visible Context7 UI components or references in your application
2. **ALWAYS** use the developer utilities instead of direct imports
`;
      fs.writeFileSync(docsPath, docsContent);
      console.log("📚 Created developer documentation");
    }

    console.log("✅ Developer tools setup complete!");
  } catch (error) {
    console.error("❌ Error setting up developer tools:", error);
  }
}

// Run the setup
setupDevTools();
