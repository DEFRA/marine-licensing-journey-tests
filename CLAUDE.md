# Marine Licensing Journey Tests

## Project Overview

End-to-end journey tests for the DEFRA Marine Licensing service, using Playwright + Cucumber BDD + Page Object Model.

- **Stack**: Playwright + Cucumber.js (v12) + Page Object Model
- **Layers**: Steps → Page Objects → Playwright (3 layers)
- **Run**: `npx cucumber-js --config cucumber.mjs`
- **Smoke**: `npx cucumber-js --config cucumber.mjs --profile smoke`

## Key Technical Details

### ESM & Imports

- Project uses `"type": "module"` with relative imports throughout

### Authentication Flow

1. Navigate to app URL with IAT query params (`ACTIVITY_TYPE`, `ARTICLE`, `pdfDownloadUrl`)
2. OIDC redirects to DEFRA ID stub
3. Click user login link on stub page
4. Redirect back to app → cookie banner

### IAT Context

Every navigation requires IAT context query params. Use `generateIatContext()` from `test/test-data/exemption.js`.

### Test User Management

- Register: `POST {stubUrl}/cdp-defra-id-stub/API/register`
- Expire: `POST {stubUrl}/cdp-defra-id-stub/API/register/{userId}/expire`
- Fresh user per scenario, cleaned up in After hook

### Cucumber-js v12 Config

- Default export = default profile (flat object, NOT nested under `default` key)
- Named exports = named profiles
- `progress` formatter (not `progress-bar` — fails in non-TTY)
- `setDefaultTimeout(120_000)` required (default 5s too short for auth redirects)

## File Structure

```
test/
  features/           # Gherkin feature files
  resources/          # Test resource files (KML, shapefiles, etc.)
  support/
    world.js              # Cucumber World with Playwright page/context
    hooks.js              # BeforeAll/Before/After/AfterAll/AfterStep lifecycle
    config.js             # Environment config (local/CI/CDP)
    auth.js               # Test user registration, login, cookie acceptance
    navigation.js         # navigateAndAuthenticate, signOut, navigateAndReAuthenticate, navigateWithRawQueryString
    site-details-flow.js  # Site details page actions + flow orchestration
    task-flow.js          # completeAllTasks, submitNotification, clickReviewAndSend, clickConfirmAndSend
  pages/
    project.name.page.js        # Project name entry
    task.list.page.js            # Task list page (selectTask, getReviewAndSendButton)
    public.register.page.js      # Public register consent form
    check.your.answers.page.js   # CYA page with Change link selectors
    review.site.details.page.js  # Review site details with Change/Delete link selectors
    delete.site.details.page.js  # Delete confirmation (confirm/cancel)
    dashboard.page.js            # Dashboard with projects table + CRUD operations
    confirmation.page.js         # Submission confirmation + reference validation
    view.details.page.js         # View submitted notification details
    delete.project.page.js       # Delete project confirmation
  steps/                  # Step definitions using Playwright directly
  test-data/
    exemption.js          # Project name, IAT context, public register factories
    site-details.js       # Circle, boundary, polygon, multi-site data factories
    file-upload.js        # File upload data factories (KML/Shapefile, single/multi-site)
    check-your-answers.js # CYA data factories (wraps site-details + public register)
cucumber.mjs           # Cucumber runner config with profiles
```

## Tag Exclusions

| Tag              | Reason                                        |
| ---------------- | --------------------------------------------- |
| `@wip`           | Work in progress — not yet implemented in app |
| `@bug`           | Known bug — MCMS context in same session      |
| `@local-only`    | Virus scanning only available locally         |
| `@d365`          | Requires Dynamics 365 integration             |
| `@fivium`        | Requires Fivium IAT launcher                  |
| `@real-defra-id` | Requires real DEFRA ID (not stub)             |

## Known Gotchas

