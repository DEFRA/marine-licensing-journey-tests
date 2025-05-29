# Screenplay Pattern Standards

## Core Principle

Implementation guide for the Screenplay Pattern, structuring test automation around actors, tasks, and interactions for maintainable user-centric tests.

## When to Apply

- implementing the screenplay pattern

## Key Guidelines

1. **`actor.js` - Represents** - the user performing actions in the test
2. **Uses abilities to** - interact with the system (for example interacting with a web app using wdio or calling an api using an http client)
3. **Can remember and** - recall information using memory
4. **Performs tasks and** - interactions
5. **`abilities/` - What** - the actor can do

## Examples

| Scenario     | Application                  |
| ------------ | ---------------------------- |
| Code example | Follows established patterns |

## Related Rules

- [bdd.rules](../bdd.rules.mdc) - Guidelines for writing effective BDD feature files and Gherkin scenarios that align with acceptance criteria and capture clear test scenarios
- [code.generation](../code.generation.mdc) - Standards for writing maintainable JavaScript test automation code, including patterns, practices, and framework-specific guidance
- [htsm](../htsm.mdc) - Implementation of the Heuristic Test Strategy Model for systematic test planning, discovery, and risk-based coverage analysis
