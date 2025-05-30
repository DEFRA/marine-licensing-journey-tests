# Testing Heuristics - Systematic Test Discovery

This section covers **heuristic-driven testing approaches** that guide systematic exploration and test discovery for marine licensing applications.

> **📖 Source Attribution**  
> The **Heuristic Test Strategy Model (HTSM)** concepts are based on the foundational work of **James Bach**. The HTSM framework described here has been adapted for marine licensing domain testing while preserving the core principles.

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
Explore: Complete exemption notification workflow for first-time applicant
With: Realistic project data, interruptions, mobile/desktop switching
To discover: Guidance gaps, workflow friction, accessibility barriers
```
