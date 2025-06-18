# Site Details Charter: Complete Coordinate Entry Workflow

## Investigation Plan

**EXPLORE:** Complete site details coordinate entry workflow including system selection and validation  
**AS:** Marine licensing applicants (see References)  
**BECAUSE:** Coordinate entry is universally challenging and critical to application accuracy  
**LOOKING FOR:** Usability issues in coordinate workflows, validation clarity, decision confidence, error recovery patterns  
**NOTE:** Some advanced back/cancel navigation scenarios from coordinate entry pages are marked @wip (ML-35, ML-36)

**Duration:** 100 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
  - [ML-35: Enter centre point of a circle](../user-stories/ML-35.enter.centre.point.of.a.circle.md)
  - [ML-36: Enter width of circular site](../user-stories/ML-36.enter.width.of.circular.site.md)
  - [ML-37: Review circular site details](../user-stories/ML-37.review.circular.site.details.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Research Insights on Coordinate Entry:**

**Sarah (Discovery-First)**: _"The coordinates threw me off a bit"_ and _"Struggled a bit with finding the location on the map... Drew a triangle. Guessed with it"_ - Coordinate concepts create anxiety for non-technical users

**Marcus (Infrastructure)**: _"I am not a GIS person... I would lean on ABP Mayor to provide files to upload, not an expert in the locations"_ - Professional reliance on specialists

**Dr. James (Research)**: _"I've worked with ArcGIS which would give you points"_ - Technical competence but seeks validation

**Elena (Multi-Project)**: Professional coordinator patterns working with client-provided location data

**Critical Research Finding**: _"Even organisational pro users find providing location details the most challenging"_ - Universal difficulty across all user types.

## Realistic Activities

- Test complete coordinate entry workflow: manual selection → circle choice → coordinate system selection → centre point entry → width entry → review
- Investigate coordinate system selection confidence (WGS84 vs OSGB36) across different user technical backgrounds
- Test centre point coordinate entry accuracy for both systems with realistic scenarios
- Evaluate decimal place precision understanding (6 decimal places for WGS84)
- Test coordinate range validation (latitude -90 to 90, longitude -180 to 180, positive values for OSGB36)
- Investigate width entry validation and units comprehension
- Test review screen comprehension and completion confidence
- Evaluate error recovery patterns for coordinate validation failures
- Test navigation flow and state preservation through the complete workflow
- Simulate scenarios where users have existing coordinate data but are uncertain about system choice
- Test help text effectiveness for coordinate system guidance
- Investigate professional workflows with prepared coordinate data

## Evidence Framework

### ✅ Positive signals

- **Decision confidence**: Clear understanding of coordinate system choices and consequences
- **Entry accuracy**: Users can successfully enter valid coordinates for their sites
- **Validation support**: Error messages help users correct coordinate problems
- **Workflow completion**: Users successfully progress through entire coordinate entry sequence
- **Professional integration**: Workflow accommodates existing professional coordinate data

### ⚠️ Warning signs

- **System confusion**: Uncertainty about WGS84 vs OSGB36 choice or consequences
- **Entry errors**: Frequent coordinate validation failures or format confusion
- **Validation frustration**: Error messages don't help users understand or fix problems
- **Workflow abandonment**: Users get stuck or confused in coordinate entry sequence
- **Professional friction**: Interface doesn't accommodate professional data workflows

### 🤔 Questions to investigate

- How do users with different geospatial knowledge approach coordinate system selection?
- What strategies do users employ when coordinate entry validation fails?
- How do users understand decimal place precision requirements for different coordinate systems?
- What happens when users try to enter coordinates outside valid ranges?
- How effectively does the review screen build confidence in coordinate accuracy?

### 💡 Ideas to explore

- Could coordinate system selection guidance be more accessible to non-technical users?
- Are there opportunities to better validate coordinate accuracy during entry?
- How might width entry be made clearer for users unfamiliar with measurement concepts?
- What additional context would help users verify their coordinate entries?

## Session Notes Template

```
SESSION: Site Details Coordinate Entry Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

WORKFLOW OBSERVATIONS:
+ Effective guidance and interaction patterns:
- Friction and confusion points:
? Unclear or uncertain behaviours:
! Improvement opportunities:

DELIVERED FEATURE FINDINGS:
Entry Method Selection: [Manual vs file upload choice, guidance clarity]
Shape Selection: [Circle vs polygon understanding, choice confidence]
Coordinate System: [WGS84/OSGB36 selection confidence, guidance effectiveness]
Centre Point Entry: [Coordinate accuracy, format understanding, validation response]
Width Entry: [Numeric validation, units comprehension, measurement concepts]
Review Screen: [Information verification, completion confidence, accuracy checking]
Navigation: [Flow between screens, state preservation, progress indication]

VALIDATION FINDINGS:
Error Messages: [Clarity, helpfulness, positioning, recovery guidance]
Range Validation: [Latitude/longitude boundaries, OSGB36 positive values]
Precision Requirements: [Decimal place understanding, entry accuracy]
Recovery Patterns: [Error correction, focus management, validation retry]

PERSONA INSIGHTS:
Sarah (Discovery-First): [Coordinate anxiety, guidance needs, completion likelihood]
Marcus (Infrastructure): [Professional data integration, specialist reliance patterns]
Elena (Multi-Project): [Client data workflows, efficiency expectations]
Dr. James (Research): [Technical validation needs, precision requirements]

@WIP SCENARIOS IDENTIFIED:
Back Navigation: [Advanced back from coordinate entry preserving system selection]
Cancel Functionality: [Cancel from coordinate entry with data discard validation]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Complete site details coordinate entry workflow including location method selection, circle/polygon choice, coordinate system selection (WGS84/OSGB36), centre point coordinate entry with validation, circle width entry, and site details review

**@wip scenarios:** Advanced back navigation from coordinate entry pages preserving coordinate system selection, cancel functionality from coordinate entry pages with data discard validation (specific to ML-35, ML-36)
