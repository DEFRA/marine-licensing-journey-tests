# ML-1 Investigative Charter: Validation Scenarios

## Session Charter

**SESSION CHARTER:** Investigate project name validation robustness under realistic user pressure with comprehensive edge case and error recovery testing

**Duration:** 90 minutes  
**Priority:** High

## Scenario Context

### **THEME**

Test validation effectiveness and error recovery when users make realistic mistakes under authentic pressure conditions with varying experience levels

### **SETUP**

- **Mixed Personas:** Zofia (rushing novice), Amy (efficient veteran), Fatima (multitasking professional)
- **User Context:** Deadline pressure, multitasking, real-world interruptions
- **Technology Context:** Various devices, browsers, network conditions, copy-paste from other applications
- **Environmental Context:** Time pressure, interruptions, data from external systems
- **Validation Context:** Boundary testing, edge cases, malformed input, recovery scenarios

### **REALISTIC PRESSURES**

- **Deadline pressure** - Multiple applications due before environmental assessment deadline
- **Interruption handling** - Phone calls, emails, system notifications during data entry
- **Technology frustration** - Network issues, browser quirks, copy-paste formatting problems
- **Data complexity** - Project names from various sources with different formatting standards
- **Multi-application workflow** - Several project names needed in coordinated submission

## Investigation Focus

### **EXPLORE**

Project name validation effectiveness under realistic user conditions with comprehensive edge case coverage

### **WITH**

- Boundary testing (249, 250, 251+ characters), special characters, formatting edge cases
- Realistic user mistakes, interruption scenarios, deadline pressure simulation
- Cross-browser testing, mobile/desktop transitions, network disruption

### **TO DISCOVER**

- Validation robustness under realistic user pressure
- Error recovery effectiveness when users are stressed or interrupted
- Edge case handling with real-world data sources and user behaviour

## Realistic Activities

### **Pressure-Testing Validation**

#### **Deadline Rush Scenarios**

- Submit form quickly without careful reading (realistic veteran behaviour)
- Attempt to save partial data and return later during interruptions
- Copy project names from emails, documents, planning applications with various formatting
- Handle multiple project applications simultaneously with similar but distinct names

#### **Realistic Data Entry Patterns**

- **Copy-paste from external sources** - Planning applications, environmental reports, client emails
- **Mobile-to-desktop transitions** - Start on mobile, complete on desktop with different input methods
- **Interrupted workflows** - Phone calls during typing, urgent emails requiring immediate response
- **Multitasking scenarios** - Reference multiple documents while entering project name

#### **Boundary and Edge Case Testing**

##### **Character Limit Scenarios**

- **Exactly 250 characters** - Professional project descriptions from planning documents
- **Just over limit** - 251-255 characters with realistic project name content
- **Significantly over** - 300-500 characters from copied environmental impact statements
- **Test strings with realistic content:**
  - 245 chars: "Marine renewable energy installation offshore wind farm development project for sustainable electricity generation in designated marine planning area with environmental impact assessment compliance"
  - 250 chars: "Marine renewable energy installation offshore wind farm development project for sustainable electricity generation in designated marine planning area with environmental impact assessment compliance requirem"
  - 255 chars: "Marine renewable energy installation offshore wind farm development project for sustainable electricity generation in designated marine planning area with environmental impact assessment compliance requirements doc"

##### **Special Character and Formatting**

- **Unicode characters** - Project names with accented letters, environmental scientific symbols
- **Copy-paste formatting** - Content from Word documents, PDFs, emails with hidden characters
- **Line breaks and spacing** - Multi-line project descriptions, extra spaces from formatting
- **Business formatting** - Project codes, reference numbers, version indicators
- **Scientific notation** - Coordinates, measurements, technical specifications

##### **Empty and Edge States**

- **Empty field submission** - Rush to submit without noticing empty field
- **Whitespace only** - Accidental spaces from copy-paste operations
- **Single character** - Accidentally truncated copy-paste operations
- **Very short names** - Realistic but minimal project descriptions

### **Realistic Error Recovery Testing**

#### **Interruption During Error Handling**

- Receive validation error, get interrupted by phone call, return to fix issue
- Submit form with error, navigate away, return and attempt to fix
- Browser crash during error correction, test form state recovery
- Network interruption during error correction and resubmission

#### **Multi-Error Scenarios**

- Multiple validation errors simultaneously (empty + length, formatting + content)
- Fix one error but introduce another during correction process
- Complex copy-paste scenarios that introduce multiple formatting issues
- Cascading errors from attempting quick fixes under pressure

#### **Cross-Device Error Recovery**

- Encounter error on mobile, switch to desktop to fix
- Start correction on desktop, need to complete on mobile
- Share application link with colleague for help with error resolution
- Email application state for later completion when not under time pressure

## Evidence Framework

### **Validation Robustness Indicators**

