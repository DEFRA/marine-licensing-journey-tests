# ML-1 Happy Path Charter: Project Name Core Functionality

## Charter Definition

**EXPLORE:** Project name entry and exemption notification creation workflow  
**WITH:** Valid project names, different browsers, standard user journey  
**TO DISCOVER:** Whether core functionality works smoothly and intuitively for users

**Duration:** 60 minutes  
**Priority:** High  
**Charter Type:** Traditional SBTM Investigation  
**User Personas:** Zofia (Novice), Amy (Veteran)

> **🎬 Scenario Testing Complement**  
> This traditional charter focuses on **technical validation**. For **realistic user experience investigation**, see **[ML-1 Zofia First-Timer Scenario](./ML-1-zofia-first-timer.md)** which explores the same functionality under authentic user pressures.

## Background Context

**User Story:** ML-1 - Provide Project Name and Create Exemption  
**Key Flow:** Landing on project name page → Entering project name → Saving → Exemption creation

**Acceptance Criteria Focus:**

- AC1: Display "Project name" page correctly
- AC3: Create notification & save project name successfully

## Investigation Areas

### **Page Display & Layout**

- Does the page appear as expected with correct heading and layout?
- Is the helper text clear and helpful?
- Do page elements render correctly across different browsers?
- How does the page look on mobile devices?

### **Project Name Entry**

- How does the text input field behave with different types of input?
- What happens with different project name lengths (short, medium, long)?
- How does the interface handle special characters and symbols?
- Does the field accept emojis, accented characters, or non-English text?

### **Save Functionality**

- Does "Save and continue" work reliably?
- What visual feedback does the user get during save operations?
- How quickly does the save process complete?
- Are there any loading states or progress indicators?

## Test Data Variations

Try project names that represent real marine licensing scenarios:

- **Short names:** "Marina", "Pier Work"
- **Descriptive names:** "Hammersmith Pontoon Construction Project"
- **Technical names:** "Cable Installation Site A-23.1"
- **Mixed content:** "Project Alpha: Marine Survey 2024"
- **Special characters:** "Fish & Chips Marina (Phase-2)"

## Personas to Consider

### **Zofia (Novice Applicant)**

- Is the guidance clear for someone unfamiliar with marine licensing?
- Does the helper text provide enough information?
- Are there any confusing aspects for first-time users?

### **Amy (Veteran Applicant)**

- Is the process efficient for someone who has done this before?
- Can experienced users complete this quickly?
- Are there any unnecessary steps or friction points?

## Discovery Questions

### **Usability**

- How obvious is it what the user needs to do?
- Does the page title and heading make sense?
- Is the helper text useful or could it be improved?
- How well does this page fit into the overall user journey?

### **Functionality**

- Does the save process work consistently?
- Are there any performance issues with saving?
- How does the system handle concurrent users or sessions?
- What happens if the user navigates away during saving?

### **Error Prevention**

- Are there any ways users might accidentally lose their data?
- How robust is the save functionality?
- What happens if there are connectivity issues?

## Success Indicators

### **Positive Outcomes**

- Users can enter project names intuitively
- Save functionality works reliably
- Page displays correctly across browsers and devices
- Helper text and guidance are clear and useful
- Process feels efficient and straightforward

### **Areas for Investigation**

- Any unexpected behaviours during the save process
- Usability friction points for different persona types
- Performance issues or slow loading
- Inconsistent rendering across browsers or devices

## Integration with Scenario Testing

### **What This Charter Provides**

- **Technical validation** - Does the functionality work as specified?
- **Cross-browser compatibility** - Consistent behaviour across platforms
- **Performance baseline** - How fast should the save process be?
- **Edge case discovery** - What happens with unusual but valid inputs?

### **What Scenario Testing Adds**

- **Realistic user context** - How does this work when users are confused, interrupted, or under pressure?
- **Accessibility reality** - How does this work for users with assistive technology in real situations?
- **Content effectiveness** - Does the guidance actually help real users or create confusion?
- **User journey integration** - How does this step feel within the complete application process?

### **Recommended Follow-up**

If this charter discovers:

- **Functional issues** → Fix and retest with traditional charter
- **Usability concerns** → Investigate with **[Zofia First-Timer Scenario](./ML-1-zofia-first-timer.md)**
- **Performance problems** → Test under realistic load conditions
- **Content confusion** → Evaluate with scenario testing and user research

## Documentation Focus

Record:

- **User journey observations** - How smooth is the flow?
- **Performance notes** - Save speed, page load times
- **Cross-browser differences** - Any rendering inconsistencies
- **Mobile experience** - Touch interaction, layout, usability
- **Content quality** - Clarity of guidance and instructions

## Follow-up Actions

- Note any automation gaps for happy path scenarios
- Identify opportunities for performance improvements
- Document any usability insights for design feedback
- Create bug reports for functional issues found
- **Plan scenario testing** if user experience concerns emerge

---

**Related Resources:**

- **[ML-1 User Story](../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)** - Requirements and acceptance criteria
- **[ML-1 Zofia First-Timer Scenario](./ML-1-zofia-first-timer.md)** - Realistic novice user investigation
- **[ML-1 Validation Charter](./ML-1-validation.md)** - Error handling and edge cases
- **[ML-1 Accessibility Charter](./ML-1-accessibility.md)** - Inclusive design validation

_This traditional charter provides technical validation that complements scenario testing's realistic user investigation._
