# Test Charters - Investigative Testing Plans

> **Charter structure update:**
> Charters now focus on investigation context, activities, and evidence collection. Requirements and persona details are referenced, not restated. See the template below for new charters.

---

## Charter Template (for new charters)

```
# [Charter Title]: [Short Description]

## Investigation Plan

**EXPLORE:** [Area or workflow to investigate]
**AS:** [Persona or user type] (see References)
**BECAUSE:** [Why this investigation matters]
**LOOKING FOR:** [Problems, risks, or insights sought]

**Duration:** [e.g. 60-90 minutes]
**Priority:** [High/Medium/Low]

## References
- **Requirements:**
  - [User story 1](../user-stories/...)
  - [User story 2](../user-stories/...)
- **Personas:**
  - [Persona 1](../personas/...)
  - [Persona 2](../personas/...)

## Scenario Context
- [Short summary of the investigation context. For detailed requirements and persona context, see References above.]

## Realistic Activities
- [List the main investigation activities, not acceptance criteria.]

## Evidence Framework

### ✅ Positive signals
- [What good looks like.]

### ⚠️ Warning signs
- [What problems or risks look like.]

### 🤔 Questions to investigate
- [Key questions for the session.]

### 💡 Ideas to explore
- [Improvement or automation ideas.]

## Session Notes Template

```

```
SESSION: [Charter Title] - [Date]
DURATION: [Actual time]
INVESTIGATOR: [Name]

[OBSERVATIONS/NOTES STRUCTURE]

IMMEDIATE ACTIONS:
□ [Action 1 - who will address]
□ [Action 2 - who will address]
□ [Action 3 - who will address]
```

---

This section contains **investigative testing charters** for marine licensing user stories. Each charter provides structured guidance for **60-90 minute investigation sessions** that combine systematic exploration with realistic user scenarios for **delivered functionality**.

> **🔗 Powered by investigative testing**  
> These charters implement the **[investigative testing](../test-strategy/investigative-testing.md)** approach - combining session-based structure with rich scenario content and systematic heuristics.

## 🧠 Charter purpose

Test charters bridge the gap between:

- **User story requirements** - What the delivered features should do
- **Systematic investigation** - How we discover what they actually do through realistic scenarios
- **Real user needs** - Whether delivered features serve marine licensing personas effectively
- **Evidence collection** - Actionable insights for development teams

## 📋 Available investigation sessions

| Theme                           | Charter name                                                  | Focus                                                      | Personas                 | Priority | Status     |
| ------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------ | -------- | ---------- |
| **First-time user experience**  | [Novice journey](./novice-journey.md)                         | Complete exemption notification workflow for newcomers     | Sarah                    | High     | 🔄 Updated |
| **Professional workflows**      | [Expert workflows](./expert-workflows.md)                     | Professional efficiency patterns across delivered features | Marcus, Elena, Dr. James | High     | 🔄 Updated |
| **Form behaviour & validation** | [Form interactions](./form-interactions.md)                   | Input validation, error handling across all forms          | All personas             | High     | 🔄 Updated |
| **Coordinate entry workflows**  | [Site details](./site-details.md)                             | Complete site details entry with coordinate systems        | All personas             | High     | 🔄 Updated |
| **Review and submission**       | [Review and submission](./review-and-submission.md)           | Check your answers and notification submission workflow    | All personas             | High     | 🆕 New     |
| **Navigation consistency**      | [Back and cancel navigation](./back-and-cancel-navigation.md) | Cross-workflow navigation behaviour and consistency        | All personas             | High     | 🆕 New     |

### **Charter lifecycle**

**Charters are updated based on delivered functionality** to ensure they remain aligned with current system capabilities:

- **New features delivered** → Charter activities updated to include new workflows
- **Feature enhancements** → Existing charters updated to reflect improved behaviour
- **Validation improvements** → Form interaction testing updated for new error handling
- **User research insights** → Charter priorities adjusted based on persona research
- **Navigation consistency gaps** → New charter created to investigate cross-workflow behaviour patterns

**Research-Based Personas**: All charters now use research-based personas derived from direct user interviews, MMO staff observations, and beta service feedback. These replace assumption-based personas with evidence from real marine licensing users.

