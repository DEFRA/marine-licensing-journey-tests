# ML-762 Test Fixes Todo List

## ✅ Status: COMPLETED

All tests passing after removal of notification-wide "Activity dates" and "Activity description" tasks.

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

### ✅ 3. Fix header and footer tests

**File:** `test/features/header.and.footer.feature`

- [x] Remove scenario: "The header and footer are correct on the activity dates page"
- [x] Remove scenario: "The header and footer are correct on the activity description page"

### ✅ 4. Fix URL expectations for site-specific activity descriptions

**File:** `test-infrastructure/screenplay/tasks/multi-site-site-details-task.js`

- [x] Updated URL from `/exemption/site-details-activity-description` to `/exemption/activity-description`
- [x] Fixed navigation wait expectation for activity description page

### ✅ 5. All other tests

All other tests now pass with the updated `CompleteAllTasks` helper that only completes:

- Project name
- Site details (with per-site activity dates and descriptions)
- Public register

## ✅ Completed Work Summary

### Priority Order (All Completed)

1. ✅ Remove standalone test files (activity.dates, activity.description)
2. ✅ Fix CompleteAllTasks helper (blocks many tests)
3. ✅ Remove top-level activity dates/descriptions from test data factory
4. ✅ Simplified CompleteActivityDates and CompleteActivityDescription (default to site 1)
5. ✅ Fix header/footer tests - removed activity dates and description scenarios
6. ✅ Fix URL expectations for activity description navigation
7. ✅ All tests passing

## Final Test Results

- **All tests passing** ✅
- Activity dates and descriptions are now handled per-site within the Site Details task
- No notification-wide activity date/description tasks remain

## Changes Made

### 1. Test Files Removed

- ✅ `test/features/activity.dates.feature`
- ✅ `test/features/activity.description.feature`
- ✅ `test/steps/activity.dates.steps.js`
- ✅ `test/steps/activity.description.steps.js`
- ✅ Two scenarios from `test/features/header.and.footer.feature`

### 2. Test Infrastructure Updates

- ✅ **CompleteAllTasks**: Removed attempts to complete "Activity dates" and "Activity description" tasks
- ✅ **ExemptionFactory**: Removed notification-wide `activityDescription` and `activityDates` fields
- ✅ **Memory helper**: Removed `ofActivityDescriptionWith()` and `ofActivityDatesWith()` methods
- ✅ **CompleteActivityDescription**: Added `.forSite()` method, defaults to site 1
- ✅ **CompleteActivityDates**: Updated to default to site 1 (matching CompleteActivityDescription)
- ✅ **Task exports**: Removed exports for CompleteActivityDates and CompleteActivityDescription from top-level index

### 3. URL Fix

- ✅ **multi-site-site-details-task.js**: Updated URL from `/exemption/site-details-activity-description` to `/exemption/activity-description`

### 4. Multi-Site Site-Specific Data Fix

- ✅ **multi-site-site-details-task.js**:
  - Removed legacy temporary swap hack for activity dates
  - Updated `enterSiteSpecificActivityDates()` to use `CompleteActivityDates.forSite(currentSite.siteNumber)`
  - Ensured each site uses its own activity dates and description (not always site 1)
- ✅ **multi-site-file-upload-site-details-task.js**: Already correctly using `.forSite(siteNumber)` pattern
- ✅ **AddMissingActivityDates**: Already correctly using `CompleteActivityDates.forSite(siteNumber)`

### 5. Architecture Notes

- Activity dates and descriptions are now **site-specific only**
- Multi-site flows handle dates/descriptions per-site within the Site Details task
- The "Are activity dates/descriptions the same for all sites?" flow still exists for shared values
- Each site correctly uses its own data via `.forSite(siteNumber)` pattern
