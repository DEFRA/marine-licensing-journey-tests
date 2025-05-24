# Scenario Testing - Breaking the Test Case Addiction

> **📖 Source Attribution**  
> This approach is based on **Michael Bolton's** "Breaking the Test Case Addiction" series and work by **James Bach** and **Geordie Keitt** on scenario-driven testing methods.

## 🎯 Philosophy: Testing Through Realistic Use

Scenario testing **replaces scripted test cases** with rich, realistic user investigation sessions. Instead of following predetermined steps, testers **explore authentic user situations** with guided flexibility.

### **Why Scenarios Over Test Cases?**

**Test Cases:**

- ❌ Predetermined steps that miss real-world variation
- ❌ Binary pass/fail that oversimplifies quality
- ❌ Written once, become outdated quickly
- ❌ Don't capture the complexity of actual use

**Scenarios:**

- ✅ **Rich context** that mirrors real user situations
- ✅ **Guided exploration** that encourages discovery
- ✅ **Flexible execution** that adapts to findings
- ✅ **Operational coverage** of how people actually work

## 🎭 Scenario Charter Framework

### **Standard Charter Structure**

```
THEME: [Clear mission statement - what are we investigating?]

SETUP: [Specific preparation and context for this session]

ACTIVITIES: [Guided but flexible actions to take]
- Mix of specific suggestions and open exploration
- Focus areas for investigation
- Realistic task patterns that users would follow

ORACLES: [How to recognise problems and quality indicators]
- Specific consistency patterns to watch for
- Domain-specific success criteria
- Quality indicators and warning signs

VARIATIONS: [Ways to introduce turbulence and stress]
- Real-world friction and obstacles
- Edge conditions and stress factors
- Multiple user scenarios and contexts
```

## 🏗️ General Setup Protocol

### **Universal Session Preparation**

This preparation applies to **every scenario session**:

#### **Oracle Awareness**

Testers must understand **how to recognise problems** using:

- **Consistency patterns** (FEW HICCUPPS framework)
- **Domain-specific quality indicators**
- **User experience warning signs**
- **Performance and reliability markers**

#### **Investigation Mindset**

- **Simultaneous learning** - Discover how the system actually works
- **Adaptive testing** - Change approach based on what you find
- **User empathy** - Think from the persona's perspective
- **Quality focus** - Look for problems that matter to stakeholders

#### **Evidence Collection**

- **Detailed notes** with timestamps and context
- **Screenshots** of unusual or interesting behaviour
- **Screen recordings** for complex interactions
- **Performance observations** and timing notes

## 🎪 Marine Licensing Scenario Library

### **Core User Journey Scenarios**

#### **ML-01: Amy's Efficient Repeat Application**

```
THEME: Investigate efficiency and data reuse for experienced marine operators
submitting similar exemption applications

SETUP:
- Experienced user persona (Amy) with previous exemption history
- Multiple similar projects requiring exemptions
- Keyboard-focused interaction style, speed-oriented approach
- Background tabs with reference materials and previous applications

ACTIVITIES:
- Access previous exemption applications for reference
- Attempt to copy/reuse information from similar past projects
- Use keyboard navigation exclusively for some tasks
- Complete application in some way that prioritises speed over thoroughness
- For some sections, rely on auto-complete and saved preferences
- Search for specific application details across multiple submissions

ORACLES:
- Previous application data is accessible and searchable
- Information can be reused appropriately without corruption
- Keyboard navigation works consistently across all pages
- Auto-complete suggestions are accurate and relevant
- Search functionality finds relevant historical data quickly
- User preferences persist across sessions

VARIATIONS:
- Multiple browser tabs with different applications open
- Quick switching between draft and submitted applications
- Time pressure scenarios (seasonal deadline approaching)
- Network interruptions during data copying operations
- Different browsers with saved form data
```

#### **ML-02: Zofia's Confused First-Timer Journey**

