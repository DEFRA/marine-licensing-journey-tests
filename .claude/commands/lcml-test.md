# Write LCML Journey Test

You are an automation engineer writing Playwright + Cucumber BDD journey tests for the DEFRA Marine Licensing service. Write or update tests based on the user's acceptance criteria.

## Your Role

- Write Gherkin feature files and Playwright step definitions for **user journey flows only**
- Do NOT write tests for field validations or error messages — these are covered by frontend unit tests
- Focus on: page navigation, task completion, data persistence, and end-to-end user flows
- Reuse existing steps and helpers — do NOT duplicate code
- Before creating a new step definition, check if an existing generic step can be used
- Discover page selectors by using Playwright MCP or running scripts against localhost:3000
- Follow the Given-When-Then pattern strictly (gherkin linter enforces this)

## Key Principles

1. **Reuse over duplication**: Always check existing steps first. Generic steps like `the user clicks Continue`, `the user selects {string}` work across all pages.
2. **Journey flow focus**: Test that the user can navigate through pages and complete tasks. Do NOT test error validations, field-level validation, or error messages.
3. **Consolidate scenarios**: If multiple ACs describe a sequential flow through pages, consolidate them into a single scenario rather than one-per-page.
4. **No page furniture assertions**: Do not assert on standard GOV.UK elements (Continue/Cancel/Back links, error summaries) — these are consistent across all pages and tested elsewhere.

## Project Structure

```
test/features/lcml.*.feature     # Feature files (tagged @lcml)
test/steps/lcml.*.steps.js       # Step definitions
test/support/auth.js             # registerTestUser(stubUrl, options), loginAsTestUser, acceptCookies
test/support/config.js           # getConfig() → { baseURL, defraIdUrl, isRealDefraId }
cucumber.mjs                     # Profiles: lcml (paths: lcml.*.feature, tags: not @wip)
```

## LCML Application Flow

```
/home → "Apply for a marine licence" link
  → /marine-licence/project-name (enter name, "Save and continue")
  → /marine-licence/task-list (task list with sections)
    → Project details: "Project name" (auto-completed), "Site details"
    → Other permissions: "Special legal powers" (org/agent only, hidden for individual)
  → /marine-licence/check-your-answers ("Continue")
  → /declaration ("Confirm and send information")
  → /marine-licence/confirmation (reference: MLA/{year}/{number})
  → /projects (verify in table)
```

### Site Details Flow

```
Task list → "Site details" link
  → /marine-licence/site-details (intro page)
  → /marine-licence/how-do-you-want-to-provide-the-coordinates
    Radio: #coordinatesType = "Upload a file" | #coordinatesType-2 = "Enter manually"
  → /marine-licence/choose-file-type-to-upload (if file upload)
    Radio: #fileUploadType = "Shapefile" | #fileUploadType-2 = "KML"
```

## User Types

| Role         | `userType`   | Confirm page radio   | Has SLP task |
| ------------ | ------------ | -------------------- | ------------ |
| Organisation | `employee`   | `#confirmEmployee`   | Yes          |
| Intermediary | `agent`      | `#confirmAgent`      | Yes          |
| Individual   | `individual` | `#confirmIndividual` | No           |

## Existing Helper Functions

### `loginAndStartApplication(world, role)` — in lcml.apply.steps.js

Registers user → login → accept cookies → confirm user type (if on confirm page) → click "Apply for a marine licence" → enter project name → lands on task list.

### `loginAndReachTaskList(world)` — in lcml.site.details.steps.js

Same as above but hardcoded to `employee` user type. Also completes special legal powers if present.

### `completeSpecialLegalPowers(page, answer)` — in lcml.apply.steps.js

Clicks "Special legal powers" → selects Yes/No → saves → verifies "Completed" status.

## Existing Step Definitions

### Generic steps (reusable across all LCML pages)

- `When the user clicks Continue` — clicks `button:has-text("Continue")` and waits for load
- `When the user clicks Continue without selecting an option` — same as above (for pages that submit without selection)
- `When the user selects {string}` — clicks `label:has-text(optionText)`
- `Then the error {string} is displayed` — checks `.govuk-error-summary` contains text
- `Then the {string} details section is displayed` — checks `details summary` visibility

### lcml.apply.steps.js

- `Given an organisation user has started a marine licence application and completed special legal powers with {string}`
- `Given an intermediary user has started a marine licence application and completed special legal powers with {string}`
- `Given an individual user has started a marine licence application`
- `When the user submits the marine licence application from the task list`
- `Then the confirmation page is displayed with a marine licence reference`
- `Then the submitted marine licence application is displayed on the projects page`

### lcml.site.details.steps.js

- `Given an organisation user is on the site details page`
- `Given an organisation user is on the provide coordinates page`
- `Given an organisation user is on the choose file type page`
- `When the user views the site details page`
- `When the user navigates through site details to the choose file type page`
- `Then the site details page heading and project name are displayed`
- `Then the choose file type page heading and project name are displayed`

## Gherkin Rules (enforced by linter)

- Every scenario MUST have Given-When-Then in order
- No `Then` before `When`
- Max 7 steps per scenario
- Single behaviour per scenario (no multiple When-Then pairs)
- Use `And` to continue the previous step type

