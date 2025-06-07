/**
 * Context7 Mock Client
 *
 * This provides a basic implementation that mimics the Context7 API
 * but doesn't require the actual library. It's used as a fallback
 * in development mode when the real Context7 library isn't available.
 *
 * In production, this file is completely removed by clean-for-client.sh.
 */

// Mock Context7 client that works without the actual library
const context7Client = {
  // Resolve a library name to an ID
  resolveLibraryId: async (libraryName) => {
    console.log(`[DEV] Resolving library: ${libraryName}`);
    return {
      libraryId: `/mock/${libraryName}`,
      name: libraryName,
      description: `Development mock for ${libraryName}`,
      snippetCount: 10,
      trustScore: 8.5,
    };
  },

  // Get library documentation
  getLibraryDocs: async (libraryId, options = {}) => {
    console.log(`[DEV] Getting docs for: ${libraryId}`, options);

    // Split library ID to get the library name
    const libraryName = libraryId.split("/").pop();

    // Return mock documentation
    return {
      snippets: [
        {
          title: `Using ${libraryName}`,
          language: "javascript",
          code: `// This is a mock example for ${libraryName}
import { useState } from "${libraryName}";

function Example() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + 1)}>
        Increment
      </button>
    </div>
  );
}`,
          description: `Basic ${libraryName} example`,
        },
        {
          title: `Advanced ${libraryName}`,
          language: "javascript",
          code: `// Advanced mock example for ${libraryName}
import { useEffect } from "${libraryName}";

function AdvancedExample() {
  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounted");
  }, []);
  
  return <div>Advanced Example</div>;
}`,
          description: `Advanced ${libraryName} usage`,
        },
      ],
    };
  },
};

// Add more convenient methods
context7Client.getLibraryHelp = async (libraryName) => {
  try {
    const libraryId = await context7Client.resolveLibraryId(libraryName);
    const docs = await context7Client.getLibraryDocs(libraryId.libraryId);
    return docs;
  } catch (error) {
    console.error("[DEV] Failed to get library help:", error);
    return null;
  }
};

export default context7Client;
