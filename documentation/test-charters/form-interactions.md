# Form Interactions Charter: Input Validation & Behaviour

## Investigation Plan

**EXPLORE:** Form behaviour, validation patterns, and interaction design across delivered features  
**AS:** All user types interacting with forms (see References)  
**BECAUSE:** Form interactions are critical touchpoints that can make or break user experience  
**LOOKING FOR:** Validation issues, interaction problems, error handling gaps, usability friction

**Duration:** 80 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-1: Project name & exemption creation](../user-stories/ML-1.provide.project.name.and.create.exemption.md)
  - [ML-9: Task list navigation](../user-stories/ML-9.view.the.task.list.md)
  - [ML-12: Public register content](../user-stories/ML-12.provide.or.withhold.public.register.content.md)
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
- **Personas:**
  - [Zofia - Novice applicant](../personas/zofia-novice-applicant.md)
  - [Amy - Veteran applicant](../personas/amy-veteran-applicant.md)
  - [Fatima - Case officer](../personas/fatima-case-officer.md)

## Scenario Context

- Focus: How users interact with forms, validation, and error handling across the application.
- For detailed requirements and persona context, see References above.

## Realistic Activities

- Test input validation, error handling, and recovery for all major forms.
- Assess conditional logic, state management, and accessibility.
- Simulate cross-form navigation, interruptions, and edge cases.
- Test with different browsers, devices, and assistive technologies.

## Evidence Framework

### ✅ Positive signals

- Validation clarity, interaction fluency, accessibility support, state preservation, conditional logic clarity.

### ⚠️ Warning signs

- Validation confusion, interaction friction, accessibility barriers, data loss risk, conditional logic problems.

### 🤔 Questions to investigate

- How do validation patterns compare across different forms?
- What happens when users interact with forms in unexpected ways?
- How well do forms work with assistive technology and different input methods?
- Are there consistency issues in form behaviour across the application?

### 💡 Ideas to explore

- Could validation feedback be more helpful or timely?
- Are there opportunities to prevent common user errors?
- How might conditional logic be made clearer or more intuitive?
- What form interaction patterns could improve efficiency?

## Session Notes Template

```
SESSION: Form Interactions Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

FORM BEHAVIOUR OBSERVATIONS:
+ Effective interaction patterns:
- Friction and problem points:
? Unclear or inconsistent behaviours:
! Improvement opportunities:

VALIDATION FINDINGS:
Project Name: [Character limits, error messages, recovery patterns]
Public Register: [Radio buttons, conditional logic, text area behaviour]
Site Details: [Selection validation, radio buttons, error messages]
Cross-Form: [Consistency, navigation, state preservation]

ACCESSIBILITY FINDINGS:
Screen Reader: [Form labels, error announcements, navigation]
Keyboard Navigation: [Tab order, focus management, interaction]
Visual Accessibility: [Contrast, zoom, visual indicators]

TECHNICAL FINDINGS:
Browser Compatibility: [Cross-browser behaviour differences]
Device Differences: [Mobile vs desktop interaction patterns]
Performance: [Form response times, validation speed]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Project name entry, task list navigation, public register consent, site details entry (coordinate system, circle/polygon)  
**Related features:** [project.name.feature](../../test/features/project.name.feature), [validation.project.name.feature](../../test/features/validation.project.name.feature), [task.list.feature](../../test/features/task.list.feature), [public.register.feature](../../test/features/public.register.feature), [validation.public.register.feature](../../test/features/validation.public.register.feature), [back.and.cancel.public.register.feature](../../test/features/back.and.cancel.public.register.feature), [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature)
