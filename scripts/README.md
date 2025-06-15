# BevArena Scripts

This directory contains utility scripts for the BevArena project.

## Available Scripts

### git-clientview.sh

The `git-clientview.sh` script automates the process of updating the client repository with a cleaned version of the development code.

**Location:** `/home/pazzo/Desktop/BEVARENA/git-clientview.sh`

**Usage:**

```bash
# Run directly
./git-clientview.sh "Optional commit message"

# Or via git alias (if set up)
git clientview "Optional commit message"
```

**Features:**

- Pushes development state to the dev repository
- Creates/switches to the client-view branch
- Merges changes from the main branch
- Runs the clean-for-client.sh script
- Commits and pushes the cleaned code to the client repository

For more information, see [Git Alias Setup](../doc/git-alias-setup.md).

### clean-for-client.sh

The `clean-for-client.sh` script prepares the codebase for client viewing by removing development artifacts, AI tool traces, and developer-specific code.

**Location:** `/home/pazzo/Desktop/BEVARENA/clean-for-client.sh`

**Usage:**

```bash
# Run directly (rarely needed, usually called by git-clientview)
./clean-for-client.sh
```

**What it removes:**

- Development tools (Context7, developer panel, etc.)
- AI and developer artifacts (.cursor, context7.json, etc.)
- Configuration files (.env, .vscode, etc.)
- Development code (import.meta.env.DEV blocks, etc.)
- Development dependencies from package.json

For more information, see [Clean for Client Documentation](../doc/clean-for-client.md).

## Global Setup

Both scripts can be set up as global commands:

```bash
# Create a bin directory if it doesn't exist
mkdir -p ~/bin

# Copy the scripts
cp /home/pazzo/Desktop/BEVARENA/git-clientview.sh ~/bin/git-clientview
cp /home/pazzo/Desktop/BEVARENA/clean-for-client.sh ~/bin/clean-for-client

# Make them executable
chmod +x ~/bin/git-clientview
chmod +x ~/bin/clean-for-client

# Add to PATH (if not already done)
export PATH="$HOME/bin:$PATH"

# Set up git alias
git config --global alias.clientview '!git-clientview'
```

For more information, see [Global Scripts Setup](../doc/global-scripts.md).

## Troubleshooting

If you encounter issues with these scripts:

1. Make sure they are executable: `chmod +x script-name.sh`
2. Check that you're running them from the correct directory
3. Verify that all required tools are installed
4. Check the script output for specific error messages

## See Also

- [Git Alias Setup](../doc/git-alias-setup.md)
- [Global Scripts Setup](../doc/global-scripts.md)
- [Clean for Client Documentation](../doc/clean-for-client.md)
- [Repository Workflow](../doc/repository-workflow.md)
