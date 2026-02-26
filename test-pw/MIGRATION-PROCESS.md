# Migration Process: Screenplay to Playwright + BDD + POM

A guide for new starters on how the test suite was migrated from the Screenplay Pattern (WebDriverIO + Selenium) to Playwright + Cucumber + Page Object Model using AI-assisted development with Claude Code.

## Why We Migrated

The legacy test suite used the **Screenplay Pattern** on top of WebDriverIO + Selenium:

- **5-6 layers of abstraction**: Steps -> Tasks -> Interactions -> Page Interactions -> Page Objects -> WDIO
- **231 files, 12,520 lines of code** for 143 scenarios
- Required a separate Selenium Docker container with 2GB shared memory
- Difficult for new starters to trace what a single test step actually does

The new Playwright stack has:

- **3 layers**: Steps -> Page Objects -> Playwright
- **48 files, 4,679 lines of code** (63% reduction)
- No Selenium dependency (Playwright bundles its own Chromium)
- Much easier to read and debug

## Analysing the Legacy WDIO Codebase

Before writing a single line of Playwright code, the legacy codebase was thoroughly analysed. This analysis phase was critical — it informed every architectural decision and shaped the prompts used throughout the migration.

### Understanding the Screenplay Pattern Layers

The first step was tracing the call chain for a single test step to understand what the Screenplay pattern actually did. For example, a simple step like `"the user completes the project name task"` went through:

```
Step definition (test/steps/)
  → Task (test-infrastructure/screenplay/tasks/)
    → Interaction (test-infrastructure/screenplay/interactions/)
      → Page Interaction (test-infrastructure/screenplay/page-interactions/)
        → Page Object (test-infrastructure/pages/)
          → WebDriverIO browser API
```

Each layer added a class with constructor, static factory method, and `performAs()` — all to eventually call `browser.$('selector').click()`. By mapping this chain for several steps, it became clear that the Task and Interaction layers were pure pass-through for most scenarios — the actual logic lived in Page Objects and Page Interactions.

### How the Analysis Was Prompted

The analysis itself was done using Claude Code with prompts like:

```
Read these files and trace the full call chain from step definition
to browser interaction:
- test/steps/site.details.steps.js
- test-infrastructure/screenplay/tasks/complete.site.details.js
- test-infrastructure/screenplay/page-interactions/site.name.page.interactions.js
- test-infrastructure/pages/site.name.page.js

For each step, show me: step text → task → interaction → page interaction → page object → selector/action
```

This produced a clear map of what each Gherkin step actually did at the browser level, which became the specification for the new Playwright implementation.

### Mapping Legacy Files to New Structure

A key analysis prompt was asking the AI to categorise every file in the legacy codebase:

```
List every file under test-infrastructure/ and categorise them:
- Which files contain actual page selectors?
- Which files contain business logic (form filling, navigation)?
- Which files are pure abstraction (just forwarding calls)?
- Which files are shared infrastructure (auth, config)?
```

This revealed:

- **37 page objects** contained the selectors — these mapped directly to the new `test-pw/pages/` files
- **91 interactions + 16 page interactions** were mostly thin wrappers — collapsed into step definitions
- **26 tasks** orchestrated multi-step flows — replaced by support functions in `task-flow.js` and `site-details-flow.js`
- **9 factories + 8 models** generated test data — simplified to 4 factory files with plain functions

### Identifying Shared vs Duplicated Logic

The analysis exposed significant duplication in the legacy code. For example:

- Multiple interactions doing `browseTheWeb.click(locator)` with different class names
- Similar page interactions for WGS84 and OSGB36 coordinates with only field names differing
- Tasks that were nearly identical but for different site types

In the new code, these were consolidated:

- One `completeSiteDetailsFlow()` dispatcher that routes by coordinate method and site count
- Factory functions that parameterise the differences (WGS84 vs OSGB36, circle vs boundary)
- Direct Playwright calls in steps instead of wrapper classes

### Extracting Selectors

A critical analysis step was extracting every CSS/XPath selector from the legacy page objects. This was prompted as:

```
From all files in test-infrastructure/pages/, extract every selector
(CSS and XPath). Group them by page and list what each selector targets.
```

This gave a complete selector inventory that was used to build the new page objects. Many selectors worked unchanged in Playwright. Some needed adaptation (e.g., WDIO's `$('=Link Text')` became Playwright's `page.getByRole('link', { name: 'Link Text' })`).

### Understanding the Auth Flow

The authentication flow was the most complex part to analyse because it spanned multiple files:

```
Trace the full authentication flow from scenario start to authenticated state.
Include: hooks (beforeScenario), user registration API calls, OIDC redirects,
cookie handling. Show every HTTP request and page navigation.
```

