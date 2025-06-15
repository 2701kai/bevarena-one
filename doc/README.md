# BevArena Documentation

This directory contains documentation for the BevArena project.

## Project Documentation

- [Repository Workflow](repository-workflow.md) - How development and client repositories are managed
- [Clean for Client](../clean-for-client.sh) - Script for cleaning code for client viewing
- [Developer Tools](developer-tools.md) - Documentation for the Context7 integration and developer tools

## Scripts

- [git-clientview.sh](../git-clientview.sh) - Script to update client repository with latest changes
  - Usage: `git clientview [commit-message]`
  - Creates a system-wide `git clientview` command
  - See [Git Alias Setup](git-alias-setup.md) for installation instructions

## Repository Structure

BevArena uses a dual repository approach:

1. **Development Repository** (Private): https://github.com/2701kai/dev-bevarena-one

   - Full development codebase with all branches and artifacts
   - Access restricted to development team
   - Includes Context7 integration and developer tools

2. **Client Repository** (Public): https://github.com/2701kai/bevarena-one
   - Clean codebase for client viewing
   - Single branch visible to clients
   - No development artifacts or AI prompts

See [Repository Workflow](repository-workflow.md) for more details on how these repositories are managed.

## Developer Tools

BevArena includes several developer tools that enhance the development experience:

1. **Context7 Integration**

   - Developer panel accessible via keyboard shortcuts (`Ctrl+Shift+D` or `Alt+7`)
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
- [Client Repository Quickstart](client-repo-quickstart.md) - Step-by-step guide for quick implementation
- [Client Access Options](client-access-options.md) - Comparison of different approaches for client code access
- [Git Alias Setup](git-alias-setup.md) - How to set up convenient git aliases for client repository updates

## Tools and Utilities

- [Global Scripts Setup](global-scripts.md) - How to use the global scripts (git-clientview and commit-from-doc)
- [Git Aliases](git-aliases.md) - Git aliases for project tools (git clientview, git doccommit)
- [Commit From Doc](commit-from-doc/commit-from-doc.md) - Generate structured Git commit messages from documentation

## Deployment

- [Vercel Deployment Guide](vercel-deployment.md) - How to deploy BevArena to Vercel while maintaining separate repositories

## Directory Structure

```
/doc
├── README.md                    # This file
├── client-repository-setup.md   # Detailed setup guide for client repository
├── client-repo-quickstart.md    # Quick implementation guide
├── client-access-options.md     # Comparison of client access approaches
├── git-alias-setup.md           # Guide for setting up git aliases
├── git-aliases.md               # Documentation for Git aliases
├── global-scripts.md            # Documentation for global scripts
├── vercel-deployment.md         # Guide for deploying to Vercel
└── commit-from-doc/             # Tools for generating commits from documentation
    ├── commit-from-doc.sh       # Script for creating structured commits
    ├── commit-from-doc-global.sh # Global wrapper for commit-from-doc script
    ├── commit-from-doc.md       # Documentation for the commit-from-doc tool
    └── README.md                # Quick reference for commit-from-doc
```

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
   - Located at: `https://github.com/2701kai/bevarena-one`

## Getting Started

If you're new to the project, start by reading:

1. [Client Repository Setup](client-repository-setup.md)
2. [Vercel Deployment Guide](vercel-deployment.md)
3. [Global Scripts Setup](global-scripts.md)
4. [Git Aliases](git-aliases.md)

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
git checkout client-view
git merge main
./clean-for-client.sh
git add .
git commit -m "Update client repository with latest changes"
git push client-repo client-view:main
```
