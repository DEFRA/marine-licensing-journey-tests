# Refactoring Playbook

## Core Principle

Methodologies for safe, incremental code refactoring that improves structure while maintaining functionality and reducing risk.

## When to Apply

- refactoring code

## Key Guidelines

1. ** is improving the design of existing code without changing its behaviour. ** -Refuctoring\*\* is changing existing code whilst inadvertently altering the program's behaviour - essentially breaking the code.
2. **\*Critical Requirements for** - True Refactoring:\*\*
3. **Preserve behaviour** -: The code must function identically after changes
4. **Improve design** -: Changes must objectively make the code easier to understand or maintain
5. **Validate thoroughly** -: Every refactoring must be verified to ensure no behaviour changes

## Examples

| Scenario        | Application                          |
| --------------- | ------------------------------------ |
| Domain-specific | Application matches real-world usage |

## Related Rules

- [code.generation](../code.generation.mdc) - Standards for writing maintainable JavaScript test automation code, including patterns, practices, and framework-specific guidance
- [import.dependency.management](../import.dependency.management.mdc) - Best practices for managing import dependencies during code refactoring, with focus on maintaining module integrity and preventing circular dependencies
- [playbook.clean.code](../playbook.clean.code.mdc) - Guidelines for maintaining clean, readable, and maintainable code, including identification and remediation of common code smells
