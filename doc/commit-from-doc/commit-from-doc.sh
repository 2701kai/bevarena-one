#!/bin/bash
# commit-from-doc.sh - Generate structured commit messages from markdown files
# Usage: ./commit-from-doc.sh [path/to/markdown.md] [type] [scope]

# Configuration
DEFAULT_COMMIT_TYPE="docs"
DEFAULT_COMMIT_SCOPE="general"
DAYS_AGO=7 # How many days back to look for modified markdown files

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# Function to display help message
show_help() {
    echo -e "${BOLD}Commit From Document${RESET}"
    echo -e "Generate structured Git commit messages from markdown files\n"
    echo -e "${BOLD}USAGE:${RESET}"
    echo -e "  ./commit-from-doc.sh [options]\n"
    echo -e "${BOLD}OPTIONS:${RESET}"
    echo -e "  -f, --file FILE     Markdown file to extract commit message from"
    echo -e "  -t, --type TYPE     Commit type (feat, fix, docs, style, refactor, etc.)"
    echo -e "  -s, --scope SCOPE   Commit scope (component, service, etc.)"
    echo -e "  -h, --help          Show this help message\n"
    echo -e "${BOLD}EXAMPLES:${RESET}"
    echo -e "  ./commit-from-doc.sh"
    echo -e "  ./commit-from-doc.sh -f doc/changes.md -t feat -s auth"
    echo -e "  ./commit-from-doc.sh --file README.md --type docs"
    exit 0
}

# Parse command line arguments
MARKDOWN_FILE=""
COMMIT_TYPE=""
COMMIT_SCOPE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
    -f | --file)
        MARKDOWN_FILE="$2"
        shift 2
        ;;
    -t | --type)
        COMMIT_TYPE="$2"
        shift 2
        ;;
    -s | --scope)
        COMMIT_SCOPE="$2"
        shift 2
        ;;
    -h | --help)
        show_help
        ;;
    *)
        # If it's not a flag and no file is set, assume it's the file path
        if [[ -z "$MARKDOWN_FILE" && "$1" != -* ]]; then
            MARKDOWN_FILE="$1"
        fi
        shift
        ;;
    esac
done

