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

# Remove dev-notes directory (already excluded by .gitignore, but double-check)
if [ -d "dev-notes" ]; then
    echo "- Ensuring dev-notes directory is excluded (via .gitignore)"
    if ! grep -q "dev-notes" .gitignore; then
        echo "dev-notes/" >>.gitignore
    fi
fi

# Remove Claude markers and Cursor artifacts
find . -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.html" | while read file; do
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
done

# Remove hidden files
find . -type f -name ".*" | grep -v ".gitignore" | xargs rm -f 2>/dev/null || true
echo "- Removed hidden files (except .gitignore)"

# Remove specific development files
rm -f .env* 2>/dev/null || true
rm -f TODO.md 2>/dev/null || true
rm -rf .vscode 2>/dev/null || true
echo "- Removed development configuration files"

echo "✨ Repository cleaned for client viewing!"
