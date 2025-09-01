# ML-142 Implementation Plan: IAT Path Parameters Integration

## Overview

Adapt existing test suite to include IAT (Initial Assessment Tool) context parameters when launching the application, ensuring all tests use randomised IAT data and validate the Project Summary card displays correctly.

## 1. Create Arrays for Path Parameter Values

### 1.1 Activity Type Codes Array

Create array of all possible activity type codes from AC2:

```javascript
const ACTIVITY_TYPES = [
  { code: 'CON', display: 'Construction' },
  { code: 'DEPOSIT', display: 'Deposit of a substance or object' },
  { code: 'REMOVAL', display: 'Removal of a substance or object' },
  { code: 'DREDGE', display: 'Dredging' },
  { code: 'INCINERATION', display: 'Incineration of a substance or object' },
  { code: 'EXPLOSIVES', display: 'Use of an explosive substance' },
  { code: 'SCUTTLING', display: 'Sinking of a vessel or floating container' }
]
```

### 1.2 Article Codes Array

Create array of all possible article codes from AC3:

```javascript
const ARTICLE_CODES = [
  {
    code: '13',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/13',
    display:
      'Article 13 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '17',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/17',
    display:
      'Article 17 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '17A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/17A',
    display:
      'Article 17A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '17B',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/17B',
    display:
      'Article 17B of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '18A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/18A',
    display:
      'Article 18A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '20',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/20',
    display:
      'Article 20 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '21',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/21',
    display:
      'Article 21 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '25',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/25',
    display:
      'Article 25 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '25A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/25A',
    display:
      'Article 25A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '26A',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/26A',
    display:
      'Article 26A of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '34',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/34',
    display:
      'Article 34 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  },
  {
    code: '35',
    link: 'http://www.legislation.gov.uk/uksi/2011/409/article/35',
    display:
      'Article 35 of the Marine Licence (Exempted Activities) Order 2011 (as amended)'
  }
]
```

### 1.3 Purpose Examples Array

Create array of realistic activity purposes:

```javascript
const ACTIVITY_PURPOSES = [
  'Samples for testing and analysis',
  'Environmental monitoring and research',
  'Infrastructure maintenance and repair',
  'Scientific research and data collection',
  'Habitat restoration activities',
  'Navigation channel maintenance',
  'Coastal protection measures',
  'Marine conservation work'
]
```

## 2. Faker Integration in Exemption Factory

### 2.1 Location to Implement

**File:** `test-infrastructure/screenplay/data/exemption-factory.js`

### 2.2 New IAT Data Structure

Add new `iatContext` property to exemption object:

```javascript
const iatContext = {
  activityType: faker.helpers.arrayElement(ACTIVITY_TYPES),
  articleCode: faker.helpers.arrayElement(ARTICLE_CODES),
  activityPurpose: faker.helpers.arrayElement(ACTIVITY_PURPOSES),
  pdfUrl: `https://example.com/iat-answers/${faker.string.uuid()}.pdf`
}
```

### 2.3 Updated Exemption Factory

Extend existing exemption factory to include:

```javascript
export const createExemption = () => ({
  // ... existing properties
  iatContext: {
    activityType: faker.helpers.arrayElement(ACTIVITY_TYPES),
    articleCode: faker.helpers.arrayElement(ARTICLE_CODES),
    activityPurpose: faker.helpers.arrayElement(ACTIVITY_PURPOSES),
    pdfUrl: `https://example.com/iat-answers/${faker.string.uuid()}.pdf`
  }
})
```

## 3. URL Launch Modification

### 3.1 Files to Update

**Primary File:** `test-infrastructure/screenplay/abilities/browse-the-web.js`

### 3.2 Updated navigateTo Method

Modify the existing `navigateTo` method to construct URLs with IAT parameters:

```javascript
async navigateTo(url) {
  // If actor has an exemption with IAT context, add parameters
  if (this.actor?.intention?.iatContext) {
    const urlWithParams = this.constructIatUrl(url, this.actor.intention.iatContext)
    await this.browser.url(urlWithParams)
  } else {
    await this.browser.url(url)
  }
}

