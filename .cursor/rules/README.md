# Cursor Rules - Master Index

This directory contains the complete set of rules and guidelines for the Marine Licensing Journey Tests project. These rules ensure consistency, quality, and maintainability across the codebase.

**📖 For practical guidance on using these rules together, see [examples.md](examples.md) - it shows how different rules combine for common scenarios like writing code, planning test strategy, creating documentation, and more.**

## Rule Files Overview

### 🎯 **Testing Strategy & Approach**

#### **[Modern Test Strategy](../../test-strategy/README.md)** 🆕

**Contemporary Quality Engineering Approach**

- Modern testing philosophy with heuristic-driven exploration
- Automation-first strategies with intelligent human insight
- Context-driven testing adapted to marine licensing domain
- Evidence-based quality engineering practices
- Integration of traditional principles with modern outcomes

**Key Components:**

- **[Testing Heuristics](../../test-strategy/heuristics.md)** - HTSM and systematic exploration
- **[Automation Approach](../../test-strategy/automation.md)** - Test pyramid and quality engineering
- **[Domain Context](../../test-strategy/domain-context.md)** - Marine licensing reality
- **[Investigative Testing](../../test-strategy/investigative-testing.md)** - Session-based investigation
- **[Accessibility Testing](../../test-strategy/accessibility.md)** - Inclusive design and GOV.UK compliance
- **[Security Testing](../../test-strategy/security.md)** - Security-by-design and threat testing
- **[Test Data Management](../../test-strategy/test-data.md)** - Data strategies for reliable automation
- **[Quality Coaching](../../test-strategy/coaching.md)** - Skills development and knowledge sharing
- **[BDD Rules](../../test-strategy/bdd-rules.md)** - Living documentation practices
- **[Team Presentation](../../test-strategy/team-presentation.md)** - 30-minute session introducing investigative testing approach

#### [`test-strategy.integration.mdc`](./test-strategy.integration.mdc) 🆕

**Test Strategy Integration Rule**

- Directive for AI assistants to use the comprehensive test strategy documentation
- Guidelines for when and how to apply different strategy components
- Examples of usage for test planning, implementation, and improvement
- Key principles and authoritative source guidance for testing decisions

#### [`scenario-testing.mdc`](./scenario-testing.mdc) 🆕

**Scenario Testing Methodology - Bolton's Framework**

- Michael Bolton's approach to breaking test case addiction
- THEME, SETUP, ACTIVITIES, ORACLES, VARIATIONS framework
- Marine licensing context implementation with realistic pressures
- Evidence collection and problem classification systems
- Integration with session-based testing and persona-driven investigation
- Quality assurance principles for authentic user experience testing

#### [`test-charters.mdc`](./test-charters.mdc) ⚡️ **Enhanced**

**Test Charter Creation and Enhanced Testing Methodology**

- Dual charter system: Traditional SBTM + Scenario-enhanced investigations
- Theme-based charter design with cross-feature coverage
- Charter lifecycle management and release-driven updates
- Bolton's framework integration with marine licensing personas
- Evidence collection and anti-patterns guidance
- Implementation guidelines and success indicators

#### [`htsm.mdc`](./htsm.mdc)

**Heuristic Test Strategy Model (HTSM) v6.3**

- Strategic framework for test thinking and planning
- Risk-based testing approaches
- Quality criteria categories and product factors
- Contextual guidance for comprehensive test coverage

#### [`bdd.rules.mdc`](./bdd.rules.mdc)

**BDD Guidelines**

- Golden Rule: Write Gherkin for clarity and understanding
- Cardinal Rule: One Scenario, One Behaviour
- Given/When/Then integrity and ordering
- Best practices for scenario writing

#### [`user.stories.and.test.coverage.mdc`](./user.stories.and.test.coverage.mdc)

**User Stories and Test Coverage**

- User story structure and organisation in `.cursor/user-stories/`
- @issue tag linkage between stories and feature files
- Coverage assessment methods and gap analysis
- Quality guidelines for stories and test implementation
- Maintenance processes for requirements traceability

### 🏗️ **Architecture & Implementation**

#### [`project-structure.mdc`](./project-structure.mdc)

**Project Structure Standards**

- Directory organization and file placement rules
- Naming conventions (dot.case for JS files, kebab-case for assets)
- Clear separation between features, steps, pages, and screenplay components

#### [`screenplay-pattern.mdc`](./screenplay-pattern.mdc)

**Screenplay Pattern Standards**

- Actor, Abilities, Tasks, and Interactions implementation
- Code examples and usage patterns
- Encapsulation of WebDriverIO for framework flexibility
- User-centric approach to test automation

#### [`code.generation.mdc`](./code.generation.mdc)

