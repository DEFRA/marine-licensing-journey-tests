# Marine Licensing Journey Tests - Test Strategy

> **🎯 Modern Quality Engineering**  
> **Automation-first foundation** + **Strategic human insight** = **Reliable marine licensing service**

## 🚀 Quick Start (Choose Your Path)

### **👩‍💻 For Quality Engineering**

1. **This week**: Review [Automation Approach](./automation/README.md) - ensure UI tests cover critical journeys
2. **Next week**: Plan first [Investigation Session](./investigative-testing/README.md) with MMO domain expert
3. **This month**: Establish rhythm of automation + investigation

### **🌊 For MMO Domain Experts**

1. **This week**: Try 60-minute [Simple Investigation](./investigative-testing/README.md#-simple-investigation-sessions) on familiar workflow
2. **Next week**: Share findings with team, identify next investigation area
3. **This month**: Regular investigation sessions on high-risk areas

### **👨‍💼 For Project Managers**

1. **This week**: Review [Success Measures](#-success-measures) to understand quality indicators
2. **Next week**: Include investigation time in sprint planning
3. **This month**: Track automation health + investigation insights

### **🆕 For New Team Members**

1. **Start here**: Read this overview (10 minutes)
2. **Understand context**: [Domain Context](./domain-context/README.md) (20 minutes)
3. **Pick your role**: Follow relevant path above

## 📋 Current Focus: Private Beta Exemption Notifications

**What we're building**: Public exemption notification service for Marine Management Organisation (MMO)

**Testing priorities**:

- ✅ **Core exemption workflow** - Complete user journey validation
- ✅ **Public user experience** - Accessibility and usability for external users
- ✅ **Essential functionality** - Reliable operation of notification features
- ✅ **Beta readiness** - Quality validation for limited user testing

## 🗺️ Strategy Overview: How Everything Connects

### **The Complete Strategy Map**

```
🌊 Marine Licensing Domain Context
├── User Personas (Zofia, Amy, Fatima)
├── Regulatory Requirements
└── Real-world Constraints
                 ↓
         🎯 STRATEGY CORE
                 ↓
┌─────────────────┬─────────────────┬─────────────────┐
│    AUTOMATE     │   INVESTIGATE   │   UNDERSTAND    │
│                 │                 │                 │
│ Known Scenarios │  Unknown Risks  │ Domain Context  │
│ Fast Feedback   │  Human Insight  │ User Needs      │
│ Regression      │  Edge Cases     │ Business Rules  │
│ Protection      │  Usability      │ Accessibility   │
└─────────────────┴─────────────────┴─────────────────┘
                 ↓
         📊 SUCCESS MEASURES
         ├── Faster delivery
         ├── Better user experience
         └── Higher confidence
```

### **Decision Flow: What Should I Do Next?**

```
🚀 Starting Point: "I need to ensure quality for [specific area]"
                          ↓
              Are the user journeys known and stable?
                     ↙               ↘
                   YES                 NO/UNSURE
                    ↓                     ↓
           🤖 AUTOMATION FIRST    🔍 INVESTIGATION FIRST
           ├── Write UI tests           ├── Run 60-min session
           ├── Cover happy path         ├── Involve domain expert
           └── Add edge cases           └── Document findings
                    ↓                     ↓
           Monitor for failures    Do findings suggest automation?
                    ↓                     ↙         ↘
           Need investigation?         YES          NO
                    ↓                   ↓            ↓
              🔍 INVESTIGATE      🤖 AUTOMATE    🧠 UNDERSTAND
              findings gaps        new insights   domain better
                    ↓                   ↓            ↓
              ✅ CONTINUOUS IMPROVEMENT LOOP ✅
```

### **Team Activity Flow**

```
🗓️ SPRINT RHYTHM

Week 1-2: Foundation Building
├── 🤖 Quality Engineering: Build/maintain automation
├── 🌊 Domain Experts: Run investigation sessions
└── 👥 Team: Review findings, plan improvements

Week 3-4: Integration & Refinement
├── 🤖 Add automation for investigation discoveries
├── 🔍 Investigate areas where automation struggles
└── 📊 Measure success indicators, adjust approach

📋 DAILY FLOW
Morning: Check automation health (5 mins)
Development: TDD with automation-first mindset
Blockers: Investigation session for unclear requirements
Review: Share findings, update automation
```

### **Success Feedback Loops**

```
🔄 AUTOMATION → INVESTIGATION → IMPROVEMENT

🤖 Automation finds regression
         ↓
🔍 Investigation discovers why it happened
         ↓
🧠 Understanding leads to better test design
         ↓
🤖 Improved automation catches more issues
         ↓
🔍 Investigation focuses on new risk areas
         ↓
📈 Overall quality and confidence increases

🔄 INVESTIGATION → AUTOMATION → COVERAGE

🔍 Investigation discovers edge case
         ↓
🤖 Automation added for repeatable scenarios
         ↓
📊 Coverage increases for known issues
         ↓
🔍 Investigation moves to unexplored areas
         ↓
🧠 Domain understanding deepens
         ↓
🎯 Strategy becomes more targeted and effective
```

### **Strategy Navigation Map**

```
📍 WHERE AM I? → 🎯 WHAT DO I NEED? → 📁 GO HERE

🆕 New to testing
   ├── Understanding → Domain Context + Personas
   ├── Quick start → Investigative Testing (simple sessions)
   └── Foundation → Automation Approach

👩‍💻 Quality Engineering
   ├── Test strategy → Heuristics + Automation Approach
   ├── Implementation → Screenplay Pattern + BDD Rules
   └── Investigation → Investigative Testing + Test Charters

🌊 Domain Expert
   ├── Contributing → Investigative Testing (60-min sessions)
   ├── Understanding testing → Domain Context
   └── Specific scenarios → Test Charters

👨‍💼 Project Management
   ├── Strategy overview → This document
   ├── Success measures → Key Metrics section
   └── Planning → Test Charters + User Stories

🔧 Looking for specific guidance
   ├── Accessibility → Accessibility Testing
   ├── Security → Security Testing
   ├── Data → Test Data Management
   └── Skills → Quality Coaching
```

## 📁 Strategy Structure

| **Area**                                                       | **Purpose**                              | **Start Here**                                           |
| -------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| **[Automation Approach](./automation/README.md)**              | Test pyramid and tooling strategy        | Review current automation foundation                     |
| **[Investigative Testing](./investigative-testing/README.md)** | Human-led exploration and discovery      | Try simple 60-minute investigation session               |
| **[Testing Heuristics](./heuristics/README.md)**               | Systematic thinking for test discovery   | Use HTSM categories during investigation                 |
| **[Domain Context](./domain-context/README.md)**               | Marine licensing user needs and reality  | Understand personas and user journeys                    |
| **[Accessibility Testing](./accessibility/README.md)**         | Inclusive design and GOV.UK compliance   | Review accessibility automation and manual checks        |
| **[Security Testing](./security/README.md)**                   | Security-by-design and threat testing    | Plan external penetration testing integration            |
| **[Test Data Management](./test-data/README.md)**              | Data strategies for reliable automation  | Set up test data for automation scenarios                |
| **[Quality Coaching](./coaching/README.md)**                   | Skills development and knowledge sharing | Plan learning goals aligned with strategy implementation |

## 🎯 Key Principles

1. **Context-driven testing** - Strategy adapts to marine licensing domain needs
2. **Automation-first foundation** - Reliable regression protection and fast feedback
3. **Strategic human insight** - Investigation where domain expertise matters most
4. **Whole-team quality** - Testing is everyone's responsibility
5. **Evidence-based decisions** - Data and metrics guide testing investments

## 📊 Success Measures

### **🏆 You'll Know This Is Working When:**

- **Domain experts regularly run investigation sessions** and find valuable insights
- **Automation catches regressions instantly** with actionable failures
- **User feedback improves measurably** through better UX discovery
- **Team confidence in releases increases** based on comprehensive validation
- **Accessibility compliance is automatic** through built-in validation

### **📈 Key Metrics**

- **Lead time for changes** - How quickly can we deliver quality features?
- **Bug escape rate** - Issues found in production vs pre-production
- **Test automation coverage** - Percentage of user journeys automated
- **Accessibility compliance** - WCAG 2.1 AA standard achievement
- **Investigation session frequency** - Regular domain expert-led exploration

## 🧠 Built on Proven Foundations

This strategy builds respectfully on the work of testing thought leaders:

- **Context-Driven Testing** _(Cem Kaner, James Bach, Michael Bolton)_ - Adaptive approaches
- **Heuristic Test Strategy Model** _(James Bach)_ - Systematic thinking frameworks
- **Session-Based Test Management** _(Jon Bach)_ - Structured exploratory testing
- **Scenario Testing** _(Michael Bolton)_ - Rich, realistic user investigation
- **Risk-Based Testing** _(Elisabeth Hendrickson)_ - Focus effort where it matters

> **📚 Complete Attribution**: See [ATTRIBUTION.md](./ATTRIBUTION.md) for comprehensive references and recommended reading.

## 🎪 Integration with Project

This strategy works with existing project foundations:

- **[Screenplay Pattern](../.cursor/rules/screenplay-pattern.mdc)** - User-centric test automation
- **[BDD Rules](../.cursor/rules/bdd.rules.mdc)** - Living documentation practices
- **[User Stories](../.cursor/user-stories/README.md)** - Real user needs and acceptance criteria
- **[Test Charters](../test-charters/README.md)** - Systematic exploration guidance

## 🚀 Next Steps

### **This Week**

1. **Review automation foundation** - Ensure critical user journeys are reliably automated
2. **Identify investigation candidate** - Pick one workflow domain experts know well
3. **Plan first session** - 60-minute exploration with MMO staff member

### **Next Sprint**

1. **Run first investigation session** - Use simple framework, document findings
2. **Assess automation gaps** - Use investigation insights to improve automation
3. **Establish rhythm** - Plan regular investigation + automation review cycle

### **This Month**

1. **Measure baseline** - Current automation coverage, investigation frequency
2. **Refine approaches** - Adjust based on what delivers most value
3. **Build team confidence** - Evidence-based quality metrics and transparent reporting

---

**💡 Remember**: Quality is everyone's responsibility. This strategy provides the framework for building quality into everything we do while serving the real needs of marine licensing users.

**🎯 Goal**: Deliver a private beta that users can rely on, with confidence that comes from both comprehensive automation and strategic human insight.
