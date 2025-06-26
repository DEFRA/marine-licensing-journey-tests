# Back and Cancel Navigation Charter: Cross-Workflow Consistency Investigation

## Investigation Plan

**EXPLORE:** Back and cancel navigation behaviour across the complete exemption notification workflow  
**AS:** All user types encountering navigation decisions (see References)  
**BECAUSE:** Inconsistent navigation behaviour creates user confusion and breaks workflow expectations  
**LOOKING FOR:** Navigation inconsistencies, data preservation issues, destination confusion, pattern violations across delivered functionality

**Duration:** 90 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-1: Project name & exemption creation](../user-stories/ML-1.provide.project.name.and.create.exemption.md) - Standard back/cancel behaviour
  - [ML-10: Activity dates](../user-stories/ML-10.provide.activity.dates.md) - AC6: Cancel/Back link behaviour
  - [ML-11: Activity description](../user-stories/ML-11.provide.activity.description.md) - AC4: Cancel/Back link behaviour
  - [ML-12: Public register content](../user-stories/ML-12.provide.or.withhold.public.register.content.md) - AC5: Cancel/Back link behaviour
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md) - AC4 Cancel, AC5 Back
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md) - AC4 Cancel, AC5 Back
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md) - AC4 Cancel, AC5 Back
  - [ML-35: Centre point coordinates](../user-stories/ML-35.enter.centre.point.of.a.circle.md) - AC5 Cancel, AC6 Back
  - [ML-36: Circle width entry](../user-stories/ML-36.enter.width.of.circular.site.md) - AC4 Cancel, AC5 Back
  - [ML-37: Site details review](../user-stories/ML-37.review.circular.site.details.md) - AC4 Cancel, AC5 Back
  - [ML-69: Choose file type to upload](../user-stories/ML-69.choose.file.to.upload.md) - AC4 Cancel, AC5 Back
  - [ML-82: Check answers before submission](../user-stories/ML-82.check.answers.circular.site.md) - AC8: "Go back to your project" link
  - [ML-84: Submit notification](../user-stories/ML-84.submit.notification.md) - "Go back to your project" behaviour
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Critical Navigation Patterns Identified:**

From user story analysis, there are **at least 3 different navigation patterns** across delivered functionality:

1. **Standard Pattern**: "Cancel" returns to task list, "Back" returns to previous page (ML-10, ML-11, ML-12)
2. **Site Details Pattern**: "Cancel" returns to task list with data discard, "Back" preserves selections (ML-16, ML-17, ML-18, ML-35, ML-36, ML-37)
3. **Review Pattern**: "Go back to your project" instead of standard Cancel/Back (ML-82, ML-84)

**Key Research Insight**: Users expect consistent navigation patterns across similar contexts, and violations of established patterns create confusion and potential data loss anxiety.

**Focus**: How navigation consistency (or lack thereof) affects user confidence, workflow efficiency, and task completion across the complete exemption notification journey.

## Realistic Activities

- **Pattern Mapping**: Document actual back/cancel behaviour across all delivered pages systematically
- **Consistency Verification**: Test navigation expectations - do users end up where they expect?
- **Data Preservation Investigation**: Test what happens to user data when using back vs cancel across different contexts
- **Cross-Section Analysis**: Navigate between different workflow sections and test boundary behaviour
- **Error Recovery Scenarios**: Test navigation behaviour after validation errors - does back/cancel work consistently?
- **Multi-Context Testing**: Test navigation with partially completed data, validation errors, and session restoration
- **Language Consistency**: Verify button text, link text, and messaging consistency across all navigation points
- **Sequential Navigation**: Test back→back→back chains across workflow sections to identify routing issues
- **Interruption Recovery**: Test navigation behaviour when returning to partially completed workflows
- **Task Status Integration**: Verify how navigation affects task completion status in different contexts

## Evidence Framework

### ✅ Positive signals

- **Consistent behaviour**: Back/cancel function identically across similar contexts
- **Predictable destinations**: Users land where they expect after navigation actions
- **Data safety**: Clear and consistent data preservation/discard patterns
- **Status integrity**: Task completion status behaves predictably with navigation
- **Language consistency**: Button/link text follows established patterns throughout

### ⚠️ Warning signs

