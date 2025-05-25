# Cursor Rules Usage Examples

This guide shows how different cursor rules work together for common scenarios in the marine licensing journey tests project.

## Writing Code

**Scenario:** "I need to create a new test for the licence application submission flow"

**Rules I'd use:**

- `code.generation.mdc` - JavaScript-only approach, self-documenting code, Allure integration
- `screenplay-pattern.mdc` - Actor/Task/Interaction structure for user-centric automation
- `project-structure.mdc` - Proper file placement in features/steps/pages directories
- `application.under.test.mdc` - Understanding the Hapi.js frontend/backend architecture
- `playbook.clean.code.mdc` - Avoiding code smells, maintaining readability

**Example output:** Create `features/licence-application/submit-application.feature` with screenplay actors like `ApplicantUser.attemptsTo(SubmitLicenceApplication.withValidDetails())`, following clean code principles and proper project structure.

## Planning Test Strategy

**Scenario:** "How should we approach testing the exemption notification workflow?"

**Rules I'd use:**

- `test-strategy.integration.mdc` - Overall modern testing approach and quality engineering
- `htsm.mdc` - Systematic risk-based thinking and coverage models
- `personas.mdc` - Understanding Zofia (novice) vs Amy (veteran) user needs
- `application.under.test.mdc` - Actual exemption workflow context and domain terminology
- `responsible.ai.use.mdc` - Acknowledging domain complexity, recommending expert review

**Example output:** Suggest automation pyramid approach + investigative sessions using personas, with caveats about marine licensing complexity requiring domain expert validation.

## Creating Test Charters

**Scenario:** "I want to explore what happens when users submit incomplete licence applications"

**Rules I'd use:**

- `test-charters.mdc` - Dual charter system (traditional SBTM + scenario-enhanced)
- `scenario-testing.mdc` - Bolton's THEME/SETUP/ACTIVITIES/ORACLES framework
- `personas.mdc` - Testing from Zofia's perspective (novice user likely to make mistakes)
- `application.under.test.mdc` - Understanding actual validation rules and error handling
- `htsm.mdc` - Systematic exploration using quality criteria and risk factors

**Example output:** Create scenario-enhanced charter with theme "Incomplete Application Handling", setup using Zofia persona, activities exploring various missing data combinations, oracles checking error messages and user guidance quality.

## Writing Feature Files

**Scenario:** "I need to write BDD scenarios for the public register search functionality"

**Rules I'd use:**

- `bdd.rules.mdc` - Golden Rule (clarity), Cardinal Rule (one behaviour), Given/When/Then integrity
- `user.stories.and.test.coverage.mdc` - Linking to user stories with @issue tags, coverage assessment
- `application.under.test.mdc` - Correct marine licensing terminology and search capabilities
- `personas.mdc` - Writing scenarios from different user perspectives (public vs MMO staff)
- `responsible.ai.use.mdc` - Ensuring scenarios reflect actual application behaviour

**Example output:** Feature file with clear scenarios like "Given I am a member of the public, When I search for licences by postcode, Then I see relevant active licences" with proper @issue linkage and domain-accurate terminology.

## Refactoring Code

**Scenario:** "The page objects are getting messy and I want to extract common navigation patterns"

**Rules I'd use:**

- `playbook.refactoring.mdc` - Research-backed refactoring principles, behaviour preservation
- `import.dependency.management.mdc` - Critical import rules for extract/move operations
- `screenplay-pattern.mdc` - Maintaining proper Actor/Task/Interaction separation
- `playbook.clean.code.mdc` - Identifying and fixing code smells during refactoring
- `project-structure.mdc` - Ensuring extracted components go in the right directories

**Example output:** Extract common navigation into reusable Tasks like `NavigateToSection.withBreadcrumbs()`, update all imports systematically, maintain screenplay pattern integrity whilst eliminating duplication.

## Creating Documentation

**Scenario:** "I need to document our new test charter approach for the team"

**Rules I'd use:**

