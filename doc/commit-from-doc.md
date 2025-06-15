# Commit From Doc Script

The `commit-from-doc.sh` script is a utility that generates structured Git commit messages from markdown files. It helps maintain consistent commit message formatting following conventional commit standards.

## Overview

This script analyzes markdown files to extract meaningful commit messages, including:

1. A title from the document's heading
2. Bullet points from relevant sections
3. A summary from the document's content

It then formats these elements into a conventional commit message with type, scope, and description.

## Features

- Interactive mode for selecting recently modified markdown files
- Automatic extraction of commit message components from markdown
- Support for conventional commit format (type, scope, description)
- Preview and edit capability before committing
- Options for committing all changes or just the markdown file
- Integration with Git via aliases

## Installation

### Global Installation

1. Copy the script to your bin directory:

```bash
# Create a bin directory if it doesn't exist
mkdir -p ~/bin

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

3. Set up the git alias:

```bash
git config --global alias.doccommit '!commit-from-doc'
```

## Usage

### Basic Usage

```bash
# Run in interactive mode
commit-from-doc

# Specify a markdown file
commit-from-doc -f README.md

# Specify file, type, and scope
commit-from-doc -f doc/changes.md -t feat -s auth
```

### Using the Git Alias

```bash
# Run in interactive mode
git doccommit

# Specify a markdown file
git doccommit -f README.md

# Specify file, type, and scope
git doccommit -f doc/changes.md -t feat -s auth
```

### Command-Line Options

| Option              | Description                                  |
| ------------------- | -------------------------------------------- |
| `-f, --file FILE`   | Markdown file to extract commit message from |
| `-t, --type TYPE`   | Commit type (feat, fix, docs, style, etc.)   |
| `-s, --scope SCOPE` | Commit scope (component, service, etc.)      |
| `-h, --help`        | Show help message                            |

## How It Works

1. **File Selection**:

   - If no file is specified, shows a list of recently modified markdown files
   - User selects a file from the list

2. **Commit Type Selection**:

   - If no type is specified, shows a list of conventional commit types
   - User selects a type (feat, fix, docs, style, refactor, etc.)

3. **Scope Selection**:

   - If no scope is specified, suggests a scope based on the file path
   - User can accept the suggestion or enter a custom scope

4. **Message Generation**:

   - Extracts a title from the document's first heading
   - Extracts bullet points from relevant sections (Changes, Features, Fixes, etc.)
   - Extracts a summary from the document's content

5. **Commit Process**:
   - Shows the generated commit message
   - Allows the user to edit the message
   - Provides options for committing and pushing changes

## Conventional Commit Types

| Type       | Description                                         |
| ---------- | --------------------------------------------------- |
| `feat`     | A new feature                                       |
| `fix`      | A bug fix                                           |
| `docs`     | Documentation changes                               |
| `style`    | Code style changes (formatting, semicolons)         |
| `refactor` | Code changes that neither fix bugs nor add features |
| `perf`     | Performance improvements                            |
| `test`     | Adding or correcting tests                          |
| `chore`    | Changes to the build process, tools, etc.           |
| `ci`       | Changes to CI configuration files and scripts       |

## Examples

### Example 1: Documenting a Feature

1. Create a markdown file `doc/features/user-authentication.md`:

```markdown
# User Authentication

## Features

- Add login form with email and password fields
- Implement JWT token-based authentication
- Add remember me functionality
- Create protected routes for authenticated users

## Implementation Details

The authentication system uses JWT tokens stored in local storage...
```

2. Run the commit-from-doc script:

```bash
git doccommit -f doc/features/user-authentication.md -t feat -s auth
```

3. The script will generate a commit message like:

```
feat(auth): User Authentication

- Add login form with email and password fields
- Implement JWT token-based authentication
- Add remember me functionality
- Create protected routes for authenticated users

The authentication system uses JWT tokens stored in local storage...
```

## Troubleshooting

- **Script not found**: Ensure the script is in your PATH

  ```bash
  which commit-from-doc
  ```

- **Permission denied**: Make the script executable

  ```bash
  chmod +x ~/bin/commit-from-doc
  ```

- **Git alias not working**: Verify the alias is set up correctly
  ```bash
  git config --global --get alias.doccommit
  ```

## See Also

- [Git Aliases](git-aliases.md) - Documentation for all Git aliases used in the project
- [Global Scripts Setup](global-scripts.md) - How to set up the scripts globally
