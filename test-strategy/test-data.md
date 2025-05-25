# Test Data Management - Self-Sufficient Test Data Strategy

**Core Principle**: Automated tests create all the data they need to execute without dependencies on external data sources.

## 🎯 Benefits

- **Test isolation** - Tests don't interfere with each other
- **Reliable execution** - No dependencies on external data state
- **Fast feedback** - No setup delays or data conflicts
- **Environment independence** - Tests work consistently across all environments

## 🏗️ Implementation

### **Test Data Creation**

```javascript
// Create realistic data using faker.js
this.actor.remembers('projectName', faker.lorem.words(5))
this.actor.remembers('activityType', 'marine-survey')

// Use data in test steps
await this.actor.attemptsTo(
  CompleteProjectName.with(this.actor.recalls('projectName'))
)
```

### **Data Lifecycle**

- **Scenario-scoped** - Data created and used within single test scenario
- **Automatic cleanup** - Tests clean up after themselves
- **No persistent state** - Tests don't rely on data from previous runs

## 🔍 Supporting Investigation

Test data tools also support investigative testing:

- **Use faker.js patterns** for realistic investigation data
- **Generate edge case data** for error scenario investigation
- **Create persona-specific data** matching investigation scenarios

## 🎯 Principles

1. **Create what you need** - Each test generates its own required data
2. **Use realistic patterns** - Leverage faker.js for authentic-looking data
3. **Clean up after yourself** - Tests remove any persistent data they create
4. **Share patterns, not data** - Reuse data generation patterns, not actual data

---

_Self-sufficient test data supports both automated reliability and investigative flexibility._

## 🎯 Planned Content

This section will cover:

- **Test data factories** for marine licensing domains (exemptions, licences, applications)
- **Data lifecycle management** - creation, cleanup, and isolation strategies
- **API-driven test data** creation and management
- **Test environment data strategies** across local, development, and production-like environments
- **Data privacy and compliance** considerations for government services
- **Performance test data** generation and management

## 📖 Resources

For test data guidance:

- **Exemption notification model** and factory pattern
- **Faker.js integration** for realistic test data
- **Actor memory system** - Use `actor.remembers()` and `actor.recalls()` for test data sharing
- **Environment-specific data** - Managed through `wdio.*.conf.js` configurations

## 🎯 Development Areas

## 🚀 Next Steps

Planned improvements:

- **Exemption notification model** and factory pattern
- **API integration** for test data cleanup
- **Domain-specific data builders** for complex marine licensing scenarios
- **Data strategy** for different test environment needs

---

_This section will be developed based on team needs and feedback. Contributions welcome!_

## 🎯 Related Sections

- **[Automation Approach](../automation/README.md)** - For test data patterns and reliability strategies
