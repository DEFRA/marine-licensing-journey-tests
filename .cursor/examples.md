# Comprehensive Rule Application Examples

This document provides detailed examples of applying rules to different scenarios in the marine licensing journey tests project. It demonstrates how to effectively use rule bundles and individual rules for various tasks.

## Core Rule Bundle Applications

### 1. Risk-Focused Testing (`risk_focused_testing`)

**Example 1: New Feature Planning**

**User Request:** "How should we test the new exemption public register feature?"

**Rule Application:**

1. `test-strategy`: Identify risks to product value before implementation details
2. `test-strategy.integration`: Determine how this fits into overall testing approach
3. `scenario-testing`: Design realistic user investigations

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing bundle.

## Key Risks That Threaten Product Value
- Privacy concerns: Exposing sensitive applicant information could violate regulations
- Data accuracy: Incorrect public register information could mislead stakeholders
- Usability barriers: Complex consent options could prevent users from making informed choices

## Testing Approach
[Systematic test coverage plan based on identified risks]

## Implementation Recommendations
[Specific test scenarios addressing each risk]
```

**Example 2: Investigating Test Failures**

**User Request:** "Our public register consent tests are failing - how should we approach debugging?"

**Rule Application:**

1. `test-strategy`: Focus on value-threatening risks first
2. `test-strategy.integration`: Use appropriate testing techniques
3. `scenario-testing`: Consider realistic user contexts

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing bundle.

## Risk Assessment
- Data integrity risk: Consent choice not being preserved threatens legal compliance
- User trust risk: Inconsistent behavior damages confidence in system

## Investigation Approach
[Systematic debugging steps ordered by risk priority]
```

### 2. Automation Efficiency (`automation_efficiency`)

**Example 1: Creating Test Tasks**

**User Request:** "I need to create a task for completing the public register consent form"

**Rule Application:**

1. `avoid.over.engineering`: Start simple, grow as needed
2. `playbook.clean.code`: Follow clean code principles
3. `duplicate.action.prevention`: Prevent action duplication

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the automation_efficiency bundle.

[Task implementation that follows screenplay pattern with minimal complexity]
```

**Example 2: Fixing Flaky Tests**

**User Request:** "Our exemption notification tests are flaky - how can we fix them?"

**Rule Application:**

1. `avoid.over.engineering`: Identify simple solutions first
2. `playbook.clean.code`: Look for code smells
3. `duplicate.action.prevention`: Check for race conditions

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the automation_efficiency bundle.

## Potential Causes
[Systematic analysis of common flakiness causes]

## Implementation Solution
[Minimal, focused fix without over-engineering]
```

### 3. Cursor Efficiency (`cursor_efficiency`)

**Example 1: Code Generation Assistance**

**User Request:** "Help me optimize how we use Cursor AI for test development"

**Rule Application:**

1. `playbook.general.rules`: Use step-by-step approach
2. `documentation.coherence`: Maintain documentation standards
3. `responsible.ai.use`: Acknowledge AI limitations

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the cursor_efficiency bundle.

## Optimal Prompt Patterns
[Specific prompt structures for test development]

## Rule Application Strategy
[How to reference rules efficiently in prompts]
```

## Common Testing Scenarios

### Creating Test Strategy

**User Request:** "We need a test strategy for the site details coordinates workflow"

**Rule Application:**

- Primary Bundle: `risk_focused_testing`
- Supporting Rules: `application.under.test`, `personas`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing bundle with application.under.test and personas rules.

## Risks That Threaten Product Value
- Geographic data accuracy: Incorrect coordinates could lead to regulatory issues
- User cognitive load: Complex coordinate entry threatens completion rates
- Cross-browser compatibility: Map visualization inconsistencies impact usability

## Testing Approach By User Type
- Amy (veteran): Test coordinate format flexibility and verification
- Zofia (novice): Test guidance effectiveness and error prevention
- Fatima (case officer): Test data validation and compliance verification

## Implementation Strategy
[Risk-prioritized testing approach]
```

