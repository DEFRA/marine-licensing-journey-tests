# Automation Approach - Modern Test Automation Strategy

This section covers **test automation strategy**, **quality engineering practices**, and **continuous testing approaches** for marine licensing applications.

## 🚀 Automation Philosophy

### **Automation-first principles**

- 🤖 **Automate by default** - Manual testing is the exception, not the rule
- ⚡ **Fast feedback loops** - Tests run in minutes, not hours
- 🔄 **Shift-left testing** - Catch issues early in the development cycle
- 🏗️ **Test pyramid thinking** - Right tests at the right level
- 📊 **Data-driven decisions** - Metrics guide automation investments

### **Quality engineering mindset**

- **Prevention over detection** - Build quality in, don't inspect it in
- **Collaboration over handoffs** - Whole team responsibility for test automation
- **Continuous improvement** - Regular retrospection on automation effectiveness

## 🔺 Test Automation Strategy

Our current automation focuses on **UI-based end-to-end testing** with plans for future API layer testing:

```
           🎭 E2E Tests (Current Focus)
         ┌─────────────────────────────────┐
         │ Complete User Journeys          │       ← Current implementation
         │ Cross-browser Compatibility     │          Fast execution via WebDriverIO
         │ Accessibility Validation        │          Comprehensive coverage
         │ Marine Licensing Workflows      │
         └─────────────────────────────────┘
              🔌 API Tests (Future)
         ┌──────────────────────────────────────┐
         │ Business Logic Validation            │  ← Planned for backend repo
         │ Integration with Mocked Dependencies │    marine-licensing-backend
         │ Data Validation & Error Handling     │    Fast feedback for logic
         │ Service Contract Testing             │
         └──────────────────────────────────────┘
```

### **Current implementation: UI-first testing**

**Why UI-focused works well for us:**

- ⚡ **Already extremely fast** - WebDriverIO + Cucumber provides rapid feedback
- 🎯 **User-centric validation** - Tests real user journeys end-to-end
- 🔄 **Complete integration** - Frontend, backend, and external services tested together
- 🎭 **BDD alignment** - Gherkin scenarios match business requirements perfectly

### **Future enhancement: API layer testing**

**Planned addition in `marine-licensing-backend` repository:**

- 🔧 **Business logic isolation** - Test complex marine licensing rules independently
- 🎭 **Mock external dependencies** - Reliable testing without external service dependencies
- ⚡ **Fast feedback loops** - Quick validation of backend changes
- 🧪 **Edge case exploration** - Easier to test complex data scenarios at API level

## 🧪 Current Testing Implementation

### **Current E2E tests (UI layer) - Complete journey coverage**

**Purpose**: Validate complete user workflows work together
**Coverage**: Essential marine licensing user journeys

```gherkin
# Example: Critical exemption notification journey
Feature: Complete exemption notification
  Scenario: Successful exemption submission
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed
    And the project name task is marked as completed

  Scenario: Validating project name input
    Given the project name page is displayed
    When entering an invalid project name
    Then appropriate validation errors are displayed

  Scenario: Managing public register consent
    Given the Public register page is displayed
    When choosing not to withhold information from the public register
    Then the "Public register" task status is "Completed"
    And the public register information is saved
```

**Current tools & technologies**:

- **WebDriverIO** with Screenplay pattern
- **Cucumber** for BDD and living documentation
- **Allure** for rich test reporting
- **Cross-browser testing** for compatibility assurance

### **Future API tests (Service layer) - Business logic focus**

**Purpose**: Test business rules, integrations, and data processing independently  
**Location**: `marine-licensing-backend` repository  
**Coverage**: Business logic validation with mocked external dependencies

```javascript
// Example: Future API testing approach
describe('Marine Activity Validation API', () => {
  it('should reject activities outside UK marine areas', async () => {
    const invalidLocation = { lat: 60.0, lng: -10.0 } // Outside UK waters
    const response = await marineApi.validateActivity(invalidLocation)

    expect(response.status).toBe(400)
    expect(response.body.errors).toContain(
      'Location outside UK marine licensing area'
    )
  })
})
```

**Planned tools & technologies**:

- **API testing framework** for service integration testing
- **Mock external services** for reliable, fast testing
- **Test data builders** for complex domain objects
- **Mutation testing (Stryker)** - Validate unit test effectiveness and coverage quality

## 🛠️ Automation Toolchain

### **Core testing stack**

```
Language:       JavaScript (ES modules, no TypeScript)
BDD Framework:  Cucumber with Gherkin
UI Automation:  WebDriverIO + Screenplay Pattern
Test Framework: Cucumber (via WebDriverIO)
Reporting:      Allure with rich media capture
CI/CD:          GitHub Actions + Docker
```

