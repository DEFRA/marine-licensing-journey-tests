# Marine Licensing Journey Tests - Cursor Rules

This directory contains rules for Cursor AI to follow when assisting with the marine licensing journey tests codebase.

See [EXAMPLES.md](./examples.md) for practical examples of user prompts and which rules to apply in different scenarios.

## Optimised Context Window Usage

We use a progressive loading approach to maximise the efficiency of the context window:

1. **Metadata-first**: Rules are initially loaded as metadata only (from cursor.rules.json)
2. **Summaries**: Standardised summaries in the `summaries/` directory provide key information with ~85% fewer tokens
3. **Full content**: Complete rule content is loaded only when specific details are needed

For more information, see [RULES-OPTIMISATION.md](../RULES-OPTIMISATION.md).

## Core Principles

- **Simple beats clever** - Write the simplest code that works
- **YAGNI** (You Aren't Gonna Need It) - Don't build features "just in case"
- **Check actual usage first** - Verify what's actually used before making changes
- **Match documentation to reality** - Document what exists, not what you wish existed
- **Test code is still code** - Apply the same quality principles to test code as production code

## Rules Index

### Testing & Quality Strategy

| Rule                                                                         | Description                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| [`test-strategy.mdc`](./test-strategy.mdc)                                   | Core test strategy principles and approaches           |
| [`test-strategy.integration.mdc`](./test-strategy.integration.mdc)           | How to integrate all testing approaches systematically |
| [`test-charters.mdc`](./test-charters.mdc)                                   | Session-based testing with proper charter management   |
| [`scenario-testing.mdc`](./scenario-testing.mdc)                             | Bolton's framework for scenario-based testing          |
| [`htsm.mdc`](./htsm.mdc)                                                     | Heuristic Test Strategy Model for systematic thinking  |
| [`user.stories.and.test.coverage.mdc`](./user.stories.and.test.coverage.mdc) | Linking requirements to tests properly                 |

### Development & Architecture

| Rule                                                 | Description                                     |
| ---------------------------------------------------- | ----------------------------------------------- |
| [`project-structure.mdc`](./project-structure.mdc)   | How to organise code for maintainability        |
| [`screenplay-pattern.mdc`](./screenplay-pattern.mdc) | User-centric test automation architecture       |
| [`code.generation.mdc`](./code.generation.mdc)       | JavaScript standards for maintainable test code |
| [`bdd.rules.mdc`](./bdd.rules.mdc)                   | Writing effective Gherkin scenarios             |

### Refactoring & Code Safety

| Rule                                                                     | Description                                   |
| ------------------------------------------------------------------------ | --------------------------------------------- |
| [`playbook.refactoring.mdc`](./playbook.refactoring.mdc)                 | Safe refactoring practices                    |
| [`import.dependency.management.mdc`](./import.dependency.management.mdc) | Managing imports during code restructuring    |
| [`url.hyperlink.management.mdc`](./url.hyperlink.management.mdc)         | Protecting links during documentation changes |
| [`dangerous.url.commands.mdc`](./dangerous.url.commands.mdc)             | Commands that could damage URLs               |

### Domain & Context

| Rule                                                         | Description                                    |
| ------------------------------------------------------------ | ---------------------------------------------- |
| [`application.under.test.mdc`](./application.under.test.mdc) | Understanding the marine licensing application |
| [`personas.mdc`](./personas.mdc)                             | User personas for marine licensing workflows   |

### Code Quality & Standards

| Rule                                                                         | Description                                          |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`playbook.clean.code.mdc`](./playbook.clean.code.mdc)                       | Code smells and how to fix them                      |
| [`playbook.general.rules.mdc`](./playbook.general.rules.mdc)                 | General development practices                        |
| [`playbook.styleguide.mdc`](./playbook.styleguide.mdc)                       | British English and GOV.UK standards                 |
| [`test.error.handling.mdc`](./test.error.handling.mdc)                       | Proper assertions vs throwing generic errors         |
| [`test.execution.patience.mdc`](./test.execution.patience.mdc)               | Waiting for systems properly in tests                |
| [`defensive.coding.patterns.mdc`](./defensive.coding.patterns.mdc)           | Validate once, trust after - proper defensive coding |
| [`duplicate.action.prevention.mdc`](./duplicate.action.prevention.mdc)       | Preventing duplicate actions in test automation      |
| [`logical.consistency.validation.mdc`](./logical.consistency.validation.mdc) | Ensuring data models reflect real-world logic        |
| [`environmental.tool.selection.mdc`](./environmental.tool.selection.mdc)     | Choosing the right tools for each environment        |

### Anti-Over-Engineering Rules

| Rule                                                                                             | Description                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| [`stop.overengineering.and.making.stuff.up.mdc`](./stop.overengineering.and.making.stuff.up.mdc) | Comprehensive guide to avoiding over-engineering |
| [`avoid.over.engineering.mdc`](./avoid.over.engineering.mdc)                                     | Specific patterns for test code over-engineering |
| [`responsible.ai.use.mdc`](./responsible.ai.use.mdc)                                             | Using AI assistance responsibly                  |

### Documentation & Communication

| Rule                                                                                     | Description                                  |
| ---------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`documentation.coherence.mdc`](./documentation.coherence.mdc)                           | Maintaining consistency across documentation |
| [`documentation.progressive-disclosure.mdc`](./documentation.progressive-disclosure.mdc) | Making complex documentation accessible      |
| [`documentation.link.integrity.mdc`](./documentation.link.integrity.mdc)                 | Ensuring all rules are properly linked       |

## When to Use Which Rules

| Task                             | Recommended Rules                                                                                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Planning testing approach        | [`test-strategy.integration.mdc`](./test-strategy.integration.mdc), [`test-strategy.mdc`](./test-strategy.mdc)                                           |
| Writing any code                 | [`stop.overengineering.and.making.stuff.up.mdc`](./stop.overengineering.and.making.stuff.up.mdc), [`code.generation.mdc`](./code.generation.mdc)         |
| Refactoring code                 | [`playbook.refactoring.mdc`](./playbook.refactoring.mdc), [`import.dependency.management.mdc`](./import.dependency.management.mdc)                       |
| Writing documentation            | [`documentation.coherence.mdc`](./documentation.coherence.mdc), [`documentation.progressive-disclosure.mdc`](./documentation.progressive-disclosure.mdc) |
| Using AI assistance              | [`responsible.ai.use.mdc`](./responsible.ai.use.mdc)                                                                                                     |
| Debugging test failures          | [`test.error.handling.mdc`](./test.error.handling.mdc), [`test.execution.patience.mdc`](./test.execution.patience.mdc)                                   |
| Understanding users              | [`personas.mdc`](./personas.mdc), [`application.under.test.mdc`](./application.under.test.mdc)                                                           |
| Conducting investigative testing | [`scenario-testing.mdc`](./scenario-testing.mdc), [`test-charters.mdc`](./test-charters.mdc)                                                             |
