# Test Consolidation - Multi-Site File Upload

## Status: ✅ ALL WORK COMPLETE - READY FOR CONSOLIDATION

Last Updated: 2025-10-14

---

## Summary

### ✅ Implementation Complete

All user stories implemented and tested:

- **ML-389**: Activity dates for single-site uploads
- **ML-390**: Activity description for single-site uploads
- **ML-364**: Add missing data from Review Site Details
- **ML-388**: Task status handling (bug fixed)
- **ML-428**: Task list navigation (already covered)

**Key Deliverables**:

- Dynamic site generation from `.expected.json` files
- `CompleteActivityDates.forSite(siteNumber)` for site-specific dates
- New interactions: `AddMissingSiteName`, `AddMissingActivityDates`, `AddMissingActivityDescription`
- Strengthened assertions checking exact value equality

**Result**: All 40 tests passing ✅

### 📝 Next Action: Test Consolidation

**Current**: 12 multi-site scenarios (KML: 4, Shapefile: 4, Manual: 4)

**Goal**: 6 multi-site scenarios (KML: 4, Shapefile: 1, Manual: 1)

**Benefit**: 50% reduction in multi-site tests, faster execution, no coverage loss

---

## Consolidation Plan

### Actions Required

#### 1. `shapefile.site.details.multi.site.feature` - Remove 3 scenarios

Keep only:

- Scenario 1: "different activity dates and different descriptions" (@smoke)

Remove:

- Scenario 2: "same activity dates and descriptions"
- Scenario 3: "different activity dates and same descriptions"
- Scenario 4: "same activity dates and different descriptions"

#### 2. `manual.site.details.multi.site.feature` - Remove 3 scenarios

Keep only:

- Scenario 1: "different activity dates and different descriptions" (@smoke)

Remove:

- Scenario 2: "same activity dates and descriptions"
- Scenario 3: "different activity dates and same descriptions"
- Scenario 4: "same activity dates and different descriptions"

#### 3. `kml.file.site.details.multi.site.feature` - Keep all 4 scenarios ✅

No changes - this provides comprehensive coverage.

#### 4. `upload.coordinate.file.feature` - Keep all scenarios ✅

No changes - single-site and error scenarios.

---

## Checklist

### Test Consolidation

- [ ] Remove 3 scenarios from `shapefile.site.details.multi.site.feature`
- [ ] Remove 3 scenarios from `manual.site.details.multi.site.feature`
- [ ] Run full test suite to verify all tests pass
- [ ] Confirm test execution time improvements
- [ ] Update documentation to reflect final test count

### @wip Scenarios - Awaiting Multi-Site Implementation

The following scenarios are marked `@wip` and blocked until multi-site changes are implemented in the application:

**`check.your.answers.feature`** - Entire feature marked @wip

- **Blocker**: Check Your Answers page not updated to handle site details activity dates and descriptions for multi-site
- **Action**: Implement CYA multi-site support, then re-enable and update tests

**`dashboard.feature`** - "View submitted notification via dashboard"

- **Blocker**: Dashboard view details not updated for multi-site activity dates/descriptions
- **Action**: Implement dashboard multi-site support, then re-enable test

**`redirect.to.login.when.logged.out.feature`** - "View Details redirect when logged out"

- **Blocker**: View Details page not updated for multi-site activity dates/descriptions
- **Action**: Implement View Details multi-site support, then re-enable test

### Future: Top-Level Task Removal

**Application Change**: Top-level Activity Dates and Activity Description tasks will be deleted (moved into Site Details flow)

**Impact on Tests**:

- `activity.dates.feature` - Review and either remove or integrate scenarios into site details tests
- `activity.description.feature` - Review and either remove or integrate scenarios into site details tests
- Any scenarios testing top-level activity dates/description tasks independently will need updating

**Action**: After application changes are deployed, audit and refactor affected test scenarios

---

## Out of Scope

**ML-627 - Multiple CRS support**: Backend/integration tests only - coordinate transformation testing belongs in backend test suite.
