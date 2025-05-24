# ML-12 Validation Charter: Form Validation & Error Scenarios

## Charter Definition

**EXPLORE:** Public register consent form validation, error handling, and edge case behaviour  
**WITH:** Invalid inputs, missing selections, boundary conditions, error recovery  
**TO DISCOVER:** How well the system handles validation errors and supports user error recovery

**Duration:** 75 minutes  
**Priority:** High  
**User Personas:** Zofia (Novice), Amy (Veteran)

## Background Context

**User Story:** ML-12 - Provide or Withhold Public Register Content  
**Validation Focus:** AC3 - Validate public register information

**Validation Requirements:**

- **Mandatory radio button** - Must select consent choice
- **Mandatory reason text** - Required if "Yes" (withhold) is selected
- **Maximum length** - Reason text must be ≤1000 characters

## Investigation Areas

### **Radio Button Validation**

- What happens when user submits without selecting any option?
- Is the error message clear and appropriately positioned?
- How does the error integrate with the form layout?
- Can users easily identify and fix the missing selection?

### **Conditional Text Area Validation**

- How does validation work when "Yes" is selected but text area is empty?
- Is the error message specific to the conditional context?
- How are errors handled when radio button changes after text entry?
- Does validation correctly ignore text area when "No" is selected?

### **Character Limit Validation (1000 Characters)**

- How does the system handle exactly 1000 characters?
- What about 999, 1000, and 1001 characters?
- Is there any character counting feedback for users?
- How clear is the error message for exceeding the limit?

### **Error Message Quality & Placement**

- Are error messages written in plain English following GOV.UK patterns?
- Do they appear in both error summary and inline positions?
- How well do they guide users to fix problems?
- Are they accessible to screen readers and assistive technology?

## Validation Scenario Testing

### **Missing Radio Button Selection**

1. Load public register page
2. Leave radio buttons unselected
3. Click "Save and continue"
4. Verify error: "Select whether you believe your information should be withheld from the public register"
5. Test error summary and inline error positioning
6. Fix error and verify successful submission

### **Missing Reason Text (Conditional Validation)**

1. Select "Yes" radio button (withhold information)
2. Leave text area empty
3. Click "Save and continue"
4. Verify error: "Details of why the information should be withheld cannot be blank"
5. Test that error only appears when "Yes" is selected
6. Switch to "No" and verify error disappears

### **Character Limit Testing**

Create test strings for boundary testing:

**999 characters (should be accepted):**

```
"This is a detailed explanation of why the marine licensing information should be withheld from the public register. The reasons include commercial sensitivity of the project details, competitive implications for the business, potential security concerns related to the specific location and activities, intellectual property considerations around the methodologies being used, and various other confidential business information that could be harmful if disclosed publicly. Additionally, there are ongoing legal considerations and potential regulatory issues that make public disclosure inappropriate at this time. The nature of the marine activities and their environmental impact assessments contain proprietary methodologies and data that represent significant investment in research and development. Furthermore, the timing of public disclosure could interfere with other regulatory processes and stakeholder consultations that are currently underway and require confidential handling until completion..."
```

**1000 characters (exactly at limit, should be accepted):**

```
"This is a detailed explanation of why the marine licensing information should be withheld from the public register. The reasons include commercial sensitivity of the project details, competitive implications for the business, potential security concerns related to the specific location and activities, intellectual property considerations around the methodologies being used, and various other confidential business information that could be harmful if disclosed publicly. Additionally, there are ongoing legal considerations and potential regulatory issues that make public disclosure inappropriate at this time. The nature of the marine activities and their environmental impact assessments contain proprietary methodologies and data that represent significant investment in research and development. Furthermore, the timing of public disclosure could interfere with other regulatory processes and stakeholder consultations that are currently underway and require confidential handling until completion of t"
```

**1001 characters (should trigger error):**

```
"This is a detailed explanation of why the marine licensing information should be withheld from the public register. The reasons include commercial sensitivity of the project details, competitive implications for the business, potential security concerns related to the specific location and activities, intellectual property considerations around the methodologies being used, and various other confidential business information that could be harmful if disclosed publicly. Additionally, there are ongoing legal considerations and potential regulatory issues that make public disclosure inappropriate at this time. The nature of the marine activities and their environmental impact assessments contain proprietary methodologies and data that represent significant investment in research and development. Furthermore, the timing of public disclosure could interfere with other regulatory processes and stakeholder consultations that are currently underway and require confidential handling until completion of th"
```

