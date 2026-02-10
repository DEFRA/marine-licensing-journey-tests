# Marine Licensing Journey Tests

## Project Overview

End-to-end journey tests for the DEFRA Marine Licensing service, using Cucumber BDD with feature files in `test/features/`.

**Migration complete**: Screenplay Pattern (WebDriverIO) → Playwright + BDD + Page Object Model (143/143 scenarios, 100%).

## Architecture

### Current (Legacy) - `test-infrastructure/` + `test/steps/`

- **Stack**: WebDriverIO + Cucumber + Screenplay Pattern
- **Layers**: Steps → Tasks → Interactions → Page Objects → WDIO (5-6 layers)
- **Run**: `npm test` (via wdio.conf.js)

### New (Playwright) - `test-pw/`

- **Stack**: Playwright + Cucumber (standalone) + Page Object Model
- **Layers**: Steps → Page Objects → Playwright (3 layers)
- **Run**: `npx cucumber-js --config cucumber.pw.mjs`
- **Smoke**: `npx cucumber-js --config cucumber.pw.mjs --profile smoke`

### Shared

- Feature files in `test/features/` are shared between old and new implementations
- Do NOT modify feature files (would break legacy tests)

## Key Technical Details

### ESM & Imports

- Project uses `"type": "module"` with `~/` path aliases via `esm-module-alias`
- New `test-pw/` code uses relative imports (no `~/` alias needed)

### Authentication Flow

1. Navigate to app URL with IAT query params (`ACTIVITY_TYPE`, `ARTICLE`, `pdfDownloadUrl`)
2. OIDC redirects to DEFRA ID stub
3. Click user login link on stub page
4. Redirect back to app → cookie banner

### IAT Context

Every navigation requires IAT context query params. Use `generateIatContext()` from `test-pw/test-data/exemption.js`.

### Test User Management

- Register: `POST {stubUrl}/cdp-defra-id-stub/API/register`
- Expire: `POST {stubUrl}/cdp-defra-id-stub/API/register/{userId}/expire`
- Fresh user per scenario, cleaned up in After hook

### Cucumber-js v12 Config

- Default export = default profile (flat object, NOT nested under `default` key)
- Named exports = named profiles
- `progress` formatter (not `progress-bar` — fails in non-TTY)
- `setDefaultTimeout(120_000)` required (default 5s too short for auth redirects)

## File Structure (New - test-pw/)

```
test-pw/
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
cucumber.pw.mjs           # Cucumber runner config with profiles
```

## Migration Progress Summary

### Overall Status

| Metric                                                                | Count                             |
| --------------------------------------------------------------------- | --------------------------------- |
| **Total feature files in repo**                                       | 33                                |
| **Total scenarios in repo**                                           | 152                               |
| **Eligible scenarios** (excl. @d365/@fivium/@real-defra-id/@wip/@bug) | 143                               |
| **Migrated feature files**                                            | 29                                |
| **Migrated scenarios (defined)**                                      | 146                               |
| **Migrated scenarios (runnable)**                                     | 143 (excl. 1 @wip, 2 @local-only) |
| **Smoke scenarios**                                                   | 19                                |
| **Migration progress**                                                | **143/143 (100%)**                |
| **Remaining scenarios**                                               | 0                                 |

### Tag Exclusions

| Tag              | Reason                                        | Scenarios                                  |
| ---------------- | --------------------------------------------- | ------------------------------------------ |
| `@wip`           | Work in progress — not yet implemented in app | 2 (manual polygon + redirect view details) |
| `@bug`           | Known bug — MCMS context in same session      | 1                                          |
| `@local-only`    | Virus scanning only available locally         | 2 (KML + Shapefile virus)                  |
| `@d365`          | Requires Dynamics 365 integration             | Excluded from migration                    |
| `@fivium`        | Requires Fivium IAT launcher                  | Excluded from migration                    |
| `@real-defra-id` | Requires real DEFRA ID (not stub)             | Excluded from migration                    |

## Migration Effort & Performance

### What was migrated

The entire end-to-end test suite was migrated from the Screenplay Pattern (WebDriverIO + Selenium) to Playwright + Cucumber (standalone) + Page Object Model. The migration was done in 6 batches (Phase 0 + 5 batches) using Claude Code with structured prompts.

### Code reduction

