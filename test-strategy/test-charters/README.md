# Test Charters - Systematic Exploration of User Stories

This section contains **exploratory testing charters** derived from marine licensing user stories. Each charter provides structured guidance for investigating specific aspects of functionality through systematic exploration.

## 🧠 Charter Purpose

Test charters bridge the gap between:

- **User story requirements** - What the feature should do
- **Systematic exploration** - How we discover what it actually does
- **Real user needs** - Whether it serves marine licensing personas effectively

## 🎯 Charter Structure

Each charter follows the standard format:

```
EXPLORE: [Area of the application]
WITH: [Tools, data, personas, techniques]
TO DISCOVER: [Types of information, risks, problems]

Duration: [Recommended time allocation]
Priority: [High/Medium/Low based on risk]
User Personas: [Which marine licensing personas to consider]
```

## 📁 Charter Organisation

### **ML-1: Project Name & Exemption Creation**

- **[ML-1-happy-path.md](./ML-1/ML-1-happy-path.md)** - Core functionality validation
- **[ML-1-validation.md](./ML-1/ML-1-validation.md)** - Error handling and edge cases
- **[ML-1-accessibility.md](./ML-1/ML-1-accessibility.md)** - Inclusive design validation

### **ML-9: Task List Viewing**

- **[ML-9-navigation.md](./ML-9/ML-9-navigation.md)** - Task list navigation and status
- **[ML-9-usability.md](./ML-9/ML-9-usability.md)** - User experience and workflow

### **ML-12: Public Register Content**

- **[ML-12-consent-workflow.md](./ML-12/ML-12-consent-workflow.md)** - Radio button behaviour and conditional logic
- **[ML-12-validation.md](./ML-12/ML-12-validation.md)** - Form validation and error scenarios
- **[ML-12-data-protection.md](./ML-12/ML-12-data-protection.md)** - Privacy and data handling

## 🎭 Persona Integration

Each charter considers marine licensing personas:

- **Zofia (Novice Applicant)** - First-time user guidance and clarity
- **Amy (Veteran Applicant)** - Efficiency and familiar patterns
- **Fatima (Case Officer)** - Back-office implications and data quality
- **Simon (Marine Officer)** - Technical review and compliance aspects

## 🚀 Using Test Charters

### **Before Starting**

1. Review the related user story and acceptance criteria
2. Choose appropriate test data and environment
3. Set up tools (screen reader, mobile device, etc.)
4. Allocate focused time block (60-90 minutes)

### **During Exploration**

1. Follow the charter systematically
2. Document discoveries as you go
3. Note unexpected behaviours or questions
4. Take screenshots of interesting findings

### **After Completion**

1. Summarise key discoveries and risks
2. Create bug reports for issues found
3. Identify automation gaps or improvements
4. Share insights with the team

## 📊 Charter Status

| User Story | Charter          | Priority | Status   |
| ---------- | ---------------- | -------- | -------- |
| ML-1       | Happy Path       | High     | ✅ Ready |
| ML-1       | Validation       | High     | ✅ Ready |
| ML-1       | Accessibility    | Medium   | ✅ Ready |
| ML-9       | Navigation       | High     | ✅ Ready |
| ML-9       | Usability        | Medium   | ✅ Ready |
| ML-12      | Consent Workflow | High     | ✅ Ready |
| ML-12      | Validation       | High     | ✅ Ready |
| ML-12      | Data Protection  | Medium   | ✅ Ready |

## 🔗 Related Resources

- **[User Stories](../../.cursor/user-stories/README.md)** - Requirements and acceptance criteria
- **[Marine Licensing Personas](../domain-context/README.md)** - User context and needs
- **[Exploratory Testing Guide](../exploratory/README.md)** - Session management and techniques
- **[Testing Heuristics](../heuristics/README.md)** - Systematic thinking frameworks

---

_Test charters turn user stories into systematic exploration - helping us discover not just whether features work, but how well they serve real users._
