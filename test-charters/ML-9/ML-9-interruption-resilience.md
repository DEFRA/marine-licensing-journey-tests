# ML-9 Scenario Charter: Fatima's Interrupted Case Review Session

## Charter Definition

**CHARTER:** Execute realistic case officer multitasking scenario to test system behaviour under authentic workflow pressures and frequent interruptions

**Duration:** 120 minutes  
**Priority:** High  
**Charter Type:** Scenario-Enhanced Investigation

## Scenario Context

### **THEME**

Test system behaviour when case officers work under time pressure with multiple interruptions during complex exemption application reviews

### **SETUP**

- **Primary Persona:** Fatima (Case Officer)
- **Work Context:** End-of-day crunch with multiple pending exemption notifications requiring review
- **Technology Context:** Multiple browser tabs, office computer with dual monitors, phone system
- **Environmental Context:** Busy MMO office with colleague questions and urgent phone calls
- **Pressure Context:** Seasonal deadline approaching, several time-sensitive applications need same-day decisions

### **REALISTIC PRESSURES**

- **Time pressure** - Multiple applications due for decision by end of business day
- **Interruptions** - Urgent phone calls from applicants, colleague questions, manager requests
- **Cognitive load** - Switching between different exemption types and regulatory requirements
- **System complexity** - Multiple external systems for environmental data, planning information, payment status
- **Quality requirements** - Must maintain accuracy and completeness despite pressure

## Scenario Activities

### **Guided Realistic Actions**

#### **Multi-Application Case Management**

- Open 3-4 different exemption notifications simultaneously in separate browser tabs
- Switch between applications while making notes and cross-referencing guidance
- Compare similar applications for consistency in decision-making
- Access task list view to prioritise applications by urgency and complexity
- Update application status while maintaining accurate audit trail

#### **Realistic Interruption Simulation**

- **Phone call interruption:** Stop mid-review to handle applicant question (10 minutes)
- **Colleague question:** Brief colleague about complex exemption eligibility (5 minutes)
- **Manager request:** Provide urgent status update on specific application (3 minutes)
- **System alert:** Respond to notification about external system issue (2 minutes)
- **Email urgency:** Handle high-priority email requiring immediate response (7 minutes)

#### **Information Integration and Research**

- Cross-reference applications with environmental protection databases
- Check previous similar decisions for consistency
- Access external planning system data for location validation
- Verify applicant payment status and documentation completeness
- Search internal knowledge base for regulatory guidance on edge cases

#### **Decision-Making Under Pressure**

- Make rapid assessment of straightforward applications
- Flag complex applications requiring additional review time
- Document decision rationale while maintaining quality standards
- Handle urgent applications requiring same-day resolution
- Communicate decisions and next steps to applicants promptly

### **Realistic Variations and Turbulence**

#### **Technology Friction**

- **Network slowdown** - External systems responding slowly during peak hours
- **Browser issues** - Tab crashes with unsaved work, need to restore session
- **Integration delays** - Waiting for external database queries to complete
- **Multiple systems** - Switching between marine licensing, planning, environmental databases
- **Performance degradation** - System slowing down with multiple applications open

#### **Workflow Complications**

- **Incomplete applications** - Missing information discovered mid-review requiring applicant contact
- **Complex cases** - Applications requiring specialist knowledge or additional consultation
- **System maintenance** - Scheduled downtime affecting external integration during busy period
- **Data conflicts** - Inconsistencies between different system databases requiring resolution
- **Process changes** - New regulatory guidance affecting application assessment criteria

#### **Communication Pressures**

- **Urgent phone calls** - Applicants with seasonal deadline concerns requiring immediate attention
- **Stakeholder requests** - Planning department needing urgent consultation on specific application
- **Management reporting** - Requests for status updates and completion estimates
- **Colleague support** - Less experienced officers needing guidance on complex applications
- **External queries** - Environmental agencies requesting additional information

## Scenario Oracles

### **System Reliability Quality Indicators**

#### **Positive Signals:**

- **Data integrity** - Information preserved correctly across task switching and interruptions
- **Session persistence** - Work in progress maintained through browser issues and timeouts
- **Performance consistency** - System remains responsive with multiple applications open
- **Integration reliability** - External system connections stable and provide accurate data
- **Audit trail accuracy** - All actions logged correctly for compliance and review purposes

#### **Warning Signs:**

- **Data corruption** - Information lost or altered during multitasking operations
- **Session fragility** - Work lost when switching between applications or handling interruptions
- **Performance degradation** - System becomes unusably slow with realistic usage patterns
- **Integration failures** - External systems unavailable or providing inconsistent data
- **Audit gaps** - Actions not properly recorded or tracked for compliance purposes