| Metric            | Legacy (Screenplay + WDIO) | New (Playwright + POM) | Reduction |
| ----------------- | -------------------------: | ---------------------: | --------: |
| **Files**         |                        231 |                     48 |      -79% |
| **Lines of code** |                     12,520 |                  4,679 |      -63% |
| **Layers**        |                        5-6 |                      3 |      -50% |

Legacy breakdown: 37 pages, 91 interactions, 26 tasks, 16 page-interactions, 8 models, 9 factories, 24 step files, plus supporting infrastructure.

New breakdown: 17 pages, 20 step files, 7 support modules, 4 test-data factories.

### Test suite runtime

| Profile                     | Scenarios | Runtime |
| --------------------------- | --------: | ------: |
| **Full suite** (sequential) |       148 | ~12 min |
| **Full suite** (4 workers)  |       148 |  ~5 min |
| **Smoke**                   |        19 |  ~2 min |

### Estimated migration effort per batch

Each batch was completed in a single Claude Code session using the prompts in the "Migration Prompts" section below.

| Batch                          | Scenarios | New files | Estimated effort |
| ------------------------------ | --------: | --------: | ---------------: |
| Phase 0: Foundation            |         4 |         8 |         ~2 hours |
| Batch 1: Core pages            |        28 |         8 |         ~2 hours |
| Batch 2: Site details (manual) |        41 |         4 |         ~3 hours |
| Batch 3: Site details (file)   |        23 |         2 |         ~2 hours |
| Batch 4: CYA + change flows    |        34 |        11 |         ~3 hours |
| Batch 5: Submit + dashboard    |        13 |         8 |         ~2 hours |
| **Total**                      |   **143** |    **41** |    **~14 hours** |

### Time saved using Claude Code

| Metric                        |       Estimate |
| ----------------------------- | -------------: |
| **Manual migration estimate** |   ~10–12 weeks |
| **With Claude Code**          |      ~14 hours |
| **Time saved**                | ~95% reduction |

Manual estimate based on: 143 scenarios across 29 feature files, rewriting 231 files (12,520 LOC) of Screenplay/WDIO infrastructure into Playwright/POM (48 files, 4,679 LOC), including learning Playwright APIs, debugging auth flows, file upload handling, and multi-site coordinate entry logic.

### Key dependencies

- Docker Compose services running locally (frontend, backend, defra-id-stub, cdp-uploader, redis, mongodb, localstack)
- Chromium `--host-resolver-rules` to resolve Docker hostnames from the host browser
- DEFRA ID stub for OIDC authentication (not real DEFRA ID)

## Migration Plan & Progress

### Phase 0: Foundation (COMPLETE)

- Created `test-pw/` directory structure
- Cucumber standalone runner, Playwright browser lifecycle
- POC: 4 scenarios (task.list + validation.project.name)

### Phase 1 Batch 1 (COMPLETE) — 32 scenarios passing

| Feature                            | Scenarios | Tags |
| ---------------------------------- | --------- | ---- |
| task.list.feature                  | 1         |      |
| validation.project.name.feature    | 3         |      |
| cookies.feature                    | 10        |      |
| header.and.footer.feature          | 5         |      |
| privacy.policy.feature             | 1         |      |
| public.register.feature            | 9         |      |
| validation.public.register.feature | 3         |      |
| **Subtotal**                       | **32**    |      |

### Phase 1 Batch 2 (COMPLETE) — Site Details (Manual Entry) — 73 cumulative

| Feature                                       | Scenarios               | Tags            |
| --------------------------------------------- | ----------------------- | --------------- |
| site.details.manual.polygon.feature           | 7                       | 1 @wip excluded |
| validation.site.details.feature               | 3                       |                 |
| validation.centre.point.coordinates.feature   | 6                       |                 |
| validation.coordinates.leading.zeroes.feature | 9                       |                 |
| validation.polygon.osgb36.coordinates.feature | 3                       |                 |
| validation.polygon.wgs84.coordinates.feature  | 3                       |                 |
| validation.width.circular.site.feature        | 6                       |                 |
| manual.site.details.multi.site.feature        | 4                       | 2 @smoke        |
| **Subtotal**                                  | **41 new (42 defined)** |                 |

New files:

- `test-pw/test-data/site-details.js` — Factory functions for all site detail types
- `test-pw/support/site-details-flow.js` — Page actions + flow orchestration (single/multi-site, navigation helpers)
- `test-pw/steps/site.details.steps.js` — Polygon, multi-site, leading zeroes, task completion steps
- `test-pw/steps/site.details.validation.steps.js` — Validation navigation, error assertions, polygon error handling

### Phase 1 Batch 3 (COMPLETE) — Site Details (File Upload) — 96 cumulative

| Feature                                   | Scenarios               | Tags                   |
| ----------------------------------------- | ----------------------- | ---------------------- |
| upload.coordinate.file.feature            | 10                      | 2 @local-only excluded |
| kml.file.site.details.multi.site.feature  | 4                       | 2 @smoke               |
| shapefile.site.details.multi.site.feature | 4                       | 2 @smoke               |
| validate.shapefile.missing.files.feature  | 5                       |                        |
| **Subtotal**                              | **23 new (25 defined)** |                        |

New files:

- `test-pw/test-data/file-upload.js` — Factory functions for all file upload types (KML/Shapefile single/multi-site, missing files)
- `test-pw/steps/file.upload.steps.js` — File upload step definitions (Given/When/Then for all upload scenarios)

Modified files:

- `test-pw/support/site-details-flow.js` — Added file upload flows (single/multi-site), file type/upload page actions, review page "Add" helpers
- `cucumber.pw.mjs` — Added 4 feature file paths + smoke entries for multi-site file upload

### Phase 1 Batch 4 (COMPLETE) — Check Your Answers + Changes — 130 cumulative

| Feature                                                  | Scenarios  | Tags     |
| -------------------------------------------------------- | ---------- | -------- |
| check.your.answers.feature                               | 9          | 4 @smoke |
| change.answers.check.your.answers.feature                | 6          |          |
| change.activity.details.review.site.details.feature      | 8          |          |
| change.site.details.boundary.review.site.details.feature | 3          |          |
| change.site.details.circular.review.site.details.feature | 4          |          |
| delete.all.site.details.review.site.details.feature      | 4          |          |
| **Subtotal**                                             | **34 new** |          |

New files:

- `test-pw/pages/check.your.answers.page.js` — CYA page object with XPath Change link selectors
- `test-pw/pages/review.site.details.page.js` — Review site details page with all Change link selectors
- `test-pw/pages/delete.site.details.page.js` — Delete confirmation page (confirm/cancel)
- `test-pw/test-data/check-your-answers.js` — CYA data factories (wraps site-details + public register)
- `test-pw/support/task-flow.js` — `completeAllTasks`, `navigateAndCompleteSiteDetailsToReview`, `clickReviewAndSend`
- `test-pw/steps/check.your.answers.steps.js` — CYA Given/When/Then (9 Given variants, Review & Send, heading assertion)
- `test-pw/steps/change.answers.cya.steps.js` — Change from CYA Given/When/Then (project name, site location, activity, site details, public register)
- `test-pw/steps/change.activity.details.steps.js` — Change activity dates/description from review page
- `test-pw/steps/change.site.details.boundary.steps.js` — Change boundary site geometry from review page
- `test-pw/steps/change.site.details.circular.steps.js` — Change circular site geometry from review page
- `test-pw/steps/delete.all.site.details.steps.js` — Delete all site details confirm/cancel

### Phase 1 Batch 5 (COMPLETE) — Submit + Dashboard + Redirect + MCMS — 143 cumulative

| Feature                                   | Scenarios                | Tags            |
| ----------------------------------------- | ------------------------ | --------------- |
| submit.notification.feature               | 2                        | 1 @smoke        |
| dashboard.feature                         | 6                        | 1 @smoke        |
| redirect.to.login.when.logged.out.feature | 2                        | 1 @wip excluded |
| mcms.context.validation.feature           | 3                        | 1 @bug          |
| **Subtotal**                              | **13 new (11 runnable)** |                 |

New files:

- `test-pw/pages/confirmation.page.js` — Confirmation page with reference validation + feedback link
- `test-pw/pages/view.details.page.js` — View submitted notification details
- `test-pw/pages/delete.project.page.js` — Delete project confirmation
- `test-pw/steps/submit.notification.steps.js` — Submit notification Given/When/Then
- `test-pw/steps/switch.file.upload.to.manual.steps.js` — File upload → manual switch scenario
- `test-pw/steps/dashboard.steps.js` — Dashboard scenarios (view, empty, continue, new, sort, delete)
- `test-pw/steps/redirect.to.login.steps.js` — Redirect when logged out scenarios
- `test-pw/steps/mcms.context.validation.steps.js` — MCMS context validation scenarios