- Cookie banner buttons: `button[name="analytics"]`; policy page radios: `input[name="analytics"]`
- "no links are displayed in the header" — original test is a no-op (empty array loop); project name page actually shows 4 nav links
- Playwright cookies: `page.context().cookies()`, `cookies_policy` value is base64-encoded JSON
- New tab handling: `page.waitForEvent('popup')` BEFORE clicking the link
- `navigateAndAuthenticate(world, path, { skipCookies: true })` for cookie banner tests
- "a user has submitted" Given step performs full notification flow (completeAllTasks → submit → store reference)
- Activity dates MUST be in the future — use `new Date().getFullYear() + 1` (static year will break over time)
- Remove point button selector: `[name="remove"][value="${index}"]` (0-based index, not "Remove point N" text)
- `page.setDefaultTimeout(30_000)` in hooks — prevents infinite waits when validation tests try non-existent elements
- Validation tests wrap `completeSiteDetailsFlow` in try-catch — flow stops at error page, Then step checks error
- Polygon error selectors: `#coordinates-{index}-{type}-error` where index is 0-based and type is latitude/longitude/eastings/northings
- Playwright file upload: `page.locator('input[type="file"]').setInputFiles(absolutePath)` — use `path.resolve(process.cwd(), relativePath)`
- File type radio selectors: `#fileUploadType` = Shapefile (first), `#fileUploadType-2` = KML (second)
- File upload error selector: `#file-id-error`
- `expectValidationError` flag in file upload data skips dates/description entry for error scenarios
- Multi-site file upload review page: "Add" links use XPath `//h2[contains(text(), "Site N details")]/ancestor::div[...]/dt[...]/dd/dd//a[text()="Add"]`
- Shapefile 7-site save can be slow — 30s timeout borderline for Continue click on review page
- CYA→Review→Edit→Review: After editing via Review page, must click `button:has-text("Continue")` on Review to return to CYA
- Heading selectors: Use `'h1, h2, .govuk-heading-l, .govuk-heading-xl'` with `.first()` and `{ timeout: 30_000 }` for page heading assertions
- Playwright `expect` default timeout is 5000ms — separate from `page.setDefaultTimeout(30_000)`, must pass `{ timeout: 30_000 }` explicitly
- "Add another site" is `button[name="add"]`, NOT `a:has-text("Add another site")`
- XPath for Change links: `//h2[contains(text(), "CARD")]/ancestor::div[contains(@class, "govuk-summary-card")]//dt[...]/following-sibling::dd/following-sibling::dd//a[text()="Change"]`
- Delete confirmation button: `xpath=//button[normalize-space(text())="Yes, delete all site details"]`
- `completeAllTasks` flow: navigate → auth → project name → site details → Continue → public register → save
- `clickReviewAndSend`: needs `waitForLoadState('load')` after click to avoid heading assertion race
- User registration must happen BEFORE `page.goto()` in `navigateAndAuthenticate` and `navigateWithRawQueryString`. The DEFRA ID stub renders the authorize page with registered users at render time. If you navigate first then register, the login link won't appear on the already-rendered page. Register-first-then-navigate ensures the login link is present.

## Commands

```bash
# Run all scenarios
npm test

# Run smoke tests only
npm run test:smoke

# Run GitHub CI profile
npm run test:github

# Run CDP pipeline profile (environment-aware tag switching)
npm run test:cdp

# Run with parallel workers
MAX_INSTANCES=4 npm test

# Run debug mode (forces serial execution)
DEBUG=true npm test

# Dry-run (check step matching without executing)
npx cucumber-js --config cucumber.mjs --dry-run

# Run headed (see browser)
HEADLESS=false npm test

# Allure reporting
npm run report          # Generate allure-report/ from allure-results/
npm run report:open     # Generate + open in browser
npm run report:publish  # Generate + upload to S3 (requires RESULTS_OUTPUT_S3_PATH)
```

## Parallel Execution

- Configured via `parallel` option in `cucumber.mjs` using `MAX_INSTANCES` env var
- Default: `1` (sequential). Set `MAX_INSTANCES=4` for 4 parallel workers
- Each Cucumber.js worker gets its own browser instance (BeforeAll), context/page per scenario (Before)
- No shared state between workers — parallel-safe by design

## Allure Reporting

### Configuration (`cucumber.mjs`)

- **Reporter**: `allure-cucumberjs/reporter` in format list (all profiles including `github`)
- **Results directory**: `allure-results/`
- **Issue link template**: `https://eaflood.atlassian.net/browse/%s`
- **Pattern**: `/@issue=(.*)/` — parses `@issue=ML-XXX` tags from feature files into clickable Jira links
- **Environment info**: Browser (Chromium), Framework (Playwright + Cucumber)

