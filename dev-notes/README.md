# Developer Notes

This directory contains documentation, notes, and resources that are intended **only for the development team**.

## Purpose

- Private development notes
- Internal documentation
- Design sketches and mockups
- Meeting notes
- Technical decisions and architectural considerations
- Todo lists and project planning
- Any other content that should not be visible to clients

## Important

This directory is excluded from the client repository via `.gitignore` when running `git clientview`, ensuring that these notes never appear in the public repository.

## How It Works

1. Add any developer-only files to this directory
2. They will be committed to the development repository (`dev-bevarena-one`)
3. They will be automatically excluded from the client repository (`bevarena-one`)
4. This folder is specifically ignored in the clean-for-client.sh script

## Guidelines

- Do not store sensitive credentials here (use environment variables instead)
- Maintain a clear organization structure as the project grows
- Keep client-facing documentation in the main `/doc` directory
