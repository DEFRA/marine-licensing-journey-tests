# Marine Licensing Journey Tests - Modern Test Strategy

This directory contains the **modern test strategy** for marine licensing journey tests, emphasising **heuristic-driven testing**, **automation-first approaches**, and **context-driven quality engineering**.

## 📖 Living Document

This test strategy is a **living document** that:

- 📝 **Evolves with our testing practices** - Updated as we learn and improve
- 🔄 **Version controlled alongside our tests** - Changes tracked and reviewed like code
- 🤝 **Collaborative** - Team contributions welcome through pull requests
- 🎯 **Reflects current reality** - Kept in sync with actual testing approaches and tools
- 📈 **Evidence-driven** - Updated based on testing effectiveness and team feedback

The strategy grows with the team's understanding and the marine licensing domain complexity.

## 🎯 Current Focus: Private Beta Exemption Notifications

Our testing strategy is currently aligned with delivering a **private beta** that enables **members of the public to submit exemption notifications to the Marine Management Organisation (MMO)**.

### **Testing Priorities for Private Beta**

- 🌊 **Core exemption workflow** - Validating the complete user journey from notification start to submission
- 👥 **Public user experience** - Testing accessibility, guidance, and usability for external users
- 📋 **Essential functionality** - Ensuring reliable operation of the core notification features
- 🔒 **Beta readiness** - Quality validation suitable for limited user testing and feedback

### **Strategic Testing Focus**

Our testing approach prioritises:

1. **User journey completion** - End-to-end validation of exemption notification workflows
2. **Accessibility compliance** - GOV.UK standards for inclusive public services
3. **Error handling** - Graceful handling of user mistakes and system issues
4. **Data validation** - Accurate capture and processing of exemption notification data

This focus ensures our testing strategy directly supports the successful delivery of the private beta, providing confidence in the exemption notification functionality that real users will depend on.

## 🧠 Modern Testing Philosophy

Our testing approach is built on **contemporary quality engineering principles** and **foundational testing methodologies** developed by leading practitioners:

### **Built on Proven Foundations**

- **Context-Driven Testing** - _Cem Kaner, James Bach, Michael Bolton_ - Strategy adapts to the specific marine licensing domain
- **Heuristic Test Strategy Model (HTSM)** - _James Bach_ - Systematic thinking models guide test discovery
- **Session-Based Test Management** - _Jon Bach_ - Structured exploratory testing with accountability
- **Scenario Testing** - _Michael Bolton_ - Rich, realistic user investigation breaking "test case addiction"
- **Rapid Software Testing** - _James Bach, Michael Bolton_ - Methodology and training approach for effective testing
- **Risk-Based Testing** - _Elisabeth Hendrickson, James Bach_ - Focus effort where it matters most
- **Agile Testing Practices** - _Elisabeth Hendrickson, Janet Gregory, Lisa Crispin_ - Whole-team quality and continuous feedback

These proven methodologies are adapted for marine licensing domain requirements whilst preserving their essential insights and principles.

> **📚 Complete Attribution**  
> See **[ATTRIBUTION.md](./ATTRIBUTION.md)** for comprehensive acknowledgments, references, and recommended reading from the thought leaders whose work we build upon.

### **Modern Application Principles**

- 🎯 **Context-driven testing** - Strategy adapts to the specific marine licensing domain
- 🔍 **Heuristic-based exploration** - Systematic thinking models guide test discovery
- 🤖 **Automation as a foundation** - Fast feedback through comprehensive automation
- 👥 **Whole-team quality** - Testing is everyone's responsibility, not just testers
- 📊 **Evidence-based decisions** - Data and metrics drive testing investments

## 🔄 Evolution from Traditional Testing Approaches

### **Building on Strong Foundations**

This strategy **builds upon and modernises** established testing principles from the Marine Planning and Licensing Programme Test Strategy, preserving the essential intentions whilst adopting contemporary practices that deliver better outcomes.

### **Core Intentions Preserved**

- ✅ **Risk-based focus** - Still prioritise high-impact, high-risk areas
- ✅ **User-centred approach** - Still ensure real user needs are met
- ✅ **Quality assurance** - Still maintain high standards and governance
- ✅ **Comprehensive coverage** - Still validate all critical functionality
- ✅ **Business alignment** - Still ensure testing serves organisational goals

