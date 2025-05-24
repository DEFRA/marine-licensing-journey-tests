# ML-1 Scenario Charter: Zofia's First Marine Exemption Journey

## Charter Definition

**CHARTER:** Investigate project name workflow using realistic first-timer scenario to discover usability barriers and guidance gaps

**Duration:** 120 minutes  
**Priority:** High  
**Charter Type:** Scenario-Enhanced Investigation

## Scenario Context

### **THEME**

Discover guidance gaps and usability barriers for users completely new to marine licensing and government digital services

### **SETUP**

- **Primary Persona:** Zofia (Novice Applicant)
- **User Context:** First marine licensing application, unfamiliar with regulatory terminology
- **Technology Context:** Using screen reader (NVDA), switching between mobile phone and desktop
- **Environmental Context:** Home office with interruptions, poor Wi-Fi connection
- **Emotional Context:** Anxious about getting it right, time pressure from project deadlines

### **REALISTIC PRESSURES**

- **Terminology confusion** - Marine licensing language is completely new
- **Technology friction** - Inconsistent device availability, assistive technology dependencies
- **Time pressure** - Project needs approval before seasonal restrictions begin
- **Interruptions** - Phone calls from contractors, family members asking questions
- **Information overload** - Multiple guidance documents, complex requirements

## Scenario Activities

### **Guided Realistic Actions**

#### **Initial Approach (Authentic Novice Behaviour)**

- Start application without reading all guidance materials first (realistic)
- Scan page quickly looking for familiar patterns from other government services
- Attempt to understand project name requirements through trial and error
- Use assistive technology to navigate page structure and find key information

#### **Project Name Entry with Realistic Confusion**

- Misinterpret "project name" as requiring official legal business name
- Enter overly technical marine engineering terminology thinking it's required
- Second-guess simple, clear project names as "not official enough"
- Attempt to include location details in project name field
- Try various formats: "Project: Marina Extension (Phase 1)" vs "Marina Extension" vs "Harbour View Marina Extension Project"

#### **Error Recovery and Help-Seeking**

- Make deliberate mistakes that novice users might reasonably make
- Search for help when terminology is unclear
- Try to contact support or find additional guidance
- Attempt to reference example project names from other sources
- Use browser back button and return to page with different approach

#### **Device and Context Switching**

- Start application on mobile phone while commuting
- Continue on desktop computer with screen reader
- Handle interruptions from phone calls mid-task
- Deal with Wi-Fi connection dropping during form completion
- Attempt to save progress and resume later from different device

### **Realistic Variations and Turbulence**

#### **Technology Friction**

- Simulate slow internet connection with timeouts
- Test screen reader compatibility across form interactions
- Switch between mobile Safari and desktop Chrome
- Handle browser autofill suggestions that may confuse context
- Simulate battery dying on mobile device mid-application

#### **User Context Variations**

- Phone interruption requiring 10-minute conversation break
- Neighbour asking for help, forcing 15-minute pause
- Confusion about whether this is the right government service
- Doubt about project eligibility requiring guidance research
- Multiple failed attempts leading to frustration and starting over

#### **Content and Guidance Challenges**

- Skip reading helper text initially (realistic behaviour)
- Misunderstand exemption vs full licence requirements
- Confuse marine licensing with planning permission requirements
- Struggle with coordinate entry having never used marine coordinates
- Interpret guidance literally, missing implied context

## Scenario Oracles

### **User Experience Quality Indicators**

#### **Positive Signals:**

- **Terminology clarity** - Marine licensing terms are explained in accessible language
- **Progressive guidance** - Help appears contextually when needed most
- **Error prevention** - Interface prevents common novice mistakes before they happen
- **Recovery support** - Clear path back from errors without losing progress
- **Confidence building** - User feels guided and supported, not abandoned

#### **Warning Signs:**

- **Cognitive overload** - Too much information presented simultaneously
- **Assumed knowledge** - Interface expects familiarity with marine licensing processes
- **Hidden functionality** - Key features or help not discoverable through normal interaction
- **Accessibility barriers** - Screen reader struggles with form structure or feedback
- **Frustration patterns** - User becomes stuck and considers abandoning application

### **Technical Quality Indicators**

#### **Accessibility Compliance:**

