# Marine Licensing Journey Tests - Cursor Configuration

This directory contains configuration and utilities for Cursor AI assistance with the marine licensing journey tests codebase.

## Directory Structure

- **`rules/`**: Contains guidelines and standards for working with this codebase
- **`user-stories/`**: User stories and requirements used for test coverage
- **`cursor.rules.json`**: Index of rules with metadata for efficient loading
- **`fetch_rule.js`**: Utility for progressive rule loading
- **`generate_summaries.js`**: Script to create standardised rule summaries
- **`mcp.json`**: Configuration for Model Context Protocol servers
- **`add_these_rules_to_cursor.txt`**: Instructions for adding updated rules to Cursor
- **`examples.md`**: Comprehensive examples of rule application for different scenarios

## Core Principles

- **Simple beats clever** - Write the simplest code that works
- **YAGNI** (You Aren't Gonna Need It) - Don't build features "just in case"
- **Check actual usage first** - Verify what's actually used before making changes
- **Match documentation to reality** - Document what exists, not what you wish existed
- **Test code is still code** - Apply the same quality principles to test code as production code

## Rule Application

See [examples.md](./examples.md) for practical examples of user prompts and which rules to apply in different scenarios.

We use a progressive loading approach to maximise the efficiency of the context window:

1. **Metadata-first**: Rules are initially loaded as metadata only (from cursor.rules.json)
2. **Summaries**: Standardised summaries in the `summaries/` directory provide key information with ~85% fewer tokens
3. **Full content**: Complete rule content is loaded only when specific details are needed

For more information, see [RULES-OPTIMISATION.md](./RULES-OPTIMISATION.md).

## When to Use Which Rules

| Task                             | Recommended Rules                                                 |
| -------------------------------- | ----------------------------------------------------------------- |
| Planning testing approach        | `test-strategy.integration`, `test-strategy`                      |
| Writing any code                 | `stop.overengineering.and.making.stuff.up`, `code.generation`     |
| Refactoring code                 | `playbook.refactoring`, `import.dependency.management`            |
| Writing documentation            | `documentation.coherence`, `documentation.progressive-disclosure` |
| Using AI assistance              | `responsible.ai.use`                                              |
| Debugging test failures          | `test.error.handling`, `test.execution.patience`                  |
| Understanding users              | `personas`, `application.under.test`                              |
| Conducting investigative testing | `scenario-testing`, `test-charters`                               |

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
- `risk_focused_testing`
- `automation_efficiency`
- `cursor_efficiency`

### Rule Updates and Additions

See `add_these_rules_to_cursor.txt` for instructions on adding updated rules focused on:

- Risk-based testing that identifies threats to product value
- Code readability for non-technical stakeholders
- Automation ROI evaluation
- Efficient LLM token usage with rule bundles

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

### Useful zsh aliases to implement

```
alias testrunonly='npm run test:local -- --cucumberOpts.tags "@run-only"'
alias testrunall='npm run test:local'
```
