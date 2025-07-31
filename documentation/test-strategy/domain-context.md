# Domain context - Marine licensing testing reality

This section bridges **modern testing approaches** with the **specific realities** of marine licensing applications, ensuring our strategy serves real user needs.

## 🌊 Marine licensing domain understanding

### **Regulatory complexity**

Marine licensing involves **intricate regulatory requirements**:

- **Marine and Coastal Access Act 2009** - Primary legislation
- **Environmental impact assessments** - Complex evaluation criteria
- **Geographical jurisdictions** - UK territorial waters, exclusive economic zones
- **Activity classifications** - Different rules for different marine activities
- **Compliance monitoring** - Ongoing enforcement and validation

### **Real-world consequences**

Testing failures in marine licensing can lead to:

- **Environmental damage** - Unauthorised activities harming marine ecosystems
- **Legal non-compliance** - Applicants unknowingly breaking regulations
- **Economic impact** - Delayed projects costing millions
- **Public trust erosion** - Government service reliability questioned

## 👥 User reality & testing implications

### **From personas to test strategy**

Our [detailed personas](../personas/README.md) inform our testing approach:

#### **[David (Compliance Specialist)](../personas/david-compliance-specialist.md) - Central processing integration focus**

**Reality**: Manual processes, system switching, interruption-heavy environment

**Testing implications**:

```
🔍 Exploratory focus: Workflow efficiency under pressure
🤖 Automation focus: Data consistency across systems
📊 Metrics focus: Task completion time, error recovery
🎯 Risk focus: Information gaps leading to poor user support
```

#### **[Rachel (Enforcement Coordinator)](../personas/rachel-enforcement-coordinator.md) - Field & mobile testing**

**Reality**: Outdoor enforcement, limited connectivity, evidence gathering

**Testing implications**:

```
🔍 Exploratory focus: Mobile usability, offline capabilities
🤖 Automation focus: Data synchronisation, performance on slow networks
📊 Metrics focus: Mobile page load times, offline data integrity
🎯 Risk focus: Evidence loss, enforcement delays
```

#### **[Marcus (Infrastructure Professional)](../personas/marcus-infrastructure-professional.md) - Professional efficiency testing**

**Reality**: Repeated applications, time pressure, domain expertise

**Testing implications**:

```
🔍 Exploratory focus: Workflow shortcuts, data reuse opportunities
🤖 Automation focus: Form pre-population, validation accuracy
📊 Metrics focus: Task completion speed, keystroke efficiency
🎯 Risk focus: Regression in familiar workflows
```

#### **[Sarah (Discovery-First User)](../personas/sarah-discovery-first-user.md) - Accessibility & guidance testing**

**Reality**: Unfamiliar terminology, location data confusion, digital skills gaps

**Testing implications**:

```
🔍 Exploratory focus: Guidance clarity, error message helpfulness
🤖 Automation focus: Validation messages, accessibility compliance
📊 Metrics focus: Task abandonment rates, help usage patterns
🎯 Risk focus: Incorrect submissions, user exclusion
```

## 🎯 Domain-driven test strategy

### **Marine activity classification testing**

Different activities require different testing approaches:

#### **High-risk activities** (Offshore wind farms, major infrastructure)

- **Extensive validation** - Complex environmental and technical requirements
- **Integration testing** - Multiple system and stakeholder interactions
- **Performance testing** - Large datasets and concurrent users
- **Compliance testing** - Strict regulatory adherence validation

#### **Medium-risk activities** (Cable laying, marine surveys)

- **Workflow testing** - Standard processes with variations
- **Data quality testing** - Accurate location and activity data
- **User journey testing** - Efficient application processes

#### **Low-risk activities** (Minor repairs, routine maintenance)

- **Smoke testing** - Basic functionality validation
- **Regression testing** - Ensure changes don't break simple workflows

### **Geographical complexity testing**

