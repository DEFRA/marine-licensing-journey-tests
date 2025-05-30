# Marine Licensing Journey Tests - Cursor Configuration

This directory contains configuration and utilities for Cursor AI assistance with the marine licensing journey tests codebase.

## Directory Structure

- **`rules/`**: Contains guidelines and standards for working with this codebase
  - **`rules/summaries/`**: Optimised summaries of rules for efficient context window usage
- **`user-stories/`**: User stories and requirements used for test coverage
- **`cursor.rules.json`**: Index of rules with metadata for efficient loading
- **`fetch_rule.js`**: Utility for progressive rule loading
- **`generate_summaries.js`**: Script to create standardised rule summaries
- **`mcp.json`**: Configuration for Model Context Protocol servers

## Key Features

### Context Window Optimisation

We use a progressive loading approach for rules to maximise context window efficiency:

1. **Metadata-first**: Rules are initially loaded as metadata only
2. **Summaries**: Standardised summaries provide key information with ~85% fewer tokens
3. **Full content**: Complete rule content is loaded only when specific details are needed

For more information, see [RULES-OPTIMISATION.md](./RULES-OPTIMISATION.md) and the current implementation status in [IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md).

## Usage

### Finding Relevant Rules

The `cursor.rules.json` file contains rich metadata for all rules including:

- Categories (testing, documentation, code quality, etc.)
- Priority levels (high, medium, low)
- Tags for semantic matching
- Short summaries
- Complexity indicators

It also defines rule bundles for common scenarios like:

- `new_feature_development`
- `documentation_updates`
- `test_creation`
- `code_refactoring`
- `domain_understanding`

### Using Optimised Rule Summaries

Rule summaries follow a consistent format:

```
# Rule Title

## Core Principle
1-2 sentence explanation

## When to Apply
- Bullet list of scenarios

## Key Guidelines
1. **Guideline 1** - Brief explanation
...

## Examples
| Scenario | Application |
|----------|------------|
...

## Related Rules
- [related-rule-1](../related-rule-1.mdc) - How it relates
...
```

For full documentation, see [rules/README.md](./rules/README.md).

### Model Context Protocol Integration

This project includes MCP (Model Context Protocol) server configuration for enhanced AI functionality:

- Sequential thinking for complex problem-solving
- Progressive rule loading for context efficiency
- Additional MCP servers can be configured in `mcp.json`

For MCP server design documentation, see [MCP-SERVER-DESIGN.md](./MCP-SERVER-DESIGN.md).
