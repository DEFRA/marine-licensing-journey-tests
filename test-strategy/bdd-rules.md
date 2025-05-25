# BDD Guidelines for Marine Licensing Tests

## Core Principles

- **Golden Rule**: Write Gherkin so people unfamiliar with marine licensing will understand it
- **Cardinal Rule**: One Scenario, One Behaviour
- **Structure**: Always use Given-When-Then in that order, no repetition
- **Brevity**: Keep scenarios under 10 steps
- **Step Integrity**: Given = setup, When = action, Then = verification

## Marine Licensing Example

```gherkin
@issue=ML-1 @issue=ML-9
Feature: Starting a new exemption notification by providing a project name

  Scenario: Provide a valid project name for a new exemption notification
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed

  Scenario: Allowing information to be added to the public register
    Given the Public register page is displayed
    When choosing not to withhold information from the public register
    Then the "Public register" task status is "Completed"
    And the public register information is saved
```

### Step Patterns

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

## Implementation Mapping

**BDD → Screenplay Pattern:**

- **Given** → Setup tasks
- **When** → User **Tasks**
- **Then** → **Interactions** with `ensure` prefix

### Real Step Definition Examples

```javascript
// Given step - Setup context
Given('the project name page is displayed', async function () {
  await this.actor.attemptsTo(ApplyForExemption.where(ProjectNamePage.url))
})

// When step - User action
When('entering and saving a project with a valid name', async function () {
  await this.actor.attemptsTo(CompleteProjectName.with('My Project'))
})

// Then step - Verification
Then('the task list page is displayed', async function () {
  await this.actor.attemptsTo(EnsureThatPageHeading.is('My Project'))
})
```

## Quality Standards

✅ Title clearly describes business value

✅ Steps follow Given-When-Then order

✅ Each scenario tests one specific behaviour

✅ Language accessible to domain experts

✅ Realistic marine licensing context

✅ Covers important user journeys from personas

## Common Patterns

- **Notification workflows** - Complete exemption submission processes
- **Public register interactions** - Search and view exemption information
- **Compliance verification** - Environmental and regulatory checks
- **Multi-stakeholder flows** - Applicant, MMO, and public interactions

---

_Files: Features in `test/features/`, steps in `test/steps/`, screenplay in `test-infrastructure/screenplay/`_

_Attribution: Inspired by [AutomationPanda.com](https://automationpanda.com) BDD guidance_