### allure-cucumberjs Config Format (v3.x)

- `links` must be an **object** (not an array) — keyed by link type (`issue`, `tms`, etc.)
- Each link type has `pattern` (array of regex with capture group) and `urlTemplate` (`%s` placeholder)
- Config goes in `formatOptions` at the top level (not nested under an `allure` key)

### Screenshots & Attachments

Handled automatically by `test/support/hooks.js`:

- `AfterStep`: screenshot after every step (allure-cucumberjs picks up via `this.attach()`)
- `After` (on failure): full-page screenshot, failure URL, JSON data, test user info

## CI/CD Pipeline

### Entrypoint (`entrypoint.sh`)

Used by Docker/CDP pipeline:

```
1. npm run test:cdp          → runs tests, generates allure-results/
2. Capture test exit code    → stored before report generation
3. npm run report:publish    → allure generate + S3 upload
4. Exit with test exit code  → pipeline fails if tests failed
```

### Report Publishing Chain

```
cucumber-js → allure-results/ → allure generate → allure-report/ → publish-tests.sh → S3
```

- `bin/publish-tests.sh` uploads `allure-report/` to `$RESULTS_OUTPUT_S3_PATH` via AWS CLI
- `npm run report:publish` chains: `npm run report` (generate) + `./bin/publish-tests.sh` (upload)

### GitHub Actions

- Workflow: `.github/workflows/run-tests-and-publish.yml`
- Composite action: `run-journey-tests/action.yml`
- Runs `npm run test:github` → uploads `allure-results/` and `allure-report/` as artifacts → deploys to GitHub Pages
- PR comment with pass rate extracted from `cucumber-results.json`

## Environment Configuration

### Supported Environments

| Environment      | How to Select                 | Base URL                                                         |
| ---------------- | ----------------------------- | ---------------------------------------------------------------- |
| **Local Docker** | `ENVIRONMENT=local` (default) | `http://marine-licensing-frontend:3000`                          |
| **CDP dev**      | `ENVIRONMENT=dev`             | `https://marine-licensing-frontend.dev.cdp-int.defra.cloud`      |
| **CDP pre-test** | `ENVIRONMENT=pre-test`        | `https://marine-licensing-frontend.pre-test.cdp-int.defra.cloud` |
| **CDP test**     | `ENVIRONMENT=test`            | `https://marine-licensing-frontend.test.cdp-int.defra.cloud`     |
| **CDP prod**     | `ENVIRONMENT=prod`            | `https://marine-licensing-frontend.prod.cdp-int.defra.cloud`     |

Environment is selected via `ENVIRONMENT` env var in `test/support/config.js`. Can also override with `BASE_URL` and `DEFRA_ID_URL` directly.

### Cucumber Profiles

| Profile     | Command                                 | Scenarios               | Tags                                                                                                                          |
| ----------- | --------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **default** | `npx cucumber-js --config cucumber.mjs` | All in paths list       | Excludes @wip/@bug/@d365/@real-defra-id/@fivium/@local-only                                                                   |
| **smoke**   | `--profile smoke`                       | 19                      | `@smoke`                                                                                                                      |
| **all**     | `--profile all`                         | ~143                    | Excludes @wip/@bug/@d365/@real-defra-id/@fivium                                                                               |
| **github**  | `--profile github`                      | ~143                    | Excludes @wip/@bug/@d365/@real-defra-id/@fivium/@local-only                                                                   |
| **cdp**     | `--profile cdp`                         | Varies by `ENVIRONMENT` | `ENVIRONMENT=test`: @real-defra-id/@d365/@fivium only; otherwise: excludes @wip/@bug/@d365/@real-defra-id/@fivium/@local-only |

### Environment Variables

```bash
ENVIRONMENT              # CDP env: local|dev|pre-test|test|prod (default: local)
BASE_URL                 # Override base URL completely
DEFRA_ID_URL             # Override DEFRA ID stub URL completely
HEADLESS                 # true|false (default: true)
MAX_INSTANCES            # Parallel workers (default: 1)
DEBUG                    # true|false — forces serial execution (parallel=1)
RESULTS_OUTPUT_S3_PATH   # S3 path for report publishing (CDP pipeline)
```
