# Playwright + Cucumber BDD Journey Tests

End-to-end journey tests for the Marine Licensing service using **Playwright** and **Cucumber.js (v12)** with a Page Object Model architecture.

## Quick Start

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install chromium --with-deps

# Run all tests (headed)
npm run test:pw

# Run smoke tests only
npm run test:pw:smoke

# Run headless
npm run test:pw:headless
```

## NPM Scripts

| Script             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `test:pw`          | Run all tests (default profile)                         |
| `test:pw:smoke`    | Run smoke-tagged scenarios only                         |
| `test:pw:headless` | Run all tests headless                                  |
| `test:pw:github`   | Run with GitHub CI settings (10 parallel workers)       |
| `test:pw:cdp`      | Run with CDP environment settings (10 parallel workers) |
| `clean:pw`         | Remove `allure-results/` and `allure-report/`           |
| `report:pw`        | Generate single-file Allure HTML report                 |
| `report:pw:open`   | Generate and open Allure report in browser              |

## Running Multiple Instances Locally

By default, tests run with 1 worker locally. To run scenarios in parallel, set the `MAX_INSTANCES` environment variable:

```bash
# Run with 3 parallel workers
MAX_INSTANCES=3 npm run test:pw

# Run with 5 parallel workers (headless recommended for multiple instances)
MAX_INSTANCES=5 npm run test:pw:headless

# Run smoke tests with 2 parallel workers
MAX_INSTANCES=2 npm run test:pw:smoke
```

Each worker runs scenarios in its own isolated browser context, so there are no shared state conflicts. However, keep in mind:

- **Resource usage**: Each worker uses its own browser context within the shared Chromium instance. More workers = more memory and CPU.
- **DEFRA ID stub**: Each scenario registers and expires its own test user, so parallel scenarios won't conflict.
- **Start conservatively**: 3-5 workers is a good starting point for local development. Increase if your machine handles it comfortably.
- **Debugging**: Set `DEBUG=true` to force single-worker mode regardless of `MAX_INSTANCES`.

## Environment Variables

| Variable                 | Default                          | Description                                       |
| ------------------------ | -------------------------------- | ------------------------------------------------- |
| `ENVIRONMENT`            | `local`                          | Target environment (`local`, `dev`, `test`, etc.) |
| `BASE_URL`               | Auto-resolved from `ENVIRONMENT` | Frontend URL to test against                      |
| `DEFRA_ID_URL`           | Auto-resolved from `ENVIRONMENT` | DEFRA ID stub URL                                 |
| `HEADLESS`               | `true`                           | Set to `false` to run headed                      |
| `MAX_INSTANCES`          | `1` (local) / `10` (CI)          | Parallel Cucumber workers                         |
| `DEBUG`                  | `false`                          | Forces `parallel: 1` for debugging                |
| `DEFRA_ID_USER_ID`       | -                                | Real DEFRA ID username (when `ENVIRONMENT=test`)  |
| `DEFRA_ID_USER_PASSWORD` | -                                | Real DEFRA ID password (when `ENVIRONMENT=test`)  |
| `DEFRA_ID_ORG_NAME`      | `Windfarm Co`                    | Organisation name for real DEFRA ID               |

## Running Real DEFRA ID Tests

Tests tagged `@real-defra-id` run against the actual Government Gateway login (not the stub). These only execute when `ENVIRONMENT=test` via the `cdp` profile.

### Required Environment Variables

```bash
ENVIRONMENT=test
DEFRA_ID_USER_ID=<Government Gateway user ID>
DEFRA_ID_USER_PASSWORD=<Government Gateway password>
```

### How to Run

```bash
# Run real DEFRA ID tests on the test environment
ENVIRONMENT=test \
  DEFRA_ID_USER_ID=94849150XX \
  DEFRA_ID_USER_PASSWORD=YourPassword \
  npm run test:pw:cdp
```

When `ENVIRONMENT=test`, the `cdp` profile switches tags to `@real-defra-id or @d365 or @fivium`, running only the tests that require real integrations. The base URL resolves to `https://marine-licensing-frontend.test.cdp-int.defra.cloud`.

### Authentication Flow (Real DEFRA ID)

1. Navigate to the app — OIDC redirects to the Government Gateway login
2. Select **Government Gateway** radio option and continue
3. Enter `DEFRA_ID_USER_ID` and `DEFRA_ID_USER_PASSWORD` credentials
4. Select the organisation if prompted (defaults to `Windfarm Co`)
5. Redirect back to the Marine Licensing app

The credentials are for the **test environment only** — never commit them to source control. Pass them as environment variables or CI secrets.

## Entrypoint (CDP Pipeline)

When tests run on the CDP platform, `entrypoint.sh` at the project root is the entry point. It:

1. Runs the test suite using the `cdp` profile (`npm run test:pw:cdp`)
2. Publishes the Allure report (`npm run report:publish`)
3. Exits with a failure code if either step fails — report publishing failures are surfaced before test failures

The `RUN_ID` environment variable is passed in by the CDP pipeline for tracking.

## Cucumber Configuration

The test runner is **Cucumber.js** (not WebDriverIO). All tests are launched via:

```bash
cucumber-js --config cucumber.pw.mjs
```

The configuration file `cucumber.pw.mjs` at the project root is the single entrypoint that controls:

