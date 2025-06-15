# Clean for Client Script

The `clean-for-client.sh` script is a utility that prepares the codebase for client viewing by removing development artifacts, AI tool traces, and developer-specific code.

## Overview

This script is automatically called by the `git-clientview.sh` script when updating the client repository, but it can also be run manually if needed.

## What It Removes

The script removes the following items from the codebase:

1. **Development Tools**

   - Context7 integration files and references
   - Developer panel components
   - Development utility functions

2. **AI and Developer Artifacts**

   - `.cursor` directory and files
   - `context7.json` files
   - Claude markers and Cursor artifacts
   - Developer comments (TODO, FIXME, NOTE, DEV)
   - AI prompt comments

3. **Configuration Files**

   - `.env` files
   - `.vscode` directory
   - Hidden files (except `.gitignore`)
   - `TODO.md`

4. **Development Code**

   - Code blocks inside `import.meta.env.DEV` conditionals
   - DeveloperPanel component references
   - Context7 initialization code
   - Developer-specific imports

5. **Package Configuration**
   - Removes Context7 from dependencies in `package.json`
   - Removes postinstall scripts for developer tools
   - Cleans up Vite configuration

## Usage

The script can be run directly from the root of the project:

```bash
./clean-for-client.sh
```

However, it's typically run automatically as part of the `git-clientview` workflow.

## Important Notes

1. This script makes permanent changes to the files in the current directory
2. It should be run on a dedicated branch (typically `client-view`)
3. Always commit your changes before running this script manually
4. The script is designed to be idempotent (can be run multiple times)

## Implementation Details

The script uses standard Unix tools like `find`, `sed`, and `rm` to:

1. Find and remove specific files and directories
2. Remove specific lines from files matching patterns
3. Clean up configuration files
4. Remove development-only code blocks

## Customization

If you need to add additional cleaning steps:

1. Open the script in a text editor
2. Add your custom cleaning commands
3. Test on a branch before using in production

## Troubleshooting

If you encounter issues after running the script:

1. Check for syntax errors in modified files
2. Look for incomplete removals of code blocks
3. Check for missing dependencies that were removed
4. Verify that imports for removed files have been cleaned up

## See Also

- [Git Clientview Script](../git-clientview.sh) - The script that calls clean-for-client.sh
- [Git Alias Setup](git-alias-setup.md) - How to set up git aliases for client repository updates