- **Pattern violations**: Different navigation behaviour in similar contexts without clear reason
- **Destination confusion**: Navigation takes users to unexpected locations
- **Data loss anxiety**: Unclear what happens to entered data when navigating
- **Status inconsistencies**: Task completion status doesn't match navigation behaviour
- **Language variations**: Inconsistent button/link text for same functionality

### 🤔 Questions to investigate

- Do "Cancel" buttons consistently return to the task list across all contexts?
- Does "Back" behaviour match user expectations throughout the site details workflow?
- Why does the review section use "Go back to your project" instead of standard navigation?
- How does navigation interact with validation errors and form state preservation?
- Are there contexts where navigation behaviour should differ, and are these differences justified?

### 💡 Ideas to explore

- Could navigation patterns be standardised across similar workflow contexts?
- Are there opportunities to improve data preservation clarity during navigation?
- How might consistent navigation language improve user confidence?
- What navigation behaviour would best support different user types (novice vs expert)?

## Session Notes Template

```
SESSION: Back and Cancel Navigation Investigation - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

NAVIGATION PATTERN MAPPING:
Project Name (ML-1): [Back behaviour] | [Cancel behaviour] | [Data handling]
Activity Dates (ML-10): [Back behaviour] | [Cancel behaviour] | [Data handling]
Activity Description (ML-11): [Back behaviour] | [Cancel behaviour] | [Data handling]
Public Register (ML-12): [Back behaviour] | [Cancel behaviour] | [Data handling]
Site Location Method (ML-16): [Back behaviour] | [Cancel behaviour] | [Data handling]
Coordinate Entry Type (ML-17): [Back behaviour] | [Cancel behaviour] | [Data handling]
Coordinate System (ML-18): [Back behaviour] | [Cancel behaviour] | [Data handling]
Centre Point Entry (ML-35): [Back behaviour] | [Cancel behaviour] | [Data handling]
Width Entry (ML-36): [Back behaviour] | [Cancel behaviour] | [Data handling]
Site Details Review (ML-37): [Back behaviour] | [Cancel behaviour] | [Data handling]
File Type Selection (ML-69): [Back behaviour] | [Cancel behaviour] | [Data handling]
Check Answers (ML-82): [Back behaviour] | [Cancel behaviour] | [Data handling]
Confirmation (ML-84): [Back behaviour] | [Navigation available]

CONSISTENCY FINDINGS:
+ Consistent behaviours across similar contexts:
- Inconsistent behaviours requiring explanation:
? Unclear or confusing navigation patterns:
! Potential improvements for consistency:

DELIVERED FEATURE ANALYSIS:
Button/Link Text: [Variations in language, clarity, placement]
Destination Accuracy: [Where users expect vs where they land]
Data Preservation: [What's saved vs lost, user awareness of this]
Task Status Impact: [How navigation affects completion tracking]
Error Context: [Navigation behaviour after validation failures]

USER IMPACT ASSESSMENT:
Sarah (Discovery-First): [Navigation anxiety, confusion points, completion barriers]
Marcus (Infrastructure): [Professional workflow disruption, efficiency impact]
Elena (Multi-Project): [Context switching challenges, data loss concerns]
Dr. James (Research): [Precision work interruption, data integrity concerns]

CROSS-WORKFLOW BOUNDARY TESTING:
Task List ↔ Individual Tasks: [Consistency across task entry/exit]
Site Details Sub-Flow: [Internal navigation within coordinate entry sequence]
Review Stage: [Different pattern - justified or inconsistent?]
Error Recovery: [Navigation during/after validation failures]

POTENTIAL INCONSISTENCIES IDENTIFIED:
Critical Issues: [Navigation that could cause data loss or major confusion]
Minor Issues: [Inconsistencies that affect user confidence but don't break workflow]
Pattern Violations: [Places where established patterns are broken without clear reason]
Language Issues: [Inconsistent terminology or unclear navigation options]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Complete exemption notification workflow navigation including all back/cancel patterns across project name, task list, activity dates, activity description, public register consent, complete site details coordinate entry workflow, review, and submission

**Related charters:**

- [Novice Journey](./novice-journey.md) - First-time user navigation anxiety and workflow confidence
- [Expert Workflows](./expert-workflows.md) - Professional efficiency expectations and navigation patterns
- [Form Interactions](./form-interactions.md) - Navigation context during validation and error recovery
- [Site Details](./site-details.md) - Complex multi-step navigation flow within coordinate entry sequence
- [Review and Submission](./review-and-submission.md) - Final stage navigation patterns and submission confidence
