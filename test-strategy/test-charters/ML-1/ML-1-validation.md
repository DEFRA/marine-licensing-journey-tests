# ML-1 Validation Charter: Error Handling & Edge Cases

## Charter Definition

**EXPLORE:** Project name validation, error messaging, and edge case behaviour  
**WITH:** Invalid inputs, boundary conditions, error scenarios  
**TO DISCOVER:** How well the system handles mistakes and edge cases

**Duration:** 75 minutes  
**Priority:** High  
**User Personas:** Zofia (Novice), Amy (Veteran)

## Background Context

**User Story:** ML-1 - Provide Project Name and Create Exemption  
**Key Focus:** AC2 - Validate the project name

**Validation Requirements:**

- **Mandatory field** - "Enter the project name" if empty
- **Max length** - "Project name should be 250 characters or less" if >250 chars

## Investigation Areas

### **Empty Field Validation**

- What happens when user clicks "Save and continue" with empty field?
- Is the error message displayed correctly and prominently?
- Does the error appear in both the error summary and inline?
- Can users easily identify and fix the error?

### **Length Validation (250 Characters)**

- How does the system handle exactly 250 characters?
- What about 249, 250, and 251 characters?
- Is the error message helpful and actionable?
- Can users easily see how many characters they've typed?

### **Error Message Quality**

- Are error messages written in plain English?
- Do they follow GOV.UK Design System patterns?
- Are they helpful for people unfamiliar with marine licensing?
- Do they explain what the user needs to do to fix the problem?

### **Error Recovery**

- How easy is it to fix validation errors?
- Does user input get preserved when errors occur?
- Can users navigate away and come back without losing progress?
- How does the error state clear when user fixes the issue?

## Edge Case Scenarios

### **Character Length Testing**

- **Exactly 250 characters** - Should be accepted
- **249 characters** - Should be accepted
- **251 characters** - Should show length error
- **Empty string** - Should show mandatory error
- **Whitespace only** - How does system handle spaces?
- **Very long inputs** - What about 500+ characters?

### **Special Character Combinations**

- **Unicode characters** - Accented letters, symbols
- **Emojis** - How are they counted toward character limit?
- **Line breaks** - What if user adds new lines?
- **HTML/Script tags** - System security handling
- **Copy-paste content** - Formatting from other applications

### **Browser Behaviour**

- **Back button** - Error state preservation
- **Page refresh** - Form data retention
- **Tab switching** - Session handling
- **Network issues** - Connectivity problems during validation

## Personas & Error Scenarios

### **Zofia (Novice Applicant)**

**Scenario:** First-time user who might make mistakes

- Submits empty form by accident
- Writes very long, descriptive project name
- Copies text from email or document
- Gets confused by error messages

**Questions:**

- Are error messages beginner-friendly?
- Is guidance clear enough to prevent common mistakes?
- Can she recover easily from errors?

### **Amy (Veteran Applicant)**

**Scenario:** Experienced user working quickly

- Might rush and miss validation requirements
- Could have project names from previous systems
- Expects efficient error handling

**Questions:**

- Are errors presented efficiently?
- Can she fix issues without losing momentum?
- Do error messages respect her experience level?

## Boundary Testing

### **Character Count Validation**

Test strings of various lengths:

- 245 chars: "This is a test project name for marine licensing that is designed to be close to but under the maximum length limit for project names which is set at 250 characters according to the requirements document and should be accepte"
- 250 chars: "This is a test project name for marine licensing that is designed to be exactly at the maximum length limit for project names which is set at 250 characters according to the requirements document and should be accepted by the sy"
- 255 chars: "This is a test project name for marine licensing that is designed to exceed the maximum length limit for project names which is set at 250 characters according to the requirements document and should trigger a validation error messag"

### **Special Cases**

- Copy text with hidden characters
- Text with unusual Unicode combinations
- Names with multiple spaces or tabs
- Content from different operating systems

## Discovery Questions

### **Error Presentation**

- How prominent are error messages?
- Do users notice them immediately?
- Are they positioned logically on the page?
- Do they interrupt the user flow appropriately?

### **User Experience**

- How frustrating is it to encounter these errors?
- Can users fix problems without external help?
- Do error messages build confidence or create anxiety?
- How do errors affect the overall user journey?

### **System Robustness**

- How does the system handle malformed input?
- Are there any ways to bypass validation?
- What happens with very unusual character combinations?
- How does performance handle very long inputs?

## Success Indicators

### **Good Error Handling**

- Error messages are clear, helpful, and actionable
- Users can easily identify and fix validation problems
- Form data is preserved during error scenarios
- Error presentation follows GOV.UK patterns consistently

### **Edge Case Robustness**

- System handles boundary conditions gracefully
- No unexpected crashes or system errors
- Security considerations are properly handled
- Performance remains good with edge case inputs

## Documentation Focus

Record:

- **Error message screenshots** - For design review
- **Character count testing results** - Boundary behaviour
- **User experience observations** - Error recovery process
- **Cross-browser differences** - Validation consistency
- **Performance notes** - System behaviour with long inputs

## Follow-up Actions

- Create bug reports for any validation issues found
- Document any improvements needed for error messages
- Identify automation gaps for edge case testing
- Note any security concerns discovered
- Provide UX feedback on error handling experience

---

**Related User Story:** [ML-1.provide.project.name.and.create.exemption.mdc](../../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)  
**Previous Charter:** [ML-1 Happy Path Testing](./ML-1-happy-path.md)  
**Next Charter:** [ML-1 Accessibility Testing](./ML-1-accessibility.md)
