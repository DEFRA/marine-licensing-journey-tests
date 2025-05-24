# Cursor Rules - Master Index

This directory contains the complete set of rules and guidelines for the Marine Licensing Journey Tests project. These rules ensure consistency, quality, and maintainability across the codebase.

## Rule Files Overview

### 🎯 **Testing Strategy & Approach**

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

#### [`playbook.refactoring.mdc`](./playbook.refactoring.mdc)

**Refactoring Guidelines**

- Targeted improvement principles
- Content preservation strategies
- Readability enhancement focus
- Structure maintenance rules

## How These Rules Work Together

```
Strategic Level       →  HTSM guides what to test and why
User-Centred Level    →  Personas inform who you're testing for and their real needs
Writing Level         →  BDD ensures clear, maintainable scenarios
Architecture Level    →  Project Structure + Screenplay Pattern organise implementation
Application Context   →  Application Under Test provides technical and domain knowledge
Code Level            →  Code Generation + Clean Code rules ensure quality and consistency
Development Practices →  Playbook rules guide style, process, and refinement
```

## Quick Reference

| **When you're...**                   | **Refer to...**                                              |
| ------------------------------------ | ------------------------------------------------------------ |
| Planning test strategy               | [`htsm.mdc`](./htsm.mdc)                                     |
| Writing Gherkin scenarios            | [`bdd.rules.mdc`](./bdd.rules.mdc)                           |
| Adding new files or features         | [`project-structure.mdc`](./project-structure.mdc)           |
| Implementing test automation         | [`screenplay-pattern.mdc`](./screenplay-pattern.mdc)         |
| Writing JavaScript code              | [`code.generation.mdc`](./code.generation.mdc)               |
| Understanding the application        | [`application.under.test.mdc`](./application.under.test.mdc) |
| Understanding users and their needs  | [`personas.mdc`](./personas.mdc)                             |
| Reviewing code quality               | [`playbook.clean.code.mdc`](./playbook.clean.code.mdc)       |
| Following development best practices | [`playbook.general.rules.mdc`](./playbook.general.rules.mdc) |
| Maintaining style and tone           | [`playbook.styleguide.mdc`](./playbook.styleguide.mdc)       |
| Refactoring existing content         | [`playbook.refactoring.mdc`](./playbook.refactoring.mdc)     |

## Getting Started

1. **New to the project?** Start with [`project-structure.mdc`](./project-structure.mdc) to understand the layout
2. **Understanding the application?** Read [`application.under.test.mdc`](./application.under.test.mdc) for technical context
3. **Understanding users?** Review [`personas.mdc`](./personas.mdc) to understand who you're testing for
4. **Writing scenarios?** Read [`bdd.rules.mdc`](./bdd.rules.mdc) for clear Gherkin that reflects real user needs
5. **Building test automation?** Follow [`screenplay-pattern.mdc`](./screenplay-pattern.mdc) for implementation
6. **Planning test coverage?** Use [`htsm.mdc`](./htsm.mdc) for strategic thinking
7. **Reviewing code quality?** Consult [`playbook.clean.code.mdc`](./playbook.clean.code.mdc) for clean code practices

## Maintenance Notes

- Each rule file is independently maintained
- Rules are enforced through Cursor IDE integration
- Updates should maintain backward compatibility where possible
- Consider impact across all rule files when making changes

---

_These rules represent the collective knowledge and best practices for maintaining high-quality, maintainable test automation in the Marine Licensing Journey Tests project._
