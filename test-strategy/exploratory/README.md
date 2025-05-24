# Exploratory Testing - Systematic Investigation & Discovery

This section covers **systematic exploratory testing** approaches that complement automation and uncover insights that scripted tests might miss.

## 🔍 What is Exploratory Testing?

Exploratory testing is **simultaneous learning, test design, and test execution** - a thoughtful approach to investigation where testers:

- **Learn** about the application through interaction
- **Design** tests based on what they discover
- **Execute** tests and observe outcomes
- **Adapt** their approach based on findings

## 🎯 Why Exploratory Testing Matters

### **Automation Gaps**

Even comprehensive automation can miss:

- **Usability issues** - How does the interface actually feel to use?
- **Edge case combinations** - Unexpected interactions between features
- **Performance quirks** - Subtle slowdowns or inconsistencies
- **User journey pain points** - Where do real users struggle?

### **Marine Licensing Context**

Exploratory testing is crucial for:

- **Complex regulatory requirements** - Understanding compliance edge cases
- **User accessibility needs** - Testing with real assistive technologies
- **Data quality issues** - Discovering validation gaps with real-world data
- **Integration problems** - Finding issues between interconnected systems

## 🎭 Scenario Testing - Rich, Realistic User Investigation

> **📖 Source Attribution**  
> The **scenario testing approach** described here is based on the work of **Michael Bolton** and **James Bach**, particularly their approach to breaking addiction to scripted test cases in favour of more exploratory, scenario-driven testing.

### **What is Scenario Testing?**

Scenario testing uses **rich, elaborate documentation** that guides testers to explore, experiment, and gain experience with the product through **realistic user roles and situations**. It goes beyond simple test charters to create comprehensive investigation frameworks.

### **Core Principles**

- **Real-world use patterns** - Including interruptions, distractions, and mistakes
- **User role authenticity** - Detailed personas with specific contexts and pressures
- **Operational coverage** - Testing how people actually use the product
- **Guided flexibility** - Structured approach that encourages discovery

### **Scenario Charter Structure**

Each scenario follows a structured format:

```
THEME: [One to three-line mission statement]

SETUP: [Specific preparation for this scenario]

ACTIVITIES: [Guided but flexible actions]
- Specific suggestions with room for variation
- Focus areas for investigation
- Realistic task patterns

ORACLES: [How to recognise problems]
- Specific consistency patterns to watch for
- Domain-specific success criteria
- Quality indicators

VARIATIONS: [Ways to introduce turbulence]
- Stress factors and edge conditions
- Real-world friction simulation
- Multiple user scenarios
```

### **Marine Licensing Scenario Examples**

#### **Scenario: Fatima's Busy Afternoon (Case Officer Pressure Testing)**

```
THEME: Investigate system behaviour when case officers work under time pressure
with multiple interruptions during complex exemption reviews

SETUP:
- Multiple exemption applications pending review
- Phone calls and emails interrupting workflow
- Browser tabs for different systems (planning, environmental, payment)
- End-of-day deadline pressure

ACTIVITIES:
- Switch between 3-4 applications while reviewing details
- Answer mock phone calls mid-task (leave forms partially completed)
- Copy/paste information between systems and applications
- Search for similar previous cases for consistency
- For some applications, simulate urgent requests requiring immediate attention
- Update application status in some way while maintaining record accuracy

ORACLES:
- Data doesn't get corrupted when switching between tasks
- Partially completed forms are preserved properly
- Search functionality remains accurate under pressure
- System performance doesn't degrade with multiple tabs/sessions
- Audit trail captures all actions correctly

VARIATIONS:
- Network interruptions during critical updates
- Browser crashes with unsaved work
- Multiple users accessing the same application simultaneously
- Time-sensitive applications requiring same-day decisions
- System updates/maintenance windows during busy periods
```

#### **Scenario: Zofia's First Marine Exemption (Novice User Journey)**

```
THEME: Discover usability barriers and guidance gaps for users completely
new to marine licensing and government digital services

SETUP:
- First-time applicant with no marine licensing experience
- Using screen reader or other assistive technology
- Mobile device for some sessions, desktop for others
- Real-world distractions (phone calls, children, poor connectivity)

ACTIVITIES:
- Start application without reading guidance thoroughly
- Make deliberate misinterpretations of marine licensing terminology
- Enter coordinates using various formats and reference systems
- Upload documents in wrong formats initially, then correct
- Attempt to save progress and return later
- For some forms, enter data that's technically correct but misunderstands intent
- Try to get help using available support channels

ORACLES:
- Error messages are comprehensible to non-experts
- Required vs optional fields are clearly distinguished
- Help content appears at the right moments
- Recovery from mistakes doesn't lose significant progress
- Accessibility features work consistently across all pages
- Language and terminology are appropriate for target audience

VARIATIONS:
- Use different assistive technologies (screen readers, voice control)
- Test on different devices with varying screen sizes
- Simulate poor internet connections with frequent dropouts
- Use with different browsers and operating systems
- Test with users who have different levels of digital literacy
```

