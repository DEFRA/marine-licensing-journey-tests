# URL and Hyperlink Management During Refactoring

## Core Principle

Practices for maintaining link integrity in documentation during refactoring, ensuring cross-references remain valid across changes.

## When to Apply

- refactoring documentation with links

## Key Guidelines

1. **Safe URL Refactoring** - Practices
2. **Isolate URL changes** -: Handle URL updates separately from code refactoring
3. **Use precise selectors** -: Target specific occurrences rather than broad patterns
4. **Exclude URL patterns** -: Add URL regex exclusions to find/replace operations
5. **Version control check** -: Review diffs specifically for unintended URL changes

## Examples

| Scenario        | Application                          |
| --------------- | ------------------------------------ |
| Domain-specific | Application matches real-world usage |

## Related Rules

- [dangerous.url.commands](../dangerous.url.commands.mdc) - Warnings and guidelines for commands that could accidentally break URLs in documentation, with safe alternatives for common operations
- [documentation.coherence](../documentation.coherence.mdc) - Principles for maintaining coherent documentation with consistent terminology, proper cross-references, and logical structure
- [documentation.progressive-disclosure](../documentation.progressive-disclosure.mdc) - Methods for organizing complex information using progressive disclosure principles to improve readability and comprehension
