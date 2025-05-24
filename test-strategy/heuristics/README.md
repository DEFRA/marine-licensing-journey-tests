# Testing Heuristics - Systematic Test Discovery

This section covers **heuristic-driven testing approaches** that guide systematic exploration and test discovery for marine licensing applications.

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
- **Market** - Competitive landscape and positioning
- **Business** - Revenue, compliance, reputation impacts

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

## 🎯 Marine Licensing Heuristics

### **Domain-Specific Exploration**

#### **MARINE Heuristic** (Marine Application Risk Investigation & Exploration)

- **M**arine activities - Different types of licensing requirements
- **A**pplicant types - Veteran vs novice users, internal vs external
- **R**egulatory compliance - Legal requirements and edge cases
- **I**ntegration points - External systems, APIs, data flows
- **N**on-functional aspects - Performance, security, accessibility
- **E**rror scenarios - What happens when things go wrong

#### **EXEMPTION Heuristic** (Exemption eXploration & Edge-case Mapping)

- **E**ligibility criteria - Who qualifies and who doesn't
- **X**ceptions and edge cases - Boundary conditions
- **E**nvironmental factors - Impact assessments and constraints
- **M**ulti-user scenarios - Collaborative workflows
- **P**rocess variations - Different application paths
- **T**iming considerations - Deadlines, seasonal factors
- **I**ntegration dependencies - External system requirements
- **O**perational impacts - Support and maintenance needs
- **N**otification workflows - Communication and alerts

### **User-Centred Heuristics**

#### **PERSONAS Application** (From our marine licensing personas)

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

## 🧪 Testing Mnemonics and Models

### **HICCUPPS** (for testing functional requirements)

- **H**istory - What happened before affects current state
- **I**mage - Visual representation and layout correctness
- **C**omparable Products - How do other licensing systems work?
- **C**laims - Do the marketing/documentation claims hold true?
- **U**ser Expectations - Does it work as users expect?
- **P**urpose - Does it fulfil its intended purpose?
- **P**latform - Does it work across different environments?
- **S**tatutes - Does it comply with legal/regulatory requirements?

### **CRUD** (for data operations)

- **C**reate - Can users create new applications/exemptions?
- **R**ead - Can users view their submissions and status?
- **U**pdate - Can users modify their applications?
- **D**elete - Can users remove or withdraw applications?

### **SFDPOT** (for UI testing)

- **S**tructure - HTML validity, accessibility markup
- **F**unction - JavaScript functionality, form submissions
- **D**ata - Field validation, data persistence
- **P**latform - Browser compatibility, device responsiveness
- **O**perations - User workflows and task completion
- **T**ime - Performance, loading times, timeouts

## 📊 Heuristic-Driven Test Planning

### **Risk-Based Heuristic Selection**

1. **High Risk Areas** - Use comprehensive heuristics (HTSM + domain-specific)
2. **Medium Risk Areas** - Focus on key quality criteria
3. **Low Risk Areas** - Apply quick smoke test heuristics

### **Session Planning**

```
Time-boxed Sessions → Specific charter → Chosen heuristics → Test notes → Results
     90 minutes      Location entry    CRUD + PERSONAS     Mind map    Bug reports
```

### **Coverage Tracking**

Track which **heuristics** have been applied to which **product areas**:

| Feature         | Structure | Behaviour | Value | Functional | Usability | Reliability |
| --------------- | --------- | --------- | ----- | ---------- | --------- | ----------- |
| Project Name    | ✅        | ✅        | ✅    | ✅         | ⚠️        | ❌          |
| Public Register | ✅        | ⚠️        | ✅    | ✅         | ✅        | ❌          |
| Location Entry  | ❌        | ✅        | ⚠️    | ✅         | ❌        | ❌          |

**Legend**: ✅ Covered, ⚠️ Partially covered, ❌ Not covered

## 🎯 Practical Application

### **Daily Heuristic Practice**

1. **Start with HTSM** - Choose a product category and quality criteria
2. **Apply domain heuristics** - Use MARINE or EXEMPTION for marine licensing
3. **Consider personas** - How would each user type interact with this feature?
4. **Document discoveries** - Record interesting test ideas and potential risks

### **Heuristic Reviews**

Regular reviews of:

- **Which heuristics** are most effective for our domain
- **New heuristics** we discover through experience
- **Blind spots** our current heuristics might miss

---

_Heuristics are thinking tools, not rigid rules. Adapt them to your context and use them to enhance your natural testing instincts._