This approach ensures our investigation sessions always target **delivered system functionality** and real user patterns rather than hypothetical scenarios.

## 🏗️ Charter structure

All charters follow the **investigative testing framework**:

```
EXPLORE: [Delivered feature area or workflow]
AS: [Research-based persona - Marcus, Elena, Dr. James, Sarah, etc.]
BECAUSE: [What you're concerned about or want to validate]
LOOKING FOR: [Types of problems or insights based on delivered functionality]

SCENARIO CONTEXT:
THEME: [Rich user context from persona research]
SETUP: [Realistic pressures based on persona research]
PERSONA: [Specific research-based persona with direct quotes]

REALISTIC ACTIVITIES:
- [Activities testing delivered features only]
- [Include friction and patterns observed in research]
- [Test edge cases within delivered functionality]

EVIDENCE FRAMEWORK:
+ Things that worked well
- Problems discovered
? Questions raised
! Ideas for improvement

Duration: 60-90 minutes
Priority: [High/Medium/Low based on delivered feature risk and user impact]
```

## 🚀 Using test charters

### **Charter execution (60-90 minutes)**

```
📋 Setup (10 minutes)
├── Pick delivered feature area to explore
├── Choose realistic user context from research personas
└── Decide what questions to answer about delivered functionality

🔍 Exploration (45-70 minutes)
├── Follow realistic user workflows through delivered features
├── Try variations and edge cases within current capabilities
├── Note anything odd, slow, or confusing in delivered functionality
└── Test scenarios automation might miss

📝 Wrap-up (5-10 minutes)
├── Document key findings about delivered features
├── Identify follow-up actions for development team
└── Share insights with team
```

### **After completion**

1. **Summarise key discoveries** - Focus on delivered feature performance and user experience
2. **Create actionable reports** - Link findings to specific user impact and business risk
3. **Identify automation opportunities** - What scenarios should automated tests validate?
4. **Plan follow-up sessions** - Which delivered features need deeper investigation?

## 🔮 Delivered Feature Coverage

All current charters focus exclusively on **delivered functionality**:

### **Complete Exemption Notification Workflow**

- Project name entry and exemption creation (ML-1)
- Task list navigation and progress tracking (ML-9)
- Activity dates with enhanced validation (ML-10)
- Activity description entry (ML-11)
- Public register consent decisions (ML-12)
- Check answers before submission (ML-82)
- Submit notification and confirmation (ML-84)
- Application reference generation (ML-21)

### **Site Details Coordinate Entry Workflow**

- Location method selection - manual entry and file upload (ML-16)
- File type selection for upload (KML/Shapefile) (ML-69)
- Circle vs coordinate list selection (ML-17)
- Coordinate system selection (WGS84/OSGB36) (ML-18)
- Centre point coordinate entry with validation (ML-35)
- Circle width entry (ML-36)
- Site details review and completion (ML-37)

### **Review and Submission Workflow**

- Information verification and accuracy checking (ML-82)
- Declaration comprehension and submission confidence
- "Confirm and send" interaction patterns (ML-84)
- Application reference understanding and next steps (ML-21)
- Error detection and correction at final stage

### **Form Validation and Interaction Patterns**

- Enhanced validation with specific error messages
- Cross-form consistency and state management
- Accessibility and keyboard navigation
- Error recovery and user guidance

## 🔗 Related resources

- **[User stories](../user-stories/README.md)** - Requirements and acceptance criteria for delivered features
- **[Investigative testing guide](../test-strategy/investigative-testing.md)** - Complete framework and methodology
- **[Research-based personas](../personas/README.md)** - Evidence-based user types from direct research
- **[Testing heuristics](../test-strategy/heuristics.md)** - Systematic thinking frameworks for investigation
- **[Feature files](../../test/features/)** - Automated test scenarios that validate delivered functionality

## 🛠️ Testing tools & resources

- **[Big list of naughty strings](https://github.com/minimaxir/big-list-of-naughty-strings)** - Comprehensive collection of problematic input strings for testing form validation and edge cases

---

_Test charters provide ready-to-execute investigation plans that combine systematic exploration with realistic user scenarios - revealing how delivered features actually serve marine licensing users under authentic conditions based on real research insights._
