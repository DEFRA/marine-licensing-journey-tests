# Domain Context - Marine Licensing Testing Reality

This section bridges **modern testing approaches** with the **specific realities** of marine licensing applications, ensuring our strategy serves real user needs.

## 🌊 Marine Licensing Domain Understanding

### **Regulatory Complexity**

Marine licensing involves **intricate regulatory requirements**:

- **Marine and Coastal Access Act 2009** - Primary legislation
- **Environmental impact assessments** - Complex evaluation criteria
- **Geographical jurisdictions** - UK territorial waters, exclusive economic zones
- **Activity classifications** - Different rules for different marine activities
- **Compliance monitoring** - Ongoing enforcement and validation

### **Real-World Consequences**

Testing failures in marine licensing can lead to:

- **Environmental damage** - Unauthorised activities harming marine ecosystems
- **Legal non-compliance** - Applicants unknowingly breaking regulations
- **Economic impact** - Delayed projects costing millions
- **Public trust erosion** - Government service reliability questioned

## 👥 User Reality & Testing Implications

### **From Personas to Test Strategy**

#### **Fatima (Case Officer) - Integration Testing Focus**

**Reality**: Manual processes, system switching, interruption-heavy environment

**Testing Implications**:

```
🔍 Exploratory Focus: Workflow efficiency under pressure
🤖 Automation Focus: Data consistency across systems
📊 Metrics Focus: Task completion time, error recovery
🎯 Risk Focus: Information gaps leading to poor user support
```

#### **Simon (Marine Officer) - Field & Mobile Testing**

**Reality**: Outdoor enforcement, limited connectivity, evidence gathering

**Testing Implications**:

```
🔍 Exploratory Focus: Mobile usability, offline capabilities
🤖 Automation Focus: Data synchronisation, performance on slow networks
📊 Metrics Focus: Mobile page load times, offline data integrity
🎯 Risk Focus: Evidence loss, enforcement delays
```

#### **Amy (Veteran Applicant) - Efficiency Testing**

**Reality**: Repeated applications, time pressure, domain expertise

**Testing Implications**:

```
🔍 Exploratory Focus: Workflow shortcuts, data reuse opportunities
🤖 Automation Focus: Form pre-population, validation accuracy
📊 Metrics Focus: Task completion speed, keystroke efficiency
🎯 Risk Focus: Regression in familiar workflows
```

#### **Zofia (Novice Applicant) - Accessibility & Guidance Testing**

**Reality**: Unfamiliar terminology, location data confusion, digital skills gaps

**Testing Implications**:

```
🔍 Exploratory Focus: Guidance clarity, error message helpfulness
🤖 Automation Focus: Validation messages, accessibility compliance
📊 Metrics Focus: Task abandonment rates, help usage patterns
🎯 Risk Focus: Incorrect submissions, user exclusion
```

## 🎯 Domain-Driven Test Strategy

### **Marine Activity Classification Testing**

Different activities require different testing approaches:

#### **High-Risk Activities** (Offshore wind farms, major infrastructure)

- **Extensive validation** - Complex environmental and technical requirements
- **Integration testing** - Multiple system and stakeholder interactions
- **Performance testing** - Large datasets and concurrent users
- **Compliance testing** - Strict regulatory adherence validation

#### **Medium-Risk Activities** (Cable laying, marine surveys)

- **Workflow testing** - Standard processes with variations
- **Data quality testing** - Accurate location and activity data
- **User journey testing** - Efficient application processes

#### **Low-Risk Activities** (Minor repairs, routine maintenance)

- **Smoke testing** - Basic functionality validation
- **Regression testing** - Ensure changes don't break simple workflows

### **Geographical Complexity Testing**

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

## 🧪 Context-Specific Testing Techniques

### **Regulatory Edge Case Testing**

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

### **Location Data Testing**

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

### **Seasonal & Temporal Testing**

Marine activities have time-sensitive considerations:

- **Breeding seasons** - Restrictions during wildlife breeding periods
- **Weather windows** - Seasonal activity limitations
- **Tidal considerations** - Activity timing dependencies
- **Environmental monitoring periods** - Data collection timing requirements

## 📊 Domain-Specific Quality Metrics

### **Marine Licensing Success Metrics**

- **Application completion rate** - Percentage of started applications submitted
- **Data accuracy rate** - Correct location and activity information
- **Time to approval** - Efficiency of processing workflows
- **User satisfaction** - Especially for accessibility and guidance

### **Risk-Based Quality Indicators**

- **Compliance validation accuracy** - Correct regulatory requirement checking
- **Environmental data integrity** - Accurate impact assessment information
- **Integration reliability** - Successful data exchange with external systems
- **User journey completion** - Successful task completion across all personas

### **Context-Aware Test Coverage**

Track coverage by:

- **Marine activity type** - Different activities, different test needs
- **User persona** - Coverage across all user types
- **Regulatory requirement** - Compliance rule validation
- **Integration point** - External system connection testing

## 🚀 Practical Domain Application

### **Daily Testing Decisions**

When planning testing activities, consider:

1. **Which marine activities** are affected by this change?
2. **Which user personas** will interact with this feature?
3. **What regulatory requirements** might be impacted?
4. **Which integration points** could be affected?

### **Work Planning Context**

Include domain expertise in planning:

- **Marine licensing specialists** validate test scenarios
- **User research insights** inform persona-based testing
- **Regulatory updates** drive compliance testing priorities
- **Integration dependencies** influence testing sequencing

### **Production Readiness Criteria**

Before release, validate:

- **All marine activity types** supported correctly
- **All user personas** can complete their journeys
- **Regulatory compliance** maintained across features
- **Integration reliability** with external marine licensing systems

---

_Domain context isn't just background information - it's the foundation that makes our testing relevant, realistic, and valuable to the people who depend on these systems._
