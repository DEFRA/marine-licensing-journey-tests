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

## 🧠 Session-Based Test Management (SBTM)

### **Charter-Driven Sessions**

Each exploratory session has a clear **charter** that defines:

```
EXPLORE: [Area of the application]
WITH: [Tools, data, personas, techniques]
TO DISCOVER: [Types of information we want to learn]
```

### **Session Structure**

- **Duration**: 90-120 minutes (focused attention span)
- **Preparation**: 10 minutes setup and context gathering
- **Exploration**: 70-90 minutes active investigation
- **Debrief**: 10-15 minutes documenting findings

### **Example Charter: First-Time User Journey**

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

#### **MARINE Heuristic Applied**

Using our domain-specific heuristic:

```
M - Marine activities: Test different activity types and requirements
A - Applicant types: Explore with different user personas and needs
R - Regulatory compliance: Investigate edge cases and legal requirements
I - Integration points: Test connections with external systems
N - Non-functional aspects: Performance, security, accessibility
E - Error scenarios: What happens when things go wrong?
```

#### **COP FLUNG GUN** (General exploratory heuristic)

- **C**onsistency - Does the interface behave consistently?
- **O**bvious - Are functions and features obvious to find and use?
- **P**ositioning - Are elements positioned logically?
- **F**unctional - Do features work as expected?
- **L**anguage - Is language clear and appropriate for users?
- **U**ser input - How does the system handle user input?
- **N**avigation - Is navigation intuitive and efficient?
- **G**raphs/Images - Are visual elements helpful and accurate?
- **G**uidance - Is help and guidance available when needed?
- **U**ndo - Can users recover from errors or wrong actions?
- **N**etwork - How does the system behave with slow/unstable connections?

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

### **Session Planning Matrix**

| Feature Area           | Automation Coverage | Exploration Focus             | Persona   | Risk Level |
| ---------------------- | ------------------- | ----------------------------- | --------- | ---------- |
| Project Name Entry     | ✅ High             | Error messages, accessibility | Zofia     | Medium     |
| Location Coordinates   | ⚠️ Partial          | Format variations, mobile UX  | Amy/Zofia | High       |
| Public Register Search | ❌ Low              | Performance, usability        | Fatima    | High       |
| Document Upload        | ⚠️ Partial          | File types, error handling    | All       | Medium     |

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
