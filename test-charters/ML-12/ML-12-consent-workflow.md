# ML-12 Consent Workflow Charter: Radio Button Behaviour & Conditional Logic

## Charter Definition

**EXPLORE:** Public register consent workflow, radio button behaviour, and conditional text area  
**WITH:** Different consent choices, conditional reveal testing, form interaction patterns  
**TO DISCOVER:** Whether the consent interface works intuitively and supports user decision-making

**Duration:** 75 minutes  
**Priority:** High  
**User Personas:** Zofia (Novice), Amy (Veteran), Fatima (Case Officer)

## Background Context

**User Story:** ML-12 - Provide or Withhold Public Register Content  
**Key Flow:** Task list → Public register page → Consent choice → Conditional content → Save

**Acceptance Criteria Focus:**

- AC1: Display public register page with clear options
- AC2: Conditional text area reveals when "Yes" selected

## Investigation Areas

### **Radio Button Behaviour**

- How clearly do the radio button options communicate the choice?
- Is the question wording clear and unambiguous?
- Do users understand the implications of each choice?
- How does the interface handle switching between options?

### **Conditional Reveal Functionality**

- Does the text area appear smoothly when "Yes" is selected?
- Does it disappear appropriately when "No" is selected?
- Is the conditional reveal obvious and expected?
- How does the interface handle rapid switching between options?

### **Content & Context**

- Is the explanatory text about public register sharing clear?
- Do users understand what information might be published?
- Is the consent question appropriately worded?
- How well does the content support informed decision-making?

### **User Decision Process**

- Can users easily understand the choice they're making?
- Do they have enough information to make an informed decision?
- How does the interface support users who are uncertain?
- Are there any pressure points in the decision process?

## Form Interaction Testing

### **Radio Button Selection Patterns**

1. Load page with no selection (initial state)
2. Select "No" option - verify no text area appears
3. Select "Yes" option - verify text area reveals
4. Switch back to "No" - verify text area disappears
5. Switch back to "Yes" - verify text area reappears
6. Test rapid switching between options

### **Conditional Content Behaviour**

1. Enter text in the revealed text area
2. Switch to "No" option - what happens to entered text?
3. Switch back to "Yes" - is text preserved or cleared?
4. Test text area focus behaviour during reveals
5. Test keyboard navigation with conditional content

### **Browser & Device Testing**

- How does conditional reveal work across different browsers?
- Is the behaviour consistent on mobile devices?
- How does it work with touch interactions?
- Are there any timing issues with reveal animations?

## Personas & Decision Scenarios

### **Zofia (Novice Applicant)**

**Decision Context:** First marine licensing application, uncertain about public register implications

**Scenario Questions:**

- Does she understand what the public register is?
- Can she make an informed decision about consent?
- Is the conditional text area obvious when she needs to provide reasons?
- How comfortable is she with the decision-making process?

**Investigation Tasks:**

1. Read through page content as first-time user
2. Evaluate understanding of public register implications
3. Test decision-making with uncertain mindset
4. Assess comfort level with consent choice
5. Test reason-providing workflow if choosing to withhold

### **Amy (Veteran Applicant)**

**Decision Context:** Experienced with marine licensing, knows public register implications

**Scenario Questions:**

- Can she make her decision quickly and efficiently?
- Does the interface support confident, fast decision-making?
- Are there any unnecessary friction points for experienced users?
- How well does the workflow fit her professional approach?

**Investigation Tasks:**

1. Review page with experienced user perspective
2. Test efficient decision-making workflow
3. Evaluate any unnecessary steps or delays
4. Test professional use case scenarios
5. Consider workflow integration with business processes

### **Fatima (Case Officer)**

**Decision Context:** Understanding applicant decisions and providing guidance

**Scenario Questions:**

- Can she understand the applicant's perspective from this interface?
- What information might help her guide uncertain applicants?
- How well does the consent process support regulatory requirements?
- Are there any compliance or guidance implications?

**Investigation Tasks:**

1. Review page from case management perspective
2. Consider applicant guidance scenarios
3. Evaluate regulatory compliance aspects
4. Test understanding of withheld information reasons
5. Consider back-office workflow implications

## Conditional Logic Edge Cases

### **State Management**

- What happens when user refreshes page with "Yes" selected?
- How does browser back/forward affect conditional state?
- Is text area content preserved during session?
- How does conditional state behave with form validation errors?

### **JavaScript Disabled Scenarios**

- Does the page work without JavaScript?
- How is the conditional behaviour handled?
- Are there any graceful degradation issues?
- Can users still complete the task without JavaScript?

### **Accessibility with Conditional Content**

- How do screen readers announce the conditional text area?
- Is the association between radio button and text area clear?
- How does keyboard navigation work with revealed content?
- Are focus changes appropriate when content reveals?

## Content Comprehension Testing

### **Public Register Understanding**

- Do users understand what the public register is?
- Can they comprehend what information might be shared?
- Is the explanation accessible to non-experts?
- How well does the content support informed consent?

### **Question Clarity**

- Is the consent question clear and unambiguous?
- Do users understand they're making a consent decision?
- Are the implications of each choice clear?
- Is the language appropriate for the target audience?

### **Reason Text Area Context**

- When the text area appears, is its purpose clear?
- Do users understand what kind of reasons are expected?
- Is there enough guidance for providing appropriate reasons?
- How does the text area integrate with the overall consent process?

## Workflow Integration

### **Task List Integration**

- How does this page fit into the overall application process?
- Is the consent decision appropriately positioned in the workflow?
- How does completion of this task affect the overall process?
- Are there any workflow dependencies or implications?

### **Data Handling**

- How is consent information stored and managed?
- What happens to withheld information in the system?
- How are consent decisions communicated to relevant parties?
- Are there any data protection implications?

### **Process Continuation**

- After saving consent information, how does the user proceed?
- Is the next step in the process clear?
- How does the task list reflect completion?
- Are there any process continuation issues?

## Success Indicators

### **Effective Consent Workflow**

- Users understand the public register and consent implications
- Radio button behaviour is intuitive and responsive
- Conditional text area reveals smoothly and logically
- Decision-making feels informed and comfortable
- Workflow integrates well with overall application process

### **Areas for Investigation**

- Confusion about public register or consent implications
- Technical issues with conditional reveal functionality
- Poor user experience with radio button interactions
- Inadequate information for informed decision-making
- Workflow integration problems

## Documentation Focus

Record:

- **Conditional behaviour observations** - Technical functionality and user experience
- **Content comprehension notes** - User understanding of public register and consent
- **Decision-making process** - How users approach the consent choice
- **Accessibility testing results** - Screen reader and keyboard navigation
- **Cross-browser consistency** - Technical behaviour across platforms

## Follow-up Actions

- Create bug reports for any conditional logic issues
- Document content improvements for public register explanation
- Note automation opportunities for conditional reveal testing
- Provide UX feedback on consent decision workflow
- Identify any accessibility improvements needed

---

**Related User Story:** [ML-12.provide.or.withhold.public.register.content.mdc](../../.cursor/user-stories/ML-12.provide.or.withhold.public.register.content.mdc)  
**Previous Charter:** [ML-9 Usability Testing](../ML-9/ML-9-usability.md)  
**Next Charter:** [ML-12 Validation Testing](./ML-12-validation.md)