# Function to find recently modified markdown files
find_recent_markdown_files() {
    echo -e "${BLUE}Finding recently modified markdown files...${RESET}"
    # Find markdown files modified in the last week
    recent_files=$(find . -name "*.md" -type f -mtime -${DAYS_AGO} | sort -r)

    if [[ -z "$recent_files" ]]; then
        echo -e "${YELLOW}No markdown files found modified in the last week.${RESET}"
        echo -e "Try specifying a file path directly: ${CYAN}./commit-from-doc.sh path/to/file.md${RESET}"
        exit 1
    fi

    # Display a list of recently modified markdown files with numbers
    echo -e "${BOLD}Recently modified markdown files:${RESET}"
    num=1
    declare -a file_list

    while IFS= read -r file; do
        rel_path="${file#./}"
        file_list[$num]="$rel_path"
        # Get the modified date of the file
        mod_date=$(stat -c "%y" "$file" | cut -d' ' -f1)

        # Truncate the filename if it's too long
        display_name="${rel_path}"
        if [[ ${#display_name} -gt 50 ]]; then
            display_name="...${display_name: -47}"
        fi

        echo -e "  ${BOLD}${num}${RESET}. ${CYAN}${display_name}${RESET} (${mod_date})"
        ((num++))
    done <<<"$recent_files"

    # Prompt for file selection
    echo
    echo -e "Enter the ${BOLD}number${RESET} of the file to use (1-$((num - 1))) or 'q' to quit:"
    read -r selection

    if [[ "$selection" == "q" ]]; then
        echo -e "${YELLOW}Operation cancelled.${RESET}"
        exit 0
    fi

    if [[ "$selection" =~ ^[0-9]+$ ]] && [[ "$selection" -ge 1 ]] && [[ "$selection" -lt "$num" ]]; then
        MARKDOWN_FILE="${file_list[$selection]}"
        echo -e "Selected file: ${CYAN}${MARKDOWN_FILE}${RESET}"
    else
        echo -e "${RED}Invalid selection. Please run the script again.${RESET}"
        exit 1
    fi
}

# Function to prompt for commit type
prompt_commit_type() {
    if [[ -z "$COMMIT_TYPE" ]]; then
        echo -e "\n${BOLD}Commit type:${RESET}"
        echo -e "  1. ${BOLD}feat${RESET}     - A new feature"
        echo -e "  2. ${BOLD}fix${RESET}      - A bug fix"
        echo -e "  3. ${BOLD}docs${RESET}     - Documentation changes"
        echo -e "  4. ${BOLD}style${RESET}    - Code style changes (formatting, semicolons)"
        echo -e "  5. ${BOLD}refactor${RESET} - Code changes that neither fix bugs nor add features"
        echo -e "  6. ${BOLD}perf${RESET}     - Performance improvements"
        echo -e "  7. ${BOLD}test${RESET}     - Adding or correcting tests"
        echo -e "  8. ${BOLD}chore${RESET}    - Changes to the build process, tools, etc."
        echo -e "  9. ${BOLD}ci${RESET}       - Changes to CI configuration files and scripts"

        echo -e "\nEnter the ${BOLD}number${RESET} or ${BOLD}name${RESET} of the commit type (default: ${DEFAULT_COMMIT_TYPE}):"
        read -r type_selection

        case "$type_selection" in
        1 | feat) COMMIT_TYPE="feat" ;;
        2 | fix) COMMIT_TYPE="fix" ;;
        3 | docs) COMMIT_TYPE="docs" ;;
        4 | style) COMMIT_TYPE="style" ;;
        5 | refactor) COMMIT_TYPE="refactor" ;;
        6 | perf) COMMIT_TYPE="perf" ;;
        7 | test) COMMIT_TYPE="test" ;;
        8 | chore) COMMIT_TYPE="chore" ;;
        9 | ci) COMMIT_TYPE="ci" ;;
        "") COMMIT_TYPE="$DEFAULT_COMMIT_TYPE" ;;
        *)
            if [[ "$type_selection" =~ ^(feat|fix|docs|style|refactor|perf|test|chore|ci)$ ]]; then
                COMMIT_TYPE="$type_selection"
            else
                echo -e "${YELLOW}Invalid selection. Using default: ${DEFAULT_COMMIT_TYPE}${RESET}"
                COMMIT_TYPE="$DEFAULT_COMMIT_TYPE"
            fi
            ;;
        esac
    fi

    echo -e "Commit type: ${CYAN}${COMMIT_TYPE}${RESET}"
}

# Function to suggest a scope from the file path
suggest_scope() {
    local file_path="$1"
    local suggested_scope="$DEFAULT_COMMIT_SCOPE"

    # Extract potential scope from directory structure
    if [[ "$file_path" == *"/"* ]]; then
        local dir_part=$(dirname "$file_path")

        # Remove common prefixes that don't indicate a specific scope
        dir_part=$(echo "$dir_part" | sed -E 's/^\.\///; s/^(src|app|lib|packages)\///')

        # Get the first component of the path
        suggested_scope=$(echo "$dir_part" | cut -d'/' -f1)

        # If scope is a common top-level directory that doesn't indicate a specific scope, use the second component
        if [[ "$suggested_scope" =~ ^(components|modules|services|utils|helpers)$ ]] && [[ "$dir_part" == *"/"* ]]; then
            suggested_scope=$(echo "$dir_part" | cut -d'/' -f2)
        fi
    fi

    # If filename is README.md or index.*, try to use parent directory
    filename=$(basename "$file_path")
    if [[ "$filename" == "README.md" || "$filename" =~ ^index\. ]]; then
        local dir_name=$(basename "$(dirname "$file_path")")
        if [[ "$dir_name" != "." ]]; then
            suggested_scope="$dir_name"
        fi
    fi

    # Remove file extension for scope derived from filename
    suggested_scope="${suggested_scope%%.*}"

    # If scope is still empty or common names like "src", use default
    if [[ -z "$suggested_scope" || "$suggested_scope" == "." || "$suggested_scope" =~ ^(src|app|lib|packages)$ ]]; then
        suggested_scope="$DEFAULT_COMMIT_SCOPE"
    fi

    echo "$suggested_scope"
}

