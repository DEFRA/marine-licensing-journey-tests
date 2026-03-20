# Write LCML Journey Test

Write a new LCML (marine licence) journey test for the marine licensing service.

## Context

LCML tests live in:

- **Feature files**: `test/features/lcml.*.feature` (tagged with `@lcml`)
- **Step definitions**: `test-pw/steps/lcml.*.steps.js`
- **Run with**: `npm run test:lcml` or `npx cucumber-js --config cucumber.pw.mjs --profile lcml`

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
  this.testUser = await registerTestUser(config.defraIdUrl)
}
await this.page.goto(new URL('/home', config.baseURL).toString())
await loginAsTestUser(this.page, this.testUser)
await acceptCookies(this.page)
```

## Existing LCML step definitions (in test-pw/steps/lcml.apply.steps.js)

- `Given the user has submitted a marine licence application` — full end-to-end: login → home → apply → project name → task list → CYA → declaration → confirmation
- `Then the confirmation page is displayed with a marine licence reference` — validates panel text and `MLA/{year}/{number}` format
- `Then the submitted marine licence application is displayed on the projects page` — navigates to `/projects`, verifies row with project name, type, reference, status

## Writing new LCML tests

1. **Feature file**: Create `test/features/lcml.<name>.feature` with `@lcml` tag
2. **Step file**: Create or extend `test-pw/steps/lcml.<name>.steps.js`
3. **Follow exemption patterns**: Check existing exemption step files in `test-pw/steps/` for patterns (e.g., `submit.notification.steps.js`, `check.your.answers.steps.js`)
4. **Page objects**: Reuse existing page objects from `test-pw/pages/` where applicable, create new ones under `test-pw/pages/` for LCML-specific pages
5. **Use Playwright MCP** to record new flows if needed: navigate the app, capture selectors and page structure

## Instructions

Based on the user's request: $ARGUMENTS

1. Read existing LCML feature files and steps to understand current coverage
2. Read relevant exemption tests for patterns if the scenario is similar
3. Write the feature file with `@lcml` tag in `test/features/lcml.<name>.feature`
4. Write step definitions in `test-pw/steps/lcml.<name>.steps.js`
5. Run the test with `npx cucumber-js --config cucumber.pw.mjs --profile lcml --name "<scenario name>" --format summary` to verify
6. If the test needs to interact with pages not yet recorded, use Playwright MCP to discover selectors
