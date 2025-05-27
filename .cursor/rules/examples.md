# Cursor Rules Usage Examples

This guide shows examples of user prompts and which rules would be used when working with the marine licensing journey tests project.

## Writing Code

**User prompt:** "I need to create a new test task to handle the public register consent workflow"

**Rules I'd use:**

- `code.generation.mdc` - JavaScript-only approach, self-documenting code, Allure integration
- `screenplay-pattern.mdc` - Actor/Task/Interaction structure for user-centric automation
- `project-structure.mdc` - Proper file placement in test-infrastructure directories
- `application.under.test.mdc` - Understanding the marine licensing application domain
- `playbook.clean.code.mdc` - Avoiding code smells, maintaining readability

**Example output:** Create `test-infrastructure/screenplay/tasks/complete.public.register.consent.js` implementing the screenplay pattern with proper validation, following clean code principles and proper project structure.

## Planning Test Strategy

**User prompt:** "What's the best approach for testing the exemption notification workflow?"

**Rules I'd use:**

- `test-strategy.integration.mdc` - Overall modern testing approach and quality engineering
- `htsm.mdc` - Systematic risk-based thinking and coverage models
- `personas.mdc` - Understanding different user needs and expertise levels
- `application.under.test.mdc` - Actual exemption workflow context and domain terminology
- `responsible.ai.use.mdc` - Acknowledging domain complexity, recommending expert review

**Example output:** Suggest automation pyramid approach + investigative sessions using personas, with caveats about marine licensing complexity requiring domain expert validation.

## Creating Test Charters

**User prompt:** "How should I structure an exploratory test session for the project name validation?"

**Rules I'd use:**

- `test-charters.mdc` - Dual charter system (traditional SBTM + scenario-enhanced)
- `scenario-testing.mdc` - Bolton's THEME/SETUP/ACTIVITIES/ORACLES framework
- `personas.mdc` - Testing from different user perspectives
- `application.under.test.mdc` - Understanding actual validation rules and error handling
- `htsm.mdc` - Systematic exploration using quality criteria and risk factors

**Example output:** Create scenario-enhanced charter with theme "Project Name Validation", setup using appropriate persona, activities exploring various input scenarios, oracles checking error messages and validation rules.

## Writing Feature Files

**User prompt:** "Write me a feature file for testing the public register page"

**Rules I'd use:**

- `bdd.rules.mdc` - Golden Rule (clarity), Cardinal Rule (one behaviour), Given/When/Then integrity
- `user.stories.and.test.coverage.mdc` - Linking to user stories with @issue tags, coverage assessment
- `application.under.test.mdc` - Correct marine licensing terminology and capabilities
- `personas.mdc` - Writing scenarios from different user perspectives
- `responsible.ai.use.mdc` - Ensuring scenarios reflect actual application behaviour

**Example output:** Feature file with clear scenarios like "Given I am completing my exemption application, When I provide valid public register details, Then I should be able to continue to the next section" with proper domain terminology.

## Refactoring Code

**User prompt:** "Our test steps have duplicate code for filling in forms - how can we refactor this?"

**Rules I'd use:**

- `playbook.refactoring.mdc` - Research-backed refactoring principles, behaviour preservation
- `import.dependency.management.mdc` - Critical import rules for extract/move operations
- `screenplay-pattern.mdc` - Maintaining proper Actor/Task/Interaction separation
- `playbook.clean.code.mdc` - Identifying and fixing code smells during refactoring
- `project-structure.mdc` - Ensuring extracted components go in the right directories

**Example output:** Extract common form handling into reusable Tasks like `FillForm.withData()`, update all imports systematically, maintain screenplay pattern integrity whilst eliminating duplication.

## Fixing Test Failures

**User prompt:** "The public register tests are failing - how should I debug this?"

**Rules I'd use:**

- `test.error.handling.mdc` - Proper assertions vs throwing generic errors
- `test.execution.patience.mdc` - Waiting for systems properly in tests
- `defensive.coding.patterns.mdc` - Validate once, trust after pattern
- `duplicate.action.prevention.mdc` - Checking for duplicate actions
- `logical.consistency.validation.mdc` - Ensuring data models make logical sense

**Example output:** Systematic debugging approach checking for timing issues, inconsistent data models, improper error handling, and duplicate actions that might be causing conflicts.

## Managing Code Structure

