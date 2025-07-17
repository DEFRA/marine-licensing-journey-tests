# ML-38 Test Coverage Analysis and Implementation Plan

## Current Test Coverage Analysis

### ✅ What's Currently Implemented

#### validation.polygon.osgb36.coordinates.feature

- **Basic validation scenarios**: All standard validation for invalid coordinate data (lines 17-43)
- **Add point validation recovery**: Testing that point 4 errors don't exist after adding point (lines 50-53)
- **Remove point validation cleanup**: Testing that point 4 errors are cleared after removal (lines 55-63)

#### validation.polygon.wgs84.coordinates.feature

- **Basic validation scenarios**: All standard validation for invalid coordinate data (lines 17-35)
- **Coverage**: Only covers first 3 points validation

#### site.details.manual.polygon.feature

- **Positive path triangular sites**: Both WGS84 and OSGB36 coordinate systems
- **Positive path quadrilateral sites**: Both coordinate systems with "add another point" functionality
- **Positive path pentagon sites**: Both coordinate systems with multiple additional points
- **Stress testing**: Random polygon with configurable point count (10+ points)

### ❌ What's Missing

## Gap Analysis Against ML-38 Acceptance Criteria

| AC  | Requirement                            | OSGB36 Coverage    | WGS84 Coverage   | Status   |
| --- | -------------------------------------- | ------------------ | ---------------- | -------- |
| AC1 | Display "Add another point" button     | ✅ Implicit        | ✅ Implicit      | Complete |
| AC2 | Press "Add another point" button       | ✅ Positive path   | ✅ Positive path | Complete |
| AC3 | Press "Remove" button                  | ✅ Validation only | ❌ Missing       | **Gap**  |
| AC4 | Non-JS behaviour                       | ❌ Missing         | ❌ Missing       | **Gap**  |
| AC5 | WGS84 validation on additional points  | N/A                | ❌ Missing       | **Gap**  |
| AC6 | OSGB36 validation on additional points | ✅ Basic           | ✅ Basic         | Partial  |
| AC7 | Continue functionality                 | ✅ Positive path   | ✅ Positive path | Complete |

## Implementation Plan

### Priority 1: Critical Missing Tests

#### 1. Add WGS84 Additional Point Validation Scenarios

**File**: `validation.polygon.wgs84.coordinates.feature`
**Add scenarios similar to OSGB36 lines 50-63**:

```gherkin
Scenario: Adding coordinate point after validation failure shows correct validation state
  Given errors have been generated for the first 3 coordinate points
  When the Add another point button is clicked
  Then the point 4 latitude error should not exist
  And the point 4 longitude error should not exist

Scenario: Removing coordinate point with validation errors clears errors correctly
  Given errors have been generated for the first 4 coordinate points
  When the Remove button for Point 4 is clicked
  Then the point 4 latitude error should not exist
  And the point 4 longitude error should not exist
```

#### 2. Extended Validation for Additional Points (Both Coordinate Systems)

**Files**: Both validation feature files
**Add comprehensive validation scenarios for points 4, 5, 6+**:

```gherkin
Scenario Outline: Validation errors for additional points <point> with <coordinateType> value <invalidValue>
  Given the coordinate entry page is displayed with <pointCount> points
  When the "<coordinateType>" input for "<point>" is set to "<invalidValue>"
  And the Continue button is clicked
  Then the "<coordinateType>" error for "<point>" is "<expectedError>"

Examples:
  | pointCount | point   | coordinateType | invalidValue | expectedError |
  | 4          | Point 4 | Eastings       | abc123       | Eastings of point 4 must be a number |
  | 5          | Point 5 | Latitude       | abc          | Latitude of point 5 must be a number |
  | 6          | Point 6 | Longitude      | 181.000000   | Longitude of point 6 must be between -180 and 180 |
```

#### 3. Non-JavaScript Behaviour Testing

**File**: New scenarios in both validation files
**Add scenarios covering AC4 requirements**:

```gherkin
@no-javascript
Scenario: Adding point without JavaScript causes page reload
  Given JavaScript is disabled
  And the coordinate entry page is displayed
  When the Add another point button is clicked
  Then the page reloads with an additional coordinate point

@no-javascript
Scenario: Removing point without JavaScript causes page reload
  Given JavaScript is disabled
  And the coordinate entry page is displayed with 4 points
  When the Remove button for Point 4 is clicked
  Then the page reloads with Point 4 removed
```

### Priority 2: Enhanced Test Coverage

#### 4. Positive Path Remove Button Testing

**File**: `site.details.manual.polygon.feature`
**Add scenarios testing successful removal**:

```gherkin
Scenario: Successfully removing added coordinate points maintains site integrity
  Given an exemption for a pentagon site using WGS84 coordinates
  And the site details task is reached
  When the pentagon site coordinates are entered using add another point
  And the Remove button for Point 5 is clicked
  And the Remove button for Point 4 is clicked
  Then the coordinates entry page shows 3 points
  And the site remains valid as a triangular site
```

#### 5. Edge Case Validation Testing

**Files**: Both validation feature files
**Add scenarios for edge cases**:

```gherkin
Scenario: Validation state when adding multiple points rapidly
  Given the coordinate entry page is displayed
  When multiple Add another point buttons are clicked rapidly
  Then each new point displays without validation errors
  And previous points retain their validation state

Scenario: Validation behaviour when removing middle points
  Given the coordinate entry page displays 6 points with validation errors
  When the Remove button for Point 4 is clicked
  Then Point 5 becomes Point 4
  And Point 6 becomes Point 5
  And validation errors are correctly reassigned to new point numbers
```

#### 6. Data Persistence Testing

**File**: `site.details.manual.polygon.feature`
**Add scenarios ensuring data integrity**:

```gherkin
Scenario: Added coordinate data persists through navigation
  Given a quadrilateral site with coordinates entered
  When the Back button is clicked
  And the page is navigated forward again
  Then all 4 coordinate points remain populated
  And the Add another point functionality remains available
```

### Priority 3: Comprehensive Coverage

#### 7. Stress Testing Enhancements

**File**: `site.details.manual.polygon.feature`
**Enhance existing stress tests**:

```gherkin
Scenario: Adding and removing points in complex patterns
  Given the coordinate entry page is displayed
  When 10 additional points are added
  And points 3, 7, and 9 are removed
  And 2 more points are added
  Then the site displays 12 total points numbered sequentially
  And all coordinate data remains valid
```