Modified files:

- `test-pw/support/navigation.js` — Added `signOut`, `navigateAndReAuthenticate`, `navigateWithRawQueryString`; made `navigateAndAuthenticate` idempotent (skip user registration if testUser exists)
- `test-pw/support/auth.js` — Made `loginAsTestUser` resilient (skip if already authenticated)
- `test-pw/support/task-flow.js` — Added `submitNotification`, `clickConfirmAndSend`, `completeTasksFromCurrentPage`
- `test-pw/pages/dashboard.page.js` — Extended with table interaction methods, `continueLink`, `deleteLink`, `viewDetailsLink`, `getNotifications`, sort/display assertions
- `test-pw/steps/header.verification.steps.js` — Removed duplicate Given/When (now uses dashboard.steps.js)
- `cucumber.pw.mjs` — Added 4 feature file paths + 2 smoke entries

### Excluded Features (special environments)

| Feature                               | Tag            | Reason                 |
| ------------------------------------- | -------------- | ---------------------- |
| `d365.login.feature`                  | @d365 / @wip   | Requires Dynamics 365  |
| `submit.notification.to.d365.feature` | @d365          | Requires Dynamics 365  |
| `launch.fivium.iat.feature`           | @fivium        | Requires Fivium IAT    |
| `real.defra.id.integration.feature`   | @real-defra-id | Requires real DEFRA ID |

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
- User registration must happen BEFORE `page.goto()` in `navigateAndAuthenticate` and `navigateWithRawQueryString`. The DEFRA ID stub renders the authorize page with registered users at render time. If you navigate first then register, the login link won't appear on the already-rendered page. Register-first-then-navigate matches the WDIO legacy code and ensures the login link is present.

## Commands

```bash
# Run all migrated scenarios
npx cucumber-js --config cucumber.pw.mjs

# Run smoke tests only
npx cucumber-js --config cucumber.pw.mjs --profile smoke

# Run with parallel workers
MAX_INSTANCES=4 npx cucumber-js --config cucumber.pw.mjs

# Run GitHub CI profile
npm run test:pw:github

# Run CDP pipeline profile (environment-aware tag switching)
npm run test:pw:cdp

# Run debug mode (forces serial execution)
DEBUG=true npx cucumber-js --config cucumber.pw.mjs

# Dry-run (check step matching without executing)
npx cucumber-js --config cucumber.pw.mjs --dry-run

# Run legacy WDIO tests
npm test

# Run headed (see browser)
HEADLESS=false npx cucumber-js --config cucumber.pw.mjs

# Allure reporting
npm run report:pw          # Generate allure-report/ from allure-results/
npm run report:pw:open     # Generate + open in browser
npm run report:publish     # Generate + upload to S3 (requires RESULTS_OUTPUT_S3_PATH)
```

## Parallel Execution

- Configured via `parallel` option in `cucumber.pw.mjs` using `MAX_INSTANCES` env var
- Default: `1` (sequential). Set `MAX_INSTANCES=4` for 4 parallel workers
- Matches WDIO's `maxInstances: process.env.MAX_INSTANCES` pattern
- Each Cucumber.js worker gets its own browser instance (BeforeAll), context/page per scenario (Before)
- No shared state between workers — parallel-safe by design
- Full suite: ~12min sequential → ~5min with 4 workers

## Allure Reporting

### Configuration (`cucumber.pw.mjs`)

