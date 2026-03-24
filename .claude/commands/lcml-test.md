# Write LCML Journey Test

Write a new LCML (marine licence) journey test for the marine licensing service.

## Context

LCML tests live in:

- **Feature files**: `test/features/lcml.*.feature` (tagged with `@lcml`)
- **Step definitions**: `test/steps/lcml.*.steps.js`
- **Run with**: `npm run test:lcml` or `npx cucumber-js --config cucumber.mjs --profile lcml`

## LCML Journey Flow

The LCML journey differs from exemptions:

- **No IAT query parameters needed** — user navigates directly from the home page
- **Entry point**: `/home` → click "Apply for a marine licence" → `/marine-licence/project-name`
- **Feature flag**: `ENABLE_MARINE_LICENCE=true` must be set in compose.yml for local Docker

### Full flow recorded via Playwright MCP:

1. `/home` — click "Apply for a marine licence"
2. `/marine-licence/project-name` — enter project name, click "Save and continue"
3. `/marine-licence/task-list` — heading "Marine licence start page", click "Review and send your information"
4. `/marine-licence/check-your-answers` — heading "Check your answers before sending your information", click "Continue"
5. `/declaration` — heading "Declaration", click "Confirm and send information"
6. `/marine-licence/confirmation?applicationReference=MLA/{year}/{number}` — confirmation with reference
7. `/projects` — verify submission in projects table (Type: "Marine licence application", Status: "Submitted")

### Key differences from exemptions:

| Aspect            | Exemption                                            | Marine Licence                                        |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| Entry point       | `/guidance/who-is-the-exemption-for` with IAT params | `/home` → click link → `/marine-licence/project-name` |
| Query params      | Required (ACTIVITY_TYPE, ARTICLE, pdfDownloadUrl)    | None                                                  |
| Reference format  | `EXE/{year}/{number}`                                | `MLA/{year}/{number}`                                 |
| Route prefix      | `/exemption/`                                        | `/marine-licence/`                                    |
| Type on dashboard | Exemption notification                               | Marine licence application                            |

## User Types

LCML supports different user types via `registerTestUser(stubUrl, options)` in `test/support/auth.js`.

### Available user types:

| User Type        | `userType` option | `relationshipRole` | Description                                                              |
| ---------------- | ----------------- | ------------------ | ------------------------------------------------------------------------ |
| **Organisation** | `employee`        | `Employee`         | User applying as an employee of their organisation                       |
| **Intermediary** | `agent`           | `Agent`            | User applying as an agent/intermediary on behalf of another organisation |
| **Individual**   | `individual`      | _(none)_           | User applying for a personal project (no relationships)                  |

### How to register different user types:

```javascript
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies
} from '../support/auth.js'
import { getConfig } from '../support/config.js'

const config = getConfig()

// Organisation employee (default)
this.testUser = await registerTestUser(config.defraIdUrl, {
  userType: 'employee'
})

// Intermediary / agent
this.testUser = await registerTestUser(config.defraIdUrl, { userType: 'agent' })

// Individual (no organisation)
this.testUser = await registerTestUser(config.defraIdUrl, {
  userType: 'individual'
})

// Custom organisation name
this.testUser = await registerTestUser(config.defraIdUrl, {
  userType: 'employee',
  organisationName: 'Windfarm Co'
})
```

### Step definition pattern for user types:

```javascript
const USER_TYPE_CONFIG = {
  organisation: { userType: 'employee' },
  intermediary: { userType: 'agent' }
}

Given(
  'a user is ready to apply for a marine licence as an {string}',
  async function (role) {
    const userOptions = USER_TYPE_CONFIG[role]
    this.testUser = await registerTestUser(config.defraIdUrl, userOptions)
    // ... login and navigate
  }
)
```

### Feature file pattern:

```gherkin
Scenario: Submit a marine licence application as an organisation employee
  Given a user is ready to apply for a marine licence as an "organisation"
  When the user submits a marine licence application
  Then the confirmation page is displayed with a marine licence reference

Scenario: Submit a marine licence application as an intermediary
  Given a user is ready to apply for a marine licence as an "intermediary"
  When the user submits a marine licence application
  Then the confirmation page is displayed with a marine licence reference
```

### How user type flows through the system:

1. Test registers user with DEFRA ID stub using `relationshipRole` (Employee/Agent)
2. User logs in via OIDC → DEFRA ID token contains `userRelationshipType`
3. Frontend extracts `userRelationshipType` from auth token session
4. When creating a project, frontend sends `organisationId`, `organisationName`, and `userRelationshipType` to backend
5. Backend stores this as the project's organisation context

**Note**: The LCML flow currently has no UI page asking "who is applying" — the user type comes entirely from the DEFRA ID token. The exemption flow has guidance pages (`/guidance/who-is-the-exemption-for`) for this; LCML may add similar pages in the future.

## Authentication

Same as exemptions — uses DEFRA ID stub:

```javascript
import {
  registerTestUser,
  loginAsTestUser,
  acceptCookies
} from '../support/auth.js'
import { getConfig } from '../support/config.js'

const config = getConfig()
if (!config.isRealDefraId && !this.testUser) {
  this.testUser = await registerTestUser(config.defraIdUrl, {
    userType: 'employee'
  })
}
await this.page.goto(new URL('/home', config.baseURL).toString())
await loginAsTestUser(this.page, this.testUser)
await acceptCookies(this.page)
```

## Existing LCML step definitions (in test/steps/lcml.apply.steps.js)

- `Given a user is ready to apply for a marine licence as an {string}` — registers user with specified type (organisation/intermediary), logs in, accepts cookies
- `When the user submits a marine licence application` — home → apply link → project name → task list → CYA → declaration → confirmation
- `Then the confirmation page is displayed with a marine licence reference` — validates panel text and `MLA/{year}/{number}` format
- `Then the submitted marine licence application is displayed on the projects page` — navigates to `/projects`, verifies row with project name, type, reference, status

## Writing new LCML tests

1. **Feature file**: Create `test/features/lcml.<name>.feature` with `@lcml` tag
2. **Step file**: Create or extend `test/steps/lcml.<name>.steps.js`
3. **Follow exemption patterns**: Check existing exemption step files in `test/steps/` for patterns (e.g., `submit.notification.steps.js`, `check.your.answers.steps.js`)
4. **Page objects**: Reuse existing page objects from `test/pages/` where applicable, create new ones under `test/pages/` for LCML-specific pages
5. **Use Playwright MCP** to record new flows if needed: navigate the app, capture selectors and page structure

## Instructions

Based on the user's request: $ARGUMENTS

1. Read existing LCML feature files and steps to understand current coverage
2. Read relevant exemption tests for patterns if the scenario is similar
3. Write the feature file with `@lcml` tag in `test/features/lcml.<name>.feature`
4. Write step definitions in `test/steps/lcml.<name>.steps.js`
5. Run the test with `npx cucumber-js --config cucumber.mjs --profile lcml --name "<scenario name>" --format summary` to verify
6. If the test needs to interact with pages not yet recorded, use Playwright MCP to discover selectors
