# ML-1 Investigative Charter: Novice Discovery

## Session Charter

**SESSION CHARTER:** Investigate project name workflow effectiveness for marine licensing novices under realistic conditions with accessibility and validation focus

**Duration:** 90 minutes  
**Priority:** High

## Scenario Context

### **THEME**

Discover usability barriers, accessibility issues, and validation effectiveness for users completely new to marine licensing and government digital services

### **SETUP**

- **Primary Persona:** Zofia (Environmental Consultant, Marine Licensing Novice)
- **User Context:** First marine licensing application, unfamiliar with regulatory terminology
- **Technology Context:** Mixed device usage (mobile and desktop), screen reader testing, real assistive technology
- **Environmental Context:** Real-world distractions, time pressure, terminology confusion
- **Accessibility Context:** Testing with screen readers, keyboard navigation, magnification tools

### **REALISTIC PRESSURES**

- **Domain knowledge gaps** - Unfamiliar with marine licensing terminology and processes
- **Technology barriers** - May use assistive technology or have varying digital literacy
- **Time pressure** - Deadline for environmental impact assessment submission
- **Cognitive load** - Learning new system while understanding regulatory requirements
- **Multiple device usage** - Switching between mobile for field work and desktop for detailed entry

## Investigation Focus

### **EXPLORE**

Project name workflow from complete novice perspective with accessibility and validation testing

### **WITH**

- Screen reader (NVDA/JAWS), keyboard navigation, mobile devices
- Invalid inputs, boundary conditions, realistic mistakes
- Terminology confusion simulation, real-world interruptions

### **TO DISCOVER**

- Accessibility barriers and guidance effectiveness for novices
- Validation robustness and error recovery patterns
- Real user behaviour patterns under authentic pressure

## Realistic Activities

### **Novice User Behaviour Patterns**

#### **Initial Approach (Realistic First-Timer)**

- Navigate to project name page without reading all guidance first (realistic behaviour)
- Attempt to understand "project name" terminology in marine licensing context
- Use mobile device initially, then switch to desktop for detailed entry
- Test with screen reader active throughout entire workflow

#### **Common Novice Mistakes**

- Enter project description instead of concise project name
- Include irrelevant details like dates, locations, company names
- Submit empty form accidentally while exploring interface
- Copy-paste content from emails or documents with hidden formatting

#### **Accessibility Navigation**

- Complete entire workflow using only keyboard navigation
- Navigate with screen reader announcements and understand content structure
- Test with browser zoom at 200% and 400% magnification
- Use voice control software for navigation and data entry

#### **Validation and Error Scenarios**

- **Empty field testing** - Submit without entering project name
- **Length boundary testing** - Enter exactly 249, 250, and 251 characters
- **Special character testing** - Include accented characters, symbols, line breaks
- **Copy-paste scenarios** - Content from Word documents, emails, PDFs

### **Realistic Variations and Turbulence**

#### **Environmental Interruptions**

- Phone call from client requesting project status update mid-task
- Internet connectivity issues during form submission
- Browser crash requiring recovery of entered data
- Email notification requiring immediate response

#### **Cognitive Load Simulation**

- Attempt to complete task while referencing marine licensing guidance documents
- Switch between project name entry and reading regulatory requirements
- Handle multiple related marine licensing applications simultaneously
- Navigate cross-references to planning permission and environmental assessments

#### **Technology Friction**

- Test browser back button usage without losing progress
- Switch between mobile and desktop devices mid-application
- Handle browser autofill conflicts with manual entry
- Test with poor network connectivity and slow page loads

## Evidence Framework

### **Accessibility Quality Indicators**

#### **Positive Signals:**

- **Screen reader clarity** - All content announced logically and helpfully
- **Keyboard navigation fluency** - Tab order logical, focus indicators clear
- **Error accessibility** - Validation messages properly announced and associated
- **Zoom compatibility** - Interface usable at high magnification levels
- **Content structure** - Headings, labels, and landmarks support navigation

