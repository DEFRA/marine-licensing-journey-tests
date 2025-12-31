# Investigative testing examples

> **🎯 Practical scenarios**  
> Ready-to-use investigative testing scripts for common marine licensing user journeys.

## 📚 Comprehensive investigation scenarios

Each scenario provides a structured approach for investigative sessions, focusing on specific user perspectives and goals.

## 🆕 New user experience

### **Session objective**

Identify usability barriers and guidance gaps for first-time applicants with no prior marine licensing knowledge.

### **Persona connection**

This investigation connects directly with [Sarah's persona](../personas/sarah-discovery-first-user.md) - someone completely new to marine licensing regulations.

### **Investigation script**

1. **Initial approach** (15 minutes)

   - Start from the service homepage without reading guidance materials
   - Attempt to determine if your project requires a licence or exemption
   - Note any confusing terminology or unclear decision points
   - _Look for:_ Initial clarity, guidance visibility, terminology explanations

2. **Project setup** (15 minutes)

   - Create a new exemption for a simple project (e.g., pontoon repair)
   - Provide a project name without overthinking it
   - Navigate through initial task list pages
   - _Look for:_ Confirmation messages, progress indicators, contextual help

3. **Location specification** (20 minutes)

   - Attempt to provide site coordinates without prior knowledge
   - Try different coordinate entry methods
   - Use any help features when genuinely confused
   - _Look for:_ Explanation quality, error message helpfulness, recovery options

4. **Review and submission** (10 minutes)
   - Review entered information before submission
   - Check for validation and summary pages
   - Attempt to identify what happens after submission
   - _Look for:_ Clarity of next steps, confirmation mechanisms, guidance gaps

**Investigation questions:**

- Where did you feel most confused or uncertain?
- What terminology was unclear without prior knowledge?
- Did error messages help you recover and continue?
- Was it clear what would happen after submission?
- What guidance would have helped most for a first-time user?

## ⚡ Expert efficiency

### **Session objective**

Identify workflow friction and efficiency barriers for experienced applicants managing multiple marine projects.

### **Persona connection**

This investigation connects directly with [Marcus's persona](../personas/marcus-infrastructure-professional.md) - an experienced professional who needs optimal efficiency.

### **Investigation script**

1. **Rapid navigation** (10 minutes)

   - Use keyboard shortcuts exclusively (Tab, Enter, Space)
   - Complete the project name page and navigate to task list
   - Attempt to access different sections directly
   - _Look for:_ Keyboard accessibility, navigation efficiency, shortcut support

2. **Data entry optimization** (15 minutes)

   - Complete forms with minimal clicks/keystrokes
   - Test copy-paste functionality for complex data
   - Attempt to reuse previously entered information
   - _Look for:_ Field constraints, validation timing, data persistence

3. **Multi-tasking simulation** (20 minutes)

   - Open multiple browser tabs for different sections
   - Switch between sections in random order
   - Save partial information and return later
   - _Look for:_ State preservation, session handling, progress tracking

4. **Batch operations** (15 minutes)
   - Attempt to upload multiple files simultaneously
   - Look for any bulk editing capabilities
   - Test save/continue patterns for efficiency
   - _Look for:_ Bulk operation support, streamlined workflows, progress tracking

**Investigation questions:**

- What unnecessary steps could be eliminated?
- Where could data be intelligently reused or remembered?
- What keyboard shortcuts would improve efficiency?
- How well does the service support interrupted workflows?
- What features would save the most time for frequent users?

## 📱 Real-world conditions

### **Session objective**

Evaluate service resilience under realistic usage conditions with interruptions, device switching, and connection issues.

### **Persona connection**

This investigation spans multiple personas, especially [Rachel](../personas/rachel-enforcement-coordinator.md) who may need to access the service in field conditions.

### **Investigation script**

1. **Interrupted workflows** (15 minutes)

   - Begin a notification process
   - Deliberately interrupt with simulated phone calls/emails
   - Return to the service after 5+ minute interruptions
   - _Look for:_ Session timeout behavior, state preservation, recovery options

2. **Device switching** (20 minutes)

   - Start a process on desktop
   - Continue on mobile device mid-task
   - Return to desktop for completion
   - _Look for:_ Responsive design issues, context preservation, usability differences

3. **Connection resilience** (15 minutes)

   - Throttle connection using browser dev tools
   - Simulate connection drops during form submission
   - Test offline capability if available
   - _Look for:_ Error handling, data preservation, recovery mechanisms

4. **Environmental factors** (10 minutes)
   - Test outdoors with screen glare (or simulate)
   - Adjust brightness to minimum/maximum
   - Test using mobile data rather than WiFi
   - _Look for:_ Readability issues, performance concerns, field usability barriers

**Investigation questions:**

- How well does the service handle unexpected interruptions?
- Is data preserved when switching devices or connections?
- What happens when users encounter technical difficulties?
- How well would the service perform in field conditions?
- What resilience features would improve real-world usability?

## 📝 Internal staff perspective

### **Session objective**

Explore the service from MMO staff viewpoint to identify administrative and case management challenges.

### **Persona connection**

This investigation connects with [David's persona](../personas/david-compliance-specialist.md) as a case officer supporting applicants.

### **Investigation script**

1. **Application visibility** (15 minutes)

   - Review how submitted applications appear to staff
   - Look for search and filtering capabilities
   - Test case reference and identification features
   - _Look for:_ Data organization, search effectiveness, information accessibility

2. **Support scenarios** (15 minutes)

   - Simulate responding to applicant queries
   - Locate specific application details quickly
   - Identify history and status information
   - _Look for:_ Context availability, history tracking, status clarity

3. **Administrative workflows** (20 minutes)

   - Test any case assignment features
   - Explore notification mechanisms
   - Evaluate reporting capabilities
   - _Look for:_ Workflow efficiency, administrative overhead, process gaps

4. **Cross-system integration** (10 minutes)
   - Identify connections to other MMO systems
   - Test any data sharing capabilities
   - Evaluate consistency across interfaces
   - _Look for:_ Integration points, data consistency, system boundaries

**Investigation questions:**

- How easily can staff find information to support applicants?
- What case management features would improve efficiency?
- Are administrative workflows optimized for staff needs?
- How well does the service integrate with other MMO systems?
- What additional features would best support MMO staff?

## 📋 Documentation template

Use this template to document your investigative testing sessions:

```
# Investigation Session Report

## Session details
- **Investigator:** [Your name]
- **Date:** [Session date]
- **Duration:** [Time spent]
- **Focus area:** [What you investigated]
- **Scenario used:** [Which investigation script you followed]

## Key findings

### What worked well
- [Positive observation 1]
- [Positive observation 2]
- [Positive observation 3]

### Problems discovered
- [Issue 1] - [Severity: High/Medium/Low]
- [Issue 2] - [Severity: High/Medium/Low]
- [Issue 3] - [Severity: High/Medium/Low]

### Questions raised
- [Question 1]
- [Question 2]
- [Question 3]

### Improvement ideas
- [Idea 1]
- [Idea 2]
- [Idea 3]

## Evidence
- [Screenshots, timing data, error messages]
- [Links to recorded sessions if available]

## Next actions
- [Action 1] - [Owner] - [Due date]
- [Action 2] - [Owner] - [Due date]
- [Action 3] - [Owner] - [Due date]
```

---

_These investigation scripts provide a structured approach to exploratory testing while maintaining flexibility to follow interesting discoveries. They can be adapted based on the specific area of focus or risk concerns._
