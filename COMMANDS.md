# Useful Commands for Marine Licensing Journey Tests

This document outlines the most commonly used commands for working with the marine licensing journey tests project. These commands are configured in your environment and are optimised for use with zsh.

## Test Execution Commands

### Running Tests

```bash
# Run only tests tagged with @run-only
testrunonly

# Run all tests
testrunall
```

## Code Quality and Formatting

```bash
# Format all files using Prettier
pretty

# Run Allure report server (when needed)
allure serve allure-results

# Kill any running Allure Java processes
kill_allure_java
```

## Docker Commands

```bash
# Build and start Docker containers
dcub  # Alias for 'docker compose up --build'
```

## Git Commands

```bash
# Delete all local branches except main
gitdelalllocal

# Common Git Operations
git status              # Check repository status
git pull               # Pull latest changes
git checkout -b <name>  # Create and switch to new branch
```

## Browser and Process Management

```bash
# Kill Chrome instances (useful when tests leave hanging processes)
killchrome
```

## Environment Information

- Shell: zsh with Oh My Zsh
- Theme: robbyrussell
- Active Plugins: git, kollzsh, aliases, docker, docker-compose, fzf, git-commit, history, localstack, macos, node, npm, nvm, sublime

## Development Tools

```bash
# Edit zsh configuration
editzsh  # Opens .zshrc in Sublime Text

# Python-related
python  # Alias for python3
```

## Notes

- The environment is configured for Node.js development using nvm
- Docker and Docker Compose are available for container management
- Prettier is configured for code formatting
- Allure is used for test reporting

## Useful Oh My Zsh Features

- Git plugin provides many shortcuts for common git commands
- Docker and Docker Compose plugins provide command completion
- FZF plugin enables fuzzy finding in command history
- Node/NPM plugins provide completion for Node.js commands

Remember to run `source ~/.zshrc` after making any changes to your zsh configuration.
