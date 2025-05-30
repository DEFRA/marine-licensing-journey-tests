# BDD guidelines for marine licensing tests

## Core principles

- **Golden rule**: Write Gherkin so people unfamiliar with marine licensing will understand it
- **Cardinal rule**: One scenario, one behaviour
- **Structure**: Always use Given-When-Then in that order, no repetition
- **Brevity**: Keep scenarios under 5 steps, only have more than 3 in exceptional circumstances
- **Step integrity**: Given = setup, When = action, Then = verification
- **Business value**: Titles clearly describe the business value being delivered
- **Domain context**: Use realistic marine licensing terminology and workflows
- **User-centred**: Cover important journeys from personas (Zofia, Amy, Fatima)
- **Test smart, not everything**: Prioritise scenarios based on risk and value, not completeness

## Test prioritisation

### High priority

- Complex user journeys with multiple steps
- Business-critical validations and edge cases
- Scenarios with high risk of defects
- Back/cancel tests that verify important state changes or preservation
- Navigation scenarios that affect data persistence

### Low priority

- Basic page display tests when pages are traversed in other scenarios
- Simple navigational tests with limited business logic
- Scenarios that are implicitly tested through other flows
- Navigation tests without state change verification

## Implicit vs. explicit testing

- **Implicit testing**: When features are indirectly verified through other test flows

  - Example: If a page display is verified as part of a validation scenario, a separate "page display" scenario is unnecessary
  - Page transitions are implicitly tested in user journey scenarios

- **Explicit testing**: Specifically testing a feature as the primary focus
  - Validation scenarios should be explicit tests
  - Complex business rules require explicit verification
  - State preservation/change during navigation requires explicit tests

## Marine licensing example

```gherkin
@issue=ML-1 @issue=ML-9
Feature: Starting a new exemption notification by providing a project name

  Scenario: Provide a valid project name for a new exemption notification
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed

  Scenario: Validating project name input
    Given the project name page is displayed
    When entering an invalid project name
    Then appropriate validation errors are displayed

  Scenario: Allowing information to be added to the public register
    Given the Public register page is displayed
    When choosing not to withhold information from the public register
    Then the "Public register" task status is "Completed"
    And the public register information is saved

  Scenario: Validating public register consent
    Given the Public register page is displayed
    When attempting to proceed without making a selection
    Then appropriate validation errors are displayed
```

### Step patterns

```gherkin
# Context setup
Given the project name page is displayed
Given a notification has been created with a valid project name
Given the Public register task has been completed with consent

# User actions
When entering and saving a project with a valid name
When choosing not to withhold information from the public register
When the "Public register" task is selected

# Outcomes
Then the task list page is displayed
Then the "Public register" task status is "Completed"
Then the project name is displayed on the Public register page
```

## Common patterns

- **Notification workflows** - Complete exemption submission processes
- **Public register interactions** - Search and view exemption information
- **Compliance verification** - Environmental and regulatory checks
- **Multi-stakeholder flows** - Applicant, MMO, and public interactions

## Feature organisation

To maintain separation of concerns, we organise feature files by test type:

- **Standard journey features** (`*.feature`) - Happy path user flows and core functionality
- **Validation features** (`validation.*.feature`) - Error validation scenarios
- **Back and cancel features** (`back.and.cancel.*.feature`) - Navigation behaviour when users go back or cancel

This structure ensures scenarios have a single responsibility and makes it easier to locate specific types of tests.

---

_Files: Features in `test/features/`, steps in `test/steps/`, screenplay in `test-infrastructure/screenplay/`_

_Attribution: Inspired by [AutomationPanda.com](https://automationpanda.com) BDD guidance_
