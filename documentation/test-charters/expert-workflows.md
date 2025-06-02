# Expert Workflows Charter: Veteran User Efficiency

## Investigation Plan

**EXPLORE:** Efficiency patterns and workflow optimisation across delivered features  
**AS:** Experienced marine licensing applicants and maritime consultants (see References)  
**BECAUSE:** Veteran users expect streamlined workflows and professional efficiency  
**LOOKING FOR:** Workflow friction, missing shortcuts, efficiency barriers, professional workflow gaps

**Duration:** 75 minutes  
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
  - [Amy - Veteran applicant](../personas/amy-veteran-applicant.md)

## Scenario Context

- Focus: How experienced users complete applications efficiently, often managing multiple projects simultaneously.
- For detailed requirements and persona context, see References above.

## Realistic Activities

- Test rapid navigation and keyboard shortcuts.
- Attempt to reuse information from previous applications.
- Simulate multi-application management and interruptions.
- Test professional site details selection and consent decisions.
- Evaluate workflow for speed, accuracy, and professional presentation.

## Evidence Framework

### ✅ Positive signals

- Keyboard navigation fluency, recognition over recall, workflow continuity, multi-application support, professional presentation.

### ⚠️ Warning signs

- Efficiency barriers, pattern disruption, navigation inefficiency, multi-tab conflicts, professional friction.

### 🤔 Questions to investigate

- How does application speed compare to other government services professionals use?
- What happens when users need to manage multiple applications simultaneously?
- How well does the interface support professional client interaction patterns?
- Are there opportunities for data reuse between related applications?

### 💡 Ideas to explore

- Could keyboard shortcuts be added for common professional workflows?
- Are there opportunities for smart defaults based on user behaviour patterns?
- How might the interface better support multi-application management?
- What efficiency features would enhance professional confidence?

## Session Notes Template

```
SESSION: Expert Workflows Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

EFFICIENCY OBSERVATIONS:
+ Effective speed and workflow patterns:
- Friction and barrier points:
? Unclear or inconsistent behaviours:
! Professional enhancement opportunities:

FEATURE-SPECIFIC FINDINGS:
Project Name: [Speed, shortcuts, pattern recognition]
Task List: [Navigation efficiency, multi-tab handling]
Public Register: [Decision speed, consistency tools]
Site Details: [Selection efficiency, navigation speed, system selection]

PROFESSIONAL WORKFLOW FINDINGS:
Keyboard Navigation: [Completeness, speed, shortcuts]
Multi-Application: [Session handling, data consistency]
Client Interaction: [Interface confidence, professional presentation]

PERSONA INSIGHTS:
Amy (Veteran): [Efficiency satisfaction, professional confidence, time savings]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Project name entry, task list navigation, public register consent, site details selection screens (location method, shape type, coordinate system)  
**Related features:** [project.name.feature](../../test/features/project.name.feature), [validation.project.name.feature](../../test/features/validation.project.name.feature), [task.list.feature](../../test/features/task.list.feature), [public.register.feature](../../test/features/public.register.feature), [validation.public.register.feature](../../test/features/validation.public.register.feature), [back.and.cancel.public.register.feature](../../test/features/back.and.cancel.public.register.feature), [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature)