### **Methods Evolved for Better Results**

| **Traditional Challenge**    | **Modern Solution**                                   | **Benefit Delivered**                            |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| **Manual test execution**    | **Automation-first with strategic human insight**     | ⚡ Faster feedback, 🔄 continuous validation     |
| **Document-heavy planning**  | **Living documentation and collaborative planning**   | 📈 Always current, 🤝 team alignment             |
| **Phase-gate approvals**     | **Automated quality metrics and evidence**            | 🚀 Faster delivery, 📊 better decisions          |
| **Risk register management** | **Heuristic-driven exploration and discovery**        | 🔍 Uncover unknown risks, 💡 systematic thinking |
| **Test case libraries**      | **Context-driven scenarios and exploratory charters** | 🎯 Relevant testing, 🧠 adaptive approach        |
| **Formal defect lifecycle**  | **Fast feedback loops and continuous improvement**    | 🏃 Quick resolution, 📈 prevention focus         |

### **Enhanced Capabilities**

#### **From Test Planning to Quality Engineering**

```
Traditional: Create comprehensive test plans for approval
Modern: Build quality into development workflows with continuous feedback

Benefits:
→ Faster time to market
→ Higher quality outcomes
→ Reduced rework and waste
→ Better team collaboration
```

#### **From Test Execution to Intelligent Investigation**

```
Traditional: Execute predefined test cases systematically
Modern: Combine automation for known scenarios with exploration for discovery

Benefits:
→ Find issues automation misses
→ Understand user experience deeply
→ Adapt testing to real conditions
→ Continuous learning and improvement
```

#### **From Risk Mitigation to Value Optimisation**

```
Traditional: Identify and mitigate testing risks
Modern: Use systematic heuristics to discover opportunities and threats

Benefits:
→ Proactive quality improvement
→ Better user satisfaction
→ Reduced production incidents
→ Informed strategic decisions
```

### **Same Goals, Better Outcomes**

Both approaches share fundamental goals:

- **Deliver quality software** that serves marine licensing users
- **Manage risks effectively** to protect environmental and business interests
- **Ensure regulatory compliance** with marine licensing requirements
- **Provide confidence** for production releases

The **modern approach achieves these goals more effectively** through:

- **Faster feedback cycles** - Issues found and fixed quickly
- **Better user understanding** - Real personas and accessibility focus
- **Adaptive strategies** - Responsive to changing needs and discoveries
- **Evidence-based decisions** - Data and metrics guide investments
- **Sustainable practices** - Maintainable automation and effective human insight

### **Integration with Existing Governance**

This strategy **complements existing organisational governance**:

- **DDTS alignment** - Adopts modern practices whilst respecting organisational standards
- **Risk management** - Enhanced risk discovery through systematic heuristics
- **Compliance assurance** - Automated validation of regulatory requirements
- **Stakeholder confidence** - Evidence-based quality metrics and transparent reporting

## 🧭 Strategy Structure

### **🧠 Context & Discovery**

- **[Testing Heuristics](./heuristics/README.md)** - HTSM and systematic exploration techniques
- **[Domain Context](./domain-context/README.md)** - Marine licensing specifics and user reality

### **🤖 Automation Strategy**

- **[Automation Approach](./automation/README.md)** - Test pyramid, tooling, and automation strategy
- **[Test Data Management](./test-data/README.md)** - Data strategies for reliable automation

### **👥 Human-Centred Testing**

- **[Investigative Testing](./investigative-testing/README.md)** - Session-based exploration using scenario investigations and systematic heuristics
- **[Test Charters](../test-charters/README.md)** - Systematic exploration of user stories and requirements
- **[Accessibility Testing](./accessibility/README.md)** - Inclusive design and GOV.UK compliance

### **📊 Quality Intelligence**

- **[Security Testing](./security/README.md)** - Security-by-design and threat testing

### **🔄 Continuous Improvement**

- **[Quality Coaching](./coaching/README.md)** - Skills development and knowledge sharing

## 🎯 Quick Access

