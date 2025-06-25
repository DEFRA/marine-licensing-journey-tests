# Form Interactions Charter: Input Validation & Behaviour

## Investigation Plan

**EXPLORE:** Form behaviour, validation patterns, and interaction design across all delivered features  
**AS:** All user types interacting with forms (see References)  
**BECAUSE:** Form interactions are critical touchpoints that determine user success or abandonment  
**LOOKING FOR:** Validation issues, interaction problems, error handling gaps, usability friction across the complete workflow

**Duration:** 80 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-1: Project name & exemption creation](../user-stories/ML-1.provide.project.name.and.create.exemption.md)
  - [ML-9: Task list navigation](../user-stories/ML-9.view.the.task.list.md)
  - [ML-10: Activity dates](../user-stories/ML-10.provide.activity.dates.md)
  - [ML-11: Activity description](../user-stories/ML-11.provide.activity.description.md)
  - [ML-12: Public register content](../user-stories/ML-12.provide.or.withhold.public.register.content.md)
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
  - [ML-35: Centre point coordinates](../user-stories/ML-35.enter.centre.point.of.a.circle.md)
  - [ML-36: Circle width entry](../user-stories/ML-36.enter.width.of.circular.site.md)
  - [ML-37: Site details review](../user-stories/ML-37.review.circular.site.details.md)
  - [ML-82: Check answers before submission](../user-stories/ML-82.check.answers.circular.site.md)
  - [ML-84: Submit notification](../user-stories/ML-84.submit.notification.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Research Insights on Form Interaction:**

**Sarah (Discovery-First)**: _"The coordinates threw me off a bit"_ - Form complexity can create user anxiety
**Dr. James (Research)**: _"250 words or something like that. Is there a character or word limit?"_ - Professional users need clear field constraints
**Elena (Multi-Project)**: _"One of the pain points is repeating info"_ - Form efficiency expectations
**Marcus (Infrastructure)**: _"I'd give it a sense-check to see if it ties in with landmarks"_ - Professional validation patterns

**Focus**: How users interact with forms, validation, and error handling across the complete exemption notification workflow.

## Realistic Activities

- Test input validation and error handling across all major forms in sequence
- Investigate enhanced activity dates validation (specific day/month/year error messages)
- Test coordinate entry validation for both WGS84 and OSGB36 systems with edge cases
- Assess character limits and guidance clarity for activity description
- Test radio button behaviour and conditional logic in public register and site details forms
- Evaluate cross-form navigation, interruptions, and state preservation
- Test error recovery patterns and validation message clarity
- Simulate edge cases: special characters, copy/paste, very long text, boundary values
- Test with different browsers, devices, and assistive technologies
- Investigate form completion patterns under time pressure

## Evidence Framework

### ✅ Positive signals

- **Validation clarity**: Error messages guide users toward successful completion
- **Interaction fluency**: Forms respond predictably to user input patterns
- **Accessibility support**: Forms work effectively with assistive technology
- **State preservation**: User data persists appropriately across navigation
- **Error prevention**: Interface prevents common user mistakes before submission

### ⚠️ Warning signs

- **Validation confusion**: Error messages confuse rather than help recovery
- **Interaction friction**: Unexpected form behaviour or delayed responses
- **Accessibility barriers**: Screen reader or keyboard navigation problems
- **Data loss risk**: Form state not preserved during navigation or interruptions
- **Error cascade**: Single mistakes trigger multiple confusing error messages

### 🤔 Questions to investigate

- How do the enhanced date validation patterns (specific day/month/year errors) affect user recovery?
- What happens when users interact with coordinate entry forms in unexpected ways?
- How consistent are validation patterns across different form types in the workflow?
- Are there differences in form behaviour that create confusion between sections?
- How well do forms work with copy/paste of professional data?

### 💡 Ideas to explore

- Could validation feedback be more helpful or timely across the workflow?
- Are there opportunities to prevent common coordinate entry errors?
- How might character limit guidance be improved for professional documentation needs?
- What form interaction patterns could improve efficiency for repeat users?

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
Activity Dates: [Enhanced day/month/year validation, error stacking, recovery clarity]
Activity Description: [Text area validation, character limits, professional content handling]
Public Register: [Radio buttons, conditional logic, text area behaviour]
Site Details Selection: [Radio button validation, choice preservation]
Coordinate Entry: [WGS84/OSGB36 validation, precision requirements, range checking]
Width Entry: [Numeric validation, units handling, boundary values]
Cross-Form: [Consistency, navigation, state preservation, error persistence]

ACCESSIBILITY FINDINGS:
Screen Reader: [Form labels, error announcements, navigation, field identification]
Keyboard Navigation: [Tab order, focus management, interaction across workflow]
Visual Accessibility: [Contrast, zoom, visual indicators, error highlighting]

TECHNICAL FINDINGS:
Browser Compatibility: [Cross-browser behaviour differences across forms]
Device Differences: [Mobile vs desktop interaction patterns]
Performance: [Form response times, validation speed, state management]
Copy/Paste: [Professional data entry patterns, formatting preservation]

PERSONA-SPECIFIC PATTERNS:
Sarah (Discovery-First): [Error anxiety, recovery confidence, completion likelihood]
Marcus (Infrastructure): [Professional validation expectations, efficiency patterns]
Elena (Multi-Project): [Information reuse needs, workflow efficiency]
Dr. James (Research): [Technical precision requirements, documentation standards]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Complete form validation and interaction patterns across exemption notification workflow: project name entry, task list navigation, activity dates (enhanced validation), activity description, public register consent, and complete site details coordinate entry workflow

**Related charters:** See [Review and Submission](./review-and-submission.md) for investigation of review page accessibility and submission form interactions
