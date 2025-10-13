# Missing Test Coverage - File Upload Journey

## Status: ML-389, ML-390, ML-364, ML-388, ML-428, ML-627

Date: 2025-10-13

Last Updated: 2025-10-13

---

## Summary

This document tracks missing test coverage for the file upload journey following implementation of multiple user stories. The test requirements are categorized by priority and testing strategy.

### Quick Stats

| Story      | Priority   | Journey Tests Needed | Status         | Notes                                          |
| ---------- | ---------- | -------------------- | -------------- | ---------------------------------------------- |
| **ML-364** | 🔴 High    | 4 scenarios          | ❌ Not started | New user journey - adding incomplete data      |
| **ML-388** | 🔴 High    | 2 scenarios          | ❌ Not started | Task status display - may be partially covered |
| **ML-428** | 🟡 Medium  | 1 scenario           | ❌ Not started | Navigation - may be partially covered          |
| ML-389/390 | 🟡 Medium  | 1 scenario (cancel)  | ❌ Not started | Data cleanup validation                        |
| **ML-627** | 🔵 Backend | 0-2 scenarios        | ❌ Not started | **Recommend backend tests instead**            |

**Total Estimated Journey Tests:** 8-10 scenarios (depending on ML-627 decision)

### Recommended Approach

1. **First:** Audit existing tests to identify what's already covered (ML-388, ML-428)
2. **Then:** Implement ML-364 scenarios (highest priority, definitely missing)
3. **Then:** Implement ML-388/ML-428 scenarios (fill any gaps from audit)
4. **Then:** Implement cancel scenario (data cleanup)
5. **Optional:** ML-627 unsupported CRS error scenario only (rest in backend tests)

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

## 🔴 High Priority - ML-388 Task Status Display

### Background

ML-388 ensures that the "Site details" task on the task list correctly displays "In progress" when sites have incomplete data, and "Completed" when all site data is complete. This is critical for user guidance.

### Missing Scenarios

#### 6. Task List Shows "In Progress" for Incomplete Sites

- **User Story:** ML-388 AC1
- **Status:** ❌ Not implemented
- **Description:** Test that the task list correctly displays "In progress" status when sites have incomplete data
- **Acceptance Criteria:**
  - At least one site has incomplete data (name, dates, or description marked as "INCOMPLETE")
  - User saves and returns to task list
  - Site details task shows "In progress" status

```gherkin
Scenario: Site details task shows "In progress" with incomplete sites
  Given an exemption notification with a file containing a site with incomplete activity dates
  When I complete the file upload flow
  And I view the Review Site Details page
  And I save and continue to the task list
  Then the "Site details" task status is "In progress"
```

#### 7. Task List Shows "Completed" When All Sites Complete

- **User Story:** ML-388 AC2
- **Status:** ❌ Not implemented
- **Description:** Test that the task list correctly displays "Completed" status when all sites have complete data
- **Acceptance Criteria:**
  - All sites have complete data (name, dates, description all provided)
  - User saves and returns to task list
  - Site details task shows "Completed" status

```gherkin
Scenario: Site details task shows "Completed" with all data complete
  Given an exemption notification with a file containing a site with complete data
  When I complete the file upload flow including all required data
  And I save and continue to the task list
  Then the "Site details" task status is "Completed"
```

**Note:** This may already be partially covered by existing happy path tests for ML-389 and ML-390, but needs explicit verification of task status display.

---

## 🟡 Medium Priority - ML-428 Navigation

### Background

ML-428 covers the ability to return to the Review Site Details page from the task list when sites have already been added. This is a simple navigation flow but important for the user journey.

### Missing Scenarios

#### 8. Navigate to Review Site Details from Task List

- **User Story:** ML-428 AC1
- **Status:** ❌ Not implemented
- **Description:** Test that clicking the Site details task navigates to Review Site Details when sites exist
- **Acceptance Criteria:**
  - At least one site has been added
  - User is on task list
  - Clicking "Site details" navigates to Review Site Details page
  - Review Site Details page displays existing sites

```gherkin
Scenario: View existing sites from task list
  Given an exemption notification with a completed file upload
  And I am on the task list
  When I select the "Site details" task
  Then I am taken to the "Review site details" page
  And I can see my existing sites
```