```
THEME: Discover guidance gaps and usability barriers for users completely
new to marine licensing and government digital services

SETUP:
- First-time user with no marine licensing knowledge
- Screen reader or other assistive technology active
- Mobile device for some interactions, desktop for others
- Real-world distractions and interruptions

ACTIVITIES:
- Start without reading all guidance materials first
- Make reasonable misinterpretations of marine licensing terminology
- Enter location data using various coordinate formats
- Upload documents in various formats, some incorrect initially
- Attempt to save progress and return later from different device
- For some fields, enter plausible but incorrect information
- Use help features when confused or stuck

ORACLES:
- Error messages are understandable to non-experts
- Help appears contextually when most needed
- Accessibility features work consistently
- Progress can be saved and resumed reliably
- Terminology is explained appropriately for novices
- Recovery from mistakes doesn't lose significant work

VARIATIONS:
- Different assistive technologies (screen readers, voice control)
- Various devices and screen sizes
- Poor internet connectivity with timeouts
- Different browsers and operating systems
- Users with varying levels of digital literacy
```

#### **ML-03: Fatima's Multi-Tasking Case Review**

```
THEME: Test system behaviour under realistic case officer workflow pressures
with multiple applications and frequent interruptions

SETUP:
- Case officer persona managing multiple pending applications
- Phone calls and email interruptions throughout session
- Multiple browser tabs for different systems and applications
- End-of-day or deadline pressure context

ACTIVITIES:
- Review 3-4 different exemption applications simultaneously
- Switch between applications while taking notes
- Copy information between systems and reference materials
- Answer mock interruptions leaving forms partially completed
- Search previous decisions for consistency checking
- For some applications, update status while maintaining accuracy
- Access external systems for environmental or planning data

ORACLES:
- Data integrity maintained across task switching
- Partially completed work is preserved properly
- Search functions remain accurate under multitasking
- System performance stable with multiple sessions
- Audit trails capture all actions correctly
- Integration with external systems works reliably

VARIATIONS:
- Network interruptions during critical updates
- Browser crashes with unsaved work in progress
- Multiple users accessing the same application data
- System maintenance windows during busy periods
- Urgent applications requiring immediate attention
```

### **Technical Challenge Scenarios**

#### **ML-04: Document Upload Chaos**

```
THEME: Stress-test document handling with realistic file management challenges

SETUP:
- Various document types, sizes, and formats
- Poor internet connection simulation
- Multiple devices and file storage locations
- Real-world document management constraints

ACTIVITIES:
- Upload documents in various formats (PDF, Word, images, etc.)
- Attempt uploads with files that are too large
- Try uploading corrupted or password-protected files
- Upload same document multiple times
- For some uploads, interrupt the process mid-transfer
- Attempt uploads from different devices and cloud services

ORACLES:
- File validation provides clear, helpful feedback
- Upload progress is visible and accurate
- Failed uploads can be retried without data loss
- Large files are handled gracefully
- Multiple document versions are managed clearly
- Error recovery doesn't require starting over

VARIATIONS:
- Very slow internet connections
- Mobile vs desktop upload experiences
- Different cloud storage integration
- Bulk document uploads
- Accessibility with screen readers during upload
```

### **Integration & System Boundary Scenarios**

#### **ML-05: External System Integration Reality**

```
THEME: Investigate real-world integration challenges with planning systems,
environmental databases, and payment services

SETUP:
- Applications requiring data from multiple external systems
- Simulated external system slowdowns or failures
- Complex applications spanning multiple jurisdictions
- Payment processing with various methods

ACTIVITIES:
- Submit applications requiring environmental data lookups
- Attempt applications when external systems are slow/unavailable
- Process payments using different methods and amounts
- Access planning system data for location validation
- For some applications, encounter timeout scenarios
- Try applications that cross system boundaries

ORACLES:
- Clear feedback when external systems are unavailable
- Graceful degradation when integrations fail
- Payment processing is secure and reliable
- Data synchronisation between systems is accurate
- User workflows continue despite integration issues
- Error messages clearly explain external system problems

VARIATIONS:
- Different external system availability patterns
- Payment failures and retry scenarios
- Data conflicts between integrated systems
- Timeout handling during peak usage
- Cross-jurisdiction data access requirements
```

