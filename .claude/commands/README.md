# Claude Code Custom Commands

Custom slash commands for the marine licensing journey tests project.

## Available Commands

### `/lcml-test`

Generates LCML (marine licence) journey test feature files and step definitions.

**Usage:**

```
/lcml-test <description of the test scenario>
```

**Examples:**

```
/lcml-test add a scenario for changing project name from check your answers
/lcml-test write validation test for empty project name
/lcml-test add a scenario to verify the declaration page content
/lcml-test write a test for deleting a draft marine licence application
```

**What it does:**

1. Reads existing LCML features and steps to understand current coverage
2. Creates a feature file in `test/features/lcml.<name>.feature` with `@lcml` tag
3. Creates step definitions in `test-pw/steps/lcml.<name>.steps.js`
4. Runs the test to verify it passes
5. Uses Playwright MCP to discover selectors if needed

**Running LCML tests:**

```bash
# Run all LCML tests
npm run test:lcml

# Run a specific LCML scenario by name
npx cucumber-js --config cucumber.pw.mjs --profile lcml --name "scenario name" --format summary

# Run headed (watch the browser)
HEADLESS=false npm run test:lcml
```

**Prerequisites:**

- Docker services running: `docker compose up -d`
- `ENABLE_MARINE_LICENCE=true` set in `compose.yml` for the frontend service

**Key files:**

| File                            | Purpose                                         |
| ------------------------------- | ----------------------------------------------- |
| `test/features/lcml.*.feature`  | LCML feature files (tagged `@lcml`)             |
| `test-pw/steps/lcml.*.steps.js` | LCML step definitions                           |
| `test-pw/support/auth.js`       | Authentication helpers (shared with exemptions) |
| `test-pw/support/config.js`     | Environment config                              |
| `test-pw/pages/*.page.js`       | Page objects (shared with exemptions)           |
| `cucumber.pw.mjs`               | Cucumber config with `lcml` profile             |
