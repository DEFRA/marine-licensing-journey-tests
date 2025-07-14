# Manual Polygon Site Details Charter: Multi-Point Coordinate Entry

## Investigation Plan

**EXPLORE:** Manual polygon coordinate entry workflow with add/remove functionality  
**AS:** Marine licensing applicants defining complex site boundaries (see References)  
**BECAUSE:** Polygon coordinate entry is technically challenging and the "add another" pattern introduces interaction complexity  
**LOOKING FOR:** Coordinate entry accuracy, add/remove interaction issues, validation clarity, boundary definition confidence, multi-point workflow usability

**Duration:** 70 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-19: Enter coordinate for polygon site](../user-stories/ML-19.enter.coordinate.for.polygon.site.md)
  - [ML-38: Add another set of coordinates to a polygon site](../user-stories/ML-38.add.another.set.of.coordinates.to.a.polygon.site.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Research Insights on Polygon Coordinate Entry:**

**Sarah (Discovery-First)**: _"The coordinates threw me off a bit"_ and _"Struggled a bit with finding the location on the map... Drew a triangle. Guessed with it"_ - Polygon concepts and multi-point entry create additional anxiety beyond single coordinate entry

**Dr. James (Research)**: _"I've worked with ArcGIS which would give you points"_ - Professional users expect precision tools and familiar boundary definition patterns

**Marcus (Infrastructure)**: _"I am not a GIS person... I would lean on ABP Mayor to provide files to upload"_ - May avoid manual polygon entry in favor of file upload

**Focus**: How users define site boundaries using manual coordinate entry for complex shapes, including the technical challenge of multi-point coordinate entry and the add/remove interaction pattern.

## Realistic Activities

- Test initial three-point polygon entry for both WGS84 and OSGB36 coordinate systems
- Test coordinate validation patterns: range checking, decimal precision, format requirements across multiple coordinate pairs
- Investigate "Add another point" interaction: button discovery, point addition, sequential numbering
- Test "Remove" button functionality: point removal, re-numbering, data persistence
- Evaluate coordinate system comprehension for multi-point boundary definition
- Test polygon validation scenarios: missing coordinates, invalid ranges, precision errors across multiple points
- Simulate realistic polygon scenarios: rectangular sites (4 points), complex boundaries (5+ points)
- Test sequential point addition and removal patterns: add 3 points, remove middle point, verify re-numbering
- Investigate JavaScript vs non-JavaScript behavior for add/remove functionality
- Test boundary definition confidence: do users understand they're creating a closed polygon?
- Evaluate professional precision expectations for site boundary accuracy
- Test coordinate entry efficiency for users with prepared coordinate lists
- Simulate interruption scenarios: browser refresh, navigation during multi-point entry
- Test error recovery patterns when validation fails on multiple coordinate pairs

## Evidence Framework

### ✅ Positive signals

- **Boundary confidence**: Users understand they're defining a closed polygon boundary
- **Coordinate accuracy**: Users can enter valid coordinates for multiple points successfully
- **Add/remove fluency**: "Add another point" and "Remove" interactions work intuitively
- **Validation support**: Error messages help users correct coordinate problems across multiple points
- **Sequential understanding**: Users comprehend point numbering and boundary sequence
- **Professional integration**: Workflow accommodates users with prepared coordinate data

### ⚠️ Warning signs

- **Boundary confusion**: Users unclear about polygon closure or boundary definition
- **Coordinate chaos**: Multiple validation errors across coordinate pairs create confusion
- **Add/remove friction**: JavaScript interactions don't work as expected or confuse users
- **Validation overwhelm**: Error messages for multiple coordinate pairs become unmanageable
- **Sequence uncertainty**: Point numbering or removal re-numbering confuses users
- **Professional frustration**: Manual entry doesn't match GIS workflow expectations

### 🤔 Questions to investigate

- How do users understand the relationship between coordinate points and site boundary?
- What happens when validation fails on multiple coordinate pairs simultaneously?
- Do users understand that "start and end point" creates polygon closure?
- How intuitive is the "Add another point" interaction for non-technical users?
- What strategies do users employ when they need more than 3 points but less than 6?
- How do users verify coordinate accuracy for complex polygon boundaries?

### 💡 Ideas to explore

- Could polygon boundary visualization help users understand coordinate relationships?
- Are there opportunities to validate coordinate sequences for logical boundary definition?
- How might add/remove interactions be made clearer for JavaScript-disabled users?
- What guidance could help users determine how many coordinate points they need?
- Could coordinate entry support copy/paste from professional GIS tools?

## Session Notes Template

```
SESSION: Manual Polygon Site Details Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

POLYGON COORDINATE ENTRY:
+ Effective coordinate entry patterns:
- Friction and confusion points:
? Unclear boundary definition behaviours:
! Improvement opportunities:

DELIVERED FEATURE FINDINGS:
Initial Three Points: [WGS84/OSGB36 entry, validation response, boundary understanding]
Add Another Point: [Button discovery, interaction clarity, JavaScript behavior]
Remove Point: [Button functionality, re-numbering, data preservation]
Coordinate Validation: [Multi-point error handling, validation clarity, recovery patterns]
Sequential Numbering: [Point order understanding, removal re-numbering comprehension]
Boundary Closure: [Start/end point understanding, polygon completion concept]

ADD/REMOVE INTERACTION TESTING:
JavaScript Enabled: [Add/remove fluency, visual feedback, state management]
JavaScript Disabled: [Page reload behavior, functionality preservation]
Sequential Operations: [Add multiple points, remove middle point, verify numbering]
Error State Interactions: [Add/remove during validation errors, state preservation]

COORDINATE SYSTEM TESTING:
WGS84 Entry: [Latitude/longitude precision, range validation, format understanding]
OSGB36 Entry: [Eastings/northings format, digit requirements, positive value validation]
Cross-System Consistency: [Validation pattern consistency, error message alignment]

PERSONA INSIGHTS:
Sarah (Discovery-First): [Polygon concept anxiety, multi-point completion confidence]
Marcus (Infrastructure): [Professional boundary expectations, GIS workflow alignment]
Elena (Multi-Project): [Client coordinate data integration, efficiency patterns]
Dr. James (Research): [Academic precision requirements, boundary accuracy validation]

POLYGON COMPLEXITY SCENARIOS:
Triangular Sites: [3-point completion, boundary closure understanding]
Rectangular Sites: [4-point logical sequence, corner coordinate patterns]
Complex Boundaries: [5+ points, coordinate sequence comprehension, validation management]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Manual polygon coordinate entry including initial three-point boundary definition, "Add another point" functionality with sequential numbering, "Remove" button with re-numbering, and comprehensive validation for both WGS84 and OSGB36 coordinate systems

**Related charters:**

- [Site Details](./site-details.md) - Complete site details workflow including file upload alternatives
- [Form Interactions](./form-interactions.md) - Coordinate validation and error handling patterns
- [Expert Workflows](./expert-workflows.md) - Professional coordinate data integration and GIS workflow expectations