- **Reporter**: `allure-cucumberjs/reporter` in format list (all profiles including `github`)
- **Results directory**: `allure-results/` (matches WDIO's `outputDir`)
- **Issue link template**: `https://eaflood.atlassian.net/browse/%s` (matches WDIO's `issueLinkTemplate`)
- **Pattern**: `/@issue=(.*)/` — parses `@issue=ML-XXX` tags from feature files into clickable Jira links
- **Environment info**: Browser (Chromium), Framework (Playwright + Cucumber)

### allure-cucumberjs Config Format (v3.x)

- `links` must be an **object** (not an array) — keyed by link type (`issue`, `tms`, etc.)
- Each link type has `pattern` (array of regex with capture group) and `urlTemplate` (`%s` placeholder)
- Config goes in `formatOptions` at the top level (not nested under an `allure` key)

### Screenshots & Attachments

Handled automatically by `test-pw/support/hooks.js`:

- `AfterStep`: screenshot after every step (allure-cucumberjs picks up via `this.attach()`)
- `After` (on failure): full-page screenshot, failure URL, JSON data, test user info

### WDIO vs Playwright Allure Comparison

| WDIO Option                                                    | Playwright Equivalent               | Notes                                       |
| -------------------------------------------------------------- | ----------------------------------- | ------------------------------------------- |
| `outputDir: 'allure-results'`                                  | `resultsDir: 'allure-results'`      | Same directory                              |
| `issueLinkTemplate: 'https://eaflood.atlassian.net/browse/{}'` | `links.issue.urlTemplate: '.../%s'` | Same Jira URL, different placeholder syntax |
| `useCucumberStepReporter: true`                                | N/A                                 | allure-cucumberjs is Cucumber-native        |
| `disableWebdriverStepsReporting`                               | N/A                                 | No WebDriver steps in Playwright            |

## CI/CD Pipeline

### Entrypoint (`entrypoint.sh`)

Used by Docker/CDP pipeline. Updated for Playwright:

```
1. npm run test:pw:github     → runs tests, generates allure-results/
2. Capture test exit code     → stored before report generation
3. npm run report:publish     → allure generate + S3 upload
4. Exit with test exit code   → pipeline fails if tests failed
```

Key change from WDIO: captures cucumber-js exit code directly instead of checking for `FAILED` file marker (which WDIO's `onComplete` hook wrote but Playwright doesn't).

### Report Publishing Chain

```
cucumber-js → allure-results/ → allure generate → allure-report/ → publish-tests.sh → S3
```

- `bin/publish-tests.sh` uploads `allure-report/` to `$RESULTS_OUTPUT_S3_PATH` via AWS CLI
- `npm run report:publish` chains: `npm run report` (generate) + `./bin/publish-tests.sh` (upload)

### GitHub Actions

- Workflow: `.github/workflows/run-tests-and-publish.yml`
- Composite action: `run-journey-tests/action.yml`
- Runs `npm run test:pw:github` → uploads `allure-results/` and `allure-report/` as artifacts → deploys to GitHub Pages
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

Environment is selected via `ENVIRONMENT` env var in `test-pw/support/config.js`. Can also override with `BASE_URL` and `DEFRA_ID_URL` directly.

### Cucumber Profiles

| Profile     | Command                                    | Scenarios               | Tags                                                                                                                          |
| ----------- | ------------------------------------------ | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **default** | `npx cucumber-js --config cucumber.pw.mjs` | All in paths list       | None (includes @wip/@bug/@real-defra-id)                                                                                      |
| **smoke**   | `--profile smoke`                          | 19                      | `@smoke`                                                                                                                      |
| **all**     | `--profile all`                            | ~143                    | Excludes @wip/@bug/@d365/@real-defra-id/@fivium                                                                               |
| **github**  | `--profile github`                         | ~143                    | Excludes @wip/@bug/@d365/@real-defra-id/@fivium/@local-only                                                                   |
| **cdp**     | `--profile cdp`                            | Varies by `ENVIRONMENT` | `ENVIRONMENT=test`: @real-defra-id/@d365/@fivium only; otherwise: excludes @wip/@bug/@d365/@real-defra-id/@fivium/@local-only |

### WDIO vs Playwright Environment Comparison

| Aspect                 | WDIO (Legacy)                         | Playwright                       |
| ---------------------- | ------------------------------------- | -------------------------------- |
| **Config approach**    | 7 separate config files               | 1 file + env vars                |
| **CDP environments**   | `ENVIRONMENT` var                     | Same `ENVIRONMENT` var           |
| **BrowserStack**       | 2 dedicated configs                   | Not implemented                  |
| **Proxy support**      | `HTTP_PROXY` + global-agent           | Not implemented                  |
| **Debug mode**         | `DEBUG=true` (1 instance + --inspect) | `DEBUG=true` (forces parallel=1) |
| **Parallel execution** | `MAX_INSTANCES` env var               | Same `MAX_INSTANCES` env var     |

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