**Code Generation Rules**

- JavaScript-only approach (no TypeScript)
- Self-documenting code principles
- Allure reporting integration
- Error handling with Chai assertions
- Tasks vs Interactions guidelines

### 🎯 **Application Context & Integration**

#### [`application.under.test.mdc`](./application.under.test.mdc)

**Marine Licensing Application Context**

- Application architecture (Hapi.js frontend/backend, MongoDB, Node.js ES modules)
- Domain context for marine licensing, exemptions, and public register
- Frontend and backend structure reference
- Key features and user journey guidance
- Environment configuration and testing considerations

#### [`personas.mdc`](./personas.mdc)

**User Personas for Marine Licensing**

- Internal MMO staff (Case Officers, Marine Officers)
- External applicants (Veteran and novice users)
- User needs, pain points, and accessibility considerations
- Test implications and scenario guidance for different user types
- Cross-cutting themes and digital divide considerations

### 📝 **Development Practices & Style**

#### [`responsible.ai.use.mdc`](./responsible.ai.use.mdc)

**Responsible AI Use in Test Automation**

- AI assistant limitations and appropriate use cases
- Human verification requirements for domain-specific content
- Test generation validation points and edge case handling
- Marine licensing context awareness for realistic test scenarios
- Based on NASA research on LLM limitations in safety-critical contexts

#### [`playbook.clean.code.mdc`](./playbook.clean.code.mdc)

**Clean Code & Code Smells**

- Clean code principles and maintainability standards
- Comprehensive code smell identification and remediation
- Context-specific examples for test automation
- Screenplay pattern-specific smells and solutions
- Detection tips and pragmatic guidance

#### [`playbook.general.rules.mdc`](./playbook.general.rules.mdc)

**General Rules**

- Step-by-step thinking and planning approach
- Targeted editing practices
- Validation and change summarisation
- Code quality assurance

#### [`playbook.styleguide.mdc`](./playbook.styleguide.mdc)

**Style Guide**

- British English standards for DEFRA
- Professional tone requirements
- GOV.UK content design guidance
- UK Government style manual compliance

#### [`documentation.coherence.mdc`](./documentation.coherence.mdc) 🆕

**Documentation Coherence & Quality Standards**

- Cross-reference integrity and anchor link management across test strategy and charters
- Status tracking accuracy and file organization validation
- Dual charter system standards (traditional SBTM + scenario-enhanced approaches)
- Bolton framework implementation requirements for scenario charters
- Quality assurance practices and common coherence issue prevention
- Professional British English standards with marine licensing context integration
- Reference management patterns and maintenance responsibilities

#### [`documentation.progressive-disclosure.mdc`](./documentation.progressive-disclosure.mdc) 🆕

**Progressive Disclosure & Readability Patterns**

- Patterns for making complex documentation immediately usable whilst preserving comprehensive content
- 60% reduction target for overwhelming documentation (200+ lines → ~150 lines + supporting files)
- Three-layer content structure: README (practical) → EXAMPLES/DETAILED → ADVANCED
- Role-based entry points with timebound actions ("This week", "Next week", "This month")
- Content simplification techniques and framework presentation standards
- Template-first approach with copy-paste frameworks and success-oriented language
- Anti-patterns to avoid and quality indicators for readability success

### 🔧 **Refactoring & Code Safety**

#### [`playbook.refactoring.mdc`](./playbook.refactoring.mdc) 🔬

**Research-Backed Refactoring Guidelines**

- Core refactoring principles and AI-assisted refactoring safety protocols
- Manual refactoring best practices and validation checklists
- Refactoring vs Refuctoring distinction and behaviour preservation
- Strategic technical debt mitigation approaches
- References to specialised refactoring guidance documents
- Complete research references and methodology

#### [`import.dependency.management.mdc`](./import.dependency.management.mdc)

**Import and Dependency Management During Refactoring**

- Critical import rules for extract, move, and restructure operations
- Common import scenarios specific to this Screenplay-based codebase
- Comprehensive import debugging checklists and troubleshooting guides
- Prevention strategies for `ReferenceError` and module resolution issues
- Integration workflows with other refactoring activities

#### [`url.hyperlink.management.mdc`](./url.hyperlink.management.mdc)

**URL and Hyperlink Protection During Refactoring**

- Critical URL protection rules and best practices
- Common corruption scenarios and prevention strategies
- URL validation and debugging checklists
- Pre, during, and post-refactoring URL management workflows
- Safe markdown link handling and recovery procedures

#### [`dangerous.url.commands.mdc`](./dangerous.url.commands.mdc)

**Dangerous Commands and Tools During URL Refactoring**

