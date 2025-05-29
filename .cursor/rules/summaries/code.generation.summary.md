# Rules to follow when generating code

## Core Principle

Standards for writing maintainable JavaScript test automation code, including patterns, practices, and framework-specific guidance.

## When to Apply

- writing any code

## Key Guidelines

1. **No TypeScript** - - this is a rule that is imposed centrally and not currently open to discussion
2. **No JSDocs** - - Code should be expressive and self documenting. Creating JSDocs for new code generates inconsistency. This documentation quickly goes out of date and becomes misleading.
3. **No code comments** - - code should be expressive and self documenting. In exceptional circumstances, use a comment for complex business logic or non-obvious workarounds.
4. **No cheesy acronyms** - - Avoid forced acronyms and mnemonics in documentation or testing guidance. Use straightforward, practical language instead of trying to be clever with acronyms like "MARINE" or "EXEMPTION" heuristics.

## Examples

| Scenario         | Application                       |
| ---------------- | --------------------------------- |
| Typical use case | How to apply the rule effectively |

## Related Rules

- [import.dependency.management](../import.dependency.management.mdc) - Best practices for managing import dependencies during code refactoring, with focus on maintaining module integrity and preventing circular dependencies
- [playbook.clean.code](../playbook.clean.code.mdc) - Guidelines for maintaining clean, readable, and maintainable code, including identification and remediation of common code smells
- [playbook.refactoring](../playbook.refactoring.mdc) - Methodologies for safe, incremental code refactoring that improves structure while maintaining functionality and reducing risk
