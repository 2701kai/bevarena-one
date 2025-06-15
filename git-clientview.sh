#!/bin/bash

#######################################
# git-clientview.sh - Script to update client repository with latest changes
#
# This script automates the process of updating a client-facing repository
# with a cleaned version of the development code. It handles branch switching,
# merging, cleaning, and pushing to the appropriate repositories.
#
# Author: BevArena Team
# Version: 1.0.1
# Tested on: Ubuntu 25.10
#
# Usage: ./git-clientview.sh [commit-message]
#
# Dependencies:
#   - git
#   - clean-for-client.sh (in the same directory)
#######################################

# Exit immediately if a command exits with a non-zero status
set -e

# Define text colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default commit message
COMMIT_MESSAGE="Update client repository with latest changes"

# Repository configurations
CLIENT_REPO="https://github.com/2701kai/bevarena-one.git"
DEV_REPO="https://github.com/2701kai/dev-bevarena-one.git"
CLIENT_REPO_NAME="bevarena-one"
DEV_REPO_NAME="dev-bevarena-one"

#######################################
# Display error message and exit
# Arguments:
#   $1 - Error message to display
# Returns:
#   1 - Error exit code
#######################################
error_exit() {
    echo -e "${RED}ERROR: $1${NC}" >&2
    exit 1
}

#######################################
# Display warning message
# Arguments:
#   $1 - Warning message to display
# Returns:
#   None
#######################################
warning() {
    echo -e "${YELLOW}WARNING: $1${NC}" >&2
}

#######################################
# Display info message
# Arguments:
#   $1 - Info message to display
# Returns:
#   None
#######################################
info() {
    echo -e "${BLUE}$1${NC}"
}

#######################################
# Display success message
# Arguments:
#   $1 - Success message to display
# Returns:
#   None
#######################################
success() {
    echo -e "${GREEN}$1${NC}"
}

# If a commit message is provided, use it
if [[ -n "$1" ]]; then
    COMMIT_MESSAGE="$1"
fi

# Get the current directory
CURRENT_DIR=$(pwd)

# Ask for confirmation
echo -e "${GREEN}===== BevArena Client Repository Update =====${NC}"
info "This will update the client-view branch and push to the client repository."
info "Current directory: ${CURRENT_DIR}"
read -p "Is this the correct development repository? (y/n): " CONFIRM

if [[ "$CONFIRM" != "y" ]]; then
    error_exit "Operation canceled by user."
fi

#######################################
# Setup remote repository configurations
# Globals:
#   CLIENT_REPO, DEV_REPO, CLIENT_REPO_NAME, DEV_REPO_NAME
# Arguments:
#   None
# Outputs:
#   Sets CLIENT_REMOTE variable
# Returns:
#   0 if successful, non-zero on error
#######################################
setup_remotes() {
    # Check if dev remote exists
    if ! git remote | grep -q "dev"; then
        info "Adding dev remote for the development repository."
        git remote add dev "${DEV_REPO}" || error_exit "Failed to add dev remote."
    fi

    # Check if client remote exists
    if ! git remote | grep -q "client"; then
        # Check if origin is already pointing to client repo
        ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")
        if [[ "${ORIGIN_URL}" == *"${CLIENT_REPO_NAME}"* ]]; then
            info "Origin already points to client repository. Using origin for client."
            CLIENT_REMOTE="origin"
        else
            info "Adding client remote for the client repository."
            git remote add client "${CLIENT_REPO}" || error_exit "Failed to add client remote."
            CLIENT_REMOTE="client"
        fi
    else
        CLIENT_REMOTE="client"
    fi

    # If CLIENT_REMOTE is still not set, check what origin is pointing to
    if [[ -z "${CLIENT_REMOTE}" ]]; then
        ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")
        if [[ "${ORIGIN_URL}" == *"${CLIENT_REPO_NAME}"* ]]; then
            CLIENT_REMOTE="origin"
        elif [[ "${ORIGIN_URL}" == *"${DEV_REPO_NAME}"* ]]; then
            # Origin is pointing to dev repo, so use client for client repo
            CLIENT_REMOTE="client"
        else
            # Default to client
            CLIENT_REMOTE="client"
        fi
    fi

    info "Using ${CLIENT_REMOTE} for client repository and dev for development repository."
}

info "Setting up remote repositories..."
setup_remotes

info "Updating repositories..."

# Determine the current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")
MAIN_BRANCH="main"

# If current branch is not main, check if main exists
if [[ "${CURRENT_BRANCH}" != "${MAIN_BRANCH}" ]]; then
    if git show-ref --verify --quiet refs/heads/${MAIN_BRANCH}; then
        info "Using ${MAIN_BRANCH} as the main branch."
    else
        # Find the default branch
        DEFAULT_BRANCH=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null || echo "main")
        DEFAULT_BRANCH=${DEFAULT_BRANCH#origin/}
        MAIN_BRANCH=${DEFAULT_BRANCH}
        info "Using ${MAIN_BRANCH} as the main branch."
    fi
fi

# Make sure we're on the main branch and it's up to date
if [[ "${CURRENT_BRANCH}" != "${MAIN_BRANCH}" ]]; then
    git checkout ${MAIN_BRANCH} || error_exit "Failed to checkout ${MAIN_BRANCH} branch."
fi

# Push the current development state to the dev repository
info "Pushing current development state to dev repository..."
git push dev ${MAIN_BRANCH} || warning "Failed to push to dev repository. Continuing anyway..."

# Check if client-view branch exists, create if not
if ! git show-ref --verify --quiet refs/heads/client-view; then
    info "Creating client-view branch..."
    git checkout -b client-view || error_exit "Failed to create client-view branch."
else
    # Switch to client-view branch
    git checkout client-view || error_exit "Failed to checkout client-view branch."
    info "Switched to client-view branch."
fi

# Merge changes from main branch
info "Merging changes from main branch..."
git merge ${MAIN_BRANCH} || error_exit "Merge failed. Please resolve conflicts and run the script again."

# Push client-view to dev repository for backup
info "Backing up client-view branch to dev repository..."
git push dev client-view || warning "Failed to backup client-view branch. Continuing anyway..."

# Run clean-for-client.sh script if it exists
if [[ -f "./clean-for-client.sh" ]]; then
    info "Running clean-for-client.sh script..."
    chmod +x ./clean-for-client.sh
    ./clean-for-client.sh || error_exit "clean-for-client.sh script failed."
else
    warning "clean-for-client.sh script not found in the current directory."
    warning "Skipping cleaning step."
fi

# Check if there are changes to commit
if [[ -n "$(git status --porcelain)" ]]; then
    # Commit changes
    info "Committing changes..."
    git add .
    git commit -m "${COMMIT_MESSAGE}" || error_exit "Failed to commit changes."

    # Push to dev repository
    git push dev client-view || warning "Failed to push client-view to dev repository. Continuing anyway..."
fi

# Push to client repository - Force push to make client-view the ONLY branch visible as main
info "Pushing cleaned code to client repository as main branch..."
git push -f ${CLIENT_REMOTE} client-view:main || error_exit "Failed to push to client repository."

success "Changes pushed to client repository with message: ${COMMIT_MESSAGE}"

# Switch back to the original branch
if [[ "${CURRENT_BRANCH}" != "client-view" ]]; then
    git checkout ${CURRENT_BRANCH} || warning "Failed to switch back to ${CURRENT_BRANCH} branch."
fi

success "Client repository update completed successfully."
info "Development code is in: ${DEV_REPO_NAME}"
info "Client-viewable code is in: ${CLIENT_REPO_NAME} (only main branch visible)"
