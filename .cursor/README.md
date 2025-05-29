# Marine Licensing Journey Tests - Cursor Configuration

This directory contains configuration and utilities for Cursor AI assistance with the marine licensing journey tests codebase.

## Directory Structure

- **`rules/`**: Contains guidelines and standards for working with this codebase
  - **`rules/summaries/`**: Optimized summaries of rules for efficient context window usage
- **`user-stories/`**: User stories and requirements used for test coverage
- **`cursor.rules.json`**: Index of rules with metadata for efficient loading
- **`fetch_rule.js`**: Utility for progressive rule loading
- **`generate_summaries.js`**: Script to create standardized rule summaries

## Key Features

### Context Window Optimization

We use a progressive loading approach for rules to maximize context window efficiency:

1. **Metadata-first**: Rules are initially loaded as metadata only
2. **Summaries**: Standardized summaries provide key information with ~85% fewer tokens
3. **Full content**: Complete rule content is loaded only when specific details are needed

For more information, see [RULES-OPTIMIZATION.md](./RULES-OPTIMIZATION.md) and the current implementation status in [IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md).

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

### Using Optimized Rule Summaries

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
