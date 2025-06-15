# Commit from Document Script

## Overview

The `commit-from-doc.sh` script is a powerful tool that automatically generates structured, conventional Git commit messages from your markdown documentation files. It streamlines your workflow by extracting meaningful commit information from your existing documentation, ensuring consistent and informative commit history.

## Features

- **Smart document analysis** - Extracts key information from markdown files including titles, bullet points, and summaries
- **Interactive selection** - Helps you choose from recently modified documentation files
- **Conventional commits format** - Creates commits following the `type(scope): title` convention with bullet point details
- **Intelligent scope detection** - Suggests commit scopes based on file paths
- **Git integration** - Handles the entire commit process including staging files and pushing changes
- **Editor support** - Allows manual editing of generated commit messages before committing

## Installation

1. Place the script in a convenient location:

   ```bash
   # The script is located at:
   /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh
   ```

2. Make it executable:

   ```bash
   chmod +x /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh
   ```

3. Optionally, you can create a symbolic link to the script in a directory in your PATH:
   ```bash
   ln -s /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh /usr/local/bin/commit-from-doc
   ```

## Usage

### Basic Usage

Run the script without arguments to select from recently modified markdown files:

```bash
cd /path/to/git/repository
/home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh
```

### Specifying a File

Point to a specific markdown file:

```bash
/home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh path/to/document.md
```

### Advanced Options

Control the commit type and scope:

```bash
/home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh -f path/to/document.md -t feat -s auth
```

### Command-line Options

| Option              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `-f, --file FILE`   | Markdown file to extract commit message from         |
| `-t, --type TYPE`   | Commit type (feat, fix, docs, style, refactor, etc.) |
| `-s, --scope SCOPE` | Commit scope (component, service, etc.)              |
| `-h, --help`        | Show help message                                    |

## How It Works

1. **Document Selection**

   - If no file is provided, shows a list of recently modified markdown files
   - Allows you to select from the list or specify a file directly

2. **Commit Type Selection**

   - Prompts for commit type if not specified
   - Supports conventional commit types: feat, fix, docs, style, refactor, perf, test, chore, ci

3. **Scope Detection**

   - Analyzes file paths to suggest a relevant scope
   - Allows manual override of the suggested scope

4. **Document Analysis**

   - Extracts title from headings
   - Finds bullet points under sections like "Changes" or "Features"
   - Extracts summary paragraphs for context
   - Formats everything according to conventional commit standards

5. **Message Review**

   - Displays the generated commit message
   - Allows editing in your preferred text editor

6. **Commit Process**
   - Handles staging of files if needed
   - Creates the commit with the generated message
   - Optionally pushes the changes to the remote repository

## Examples

### Example 1: Basic Usage

```bash
$ /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh

# The script will:
# 1. Show a list of recent markdown files
# 2. Help you select commit type and scope
# 3. Generate and display a commit message
# 4. Allow you to edit and confirm
# 5. Create the commit and optionally push
```

### Example 2: Using a Specific Feature Document

```bash
$ /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh doc/feature-authentication.md -t feat -s auth

# Will generate a commit like:
# feat(auth): Implement user authentication
#
# - Add JWT token generation and validation
# - Create login and registration endpoints
# - Implement password hashing with bcrypt
# - Add user session management
#
# This feature provides secure authentication using JWT tokens
# with comprehensive session management and password security.
```

### Example 3: Using with Documentation Changes

```bash
$ /home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh README.md -t docs

# Will generate a commit like:
# docs(general): Update installation instructions
#
# - Add Docker setup steps
# - Clarify environment variable requirements
# - Update troubleshooting section
#
# The installation documentation has been expanded to include
# container-based setup options.
```

## Tips for Best Results

1. **Structured Documentation**: The script works best with well-structured markdown files that have clear headings and bullet points.

2. **Commit Types**: Familiarize yourself with conventional commit types to choose the most appropriate one:

   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, semicolons)
   - `refactor`: Code changes that neither fix bugs nor add features
   - `perf`: Performance improvements
   - `test`: Adding or correcting tests
   - `chore`: Changes to the build process, tools, etc.

3. **Meaningful Bullet Points**: When writing documentation, use clear bullet points that describe specific changes or features.

4. **Regular Documentation Updates**: Keep your documentation up-to-date with your code changes to maximize the effectiveness of this script.

## Troubleshooting

### No Markdown Files Found

If you see "No markdown files found modified in the last week", the script couldn't find recently modified markdown files. Try:

1. Specifying a file path directly: `/home/pazzo/Desktop/BEVARENA/doc/commit-from-doc/commit-from-doc.sh path/to/file.md`
2. Creating or updating a markdown file to document your changes

### Empty or Incomplete Commit Message

If the generated message doesn't include bullet points or is missing content:

1. Make sure your markdown file has bullet points (lines starting with `-`, `*`, or `+`)
2. Check that your file has headings (lines starting with `#`)
3. Add a section with a heading like "## Changes" or "## Features" followed by bullet points
