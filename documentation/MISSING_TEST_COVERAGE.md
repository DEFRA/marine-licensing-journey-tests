# Missing Test Coverage - File Upload Journey

## Status: ML-389, ML-390, ML-364

Date: 2025-10-13

---

## 🔴 High Priority - ML-364 Coverage

### Background

ML-364 introduces a completely new user journey for adding incomplete data from the Review Site Details (RSD) page. This is **not currently tested** in journey tests.

### Missing Scenarios

#### 1. Add Missing Site Name from Review Site Details

- **User Story:** ML-364 AC1
- **Status:** ❌ Not implemented
- **Description:** Test the flow where a user can add a missing site name by clicking "Add" on the RSD page
- **Acceptance Criteria:**
  - Navigate from RSD → Site Name page
  - Save returns to RSD with changes
  - Cancel returns to RSD without changes
  - Back returns to RSD without changes

```gherkin
Scenario: Add missing site name from Review Site Details
  Given an exemption notification with a file containing a site with incomplete site name
  When I view the Review Site Details page
  And the site name is marked as "INCOMPLETE"
  And I select "Add" for the missing site name
  And I provide a site name
  And I save my changes
  Then I am returned to Review Site Details
  And the site name is now displayed
```

#### 2. Add Missing Activity Dates from Review Site Details

- **User Story:** ML-364 AC2
- **Status:** ❌ Not implemented
- **Description:** Test the flow where a user can add missing activity dates by clicking "Add" on the RSD page
- **Acceptance Criteria:**
  - Navigate from RSD → Activity Dates page
  - Save returns to RSD with changes
  - Cancel returns to RSD without changes
  - Back returns to RSD without changes

```gherkin
Scenario: Add missing activity dates from Review Site Details
  Given an exemption notification with a file containing a site with incomplete activity dates
  When I view the Review Site Details page
  And the activity dates are marked as "INCOMPLETE"
  And I select "Add" for the missing activity dates
  And I provide activity dates
  And I save my changes
  Then I am returned to Review Site Details
  And the activity dates are now displayed
```

#### 3. Add Missing Activity Description from Review Site Details

- **User Story:** ML-364 AC3
- **Status:** ❌ Not implemented
- **Description:** Test the flow where a user can add a missing activity description by clicking "Add" on the RSD page
- **Acceptance Criteria:**
  - Navigate from RSD → Activity Description page
  - Save returns to RSD with changes
  - Cancel returns to RSD without changes
  - Back returns to RSD without changes

```gherkin
Scenario: Add missing activity description from Review Site Details
  Given an exemption notification with a file containing a site with incomplete activity description
  When I view the Review Site Details page
  And the activity description is marked as "INCOMPLETE"
  And I select "Add" for the missing activity description
  And I provide an activity description
  And I save my changes
  Then I am returned to Review Site Details
  And the activity description is now displayed
```

#### 4. Return to Correct Site After Adding Data (ML-364 AC4)

- **User Story:** ML-364 AC4
- **Status:** ❌ Not implemented
- **Description:** Ensure user is returned to the correct anchor point on RSD for multi-site uploads
- **Note:** This is particularly important for long lists of sites

```gherkin
Scenario: User returns to correct site anchor after adding data
  Given an exemption notification with a file containing multiple sites with incomplete data
  When I view the Review Site Details page
  And I select "Add" for incomplete data on site 3
  And I provide the missing data
  And I save my changes
  Then I am returned to Review Site Details
  And the page scrolls to site 3
```

---

## 🟡 Medium Priority - Cancel Journey

### 5. Cancel During File Upload Flow Discards All Data

- **User Story:** ML-389 AC4, ML-390 AC4
- **Status:** ❌ Not implemented
- **Description:** Test that cancelling during the file upload flow properly discards all data and returns user to task list
- **Acceptance Criteria:**
  - Task status not updated
  - All answers discarded
  - Uploaded file discarded

```gherkin
Scenario: Cancel during site details upload discards all data
  Given an exemption notification with a valid KML file
  When I start completing the site details task
  And I upload my file
  And I provide activity dates
  And I select "Cancel"
  Then I am returned to the task list
  And the site details task status is "Not started"
  And if I re-enter the site details task, my uploaded file is not present
```

---

## ✅ Adequate Coverage (Don't Need Journey Tests)

These items are better covered by **frontend unit/integration tests** using DOM Testing Library:

### Page Behavior & Validation

- ❌ Back navigation updates previous answers (ML-389 AC5, ML-390 AC5) - too granular
- ❌ Date field validation (ML-389 AC2) - frontend component test
- ❌ Description field validation (ML-390 AC2) - frontend component test
- ❌ Default values for fields - frontend component test
- ❌ Page caption displays project name - frontend component test
- ❌ Page layout and appearance - visual regression tests

---

## Implementation Checklist

### Test Data Factory Updates Needed

- [ ] Create factory method for files with incomplete site names
- [ ] Create factory method for files with incomplete activity dates
- [ ] Create factory method for files with incomplete activity descriptions
- [ ] Create factory method for multi-site files with mixed incomplete data

### Step Definitions Needed

- [ ] Step to verify "INCOMPLETE" label is displayed
- [ ] Step to click "Add" link for specific field
- [ ] Step to verify returned to RSD after save
- [ ] Step to verify data is displayed after adding
- [ ] Step to verify page scrolls to correct anchor
- [ ] Step to verify file is discarded after cancel

### Page Objects/Interactions Needed

- [ ] Review Site Details page - "Add" link interactions
- [ ] Review Site Details page - verify incomplete status
- [ ] Review Site Details page - verify anchor navigation
- [ ] Verify task status on task list

---

## Notes

- **ML-364 is the highest priority** as it's a completely new user journey not covered anywhere
- The cancel scenario is important for ensuring data cleanup works correctly
- Frontend tests should handle the detailed page behavior and validation
- These journey tests focus on the end-to-end user flows and critical paths