**User prompt:** "How should we organise our new test steps for the exemption workflow?"

**Rules I'd use:**

- `project-structure.mdc` - Understanding the overall project organisation
- `screenplay-pattern.mdc` - Proper implementation of actors, tasks and interactions
- `import.dependency.management.mdc` - Managing imports to prevent issues
- `code.generation.mdc` - Following JavaScript standards for the project
- `playbook.general.rules.mdc` - Step-by-step thinking, validation practices

**Example output:** Guidance on creating well-structured step definition files in the test/steps directory with proper imports, following the screenplay pattern, and maintaining clean dependency management.

## Domain-Specific Testing

**User prompt:** "How do I test the marine licence exemption eligibility checks?"

**Rules I'd use:**

- `responsible.ai.use.mdc` - Acknowledging AI limitations with marine licensing domain knowledge
- `application.under.test.mdc` - Understanding exemptions, actual workflows and requirements
- `personas.mdc` - Realistic user constraints and expectations
- `scenario-testing.mdc` - Bolton's framework for authentic user investigations
- `test-strategy.integration.mdc` - Risk-based testing appropriate for regulatory context

**Example output:** Flag need for domain expert review, suggest realistic user scenarios, recommend validation against actual application behaviour, provide caveats about regulatory complexity.

## Key Patterns

### Rule Combinations by Activity Type

**Code-Heavy Tasks:** Always combine `code.generation.mdc` + `screenplay-pattern.mdc` + `playbook.clean.code.mdc`

- Example user prompt: "Create a new task for checking project names" → JavaScript standards + Actor/Task pattern + clean code principles

**Strategy Tasks:** Always combine `test-strategy.integration.mdc` + `htsm.mdc` + `scenario-testing.mdc`

- Example user prompt: "What's our testing approach for the application?" → Modern quality engineering + systematic thinking + realistic scenarios

**Documentation Tasks:** Always combine `playbook.styleguide.mdc` + `documentation.coherence.mdc` + `documentation.progressive-disclosure.mdc`

- Example user prompt: "Write documentation for our test approach" → British English + cross-reference integrity + layered information

**Domain Tasks:** Always combine `application.under.test.mdc` + `personas.mdc` + `responsible.ai.use.mdc`

- Example user prompt: "Explain how marine licensing works" → Technical context + user perspectives + AI limitation awareness

### Universal Rules (Include in Almost Every Scenario)

- `playbook.general.rules.mdc` - Step-by-step thinking, validation practices
- `responsible.ai.use.mdc` - AI limitations, especially for domain content
- `project-structure.mdc` - Proper file organisation and naming

### Safety Rules (Always Consider)

- `dangerous.url.commands.mdc` - When doing bulk documentation updates
- `import.dependency.management.mdc` - When moving or restructuring code files
- `url.hyperlink.management.mdc` - When changing file locations or names

## Tips for Effective Rule Usage

1. **Start with specific user prompts** - "Help me..." rather than generic categories
2. **Always include domain context** - Add `application.under.test.mdc` for marine licensing accuracy
3. **Safety first** - Include `responsible.ai.use.mdc` when working with domain-specific content
4. **Structure matters** - Add `project-structure.mdc` when creating or moving files
5. **Quality throughout** - Include relevant playbook rules for maintainable outcomes

## When Rules Work Together

**Complementary combinations:**

- `test-charters.mdc` + `scenario-testing.mdc` = Complete investigative testing methodology
- `bdd.rules.mdc` + `user.stories.and.test.coverage.mdc` = Full BDD implementation with traceability
- `playbook.clean.code.mdc` + `playbook.refactoring.mdc` = Safe, quality-focused improvements

**Different perspectives on same activity:**

- `test-strategy.integration.mdc` (strategic) vs `htsm.mdc` (tactical thinking)
- `documentation.coherence.mdc` (accuracy) vs `documentation.progressive-disclosure.mdc` (usability)
- `personas.mdc` (user focus) vs `application.under.test.mdc` (technical focus)

**Real example user prompt:** "How should we test the exemption workflow?"

- Start with `test-strategy.integration.mdc` for overall approach
- Add `htsm.mdc` for systematic risk thinking
- Include `personas.mdc` for user perspectives
- Use `application.under.test.mdc` for technical accuracy
- Always add `responsible.ai.use.mdc` for domain complexity acknowledgement
