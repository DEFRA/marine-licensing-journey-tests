# Session-Based Exploratory Testing Guide

A practical guide to **Session-Based Test Management (SBTM)** for marine licensing applications, based on Jonathan Bach's methodology for structured exploratory testing.

> **📖 Source Attribution**  
> This guide is based on **"Session-Based Test Management"** by **Jonathan Bach**, originally published in _Software Testing & Quality Engineering (STQE) magazine_, November/December 2000. Jonathan Bach was a tester and test lead at Microsoft and trainer/lab manager at Satisfice, Inc.
>
> The original methodology has been adapted here for marine licensing domain testing while preserving the core principles and practices that make session-based testing effective.

## 🎯 What is Session-Based Testing?

Session-based testing organises exploratory testing into **manageable, accountable chunks** called **sessions**. Instead of ad hoc exploration, we use structured time blocks with clear charters and reviewable outcomes.

### **Core Definition**

A **session** is an **uninterrupted block of reviewable, chartered test effort**:

- ⏱️ **Time-boxed** - Typically 90 minutes, focused work
- 🎯 **Chartered** - Clear mission about what to test or investigate
- 🚫 **Uninterrupted** - No emails, meetings, or distractions
- 📋 **Reviewable** - Produces a session sheet for examination and learning

## 🧭 Session Structure

### **Basic Session Format**

Each testing session follows this structure:

```
Duration: 90 minutes (± 30 minutes)
Charter: Clear mission statement
Output: Completed session sheet
Debrief: Short discussion with test lead
```

### **Expected Daily Capacity**

- **3 sessions per day** - Typical capacity for focused tester
- **5.33 theoretical maximum** - If doing nothing but sessions
- **Actual capacity varies** - Meetings, email, and other work reduce session count

### **Session Length Guidelines**

- **Short session** - ~45 minutes (half-length)
- **Normal session** - ~90 minutes (standard)
- **Long session** - ~2 hours (use "long \* 1.5" notation)
- **Extended session** - 4+ hours (use "long \* 2" for very long investigations)

## 📋 Session Sheet Template

### **Required Sections**

#### **1. Charter**

```
CHARTER: Analyze project name validation and error handling
#AREAS: Project Name | Error Handling | Validation
#STRATEGY: Boundary Testing | Error Recovery
```

#### **2. Session Details**

```
TESTER: [Your Name]
START: DD/MM/YYYY HH:MM
DURATION: normal | short | long * [multiplier]
```

#### **3. Task Breakdown (TBS Metrics)**

```
#TEST DESIGN AND EXECUTION: 65%
#BUG INVESTIGATION AND REPORTING: 25%
#SESSION SETUP: 10%

#CHARTER VS. OPPORTUNITY: 80/20
```

#### **4. Outputs**

```
TEST NOTES:
[Detailed notes about what was tested and observations]

BUGS:
#BUG [ID]: [Description]

ISSUES:
#ISSUE [ID]: [Questions or process problems]

DATA FILES:
[Any test data files created or used]
```

## 🎯 Creating Effective Charters

### **Charter Structure**

Use this format for clear, actionable charters:

```
EXPLORE: [Area of the application]
WITH: [Tools, data, personas, techniques]
TO DISCOVER: [Types of information, risks, problems]
```

### **Marine Licensing Charter Examples**

#### **Functional Testing Charter**

```
CHARTER: Explore project name entry and validation
WITH: Various project name formats, boundary conditions, Zofia persona
TO DISCOVER: Input handling issues, validation gaps, user experience problems
```

#### **User Journey Charter**

```
CHARTER: Investigate task list navigation and workflow
WITH: Amy (veteran) persona, multiple browsers, different completion states
TO DISCOVER: Navigation issues, workflow efficiency problems, status confusion
```

#### **Accessibility Charter**

```
CHARTER: Evaluate public register consent page accessibility
WITH: Screen reader, keyboard navigation, WCAG guidelines
TO DISCOVER: Accessibility barriers, compliance gaps, usability issues
```

## 📊 TBS Metrics Explained

### **The Three Categories**

#### **Test Design and Execution (T)**

- Scanning the product for problems
- Running through test scenarios
- Exploring functionality
- Following user workflows

#### **Bug Investigation and Reporting (B)**

- Reproducing suspicious behaviour
- Documenting defects
- Clarifying problem details
- Creating bug reports

#### **Session Setup (S)**

- Configuring test environment
- Reading documentation
- Preparing test data
- Writing session reports

### **Charter vs Opportunity**

- **Charter work** - Testing according to the planned mission
- **Opportunity work** - Exploring interesting problems discovered outside the charter

