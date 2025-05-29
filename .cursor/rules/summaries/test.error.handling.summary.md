# Test Error Handling

## Core Principle

Best practices for implementing error handling in tests, focusing on proper assertions and meaningful failure messages.

## When to Apply

- implementing error handling in tests

## Key Guidelines

1. **Don't** -: `throw new Error('Something went wrong')`
2. **Do** -: `expect.fail('Something went wrong')`
3. **Why** -: Test frameworks need proper assertion failures, not generic exceptions
4. **Chai assertions** -: `expect.fail(message)` for validation failures
5. **Clear messages** -: Provide descriptive failure messages that help debugging

## Examples

| Scenario     | Application                  |
| ------------ | ---------------------------- |
| Code example | Follows established patterns |

## Related Rules

- [bdd.rules](../bdd.rules.mdc) - Guidelines for writing effective BDD feature files and Gherkin scenarios that align with acceptance criteria and capture clear test scenarios
- [htsm](../htsm.mdc) - Implementation of the Heuristic Test Strategy Model for systematic test planning, discovery, and risk-based coverage analysis
- [scenario-testing](../scenario-testing.mdc) - Framework for creating realistic, scenario-based tests that simulate authentic user conditions, pressures, and goals
