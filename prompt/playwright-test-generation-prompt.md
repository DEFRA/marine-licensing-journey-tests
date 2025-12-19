# Playwright Test Generation Prompt Template

## Context

You are converting a Gherkin scenario from the Marine Licensing Journey Tests repository into a Playwright test. The repository uses WebdriverIO with Cucumber for existing tests, but you are creating a new Playwright implementation that follows the same user journey without mirroring the existing implementation.

## Repository Overview

**System Under Test:**

- Marine Licensing Frontend (Hapi.js with GOV.UK Design System)
- External integrations: DEFRA ID (OIDC)

**Existing Test Infrastructure:**

- Feature files: `test/features/*.feature`
- Step definitions: `test/steps/*.js`
- Page objects: `test-infrastructure/pages/*.js`
- Screenplay pattern: `test-infrastructure/screenplay/*`

**New Test Location:**

- Playwright tests: `simple-tests/*.spec.js`
- Simple page objects: `simple-tests/pages/*.js`

## Task

Convert the following Gherkin scenario into a Playwright test:

### Scenario to Convert

[Paste the Gherkin scenario here, including the Feature description and Scenario steps]

### Important: Authentication Steps

**Critical**: The existing test infrastructure handles authentication automatically in `Navigate.toTheMarineLicensingApp()`, which may not be visible in the Gherkin scenario. You MUST include authentication steps in your Playwright test.

**Authentication Flow:**

1. **Navigate to the application** - This will redirect to DEFRA ID login
2. **Handle DEFRA ID authentication:**
   - **For non-test environments (stub)**:
     - Register a test user via DEFRA ID stub API (if needed)
     - Click the login link for the test user email
   - **For test environments (real DEFRA ID)**:
     - Select Government Gateway authentication method
     - Enter credentials from environment variables (`DEFRA_ID_USER_ID`, `DEFRA_ID_USER_PASSWORD`)
     - Click sign in
3. **Handle cookie banner** - Accept or reject analytics cookies after authentication

**Check existing implementations:**

- `test-infrastructure/screenplay/tasks/navigate.js` - Shows authentication flow
- `test-infrastructure/screenplay/interactions/authenticate.with.js` - DEFRA ID stub authentication
- `test-infrastructure/screenplay/interactions/authenticate.with.a.permanent.user.js` - Real DEFRA ID authentication
- `test-infrastructure/screenplay/interactions/handle.cookie.banner.js` - Cookie banner handling

**Page Objects to Check:**

- `test-infrastructure/pages/defra.id.login.page.js`
- `test-infrastructure/pages/defra.id.selection.page.js`
- `test-infrastructure/pages/cookie.banner.page.js`

### Requirements

1. **Create a Playwright test file** in `simple-tests/` directory
   - Use `.spec.js` extension
   - Follow Playwright best practices
   - Use descriptive test names
   - Include proper test structure (test, expect, etc.)

2. **Create simple page objects** in `simple-tests/pages/` directory
   - Keep abstractions minimal - only essential selectors and helper methods
   - Reuse existing locators from `test-infrastructure/pages/*.js` where possible
   - Each page object should be a simple class with static selectors and minimal methods
   - Do not mirror the existing Screenplay pattern or complex abstractions

3. **Follow the same user journey** as the scenario
   - Navigate through the same pages in the same order
   - Use the same data inputs (check existing factories/models for default values)
   - Verify the same outcomes

4. **Do not mirror the existing implementation**
   - Do not copy the Screenplay pattern
   - Do not copy complex task/interaction abstractions
   - Keep it simple and direct with Playwright's native APIs

5. **Reuse existing locators**
   - Check `test-infrastructure/pages/*.js` for selector definitions
   - Use the same selectors to ensure consistency
   - Document any new selectors needed

## Implementation Guidelines

### Test Structure

```javascript
import { test, expect } from '@playwright/test'
import { PageName } from './pages/page-name.js'

test.describe('Feature Name', () => {
  test('Scenario description', async ({ page }) => {
    // Test implementation
  })
})
```

### Page Object Structure

```javascript
export class PageName {
  static selectors = {
    elementName: '#element-id'
    // ... other selectors
  }

  static async navigateTo(page) {
    await page.goto('/path')
  }

  static async performAction(page, data) {
    // Simple, direct actions
  }
}
```

### Data to Use

- Check `test-infrastructure/screenplay/factories/*.js` for default test data
- Use the same default values as existing tests
- For site details, check `SiteDetailsFactory.DEFAULT_COORDINATES`

### Environment Configuration

- Base URL: Use `process.env.BASE_URL` or default to `http://localhost:3000`
- DEFRA ID URL: Use `process.env.DEFRA_ID_URL` or check wdio configs
- Environment: Check `process.env.ENVIRONMENT` to determine if using real DEFRA ID or stub
- For real DEFRA ID: Use `DEFRA_ID_USER_ID` and `DEFRA_ID_USER_PASSWORD` environment variables
- Check existing wdio configs for environment setup

### Authentication Implementation Notes

**For DEFRA ID Stub (default/local environments):**

```javascript
// Register test user if needed (check if stub supports this)
// Navigate to app - will redirect to DEFRA ID stub
// Click login link for test user email
// Handle cookie banner
```

**For Real DEFRA ID (test environments):**

```javascript
// Navigate to app - will redirect to DEFRA ID
// Select Government Gateway authentication
// Enter username and password from env vars
// Click sign in
// Handle cookie banner
```

**Cookie Banner:**

- After authentication, cookie banner appears
- Default behavior: Accept analytics cookies
- Use locators from `CookieBannerPage`

## Expected Output

1. **Test File**: `simple-tests/[feature-name].spec.js`
   - Complete Playwright test implementation
   - All scenario steps converted to test actions
   - Proper assertions for expected outcomes

2. **Page Object Files**: `simple-tests/pages/*.js`
   - One page object per page in the journey
   - Simple, minimal abstractions
   - Reused locators from existing page objects

3. **Documentation**: Brief comments explaining:
   - Which existing locators were reused
   - Any assumptions made about the journey
   - Test data sources

## Key Questions to Answer

1. **What authentication is required?**
   - Check if `Navigate.toTheMarineLicensingApp()` is called in step definitions
   - Determine if real DEFRA ID or stub is used based on environment
   - Identify authentication steps that happen before the scenario steps

2. **What pages are involved in this journey?**
   - List all pages the user navigates through (including authentication pages)
   - Identify the order of navigation
   - Include DEFRA ID login and cookie banner pages

3. **What actions are performed on each page?**
   - Form inputs, button clicks, selections
   - Data entered at each step
   - Authentication actions

4. **What are the expected outcomes?**
   - Final page reached
   - Elements/values to verify
   - Success criteria

5. **What locators can be reused?**
   - Check existing page objects for selectors
   - Include DEFRA ID and cookie banner locators
   - Identify any new selectors needed

6. **What test data is needed?**
   - Default values from factories
   - Any specific data for this scenario
   - Authentication credentials (from env vars for real DEFRA ID)

## Analysis Criteria

The implementation should:

- ✅ Follow Playwright best practices
- ✅ Reuse existing locators where possible
- ✅ Follow the exact same user journey as the scenario
- ✅ Use simple, minimal abstractions
- ✅ Not mirror the existing WebdriverIO/Screenplay implementation
- ✅ Be maintainable and readable
- ✅ Include proper error handling and waits
