# BevArena Documentation

This directory contains documentation for the BevArena project.

## Project Documentation

- [Repository Workflow](repository-workflow.md) - How development and client repositories are managed
- [Git Client View](git-clientview.md) - Documentation for the git-clientview script
- [Clean for Client](clean-for-client.md) - Documentation for the clean-for-client.sh script
- [Developer Tools](developer-tools.md) - Documentation for the Context7 integration and developer tools
- [Commit From Doc](commit-from-doc.md) - Documentation for the commit-from-doc script

## Scripts

- [git-clientview.sh](../git-clientview.sh) - Script to update client repository with latest changes

  - Usage: `git clientview [commit-message]`
  - Creates a system-wide `git clientview` command
  - See [Global Scripts Setup](global-scripts.md) for installation instructions

- [clean-for-client.sh](../clean-for-client.sh) - Script for cleaning code for client viewing

  - Automatically called by git-clientview.sh
  - Removes development artifacts, AI tool traces, and developer-specific code

- [commit-from-doc.sh](commit-from-doc/commit-from-doc.sh) - Script for generating structured commit messages
  - Usage: `git doccommit` or `commit-from-doc`
  - Extracts commit messages from markdown files
  - Creates conventional commits with type, scope, and description

## Repository Structure

BevArena uses a dual repository approach:

1. **Development Repository** (Private): https://github.com/2701kai/dev-bevarena-one

   - Path: `/home/pazzo/Desktop/BEVARENA/industarena/clone-industryarena`
   - Full development codebase with all branches and artifacts
   - Access restricted to development team
   - Includes Context7 integration and developer tools

2. **Client Repository** (Public): https://github.com/2701kai/bevarena-one
   - Path: `/home/pazzo/Desktop/BEVARENA/CLIENTVIEW/dev-bevarena-one`
   - Clean codebase for client viewing
   - Single branch visible to clients
   - No development artifacts or AI prompts

See [Repository Workflow](repository-workflow.md) for more details on how these repositories are managed.

## Developer Tools

BevArena includes several developer tools that enhance the development experience:

1. **Context7 Integration**

   - Developer panel accessible via keyboard shortcuts (`Alt+D` or `Alt+7`)
   - Library documentation lookup
   - Development utilities

2. **Developer Components**

   - Located in `src/components/dev/`
   - Automatically removed in client builds

3. **Development Utilities**
   - Located in `src/utils/devtools/`
   - Helper functions for Context7 integration

These tools are automatically removed from the client repository by the `clean-for-client.sh` script.

## Client Repository Setup

- [Client Repository Setup](client-repository-setup.md) - Complete guide for setting up a client-facing repository
- [Repository Workflow](repository-workflow.md) - Detailed workflow for managing development and client repositories
- [Git Aliases](git-aliases.md) - Git aliases for project tools (git clientview)

## Tools and Utilities

- [Global Scripts Setup](global-scripts.md) - How to use the global scripts (git-clientview, clean-for-client, and commit-from-doc)
- [Git Aliases](git-aliases.md) - Git aliases for project tools (git clientview, git doccommit)
- [Commit From Doc](commit-from-doc.md) - Generate structured Git commit messages from documentation

## Deployment

- [Vercel Deployment Guide](vercel-deployment.md) - How to deploy BevArena to Vercel while maintaining separate repositories

## Workflow Overview

BevArena uses a dual-repository approach:

1. **Development Repository** (Private)

   - Contains all development tools, AI utilities, and work-in-progress features
   - Includes Context7 integration for enhanced developer experience
   - Used for active development and Vercel deployments
   - Located at: `/home/pazzo/Desktop/BEVARENA/industarena/clone-industryarena`

2. **Client-Facing Repository** (Public)
   - Contains cleaned code without development tools or AI references
   - Provides read-only access for clients to review code implementation
   - Updated manually or automatically after significant changes
   - Located at: `/home/pazzo/Desktop/BEVARENA/CLIENTVIEW/dev-bevarena-one`

## Getting Started

If you're new to the project, start by reading:

1. [Repository Workflow](repository-workflow.md)
2. [Git Client View](git-clientview.md)
3. [Clean for Client](clean-for-client.md)
4. [Global Scripts Setup](global-scripts.md)

## Maintenance

To update the client repository with new changes:

```bash
# Quick method with the Git alias
git clientview

# Or with the global script
git-clientview

# Or the manual process:
cd /home/pazzo/Desktop/BEVARENA/industarena/clone-industryarena
git checkout main
git pull origin main
git checkout -b client-view
git merge main
./clean-for-client.sh
git add .
git commit -m "Update client repository with latest changes"
git push -f client client-view:main
git checkout main
git merge client-view
git branch -D client-view
git push origin main
```