### **User Experience Quality Indicators**

#### **Workflow Efficiency:**

- **Quick navigation** - Efficient switching between applications and task views
- **Context preservation** - Easy to resume work after interruptions without losing place
- **Information accessibility** - Key details visible without excessive clicking or scrolling
- **Status clarity** - Current application state and required actions clearly communicated
- **Progress tracking** - Easy to see completion status across multiple applications

#### **Cognitive Load Management:**

- **Information organisation** - Related data grouped logically to reduce mental effort
- **Decision support** - Guidance and examples available when needed for complex cases
- **Error prevention** - Interface prevents common mistakes during rushed work
- **Workflow continuity** - Smooth transitions between different application types and requirements
- **Context switching** - Minimal confusion when returning to applications after interruptions

## Evidence Collection Framework

### **Discovery Documentation**

#### **Multitasking Evidence:**

- **Task switching effectiveness** - How well does the interface support jumping between applications?
- **Context preservation** - What information is retained when returning to interrupted work?
- **Performance impact** - How does system behaviour change with realistic concurrent usage?
- **Data integrity** - Is information preserved accurately across multitasking scenarios?

#### **Interruption Recovery Evidence:**

- **Session resilience** - How well does the system handle unexpected closures and timeouts?
- **Work preservation** - What happens to unsaved changes during interruptions?
- **Navigation efficiency** - How quickly can users return to their previous state?
- **Context restoration** - What information helps users remember where they left off?

#### **Decision-Making Support Evidence:**

- **Information availability** - Is key data accessible when needed for decisions?
- **Consistency tools** - Can users easily compare similar applications for consistent decisions?
- **Documentation efficiency** - How easy is it to record decision rationale under pressure?
- **Communication integration** - How well does the system support contacting applicants and stakeholders?

### **Problem Classification**

#### **Critical Issues (Immediate Attention)**

- Data loss during normal multitasking operations
- System crashes or severe performance degradation under realistic load
- Audit trail gaps that compromise compliance requirements
- Complete inability to access external integration data when needed

#### **Significant Issues (High Priority)**

- Workflow inefficiencies that significantly slow down case processing
- Interface confusion that leads to errors in decision-making
- Performance issues that disrupt flow during time-sensitive work
- Integration problems that require manual workarounds

#### **Improvement Opportunities (Medium Priority)**

- Interface enhancements that would reduce cognitive load
- Performance optimisations for concurrent usage patterns
- Workflow improvements that would increase processing efficiency
- Better support for handling interruptions and context switching

## Follow-up Investigation Areas

### **Immediate Follow-ups**

- **Traditional performance charter** - Technical validation of any performance issues discovered
- **Integration charter** - Deeper investigation of external system reliability
- **Data integrity charter** - Focused testing of data preservation across multitasking scenarios

### **Suggested Scenarios**

- **Peak load scenario** - Testing during maximum concurrent user periods
- **System maintenance scenario** - Workflow continuation during planned downtime
- **Training scenario** - How well does the system support training new case officers?

### **Automation Implications**

- Which multitasking patterns should automation validate?
- What performance benchmarks need automated monitoring?
- How can automated tests simulate realistic concurrent usage?

## Session Structure

### **Setup Phase (15 minutes)**

- Configure multiple browser tabs and external system access
- Set up interruption simulation (timer for phone calls, colleague questions)
- Prepare realistic exemption application data for review
- Review Fatima persona background and typical workday pressures

### **Investigation Phase (90 minutes)**

- Execute scenario activities with authentic case officer workflow
- Maintain realistic time pressure throughout investigation
- Document discoveries in real-time using scenario oracles
- Handle planned interruptions while staying in character
- Test both urgent and routine application processing patterns

### **Debrief Phase (15 minutes)**

- Assess scenario realism and workflow authenticity
- Document key evidence using framework categories
- Identify critical issues requiring immediate attention
- Plan follow-up investigations and performance monitoring needs

---

**Related Resources:**

- **[ML-9 User Story](../../.cursor/user-stories/ML-9.view.task.list.mdc)** - Requirements and acceptance criteria
- **[Fatima Persona](../../test-strategy/domain-context/README.md#fatima-case-officer---integration-testing-focus)** - Detailed persona background and workflow patterns
- **[Domain Context](../../test-strategy/domain-context/README.md)** - Real MMO staff work patterns
- **[Traditional ML-9 Charters](./ML-9-navigation.md)** - Complementary technical investigations

_This scenario charter reveals how the task list and navigation work under the authentic pressures of real case officer work._
