# Review and Submission Charter: Final Stage Conversion Patterns

## Investigation Plan

**EXPLORE:** Check your answers review and notification submission workflow  
**AS:** All user types at the critical conversion point (see References)  
**BECAUSE:** Final review and submission represents the highest-risk conversion point where users commit to their application  
**LOOKING FOR:** Review confidence issues, submission anxiety, information verification patterns, confirmation comprehension, application reference understanding

**Duration:** 70 minutes  
**Priority:** High

## References

- **Requirements:**
  - [ML-82: Check your answers](../user-stories/ML-82.check.answers.circular.site.md)
  - [ML-84: Submit notification](../user-stories/ML-84.submit.notification.md)
  - [ML-21: Generate application reference](../user-stories/ML-21.generate.application.reference.md)
- **Personas:**
  - [Sarah - Discovery-First User](../personas/sarah-discovery-first-user.md)
  - [Marcus - Infrastructure Professional](../personas/marcus-infrastructure-professional.md)
  - [Elena - Multi-Project Coordinator](../personas/elena-multi-project-coordinator.md)
  - [Dr. James - Research Practitioner](../personas/dr-james-research-practitioner.md)

## Scenario Context

**Research Insights on Final Stages:**

**Sarah (Discovery-First)**: _"I'd probably ring someone if got stuck"_ and _"I'd get an email. Because I've put those coords in wrong"_ - High anxiety about accuracy at submission point

**Dr. James (Research)**: _"I would have a summary doc to copy from which would give context of the research"_ - Professional verification needs against source documentation

**Marcus (Infrastructure)**: _"I'd give it a sense-check to see if it ties in with landmarks"_ - Professional validation patterns for accuracy verification

**Elena (Multi-Project)**: Professional accountability for client accuracy and submission completeness

**Focus**: How users approach the final review and submission stages, including confidence building, accuracy verification, and submission commitment across different user contexts.

## Realistic Activities

- Test complete check your answers page comprehension and information verification patterns
- Investigate review confidence for coordinate information display (both WGS84 and OSGB36 formats)
- Test activity information review accuracy and completeness checking
- Evaluate public register consent confirmation and understanding
- Test declaration comprehension and submission confidence
- Investigate "Confirm and send" button interaction and commitment patterns
- Test confirmation page comprehension and application reference understanding
- Evaluate application reference format recognition (EXE/2025/XXXXX) and next steps clarity
- Simulate review scenarios with deliberate information errors to test detection patterns
- Test review patterns under time pressure and professional accountability contexts
- Investigate interruption recovery and session resumption at review stage
- Test accessibility of review and confirmation pages with assistive technology
- Evaluate review patterns for users with incomplete understanding of previous choices
- Test review confidence across different complexity scenarios (WGS84 vs OSGB36, different activity types)

## Evidence Framework

### ✅ Positive signals

- **Review confidence**: Users can verify information accuracy and feel confident proceeding
- **Error detection**: Users notice and correct information problems during review
- **Submission clarity**: Clear understanding of what happens when they submit
- **Confirmation comprehension**: Users understand confirmation page and application reference
- **Next steps clarity**: Users know what to expect after submission

### ⚠️ Warning signs

- **Review anxiety**: Users uncertain about information accuracy but proceed anyway
- **Error blindness**: Users miss obvious information problems during review
- **Submission hesitation**: Users uncertain about consequences of submitting
- **Confirmation confusion**: Users don't understand confirmation page or reference number
- **Process uncertainty**: Users unclear about what happens next after submission

### 🤔 Questions to investigate

- How effectively do users verify coordinate information accuracy in the check your answers summary?
- What review patterns differ between WGS84 (lat/long) and OSGB36 (eastings/northings) coordinate displays?
- How do users interpret the declaration and submission commitment language?
- Do users understand the application reference format and its significance?
- How do different personas approach final accuracy checking given their professional responsibilities?
- What happens when users want to change information during review?

### 💡 Ideas to explore

- Could coordinate information be displayed more clearly for verification confidence?
- Are there opportunities to improve submission commitment clarity?
- How might the confirmation page better support user understanding of next steps?
- Could application reference explanation be enhanced for different user contexts?
- What verification aids might help users catch errors during review?

## Session Notes Template

```
SESSION: Review and Submission Testing - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

REVIEW STAGE OBSERVATIONS:
+ Effective verification and confidence patterns:
- Confusion and hesitation points:
? Uncertain or unclear behaviours:
! Improvement opportunities:

DELIVERED FEATURE FINDINGS:
Check Your Answers Page: [Information comprehension, verification patterns, accuracy confidence]
Project Summary: [Name verification, context understanding]
Activity Information: [Date accuracy, description verification, completeness checking]
Site Details Display: [Coordinate verification, system understanding, accuracy confidence]
Public Register Summary: [Consent confirmation, decision verification]
Declaration: [Language comprehension, commitment understanding, legal clarity]

SUBMISSION PROCESS:
Confirm and Send: [Button interaction, submission confidence, hesitation patterns]
Processing: [Wait time perception, progress indication, user expectations]
Confirmation Page: [Comprehension, reference number understanding, next steps clarity]
Application Reference: [Format recognition (EXE/2025/XXXXX), significance understanding]

PERSONA-SPECIFIC PATTERNS:
Sarah (Discovery-First): [Review anxiety, accuracy confidence, submission commitment]
Marcus (Infrastructure): [Professional verification, accuracy validation, client accountability]
Elena (Multi-Project): [Client accuracy responsibility, professional review patterns]
Dr. James (Research): [Documentation verification, academic accuracy standards]

ERROR DETECTION PATTERNS:
Coordinate Errors: [WGS84 vs OSGB36 verification, precision checking, landmark validation]
Date Errors: [Activity period verification, logical checking]
Content Errors: [Description accuracy, completeness verification]
System Errors: [Technical problem recognition, error recovery]

ACCESSIBILITY FINDINGS:
Screen Reader: [Review information access, submission process, confirmation comprehension]
Keyboard Navigation: [Review navigation, submission interaction, confirmation access]
Cognitive Support: [Information processing, decision confidence, completion support]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

**Delivered features tested:** Complete review and submission workflow including check your answers summary verification, declaration understanding, notification submission with "Confirm and send", and confirmation page with application reference generation (EXE/2025/XXXXX format)

**Related charters:**

- [Novice Journey](./novice-journey.md) - First-time user review anxiety and submission confidence patterns
- [Expert Workflows](./expert-workflows.md) - Professional verification and organisational accountability patterns
- [Form Interactions](./form-interactions.md) - Review page accessibility and submission form validation
- [Site Details](./site-details.md) - How coordinate information appears in review summary and affects submission confidence
