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

This section contains **investigative testing charters** for marine licensing user stories. Each charter provides structured guidance for **60-90 minute investigation sessions** that combine systematic exploration with realistic user scenarios.

> **🔗 Powered by investigative testing**  
> These charters implement the **[investigative testing](../test-strategy/investigative-testing.md)** approach - combining session-based structure with rich scenario content and systematic heuristics.

## 🧠 Charter purpose

Test charters bridge the gap between:

- **User story requirements** - What the feature should do
- **Systematic investigation** - How we discover what it actually does through realistic scenarios
- **Real user needs** - Whether it serves marine licensing personas effectively
- **Evidence collection** - Actionable insights for development teams

## 📋 Available investigation sessions

| Theme                           | Charter name                                | Focus                                                     | Personas             | Priority | Status     |
| ------------------------------- | ------------------------------------------- | --------------------------------------------------------- | -------------------- | -------- | ---------- |
| **First-time user experience**  | [Novice journey](./novice-journey.md)       | Complete application flow for marine licensing newcomers  | Sarah                | High     | 🔄 Updated |
| **Professional workflows**      | [Expert workflows](./expert-workflows.md)   | Professional user patterns within delivered functionality | Elena, Marcus, James | High     | 🔄 Updated |
| **Form behaviour & validation** | [Form interactions](./form-interactions.md) | Input validation, error handling, conditional logic       | All                  | High     | 🔄 Ready   |
| **Spatial data entry**          | [Site details](./site-details.md)           | Coordinate system selection and location method choices   | All                  | High     | 🔄 Updated |

### **Charter lifecycle**

**Charters are refreshed on every release** to ensure they remain aligned with current system functionality:

- **New features** → New charters created to investigate user experience and integration
- **Changed features** → Existing charters updated to reflect new behaviour and workflows
- **Removed features** → Obsolete charters archived to maintain focus on delivered functionality
- **User feedback** → Charter priorities and focus areas adjusted based on real user insights

**Beta Research Integration**: Current charters incorporate relevant beta research insights that apply to delivered functionality, while insights about undelivered features are captured for future charter development.

This approach ensures our investigation sessions always target the **actual delivered system** rather than outdated assumptions about functionality.

## 🏗️ Charter structure

All charters follow the **investigative testing framework**:

```
EXPLORE: [Area of application or workflow]
AS: [Type of user - MMO staff, applicant, etc.]
BECAUSE: [What you're concerned about or want to validate]
LOOKING FOR: [Types of problems or insights you hope to find]

SCENARIO CONTEXT:
THEME: [Rich user context - what authentic situation are we investigating?]
SETUP: [Realistic pressures, friction, and environment]
PERSONA: [Which marine licensing user type - Sarah, Elena, Marcus, Dr. James, Rachel, David]

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

## 🚀 Using test charters

### **Charter execution (60-90 minutes)**

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

### **After completion**

1. **Summarise key discoveries** - Include both technical and user experience insights
2. **Create actionable reports** - Link findings to specific user impact and business risk
3. **Identify automation opportunities** - What scenarios should automated tests validate?
4. **Plan follow-up sessions** - Which areas need deeper investigation or different persona perspectives?

## 🔮 Future Charter Considerations (Beta Research Insights)

The following insights from beta user research will inform future charter development as new functionality is delivered:

### **Multiple Sites Workflow (Not Yet Delivered)**

- _"Two users were uncertain if it was acceptable to provide a single location polygon where the activity occurs or if they needed to provide separate sites for each"_
- **Future Charter Need**: Complex multi-site project management testing once this functionality is built

### **Collaboration and Dependencies (Not Yet Delivered)**

- _"Even frequent organisational users struggle with providing location details and rely on colleagues to supply this"_
- **Future Charter Need**: Team-based workflow testing when collaboration features are implemented

### **File Upload Functionality (Not Yet Delivered)**

- _"Shapefiles are the preferred format. KML is seen as less accurate and more for public use"_
- **Future Charter Need**: File upload testing across different professional workflows once implemented

### **Map Drawing (Not Yet Delivered)**

- _"Some pro users would like to draw on a map and most users we spoke to ask a GIS specialist to prepare their shapefile"_
- **Future Charter Need**: Map-based interface testing when drawing functionality is available

## 🔗 Related resources

- **[User stories](../user-stories/README.md)** - Requirements and acceptance criteria for delivered features
- **[Investigative testing guide](../test-strategy/investigative-testing.md)** - Complete framework and methodology
- **[Domain context](../test-strategy/domain-context.md)** - Marine licensing personas and user context
- **[Testing heuristics](../test-strategy/heuristics.md)** - Systematic thinking frameworks for investigation
- **[Feature files](../../test/features/)** - Automated test scenarios that validate delivered functionality

## 🛠️ Testing tools & resources

- **[Big list of naughty strings](https://github.com/minimaxir/big-list-of-naughty-strings)** - Comprehensive collection of problematic input strings for testing form validation and edge cases

---

_Test charters provide ready-to-execute investigation plans that combine systematic exploration with realistic user scenarios - revealing how delivered features actually serve marine licensing users under authentic conditions._
