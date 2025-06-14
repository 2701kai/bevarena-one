#!/bin/bash

#######################################
# clean-for-client.sh - Removes development artifacts and AI tool traces from code
#
# This script is automatically called by git-clientview.sh but can also be run
# manually to prepare a clean version of the codebase for client viewing.
#
# Author: BevArena Team
# Version: 1.0.1
# Tested on: Ubuntu 25.10
#
# Usage: ./clean-for-client.sh
#
# Dependencies:
#   - find
#   - sed
#   - grep
#   - rm
#######################################

# Exit immediately if a command exits with a non-zero status
set -e

# Define text colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧹 Cleaning repository for client viewing...${NC}"

#######################################
# Remove development directories
#######################################

# Remove .cursor directory and files
if [ -d ".cursor" ]; then
    echo -e "${BLUE}- Removing .cursor directory${NC}"
    rm -rf .cursor
fi

# Remove dev-notes directory
if [ -d "dev-notes" ]; then
    echo -e "${BLUE}- Removing dev-notes directory${NC}"
    rm -rf dev-notes
fi

#######################################
# Remove Context7 files and references
#######################################

# Remove any context7.json files
find . -name "context7.json" -type f -delete
echo -e "${BLUE}- Removed context7.json files${NC}"

# Remove Context7 files and references
find . -path "*/utils/devtools/*" -type f -delete
find . -path "*/scripts/setup-devtools.js" -type f -delete
find . -path "*/components/dev/*" -type f -delete
rm -f src/context/context7.js 2>/dev/null || true
echo -e "${BLUE}- Removed Context7 files and developer tools${NC}"

#######################################
# Clean code files
#######################################

# Process files with specific extensions to remove development artifacts
find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.html" \) | while read file; do
    # Skip node_modules
    if [[ $file == *"node_modules"* ]]; then
        continue
    fi

    # Skip dev-notes directory
    if [[ $file == *"dev-notes"* ]]; then
        continue
    fi

    # Remove AI prompts, cursor comments, and developer notes
    sed -i '/\/\/ </d' "$file"
    sed -i '/\/\/ <\/antml:/d' "$file"
    sed -i '/\/\/ claude:/d' "$file"
    sed -i '/\/\/ CURSOR:/d' "$file"
    sed -i '/\/\/ TODO:/d' "$file"
    sed -i '/\/\/ NOTE:/d' "$file"
    sed -i '/\/\/ FIXME:/d' "$file"
    sed -i '/\/\/ DEV:/d' "$file"

    # Remove multi-line Claude and Cursor comments
    sed -i '/\/\* </,/\*\//d' "$file"
    sed -i '/\/\* CURSOR:/,/\*\//d' "$file"

    # Remove Context7 related code
    sed -i '/import.*from.*context7/d' "$file"
    sed -i '/import.*from.*\/utils\/devtools/d' "$file"
    sed -i '/import.*from.*\/components\/dev/d' "$file"
    sed -i 's/window.__C7/window.__REMOVED/g' "$file"
    sed -i 's/window.__context7/window.__REMOVED/g' "$file"
    sed -i 's/console.debug("Development tools initialized")/\/\/ Development code removed/g' "$file"
    sed -i 's/console.debug("\[DEV\].*")/\/\/ Development code removed/g' "$file"
    sed -i '/const kaiTools =/,/: null;/d' "$file"
    sed -i '/\/\/ DEV ONLY:/d' "$file"

    # Remove import.meta.env.DEV conditional blocks
    sed -i '/if (import.meta.env.DEV)/,/^}/d' "$file"
    sed -i '/import.meta.env.DEV &&/d' "$file"
    sed -i '/const DeveloperPanel = import.meta.env.DEV/,/: () => null;/d' "$file"

    # Remove DeveloperPanel references in JSX - Fix regex escaping
    sed -i '/{\/\* Render the DeveloperPanel/,/})/d' "$file"
    sed -i '/<React.Suspense.*DeveloperPanel/,/<\/React.Suspense>/d' "$file"
    sed -i '/{import.meta.env.DEV && <DevPanelWrapper \/>/d' "$file"

    # Remove the entire Context7 initialization block from main.jsx
    if [[ $file == *"main.jsx" ]]; then
        sed -i '/\/\/ Silently initialize developer tools/,/^}/d' "$file"
    fi

    # Clean DevPanelWrapper function from Layout.jsx
    if [[ $file == *"Layout.jsx" ]]; then
        sed -i '/function DevPanelWrapper/,/^}/d' "$file"
    fi
done

#######################################
# Remove configuration files
#######################################

# Remove hidden files
find . -type f -name ".*" | grep -v ".gitignore" | xargs rm -f 2>/dev/null || true
echo -e "${BLUE}- Removed hidden files (except .gitignore)${NC}"

# Remove specific development files
rm -f .env* 2>/dev/null || true
rm -f TODO.md 2>/dev/null || true
rm -rf .vscode 2>/dev/null || true
echo -e "${BLUE}- Removed development configuration files${NC}"

#######################################
# Clean configuration files
#######################################

# Update vite.config.js
if [ -f "vite.config.js" ]; then
    echo -e "${BLUE}- Cleaning vite.config.js${NC}"
    # Remove the Context7 plugin declaration
    sed -i '/\/\/ Create a Context7 plugin/,/^};/d' "vite.config.js"
    # Remove the plugin from the plugins array
    sed -i 's/context7Plugin,\?//' "vite.config.js"
    sed -i 's/devToolsPlugin,\?//' "vite.config.js"
    # Remove imports for fs and path (only used by the Context7 plugin)
    sed -i '/import fs from "fs";/d' "vite.config.js"
    sed -i '/import path from "path";/d' "vite.config.js"
    # Remove transformIndexHtml function that adds setup-devtools.js
    sed -i '/transformIndexHtml: /,/},/d' "vite.config.js"
    # Remove optimizeDeps section that includes setup-devtools.js
    sed -i '/optimizeDeps: {/,/},/d' "vite.config.js"
    # Clean up trailing commas
    sed -i 's/,\s*\]/]/' "vite.config.js"
fi

# Clean up package.json
if [ -f "package.json" ]; then
    echo -e "${BLUE}- Cleaning package.json${NC}"
    # Remove the postinstall script
    sed -i '/"postinstall": "node scripts\/setup-devtools.js",\?/d' "package.json"
    # Remove Context7 from dependencies
    sed -i '/"@upstash\/context7-mcp": .*,\?/d' "package.json"
    sed -i '/"context7": .*,\?/d' "package.json"
    # Clean up trailing commas
    sed -i 's/,\s*\}/}/' "package.json"
fi

echo -e "${GREEN}✨ Repository cleaned for client viewing!${NC}"
