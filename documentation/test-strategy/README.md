# Marine Licensing Journey Tests - Test Strategy

> **🎯 Modern quality engineering**  
> **Automation-first foundation** + **Strategic human insight** = **Reliable marine licensing service**

## 🚀 Quick start (Choose your path)

### **👩‍💻 For quality engineering**

1. Review [Automation approach](./automation.md) - ensure UI tests cover critical journeys
2. Plan first [Investigation session](./investigative-testing.md) with MMO domain expert
3. Establish rhythm of automation + investigation

### **🌊 For MMO domain experts**

1. Try 60-minute [Simple investigation](./investigative-testing.md#-simple-investigation-sessions) on familiar workflow
2. Share findings with team, identify next investigation area
3. Regular investigation sessions on high-risk areas

### **👨‍💼 For project managers and stakeholders**

1. Review [Success measures](#-success-measures) to understand quality indicators
2. Include investigation time in work planning
3. Track automation health + investigation insights

### **🆕 For new team members**

1. **Start here**: Read this overview (10 minutes)
2. **Understand context**: [Domain context](./domain-context.md) (20 minutes)
3. **Pick your role**: Follow relevant path above

## 🎯 Key principles

1. **Context-driven testing** - Strategy adapts to marine licensing domain needs
2. **Automation-first foundation** - Reliable regression protection and fast feedback
3. **Strategic human insight** - Investigation where domain expertise matters most
4. **Whole-team quality** - Testing is everyone's responsibility
5. **Evidence-based decisions** - Data and metrics guide testing investments

## 📋 Current focus: Private beta exemption notifications

**What we're building**: Public exemption notification service for Marine Management Organisation (MMO)

**Testing priorities**:

- ✅ **Core exemption workflow** - Complete user journey validation
- ✅ **Public user experience** - Accessibility and usability for external users
- ✅ **Essential functionality** - Reliable operation of notification features
- ✅ **Beta readiness** - Quality validation for limited user testing

## 🗺️ Strategy overview: How everything connects

### **The complete strategy map**

```
🌊 Marine Licensing Domain Context
├── User Personas (Sarah, Marcus, Elena, Dr. James, David, Rachel)
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

### **Decision flow: What should I do next?**

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
                       ↓               ↓            ↓
                     ✅ CONTINUOUS IMPROVEMENT LOOP ✅
```

## 📁 Strategy structure

| **Area**                                                               | **Purpose**                                    | **Start here**                                                        |
| ---------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| **[Automation approach](./automation.md)**                             | Test pyramid, tooling, and screenplay patterns | **QE**: Review current foundation. **New**: Foundation learning       |
| **[Investigative testing](./investigative-testing.md)**                | Human-led exploration and discovery            | **Domain experts**: 60-min sessions. **New**: Simple quick start      |
| **[Testing heuristics](./heuristics.md)**                              | Systematic thinking for test discovery         | **QE**: Use HTSM during investigation. **All**: Systematic thinking   |
| **[Domain context](./domain-context.md)**                              | Marine licensing user needs and reality        | **New**: Understand personas. **Domain experts**: Context for testing |
| **[Accessibility testing](./accessibility.md)**                        | Inclusive design and GOV.UK compliance         | Review automation and manual checks                                   |
| **[Security testing](./security.md)**                                  | Security-by-design and threat testing          | Plan external penetration testing integration                         |
| **[Test data management](./test-data.md)**                             | Data strategies for reliable automation        | Set up test data for automation scenarios                             |
| **[Quality coaching](./coaching.md)**                                  | Skills development and knowledge sharing       | Plan learning goals aligned with strategy implementation              |
| **[BDD rules](./bdd-rules.md)**                                        | Living documentation practices                 | **QE**: Clear scenario writing guidelines                             |
| **[Test charters](../test-charters/README.md)**                        | Guided investigative testing plans             | **All**: Discovering edge cases and usability issues                  |
| **[User stories](../user-stories/README.md)**                          | Real user needs and acceptance criteria        | **PM**: Planning and requirements traceability                        |
| **[Personas](./domain-context.md#user-reality--testing-implications)** | Representative target user types               | **Design**: Understanding user needs and testing scenarios            |

## 📊 Success measures

### **🏆 You'll know this is working when:**

- **Domain experts regularly run investigation sessions** and find valuable insights
- **Automation catches regressions instantly** with actionable failures
- **User feedback improves measurably** through better UX discovery
- **Team confidence in releases increases** based on comprehensive validation
- **Accessibility compliance is automatic** through built-in validation

### **📈 Key metrics**

- **Lead time for changes** - How quickly can we deliver quality features?
- **Bug escape rate** - Issues found in production vs pre-production
- **Test automation coverage** - Percentage of user journeys automated
- **Accessibility compliance** - WCAG 2.1 AA standard achievement
- **Investigation session frequency** - Regular domain expert-led exploration

## 🧠 Built on proven foundations

This strategy builds respectfully on the work of testing thought leaders:

- **Context-driven testing** _(James Bach, Michael Bolton)_ - Adaptive approaches
- **Heuristic test strategy model** _(James Bach)_ - Systematic thinking frameworks
- **Session-based test management** _(John Bach)_ - Structured exploratory testing
- **Scenario testing** _(Michael Bolton)_ - Rich, realistic user investigation

## 🎪 Integration with project

This strategy works with existing project foundations:

- **[BDD rules](./bdd-rules.md)** - Living documentation practices
- **[Test charters](../test-charters/README.md)** - Guided investigative testing plans
- **[User stories](../user-stories/README.md)** - Real user needs and acceptance criteria
- **[Personas](./domain-context.md#user-reality--testing-implications)** - Representative target user types

---

**💡 Remember**: Quality is everyone's responsibility. This strategy provides the framework for building quality into everything we do while serving the real needs of marine licensing users.

**🎯 Goal**: Deliver a private beta that users can rely on, with confidence that comes from both comprehensive automation and strategic human insight.