```
UK Territorial Waters Testing:
├── England (Marine Management Organisation)
└── Northern Ireland (Department of Agriculture, Environment and Rural Affairs)

Each jurisdiction may have:
- Different application processes
- Varying data requirements
- Distinct validation rules
- Separate integration points
```

## 🧪 Context-specific testing techniques

### **Regulatory edge case testing**

Testing complex marine licensing rules with systematic validation:

```javascript
// Example: Marine activity date validation
describe('Marine Activity Application Windows', () => {
  const testCases = [
    { activityType: 'survey', minimumNotice: 28 },
    { activityType: 'construction', minimumNotice: 90 },
    { activityType: 'dredging', minimumNotice: 60 }
  ]

  testCases.forEach(({ activityType, minimumNotice }) => {
    it(`should require ${minimumNotice} days notice for ${activityType}`, () => {
      const application = {
        activityStartDate: new Date('2024-06-01'),
        applicationSubmissionDate: new Date('2024-04-01'),
        activityType
      }

      const actualNotice = daysBetween(
        application.applicationSubmissionDate,
        application.activityStartDate
      )

      expect(actualNotice).toBeGreaterThanOrEqual(minimumNotice)
    })
  })
})
```

### **Location data testing**

Marine coordinates present unique challenges:

```javascript
// Testing coordinate validation with real-world data
const marineLocationTests = [
  // UK territorial waters boundary cases
  { lat: 51.0, lng: 1.0, expected: 'UK_WATERS' },
  { lat: 55.0, lng: -2.0, expected: 'UK_WATERS' },
  { lat: 60.0, lng: -10.0, expected: 'OUTSIDE_UK_WATERS' },

  // Format conversion edge cases
  {
    input: '51°30\'26.6"N 0°07\'39.1"W',
    expected: { lat: 51.5074, lng: -0.1278 }
  },
  { input: 'Invalid format', expected: 'VALIDATION_ERROR' }
]
```

### **Seasonal & temporal testing**

Marine activities have time-sensitive considerations:

- **Breeding seasons** - Restrictions during wildlife breeding periods
- **Weather windows** - Seasonal activity limitations
- **Tidal considerations** - Activity timing dependencies
- **Environmental monitoring periods** - Data collection timing requirements

## 📊 Domain-specific quality metrics

### **Marine licensing success metrics**

- **Application completion rate** - Percentage of started applications submitted
- **Data accuracy rate** - Correct location and activity information
- **Time to approval** - Efficiency of processing workflows
- **User satisfaction** - Especially for accessibility and guidance

### **Risk-based quality indicators**

- **Compliance validation accuracy** - Correct regulatory requirement checking
- **Environmental data integrity** - Accurate impact assessment information
- **Integration reliability** - Successful data exchange with external systems
- **User journey completion** - Successful task completion across all personas

### **Context-aware test coverage**

Track coverage by:

- **Marine activity type** - Different activities, different test needs
- **User persona** - Coverage across all user types
- **Regulatory requirement** - Compliance rule validation
- **Integration point** - External system connection testing

## 🚀 Practical domain application

### **Daily testing decisions**

When planning testing activities, consider:

1. **Which marine activities** are affected by this change?
2. **Which user personas** will interact with this feature?
3. **What regulatory requirements** might be impacted?
4. **Which integration points** could be affected?

### **Work planning context**

Include domain expertise in planning:

- **Marine licensing specialists** validate test scenarios
- **User research insights** inform persona-based testing
- **Regulatory updates** drive compliance testing priorities
- **Integration dependencies** influence testing sequencing

### **Production readiness criteria**

Before release, validate:

- **All marine activity types** supported correctly
- **All user personas** can complete their journeys
- **Regulatory compliance** maintained across features
- **Integration reliability** with external marine licensing systems

---

_Domain context isn't just background information - it's the foundation that makes our testing relevant, realistic, and valuable to the people who depend on these systems._
