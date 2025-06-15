#!/bin/bash

# git-clientview.sh - Script to update client repository with latest changes
# Usage: ./git-clientview.sh [commit-message]

# Default commit message
COMMIT_MESSAGE="Update client repository with latest changes"

# Repository configurations
CLIENT_REPO="https://github.com/2701kai/bevarena-one.git"
DEV_REPO="https://github.com/2701kai/dev-bevarena-one.git"
CLIENT_REPO_NAME="bevarena-one"
DEV_REPO_NAME="dev-bevarena-one"

# If a commit message is provided, use it
if [ -n "$1" ]; then
    COMMIT_MESSAGE="$1"
fi

# Get the current directory
CURRENT_DIR=$(pwd)

# Ask for confirmation
echo "===== BevArena Client Repository Update ====="
echo "This will update the client-view branch and push to the client repository."
echo "Current directory: $CURRENT_DIR"
read -p "Is this the correct development repository? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "Operation canceled."
    exit 1
fi

# Setup remote configurations
setup_remotes() {
    # Check if dev remote exists
    if ! git remote | grep -q "dev"; then
        echo "Adding dev remote for the development repository."
        git remote add dev $DEV_REPO
    fi

    # Check if client remote exists
    if ! git remote | grep -q "client"; then
        # Check if origin is already pointing to client repo
        ORIGIN_URL=$(git remote get-url origin 2>/dev/null)
        if [[ "$ORIGIN_URL" == *"$CLIENT_REPO_NAME"* ]]; then
            echo "Origin already points to client repository. Using origin for client."
            CLIENT_REMOTE="origin"
        else
            echo "Adding client remote for the client repository."
            git remote add client $CLIENT_REPO
            CLIENT_REMOTE="client"
        fi
    else
        CLIENT_REMOTE="client"
    fi

    # If origin is not set up yet, check what it's pointing to
    if [ -z "$CLIENT_REMOTE" ]; then
        ORIGIN_URL=$(git remote get-url origin 2>/dev/null)
        if [[ "$ORIGIN_URL" == *"$CLIENT_REPO_NAME"* ]]; then
            CLIENT_REMOTE="origin"
        elif [[ "$ORIGIN_URL" == *"$DEV_REPO_NAME"* ]]; then
            # Origin is pointing to dev repo, so use client for client repo
            CLIENT_REMOTE="client"
        else
            # Default to client
            CLIENT_REMOTE="client"
        fi
    fi

    echo "Using $CLIENT_REMOTE for client repository and dev for development repository."
}

echo "Setting up remote repositories..."
setup_remotes

echo "Updating repositories..."

# Determine the current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
MAIN_BRANCH="main"

# If current branch is not main, check if main exists
if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    if git show-ref --verify --quiet refs/heads/$MAIN_BRANCH; then
        echo "Using $MAIN_BRANCH as the main branch."
    else
        # Find the default branch
        DEFAULT_BRANCH=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || echo "main")
        DEFAULT_BRANCH=${DEFAULT_BRANCH#origin/}
        MAIN_BRANCH=$DEFAULT_BRANCH
        echo "Using $MAIN_BRANCH as the main branch."
    fi
fi

# Make sure we're on the main branch and it's up to date
if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    git checkout $MAIN_BRANCH
fi

# Push the current development state to the dev repository
echo "Pushing current development state to dev repository..."
git push dev $MAIN_BRANCH

# Switch to client-view branch
git checkout client-view
echo "Switched to client-view branch."

# Merge changes from main branch
echo "Merging changes from main branch..."
git merge $MAIN_BRANCH

# Push client-view to dev repository for backup
echo "Backing up client-view branch to dev repository..."
git push dev client-view

# Run clean-for-client.sh script if it exists
if [ -f "./clean-for-client.sh" ]; then
    echo "Running clean-for-client.sh script..."
    chmod +x ./clean-for-client.sh
    ./clean-for-client.sh
else
    echo "Warning: clean-for-client.sh script not found in the current directory."
    echo "Skipping cleaning step."
fi

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    # Commit changes
    git add .
    git commit -m "$COMMIT_MESSAGE"

    # Push to dev repository
    git push dev client-view
fi

# Push to client repository - Force push to make client-view the ONLY branch visible as main
echo "Pushing cleaned code to client repository as main branch..."
git push -f $CLIENT_REMOTE client-view:main

echo "Changes pushed to client repository with message: $COMMIT_MESSAGE"

# Switch back to the original branch
if [ "$CURRENT_BRANCH" != "client-view" ]; then
    git checkout $CURRENT_BRANCH
fi

echo "Client repository update completed successfully."
echo "Development code is in: $DEV_REPO_NAME"
echo "Client-viewable code is in: $CLIENT_REPO_NAME (only main branch visible)"
