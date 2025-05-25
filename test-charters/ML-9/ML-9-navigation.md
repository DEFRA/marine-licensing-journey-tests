# ML-9 Navigation Charter: Task List Navigation & Status

## Investigation Plan

**EXPLORE:** Task list display, navigation, and status management  
**AS:** Marine licensing applicants (novice and veteran) and case officers  
**BECAUSE:** Task list is critical for user orientation and process completion  
**LOOKING FOR:** Navigation barriers, status confusion, workflow disruption

**Duration:** 75 minutes  
**Priority:** High

## Scenario Context

### **THEME**

Investigate how effectively the task list guides users through marine licensing workflows under realistic conditions

### **SETUP**

- **Primary Personas:** Amy (Veteran), Zofia (Novice), Fatima (Case Officer)
- **User Context:** Mid-application workflow, returning to continue work, reviewing progress
- **Technology Context:** Mixed device usage, browser navigation patterns
- **Environmental Context:** Interruptions, multitasking, time pressure

### **REALISTIC PRESSURES**

- **Workflow interruptions** - Phone calls, emails, urgent tasks requiring attention
- **Device switching** - Moving between mobile and desktop during application
- **Time constraints** - Deadline pressure for application submission
- **Cognitive load** - Managing multiple applications or complex requirements
- **Navigation expectations** - Patterns learned from other government services

## Realistic Activities

### **Navigation Flow Testing**

#### **Forward Navigation (Task List → Project Name)**

- Start from task list page with realistic user context
- Click "Project name" task link while multitasking
- Verify page loads with saved project name under time pressure
- Make changes to project name with interruptions
- Save and return to task list using different navigation methods
- Test with browser back button and direct navigation

#### **Status Understanding Patterns**

- Scan task list quickly to understand current progress
- Identify what's completed vs what needs attention
- Test understanding of "Completed" and incomplete task states
- Verify visual cues work for users with different accessibility needs
- Check status clarity when returning after breaks

#### **Real-World Navigation Scenarios**

- Navigate while referencing external documents or emails
- Switch between task list and other browser tabs
- Handle phone interruptions mid-navigation
- Test navigation with poor internet connectivity
- Use keyboard navigation exclusively for efficiency

### **Persona-Specific Investigation**

#### **Amy (Veteran Applicant) - Efficiency Focus**

- Quick scanning for completed vs remaining tasks
- Efficient navigation between task list and individual tasks
- Expectation matching with other professional systems
- Speed of status recognition and next action identification

#### **Zofia (Novice Applicant) - Guidance Focus**

- Understanding what the task list represents in the process
- Clarity of next steps and overall progress
- Confidence building through clear status communication
- Help-seeking behaviour when uncertain about navigation

#### **Fatima (Case Officer) - Review Focus**

- Quick assessment of applicant progress
- Understanding application status for case management
- Information layout effectiveness for professional review
- Integration with case management workflows

## Evidence Framework

### **Positive Signals:**

- **Navigation clarity** - Users understand how to move between tasks
- **Status transparency** - Completion states are obvious and accurate
- **Process orientation** - Users know where they are and what's next
- **Efficiency support** - Experienced users can navigate quickly
- **Guidance effectiveness** - Novice users feel confident about progress

### **Warning Signs:**

- **Navigation confusion** - Users uncertain about how to proceed
- **Status ambiguity** - Unclear what's completed vs what needs attention
- **Process disorientation** - Users lost in the overall workflow
- **Efficiency barriers** - Unnecessary steps or unclear paths
- **Guidance gaps** - Insufficient support for decision-making

### **Questions to Investigate:**

? How does task list navigation compare to user expectations?
? What happens when users navigate unexpectedly (back button, direct links)?
? How well does the interface support resuming work after interruptions?
? Are there any accessibility barriers in navigation or status communication?

### **Ideas to Explore:**

! Could status communication be clearer or more motivating?
! Are there opportunities to improve navigation efficiency?
! How might the task list better support different user mental models?
! What navigation patterns from other services could be beneficial?

## Session Notes Template

```
SESSION: ML-9 Navigation Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

NAVIGATION OBSERVATIONS:
+ Effective patterns:
- Navigation barriers:
? Unclear behaviours:
! Improvement opportunities:

PERSONA INSIGHTS:
Amy (Veteran): [Efficiency and expectation observations]
Zofia (Novice): [Guidance and confidence observations]
Fatima (Case Officer): [Review and assessment observations]

TECHNICAL FINDINGS:
Browser behaviour: [Cross-browser navigation consistency]
Device differences: [Mobile vs desktop navigation]
Performance: [Page load and response times]
Accessibility: [Keyboard navigation, screen reader compatibility]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]

---

**Related User Story:** [ML-9.view.the.task.list.mdc](../../.cursor/user-stories/ML-9.view.the.task.list.mdc)
**Previous Charter:** [ML-1 Accessibility Testing](../ML-1/ML-1-accessibility.md)
**Next Charter:** [ML-9 Usability Testing](./ML-9-usability.md)
```
