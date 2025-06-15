# Commit From Document

A tool to generate structured, conventional Git commit messages from your markdown documentation files.

## Quick Links

- [Script](./commit-from-doc.sh) - The executable bash script
- [Documentation](./commit-from-doc.md) - Full documentation

## Overview

This tool streamlines your Git workflow by automatically extracting meaningful commit information from your existing documentation, ensuring consistent and informative commit history. It follows the conventional commits format and helps maintain a professional Git log.

## Quick Start

```bash
# Make the script executable (if needed)
chmod +x commit-from-doc.sh

# Basic usage - select from recent markdown files
./commit-from-doc.sh

# Use with a specific file
./commit-from-doc.sh path/to/document.md
```

## Features

- **Smart document analysis** - Extracts key information from markdown files including titles, bullet points, and summaries
- **Interactive selection** - Helps you choose from recently modified documentation files
- **Conventional commits format** - Creates commits following the `type(scope): title` convention with bullet point details
- **Intelligent scope detection** - Suggests commit scopes based on file paths
- **Git integration** - Handles the entire commit process including staging files and pushing changes
- **Editor support** - Allows manual editing of generated commit messages before committing

See the [full documentation](./commit-from-doc.md) for more details on features, options, and examples.
