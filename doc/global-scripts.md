# Global Scripts Setup

This document explains how to set up and use the global scripts for the BevArena project.

## Available Global Scripts

The BevArena project includes several scripts that can be set up globally for convenient access:

1. **git-clientview** - Updates the client repository with cleaned code
2. **commit-from-doc** - Generates structured Git commit messages from documentation

## Setting Up git-clientview

The `git-clientview` script allows you to update the client repository with a cleaned version of your development code.

### Installation

1. Copy the script to your bin directory:

```bash
# Create a bin directory if it doesn't exist
mkdir -p ~/bin

# Copy the script
cp /home/pazzo/Desktop/BEVARENA/git-clientview.sh ~/bin/git-clientview

# Make it executable
chmod +x ~/bin/git-clientview
```

2. Add the bin directory to your PATH (if not already added):

```bash
# Add this line to your ~/.bashrc or ~/.zshrc
export PATH="$HOME/bin:$PATH"

# Then reload your shell configuration
source ~/.bashrc  # or source ~/.zshrc
```

3. Set up the git alias (optional but recommended):

```bash
git config --global alias.clientview '!git-clientview'
```

### Usage

You can use the script in two ways:

```bash
# As a standalone command (from any directory)
git-clientview "Optional commit message"

# As a git alias (if set up)
git clientview "Optional commit message"
```

If no commit message is provided, it will use the default message: "Update client repository with latest changes".

### What the Script Does

The `git-clientview` script:

1. Pushes your current development state to the dev repository
2. Creates or switches to the `client-view` branch
3. Merges changes from your main branch
4. Runs the `clean-for-client.sh` script to remove development artifacts
5. Commits and pushes the cleaned code to the client repository
6. Switches back to your original branch

## Setting Up commit-from-doc

The `commit-from-doc` script helps generate structured Git commit messages from documentation.

### Installation

1. Copy the script to your bin directory:

```bash
# Copy the script
cp /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc-global.sh ~/bin/commit-from-doc

# Make it executable
chmod +x ~/bin/commit-from-doc
```

2. Add the bin directory to your PATH (if not already added):

```bash
# Add this line to your ~/.bashrc or ~/.zshrc
export PATH="$HOME/bin:$PATH"

# Then reload your shell configuration
source ~/.bashrc  # or source ~/.zshrc
```

3. Set up the git alias (optional):

```bash
git config --global alias.doccommit '!commit-from-doc'
```

### Usage

You can use the script in two ways:

```bash
# As a standalone command
commit-from-doc path/to/document.md "section-title"

# As a git alias (if set up)
git doccommit path/to/document.md "section-title"
```

For more details, see the [Commit From Doc documentation](commit-from-doc/commit-from-doc.md).

## Troubleshooting

If you encounter issues with the global scripts:

1. **Script not found**: Make sure the script is in your PATH

   ```bash
   which git-clientview
   which commit-from-doc
   ```

2. **Permission denied**: Make sure the script is executable

   ```bash
   chmod +x ~/bin/git-clientview
   chmod +x ~/bin/commit-from-doc
   ```

3. **PATH not updated**: Make sure your PATH includes your bin directory

   ```bash
   echo $PATH
   ```

4. **Git alias not working**: Verify the alias is set up correctly
   ```bash
   git config --global --get alias.clientview
   git config --global --get alias.doccommit
   ```
