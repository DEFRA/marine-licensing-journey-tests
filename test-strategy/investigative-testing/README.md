# Investigative Testing - Systematic Human-Centred Discovery

> **🎯 Core Philosophy**  
> Combine **session-based structure** with **rich scenario content** and **systematic heuristics** to discover insights that automation cannot find.

## 🎭 What is Investigative Testing?

**Investigative testing** is **focused exploration** that leverages domain expertise to discover insights that automation cannot find. It's designed to be accessible to marine licensing specialists whilst providing systematic approaches to quality validation.

### **Why This Practical Approach?**

**Domain Expert Leadership:**

- ✅ **Leverage existing knowledge** - MMO staff understand user needs and regulatory requirements
- ✅ **Accessible techniques** - Investigation methods that work for non-testing specialists
- ✅ **Focused exploration** - Concentrate effort on high-risk areas where human insight is essential
- ✅ **Collaborative validation** - Combine domain expertise with systematic thinking

**Automation Foundation:**

- ✅ **Reliable regression protection** - Automated tests handle repetitive validation
- ✅ **Fast feedback cycles** - Immediate validation of known scenarios
- ✅ **Comprehensive coverage** - Systematic validation of user journeys
- ✅ **Sustainable quality** - Maintainable validation that scales with the application

**Strategic Investigation:**

- ✅ **Risk-focused exploration** - Human effort applied where it delivers most value
- ✅ **User experience validation** - Real-world usage patterns and pain points
- ✅ **Edge case discovery** - Scenarios that structured testing might miss
- ✅ **Regulatory compliance** - Domain-specific validation using specialist knowledge

## 🏗️ Simple Investigation Sessions

### **Flexible 60-90 Minute Exploration**

```
📋 Quick Setup (10 minutes)
├── Review the area you want to explore
├── Set up realistic user context (actual data, typical environment)
└── Decide what questions you want to answer

🔍 Focused Exploration (45-70 minutes)
├── Follow realistic user workflows
├── Try variations and edge cases you've encountered
├── Note anything that seems odd, slow, or confusing
└── Test scenarios automation might miss

📝 Quick Debrief (5-10 minutes)
├── Document key findings
├── Identify any issues that need follow-up
└── Share insights with the team
```

### **Simple Investigation Framework**

Rather than complex charters, use this accessible approach:

```
EXPLORE: [Area you want to investigate]
AS: [Type of user - MMO staff, applicant, etc.]
BECAUSE: [What you're concerned about or want to validate]
LOOKING FOR: [Types of problems or insights you hope to find]
```

**Example:**

```
EXPLORE: Exemption project name entry
AS: First-time applicant with limited marine licensing knowledge
BECAUSE: We've had support queries about project naming confusion
LOOKING FOR: Guidance gaps, terminology issues, validation problems
```

## 🎬 Scenario Investigation Framework

### **Bolton's THEME → SETUP → ACTIVITIES → ORACLES → VARIATIONS Structure**

Each investigation session uses rich scenario content:

#### **THEME - Clear Mission**

One to three-line statement about the authentic user situation being investigated.

_Example: "Investigate system behaviour when novice users attempt marine exemption applications under realistic time pressure and terminology confusion."_

#### **SETUP - Realistic Context**

Specific preparation that creates authentic user conditions:

- **User persona** with specific pressures and context
- **Environment setup** (devices, network conditions, interruptions)
- **Realistic friction** (poor connectivity, multitasking, time pressure)
- **Authentic data** (messy, incomplete, real-world variations)

#### **ACTIVITIES - Guided Flexibility**

Structured suggestions that encourage realistic user behaviour:

- **Specific actions** with room for variation and discovery
- **Realistic patterns** including mistakes, backtracking, help-seeking
- **Focus areas** for investigation without rigid scripting
- **Edge case exploration** based on authentic user pressures

#### **ORACLES - Quality Evidence**

Multiple ways to recognise problems and gather evidence:

- **Consistency patterns** (FEW HICCUPPS framework)
- **Domain-specific indicators** (marine licensing compliance, accessibility)
- **User experience signals** (confusion, frustration, abandonment)
- **Performance markers** (response times, error rates, workflow efficiency)

#### **VARIATIONS - Realistic Turbulence**

Ways to introduce authentic stress and edge conditions:

- **Environmental factors** (poor connectivity, device switching, interruptions)
- **User pressures** (time constraints, urgency, competing priorities)
- **Data variations** (incomplete information, format differences, errors)
- **Workflow disruptions** (system updates, browser crashes, phone calls)

