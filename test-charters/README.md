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
SESSION CHARTER: [Clear mission statement]

SCENARIO CONTEXT:
THEME: [Rich user context - what authentic situation are we investigating?]
SETUP: [Realistic pressures, friction, and environment]
PERSONA: [Which marine licensing user type - Zofia, Amy, Fatima, Simon]

INVESTIGATION FOCUS:
EXPLORE: [Area of application or workflow]
WITH: [Tools, techniques, heuristics, realistic conditions]
TO DISCOVER: [Types of insights and evidence we seek]

REALISTIC ACTIVITIES:
- [Guided but flexible actions following authentic user patterns]
- [Include friction, interruptions, and real-world behaviour]
- [Test edge cases and stress conditions]

EVIDENCE FRAMEWORK:
- [Specific quality indicators to monitor]
- [Success patterns and warning signs]
- [Performance and usability measures]

Duration: 90 minutes
Priority: [High/Medium/Low based on risk and user impact]
```

## 📁 Charter Library

### **ML-1: Project Name & Exemption Creation**

- **[ML-1-novice-discovery.md](./ML-1/ML-1-novice-discovery.md)** - First-time user journey with accessibility focus
- **[ML-1-efficiency-patterns.md](./ML-1/ML-1-efficiency-patterns.md)** - Veteran user workflows and data reuse
- **[ML-1-validation-scenarios.md](./ML-1/ML-1-validation-scenarios.md)** - Error handling and edge cases under realistic pressure

### **ML-9: Task List Navigation**

- **[ML-9-navigation-workflows.md](./ML-9/ML-9-navigation-workflows.md)** - Task list interaction patterns and status management
- **[ML-9-interruption-resilience.md](./ML-9/ML-9-interruption-resilience.md)** - Multitasking and workflow disruption scenarios
- **[ML-9-cross-device-continuity.md](./ML-9/ML-9-cross-device-continuity.md)** - Mobile-to-desktop workflow transitions

### **ML-12: Public Register Consent**

- **[ML-12-consent-decision.md](./ML-12/ML-12-consent-decision.md)** - Privacy decision-making under realistic pressures
- **[ML-12-data-protection-clarity.md](./ML-12/ML-12-data-protection-clarity.md)** - Information clarity and user understanding
- **[ML-12-workflow-validation.md](./ML-12/ML-12-workflow-validation.md)** - Form behaviour and conditional logic testing

## 🚀 Using Test Charters

### **Charter Execution (90 minutes)**

```
📋 Preparation (10 minutes)
├── Review charter scenario context and investigation focus
├── Set up realistic user environment (devices, tools, friction)
├── Prepare test data and persona materials
└── Configure evidence collection tools

🔍 Investigation (70 minutes)
├── Execute scenario activities with guided flexibility
├── Apply systematic heuristics during exploration
├── Follow authentic user behaviour patterns
├── Document discoveries and evidence in real-time
└── Adapt approach based on findings

📝 Debrief (10 minutes)
├── Assess session goals and scenario completion
├── Document key discoveries and evidence
├── Identify follow-up investigations needed
└── Update charter tracking and coverage
```

### **After Completion**

1. **Summarise key discoveries** - Include both technical and user experience insights
2. **Create actionable reports** - Link findings to specific user impact and business risk
3. **Identify automation opportunities** - What scenarios should automated tests validate?
4. **Plan follow-up sessions** - Which areas need deeper investigation or different persona perspectives?

## 📊 Charter Status

| User Story | Charter Name                                                        | Focus                                       | Priority | Status   |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------- | -------- | -------- |
| ML-1       | [Novice Discovery](./ML-1/ML-1-novice-discovery.md)                 | First-time user journey & accessibility     | High     | 🔄 Ready |
| ML-1       | [Efficiency Patterns](./ML-1/ML-1-efficiency-patterns.md)           | Veteran user workflows & data reuse         | Medium   | 🔄 Ready |
| ML-1       | [Validation Scenarios](./ML-1/ML-1-validation-scenarios.md)         | Error handling under realistic pressure     | High     | 🔄 Ready |
| ML-9       | [Navigation Workflows](./ML-9/ML-9-navigation-workflows.md)         | Task list patterns & status management      | High     | 🔄 Ready |
| ML-9       | [Interruption Resilience](./ML-9/ML-9-interruption-resilience.md)   | Multitasking & workflow disruption          | High     | 🔄 Ready |
| ML-9       | [Cross-Device Continuity](./ML-9/ML-9-cross-device-continuity.md)   | Mobile-to-desktop transitions               | Medium   | 🔄 Ready |
| ML-12      | [Consent Decision](./ML-12/ML-12-consent-decision.md)               | Privacy decisions under realistic pressures | High     | 🔄 Ready |
| ML-12      | [Data Protection Clarity](./ML-12/ML-12-data-protection-clarity.md) | Information clarity & user understanding    | High     | 🔄 Ready |
| ML-12      | [Workflow Validation](./ML-12/ML-12-workflow-validation.md)         | Form behaviour & conditional logic          | Medium   | 🔄 Ready |

## 📋 Session Hopper

### **Available Investigation Sessions**

Pick a charter based on current risk areas and investigation priorities:

```
🎭 Current Hopper (90-minute sessions):
├── ML-1 Novice Discovery - first-time user confusion and accessibility barriers
├── ML-1 Efficiency Patterns - veteran user workflows and speed optimisation
├── ML-1 Validation Scenarios - error handling under realistic user pressure
├── ML-9 Navigation Workflows - task list interaction patterns and status clarity
├── ML-9 Interruption Resilience - multitasking and workflow disruption testing
├── ML-9 Cross-Device Continuity - mobile-to-desktop transition effectiveness
├── ML-12 Consent Decision - privacy decision-making under realistic pressures
├── ML-12 Data Protection Clarity - information understanding and compliance
└── ML-12 Workflow Validation - form behaviour and conditional logic testing
```

### **Session Assignment Strategy**

#### **Priority-Based Selection:**

1. **High-risk, user-facing functionality** → ML-1 Novice Discovery, ML-9 Interruption Resilience, ML-12 Consent Decision
2. **Efficiency and workflow optimisation** → ML-1 Efficiency Patterns, ML-9 Navigation Workflows
3. **Technical validation and edge cases** → ML-1 Validation Scenarios, ML-12 Workflow Validation
4. **Cross-platform and accessibility** → ML-1 Novice Discovery, ML-9 Cross-Device Continuity

#### **When Stakeholders Request Testing:**

> "Here's our current session hopper with investigative charters that combine technical validation with realistic user scenarios. Which area would you like us to prioritise for investigation?"

## 🔗 Related Resources

- **[User Stories](../.cursor/user-stories/README.md)** - Requirements and acceptance criteria
- **[Investigative Testing Guide](../test-strategy/investigative-testing/README.md)** - Complete framework and methodology
- **[Marine Licensing Personas](../test-strategy/domain-context/README.md)** - User context and realistic pressures
- **[Testing Heuristics](../test-strategy/heuristics/README.md)** - Systematic thinking frameworks for investigation

---

_Test charters provide ready-to-execute investigation plans that combine systematic exploration with realistic user scenarios - revealing how features actually serve marine licensing users under authentic conditions._
