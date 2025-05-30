# Advanced Investigation Techniques

> **🔬 Systematic Approaches**  
> **Heuristic frameworks** + **Quality criteria** + **Evidence collection** = **Comprehensive discovery**

## 🧠 Bolton's Scenario Testing Framework

### **THEME → SETUP → ACTIVITIES → ORACLES → VARIATIONS Structure**

Each investigation session can use rich scenario content based on Michael Bolton's scenario testing approach:

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

---

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

---

## 📝 Advanced Evidence Collection

### **Comprehensive Session Note Structure**

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

---

## 🎯 Advanced Planning Strategies

### **Risk-Based Session Prioritisation**

1. **High-risk, low automation coverage** → Immediate investigation priority
2. **High-risk, high automation coverage** → Periodic validation sessions
3. **Complex user workflows** → Rich scenario investigation
4. **Accessibility requirements** → Dedicated accessibility investigation
5. **Performance concerns** → Load and stress scenario testing

### **Coverage Planning Matrix**

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

---

## 📊 Advanced Effectiveness Measures

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

---

## 🧪 Integration with Testing Heuristics

### **Heuristics Inform Scenarios**

Use systematic thinking to guide investigation content:

**Example: HTSM Structure Testing → Scenario Activities**

```
Structure Categories          Scenario Activities
├── Interface Design    →     ├── Test navigation with screen reader
├── Information Arch    →     ├── Search for specific guidance content
└── Workflow Design     →     └── Follow complete user journey end-to-end
```

**Example: Quality Criteria → Evidence Framework**

```
Quality Criteria             Evidence to Collect
├── Functional          →     ├── Does each step work as intended?
├── Usability           →     ├── Can users complete tasks efficiently?
└── Reliability         →     └── Does system behave consistently?
```

### **Scenarios Validate Heuristics**

Investigation findings inform systematic testing:

**Example: Scenario Discovery → Automation Improvement**

```
Investigation Finding          Automation Enhancement
├── Form validation confuses users  →  ├── Add error message testing
├── Help content hard to find       →  ├── Add content discovery tests
└── Mobile experience inconsistent  →  └── Add cross-device testing
```

---

## 🎭 Advanced Session Facilitation

### **Leading Team Investigation Sessions**

- **Pre-session planning** - Scenario selection and environment setup
- **During session facilitation** - Guide without constraining exploration
- **Evidence collection coordination** - Ensure findings are properly captured
- **Post-session synthesis** - Connect findings to actionable improvements

### **Collaborative Investigation Techniques**

- **Pair investigation** - Two investigators with different perspectives
- **Rotating focus** - Different team members lead different scenario aspects
- **Cross-functional sessions** - Include developers, business analysts, domain experts
- **Remote investigation** - Distributed teams investigating together

---

_Advanced techniques provide depth and rigour whilst maintaining the accessibility and practical focus that makes investigative testing valuable for marine licensing teams._
