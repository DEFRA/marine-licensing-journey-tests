# BDD Guidelines for Marine Licensing Tests

## Core Principles

- **Golden Rule**: Write Gherkin so people unfamiliar with marine licensing will understand it
- **Cardinal Rule**: One Scenario, One Behaviour
- **Structure**: Always use Given-When-Then in that order, no repetition
- **Brevity**: Keep scenarios under 10 steps
- **Step Integrity**: Given = setup, When = action, Then = verification

## Marine Licensing Example

```gherkin
Feature: Exemption Notification Submission

Scenario: Applicant submits valid exemption notification
  Given I am a marina operator with a valid marine licence
  When I submit an exemption notification for maintenance dredging
  Then I should receive a confirmation with reference number
  And the exemption should appear on the public register
```

### Step Patterns

```gherkin
# Context setup
Given I am a [persona] with [licence type]
Given the exemption register contains [existing exemptions]

# User actions
When I submit an exemption notification for [activity type]
When I search the public register for [search criteria]

# Outcomes
Then I should receive confirmation within [timeframe]
Then the exemption should appear on the public register
```

## Implementation Mapping

**BDD → Screenplay Pattern:**

- **Given** → Setup tasks
- **When** → User **Tasks**
- **Then** → **Interactions** with `ensure` prefix

```gherkin
Given I am a marina operator with a valid marine licence
# → SetupUserWithLicence.task()

When I submit an exemption notification for maintenance dredging
# → SubmitExemptionNotification.forMaintenanceDredging()

Then I should receive a confirmation with reference number
# → EnsureConfirmation.isDisplayedWithReference()
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