### Writing Feature Files

**User Request:** "Create a feature file for testing the project name page"

**Rule Application:**

- Primary Bundle: `test_creation`
- Supporting Rules: `bdd.rules`, `application.under.test`

**Example Response Structure:**

````
I'm using Claude 3.7 Sonnet and applying the test_creation bundle with bdd.rules and application.under.test rules.

```feature
Feature: Project Name Entry for Exemption Applications

  As a marine licence exemption applicant
  I want to provide a name for my project
  So that my application can be properly identified and tracked

  @smoke
  Scenario: Successfully entering a valid project name
    Given I am on the project name page
    When I enter a valid project name "Coastal Repair Work Brighton"
    And I select Save and continue
    Then I should be taken to the task list page
    And the project name task should be marked as completed
````

### Implementing Step Definitions

**User Request:** "Create step definitions for the project name feature file"

**Rule Application:**

- Primary Bundle: `automation_efficiency`
- Supporting Rules: `screenplay-pattern`, `code.generation`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the automation_efficiency bundle with screenplay-pattern and code.generation rules.

const { Given, When, Then } = require('@cucumber/cucumber')
const { ProjectNamePage } = require('../../test-infrastructure/pages')
const { CompleteProjectNameTask } = require('../../test-infrastructure/screenplay/tasks/complete.project.name')
const { NavigateTo } = require('../../test-infrastructure/screenplay/tasks/navigate.to')
const { VerifyTaskStatus } = require('../../test-infrastructure/screenplay/tasks/verify.task.status')

Given('I am on the project name page', async function () {
  await this.actor.attemptsTo(NavigateTo.projectNamePage())
})

When('I enter a valid project name {string}', async function (projectName) {
  this.actor.remembers('projectName', projectName)
})

When('I select Save and continue', async function () {
  await this.actor.attemptsTo(CompleteProjectNameTask.withName(this.actor.recalls('projectName')))
})

Then('I should be taken to the task list page', async function () {
  await this.actor.attemptsTo(VerifyPage.isTaskList())
})

Then('the project name task should be marked as completed', async function () {
  await this.actor.attemptsTo(VerifyTaskStatus.isCompleted('projectName'))
})
```

### Creating Screenplay Components

**User Request:** "Create a task for completing the coordinate system selection"

**Rule Application:**

- Primary Bundle: `new_feature_development`
- Supporting Rules: `screenplay-pattern`, `code.generation`, `avoid.over.engineering`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the new_feature_development bundle with screenplay-pattern, code.generation, and avoid.over.engineering rules.

const { browse } = require('../abilities/browse.the.web')
const { CoordinateSystemPage } = require('../../pages')
const { ClickSaveAndContinue } = require('../interactions/click.save.and.continue')
const { SelectRadioOption } = require('../interactions/select.radio.option')

class CompleteCoordinateSystemTask {
  static withOption(option) {
    return new CompleteCoordinateSystemTask(option)
  }

  constructor(option) {
    this.option = option
  }

  async performAs(actor) {
    await actor.attemptsTo(
      SelectRadioOption.onPage(CoordinateSystemPage.radioOptions, this.option),
      ClickSaveAndContinue.now()
    )

    actor.updates('exemption', (exemption) => {
      if (!exemption.siteDetails) {
        exemption.siteDetails = {}
      }
      exemption.siteDetails.coordinateSystem = this.option
      return exemption
    })
  }
}

module.exports = { CompleteCoordinateSystemTask }
```

### Debugging Failing Tests

**User Request:** "The coordinate entry tests are failing with element not found errors"

**Rule Application:**

- Primary Bundle: `code_refactoring`
- Supporting Rules: `test.error.handling`, `test.execution.patience`, `defensive.coding.patterns`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the code_refactoring bundle with test.error.handling, test.execution.patience, and defensive.coding.patterns rules.

## Issue Analysis
1. Element timing issues - page elements might not be fully loaded
2. Selector reliability - selectors might have changed
3. State management - previous steps might not complete as expected

## Step-by-Step Solution
[Specific debugging and fix approach]
```

