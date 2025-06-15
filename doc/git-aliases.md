# Git Aliases for BevArena Tools

This document lists the Git aliases set up for the BevArena project tools.

## Available Git Aliases

| Git Alias        | Command           | Description                                             |
| ---------------- | ----------------- | ------------------------------------------------------- |
| `git clientview` | `git-clientview`  | Update the client-facing repository with cleaned code   |
| `git doccommit`  | `commit-from-doc` | Generate structured commit messages from markdown files |

## Setup

These Git aliases have been configured in your global Git configuration file (`~/.gitconfig`).

If you need to set them up again or on another machine, run:

```bash
# For the client repository update tool
git config --global alias.clientview '!git-clientview'

# For the documentation-based commit tool
git config --global alias.doccommit '!commit-from-doc'
```

## Usage

### Client Repository Update

```bash
# Update client repository with default commit message
git clientview

# Update with custom commit message
git clientview "feat: update login page"
```

### Documentation-Based Commit

```bash
# Interactive mode - will help you select a file and commit type
git doccommit

# With specific file
git doccommit -f README.md

# With file, type and scope
git doccommit -f doc/changes.md -t feat -s auth
```

## How It Works

This Git alias uses the `!` prefix to run an external command rather than a Git subcommand. This allows it to execute the shell script we've set up globally in your `~/bin` directory.

For example, when you run `git clientview`, Git actually executes:

```bash
git-clientview
```

Which is the executable script located at `/home/pazzo/bin/git-clientview`.

## Advantages of Git Aliases

Using Git aliases provides several benefits:

1. **Familiarity**: They follow the Git command pattern users are already used to
2. **Discoverability**: They appear in Git help and can be listed with `git config --get-regexp alias`
3. **Portability**: They can be easily shared in team settings via `.gitconfig` files
4. **Context**: They make it clear these are Git-related tools

## Troubleshooting

If the aliases aren't working:

1. Check that the underlying scripts are accessible:

   ```bash
   which git-clientview
   which commit-from-doc
   ```

2. Ensure the aliases are correctly set in your Git config:

   ```bash
   git config --global --get-regexp alias
   ```

3. Remember to run it in a Git repository:
   ```bash
   git rev-parse --is-inside-work-tree
   ```

## Related Documentation

- [Git Client View Script](git-clientview.md) - Documentation for the git-clientview script
- [Global Scripts Setup](global-scripts.md) - How to set up the scripts globally
- [Repository Workflow](repository-workflow.md) - Overview of the dual repository workflow
