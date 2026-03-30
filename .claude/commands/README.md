# Claude Code Custom Commands

Custom slash commands for the marine licensing journey tests project.

## Available Commands

### `/lcml-test`

Generates LCML (marine licence) journey test feature files and step definitions. Focuses on user journey flows — does not create tests for field validations or error messages.

**Usage:**

```
/lcml-test <acceptance criteria or description>
```

**Examples:**

```
/lcml-test add a scenario for the other authorities task flow
/lcml-test write a test for the site details journey through to choose file type
/lcml-test add a scenario to verify the declaration page content
/lcml-test write a test for deleting a draft marine licence application
```

**What it does:**

1. Reads existing LCML features and steps to identify reusable steps
2. Filters ACs — skips validation/error ACs, focuses on journey flow
3. Consolidates sequential page flows into single scenarios
4. Reuses existing generic steps (`the user clicks Continue`, `the user selects {string}`, etc.)
5. Creates/updates feature files in `test/features/lcml.<name>.feature` with `@lcml` tag
6. Creates/updates step definitions in `test/steps/lcml.<name>.steps.js`
7. Runs the test to verify it passes

### `/lcml-manual-test`

Manually tests the LCML journey against acceptance criteria using Playwright MCP. Navigates the app in a real browser, takes screenshots, and produces a `.docx` test evidence report.

**Usage:**

```
/lcml-manual-test <acceptance criteria to test>
```

**Examples:**

```
/lcml-manual-test AC1 - Display page ... AC2 - Validation ... AC3 - Continue ...
/lcml-manual-test test the other authorities page validation and navigation
```

**What it does:**

1. Starts the Docker services if not running
2. Registers a test user with DEFRA ID stub
3. Navigates the app using Playwright MCP browser tools
4. For each AC: performs the action, verifies the outcome, takes a screenshot
5. Generates a `.docx` report at `manual-test-evidence/test-report.docx` with:
   - All screenshots embedded inline
   - PASS/FAIL status (colour-coded) per AC
   - Given/When/Then for each AC
   - Observations and a summary table
6. Cleans up temporary files

**Output:**

```
manual-test-evidence/
  01-ac1-screenshot.png
  02-ac2-screenshot.png
  ...
  test-report.docx          # Word document with all screenshots embedded
```

**Note:** The `manual-test-evidence/` directory is gitignored — evidence files are not committed.

### `/commit`

Creates a well-formatted git commit following the project's conventions.

## Running Tests

```bash
# Run all LCML tests
npx cucumber-js --config cucumber.mjs --profile lcml --format summary

# Run a specific LCML scenario by name
npx cucumber-js --config cucumber.mjs --profile lcml --name "scenario name" --format summary

# Run headed (watch the browser)
HEADLESS=false npx cucumber-js --config cucumber.mjs --profile lcml --format summary
```

**Prerequisites:**

- Docker services running: `docker compose up --build --pull always -d`

**Key files:**

| File                           | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `test/features/lcml.*.feature` | LCML feature files (tagged `@lcml`)             |
| `test/steps/lcml.*.steps.js`   | LCML step definitions                           |
| `test/support/auth.js`         | Authentication helpers (shared with exemptions) |
| `test/support/config.js`       | Environment config                              |
| `cucumber.mjs`                 | Cucumber config with `lcml` profile             |