This revealed the exact sequence: register user via stub API → navigate to app → OIDC redirect to stub → click login link → redirect back → cookie banner. Understanding this flow before coding meant the new `auth.js` and `navigation.js` could be written correctly first time.

### Why Analysis-First Matters for Prompting

The analysis phase made subsequent migration prompts dramatically more effective because:

1. **The AI had the full picture**: Instead of discovering the auth flow mid-migration, it was documented upfront in CLAUDE.md
2. **Architectural decisions were made once**: "Collapse Tasks + Interactions into step definitions" was decided during analysis, not debated during each batch
3. **Selector inventory prevented guesswork**: The AI didn't need to inspect the running application — it had every selector catalogued
4. **Duplication was identified early**: The consolidation strategy (dispatcher pattern, parameterised factories) was designed before any code was written
5. **Edge cases surfaced during analysis**: Multi-site flows, file upload quirks, and CYA change chains were all understood before migration

Without this upfront analysis, each batch would have required the AI to re-discover the legacy architecture, leading to inconsistent patterns and wasted iterations.

## The Migration Approach

### Phased Batches

The migration was done in **6 batches** (Phase 0 + 5 batches), each completed in a single Claude Code session. This incremental approach was key:

1. **Phase 0 (Foundation)**: Set up `test-pw/` directory, Cucumber standalone runner, Playwright browser lifecycle, and a proof-of-concept with 4 simple scenarios
2. **Batch 1 (Core pages)**: Cookies, headers, privacy, public register — 28 scenarios
3. **Batch 2 (Site details - manual)**: All manual coordinate entry scenarios — 41 scenarios
4. **Batch 3 (Site details - file upload)**: KML and Shapefile upload scenarios — 23 scenarios
5. **Batch 4 (CYA + change flows)**: Check your answers and edit flows — 34 scenarios
6. **Batch 5 (Submit + dashboard)**: End-to-end submit, dashboard, redirect, MCMS — 13 scenarios

### Why Batches Work

- Each batch builds on the support infrastructure created by previous batches
- Earlier batches establish patterns (auth, navigation, page objects) that later batches reuse
- Smaller scope per session means fewer errors and easier debugging
- The AI learns from the established patterns and follows conventions consistently

## How Prompting Was Optimised

### Prompt Structure That Worked

Each batch used a structured prompt with these key sections:

**1. Context setting** — Tell the AI exactly what exists already:

```
The test-pw/ directory already has: world.js, hooks.js, config.js, auth.js,
navigation.js. There are 32 scenarios passing. The feature files are shared
with the legacy suite in test/features/.
```

**2. Explicit scope** — List exactly which feature files and scenarios to migrate:

```
Migrate these feature files:
- site.details.manual.polygon.feature (7 scenarios, 1 @wip)
- validation.site.details.feature (3 scenarios)
- manual.site.details.multi.site.feature (4 scenarios, 2 @smoke)
```

**3. Reference the legacy code** — Point to the existing Screenplay implementation:

```
The legacy implementation is in:
- test/steps/site.details.steps.js (step definitions)
- test-infrastructure/screenplay/tasks/complete.site.details.js (task)
- test-infrastructure/screenplay/page-interactions/ (page interactions)
- test-infrastructure/pages/ (page objects)
```

**4. Architectural constraints** — Enforce the patterns you want:

```
Rules:
- Use Page Object Model (not Screenplay)
- Steps call page objects directly (no task/interaction layer)
- Factory functions for test data (no builder pattern)
- Relative imports in test-pw/ (no ~/ alias)
- Do NOT modify feature files (shared with legacy)
```

**5. Run and verify** — Ask the AI to run tests and fix failures:

```
After creating the files, run: npx cucumber-js --config cucumber.pw.mjs
Fix any failures before finishing.
```

### What Made Prompts Effective

**Be specific about what NOT to do:**

- "Do NOT modify feature files" prevented the AI from changing shared test specifications
- "No builder pattern" prevented over-engineering of test data factories
- "No ~/ alias in test-pw/" kept the new code independent of the legacy module system

**Reference existing patterns:**

- Once Batch 1 established the auth flow and navigation pattern, subsequent prompts could say "follow the same pattern as navigation.js" and the AI would be consistent

**Include the gotchas upfront:**

- After discovering a gotcha in one batch (e.g., "cookie banner buttons use `button[name='analytics']` not `input[name='analytics']`"), including it in the next prompt prevented the same mistake
- The CLAUDE.md "Known Gotchas" section grew with each batch

**Let the AI run tests:**

- Instead of reviewing every line manually, having the AI run `cucumber-js` and fix failures was far more efficient
- The AI could iterate through failures, understand Playwright error messages, and fix selectors/waits

### Prompt Evolution Across Batches

**Batch 1 (verbose, exploratory):**

