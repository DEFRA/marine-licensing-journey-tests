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
  - [Zofia - Novice applicant](../personas/zofia-novice-applicant.md)
  - [Amy - Veteran applicant](../personas/amy-veteran-applicant.md)

## Scenario Context

- Focus: How users with varying geospatial knowledge interact with site details selection screens (location method, shape type, coordinate system).
- For detailed requirements and persona context, see References above.

## Realistic Activities

- Test switching between file upload and manual entry.
- Evaluate understanding and guidance for circle vs. polygon.
- Assess coordinate system selection and help features.
- Test navigation, back/cancel, and error recovery patterns.
- Try with different levels of user confidence and technical knowledge.

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
Zofia (Novice): [Selection understanding, terminology comprehension]
Amy (Veteran): [Efficiency, professional expectations]

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
