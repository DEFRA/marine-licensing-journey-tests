# Investigation Session Templates

> **📋 Ready-to-Use Templates**  
> **Copy-paste frameworks** for planning, running, and documenting investigation sessions.

## 🚀 Quick Session Planner

### **Basic Investigation Template**

```
Date: [Today's date]
Duration: [60-90 minutes]
Investigator: [Your name]

INVESTIGATION PLAN:
EXPLORE: [What area/workflow you're investigating]
AS: [User type - first-timer, expert, MMO staff, etc.]
BECAUSE: [Why this investigation is important right now]
LOOKING FOR: [Types of problems or insights you hope to find]

ENVIRONMENT SETUP:
□ Realistic test data prepared
□ Target browser(s) ready
□ Screen capture tool available (if needed)
□ Interruption-free time blocked
□ Simple note-taking method ready

SESSION FOCUS:
□ Primary scenario: [Main investigation activity]
□ Edge cases to try: [2-3 variations]
□ Quality signals: [What "good" and "bad" look like]
```

### **Post-Session Summary Template**

```
SESSION: [What you investigated] - [Date]
DURATION: [Actual time spent]
INVESTIGATOR: [Your name]

KEY FINDINGS:
+ Things that worked well:
  - [Finding 1]
  - [Finding 2]

- Problems discovered:
  - [Problem 1 - severity level]
  - [Problem 2 - severity level]

? Questions raised:
  - [Question 1]
  - [Question 2]

! Ideas for improvement:
  - [Idea 1]
  - [Idea 2]

IMMEDIATE ACTIONS:
□ [Action 1 - who will do this?]
□ [Action 2 - who will do this?]
□ [Action 3 - who will do this?]

NEXT INVESTIGATION:
Area to explore next: [Where to focus future sessions]
Reason: [Why this area matters]
```

---

## 📝 Detailed Documentation Templates

### **Comprehensive Session Charter**

```
INVESTIGATION SESSION CHARTER

Session ID: [ML-XX-Investigation-YYYY-MM-DD]
Charter Title: [Descriptive name for this investigation]
Created by: [Your name]
Date planned: [When you'll run this]
Duration estimate: [60-90 minutes]

CONTEXT:
Why this investigation: [Business/technical reason]
Related user stories: [Any specific stories this relates to]
Previous findings: [What we already know about this area]

MISSION:
EXPLORE: [Specific area, feature, or workflow]
AS: [User persona or role]
BECAUSE: [Concern, risk, or opportunity driving this investigation]
TO DISCOVER: [Types of insights or issues you're seeking]

SCENARIO SETUP:
User context: [Persona background and realistic pressures]
Environment: [Devices, browsers, network conditions]
Data conditions: [Test data, realistic information, variations]
Realistic constraints: [Time pressure, interruptions, etc.]

INVESTIGATION ACTIVITIES:
Primary workflow: [Main user journey to follow]
Edge cases: [Variations and alternative paths to try]
Stress factors: [Environmental or user pressures to simulate]
Integration points: [Cross-system or cross-device activities]

EVIDENCE FRAMEWORK:
Quality indicators: [What "working well" looks like]
Problem signals: [What types of issues to watch for]
Success criteria: [How to recognise valuable discoveries]
Evidence to collect: [Screenshots, timings, observations]

VARIATIONS TO TRY:
Environmental: [Different browsers, devices, network conditions]
User pressure: [Time constraints, multitasking, interruptions]
Data: [Different formats, incomplete information, edge cases]
Workflow: [Alternative paths, error recovery, help-seeking]

SESSION NOTES AREA:
[Use this space during investigation for real-time observations]

DISCOVERIES:
+ Positive findings:

- Issues found:

? Questions raised:

! Ideas generated:

POST-SESSION SYNTHESIS:
Key insights: [Most important discoveries]
Risk assessment: [Critical, significant, or improvement level issues]
Follow-up actions: [Specific next steps with ownership]
Automation implications: [How findings should influence automated tests]
Further investigation: [Areas that need additional exploration]
```

### **Simple Evidence Collection Sheet**

```
EVIDENCE COLLECTION - [Session Topic] - [Date]

OBSERVATIONS LOG:
Time | Activity | Observation | Evidence Type
-----|----------|-------------|---------------
     |          |             | [Screenshot/Timing/Note]
     |          |             | [Screenshot/Timing/Note]
     |          |             | [Screenshot/Timing/Note]

USER EXPERIENCE NOTES:
Confusion points: [Where user gets lost or frustrated]
Efficiency barriers: [What slows down experienced users]
Error recovery: [How well system handles mistakes]
Help effectiveness: [Whether guidance appears when needed]

TECHNICAL OBSERVATIONS:
Performance: [Page load times, response delays]
Compatibility: [Browser/device specific issues]
Integration: [Cross-system data flow problems]
Accessibility: [Barriers for assistive technology users]

EVIDENCE FILES:
□ Screenshot: [filename-description]
□ Screen recording: [filename-description]
□ Performance timing: [measurement-description]
□ Error message examples: [filename-description]
```

---

## 🎯 Persona-Specific Templates

### **First-Time User Investigation**

