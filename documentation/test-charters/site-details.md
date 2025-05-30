# Site Details Charter: Location Method & Coordinate System Selection

## Investigation Plan

**EXPLORE:** Site location selection options and coordinate system choices  
**AS:** Marine licensing applicants with various levels of geospatial knowledge  
**BECAUSE:** Spatial data selection is critical to application accuracy  
**LOOKING FOR:** Usability issues in selection screens, navigation problems, validation clarity

**Duration:** 85 minutes  
**Priority:** High

## Scenario Context

### **Theme**

Investigate how different users interact with site details selection screens, focusing on coordinate system selection, shape type selection (circle vs. polygon), and understanding the options available.

### **Setup**

- **All Personas:** Zofia (Novice), Amy (Veteran), Fatima (Case Officer)
- **User Context:** Various levels of geospatial knowledge and confidence
- **Technology Context:** Different browsers, devices, with both desktop and mobile interactions
- **Environmental Context:** User decision-making about site location representation
- **Delivered Features:** Location method selection (file/manual), circle/polygon choice, coordinate system selection

### **Realistic pressures**

- **Spatial knowledge variations** - Some users familiar with coordinates, others completely new
- **Technical terminology** - Understanding coordinate systems and geospatial concepts
- **Decision uncertainty** - Choosing the most appropriate input method and coordinate system
- **Navigation expectations** - Moving between selection screens logically
- **Session persistence** - Expecting selections to be preserved during navigation

## Realistic Activities

### **Entry method selection**

#### **Understanding file upload vs. manual entry**

- Interpret the choice between file upload and manual coordinate entry
- Assess guidance quality for users unfamiliar with coordinate data
- Test decision-making with different levels of technical knowledge
- Evaluate confidence in method selection for different personas
- Test navigation between options and possibility to change mind

#### **Circle vs. polygon decision making**

- Evaluate understanding of when to use circle vs. coordinate list
- Test selection guidance for different project types
- Assess conceptual clarity of the two spatial representation methods
- Test switching between methods after initial selection
- Verify error recovery if wrong method is initially chosen

#### **Coordinate system selection**

- Test understanding of different coordinate system options
- Evaluate guidance for users unfamiliar with coordinate references
- Assess system selection based on available reference materials
- Test ability to change system after initial selection
- Verify selection persistence when navigating using Back links

### **Navigation and flow testing**

#### **Multi-screen navigation**

- Test navigation sequence through all selection screens
- Verify Back link functionality preserves previous selections
- Test Cancel button at different stages of the process
- Assess clarity of progress through the selection sequence
- Verify consistent UI patterns across selection screens

#### **Task list integration**

- Verify site details task status on task list
- Test partial completion and navigation back to task list
- Assess clarity of progress indication
- Test resuming partially completed site details selections
- Verify data persistence when navigating away and returning

### **Validation testing**

#### **Selection validation**

- Test validation when no location method is selected
- Verify validation when no shape type is selected
- Test validation when no coordinate system is selected
- Assess error message clarity and positioning
- Test keyboard and screen reader accessibility of validation messages

#### **Error recovery patterns**

- Test clear error messages and recovery guidance
- Verify selection preservation when validation fails
- Test browser back button with partial selections
- Verify cancellation behaviour at different selection stages
- Test error focus management and keyboard navigation

## Evidence Framework

### **✅ Positive signals:**

- **Conceptual clarity** - Users understand spatial options and coordinate systems
- **Selection confidence** - Users make informed choices between options
- **Navigation fluency** - Movement between selection screens is intuitive
- **Validation helpfulness** - Error messages guide users to correct selections
- **Selection persistence** - Choices are preserved during navigation

### **⚠️ Warning signs:**

- **Terminology confusion** - Geospatial terms unclear or unexplained
- **Selection uncertainty** - Users uncertain which options to choose
- **Navigation disorientation** - Users lose context between screens
- **Validation frustration** - Error messages unhelpful or confusing
- **Session issues** - Selections lost during navigation

### **🤔 Questions to investigate:**

- How do users with different levels of geospatial knowledge approach the selection screens?
- What mental models do users have about site boundaries and locations?
- How do users decide between circle and polygon representations?
- What factors influence coordinate system selection?

### **💡 Ideas to explore:**

- Could selection guidance be improved for non-technical users?
- Are there opportunities for smarter defaults based on common scenarios?
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