- Specific high-risk operations and tools that corrupt URLs
- Real examples of command failures and compound corruption scenarios
- Safe alternatives and recovery patterns for common refactoring operations
- Command safety checklists and validation approaches
- Tool-specific guidance for editors and search/replace operations

## How These Rules Work Together

```
Strategic Level        →  Modern Test Strategy guides overall approach & philosophy
                      →  HTSM provides systematic thinking frameworks

User-Centred Level    →  Personas inform testing with real user needs
                      →  User Stories & Test Coverage link requirements to tests

Testing Execution     →  Testing Heuristics enable systematic exploration
                      →  Automation Approach defines quality engineering approach
                      →  Exploratory Testing provides human insight and discovery

Requirements Level    →  Domain Context grounds testing in marine licensing reality
                      →  Application Under Test provides technical specifics

Writing Level         →  BDD ensures clear, maintainable scenarios
Architecture Level    →  Project Structure + Screenplay Pattern organise implementation
Code Level            →  Code Generation + Clean Code rules ensure quality
Development Practices →  Playbook rules guide style, process, and refinement
Refactoring Safety    →  Specialised refactoring guidance ensures safe improvements
```

## User Stories Directory

The [`../.cursor/user-stories/`](../user-stories/) directory contains documented user stories with their README.md providing:

- Story overview and status tracking
- Links between user stories and feature files
- Coverage assessment and navigation
- Integration with the test coverage rule above

## Quick Reference

| **When you're...**                          | **Refer to...**                                                                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Planning overall test strategy and approach | **[Modern Test Strategy](../../test-strategy/README.md)** + [`test-strategy.integration.mdc`](./test-strategy.integration.mdc)          |
| Learning systematic testing techniques      | **[Testing Heuristics](../../test-strategy/heuristics.md)** + [`htsm.mdc`](./htsm.mdc)                                                  |
| Building test automation                    | **[Automation Approach](../../test-strategy/automation.md)**                                                                            |
| Understanding marine licensing context      | **[Domain Context](../../test-strategy/domain-context.md)** + [`application.under.test.mdc`](./application.under.test.mdc)              |
| Conducting investigative testing            | **[Investigative Testing](../../test-strategy/investigative-testing.md)**                                                               |
| Working with user stories                   | [`user.stories.and.test.coverage.mdc`](./user.stories.and.test.coverage.mdc)                                                            |
| Assessing test coverage                     | [`user.stories.and.test.coverage.mdc`](./user.stories.and.test.coverage.mdc) + [`../user-stories/README.md`](../user-stories/README.md) |
| Writing BDD scenarios                       | [`bdd.rules.mdc`](./bdd.rules.mdc)                                                                                                      |
| Implementing screenplay pattern             | [`screenplay-pattern.mdc`](./screenplay-pattern.mdc)                                                                                    |
| Understanding user needs and personas       | [`personas.mdc`](./personas.mdc)                                                                                                        |
| Following coding standards                  | [`code.generation.mdc`](./code.generation.mdc)                                                                                          |
| Maintaining code quality                    | [`playbook.clean.code.mdc`](./playbook.clean.code.mdc)                                                                                  |
| Refactoring safely                          | [`playbook.refactoring.mdc`](./playbook.refactoring.mdc)                                                                                |
| Using AI assistance responsibly             | [`responsible.ai.use.mdc`](./responsible.ai.use.mdc)                                                                                    |

## Getting Started

1. **New to the project?** Start with [`project-structure.mdc`](./project-structure.mdc) to understand the layout
2. **Understanding the application?** Read [`application.under.test.mdc`](./application.under.test.mdc) for technical context
3. **Understanding users?** Review [`personas.mdc`](./personas.mdc) to understand who you're testing for
4. **Understanding requirements?** Check [`../user-stories/README.md`](../user-stories/README.md) for current user stories and test coverage
5. **Writing scenarios?** Read [`bdd.rules.mdc`](./bdd.rules.mdc) for clear Gherkin that reflects real user needs
6. **Building test automation?** Follow [`screenplay-pattern.mdc`](./screenplay-pattern.mdc) for implementation
7. **Planning test coverage?** Use [`htsm.mdc`](./htsm.mdc) for strategic thinking and [`user.stories.and.test.coverage.mdc`](./user.stories.and.test.coverage.mdc) for coverage assessment

## Maintenance Notes

- Each rule file is independently maintained
- Rules are enforced through Cursor IDE integration
- Updates should maintain backward compatibility where possible
- Consider impact across all rule files when making changes
- Refactoring guidance is modularised for targeted reference while maintaining cross-document consistency

---

_These rules represent the collective knowledge and best practices for maintaining high-quality, maintainable test automation in the Marine Licensing Journey Tests project._
