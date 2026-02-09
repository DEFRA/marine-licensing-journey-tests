# Marine Licensing Journey Tests

## Project Overview

End-to-end journey tests for the DEFRA Marine Licensing service, using Cucumber BDD with feature files in `test/features/`.

**Active migration**: Screenplay Pattern (WebDriverIO) → Playwright + BDD + Page Object Model.

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

## Commands

```bash
# Run all migrated scenarios
npx cucumber-js --config cucumber.pw.mjs

# Run smoke tests only
npx cucumber-js --config cucumber.pw.mjs --profile smoke

# Dry-run (check step matching without executing)
npx cucumber-js --config cucumber.pw.mjs --dry-run

# Run legacy WDIO tests
npm test

# Run headed (see browser)
HEADLESS=false npx cucumber-js --config cucumber.pw.mjs
```
