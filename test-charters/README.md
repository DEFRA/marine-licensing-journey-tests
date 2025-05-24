# Test Charters - Systematic Exploration of User Stories

This section contains **exploratory testing charters** derived from marine licensing user stories. Each charter provides structured guidance for investigating specific aspects of functionality through systematic exploration.

> **🎬 Enhanced with Scenario Testing**  
> Our charters now integrate **[Scenario Testing](../test-strategy/scenario-testing/README.md)** approaches, providing both traditional SBTM structure and rich, realistic user investigation frameworks.

## 🧠 Charter Purpose

Test charters bridge the gap between:

- **User story requirements** - What the feature should do
- **Systematic exploration** - How we discover what it actually does
- **Real user needs** - Whether it serves marine licensing personas effectively
- **Realistic usage patterns** - How people actually use the system under real-world conditions

## 🎯 Charter Types & Structure

We provide **two complementary charter approaches**:

### **🧭 Traditional SBTM Charters**

Standard exploratory testing charters for focused investigation:

```
EXPLORE: [Area of the application]
WITH: [Tools, data, personas, techniques]
TO DISCOVER: [Types of information, risks, problems]

Duration: [Recommended time allocation]
Priority: [High/Medium/Low based on risk]
User Personas: [Which marine licensing personas to consider]
```

### **🎭 Scenario-Enhanced Charters**

Rich, realistic user investigation using Bolton's framework:

```
CHARTER: [Investigation mission]

SCENARIO CONTEXT:
THEME: [Clear mission statement about realistic user situation]
SETUP: [Authentic user context, pressures, environment]
REALISTIC PRESSURES: [Interruptions, time pressure, friction elements]

ACTIVITIES: [Guided but flexible realistic actions]
ORACLES: [How to recognise problems and quality indicators]
VARIATIONS: [Ways to introduce turbulence and stress]

Duration: [Time allocation - often longer for rich scenarios]
User Personas: [Primary persona with authentic context]
```

### **🔄 Integration Benefits**

**Combining both approaches provides:**

- **Focused Investigation** - Traditional charters for specific technical areas
- **Realistic Context** - Scenario charters for authentic user experience
- **Comprehensive Coverage** - Multiple perspectives on the same functionality
- **Evidence Quality** - Both technical validation and user experience insights

## 📁 Charter Organisation

### **ML-1: Project Name & Exemption Creation**

#### **Traditional SBTM Charters:**

- **[ML-1-happy-path.md](./ML-1/ML-1-happy-path.md)** - Core functionality validation
- **[ML-1-validation.md](./ML-1/ML-1-validation.md)** - Error handling and edge cases
- **[ML-1-accessibility.md](./ML-1/ML-1-accessibility.md)** - Inclusive design validation

#### **Scenario-Enhanced Charters:**

- **[ML-1-zofia-first-timer.md](./ML-1/ML-1-zofia-first-timer.md)** - Novice user realistic journey
- **[ML-1-amy-efficiency.md](./ML-1/ML-1-amy-efficiency.md)** - Veteran user speed and reuse patterns

### **ML-9: Task List Viewing**

#### **Traditional SBTM Charters:**

- **[ML-9-navigation.md](./ML-9/ML-9-navigation.md)** - Task list navigation and status
- **[ML-9-usability.md](./ML-9/ML-9-usability.md)** - User experience and workflow

#### **Scenario-Enhanced Charters:**

- **[ML-9-fatima-interruptions.md](./ML-9/ML-9-fatima-interruptions.md)** - Case officer multitasking scenario
- **[ML-9-cross-device-journey.md](./ML-9/ML-9-cross-device-journey.md)** - Mobile-to-desktop workflow reality

### **ML-12: Public Register Content**

#### **Traditional SBTM Charters:**

- **[ML-12-consent-workflow.md](./ML-12/ML-12-consent-workflow.md)** - Radio button behaviour and conditional logic
- **[ML-12-validation.md](./ML-12/ML-12-validation.md)** - Form validation and error scenarios
- **[ML-12-data-protection.md](./ML-12/ML-12-data-protection.md)** - Privacy and data handling

#### **Scenario-Enhanced Charters:**

- **[ML-12-privacy-concerns.md](./ML-12/ML-12-privacy-concerns.md)** - User privacy decision-making under pressure
- **[ML-12-consent-misunderstanding.md](./ML-12/ML-12-consent-misunderstanding.md)** - Data protection confusion scenarios

## 🎭 Persona Integration

Each charter considers marine licensing personas with **authentic context**:

