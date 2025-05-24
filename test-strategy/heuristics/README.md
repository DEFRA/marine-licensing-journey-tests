# Testing Heuristics - Systematic Test Discovery

This section covers **heuristic-driven testing approaches** that guide systematic exploration and test discovery for marine licensing applications.

> **📖 Source Attribution**  
> The **Heuristic Test Strategy Model (HTSM)** and testing heuristics concepts are based on the foundational work of **James Bach**, a leading expert in exploratory testing and context-driven testing. James Bach has pioneered the use of systematic heuristics for test discovery and strategy.
>
> The HTSM framework and heuristic approaches described here have been adapted for marine licensing domain testing while preserving the core principles that make heuristic-driven testing effective.

## 🧠 What Are Testing Heuristics?

Testing heuristics are **systematic thinking models** that help us:

- **Discover tests** we might not otherwise think of
- **Organise our thinking** about what to test and why
- **Communicate testing rationale** to stakeholders
- **Identify blind spots** in our testing approach

## 🏗️ Heuristic Test Strategy Model (HTSM)

The **HTSM v6.3** provides a comprehensive framework for test thinking:

### **Product Categories**

#### **Structure** - What the product is made of

- **Features** - Individual capabilities and functions
- **Interfaces** - APIs, UIs, integrations between components
- **Platform** - Operating systems, browsers, devices, infrastructure

#### **Behaviour** - What the product does

- **Functions** - Core business logic and calculations
- **Data** - Input processing, storage, transformation, output
- **Operations** - User workflows, system processes, background tasks

#### **Value** - What the product means to stakeholders

- **Users** - Different personas and their specific needs

### **Quality Criteria Applied to Marine Licensing**

For each **Product Category**, we apply **Quality Criteria**:

#### **Functional Quality**

```
Structure + Functional → Test all marine licensing features work correctly
Behaviour + Functional → Test exemption workflows execute properly
Value + Functional → Test users can complete their licensing tasks
```

#### **Usability Quality**

```
Structure + Usability → Test navigation and interface clarity
Behaviour + Usability → Test workflow efficiency and error recovery
Value + Usability → Test accessibility for all user personas
```

#### **Reliability Quality**

```
Structure + Reliability → Test system stability under load
Behaviour + Reliability → Test data persistence and backup/recovery
Value + Reliability → Test service availability for critical user journeys
```

## 🎯 Marine Licensing Testing Considerations

### **Domain-Specific Areas to Explore**

#### **Marine Licensing Applications**

Key areas that need systematic testing attention:

- **Different activity types** - Dredging, construction, cables, renewable energy projects
- **User types and experience levels** - First-time applicants vs experienced operators, internal staff vs external users
- **Regulatory requirements** - Environmental assessments, consultation periods, compliance validation
- **Geographic complexity** - Territorial waters, overlapping jurisdictions, coordinate systems
- **Integration points** - Planning systems, environmental databases, payment services
- **Timing and deadlines** - Seasonal restrictions, consultation periods, decision timelines
- **Document handling** - Upload validation, format requirements, evidence management
- **Workflow variations** - Different application paths, amendment processes, appeals

#### **Exemption Notifications**

Specific considerations for exemption testing:

- **Eligibility boundaries** - What qualifies, edge cases, exclusions
- **Environmental impact thresholds** - When exemptions apply vs full licensing
- **Documentation requirements** - Evidence needed, format validation
- **Geographic constraints** - Location-specific rules, protected areas
- **Timing factors** - Seasonal restrictions, advance notice requirements
- **Process variations** - Different exemption types, amendment workflows
- **Integration dependencies** - Environmental data sources, mapping services
- **Communication flows** - Notifications, confirmations, follow-up actions

### **User-Centred Testing**

#### **Testing with Personas** (From our marine licensing personas)

- **Fatima** (Case Officer) - Manual processes, system integration needs
- **Simon** (Marine Officer) - Field access, evidence gathering, enforcement
- **Amy** (Veteran Applicant) - Efficiency, familiar workflows, speed
- **Zofia** (Novice Applicant) - Guidance, clarity, location assistance

For each persona, ask:

- What would **frustrate** this user most?
- What **critical information** do they need?
- What **mistakes** might they make?
- What **accessibility barriers** might they face?

## 🔍 Exploratory Testing Charters

### **Charter Template**

```
Explore: [Area of the application]
With: [Tools, techniques, data]
To discover: [Types of information, risks, problems]
```

### **Example Charters**

#### **Data Quality Charter**

```
Explore: Location data entry for marine coordinates
With: Various coordinate formats, invalid inputs, boundary values
To discover: Data validation gaps, user confusion points, error handling
```

#### **User Journey Charter**

```
Explore: First-time exemption application workflow
With: Novice user persona, unfamiliar terminology, complex guidance
To discover: Usability barriers, content clarity issues, abandoned journeys
```

#### **Integration Charter**

```
Explore: Public register search functionality
With: Various search criteria, large datasets, API timeouts
To discover: Performance bottlenecks, search accuracy, error scenarios
```

## 🧪 Testing Techniques

### **Functional Testing Areas**

