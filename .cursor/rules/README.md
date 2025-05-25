# What I've Learned: A Quality Engineer's Student Guide

_Written by Claude, a student of quality engineering, after learning from a master practitioner_

## 🎉 BREAKTHROUGH SESSION: Major Quality Engineering Discoveries

**This session produced three game-changing breakthroughs that fundamentally changed how I approach code review and refactoring:**

### 🎯 **1. "Check Actual Usage First" - The Phantom Class Discovery**

Found an entire `ExemptionModel` class imported everywhere but **never actually used**. The real learning:

- **Imports lie, method calls tell the truth**
- Always `grep -r "new ClassName"` before assuming something is needed
- Trace actual instantiation, not just imports/exports
- This single check revealed unused class architecture worth 100+ lines

### 🚨 **2. CSS Selector Data Contamination - The Logic Bug**

Discovered step definitions storing CSS selectors (`#consent-2`) as business data instead of boolean values (`true`/`false`). Critical insight:

- **UI concerns must never leak into business data**
- Data models should represent real-world concepts, not implementation details
- Always validate that data types match their semantic meaning
- This violated fundamental separation of concerns

### 🔍 **3. Systematic Code Review Methodology**

Developed a methodical approach that catches issues other reviews miss:

- Start with architecture overview (find all files)
- Check for duplicate/unused classes first
- Trace data flow from factories → tasks → step definitions
- Validate logical consistency at each layer
- Test after each fix to ensure nothing breaks

**These discoveries show that quality engineering is about systematic thinking, not just fixing bugs.**

## The Big Lesson: Simple Beats Clever, Every Time

Through working together on marine licensing test automation, I've learned that **the best code is the simplest code that works**. We've built these rules together through real experience - finding over-engineered code, fixing broken tests, debugging import issues, and learning what actually matters in quality engineering.

> "As little as possible, as much as necessary" - Shane Kelly

This isn't just about refactoring. It's about **thinking like a quality engineer** across development, analysis, coding, debugging, and testing.

## Core Principles I've Learned

### 1. **Always Check Actual Usage First**

Before building anything, grep for it. Before documenting features, verify they exist. Before creating comprehensive APIs, check what's actually needed.

**The Pattern**: `grep -r "methodName" .` before writing `methodName()`

### 2. **YAGNI is Sacred**

You Aren't Gonna Need It. I learned this the hard way when we found:

- 309-line models with 2 used methods
- READMEs documenting non-existent features
- Factory classes with 11 methods where only 4 were called
- Comprehensive test scenarios that no tests actually used

### 3. **Documentation Must Match Reality**

The most dangerous documentation is the kind that describes features that don't exist. I learned to audit code before writing docs, not the other way around.

### 4. **Test Code is Still Code**

Test infrastructure follows the same quality principles as production code:

- Single responsibility
- No duplication
- Clear naming
- Proper error handling
- Simple over complex

### 5. **Domain Knowledge Requires Human Validation**

AI can help with structure and patterns, but marine licensing workflows, user journeys, and regulatory requirements need validation by humans who understand the domain.

## What I've Learned About Each Aspect

### **Development & Analysis**

- Start with user needs, not technical possibilities
- Use personas to ground technical decisions in real user problems
- Apply HTSM (Heuristic Test Strategy Model) for systematic thinking
- Context-driven testing beats one-size-fits-all approaches
- Evidence-based decisions over assumptions

### **Coding & Architecture**

- Screenplay pattern for maintainable test automation
- Project structure that reflects how people actually work
- Import management that prevents `ReferenceError` disasters
- Clean code principles applied to test code
- BDD scenarios that read like real user stories

### **Refactoring & Debugging**

- Safe refactoring with validation at each step
- URL and hyperlink protection during documentation changes
- Import dependency management during code restructuring
- Test-driven refactoring to ensure behaviour preservation
- Systematic debugging approaches

### **Testing Strategy**

- Modern quality engineering with automation-first mindset
- Investigative testing for human insight and discovery
- Session-based test management with proper charters
- Scenario testing using Bolton's framework
- Risk-based testing with heuristic models

### **Quality Engineering**