# Function to prompt for commit scope
prompt_commit_scope() {
    if [[ -z "$COMMIT_SCOPE" ]]; then
        # Get suggestion
        suggested_scope=$(suggest_scope "$MARKDOWN_FILE")

        echo -e "\n${BOLD}Commit scope:${RESET}"
        echo -e "Enter the scope of the commit (suggested: ${CYAN}${suggested_scope}${RESET}):"
        read -r scope_input

        if [[ -z "$scope_input" ]]; then
            COMMIT_SCOPE="$suggested_scope"
        else
            COMMIT_SCOPE="$scope_input"
        fi
    fi

    echo -e "Commit scope: ${CYAN}${COMMIT_SCOPE}${RESET}"
}

# Function to extract title from document
extract_title() {
    local file="$1"

    # Try to find the first heading (# Title)
    title=$(grep -m 1 "^# " "$file" | sed 's/^# //')

    # If no title found, try second level heading
    if [[ -z "$title" ]]; then
        title=$(grep -m 1 "^## " "$file" | sed 's/^## //')
    fi

    # If still no title, use filename without extension
    if [[ -z "$title" ]]; then
        title=$(basename "$file" | sed 's/\.[^.]*$//')
        title=$(echo "$title" | sed 's/-/ /g; s/_/ /g') # Replace hyphens and underscores with spaces
        title=$(echo "$title" | sed 's/\b\(.\)/\u\1/g') # Capitalize first letter of each word
    fi

    echo "$title"
}

# Function to extract bullet points from document
extract_bullet_points() {
    local file="$1"
    local bullets=""

    # Look for sections that might contain changes
    for section in "Changes" "Features" "What's New" "Updates" "Improvements" "Fixes" "Fixed"; do
        section_start=$(grep -n "^##* $section" "$file" | cut -d':' -f1)

        if [[ -n "$section_start" ]]; then
            # Find the next heading or the end of the file
            next_heading=$(tail -n +"$section_start" "$file" | grep -n "^##* " | head -1 | cut -d':' -f1)

            if [[ -n "$next_heading" ]]; then
                # Calculate the line number of the next heading
                next_heading=$((section_start + next_heading - 1))
                # Extract lines between section start and next heading
                section_content=$(sed -n "$((section_start + 1)),$((next_heading - 1))p" "$file")
            else
                # Extract lines from section start to the end of the file
                section_content=$(sed -n "$((section_start + 1)),\$p" "$file")
            fi

            # Extract bullet points from the section content
            section_bullets=$(echo "$section_content" | grep -E '^ *[-*+] ')

            if [[ -n "$section_bullets" ]]; then
                bullets+="$section_bullets"$'\n'
            fi
        fi
    done

    # If no bullet points found in specific sections, look for any bullet points
    if [[ -z "$bullets" ]]; then
        bullets=$(grep -E '^ *[-*+] ' "$file")
    fi

    # Clean up bullets
    bullets=$(echo "$bullets" | sed -E 's/^ *[-*+] /- /') # Standardize bullet point format
    bullets=$(echo "$bullets" | grep -v "^$")             # Remove empty lines

    echo "$bullets"
}

# Function to extract a summary from the document
extract_summary() {
    local file="$1"
    local summary=""

    # Look for paragraphs after the title
    title_line=$(grep -n "^# " "$file" | head -1 | cut -d':' -f1)

    if [[ -n "$title_line" ]]; then
        # Look for the first paragraph after the title
        summary=$(sed -n "$((title_line + 1)),+5p" "$file" | grep -v "^$" | grep -v "^#" | grep -v "^[-*+]" | head -3)
    fi

    # If no summary found after title, look for paragraphs after "Summary" or "Overview" section
    if [[ -z "$summary" ]]; then
        for section in "Summary" "Overview" "Description"; do
            section_line=$(grep -n "^##* $section" "$file" | head -1 | cut -d':' -f1)

            if [[ -n "$section_line" ]]; then
                summary=$(sed -n "$((section_line + 1)),+5p" "$file" | grep -v "^$" | grep -v "^#" | grep -v "^[-*+]" | head -3)
                break
            fi
        done
    fi

    # If still no summary, grab the first paragraph
    if [[ -z "$summary" ]]; then
        summary=$(grep -v "^$" "$file" | grep -v "^#" | grep -v "^[-*+]" | head -3)
    fi

    echo "$summary"
}

