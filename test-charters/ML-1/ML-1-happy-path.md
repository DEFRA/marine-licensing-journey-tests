# ML-1 Happy Path Charter: Project Name Core Functionality

## Charter Definition

**EXPLORE:** Project name entry and exemption notification creation workflow  
**WITH:** Valid project names, different browsers, standard user journey  
**TO DISCOVER:** Whether core functionality works smoothly and intuitively for users

**Duration:** 60 minutes  
**Priority:** High  
**User Personas:** Zofia (Novice), Amy (Veteran)

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

---

**Related User Story:** [ML-1.provide.project.name.and.create.exemption.mdc](../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)  
**Next Charter:** [ML-1 Validation Testing](./ML-1-validation.md)