### **Activity Patterns for Marine Licensing**

#### **Role-Based Investigation**

- **Assume specific user roles** with authentic pressures and contexts
- **Test for ease of learning** with genuinely novice users
- **Test for ease of use** with experienced users seeking efficiency
- **Make deliberate mistakes** that users in each role might reasonably make

#### **Data Lifecycle Testing**

Follow marine licensing data through complete lifecycles:

- **Creating** - New exemption applications, environmental evidence uploads
- **Revising** - Application amendments, additional information requests
- **Retrieving** - Searching previous applications, status checking
- **Updating** - Status changes, condition modifications
- **Merging** - Combining related applications or evidence
- **Archiving** - Completed applications, expired exemptions
- **Recovering** - Retrieving archived data, audit trails

#### **Turbulence & Friction Simulation**

Introduce realistic friction:

- **Interruptions** - Phone calls, urgent emails, system notifications
- **Distractions** - Multiple browser tabs, background applications
- **Technical obstacles** - Slow connections, browser crashes, system updates
- **Process branching** - Changing requirements mid-application
- **Time pressure** - End-of-season deadlines, urgent environmental concerns

#### **Complex Integration Testing**

- **Multiple system instances** - Different staff accessing same applications
- **Competing priorities** - Resource contention, deadline conflicts
- **Platform variations** - Different devices, browsers, network conditions
- **Workflow reproduction** - Mimicking patterns from paper-based processes

### **Debriefing & Coverage Validation**

#### **Post-Scenario Review Process**

After each scenario session:

1. **Coverage Assessment** - Were the intended areas explored adequately?
2. **Discovery Documentation** - What unexpected behaviours were found?
3. **Pattern Recognition** - Are there recurring themes across scenarios?
4. **Risk Evaluation** - Which findings represent the highest user impact?
5. **Follow-up Planning** - What areas need deeper investigation?

#### **Quality Evidence Collection**

Document evidence beyond just bug reports:

- **User experience insights** - Where do real workflows break down?
- **Performance patterns** - How does the system behave under realistic load?
- **Accessibility findings** - Real-world assistive technology compatibility
- **Integration discoveries** - How well do connected systems actually work together?

## 🧠 Session-Based Test Management (SBTM)