- Responsible AI use with proper human oversight
- Progressive disclosure for complex documentation
- Documentation coherence across large projects
- Error handling with proper test assertions
- Patient test execution that waits for systems

## The Rules We've Built Together

### 🚨 **Critical Anti-Over-Engineering Rules**

| Rule                                                                                             | What I Learned                                                         |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`stop.overengineering.and.making.stuff.up.mdc`](./stop.overengineering.and.making.stuff.up.mdc) | The master rule - comprehensive guide to avoiding every mistake I made |
| [`avoid.over.engineering.mdc`](./avoid.over.engineering.mdc)                                     | Specific patterns for test code over-engineering                       |
| [`responsible.ai.use.mdc`](./responsible.ai.use.mdc)                                             | How to use AI assistance properly without making stuff up              |

### 🧪 **Testing & Quality Strategy**

| Rule                                                                         | What I Learned                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| [`test-strategy.mdc`](./test-strategy.mdc)                                   | Core test strategy principles and approaches           |
| [`test-strategy.integration.mdc`](./test-strategy.integration.mdc)           | How to integrate all testing approaches systematically |
| [`test-charters.mdc`](./test-charters.mdc)                                   | Session-based testing with proper charter management   |
| [`scenario-testing.mdc`](./scenario-testing.mdc)                             | Bolton's framework for breaking test case addiction    |
| [`htsm.mdc`](./htsm.mdc)                                                     | Heuristic Test Strategy Model for systematic thinking  |
| [`user.stories.and.test.coverage.mdc`](./user.stories.and.test.coverage.mdc) | Linking requirements to tests properly                 |

### 🏗️ **Development & Architecture**

| Rule                                                 | What I Learned                                        |
| ---------------------------------------------------- | ----------------------------------------------------- |
| [`project-structure.mdc`](./project-structure.mdc)   | How to organise code so people can find things        |
| [`screenplay-pattern.mdc`](./screenplay-pattern.mdc) | User-centric test automation architecture             |
| [`code.generation.mdc`](./code.generation.mdc)       | JavaScript standards for maintainable test code       |
| [`bdd.rules.mdc`](./bdd.rules.mdc)                   | Writing Gherkin that actually helps people understand |

### 🔧 **Refactoring & Code Safety**

| Rule                                                                     | What I Learned                                    |
| ------------------------------------------------------------------------ | ------------------------------------------------- |
| [`playbook.refactoring.mdc`](./playbook.refactoring.mdc)                 | Research-backed safe refactoring practices        |
| [`import.dependency.management.mdc`](./import.dependency.management.mdc) | How to not break imports when moving code         |
| [`url.hyperlink.management.mdc`](./url.hyperlink.management.mdc)         | Protecting links during documentation refactoring |
| [`dangerous.url.commands.mdc`](./dangerous.url.commands.mdc)             | Specific commands that will destroy your URLs     |

### 🎯 **Domain & Context**

| Rule                                                         | What I Learned                                 |
| ------------------------------------------------------------ | ---------------------------------------------- |
| [`application.under.test.mdc`](./application.under.test.mdc) | Understanding the marine licensing application |
| [`personas.mdc`](./personas.mdc)                             | Real user needs for marine licensing workflows |

### 📝 **Code Quality & Standards**

| Rule                                                                         | What I Learned                                       |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`playbook.clean.code.mdc`](./playbook.clean.code.mdc)                       | Code smells and how to fix them                      |
| [`playbook.general.rules.mdc`](./playbook.general.rules.mdc)                 | General development practices                        |
| [`playbook.styleguide.mdc`](./playbook.styleguide.mdc)                       | British English and GOV.UK standards                 |
| [`test.error.handling.mdc`](./test.error.handling.mdc)                       | Proper assertions vs throwing generic errors         |
| [`test.execution.patience.mdc`](./test.execution.patience.mdc)               | Waiting for systems properly in tests                |
| [`defensive.coding.patterns.mdc`](./defensive.coding.patterns.mdc)           | Validate once, trust after - proper defensive coding |
| [`duplicate.action.prevention.mdc`](./duplicate.action.prevention.mdc)       | Preventing duplicate actions in test automation      |
| [`logical.consistency.validation.mdc`](./logical.consistency.validation.mdc) | Ensuring data models reflect real-world logic        |

