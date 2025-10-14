# Accessibility Testing: Gov.UK Service Standard Compliance

## Legal Requirements

**Your service MUST meet:**

- [Web Content Accessibility Guidelines (WCAG) 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/)
- [Public Sector Bodies Accessibility Regulations 2018](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [Service Standard Point 5: Make sure everyone can use the service](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service)

**Non-compliance risks:** Legal action, reputational damage, user exclusion

## WCAG 2.1 AA Testing Checklist

### 1. Perceivable

Information must be presentable to users in ways they can perceive.

**Test:**

- [ ] All images have appropriate alt text
- [ ] Videos have captions and transcripts
- [ ] Colour contrast meets minimum ratios (4.5:1 for normal text, 3:1 for large text)
- [ ] Information isn't conveyed by colour alone
- [ ] Text can be resized to 200% without loss of functionality

**Tools:**

- [WAVE (WebAIM)](https://wave.webaim.org/) - browser extension for contrast checking
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### 2. Operable

User interface components and navigation must be operable.

**Test:**

- [ ] Everything works with keyboard only (no mouse traps)
- [ ] Users have enough time to read content (session timeouts are adjustable)
- [ ] No content causes seizures (no flashing >3 times per second)
- [ ] Skip to main content link present
- [ ] Focus order is logical
- [ ] Focus indicators are visible
- [ ] Page has descriptive title
- [ ] Headings describe content

**How to test keyboard navigation:**

1. Put mouse away completely
2. Use Tab to move forward, Shift+Tab to move backward
3. Use Enter to activate buttons, Space for checkboxes
4. Use arrow keys for radio buttons and dropdowns
5. Can you reach everything? Can you see where you are?

### 3. Understandable

Information and operation must be understandable.

**Test:**

- [ ] Page language is identified
- [ ] Navigation is consistent across pages
- [ ] Error messages are clear and helpful
- [ ] Labels describe form fields
- [ ] Instructions are provided where needed
- [ ] Error prevention for legal/financial data

**Content requirements:**

- Use plain English (aim for reading age 9)
- Avoid jargon and abbreviations
- Use GOV.UK content design patterns
- Follow [GOV.UK style guide](https://www.gov.uk/guidance/style-guide)

### 4. Robust

Content must work with current and future assistive technologies.

**Test:**

- [ ] Valid HTML (no parsing errors)
- [ ] Name, role, value available for all UI components
- [ ] Status messages announced to screen readers
- [ ] Works across different browsers
- [ ] Compatible with assistive technologies

**Validation tools:**

- [W3C HTML Validator](https://validator.w3.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/) browser extension

## Assistive Technology Testing

### Screen Reader Testing (Essential)

**Windows - NVDA (Free):**

1. [Download NVDA](https://www.nvaccess.org/download/)
2. Start NVDA (Ctrl+Alt+N)
3. Navigate with:
   - H = next heading
   - Tab = next interactive element
   - Arrow keys = read content
   - Enter = activate links/buttons
4. Listen for:
   - Are form labels announced?
   - Are error messages announced?
   - Is the page structure clear?
   - Can you understand without seeing?

**Windows - JAWS (If available):**

- Similar commands to NVDA
- More comprehensive but requires licence

**Mac - VoiceOver (Built-in):**

- Cmd+F5 to start
- Control+Option = VO keys
- VO+arrows to navigate

**Mobile testing:**

- iOS: VoiceOver (Settings > Accessibility)
- Android: TalkBack (Settings > Accessibility)

### Other Assistive Technologies

**Dragon NaturallySpeaking (Voice control):**

- Can users navigate by speaking?
- Are clickable elements properly labelled?

**ZoomText (Magnification):**

- Does layout work at 200% zoom?
- Is content still readable when magnified?

## Testing with Real Users

### Gov.UK Accessibility Personas

Test with these user profiles:

- **Pawel** - User with Asperger's
- **Christopher** - User with rheumatoid arthritis
- **Ashleigh** - Partially sighted screen reader user
- **Ron** - Older user with multiple conditions
- **Claudia** - Partially deaf
- **Simone** - User with dyslexia

[Full persona details](https://www.gov.uk/government/publications/understanding-disabilities-and-impairments-user-profiles)

### Recruiting Disabled Testers

For beta:

- Include 1-2 users with disabilities
- Cover priority groups: screen reader users, keyboard-only users
- Provide support and extra time
- Pay for their time

## Automated Testing Tools

### Essential Tools (Run all):

1. **[axe DevTools](https://www.deque.com/axe/devtools/)**
   - Catches ~30% of issues
   - Good for WCAG violations
   - Clear fix guidance

2. **[WAVE](https://wave.webaim.org/)**
   - Visual feedback
   - Contrast checking
   - Structural analysis

3. **[Pa11y](https://pa11y.org/)**
   - Command line tool
   - CI/CD integration
   - Batch testing

4. **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** (in Chrome DevTools)
   - Performance + accessibility
   - Mobile testing
   - Progressive web app checks

### How to Use Automated Tools

```bash
# Example Pa11y command
pa11y https://your-service.gov.uk --standard WCAG2AA

# Check multiple pages
pa11y https://your-service.gov.uk/page1 https://your-service.gov.uk/page2
```

## Priority Issues for Beta

### Must Fix Before Beta:

1. **Keyboard traps** - Users can't escape
2. **Missing form labels** - Screen readers can't identify fields
3. **No error identification** - Users don't know what's wrong
4. **Session timeout without warning** - Data loss
5. **Critical content inaccessible** - Core journey blocked

### Should Fix Before Beta:

1. **Poor colour contrast** - Hard to read
2. **Missing skip links** - Slow navigation
3. **Unclear error messages** - User confusion
4. **Missing page titles** - Orientation issues

### Can Fix During Beta:

1. **Decorative image alt text** - Minor annoyance
2. **Inconsistent heading hierarchy** - Comprehension issues
3. **Minor focus order issues** - Efficiency loss
4. **Redundant links** - Slight confusion

## Documentation Requirements

### Accessibility Statement (Legal Requirement)

You MUST publish an accessibility statement that includes:

- Compliance status (fully/partially compliant)
- Non-accessible content list
- Reasons for non-compliance
- Alternative access methods
- Contact details for issues
- Enforcement procedure link

[Use the Gov.UK template](https://www.gov.uk/guidance/model-accessibility-statement)

### Testing Evidence

Document:

- Tools used and results
- Manual testing completed
- User testing feedback
- Issues found and severity
- Remediation timeline

## Beta-Specific Guidance

### For Private Beta:

**Minimum viable accessibility:**

1. Keyboard navigation works
2. Screen reader can complete journey
3. Colour contrast acceptable
4. Error messages clear
5. No data loss from timeouts

**Beta participation:**

- Be transparent about accessibility status
- Offer alternative routes if needed
- Gather accessibility feedback specifically
- Plan fixes for public beta

### Support During Beta:

Prepare for:

- Longer completion times for disabled users
- Need for telephone support option
- Requests for reasonable adjustments
- Detailed accessibility feedback

## Quick 2-Hour Audit

If time is limited, prioritise:

1. **Keyboard test** (30 mins)
   - Complete full journey without mouse
   - Note any blocks

2. **Screen reader test** (45 mins)
   - Use NVDA on Windows
   - Complete core journey
   - Note confusion points

3. **Automated scan** (15 mins)
   - Run axe DevTools
   - Run WAVE
   - Note critical errors

4. **Colour contrast check** (15 mins)
   - Check all text/background combinations
   - Verify 4.5:1 ratio minimum

5. **Mobile check** (15 mins)
   - Test with VoiceOver/TalkBack
   - Check touch target sizes (44x44px minimum)

## Resources

- [GOV.UK Design System Accessibility](https://design-system.service.gov.uk/accessibility/)
- [GDS Accessibility Blog](https://accessibility.blog.gov.uk/)
- [Service Manual: Accessibility](https://www.gov.uk/service-manual/helping-people-to-use-your-service)
- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
- [GDS Accessibility Community](https://www.gov.uk/service-manual/communities/accessibility-community)

## Decision for Beta

**Proceed with beta if:**

- Core journey completable with keyboard and screen reader
- No critical WCAG 2.1 AA failures
- Accessibility statement published
- Support available for disabled users

**Delay beta if:**

- Keyboard users completely blocked
- Screen reader users cannot understand forms
- No way to report accessibility issues
- Legal compliance at risk

---

**Remember:** Accessibility isn't optional. It's a legal requirement and the right thing to do. Test early, test often, include disabled users.
