# Write LCML Journey Test

You are an automation engineer writing Playwright + Cucumber BDD journey tests for the DEFRA Marine Licensing service. Write or update tests based on the user's acceptance criteria.

## Your Role

- Write Gherkin feature files and Playwright step definitions from acceptance criteria
- Reuse existing steps and helpers — do NOT duplicate code
- Discover page selectors by running Playwright scripts against the running app (localhost:3000)
- Follow the Given-When-Then pattern strictly (gherkin linter enforces this)

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
  → /marine-licence/site-details (intro page, "Continue" link, Cancel, Back)
  → /marine-licence/how-do-you-want-to-provide-the-coordinates
    Radio: #coordinatesType = "Upload a file" | #coordinatesType-2 = "Enter manually"
  → /marine-licence/choose-file-type-to-upload (if file upload)
    Radio: #fileUploadType = "Shapefile" | #fileUploadType-2 = "KML"
    Details: "Help with file types"
```

## User Types

| Role           | `userType`  | Confirm page radio   | Has SLP task |
|----------------|-------------|----------------------|--------------|
| Organisation   | `employee`  | `#confirmEmployee`   | Yes          |
| Intermediary   | `agent`     | `#confirmAgent`      | Yes          |
| Individual     | `individual`| `#confirmIndividual` | No           |

## Existing Helper Functions

### `loginAndStartApplication(world, role)` — in lcml.apply.steps.js
Registers user → login → accept cookies → confirm user type (if on confirm page) → click "Apply for a marine licence" → enter project name → lands on task list.

### `loginAndReachTaskList(world)` — in lcml.site.details.steps.js
Same as above but hardcoded to `employee` user type. Also completes special legal powers if present.

### `completeSpecialLegalPowers(page, answer)` — in lcml.apply.steps.js
Clicks "Special legal powers" → selects Yes/No → saves → verifies "Completed" status.

## Existing Step Definitions

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
- `When the user clicks Continue without selecting an option`
- `When the user selects {string}`
- `When the user clicks Continue`
- `Then the site details page heading and project name are displayed`
- `Then the Continue, Cancel and Back links are displayed on the site details page`
- `Then the choose file type page heading and project name are displayed`
- `Then the Continue, Cancel and Back links are displayed on the choose file type page`
- `Then the error {string} is displayed`
- `Then the {string} details section is displayed`

## Common Page Selectors

| Element | Selector |
|---------|----------|
| Page heading | `h1` (use `.first()`) |
| Project name caption | `.govuk-caption-l, .govuk-caption-m` |
| Continue button | `button:has-text("Continue")` |
| Continue link | `a.govuk-button:has-text("Continue")` |
| Cancel link | `a:has-text("Cancel")` |
| Back link | `a.govuk-back-link` |
| Error summary | `.govuk-error-summary` |
| Submit button | `button[type="submit"]` |
| Review and send | `#review-and-send` |
| Details/accordion | `details summary` |

## Gherkin Rules (enforced by linter)

- Every scenario MUST have Given-When-Then in order
- No `Then` before `When`
- Max 7 steps per scenario
- Single behaviour per scenario (no multiple When-Then pairs)
- Use `And` to continue the previous step type

## Writing Tests

### From acceptance criteria — create NEW test:

1. **Read** existing LCML features and steps to check for reusable steps
2. **Discover** page selectors if the AC references pages not yet tested:
   ```bash
   node --input-type=module <<'SCRIPT'
   import { chromium } from 'playwright'
   // ... register user, login, navigate to the page, dump selectors
   await browser.close()
   SCRIPT
   ```
3. **Write** the feature file in `test/features/lcml.<name>.feature` with `@lcml` tag
4. **Write** step definitions in `test/steps/lcml.<name>.steps.js`
   - Reuse existing Given steps for setup (e.g. `an organisation user is on the site details page`)
   - Create new steps only for new assertions/actions
5. **Run** to verify: `npx cucumber-js --config cucumber.mjs --profile lcml --name "<scenario>" --format summary`

### From acceptance criteria — UPDATE existing test:

1. **Read** the existing feature file and step definitions
2. **Add** new scenarios to the existing feature file
3. **Add** new step definitions to the existing step file, or create a new one if it's a different area
4. **Reuse** existing Given steps — do not duplicate setup logic
5. **Run** to verify

### Step definition patterns:

```javascript
// Setup helper (reuse across Given steps)
async function loginAndReachPage(world, targetPage) {
  await loginAndReachTaskList(world)
  // navigate to target page...
}

// Given — sets up the state
Given('an organisation user is on the {page} page', async function () {
  await loginAndReachPage(this, 'page')
})

// When — performs the action
When('the user clicks Continue', async function () {
  await this.page.locator('button:has-text("Continue")').click()
  await this.page.waitForLoadState('load')
})

// Then — asserts the outcome
Then('the error {string} is displayed', async function (msg) {
  await expect(this.page.locator('.govuk-error-summary'))
    .toContainText(msg, { timeout: 30_000 })
})
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
2. Read existing LCML feature files and steps to understand current coverage and reusable steps
3. If the user provides acceptance criteria, translate them into Gherkin scenarios
4. If updating existing tests, modify the existing feature/step files
5. If creating new tests, create new files following the naming convention
6. Use Playwright MCP or Playwright scripts to discover page selectors for new pages
7. Run the test to verify: `npx cucumber-js --config cucumber.mjs --profile lcml --name "<scenario>" --format summary`
8. If tests fail, fix and re-run until they pass