## 🧠 Marine Licensing Investigation Examples

### **ML-01: Zofia's Confused First-Timer Investigation**

```
SESSION CHARTER: Investigate guidance effectiveness for marine licensing novices

SCENARIO CONTEXT:
THEME: Discover usability barriers for users completely new to marine licensing
SETUP: First-time applicant using assistive technology with real-world distractions
PERSONA: Zofia - Environmental consultant, new to marine licensing processes

INVESTIGATION FOCUS:
EXPLORE: Exemption notification workflow from novice perspective
WITH: Screen reader, mobile/desktop switching, terminology confusion simulation
TO DISCOVER: Guidance gaps, accessibility barriers, error recovery effectiveness

REALISTIC ACTIVITIES:
- Start application without reading guidance thoroughly (realistic behaviour)
- Misinterpret marine licensing terminology deliberately
- Enter location data in various coordinate formats
- Switch between mobile and desktop mid-task
- Simulate interruptions (phone calls, urgent emails)
- Use help features when genuinely confused
- Make common first-time user mistakes

EVIDENCE FRAMEWORK:
- Error messages understandable to non-experts
- Help appears contextually when needed most
- Accessibility features work consistently across platforms
- Progress preserved during device switching
- Recovery from mistakes doesn't lose significant work

VARIATIONS:
- Test with different assistive technologies
- Simulate poor internet connectivity
- Use different browsers and devices
- Include realistic time pressures
```

### **ML-02: Amy's Efficiency Expert Investigation**

```
SESSION CHARTER: Investigate workflow efficiency for experienced marine operators

SCENARIO CONTEXT:
THEME: Discover efficiency barriers and opportunities for veteran users
SETUP: Experienced user with multiple similar applications and tight deadlines
PERSONA: Amy - Maritime consultant, submits multiple exemptions annually

INVESTIGATION FOCUS:
EXPLORE: Repeat application workflows and data reuse patterns
WITH: Previous application data, keyboard navigation, time pressure simulation
TO DISCOVER: Efficiency barriers, unnecessary steps, data reuse opportunities

REALISTIC ACTIVITIES:
- Attempt to reuse information from previous applications
- Use keyboard navigation exclusively for speed
- Work with multiple browser tabs and reference materials
- Simulate end-of-season deadline pressure
- Test auto-complete and saved preferences
- Search for specific historical application details

EVIDENCE FRAMEWORK:
- Previous application data is accessible and reusable
- Keyboard navigation works consistently
- Auto-complete suggestions are accurate and helpful
- Search functionality finds relevant data quickly
- Workflow supports expert user patterns

VARIATIONS:
- Multiple simultaneous applications
- System performance under heavy usage
- Integration with external business systems
- Network interruptions during critical updates
```

### **ML-03: Fatima's Multi-Tasking Case Review Investigation**

```
SESSION CHARTER: Investigate back-office workflow under realistic operational pressure

SCENARIO CONTEXT:
THEME: Test system behaviour during complex case officer workflows with interruptions
SETUP: Multiple pending applications, phone interruptions, cross-system data checking
PERSONA: Fatima - MMO case officer, managing complex caseload with competing priorities

INVESTIGATION FOCUS:
EXPLORE: Case management workflows under realistic operational conditions
WITH: Multiple applications, interruption simulation, cross-system data checking
TO DISCOVER: Data integrity issues, workflow bottlenecks, support needs

REALISTIC ACTIVITIES:
- Review 3-4 applications simultaneously in different browser tabs
- Simulate phone call interruptions that require immediate attention
- Cross-reference information between planning systems and applications
- Update application status while maintaining accurate audit trails
- Handle urgent requests that disrupt planned workflow
- Search for precedent cases for consistency checking

EVIDENCE FRAMEWORK:
- Data doesn't get corrupted during multitasking
- Audit trail captures all actions accurately
- System performance remains acceptable with multiple tabs
- Status updates propagate correctly across systems
- Search functionality works efficiently under pressure

VARIATIONS:
- System maintenance during busy periods
- Multiple users accessing same applications
- Network issues during critical updates
- Time-sensitive applications requiring same-day decisions
```

## 🔬 Systematic Heuristic Application

### **HTSM Integration During Sessions**

Apply **Heuristic Test Strategy Model** categories systematically:

#### **Structure Focus**

- **Interface design** - Navigation, layout, form structure
- **Information architecture** - Content organisation and findability
- **Workflow design** - Process logic and user journey structure

#### **Behaviour Focus**

- **User interactions** - Click paths, form completion, error handling
- **System responses** - Performance, feedback, state management
- **Integration behaviour** - Cross-system data flow and synchronisation