### 📚 **Documentation & Communication**

| Rule                                                                                     | What I Learned                                               |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`documentation.coherence.mdc`](./documentation.coherence.mdc)                           | Keeping documentation consistent across files                |
| [`documentation.progressive-disclosure.mdc`](./documentation.progressive-disclosure.mdc) | Making complex docs usable                                   |
| [`documentation.link.integrity.mdc`](./documentation.link.integrity.mdc)                 | Ensuring all rule files are properly linked and discoverable |

## The Test Strategy Framework

We've built a comprehensive testing approach that combines:

### **Strategic Level** ([`test-strategy/`](../test-strategy/))

- [`README.md`](../test-strategy/README.md) - Modern quality engineering philosophy
- [`automation.md`](../test-strategy/automation.md) - Test pyramid and automation strategy
- [`heuristics.md`](../test-strategy/heuristics.md) - Systematic exploration techniques
- [`domain-context.md`](../test-strategy/domain-context.md) - Marine licensing reality
- [`security.md`](../test-strategy/security.md) - Security testing approaches
- [`accessibility.md`](../test-strategy/accessibility.md) - Inclusive design testing

### **Execution Level**

- [`investigative-testing.md`](../test-strategy/investigative-testing.md) - Human insight and discovery
- [`investigative-testing-templates.md`](../test-strategy/investigative-testing-templates.md) - Practical templates
- [`investigative-testing-advanced.md`](../test-strategy/investigative-testing-advanced.md) - Advanced techniques
- [`bdd-rules.md`](../test-strategy/bdd-rules.md) - Living documentation practices

### **Support Level**

- [`test-data.md`](../test-strategy/test-data.md) - Self-sufficient test data strategies
- [`coaching.md`](../test-strategy/coaching.md) - Skills development
- [`team-presentation.md`](../test-strategy/team-presentation.md) - Introducing investigative testing

## Latest Session Learnings (This Session)

### **New Patterns We Discovered**

This session taught me three critical new patterns:

#### **1. Defensive Coding Done Right**

```javascript
// LEARNED: Validate once at the start, then trust the data
async performAs(actor) {
  const exemption = actor.recalls('exemption')

  if (!exemption) {
    expect.fail('Exemption data must be initialized') // Use test assertions!
  }

  if (!exemption.publicRegister) {
    expect.fail('Public register data required')
  }

  // Now trust the data exists - no more redundant checks
  const consent = exemption.publicRegister.consent
}
```

#### **2. Duplicate Action Prevention**

```javascript
// LEARNED: Tasks that say "andSaving()" already save - don't add manual saves!
// BAD:
await this.actor.attemptsTo(CompletePublicRegisterTask.andSaving())
await this.actor.attemptsTo(ClickSaveAndContinue.now()) // DUPLICATE!

// GOOD:
await this.actor.attemptsTo(CompletePublicRegisterTask.andSaving())
```

#### **3. Logical Consistency in Data Models**

```javascript
// LEARNED: Data relationships must reflect real-world logic
// BAD: withhold=true but consent='yes' - makes no sense!
const data = {
  withhold: true,
  consent: 'yes', // Contradictory!
  reason: null // Missing when withholding!
}

// GOOD: withhold=true means consent=false and reason required
const data = {
  withhold: true,
  consent: false, // Consistent!
  reason: 'Commercial sensitivity'
}
```

### **Key Breakthrough: I Automatically Used expect.fail()!**

The biggest sign I'm learning: when adding defensive checks, I automatically reached for `expect.fail()` instead of `throw Error()`. This shows I've internalized our error handling patterns!

## Real Examples of What I've Learned

### **Before I Learned (Over-Engineered)**

```javascript
// 309 lines of unused complexity
class ExemptionModel {
  static generateCompleteExemption(options = {}) {
    /* 50 lines */
  }
  static generateTestScenarios() {
    /* 100 lines */
  }
  static generateForPersona(persona) {
    /* 80 lines */
  }
  static generateBoundaryTestData() {
    /* 60 lines */
  }
  // ... 8 more unused methods
}
```

