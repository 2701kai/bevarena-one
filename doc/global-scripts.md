# Global Scripts Setup

This document explains how to set up and use the global scripts for the BevArena project.

## Available Global Scripts

The BevArena project includes several scripts that can be set up globally for convenient access:

1. **git-clientview** - Updates the client repository with cleaned code
2. **clean-for-client.sh** - Cleans the codebase for client viewing
3. **commit-from-doc** - Generates structured Git commit messages from markdown files

## Setting Up git-clientview

The `git-clientview` script allows you to update the client repository with a cleaned version of your development code.

### Installation

1. Copy the script to your bin directory:

```bash
# Create a bin directory if it doesn't exist
mkdir -p ~/bin

# Copy the script
cp /home/pazzo/Desktop/BEVARENA/industarena/clone-industryarena/git-clientview.sh ~/bin/git-clientview

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
6. Switches back to the main branch
7. Merges client-view back to main to restore any modified files
8. Deletes the temporary client-view branch
9. Pushes the restored main branch to the development repository

## Setting Up clean-for-client.sh

The `clean-for-client.sh` script helps remove development artifacts from the codebase.

### Installation

1. Copy the script to your bin directory:

```bash
# Copy the script
cp /home/pazzo/Desktop/BEVARENA/industarena/clone-industryarena/clean-for-client.sh ~/bin/clean-for-client

# Make it executable
chmod +x ~/bin/clean-for-client
```

2. Add the bin directory to your PATH (if not already added):

```bash
# Add this line to your ~/.bashrc or ~/.zshrc
export PATH="$HOME/bin:$PATH"

# Then reload your shell configuration
source ~/.bashrc  # or source ~/.zshrc
```

### Usage

You can use the script directly:

```bash
# As a standalone command
clean-for-client
```

However, it's typically run automatically as part of the `git-clientview` workflow.

## Setting Up commit-from-doc

The `commit-from-doc` script helps generate structured Git commit messages from markdown files.

### Installation

1. Copy the script to your bin directory:

```bash
# Copy the script
cp /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh ~/bin/commit-from-doc

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
commit-from-doc -f path/to/document.md -t feat -s auth

# As a git alias (if set up)
git doccommit -f path/to/document.md -t feat -s auth
```

Without any parameters, the script will run in interactive mode:

```bash
commit-from-doc
```

This will:

1. Show a list of recently modified markdown files
2. Let you select a file from the list
3. Prompt for commit type and scope
4. Generate a structured commit message
5. Allow you to edit the message
6. Commit the changes

## Repository Configuration

The scripts are configured to work with the following repositories:

1. **Development Repository**:

   - Path: `/home/pazzo/Desktop/BEVARENA/industarena/clone-industryarena`
   - Remote: https://github.com/2701kai/dev-bevarena-one.git

2. **Client Repository**:
   - Path: `/home/pazzo/Desktop/BEVARENA/CLIENTVIEW/dev-bevarena-one`
   - Remote: https://github.com/2701kai/bevarena-one.git

## Troubleshooting

If you encounter issues with the global scripts:

1. **Script not found**: Make sure the script is in your PATH

   ```bash
   which git-clientview
   which clean-for-client
   ```

2. **Permission denied**: Make sure the script is executable

   ```bash
   chmod +x ~/bin/git-clientview
   chmod +x ~/bin/clean-for-client
   ```

3. **PATH not updated**: Make sure your PATH includes your bin directory

   ```bash
   echo $PATH
   ```

4. **Git alias not working**: Verify the alias is set up correctly

   ```bash
   git config --global --get alias.clientview
   ```

5. **Script fails**: Check that both repositories are accessible and properly configured
   ```bash
   # From the development repository
   git remote -v
   ```

## Related Documentation

- [Git Client View Script](git-clientview.md) - Detailed documentation for the git-clientview script
- [Clean for Client Script](clean-for-client.md) - Documentation for the cleaning script
- [Repository Workflow](repository-workflow.md) - Overview of the dual repository workflow