### **Enhanced Persona Application:**

- **Zofia (Novice Applicant)** - First-time confusion, assistive technology, mobile-first approach
- **Amy (Veteran Applicant)** - Efficiency focus, keyboard shortcuts, data reuse expectations
- **Fatima (Case Officer)** - Multitasking pressure, interruptions, data integrity concerns
- **Simon (Marine Officer)** - Technical review focus, compliance validation, field access needs

### **Realistic Pressures:**

- **Time pressure** - Seasonal deadlines, end-of-day urgency
- **Interruptions** - Phone calls, emails, colleague questions
- **Technical friction** - Slow connections, device switching, browser issues
- **Cognitive load** - Complex regulations, unfamiliar terminology, multiple tasks

## 🎬 Scenario Testing Integration

> **📖 Complete Framework**  
> See **[Scenario Testing](../test-strategy/scenario-testing/README.md)** for Bolton's comprehensive approach and **[Session-Based Testing Integration](../test-strategy/session-based-testing/README.md#-integration-with-scenario-testing)** for implementation guidance.

### **How to Use Scenario-Enhanced Charters**

#### **Session Planning (90-120 minutes)**

1. **Choose scenario charter** - Pick based on risk areas and persona focus
2. **Set up realistic context** - Configure devices, personas, friction elements
3. **Execute with guided flexibility** - Follow activities but adapt to discoveries
4. **Document evidence** - Use scenario oracles and evidence frameworks
5. **Debrief insights** - Include scenario-specific findings in session review

#### **Scenario Charter Execution**

```
Setup Phase (10-15 minutes):
├── Configure persona context and realistic pressures
├── Set up devices, assistive technology, interruption simulations
└── Prepare scenario-specific test data and materials

Investigation Phase (75-90 minutes):
├── Execute scenario activities with guided flexibility
├── Follow realistic user patterns and friction simulation
├── Apply scenario oracles and quality indicators
└── Document discoveries using scenario evidence framework

Wrap-up Phase (10-15 minutes):
├── Assess scenario completion and key discoveries
├── Note which variations were most revealing
└── Identify follow-up investigations needed
```

### **Charter Selection Guide**

| **When you want to...**                    | **Use...**                |
| ------------------------------------------ | ------------------------- |
| **Test specific functionality quickly**    | Traditional SBTM charter  |
| **Understand real user experience deeply** | Scenario-enhanced charter |
| **Find technical edge cases and bugs**     | Traditional SBTM charter  |
| **Discover usability and workflow issues** | Scenario-enhanced charter |
| **Validate against acceptance criteria**   | Traditional SBTM charter  |
| **Test under realistic user pressures**    | Scenario-enhanced charter |
| **Cover lots of ground quickly**           | Traditional SBTM charter  |
| **Investigate one persona deeply**         | Scenario-enhanced charter |

## 🚀 Using Test Charters

### **Before Starting**

1. **Choose charter type** - Traditional SBTM or scenario-enhanced based on investigation goals
2. **Review context** - User story, acceptance criteria, persona background
3. **Set up appropriately** - Tools for traditional testing or full scenario context
4. **Allocate time** - 60-90 minutes for traditional, 90-120 minutes for scenarios

### **During Exploration**

#### **Traditional Charter Execution:**

1. Follow the charter systematically
2. Document discoveries as you go
3. Note unexpected behaviours or questions
4. Take screenshots of interesting findings

#### **Scenario Charter Execution:**

1. Maintain persona authenticity throughout
2. Simulate realistic pressures and friction
3. Apply scenario oracles for problem detection
4. Document evidence using scenario frameworks
5. Adapt activities based on discoveries while staying in character

### **After Completion**

1. **Summarise key discoveries** - Both technical and user experience insights
2. **Create bug reports** - Include context about how issues were discovered
3. **Identify automation gaps** - What scenarios should automation validate?
4. **Share insights** - Include persona and scenario insights with team
5. **Plan follow-up** - Traditional charter findings may suggest scenario investigations and vice versa

## 📊 Charter Status