**Note:** This is straightforward navigation and may already be partially covered. Needs verification that navigation works correctly in both "In progress" and "Completed" task states.

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

## 🔵 Backend/Integration Priority - ML-627 Coordinate System Support

### Background

ML-627 is primarily a **backend/technical story** about supporting multiple coordinate reference systems (CRS) in Shapefile uploads. The current Shapefile parser does not convert non-WGS84 coordinate systems to the WGS84 format required by GeoJSON.

### Test Strategy Recommendation

**⚠️ IMPORTANT:** This story requires **backend/integration tests** more than journey tests. The complexity is in:

- Coordinate transformation accuracy
- .prj file parsing
- GeoJSON validation
- Performance with large files

### Potential Journey Test Scenarios (Limited Scope)

#### 9. Upload Shapefile with OSGB36 Coordinates (Happy Path)

- **User Story:** ML-627 AC5
- **Status:** ⚠️ **Recommend backend test instead**
- **Description:** Verify end-to-end that a Shapefile in OSGB36 format can be uploaded and displays correctly
- **Why Backend Test:** Coordinate transformation accuracy is the key concern, not the user interaction

```gherkin
@backend-test-preferred
Scenario: Successfully upload Shapefile with OSGB36 coordinates
  Given an exemption notification
  When I upload a Shapefile containing OSGB36 coordinates
  Then the file is successfully processed
  And the sites are displayed on the map in correct WGS84 positions
```

**Recommended Implementation:** Backend integration test that:

- Loads real OSGB36 Shapefile
- Verifies coordinate transformation to WGS84
- Validates GeoJSON output conforms to RFC 7946
- Checks coordinate accuracy within tolerances

#### 10. Upload Shapefile with Unsupported Coordinate System (Error Path)

- **User Story:** ML-627 AC4
- **Status:** ⚠️ **Could be journey test OR backend test**
- **Description:** Verify clear error message when unsupported CRS is detected
- **Why Journey Test Suitable:** User-facing error message is the focus

```gherkin
Scenario: Clear error for unsupported coordinate system
  Given an exemption notification
  When I upload a Shapefile with an unsupported coordinate system
  Then I see an error message explaining the coordinate system is not supported
  And the error message lists supported coordinate systems
  And the file is not processed
```

**This one COULD be a journey test** as it tests the user-facing error handling.

### Backend Test Requirements (NOT in this test suite)

The following should be **backend/integration tests** in the `marine-licensing-backend` repository:

- ✅ Parse .prj file and extract coordinate reference system (AC2)
- ✅ Transform OSGB36 to WGS84 with accuracy validation (AC3, AC5)
- ✅ Transform other common UK CRS to WGS84
- ✅ Detect unsupported coordinate systems (AC4)
- ✅ Handle missing .prj file gracefully
- ✅ Validate transformed coordinates fall within expected bounds
- ✅ Test performance with large Shapefiles (1000+ features)
- ✅ Verify GeoJSON output conforms to RFC 7946 (AC3)
- ✅ Maintain backward compatibility with WGS84 Shapefiles (AC6)

### Investigation Tasks (Not Test Automation)

From ML-627 AC1, these are **investigation/research tasks**:

- [ ] Analyse historical MMO Shapefile submissions for CRS usage
- [ ] Document frequency of each coordinate system
- [ ] Evaluate Proj4js vs alternative libraries
- [ ] Define acceptable coordinate transformation tolerances
- [ ] Create list of priority coordinate systems to support

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

**ML-364 (Add missing data):**

- [ ] Create factory method for files with incomplete site names
- [ ] Create factory method for files with incomplete activity dates
- [ ] Create factory method for files with incomplete activity descriptions
- [ ] Create factory method for multi-site files with mixed incomplete data

**ML-388 (Task status):**

- [ ] Factory method for file upload with complete data (verify "Completed" status)
- [ ] Factory method for file upload with incomplete data (verify "In progress" status)
- [ ] May already exist - needs verification

**ML-428 (Navigation):**

- [ ] No new factory methods needed - uses existing complete/incomplete data scenarios

**ML-627 (CRS support):**

