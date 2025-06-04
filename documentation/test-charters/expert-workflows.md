# Expert Workflows Charter: Professional User Patterns

## Investigation Plan

**EXPLORE:** How professional users navigate the delivered task list and coordinate entry workflows  
**AS:** Organisational applicants, consultants, and experienced users (see References)  
**BECAUSE:** Professional users may have different patterns and expectations for government service interactions  
**LOOKING FOR:** Efficiency barriers, professional workflow mismatches, terminology confusion, decision friction

**Duration:** 90 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-1: Project name & exemption creation](../user-stories/ML-1.provide.project.name.and.create.exemption.md)
  - [ML-9: Task list navigation](../user-stories/ML-9.view.the.task.list.md)
  - [ML-11: Activity description](../user-stories/ML-11.provide.activity.description.md)
  - [ML-12: Public register content](../user-stories/ML-12.provide.or.withhold.public.register.content.md)
  - [ML-16: Site location input method](../user-stories/ML-16.choose.file.upload.or.manual.coordinate.entry.md)
  - [ML-17: Circle or coordinate list entry](../user-stories/ML-17.choose.circle.or.coordinate.list.entry.md)
  - [ML-18: Coordinate system selection](../user-stories/ML-18.choose.coordinate.system.md)
- **Personas:**
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Focus**: How professional users complete the delivered exemption notification workflow efficiently, working within their organisational contexts and professional constraints.

**Beta Research Note**: Research shows professional users struggle with location details and coordinate concepts - even though file upload isn't implemented, test the decision-making and confidence in the current coordinate system selection.

## Realistic Activities

- Test rapid completion of the delivered task list workflow (project name → activity description → public register → site details selection)
- Simulate professional context: client deadlines, interruptions, working with prepared information
- Test coordinate system decision-making with realistic professional scenarios (survey data, GIS outputs, existing planning documentation)
- Investigate terminology comprehension and confidence across coordinate entry choices
- Test professional expectations around data validation and error messaging
- Simulate scenarios where professionals need to gather additional information mid-application

## Evidence Framework

### ✅ Positive signals

- **Professional efficiency**: Clear task progression, appropriate terminology, efficient form completion
- **Decision confidence**: Good guidance for coordinate system selection, clear consequences of choices
- **Professional integration**: Terminology aligns with industry standards, validation supports professional data quality

### ⚠️ Warning signs

- **Workflow friction**: Forced linear progression that conflicts with professional working patterns, unclear progress saving
- **Terminology barriers**: Coordinate system descriptions that don't match professional usage, unclear technical requirements
- **Decision uncertainty**: Unclear consequences of coordinate system choices, lack of guidance for professional use cases

### 🤔 Questions to investigate

- How do professional users approach coordinate system selection when they have existing GIS data?
- What happens when professionals need to consult colleagues or documentation during the application?
- How well does the current workflow support professional patterns of gathering and validating information?
- Are there mismatches between professional terminology and system language?

### 💡 Ideas to explore

- Could coordinate system guidance better reflect professional mapping workflows?
- Are there opportunities for clearer technical validation messages that align with professional quality standards?
- How might the interface better communicate the current state and next steps to professional users?
- What patterns from professional planning workflows could inform the current design?

## Session Notes Template

```
SESSION: Expert Workflows Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

WORKFLOW OBSERVATIONS:
+ Effective professional patterns:
- Friction and barrier points:
? Unexpected behaviors or hesitations:
! Enhancement opportunities:

DELIVERED FEATURE FINDINGS:
Project Name: [Professional naming patterns, validation expectations]
Activity Description: [Professional detail levels, character limits, context needs]
Public Register: [Professional consent decision patterns, risk understanding]
Site Details: [Coordinate system decision confidence, terminology clarity]

PROFESSIONAL CONTEXT IMPACT:
Client Pressure: [How time pressure affects completion quality]
Information Gathering: [Patterns when additional data is needed]
Quality Expectations: [Professional validation and accuracy standards]
Workflow Integration: [How this fits with existing professional processes]

PERSONA INSIGHTS:
Elena (Multi-Project): [Efficiency across delivered features, client context needs]
Marcus (Infrastructure): [Port authority requirements, system integration expectations]
Dr. James (Research): [Academic precision needs within delivered functionality]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Project name entry, task list navigation, activity description, public register consent, site details selection screens (location method, shape type, coordinate system)