#### **Data Focus**

- **Input validation** - Boundary testing, format handling, error messages
- **Data persistence** - Storage, retrieval, integrity across sessions
- **Data transformation** - Import/export, format conversion, reporting

### **Marine Licensing Domain Heuristics**

#### **MARINE Model Application**

- **Marine regulations** - Compliance with licensing requirements
- **Applications** - User journey and workflow effectiveness
- **Regulations** - Legal requirement satisfaction
- **Integration** - Cross-system functionality
- **Navigation** - User experience and accessibility
- **Environment** - Performance and reliability

#### **Quality Criteria Considerations**

For each investigation area, consider:

- **Capability** - Does it work as intended?
- **Reliability** - Does it work consistently?
- **Usability** - Is it learnable and efficient?
- **Security** - Is user data protected?
- **Performance** - Does it respond acceptably?
- **Compatibility** - Does it work across platforms?

## 📝 Evidence Collection & Documentation

### **Session Note Structure**

```
SESSION: [Charter title and reference]
INVESTIGATOR: [Tester name]
TIME: [Start/end timestamps]
SCENARIO: [Which scenario context used]

DISCOVERIES:
+ Positive findings (things that work well)
- Issues found (potential problems)
? Questions raised (need follow-up)
! Ideas generated (improvements, automation opportunities)

EVIDENCE COLLECTED:
□ Screenshots of interesting behaviour
□ Screen recordings of complex interactions
□ Performance timing observations
□ Accessibility testing results
□ User experience insights

RISK ASSESSMENT:
- Critical: [Issues that could cause user abandonment or compliance failure]
- Significant: [Issues that impact user efficiency or satisfaction]
- Improvement: [Opportunities for enhancement or optimisation]

FOLLOW-UP ACTIONS:
□ Bug reports to create
□ Test automation gaps identified
□ Further investigation sessions needed
□ Documentation updates required
□ Accessibility issues to address

SCENARIO EFFECTIVENESS:
- How realistic did the user context feel?
- Which scenario elements revealed the most insights?
- What variations should be tried in future sessions?
- How should this scenario be refined?
```

### **Investigation Evidence Framework**

#### **Quantitative Evidence**

- **Performance measurements** - Page load times, response delays
- **Error rates** - Frequency of validation failures or system errors
- **Completion rates** - Successful workflow completion under scenario conditions
- **Accessibility scores** - Automated and manual accessibility validation results

#### **Qualitative Evidence**

- **User experience insights** - Frustration points, confusion areas, workflow gaps
- **Workflow effectiveness** - How well scenarios match real user needs
- **System behaviour patterns** - Consistency, reliability, integration quality
- **Domain compliance** - How well marine licensing requirements are met

## 🎪 Integration with Marine Licensing Testing

### **Complementing BDD Automation**

```
BDD Automated Tests           Investigative Sessions        Combined Coverage
├── Happy path workflows  +   ├── Edge case discovery   =   ├── Comprehensive validation
├── Known error scenarios     ├── Usability investigation   ├── Real-world readiness
├── Regression protection     ├── Performance exploration   ├── Risk mitigation
└── Feature validation        └── Accessibility testing     └── User satisfaction
```

### **Charter Planning Strategy**

#### **Risk-Based Session Prioritisation**

1. **High-risk, low automation coverage** → Immediate investigation priority
2. **High-risk, high automation coverage** → Periodic validation sessions
3. **Complex user workflows** → Rich scenario investigation
4. **Accessibility requirements** → Dedicated accessibility investigation
5. **Performance concerns** → Load and stress scenario testing

#### **Coverage Planning Matrix**

| **User Story**    | **Automation Level** | **Investigation Focus** | **Scenario Type** | **Priority** |
| ----------------- | -------------------- | ----------------------- | ----------------- | ------------ |
| ML-1 Project Name | High                 | Error recovery patterns | Zofia novice      | Medium       |
| ML-9 Task List    | Medium               | Navigation efficiency   | Amy expert        | High         |
| ML-12 Consent     | Low                  | Legal compliance        | Legal review      | High         |

### **Session Scheduling Integration**

- **Work planning** - Include investigation sessions in story completion criteria
- **Release preparation** - Risk-focused scenarios before major releases
- **User feedback response** - Targeted scenarios based on user research findings
- **Accessibility audits** - Regular scenario-based accessibility investigation

## 📊 Measuring Investigation Effectiveness

### **Session Quality Metrics**