# Function to generate commit message
generate_commit_message() {
    local file="$1"
    local commit_type="$2"
    local commit_scope="$3"

    echo -e "\n${BLUE}Analyzing document...${RESET}"

    # Extract components for commit message
    title=$(extract_title "$file")
    bullet_points=$(extract_bullet_points "$file")
    summary=$(extract_summary "$file")

    # Generate first line of commit message
    commit_message="${commit_type}(${commit_scope}): ${title}"

    # Add bullet points
    if [[ -n "$bullet_points" ]]; then
        commit_message+="\n\n${bullet_points}"
    fi

    # Add summary
    if [[ -n "$summary" ]]; then
        commit_message+="\n\n${summary}"
    fi

    echo -e "\n${GREEN}Generated commit message:${RESET}"
    echo -e "${commit_message}"

    # Save to temporary file for editing
    temp_file=$(mktemp)
    echo -e "$commit_message" >"$temp_file"

    # Ask if user wants to edit the message
    echo -e "\n${BOLD}Do you want to edit this message? (y/n)${RESET}"
    read -r edit_response

    if [[ "$edit_response" =~ ^[Yy] ]]; then
        # Use default editor or fall back to vim
        ${EDITOR:-vim} "$temp_file"
        echo -e "\n${GREEN}Updated commit message:${RESET}"
        cat "$temp_file"
    fi

    # Return the commit message
    cat "$temp_file"
    rm "$temp_file"
}

# Function to perform the commit
do_commit() {
    local commit_message="$1"

    echo -e "\n${BOLD}Do you want to:${RESET}"
    echo -e "  1. ${BOLD}Commit${RESET} the current changes"
    echo -e "  2. ${BOLD}Commit${RESET} changes to the markdown file only"
    echo -e "  3. ${BOLD}Show${RESET} the git status first"
    echo -e "  4. ${BOLD}Cancel${RESET}"
    read -r commit_action

    case "$commit_action" in
    1)
        echo -e "\n${BLUE}Committing all changes...${RESET}"
        echo -e "$commit_message" | git commit -F -
        ;;
    2)
        echo -e "\n${BLUE}Committing changes to ${MARKDOWN_FILE} only...${RESET}"
        git add "$MARKDOWN_FILE"
        echo -e "$commit_message" | git commit -F -
        ;;
    3)
        echo -e "\n${BLUE}Current git status:${RESET}"
        git status
        echo -e "\n${BOLD}Do you want to commit now? (y/n)${RESET}"
        read -r do_commit_response
        if [[ "$do_commit_response" =~ ^[Yy] ]]; then
            echo -e "\n${BLUE}Committing changes...${RESET}"
            echo -e "$commit_message" | git commit -F -
        else
            echo -e "${YELLOW}Commit cancelled.${RESET}"
            exit 0
        fi
        ;;
    4 | *)
        echo -e "${YELLOW}Commit cancelled.${RESET}"
        exit 0
        ;;
    esac

    # Ask if user wants to push
    echo -e "\n${BOLD}Do you want to push these changes? (y/n)${RESET}"
    read -r push_response

    if [[ "$push_response" =~ ^[Yy] ]]; then
        echo -e "\n${BLUE}Pushing changes...${RESET}"
        git push
    fi
}

# Main script execution
echo -e "${BOLD}Commit From Document${RESET}"
echo -e "Generate structured Git commit messages from markdown files\n"

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository.${RESET}"
    exit 1
fi

# If no file provided, find recent markdown files
if [[ -z "$MARKDOWN_FILE" ]]; then
    find_recent_markdown_files
fi

# Check if file exists
if [[ ! -f "$MARKDOWN_FILE" ]]; then
    echo -e "${RED}Error: File not found - ${MARKDOWN_FILE}${RESET}"
    exit 1
fi

# Prompt for commit type and scope
prompt_commit_type
prompt_commit_scope

# Generate commit message
commit_message=$(generate_commit_message "$MARKDOWN_FILE" "$COMMIT_TYPE" "$COMMIT_SCOPE")

# Perform commit
do_commit "$commit_message"

echo -e "\n${GREEN}Done!${RESET}"
