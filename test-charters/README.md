# Test Charters - Investigative Testing Plans

This section contains **investigative testing charters** for marine licensing user stories. Each charter provides structured guidance for **60-90 minute investigation sessions** that combine systematic exploration with realistic user scenarios.

> **🔗 Powered by Investigative Testing**  
> These charters implement the **[Investigative Testing](../test-strategy/investigative-testing.md)** approach - combining session-based structure with rich scenario content and systematic heuristics.

## 🧠 Charter Purpose

Test charters bridge the gap between:

- **User story requirements** - What the feature should do
- **Systematic investigation** - How we discover what it actually does through realistic scenarios
- **Real user needs** - Whether it serves marine licensing personas effectively
- **Evidence collection** - Actionable insights for development teams

## 📋 Available Investigation Sessions

| Theme                           | Charter Name                                | Focus                                                    | Personas | Priority | Status   |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------------- | -------- | -------- | -------- |
| **First-Time User Experience**  | [Novice Journey](./novice-journey.md)       | Complete application flow for marine licensing newcomers | Zofia    | High     | 🔄 Ready |
| **Veteran User Efficiency**     | [Expert Workflows](./expert-workflows.md)   | Speed, shortcuts, and professional patterns              | Amy      | High     | 🔄 Ready |
| **Form Behaviour & Validation** | [Form Interactions](./form-interactions.md) | Input validation, error handling, conditional logic      | All      | High     | 🔄 Ready |

## 🏗️ Charter Structure

All charters follow the **Investigative Testing framework**:

```
EXPLORE: [Area of application or workflow]
AS: [Type of user - MMO staff, applicant, etc.]
BECAUSE: [What you're concerned about or want to validate]
LOOKING FOR: [Types of problems or insights you hope to find]

SCENARIO CONTEXT:
THEME: [Rich user context - what authentic situation are we investigating?]
SETUP: [Realistic pressures, friction, and environment]
PERSONA: [Which marine licensing user type - Zofia, Amy, Fatima, Simon]

REALISTIC ACTIVITIES:
- [Guided but flexible actions following authentic user patterns]
- [Include friction, interruptions, and real-world behaviour]
- [Test edge cases and stress conditions]

EVIDENCE FRAMEWORK:
+ Things that worked well
- Problems discovered
? Questions raised
! Ideas for improvement

Duration: 60-90 minutes
Priority: [High/Medium/Low based on risk and user impact]
```

## 🚀 Using Test Charters

### **Charter Execution (60-90 minutes)**

```
📋 Setup (10 minutes)
├── Pick area to explore
├── Choose realistic user context
└── Decide what questions to answer

🔍 Exploration (45-70 minutes)
├── Follow realistic user workflows
├── Try variations and edge cases
├── Note anything odd, slow, or confusing
└── Test scenarios automation might miss

📝 Wrap-up (5-10 minutes)
├── Document key findings
├── Identify follow-up actions
└── Share insights with team
```

### **After Completion**

1. **Summarise key discoveries** - Include both technical and user experience insights
2. **Create actionable reports** - Link findings to specific user impact and business risk
3. **Identify automation opportunities** - What scenarios should automated tests validate?
4. **Plan follow-up sessions** - Which areas need deeper investigation or different persona perspectives?

## 🔗 Related Resources

- **[User Stories](../.cursor/user-stories/README.md)** - Requirements and acceptance criteria for delivered features
- **[Investigative Testing Guide](../test-strategy/investigative-testing.md)** - Complete framework and methodology
- **[Domain Context](../test-strategy/domain-context.md)** - Marine licensing personas and user context
- **[Testing Heuristics](../test-strategy/heuristics.md)** - Systematic thinking frameworks for investigation
- **[Feature Files](../test/features/)** - Automated test scenarios that validate delivered functionality

---

_Test charters provide ready-to-execute investigation plans that combine systematic exploration with realistic user scenarios - revealing how delivered features actually serve marine licensing users under authentic conditions._