- **Feature file paths**: Where Cucumber looks for `.feature` files (`test/features/` and `test-pw/features/`)
- **Step and support imports**: `test-pw/steps/**/*.js` and `test-pw/support/**/*.js`
- **Profiles**: Named exports define different run configurations (see [Cucumber Profiles](#cucumber-profiles))
- **Formatters**: Progress output, HTML report, JSON results, and Allure reporting
- **Parallelism**: Controlled by `MAX_INSTANCES` env var, overridden by `DEBUG=true`

The npm scripts are convenience wrappers that select a profile and add the progress formatter:

```bash
# These are equivalent:
npm run test:pw
cucumber-js --config cucumber.pw.mjs --format ./test-pw/support/progress-formatter.js

# Selecting a profile:
npm run test:pw:smoke    # uses --profile smoke
npm run test:pw:github   # uses --profile github (10 workers, JSON output)
npm run test:pw:cdp      # uses --profile cdp (10 workers, real DEFRA ID when ENVIRONMENT=test)
```

## Project Structure

```
test-pw/
  features/           # Feature files specific to Playwright tests
  pages/              # Page Object Model classes
  steps/              # Cucumber step definitions
  support/            # Framework support (hooks, config, auth, helpers)
  test-data/          # Test data factory functions
  README.md           # This file

cucumber.pw.mjs        # Cucumber runner configuration (entrypoint)
```

### Pages (Page Object Model)

Page objects define locators and actions for each page of the application:

| Page                          | Description                                          |
| ----------------------------- | ---------------------------------------------------- |
| `task.list.page.js`           | Task list with task selection and review button      |
| `project.name.page.js`        | Project name entry                                   |
| `dashboard.page.js`           | Projects table with CRUD actions and sort assertions |
| `cookie.banner.page.js`       | Cookie consent banner                                |
| `cookies.policy.page.js`      | Cookies policy page                                  |
| `confirmation.page.js`        | Submission confirmation with reference extraction    |
| `check.your.answers.page.js`  | Check your answers summary                           |
| `review.site.details.page.js` | Review site details page                             |
| `public.register.page.js`     | Public register consent and reason                   |
| `view.details.page.js`        | View submitted notification details                  |
| `delete.project.page.js`      | Delete project confirmation                          |
| `delete.site.details.page.js` | Delete site details page                             |
| `header.page.js`              | Header component                                     |
| `footer.page.js`              | Footer component                                     |
| `privacy.policy.page.js`      | Privacy policy page                                  |
| `defra.id.login.page.js`      | DEFRA ID login stub                                  |
| `common.elements.page.js`     | Shared GOV.UK elements                               |

### Support Modules

| Module                  | Description                                                                     |
| ----------------------- | ------------------------------------------------------------------------------- |
| `hooks.js`              | Lifecycle hooks: shared browser, per-scenario context/page, failure attachments |
| `config.js`             | Environment config resolution (URLs, headless, chromium args)                   |
| `world.js`              | Custom Cucumber World with `page`, `browserContext`, `data`, `testUser`         |
| `auth.js`               | User registration/login (stub and real DEFRA ID), cookie acceptance             |
| `navigation.js`         | Navigate, authenticate, sign out, re-authenticate helpers                       |
| `task-flow.js`          | Complete tasks, submit notification, store references                           |
| `site-details-flow.js`  | Site detail page interactions dispatched by entry method                        |
| `progress-formatter.js` | Custom ASCII progress bar formatter for terminal output                         |

### Test Data Factories

Simple factory functions (no builder pattern) in `test-pw/test-data/`:

| Factory                 | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `exemption.js`          | Project names, IAT context, activity dates, public register data       |
| `site-details.js`       | Coordinates (WGS84/OSGB36), circle/boundary data, multi-site data      |
| `file-upload.js`        | KML and Shapefile upload data (valid, virus, wrong type, large, empty) |
| `check-your-answers.js` | Pre-built CYA scenarios combining site details + public register       |

## Cucumber Profiles

Defined in `cucumber.pw.mjs`:

| Profile   | Use Case          | Parallelism | Tags                                                                         |
| --------- | ----------------- | ----------- | ---------------------------------------------------------------------------- |
| `default` | Local development | 1 worker    | Excludes `@wip`, `@bug`, `@d365`, `@real-defra-id`, `@fivium`, `@local-only` |
| `smoke`   | Quick validation  | 1 worker    | `@smoke` only (10 feature files)                                             |
| `github`  | PR checks         | 10 workers  | Same as default                                                              |
| `cdp`     | CDP environment   | 10 workers  | Real DEFRA ID / D365 when `ENVIRONMENT=test`                                 |

## Architecture

### Browser Lifecycle

- **One Chromium instance** shared across all scenarios (launched in `BeforeAll`)
- **New browser context + page** per scenario (created in `Before`, closed in `After`)
- Default step timeout: **120 seconds**
- Page action timeout: **30 seconds**

### Authentication Flow

1. Navigate to the service with IAT query parameters
2. DEFRA ID stub: register test user via API, click login link, redirect back
3. Accept cookie banner
4. After scenario: expire test user via API (cleanup)

When `ENVIRONMENT=test`, real DEFRA ID is used instead of the stub (Government Gateway login flow).

### IAT Context

Every test requires an IAT (Integrated Assessment Tool) context passed as URL query parameters. Test data factories generate this context with randomised activity types, article codes, and PDF download URLs.

### Reporting

- **Allure**: Single-file HTML report via `allure-cucumberjs` formatter. Failure attachments (screenshots, URLs, test data) use Cucumber's native `this.attach()` API.
- **Cucumber HTML**: `cucumber-report.html` generated alongside test run.
- **Cucumber JSON**: `cucumber-results.json` for CI parsing.

### CI/CD

The GitHub Actions workflow (`check-pull-request.yml`) runs:

1. Lint checks (prettier, eslint, gherkin standards, step analysis)
2. Docker Compose up (MongoDB, Redis, LocalStack, frontend, backend, DEFRA ID stub)
3. `npm run test:pw:github` with 10 parallel workers
4. Allure report generation and artifact upload
5. PR comment with pass/fail summary
