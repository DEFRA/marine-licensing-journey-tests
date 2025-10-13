# Missing Test Coverage - File Upload Journey

## Status: ML-389, ML-390, ML-364, ML-388, ML-428, ML-627

Date: 2025-10-13

Last Updated: 2025-10-13

---

## 📊 Executive Summary

### Key Recommendations

1. **Reduce test duplication**: Remove 6 redundant multi-site scenarios (50% reduction)
2. **Enhance 1 existing test**: Add ML-364 incomplete data flow to existing KML scenario
3. **Move ML-627 to backend**: Coordinate system transformation is backend concern
4. **Result**: Better coverage with fewer, more focused tests

### Impact

- **Before**: 12 multi-site scenarios + need for 8-10 new tests
- **After**: 6 multi-site scenarios with ML-364/388/428 integrated
- **Benefit**: Faster execution, easier maintenance, no coverage loss

---

## Test Suite Analysis

### Current Test Duplication

We currently have **12 multi-site scenarios** testing the same 4 combinations across 3 input methods:

| File                                        | Scenarios | Same Dates/Desc | Different Dates/Desc | Mixed Combinations |
| ------------------------------------------- | --------- | --------------- | -------------------- | ------------------ |
| `kml.file.site.details.multi.site.feature`  | 4         | ✓               | ✓                    | 2 scenarios        |
| `shapefile.site.details.multi.site.feature` | 4         | ✓               | ✓                    | 2 scenarios        |
| `manual.site.details.multi.site.feature`    | 4         | ✓               | ✓                    | 2 scenarios        |

**This is excessive duplication** - we're testing the same business logic 3 times with only the input method changing.

### Recommended Consolidation

**Keep comprehensive coverage for ONE method (e.g., KML):**

- All 4 date/description combinations

**Reduce others to smoke tests only:**

- Shapefile: 1 scenario (most complex case)
- Manual: 1 scenario (most complex case)

**Reduction: From 12 scenarios to 6 scenarios (50% reduction)**

---

## Summary

This document tracks test coverage following implementation of multiple user stories. The strategy focuses on:

1. **Consolidating duplicate tests** across file types
2. **Enhancing existing journeys** rather than creating new isolated tests
3. **Testing at the appropriate level** (journey vs frontend vs backend)

### Test Strategy After Consolidation

| Story      | Approach                              | Implementation                                            |
| ---------- | ------------------------------------- | --------------------------------------------------------- |
| **ML-389** | ✅ Implicitly tested                  | Already covered in existing upload tests                  |
| **ML-390** | ✅ Implicitly tested                  | Already covered in existing upload tests                  |
| **ML-364** | 🔴 **Enhance existing test**          | Add incomplete data steps to ONE multi-site scenario      |
| **ML-388** | ✅ Implicitly tested                  | Already covered by task status checks in multi-site tests |
| **ML-428** | ✅ Implicitly tested                  | Add navigation check to existing test                     |
| **ML-627** | ❌ **Out of scope for journey tests** | Backend/integration tests only                            |

**Net Change After Consolidation:**

- **Remove**: 6 duplicate multi-site scenarios
- **Enhance**: 1 existing multi-site scenario (add ML-364 incomplete data flow)
- **Result**: From 12 to 6 multi-site tests, with better coverage

---

## 🔧 Test Consolidation Plan

### Tests to Keep (Primary Coverage)

#### `kml.file.site.details.multi.site.feature` - Keep ALL 4 scenarios

These provide comprehensive coverage of the date/description combinations:

1. ✅ Different dates, different descriptions (@smoke)
2. ✅ Same dates, same descriptions (@smoke)
3. ✅ Different dates, same descriptions
4. ✅ Same dates, different descriptions

**Enhancement for ML-364**: Modify scenario 1 to include incomplete data flow:

```gherkin
@kml @smoke @issue=ML-364 @issue=ML-388 @issue=ML-428
Scenario: Complete a multi-site kml file upload with different dates and descriptions including incomplete data
  Given a user is uploading a kml file with multiple sites with different activity dates and different descriptions
  And the site details task is reached
  When the file is uploaded without providing individual site data
  Then the "Site details" task status is "In progress"
  When I select the "Site details" task from the task list  # ML-428
  And I add missing site names from Review Site Details      # ML-364
  And I add missing activity dates from Review Site Details  # ML-364
  And I add missing descriptions from Review Site Details    # ML-364
  And the site details task is completed
  Then the site details review page shows the site details
  And the "Site details" task status is "Completed"
```

### Tests to Reduce (Smoke Only)

#### `shapefile.site.details.multi.site.feature` - Keep ONLY 1 scenario

Remove scenarios 2, 3, 4. Keep only:

- ✅ Different dates, different descriptions (@smoke) - most complex case

#### `manual.site.details.multi.site.feature` - Keep ONLY 1 scenario

Remove scenarios 2, 3, 4. Keep only:

- ✅ Different dates, different descriptions (@smoke) - most complex case

### Tests to Keep As-Is

#### `upload.coordinate.file.feature` - Keep ALL scenarios

These test error conditions and single-site uploads (different from multi-site):

- ✅ All 10 scenarios remain (2 success, 8 error cases)

---

## 🟡 Test Enhancements to Existing Scenarios

### Already Covered by Enhancement

The enhancement to scenario 1 of `kml.file.site.details.multi.site.feature` covers:

- ✅ **ML-388** - Task status "In progress" when incomplete
- ✅ **ML-428** - Navigation from task list to Review Site Details
- ✅ **ML-364** - Adding missing data from Review Site Details

No additional test enhancements needed.

---

## ✅ Already Covered (No Action Needed)

### ML-389 & ML-390 (Single Site Activity Dates and Description)

**Coverage:** `upload.coordinate.file.feature` lines 8-19

- These scenarios already complete the full flow including dates and descriptions
- The factory methods already create the necessary data
- The flow is implicitly tested as part of successful uploads

### ML-388 AC2 (Task Shows "Completed")

**Coverage:** All multi-site tests already verify "Completed" status

- `kml.file.site.details.multi.site.feature` lines 11, 19, 27, 35
- `shapefile.site.details.multi.site.feature` - similar coverage

---

## ❌ Out of Scope for Journey Tests

These items should be tested at different levels for efficiency:

### Backend/Integration Tests (marine-licensing-backend)

**ML-627 - Coordinate Reference System Support**

- ✅ Parse .prj file and extract CRS
- ✅ Transform OSGB36 to WGS84 with accuracy validation
- ✅ Transform other common UK CRS to WGS84
- ✅ Detect unsupported coordinate systems
- ✅ Handle missing .prj file gracefully
- ✅ Validate transformed coordinates fall within expected bounds
- ✅ Test performance with large Shapefiles (1000+ features)
- ✅ Verify GeoJSON output conforms to RFC 7946
- ✅ Maintain backward compatibility with WGS84 Shapefiles

### Frontend Tests (DOM Testing Library)

**Page-Level Behavior**

- ✅ Field validation (dates, descriptions, site names)
- ✅ Default values and pre-population
- ✅ Page captions and layout
- ✅ Error message display
- ✅ Form field character limits
- ✅ Date picker behavior
- ✅ Text area character counting
- ✅ Radio button conditional reveals
- ✅ Back button state preservation

### Unit Tests

**Business Logic**

- ✅ Date validation rules
- ✅ Description character limit validation
- ✅ Site name uniqueness (if required)
- ✅ Coordinate transformation calculations
- ✅ GeoJSON structure validation
- ✅ File size calculations
- ✅ Virus scanning integration

---

## Implementation Checklist

### Phase 1: Test Consolidation (Reduce Duplication)

- [ ] **Remove 3 scenarios** from `shapefile.site.details.multi.site.feature` (keep only scenario 1)
- [ ] **Remove 3 scenarios** from `manual.site.details.multi.site.feature` (keep only scenario 1)
- [ ] **Verify** remaining tests still pass

### Phase 2: Test Enhancement (Add ML-364 Coverage)

- [ ] **Enhance scenario 1** of `kml.file.site.details.multi.site.feature`:
  - [ ] Modify factory to support incomplete data flow
  - [ ] Add step for uploading without individual site data
  - [ ] Add steps for adding missing data from RSD
  - [ ] Add step for task list navigation (ML-428)
  - [ ] Verify "In progress" status (ML-388)

### Phase 3: Implementation Details

- [ ] **Factory updates**:
  - [ ] Add `skipIndividualSiteData` flag to KML multi-site factory
  - [ ] Support incomplete site data generation
- [ ] **Step definitions**:
  - [ ] "When the file is uploaded without providing individual site data"
  - [ ] "When I add missing site names from Review Site Details"
  - [ ] "When I add missing activity dates from Review Site Details"
  - [ ] "When I add missing descriptions from Review Site Details"
- [ ] **Page objects**:
  - [ ] ReviewSiteDetailsPage - add "Add" link interactions
  - [ ] ReviewSiteDetailsPage - verify incomplete labels

---

## Notes

### Why This Approach?

1. **Reduces test duplication by 50%** - From 12 to 6 multi-site scenarios
2. **Enhances existing tests** - No new isolated test files needed
3. **Tests real user journeys** - ML-364 flow integrated into existing journey
4. **Appropriate test levels** - Backend logic in backend tests, UI details in frontend tests
5. **Implicit coverage** - ML-388 and ML-428 naturally covered in enhanced flow

### Test Coverage Matrix

| Functionality            | KML | Shapefile | Manual | Single Site | Multi-Site | Error Cases |
| ------------------------ | --- | --------- | ------ | ----------- | ---------- | ----------- |
| Same dates/desc          | ✓   | ✓         | ✓      | ✓           | ✓          | N/A         |
| Different dates/desc     | ✓   | ✓         | ✓      | ✓           | ✓          | N/A         |
| Mixed combinations       | ✓   | -         | -      | N/A         | ✓          | N/A         |
| Incomplete data (ML-364) | ✓   | -         | -      | -           | ✓          | N/A         |
| Task status (ML-388)     | ✓   | ✓         | ✓      | ✓           | ✓          | N/A         |
| Navigation (ML-428)      | ✓   | -         | -      | -           | ✓          | N/A         |
| Error handling           | ✓   | ✓         | N/A    | ✓           | N/A        | ✓           |

### Success Criteria

- **Test suite remains under 15 minutes** for full regression
- **Smoke tests under 5 minutes** (@smoke scenarios only)
- **No duplicate test logic** across different input methods
- **All critical user paths covered** at journey level
- **Clear separation** between journey, frontend, and backend tests