#### **Warning Signs:**

- **Screen reader confusion** - Unclear announcements, missing labels, focus traps
- **Keyboard navigation barriers** - Unreachable elements, unclear focus, trapped navigation
- **Error communication failures** - Validation issues not announced or poorly explained
- **Zoom degradation** - Interface breaks or becomes unusable when magnified
- **Content accessibility gaps** - Missing alt text, unclear headings, poor contrast

### **Novice User Experience Indicators**

#### **Guidance Effectiveness:**

- **Terminology clarity** - Marine licensing terms explained in plain English
- **Progressive disclosure** - Complex information revealed appropriately
- **Error prevention** - Clear guidance prevents common mistakes
- **Context help** - Assistance available when and where needed

#### **Validation Robustness:**

- **Error message quality** - Clear, helpful, actionable language for non-experts
- **Error recovery ease** - Simple paths to fix validation problems
- **Progress preservation** - Form data maintained during error correction
- **Boundary handling** - 250-character limit handled gracefully with helpful feedback

## Systematic Heuristic Application

### **Structure Focus (HTSM)**

- **Form layout** - Logical visual hierarchy and accessibility structure
- **Navigation design** - Clear paths between related tasks
- **Error presentation** - Consistent placement and visual design

### **Behaviour Focus (HTSM)**

- **Input validation** - Real-time vs submission feedback effectiveness
- **Error handling** - Recovery patterns and user guidance
- **Cross-device continuity** - Progress preservation across platforms

### **Data Focus (HTSM)**

- **Character limit handling** - Boundary testing with realistic content
- **Special character support** - Unicode, formatting, copy-paste scenarios
- **Data persistence** - Session handling and form recovery

## Discovery Documentation

### **Evidence Collection**

```
+ Positive findings (accessibility features that work well)
- Issues found (barriers, validation problems, usability gaps)
? Questions raised (unclear requirements, edge cases)
! Ideas generated (improvements, automation opportunities)

ACCESSIBILITY EVIDENCE:
□ Screen reader testing recordings and observations
□ Keyboard navigation path documentation
□ Zoom testing at various magnification levels
□ Voice control interaction results

VALIDATION EVIDENCE:
□ Character limit boundary test results
□ Error message screenshots and effectiveness assessment
□ Special character and formatting test outcomes
□ Cross-browser validation consistency

NOVICE USER EVIDENCE:
□ Terminology confusion points and resolution paths
□ Guidance effectiveness observations
□ Common mistake patterns and recovery success
□ Real-world interruption impact assessment
```

### **Problem Classification**

#### **Critical Issues (Immediate Attention)**

- Accessibility barriers that prevent task completion
- Validation failures that cause data loss or system errors
- Guidance gaps that cause novice users to abandon workflow

#### **Significant Issues (High Priority)**

- Usability barriers that cause frustration or confusion for novices
- Error messages that don't help users recover effectively
- Accessibility features that work inconsistently

#### **Improvement Opportunities (Medium Priority)**

- Additional guidance that would help novice users
- Validation enhancements that could prevent common mistakes
- Accessibility features that would improve user confidence

## Follow-up Investigation Areas

### **Immediate Automation Implications**

- Which validation scenarios should automated tests cover?
- What accessibility compliance should be continuously monitored?
- How can automation validate error recovery patterns?

### **Related Investigation Sessions**

- **ML-1 Efficiency Patterns** - Compare novice vs veteran user needs
- **ML-1 Validation Scenarios** - Deep dive on edge cases discovered
- **Cross-story accessibility** - Consistent accessibility across all workflows

---

**Investigative Testing Approach:** This charter implements the **[Investigative Testing](../../test-strategy/investigative-testing/README.md)** framework  
**Related User Story:** [ML-1.provide.project.name.and.create.exemption.mdc](../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)
