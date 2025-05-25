# BDD Guidelines for Marine Licensing Tests

## Core BDD Principles

- **Golden Rule**
  - Treat other readers as you would want to be treated. Write Gherkin so that people who don't know the marine licensing domain will understand it.
- **Cardinal Rule**
  - One Scenario, One Behaviour
- **Good titles** - the title is like the face of the scenario, the first thing people read
- **Less is more** - keep your scenarios short and sweet <10 steps
- **Focus features on customer needs**
- **Always use Given, When, Then in that order and only that order** - don't repeat them; any single When-Then pair denotes an individual behaviour
- **Respect the integrity of the step types**:
  - Given sets up initial state
  - When performs an action
  - Then verifies the outcome

## Marine Licensing Context Examples

### Good Scenario Example

```gherkin
Feature: Exemption Notification Submission

Scenario: Applicant submits valid exemption notification
  Given I am a marina operator with a valid marine licence
  When I submit an exemption notification for maintenance dredging
  Then I should receive a confirmation with reference number
  And the exemption should appear on the public register
```

### Example Step Patterns

```gherkin
# Setting up marine licensing context
Given I am a [persona] with [licence type]
Given the exemption register contains [existing exemptions]

# Marine licensing actions
When I submit an exemption notification for [activity type]
When I search the public register for [search criteria]
When I provide evidence of [environmental consideration]

# Marine licensing outcomes
Then I should receive confirmation within [timeframe]
Then the exemption should be available on the public register
Then MMO staff should receive notification for review
```

## Implementation Mapping

**BDD → Screenplay Pattern:**

- **Given steps** → Set up initial state (often through tasks)
- **When steps** → User actions that map to high-level **Tasks**
- **Then steps** → Verification that maps to **Interactions** with `ensure` prefix

### Marine Licensing Mapping Examples

```gherkin
Given I am a marina operator with a valid marine licence
# → SetupUserWithLicence.task()

When I submit an exemption notification for maintenance dredging
# → SubmitExemptionNotification.forMaintenanceDredging()

Then I should receive a confirmation with reference number
# → EnsureConfirmation.isDisplayedWithReference()
```

> 📖 **See:** [Screenplay Pattern](./screenplay-pattern.md) for implementation details

## Strategic Context

**Planning Your Scenarios:**

- Use HTSM quality criteria to identify what behaviors to test
- Consider risk areas and product factors when designing scenarios
- Focus on customer value and real user workflows
- Align with marine licensing personas (Zofia, Amy, Fatima)

**Domain-Specific Considerations:**

- Represent realistic marine licensing workflows
- Include regulatory compliance requirements
- Consider environmental impact assessments
- Account for different licence types and exemption categories

> 📖 **See:** [Testing Heuristics](./heuristics/README.md) for strategic test thinking
> 📖 **See:** [Domain Context](./domain-context/README.md) for marine licensing specifics

## File Organization

- Feature files go in `test/features/`
- Step definitions go in `test/steps/`
- Screenplay implementation follows the patterns in `test-infrastructure/screenplay/`

## Quality Guidelines

### Scenario Quality Checklist

✅ Title clearly describes the business value

✅ Steps follow Given-When-Then order

✅ Each scenario tests one specific behaviour

✅ Language is accessible to domain experts

✅ Realistic marine licensing context

✅ Covers important user journeys from personas

### Common Marine Licensing Patterns

- **Notification workflows** - Complete exemption submission processes
- **Public register interactions** - Search and view exemption information
- **Compliance verification** - Environmental and regulatory checks
- **Multi-stakeholder flows** - Applicant, MMO, and public interactions

## Attribution

These BDD guidelines are inspired by the excellent work at [AutomationPanda.com](https://automationpanda.com), particularly their guidance on writing effective Gherkin scenarios and BDD best practices.
