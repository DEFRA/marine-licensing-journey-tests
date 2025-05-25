# Novice Journey Charter: First-Time Marine Licensing Experience

## Investigation Plan

**EXPLORE:** Complete application flow from novice perspective  
**AS:** First-time marine licensing applicants unfamiliar with regulatory processes  
**BECAUSE:** Novice users are most likely to abandon applications or make errors  
**LOOKING FOR:** Confusion points, guidance gaps, accessibility barriers, terminology issues

**Duration:** 90 minutes  
**Priority:** High

## Scenario Context

### **THEME**

Investigate the complete marine licensing exemption notification journey for users completely new to marine licensing, government digital services, and regulatory processes.

### **SETUP**

- **Primary Persona:** Zofia (Environmental Consultant, Marine Licensing Novice)
- **User Context:** First marine licensing application, unfamiliar with regulatory terminology
- **Technology Context:** Mixed device usage, potential assistive technology needs
- **Environmental Context:** Time pressure, terminology confusion, help-seeking behaviour
- **Delivered Features:** Project name entry, task list navigation, public register consent

### **REALISTIC PRESSURES**

- **Domain knowledge gaps** - Unfamiliar with marine licensing terminology and processes
- **Technology barriers** - May use assistive technology or have varying digital literacy
- **Time pressure** - Deadline for environmental impact assessment submission
- **Cognitive load** - Learning new system while understanding regulatory requirements
- **Uncertainty anxiety** - Fear of making mistakes with regulatory implications

## Realistic Activities

### **Complete Application Flow**

#### **Starting the Journey (Project Name)**

- Navigate to application start without reading all guidance first (realistic behaviour)
- Attempt to understand "project name" in marine licensing context
- Enter project description instead of concise name (common mistake)
- Test validation messages and error recovery
- Use help features when confused about requirements

#### **Understanding Progress (Task List)**

- Interpret task list structure and what it means for the process
- Understand "Completed" vs incomplete task status
- Navigate back to completed tasks to review/change information
- Assess confidence about overall progress and next steps
- Test resuming work after interruptions or breaks

#### **Making Consent Decisions (Public Register)**

- Understand what "public register" means in marine licensing context
- Comprehend implications of consent vs withholding information
- Navigate conditional form behaviour (text area appearing/disappearing)
- Provide appropriate reasoning when withholding information
- Handle uncertainty about privacy implications

### **Accessibility and Inclusion Testing**

#### **Screen Reader Navigation**

- Complete entire flow using screen reader (NVDA/JAWS)
- Test form labels, error announcements, and navigation landmarks
- Verify conditional content is properly announced
- Check task status communication for screen reader users

#### **Keyboard Navigation**

- Navigate entire application using only keyboard
- Test tab order, focus indicators, and skip links
- Verify all interactive elements are reachable
- Test form submission and error handling with keyboard only

#### **Cognitive Load Management**

- Test with browser zoom at 200% and 400%
- Handle interruptions mid-task (phone calls, emails)
- Test memory aids and progress preservation
- Assess guidance effectiveness under pressure

### **Real-World Complications**

#### **Information Gathering Challenges**

- Switch between application and external guidance documents
- Handle incomplete information and need to return later
- Test saving progress and resuming work
- Navigate while consulting with colleagues or clients

#### **Error Recovery Patterns**

- Make common novice mistakes and test recovery paths
- Test browser back button usage and data preservation
- Handle form validation errors with realistic user responses
- Test help-seeking behaviour and guidance effectiveness

## Evidence Framework

### **✅ Positive Signals:**

- **Guidance clarity** - Terminology explained in plain English, help available when needed
- **Error prevention** - Clear guidance prevents common mistakes
- **Progress transparency** - Users understand where they are and what's next
- **Accessibility support** - Screen readers, keyboard navigation work effectively
- **Confidence building** - Interface helps users feel capable of completing process

### **⚠️ Warning Signs:**

- **Terminology confusion** - Marine licensing terms unclear or unexplained
- **Navigation disorientation** - Users lost in process or unsure how to proceed
- **Error frustration** - Validation messages unhelpful or confusing
- **Accessibility barriers** - Screen readers, keyboard navigation fail
- **Abandonment risk** - Users likely to give up due to complexity or confusion

### **🤔 Questions to Investigate:**

- How does the application compare to other government services novices might know?
- What happens when users need to gather additional information mid-application?
- How well does the interface support users who are uncertain about decisions?
- Are there cultural or language barriers that affect comprehension?

### **💡 Ideas to Explore:**

- Could terminology be explained more clearly or contextually?
- Are there opportunities for progressive disclosure of complex information?
- How might the interface better support uncertain or anxious users?
- What patterns from familiar services could improve the experience?

## Session Notes Template

```
SESSION: Novice Journey Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

JOURNEY OBSERVATIONS:
+ Effective guidance and support:
- Confusion and barrier points:
? Unclear or uncertain behaviours:
! Improvement opportunities:

FEATURE-SPECIFIC FINDINGS:
Project Name: [Terminology, validation, guidance effectiveness]
Task List: [Progress understanding, navigation clarity]
Public Register: [Decision comprehension, consent implications]

ACCESSIBILITY FINDINGS:
Screen Reader: [Announcements, navigation, form interaction]
Keyboard Navigation: [Tab order, focus management, interaction]
Cognitive Load: [Information processing, memory support]

PERSONA INSIGHTS:
Zofia (Novice): [Confidence, comprehension, completion likelihood]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered Features Tested:** Project name entry, task list navigation, public register consent  
**Related Features:** [project.name.feature](../test/features/project.name.feature), [view.task.list.feature](../test/features/view.task.list.feature), [public.register.consent.feature](../test/features/public.register.consent.feature)
