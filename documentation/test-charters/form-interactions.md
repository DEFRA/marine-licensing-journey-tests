# Form Interactions Charter: Input Validation & Behaviour

## Investigation Plan

**EXPLORE:** Form behaviour, validation patterns, and interaction design across delivered features  
**AS:** All user types interacting with forms under various conditions  
**BECAUSE:** Form interactions are critical touchpoints that can make or break user experience  
**LOOKING FOR:** Validation issues, interaction problems, error handling gaps, usability friction

**Duration:** 80 minutes  
**Priority:** High

## Scenario Context

### **Theme**

Investigate how well form interactions work across the marine licensing application, focusing on validation, error handling, conditional logic, and user feedback patterns.

### **Setup**

- **All Personas:** Zofia (Novice), Amy (Veteran), Fatima (Case Officer)
- **User Context:** Various form interaction scenarios across application features
- **Technology Context:** Different browsers, devices, input methods, assistive technology
- **Environmental Context:** Real-world data entry patterns, interruptions, error conditions
- **Delivered Features:** Project name entry, task list navigation, public register consent, site details selection screens (location method, shape type, coordinate system)

### **Realistic pressures**

- **Data entry variations** - Copy-paste, autofill, manual typing, voice input
- **Validation timing** - Real-time vs submission feedback expectations
- **Error recovery** - Understanding and fixing validation problems
- **Conditional logic** - Dynamic form behaviour based on user choices
- **Session handling** - Form state preservation during interruptions

## Realistic Activities

### **Project name form testing**

#### **Input validation patterns**

- Test character limit boundary conditions (249, 250, 251 characters)
- Enter special characters, accented letters, symbols, emojis
- Copy-paste content from Word documents, emails, PDFs with hidden formatting
- Test empty submission and whitespace-only entries
- Enter project descriptions instead of names (common user mistake)
- **Use problematic strings** from the [Big list of naughty strings](https://github.com/minimaxir/big-list-of-naughty-strings) to test validation robustness

#### **Error handling and recovery**

- Trigger validation errors and test error message clarity
- Test error message positioning and accessibility
- Verify error persistence and clearing behaviour
- Test form recovery after validation errors
- Check browser back button behaviour with validation errors

### **Public register consent form testing**

#### **Radio button behaviour**

- Test initial state (no selection) and required field validation
- Switch rapidly between "Yes" and "No" options
- Test keyboard navigation between radio button options
- Verify radio button selection with assistive technology
- Test touch interaction on mobile devices

#### **Conditional text area logic**

- Test text area appearance when "Yes" is selected
- Verify text area disappearance when switching to "No"
- Test text preservation when switching between options
- Enter text exceeding 1000 character limit
- Test conditional logic with keyboard navigation and screen readers

#### **Form state management**

- Test form submission with various input combinations
- Verify data persistence when navigating away and returning
- Test browser refresh behaviour with partially completed forms
- Check session timeout handling with unsaved changes
- Test cancel/back button behaviour with form changes

### **Site details form testing**

#### **Coordinate system selection**

- Test radio button behaviour for coordinate system options
- Verify system selection validation and error handling
- Test keyboard navigation through coordinate system options
- Assess help text and guidance clarity
- Verify selection persistence when navigating away and returning

#### **Location method selection**

- Test radio button behaviour for location method options (file/manual)
- Verify validation when no option is selected
- Test keyboard navigation between options
- Assess error messaging for missing selections
- Verify form state after validation errors

#### **Circle vs. polygon selection**

- Test radio button behaviour for shape selection
- Verify validation when no option is selected
- Test keyboard navigation between shape options
- Test switching between options and selection persistence
- Verify error handling for incomplete selections

### **Cross-form interaction testing**

#### **Navigation between forms**

- Move between project name and public register forms
- Test data preservation across form navigation
- Verify task list updates reflect form completion status
- Test browser back/forward button behaviour across forms
- Check deep linking to specific forms with existing data

#### **Validation consistency**

- Compare error message patterns across different forms
- Test validation timing consistency (real-time vs submission)
- Verify accessibility patterns are consistent across forms
- Check visual design consistency for form elements
- Test keyboard navigation patterns across all forms

### **Edge case and stress testing**

#### **Browser and device variations**

- Test forms across different browsers (Chrome, Firefox, Safari, Edge)
- Compare mobile vs desktop form interaction patterns
- Test with browser autofill enabled and disabled
- Verify form behaviour with JavaScript disabled
- Test with various screen sizes and orientations

#### **Assistive technology integration**

- Complete all forms using screen reader (NVDA/JAWS)
- Test voice control software for form completion
- Verify keyboard-only navigation across all forms
- Test with browser zoom at various magnification levels
- Check colour contrast and visual accessibility

## Evidence Framework

### **✅ Positive signals:**

- **Validation clarity** - Error messages are helpful and actionable
- **Interaction fluency** - Forms respond predictably to user input
- **Accessibility support** - All users can complete forms effectively
- **State preservation** - Form data maintained appropriately during navigation
- **Conditional logic clarity** - Dynamic behaviour is obvious and expected

### **⚠️ Warning signs:**

- **Validation confusion** - Error messages unclear or unhelpful
- **Interaction friction** - Forms behave unexpectedly or inconsistently
- **Accessibility barriers** - Some users cannot complete forms effectively
- **Data loss risk** - Form information lost during navigation or errors
- **Conditional logic problems** - Dynamic behaviour confusing or broken

### **🤔 Questions to investigate:**

- How do validation patterns compare across different forms?
- What happens when users interact with forms in unexpected ways?
- How well do forms work with assistive technology and different input methods?
- Are there consistency issues in form behaviour across the application?

### **💡 Ideas to explore:**

- Could validation feedback be more helpful or timely?
- Are there opportunities to prevent common user errors?
- How might conditional logic be made clearer or more intuitive?
- What form interaction patterns could improve efficiency?

## Session Notes Template

```
SESSION: Form Interactions Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

FORM BEHAVIOUR OBSERVATIONS:
+ Effective interaction patterns:
- Friction and problem points:
? Unclear or inconsistent behaviours:
! Improvement opportunities:

VALIDATION FINDINGS:
Project Name: [Character limits, error messages, recovery patterns]
Public Register: [Radio buttons, conditional logic, text area behaviour]
Site Details: [Selection validation, radio buttons, error messages]
Cross-Form: [Consistency, navigation, state preservation]

ACCESSIBILITY FINDINGS:
Screen Reader: [Form labels, error announcements, navigation]
Keyboard Navigation: [Tab order, focus management, interaction]
Visual Accessibility: [Contrast, zoom, visual indicators]

TECHNICAL FINDINGS:
Browser Compatibility: [Cross-browser behaviour differences]
Device Differences: [Mobile vs desktop interaction patterns]
Performance: [Form response times, validation speed]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Project name entry, task list navigation, public register consent, site details entry (coordinate system, circle/polygon)  
**Related features:** [project.name.feature](../../test/features/project.name.feature), [validation.project.name.feature](../../test/features/validation.project.name.feature), [task.list.feature](../../test/features/task.list.feature), [public.register.feature](../../test/features/public.register.feature), [validation.public.register.feature](../../test/features/validation.public.register.feature), [back.and.cancel.public.register.feature](../../test/features/back.and.cancel.public.register.feature), [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature)