## 🧪 Activity Pattern Templates

### **Role-Based Investigation Patterns**

#### **Novice User Patterns**

- **Misunderstand terminology** - Use reasonable but incorrect interpretations
- **Skip guidance** - Attempt tasks without reading instructions first
- **Make input errors** - Enter plausible but incorrect data formats
- **Seek help frequently** - Use support features when confused
- **Abandon and return** - Save progress and resume from different contexts

#### **Expert User Patterns**

- **Seek efficiency** - Use keyboard shortcuts and rapid navigation
- **Reuse previous work** - Copy/reference past applications and data
- **Multi-task heavily** - Work with multiple applications simultaneously
- **Expect consistency** - Compare with previous system behaviour
- **Work under pressure** - Complete tasks with time constraints

#### **System Administrator Patterns**

- **Monitor multiple users** - Track various user activities and issues
- **Handle edge cases** - Deal with unusual applications and exceptions
- **Troubleshoot problems** - Investigate and resolve user-reported issues
- **Manage data integrity** - Ensure consistency across user actions
- **Support users** - Provide guidance and resolve confusion

### **Data Lifecycle Investigation**

#### **Creation Scenarios**

- **New applications** with various complexity levels
- **Document uploads** with different formats and sizes
- **User account creation** with various persona types
- **Data validation** with edge cases and boundary values

#### **Modification Scenarios**

- **Application amendments** with varying change types
- **Status updates** by different user roles
- **Document replacement** and version management
- **User preference changes** across sessions

#### **Retrieval Scenarios**

- **Search functionality** with different criteria and data volumes
- **Historical data access** across various time periods
- **Cross-reference lookup** between related applications
- **Report generation** with different formats and filters

#### **Integration Scenarios**

- **Data synchronisation** between connected systems
- **Export/import operations** with external systems
- **Backup and recovery** procedures under various conditions
- **Audit trail access** for compliance and investigation

## 🎯 Turbulence & Friction Simulation

### **Real-World Disruption Patterns**

#### **Technical Friction**

- **Network interruptions** - Timeout scenarios and connection drops
- **Browser issues** - Crashes, updates, compatibility problems
- **Device constraints** - Battery life, storage space, processing limits
- **Software conflicts** - Plugin issues, security software interference

#### **User Context Friction**

- **Interruptions** - Phone calls, urgent emails, colleague questions
- **Time pressure** - Deadlines, seasonal restrictions, urgent approvals
- **Cognitive load** - Complex applications, multiple tasks, information overload
- **Environmental factors** - Poor lighting, noise, uncomfortable workspace

#### **Process Friction**

- **Changing requirements** - Mid-application rule changes or clarifications
- **Missing information** - Unavailable documents, pending approvals
- **External dependencies** - Waiting for third-party data or decisions
- **System maintenance** - Planned downtime during critical work periods

## 📋 Debrief & Evidence Framework

### **Post-Scenario Evaluation**

#### **Coverage Assessment Questions**

1. **Breadth** - Did we explore the intended functional areas adequately?
2. **Depth** - Did we investigate edge cases and unusual conditions?
3. **Realism** - How well did the scenario match actual user situations?
4. **Discovery** - What unexpected behaviours or issues did we find?

#### **Quality Evidence Collection**

**User Experience Evidence:**

- **Friction points** - Where do workflows break down or slow significantly?
- **Confusion patterns** - What causes users to make mistakes or get lost?
- **Efficiency barriers** - What prevents experienced users from working quickly?
- **Accessibility gaps** - Where do assistive technologies struggle?

**Technical Evidence:**

- **Performance patterns** - How does the system behave under realistic load?
- **Integration reliability** - How well do connected systems actually work?
- **Data integrity** - Is information preserved correctly across all scenarios?
- **Error handling** - How well does the system recover from problems?

