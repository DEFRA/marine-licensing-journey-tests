# Marine Licensing User Personas

## Core Principle

References established personas from the documentation directory to ensure consistent user representation across testing activities.

## When to Apply

- designing user-focused tests
- creating realistic test scenarios
- understanding user needs and constraints
- planning persona-driven testing approaches

## Key Guidelines

1. **Use Established Personas** - Reference the official personas in documentation/personas/ directory
2. **Apply Consistent User Types** - Use Fatima (Case Officer), Simon (Marine Officer), Amy (Veteran) and Zofia (Novice)
3. **Consider User Context** - Incorporate realistic pressures, goals, and limitations from persona definitions
4. **Address Varied User Needs** - Test for different digital skills, domain knowledge, and process familiarity
5. **Apply Throughout Testing** - Use personas in automated tests, exploratory sessions, and acceptance criteria

## Examples

| Scenario              | Application                                                          |
| --------------------- | -------------------------------------------------------------------- |
| First-time user       | Use Zofia's journey for testing plain language and guidance features |
| Experienced user      | Apply Amy's efficiency needs to test streamlined workflows           |
| Internal staff        | Test Fatima's support workflows and Simon's compliance verification  |
| Accessibility testing | Consider varied digital skills across all personas                   |

## Related Rules

- [scenario-testing](../scenario-testing.mdc) - Using personas in Bolton's framework for authentic scenarios
- [test-charters](../test-charters.mdc) - Integrating personas into investigative testing sessions
- [application.under.test](../application.under.test.mdc) - Domain context for the personas to operate in
