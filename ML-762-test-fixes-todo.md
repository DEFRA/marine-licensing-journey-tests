# ML-762 Test Fixes Todo List

## Overview

Fixing tests broken by removal of notification-wide "Activity dates" and "Activity description" tasks.

## Test Files to Fix

### ✅ 1. Remove standalone activity date/description test files

- [x] `test/features/activity.dates.feature` - Remove entire file (tests notification-wide dates)
- [x] `test/features/activity.description.feature` - Remove entire file (tests notification-wide description)
- [x] `test/steps/activity.dates.steps.js` - Remove step definitions file
- [x] `test/steps/activity.description.steps.js` - Remove step definitions file

### ✅ 2. Fix CompleteAllTasks helper function

**File:** `test-infrastructure/screenplay/tasks/complete.all.tasks.js`

- [x] Update to skip "Activity dates" task
- [x] Update to skip "Activity description" task
- [x] Ensure it only completes tasks that actually exist (Project name, Site details, Public register)

### ❌ 3. Fix header and footer tests

**File:** `test/features/header.and.footer.feature`

- [ ] Remove scenario: "The header and footer are correct on the activity dates page"
- [ ] Remove scenario: "The header and footer are correct on the activity description page"

### ❌ 4. Fix dashboard tests

**File:** `test/features/dashboard.feature`

- [ ] Update scenarios that use `CompleteAllTasks` to submit notifications
- [ ] Verify: "When a user has previously submitted a notification and starts a new one, no previously input data is shown"
- [ ] Verify: "View dashboard with notifications in correct sort order"

### ❌ 5. Fix task list tests

**File:** `test/features/task.list.feature`

- [ ] Remove tests checking for "Activity dates" task
- [ ] Remove tests checking for "Activity description" task
- [ ] Update task list validation to only check: Project name, Site details, Public register

### ❌ 6. Fix multi-site file upload tests

**Files:**

- [ ] `test/features/shapefile.site.details.multi.site.feature`
- [ ] `test/features/kml.file.site.details.multi.site.feature`

**Issue:** Looking for `#sameActivityDates-2` radio button ("Are all activity dates the same?")

**Analysis needed:**

- These pages may have been removed as part of ML-762
- OR they may still exist but with different flow/selectors
- Need to check if dates/descriptions are now always per-site

### ❌ 7. Check manual site details multi-site tests

**File:** `test/features/manual.site.details.multi.site.feature`

- [ ] Review for any references to notification-wide dates/descriptions
- [ ] Update if using CompleteAllTasks

### ❌ 8. Other tests using submission flows

- [ ] Review any other tests that submit notifications via CompleteAllTasks
- [ ] Check for implicit dependencies on removed tasks

## Questions to Answer

1. **Multi-site flows:** Are "Are all activity dates/descriptions the same?" pages still needed?
   - If YES: Fix the selectors/flow
   - If NO: Remove those page interactions entirely

2. **Site details task:** Should it now handle dates/descriptions per-site internally?
   - This may already be implemented in the multi-site flows

3. **Test data:** Do we need to update fixtures/test data that references these tasks?

## Priority Order

1. ✅ Remove standalone test files (activity.dates, activity.description)
2. ✅ Fix CompleteAllTasks helper (blocks many tests)
3. ✅ Remove top-level activity dates/descriptions from test data factory
4. ✅ Simplified CompleteActivityDates and CompleteActivityDescription (default to site 1)
5. ✅ Fix header/footer tests - removed activity dates and description scenarios
6. ⏭️ Fix dashboard test (Site details link not found after submission)
7. ⏭️ Investigate multi-site shapefile timeout (different dates/descriptions scenario)
8. ⏭️ Final verification run

## Test Results (Latest Run)

- **16 passing** test files ✅
- **4 failing** test files ❌
  1. `header.and.footer.feature` - ✅ Fixed (removed 2 scenarios), 1 remaining (dashboard)
  2. `shapefile.site.details.multi.site.feature` - timeout on different dates/descriptions scenario

## Notes

- Keep this file as working notes during the fix process
- Delete this file once all tests pass

### Completed Factory/Data Updates

- ✅ Removed notification-wide `activityDescription` and `activityDates` from ExemptionFactory.createBaseExemption()
- ✅ Removed `activityDescriptionTaskCompleted` and `activityDatesTaskCompleted` flags
- ✅ Removed unused imports: ActivityDescriptionModel, ActivityDatesFactory
- ✅ Removed Memory.ofActivityDescriptionWith() and Memory.ofActivityDatesWith() methods
- ✅ Updated CompleteActivityDescription to only use site-specific data
- ✅ Added `.forSite()` method to CompleteActivityDescription (matching CompleteActivityDates)
- ✅ Simplified both CompleteActivityDescription and CompleteActivityDates to default to site 1
- ℹ️ multi-site-site-details-task.js has legacy temporary swap code that's harmless

### TODO: Multi-Site Flow Refactoring

- ⏭️ Consider refactoring multi-site flows to use `CompleteActivityDescription.forSite(siteNumber)` instead of `ActivityDescriptionPageInteractions.enterActivityDescriptionAndContinue()`
  - Files to review:
    - `multi-site-site-details-task.js` (lines 110, 160)
    - `multi-site-file-upload-site-details-task.js` (line 74)
    - `file-upload-site-details-task.js` (line 55)
    - `manual-coordinates-site-details-task.js` (line 67)
  - Benefits: More consistent with screenplay pattern, better abstraction
  - Note: Current implementation works correctly but uses lower-level page interactions
