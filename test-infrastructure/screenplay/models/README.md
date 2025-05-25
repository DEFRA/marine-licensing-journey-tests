# Test Data Models

This directory contains domain-specific test data models for marine licensing journey tests. These models generate realistic, consistent test data that reflects actual marine licensing scenarios.

## 🎯 Purpose

- **Realistic Test Data**: Generate data that reflects actual marine licensing projects
- **Consistency**: Ensure test data follows domain rules and constraints
- **Maintainability**: Centralise test data generation logic
- **Boundary Testing**: Support edge cases and validation scenarios

## 📋 Available Models

### MarineProjectModel

Generates realistic marine project names and related data.

```javascript
import { MarineProjectModel } from '~/test-infrastructure/screenplay/models'

// Generate a realistic project name
const projectName = MarineProjectModel.generateValidProjectName()
// Example: "North Sea Offshore Wind Farm - Phase 1"

// Generate project name with specific options
const windFarmProject = MarineProjectModel.generateProjectName({
  includeLocation: true,
  includeDescriptor: true,
  maxLength: 200
})

// Generate boundary test data
const boundaries = MarineProjectModel.generateBoundaryTestNames()
// Returns: { empty, singleChar, exactlyMaxLength, overMaxLength, realistic, oversized }
```

### PublicRegisterModel

Generates realistic public register consent and withholding data.

```javascript
import { PublicRegisterModel } from '~/test-infrastructure/screenplay/models'

// Generate public register data
const publicRegister = PublicRegisterModel.generatePublicRegisterData()
// Example: { consent: 'yes', reason: 'Commercial sensitivity regarding...' }

// Generate specific scenarios
const scenarios = PublicRegisterModel.generateTestScenarios()
// Returns: { allowPublicRegister, withholdFromPublicRegister, withholdWithCommercialReason, ... }

// Generate withholding reason by theme
const commercialReason = PublicRegisterModel.generateWithholdingReason({
  theme: 'commercial'
})
```

### SiteDetailsModel

Generates realistic coordinate and location data for marine projects.

```javascript
import { SiteDetailsModel } from '~/test-infrastructure/screenplay/models'

// Generate UK marine coordinates
const coordinates = SiteDetailsModel.generateMarineCoordinates()
// Example: { latitude: 54.123456, longitude: -1.234567, coordinateSystem: 'WGS84 (GPS)' }

// Generate coordinates for specific region
const northSeaCoords = SiteDetailsModel.generateMarineCoordinates({
  region: 'north-sea'
})

// Generate complete site details
const siteDetails = SiteDetailsModel.generateSiteDetails({
  coordinatesType: 'coordinates',
  coordinatesEntry: 'single',
  region: 'english-channel'
})
```

### ExemptionModel

Generates complete marine licensing exemption data combining all other models.

```javascript
import { ExemptionModel } from '~/test-infrastructure/screenplay/models'

// Generate complete exemption
const exemption = ExemptionModel.generateCompleteExemption({
  includeProjectName: true,
  includePublicRegister: true,
  includeSiteDetails: true
})

// Generate exemption for specific persona
const fatimaExemption = ExemptionModel.generateForPersona('fatima')
// Returns exemption data tailored to Fatima (offshore wind developer)

// Generate test scenarios
const scenarios = ExemptionModel.generateTestScenarios()
// Returns: { basicExemption, completeExemption, northSeaWindFarm, ... }
```

## 🚀 Quick Usage

For convenience, use the simplified generators:

```javascript
import { generateTestData } from '~/test-infrastructure/screenplay/models'

// Quick generators
const projectName = generateTestData.projectName()
const publicRegister = generateTestData.publicRegister(true) // withhold = true
const siteDetails = generateTestData.siteDetails('north-sea')
const exemption = generateTestData.exemption()
const fatimaData = generateTestData.forPersona('fatima')
```

## 📝 Usage in Step Definitions

### Before (using faker directly)

```javascript
When('entering and saving a project with a valid name', async function () {
  this.actor.remembers('projectName', faker.lorem.words(5)) // Generic, unrealistic
  await this.actor.attemptsTo(
    CompleteProjectName.with(this.actor.recalls('projectName'))
  )
})
```

### After (using domain models)

```javascript
import { generateTestData } from '~/test-infrastructure/screenplay/models'

When('entering and saving a project with a valid name', async function () {
  this.actor.remembers('projectName', generateTestData.projectName()) // Realistic marine project
  await this.actor.attemptsTo(
    CompleteProjectName.with(this.actor.recalls('projectName'))
  )
})
```

## 🎭 Persona-Driven Testing

Generate data for specific user personas:

```javascript
// Fatima - Offshore wind developer
const fatimaExemption = generateTestData.forPersona('fatima')
// Generates: "Dogger Bank Offshore Wind Farm - Extension Phase"

// Simon - Port authority
const simonExemption = generateTestData.forPersona('simon')
// Generates: "Portsmouth Harbour Maintenance Dredging"

// Amy - Marine consultant
const amyExemption = generateTestData.forPersona('amy')
// Generates: "Coastal Defence Environmental Impact Assessment"

// Zofia - Research scientist
const zofiaExemption = generateTestData.forPersona('zofia')
// Generates: "Marine Biodiversity Research Station - Pilot Study"
```

## 🔍 Boundary Testing

All models support boundary and edge case testing:

```javascript
// Project name boundaries
const projectBoundaries = MarineProjectModel.generateBoundaryTestNames()
// Test empty, max length, oversized names

// Public register reason boundaries
const reasonBoundaries = PublicRegisterModel.generateBoundaryTestReasons()
// Test empty, max length, oversized reasons

// Invalid data for error testing
const invalidExemption = ExemptionModel.generateInvalidData()
// Test missing fields, invalid formats
```

## ⚠️ Domain Validation Required

**Important**: These models generate realistic test data based on common marine licensing patterns, but any test scenarios involving domain-specific requirements should be validated by team members familiar with actual marine licensing workflows and regulations.

The models are designed to:

- ✅ Generate realistic project names and data
- ✅ Follow known validation rules (length limits, format requirements)
- ✅ Support boundary testing scenarios
- ⚠️ **Require validation** for regulatory accuracy and real-world applicability

## 🔄 Extending the Models

To add new data types or scenarios:

1. **Add new static arrays** for additional options
2. **Create new generator methods** following existing patterns
3. **Add test scenarios** for specific use cases
4. **Update the index exports** to include new functionality

Example:

```javascript
// Add new marine activity types
static NEW_ACTIVITY_TYPES = [
  'Tidal lagoon construction',
  'Floating solar installation'
]

// Add new generator method
static generateNewActivityProject() {
  return faker.helpers.arrayElement(this.NEW_ACTIVITY_TYPES)
}
```