- Screen reader announces form labels, validation messages, and progress clearly
- Keyboard navigation works intuitively across all interactive elements
- Error messages are associated with form fields programmatically
- Help content is accessible through assistive technology

#### **Cross-Device Functionality:**

- Application state preserved across device switches
- Form data persists through interruptions and session timeouts
- Mobile interface adapts appropriately without losing functionality
- Network interruptions handled gracefully with clear recovery options

#### **Content Effectiveness:**

- Helper text reduces rather than increases user confusion
- Examples provided are relevant and helpful for project naming
- Error messages guide toward solution rather than just identifying problems
- Language appropriate for users unfamiliar with marine licensing

## Evidence Collection Framework

### **Discovery Documentation**

#### **User Journey Evidence:**

- **Decision points** - Where does Zofia hesitate or show uncertainty?
- **Friction points** - What slows down or confuses the user journey?
- **Cognitive load** - Which parts require too much mental effort for novices?
- **Help-seeking behaviour** - When and how does user try to get assistance?

#### **Accessibility Evidence:**

- **Screen reader interaction** - How well does assistive technology convey meaning?
- **Navigation patterns** - Can users find what they need without visual cues?
- **Error communication** - Are problems communicated clearly through accessibility APIs?
- **Content structure** - Does page structure support assistive technology users?

#### **Content Quality Evidence:**

- **Language clarity** - Which terms cause confusion for marine licensing novices?
- **Guidance effectiveness** - Does helper text actually help or add noise?
- **Example quality** - Are provided examples helpful and realistic?
- **Progress communication** - Does user understand where they are in the process?

### **Problem Classification**

#### **Critical Issues (Immediate Attention)**

- User cannot complete task due to accessibility barriers
- Complete confusion about requirements leading to abandonment
- Data loss during device switching or interruptions
- Error states that provide no recovery path

#### **Significant Issues (High Priority)**

- Terminology barriers causing multiple failed attempts
- Interface elements that don't work intuitively with assistive technology
- Guidance that increases rather than reduces user uncertainty
- Performance issues that disrupt flow on realistic connections

#### **Improvement Opportunities (Medium Priority)**

- Content that could be clearer for novice users
- Additional help options that would reduce anxiety
- Interface refinements that would improve efficiency
- Cross-device experience enhancements

## Follow-up Investigation Areas

### **Immediate Follow-ups**

- **Traditional charter** - Technical validation of any functional issues discovered
- **Accessibility charter** - Deeper investigation of assistive technology compatibility
- **Content review** - Evaluation of guidance effectiveness with user research team

### **Suggested Scenarios**

- **Amy efficiency comparison** - How does the same workflow feel for veteran users?
- **Cross-device deep dive** - Extended investigation of mobile-to-desktop workflows
- **Error recovery focus** - Specific scenario testing recovery from common mistakes

### **Automation Implications**

- Which realistic user behaviours should automation validate?
- What edge cases were discovered that need regression coverage?
- How can automated tests incorporate accessibility validation?

## Session Structure

### **Setup Phase (15 minutes)**

- Configure screen reader and test devices
- Set up interruption simulation (timer for phone calls)
- Prepare realistic project information and context
- Review Zofia persona background and motivations

### **Investigation Phase (90 minutes)**

- Execute scenario activities with full persona authenticity
- Maintain novice perspective throughout investigation
- Document discoveries in real-time using scenario oracles
- Adapt to findings while staying true to character

### **Debrief Phase (15 minutes)**

- Assess scenario realism and discovery quality
- Document key evidence using framework categories
- Identify critical issues requiring immediate attention
- Plan follow-up investigations and automation implications

---

**Related Resources:**

- **[ML-1 User Story](../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)** - Requirements and acceptance criteria
- **[Zofia Persona](../../test-strategy/domain-context/README.md#zofia-novice-applicant---accessibility--guidance-testing)** - Detailed persona background
- **[Domain Context](../../test-strategy/domain-context/README.md)** - Marine licensing user reality and testing implications
- **[Traditional ML-1 Charters](./ML-1-happy-path.md)** - Complementary technical investigations

_This scenario charter transforms testing from "does it work?" to "does it work for someone like Zofia under realistic conditions?"_