### **Supporting tools**

- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates
- **Docker** - Consistent test environments
- **LocalStack** - AWS services simulation

### **Quality monitoring (Project ecosystem)**

- **SonarQube** - Code coverage and quality metrics in `marine-licensing-frontend` and `marine-licensing-backend` repositories

### **Planned quality enhancements**

- **Stryker Mutator** - Mutation testing to validate unit test effectiveness in `marine-licensing-frontend` and `marine-licensing-backend` repositories

## 🏗️ Automation Approach Patterns

### **Page object model (Locators only)**

Page objects contain **only locators and dynamic selectors**:

```javascript
// ✅ Good: Locators only
export default class ProjectNamePage {
  static projectNameInput = '#project-name'
  static continueButton = 'button[type="submit"]'
  static validationError = '.govuk-error-message'

  // Dynamic selector for specific error
  static errorFor(fieldName) {
    return `#${fieldName}-error`
  }
}
```

### **Screenplay pattern (Actions & intentions)**

User actions organised by **intent and abstraction level**:

```javascript
// High-level task
class CompleteProjectName extends Task {
  static with(projectName) {
    return new CompleteProjectName(projectName)
  }

  async performAs(actor) {
    await actor.attemptsTo(
      EnterProjectName.as(this.projectName),
      ClickSaveAndContinue.button(),
      EnsurePageHeading.is('Task List')
    )
  }
}

// Low-level interaction
class EnterProjectName extends Interaction {
  async performAs(actor) {
    await actor.ability.enterText(
      ProjectNamePage.projectNameInput,
      this.projectName
    )
  }
}
```

### **Test data management**

**Factory pattern** for creating domain objects:

```javascript
// Marine licensing test data factory
class ExemptionNotificationFactory {
  static valid() {
    return {
      projectName: faker.company.name(),
      activityType: 'marine-survey',
      location: UKMarineWaters.randomLocation(),
      startDate: faker.date.future(),
      contactDetails: ContactFactory.valid()
    }
  }

  static withInvalidLocation() {
    return {
      ...this.valid(),
      location: { lat: 0, lng: 0 } // Invalid: Null Island
    }
  }
}
```

## 🚦 Automation Quality Gates

### **Pipeline integration**

```yaml
# GitHub Actions workflow
test-automation:
  steps:
    - name: Run E2E tests
      run: npm run test
    - name: Quality gate
      run: |
        # Fail if test execution time exceeds limit
        # Fail if accessibility tests fail
        # Fail if critical user journeys fail
```

### **Quality metrics**

- **Test execution time**: E2E tests <20min, smoke tests <5min
- **Test reliability**: >95% pass rate on main branch
- **Browser compatibility**: Cross-browser testing coverage

### **Automation health monitoring**

- **Flaky test detection** - Identify unreliable tests
- **Test execution trends** - Monitor performance over time
- **Coverage gap analysis** - Identify undertested areas
- **Defect escape rate** - Measure automation effectiveness

## 🎯 Automation Best Practices

### **Reliable test design**

- **Independent tests** - No dependencies between test cases
- **Idempotent tests** - Same result regardless of execution order
- **Fast tests** - Quick feedback for developers
- **Clear failures** - Obvious error messages and debugging info

### **Maintainable test code**

- **DRY principle** - Reusable components and utilities
- **Single responsibility** - Each test validates one behaviour
- **Meaningful names** - Tests document expected behaviour
- **Layered abstraction** - Page objects, interactions, tasks

### **Environmental consistency**

- **Dockerised environments** - Consistent test execution
- **Test data isolation** - Each test gets clean data
- **Service virtualisation** - Mock external dependencies
- **Configuration management** - Environment-specific settings

## 📊 Automation ROI Measurement

### **Investment tracking**

- **Development time** - Hours spent creating/maintaining tests
- **Infrastructure costs** - CI/CD resources and tooling
- **Training investment** - Team skill development

### **Value delivery**

- **Defect prevention** - Issues caught before production
- **Faster delivery** - Reduced manual testing cycles
- **Confidence increase** - Safe refactoring and feature delivery
- **Documentation value** - Living specification via BDD

### **Success metrics**

- **Deployment frequency** - How often can we ship safely?
- **Lead time reduction** - Faster feature delivery
- **Mean time to recovery** - Quick issue detection and resolution
- **Developer productivity** - Less time debugging, more time building

---

_Automation is not about replacing humans, but amplifying human intelligence and creativity. Good automation frees us to do the testing that really matters._
