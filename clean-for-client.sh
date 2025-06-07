#!/bin/bash

# clean-for-client.sh - Removes AI tool traces and development artifacts from code
# This script is automatically called by git-clientview.sh

echo "🧹 Cleaning repository for client viewing..."

# Remove .cursor directory and files
if [ -d ".cursor" ]; then
    echo "- Removing .cursor directory"
    rm -rf .cursor
fi

# Remove any context7.json files
find . -name "context7.json" -type f -delete
echo "- Removed context7.json files"

# Remove Claude markers and Cursor artifacts
find . -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.html" | while read file; do
    # Skip node_modules
    if [[ $file == *"node_modules"* ]]; then
        continue
    fi

    # Remove AI prompts, cursor comments, and developer notes
    sed -i '/\/\/ claude:/d' "$file"
    sed -i '/\/\/ cursor:/d' "$file"
    sed -i '/\/\/ AI:/d' "$file"
    sed -i '/\/\/ DEV:/d' "$file"
    sed -i '/\/\/ TODO:/d' "$file"
    sed -i '/\/\/ FIXME:/d' "$file"
    sed -i '/\/\*\* @cursor-*/d' "$file"
    sed -i '/\/\/ @cursor-*/d' "$file"
    sed -i '/\/\/ @claude-*/d' "$file"

    # Remove multi-line AI tool comments
    sed -i '/\/\* claude:/,/\*\//d' "$file"
    sed -i '/\/\* cursor:/,/\*\//d' "$file"
    sed -i '/\/\* AI:/,/\*\//d' "$file"
    sed -i '/\/\* DEV NOTE:/,/\*\//d' "$file"
done

# Clean README.md - Remove development-specific sections
if [ -f "README.md" ]; then
    # Remove sections about AI assistance
    sed -i '/## AI Assistance/,/^## /d' "README.md"
    sed -i '/## Development Notes/,/^## /d' "README.md"
    sed -i '/## TODO/,/^## /d' "README.md"
    sed -i '/## Developer Setup/,/^## /d' "README.md"

    # Remove lines with AI mentions
    sed -i '/AI:/d' "README.md"
    sed -i '/Claude:/d' "README.md"
    sed -i '/Cursor:/d' "README.md"

    echo "- Cleaned README.md"
fi

# Remove development-only files and directories
DIRS_TO_REMOVE=(
    ".cursor"
    ".github/workflows/dev"
    "doc/dev-notes"
)

FILES_TO_REMOVE=(
    ".dev-config"
    "dev-setup.md"
    "TODO.md"
    "CONTRIBUTING.md"
)

for dir in "${DIRS_TO_REMOVE[@]}"; do
    if [ -d "$dir" ]; then
        rm -rf "$dir"
    fi
done

for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        rm -f "$file"
    fi
done

echo "✅ Repository cleaned successfully for client viewing!"