**Business Value Evidence:**

- **User satisfaction** - Can people accomplish their goals effectively?
- **Regulatory compliance** - Are legal requirements met in practice?
- **Operational efficiency** - Does the system support actual work patterns?
- **Risk mitigation** - Are potential problems identified and managed?

### **Scenario Evolution**

#### **Iterative Improvement**

- **Refine based on findings** - Update scenarios as understanding grows
- **Add discovered variations** - Include new turbulence patterns found
- **Enhance oracle sensitivity** - Improve problem detection capabilities
- **Update user contexts** - Reflect evolving real-world usage patterns

#### **Coverage Expansion**

- **New user roles** - Add personas as user base expands
- **Emerging workflows** - Include new business processes and integrations
- **Technology changes** - Update for new devices, browsers, assistive technologies
- **Regulatory updates** - Adapt scenarios for changing compliance requirements

## 🌟 Integration with Existing Test Strategy

### **Scenario Testing Within the Test Pyramid**

- **Unit/Component Tests** - Automated validation of individual functions
- **Integration Tests** - Automated validation of system connections
- **Scenario Tests** - **Human investigation of realistic use patterns**
- **Heuristic Exploration** - Systematic discovery using testing heuristics

### **Integration with Session-Based Testing**

> **📖 For Structured Session Management**  
> See **[Session-Based Testing](../session-based-testing/README.md)** for timeboxed session structure that perfectly complements rich scenario content.

**Scenarios provide the "what to test"**, whilst **session-based testing provides the "how to manage it"**:

```
Scenario Framework:           SBTM Structure:              Combined Approach:
├── Rich user contexts  +    ├── 90-minute sessions  =   ├── Focused realistic testing
├── Authentic pressures      ├── Clear charters           ├── Structured user empathy
├── Guided flexibility       ├── Uninterrupted focus      ├── Accountable discovery
└── Evidence collection      └── Reviewable outcomes      └── Business-relevant insights
```

#### **Scenarios as Session Content**

Instead of traditional session charters, use **scenario-enhanced sessions**:

**Traditional Session:**

```
CHARTER: Test project name validation
DURATION: 90 minutes
WITH: Various inputs, boundary values
TO DISCOVER: Validation problems, error handling issues
```

**Scenario-Enhanced Session:**

```
CHARTER: Execute ML-02 "Zofia's Confused First-Timer" scenario
DURATION: 90 minutes
SCENARIO THEME: Discover guidance gaps for marine licensing novices
REALISTIC CONTEXT: Assistive technology, device switching, terminology confusion
TO DISCOVER: Usability barriers, guidance effectiveness, accessibility gaps
```

#### **Session Structure for Scenarios**

- **Setup (10 mins)** - Configure scenario context, personas, friction elements
- **Investigation (70 mins)** - Execute scenario activities with guided flexibility
- **Debrief (10 mins)** - Assess scenario completion, document evidence, plan follow-up

#### **Benefits of SBTM + Scenarios**

- **Time management** - Scenarios stay focused within structured sessions
- **Accountability** - Rich scenario discoveries become trackable and reviewable
- **Coverage planning** - Scenario work integrates with project timelines
- **Team coordination** - Session management makes scenario testing scalable

> **📚 Implementation Guide**  
> See **[Scenario Integration in SBTM](../session-based-testing/README.md#-integration-with-scenario-testing)** for detailed guidance on combining approaches, charter templates, and migration paths.

### **Complementing Automation**

Scenarios discover what automation should validate:

- **User workflow patterns** identified in scenarios become automation targets
- **Edge cases** found through exploration become regression test cases
- **Performance baselines** established through realistic usage scenarios
- **Integration failure modes** discovered through turbulence testing

### **Supporting Continuous Delivery**

- **Pre-release validation** - Run key scenarios before deployment
- **Post-deployment verification** - Confirm realistic usage still works
- **User acceptance support** - Provide evidence for stakeholder confidence
- **Risk communication** - Share discoveries that matter to decision-makers
