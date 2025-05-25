# Test Charters - Investigative Testing Plans

This section contains **investigative testing charters** for marine licensing user stories. Each charter provides structured guidance for **90-minute investigation sessions** that combine systematic exploration with realistic user scenarios.

> **🔗 Powered by Investigative Testing**  
> These charters implement the **[Investigative Testing](../test-strategy/investigative-testing/README.md)** approach - combining session-based structure with rich scenario content and systematic heuristics.

## 🧠 Charter Purpose

Test charters bridge the gap between:

- **User story requirements** - What the feature should do
- **Systematic investigation** - How we discover what it actually does through realistic scenarios
- **Real user needs** - Whether it serves marine licensing personas effectively
- **Evidence collection** - Actionable insights for development teams

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

## 📋 Available Investigation Sessions

| User Story | Charter Name                                                          | Focus                                    | Priority | Status   |
| ---------- | --------------------------------------------------------------------- | ---------------------------------------- | -------- | -------- |
| ML-1       | [Novice Discovery](./ML-1/ML-1-novice-discovery.md)                   | First-time user journey & accessibility  | High     | 🔄 Ready |
| ML-1       | [Efficiency Patterns](./ML-1/ML-1-efficiency-patterns.md)             | Veteran user workflows & data reuse      | Medium   | 🔄 Ready |
| ML-1       | [Validation Scenarios](./ML-1/ML-1-validation-scenarios.md)           | Error handling under realistic pressure  | High     | 🔄 Ready |
| ML-9       | [Navigation Workflows](./ML-9/ML-9-navigation.md)                     | Task list patterns & status management   | High     | 🔄 Ready |
| ML-9       | [Interruption Resilience](./ML-9/ML-9-interruption-resilience.md)     | Multitasking & workflow disruption       | High     | 🔄 Ready |
| ML-9       | [Cross-Device Journey](./ML-9/ML-9-cross-device-journey.md)           | Mobile-to-desktop transitions            | Medium   | 🔄 Ready |
| ML-9       | [Usability Patterns](./ML-9/ML-9-usability.md)                        | User experience and interaction patterns | Medium   | 🔄 Ready |
| ML-12      | [Consent Misunderstanding](./ML-12/ML-12-consent-misunderstanding.md) | Privacy decision confusion scenarios     | High     | 🔄 Ready |
| ML-12      | [Privacy Concerns](./ML-12/ML-12-privacy-concerns.md)                 | User privacy anxiety and decision-making | High     | 🔄 Ready |
| ML-12      | [Data Protection](./ML-12/ML-12-data-protection.md)                   | Information clarity & user understanding | High     | 🔄 Ready |
| ML-12      | [Consent Workflow](./ML-12/ML-12-consent-workflow.md)                 | Form behaviour & conditional logic       | Medium   | 🔄 Ready |
| ML-12      | [Validation Testing](./ML-12/ML-12-validation.md)                     | Error handling and form validation       | Medium   | 🔄 Ready |

## 🔗 Related Resources

- **[User Stories](../.cursor/user-stories/README.md)** - Requirements and acceptance criteria
- **[Investigative Testing Guide](../test-strategy/investigative-testing/README.md)** - Complete framework and methodology
- **[Marine Licensing Personas](../test-strategy/domain-context/README.md)** - User context and realistic pressures
- **[Testing Heuristics](../test-strategy/heuristics/README.md)** - Systematic thinking frameworks for investigation

---

_Test charters provide ready-to-execute investigation plans that combine systematic exploration with realistic user scenarios - revealing how features actually serve marine licensing users under authentic conditions._