- [ ] Create OSGB36 test Shapefile (if journey test approach chosen)
- [ ] Create unsupported CRS test Shapefile (for error scenario)
- [ ] **Recommend:** Backend test data instead

### Step Definitions Needed

**ML-364 (Add missing data):**

- [ ] Step to verify "INCOMPLETE" label is displayed
- [ ] Step to click "Add" link for specific field
- [ ] Step to verify returned to RSD after save
- [ ] Step to verify data is displayed after adding
- [ ] Step to verify page scrolls to correct anchor
- [ ] Step to verify file is discarded after cancel

**ML-388 (Task status):**

- [ ] Step to verify task status on task list (may already exist)
- [ ] Step to verify "In progress" status specifically
- [ ] Step to verify "Completed" status specifically
- [ ] Step to navigate to task list and check status

**ML-428 (Navigation):**

- [ ] Step to click "Site details" task from task list (may already exist)
- [ ] Step to verify navigation to Review Site Details page
- [ ] Step to verify existing sites are displayed on RSD

**ML-627 (CRS support):**

- [ ] Step to verify unsupported CRS error message (if journey test)
- [ ] Step to verify supported CRS list in error (if journey test)

### Page Objects/Interactions Needed

**ML-364 (Add missing data):**

- [ ] Review Site Details page - "Add" link interactions
- [ ] Review Site Details page - verify incomplete status
- [ ] Review Site Details page - verify anchor navigation
- [ ] Verify task status on task list

**ML-388 (Task status):**

- [ ] Task list page - get task status helper
- [ ] Task list page - verify specific status values
- [ ] May already exist - needs verification

**ML-428 (Navigation):**

- [ ] Task list page - click site details task (likely already exists)
- [ ] Review Site Details page - verify sites are displayed (likely already exists)

**ML-627 (CRS support):**

- [ ] File upload error page - verify CRS error message (if journey test)
- [ ] **Recommend:** Backend test implementation instead

---

## Notes

### Priority Assessment

- **🔴 ML-364 is the highest priority** - completely new user journey for adding incomplete data from RSD, not covered anywhere
- **🔴 ML-388 is critical** - task status display is key user guidance, likely already partially tested but needs explicit verification
- **🟡 ML-428 is medium priority** - straightforward navigation, may already be covered but needs verification
- **🟡 Cancel scenario** - important for ensuring data cleanup works correctly
- **🔵 ML-627 should be primarily backend tests** - coordinate transformation accuracy is not well-suited to journey tests

### Testing Strategy Considerations

**What needs journey tests:**

- User-facing workflows with multiple page interactions (ML-364)
- Task status display and navigation (ML-388, ML-428)
- Error messages that users will see (ML-627 unsupported CRS error)

**What needs backend/integration tests:**

- Data transformation logic (ML-627 coordinate conversion)
- GeoJSON validation (ML-627)
- .prj file parsing (ML-627)
- Performance testing (ML-627 with large files)

**What needs frontend tests:**

- Detailed page behavior and validation
- Individual component behavior
- Page layout and appearance

### Quick Wins

Some of these tests may already exist implicitly:

- **ML-388 AC2** (Completed status) - likely already tested in happy path for ML-389/ML-390
- **ML-428** - likely already partially covered in existing file upload journey tests
- **Task list interactions** - may already have step definitions and page objects

**Action:** Before implementing, audit existing tests to identify what's already covered.

### Open Questions for Refinement

1. **ML-388/ML-428:** Do we already have task list status verification in existing tests?
2. **ML-364:** Should we test all three "Add" scenarios (name, dates, description) or focus on one as representative?
3. **ML-627:** Do we want ANY journey test for CRS support, or purely backend tests?
4. **Cancel flow:** Should this be tested for all new flows or just the base file upload?
5. **Anchor navigation (ML-364 AC4):** Is this technically feasible to test in WebDriverIO? Does it require specific implementation?

### Dependencies

- ML-388 and ML-428 tests depend on ML-364 scenarios being implemented (incomplete sites)
- ML-627 journey tests (if chosen) depend on backend CRS support being implemented first
- All scenarios depend on the base file upload journey (ML-389, ML-390) being stable