## Error Recovery & User Experience

### **Error State Navigation**

- How do errors affect the conditional reveal functionality?
- Can users switch between radio options when errors are present?
- Is form data preserved during error states?
- How does error clearing work when users fix problems?

### **Multiple Error Scenarios**

- What happens when both radio button and text area have errors?
- How are multiple errors presented in the error summary?
- Is the error priority and ordering logical?
- Can users fix errors in any order?

### **Browser & Session Behaviour**

- How do errors persist across page refreshes?
- What happens if user navigates away and returns during error state?
- How does browser back/forward affect error states?
- Are errors handled consistently across different browsers?

## Personas & Error Scenarios

### **Zofia (Novice Applicant)**

**Error Context:** Might be unsure about consent decision and make mistakes

**Error Scenarios:**

- Submits form without reading all options carefully
- Selects "Yes" but struggles to articulate appropriate reasons
- Writes very long explanation exceeding character limit
- Gets confused by error messages and needs clear guidance

**Investigation Questions:**

- Are error messages beginner-friendly and educational?
- Do errors help her understand what's required?
- Can she recover from mistakes without frustration?
- How do errors affect her confidence in the process?

### **Amy (Veteran Applicant)**

**Error Context:** Working efficiently but might make quick mistakes

**Error Scenarios:**

- Rapidly selects options without carefully reading validation requirements
- Copies text from previous applications that might exceed limits
- Expects efficient error handling that doesn't slow her down
- May use keyboard shortcuts that bypass some validation

**Investigation Questions:**

- Are errors presented efficiently without disrupting workflow?
- Can she quickly identify and fix validation problems?
- Do error messages respect her experience level?
- How do errors integrate with her professional working style?

## Accessibility & Error Handling

### **Screen Reader Experience**

- How are validation errors announced to screen readers?
- Is the association between errors and form fields clear?
- How does conditional validation work with assistive technology?
- Are error summary and inline errors properly structured?

### **Keyboard Navigation**

- Can users navigate efficiently to fix errors using keyboard only?
- How does tab order work when errors are present?
- Is focus management appropriate during error states?
- Can users access all error information via keyboard?

### **Visual Error Presentation**

- Do error states meet colour contrast requirements?
- Are errors visible when page is zoomed to 200%?
- How do errors work with high contrast display modes?
- Is error styling consistent with GOV.UK Design System?

## Edge Cases & Boundary Testing

### **Character Counting Edge Cases**

- How are emojis and special characters counted?
- What about line breaks and whitespace?
- How does copy-paste from other applications affect character counting?
- Are there any Unicode character counting issues?

### **Conditional Validation Logic**

- What happens if JavaScript is disabled?
- How does validation work if conditional reveal fails?
- Are there any race conditions between radio selection and validation?
- How robust is the validation logic under stress?

### **Form State Edge Cases**

- What if user manually modifies form data in browser developer tools?
- How does validation handle unexpected form states?
- Are there any client-side validation bypass possibilities?
- How does server-side validation compare to client-side?

## Success Indicators

### **Effective Validation**

- Validation errors are clear, helpful, and actionable
- Users can easily identify and fix validation problems
- Error presentation follows GOV.UK accessibility standards
- Conditional validation logic works correctly and intuitively
- Error recovery process is smooth and doesn't lose user data

### **Areas for Investigation**

- Confusing or unhelpful error messages
- Problems with conditional validation logic
- Accessibility issues with error presentation
- User experience friction during error recovery
- Technical issues with validation implementation

## Documentation Focus

Record:

- **Error message screenshots** - For design and content review
- **Validation behaviour testing** - Boundary conditions and edge cases
- **Accessibility testing results** - Screen reader and keyboard navigation with errors
- **User experience observations** - Error recovery process and user reactions
- **Cross-browser validation** - Consistency of validation behaviour

## Follow-up Actions

- Create bug reports for any validation logic issues
- Document improvements needed for error message content
- Identify automation opportunities for validation testing
- Provide UX feedback on error handling and recovery
- Note any accessibility improvements for error states

---

**Related User Story:** [ML-12.provide.or.withhold.public.register.content.mdc](../../.cursor/user-stories/ML-12.provide.or.withhold.public.register.content.mdc)  
**Previous Charter:** [ML-12 Consent Workflow Testing](./ML-12-consent-workflow.md)  
**Next Charter:** [ML-12 Data Protection Testing](./ML-12-data-protection.md)