- Long prompts explaining the project structure, ESM setup, auth flow in detail
- Had to explain Cucumber-js v12 config format (default export vs named exports)
- Lots of back-and-forth on selector strategies

**Batch 2-3 (established patterns):**

- Shorter prompts referencing "follow the pattern in site-details-flow.js"
- Could say "create factory functions like exemption.js" without explaining the pattern
- Focus shifted to the specific page interactions unique to each batch

**Batch 4-5 (refined and efficient):**

- Minimal prompts — just the feature file list and "migrate these using established patterns"
- AI independently created new page objects, steps, and support modules following conventions
- Most time spent on edge cases (e.g., multi-step CYA edit flows) rather than boilerplate

### Key Prompting Lessons

1. **Start with a solid foundation (Phase 0)**: Getting the core infrastructure right — world, hooks, config, auth — means every subsequent batch is just "add more pages and steps"

2. **Maintain a living CLAUDE.md**: This file acts as persistent instructions for the AI. Every gotcha, pattern decision, and architectural rule goes here. The AI reads it at the start of every session.

3. **Batch by functional area, not by file count**: Group related features together (e.g., all site details, all CYA flows) rather than arbitrary batches. This lets the AI build coherent support modules.

4. **Don't over-specify implementation details**: Tell the AI WHAT to migrate and WHAT patterns to follow, but let it figure out HOW. Specifying every selector and function signature makes prompts fragile and slow.

5. **Let failures guide fixes**: Running the tests and having the AI fix failures is faster than trying to write perfect code in one shot. Playwright error messages are descriptive enough for the AI to self-correct.

6. **Accumulate gotchas systematically**: Each batch discovers 5-10 gotchas. Adding these to CLAUDE.md means the AI never makes the same mistake twice across sessions.

## The CLAUDE.md File

The `CLAUDE.md` file at the project root is the most important file for AI-assisted development. It contains:

- **Architecture overview**: Legacy vs new stack, layer diagrams
- **Technical constraints**: ESM, imports, auth flow, IAT context
- **File structure**: Every file in test-pw/ with its purpose
- **Migration progress**: Batch-by-batch tables of what was migrated
- **Known gotchas**: 30+ documented pitfalls with solutions
- **Commands**: How to run tests, generate reports, debug
- **Environment config**: All supported environments and variables

When a new Claude Code session starts, CLAUDE.md is loaded automatically. This means the AI starts every session with full project context — no need to re-explain the architecture or repeat past decisions.

## Estimated Effort

| Batch                               | Scenarios | Estimated Effort |
| ----------------------------------- | --------- | ---------------- |
| Phase 0: Foundation                 | 4         | ~2 hours         |
| Batch 1: Core pages                 | 28        | ~2 hours         |
| Batch 2: Site details (manual)      | 41        | ~3 hours         |
| Batch 3: Site details (file upload) | 23        | ~2 hours         |
| Batch 4: CYA + change flows         | 34        | ~3 hours         |
| Batch 5: Submit + dashboard         | 13        | ~2 hours         |
| **Total**                           | **143**   | **~14 hours**    |

Manual estimate for the same migration: **10-12 weeks**. The AI-assisted approach achieved a **~95% time reduction**.

## Code Reduction

| Metric             | Legacy (Screenplay + WDIO) | New (Playwright + POM) | Reduction |
| ------------------ | -------------------------: | ---------------------: | --------: |
| Files              |                        231 |                     48 |      -79% |
| Lines of code      |                     12,520 |                  4,679 |      -63% |
| Abstraction layers |                        5-6 |                      3 |      -50% |

## Tips for New Starters

1. **Read CLAUDE.md first** — it has the full project context and every known gotcha
2. **Read a page object + its step file together** — e.g., `dashboard.page.js` + `dashboard.steps.js` to see how they connect
3. **Feature files are the source of truth** — they live in `test/features/` and are shared with the legacy suite
4. **Start with a smoke run** — `npm run test:pw:smoke` runs 19 key scenarios in ~2 minutes
5. **Use headed mode for debugging** — `HEADLESS=false npm run test:pw` lets you watch the browser
6. **Check test-data factories** — all test data is generated via factory functions in `test-pw/test-data/`
7. **The auth flow is in navigation.js + auth.js** — understand these two files and you understand how every test starts

## Tools Used

- **Claude Code** — AI-assisted development for the migration
- **Playwright** — Browser automation (bundled Chromium)
- **Cucumber.js v12** — BDD test runner (standalone, not via WDIO)
- **Allure** — Test reporting via `allure-cucumberjs` formatter
- **Faker.js** — Random test data generation
- **Docker Compose** — Local infrastructure (frontend, backend, DEFRA ID stub, MongoDB, Redis, LocalStack)