#### **Positive Signals:**

- **Error clarity under pressure** - Messages remain helpful when users are stressed or rushing
- **Recovery pathway effectiveness** - Clear paths to fix problems without losing momentum
- **Boundary handling grace** - 250-character limit handled helpfully with character counting
- **Format tolerance** - System handles realistic copy-paste scenarios without frustration
- **Progressive validation** - Real-time feedback prevents submission errors where helpful

#### **Warning Signs:**

- **Pressure-point failures** - Validation becomes unclear or unhelpful when users are stressed
- **Recovery complexity** - Error fixing requires multiple steps or complex understanding
- **Data loss risks** - User input lost during error correction or page navigation
- **Inconsistent boundaries** - Character counting or validation varies across browsers/devices
- **Format intolerance** - Common copy-paste scenarios cause unexpected validation failures

### **User Experience Under Pressure**

#### **Stress Testing Quality:**

- **Interruption resilience** - Form state preserved during real-world interruptions
- **Error message accessibility** - Validation feedback remains clear when users are multitasking
- **Quick correction support** - Experienced users can fix errors efficiently
- **Novice error support** - First-time users can understand and resolve validation issues
- **Cross-device consistency** - Validation behaviour identical across user's device ecosystem

#### **Realistic Data Handling:**

- **Professional content support** - Real project names from planning/environmental contexts validate correctly
- **Copy-paste robustness** - Common external data sources work without formatting cleanup
- **Business workflow integration** - Validation supports professional multi-application workflows
- **Technical content tolerance** - Scientific, coordinate, and reference data handled appropriately

## Systematic Heuristic Application

### **Structure Focus (HTSM)**

- **Error presentation consistency** - Validation messages positioned and styled consistently
- **Form resilience** - Layout stability during error states and correction cycles
- **Navigation flow** - Error correction doesn't disrupt overall workflow progression

### **Behaviour Focus (HTSM)**

- **Real-time validation effectiveness** - Balance between helpful feedback and interruption
- **Submission robustness** - Form handling under various network and timing conditions
- **Error recovery patterns** - Multiple pathways for users to resolve validation issues

### **Data Focus (HTSM)**

- **Boundary accuracy** - Character limits enforced consistently across all input methods
- **Format preservation** - User data maintained correctly during validation and correction cycles
- **Special character support** - Unicode, professional formatting, scientific notation handling

## Discovery Documentation

### **Evidence Collection**

```
+ Positive findings (validation that works well under pressure)
- Issues found (validation failures, error recovery problems)
? Questions raised (unclear edge cases, inconsistent behaviour)
! Ideas generated (validation improvements, user experience enhancements)

PRESSURE TESTING EVIDENCE:
□ Deadline rush behaviour and validation effectiveness
□ Interruption handling and form state preservation
□ Multitasking impact on error recognition and correction
□ Cross-device validation consistency testing results

BOUNDARY TESTING EVIDENCE:
□ Character limit testing at 249, 250, 251+ characters with realistic content
□ Special character and Unicode handling assessment
□ Copy-paste scenario testing from various professional sources
□ Empty state and edge case validation effectiveness

ERROR RECOVERY EVIDENCE:
□ Error message clarity and actionability under realistic pressure
□ Recovery pathway effectiveness for different user experience levels
□ Data preservation during error correction cycles
□ Cross-browser and cross-device error handling consistency
```

### **Problem Classification**

#### **Critical Issues (Immediate Attention)**

- Validation failures that cause data loss or prevent task completion
- Error recovery problems that trap users in unresolvable states
- Boundary handling failures that accept invalid data or reject valid data

#### **Significant Issues (High Priority)**

- Error messages that become unclear or unhelpful under realistic user pressure
- Validation inconsistencies across browsers, devices, or input methods
- Copy-paste scenarios that fail with professional data sources

#### **Improvement Opportunities (Medium Priority)**

- Real-time validation enhancements that could prevent error cycles
- Character counting improvements that help users stay within limits
- Error recovery streamlining for common professional workflows

## Follow-up Investigation Areas

### **Immediate Automation Implications**

- Which boundary scenarios need continuous regression testing?
- What copy-paste edge cases should automation validate regularly?
- How can automated tests simulate realistic user pressure scenarios?

### **Related Investigation Sessions**

- **ML-1 Novice Discovery** - Compare validation experience across user experience levels
- **ML-1 Efficiency Patterns** - Understand validation impact on professional workflows
- **Cross-story validation** - Consistency testing across all marine licensing form validation

---

**Investigative Testing Approach:** This charter implements the **[Investigative Testing](../../test-strategy/investigative-testing/README.md)** framework  
**Related User Story:** [ML-1.provide.project.name.and.create.exemption.mdc](../../.cursor/user-stories/ML-1.provide.project.name.and.create.exemption.mdc)