constructIatUrl(baseUrl, iatContext) {
  const params = new URLSearchParams({
    activityType: iatContext.activityType.code,
    articleCode: iatContext.articleCode.code,
    activityPurpose: iatContext.activityPurpose,
    pdfUrl: iatContext.pdfUrl
  })

  return `${baseUrl}?${params.toString()}`
}
```

**Note:** This automatically applies to all existing Navigate.toTheMarineLicensingApp() calls.

## 4. Apply to ALL Existing Tests (Realistic User Flow)

### 4.1 Universal IAT Integration

**Key Principle:** All users come from IAT in real scenarios, so ALL tests should include IAT parameters to mimic realistic user journeys.

### 4.2 Automatic Application to Existing Tests

All existing tests use patterns like:

```javascript
// Existing step definition pattern
Given(
  'a notification has been created with a valid project name',
  async function () {
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName() // Now ALWAYS includes IAT context
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp()) // Uses updated navigateTo
  }
)
```

**Key Point:** No changes needed to existing step definitions - they work exactly the same.

### 4.3 Realistic Test Scenarios

Every test execution will now:

- Use randomised IAT activity types and article codes
- Include realistic activity purposes
- Launch with proper IAT URL parameters
- Validate Project Summary card displays IAT information correctly

### 4.4 No Test Left Behind

**All existing feature files will automatically use IAT context:**

- `project.name.feature`
- `task.list.feature`
- `activity.dates.feature`
- `activity.description.feature`
- `site.details.manual.circle.feature`
- `site.details.manual.polygon.feature`
- `upload.coordinate.file.feature`
- `check.your.answers.feature`
- `submit.notification.feature`
- `dashboard.feature`
- All validation features
- All back/cancel navigation features

## 5. Adapt Check Your Answers Tests

### 5.1 New Project Summary Card Validation

**File:** `test-infrastructure/screenplay/interactions/ensure-project-summary-card.js`

```javascript
export class EnsureProjectSummaryCard {
  static displaysIatInformation(exemption) {
    return new EnsureProjectSummaryCard(exemption)
  }

  async performAs(actor) {
    const projectSummaryCard = this.page.locator(
      '[data-testid="project-summary-card"]'
    )

    // Validate Project Name
    await expect(
      projectSummaryCard.getByText(this.exemption.projectName)
    ).toBeVisible()

    // Validate Type of Activity
    await expect(
      projectSummaryCard.getByText(
        this.exemption.iatContext.activityType.display
      )
    ).toBeVisible()

    // Validate Purpose of Activity
    await expect(
      projectSummaryCard.getByText(this.exemption.iatContext.activityPurpose)
    ).toBeVisible()

    // Validate Article Link
    const articleLink = projectSummaryCard.getByRole('link', {
      name: this.exemption.iatContext.articleCode.display
    })
    await expect(articleLink).toBeVisible()
    await expect(articleLink).toHaveAttribute(
      'href',
      this.exemption.iatContext.articleCode.link
    )
    await expect(articleLink).toHaveAttribute('target', '_blank')

    // Validate PDF Download Link
    const pdfLink = projectSummaryCard.getByRole('link', {
      name: 'Download a copy of your answers (PDF)'
    })
    await expect(pdfLink).toBeVisible()
    await expect(pdfLink).toHaveAttribute(
      'href',
      this.exemption.iatContext.pdfUrl
    )

    // Validate Projects Page Link
    const projectsLink = projectSummaryCard.getByRole('link', {
      name: 'Projects page'
    })
    await expect(projectsLink).toBeVisible()
  }
}
```

### 5.2 Updated Check Your Answers Steps

**File:** `test/steps/check.your.answers.steps.js`

Add new step definitions:

```javascript
Then(
  'the project summary card displays the IAT information',
  async function () {
    await this.actor.attemptsTo(
      EnsureProjectSummaryCard.displaysIatInformation(this.exemption)
    )
  }
)

