# Site Details Charter: Location Method & Coordinate System Selection

## Investigation Plan

**EXPLORE:** Site location selection options and coordinate system choices  
**AS:** Marine licensing applicants (see References)  
**BECAUSE:** Spatial data selection is critical to application accuracy  
**LOOKING FOR:** Usability issues in selection screens, navigation problems, validation clarity

**Duration:** 85 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Beta Research Insights**:

- _"Even organisational pro users find providing location details the most challenging"_
- _"Some pro users would like to draw on a map and most users we spoke to ask a GIS specialist to prepare their shapefile"_
- _"I can do it if it's lat/long or x/y, otherwise I'd have to look it up. In portal you get various options, it's confusing"_
- _"They wouldn't typically enter the system without this information ready"_

**Critical Finding**: Location details are universally challenging across all user types, with significant reliance on external specialists.

## Realistic Activities

- Test decision-making between file upload and manual coordinate entry based on delivered functionality
- Investigate understanding of circle vs coordinate list options (delivered choice points)
- Test coordinate system selection confidence (WGS84 vs OSGB36) across different user technical backgrounds
- Evaluate help text effectiveness for coordinate system guidance
- Test navigation flow through the delivered site details selection screens
- Simulate scenarios where users have existing coordinate data but are unsure how to proceed

## Evidence Framework

### ✅ Positive signals

- Conceptual clarity, selection confidence, navigation fluency, validation helpfulness, selection persistence.

### ⚠️ Warning signs

- Terminology confusion, selection uncertainty, navigation disorientation, validation frustration, session issues.

### 🤔 Questions to investigate

- How do users with different geospatial knowledge approach the screens?
- What mental models do users have about site boundaries and locations?
- How do users decide between circle and polygon?
- What factors influence coordinate system selection?

### 💡 Ideas to explore

- Could selection guidance be improved for non-technical users?
- Are there opportunities for smarter defaults?
- How might the interface better support coordinate system selection?
- What additional context would help users make informed selections?

## Session Notes Template

```
SESSION: Site Details Selection Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

SELECTION OBSERVATIONS:
+ Effective guidance and selection patterns:
- Friction and confusion points:
? Unclear or uncertain behaviours:
! Improvement opportunities:

FEATURE-SPECIFIC FINDINGS:
Entry Method: [File upload vs manual, guidance clarity]
Shape Selection: [Circle vs polygon understanding]
Coordinate System: [Selection confidence, system comprehension]
Navigation: [Flow between screens, back/cancel functionality]

PERSONA INSIGHTS:
Sarah (Discovery-First): [Guidance needs, confidence building, decision support]
Elena (Multi-Project): [Professional efficiency, terminology expectations]
Dr. James (Research): [Technical precision, scientific coordinate understanding]

VALIDATION FINDINGS:
Error Messages: [Clarity, helpfulness, positioning]
Recovery: [Error correction, focus management]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Location method selection (file/manual), circle/polygon choice, coordinate system selection  
**Related features:** [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature)
