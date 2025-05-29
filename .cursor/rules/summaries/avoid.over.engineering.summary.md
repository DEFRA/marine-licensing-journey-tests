# Avoid Over-Engineering in Test Code

## Core Principle

Start with the minimal viable implementation and only add complexity when there's a clear, immediate need. Follow YAGNI (You Aren't Gonna Need It) principles to prevent creating elaborate test infrastructure that ultimately goes unused.

## When to Apply

- Creating test data models or factories
- Developing test utilities or helpers
- Writing shared test infrastructure
- Refactoring existing test code
- Reviewing test code PRs

## Key Guidelines

1. **Start simple, grow as needed** - Begin with minimal implementation, adding complexity only when required
2. **Check actual usage first** - Verify what's actually used before building new infrastructure
3. **Delete unused code** - Remove methods, options, and scenarios that aren't being used
4. **Simplify complexity** - Replace complex options with simple, focused methods
5. **Standardize APIs** - Use consistent parameter types and naming conventions across similar classes

## Examples

| Over-Engineered                                 | Simplified                                             |
| ----------------------------------------------- | ------------------------------------------------------ |
| Complex data model with many generation methods | Simple model with only what's needed for current tests |
| Dozens of static factory methods                | Few focused factory methods for actual test scenarios  |
| Deep inheritance hierarchies                    | Flat, simple object structures                         |
| Comprehensive validation logic                  | Minimal validation focused on test requirements        |

## Related Rules

- [stop.overengineering.and.making.stuff.up](../stop.overengineering.and.making.stuff.up.mdc) - Broader principles for avoiding unnecessary complexity
- [playbook.clean.code](../playbook.clean.code.mdc) - Guidelines for maintaining clean, readable code
- [playbook.refactoring](../playbook.refactoring.mdc) - Safe approaches to improving code structure
