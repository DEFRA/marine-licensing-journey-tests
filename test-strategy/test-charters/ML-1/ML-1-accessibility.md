# ML-1 Accessibility Charter: Inclusive Design Validation

## Charter Definition

**EXPLORE:** Project name page accessibility and inclusive design  
**WITH:** Screen readers, keyboard navigation, accessibility tools, diverse users  
**TO DISCOVER:** Whether the interface works for users with different abilities and needs

**Duration:** 90 minutes  
**Priority:** Medium  
**User Personas:** All personas, with focus on accessibility needs

## Background Context

**User Story:** ML-1 - Provide Project Name and Create Exemption  
**Accessibility Focus:** WCAG 2.1 AA compliance and GOV.UK accessibility standards

**Key Requirements:**

- Screen reader compatibility
- Keyboard navigation support
- Clear visual hierarchy and contrast
- Cognitive accessibility for complex information

## Investigation Areas

### **Screen Reader Experience**

- Does the page announce correctly when loaded?
- Are headings structured logically (H1, H2, etc.)?
- Is the helper text associated with the input field?
- How are error messages announced?
- Can users navigate efficiently between elements?

### **Keyboard Navigation**

- Can users reach all interactive elements with Tab key?
- Is the tab order logical and predictable?
- Can users submit the form using keyboard only?
- Are focus indicators visible and clear?
- How does keyboard navigation work with error states?

### **Visual Accessibility**

- Does text meet colour contrast requirements?
- Is the interface usable when zoomed to 200%?
- Do focus indicators have sufficient contrast?
- Are error states clearly visible?
- How does the interface work with high contrast mode?

### **Cognitive Accessibility**

- Is the page structure clear and predictable?
- Is language simple and jargon-free?
- Are instructions clear and actionable?
- How well does the interface support users with memory issues?

## Accessibility Testing Tools

### **Screen Readers**

- **NVDA** (Windows) - Test announcement and navigation
- **VoiceOver** (macOS) - Test with Safari and different verbosity settings
- **Mobile screen readers** - iOS VoiceOver, Android TalkBack

### **Browser Extensions**

- **axe DevTools** - Automated accessibility checking
- **WAVE** - Visual accessibility evaluation
- **Colour Contrast Analyser** - Text contrast validation

### **Browser Features**

- **High contrast mode** - Windows high contrast themes
- **Browser zoom** - Test at 200% and 400% zoom levels
- **Reduced motion settings** - Test with prefers-reduced-motion

## Persona Accessibility Considerations

### **Zofia (Novice Applicant)**

**Accessibility Needs:** May rely on screen readers or magnification

- Can she understand the page structure immediately?
- Are instructions clear enough for someone using assistive technology?
- Does the helper text provide sufficient context?
- How does error feedback work with her assistive technology?

### **Amy (Veteran Applicant)**

**Accessibility Needs:** May use keyboard navigation for efficiency

- Can she complete the task efficiently using only keyboard?
- Are keyboard shortcuts available for common actions?
- Does the interface remember her accessibility preferences?

### **Fatima (Case Officer)**

**Accessibility Needs:** May use accessibility tools during long work sessions

- Does the interface work well with browser zoom?
- Is it comfortable for extended use with accessibility tools?
- How does the interface work with workplace accessibility software?

## Specific Test Scenarios

### **Screen Reader Navigation**

1. Load page with screen reader active
2. Navigate through all elements using arrow keys
3. Test form completion using only screen reader
4. Trigger validation errors and test error announcements
5. Complete successful submission with screen reader

### **Keyboard-Only Navigation**

1. Navigate to page using only keyboard
2. Tab through all focusable elements
3. Complete form using only keyboard input
4. Test error handling with keyboard navigation
5. Submit form using keyboard shortcuts

### **Visual Accessibility**

1. Test page at 200% browser zoom
2. Enable high contrast mode and test usability
3. Test with different colour vision conditions
4. Verify focus indicators are clearly visible
5. Check error state visual accessibility

### **Cognitive Accessibility**

1. Evaluate page structure and headings
2. Test instruction clarity without context
3. Check error message comprehension
4. Evaluate cognitive load of the task
5. Test with distraction scenarios

## WCAG 2.1 AA Compliance Check

### **Perceivable**

- Text alternatives for any non-text content
- Colour contrast meets 4.5:1 ratio for normal text
- Page is usable when zoomed to 200%
- Content can be presented without loss of meaning

### **Operable**

- All functionality available via keyboard
- No content flashes more than 3 times per second
- Users can navigate and find content
- Input modalities work consistently

### **Understandable**

- Text is readable and understandable
- Content appears and operates predictably
- Users are helped to avoid and correct mistakes
- Error messages are clear and helpful

### **Robust**

- Content works with assistive technologies
- Code validates and follows semantic standards
- Compatible with current and future accessibility tools

## Common Accessibility Issues to Look For

### **Form Accessibility Problems**

- Missing or incorrect labels
- Error messages not associated with fields
- Required fields not properly marked
- Instructions not linked to form controls

### **Navigation Issues**

- Skipped heading levels
- Missing skip links
- Illogical tab order
- Missing focus indicators

### **Content Issues**

- Poor colour contrast
- Text in images without alternatives
- Time limits without user control
- Content that requires specific sensory abilities

## Success Indicators

### **Excellent Accessibility**

- Screen readers announce content clearly and logically
- Keyboard navigation is efficient and predictable
- Visual design meets or exceeds WCAG contrast requirements
- Error handling is accessible and helpful
- Interface works well with zoom and accessibility tools

### **Areas for Improvement**

- Any WCAG violations or compliance gaps
- Usability friction with assistive technologies
- Unclear or unhelpful error announcements
- Poor keyboard navigation experience
- Visual accessibility issues with zoom or high contrast

## Documentation Focus

Record:

- **Screen reader announcements** - What users hear
- **Keyboard navigation paths** - Tab order and efficiency
- **WCAG compliance results** - Automated and manual testing
- **Accessibility tool findings** - axe, WAVE, contrast analysis
- **User experience observations** - Pain points and successes

## Follow-up Actions

- Create accessibility bug reports with WCAG citations
- Document any compliance gaps for remediation
- Identify automation opportunities for accessibility testing
- Provide recommendations for accessibility improvements
- Share findings with design and development teams

---

**Related User Story:** [ML-1.provide.project.name.and.create.exemption.mdc](../../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)  
**Previous Charter:** [ML-1 Validation Testing](./ML-1-validation.md)  
**Next Charter:** [ML-9 Navigation Testing](../ML-9/ML-9-navigation.md)
