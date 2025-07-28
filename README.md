# Marine Licensing Journey Tests

End-to-end testing suite for the Marine Licensing service using **BDD (Behaviour Driven Development)** with **Cucumber**, **WebDriverIO**, and the **Screenplay Pattern**.

This project follows a user-centric approach to test automation, focusing on **who** does **what** and **why**, with clear separation between business logic and technical implementation.

## System Under Test

These journey tests cover:

- [marine-licensing-frontend](https://github.com/DEFRA/marine-licensing-frontend) - Hapi.js frontend with GOV.UK Design System
- [marine-licensing-backend](https://github.com/DEFRA/marine-licensing-backend) - Hapi.js REST API with MongoDB

### **Authentication & Security**

- **DEFRA ID Integration** - Complete OIDC authentication using CDP stub for development/testing
- **Session Management** - Secure cookie-based sessions with automatic user lifecycle management
- **Test User Management** - Automated user registration and cleanup via `DefraIdStubUserManager`
- **Production Ready** - Seamless transition from CDP stub to production DEFRA ID

### **Supporting Infrastructure**

**Dependencies:**

- **MongoDB** - Data persistence
- **Redis** - Session and caching
- **LocalStack** - AWS services simulation (S3, SQS, SNS, DynamoDB)
- **DEFRA ID Stub** - CDP authentication stub for testing

**Test Environments:**

- **Local Development** - Against locally running services
- **CDP Environments** - Live development/test environments
- **Docker Compose** - Containerised stack for CI/CD

## 🎯 Current Focus: Private Beta Exemption Notifications

We are delivering a **private beta** that enables **members of the public to submit exemption notifications to the Marine Management Organisation (MMO)**.

### **Key User Journey**

1. **Authenticate** - User signs in via DEFRA ID
2. **Start exemption notification** - User initiates a new exemption notification
3. **Provide project details** - Essential information about the marine activity
4. **Submit notification** - Complete submission to the MMO
5. **Receive confirmation** - User gets acknowledgement of successful submission

**Current Test Coverage:** 378+ scenarios across 19 feature files validating complete end-to-end workflows.

## 📋 User Stories & Documentation

- **[📖 User Stories & Test Coverage →](documentation/user-stories/README.md)** - Requirements and acceptance criteria
- **[🧠 Complete Test Strategy →](documentation/test-strategy/README.md)** - Modern quality engineering approach
- **[🎯 Test Charters →](documentation/test-charters/README.md)** - Investigative testing plans
- **[📚 Complete Documentation →](documentation/README.md)** - Comprehensive documentation hub

## 🏗️ Architecture Overview

### **BDD + Screenplay Pattern**

- **📋 Feature Files** (`test/features/`) - Gherkin scenarios describing business behaviours
- **🎬 Step Definitions** (`test/steps/`) - Bridge between Gherkin and Screenplay
- **🎭 Screenplay Pattern** (`test-infrastructure/screenplay/`) - User-centric test automation
  - **Actor** - Represents the user performing actions
  - **Abilities** - What the actor can do (browse web, authenticate with DEFRA ID, browse D365)
  - **Tasks** - High-level user goals (complete project name, apply for exemption, login to D365)
  - **Interactions** - Low-level actions (click, verify, ensure, launch D365)
- **📍 Page Objects** (`test-infrastructure/pages/`) - Locators and selectors only

### **Browser Automation Architecture**

**WebDriverIO** - Main application testing

- **Core user journeys** - Marine licensing application workflows
- **Cross-browser compatibility** - Chrome, Firefox, Safari support
- **Fast execution** - Optimised for rapid feedback loops

**Playwright** - External system integration

- **D365 testing** - Microsoft Dynamics 365 case verification with automatic authentication
- **Smart authentication handling** - Automatic dialog detection and popup management
- **Modern browser handling** - Superior OAuth and SPA support
- **Independent contexts** - Isolated from main application tests

### **Authentication Integration**

```javascript
// User creation happens automatically on first navigation
await this.actor.attemptsTo(Navigate.toTheMarineLicensingApp())
// ↳ This creates test user + authenticates transparently

// Test user is now available in actor memory
const testUser = this.actor.recalls('testUser')
// ↳ { userId, email, firstName, lastName, ... }
```

### **Core Principles**

✅ **Self-documenting code** - No comments or JSDoc required  
✅ **Explicit naming** - Functions and variables express intent clearly  
✅ **Single responsibility** - Each component has one clear purpose  
✅ **Framework flexibility** - WebDriverIO encapsulated for easy switching  
✅ **Secure testing** - Automated user lifecycle with proper cleanup

## 🚀 Getting Started

### **Requirements**

- **Node.js** `>= v22.13.1` ([use nvm](https://github.com/creationix/nvm))
- **npm** `>= v9`

```bash
# Use correct Node version
nvm use

# Install dependencies
npm install
```

### **Development Commands**

```bash
# Local development (requires locally running services)
npm run test:local
npm run test:local:debug

# Smoke testing - Run core user journey tests quickly
npm run test:local -- --cucumberOpts.tags "@smoke"

# Linting and formatting
npm run lint
npm run lint:fix
npm run format

# Generate test reports
npm run report
```

### **Environment Configurations**

| Configuration               | Purpose              | Base URL           |
| --------------------------- | -------------------- | ------------------ |
| `wdio.local.conf.js`        | Local development    | Configurable       |
| `wdio.conf.js`              | Default environment  | CDP environment    |
| `wdio.github.conf.js`       | GitHub Actions       | Docker compose     |
| `wdio.browserstack.conf.js` | BrowserStack testing | CDP + BrowserStack |

### **🚀 Smoke Testing - Fast Core Journey Validation**

Run only the core user journey scenarios tagged with `@smoke` for rapid feedback:

```bash
# Run smoke tests locally (≈2-3 minutes vs full suite ≈15+ minutes)
npm run test:local -- --cucumberOpts.tags "@smoke"
```

**Smoke test coverage:**

- ✅ Automatic test user creation and DEFRA ID authentication
- ✅ Project name creation and task list navigation
- ✅ Activity description and public register decisions
- ✅ Site details coordinate entry (WGS84 and OSGB36)

## 🎯 Writing Tests

### **BDD Guidelines**

- **Golden Rule**: Write Gherkin for clarity - others should understand without knowing the feature
- **Structure**: Always Given → When → Then (in that order)
- **Focus**: Customer needs and real user workflows

### **Example with Authentication**

```gherkin
Feature: Starting a new exemption notification

  Scenario: Provide a valid project name
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed
```

### **Step Implementation**

```javascript
Given('the project name page is displayed', async function () {
  this.actor = new Actor('Alice')
  this.actor.can(new BrowseTheWeb(browser))
  // Authentication happens automatically here ↓
  await this.actor.attemptsTo(Navigate.toProjectNamePage())
})

When('entering and saving a project with a valid name', async function () {
  await this.actor.attemptsTo(CompleteProjectName.with(faker.lorem.words(5)))
})

Then('the task list page is displayed', async function () {
  await this.actor.attemptsTo(EnsurePageHeading.is('Task List'))
})
```

## 📏 Coding Standards

### **JavaScript Standards**

- ❌ **No TypeScript** - JavaScript only
- ❌ **No JSDoc** - Self-documenting code
- ❌ **No Comments** - Expressive naming preferred
- ❌ **No `console.log()`** - Use Allure capture functions
- ❌ **No `throw Error`** - Use Chai assertions (`expect.fail()`) for proper test failures

### **Architecture Rules**

- **Tasks** → High-level user goals (`CompleteProjectName`, `AuthenticateWith`)
- **Interactions** → Single actions (`ClickSaveAndContinue`, `EnsureHeading`)
- **Page Objects** → Locators and dynamic selectors only
- **Abilities** → Framework encapsulation (WebDriverIO, DEFRA ID authentication)

### **File Naming**

- **JavaScript files**: `dot.case.js`
- **Features**: `descriptive.name.feature`

## 🎭 Screenplay Pattern Usage

### **Actor with Authentication**

```javascript
// In step definitions - standard actor setup
this.actor = new Actor('Alice')
this.actor.can(new BrowseTheWeb(browser))
// ↳ BrowseTheWeb automatically includes DEFRA ID capabilities

// Navigate triggers automatic user creation + authentication
await this.actor.attemptsTo(Navigate.toProjectNamePage())

// Remember data for later use
this.actor.remembers('projectName', 'My Project')
const name = this.actor.recalls('projectName')
const testUser = this.actor.recalls('testUser') // Available after navigation
```

### **Task Implementation**

```javascript
// High-level user workflow (authentication handled by Navigate)
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

## 🏭 Production & Deployment

### **CDP Portal Integration**

Tests run automatically via CDP Portal with:

- **Docker builds** on `main` branch merge
- **Allure reports** with comprehensive test results
- **BrowserStack integration** for cross-browser testing

### **DEFRA ID Configuration**

**Development/Testing:**

```bash
DEFRA_ID_OIDC_CONFIGURATION_URL=http://defra-id-stub:3200/cdp-defra-id-stub/.well-known/openid-configuration
DEFRA_ID_CLIENT_ID=cdp-defra-id-stub
```

**Production:**

```bash
DEFRA_ID_OIDC_CONFIGURATION_URL=https://login.defra.gov.uk/...
DEFRA_ID_CLIENT_ID=<production-client-id>
```

### **D365 Configuration**

For testing submission verification in Microsoft Dynamics 365:

```bash
D365_URL=<dynamics-365-instance-url>
D365_USER_ID=<user-email-for-d365-login>
D365_USER_PASSWORD=<user-password-for-d365-login>
```

#### **Authentication Approaches**

**Browser Automation (Default):** Uses the `LaunchD365` interaction with automatic authentication dialog handling:

- **Automatic dialog handling** - Detects and clicks "Please sign in again" dialogs
- **Popup window management** - Automatically closes authentication popup windows
- **Session persistence** - Maintains D365 session throughout test execution
- **Resilient authentication** - Works with D365's dynamic authentication challenges

```javascript
// D365 tests automatically handle authentication dialogs
await this.actor.attemptsTo(LoginToD365.now())
// ↳ Uses LaunchD365 interaction with dialog/popup handling
```

**OAuth2 Programmatic:** Alternative approach using access tokens (see `test-infrastructure/auth/README.md`):

- **Token-based authentication** - No browser login automation required
- **Environment variables** - Direct credential configuration
- **Resource Owner Password Credentials** - Standard OAuth2 flow

#### **Automatic Authentication Features**

The `BrowseD365` ability and `LaunchD365` interaction automatically handle:

- ✅ **"Please sign in again" dialogs** - Detected and clicked automatically
- ✅ **Authentication popup windows** - Closed automatically without user intervention
- ✅ **Session refresh prompts** - Handled transparently during test execution
- ✅ **Secondary authentication dialogs** - Multiple dialog handling supported

**Note:** D365 integration tests only run in integrated environments. They do not run locally or in development environments where D365 connectivity is not available.

## 🔧 Quick Debugging

```bash
# Run with debug output
npm run test:local:debug

# Check DEFRA ID stub is running
curl http://localhost:3200/health

# Verify Docker services
docker ps
```

**Common Issues:**

- **Authentication failures**: Check DEFRA ID stub is running and accessible
- **D365 authentication dialogs**: Tests automatically handle "Please sign in again" and popup windows
- **Service not running**: Ensure target application is accessible at configured `baseUrl`
- **Element not found**: Check page objects for correct selectors

## 📁 Project Structure

```
test/
├── features/                          # Gherkin feature files
└── steps/                             # Cucumber step definitions

test-infrastructure/
├── screenplay/
│   ├── actor.js                       # Main actor with memory and abilities
│   ├── abilities/                     # What actors can do
│   ├── tasks/                         # High-level user workflows
│   ├── interactions/                  # Single-purpose actions
│   └── models/                        # Test data models
├── pages/                             # Page objects (locators only)
├── helpers/
│   └── defra-id-stub-user-manager.js  # DEFRA ID test user management
└── capture/                           # Allure reporting utilities
```

## 📜 Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