| **I want to...**                             | **Go to...**                                               |
| -------------------------------------------- | ---------------------------------------------------------- |
| Explore systematically using test heuristics | [Testing Heuristics](./heuristics/README.md)               |
| Investigate with realistic user scenarios    | [Investigative Testing](./investigative-testing/README.md) |
| Create exploratory charters for user stories | [Test Charters](../test-charters/README.md)                |
| Build robust test automation                 | [Automation Approach](./automation/README.md)              |
| Understand marine licensing user needs       | [Domain Context](./domain-context/README.md)               |
| Test accessibility and inclusion             | [Accessibility Testing](./accessibility/README.md)         |

## 🔬 Testing Approach

### **Heuristic-Driven Testing**

We use **systematic thinking models** to guide our testing:

```
HTSM Categories → Product Factors → Quality Criteria → Test Ideas
    ↓                   ↓                ↓                 ↓
Structure            Features         Functional      Happy path tests
Behaviour            Users            Usability       User journey tests
Data                 Platforms        Reliability     Error handling tests
```

**Examples of HTSM in Practice:**

- **Structure Testing** - Page layout, navigation, form structure across browsers
- **Behaviour Testing** - User interactions, error handling, workflow completion
- **Data Testing** - Input validation, data persistence, integration accuracy

### **Test Pyramid Strategy**

Our **automation strategy** prioritises efficient feedback and sustainable quality assurance:

```
🔺 Strategic Investigative Testing
   ├── Domain expert-led exploration
   ├── Risk-focused scenarios
   └── Accessible investigation techniques

🔺 UI Integration Tests (Primary Focus)
   ├── Complete user journeys
   ├── Cross-browser compatibility
   └── Accessibility automation

🔺 API Tests (Planned - High ROI)
   ├── Business logic validation
   ├── Data integrity checks
   └── Performance testing

🔺 Unit Tests (Excellent Coverage)
   ├── Component behaviour validation
   ├── Business logic and validation rules
   └── Error handling and edge cases
```

**Automation-First Philosophy**: Given the critical nature of marine licensing and the need for sustainable quality assurance, automation provides the foundation for reliable, repeatable validation whilst freeing up time for high-value investigative work.

### **Investigative Testing Framework**

We use a **pragmatic approach** that combines automation confidence with targeted human insight:

- **Automation provides the foundation** - Comprehensive automated validation of known scenarios
- **Domain experts lead investigation** - MMO staff and business analysts bring essential context
- **Risk-focused exploration** - Concentrate investigative effort where it matters most
- **Accessible techniques** - Investigation methods that work for non-testing specialists

**Key Principle**: Investigative testing complements automation by exploring areas where human insight and domain knowledge are essential - not replacing systematic validation that automation does better.

### **Context-Driven Quality**

Testing strategies **adapt to context**:

- **Marine licensing domain** - Complex regulations and specialist user needs
- **Government service** - Accessibility, inclusion, and public accountability
- **BDD implementation** - Living documentation and collaboration
- **Continuous delivery** - Fast feedback and quality gates

### **Performance Approach for Low-Volume Applications**

**Context**: Marine licensing exemptions (~20 per month) are **low-volume, high-complexity** applications requiring **user experience focus** rather than **load testing**.

**Performance Strategy**:

- **User experience performance** - Validated through automation approach (page responsiveness, form efficiency)
- **Accessibility performance** - Inclusive speed across devices and assistive technologies
- **Data integrity under concurrent access** - Addressed through investigative testing scenarios
- **Technical complexity handling** - Covered in domain-specific heuristics and user journey validation

**Why no dedicated performance testing**: Load and scalability testing provide minimal value for ~20 monthly applications. Resources are better invested in **user experience quality** and **technical complexity validation** that serve actual user needs.

**Adaptive approach**: This performance strategy will be **reviewed and adapted** as the project progresses. Should volume increase significantly, user patterns change, or new performance requirements emerge, we will adjust our approach accordingly whilst maintaining focus on **context-driven quality** that serves real user needs.

## 🧪 Quality Engineering Practices

### **🔬 Modern Testing Techniques**

Our strategy incorporates evidence-based testing practices:

- **Heuristic-driven exploration** - Systematic thinking frameworks guide discovery
- **Risk-based test prioritisation** - Focus effort where it matters most
- **Accessibility-first testing** - Inclusive design validation from the start
- **Cross-browser compatibility** - Reliable user experience across platforms
- **Performance consciousness** - Testing with realistic network and device conditions