| User Story | Charter Type | Charter Name                                                          | Priority | Status   |
| ---------- | ------------ | --------------------------------------------------------------------- | -------- | -------- |
| ML-1       | Traditional  | [Happy Path](./ML-1/ML-1-happy-path.md)                               | High     | ✅ Ready |
| ML-1       | Traditional  | [Validation](./ML-1/ML-1-validation.md)                               | High     | ✅ Ready |
| ML-1       | Traditional  | [Accessibility](./ML-1/ML-1-accessibility.md)                         | Medium   | ✅ Ready |
| ML-1       | Scenario     | [Zofia First-Timer](./ML-1/ML-1-zofia-first-timer.md)                 | High     | 🔄 Draft |
| ML-1       | Scenario     | [Amy Efficiency](./ML-1/ML-1-amy-efficiency.md)                       | Medium   | 🔄 Draft |
| ML-9       | Traditional  | [Navigation](./ML-9/ML-9-navigation.md)                               | High     | ✅ Ready |
| ML-9       | Traditional  | [Usability](./ML-9/ML-9-usability.md)                                 | Medium   | ✅ Ready |
| ML-9       | Scenario     | [Fatima Interruptions](./ML-9/ML-9-fatima-interruptions.md)           | High     | 🔄 Draft |
| ML-9       | Scenario     | [Cross-Device Journey](./ML-9/ML-9-cross-device-journey.md)           | Medium   | 🔄 Draft |
| ML-12      | Traditional  | [Consent Workflow](./ML-12/ML-12-consent-workflow.md)                 | High     | ✅ Ready |
| ML-12      | Traditional  | [Validation](./ML-12/ML-12-validation.md)                             | High     | ✅ Ready |
| ML-12      | Traditional  | [Data Protection](./ML-12/ML-12-data-protection.md)                   | Medium   | ✅ Ready |
| ML-12      | Scenario     | [Privacy Concerns](./ML-12/ML-12-privacy-concerns.md)                 | High     | 🔄 Draft |
| ML-12      | Scenario     | [Consent Misunderstanding](./ML-12/ML-12-consent-misunderstanding.md) | Medium   | 🔄 Draft |

## 📋 Session Hopper

### **Traditional SBTM Sessions Available**

Quick-focus technical investigations (60-90 minutes):

```
📋 SBTM Hopper:
- Explore exemption creation workflow edge cases
- Investigate task list status management
- Test public register consent validation
- Analyse accessibility of project name page
- Evaluate mobile responsiveness across user journeys
- Validate error handling in project name entry
- Test keyboard navigation across complete workflow
- Investigate form data persistence and recovery
- Explore cross-browser compatibility issues
- Test location coordinate entry with various formats
```

### **Scenario-Enhanced Sessions Available**

Rich, realistic user investigations (90-120 minutes):

```
🎭 Scenario Hopper:
- Execute "Zofia's First Marine Exemption" - novice user confusion patterns
- Run "Amy's Efficient Repeat Application" - veteran user speed and shortcuts
- Investigate "Fatima's Busy Afternoon" - case officer pressure testing
- Explore "Cross-Device Application Resume" - mobile-to-desktop workflows
- Test "Privacy Decision Under Time Pressure" - realistic consent scenarios
- Simulate "Assistive Technology First-Timer" - accessibility under real usage
- Run "Network Interruption Recovery" - connection issues during submission
- Execute "Terminology Misunderstanding" - domain knowledge gaps
```

### **Session Assignment Strategy**

#### **Risk-Based Selection:**

1. **High-risk functionality** → Scenario charter for realistic discovery + Traditional charter for technical validation
2. **Medium-risk functionality** → Traditional charter initially, scenario follow-up if issues found
3. **Low-risk functionality** → Traditional charter focus

#### **Time-Based Selection:**

- **Short sessions (60 minutes)** → Traditional SBTM charters
- **Standard sessions (90 minutes)** → Traditional or lightweight scenarios
- **Extended sessions (120+ minutes)** → Full scenario investigations

### **Session Prioritisation**

When stakeholders request special testing:

> "Here's our current session hopper with both traditional and scenario options. What priority should we give your request, and would you prefer technical validation or realistic user investigation?"

## 🔗 Related Resources

- **[User Stories](../.cursor/user-stories/README.md)** - Requirements and acceptance criteria
- **[Marine Licensing Personas](../test-strategy/domain-context/README.md)** - User context and realistic pressures
- **[Scenario Testing](../test-strategy/scenario-testing/README.md)** - Bolton's comprehensive framework
- **[Session-Based Testing](../test-strategy/session-based-testing/README.md)** - SBTM structure and scenario integration
- **[Exploratory Testing Guide](../test-strategy/exploratory/README.md)** - Investigation techniques and approaches
- **[Testing Heuristics](../test-strategy/heuristics/README.md)** - Systematic thinking frameworks

---

_Test charters bridge user stories and systematic exploration - now enhanced with realistic scenarios that reveal how features actually serve users under authentic conditions._