- **History and state** - How previous actions affect current behaviour
- **Visual presentation** - Layout, formatting, and display correctness
- **Comparison** - How does this compare to other licensing systems?
- **Claims validation** - Do features work as documented?
- **User expectations** - Does it behave as users would expect?
- **Purpose alignment** - Does it achieve its intended goals?
- **Platform compatibility** - Works across different browsers and devices
- **Regulatory compliance** - Meets legal and statutory requirements

### **Data Operations Testing**

- **Creating data** - Can users create new applications and exemptions?
- **Reading data** - Can users view their submissions and current status?
- **Updating data** - Can users modify their applications appropriately?
- **Deleting data** - Can users remove or withdraw applications when needed?

### **User Interface Testing**

- **Structure** - HTML validity and accessibility markup
- **Function** - JavaScript functionality and form submissions
- **Data handling** - Field validation and data persistence
- **Platform** - Browser compatibility and device responsiveness
- **Operations** - User workflows and task completion
- **Timing** - Performance, loading times, and timeouts

## 📊 Heuristic-Driven Test Planning

### **Risk-Based Heuristic Selection**

1. **High Risk Areas** - Use comprehensive heuristics (HTSM + domain-specific)
2. **Medium Risk Areas** - Focus on key quality criteria
3. **Low Risk Areas** - Apply quick smoke test heuristics

### **Session Planning**

```
Time-boxed Sessions → Specific charter →  Chosen techniques   →   Test notes  →  Results
     90 minutes        Location entry    Data + UI + Personas      Mind map     Bug reports
```

## 🎯 Practical Application

### **Daily Heuristic Practice**

1. **Start with HTSM** - Choose a product category and quality criteria
2. **Apply domain considerations** - Use the marine licensing testing areas above
3. **Consider personas** - How would each user type interact with this feature?
4. **Document discoveries** - Record interesting test ideas and potential risks

### **Heuristic Reviews**

Regular reviews of:

- **Which heuristics** are most effective for our domain
- **New heuristics** we discover through experience
- **Blind spots** our current heuristics might miss

## 🎭 Integration with Scenario Testing

### **Heuristics Inform Scenarios**

Our **systematic heuristics feed into rich scenario development**:

```
HTSM Product Categories → Scenario Context → Realistic Investigation
        ↓                      ↓                      ↓
    Structure              Setup & Activities     Real-world testing
    Behaviour             Oracles & Variations   Evidence collection
    Value                 User roles & friction   Quality insights
```

### **Scenarios Validate Heuristics**

**Scenario testing sessions** (see [Scenario Testing](../scenario-testing/README.md)) provide evidence for heuristic effectiveness:

- **Do our marine licensing heuristics discover real problems?**
- **Are we missing critical quality criteria in our HTSM application?**
- **Which domain-specific considerations matter most to actual users?**

### **Combined Approach Benefits**

#### **Systematic Coverage**

- **Heuristics ensure** we don't miss important test areas
- **Scenarios ensure** our testing reflects realistic usage patterns
- **Together** they provide comprehensive quality investigation

#### **Adaptive Strategy**

- **Heuristics guide** initial exploration and charter creation
- **Scenario findings** refine and improve our heuristic models
- **Continuous improvement** through evidence-based refinement

### **Practical Integration**

#### **Charter Development Process**

```
1. Use HTSM + Marine Licensing Heuristics → Identify test areas
2. Apply Domain Context + User Personas → Create scenario themes
3. Structure as Bolton Framework → Rich scenario charters
4. Execute with Guided Flexibility → Discover quality insights
5. Update Heuristics based on Findings → Improve future testing
```

#### **Example: From Heuristic to Scenario**

**HTSM Application:**

```
Product: Exemption workflow (Behaviour)
Quality: Usability
Marine Context: First-time applicant confusion
```

**Becomes Scenario Charter:**

```
THEME: Discover guidance gaps for users completely new to marine licensing

SETUP: Novice persona, assistive technology, realistic distractions

ACTIVITIES: Misinterpret terminology, skip guidance, make plausible errors

ORACLES: Error messages comprehensible, help contextual, recovery possible

VARIATIONS: Different devices, connection issues, varying digital literacy
```

**Findings Feed Back:**

- Update "Marine Context" heuristics based on discovered confusion patterns
- Refine "Usability Quality" criteria for marine licensing domain
- Enhance "First-time User" considerations with specific friction points

## 🔄 Continuous Heuristic Evolution

### **Evidence-Based Refinement**

Our heuristics evolve through:

- **Scenario session findings** - What patterns emerge from realistic testing?
- **Production issues** - What did we miss that users encountered?
- **User feedback** - What matters most to actual marine licensing users?
- **Team retrospectives** - Which heuristics help vs hinder our testing?

### **Domain-Specific Learning**

As we understand marine licensing better:

- **Add new domain heuristics** based on regulatory complexity discovered
- **Refine existing considerations** with user journey insights
- **Remove unhelpful models** that don't improve testing effectiveness
- **Share insights** with other government digital service teams

---

_Heuristics are thinking tools, not rigid rules. Adapt them to your context and use them to enhance your natural testing instincts._