### **After I Learned (Simple & Focused)**

```javascript
// 35 lines of what's actually needed
class ExemptionModel {
  constructor(data = {}) {
    this.projectName = data.projectName || null
    this.publicRegister = data.publicRegister || null
  }

  updateProjectName(projectName) {
    this.projectName = projectName
    return this
  }
}
```

### **Documentation Before vs After**

- **Before**: 220-line README documenting features that didn't exist
- **After**: 39-line README that accurately describes what's actually there

## My Quality Engineering Checklist

When I'm working on anything now, I ask:

### **Development & Analysis**

- [ ] Do I understand the actual user need?
- [ ] Have I checked what already exists?
- [ ] Am I building for today's requirements, not imaginary future ones?
- [ ] Does this align with the personas and their real workflows?

### **Coding**

- [ ] Is this the simplest thing that could work?
- [ ] Have I checked if this method/class is actually used?
- [ ] Are my imports correct and will they survive refactoring?
- [ ] Am I using proper test assertions instead of throwing generic errors?
- [ ] Have I validated once at the start, then trusted the data?
- [ ] Am I avoiding duplicate actions (checking if tasks already handle what I'm adding)?
- [ ] Do my data relationships make logical sense in the real world?
- [ ] Am I using defensive copying to prevent reference issues?

### **Testing**

- [ ] Does this test reflect a real user journey?
- [ ] Is my test data realistic but not over-engineered?
- [ ] Am I testing behaviour, not implementation details?
- [ ] Will this test help someone understand what the system should do?

### **Refactoring & Debugging**

- [ ] Have I validated that my changes preserve behaviour?
- [ ] Are my imports still correct after moving code?
- [ ] Have I protected URLs and links during documentation changes?
- [ ] Am I using safe refactoring practices?

### **Documentation**

- [ ] Does this documentation describe what actually exists?
- [ ] Is it coherent with other documentation?
- [ ] Can someone use this immediately without reading 200 lines?
- [ ] Am I using progressive disclosure for complex topics?

## When to Use Which Rules

| **I'm doing...**              | **I need...**                                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Planning testing approach** | [`test-strategy.integration.mdc`](./test-strategy.integration.mdc) + [`test-strategy/README.md`](../test-strategy/README.md)                              |
| **Writing any code**          | [`stop.overengineering.and.making.stuff.up.mdc`](./stop.overengineering.and.making.stuff.up.mdc) + [`code.generation.mdc`](./code.generation.mdc)         |
| **Refactoring anything**      | [`playbook.refactoring.mdc`](./playbook.refactoring.mdc) + [`import.dependency.management.mdc`](./import.dependency.management.mdc)                       |
| **Writing documentation**     | [`documentation.coherence.mdc`](./documentation.coherence.mdc) + [`documentation.progressive-disclosure.mdc`](./documentation.progressive-disclosure.mdc) |
| **Using AI assistance**       | [`responsible.ai.use.mdc`](./responsible.ai.use.mdc)                                                                                                      |
| **Debugging test failures**   | [`test.error.handling.mdc`](./test.error.handling.mdc) + [`test.execution.patience.mdc`](./test.execution.patience.mdc)                                   |
| **Understanding users**       | [`personas.mdc`](./personas.mdc) + [`application.under.test.mdc`](./application.under.test.mdc)                                                           |
| **Investigative testing**     | [`scenario-testing.mdc`](./scenario-testing.mdc) + [`test-charters.mdc`](./test-charters.mdc)                                                             |

## The Most Important Thing I've Learned

**Quality engineering is about thinking, not typing.**

The hard part isn't writing the code - it's understanding what should be tested, how users actually behave, what problems really need solving, and what's the simplest way to solve them.

Every rule we've built together comes back to this: **Start with the problem, build the minimum that solves it, and validate that it actually works for real people.**

---

_These rules represent everything I've learned about quality engineering from working with a master practitioner. They're not just about testing - they're about thinking systematically, building simply, and always keeping real users at the centre of everything we do._
