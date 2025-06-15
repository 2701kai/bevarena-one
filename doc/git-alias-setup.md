# Git Alias Setup

This document provides instructions for setting up convenient git aliases for the BevArena project.

## Setting Up the `git clientview` Command

The `git clientview` command allows you to easily update the client repository with cleaned code from your development repository. Here's how to set it up:

### Option 1: Global Git Alias (Recommended)

This method makes the `git clientview` command available system-wide:

1. Copy the script to a permanent location:

```bash
# Create a directory for global git scripts if it doesn't exist
mkdir -p ~/bin

# Copy the script
cp /home/pazzo/Desktop/BEVARENA/git-clientview.sh ~/bin/git-clientview

# Make it executable
chmod +x ~/bin/git-clientview
```

2. Add the directory to your PATH (if not already added):

```bash
# Add this line to your ~/.bashrc or ~/.zshrc
export PATH="$HOME/bin:$PATH"

# Then reload your shell configuration
source ~/.bashrc  # or source ~/.zshrc
```

3. Set up the git alias:

```bash
git config --global alias.clientview '!git-clientview'
```

Now you can use `git clientview` from any directory.

### Option 2: Project-Specific Alias

If you prefer to keep the alias specific to this project:

```bash
# Navigate to your project directory
cd /home/pazzo/Desktop/BEVARENA

# Set up a local git alias
git config alias.clientview '!/home/pazzo/Desktop/BEVARENA/git-clientview.sh'
```

### Option 3: Using the Script Directly

You can also run the script directly without setting up an alias:

```bash
/home/pazzo/Desktop/BEVARENA/git-clientview.sh "Your commit message"
```

## Usage

Once set up, you can update the client repository with:

```bash
# From within your development repository
git clientview "Optional commit message"
```

If no commit message is provided, it will use the default message: "Update client repository with latest changes".

## What the Script Does

The `git-clientview` script:

1. Pushes your current development state to the dev repository
2. Creates or switches to the `client-view` branch
3. Merges changes from your main branch
4. Runs the `clean-for-client.sh` script to remove development artifacts
5. Commits and pushes the cleaned code to the client repository
6. Switches back to your original branch

## Troubleshooting

If you encounter any issues:

1. Make sure the script is executable: `chmod +x ~/bin/git-clientview`
2. Verify the script path in your git alias: `git config --global --get alias.clientview`
3. Check that the script is in your PATH: `which git-clientview`
4. If using a project-specific alias, make sure you're in the correct directory

## Additional Aliases

You can set up other useful git aliases for the project:

```bash
# Quick commit with a message
git config --global alias.cm 'commit -m'

# Show status in short format
git config --global alias.st 'status -s'

# View commit history with a graph
git config --global alias.lg 'log --graph --oneline --decorate'
```

These aliases can make your git workflow more efficient.