**Golden Rule**: If you find something interesting outside your charter, follow it! Change the charter during debrief to match what you actually did.

## 🗣️ The Debrief Process

### **PROOF Agenda**

Use this structure for every session debrief:

#### **Past** - What happened during the session?

- Walk through the session timeline
- Discuss major activities and discoveries
- Review any unexpected events

#### **Results** - What was achieved during the session?

- Summarise key findings
- Highlight important bugs or issues found
- Assess charter completion

#### **Obstacles** - What got in the way of good testing?

- Identify blockers or impediments
- Discuss tool or environment problems
- Note any skill or knowledge gaps

#### **Outlook** - What still needs to be done?

- Plan follow-up sessions
- Identify remaining charter work
- Suggest new charter areas

#### **Feelings** - How does the tester feel about all this?

- Gauge tester confidence and motivation
- Address any concerns or frustrations
- Celebrate successes and learning

### **Debrief Timing**

- **New testers** - Debrief immediately after each session
- **Experienced testers** - May cover multiple sessions in one debrief
- **Senior testers** - Lighter touch, more autonomy

## 🏗️ Session Management

### **ToDo Session Hopper**

Maintain a list of pre-planned session charters:

```
📋 Available Sessions (Hopper):
- Explore exemption creation workflow edge cases
- Investigate task list status management
- Test public register consent validation
- Analyse accessibility of project name page
- Evaluate mobile responsiveness across user journeys
```

### **Session Assignment**

1. **Tester picks from hopper** - Self-service approach
2. **Manager assigns urgent sessions** - High-priority investigations
3. **Tester suggests new charters** - Based on discoveries

### **Session Prioritisation**

When clients request special testing:

> "Here's our current session hopper. What priority should we give your request compared to these existing sessions?"

## 🎭 Marine Licensing Personas in Sessions

### **Zofia (Novice Applicant) Sessions**

- Focus on first-time user experience
- Test clarity of guidance and instructions
- Investigate error recovery and help-seeking behaviour
- Explore complexity and cognitive load

### **Amy (Veteran Applicant) Sessions**

- Focus on efficiency and familiar patterns
- Test expert user workflows
- Investigate power-user features and shortcuts
- Explore integration with business processes

### **Fatima (Case Officer) Sessions**

- Focus on back-office workflows
- Test case management and review processes
- Investigate data quality and completeness
- Explore administrative and oversight capabilities

### **Simon (Marine Officer) Sessions**

- Focus on technical review workflows
- Test regulatory compliance aspects
- Investigate marine-specific functionality
- Explore environmental and safety considerations

## 📈 Session Metrics and Tracking

### **Key Metrics**

- **Sessions per day** - Team productivity indicator
- **Charter completion rate** - Session effectiveness
- **Bug discovery rate** - Quality insights
- **Non-session work** - Efficiency indicator

### **Tracking Charts**

```
Daily Session Count: [Chart showing sessions over time]
Work Breakdown: [Pie chart of Testing vs Non-Session work]
Charter vs Opportunity: [Percentage of planned vs exploratory work]
Coverage by Area: [Sessions per product area]
```

### **Estimation and Planning**

```
If we maintain 3 sessions per day per tester...
And we have 200 sessions remaining until ship date...
Then we can do 1 session per product area per build
Or focus deeper on high-risk areas with triage
```

## 🔧 Practical Implementation

### **Getting Started**

1. **Choose your first charter** - Start with familiar functionality
2. **Set up distraction-free environment** - Close email, silence phone
3. **Start session timer** - Note start time
4. **Follow your charter** - But be ready to explore opportunities
5. **Take notes as you go** - Don't wait until the end
6. **Complete session sheet** - Include TBS breakdown
7. **Schedule debrief** - Discuss with test lead

### **Session Sheet Tools**

You can use:

- **Simple text files** - Basic but effective
- **Structured templates** - Word/Google Docs
- **Dedicated tools** - TestRail, Jira, or custom systems
- **Wiki pages** - Collaborative and searchable

### **Common Challenges**

#### **"I can't avoid interruptions"**

- Suspend and resume sessions when necessary
- Count interruption handling as non-session work
- Block time in calendar for session work

#### **"Charter is too big/small"**

- Adjust charter scope during debrief
- Create follow-up sessions for large charters
- Combine small charters for efficiency

#### **"I spent all time on opportunity testing"**

- Change charter to match what you actually did
- Create new charter for original planned work
- This is normal and valuable!

#### **"I can't complete session sheet"**

- Session sheet writing counts as setup time
- Keep notes during session, not after
- Debrief helps clarify and structure findings