### Refactoring Existing Code

**User Request:** "Refactor our duplicate code for handling form submissions"

**Rule Application:**

- Primary Bundle: `code_refactoring`
- Supporting Rules: `playbook.refactoring`, `import.dependency.management`, `playbook.clean.code`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the code_refactoring bundle with playbook.refactoring, import.dependency.management, and playbook.clean.code rules.

## Code Analysis
[Identify specific duplication patterns]

## Refactoring Approach
[Step-by-step refactoring plan preserving behavior]

## Implementation
[Code samples showing the refactoring]
```

## Edge Cases and Special Scenarios

### 1. Conflicting Rules

**User Request:** "Should we add comprehensive JSDoc to our test code?"

**Rule Conflict:**

- `code.generation` states "No JSDoc or comments in code"
- General software practices often encourage documentation

**Resolution Approach:**

```
I'm using Claude 3.7 Sonnet and applying the code.generation rule.

The code.generation rule explicitly states "No JSDoc or comments in code" except in extremely exceptional circumstances. This takes precedence over general software practices in this codebase.

Instead of JSDoc:
- Use expressive function, parameter and variable names
- Create well-structured code with clear responsibilities
- Follow established screenplay pattern conventions

For the rare exceptional circumstance where a comment is needed (complex business logic or regulatory requirement), use a minimal single-line comment that explains "why" not "what".
```

### 2. Complex Domain Scenarios

**User Request:** "How should we test the marine licensing regulatory compliance logic?"

**Rule Application:**

- Primary Bundle: `domain_understanding`
- Supporting Rules: `responsible.ai.use`, `logical.consistency.validation`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the domain_understanding bundle with responsible.ai.use and logical.consistency.validation rules.

## Important Domain Considerations
[Key regulatory concepts]

## Testing Approach Recommendation
[Domain-specific testing strategy]

## Human Verification Required
[Explicit acknowledgment of AI limitations with marine licensing domain knowledge]
```

### 3. Accessibility Testing

**User Request:** "How should we approach accessibility testing for the application?"

**Rule Application:**

- Primary Bundle: `risk_focused_testing`
- Supporting Rules: `scenario-testing`, `application.under.test`, `personas`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing bundle with scenario-testing, application.under.test, and personas rules.

## Accessibility Risks
[Specific accessibility risks in marine licensing context]

## Testing Approach By Constraint
[Testing strategy organized by different accessibility requirements]

## Integration With Existing Tests
[How to build accessibility testing into current framework]
```

### 4. Performance Testing

**User Request:** "Do we need performance testing for the map component?"

**Rule Application:**

- Primary Bundle: `risk_focused_testing`
- Supporting Rules: `application.under.test`, `test-strategy.integration`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing bundle with application.under.test and test-strategy.integration rules.

## Performance Risk Assessment
[Analysis of performance risks that threaten value]

## Recommended Approach
[Focused performance testing strategy]
```

### 5. Security Testing

**User Request:** "What security testing should we include for the public register?"

**Rule Application:**

- Primary Bundle: `risk_focused_testing`
- Supporting Rules: `application.under.test`, `responsible.ai.use`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing bundle with application.under.test and responsible.ai.use rules.

## Security Risk Analysis
[Public register specific security risks]

## Testing Approaches
[Security testing strategies]

## Expert Review Recommendation
[Areas requiring security specialist review]
```

## Integration Examples

### 1. Combined Bundle Application

**User Request:** "Create a comprehensive test plan for the entire exemption notification journey"

**Rule Application:**

- Primary Bundles: `risk_focused_testing`, `test_creation`, `domain_understanding`
- Sequential Application: Risk identification → Test structure → Domain validation

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing, test_creation, and domain_understanding bundles.

## Risk Assessment
[Comprehensive risk analysis]

## Test Strategy
[Multi-layered test approach]

## Domain-Specific Considerations
[Marine licensing specific validation]
```