- **Discovery rate** - Issues and insights found per session
- **Evidence quality** - Actionable findings vs general observations
- **Risk identification** - Critical issues discovered before release
- **Coverage progression** - Systematic exploration of application areas

### **Long-Term Investigation Impact**

- **Production incident reduction** - Issues prevented through investigative discovery
- **User satisfaction improvement** - UX problems identified and resolved
- **Accessibility compliance** - Barriers discovered and addressed
- **Team learning** - Domain knowledge and testing skill development

### **Investigation ROI Indicators**

- **Cost of prevention vs cost of fixing** - Investigation finding value
- **User adoption rates** - Better UX through investigative insights
- **Support request reduction** - Fewer user problems after investigation-driven improvements
- **Release confidence** - Team confidence based on thorough investigation

## 🚀 Getting Started with Investigative Testing

### **For Domain Experts (MMO Staff, Business Analysts)**

**Start Simple - Week 1**

1. **Pick a familiar workflow** - Choose something you know well and have seen users struggle with
2. **Set aside 60 minutes** - Block time when you won't be interrupted
3. **Try the simple framework** - Use the EXPLORE/AS/BECAUSE/LOOKING FOR template
4. **Focus on user experience** - What would confuse or frustrate someone using this?

**Build Confidence - Week 2**

1. **Try different user perspectives** - Explore as a novice, then as an experienced user
2. **Document 2-3 key findings** - What surprised you or seemed problematic?
3. **Share insights with the team** - Brief discussion of what you discovered
4. **Plan next investigation** - What other areas would benefit from exploration?

### **For Quality Engineering**

**Foundation Setup**

1. **Create simple investigation templates** - Make it easy for domain experts to contribute
2. **Establish lightweight documentation** - Focus on actionable findings, not extensive reports
3. **Plan collaborative sessions** - Work with MMO staff to explore high-risk areas
4. **Track investigation coverage** - Ensure key user journeys get domain expert attention

**Ongoing Support**

1. **Facilitate rather than lead** - Help domain experts apply their knowledge effectively
2. **Connect findings to automation** - Use insights to improve automated test scenarios
3. **Maintain investigation momentum** - Regular but achievable rhythm of exploration
4. **Focus on high-impact areas** - Prioritise investigations that reveal critical insights

### **Making It Sustainable**

- **Little and often** - 60-minute sessions are more sustainable than 90-minute marathons
- **Build on existing knowledge** - Leverage what domain experts already know
- **Focus on actionable insights** - Findings that lead to improvements or automation gaps
- **Keep it collaborative** - Investigation should feel like valuable contribution, not testing burden

---

_Investigative testing combines the accountability of session-based testing with the richness of scenario testing and the systematic approach of heuristic exploration. The result is human-centred discovery that complements automation and provides confidence in real-world user success._

## 🙏 Attribution & Foundations

This investigative testing approach builds upon the foundational work of several key contributors to the testing community:

### **Michael Bolton**

- **Scenario Testing Framework** - The THEME → SETUP → ACTIVITIES → ORACLES → VARIATIONS structure
- **"Breaking the Test Case Addiction"** series - Moving beyond scripted test cases to rich exploration
- **Realistic user investigation** principles that guide our scenario-based content
- **Context-Driven Testing** school co-founder
- **Rapid Software Testing** methodology co-founder (with James Bach)

### **James Bach**

- **Heuristic Test Strategy Model (HTSM)** - Systematic thinking frameworks for test discovery
- **Exploratory Testing** methodologies and principles
- **Context-Driven Testing** philosophy that underlies our adaptive approach

### **Jon Bach**

- **Session-Based Test Management (SBTM)** - Time-boxed testing sessions with clear charters and accountability
- **Structured exploratory testing** approaches that provide our session framework

### **Elisabeth Hendrickson**

- **Agile Testing** principles that inform our integration with development workflows
- **Risk-based testing** approaches that guide our prioritisation strategies

### **Cem Kaner**

- **Context-Driven Testing** school foundational principles
- **Testing as investigation** rather than verification mindset

Our **Investigative Testing** approach respectfully combines these proven methodologies into a unified framework suited to marine licensing domain testing while preserving the essential insights and principles from each contributor.

---

This approach integrates the best aspects of multiple testing methodologies:

- **Session-Based Testing Management (SBTM)** - Time-boxed structure with clear accountability
- **Scenario Testing (Bolton's approach)** - Rich, realistic user contexts with guided flexibility
- **Heuristic-Driven Exploration** - Systematic discovery using HTSM and domain models
- **User Journey Investigation** - Complete workflow testing from authentic user perspectives
