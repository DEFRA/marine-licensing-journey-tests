# Test Execution Patience

## Core Principle

Guidelines for handling timing-related issues in tests through appropriate wait mechanisms and stability enhancements.

## When to Apply

- handling timing issues in tests

## Key Guidelines

1. **ALWAYS wait patiently** - for test execution to complete
2. **End-to-end tests take** - time - do not assume there's no output if results don't appear immediately
3. **`npm run test:local`** - works fine but requires patience as these are full browser automation tests
4. **Test suites can** - take several minutes to complete
5. **Do not assume** - tests failed if output doesn't appear immediately

## Examples

| Scenario         | Application                       |
| ---------------- | --------------------------------- |
| Typical use case | How to apply the rule effectively |

## Related Rules

- [bdd.rules](../bdd.rules.mdc) - Guidelines for writing effective BDD feature files and Gherkin scenarios that align with acceptance criteria and capture clear test scenarios
- [htsm](../htsm.mdc) - Implementation of the Heuristic Test Strategy Model for systematic test planning, discovery, and risk-based coverage analysis
- [scenario-testing](../scenario-testing.mdc) - Framework for creating realistic, scenario-based tests that simulate authentic user conditions, pressures, and goals
