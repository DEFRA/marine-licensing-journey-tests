# Marine Licensing Journey Tests

End-to-end testing suite for the Marine Licensing service using **BDD (Behaviour Driven Development)** with **Cucumber**, **WebDriverIO**, and the **Screenplay Pattern**.

This project follows a user-centric approach to test automation, focusing on **who** does **what** and **why**, with clear separation between business logic and technical implementation.

## System Under Test

These journey tests cover:

- [marine-licensing-frontend](https://github.com/DEFRA/marine-licensing-frontend)
- [marine-licensing-backend](https://github.com/DEFRA/marine-licensing-backend)

### **Supporting Infrastructure**

**Dependencies (for GitHub/Docker execution):**

- **MongoDB** - Data persistence
- **Redis** - Session and caching
- **LocalStack** - AWS services simulation (S3, SQS, SNS, DynamoDB)

**Test Environments:**

- **Local Development** - Against locally running services
- **CDP Environments** - Live development/test environments
- **Docker Compose** - Containerised stack for CI/CD

## 🎯 Current Focus: Private Beta Exemption Notifications

We are currently focused on delivering a **private beta** that enables **members of the public to submit exemption notifications to the Marine Management Organisation (MMO)**.

### **Private Beta Scope**

- 🌊 **Exemption notifications** - Allow users to notify the MMO of activities that qualify for marine licensing exemptions
- 👥 **Public access** - External users (not just MMO staff) can create and submit notifications
- 📋 **Essential workflow** - Core user journey from initial notification through to submission
- 🔒 **Private beta constraints** - Limited user base for initial validation and feedback

### **Key User Journey**

The private beta focuses on enabling this core workflow:

1. **Start exemption notification** - User initiates a new exemption notification
2. **Provide project details** - Essential information about the marine activity
3. **Submit notification** - Complete submission to the MMO
4. **Receive confirmation** - User gets acknowledgement of successful submission

This testing suite validates the complete end-to-end journey for exemption notifications, ensuring the private beta delivers reliable functionality for real users.

## 📋 User Stories & Current Coverage

This project implements automated tests for marine licensing user journeys. See what functionality has been delivered:

**[📖 View Current User Stories & Test Coverage →](.cursor/user-stories/README.md)**

**Currently Implemented:**

- ✅ **ML-1**: Provide project name and create exemption
- ✅ **ML-9**: View the task list and navigate between tasks
- ✅ **ML-12**: Provide or withhold public register content

Each user story includes acceptance criteria, screenshots, and links to corresponding feature files tagged with `@issue=ML-{number}` for full traceability between requirements and tests.

## 🧠 Modern Test Strategy

This project implements a **contemporary quality engineering approach** that builds upon traditional testing principles whilst embracing modern practices for better outcomes.

### **[📖 Complete Test Strategy Documentation →](test-strategy/README.md)**

### **Key Principles**

- 🎯 **Context-driven testing** - Strategy adapts to marine licensing domain specifics
- 🔍 **Heuristic-based exploration** - Systematic thinking models guide test discovery
- 🤖 **Automation-first approach** - Fast feedback through comprehensive automation
- 👥 **Whole-team quality** - Testing is everyone's responsibility
- 📊 **Evidence-based decisions** - Data and metrics drive testing investments

### **Testing Approach Overview**

#### **🔺 Test Automation Pyramid**

```
UI Tests (Few)          → Critical user journeys, accessibility
API Tests (Many)        → Business logic, integrations, edge cases
Unit Tests (Excellent)  → Component behaviour, domain logic, high coverage
Static Analysis         → Code quality, security vulnerabilities
```

#### **🧠 Heuristic-Driven Testing**

- **[HTSM (Heuristic Test Strategy Model)](test-strategy/heuristics.md)** - Systematic exploration framework
- **[Domain-specific heuristics](test-strategy/heuristics.md#marine-licensing-heuristics)** - MARINE and EXEMPTION models for marine licensing
- **[Investigative testing sessions](test-strategy/investigative-testing.md)** - Charter-driven investigation

#### **👥 User-Centred Quality**

- **[Investigative testing](test-strategy/investigative-testing.md)** - Rich, realistic user investigations using structured exploration
- **[Real user personas](test-strategy/domain-context.md#user-reality--testing-implications)** - Testing with Fatima, Simon, Amy, and Zofia personas
- **[Accessibility-first](test-strategy/accessibility.md)** - GOV.UK standards and inclusive design
- **[Marine licensing domain expertise](test-strategy/domain-context.md)** - Testing grounded in regulatory reality

### **Quick Access to Strategy**

| **I want to...**                            | **Go to...**                                                    |
| ------------------------------------------- | --------------------------------------------------------------- |
| Understand our testing philosophy           | [Test Strategy Overview](test-strategy/README.md)               |
| Investigate with realistic user scenarios   | [Investigative Testing](test-strategy/investigative-testing.md) |
| Learn systematic exploration techniques     | [Testing Heuristics](test-strategy/heuristics.md)               |
| Build robust test automation                | [Automation Approach](test-strategy/automation.md)              |
| Understand marine licensing testing context | [Domain Context](test-strategy/domain-context.md)               |

### **Evolution from Traditional Approaches**

Our strategy **builds upon and modernises** established testing principles, preserving essential intentions whilst adopting contemporary practices:

- ✅ **Same fundamental goals** - Quality software, risk management, regulatory compliance
- ⚡ **Better delivery speed** - Faster feedback cycles and automated quality gates
- 🔍 **Enhanced discovery** - Systematic exploration uncovers risks automation might miss
- 📊 **Evidence-based confidence** - Data-driven decisions rather than process compliance
- 🤝 **Collaborative quality** - Whole-team responsibility rather than testing handoffs

### **Built on Proven Testing Foundations**

Our approach respectfully builds upon methodologies developed by leading testing practitioners:

- **Context-Driven Testing** - _James Bach, Michael Bolton_ - Adaptive strategies that respond to domain context
- **Session-Based Test Management** - _John Bach_ - Structured time-boxed exploration with accountability
- **Scenario Testing** - _Michael Bolton_ - Rich, realistic user investigations
- **Heuristic Test Strategy Model** - _James Bach_ - Systematic thinking frameworks for test discovery

These proven methodologies are adapted for marine licensing domain requirements whilst preserving their essential insights and principles.

## 🏗️ Architecture Overview

### **BDD + Screenplay Pattern**

- **📋 Feature Files** (`test/features/`) - Gherkin scenarios describing business behaviours
- **🎬 Step Definitions** (`test/steps/`) - Bridge between Gherkin and Screenplay
- **🎭 Screenplay Pattern** (`test-infrastructure/screenplay/`) - User-centric test automation
  - **Actor** - Represents the user performing actions
  - **Abilities** - What the actor can do (browse web, call APIs)
  - **Tasks** - High-level user goals (complete project name, apply for exemption)
  - **Interactions** - Low-level actions (click, verify, ensure)
- **📍 Page Objects** (`test-infrastructure/pages/`) - Locators and selectors only

### **Core Principles**

✅ **Self-documenting code** - No comments or JSDoc required  
✅ **Explicit naming** - Functions and variables express intent clearly  
✅ **Single responsibility** - Each component has one clear purpose  
✅ **Framework flexibility** - WebDriverIO encapsulated for easy switching

## 📁 Project Structure

```
test/
├── features/                  # Gherkin feature files (*.feature)
└── steps/                     # Cucumber step definitions (*.js)

test-infrastructure/
├── screenplay/
│   ├── actor.js               # Main actor with memory and abilities
│   ├── abilities/             # What actors can do
│   │   └── browse.the.web.js  # WebDriverIO encapsulation
│   ├── tasks/                 # High-level user workflows
│   ├── interactions/          # Single-purpose actions
│   └── models/                # Test data models (future)
├── pages/                     # Page objects (locators only)
└── capture/                   # Allure reporting utilities

*.conf.js                      # WebDriverIO configurations per environment
```

## 🎯 Writing Tests

### **BDD Guidelines**

- **Golden Rule**: Write Gherkin for clarity - others should understand without knowing the feature
- **Cardinal Rule**: One Scenario, One Behaviour
- **Structure**: Always Given → When → Then (in that order, no repeats)
- **Focus**: Customer needs and real user workflows

### **Example Feature**

```gherkin
Feature: Starting a new exemption notification

  Scenario: Provide a valid project name
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed
```

### **Step Implementation**

```javascript
// Maps to high-level Tasks
When('entering and saving a project with a valid name', async function () {
  await this.actor.attemptsTo(CompleteProjectName.with(faker.lorem.words(5)))
})

// Maps to verification Interactions
Then('the task list page is displayed', async function () {
  await this.actor.attemptsTo(EnsurePageHeading.is('Task List'))
})
```

## 🚀 Getting Started

### **Workspace Setup (Recommended)**

For optimal development experience, set up a workspace with all related repositories:

```bash
# Create a workspace directory
mkdir marine-licensing-workspace
cd marine-licensing-workspace

# Clone all repositories to the same level
git clone https://github.com/DEFRA/marine-licensing-frontend.git
git clone https://github.com/DEFRA/marine-licensing-backend.git
git clone https://github.com/DEFRA/marine-licensing-journey-tests.git

# Your structure should look like:
# marine-licensing-workspace/
# ├── marine-licensing-frontend/
# ├── marine-licensing-backend/
# └── marine-licensing-journey-tests/
```

**IDE Setup:**

1. Open the `marine-licensing-workspace` folder in your IDE
2. This provides access to the full application context

### **Requirements**

- **Node.js** `>= v22.13.1` ([use nvm](https://github.com/creationix/nvm))
- **npm** `>= v9`

```bash
# Navigate to the journey tests
cd marine-licensing-journey-tests

# Use correct Node version
nvm use

# Install dependencies
npm install
```

### **Development Commands**

```bash
# Local development (requires locally running services for marine-licencing-frontend and marine-licensing-backend)
npm run test:local
npm run test:local:debug

# Linting and formatting
npm run lint
npm run lint:fix
npm run format
npm run format:check

# Generate test reports
npm run report

# Format all files using prettier
npx prettier --write .
```

### **Environment Configurations**

| Configuration               | Purpose              | Base URL           |
| --------------------------- | -------------------- | ------------------ |
| `wdio.local.conf.js`        | Local development    | Configurable       |
| `wdio.conf.js`              | Default environment  | CDP environment    |
| `wdio.github.conf.js`       | GitHub Actions       | Docker compose     |
| `wdio.browserstack.conf.js` | BrowserStack testing | CDP + BrowserStack |

## 🏭 Production & Deployment

### **CDP Portal**

Tests run automatically via CDP Portal under **Test Suites**:

1. **Build Trigger**: New Docker image built on `main` branch merge
2. **Build Time**: ~1-2 minutes (check GitHub Actions)
3. **Results**: Available in CDP Portal with Allure reports

### **GitHub Workflows**

Alternative execution using Docker Compose:

```bash
# Test locally with Docker
docker compose up
npm run test:github
```

**Setup Requirements:**

1. Edit `compose.yml` to include your services
2. Modify `docker/scripts/` for database setup
3. Configure `.github/workflows/journey-tests`

### **BrowserStack Integration**

```bash
# Via CDP Portal
npm run test:browserstack

# Via GitHub Runner
npm run test:github:browserstack
```

## 📏 Coding Standards

### **JavaScript Standards**

- ❌ **No TypeScript** - JavaScript only
- ❌ **No JSDoc** - Self-documenting code
- ❌ **No Comments** - Expressive naming preferred
- ❌ **No `console.log()`** - Use Allure capture functions
- ❌ **No `throw Error`** - Use Chai assertions for proper test failures

### **Architecture Rules**

- **Tasks** → High-level user goals (`CompleteProjectName`, `ApplyForExemption`)
- **Interactions** → Single actions (`ClickSaveAndContinue`, `EnsureHeading`)
- **Page Objects** → Locators and dynamic selectors only
- **Abilities** → Framework encapsulation (WebDriverIO → `browse.the.web.js`)

### **File Naming**

- **JavaScript files**: `dot.case.js`
- **Assets**: `kebab-case` (static files)
- **Features**: `descriptive.name.feature`

## 🎭 Screenplay Pattern Usage

### **Actor Setup**

```javascript
// In step definitions
this.actor = new Actor('Alice')
this.actor.can(new BrowseTheWeb(browser))

// Remember data for later use
this.actor.remembers('projectName', 'My Project')
const name = this.actor.recalls('projectName')
```

### **Task Implementation**

```javascript
// High-level user workflow
export default class CompleteProjectName extends Task {
  static with(projectName) {
    return new CompleteProjectName(projectName)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.sendKeys(
      ProjectNamePage.projectNameInput,
      this.projectName
    )
    await browseTheWeb.click(ProjectNamePage.saveAndContinue)
  }
}
```

### **Interaction Implementation**

```javascript
// Single verification action
export default class EnsurePageHeading extends Task {
  static is(expectation) {
    return new EnsurePageHeading(expectation)
  }

  async performAs(actor) {
    const browseTheWeb = actor.ability
    await browseTheWeb.expectElementToContainText('h1', this.expectation)
  }
}
```

## 📊 Test Strategy

This project follows a **comprehensive modern test strategy** that combines systematic thinking with contemporary quality engineering practices.

### **Complete Strategy Documentation**

**[📖 Full Test Strategy →](test-strategy/README.md)** - Modern quality engineering approach

### **Core Framework**

- **[Testing Heuristics](test-strategy/heuristics/README.md)** - HTSM and systematic exploration
- **[Test Charters](test-charters/README.md)** - Systematic exploration of user stories and requirements
- **[Automation Approach](test-strategy/automation/README.md)** - Test pyramid and quality engineering
- **[Domain Context](test-strategy/domain-context/README.md)** - Marine licensing reality and user personas
- **[Exploratory Testing](test-strategy/exploratory/README.md)** - Session-based investigation

### **Key Approaches**

- **Risk-based testing** using systematic heuristics
- **Quality criteria** considerations across product factors
- **User-centred testing** with real marine licensing personas
- **Evidence-based decisions** driven by metrics and outcomes

> 📖 See complete strategy, heuristics, and guidelines in **[test-strategy/](test-strategy/README.md)**

## 🔧 Debugging

### **Local Debugging**

```bash
# Run with debug output
npm run test:local:debug

# Check specific configuration
cat wdio.local.conf.js
```

### **Common Issues**

- **Service not running**: Ensure target application is accessible at configured `baseUrl`
- **Element not found**: Check page objects for correct selectors
- **Memory issues**: Actor memory is scenario-scoped, use `remembers()` / `recalls()`

## 📚 Documentation

- **🎯 BDD Guidelines**: `.cursor/rules/bdd.rules.mdc`
- **🎭 Screenplay Pattern**: `.cursor/rules/screenplay-pattern.mdc`
- **🏗️ Project Structure**: `.cursor/rules/project-structure.mdc`
- **💻 Coding Standards**: `.cursor/rules/code.generation.mdc`
- **🧹 Clean Code & Code Smells**: `.cursor/rules/playbook.clean.code.mdc`
- **📋 Test Strategy**: `.cursor/rules/htsm.mdc`
- **📝 Style Guide**: `.cursor/rules/playbook.styleguide.mdc`
- **🔄 Refactoring Guidelines**: `.cursor/rules/playbook.refactoring.mdc`
- **📖 Complete Rules Index**: `.cursor/rules/README.md`

## 📜 Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