### 2. Progressive Rule Application

**User Request:** "I'm new to this project - help me understand how to test it effectively"

**Rule Application:**

- Start with metadata from rules
- Progress to summaries for key rules
- Provide full content only where necessary

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying rule metadata and summaries from multiple rules.

## Getting Started
[Entry-level guidance with progressive depth]

## Key Testing Approaches
[Summary-level guidance on core approaches]

## Resources For Further Learning
[Pointers to full rule content for depth]
```

### 3. Iteration and Refinement

**User Request:** "Review my test plan for the coordinates feature and suggest improvements"

**Rule Application:**

- Initial Assessment: Use metadata to identify relevant rules
- Focused Application: Apply targeted rule summaries to specific areas
- Refinement: Provide specific examples from relevant rules

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying targeted rule summaries based on assessment.

## Risk Coverage Assessment
[Analysis of whether plan addresses key risks]

## Test Strategy Alignment
[How well plan aligns with testing strategy]

## Specific Improvement Areas
[Targeted recommendations with examples]
```

## Using Rules for Different User Roles

### 1. For Developers

**User Request:** "As a developer, what should I focus on when writing tests?"

**Rule Application:**

- Primary Bundles: `automation_efficiency`, `code_refactoring`
- Supporting Rules: `screenplay-pattern`, `code.generation`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the automation_efficiency and code_refactoring bundles.

## Code Structure Principles
[Developer-focused guidance]

## Implementation Patterns
[Specific patterns with examples]
```

### 2. For QA Engineers

**User Request:** "As a QA, how should I approach testing the new features?"

**Rule Application:**

- Primary Bundles: `risk_focused_testing`, `test_creation`
- Supporting Rules: `test-charters`, `scenario-testing`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing and test_creation bundles.

## Risk-Based Approach
[QA-focused strategy]

## Investigation Techniques
[Structured testing approaches]
```

### 3. For Domain Experts

**User Request:** "As a marine licensing expert, how can I contribute to testing?"

**Rule Application:**

- Primary Bundle: `domain_understanding`
- Supporting Rules: `scenario-testing`, `test-charters`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the domain_understanding bundle with scenario-testing and test-charters rules.

## Domain-Specific Testing
[How domain experts can contribute]

## Investigation Templates
[Structured frameworks for domain-focused testing]
```

## Testing Throughout The Development Lifecycle

### 1. Planning Phase

**User Request:** "How should we approach testing for the next sprint?"

**Rule Application:**

- Primary Bundle: `risk_focused_testing`
- Supporting Bundles: `test_creation`, `domain_understanding`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the risk_focused_testing, test_creation, and domain_understanding bundles.

## Risk Prioritization
[Risk-based planning approach]

## Test Implementation Roadmap
[Structured test development plan]
```

### 2. Implementation Phase

**User Request:** "How do we implement the tests we planned?"

**Rule Application:**

- Primary Bundle: `automation_efficiency`
- Supporting Bundles: `new_feature_development`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the automation_efficiency and new_feature_development bundles.

## Implementation Structure
[Organized development approach]

## Test Code Architecture
[Framework-aligned implementation]
```

### 3. Maintenance Phase

**User Request:** "How do we keep our tests maintainable as the application evolves?"

**Rule Application:**

- Primary Bundle: `code_refactoring`
- Supporting Bundle: `documentation_updates`

**Example Response Structure:**

```
I'm using Claude 3.7 Sonnet and applying the code_refactoring and documentation_updates bundles.

## Maintenance Strategy
[Long-term maintainability approach]

## Documentation Practices
[Keeping documentation current]
```

## Remember

When applying rules:

1. Start with rule bundles when applicable
2. Use metadata and summaries before full content
3. Limit to 3-5 most relevant rules per task
4. Always begin with risk identification
5. Use rule references to explain approach but keep output concise
6. Refer to specific examples from existing code when possible
7. After completing a task, reflect on which rules were most helpful