### **Quality Metrics That Matter**

- **Lead time for changes** - How quickly can we deliver quality features?
- **Mean time to recovery** - How fast do we detect and fix issues?
- **Deployment frequency** - How often do we ship with confidence?
- **User satisfaction** - Are we solving real user problems effectively?
- **Accessibility compliance** - Meeting GOV.UK standards consistently

## 🎪 Integration with Project

This strategy builds on existing project foundations:

- **[Screenplay Pattern](../.cursor/rules/screenplay-pattern.mdc)** - User-centric test automation
- **[BDD Rules](../.cursor/rules/bdd.rules.mdc)** - Living documentation practices
- **[Clean Code](../.cursor/rules/playbook.clean.code.mdc)** - Maintainable test code
- **[User Stories](../.cursor/user-stories/README.md)** - Real user needs and acceptance criteria
- **[Test Charters](../test-charters/README.md)** - Systematic exploration guidance

## 🚀 Getting Started

### **For Quality Engineering**

**Immediate Focus**

1. **Strengthen automation foundation** - Prioritise UI integration tests for critical user journeys
2. **Establish baseline coverage** - Ensure core exemption workflow is comprehensively automated
3. **Create investigation framework** - Simple, accessible approaches for domain expert collaboration

**Ongoing Development**

1. **Gradual API testing adoption** - Plan API test layer when development capacity allows
2. **Collaborative investigation** - Work with MMO staff on targeted risk areas
3. **Continuous improvement** - Refine approaches based on what delivers most value

### **For Domain Experts**

**Contributing to Quality Assurance**

1. **Review automated test scenarios** - Validate that BDD scenarios match real-world usage
2. **Lead targeted investigations** - Apply marine licensing expertise to explore risk areas
3. **Provide user perspective** - Help identify scenarios automation might miss

**Practical Participation**

1. **Start with familiar areas** - Investigate workflows you know well
2. **Focus on user experience** - Apply domain knowledge to assess usability and accuracy
3. **Document insights** - Share findings to improve both automation and user guidance

### **For Development Team**

**Quality-First Development**

1. **BDD scenario review** - Ensure Gherkin scenarios reflect actual business requirements
2. **Automation-friendly design** - Build with testability in mind
3. **Collaborative testing** - Work with domain experts during feature development

**Sustainable Practices**

1. **Maintain automation health** - Keep tests reliable and fast
2. **Support investigation needs** - Provide test data and environments for exploration
3. **Quality gate integration** - Use automation results for deployment confidence

## 📊 Success Measures

### **Quality Indicators**

- **Bug escape rate** - Issues found in production vs pre-production
- **Test automation coverage** - Percentage of user journeys automated
- **Accessibility compliance** - WCAG 2.1 AA standard achievement
- **Cross-browser compatibility** - Consistent experience across target browsers

### **Efficiency Indicators**

- **Test execution time** - Speed of feedback from automated tests
- **Test maintenance overhead** - Time spent maintaining vs creating tests
- **Defect resolution time** - Speed of issue identification and fix
- **Release confidence** - Team confidence in deployment readiness

### **User-Centered Indicators**

- **Persona coverage** - How well testing represents real user needs
- **Realistic scenario validation** - Testing under authentic conditions
- **Accessibility user feedback** - Real user experience with assistive technology
- **Usability issue discovery** - Problems found through exploratory testing

---

_Quality is everyone's responsibility. This strategy provides the framework for building quality into everything we do while serving the real needs of marine licensing users._

| **Strategy Area**                 | **Documentation**                                          |
| --------------------------------- | ---------------------------------------------------------- |
| Build domain expertise            | [Domain Context](./domain-context/README.md)               |
| Run regular investigative testing | [Investigative Testing](./investigative-testing/README.md) |
| Automate repetitive scenarios     | [Automation](./automation/README.md)                       |
| Ensure accessibility compliance   | [Accessibility](./accessibility/README.md)                 |
| Coach quality skills              | [Coaching](./coaching/README.md)                           |
| Document investigation sessions   | [Test Charters](../test-charters/README.md)                |