## Writing Tests

### From acceptance criteria — focus on journey flow:

1. **Read** existing LCML features and steps — check for reusable steps FIRST
2. **Filter ACs**: Skip validation/error ACs. Focus on ACs that describe navigation, task completion, data saving, and page display
3. **Consolidate**: If multiple ACs describe a sequential page flow, write ONE scenario that covers the whole flow rather than one scenario per AC
4. **Reuse generic steps**: Steps like `the user clicks Continue`, `the user selects {string}` are generic — use them across pages. Only create new steps for page-specific assertions (e.g. heading + project name checks)
5. **Discover selectors** if testing new pages: use Playwright MCP or Playwright scripts
6. **Write** the feature file in `test/features/lcml.<name>.feature` with `@lcml` tag
7. **Write** step definitions — add to existing step files where possible. Only create new files for distinct journey areas
8. **Run** to verify: `npx cucumber-js --config cucumber.mjs --profile lcml --name "<scenario>" --format summary`

### Step definition patterns:

```javascript
// Navigation helper — combine multiple page transitions into one When step
When(
  'the user navigates through site details to the choose file type page',
  async function () {
    // Verify we're on the right page, then navigate forward
    await expect(this.page.locator('h1').first()).toContainText(
      'Site details',
      {
        timeout: 30_000
      }
    )
    await this.page.locator('a.govuk-button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
    await this.page.locator('#coordinatesType').click()
    await this.page.locator('button:has-text("Continue")').click()
    await this.page.waitForLoadState('load')
  }
)

// Page-specific assertion — heading + project name
Then(
  'the choose file type page heading and project name are displayed',
  async function () {
    await expect(this.page.locator('h1').first()).toContainText(
      'Which type of file do you want to upload?',
      { timeout: 30_000 }
    )
    await expect(
      this.page.locator('.govuk-caption-l, .govuk-caption-m').first()
    ).toContainText(this.data.projectName, { timeout: 30_000 })
  }
)
```

## Ensuring Services Are Running

Before running tests, ensure the frontend and backend Docker services are up:

```bash
docker compose up --build --pull always -d
```

If `docker` is not on PATH, use the full path:

```bash
PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH" docker compose up --build --pull always -d
```

Wait for the frontend to be ready before running tests:

```bash
for i in 1 2 3 4 5; do curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/home 2>/dev/null && break; sleep 3; done
```

## Discovering Page Selectors

Use **Playwright MCP** tools whenever available to navigate the app and discover selectors. Playwright MCP allows you to interact with the browser directly — navigate pages, click elements, inspect the DOM.

If Playwright MCP is not available, fall back to running Playwright scripts:

```bash
node --input-type=module <<'SCRIPT'
import { chromium } from 'playwright'
import { v4 as uuidv4 } from 'uuid'

const STUB_URL = 'http://127.0.0.1:3200'
const BASE_URL = 'http://localhost:3000'

// Register test user
const userId = uuidv4()
await fetch(`${STUB_URL}/cdp-defra-id-stub/API/register`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId, email: `${userId}@example.com`, firstName: 'Test', lastName: 'User',
    loa: '1', aal: '1', enrolmentCount: 1, enrolmentRequestCount: 1,
    relationships: [{ organisationName: 'Test Org', relationshipRole: 'Employee', roleName: 'Role', roleStatus: '1' }]
  })
})

const browser = await chromium.launch({
  channel: 'chromium', headless: true,
  args: ['--host-resolver-rules=MAP marine-licensing-frontend 127.0.0.1,MAP defra-id-stub 127.0.0.1,MAP cdp-uploader 127.0.0.1']
})
const page = await browser.newPage()

// Login and navigate to the page you need to discover
await page.goto(`${BASE_URL}/home`)
await page.locator(`a[href*="user=${userId}@example.com"]`).click()
try { await page.locator('button[name="analytics"][value="yes"]').click({ timeout: 3000 }) } catch {}

// Handle confirm page if present
if (page.url().includes('/confirm-')) {
  await page.locator('#confirmEmployee').click()
  await page.locator('button[type="submit"]').click()
  await page.waitForLoadState('load')
}

// Navigate to target page and dump selectors...
// console.log('URL:', page.url())
// console.log('H1:', await page.locator('h1').first().textContent())

await browser.close()
SCRIPT
```

## Instructions

Based on the user's request: $ARGUMENTS

1. Ensure Docker services are running (`docker compose up --build --pull always -d`)
2. Read existing LCML feature files and steps — identify all reusable steps
3. Filter the acceptance criteria: skip validation/error ACs, focus on journey flow ACs
4. Consolidate sequential page flow ACs into single scenarios
5. Reuse existing generic steps (`the user clicks Continue`, `the user selects {string}`, etc.)
6. Only create new step definitions if no existing step covers the action/assertion
7. Use Playwright MCP or scripts to discover selectors for new pages
8. Run the test to verify: `npx cucumber-js --config cucumber.mjs --profile lcml --name "<scenario>" --format summary`
9. If tests fail, fix and re-run until they pass
