# ML-9 Navigation Charter: Task List Navigation & Status

## Charter Definition

**EXPLORE:** Task list display, navigation, and status management  
**WITH:** Completed and incomplete tasks, navigation patterns, status updates  
**TO DISCOVER:** Whether task list effectively guides users through the marine licensing process

**Duration:** 75 minutes  
**Priority:** High  
**User Personas:** Amy (Veteran), Zofia (Novice), Fatima (Case Officer)

## Background Context

**User Story:** ML-9 - View the Task List  
**Key Flow:** Successful project name save → Task list display → Task navigation

**Acceptance Criteria Focus:**

- AC1: Display task list with project name as heading
- AC2: Project name task shows as "Completed" and is navigable
- AC3: Other tasks are present but non-functional

## Investigation Areas

### **Task List Display**

- Does the project name appear correctly as the H1 heading?
- Is the "Project name" task marked as "Completed"?
- Are other tasks visible but appropriately non-functional?
- How clear is the overall page structure and hierarchy?

### **Task Status Representation**

- How obviously is task completion status communicated?
- What visual cues indicate completed vs incomplete tasks?
- Do status indicators follow GOV.UK Design System patterns?
- How well do status states serve different user types?

### **Navigation Between Tasks**

- Can users navigate back to the "Project name" task?
- Does the project name page pre-populate correctly when returning?
- How smooth is the navigation flow between task list and tasks?
- What happens when users navigate using browser back/forward?

### **Task List as Process Guide**

- Does the task list effectively communicate what needs to be done?
- How well does it support users who are partway through the process?
- Is the overall progress clear and motivating?
- Does the interface support resuming work after breaks?

## Navigation Flow Testing

### **Forward Navigation (Task List → Project Name)**

1. Start from task list page
2. Click "Project name" task link
3. Verify page loads with saved project name
4. Make changes to project name
5. Save and return to task list
6. Verify status remains "Completed"

### **Backward Navigation (Project Name → Task List)**

1. Complete project name successfully
2. Arrive at task list
3. Verify project name appears as heading
4. Verify "Project name" task shows "Completed"
5. Use browser back button
6. Test navigation consistency

### **Incomplete Task Behaviour**

1. Attempt to click other task links
2. Verify they remain on task list (AC3)
3. Check for any user feedback about unavailable tasks
4. Ensure users understand which tasks are available

## Personas & Navigation Scenarios

### **Amy (Veteran Applicant)**

**Navigation Style:** Efficient, task-focused

- Can she quickly identify what's completed vs what's next?
- Does the task list support her efficient working style?
- Can she navigate between tasks without confusion?
- How well does the interface match her expectations from other systems?

### **Zofia (Novice Applicant)**

**Navigation Style:** Careful, guidance-seeking

- Is it clear what she needs to do next?
- Does the task list provide enough guidance for someone new to marine licensing?
- Can she understand the overall process from the task list?
- How does the interface help her feel confident about progress?

### **Fatima (Case Officer)**

**Navigation Style:** Reviewing, assessing

- Can she quickly see application progress and status?
- How well does the task list support her review workflow?
- Is the information layout helpful for case management?
- Can she easily understand the applicant's progress?

## Visual Design & Information Architecture

### **Heading Hierarchy**

- Is the project name prominently displayed as H1?
- Are task headings appropriately structured?
- Does the visual hierarchy support easy scanning?
- How well does the layout work across devices?

### **Status Communication**

- Are "Completed" and "Incomplete" states visually distinct?
- Do status indicators use appropriate colour and iconography?
- Is status information accessible to users with colour vision differences?
- How clear are the status labels for non-technical users?

### **Task Organisation**

- Is the task list organised logically?
- Does the order make sense for the marine licensing process?
- Are related tasks grouped appropriately?
- How well does the structure support progressive disclosure?

## Edge Cases & Error Scenarios

### **Session & State Management**

- What happens if user refreshes the task list page?
- How does the task list behave after browser restart?
- Does task status persist correctly across sessions?
- What happens if project name gets corrupted or lost?

### **Navigation Edge Cases**

- How does deep linking to task list work?
- What happens if user navigates directly to task list without completing project name?
- How does the interface handle unexpected navigation patterns?
- Are there any broken link scenarios?

### **Cross-Browser Navigation**

- Does navigation work consistently across browsers?
- Are there any browser-specific navigation issues?
- How does mobile navigation compare to desktop?
- Do navigation states persist across different browsers?

## Discovery Questions

### **User Experience**

- How motivating is the task list for completing the process?
- Does it feel overwhelming or manageable?
- Can users easily understand where they are in the process?
- How does the task list compare to other government services?

### **Information Architecture**

- Is the task organisation intuitive?
- Does the navigation support different mental models?
- How well does the structure scale if more tasks are added?
- Are there any confusing or misleading elements?

### **Process Flow**

- Does the task list effectively guide users through marine licensing?
- How well does it support non-linear work patterns?
- Can users easily resume work after interruptions?
- Does the interface encourage task completion?

## Success Indicators

### **Effective Navigation**

- Users can easily move between task list and individual tasks
- Task completion status is clear and accurately represented
- Navigation feels natural and predictable
- Project name displays correctly as page heading

### **Good Process Guidance**

- Users understand what they need to do next
- Task list provides appropriate overview of the process
- Status information helps users track progress
- Interface supports both linear and non-linear workflows

## Documentation Focus

Record:

- **Navigation flow observations** - Ease and clarity of movement
- **Status representation effectiveness** - How well completion is communicated
- **Visual hierarchy assessment** - Information architecture success
- **Cross-browser consistency** - Navigation behaviour differences
- **User experience insights** - Motivation and process clarity

## Follow-up Actions

- Document any navigation issues or confusing flows
- Identify opportunities for status communication improvements
- Note any automation gaps for task list scenarios
- Provide feedback on information architecture effectiveness
- Create bug reports for navigation problems

---

**Related User Story:** [ML-9.view.the.task.list.mdc](../../../.cursor/user-stories/ML-9.view.the.task.list.mdc)  
**Previous Charter:** [ML-1 Accessibility Testing](../ML-1/ML-1-accessibility.md)  
**Next Charter:** [ML-9 Usability Testing](./ML-9-usability.md)
