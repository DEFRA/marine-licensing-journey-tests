# Novice Journey Session Output

SESSION: Novice Journey Testing - 2025-01-31
DURATION: 10 minutes
INVESTIGATOR: AI Assistant (via Playwright MCP tools)

## DISCOVERY AND PROGRESSION

- **Effective guidance and support:**
  - Clear entry point with project name field
  - Descriptive hint text helps users understand what to enter ("Enter a descriptive name to help you find your project later")
  - Task list provides clear progress tracking with "Completed" and "Incomplete" status
  - Guidance text on task list explains the process clearly
  - Progressive disclosure works well - users only see what they need at each step
  - Example formats provided for dates and coordinates

* **Confusion and barrier points:**
  - No discovery testing was possible (started directly at project name)
  - Coordinate system selection could be intimidating (WGS84 vs OSGB36)
  - No explanation of what "exemption notification" means on entry

? **Unclear or uncertain behaviours:**

- Would Sarah know what qualifies as an "exempt activity"?
- Coordinate precision requirements not clear (how many decimal places?)
- No indication of what happens after submission

! **Improvement opportunities:**

- Add more context about exemptions vs full licences at entry point
- Provide coordinate lookup tool or map interface
- Add progress indicator within multi-step site details flow
- Consider adding "Why am I being asked this?" help text

## DELIVERED FEATURE FINDINGS

**Project Name:**

- Simple text entry with clear hint text
- No validation on format or length observed
- Suitable for both individual and organisational use

**Task List:**

- Clear visual hierarchy with completion status
- All tasks visible upfront (no progressive reveal)
- "Review and send" button only appears when all tasks complete
- Good use of instructional text about saving progress

**Activity Dates:**

- Enhanced validation messages work excellently
- Specific error messages: "The start date must include a month", "The start date must include a year"
- Clear date format example provided (27 5 2025)
- Separate day/month/year fields reduce format confusion
- Good guidance about allowing time for delays

**Activity Description:**

- Simple textarea with clear prompt
- No character counter visible (potential issue for limits)
- Sufficient space for detailed descriptions

**Public Register:**

- Clear yes/no choice with link to public register
- Question phrasing could be clearer ("withheld" is negative framing)
- No explanation of implications of choice

**Site Details Flow:**

- Multi-step wizard pattern clear but lacks progress indicator
- Good use of radio buttons with descriptive text
- Coordinate entry provides decimal format examples
- Width entry clearly shows units (metres)
- Review page consolidates all information well

**Coordinate Entry:**

- WGS84 format with clear decimal examples
- No validation on reasonable UK coordinates
- No map or verification tool
- Help text available but collapsed by default

**Width Entry:**

- Clear unit labelling (metres)
- Simple numeric input
- No validation on reasonable ranges observed

**Review:**

- Comprehensive summary of all site details
- Clear presentation of choices made
- Ability to go back and edit maintained

## ACCESSIBILITY FINDINGS

**Screen Reader:**

- Form labels properly associated with inputs
- Error messages announced appropriately
- Heading hierarchy logical and consistent

**Keyboard Navigation:**

- All interactive elements reachable via keyboard
- Focus indicators visible throughout
- Tab order logical and predictable

**Cognitive Load:**

- Generally manageable chunks of information
- Site details flow might overwhelm with multiple decisions
- Good use of plain English except for coordinate systems

## PERSONA INSIGHTS

**Sarah (Discovery-First):**

- Would complete successfully with current design
- Coordinate entry remains the anxiety point as predicted
- Task list provides confidence through visible progress
- Would likely choose WGS84 (GPS/Google Maps familiarity)
- May need external help for finding exact coordinates
- Public register choice straightforward for simple project

## IMMEDIATE ACTIONS

☐ Add coordinate lookup tool or map interface for visual selection
☐ Include progress indicator in site details multi-step flow  
☐ Add character counter to activity description field
☐ Provide clearer explanation of public register implications
☐ Consider adding "What is an exemption?" help content at start

## SUMMARY

The delivered functionality successfully supports a first-time user through the exemption notification process. The enhanced date validation, clear task list, and logical flow work well. Main friction point remains coordinate entry, where technical anxiety could cause abandonment despite clear examples. The multi-step site details flow works but could benefit from progress indication. Overall, Sarah would likely complete the journey successfully but might need external help for coordinates or call support if confused about exemption eligibility.