```
NOVICE USER INVESTIGATION TEMPLATE

USER CONTEXT: Someone completely new to marine licensing
REALISTIC PRESSURES: Unfamiliar terminology, process anxiety, time constraints
INVESTIGATION FOCUS: Guidance effectiveness and error recovery

ACTIVITIES CHECKLIST:
□ Start without reading all guidance (realistic behaviour)
□ Misinterpret 2-3 key terms deliberately
□ Enter data in unexpected but reasonable formats
□ Use help features when genuinely confused
□ Make common first-time mistakes
□ Test error recovery and correction workflows

EVIDENCE TO COLLECT:
□ Error messages understandable to non-experts?
□ Help appears when and where needed?
□ Progress preserved during mistakes and corrections?
□ Terminology explained appropriately for beginners?
□ Workflow intuitive without extensive training?

REALISTIC VARIATIONS:
□ Mobile device completion
□ Assistive technology usage
□ Poor internet connection
□ Interruptions during completion
```

### **Expert User Investigation**

```
EXPERIENCED USER INVESTIGATION TEMPLATE

USER CONTEXT: Maritime professional submitting multiple applications
REALISTIC PRESSURES: Time efficiency, data reuse needs, deadline pressure
INVESTIGATION FOCUS: Workflow efficiency and power user features

ACTIVITIES CHECKLIST:
□ Attempt to reuse information from previous applications
□ Use keyboard navigation exclusively for speed
□ Work with multiple browser tabs and reference materials
□ Test auto-complete and saved preferences
□ Search for specific historical information
□ Complete multiple related applications in sequence

EVIDENCE TO COLLECT:
□ Previous application data accessible and reusable?
□ Keyboard navigation works consistently?
□ Auto-complete suggestions accurate and helpful?
□ Search functionality finds relevant data quickly?
□ Workflow supports expert patterns and shortcuts?

REALISTIC VARIATIONS:
□ Multiple simultaneous applications
□ Integration with external business systems
□ Network interruptions during critical updates
□ System performance under heavy usage
```

### **Back-Office Staff Investigation**

```
MMO STAFF INVESTIGATION TEMPLATE

USER CONTEXT: Case officer managing complex workload with competing priorities
REALISTIC PRESSURES: Multiple applications, interruptions, audit requirements
INVESTIGATION FOCUS: Multi-tasking capabilities and data integrity

ACTIVITIES CHECKLIST:
□ Review 3-4 applications simultaneously in different tabs
□ Simulate phone call interruptions requiring immediate attention
□ Cross-reference information between systems
□ Update application status while maintaining audit trails
□ Handle urgent requests that disrupt planned workflow
□ Search for precedent cases for consistency checking

EVIDENCE TO COLLECT:
□ Data integrity maintained during multitasking?
□ Audit trail captures all actions accurately?
□ System performance acceptable with multiple tabs?
□ Status updates propagate correctly across systems?
□ Search functionality works efficiently under pressure?

REALISTIC VARIATIONS:
□ System maintenance during busy periods
□ Multiple users accessing same applications
□ Network issues during critical updates
□ Time-sensitive applications requiring same-day decisions
```

---

## 📊 Session Planning Templates

### **Work Investigation Planner**

**Template for planning investigation activities within Kanban workflow:**

```
WORK INVESTIGATION PLANNING

Current Focus: [Current work items/features in progress]
Investigation capacity: [Available time/people]
Priority areas: [High-risk areas needing investigation]

INVESTIGATION QUEUE:
□ [Work Item 1] - [Investigation type, who, estimated duration]
□ [Work Item 2] - [Investigation type, who, estimated duration]
□ [Work Item 3] - [Investigation type, who, estimated duration]

INTEGRATION WITH WORKFLOW:
□ New feature investigations planned before "Done"
□ High-risk area sessions scheduled
□ Automation gap investigations included
□ Cross-functional team involvement arranged

SUCCESS CRITERIA:
□ Investigation sessions completed for each work item
□ Actionable findings documented
□ Findings integrated into automation or user guidance
□ Risk areas validated before release
```

### **Monthly Investigation Review**

```
MONTHLY INVESTIGATION REVIEW

Month: [Month/Year]
Sessions completed: [Number]
Investigators involved: [Names/roles]

AREAS INVESTIGATED:
□ [Area 1] - [Key findings summary]
□ [Area 2] - [Key findings summary]
□ [Area 3] - [Key findings summary]

IMPACT ASSESSMENT:
Issues prevented: [Problems caught before release]
Automation improvements: [Tests added/modified based on findings]
User guidance updates: [Documentation/help improvements]
Process improvements: [Workflow or policy changes]

NEXT MONTH FOCUS:
Priority areas: [Where to investigate next]
Resource allocation: [Who will lead investigations]
Integration goals: [How to connect findings to team workflow]
```

---

## 🔧 Facilitation Templates

### **Team Investigation Session Facilitation**

```
TEAM SESSION FACILITATION GUIDE

Before the session (10 minutes):
□ Charter reviewed and agreed
□ Roles assigned (navigator, observer, note-taker)
□ Environment prepared and tested
□ Evidence collection method ready

During the session (60-90 minutes):
□ Stay focused on charter mission
□ Encourage realistic user behaviour
□ Capture evidence as you go
□ Note unexpected discoveries
□ Allow natural workflow variations

After the session (15 minutes):
□ Synthesise findings immediately while fresh
□ Assign follow-up actions with ownership
□ Plan next investigation area
□ Share insights with broader team

FACILITATION TIPS:
- Guide without constraining exploration
- Ask "What would a real user do here?"
- Encourage documenting both successes and failures
- Focus on actionable insights over perfect coverage
```

---

_These templates provide structure while preserving the flexibility that makes investigative testing valuable. Copy and adapt them for your specific marine licensing context._