Then(
  'the project summary card displays the activity type {string}',
  async function (expectedActivityType) {
    const projectSummaryCard = this.page.locator(
      '[data-testid="project-summary-card"]'
    )
    await expect(
      projectSummaryCard.getByText(expectedActivityType)
    ).toBeVisible()
  }
)

Then(
  'the project summary card displays the article {string}',
  async function (expectedArticleText) {
    const projectSummaryCard = this.page.locator(
      '[data-testid="project-summary-card"]'
    )
    await expect(
      projectSummaryCard.getByText(expectedArticleText)
    ).toBeVisible()
  }
)
```

### 5.3 Updated Feature Scenarios

**File:** `test/features/check.your.answers.feature`

Add new scenarios:

```gherkin
@issue=ML-142
Scenario: Check your answers displays project summary with IAT context
  Given I start a new exemption notification with IAT context
  And I complete the project name task
  And I complete the activity dates task
  And I complete the activity description task
  And I complete the site details task using circle coordinates
  And I complete the public register task
  When I navigate to check your answers
  Then the project summary card displays the IAT information
  And the project summary card displays the activity type from IAT
  And the project summary card displays the article information from IAT
  And the PDF download link is present
  And the projects page link is present

@issue=ML-142
Scenario Outline: Project summary displays different activity types correctly
  Given I start a new exemption notification with activity type "<activityTypeCode>"
  And I complete all required tasks
  When I navigate to check your answers
  Then the project summary card displays the activity type "<activityTypeDisplay>"

  Examples:
    | activityTypeCode | activityTypeDisplay                    |
    | CON              | Construction                           |
    | DEPOSIT          | Deposit of a substance or object       |
    | REMOVAL          | Removal of a substance or object       |
    | DREDGE           | Dredging                               |