> **📖 For comprehensive guidance on session-based exploratory testing, see our detailed guide: [Session-Based Testing](../session-based-testing/README.md)**
>
> **🎬 For rich scenario content within sessions, see: [Scenario Testing Integration](../session-based-testing/README.md#-integration-with-scenario-testing)**

### **SBTM + Scenarios: A Powerful Combination**

**Session-based testing provides structure**, whilst **scenario testing provides rich content**:

```
SBTM Framework              +    Scenario Content           =    Enhanced Discovery
├── 90-minute timeboxes     │    └── Rich user contexts     │    └── Focused realistic testing
├── Clear charters         │    └── Authentic pressures    │    └── Structured user empathy
├── Uninterrupted focus    │    └── Guided flexibility     │    └── Deep investigation
└── Reviewable outcomes    │    └── Evidence frameworks    │    └── Business-relevant insights
```

### **Charter-Driven Sessions**

Each exploratory session has a clear **charter** that defines:

```
EXPLORE: [Area of the application]
WITH: [Tools, data, personas, techniques]
TO DISCOVER: [Types of information we want to learn]
```

**Enhanced with scenarios**, charters become much richer:

```
EXPLORE: Project name workflow under realistic conditions
WITH: Zofia persona, assistive technology, interruptions, terminology confusion
TO DISCOVER: Usability barriers, guidance gaps, error recovery effectiveness

SCENARIO CONTEXT:
- Deliberately misinterpret marine licensing terms
- Start without reading guidance (realistic novice behaviour)
- Switch between devices mid-task
- Simulate real-world distractions and time pressure
```

### **Session Structure**

- **Duration**: 90-120 minutes (focused attention span)
- **Preparation**: 10 minutes setup and context gathering
- **Exploration**: 70-90 minutes active investigation
- **Debrief**: 10-15 minutes documenting findings

**With scenario integration**:

- **Setup**: Configure realistic scenario context (personas, devices, friction)
- **Investigation**: Execute scenario activities with guided flexibility
- **Debrief**: Include scenario-specific insights and evidence collection

### **Example Charter: First-Time User Journey**

#### **Traditional Charter:**

```
EXPLORE: Exemption notification workflow
WITH: Novice user persona (Zofia), unfamiliar terminology, complex guidance
TO DISCOVER: Usability barriers, confusing language, abandoned journey points

Focus Areas:
- Where does guidance become unclear?
- What terminology causes confusion?
- Where might users give up?
- How effective are error messages?
```

#### **Scenario-Enhanced Charter:**

```
EXPLORE: Exemption notification workflow using ML-02 "Zofia's Confused First-Timer"
WITH: Full scenario context - assistive technology, device switching, realistic pressures
TO DISCOVER: Complete user experience under authentic conditions

SCENARIO CONTEXT:
THEME: Discover guidance gaps for users completely new to marine licensing
SETUP: Screen reader active, mobile/desktop switching, real-world distractions
REALISTIC ACTIVITIES:
- Start without reading all guidance (realistic behaviour)
- Misinterpret marine licensing terminology deliberately
- Enter location data in various formats, recover from mistakes
- Save progress and resume from different device
- Use help features when genuinely confused

SCENARIO ORACLES:
- Error messages understandable to non-experts
- Help appears contextually when most needed
- Accessibility features work consistently
- Progress preserved across devices and sessions
- Recovery from mistakes doesn't lose significant work
```

### **Integration Benefits**

**Why combine SBTM with scenarios?**

- **Better time management** - Scenarios provide rich content within structured sessions
- **Enhanced accountability** - Rich discoveries become trackable and reviewable
- **Realistic focus** - Scenario contexts keep testing grounded in real user needs
- **Evidence quality** - Scenario oracles improve problem detection and business relevance
- **Team coordination** - SBTM planning integrates scenario work with project timelines

> **📚 Learn More**  
> See **[Session-Based Testing Guide](../session-based-testing/README.md)** for detailed implementation guidance, including scenario-enhanced charter templates, debrief frameworks, and migration paths.

## 🎭 Persona-Driven Exploration

### **Using Marine Licensing Personas**

#### **Fatima (Case Officer) - System Integration Focus**

```
EXPLORE: Back-office case management views
WITH: Real exemption data, multiple browser tabs, interruptions
TO DISCOVER: Workflow efficiency, data integration gaps, support needs

Investigation Questions:
- How quickly can I find specific exemption details?
- What information is missing when helping applicants?
- Where does the system slow down my workflow?
```

#### **Amy (Veteran User) - Efficiency Testing**

```
EXPLORE: Repeat application workflows
WITH: Previously submitted data, keyboard navigation, speed focus
TO DISCOVER: Efficiency barriers, unnecessary steps, data reuse opportunities

Investigation Questions:
- Can I reuse information from previous applications?
- Are there keyboard shortcuts for common actions?
- What steps feel unnecessarily repetitive?
```

#### **Zofia (Novice User) - Accessibility & Guidance**

```
EXPLORE: First-time exemption application
WITH: Screen reader, mobile device, marine licensing unfamiliarity
TO DISCOVER: Accessibility barriers, guidance effectiveness, error recovery

Investigation Questions:
- Is the guidance understandable to non-experts?
- How well does the interface work with assistive technology?
- Can users recover from mistakes without starting over?
```

## 🧪 Exploratory Testing Techniques

### **Tours & Walkthroughs**

#### **Feature Tour**

Systematically explore each feature:

- **Guidebook tour** - Follow official documentation/guidance
- **Neighbourhood tour** - Explore related features together
- **Landmark tour** - Focus on major features and workflows
- **Intellectual tour** - Challenge assumptions and logic

#### **Data Tour**

Focus on data handling:

- **Variety tour** - Different types of input data
- **Boundary tour** - Edge cases and limits
- **Validation tour** - Error handling and feedback
- **Persistence tour** - Data storage and retrieval

### **Heuristic-Based Investigation**

#### **Domain-Specific Testing Focus**

For marine licensing applications, focus exploration on:

- **Marine activities** - Test different activity types and their specific requirements
- **Applicant types** - Explore with different user personas and their varying needs
- **Regulatory compliance** - Investigate edge cases and legal requirement boundaries
- **Integration points** - Test connections with external systems and data sources
- **Non-functional aspects** - Performance, security, and accessibility considerations
- **Error scenarios** - What happens when things go wrong or users make mistakes

#### **General Exploratory Testing Considerations**

Key areas to investigate during any exploratory session:

- **Consistency** - Does the interface behave consistently across different areas?
- **Usability** - Are functions and features obvious to find and use?
- **Layout** - Are elements positioned logically and helpfully?
- **Functionality** - Do features work as expected under different conditions?
- **Language** - Is language clear and appropriate for the intended users?
- **Input handling** - How does the system respond to different types of user input?
- **Navigation** - Is navigation intuitive and efficient for user goals?
- **Visual elements** - Are images, graphs, and visual aids helpful and accurate?
- **Help and guidance** - Is support available when users need it?
- **Error recovery** - Can users recover from mistakes without losing progress?
- **Performance** - How does the system behave under different network conditions?

## 📝 Documentation & Note-Taking

### **Session Notes Structure**

```
SESSION CHARTER: [Original charter]
START TIME: [Timestamp]
AREAS COVERED: [Features/workflows explored]
DATA USED: [Test data, user personas, tools]

DISCOVERIES:
+ Positive findings (things that work well)
- Issues found (potential problems)
? Questions raised (need follow-up)
! Ideas generated (test improvements, feature suggestions)

RISKS IDENTIFIED:
- High: [Critical issues that need immediate attention]
- Medium: [Important issues for consideration]
- Low: [Minor issues or improvements]

FOLLOW-UP ACTIONS:
□ Bug reports to create
□ Test automation gaps identified
□ Further investigation needed
□ Documentation updates required
```

### **Mind Mapping**

Use mind maps to:

- **Visualise relationships** between features and workflows
- **Track exploration paths** and decision points
- **Identify patterns** in user behaviour or system responses
- **Document complex workflows** and data dependencies

## 🎪 Integration with Marine Licensing Testing

### **Complementing Automation**

- **Automation first** - Cover happy paths and known edge cases
- **Exploration fills gaps** - Discover unknown unknowns and usability issues
- **Findings feed automation** - Turn discoveries into regression tests

### **Session Planning Approach**

Plan exploratory sessions based on:

- **Risk level** - High-risk areas get priority attention
- **Automation gaps** - Areas with limited automated coverage need exploration
- **User personas** - Different users may uncover different issues
- **Feature complexity** - Complex workflows benefit from exploratory investigation

Example planning considerations:

| Feature Area           | Exploration Focus             | Suggested Persona | Risk Level |
| ---------------------- | ----------------------------- | ----------------- | ---------- |
| Project Name Entry     | Error messages, accessibility | Zofia             | Medium     |
| Location Coordinates   | Format variations, mobile UX  | Amy/Zofia         | High       |
| Public Register Search | Performance, usability        | Fatima            | High       |
| Document Upload        | File types, error handling    | All               | Medium     |

### **Risk-Based Session Prioritisation**

1. **High-risk, low automation** - Immediate exploration focus
2. **High-risk, high automation** - Periodic validation sessions
3. **Low-risk, low automation** - Opportunistic exploration
4. **Low-risk, high automation** - Minimal exploration needed

## 📊 Measuring Exploratory Testing Value

### **Session Effectiveness Metrics**

- **Issues found per session** - Discovery rate
- **Time to find first issue** - Efficiency indicator
- **Issue severity distribution** - Risk identification
- **Automation test ideas generated** - Process improvement

### **Qualitative Outcomes**

- **User experience insights** - Usability and accessibility findings
- **System understanding** - Knowledge about application behaviour
- **Risk assessment** - Updated understanding of system risks
- **Test improvement ideas** - Better automation and processes

### **Long-term Impact**

- **Reduced production issues** - Problems found before release
- **Improved user satisfaction** - Better user experience
- **Enhanced test coverage** - More comprehensive testing approach
- **Team learning** - Improved domain and technical knowledge

## 🚀 Practical Implementation

### **Getting Started with Exploratory Testing**

1. **Choose a charter** - Start with high-risk, low-automation areas
2. **Set up the session** - Prepare tools, data, and environment
3. **Explore systematically** - Use heuristics and techniques
4. **Document discoveries** - Record findings and follow-up actions
5. **Debrief and improve** - Share insights and refine approach

### **Building Exploratory Testing Culture**

- **Regular sessions** - Scheduled exploration time for team members
- **Cross-team collaboration** - Include developers, designers, product owners
- **Knowledge sharing** - Session debriefs and finding presentations
- **Continuous improvement** - Retrospectives on exploratory testing effectiveness

---

_Exploratory testing is not just about finding bugs - it's about understanding our users, our system, and our risks. It's thinking and learning made visible._