- `documentation.progressive-disclosure.mdc` - Three-layer structure (README → EXAMPLES → DETAILED)
- `playbook.styleguide.mdc` - British English, professional tone, GOV.UK content design
- `documentation.coherence.mdc` - Cross-reference integrity, anchor link management
- `application.under.test.mdc` - Accurate marine licensing context and terminology
- `responsible.ai.use.mdc` - Acknowledging when domain expert review is needed

**Example output:** Create structured documentation with practical examples first, detailed methodology second, advanced techniques third. Use proper British English, maintain all cross-references, include caveats about domain complexity.

## Managing URLs and Links

**Scenario:** "I'm restructuring the test-strategy directory and need to update all the links"

**Rules I'd use:**

- `url.hyperlink.management.mdc` - URL protection rules, validation checklists
- `dangerous.url.commands.mdc` - Avoiding high-risk operations that corrupt URLs
- `documentation.coherence.mdc` - Maintaining cross-reference integrity across moves
- `playbook.styleguide.mdc` - Consistent markdown link formatting

**Example output:** Use safe search-and-replace patterns, validate all links before and after changes, update anchor references systematically, avoid bulk operations that could corrupt URLs.

## Domain-Specific Guidance

**Scenario:** "I'm not sure if my test scenarios accurately reflect how marine licensing actually works"

**Rules I'd use:**

- `responsible.ai.use.mdc` - Acknowledging AI limitations with marine licensing domain knowledge
- `application.under.test.mdc` - Understanding exemptions, public register, actual workflows
- `personas.mdc` - Realistic user constraints and pain points (Zofia vs Amy vs MMO staff)
- `scenario-testing.mdc` - Bolton's framework for authentic user investigations
- `test-strategy.integration.mdc` - Risk-based testing appropriate for regulatory context

**Example output:** Flag scenarios for domain expert review, suggest realistic user pressures and constraints, recommend validation against actual application behaviour, provide caveats about regulatory complexity.

## Key Patterns

### Rule Combinations by Activity Type

**Code-Heavy Tasks:** Always combine `code.generation.mdc` + `screenplay-pattern.mdc` + `playbook.clean.code.mdc`

- Example: "Creating new test automation" → JavaScript standards + Actor/Task pattern + clean code principles

**Strategy Tasks:** Always combine `test-strategy.integration.mdc` + `htsm.mdc` + `scenario-testing.mdc`

- Example: "Planning test approach" → Modern quality engineering + systematic thinking + realistic scenarios

**Documentation Tasks:** Always combine `playbook.styleguide.mdc` + `documentation.coherence.mdc` + `documentation.progressive-disclosure.mdc`

- Example: "Writing team guides" → British English + cross-reference integrity + layered information

**Domain Tasks:** Always combine `application.under.test.mdc` + `personas.mdc` + `responsible.ai.use.mdc`

- Example: "Marine licensing specifics" → Technical context + user perspectives + AI limitation awareness

### Universal Rules (Include in Almost Every Scenario)

- `playbook.general.rules.mdc` - Step-by-step thinking, validation practices
- `responsible.ai.use.mdc` - AI limitations, especially for domain content
- `project-structure.mdc` - Proper file organisation and naming

### Safety Rules (Always Consider)

- `dangerous.url.commands.mdc` - When doing bulk documentation updates
- `import.dependency.management.mdc` - When moving or restructuring code files
- `url.hyperlink.management.mdc` - When changing file locations or names

## Tips for Effective Rule Usage

1. **Start with your specific scenario** - "I need to..." rather than generic categories
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

**Real example:** For "Planning exemption workflow testing":

- Start with `test-strategy.integration.mdc` for overall approach
- Add `htsm.mdc` for systematic risk thinking
- Include `personas.mdc` for user perspectives (Zofia vs Amy)
- Use `application.under.test.mdc` for technical accuracy
- Always add `responsible.ai.use.mdc` for domain complexity acknowledgement