```

## 6. Implementation Steps

### Step 1: Create IAT Constants File

- **File:** `test-infrastructure/screenplay/factories/iat-constants.js`
- **Content:** Activity types, article codes, and purposes arrays
- **Priority:** High

### Step 2: Update Exemption Factory

- **File:** `test-infrastructure/screenplay/factories/exemption.factory.js`
- **Changes:** Add `iatContext` property to `createBaseExemption` method
- **Priority:** High

### Step 3: Modify Application Launch

- **File:** `test-infrastructure/screenplay/abilities/browse.the.web.js`
- **Changes:** Update `navigateTo` method to include IAT parameters
- **Priority:** High

### Step 4: Create Project Summary Validation

- **File:** `test-infrastructure/screenplay/interactions/ensure-project-summary-card.js`
- **Content:** Comprehensive IAT information validation
- **Priority:** High

### Step 5: Update Check Your Answers Steps

- **File:** `test/steps/check.your.answers.steps.js`
- **Changes:** Add IAT-specific step definitions
- **Priority:** Medium

### Step 6: Add ML-142 Feature Scenarios

- **File:** `test/features/check.your.answers.feature`
- **Changes:** Add IAT validation scenarios with `@issue=ML-142` tag (only in this feature file)
- **Priority:** Medium
- **Scope:** Only check your answers feature needs the ML-142 tag since that's where Project Summary card is tested

### Step 7: Universal Application to ALL Existing Tests

- **Files:** ALL feature files that launch applications (complete list in 4.4)
- **Changes:** All existing tests automatically use IAT context via updated exemption factory
- **Priority:** HIGH - This ensures realistic user flow simulation for all tests
- **Impact:** Every existing test now mimics coming from IAT (realistic scenario)

## 7. Test Data Strategy

### 7.1 Faker Implementation

Use faker for consistent randomisation:

```javascript
// In exemption factory
iatContext: {
  activityType: faker.helpers.arrayElement(ACTIVITY_TYPES),
  articleCode: faker.helpers.arrayElement(ARTICLE_CODES),
  activityPurpose: faker.helpers.arrayElement(ACTIVITY_PURPOSES),
  pdfUrl: `https://example.com/iat-answers/${faker.string.uuid()}.pdf`
}
```

### 7.2 Test Isolation

Ensure each test gets fresh, random IAT data to prevent test coupling.

## 8. Seamless Transition for All Existing Tests

### 8.1 Zero-Disruption Implementation

The updated exemption factory ensures ALL existing tests seamlessly transition to IAT parameters:

```javascript
// Existing step definition - no changes needed
Given(
  'a notification has been created with a valid project name',
  async function () {
    this.actor.intendsTo(
      ApplyForExemption.withValidProjectName() // Now includes IAT context via updated factory
    )
    await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp()) // Uses updated navigateTo method
  }
)
```

### 8.2 Universal Realistic Flow

- **Before:** Tests launched app directly without IAT context
- **After:** All tests launch with IAT parameters (mimicking real user journey)
- **Impact:** Every test execution now represents a realistic user flow from IAT
- **Benefit:** Better test coverage of actual user experience

## 9. Validation Requirements

### 9.1 Project Summary Card Elements

Validate all elements from user story:

- ✅ Project name display
- ✅ Activity type from IAT context
- ✅ Activity purpose from IAT context
- ✅ Article link with correct URL and text
- ✅ PDF download link functionality
- ✅ Projects page link navigation

### 9.2 Link Behaviour

- Article links open in new tab (`target="_blank"`)
- PDF download triggers download
- Projects page link navigates to dashboard

## 10. Files to Create/Modify

### New Files

1. `test-infrastructure/screenplay/factories/iat-constants.js`
2. `test-infrastructure/screenplay/interactions/ensure-project-summary-card.js`
3. `TEMP_ML-142_implementation_plan.md` (this file - delete after implementation)

### Modified Files

1. `test-infrastructure/screenplay/factories/exemption.factory.js` (add iatContext to createBaseExemption)
2. `test-infrastructure/screenplay/abilities/browse.the.web.js` (update navigateTo method)
3. `test/steps/check.your.answers.steps.js` (add Project Summary card validation steps)
4. `test/features/check.your.answers.feature` (add @issue=ML-142 scenarios only)

## 11. Testing Strategy

### 11.1 New Scenarios Priority

1. **High:** Basic IAT information display validation
2. **Medium:** All activity type variations using Scenario Outline
3. **Medium:** All article code variations using Scenario Outline
4. **Low:** Link functionality (PDF download, article links)

### 11.2 Test Tags

- `@issue=ML-142` only for new Project Summary card validation scenarios in check.your.answers.feature
- Maintain existing tags (`@smoke`, etc.) for all other tests
- No need to add ML-142 tag to every feature file

## 12. Implementation Order

1. **Phase 1:** Create constants and update factory (foundational)
2. **Phase 2:** Modify URL launch mechanism (core functionality)
3. **Phase 3:** Create validation interactions (verification)
4. **Phase 4:** Add new test scenarios (coverage)
5. **Phase 5:** Validate existing tests still pass (regression)

## Success Criteria

- [ ] All existing tests continue to pass
- [ ] New tests validate IAT information appears correctly
- [ ] Faker generates realistic test data consistently
- [ ] URL parameters are correctly constructed and passed
- [ ] Project Summary card displays all required IAT elements
- [ ] Links function correctly (new tab, download, navigation)

## Notes

- Remember to use faker.helpers.arrayElement() for consistent random selection
- Follow Uncle Bob's test principles - explicit and self-contained tests
- Maintain existing test patterns and naming conventions
- Consider using Scenario Outline for activity type and article code variations
- Ensure test data is realistic and matches production scenarios
- **Simplified approach:** No special IAT functions needed - exemption factory always includes IAT context
- **Universal application:** All existing tests automatically get realistic IAT parameters
